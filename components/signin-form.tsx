"use client";
import { useAuth } from "@/store/AuthContext/context";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function SignInForm() {
  const authCtx = useAuth();
  const router = useRouter();
  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailRef.current &&
      passwordRef.current &&
      authCtx
        .logIn(emailRef.current.value, passwordRef.current.value)
        .then((userCred) => {

          userCred.user.uid && router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={onLogin}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    ref={emailRef}
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    {/* <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link> */}
                  </div>
                  <input
                    id="password"
                    type="password"
                    ref={passwordRef}
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              {/* <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-600 ml-2">Keep me signed in</span>
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
