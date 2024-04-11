import DashboardComponent from "@/components/dashboard";
import { Product } from "@/types";

const Dashboard = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products?doc_limit=3`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    // redirect 404 no connection?
    return <></>;
  }
  const data = await response.json();
  const products = ((data && data.products) ?? []) as Product[];
  return <DashboardComponent products={products} />;
};

export default Dashboard;
