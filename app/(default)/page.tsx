"use client"

// export const metadata = {
//   title: "Home - Simple",
//   description: "Page description",
// };

import Hero from "@/components/hero";

import Products from "@/components/products";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { auth, db } from "@/firebase.config";
import { Product } from "@/types";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log('called landing');
    
    setLoading(true);
    // get the products of supio
    getDocs(query(collection(db, "products"), limit(3)))
      .then((querySnapshot) => {
        console.log(`Query Snapshot: ${querySnapshot}`);
        
        let _products: Product[] = [];
        querySnapshot.forEach((snapshot) => {
          const data = snapshot.data();
          _products.push({
            ...(data as Product),
            id: snapshot.id,
          });
        });

        setProducts(_products);
      })
      .catch((err) => {
        console.log(err);
        
      })
      .finally(() => {
        setLoading(false);
      });

    // get the hero image
  }, []);

  return (
    !loading && (
      <>
        <Hero />
        <Products products={products} />
        {/* <FeaturesBlocks />
        <Testimonials /> */}
        {/* <Newsletter /> */}
      </>
    )
  );
}
