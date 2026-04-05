"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Users, FileText, Crown, CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

import { jobApi } from "@/lib/api";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

interface ApplicationItem {
  application_id: number;
  applicant_id: number;
  applicant_email: string;
  job_id: number;
  resume: string;
  status: string;
  subscribed: boolean;
  applied_at: string;
}

export default function JobApplicantsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuth, user, loading: contextLoading } = useAppContext();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (contextLoading) return;

    if (!isAuth) {
      router.push("/login");
      return;
    }

    if (user?.role !== "recruiter") {
      toast.error("Only recruiters can view applicants.");
      router.push("/jobs");
      return;
    }

    fetchApplications();
  }, [isAuth, user, contextLoading, id, router]);

  const fetchApplications = async () => {
    try {
      const { data } = await jobApi.get(`/application/${id}`);
      setApplications(data.applications || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId: number, status: string) => {
    setUpdatingId(applicationId);
    try {
      await jobApi.put(`/application/update/${applicationId}`, { status });
      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === applicationId ? { ...app, status } : app
        )
      );
      toast.success(`Application ${status.toLowerCase()}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
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

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-zinc-400" />;
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to Company
        </button>

        <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
              Applicants
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              {applications.length} application{applications.length !== 1 ? "s" : ""} received
            </p>
          </div>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.application_id}
                className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {app.applicant_email}
                      </h3>
                      {app.subscribed && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900 shrink-0">
                          <Crown className="w-3 h-3" /> Premium
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full border capitalize ${getStatusStyles(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status || "Pending"}
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                        Applied {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {app.resume && (
                      <a href={app.resume} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="rounded-xl h-10 border-zinc-200 dark:border-zinc-800">
                          <FileText className="w-4 h-4 mr-2" /> Resume
                        </Button>
                      </a>
                    )}

                    {(!app.status || app.status.toLowerCase() === "pending") && (
                      <>
                        <Button
                          onClick={() => updateStatus(app.application_id, "accepted")}
                          disabled={updatingId === app.application_id}
                          className="rounded-xl h-10 bg-green-600 hover:bg-green-700 text-white"
                        >
                          {updatingId === app.application_id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          )}
                          Accept
                        </Button>
                        <Button
                          onClick={() => updateStatus(app.application_id, "rejected")}
                          disabled={updatingId === app.application_id}
                          variant="outline"
                          className="rounded-xl h-10 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-zinc-950 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl">
            <Users className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-600 mb-4" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              No applicants yet
            </h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto">
              Applications will appear here as candidates apply for this position.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
