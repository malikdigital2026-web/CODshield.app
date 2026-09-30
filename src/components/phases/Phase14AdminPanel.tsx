import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  Users, 
  DollarSign, 
  Activity, 
  Server, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  Lock
} from 'lucide-react';

export const Phase14AdminPanel: React.FC = () => {
  const { showToast } = useApp();

  const [tenants, setTenants] = useState([
    { id: 'ten-1', name: 'UrbanStyle Apparel', owner: 'malikdigital2026@gmail.com', plan: 'Growth ($79/mo)', monthlyVolume: 4210, status: 'active', joined: '2026-08-10' },
    { id: 'ten-2', name: 'Organica Naturals', owner: 'meera@organica.in', plan: 'Scale ($199/mo)', monthlyVolume: 12400, status: 'active', joined: '2026-07-22' },
    { id: 'ten-3', name: 'TechGear Electronics', owner: 'vikram@techgear.co', plan: 'Starter ($29/mo)', monthlyVolume: 340, status: 'active', joined: '2026-09-01' },
    { id: 'ten-4', name: 'GlamLuxe Cosmetics', owner: 'support@glamluxe.store', plan: 'Growth ($79/mo)', monthlyVolume: 3890, status: 'active', joined: '2026-08-14' },
    { id: 'ten-5', name: 'ShadyDeals Flash', owner: 'badactor@spam.net', plan: 'Starter ($29/mo)', monthlyVolume: 42, status: 'suspended', joined: '2026-09-24' },
  ]);

  const toggleTenantStatus = (id: string) => {
    setTenants(prev => prev.map(t => {
      if (t.id === id) {
        const next = t.status === 'active' ? 'suspended' : 'active';
        return { ...t, status: next };
      }
      return t;
    }));
    showToast('Merchant tenant status updated.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 14 · SUPER ADMIN CONSOLE
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Multi-Tenant Platform Ops</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            CODShield Global Infrastructure & Tenant Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Platform-wide recurring MRR, Meta WhatsApp Business API health, and merchant tenant compliance.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-xs text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          INFRASTRUCTURE NOMINAL
        </span>
      </div>

      {/* Global SaaS Platform Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Active SaaS Merchants</span>
          <p className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">1,482</p>
          <span className="text-[11px] text-emerald-400 font-mono">+128 this month</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Monthly Recurring Revenue</span>
          <p className="text-2xl font-mono font-bold text-emerald-400 mt-1 tabular-nums">$114,800</p>
          <span className="text-[11px] text-slate-400 font-mono">ARPU: $77.46/mo</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Monthly Verification Volume</span>
          <p className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">2,418,920</p>
          <span className="text-[11px] text-slate-400 font-mono">Sessions processed</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Global Fraud Blacklist Pool</span>
          <p className="text-2xl font-mono font-bold text-rose-400 mt-1 tabular-nums">142,500</p>
          <span className="text-[11px] text-slate-400 font-mono">Flagged phone numbers</span>
        </div>
      </div>

      {/* API Gateway Health */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-semibold text-slate-300 font-mono uppercase">
          Provider Connectivity & SLAs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Meta WhatsApp Cloud API</p>
              <p className="text-[11px] text-slate-400">Latency: 142ms</p>
            </div>
            <span className="font-mono text-emerald-400 font-bold">99.98%</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Domestic Telco SMS Gateway</p>
              <p className="text-[11px] text-slate-400">Latency: 84ms</p>
            </div>
            <span className="font-mono text-emerald-400 font-bold">99.95%</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">AI Voice IVR Telephony</p>
              <p className="text-[11px] text-slate-400">Latency: 310ms</p>
            </div>
            <span className="font-mono text-emerald-400 font-bold">99.92%</span>
          </div>
        </div>
      </div>

      {/* Merchant Tenants Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Merchant Accounts Directory</h3>
          <span className="text-xs font-mono text-slate-400">Showing 5 of 1,482</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-6">STORE NAME</th>
                <th className="py-3 px-6">OWNER EMAIL</th>
                <th className="py-3 px-6">PLAN</th>
                <th className="py-3 px-6 text-right">MONTHLY VOLUME</th>
                <th className="py-3 px-6">STATUS</th>
                <th className="py-3 px-6 text-right">ADMIN CONTROL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-normal">
              {tenants.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-6 font-semibold text-white">{t.name}</td>
                  <td className="py-3 px-6 font-mono text-slate-400">{t.owner}</td>
                  <td className="py-3 px-6 font-mono text-emerald-400">{t.plan}</td>
                  <td className="py-3 px-6 text-right font-mono text-white tabular-nums">
                    {t.monthlyVolume.toLocaleString()}
                  </td>
                  <td className="py-3 px-6">
                    <span className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.status === 'active' 
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' 
                        : 'bg-rose-950/60 text-rose-400 border border-rose-800/50'
                    }`}>
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => toggleTenantStatus(t.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                        t.status === 'active'
                          ? 'bg-rose-950/40 text-rose-300 hover:bg-rose-900 border border-rose-800/50'
                          : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900 border border-emerald-800/50'
                      }`}
                    >
                      {t.status === 'active' ? 'Suspend Merchant' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
