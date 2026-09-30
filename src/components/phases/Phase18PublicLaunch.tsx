import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Rocket, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  Lock, 
  Zap, 
  ArrowRight,
  PartyPopper
} from 'lucide-react';

export const Phase18PublicLaunch: React.FC = () => {
  const { isPublicLaunched, executePublicLaunch, setActiveViewMode, setActivePhaseId } = useApp();

  const [checklist, setChecklist] = useState([
    { id: 'chk-1', label: 'Multi-Region High Availability Edge CDN Deployed', status: true },
    { id: 'chk-2', label: 'Meta WhatsApp Cloud API Production Green-Tick Verified', status: true },
    { id: 'chk-3', label: 'Stripe & Razorpay Production Webhooks & Billing Live', status: true },
    { id: 'chk-4', label: 'Shopify App Store Partner Listing Reviewed & Approved', status: true },
    { id: 'chk-5', label: 'WooCommerce Marketplace Extension Signed & Packaged', status: true },
    { id: 'chk-6', label: 'SOC2 Type II & End-to-End Encryption Compliance Certified', status: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 18 · PUBLIC LAUNCH 🚀
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">General Availability</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Global Launch Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Final launch gate authorizing global traffic routing, DNS activation, and public billing.
          </p>
        </div>

        {isPublicLaunched ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            GLOBAL LAUNCH ACTIVE
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
            READY TO DEPLOY
          </span>
        )}
      </div>

      {/* Main Launch Action Card */}
      <div className={`p-8 rounded-2xl border text-center space-y-6 transition-all ${
        isPublicLaunched 
          ? 'bg-gradient-to-b from-emerald-950/40 to-slate-950 border-emerald-500/50 shadow-2xl'
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <Rocket className={`h-8 w-8 ${isPublicLaunched ? 'text-emerald-400 animate-bounce' : 'text-slate-300'}`} />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isPublicLaunched 
              ? '🎉 CODShield is Officially Live Worldwide!' 
              : 'Launch CODShield to the Public'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isPublicLaunched
              ? 'Production infrastructure is running at 100% capacity. Incoming orders from Shopify and WooCommerce merchants are being actively verified.'
              : 'All 18 phases of development, testing, billing, and partner verifications are complete. Click below to initiate public launch sequence.'}
          </p>
        </div>

        <div>
          {isPublicLaunched ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveViewMode('marketing_landing');
                  setActivePhaseId('phase15_marketing');
                }}
                className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
              >
                View Live Marketing Website
              </button>
              <button
                onClick={() => {
                  setActiveViewMode('saas_app');
                  setActivePhaseId('phase5_dashboard');
                }}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                Go to Merchant Dashboard
              </button>
            </div>
          ) : (
            <button
              onClick={executePublicLaunch}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 mx-auto"
            >
              <Rocket className="h-4 w-4" />
              <span>Execute Public Launch 🚀</span>
            </button>
          )}
        </div>
      </div>

      {/* Production Readiness Audit Checklist */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Pre-Flight Production Checklist</h3>
          <span className="text-xs font-mono text-emerald-400">6 of 6 Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {checklist.map(item => (
            <div key={item.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
