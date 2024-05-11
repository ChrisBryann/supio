import { NextResponse, URLPattern } from "next/server";
import type { NextRequest } from "next/server";
import { Product } from "./types";
import { cookies } from "next/headers";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

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

// prevent API route attacks, by either:
// 1. rate limit using upstash with Vercel KV store
// 2. use Cloudflare DNS Proxy to protect any incoming request by passing through cloudflare first and preventing DDoS
// 3. crsf token? using x-hub-signature-sha256

// we can have crsf token (like above) to ensure only client is able to access api route, but not useful if data is meant to be public
// we can instead use NextAuth to secure api routes that changes state of data (CRUD).

// export async function middleware(request: NextRequest) {
//   console.log("in middleware");

//   // if (request.nextUrl.pathname.includes("/signin")) {
//   //   console.log("in signin");

//   //   // if a user is already logged in and still tries to access the /signin url, redirect them back to dashboard
//   //   try {
//   //     // verify if the token_id stored in context or cookies is still valid (using firebase) by calling the api route

//   //     await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
//   //       headers: {
//   //         Accept: "application/json",
//   //         "Content-Type": "application/json",
//   //       },
//   //       method: "POST",
//   //       body: JSON.stringify({
//   //         user: cookies().get("user")!.value,
//   //       }),
//   //     });
//   //     return NextResponse.redirect(new URL("/dashboard", request.url));
//   //   } catch (error) {
//   //     console.error("Error fetching product data:", error);
//   //     return NextResponse.next();
//   //   }
//   // }

//   // if (request.nextUrl.pathname.includes("/dashboard")) {
//   //   try {
//   //     // verify if the token_id stored in context or cookies is still valid (using firebase) by calling the api route
//   //     await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
//   //       headers: {
//   //         Accept: "application/json",
//   //         "Content-Type": "application/json",
//   //       },
//   //       method: "POST",
//   //       body: JSON.stringify({
//   //         user: cookies().get("user")!.value,
//   //       }),
//   //     });
//   //   } catch (error) {
//   //     console.error("Error fetching product data:", error);
//   //     return NextResponse.redirect(new URL("/", request.url));
//   //   }
//   // }
//   return NextResponse.next();
// }

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    const url = new URL("api/auth/signin", req.nextUrl.origin);
    url.searchParams.append("callbackUrl", req.nextUrl.href);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/products/add/:path", "/products/:path/edit", "/dashboard/:path*"],
};
