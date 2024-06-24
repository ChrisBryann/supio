"use client";
import "@/app/css/style.css";

import { Inter, DM_Sans } from "next/font/google";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";
import { Metadata } from "next";
import AuthContext from "@/store/AuthContext/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-roboto",
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
        className={`${dm_sans.className} antialiased bg-white text-gray-900 tracking-tight`}
      >
        <AuthContext>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            <main className="grow">{children}</main>

            <Footer />
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
