"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function CustomersPage() {
  const { data: session } = useSession();
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetch('/api/admin/customers')
        .then(res => res.json())
        .then(data => {
          if (data.customers) setCustomers(data.customers);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch customers", err);
          setIsLoading(false);
        });
    }
  }, [session]);

  return (
    <AdminLayout title="Customers">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <h3 className="text-lg font-bold text-[#0A2540]">Registered Customers</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3] w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Joined</th>
                  <th className="p-4 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 animate-pulse">Loading customers...</td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">No customers found.</td>
                  </tr>
                ) : (
                  customers.map((c, i) => (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-[#0A2540]">{c.name}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.phone || '-'}</td>
                      <td className="p-4">{c.city ? `${c.city}${c.state ? `, ${c.state}` : ''}` : '-'}</td>
                      <td className="p-4">{new Date(c.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {c.role}
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
