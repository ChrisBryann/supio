import { db } from "@/firebase.config";
import { Product } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = params.productId;
    const snapshot = await getDoc(doc(db, "products", productId));
    return NextResponse.json(
      {
        product: snapshot.exists()
          ? JSON.stringify({
              ...(snapshot.data() as Product),
              id: snapshot.id,
            } as Product)
          : null,
      },
      {
        status: 200,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {},
      { status: 500, statusText: `Error fetching product data: ${err}` }
    );
  }
}
