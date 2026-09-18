"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, FileText, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0A2540]">Customer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user?.name}</p>
          </div>
          <Button onClick={() => signOut({ callbackUrl: '/' })} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">My Profile</CardTitle>
              <User className="w-4 h-4 text-[#1952B3]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A2540]">{session.user?.name}</div>
              <p className="text-xs text-gray-500 mt-1">{session.user?.email}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Applications</CardTitle>
              <FileText className="w-4 h-4 text-[#1952B3]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A2540]">0</div>
              <p className="text-xs text-gray-500 mt-1">Pending review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Recent Enquiries</CardTitle>
              <Activity className="w-4 h-4 text-[#1952B3]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A2540]">0</div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-[#0A2540] mb-2">No recent activity</h3>
          <p className="text-gray-500 mb-6">You haven't submitted any applications or inquiries yet.</p>
          <Button onClick={() => router.push('/services')} className="bg-[#1952B3] hover:bg-[#0A2540] text-white">
            Explore Services
          </Button>
        </div>
      </div>
    </div>
  );
}
