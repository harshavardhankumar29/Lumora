"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Crown, Check, ArrowLeft, Shield, Zap, Star } from "lucide-react";
import toast from "react-hot-toast";

import { paymentApi } from "@/lib/api";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import useRazorpay from "@/components/scriptLoader";

export default function SubscribePage() {
  const router = useRouter();
  const { isAuth, user, setUser } = useAppContext();
  const razorpayLoaded = useRazorpay();
  const [loading, setLoading] = useState(false);

  const features = [
    { icon: Zap, label: "Priority application visibility to recruiters" },
    { icon: Shield, label: "Boosted profile placement in search results" },
    { icon: Star, label: "Premium badge on all job applications" },
    { icon: Crown, label: "Access to exclusive job postings" },
  ];

  const handleSubscribe = async () => {
    if (!isAuth) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!razorpayLoaded) {
      toast.error("Payment system is loading. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await paymentApi.post("/checkout");
      const order = data.order;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Lumora",
        description: "Lumora Premium – 30 Day Subscription",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await paymentApi.post("/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success(verifyRes.data.message || "Subscription activated!");
            if (verifyRes.data.updatedUser) {
              setUser(verifyRes.data.updatedUser);
            }
            router.push(`/payment/success/${response.razorpay_payment_id}`);
          } catch {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone_number || "",
        },
        theme: {
          color: "#18181b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to initiate checkout.");
    } finally {
      setLoading(false);
    }
  };

  const isSubscribed = user?.subscription
    ? new Date(user.subscription).getTime() > Date.now()
    : false;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[600px] bg-amber-400/10 dark:bg-amber-500/10 blur-[120px] rounded-full mx-auto" />
      </div>

      <div className="max-w-lg mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 backdrop-blur-md w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)] overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="p-10 pb-0 text-center relative border-b border-zinc-200/50 dark:border-zinc-800/50 pb-8">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/20 dark:to-transparent -z-10" />
            <div className="w-20 h-20 mx-auto rounded-[24px] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-8 shadow-[0_8px_30px_rgba(245,158,11,0.3)] dark:shadow-[0_8px_30px_rgba(245,158,11,0.15)] ring-4 ring-white/50 dark:ring-black/50">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
              Lumora Premium
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-sm mx-auto font-medium leading-relaxed">
              Supercharge your job search with premium visibility and exclusive tools.
            </p>
          </div>

          {/* Pricing */}
          <div className="px-10 py-6 text-center bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">₹119</span>
              <span className="text-zinc-500 text-base font-bold">/ mo</span>
            </div>
          </div>

          {/* Features */}
          <div className="p-10">
            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/50 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  </div>
                  <span className="text-[15px] font-bold text-zinc-700 dark:text-zinc-300">{feature.label}</span>
                </div>
              ))}
            </div>

            {isSubscribed ? (
               <div className="p-5 rounded-2xl bg-green-50/80 dark:bg-green-500/10 border border-green-200/80 dark:border-green-500/20 text-center backdrop-blur-sm transition-all shadow-[0_4px_20px_rgba(34,197,94,0.05)]">
                 <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 font-black text-lg">
                   <div className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-500/20 flex items-center justify-center">
                     <Check className="w-4 h-4" />
                   </div>
                   Premium Active
                 </div>
                 <p className="text-sm font-bold text-green-600/80 dark:text-green-500/80 mt-2 tracking-wide uppercase">
                   Valid until {new Date(user!.subscription!).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                 </p>
               </div>
             ) : (
               <Button
                 onClick={handleSubscribe}
                 disabled={loading}
                 className="w-full h-16 text-lg rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black hover:shadow-[0_8px_30px_rgba(245,158,11,0.3)] dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.2)] active:scale-[0.98] transition-all duration-300"
               >
                 {loading ? (
                   <Loader2 className="w-6 h-6 animate-spin" />
                 ) : (
                   <>
                     <span className="flex items-center gap-2">
                       <Crown className="w-6 h-6" /> 
                       Upgrade to Premium
                     </span>
                   </>
                 )}
               </Button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
