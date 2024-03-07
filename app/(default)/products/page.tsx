import ProductsCarousel from "@/components/products-carousel";
import { db } from "@/firebase.config";
import { Product } from "@/types";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductsPage = () => {

  return (
    <ProductsCarousel
      options={{ loop: true, align: "center" }}
    />
  );
};

export default ProductsPage;
