"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LogOut, Users, FileText, Settings, Activity, 
  LayoutDashboard, Bell, Search, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const sidebarNavItems = [
  { title: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/admin" },
  { title: "Customers", icon: <Users className="w-5 h-5" />, href: "/admin/customers" },
  { title: "Applications", icon: <FileText className="w-5 h-5" />, href: "/admin/applications" },
  { title: "Enquiries", icon: <Activity className="w-5 h-5" />, href: "/admin/enquiries" },
  { title: "Services", icon: <FileText className="w-5 h-5" />, href: "/admin/services" },
  { title: "Website Content", icon: <FileText className="w-5 h-5" />, href: "/admin/content" },
  { title: "Settings", icon: <Settings className="w-5 h-5" />, href: "/admin/settings" },
];

export default function AdminLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading" || (status === "authenticated" && session?.user?.role !== "ADMIN")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2540]">
        <div className="w-16 h-16 border-4 border-t-[#D4AF37] border-white/10 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-[#0A2540] text-white hidden md:flex flex-col shadow-2xl relative z-20"
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-xl flex items-center justify-center shadow-lg font-bold text-lg">
            KB
          </div>
          <span className="font-bold text-xl tracking-wide">Admin<span className="text-[#D4AF37]">Panel</span></span>
        </div>

        <div className="flex-1 py-8 px-4 flex flex-col gap-2">
          {sidebarNavItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={index}>
                <button 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 text-[#D4AF37] shadow-inner' : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'}`}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                  {isActive && <div className="ml-auto w-1.5 h-6 bg-[#D4AF37] rounded-full"></div>}
                </button>
              </Link>
            );
          })}
        </div>

        <div className="p-6 border-t border-white/10">
          <Button 
            onClick={() => signOut({ callbackUrl: '/' })} 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Top Header */}
        <header className="h-20 bg-white/60 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 shadow-sm z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#0A2540]">{title}</h1>
            <span className="text-gray-400 hidden lg:flex items-center text-sm">
              <ChevronRight className="w-4 h-4 mx-1" /> {title}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3] focus:bg-white transition-all w-64"
              />
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-[#0A2540] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1952B3] to-[#0A2540] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {session?.user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-[#0A2540]">{session?.user?.name || 'Administrator'}</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-8 z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
