"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Plus, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { jobApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

export default function CompaniesPage() {
  const router = useRouter();
  const { isAuth, user } = useAppContext();
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth && user?.role === "recruiter") {
      fetchCompanies();
    } else if (isAuth && user?.role !== "recruiter") {
      toast.error("Only recruiters can manage companies.");
      router.push("/jobs");
    } else if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, user, router]);

  const fetchCompanies = async () => {
    try {
      const response = await jobApi.get("/company/all");
      setCompanies(response.data.companies || []);
    } catch (error) {
      toast.error("Failed to load your companies.");
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-50 dark:bg-black pt-32 pb-16 px-4 md:px-6 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 border-b border-zinc-200 dark:border-zinc-900">
      {/* Ambient Depth and Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[800px] bg-zinc-400/20 dark:bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">My Companies</h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Manage your business profiles and post new jobs.</p>
          </div>
          <Button 
            onClick={() => router.push("/company/new")}
            className="h-14 px-8 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] active:scale-[0.98] w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" /> Register Company
          </Button>
        </div>

        {companies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, i) => (
              <div
                key={company.company_id}
                className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl p-8 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 cursor-pointer group flex flex-col hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgba(255,255,255,0.03)] focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 transition-all duration-300"
                onClick={() => router.push(`/company/${company.company_id}`)}
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center p-2 border border-zinc-200/80 dark:border-zinc-800/80 mb-6 shrink-0 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {company.logo ? (
                    <img src={company.logo} alt={company.name} className="object-contain w-full h-full" />
                  ) : (
                    <Building2 className="w-8 h-8 text-zinc-400" />
                  )}
                </div>
                <h2 className="text-xl font-black mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                  {company.name}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 text-sm font-medium mb-8 flex-1">
                  {company.description}
                </p>
                <div className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  Manage Company <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-2xl border border-dashed border-zinc-300 dark:border-zinc-800 rounded-[32px] shadow-sm">
            <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80">
              <Building2 className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-2">No companies found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8 max-w-sm mx-auto">You haven't registered any companies yet. Set up a profile to start posting jobs.</p>
            <Button 
              onClick={() => router.push("/company/new")}
              className="h-14 px-8 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              <Plus className="w-5 h-5 mr-2" /> Register Company
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
