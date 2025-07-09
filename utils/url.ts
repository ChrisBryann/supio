export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
