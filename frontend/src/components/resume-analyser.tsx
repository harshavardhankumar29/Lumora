"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText, Upload, CheckCircle2, AlertTriangle, TrendingUp,
  Loader2, ArrowRight, FileCheck, Zap
} from "lucide-react";
import axios from "axios";
import { ResumeAnalysisResponse } from "@/type";
import { utils_service } from "@/context/AppContext";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResumeAnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeResume = async () => {
    if (!file) {
      toast.error("Please upload a resume");
      return;
    }

    setLoading(true);
    try {
      const base64 = await convertToBase64(file);
      const { data } = await axios.post(
        `${utils_service}/api/utils/resume-analyser`,
        { pdfBase64: base64 }
      );
      setResponse(data);
      toast.success("Resume analyzed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to analyze resume");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setFile(null);
    setResponse(null);
    setOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-zinc-900 dark:text-zinc-100";
    if (score >= 60) return "text-zinc-600 dark:text-zinc-300";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-zinc-100/80 dark:bg-zinc-800/80 border-zinc-200/50 dark:border-zinc-700/50";
    if (score >= 60) return "bg-zinc-50/80 dark:bg-zinc-900/80 border-zinc-200/50 dark:border-zinc-800/50";
    return "bg-red-50/80 dark:bg-red-950/30 border-red-200/50 dark:border-red-900/30";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high")
      return "bg-red-50/80 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200/50 dark:border-red-800/50";
    if (priority === "medium")
      return "bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200/50 dark:border-zinc-700/50";
    return "bg-zinc-50/80 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 border-zinc-200/50 dark:border-zinc-800/50";
  };

  return (
    <div className="w-full h-full relative group">
      {/* Ambient Background Gradient for Volumetric Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-transparent to-indigo-100/40 dark:from-rose-900/10 dark:to-indigo-900/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/60 dark:border-white/10 rounded-[32px] p-8 md:p-12 h-full flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-black/50 backdrop-blur-md mb-8 shadow-sm">
            <Zap className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-800 dark:text-zinc-200">Intelligence</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 bg-clip-text">
            AI Resume Analyzer
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-sm border-l-2 border-rose-500/30 dark:border-rose-400/30 pl-5 py-1 text-sm leading-relaxed">
            Bypass the Applicant Tracking Systems. Run your CV through our intelligence engine to identify hidden gaps and optimize for maximum visibility.
          </p>
        </div>

        <div>
          <div className="rounded-[24px] border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-xl p-6 mb-8 shadow-inner">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                Keyword Optimization Metrics
              </li>
              <li className="flex items-center gap-3 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                Structural Formatting Checks
              </li>
              <li className="flex items-center gap-3 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                Actionable Gap Analysis
              </li>
            </ul>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-14 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-lg font-medium tracking-wide transition-all duration-300 active:scale-[0.98] shadow-lg shadow-zinc-900/20 dark:shadow-white/10">
                Start Free Scan <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-[1100px] w-[95vw] max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border-zinc-200/50 dark:border-white/10 rounded-[32px] p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-x-hidden">
                {/* Ambient glow inside dialog */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                
                <div className="relative">
                  {!response ? (
                    <>
                      <DialogHeader className="mb-8">
                        <DialogTitle className="text-4xl font-extrabold tracking-tight mb-3">
                          Upload Document
                        </DialogTitle>
                        <DialogDescription className="text-base text-zinc-500 dark:text-zinc-400">
                          Upload your resume in PDF format for an instant structural and keyword AI analysis.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-8">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-[32px] p-12 text-center cursor-pointer bg-zinc-50/50 hover:bg-zinc-100/80 dark:bg-zinc-900/30 dark:hover:bg-zinc-800/50 transition-all duration-300 backdrop-blur-sm group"
                        >
                          <div className="flex flex-col items-center gap-5">
                            <div className="h-20 w-20 rounded-[24px] bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm group-hover:shadow-md transition-shadow group-hover:-translate-y-1 duration-300">
                              <Upload className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
                            </div>
                            <div>
                              <p className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-1">
                                {file ? file.name : "Click or drag to upload"}
                              </p>
                              <p className="text-sm text-zinc-500 font-medium tracking-wide">
                                PDF only, maximum 5MB limit
                              </p>
                            </div>
                            {file && (
                              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800/50 mt-2">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-[11px] uppercase tracking-[0.1em] font-bold">Ready for scan</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileSelect} className="hidden" />

                        <Button onClick={analyzeResume} disabled={loading || !file} className="w-full h-14 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-semibold tracking-wide shadow-xl shadow-zinc-900/10 dark:shadow-white/5 active:scale-[0.98] transition-all disabled:opacity-50">
                          {loading ? (
                            <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Deep Scanning...</>
                          ) : (
                            <><Zap className="w-5 h-5 mr-3" /> Run AI Analysis</>
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <DialogHeader className="mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200 dark:border-rose-800/50 bg-rose-50/50 dark:bg-rose-900/20 backdrop-blur-sm mb-6 w-fit text-rose-700 dark:text-rose-300">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Intelligence Brief</span>
                        </div>
                        <DialogTitle className="text-4xl font-extrabold tracking-tight">Analysis Report</DialogTitle>
                      </DialogHeader>

                      <div className="bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/5 p-8 rounded-[32px] w-full shadow-inner mt-6">
                        
                        {/* Summary & Score Section */}
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className={`p-8 rounded-2xl flex-shrink-0 w-full md:w-1/3 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md shadow-sm border ${getScoreBgColor(response.atsScore)}`}>
                                {/* Score background glow */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-current blur-[50px] rounded-full"></div>
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-70 z-10">
                                    ATS Integrity
                                </p>
                                <div className={`text-6xl font-black ${getScoreColor(response.atsScore)} tracking-tighter z-10 drop-shadow-sm`}>
                                    {response.atsScore}
                                </div>
                            </div>
                            <div className="flex-1 bg-zinc-50/80 dark:bg-zinc-950/50 p-8 rounded-3xl border border-zinc-200/50 dark:border-white/5 shadow-sm flex items-center">
                                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                                    {response.summary}
                                </p>
                            </div>
                        </div>

                        {/* TABS IMPLEMENTATION FOR BETTER LAYOUT */}
                        <div className="w-full">
                            <div className="flex space-x-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6 overflow-x-auto no-scrollbar">
                                <button className="px-4 py-2 text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-full transition-all whitespace-nowrap">
                                    Breakdown Metrics
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all whitespace-nowrap" onClick={() => toast("Tab switching to be implemented with proper state")}>
                                    Validations & Fixes
                                </button>
                            </div>

                            <div className="max-h-[50vh] overflow-y-auto pr-2 pb-4 space-y-12 no-scrollbar custom-scroll">
                                {/* Score Breakdown */}
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400 mb-5 pl-1 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Breakdown Metrics
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {Object.entries(response.scoreBreakdown).map(([key, value]) => (
                                        <div key={key} className="p-6 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/80 dark:bg-zinc-950/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="font-bold capitalize text-zinc-900 dark:text-zinc-100 tracking-tight">{key}</p>
                                                <span className={`text-xl font-black ${getScoreColor(value.score)}`}>{value.score}%</span>
                                            </div>
                                            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{value.feedback}</p>
                                        </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Strengths & Suggestions Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-5">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-2 pl-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Validations
                                        </h3>
                                        <ul className="space-y-3">
                                            {response.strengths.map((str, i) => (
                                            <li key={i} className="text-sm flex items-start gap-4 bg-white/80 dark:bg-zinc-950/50 p-5 rounded-2xl border border-zinc-200/50 dark:border-white/5 shadow-sm hover:border-zinc-300 dark:hover:border-white/10 transition-colors leading-relaxed">
                                                <span className="text-emerald-500 dark:text-emerald-400 font-black shrink-0 mt-[2px]">✓</span>
                                                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{str}</span>
                                            </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-5">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-2 pl-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Critical Fixes
                                        </h3>
                                        <div className="space-y-4">
                                            {response.suggestions.map((sug, i) => (
                                            <div key={i} className={`p-6 rounded-3xl border ${getPriorityColor(sug.priority)} backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow`}>
                                                <div className="flex items-start justify-between gap-3 mb-5">
                                                <h4 className="font-bold text-sm uppercase tracking-wider">{sug.category}</h4>
                                                </div>
                                                <div className="space-y-4 text-[13px]">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="font-extrabold opacity-50 text-[10px] uppercase tracking-[0.15em]">Flaw identified</span>
                                                    <span className="font-medium leading-relaxed">{sug.issue}</span>
                                                </div>
                                                <div className="flex flex-col gap-1.5 pt-3 border-t border-black/5 dark:border-white/5">
                                                    <span className="font-extrabold opacity-50 text-[10px] uppercase tracking-[0.15em]">Required Resolution</span>
                                                    <span className="font-medium leading-relaxed">{sug.recommendation}</span>
                                                </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>

                        <Button onClick={resetDialog} variant="outline" className="w-full h-14 rounded-full mt-10 font-semibold tracking-wide border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.98] transition-all">
                          Process Another Document
                        </Button>
                    </div>
                  )}
                </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
