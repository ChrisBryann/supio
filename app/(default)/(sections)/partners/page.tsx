import PartnerPage from "@/components/partner";
import { Partner } from "@/types";
import { notFound } from "next/navigation";

export const revalidate = 86400; // enable ISR caching

export default async function Partners() {
  // Fetch all partners once; filtering, search and pagination happen
  // client-side (the catalogue is small), which keeps the region filter,
  // its dropdown options and pagination consistent with each other.
  const response = await fetch(
    `https://${process.env.BACKEND_URL}/api/partners?limit=1000&select[name]=true&select[partner_image]=true&select[location]=true`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );

  if (!response.ok) {
    console.error("BAD RESPONSE:", response.status, response.statusText);
    return notFound();
  }

  const data = await response.json();
  const partners: Partner[] = data.docs;
  return <PartnerPage partners={partners} />;
}
