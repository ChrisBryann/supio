import type { Metadata } from "next";
import MySeminars from "@/components/seminars/my-seminars";

export const metadata: Metadata = {
  title: "My Seminars",
  robots: { index: false, follow: false },
};

export default function MySeminarsPage() {
  return <MySeminars />;
}
