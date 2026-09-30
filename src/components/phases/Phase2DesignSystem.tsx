import React from 'react';
import { Sparkles, Palette, Type, Layout, ShieldCheck } from 'lucide-react';

export const Phase2DesignSystem: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 2 · DESIGN TOKENS & UX
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Human-Crafted Aesthetic</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            UI/UX Constitution & Design Tokens
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict adherence to the 60-30-10 color discipline, zero-pill typography, and single-elevation cards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">60-30-10 Color Discipline</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>60% Deep Neutral Canvas</strong> (slate-950), <strong>30% Structural Surfaces</strong> (slate-900 with subtle 1px slate-800 dividers), and <strong>10% Emerald Accent</strong> concentrated exclusively on high-intent actions.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Zero-Pill Metadata</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Eliminates arbitrary pill badges and capsule containers around passive metadata. Informational tags use clean text with typographical dot separators (<code>·</code>), preserving badges exclusively for functional interactive buttons.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Layout className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Tabular Numerals Alignment</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every price, percentage, latency metric, and order ID is formatted with monospaced tabular numerals (<code>font-mono tabular-nums</code>), eliminating visual jitter during live updates.
          </p>
        </div>
      </div>
    </div>
  );
};
