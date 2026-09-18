"use client";

import { motion } from "framer-motion";
import { MessageSquare, HeartHandshake, Award, Zap, Headphones, Map, Lock, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: <MessageSquare className="w-8 h-8 text-[#D4AF37]" />,
    title: "Transparent Communication",
    description: "Clear and honest discussions about your financial options.",
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-[#D4AF37]" />,
    title: "Customer-Centric",
    description: "Your needs and goals are at the center of everything we do.",
  },
  {
    icon: <Award className="w-8 h-8 text-[#D4AF37]" />,
    title: "Professional Assistance",
    description: "Expert guidance from experienced financial professionals.",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#D4AF37]" />,
    title: "Simple Process",
    description: "Streamlined procedures to save your time and effort.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-[#D4AF37]" />,
    title: "Responsive Support",
    description: "Always here to answer your queries and provide updates.",
  },
  {
    icon: <Map className="w-8 h-8 text-[#D4AF37]" />,
    title: "Local Understanding",
    description: "Deep understanding of the Varanasi market and local needs.",
  },
  {
    icon: <Lock className="w-8 h-8 text-[#D4AF37]" />,
    title: "Secure Handling",
    description: "Utmost privacy and security for your sensitive information.",
  },
  {
    icon: <FileCheck className="w-8 h-8 text-[#D4AF37]" />,
    title: "Documentation Guidance",
    description: "Step-by-step help with complex paperwork and forms.",
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">Why K B Financial Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
            The Right Partner for Your Financial Journey
          </h3>
          <p className="text-gray-600 text-lg">
            We differentiate ourselves through unwavering commitment to our clients, combining professional expertise with a personalized approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="h-full border-none bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-[#1952B3]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#0A2540] mb-3">{reason.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
