import DashboardComponent from "@/components/dashboard";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";

export const dynamic = 'force-dynamic';

const Dashboard = async () => {
  const response = await fetch(
    `${BASE_URL}/api/products?doc_limit=3`,
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
