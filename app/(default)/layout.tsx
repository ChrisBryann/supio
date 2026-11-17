import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { AuthProvider } from "@/components/auth/auth-provider";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header
        instagramUrl={process.env.INSTAGRAM_URL}
        whatsappUrl={process.env.WHATSAPP_URL}
      />
      <main className="grow">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
