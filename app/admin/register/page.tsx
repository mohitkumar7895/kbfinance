"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function AdminRegister() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not create admin");
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        toast({
          title: "Admin created",
          description: "Please login with your new credentials.",
        });
        router.push("/admin/login");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1952B3] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D4AF37] rounded-full blur-[100px] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link href="/admin/login" className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin Login
        </Link>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-[#1952B3]/20 rounded-full flex items-center justify-center mb-4 border border-[#1952B3]/50">
              <ShieldAlert className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create Admin</h1>
            <p className="text-blue-200 text-sm">First-time setup for the admin portal</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-blue-100">Full Name</Label>
              <Input
                type="text"
                placeholder="KB Admin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-100">Administrator Email</Label>
              <Input
                type="email"
                placeholder="admin@kbfinancial.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-100">Password</Label>
              <Input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-[#D4AF37] hover:bg-[#C19B2E] text-[#0A2540] font-bold text-lg rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating admin...
                </>
              ) : (
                "Create Admin"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
