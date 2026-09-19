import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Us | K B Financial Services",
  description: "Discover why K B Financial Services is the right partner for your financial journey in Varanasi.",
};

export default function WhyUsPage() {
  return (
    <main className="pt-24 pb-12 bg-white min-h-screen">
      <WhyChooseUs />
    </main>
  );
}
