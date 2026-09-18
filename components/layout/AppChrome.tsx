"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
