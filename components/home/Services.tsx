"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, Home, Car, PiggyBank, Shield, LineChart, Landmark, CreditCard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <PiggyBank className="w-6 h-6 text-[#1952B3]" />,
    title: "Personal Loans",
    description: "Flexible financial assistance with a guided application process tailored to individual requirements.",
    link: "/services#personal"
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#1952B3]" />,
    title: "Business Loans",
    description: "Financial solutions designed for business requirements, expansion, and working capital.",
    link: "/services#business"
  },
  {
    icon: <Home className="w-6 h-6 text-[#1952B3]" />,
    title: "Home Loans",
    description: "Assistance for home financing requirements, whether buying, building, or renovating.",
    link: "/services#home"
  },
  {
    icon: <Car className="w-6 h-6 text-[#1952B3]" />,
    title: "Vehicle Loans",
    description: "Support for vehicle financing to help you get the car or commercial vehicle you need.",
    link: "/services#vehicle"
  },
  {
    icon: <Shield className="w-6 h-6 text-[#1952B3]" />,
    title: "Insurance Assistance",
    description: "Guidance for suitable insurance-related financial protection for you and your assets.",
    link: "/services#insurance"
  },
  {
    icon: <LineChart className="w-6 h-6 text-[#1952B3]" />,
    title: "Financial Planning",
    description: "Personalized financial guidance based on customer requirements and future goals.",
    link: "/services#planning"
  },
  {
    icon: <Landmark className="w-6 h-6 text-[#1952B3]" />,
    title: "Investment Guidance",
    description: "General financial guidance and information to help you navigate investment options.",
    link: "/services#investment"
  },
  {
    icon: <CreditCard className="w-6 h-6 text-[#1952B3]" />,
    title: "Credit Assistance",
    description: "Support for understanding available credit options and improving financial health.",
    link: "/services#credit"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
            Comprehensive Financial Solutions
          </h3>
          <p className="text-gray-600 text-lg">
            Explore our wide range of services designed to meet your specific financial requirements. 
            All products are subject to eligibility, documentation, and lender terms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full cursor-pointer border-none bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="p-5 pb-2">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8FAFC] transition-colors group-hover:bg-[#1952B3]/10">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg text-[#0A2540]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <CardDescription className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </CardDescription>
                  <Link href={service.link}>
                    <Button variant="link" className="p-0 text-[#1952B3] font-semibold text-sm group-hover:text-[#0A2540] h-auto">
                      Learn More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
