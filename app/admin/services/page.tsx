"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subtitle: "",
    bullets: "",
    buttonText: "",
    image: ""
  });

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service: any = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({
        id: service.id,
        title: service.title,
        subtitle: service.subtitle,
        bullets: service.bullets.join("\n"),
        buttonText: service.buttonText,
        image: service.image
      });
    } else {
      setCurrentService(null);
      setFormData({
        id: "",
        title: "",
        subtitle: "",
        bullets: "",
        buttonText: "Apply Now",
        image: "/images/service-loans.jpg"
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const method = currentService ? "PUT" : "POST";
    const url = currentService ? `/api/admin/services/${currentService.id}` : "/api/admin/services";
    
    try {
      const payload = {
        ...formData,
        bullets: formData.bullets.split("\n").map(b => b.trim()).filter(b => b)
      };
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchServices();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save service");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Manage Services">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-[#0A2540]">Services</h2>
          <Button onClick={() => openModal()} className="bg-[#1952B3] hover:bg-[#123e8a] text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading services...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Subtitle</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
                        {service.image ? <Image src={service.image} alt={service.title || "Service"} fill className="object-cover" /> : null}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#0A2540]">{service.title}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{service.subtitle}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal(service)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#0A2540]">{currentService ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {!currentService && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID (e.g. personal, business)</label>
                  <input type="text" className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1952B3]/20" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1952B3]/20" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <textarea className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1952B3]/20" rows={2} value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})}></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (One per line)</label>
                <textarea className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1952B3]/20" rows={4} value={formData.bullets} onChange={e => setFormData({...formData, bullets: e.target.value})} placeholder="Feature 1\nFeature 2"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input type="text" className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1952B3]/20" value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1952B3]/20" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-[#1952B3] hover:bg-[#123e8a] text-white">Save Service</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
