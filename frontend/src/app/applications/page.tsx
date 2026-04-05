"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Loader2, MapPin, DollarSign, Clock, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

import { userApi } from "@/lib/api";
import { useAppContext } from "@/context/AppContext";
import { Application } from "@/type";
import { Button } from "@/components/ui/button";

export default function MyApplicationsPage() {
  const router = useRouter();
  const { isAuth, user, loading: contextLoading } = useAppContext();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contextLoading) return;

    if (!isAuth) {
      router.push("/login");
      return;
    }

    if (user?.role !== "jobseeker") {
      toast.error("Only jobseekers can view applications.");
      router.push("/jobs");
      return;
    }

    fetchApplications();
  }, [isAuth, user, contextLoading, router]);

  const fetchApplications = async () => {
    try {
      const { data } = await userApi.get("/application/all");
      setApplications(data || []);
    } catch {
      toast.error("Failed to load your applications.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800";
    }
  };

  if (loading || contextLoading) {
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

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
        <div className="mb-12 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
            My Applications
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            Track the status of all your job applications.
          </p>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.application_id}
                className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl p-8 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(255,255,255,0.02)] transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 truncate tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {app.job_title || `Job #${app.job_id}`}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border capitalize shrink-0 shadow-sm ${getStatusStyles(app.status)}`}>
                        {app.status || "Pending"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {app.job_location && (
                        <span className="flex items-center bg-white/50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
                          <MapPin className="w-4 h-4 mr-1.5 opacity-70" />
                          {app.job_location}
                        </span>
                      )}
                      {app.job_salary && (
                        <span className="flex items-center bg-white/50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
                          <DollarSign className="w-4 h-4 mr-1.5 opacity-70" />
                          ${app.job_salary.toLocaleString()}/mo
                        </span>
                      )}
                      <span className="flex items-center bg-white/50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
                        <Clock className="w-4 h-4 mr-1.5 opacity-70" />
                        Applied {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-2xl h-12 px-6 border-zinc-200/80 dark:border-zinc-800/80 shrink-0 font-bold bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all shadow-sm"
                    onClick={() => router.push(`/jobs/${app.job_id}`)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> View Job
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-2xl border border-dashed border-zinc-300 dark:border-zinc-800 rounded-[32px] shadow-sm">
            <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80">
                <Briefcase className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
              No applications yet
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8 max-w-sm mx-auto">
              Start applying to jobs and track your progress here.
            </p>
            <Button
              onClick={() => router.push("/jobs")}
              className="h-14 px-8 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              <Briefcase className="w-5 h-5 mr-2" /> Browse Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
