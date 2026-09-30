import React from 'react';
import { Layers, DollarSign, TrendingUp, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Phase1BusinessPlanning: React.FC = () => {
  const { setActivePhaseId } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 1 · STRATEGY & FOUNDATION
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Market Thesis</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Business Planning & Unit Economics Model
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            The mathematical and economic foundation solving the $28B global Cash-on-Delivery RTO crisis.
          </p>
        </div>

        <button
          onClick={() => setActivePhaseId('phase7_verification')}
          className="px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/40 flex items-center gap-1.5"
        >
          <span>Jump to Core Verification Engine ⭐</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-rose-400 uppercase">The Problem</span>
          <h3 className="text-sm font-bold text-white">The 30% RTO Bleed</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In emerging e-commerce markets (India, Middle East, SE Asia, LATAM), 60–80% of purchases are COD. However, 25%–35% get returned due to buyer remorse, fake addresses, or unavailability. Merchants pay both forward and reverse courier freight ($5–$15 per return).
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-emerald-400 uppercase">The Solution</span>
          <h3 className="text-sm font-bold text-white">Pre-Dispatch Gatekeeper</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Automating multi-channel verification via WhatsApp quick-replies, SMS OTP, and AI Voice bots. Non-serious buyers cancel before shipping, saving 100% of shipping fees. Serious buyers get address corrections and prepaid discount incentives.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase">The Economics</span>
          <h3 className="text-sm font-bold text-white">300x Return on Investment</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            A WhatsApp verification session costs $0.015. Saving a single failed shipment recovers $5.00 to $18.00 in wasted courier and repackaging costs. Merchants experience immediate payback within the first 48 hours of installation.
          </p>
        </div>
      </div>

      {/* Market Sizing Table */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white">Total Addressable Market (TAM) Sizing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono pt-2">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400">Total COD Volume</span>
            <p className="text-lg font-bold text-white mt-1">$28 Billion / yr</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400">Annual Courier Loss</span>
            <p className="text-lg font-bold text-rose-400 mt-1">$4.2 Billion / yr</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400">Addressable Stores</span>
            <p className="text-lg font-bold text-emerald-400 mt-1">450,000+ Brands</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400">SaaS Potential ARR</span>
            <p className="text-lg font-bold text-white mt-1">$380 Million</p>
          </div>
        </div>
      </div>
    </div>
  );
};
