import { parseQrCode, verifyQrSignature } from "@/lib/qr-token";
import { findStockRecord } from "@/lib/accurate";
import VerifyResult from "@/components/verify-result";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{
    code: string;
  }>;
};

const VerifyPage = async ({ params }: Params) => {
  const { code } = await params;

  const socialLinks = {
    instagram: process.env.INSTAGRAM_URL,
    website: "/",
  };

  const parsed = parseQrCode(code);
  if (!parsed) {
    console.warn("[verify] malformed code:", code);
    return <VerifyResult status="not-genuine" socialLinks={socialLinks} />;
  }

  let stock;
  try {
    stock = await findStockRecord(parsed.productId, parsed.serial);
  } catch (error) {
    console.error("[verify] Accurate lookup failed:", error);
    return <VerifyResult status="error" serial={parsed.serial} socialLinks={socialLinks} />;
  }

  if (!stock) {
    console.warn(
      "[verify] no stock record for product/serial:",
      parsed.productId,
      parsed.serial
    );
    return <VerifyResult status="not-genuine" serial={parsed.serial} socialLinks={socialLinks} />;
  }

  const signatureValid = verifyQrSignature(
    {
      productId: stock.productId,
      serial: stock.serial,
      timestamp: stock.timestamp,
    },
    parsed.signature
  );
  if (!signatureValid) {
    console.warn("[verify] signature mismatch for serial:", parsed.serial);
    return <VerifyResult status="not-genuine" serial={parsed.serial} socialLinks={socialLinks} />;
  }

  return (
    <VerifyResult
      status="genuine"
      serial={stock.serial}
      product={{ name: stock.productName, imageUrl: stock.productImageDataUri }}
      socialLinks={socialLinks}
    />
  );
};

export default VerifyPage;
