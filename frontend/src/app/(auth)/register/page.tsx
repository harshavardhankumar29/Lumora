"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Mail, Lock, User, Phone, Briefcase, UserRound, Sparkles, FileText, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    bio: "",
    role: "jobseeker" as "jobseeker" | "recruiter"
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
      toast.error("Please fill in all basic fields");
      return;
    }

    if (formData.role === "jobseeker" && !file) {
      toast.error("Resume file is required");
      return;
    }

    setLoading(true);
    try {
      let payload;
      let headers = {};

      if (formData.role === "jobseeker") {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("phoneNumber", formData.phoneNumber);
        data.append("role", formData.role);
        data.append("bio", formData.bio);
        data.append("file", file as Blob);
        payload = data;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        payload = {
           name: formData.name,
           email: formData.email,
           password: formData.password,
           phoneNumber: formData.phoneNumber,
           role: formData.role
        };
      }

      const response = await authApi.post("/register", payload, { headers });
      toast.success(response.data.message || "Registration successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-zinc-50 dark:bg-black selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 border-b border-zinc-200 dark:border-zinc-900 pt-32">
      {/* Ambient Depth and Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[600px] bg-zinc-400/20 dark:bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10 animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
        <div className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl p-8 sm:p-12 md:p-16 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)] transition-shadow hover:shadow-[0_8px_50px_rgba(0,0,0,0.08)]">
          
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 items-center justify-center border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mx-auto mb-2">
                <Sparkles className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Create Account</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">Join us to discover your next big opportunity</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="font-semibold text-center block mb-3 text-zinc-700 dark:text-zinc-300">I am a...</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "jobseeker" })}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 ${
                    formData.role === "jobseeker" 
                      ? "border-zinc-900 bg-zinc-50/80 dark:border-zinc-100 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]" 
                      : "border-zinc-200/80 bg-white/50 dark:border-zinc-800/80 dark:bg-zinc-900/50 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  <UserRound className="w-6 h-6 mb-2" />
                  <span className="font-semibold text-sm">Candidate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "recruiter" })}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 ${
                    formData.role === "recruiter" 
                      ? "border-zinc-900 bg-zinc-50/80 dark:border-zinc-100 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]" 
                      : "border-zinc-200/80 bg-white/50 dark:border-zinc-800/80 dark:bg-zinc-900/50 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  <Briefcase className="w-6 h-6 mb-2" />
                  <span className="font-semibold text-sm">Recruiter</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Full Name</Label>
                <div className="relative flex items-center group">
                  <User className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Phone Number</Label>
                <div className="relative flex items-center group">
                  <Phone className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                  <Input 
                    id="phoneNumber" 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Email Address</Label>
              <div className="relative flex items-center group">
                <Mail className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Password</Label>
              <div className="relative flex items-center group">
                <Lock className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                  required
                />
              </div>
            </div>

            {formData.role === "jobseeker" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="file" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Resume / CV (PDF)</Label>
                  <div className="relative flex items-center group">
                    <FileText className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                    <Input 
                      id="file" 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="pl-12 h-14 pt-[10px] bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 file:bg-zinc-100 file:dark:bg-zinc-800 file:border-0 file:rounded-full file:px-5 file:py-1.5 file:-ml-2 file:mr-4 file:text-sm file:font-semibold file:text-zinc-700 file:dark:text-zinc-300 hover:file:bg-zinc-200 hover:file:dark:bg-zinc-700 file:transition-colors focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700 flex items-center"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Bio (Optional)</Label>
                  <div className="relative flex items-start group">
                    <AlignLeft className="absolute left-4 top-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                    <textarea 
                      id="bio" 
                      placeholder="Tell us about your professional background..." 
                      value={formData.bio}
                      onChange={handleChange}
                      className="pl-12 p-4 min-h-[100px] w-full bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 text-md rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 mt-2 active:scale-[0.98] font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="ml-2 h-5 w-5" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <button onClick={() => router.push('/login')} className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer transition-colors">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}