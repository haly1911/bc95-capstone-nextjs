import Hero from "@/components/become-a-seller/Hero";
import HowItWorks from "@/components/become-a-seller/HowItWorks";
import SellerCta from "@/components/become-a-seller/SellerCta";
import SellerFaq from "@/components/become-a-seller/SellerFaq";
import SellerTestimonials from "@/components/become-a-seller/SellerTestimonials";
import WhySell from "@/components/become-a-seller/WhySell";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BecomeASellerPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  if (token) {
    redirect("/seller-dashboard");
  }
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Hero />
      <HowItWorks />
      <WhySell />
      <SellerTestimonials />
      <SellerFaq />
      <SellerCta />
    </div>
  );
};

export default BecomeASellerPage;
