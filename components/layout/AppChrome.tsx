"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SiteContentProvider } from "@/components/content/SiteContentProvider";
import type { SiteContent } from "@/data/siteContent";
import { defaultSiteContent } from "@/data/siteContent";

export default function AppChrome({
  children,
  content = defaultSiteContent,
}: {
  children: React.ReactNode;
  content?: SiteContent;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <SiteContentProvider content={content}>
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </SiteContentProvider>
  );
}
