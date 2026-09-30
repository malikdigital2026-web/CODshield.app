import React from 'react';
import { Lock, ShieldCheck, UserCheck, Key, UserCog } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Phase4AuthRoles: React.FC = () => {
  const { currentRole, setCurrentRole, showToast } = useApp();

  const roles = [
    {
      id: 'merchant_admin',
      name: 'Store Owner / Admin',
      description: 'Full permissions: Configure verification rules, manage billing, top up wallet credits, and manage team members.',
      badge: 'CURRENT ACTIVE ROLE',
      permissions: ['Manage Billing & Plans', 'Top Up Credits', 'Edit WhatsApp Templates', 'Confirm / Cancel Orders', 'Manage Integrations']
    },
    {
      id: 'store_manager',
      name: 'Fulfillment & Dispatch Operator',
      description: 'Operational permissions: View incoming orders, trigger manual WhatsApp/SMS verification, mark orders ready for dispatch.',
      permissions: ['View Orders', 'Trigger Manual Verification', 'Inspect Customer RTO Scores', 'Export CSV Data']
    },
    {
      id: 'super_admin',
      name: 'CODShield Platform Operator',
      description: 'Global SaaS governance: View all 1,482 store tenants, monitor WhatsApp Business Cloud API uptime, manage global blacklist.',
      permissions: ['Global Tenant Directory', 'Platform MRR Telemetry', 'Provider API SLA Audits', 'Cross-Merchant Blacklist Pool']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 4 · SECURITY & RBAC
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Multi-Tenant Access Control</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Authentication & Role-Based Permissions (RBAC)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Granular access controls isolating warehouse fulfillment agents from sensitive billing cards and store credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map(r => {
          const isSelected = currentRole === r.id;

          return (
            <div
              key={r.id}
              className={`p-6 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/80 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{r.name}</h3>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      ACTIVE
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {r.description}
                </p>

                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Granted Scopes</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {r.permissions.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentRole(r.id as any);
                  showToast(`Switched active view role to: ${r.name}`);
                }}
                className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {isSelected ? 'Currently Selected' : `Switch Role Demo`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
