import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  MessageSquare, 
  PhoneCall, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  RotateCcw,
  Zap,
  Store,
  ChevronRight,
  Calculator,
  Lock,
  Star
} from 'lucide-react';

export const Phase15MarketingLanding: React.FC = () => {
  const { 
    setActiveViewMode, 
    setActivePhaseId,
    setIsRoadmapModalOpen,
    subscriptionTiers,
    billingInterval,
    setBillingInterval
  } = useApp();

  // Interactive ROI Calculator State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1500);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(48);
  const [currentRtoRate, setCurrentRtoRate] = useState<number>(28);

  // Math
  const totalCodOrders = monthlyOrders;
  const currentRtoOrders = Math.round(totalCodOrders * (currentRtoRate / 100));
  const avgCourierRtoCost = 14.50; // Two-way freight, packaging, handling
  const totalRtoLossCurrent = currentRtoOrders * avgCourierRtoCost;
  
  // Post-CODShield expected RTO rate (~8.5%)
  const expectedPreventedRtos = Math.round(currentRtoOrders * 0.70); // 70% of RTOs intercepted
  const netMonthlySavings = expectedPreventedRtos * avgCourierRtoCost;
  const codshieldSaaSMonthly = 79;
  const roiMultiple = Math.round(netMonthlySavings / codshieldSaaSMonthly);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>PHASE 15 · PUBLIC MARKETING SAAS PORTAL</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance leading-tight">
          Stop Losing 30% of COD Orders to Return-to-Origin (RTO).
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
          CODShield automatically verifies buyer intent via interactive WhatsApp quick-replies, SMS OTP, and AI Voice calls before courier dispatch.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase5_dashboard');
            }}
            className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>Launch Merchant Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase7_verification');
            }}
            className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            <span>Try Verification Simulator ⭐</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Official Meta WhatsApp Cloud Partner
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 1-Click Shopify & WooCommerce App
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Zero Code Setup in 5 Minutes
          </span>
        </div>
      </section>

      {/* Interactive RTO Loss & ROI Calculator */}
      <section className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Calculator className="h-5 w-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Interactive RTO Loss & Profit Recovery Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Calculate how much dead courier freight you recover every month with automated COD verification
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/50">
            {roiMultiple}x SaaS ROI
          </span>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Monthly COD Orders</span>
              <span className="font-mono text-white font-bold">{monthlyOrders.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="15000"
              step="100"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-[11px] text-slate-500">Orders placed with COD payment</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Average Order Value (AOV)</span>
              <span className="font-mono text-white font-bold">${avgOrderValue}</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={avgOrderValue}
              onChange={(e) => setAvgOrderValue(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-[11px] text-slate-500">Average cart total</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Current Return Rate (RTO)</span>
              <span className="font-mono text-rose-400 font-bold">{currentRtoRate}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              step="1"
              value={currentRtoRate}
              onChange={(e) => setCurrentRtoRate(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-[11px] text-slate-500">Industry avg is 25% - 35%</span>
          </div>
        </div>

        {/* Output Metrics Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-xs text-slate-400">Current Monthly RTO Loss</span>
            <p className="text-2xl font-mono font-bold text-rose-400 mt-1 tabular-nums">
              ${totalRtoLossCurrent.toLocaleString()}
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">Wasted in 2-way shipping penalties</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-xs text-slate-400">Fake Orders Intercepted</span>
            <p className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">
              {expectedPreventedRtos} orders
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">Cancelled before dispatch</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-center">
            <span className="text-xs text-emerald-400 font-medium">Net Profit Saved Every Month</span>
            <p className="text-2xl font-mono font-bold text-emerald-400 mt-1 tabular-nums">
              +${netMonthlySavings.toLocaleString()}
            </p>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">Net direct bottom-line cash recovered</span>
          </div>
        </div>
      </section>

      {/* Mechanism-to-Outcome Core Pillars */}
      <section className="max-w-5xl mx-auto space-y-8 px-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            How CODShield Eliminates Return Losses
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            From checkout trigger to courier handover, every order passes through our 4-stage automated defense pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">01. 1-Click Interactive WhatsApp Bot</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Customers receive an official WhatsApp message seconds after placing a COD order. With 1 tap on "Confirm Order" or "Cancel", intent is locked in. If they made a mistake, you find out before spending shipping freight.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">02. Instant Prepaid Conversion Incentives</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Offer a 5% discount link right inside WhatsApp. Buyers pay instantly using UPI, Apple Pay, or credit card, converting a risky COD booking into guaranteed, non-returnable upfront cash.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <PhoneCall className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">03. AI Voice IVR Automated Calling</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For elderly or non-WhatsApp customers, our AI voice agent calls the recipient automatically: "Press 1 to confirm, 2 to cancel". Operates 24/7 in 12 regional languages.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">04. Cross-Merchant Fraud Blacklist Network</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Phone numbers with a history of rejecting COD deliveries across thousands of stores are instantly flagged. Set rules to block or demand advance non-refundable deposit.
            </p>
          </div>
        </div>
      </section>

      {/* Attributable Testimonials */}
      <section className="max-w-4xl mx-auto space-y-6 px-4">
        <h2 className="text-xl font-bold text-white text-center">
          Proven at Scale by E-Commerce Operators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "We were losing nearly $12,000 every month on courier return charges for our apparel brand. CODShield brought our RTO from 34% down to 8.6% in our first 30 days. It paid for itself within 24 hours."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs font-bold text-white">Aditya Singhania</p>
              <p className="text-[11px] text-slate-400">Head of Operations, UrbanStyle Fashion</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "The prepaid conversion incentive is pure gold. Over 22% of our cash-on-delivery buyers convert to instant UPI on WhatsApp because of the 5% discount offer. That's cash in the bank before we even pack the box."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs font-bold text-white">Meera Nambiar</p>
              <p className="text-[11px] text-slate-400">Founder & CEO, Organica Naturals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Ready to Protect Your Cash-on-Delivery Deliveries?
        </h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Start verifying orders in under 5 minutes. Works natively with Shopify, WooCommerce, and custom checkout APIs.
        </p>
        <button
          onClick={() => {
            setActiveViewMode('saas_app');
            setActivePhaseId('phase5_dashboard');
          }}
          className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
        >
          Open Merchant Console
        </button>
      </section>
    </div>
  );
};
