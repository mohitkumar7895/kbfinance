"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Personal Finance",
    heading: "Practical finance. Clearer decisions.",
    desc: "K B Financial Services helps individuals explore loans, planning, and protection with honest guidance.",
    image: "/images/hero-1.jpg",
    link: "/services/personal",
    buttonText: "Start Planning"
  },
  {
    id: 2,
    title: "Business Growth",
    heading: "Strategic advisory for your business.",
    desc: "Comprehensive financial solutions designed for business expansion and working capital management.",
    image: "/images/hero-2.jpg",
    link: "/services/business",
    buttonText: "Grow Your Business"
  },
  {
    id: 3,
    title: "Market Trends",
    heading: "Data-driven insights for investment.",
    desc: "Make informed investment decisions with our expert guidance and personalized financial planning.",
    image: "/images/hero-3.jpg",
    link: "/services/markets",
    buttonText: "Explore Markets"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative -mt-[72px] h-[100svh] w-full overflow-hidden bg-[#061526]">
      <AnimatePresence>
        {heroSlides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#061526]/90 via-[#061526]/60 to-transparent" />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex items-center pt-20">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={`text-${slide.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="max-w-3xl absolute"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md mb-6 uppercase tracking-wider font-medium">
                  {slide.title}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6 drop-shadow-xl">
                  {slide.heading.split('.').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-[#D4AF37]">.</span>}
                      {i === 0 && <br className="hidden sm:block" />}
                    </span>
                  ))}
                </h1>
                
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed drop-shadow-md">
                  {slide.desc}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link 
                    href={slide.link}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 text-base font-semibold text-[#0A2540] shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all hover:bg-[#C19B2E] hover:scale-105"
                  >
                    {slide.buttonText}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link 
                    href="/contact"
                    className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4 hidden sm:flex">
        <button 
          onClick={prevSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#D4AF37] hover:text-[#0A2540] hover:border-[#D4AF37]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#D4AF37] hover:text-[#0A2540] hover:border-[#D4AF37]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? "w-10 bg-[#D4AF37]" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
