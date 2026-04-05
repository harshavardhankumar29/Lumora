"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Briefcase, Lock, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill out both fields");
      return;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
    }

    setLoading(true);
    try {
      const response = await authApi.post(`/reset/${token}`, { password });
      toast.success(response.data.message || "Password updated successfully!");
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password. Link may be expired.");
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
                <Lock className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">New Password</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">Secure your account with a strong replacement key</p>
            </div>
          </div>

          {success ? (
             <div className="p-6 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 text-center mb-2">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 items-center justify-center border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Password Updated</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Your authentication block has been successfully recalculated.</p>
                <Button onClick={() => router.push("/login")} className="w-full h-14 text-md rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 font-bold shadow-sm">
                    Proceed to Login
                </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">New Password</Label>
                    <div className="relative flex items-center group">
                        <Lock className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Confirm Password</Label>
                    <div className="relative flex items-center group">
                        <Lock className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                        <Input 
                            id="confirmPassword" 
                            type="password" 
                            placeholder="••••••••" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                            required
                        />
                    </div>
                </div>

                <Button 
                    disabled={loading}
                    className="w-full h-14 text-md rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 mt-2 active:scale-[0.98] font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                >
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Confirm Reset"}
                </Button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
