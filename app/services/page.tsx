import { Metadata } from "next";
import { Briefcase, Home, Car, PiggyBank, Shield, LineChart, Landmark, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services | K B Financial Services",
  description: "Explore our wide range of financial services including personal loans, business loans, home loans, and financial planning in Varanasi.",
};

const allServices = [
  {
    id: "personal",
    icon: <PiggyBank className="w-12 h-12 text-[#1952B3]" />,
    title: "Personal Loans",
    description: "Whether you're planning a wedding, a dream vacation, or need funds for medical emergencies, our personal loan assistance is designed to provide you with flexible financial solutions. We guide you through the process, helping you understand eligibility and documentation requirements.",
  },
  {
    id: "business",
    icon: <Briefcase className="w-12 h-12 text-[#1952B3]" />,
    title: "Business Loans",
    description: "Fuel your business growth with the right financial support. We assist small and medium enterprises in Varanasi with business loan guidance. From working capital requirements to purchasing new equipment, we connect you with suitable options.",
  },
  {
    id: "home",
    icon: <Home className="w-12 h-12 text-[#1952B3]" />,
    title: "Home Loans",
    description: "Turn your dream of owning a home into reality. Our team provides comprehensive assistance for home financing requirements, whether you're buying a new property, building your own home, or renovating an existing one.",
  },
  {
    id: "vehicle",
    icon: <Car className="w-12 h-12 text-[#1952B3]" />,
    title: "Vehicle Loans",
    description: "Get behind the wheel faster with our vehicle loan assistance. We offer support for both two-wheeler and four-wheeler financing, helping you understand the terms, interest rates, and necessary paperwork.",
  },
  {
    id: "insurance",
    icon: <Shield className="w-12 h-12 text-[#1952B3]" />,
    title: "Insurance Assistance",
    description: "Protect what matters most. We provide guidance on selecting suitable insurance-related financial protection for you, your family, and your business assets, ensuring peace of mind for the future.",
  },
  {
    id: "planning",
    icon: <LineChart className="w-12 h-12 text-[#1952B3]" />,
    title: "Financial Planning",
    description: "Achieve your long-term goals with personalized financial guidance. We work with you to understand your current financial standing and future aspirations, helping you create a roadmap for a secure tomorrow.",
  },
  {
    id: "investment",
    icon: <Landmark className="w-12 h-12 text-[#1952B3]" />,
    title: "Investment Guidance",
    description: "Navigate the complex world of investments with confidence. We offer general financial guidance to help you understand various investment avenues and how they align with your risk appetite and goals.",
  },
  {
    id: "credit",
    icon: <CreditCard className="w-12 h-12 text-[#1952B3]" />,
    title: "Credit Assistance",
    description: "Improve your financial health with our credit assistance services. We support you in understanding your available credit options, managing existing debt, and taking steps towards better creditworthiness.",
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
            Comprehensive solutions tailored to your unique personal and business requirements.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-12">
            {allServices.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`flex flex-col md:flex-row gap-8 items-start bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#E8F0FE] flex items-center justify-center">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href={`/contact?service=${service.id}`}>
                    <Button variant="outline" className="border-[#1952B3] text-[#1952B3] hover:bg-[#1952B3] hover:text-white group">
                      Enquire Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-gray-500 max-w-4xl mx-auto border-t pt-8">
            * All products and services are subject to eligibility criteria, submission of required documentation, and the final decision of the respective lenders or financial institutions. K B Financial Services provides guidance and assistance to facilitate the process.
          </div>
        </div>
      </section>
    </div>
  );
}
