import Image from "next/image";
import BrandLogo from "@/public/images/supio-logo.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200 ">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4">
            <div className="mb-2">
              <Link href={"/"}>
                <Image
                  className="md:max-w-none rounded hover:cursor-pointer"
                  src={BrandLogo}
                  width={200}
                  height={200}
                  alt="brand_logo"
                  data-aos="zoom-y-out"
                />
              </Link>
            </div>
            {/* <div className="text-sm text-gray-600 pl-2">
              <a
                href="#0"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Terms
              </a>
              ·
              <a
                href="#0"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Privacy Policy
              </a>
            </div> */}
            <div className="text-sm text-gray-600 pl-2">
              <p className="text-gray-600">
                © Copyright 2024
                <br />
                <br />
                PT SUPIO COSMETICS
                <br />
                INDONESIA
              </p>
            </div>
          </div>

          {/* 2nd block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Products</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Web Studio
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  DynamicBox Flex
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Programming Forms
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Integrations
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Command-line
                </a>
              </li>
            </ul>
          </div> */}

          {/* 3rd block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Documentation
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Tutorials & Guides
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Support Center
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div> */}

          {/* 4th block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Company</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  About us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Company values
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div> */}

          {/* 5th block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-4 pl-2 lg:pl-0">
            <h6 className="text-gray-800 font-medium mb-2">Subscribe</h6>
            <p className="text-sm text-gray-600 mb-4">
              Join our email list for exclusive offers and the latest news.
            </p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label className="block text-sm sr-only" htmlFor="newsletter">
                    Email
                  </label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm"
                      placeholder="Your email"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute inset-0 left-auto"
                      aria-label="Subscribe"
                    >
                      <span
                        className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300"
                        aria-hidden="true"
                      ></span>
                      <svg
                        className="w-3 h-3 fill-current text-blue-600 mx-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                  Success message
                  <p className="mt-2 text-green-600 text-sm">Thanks for subscribing!</p>
                </div>
              </div>
            </form>
          </div> */}
        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          {/* Social as */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <a
                href="https://www.instagram.com/revivsome.id"
                className="flex justify-center items-center text-black hover:text-gray-700 bg-white hover:bg-white-100 transition duration-150 ease-in-out"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 50 50"
                >
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                </svg>
              </a>
            </li>
            {/* <li className="ml-4">
              <a
                href="#0"
                className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </a>
            </li>
            <li className="ml-4">
              <a
                href="#0"
                className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Facebook"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </a>
            </li> */}
          </ul>

          {/* Copyrights note */}
          {/* <div className="text-sm text-gray-600 mr-4">
            &copy; Cruip.com. All rights reserved.
          </div> */}
        </div>
      </div>
    </footer>
  );
}
