"use client";
import "@/app/css/style.css";

import { GeistSans } from "geist/font/sans";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

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
        className={`${GeistSans.variable} font-sans antialiased bg-white text-gray-900 tracking-tight`}
      >
        <div className="flex flex-col min-h-dvh overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
