import Calculator from "@/components/home/Calculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator | K B Financial Services",
  description: "Calculate your estimated monthly EMI for loans with our interactive financial calculator.",
};

export default function CalculatorPage() {
  return (
    <main className="pt-24 pb-12 bg-white min-h-screen">
      <Calculator />
    </main>
  );
}
