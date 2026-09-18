"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "Transparent guidance" },
  { icon: BadgeCheck, label: "Customer-first process" },
  { icon: MapPin, label: "Based in Varanasi" },
];

export default function Hero() {
  return (
    <section className="relative -mt-[72px] min-h-[100svh] overflow-hidden bg-[#061526] text-white">
      <Image
        src="/images/hero.jpg"
        alt="Financial advisory consultation"
        fill
        priority
        className="object-cover object-center scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,18,36,0.94)_0%,rgba(10,37,64,0.88)_46%,rgba(10,37,64,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

      <motion.div
        aria-hidden
        animate={{ y: [0, 24, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-[12%] h-80 w-80 rounded-full bg-[#1952B3]/30 blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 pb-28 md:pt-40 md:pb-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm text-white/90 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              Trusted financial partner in Varanasi
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Practical finance.
              <span className="mt-1 block bg-gradient-to-r from-[#F3D77A] via-[#D4AF37] to-[#C19B2E] bg-clip-text text-transparent">
                Clearer decisions.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-blue-100/90 md:text-lg">
              K B Financial Services helps individuals and businesses explore
              loans, planning, and protection with honest guidance — not
              confusing jargon.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex h-13 w-full items-center justify-center gap-1 rounded-full bg-[#D4AF37] px-8 text-base font-semibold text-[#0A2540] shadow-[0_10px_40px_rgba(212,175,55,0.35)] hover:bg-[#C19B2E] sm:w-auto"
              >
                Talk to an Expert
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-13 w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15 sm:w-auto"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-blue-100/90">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <Icon className="h-4 w-4 text-[#D4AF37]" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/hero.jpg"
                  alt="Advisor discussing a financial plan"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 480px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061526] via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="rounded-2xl border border-white/15 bg-[#0A2540]/70 p-4 backdrop-blur-xl">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D4AF37]">
                    Personalised plans
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Home, business & personal finance
                  </p>
                  <p className="mt-1 text-sm text-blue-100/80">
                    Eligibility and terms depend on the lender.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 top-10 hidden rounded-2xl border border-white/15 bg-white p-4 shadow-2xl sm:block lg:-left-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Quick enquiry
              </p>
              <p className="mt-1 text-lg font-bold text-[#0A2540]">Same-day callback</p>
              <Link
                href="tel:7081000063"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#1952B3]"
              >
                <Phone className="h-4 w-4" />
                7081000063
              </Link>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-[46%] hidden rounded-2xl border border-white/20 bg-[#0A2540]/80 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:block lg:-right-6"
            >
              <p className="text-xs text-blue-100/80">Serving Varanasi</p>
              <p className="font-semibold">Andhrapool, National Market</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
}
