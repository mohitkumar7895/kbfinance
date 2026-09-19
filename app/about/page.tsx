"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function Footer() {
  const { footer, contact } = useSiteContent();

  return (
    <footer className="bg-[#061526] text-gray-300 py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
              {footer.brand} <span className="text-[#D4AF37]">{footer.brandAccent}</span>
            </h3>
            <p className="text-xs md:text-sm leading-relaxed mb-4 md:mb-6 text-gray-400">
              {footer.about}
            </p>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Our Services</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li><Link href="/services#personal" className="hover:text-[#D4AF37] transition-colors">Personal Loans</Link></li>
              <li><Link href="/services#business" className="hover:text-[#D4AF37] transition-colors">Business Loans</Link></li>
              <li><Link href="/services#home" className="hover:text-[#D4AF37] transition-colors">Home Loans</Link></li>
              <li><Link href="/services#vehicle" className="hover:text-[#D4AF37] transition-colors">Vehicle Loans</Link></li>
              <li><Link href="/services#planning" className="hover:text-[#D4AF37] transition-colors">Financial Planning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Contact Us</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0" />
                <span className="whitespace-pre-line">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-4 md:pt-6 md:mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs text-gray-500">
            &copy; {new Date().getFullYear()} K B Financial Services. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-[10px] md:text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
