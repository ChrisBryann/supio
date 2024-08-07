"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import BrandLogo from "@/public/images/brand-logo.png";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import { useAuth } from "@/store/AuthContext/_context";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const { data: session, status } = useSession();
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
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <meta name="facebook-domain-verification" content="ygqa4w0f0kb092unqs1hcl9qgd5js9" />
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between gap-x-2 h-16 md:h-20">
          {/* Site branding */}
          <div className="flex flex-col items-center gap-x-2 shrink-0">
            <Link href="/">
              <Image
                className="md:max-w-none mx-auto rounded hover:cursor-pointer"
                src={BrandLogo}
                width={200}
                height={200}
                alt="brand_logo"
              />
            </Link>
          </div>

          {/* Site navigation links */}
          {/* <div className="hidden md:flex flex-col items-center gap-x-2 grow">
            <Link />
          </div> */}

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            {session && (
              <ul className="pl-4 flex grow justify-between flex-wrap items-center">
                <li>
                  <Link
                    href={"/dashboard"}
                    className="font-medium text-gray-900 hover:text-gray-600 px-5 py-3 transition duration-150 ease-in-out"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            )}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <p
                  onClick={() => {
                    !!session
                      ? signOut({
                          callbackUrl: "/",
                        })
                      : signIn("", {
                          callbackUrl: "/dashboard",
                        });
                  }}
                  className="font-medium text-gray-900 hover:text-gray-600 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer"
                >
                  {!!session ? "Sign out" : "Sign in"}
                </p>
              </li>
              {/* <li>
                <Link
                  href="/signup"
                  className="btn-sm text-gray-200 bg-gray-600 hover:bg-gray-800 ml-3"
                >
                  <span>Sign up</span>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </Link>
              </li> */}
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
