import DashboardComponent from "@/components/dashboard";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async () => {
  const response = await fetch(`${BASE_URL}/api/products?doc_limit=3`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    // redirect 404 no connection?
    console.log(response);
    return { props: { products: [], status: response.ok } };
  }
  const data = await response.json();
  const products = ((data && data.products) ?? []) as Product[];
  return { props: { products, status: response.ok } };
}) satisfies GetServerSideProps<{ products: Product[]; status: boolean }>;

const Dashboard = async () => {
  const {
    props: { products, status },
  } = await getServerSideProps();
  if (!status) {
    // redirect 404 no connection?
    return <></>;
  }
  return <DashboardComponent products={products} />;
};

export default Dashboard;
