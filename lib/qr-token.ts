import crypto from "crypto";

/**
 * A scanned QR points to /verify/<code>.
 *
 * CURRENT FORMAT
 *   code = base32( [ptLength] || ciphertext || signature )
 *   e.g. EYL2P7O2GKPJKWPB5NBFQC64GOOOKBBT26IUKROIXZW5IB56BUVIZ3PGMPOJ2YAX
 *
 * LEGACY FORMAT - still accepted, labels already printed stay valid
 *   code = base64url(JSON.stringify({ p: productId, s: serial })) + "." + signatureHex
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS REPLACED, AND WHY
 * ---------------------------------------------------------------------------
 * The legacy code was 135 characters and printed as a 69x69-module QR. On a
 * 25mm label that is 0.325mm per module, roughly 2.6 dots on a 203dpi thermal
 * printer - far below what an older phone camera can resolve. This format is
 * 64 characters and prints as 37x37.
 *
 * The legacy format was also described as hiding the Accurate item number
 * because the payload was base64url-encoded. It did not. base64url is an
 * encoding, not a cipher: anyone can paste the code into a decoder and read
 * {"p":"100019","s":"SCI-NRHCF-20260518-PC260518-401"} straight off. Two
 * consecutive serials also produced codes that were 98.6% identical, so
 * comparing two units from one carton made the sequential numbering obvious.
 *
 * ---------------------------------------------------------------------------
 * CONSTRUCTION
 * ---------------------------------------------------------------------------
 *   K_enc  = HMAC-SHA256(SECRET, "qr-enc-v1")
 *   pt     = productId + "." + serial
 *   sig    = HMAC-SHA256(SECRET, pt + "." + date)[0..10]
 *   packed = pack6(pt)
 *   ct     = packed XOR keystream(K_enc, sig)
 *   code   = base32( [pt.length] || ct || sig )
 *
 * Three things are doing work here, and each earns its place:
 *
 *   pack6 - the payload only ever uses digits, uppercase letters, hyphens and
 *   one dot, so each character fits in 6 bits instead of 8. That is what keeps
 *   the code at 37x37 instead of 41x41. Encoding the payload as plain base32
 *   would have been simpler but costs a whole QR version.
 *
 *   sig doubles as the encryption nonce. It is in the clear at the end of the
 *   blob, so the server can derive the keystream before decrypting - no
 *   separate nonce to carry. It is unique per unit because every serial is.
 *
 *   The XOR is free. Scrambling and not scrambling produce exactly the same
 *   64 characters, but without it the packed bytes keep the payload's
 *   structure and two consecutive serials still come out 71.9% identical.
 *   With it, 6.3% - essentially unrelated.
 *
 * `date` is Accurate's transaction date for the serial, exactly as before. It
 * is not carried in the code; it is read back from Accurate at verify time.
 *
 * ---------------------------------------------------------------------------
 * HONEST LIMIT
 * ---------------------------------------------------------------------------
 * A stream cipher decrypts anything, so a random code of the right length
 * still yields *some* text. What stops it is the signature check in
 * verifyQrSignature, plus the charset check below which rejects the
 * overwhelming majority before any Accurate lookup happens. Forgery still
 * requires the secret - that has not changed and is what actually protects
 * the system.
 */

export type QrPayload = {
  productId: string;
  serial: string;
  timestamp: string;
};

export type ParsedQrCode = {
  productId: string;
  serial: string;
  /** Opaque to the caller. Pass it straight back to verifyQrSignature. */
  signature: string;
};

/** Bytes of HMAC kept as the signature: 80 bits, RFC 2104's recommended floor
 *  for a truncated MAC. MUST match SIG_BYTES in the Apps Script generator. */
const SIG_BYTES = 10;

/**
 * Exactly 64 symbols, so each one packs into 6 bits. Only the digits,
 * uppercase letters, hyphen and dot are ever used by real payloads; the
 * lowercase range exists to fill the alphabet out to a power of two.
 * MUST match CHARSET in the Apps Script generator, character for character.
 */
const CHARSET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.";

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/**
 * What a decrypted payload is allowed to look like. The generator enforces the
 * same two patterns and refuses the row otherwise, so the two sides cannot
 * drift apart silently.
 *
 * This is also what stops a random code from reaching Accurate: a garbage
 * decryption lands outside this charset with probability ~1 - (36/64)^n,
 * which for a 38-character payload is a certainty for practical purposes.
 */
