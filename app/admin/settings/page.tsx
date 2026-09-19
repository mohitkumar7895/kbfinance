"use client";

import { useSession } from "next-auth/react";
import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  
  // Founder Settings State
  const [founderName, setFounderName] = useState("");
  const [founderBio, setFounderBio] = useState("");
  const [founderImage, setFounderImage] = useState("");
  const [partnerImage1, setPartnerImage1] = useState("");
  const [partnerImage2, setPartnerImage2] = useState("");
  const [partnerImage3, setPartnerImage3] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (data.founder_name) setFounderName(data.founder_name);
        if (data.founder_bio) setFounderBio(data.founder_bio);
        if (data.founder_image) setFounderImage(data.founder_image);
        if (data.partner_image_1) setPartnerImage1(data.partner_image_1);
        if (data.partner_image_2) setPartnerImage2(data.partner_image_2);
        if (data.partner_image_3) setPartnerImage3(data.partner_image_3);
      })
      .catch(err => console.error("Error fetching settings:", err));
  }, []);

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founder_name: founderName,
          founder_bio: founderBio,
          founder_image: founderImage,
          partner_image_1: partnerImage1,
          partner_image_2: partnerImage2,
          partner_image_3: partnerImage3
        })
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({ title: "Settings Saved", description: "Site details updated successfully." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
    }
    if (newPassword.length < 8) {
      return toast({ title: "Error", description: "Password must be at least 8 characters.", variant: "destructive" });
    }
    
    setChangingPassword(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to change password");
      toast({ title: "Success", description: "Password changed successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <AdminLayout title="Settings">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl space-y-8"
      >
        {/* Founder Management */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-[#0A2540]">Site Content Management</h3>
            <p className="text-sm text-gray-500">Update dynamic sections on the homepage.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Founder Image URL</label>
                <div className="mb-4">
                  <img src={founderImage || "/images/about.jpg"} alt="Founder Preview" className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover aspect-[4/5]" onError={(e) => { (e.target as any).src = '/images/about.jpg' }} />
                </div>
                <input 
                  type="text" 
                  value={founderImage} 
                  onChange={(e) => setFounderImage(e.target.value)} 
                  placeholder="/images/about.jpg"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                />
              </div>
              <div className="md:w-2/3 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Founder Name</label>
                  <input 
                    type="text" 
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Founder Bio</label>
                  <textarea 
                    rows={4}
                    value={founderBio}
                    onChange={(e) => setFounderBio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3] resize-none" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Partner Logo 1</label>
                    <input 
                      type="text" 
                      value={partnerImage1}
                      onChange={(e) => setPartnerImage1(e.target.value)}
                      placeholder="/images/partner1.png"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Partner Logo 2</label>
                    <input 
                      type="text" 
                      value={partnerImage2}
                      onChange={(e) => setPartnerImage2(e.target.value)}
                      placeholder="/images/partner2.png"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Partner Logo 3</label>
                    <input 
                      type="text" 
                      value={partnerImage3}
                      onChange={(e) => setPartnerImage3(e.target.value)}
                      placeholder="/images/partner3.png"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleSaveSettings} 
              disabled={savingSettings}
              className="bg-[#0A2540] hover:bg-[#1952B3] text-white"
            >
              {savingSettings ? "Saving..." : "Save Site Settings"}
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-[#0A2540]">Change Password</h3>
            <p className="text-sm text-gray-500">Secure your admin account.</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]" 
                />
              </div>
              <Button type="submit" disabled={changingPassword} className="bg-[#1952B3] hover:bg-[#0A2540] text-white">
                {changingPassword ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </div>
        </div>

      </motion.div>
    </AdminLayout>
  );
}
