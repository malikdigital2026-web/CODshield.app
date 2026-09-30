import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Check, 
  X, 
  AlertCircle, 
  DollarSign,
  Shield,
  SlidersHorizontal
} from 'lucide-react';

export const Phase9Products: React.FC = () => {
  const { products, toggleProductCod, showToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 9 · CATALOG GOVERNANCE
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">SKU-Level Controls</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Product COD Eligibility & Advance Deposit Rules
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Disable COD on high-ticket custom products or require a mandatory partial deposit to deter impulse cancellations.
          </p>
        </div>

        <button 
          onClick={() => showToast('Rules synced to Shopify catalog.')}
          className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-md hover:bg-slate-800"
        >
          Sync SKU Rules to Store
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">PRODUCT TITLE</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4 text-right">RETAIL PRICE</th>
                <th className="py-3 px-4 text-center">HISTORICAL RTO</th>
                <th className="py-3 px-4 text-center">COD ELIGIBLE</th>
                <th className="py-3 px-4">MANDATORY DEPOSIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-normal">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-white">{p.title}</p>
                    <p className="font-mono text-slate-400 text-[10px]">SKU: {p.sku}</p>
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    {p.category}
                  </td>

                  <td className="py-3 px-4 text-right font-mono text-white font-semibold tabular-nums">
                    ${p.price.toFixed(2)}
                  </td>

                  <td className="py-3 px-4 text-center font-mono">
                    <span className={p.historicalRtoRate > 20 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                      {p.historicalRtoRate.toFixed(1)}%
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleProductCod(p.id)}
                      className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2.5 py-1 rounded transition-colors ${
                        p.codAllowed
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800/50 hover:bg-rose-900/60'
                      }`}
                    >
                      {p.codAllowed ? 'COD ALLOWED' : 'COD DISABLED'}
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    {p.requiresAdvanceDeposit ? (
                      <span className="font-mono text-amber-300 text-[11px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
                        ${p.advanceDepositAmount?.toFixed(2)} advance fee
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-[11px]">None required</span>
                    )}
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
