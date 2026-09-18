"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldPlus, Loader2, ArrowLeft } from "lucide-react";
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
  const [setupKey, setSetupKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bootstrap, setBootstrap] = useState(true);
  const [requiresSetupKey, setRequiresSetupKey] = useState(false);

  useEffect(() => {
    fetch("/api/admin/register")
      .then((res) => res.json())
      .then((data) => {
        setBootstrap(Boolean(data.bootstrap));
        setRequiresSetupKey(Boolean(data.requiresSetupKey));
      })
      .catch(() => {
        setBootstrap(false);
        setRequiresSetupKey(true);
      });
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, setupKey }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast({
        title: "Admin created",
        description: "Signing you into the admin portal...",
      });

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        router.push("/admin/login");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast({
        title: "Could not create admin",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A2540] p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#1952B3] opacity-20 blur-[100px]" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#D4AF37] opacity-10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-blue-200 transition-colors hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Website
        </Link>

        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#1952B3]/50 bg-[#1952B3]/20">
              <ShieldPlus className="h-8 w-8 text-[#D4AF37]" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-white">Create Admin</h1>
            <p className="text-sm text-blue-200">
              {bootstrap
                ? "Set up the first administrator for K B Financial Services."
                : "Register an authorized admin account."}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-blue-100">Full name</Label>
              <Input
                type="text"
                placeholder="Sanjay Kumar Rawat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-blue-100">Admin email</Label>
              <Input
                type="email"
                placeholder="admin@kbfinancial.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-blue-100">Password</Label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            {requiresSetupKey && (
              <div className="space-y-2">
                <Label className="text-blue-100">Setup key</Label>
                <Input
                  type="password"
                  placeholder="ADMIN_REGISTER_SECRET"
                  value={setupKey}
                  onChange={(e) => setSetupKey(e.target.value)}
                  required
                  className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
            )}

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#D4AF37] text-lg font-bold text-[#0A2540] hover:bg-[#C19B2E]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating admin...
                </>
              ) : (
                "Create admin account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-blue-200">
            Already an admin?{" "}
            <Link href="/admin/login" className="font-medium text-[#D4AF37] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
