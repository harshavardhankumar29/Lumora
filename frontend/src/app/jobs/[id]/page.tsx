"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Building2, MapPin, Briefcase, DollarSign, ArrowLeft, Loader2, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";

import { jobApi, userApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuth, user } = useAppContext();
  
  const [job, setJob] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = async () => {
      try {
        const { data: jobData } = await jobApi.get(`/${id}`);
        setJob(jobData);

        if (isAuth && jobData.company_id) {
          try {
            const { data: compData } = await jobApi.get(`/company/${jobData.company_id}`);
            setCompany(compData);
          } catch (e) {
            console.log("Could not fetch company details");
          }
        }
      } catch (error) {
        toast.error("Failed to load job details.");
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, isAuth, router]);

  const handleApply = async () => {
    if (!isAuth) {
      toast.error("Please login to apply for this job.");
      router.push("/login");
      return;
    }
    
    if (user?.role !== "jobseeker") {
      toast.error("Only jobseekers can apply for jobs.");
      return;
    }

    setApplying(true);
    try {
      await userApi.post("/apply/job", { job_id: Number(id) });
      toast.success("Successfully applied for this job!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 z-0 pointer-events-none flex items-start justify-center pt-32">
          <div className="w-[800px] h-[400px] bg-indigo-400/10 dark:bg-indigo-500/10 blur-[120px] rounded-full mx-auto" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 backdrop-blur-md w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </button>

        <div className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
            <div className="flex items-start gap-5 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-center p-2 shrink-0 shadow-sm">
                {company?.logo ? (
                  <img src={company.logo} alt={company.name} className="object-contain w-full h-full" />
                ) : (
                  <Building2 className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                )}
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
                  {job.title}
                </h1>
                <p className="text-lg text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                  {company?.name || "Company Confidential"}
                </p>
                <div className="flex flex-wrap gap-2 text-sm font-bold tracking-wide">
                  <span className="flex items-center text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-zinc-900/50 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm">
                    <MapPin className="w-4 h-4 mr-2 text-zinc-400" />
                    {job.location} <span className="mx-2 text-zinc-300 dark:text-zinc-700 font-normal">|</span> {job.work_location}
                  </span>
                  <span className="flex items-center text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-zinc-900/50 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm">
                    <Briefcase className="w-4 h-4 mr-2 text-zinc-400" />
                    {job.job_type}
                  </span>
                  {job.salary && (
                    <span className="flex items-center text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-zinc-900/50 px-3.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-zinc-400" />
                      ${job.salary.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleApply}
              disabled={applying || !job.is_active}
              className="w-full md:w-auto h-14 px-8 text-lg font-bold rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.1)] shrink-0 active:scale-[0.98]"
            >
              {applying ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Applying...</>
              ) : job.is_active ? (
                <><Send className="w-5 h-5 mr-2" /> Apply Now</>
              ) : (
                "Closed"
              )}
            </Button>
          </div>

          <div className="w-full h-px bg-zinc-200/80 dark:bg-zinc-800/80 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Col - Main Description */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-5">Role Description</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap text-[15px] max-w-none">
                  {job.description}
                </div>
              </section>
            </div>

            {/* Right Col - Details & Sidebar */}
            <div className="space-y-6">
              <div className="bg-white/50 dark:bg-zinc-900/40 rounded-3xl p-6 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm backdrop-blur-sm">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-5 uppercase tracking-widest opacity-80">Job Overview</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">Role</dt>
                    <dd className="font-bold text-zinc-900 dark:text-zinc-100">{job.role}</dd>
                  </div>
                  <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/50" />
                  <div>
                    <dt className="text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">Openings</dt>
                    <dd className="font-bold text-zinc-900 dark:text-zinc-100">{job.openings} available</dd>
                  </div>
                  <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/50" />
                  <div>
                    <dt className="text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">Posted</dt>
                    <dd className="font-bold text-zinc-900 dark:text-zinc-100">{new Date(job.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</dd>
                  </div>
                </dl>
              </div>

              {company?.description && (
                <div className="bg-white/50 dark:bg-zinc-900/40 rounded-3xl p-6 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm backdrop-blur-sm text-sm">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center text-base">
                    <Building2 className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" /> 
                    {company.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-5 line-clamp-5 leading-relaxed">
                    {company.description}
                  </p>
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                      Visit Website <span className="ml-1">→</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
