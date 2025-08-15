"use client";
import "@/app/css/style.css";

import { Inter } from "next/font/google";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: '500',
  variable: "--font-inter",
  display: "swap",
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-white text-gray-900 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          <main className="grow">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
