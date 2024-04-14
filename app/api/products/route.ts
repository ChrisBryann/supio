import {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/services/products/products.service";
import { Product } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (request.nextUrl.searchParams.has("id")) {
      // GET /api/products?id=[product_id]
      const product = await getProductById(
        request.nextUrl.searchParams.get("id")!
      );
      return NextResponse.json(
        {
          product: product,
        },
        {
          status: 200,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } else if (
      request.nextUrl.searchParams.has("doc_limit") ||
      request.nextUrl.searchParams.size === 0
    ) {
      // GET /api/products
      const doc_limit = request.nextUrl.searchParams.has("doc_limit")
        ? +request.nextUrl.searchParams.get("doc_limit")!
        : 0;
      const products = await getProducts(doc_limit);
      return NextResponse.json(
        {
          products: products,
        },
        {
          status: 200,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // invalid GET requests
      return NextResponse.json(
        {},
        { status: 500, statusText: "Invalid request!" }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error: ${err}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body && body.product) {
      // POST /api/products BODY {product: Product}
      await addProduct(body.product as Product);
      return NextResponse.json(
        {},
        {
          status: 200,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error: ${err}`,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    if (body && body.product) {
      // PATCH /api/products BODY {product: Product}
      await updateProduct(body.product as Product);

      return NextResponse.json(
        {},
        {
          status: 200,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error: ${err}`,
      },
      { status: 500 }
    );
  }
}
