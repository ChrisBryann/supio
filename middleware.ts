import { NextResponse, URLPattern } from "next/server";
import type { NextRequest } from "next/server";
import { Product } from "./types";
import { cookies } from "next/headers";

// async function getProductById(productId: string, origin: string) {
//   try {
//     const res = await fetch(`${origin}/api/products/${productId}`);
//     const data = await res.json();
//     return !!data.product ? JSON.parse(data.product) : null;
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     throw error; // Propagate the error so it can be handled elsewhere if needed
//   }
// }

export async function middleware(request: NextRequest) {
  console.log("in middleware");

  if (request.nextUrl.pathname.includes("/signin")) {
    console.log("in signin");

    // if a user is already logged in and still tries to access the /signin url, redirect them back to dashboard
    try {
      // verify if the token_id stored in context or cookies is still valid (using firebase) by calling the api route

      await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user: cookies().get("user")!.value,
        }),
      });
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      console.error("Error fetching product data:", error);
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.includes("/dashboard")) {
    try {
      // verify if the token_id stored in context or cookies is still valid (using firebase) by calling the api route
      await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user: cookies().get("user")!.value,
        }),
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/dashboard/:path*", "/signin"],
};
