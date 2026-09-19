"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryModal from "./EnquiryModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Loans", href: "/loans" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "FAQ", href: "/#faq" },
  { name: "Calculator", href: "/calculator" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const currentPath = ready ? pathname : "";
  const transparent = ready && pathname === "/" && !isScrolled && !isMobileMenuOpen;

  const linkClass = transparent
    ? "text-sm font-medium text-white/80 hover:text-white transition-colors"
    : "text-sm font-medium text-[#0A2540]/80 hover:text-[#1952B3] transition-colors";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent py-5"
          : "border-b border-black/5 bg-white/90 py-3 shadow-sm backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37] text-sm font-bold text-[#0A2540]">
              KB
            </span>
            <span
              className={`truncate text-sm font-bold tracking-tight sm:text-base ${
                transparent ? "text-white" : "text-[#0A2540]"
              }`}
            >
              Financial <span className="text-[#D4AF37]">Services</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {navLinks.map((link) => {
              const active = currentPath === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${linkClass} ${
                    active ? (transparent ? "text-white" : "text-[#1952B3]") : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {/* <Link
              href="/login"
              className={`inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium ${
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#0A2540] hover:bg-black/5"
              }`}
            >
              Login
            </Link> */}
            <EnquiryModal 
              triggerText="Get Started"
              triggerClassName="inline-flex h-8 items-center rounded-full bg-[#1952B3] px-5 text-sm font-medium text-white hover:bg-[#0A2540]"
            />
          </div>

          <button
            type="button"
            className={`lg:hidden ${transparent ? "text-white" : "text-[#0A2540]"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-black/5 bg-white lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-[#0A2540] hover:text-[#1952B3]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-3 border-t pt-4">
                {/* <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 text-sm font-medium text-[#0A2540]"
                >
                  Login
                </Link> */}
                <EnquiryModal
                  triggerText="Get Started"
                  triggerClassName="inline-flex h-10 items-center justify-center rounded-full bg-[#1952B3] text-sm font-medium text-white hover:bg-[#0A2540] w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
