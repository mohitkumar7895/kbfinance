"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetch('/api/admin/applications')
        .then(res => res.json())
        .then(data => {
          if (data.applications) setApplications(data.applications);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch applications", err);
          setIsLoading(false);
        });
    }
  }, [session]);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'NEW': return 'bg-blue-100 text-blue-700';
      case 'UNDER_REVIEW': return 'bg-amber-100 text-amber-700';
      case 'APPROVED': return 'bg-emerald-100 text-emerald-700';
      case 'REJECTED': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout title="Applications">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <h3 className="text-lg font-bold text-[#0A2540]">Loan Applications</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search applications..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3] w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-semibold">Applicant</th>
                  <th className="p-4 font-semibold">Service</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Employment</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 animate-pulse">Loading applications...</td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">No applications found.</td>
                  </tr>
                ) : (
                  applications.map((app, i) => (
                    <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-[#0A2540]">{app.user_name}</p>
                        <p className="text-xs text-gray-500">{app.email}</p>
                      </td>
                      <td className="p-4 capitalize">{app.service_type?.replace('-', ' ')}</td>
                      <td className="p-4 font-medium">₹{Number(app.loan_amount).toLocaleString()}</td>
                      <td className="p-4 capitalize">{app.employment_type}</td>
                      <td className="p-4">{new Date(app.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
