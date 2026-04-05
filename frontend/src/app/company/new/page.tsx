"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Globe, FileText, Loader2, ImagePlus, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { jobFormApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewCompanyPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.website || !file) {
      toast.error("Please fill in all fields and upload a logo.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("website", formData.website);
    data.append("file", file);

    setLoading(true);
    try {
      await jobFormApi.post("/company/new", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Company registered successfully!");
      router.push("/company");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to Companies
        </button>

        <div className="bg-white dark:bg-zinc-950 rounded-3xl p-8 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="mb-10 text-center">
             <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 mx-auto rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800">
               <Building2 className="w-7 h-7" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">Company Details</h1>
             <p className="text-zinc-500 text-sm">Provide details so candidates know who they are applying to.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-2">
               <Label htmlFor="name" className="font-semibold text-zinc-700 dark:text-zinc-300">Company Name</Label>
               <div className="relative group">
                 <Building2 className="absolute left-4 top-3 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                 <Input 
                   id="name" 
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   placeholder="e.g. Acme Corp" 
                   className="pl-12 h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 rounded-xl"
                   required
                 />
               </div>
             </div>

             <div className="space-y-2">
               <Label htmlFor="website" className="font-semibold text-zinc-700 dark:text-zinc-300">Website URL</Label>
               <div className="relative group">
                 <Globe className="absolute left-4 top-3 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                 <Input 
                   id="website" 
                   type="url"
                   value={formData.website}
                   onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                   placeholder="https://example.com" 
                   className="pl-12 h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 rounded-xl"
                   required
                 />
               </div>
             </div>

             <div className="space-y-2">
               <Label htmlFor="description" className="font-semibold text-zinc-700 dark:text-zinc-300">About the Company</Label>
               <div className="relative group">
                 <FileText className="absolute left-4 top-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                 <textarea 
                   id="description" 
                   value={formData.description}
                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                   placeholder="Describe your company's mission and vision..." 
                   className="w-full pl-12 pt-4 min-h-[120px] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-400 outline-none text-sm resize-y"
                   required
                 />
               </div>
             </div>

             <div className="space-y-2">
               <Label htmlFor="logo" className="font-semibold text-zinc-700 dark:text-zinc-300">Company Logo (Image)</Label>
               <div className="flex items-center justify-center w-full">
                 <label htmlFor="logo" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
                     <ImagePlus className="w-8 h-8 mb-2 text-zinc-400" />
                     <p className="mb-1 text-sm text-zinc-500">
                       <span className="font-semibold text-zinc-700 dark:text-zinc-300">Click to upload</span> or drag and drop
                     </p>
                     {file && <p className="text-xs font-bold mt-2 text-indigo-600 dark:text-indigo-400">{file.name}</p>}
                   </div>
                   <input id="logo" type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required/>
                 </label>
               </div>
             </div>

             <Button 
               type="submit" 
               disabled={loading}
               className="w-full h-12 text-md rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-sm mt-4 transition-all focus:scale-[0.98]"
             >
               {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Save Profile"}
             </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
