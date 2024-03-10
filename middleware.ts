import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "./firebase.config";
import { Product } from "./types";

async function getProductById(productId: string) {
  try {
    const snapshot = await getDoc(doc(db, "products", productId));
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // Propagate the error so it can be handled elsewhere if needed
  }
}

export async function middleware(request: NextRequest) {
  console.log('called');
  // if (
  //   request.nextUrl.pathname.includes("/products") &&
  //   request.nextUrl.pathname !== "/products"
  // ) {
  //   const productId = request.nextUrl.pathname.split("/").pop() as string;

  //   try {
  //     const productData = await getProductById(productId);

  //     if (productData) {
  //       const headers = new Headers(request.headers);
  //       headers.set(
  //         "product",
  //         JSON.stringify({ ...(productData as Product), id: productId } as Product)
  //       );

  //       return NextResponse.next({
  //         request: {
  //           headers,
  //         },
  //       });
  //     } else {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   } catch (error) {
  //     console.error("Error processing request:", error);
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/products/:path*"],
};