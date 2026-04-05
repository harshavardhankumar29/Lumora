import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRight, Briefcase, Zap, Shield, Globe, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Us | Lumora",
  description: "Learn more about Lumora's mission to revolutionize the job hunt.",
};

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black w-full flex flex-col font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black">
        {/* Ambient Gradient Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[500px] bg-zinc-400/20 dark:bg-zinc-800/20 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md mx-auto shadow-sm">
              <Shield className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">Our Mission</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Redefining the <span className="bg-gradient-to-r from-zinc-500 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-500">modern workforce.</span>
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              At Lumora, we are building the definitive infrastructure for career acceleration. By combining elite talent with world-class opportunities through advanced intelligence protocols, we eliminate friction in the hiring stack.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-24 bg-zinc-50 dark:bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            <div className="group bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl p-10 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(255,255,255,0.02)] hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/80 to-transparent dark:from-zinc-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                  <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:scale-105 transition-transform duration-500">
                    <Zap className="w-6 h-6 text-zinc-900 dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">Instant Velocity</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
                    No more waiting for weeks in the candidate void. Our systems flag and immediately connect high-signal candidates with the right internal recruiters.
                  </p>
              </div>
            </div>

            <div className="group bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl p-10 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(255,255,255,0.02)] hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/80 to-transparent dark:from-zinc-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:scale-105 transition-transform duration-500">
                    <Globe className="w-6 h-6 text-zinc-900 dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">Global Reach</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
                    Talent is distributed, but opportunity frequently isn't. We break down enterprise walls, giving you access to top tier roles anywhere on the planet.
                  </p>
               </div>
            </div>

            <div className="group bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl p-10 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(255,255,255,0.02)] hover:-translate-y-1 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/80 to-transparent dark:from-zinc-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:scale-105 transition-transform duration-500">
                    <Briefcase className="w-6 h-6 text-zinc-900 dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">Enterprise Standard</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
                    A platform built to handle massive scale. Whether you are scaling a startup or maintaining a titan, Lumora processes operational hiring seamlessly.
                  </p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black overflow-hidden relative">
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[300px] bg-zinc-400/10 dark:bg-zinc-800/20 blur-[100px] rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md mx-auto shadow-sm">
              <Sparkles className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">Elevate Your Position</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
              Ready to execute your next move?
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Join thousands of engineers, designers, and operators scaling the world's best companies on Lumora.
            </p>
            
            <div className="pt-4">
              <Link href="/jobs">
                <Button className="h-14 px-10 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-lg font-bold transition-all active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
                  Initialize Search <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Area - Mirroring Landing Page */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-60">
          <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 md:mb-0">
            © 2026 Lumora Technology. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-bold tracking-tight text-zinc-500">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Enterprise API</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default About;