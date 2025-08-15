import PartnerPage from "@/components/partner";
import { Partner } from "@/types";
import { notFound, redirect, useSearchParams } from "next/navigation";

export const revalidate = 86400; // enable ISR caching

export default async function Partners({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const page: number = +(params.page || 1);
  const query: string = params.query || "";
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/partners?limit=9&page=${page}&where[name][contains]=${query}`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );
  if (!response.ok) {
    // redirect to not found page
    notFound();
  }
  const data = await response.json();
  const pageCount = data.totalPages;
  if(page < 1 || page > pageCount) {
    // invalid page param, redirect to default partners page
    redirect('/partners')
  }
  const partners: Partner[] = data.docs;
  return <PartnerPage partners={partners} pageCount={pageCount} />;
}