const PRODUCT_ID_RE = /^[0-9A-Z-]+$/;
const SERIAL_RE = /^[0-9A-Z.-]+$/;

/** Legacy signature: the full HMAC-SHA256 as lowercase hex. */
const LEGACY_SIG = /^[0-9a-f]{64}$/;

/** Opaque codes are pure base32; legacy codes always contain a ".". */
const OPAQUE_CODE = /^[A-Z2-7]+$/;

function getSigningSecret(): string {
  const secret = process.env.QR_SIGNING_SECRET;
  if (!secret) {
    throw new Error("QR_SIGNING_SECRET is not set");
  }
  return secret;
}

function hmac(key: string | Buffer, message: string | Buffer): Buffer {
  return crypto.createHmac("sha256", key).update(message).digest();
}

/** A subkey, so the same secret never both signs and encrypts. The label is
 *  part of the construction: changing it invalidates every code ever issued. */
function encryptionKey(): Buffer {
  return hmac(getSigningSecret(), "qr-enc-v1");
}

function base32Encode(buf: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (let i = 0; i < buf.length; i++) {
    value = (value << 8) | buf[i];
    bits += 8;
    while (bits >= 5) {
      out += BASE32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32[(value << (5 - bits)) & 31];
  return out;
}

/**
 * Returns null on any character outside the alphabet, and on any non-canonical
 * encoding.
 *
 * The canonical check matters more than it looks. 64 base32 characters carry
 * 320 bits while the blob is 40 bytes, and when those do not divide evenly the
 * trailing bits decode to nothing. Left unchecked, several different URLs
 * decode to the same blob and all of them verify as the same unit. That is not
 * a forgery, but it breaks "one label, one URL", which scan counting and any
 * later duplicate detection depend on.
 */
function base32Decode(text: string): Buffer | null {
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const idx = BASE32.indexOf(text[i]);
    if (idx === -1) return null;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  if (bits > 0 && (value & ((1 << bits) - 1)) !== 0) return null;
  return Buffer.from(out);
}

/** Six bits per character. Returns null if anything falls outside CHARSET. */
function pack6(text: string): Buffer | null {
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const idx = CHARSET.indexOf(text[i]);
    if (idx === -1) return null;
    value = (value << 6) | idx;
    bits += 6;
    while (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  if (bits > 0) out.push((value << (8 - bits)) & 255);
  return Buffer.from(out);
}

/**
 * The inverse. `length` is required rather than inferred: for some payload
 * lengths the padding bits form a whole extra symbol, which would decode as a
 * spurious trailing character. That is why the blob carries the length.
 */
function unpack6(buf: Buffer, length: number): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (let i = 0; i < buf.length && out.length < length; i++) {
    value = (value << 8) | buf[i];
    bits += 8;
    while (bits >= 6 && out.length < length) {
      out += CHARSET[(value >>> (bits - 6)) & 63];
      bits -= 6;
    }
  }
  return out;
}

/** Number of bytes pack6 produces for a payload of `length` characters. */
function packedLength(length: number): number {
  return Math.ceil((length * 6) / 8);
}

/** HMAC-SHA256 in counter mode - the same shape as HKDF-Expand. Apps Script,
 *  which generates the codes, has HMAC but no AES, so this is what both sides
 *  can actually build. */
function keystream(key: Buffer, nonce: Buffer, length: number): Buffer {
  const blocks: Buffer[] = [];
  let produced = 0;
  for (let counter = 0; produced < length; counter++) {
    if (counter > 255) throw new Error("keystream request too long");
    const block = hmac(key, Buffer.concat([nonce, Buffer.from([counter])]));
    blocks.push(block);
    produced += block.length;
  }
  return Buffer.concat(blocks).subarray(0, length);
}

function xorBuffers(a: Buffer, b: Buffer): Buffer {
  const out = Buffer.allocUnsafe(a.length);
  for (let i = 0; i < a.length; i++) out[i] = a[i] ^ b[i];
  return out;
}

function sameBytes(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Builds a code. Exported mainly so a test can prove this file and the Apps
 * Script generator agree; production codes come from Apps Script.
 *
 * Throws rather than returning a bad code: a row that cannot be encoded should
 * end up in errors.csv, not on a label that never verifies.
 */
export function buildQrCode(
  productId: string,
  serial: string,
  date: string
): string {
  if (!PRODUCT_ID_RE.test(productId)) {
    throw new Error(`productId must match ${PRODUCT_ID_RE}: "${productId}"`);
  }
  if (!SERIAL_RE.test(serial)) {
    throw new Error(`serial must match ${SERIAL_RE}: "${serial}"`);
  }

  const pt = `${productId}.${serial}`;
  if (pt.length > 255) {
    throw new Error(`payload too long (${pt.length} characters, max 255)`);
  }

  const packed = pack6(pt);
  if (!packed) throw new Error(`payload outside CHARSET: "${pt}"`);

  const sig = hmac(getSigningSecret(), `${pt}.${date}`).subarray(0, SIG_BYTES);
  const ct = xorBuffers(packed, keystream(encryptionKey(), sig, packed.length));

  return base32Encode(Buffer.concat([Buffer.from([pt.length]), ct, sig]));
}

/** Reads the `code` path segment from /verify/<code>. Accepts both formats. */
export function parseQrCode(code: string): ParsedQrCode | null {
  if (!code) return null;
  if (OPAQUE_CODE.test(code)) return parseOpaque(code);

  // Legacy: base64url({p,s}).hex
  const separatorIndex = code.lastIndexOf(".");
  if (separatorIndex === -1) return null;
  const payloadB64 = code.slice(0, separatorIndex);
  const signature = code.slice(separatorIndex + 1);
  if (!payloadB64 || !LEGACY_SIG.test(signature)) return null;

  try {
    const decoded = Buffer.from(payloadB64, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded);
    if (typeof parsed.p !== "string" || typeof parsed.s !== "string") {
      return null;
    }
    return { productId: parsed.p, serial: parsed.s, signature };
  } catch {
    return null;
  }
}

function parseOpaque(code: string): ParsedQrCode | null {
  const blob = base32Decode(code);
  if (!blob) return null;
  // At minimum: one length byte, one byte of ciphertext, the signature.
  if (blob.length < 2 + SIG_BYTES) return null;

  const ptLength = blob[0];
  const ct = blob.subarray(1, blob.length - SIG_BYTES);
  const sig = blob.subarray(blob.length - SIG_BYTES);

  // The declared length and the actual ciphertext must agree, otherwise the
  // length byte alone could be edited to shift where the payload ends.
  if (ptLength === 0 || packedLength(ptLength) !== ct.length) return null;

  const packed = xorBuffers(ct, keystream(encryptionKey(), sig, ct.length));
  const pt = unpack6(packed, ptLength);

  // Re-pack and require an exact match.
  //
  // 6 bits per character rarely lands on a byte boundary: a 38-character
  // payload uses 228 of the 232 bits in 29 bytes, leaving 4 bits that decode
  // to nothing. Without this check those bits are free, so 15 different codes
  // decrypt to the same payload with the same signature and all 16 verify as
  // the same unit. Comparing against a fresh pack6 - which always pads with
  // zeros - is what makes the encoding one-to-one.
  const repacked = pack6(pt);
  if (!repacked || !repacked.equals(packed)) return null;

  const dot = pt.indexOf(".");
  if (dot <= 0 || dot === pt.length - 1) return null;

  const productId = pt.slice(0, dot);
  const serial = pt.slice(dot + 1);
  if (!PRODUCT_ID_RE.test(productId) || !SERIAL_RE.test(serial)) return null;

  return { productId, serial, signature: base32Encode(sig) };
}

/**
 * Confirms the code was issued against the transaction date Accurate now
 * reports for this serial. This is the check that actually protects the
 * system; everything above only decides what gets looked up.
 */
export function verifyQrSignature(
  payload: QrPayload,
  signature: string
): boolean {
  const message = `${payload.productId}.${payload.serial}.${payload.timestamp}`;
  const full = hmac(getSigningSecret(), message);

  const expected = LEGACY_SIG.test(signature)
    ? full.toString("hex")
    : base32Encode(full.subarray(0, SIG_BYTES));

  return sameBytes(
    Buffer.from(expected, "utf8"),
    Buffer.from(signature, "utf8")
  );
}