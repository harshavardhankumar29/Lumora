"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Mail, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.post("/forgot", { email });
      toast.success(response.data.message || "Reset link sent!");
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
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

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
        <div className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl p-8 sm:p-10 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)] transition-shadow hover:shadow-[0_8px_50px_rgba(0,0,0,0.08)]">
          
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 items-center justify-center border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mx-auto mb-2">
                <Briefcase className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Reset Password</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">Provide your email to receive a recovery link</p>
            </div>
          </div>

          {success ? (
            <div className="p-6 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 text-center mb-2">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 items-center justify-center border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm mx-auto mb-4">
                  <Mail className="w-6 h-6 text-zinc-900 dark:text-white" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Check your inbox</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">We've sent a secure recovery link to <span className="text-zinc-900 dark:text-zinc-300 font-semibold">{email}</span></p>
                <Button onClick={() => router.push("/login")} className="w-full h-14 text-md rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 font-bold shadow-sm">
                    Back to Login
                </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Email Address</Label>
                <div className="relative flex items-center group">
                  <Mail className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                    required
                  />
                </div>
              </div>

              <Button 
                disabled={loading}
                className="w-full h-14 text-md rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 mt-2 active:scale-[0.98] font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Send Recovery Link"}
              </Button>
            </form>
          )}

          <div className="mt-8 text-center pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <button 
                onClick={() => router.push('/login')} 
                className="text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors gap-2 inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4" /> Wait, I remember my password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
