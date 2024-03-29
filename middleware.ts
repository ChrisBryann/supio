import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Product } from "./types";

async function getProductById(productId: string, origin: string, cookie: string) {
  try {
    console.log(productId, `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${productId}`)
    const res = await fetch(`${origin}/api/products/${productId}`, {
      headers: {
        cookie
      }
    })
    const data = await res.json();
    return !!data.product ? JSON.parse(data.product) : null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // Propagate the error so it can be handled elsewhere if needed
  }
}

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.includes("/products") &&
    request.nextUrl.pathname !== "/products"
  ) {
    const productId = request.nextUrl.pathname.split("/").pop() as string;

    try {
      const productData = await getProductById(productId, request.nextUrl.origin, request.headers.getSetCookie().join(';'));

      if (productData) {
        const headers = new Headers(request.headers);
        headers.set(
          "product",
          JSON.stringify({ ...(productData as Product), id: productId } as Product)
        );

        return NextResponse.next({
          request: {
            headers,
          },
        });
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/products/:path*"],
};