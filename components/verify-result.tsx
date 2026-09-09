"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import BrandLogo from "@/public/images/brand-logo-colored.png";

type VerifyStatus = "genuine" | "not-genuine" | "error";

type Props = {
  status: VerifyStatus;
  serial?: string;
  product?: {
    name: string;
    imageUrl: string | null;
  };
  socialLinks?: {
    instagram?: string;
    website?: string;
  };
};

const STATUS_COPY: Record<VerifyStatus, { label: string; className: string }> = {
  genuine: {
    label: "This Product is Authentic",
    className: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
  },
  "not-genuine": {
    label: "We Couldn't Verify This Product",
    className: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
  },
  error: {
    label: "Verification Unavailable Right Now",
    className: "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20",
  },
};

export default function VerifyResult({ status, serial, product, socialLinks }: Props) {
  const { label, className } = STATUS_COPY[status];

  return (
    <>
      {/* Pinned to the true visual viewport (immune to 100vh/100dvh edge
          cases on iOS Safari) so the background always reaches every edge,
          independent of how tall the content below happens to be. */}
      <div
        className="fixed inset-0 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-purple-50"
        aria-hidden="true"
      />
      <div
        className="relative min-h-dvh overflow-hidden flex flex-col items-center px-6"
        style={{
          paddingTop: "calc(1rem + env(safe-area-inset-top))",
          paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))",
        }}
      >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute -top-24 -left-24 pointer-events-none w-[360px] h-[360px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.5) 0%, rgba(56,189,248,0.3) 45%, rgba(255,255,255,0) 72%)",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        className="absolute -bottom-32 -right-24 pointer-events-none w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(147,51,234,0.3) 45%, rgba(255,255,255,0) 72%)",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      />

      <Image
        src={BrandLogo}
        alt="Supio Cosmetics Indonesia"
        width={250}
        height={80}
        priority
        className="relative"
      />

      <div className="relative w-full max-w-md flex flex-col items-center mt-4 sm:mt-6">
        {product?.imageUrl && (
          <div className="relative mb-8 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 pointer-events-none w-[500px] h-[500px] max-w-[90vw] max-h-[90vw] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(125,211,252,0.55) 0%, rgba(147,51,234,0.4) 45%, rgba(255,255,255,0) 72%)",
                transform: "translate(-50%, -50%) translateZ(0)",
                willChange: "transform, opacity",
              }}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
                {/* Plain img: Accurate's image host can change (see docs), so it
                    isn't safe to hardcode into next.config.mjs remotePatterns. */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width={480}
                  height={480}
                  className="rounded-md object-contain max-w-[300px] max-h-[300px] w-full"
                />
              </div>
            </motion.div>
          </div>
        )}

        <div className="flex flex-col items-center text-center gap-2">
          {product?.name && (
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          )}
          {serial && <p className="text-gray-500 tracking-wide">{serial}</p>}

          <span
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${className}`}
          >
            {status === "genuine" && (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {label}
          </span>

          <p className="mt-6 text-xs text-gray-400">
            Distributed officially by PT. Supio Cosmetics Indonesia
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full mt-8">
          {socialLinks?.instagram && (
            <Link
              href={socialLinks.instagram}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-sm font-medium text-gray-800 shadow-sm hover:shadow-md transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 50 50" fill="currentColor">
                <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
              </svg>
              Instagram
            </Link>
          )}
          {socialLinks?.website && (
            <Link
              href={socialLinks.website}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-sm font-medium text-gray-800 shadow-sm hover:shadow-md transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" />
              </svg>
              Website
            </Link>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
