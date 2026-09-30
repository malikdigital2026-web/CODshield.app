import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CreditCard, ShieldCheck, Zap, Coins } from 'lucide-react';

export const TopUpWalletModal: React.FC = () => {
  const { isTopUpModalOpen, setIsTopUpModalOpen, topUpWallet } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isTopUpModalOpen) return null;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      topUpWallet(selectedAmount);
      setIsProcessing(false);
    }, 800);
  };

  const packages = [
    { amount: 25, label: '$25 USD', units: '≈ 1,650 WhatsApp Sessions' },
    { amount: 50, label: '$50 USD', units: '≈ 3,330 WhatsApp Sessions', popular: true },
    { amount: 100, label: '$100 USD', units: '≈ 6,660 WhatsApp Sessions' },
    { amount: 250, label: '$250 USD', units: '≈ 16,600 WhatsApp Sessions' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Top Up Verification Credits</h3>
          </div>
          <button
            onClick={() => setIsTopUpModalOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Select a credit pack to top up your balance. Credits never expire and are deducted only upon successful message dispatch.
        </p>

        {/* Credit Pack Options */}
        <div className="grid grid-cols-2 gap-2.5">
          {packages.map(pkg => (
            <button
              key={pkg.amount}
              type="button"
              onClick={() => setSelectedAmount(pkg.amount)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedAmount === pkg.amount
                  ? 'bg-emerald-950/40 border-emerald-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-white">{pkg.label}</span>
                {pkg.popular && (
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">Popular</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{pkg.units}</p>
            </button>
          ))}
        </div>

        {/* Payment Method preview */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CreditCard className="h-4 w-4 text-emerald-400" />
            <span>Visa ending in <strong>4242</strong></span>
          </div>
          <span className="font-mono text-emerald-400 text-[11px]">Stripe 1-Click</span>
        </div>

        <button
          onClick={handleProcessPayment}
          disabled={isProcessing}
          className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          {isProcessing ? (
            <span>Charging card ${selectedAmount}...</span>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Confirm & Add ${selectedAmount}.00 to Wallet</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
