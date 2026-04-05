"use client";

import { MapPin, Building2, Briefcase, DollarSign, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: {
    job_id: number;
    title: string;
    description: string;
    salary: number;
    location: string;
    job_type: string;
    role: string;
    work_location: string;
    created_at: string;
    company_name: string;
    company_logo: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  const timeAgo = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  return (
    <div
      className="group relative bg-white dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800/60 rounded-[24px] p-6 md:p-8 cursor-pointer transition-all duration-500 ease-out hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] hover:-translate-y-1 overflow-hidden"
      onClick={() => router.push(`/jobs/${job.job_id}`)}
    >
      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/80 to-transparent dark:from-zinc-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:scale-105 transition-transform duration-500">
            {job.company_logo ? (
              <img src={job.company_logo} alt={job.company_name} className="object-contain w-full h-full p-2" />
            ) : (
              <Building2 className="w-7 h-7 text-zinc-400 dark:text-zinc-500" />
            )}
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {job.title}
            </h3>
            <p className="text-[15px] font-medium text-zinc-500 dark:text-zinc-400">
              {job.company_name}
            </p>
          </div>
        </div>
        
        {/* Modern Time Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-800/50 text-xs font-bold text-zinc-500 dark:text-zinc-400 whitespace-nowrap self-start mix-blend-multiply dark:mix-blend-lighten uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          {timeAgo(job.created_at)}
        </div>
      </div>

      {/* Refined Metadata Tags */}
      <div className="relative z-10 mt-8 flex flex-wrap gap-3 text-[13px] font-semibold tracking-wide">
        <div className="flex items-center text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all duration-300 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
          <MapPin className="w-4 h-4 mr-2 text-zinc-400" />
          {job.location} <span className="mx-2 text-zinc-300 dark:text-zinc-700 font-normal">|</span> {job.work_location}
        </div>
        <div className="flex items-center text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all duration-300 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
          <Briefcase className="w-4 h-4 mr-2 text-zinc-400" />
          {job.job_type}
        </div>
        {job.salary && (
          <div className="flex items-center text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all duration-300 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
            <DollarSign className="w-4 h-4 mr-2 text-zinc-400" />
            ${job.salary.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
