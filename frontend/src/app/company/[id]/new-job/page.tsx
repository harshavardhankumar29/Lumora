"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Briefcase, MapPin, DollarSign, Loader2, ArrowLeft, Send } from "lucide-react";
import toast from "react-hot-toast";

import { jobApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    role: "",
    job_type: "Full-time",
    work_location: "Office",
    company_id: id,
    openings: "1"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await jobApi.post("/new", {
        ...formData,
        salary: Number(formData.salary),
        openings: Number(formData.openings)
      });
      toast.success("Job posted successfully!");
      router.push(`/company/${id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" /> 
          Back to Company
        </button>

        <div className="bg-white dark:bg-zinc-950 rounded-3xl p-8 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">Post a New Job</h1>
            <p className="text-zinc-500 text-sm">Fill in the details below to attract top talent.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold text-zinc-700 dark:text-zinc-300">Job Title</Label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                  <Input 
                    id="title" value={formData.title} onChange={handleChange} required
                    placeholder="e.g. Senior Frontend Engineer" 
                    className="pl-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="font-semibold text-zinc-700 dark:text-zinc-300">Job Role</Label>
                <Input 
                  id="role" value={formData.role} onChange={handleChange} required
                  placeholder="e.g. Engineering" 
                  className="h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold text-zinc-700 dark:text-zinc-300">Job Description</Label>
              <textarea 
                id="description" value={formData.description} onChange={handleChange} required
                placeholder="Describe the responsibilities, requirements, and perks..." 
                className="w-full p-4 min-h-[150px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-zinc-400 outline-none text-sm resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="font-semibold text-zinc-700 dark:text-zinc-300">Location</Label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                  <Input 
                    id="location" value={formData.location} onChange={handleChange} required
                    placeholder="e.g. New York, NY" 
                    className="pl-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary" className="font-semibold text-zinc-700 dark:text-zinc-300">Salary ($ / mo)</Label>
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                  <Input 
                    id="salary" type="number" value={formData.salary} onChange={handleChange} required
                    placeholder="8000" 
                    className="pl-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="openings" className="font-semibold text-zinc-700 dark:text-zinc-300">Openings</Label>
                <Input 
                  id="openings" type="number" min="1" value={formData.openings} onChange={handleChange} required
                  className="h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 text-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="job_type" className="font-semibold text-zinc-700 dark:text-zinc-300">Job Type</Label>
                <select 
                  id="job_type" value={formData.job_type} onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:ring-1 focus:ring-zinc-400 outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="work_location" className="font-semibold text-zinc-700 dark:text-zinc-300">Work Setting</Label>
                <select 
                  id="work_location" value={formData.work_location} onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:ring-1 focus:ring-zinc-400 outline-none"
                >
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <Button 
              type="submit" disabled={loading}
              className="w-full h-12 mt-8 text-md rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-sm transition-transform active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
              Publish Job Post
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
