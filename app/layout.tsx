import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import AppChrome from "@/components/layout/AppChrome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K B Financial Services | Financial Solutions in Varanasi",
  description: "K B Financial Services provides customer-focused financial assistance and guidance in Varanasi, Uttar Pradesh. Explore financial solutions, loan assistance and enquiry services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden w-full`}>
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
