import { Metadata } from "next";
import { Briefcase, Home, Car, PiggyBank, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Loans | K B Financial Services",
  description: "Explore our comprehensive loan assistance programs including Personal, Business, Home, and Vehicle loans in Varanasi.",
};

const loans = [
  {
    id: "personal",
    icon: <PiggyBank className="w-12 h-12 text-[#1952B3]" />,
    title: "Personal Loans",
    tagline: "Funding for your personal aspirations and emergencies.",
    description: "Get quick and hassle-free personal loans to meet your immediate financial requirements. Whether it's for a medical emergency, a wedding, or a dream vacation, we connect you with the right lenders offering competitive interest rates.",
    features: ["Quick Approval Process", "Flexible Repayment Tenures", "Minimal Documentation", "Competitive Interest Rates"]
  },
  {
    id: "business",
    icon: <Briefcase className="w-12 h-12 text-[#1952B3]" />,
    title: "Business Loans",
    tagline: "Fuel your enterprise growth with the right capital.",
    description: "Expand your operations, purchase new machinery, or manage working capital efficiently. We assist SMEs and large businesses in Varanasi to secure the necessary funding tailored to their specific industry needs.",
    features: ["Working Capital Finance", "Machinery & Equipment Finance", "Unsecured Business Loans", "Customized Solutions for SMEs"]
  },
  {
    id: "home",
    icon: <Home className="w-12 h-12 text-[#1952B3]" />,
    title: "Home Loans",
    tagline: "Turn your dream of owning a home into a reality.",
    description: "Navigate the complex home buying process with our expert guidance. We help you find the best home loan options for purchasing a new house, constructing your own home, or renovating an existing property.",
    features: ["High Loan-to-Value Ratio", "Long Repayment Tenures", "Balance Transfer Options", "Expert Property Guidance"]
  },
  {
    id: "vehicle",
    icon: <Car className="w-12 h-12 text-[#1952B3]" />,
    title: "Vehicle Loans",
    tagline: "Drive home your dream car or two-wheeler.",
    description: "Whether you are looking to buy a new car, a used vehicle, or a two-wheeler, our vehicle loan assistance ensures you get the best deals, low EMIs, and a smooth application process.",
    features: ["Up to 100% Financing on Select Models", "Fast Disbursal", "New & Pre-owned Vehicle Options", "Flexible Repayment Options"]
  }
];

export default function LoansPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-20 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1952B3] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D4AF37] blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Loan Assistance Programs</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Find the perfect financial support tailored to your life goals and business objectives. We make borrowing simple and transparent.
          </p>
        </div>
      </section>

      {/* Loans Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loans.map((loan) => (
              <div 
                key={loan.id} 
                className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#E8F0FE] flex items-center justify-center">
                    {loan.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A2540]">{loan.title}</h3>
                    <p className="text-[#1952B3] font-medium text-sm mt-1">{loan.tagline}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                  {loan.description}
                </p>

                <div className="mb-8">
                  <h4 className="font-bold text-[#0A2540] mb-4">Key Benefits:</h4>
                  <ul className="space-y-3">
                    {loan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/contact?service=${loan.title}`}>
                  <Button className="w-full bg-[#1952B3] hover:bg-[#0A2540] text-white h-12 text-lg rounded-xl group mt-auto">
                    Apply for {loan.title}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1952B3] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure which loan is right for you?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Our financial experts are here to help you evaluate your options and choose the best loan product for your unique situation.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#1952B3] font-bold text-lg h-14 px-8 rounded-full">
              Speak with an Expert
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
