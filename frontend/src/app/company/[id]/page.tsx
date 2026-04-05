"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Building2, ArrowLeft, Loader2, Plus, Users, Globe, MapPin, Target } from "lucide-react";
import toast from "react-hot-toast";

import { jobApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchCompanyDetails();
  }, [id]);

  const fetchCompanyDetails = async () => {
    try {
      const response = await jobApi.get(`/company/${id}`);
      setCompany(response.data);
    } catch (error) {
      toast.error("Failed to load company details.");
      router.push("/company");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to Companies
        </button>

        {/* Company Header */}
        <div className="bg-white dark:bg-zinc-950 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800 shrink-0 z-10 overflow-hidden">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="object-contain w-full h-full" />
            ) : (
              <Building2 className="w-12 h-12 text-zinc-400" />
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left z-10 mt-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">{company.name}</h1>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-5 text-sm sm:text-base">
              {company.description}
            </p>
            {company.website && (
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors">
                <Globe className="w-4 h-4 mr-1.5" /> Visit Website
              </a>
            )}
          </div>
          
          <div className="z-10 w-full md:w-auto mt-4 md:mt-2">
            <Button 
              onClick={() => router.push(`/company/${id}/new-job`)}
              className="w-full text-md h-12 px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-sm transition-transform active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 mr-2" /> Post New Job
            </Button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <Target className="mr-2 text-zinc-400" /> Managed Roles ({company.jobs?.length || 0})
          </h2>
          
          {company.jobs && company.jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.jobs.map((job: any) => (
                <div 
                  key={job.job_id}
                  className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{job.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap ${job.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'}`}>
                      {job.is_active ? "Active" : "Closed"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="flex items-center text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
                      <MapPin className="w-3 h-3 mr-1" /> {job.location}
                    </span>
                    <span className="flex items-center text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
                      <Users className="w-3 h-3 mr-1" /> {job.openings} openings
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl h-10 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                      onClick={() => router.push(`/jobs/application/${job.job_id}`)}
                    >
                      Applicants
                    </Button>
                    <Button 
                      variant="default" 
                      className="flex-1 rounded-xl h-10 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                      onClick={() => router.push(`/jobs/${job.job_id}`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-zinc-950 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl">
              <Target className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">No roles posted yet</h3>
              <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">Post your first job to start hiring top talent for your company.</p>
              <Button onClick={() => router.push(`/company/${id}/new-job`)} className="rounded-xl px-6 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900">
                <Plus className="w-4 h-4 mr-2" /> Post Job
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
