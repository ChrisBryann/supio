import AppLayout from "@/components/ui/app-layout";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "SCI Aesthetics | Revivsome Clinical Exosome for Skin Rejuvenation",
  description: "Discover Revivsome by SCI Aesthetics, a clinical-grade exosome treatment for glowing skin, acne scars, and anti-aging. Trusted by top aesthetic clinics in Indonesia.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
