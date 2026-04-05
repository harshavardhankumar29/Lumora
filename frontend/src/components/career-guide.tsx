"use client"

import React, { useState } from 'react'
import { Sparkles, X, Target, Loader2, ArrowRight } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { CareerGuideResponse } from '@/type'
import { utils_service } from '@/context/AppContext'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const CareerGuide = () => {
    const [open, setOpen] = useState(false);
    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<CareerGuideResponse | null>(null);

    const addSkill = () => {
        if (currentSkill.trim() !== "" && !skills.includes(currentSkill.trim())) {
            setSkills([...skills, currentSkill.trim()]);
            setCurrentSkill("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addSkill();
        }
    };

    const getCareerGuidance = async () => {
        if (skills.length === 0) {
            toast.error("Please add at least one core skill.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${utils_service}/api/utils/career`, { skills });
            setResponse(data);
            toast.success("Intelligence report generated.");
        } catch (error: any) {
            console.error("Error fetching career guidance:", error);
            toast.error("Subsystem failure. Content generation failed.");
        } finally {
            setLoading(false);
        }
    };

    const resetDialog = () => {
        setSkills([]);
        setCurrentSkill("");
        setResponse(null);
        setOpen(false);
    };

    return (
        <div className="w-full h-full relative group">
            {/* Ambient Background Gradient for Volumetric Depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-transparent to-rose-100/40 dark:from-indigo-900/10 dark:to-rose-900/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/60 dark:border-white/10 rounded-[32px] p-8 md:p-12 h-full flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-black/50 backdrop-blur-md mb-8 shadow-sm">
                        <Target className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-800 dark:text-zinc-200">Trajectory</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 bg-clip-text">
                        Career Architecture Mapper
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-sm border-l-2 border-indigo-500/30 dark:border-indigo-400/30 pl-5 py-1 text-sm leading-relaxed">
                        Input your current technical stack. Output your optimized career trajectory, complete with calculated skill gaps and actionable stepping stones.
                    </p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full h-14 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-lg font-medium tracking-wide transition-all duration-300 active:scale-[0.98] shadow-lg shadow-zinc-900/20 dark:shadow-white/10">
                            Map Career Path <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-[1000px] w-[95vw] max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border-zinc-200/50 dark:border-white/10 rounded-[32px] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-x-hidden">
                        {/* Ambient glow inside dialog */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                        
                        <div className="relative">
                            {!response ? (
                                <>
                                    <DialogHeader className="mb-10">
                                        <DialogTitle className="text-4xl font-extrabold tracking-tight mb-3">Configure Input Stack</DialogTitle>
                                        <DialogDescription className="text-base text-zinc-500 dark:text-zinc-400">
                                            Declare your current proficiencies. The engine will synthesize a career blueprint.
                                        </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <Label htmlFor="skill-input" className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-400 ml-1">
                                                Append Technical Skill
                                            </Label>
                                            <div className="flex gap-4">
                                                <Input
                                                    id="skill-input"
                                                    value={currentSkill}
                                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                    placeholder="e.g., TypeScript, Docker, Systems Design"
                                                    className="h-14 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-indigo-500/30 text-base shadow-inner"
                                                />
                                                <Button onClick={addSkill} className="h-14 px-8 rounded-2xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-transform active:scale-95 font-semibold shadow-md">
                                                    Add
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="min-h-[140px] bg-zinc-50/50 dark:bg-zinc-900/30 rounded-3xl border border-zinc-200/50 dark:border-white/5 p-6 backdrop-blur-sm">
                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4 block">
                                                Current Stack Volume ({skills.length})
                                            </Label>
                                            {skills.length > 0 ? (
                                                <div className="flex flex-wrap gap-2.5">
                                                    {skills.map((skill) => (
                                                        <div key={skill} className="flex items-center gap-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                                                            {skill}
                                                            <button 
                                                                onClick={() => removeSkill(skill)} 
                                                                className="text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors ml-1 p-1"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-zinc-400 italic mt-6 flex items-center justify-center h-full">No variables declared in stack yet.</p>
                                            )}
                                        </div>

                                        <Button
                                            onClick={getCareerGuidance}
                                            disabled={loading || skills.length === 0}
                                            className="w-full h-14 rounded-full text-lg font-semibold bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/5 disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Synthesizing Trajectory...</>
                                            ) : (
                                                <><Sparkles className="mr-3 h-5 w-5" /> Execute Generation</>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <DialogHeader className="mb-6">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-900/20 backdrop-blur-sm mb-6 w-fit text-indigo-700 dark:text-indigo-300">
                                            <Sparkles className="w-4 h-4" />
                                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Report Generated</span>
                                        </div>
                                        <DialogTitle className="text-4xl font-extrabold tracking-tight">Intelligence Brief</DialogTitle>
                                    </DialogHeader>

                                    <div className="bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/5 p-6 rounded-[32px] w-full shadow-inner mt-4">
                                        {response.summary && (
                                            <div className="mb-8">
                                                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium bg-zinc-50/80 dark:bg-zinc-950/50 p-5 rounded-2xl border border-zinc-200/50 dark:border-white/5 shadow-sm">
                                                    {response.summary}
                                                </p>
                                            </div>
                                        )}

                                        {/* TABS IMPLEMENTATION FOR BETTER LAYOUT */}
                                        <div className="w-full">
                                            {/* Tab Buttons container */}
                                            <div className="flex space-x-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6 overflow-x-auto no-scrollbar">
                                                <button 
                                                    className="px-4 py-2 text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-full transition-all whitespace-nowrap"
                                                >
                                                    Calculated Roles
                                                </button>
                                                <button 
                                                    className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all whitespace-nowrap"
                                                    onClick={() => toast("Tab switching to be implemented with proper state")}
                                                >
                                                    Identified Skill Deltas
                                                </button>
                                                <button 
                                                    className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all whitespace-nowrap"
                                                    onClick={() => toast("Tab switching to be implemented with proper state")}
                                                >
                                                    Required Path Operations
                                                </button>
                                            </div>

                                            {/* Single Scrollable Content Area combining everything vertically for now until state is hooked up, but styled better */}
                                        <div className="max-h-[50vh] overflow-y-auto pr-2 pb-4 space-y-12 no-scrollbar custom-scroll">
                                        
                                        {response.jobOptions && response.jobOptions.length > 0 && (
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400 mb-5 pl-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Calculated Roles</h3>
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    {response.jobOptions.map((role, i) => (
                                                        <div key={i} className="p-5 bg-white/80 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                                                            <h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{role.title}</h4>
                                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed line-clamp-3">{role.responsibilities}</p>
                                                            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30">
                                                                <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 leading-relaxed"><span className="font-bold">Why:</span> {role.why}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {response.skillsToLearn && response.skillsToLearn.length > 0 && (
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400 mb-5 pl-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Identified Skill Deltas</h3>
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    {response.skillsToLearn.map((cat, i) => (
                                                        <div key={i} className="p-5 bg-white/80 dark:bg-zinc-950/50 border border-zinc-200/50 dark:border-white/5 rounded-[24px] shadow-sm">
                                                            <h4 className="font-extrabold text-[15px] mb-4 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                                                {cat.category}
                                                            </h4>
                                                            <ul className="space-y-3">
                                                                {cat.skills.map((s, j) => (
                                                                    <li key={j} className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50/80 dark:bg-zinc-900/80 rounded-xl p-4 border border-zinc-100 dark:border-white/5 transition-all hover:border-zinc-200 dark:hover:border-white/10 hover:shadow-sm">
                                                                        <div className="font-bold mb-2 text-rose-600 dark:text-rose-400 tracking-tight">{s.title}</div>
                                                                        <div className="space-y-2">
                                                                            <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed"><span className="font-semibold text-zinc-900 dark:text-zinc-300">Why:</span> {s.why}</p>
                                                                            <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed"><span className="font-semibold text-zinc-900 dark:text-zinc-300">How:</span> {s.how}</p>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {response.learningApproaches && response.learningApproaches.length > 0 && (
                                            <div className="pb-4">
                                                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400 mb-5 pl-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Required Path Operations</h3>
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    {response.learningApproaches.map((app, i) => (
                                                        <div key={i} className="p-5 bg-white/80 dark:bg-zinc-950/60 rounded-[20px] border border-zinc-200/50 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">{app.title}</h4>
                                                            <ul className="space-y-2">
                                                                {app.points.map((pt, j) => (
                                                                    <li key={j} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start leading-relaxed">
                                                                        <span className="text-emerald-500 mr-2 font-bold mt-[-1px]">·</span> {pt}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={resetDialog} 
                                        className="w-full h-14 rounded-full bg-zinc-950 dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 mt-6 active:scale-[0.98] transition-all font-semibold tracking-wide shadow-lg shadow-zinc-900/10 dark:shadow-white/5"
                                    >
                                        Dismiss Intelligence Brief
                                    </Button>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default CareerGuide