"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { Button } from "./button";

type Props = {
  instagramUrl?: string;
  whatsappUrl?: string;
};

export default function MobileMenu({ instagramUrl, whatsappUrl }: Props) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="flex lg:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger hamburger--collapse ${
          mobileNavOpen && "is-active"
        }`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
        {/* <svg className="w-6 h-6 fill-current text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg> */}
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2 space-y-8">
            <li>
              <Button
                  asChild
                  variant={"link"}
                  className="flex text-md font-medium mx-auto py-2"
                >
                  <Link
                    href={"/"}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Home
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={"link"}
                  className="flex text-md font-medium mx-auto py-2"
                >
                  <Link
                    href={"/products"}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Products
                  </Link>
                </Button>
                {/* <Button
                  asChild
                  variant={"link"}
                  className="flex text-md font-medium mx-auto py-2"
                >
                  <Link
                    href={"/events"}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Events
                  </Link>
                </Button> */}
                <Button
                  asChild
                  variant={"link"}
                  className="flex text-md font-medium mx-auto py-2"
                >
                  <Link
                    href={"/blogs"}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Blogs
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={"link"}
                  className="flex text-md font-medium mx-auto py-2"
                >
                  <Link
                    href={"/partners"}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Partners
                  </Link>
                </Button>
            </li>
            {(instagramUrl || whatsappUrl) && (
              <li className="flex justify-center gap-6 pt-4">
                {instagramUrl && (
                  <Link
                    href={instagramUrl}
                    target="_blank"
                    aria-label="Instagram"
                    onClick={() => setMobileNavOpen(false)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 50 50">
                      <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
                    </svg>
                  </Link>
                )}
                {whatsappUrl && (
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    aria-label="WhatsApp"
                    onClick={() => setMobileNavOpen(false)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.078 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </Link>
                )}
              </li>
            )}
            {/* <li>
              <Link href="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2" onClick={() => setMobileNavOpen(false)}>
                <span>Sign up</span>
                <svg className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fill="#999" fillRule="nonzero" />
                </svg>
              </Link>
            </li> */}
          </ul>
        </Transition>
      </div>
    </div>
  );
}
