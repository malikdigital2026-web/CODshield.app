import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Star, 
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const Phase8Customers: React.FC = () => {
  const { 
    customers, 
    toggleBlacklistCustomer, 
    toggleVipCustomer,
    showToast 
  } = useApp();

  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 8 · FRAUD PROFILING
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Customer Reliability CRM</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Customer Trust Scores & Blacklist CRM
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Identify repeat reliable buyers for 1-click VIP bypass and automatically blacklist chronic returners.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search name, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* High Density Customer Grid */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">CUSTOMER</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4 text-center">TRUST SCORE</th>
                <th className="py-3 px-4 text-center">COD ORDERS</th>
                <th className="py-3 px-4 text-center">HISTORICAL RTO</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">FRAUD CONTROLS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-normal">
              {filtered.map(cust => {
                const isBlacklisted = cust.status === 'blacklisted';
                const isVip = cust.status === 'vip_whitelist';

                return (
                  <tr key={cust.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{cust.name}</p>
                      <p className="font-mono text-slate-400 text-[11px]">{cust.phone}</p>
                    </td>

                    <td className="py-3 px-4 text-slate-300">
                      {cust.city}
                    </td>

                    <td className="py-3 px-4 text-center font-mono">
                      <span className={`inline-block font-bold text-xs ${
                        cust.trustScore >= 80 ? 'text-emerald-400' :
                        cust.trustScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {cust.trustScore}/100
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-slate-200">
                      {cust.deliveredCount} delivered / {cust.codOrdersCount} COD
                    </td>

                    <td className="py-3 px-4 text-center font-mono">
                      <span className={`font-bold ${cust.rtoRate > 30 ? 'text-rose-400' : 'text-slate-400'}`}>
                        {cust.rtoRate.toFixed(1)}%
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                        isBlacklisted ? 'bg-rose-950/60 text-rose-300 border-rose-800/50' :
                        isVip ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' :
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {isBlacklisted ? 'BLACKLISTED' : isVip ? 'VIP TRUSTED' : 'STANDARD'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleVipCustomer(cust.id)}
                          className={`px-2 py-1 text-[11px] font-medium rounded border transition-colors ${
                            isVip
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                          }`}
                          title="VIP buyers bypass verification for 1-click fulfillment"
                        >
                          {isVip ? 'Remove VIP' : 'Mark VIP'}
                        </button>

                        <button
                          onClick={() => toggleBlacklistCustomer(cust.id)}
                          className={`px-2 py-1 text-[11px] font-medium rounded border transition-colors ${
                            isBlacklisted
                              ? 'bg-rose-950 text-rose-300 border-rose-800'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-rose-400'
                          }`}
                          title="Block this number from placing future COD orders"
                        >
                          {isBlacklisted ? 'Unblock' : 'Blacklist'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
