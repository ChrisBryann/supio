import { db } from "@/firebase.config";
import { Product } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
} from "firebase/firestore";

export const getProductById = async (
  product_id: string
): Promise<Product | null> => {
  try {
    const snapshot = await getDoc(doc(db, "products", product_id));
    return snapshot.exists()
      ? ({
          ...(snapshot.data() as Product),
          id: snapshot.id,
        } as Product)
      : null;
  } catch (err: any) {
    throw err;
  }
};

export const getProducts = async (doc_limit?: number): Promise<Product[]> => {
  try {
    const q = doc_limit
      ? query(collection(db, "products"), limit(doc_limit))
      : query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    let products: Product[] = [];
    querySnapshot.forEach((snapshot) => {
      const data = snapshot.data();
      products.push({
        ...(data as Product),
        id: snapshot.id,
      });
    });

    return products;
  } catch (err) {
    throw err;
  }
};

export const addProduct = async ({
  id,
  ...addedProduct
}: Product): Promise<void> => {
  try {
    await addDoc(collection(db, "products"), addedProduct);
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async ({
  id,
  ...updatedProduct
}: Product): Promise<void> => {
  try {
    await updateDoc(doc(db, "products", id), updatedProduct);
  } catch (err) {
    throw err;
  }
};
