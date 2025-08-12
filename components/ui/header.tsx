"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import BrandLogo from "@/public/images/supio-logo.png";
import SCILogo from "@/public/images/sci-logo.png";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import { Button } from "./button";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`sticky top-0 w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      {/* <meta
        name="facebook-domain-verification"
        content="ygqa4w0f0kb092unqs1hcl9qgd5js9"
      /> */}
      <div className="flex items-center justify-between lg:justify-start gap-x-4 h-20 px-5 lg:px-16">
        {/* Site branding */}
        <Link href="/">
          <Image
            className="max-w-none mx-auto rounded hover:cursor-pointer"
            src={BrandLogo}
            width={200}
            height={200}
            alt="brand_logo"
          />
        </Link>

        {/* Site navigation links */}
        <div className="hidden lg:flex gap-x-2">
          {/* Desktop sign in links */}
          <Button
            asChild
            variant={"link"}
            className="text-md font-medium text-gray-900 hover:text-gray-600 px-5 py-3 transition duration-150 ease-in-out"
          >
            <Link href={"/"}>Home</Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className="text-md font-medium text-gray-900 hover:text-gray-600 px-5 py-3 transition duration-150 ease-in-out"
          >
            <Link href={"/products"}>Products</Link>
          </Button>
          {/* <Button
              asChild
              variant={"link"}
              className="text-md font-medium text-gray-900 hover:text-gray-600 px-5 py-3 transition duration-150 ease-in-out"
            >
              <Link href={"/events"}>Events</Link>
            </Button> */}
          <Button
            asChild
            variant={"link"}
            className="text-md font-medium text-gray-900 hover:text-gray-600 px-5 py-3 transition duration-150 ease-in-out"
          >
            <Link href={"/blogs"}>Blogs</Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className="text-md font-medium text-gray-900 hover:text-gray-600 px-5 py-3 transition duration-150 ease-in-out"
          >
            <Link href={"/partners"}>Partners</Link>
          </Button>
        </div>
        {/* Desktop navigation */}
        <MobileMenu />
      </div>
    </header>
  );
}
