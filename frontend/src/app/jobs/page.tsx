"use client";

import { useEffect, useState } from "react";
import { Search, MapPin, Briefcase, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import { jobApi } from "@/lib/api";
import JobCard from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTitle) params.append("title", searchTitle);
      if (searchLocation) params.append("location", searchLocation);

      const response = await jobApi.get(`/all?${params.toString()}`);
      setJobs(response.data.jobs || []);
    } catch (error: any) {
      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-20 pb-16 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      
      {/* Luxury Header Section */}
      <div className="relative overflow-hidden bg-white dark:bg-black py-24 md:py-32 px-6 border-b border-zinc-200 dark:border-zinc-900">
        {/* Ambient Gradient Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[400px] bg-zinc-400/20 dark:bg-zinc-800/20 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md mx-auto shadow-sm">
             <Sparkles className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
             <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">Intelligent Matching System</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Find Your Next <span className="bg-gradient-to-r from-zinc-500 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-500">Opportunity.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Discover elite roles that fit your skills and advance your career at world-class companies.
          </p>
          
          {/* Glassmorphic Search Form */}
          <form 
            onSubmit={handleSearch}
            className="mt-12 mx-auto max-w-3xl flex flex-col md:flex-row gap-3 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl p-3 rounded-[24px] md:rounded-full border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)] transition-shadow hover:shadow-[0_8px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_50px_rgba(255,255,255,0.04)]"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-6 h-5 w-5 text-zinc-400" />
              <Input 
                placeholder="Job title, keywords..." 
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="h-14 pl-14 bg-transparent border-none text-zinc-900 dark:text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg rounded-[20px] md:rounded-l-full"
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-zinc-200 dark:bg-zinc-800 self-center mx-2"></div>
            <div className="relative flex-1 flex items-center">
              <MapPin className="absolute left-6 h-5 w-5 text-zinc-400" />
              <Input 
                placeholder="City, State, or Remote" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="h-14 pl-14 bg-transparent border-none text-zinc-900 dark:text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg rounded-[20px] md:rounded-r-full"
              />
            </div>
            <Button 
              type="submit" 
              className="h-14 px-10 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-[20px] md:rounded-full text-lg font-bold transition-all active:scale-[0.98] w-full md:w-auto shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Jobs List Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div>
             <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Latest Openings</h2>
             <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Browse opportunities optimized for your profile.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
             <span className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                {jobs.length} <span className="text-zinc-500 font-normal">positions</span>
             </span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm animate-pulse rounded-[24px] border border-zinc-200 dark:border-zinc-800"></div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm rounded-[32px] border border-dashed border-zinc-300 dark:border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-200 dark:border-zinc-800">
                <Briefcase className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">No positions matched</h3>
            <p className="text-zinc-500 leading-relaxed max-w-md mx-auto">We couldn't find any roles matching your precise criteria. Adjust your intelligence parameters and try again.</p>
          </div>
        )}
      </div>

    </div>
  );
}

