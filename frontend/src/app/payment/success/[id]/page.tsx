"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentVerification() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-950 rounded-3xl p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
          Payment Successful
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">
          Your premium subscription of <span className="font-bold text-zinc-900 dark:text-zinc-100">₹119</span> has been activated.
        </p>
        {id && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-8 font-mono">
            Transaction ID: {id}
          </p>
        )}

        <div className="space-y-3">
          <Link href="/account" className="block">
            <Button className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white font-bold shadow-sm">
              View Your Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/jobs" className="block">
            <Button variant="outline" className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800">
              <Briefcase className="w-4 h-4 mr-2" /> Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}