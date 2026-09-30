import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  PlusCircle, 
  ArrowDownLeft, 
  ArrowUpRight, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Sliders,
  DollarSign
} from 'lucide-react';

export const Phase12PaymentsWallet: React.FC = () => {
  const { 
    walletBalance, 
    transactions, 
    setIsTopUpModalOpen,
    topUpWallet,
    showToast
  } = useApp();

  const [autoRechargeEnabled, setAutoRechargeEnabled] = useState(true);
  const [autoRechargeThreshold, setAutoRechargeThreshold] = useState(20);
  const [autoRechargeAmount, setAutoRechargeAmount] = useState(50);

  const handleSaveAutoRecharge = () => {
    showToast('Auto-recharge rules updated.');
  };

  return (
    <div className="space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 12 · BILLING & CREDITS ⭐
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Pay-As-You-Go Verification Wallet</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Verification Credit Wallet & Payment Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Micro-billed verification units for Meta WhatsApp Cloud API, SMS Telco aggregators, and AI IVR telephony.
          </p>
        </div>

        <button
          onClick={() => setIsTopUpModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Top Up Credits</span>
        </button>
      </div>

      {/* Grid: Balance Card + Unit Rates + Auto Recharge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Available Credit Balance</span>
              <Wallet className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="pt-2">
              <span className="text-3xl font-mono font-bold text-white tabular-nums">
                ${walletBalance.toFixed(2)}
              </span>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                ≈ {Math.floor(walletBalance / 0.015)} WhatsApp verifications
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Card: Visa ···· 4242</span>
            <span className="text-emerald-400 font-mono text-[11px]">ACTIVE</span>
          </div>
        </div>

        {/* Real-time Channel Pricing Table */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-semibold text-slate-300 uppercase font-mono">
            Unit Rates per Verification
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
              <span className="text-slate-300">WhatsApp Interactive Thread</span>
              <span className="font-mono text-emerald-400 font-bold">$0.015 / session</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
              <span className="text-slate-300">SMS OTP (Domestic Telco)</span>
              <span className="font-mono text-emerald-400 font-bold">$0.008 / sms</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
              <span className="text-slate-300">AI Voice IVR Call (60s cap)</span>
              <span className="font-mono text-emerald-400 font-bold">$0.025 / call</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Deducted in real time per outbound session. Unused credits never expire.
          </p>
        </div>

        {/* Auto Recharge Guard */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-300 uppercase font-mono">
              Auto-Recharge Protection
            </h3>
            <input
              type="checkbox"
              checked={autoRechargeEnabled}
              onChange={(e) => setAutoRechargeEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Prevents verification disruptions during flash sales or ad spikes.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Trigger Threshold:</span>
              <span className="font-mono text-white font-bold">${autoRechargeThreshold}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Recharge Amount:</span>
              <span className="font-mono text-white font-bold">${autoRechargeAmount}</span>
            </div>
          </div>

          <button
            onClick={handleSaveAutoRecharge}
            className="w-full mt-2 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded transition-colors"
          >
            Save Thresholds
          </button>
        </div>
      </div>

      {/* Real-time Transaction Ledger */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Credit Transaction Ledger</h3>
            <p className="text-xs text-slate-400">Atomic log of all top-ups and micro-deductions</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{transactions.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-6">TRANSACTION ID</th>
                <th className="py-3 px-6">TYPE</th>
                <th className="py-3 px-6">DESCRIPTION</th>
                <th className="py-3 px-6">TIMESTAMP</th>
                <th className="py-3 px-6 text-right">AMOUNT</th>
                <th className="py-3 px-6 text-right">BALANCE AFTER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-6 text-slate-400">{tx.id}</td>
                  <td className="py-3 px-6">
                    <span className={`inline-flex items-center gap-1 font-semibold text-[10px] uppercase px-1.5 py-0.5 rounded ${
                      tx.type === 'credit'
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                        : 'text-slate-400 bg-slate-950 border border-slate-800'
                    }`}>
                      {tx.type === 'credit' ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-6 font-sans text-white text-xs">{tx.description}</td>
                  <td className="py-3 px-6 text-slate-400 text-[11px]">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                  <td className={`py-3 px-6 text-right font-bold tabular-nums ${tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {tx.type === 'credit' ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(3)}`}
                  </td>
                  <td className="py-3 px-6 text-right text-white tabular-nums">
                    ${tx.balanceAfter.toFixed(2)}
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
