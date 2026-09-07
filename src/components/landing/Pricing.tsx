import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Coins, Check, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useUserStore } from "@/store/z-store";
import { getToken } from "@/lib/cookies";
import {
  type TokenPackage,
  useGetTokenPackages,
  usePurchaseTokensPaystack,
  findPaymentUrl,
} from "@/queries/token-wallet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  price: string;
  tokens: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "₦1,000",
    tokens: "100 Tokens",
    features: ["Access to all video lessons", "Practice CBTs", "Basic performance analytics"],
  },
  {
    name: "Pro",
    price: "₦3,000",
    tokens: "350 Tokens",
    features: [
      "Everything in Starter",
      "AI Tutor & Explanations",
      "Detailed performance analytics",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Advanced",
    price: "₦5,000",
    tokens: "600 Tokens",
    features: ["Everything in Pro", "Mock exams & simulations", "Download resources", "Priority support"],
  },
  {
    name: "Premium",
    price: "₦10,000",
    tokens: "1,400 Tokens",
    features: [
      "Everything in Advanced",
      "Unlimited mock exams",
      "1-on-1 teacher support",
      "Early access to new features",
    ],
  },
];

const perks = ["Pay once, use across all exams", "No monthly subscriptions", "Secure payments", "Use on web & mobile"];

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onOpenChange, plan }) => {
  const router = useRouter();

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl p-6">
        <div className="flex w-full flex-col gap-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Coins className="h-6 w-6" />
          </div>

          <DialogHeader className="space-y-1.5 text-center sm:text-center">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Get Started with {plan.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              You need a Classore account to purchase tokens and access study bundles.
            </DialogDescription>
          </DialogHeader>

          {/* Plan preview summary */}
          <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3.5 flex items-center justify-between">
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">{plan.name} Pack</p>
              <p className="text-xs text-violet-700 font-medium">{plan.tokens}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-extrabold text-gray-900">{plan.price}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <Button
              type="button"
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-2.5 rounded-xl shadow-sm"
              onClick={() => {
                onOpenChange(false);
                router.push("/signin?redirect=/dashboard/wallet");
              }}
            >
              Sign In to Continue
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-2.5 rounded-xl"
              onClick={() => {
                onOpenChange(false);
                router.push(`/signup?plan=${plan.name.toLowerCase()}`);
              }}
            >
              Create a Free Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Pricing() {
  const router = useRouter();
  const { user } = useUserStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthenticated = isMounted && (Boolean(user) || Boolean(getToken()));

  const { data: packages } = useGetTokenPackages({
    enabled: isAuthenticated,
  });

  const [pendingPlanName, setPendingPlanName] = React.useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [selectedPlanForAuth, setSelectedPlanForAuth] = React.useState<Plan | null>(null);

  const purchaseMutation = usePurchaseTokensPaystack({
    onSuccess: (data) => {
      const url = findPaymentUrl(data);
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Could not get payment link. Please try again.");
        console.error("[Paystack] No URL found in response:", data);
      }
      setPendingPlanName(null);
    },
    onError: (err: any) => {
      console.error("[Paystack init error]", err);
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Could not initialize payment. Please try again.";
      toast.error(typeof errMsg === "string" ? errMsg : "Could not initialize payment. Please try again.");
      setPendingPlanName(null);
    },
  });

  const getPackageForPlan = (plan: Plan, packageList?: TokenPackage[]) => {
    if (!packageList || packageList.length === 0) return null;
    const planNameLower = plan.name.toLowerCase().trim();
    const numericPrice = parseInt(plan.price.replace(/[^0-9]/g, ""), 10);

    return (
      packageList.find((p) => p.name.toLowerCase().trim() === planNameLower) ||
      packageList.find((p) => p.price === numericPrice) ||
      packageList.find((p) => p.name.toLowerCase().includes(planNameLower)) ||
      null
    );
  };

  const handlePlanClick = (plan: Plan) => {
    if (purchaseMutation.isPending) return;

    if (!isAuthenticated) {
      setSelectedPlanForAuth(plan);
      setAuthModalOpen(true);
      return;
    }

    const matchedPkg = getPackageForPlan(plan, packages);
    if (matchedPkg) {
      setPendingPlanName(plan.name);
      purchaseMutation.mutate({ packageId: matchedPkg.id, origin: "web" });
    } else {
      // If packages are not mapped directly, direct authenticated user to token wallet
      router.push("/dashboard/wallet");
    }
  };

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Pricing That Works For You</p>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Affordable Learning with Tokens</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Choose a plan that fits your goals. Spend tokens to access any exam, lesson or test.
        </p>
      </div>

      <div className="mt-8 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pt-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
        {plans.map((plan) => {
          const matchedPkg = getPackageForPlan(plan, packages);
          const hasBonus = Boolean(matchedPkg && matchedPkg.bonus_tokens > 0);
          const isPendingThisPlan = purchaseMutation.isPending && pendingPlanName === plan.name;

          return (
            <div
              key={plan.name}
              onClick={() => handlePlanClick(plan)}
              className={`group relative flex flex-col justify-between shrink-0 w-[80%] sm:w-auto snap-center rounded-2xl bg-white p-6 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-2 border-orange-500 shadow-lg"
                  : "border border-gray-100 shadow-sm hover:border-violet-300"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 rounded-full bg-orange-500 px-3.5 py-1 text-[10px] font-bold text-white shadow-sm whitespace-nowrap">
                  Most Popular
                </span>
              )}

              {hasBonus && (
                <span className="absolute right-3 top-3 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-600 border border-green-200">
                  +{matchedPkg!.bonus_tokens} bonus
                </span>
              )}

              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 transition-transform duration-200 group-hover:scale-105">
                  <Coins className="h-4 w-4 text-violet-700" />
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-2xl font-extrabold text-gray-900">{plan.price}</p>
                <p className="text-xs text-gray-400">{plan.tokens}</p>

                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-700" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                disabled={purchaseMutation.isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanClick(plan);
                }}
                className={`mt-6 w-full rounded-lg py-2.5 text-center text-xs font-semibold transition-colors disabled:opacity-60 cursor-pointer ${
                  plan.popular
                    ? "bg-[#281745] text-white hover:bg-[#382060] shadow-sm"
                    : "border border-violet-600 text-violet-700 hover:bg-violet-50"
                }`}
              >
                {isPendingThisPlan ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Processing…
                  </span>
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          );
        })}

        {/* Why Classore card */}
        <Link
          href={isAuthenticated ? "/dashboard/wallet" : "/signup"}
          className="group flex flex-col justify-between shrink-0 w-[80%] sm:w-auto snap-center rounded-2xl bg-[#F8F5FE] border border-violet-100/70 p-6 overflow-hidden relative shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-violet-300"
        >
          <div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100/90 text-violet-700 transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mt-3.5 font-bold text-gray-900">Why Classore?</h3>
            <ul className="mt-4 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-xs font-medium text-gray-700">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-700 text-white">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative -mx-6 -mb-6 mt-6 overflow-hidden rounded-b-2xl">
            <Image
              src="/assets/images/why-classore-tokens.jpg"
              alt="Why Classore - Tokens"
              width={360}
              height={220}
              className="w-full h-auto object-cover object-bottom"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Mobile carousel dots */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mt-4">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        <span className="h-1.5 w-5 rounded-full bg-violet-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
      </div>

      {/* Auth required modal */}
      <AuthModal
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        plan={selectedPlanForAuth}
      />
    </section>
  );
}
