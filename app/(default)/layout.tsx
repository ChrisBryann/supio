import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        instagramUrl={process.env.INSTAGRAM_URL}
        whatsappUrl={process.env.WHATSAPP_URL}
      />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
