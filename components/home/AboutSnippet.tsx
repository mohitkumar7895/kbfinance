"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutSnippet() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* About Us Company Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] flex items-center justify-center border border-gray-100">
               <div className="absolute inset-0 bg-[url('/images/about.jpg')] bg-cover bg-center transition-transform duration-500 hover:scale-105"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
              Committed to Your Financial Well-being
            </h3>
            
            <div className="space-y-6 text-gray-600 text-lg mb-8 leading-relaxed">
              <p>
                Located in the heart of Varanasi at Andhrapool, <strong>K B Financial Services</strong> is dedicated to helping individuals and businesses navigate their financial journeys with confidence. 
              </p>
              <p>
                Led by Sanjay Kumar Rawat, our team believes in a customer-first approach. We understand that financial decisions can be complex, which is why we focus on providing transparent, clear, and professional assistance tailored to your unique requirements.
              </p>
              <p>
                Whether you're looking for personal financial support, looking to expand your business, or seeking guidance on securing a home loan, we are here to simplify the process and connect you with the right solutions.
              </p>
            </div>

            <div className="mb-8 border-l-4 border-[#D4AF37] pl-4 bg-gray-50 py-3 pr-4 rounded-r-lg">
              <h4 className="text-[#0A2540] font-bold mb-1">Our Mission</h4>
              <p className="text-gray-600 text-sm">To empower our clients with transparent financial guidance and seamless service, ensuring their long-term growth and success.</p>
            </div>

            <Link href="/about">
              <Button size="lg" variant="outline" className="border-[#1952B3] text-[#1952B3] hover:bg-[#1952B3] hover:text-white font-semibold text-lg h-14 px-8 rounded-full">
                Read Our Full Story
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
