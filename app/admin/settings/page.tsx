"use client";

import { useSession } from "next-auth/react";
import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <AdminLayout title="Settings">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-[#0A2540]">Profile Settings</h3>
            <p className="text-sm text-gray-500">Manage your administrative account details.</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#1952B3] to-[#0A2540] rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md">
                {session?.user?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <Button variant="outline" className="mb-2">Change Avatar</Button>
                <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" defaultValue={session?.user?.name || ''} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" defaultValue={session?.user?.email || ''} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" disabled />
              </div>
            </div>

            <Button className="bg-[#0A2540] hover:bg-[#1952B3] text-white">Save Changes</Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
            <p className="text-sm text-gray-500">Irreversible administrative actions.</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-semibold text-gray-800">Clear Cache</h4>
                <p className="text-sm text-gray-500">Remove all temporary files and cached database queries.</p>
              </div>
              <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">Clear Cache</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
