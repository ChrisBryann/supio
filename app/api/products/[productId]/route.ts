import { db } from "@/firebase.config";
import { Product } from "@/types";
import { doc, getDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = params.productId;
    const snapshot = await getDoc(doc(db, "products", productId));
    return Response.json({
      product: snapshot.exists()
        ? JSON.stringify({
            ...(snapshot.data() as Product),
            id: snapshot.id,
          } as Product)
        : null,
    });
  } catch (err) {
    return Response.json(
      {},
      { status: 500, statusText: `Error fetching product data: ${err}` }
    );
  }
}
