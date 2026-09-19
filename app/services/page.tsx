import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | K B Financial Services",
  description: "Explore our wide range of financial services including Investment, Insurance, Tax Planning, and Loans in Varanasi.",
};

const allServices = [
  {
    id: "investment",
    title: "Investment Planning",
    subtitle: "Maximize returns with customized investment strategies in stocks, mutual funds, and more.",
    bullets: [
      "Mutual Fund Advisory",
      "Stock Market Insights",
      "Real Estate Investment Guidance"
    ],
    buttonText: "Start Investing Today!",
    image: "/images/service-investment.jpg"
  },
  {
    id: "insurance",
    title: "Insurance & Risk Management",
    subtitle: "Safeguard your family and assets with the right insurance policies.",
    bullets: [
      "Life Insurance",
      "Health & Medical Insurance",
      "Property & Business Insurance"
    ],
    buttonText: "Find the Best Insurance Plan!",
    image: "/images/service-insurance.jpg"
  },
  {
    id: "tax",
    title: "Tax & Retirement Planning",
    subtitle: "Smart tax-saving investments and retirement plans for a worry-free future.",
    bullets: [
      "Income Tax Planning",
      "Retirement Corpus Planning",
      "EPF, PPF, and Pension Advisory"
    ],
    buttonText: "Plan for a Secure Retirement!",
    image: "/images/service-tax.jpg"
  },
  {
    id: "loans",
    title: "Loans & Credit Advisory",
    subtitle: "Get the best deals on home loans, personal loans, and business credit solutions.",
    bullets: [
      "Home & Auto Loans",
      "Business & Personal Loans",
      "Credit Score Improvement"
    ],
    buttonText: "Find the Best Loan Options!",
    image: "/images/service-loans.jpg"
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Financial Services</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Helping You Build Wealth & Security with comprehensive solutions.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {allServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-[#e4ebf5] rounded-3xl overflow-hidden shadow-md flex flex-col border border-white/50 scroll-mt-24"
              >
                <div className="relative h-72 md:h-80 w-full p-4 pb-0">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-4">{service.title}</h3>
                  <p className="text-[#0A2540]/80 text-base md:text-lg mb-6 font-medium leading-relaxed">
                    "{service.subtitle}"
                  </p>
                  <ul className="mb-10 space-y-3 flex-grow">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start text-base text-[#0A2540]/90">
                        <span className="mr-3 text-[#0A2540] text-[10px] mt-2">●</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/contact?service=${service.id}`} className="w-full">
                    <Button className="w-full bg-[#1952B3] hover:bg-[#123e8a] text-white rounded-full py-7 text-base font-semibold transition-colors duration-300 group">
                      {service.buttonText}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center text-sm text-gray-500 max-w-4xl mx-auto border-t pt-8">
            * All products and services are subject to eligibility criteria, submission of required documentation, and the final decision of the respective lenders or financial institutions. K B Financial Services provides guidance and assistance to facilitate the process.
          </div>
        </div>
      </section>
    </div>
  );
}
