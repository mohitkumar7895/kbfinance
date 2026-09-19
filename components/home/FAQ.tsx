"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of loans do you provide?",
    answer: "We offer a wide range of loans including Personal Loans, Business Loans, Home Loans, and Vehicle Loans. We tailor the loan type to best suit your specific financial requirements."
  },
  {
    question: "What is the typical time taken for loan approval?",
    answer: "Loan approval times vary depending on the type of loan and completeness of your documentation. Generally, personal and vehicle loans can be approved within 2-3 working days, while home and business loans might take a week."
  },
  {
    question: "Do I need collateral for all loans?",
    answer: "No. Personal loans and certain types of business loans are unsecured and do not require collateral. However, home loans and vehicle loans are secured against the respective assets."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">Common Questions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">Frequently Asked Questions</h3>
          <p className="text-gray-600">
            Find quick answers to common queries about our financial services and loan processes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-200 py-2">
                <AccordionTrigger className="text-left text-lg font-semibold text-[#0A2540] hover:text-[#1952B3] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
