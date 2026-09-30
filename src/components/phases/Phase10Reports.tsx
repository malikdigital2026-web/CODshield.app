import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingDown, 
  DollarSign, 
  Truck, 
  MessageSquare, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const Phase10Reports: React.FC = () => {
  const courierStats = [
    { name: 'Delhivery Surface', dispatched: 640, delivered: 588, rto: 52, deliveryRate: 91.8, avgDays: 2.8 },
    { name: 'BlueDart Express', dispatched: 410, delivered: 389, rto: 21, deliveryRate: 94.8, avgDays: 1.9 },
    { name: 'Shadowfax Quick', dispatched: 280, delivered: 242, rto: 38, deliveryRate: 86.4, avgDays: 3.4 },
    { name: 'XpressBees Standard', dispatched: 152, delivered: 136, rto: 16, deliveryRate: 89.4, avgDays: 3.1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 10 · ANALYTICS & INTELLIGENCE
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">RTO Reduction Impact</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Performance Reports & Courier Benchmarks
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit non-delivery reasons, channel efficiency, and net courier freight saved.
          </p>
        </div>
      </div>

      {/* Top 3 Impact Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>RTO Rate Reduction</span>
            <TrendingDown className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-mono font-bold text-emerald-400">8.7%</span>
            <span className="text-xs font-mono text-slate-400 line-through">34.2% Baseline</span>
          </div>
          <p className="text-[11px] text-slate-400">
            A <strong>74.5% relative drop</strong> in orders returned to origin.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Net Freight Saved</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-mono font-bold text-white">$18,420</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">+420% ROI</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Direct 2-way shipping penalties intercepted before packaging.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Prepaid Cash Conversion</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-mono font-bold text-amber-300">22.4%</span>
            <span className="text-xs font-mono text-slate-400">$32,800 paid upfront</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Buyers who upgraded from COD to UPI using the 5% discount prompt.
          </p>
        </div>
      </div>

      {/* Courier Performance Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Courier Partner Delivery Rates</h3>
            <p className="text-xs text-slate-400">Real-time delivery benchmarks post COD verification</p>
          </div>
          <span className="text-xs font-mono text-emerald-400">All Partners Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-6">COURIER PARTNER</th>
                <th className="py-3 px-6 text-right">DISPATCHED</th>
                <th className="py-3 px-6 text-right">DELIVERED</th>
                <th className="py-3 px-6 text-right">RTO FAILED</th>
                <th className="py-3 px-6 text-center">DELIVERY SUCCESS</th>
                <th className="py-3 px-6 text-right">AVG TRANSIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              {courierStats.map(c => (
                <tr key={c.name} className="hover:bg-slate-800/40">
                  <td className="py-3 px-6 font-sans text-white font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4 text-slate-400" />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3 px-6 text-right tabular-nums">{c.dispatched}</td>
                  <td className="py-3 px-6 text-right text-emerald-400 font-bold tabular-nums">{c.delivered}</td>
                  <td className="py-3 px-6 text-right text-rose-400 tabular-nums">{c.rto}</td>
                  <td className="py-3 px-6 text-center">
                    <span className="text-emerald-400 font-bold text-xs bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      {c.deliveryRate}%
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right text-slate-400">{c.avgDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
