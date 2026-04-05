import CareerGuide from "@/components/career-guide";
import Hero from "@/components/hero";
import ResumeAnalyzer from "@/components/resume-analyser";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black w-full flex flex-col font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Hero />
      
      {/* Platform Features Grid */}
      <section className="py-24 md:py-32 bg-white dark:bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
              AI-Powered Subsystems
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Leverage advanced intelligence protocols to dominate the applicant tracking systems, map out optimal career trajectories, and secure the role you deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl mx-auto items-stretch">
            <ResumeAnalyzer />
            <CareerGuide />
          </div>
        </div>
      </section>

      {/* Footer Area Placeholder for structure */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black py-12 md:py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-60">
          <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 md:mb-0">
            © 2026 Lumora Technology. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-bold tracking-tight text-zinc-500">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Enterprise API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
