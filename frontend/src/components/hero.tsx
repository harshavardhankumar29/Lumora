"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Hero = () => {
    const router = useRouter();

    return (
        <section className="relative w-full overflow-hidden border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black pt-32 md:pt-40">
            <style>
                {`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                `}
            </style>

            {/* Ambient Background Structure with Spatial Radial Gradient Depth */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <div className="w-[800px] h-[600px] bg-zinc-400/20 dark:bg-zinc-800/20 blur-[100px] rounded-full" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md mb-8 shadow-sm">
                        <Sparkles className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                        <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">The Next Generation Job Portal</span>
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
                        Accelerate your career with <span className="bg-gradient-to-r from-zinc-500 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-500">precision.</span>
                    </h1>
                    
                    {/* Subheadline */}
                    <p className="animate-fade-up delay-200 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed">
                        Where elite talent meets extraordinary opportunity. Stop searching and start building your future today, with intelligent matching.
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-fade-up delay-300 flex flex-col items-center w-full">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button 
                                onClick={() => router.push('/jobs')}
                                className="group h-14 px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-lg font-semibold active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                            >
                                Explore Open Roles
                            </Button>
                            <Button 
                                onClick={() => router.push('/company')}
                                variant="ghost"
                                className="group h-14 px-8 rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-lg font-semibold text-zinc-900 dark:text-white active:scale-[0.98] transition-all"
                            >
                                Hire Top Talent <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                        <p className="text-xs font-medium text-zinc-500 mt-4">Free for candidates. Takes 2 minutes to join.</p>
                    </div>

                    {/* Highly Crafted Social Proof block */}
                    <div className="animate-fade-up delay-300 mt-20 pt-10 w-full max-w-3xl border-t border-zinc-200 dark:border-zinc-900">
                        <p className="text-xs font-semibold text-zinc-500 mb-8 uppercase tracking-widest">Powering teams at modern companies</p>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Premium Generic SVG Logos to replace simple lucide icons */}
                            <svg className="h-7 w-auto" viewBox="0 0 100 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 15L0 30V0L15 15ZM30 15L15 30V0L30 15Z" />
                                <text x="40" y="22" className="text-xl font-bold tracking-tighter" fill="currentColor">ACME CORP</text>
                            </svg>
                            <svg className="h-6 w-auto" viewBox="0 0 120 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <circle cx="30" cy="15" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <text x="48" y="22" className="text-xl font-black tracking-tight" fill="currentColor">NEXUS</text>
                            </svg>
                            <svg className="h-7 w-auto" viewBox="0 0 110 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0" y="5" width="20" height="20" rx="4" />
                                <rect x="8" y="0" width="20" height="20" rx="4" fillOpacity="0.5" />
                                <text x="38" y="22" className="text-xl font-semibold tracking-wide" fill="currentColor">VELOCITY</text>
                            </svg>
                        </div>
                    </div>

                    {/* UI Teaser/Visual Anchor */}
                    <div className="animate-fade-up delay-300 mt-20 w-full relative">
                        <div className="relative mx-auto w-full max-w-5xl aspect-[21/9] rounded-t-2xl md:rounded-t-3xl border border-b-0 border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                            {/* Browser-like Header */}
                            <div className="absolute top-0 w-full h-12 md:h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 md:px-6 gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-zinc-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-zinc-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-zinc-700"></div>
                                </div>
                                <div className="w-48 md:w-64 h-6 rounded-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"></div>
                            </div>
                            
                            {/* Dashboard Mockup Lines */}
                            <div className="mt-16 md:mt-20 p-6 flex flex-col gap-4 w-full h-full">
                                <div className="w-full flex gap-4">
                                    <div className="w-1/4 h-32 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"></div>
                                    <div className="w-3/4 flex flex-col gap-4">
                                        <div className="w-full h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"></div>
                                        <div className="w-full h-16 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Fade Mask */}
                            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;