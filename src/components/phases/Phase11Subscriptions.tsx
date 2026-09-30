import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Check, 
  CreditCard, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Download
} from 'lucide-react';

export const Phase11Subscriptions: React.FC = () => {
  const { 
    subscriptionTiers, 
    activeSubscriptionId, 
    setActiveSubscriptionId, 
    billingInterval, 
    setBillingInterval,
    showToast,
    setIsTopUpModalOpen
  } = useApp();

  const handleSelectTier = (tierId: string) => {
    setActiveSubscriptionId(tierId);
    const tier = subscriptionTiers.find(t => t.id === tierId);
    showToast(`Subscribed to ${tier?.name}! Included verification credits allocated.`);
  };

  return (
    <div className="space-y-6">
      {/* Title & Billing Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 11 · MONETIZATION ⭐
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Merchant Plans</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Subscription Tiers & Verification Allowances
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent SaaS plans with bundled verifications. No hidden setup fees or long-term lock-in.
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              billingInterval === 'monthly'
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('annual')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              billingInterval === 'annual'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 px-1 rounded">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Subscription Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionTiers.map(tier => {
          const isCurrent = activeSubscriptionId === tier.id;
          const price = billingInterval === 'monthly' ? tier.monthlyPrice : tier.annualPrice;

          return (
            <div
              key={tier.id}
              className={`relative rounded-xl border flex flex-col justify-between p-6 transition-all ${
                isCurrent
                  ? 'bg-slate-900/90 border-emerald-500/80 shadow-lg shadow-emerald-950/30'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Recommended
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                    {tier.targetAudience}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-mono font-bold text-white tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  {billingInterval === 'annual' && (
                    <p className="text-[11px] text-emerald-400 mt-0.5">Billed annually (${price * 12}/yr)</p>
                  )}
                </div>

                {/* Quotas & Pricing Specifics */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Monthly Verifications:</span>
                    <span className="text-emerald-400 font-bold">{tier.includedVerifications.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Overage Rate:</span>
                    <span className="text-slate-300">${tier.extraVerificationCost} / unit</span>
                  </div>
                </div>

                {/* Concrete Features list */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Features Included</span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-800">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold text-center cursor-default flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Active Subscription Plan</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectTier(tier.id)}
                    className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold text-center transition-colors shadow-sm"
                  >
                    Switch to {tier.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoices & Billing History */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Billing History & Invoices</h3>
            <p className="text-xs text-slate-400">Tax invoices with GST / VAT breakdown for company accounting</p>
          </div>
          <button 
            onClick={() => setIsTopUpModalOpen(true)}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Manage Payment Cards →
          </button>
        </div>

        <div className="divide-y divide-slate-800 border-t border-slate-800 pt-2 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white font-mono">INV-2026-0920</p>
              <p className="text-slate-400 text-[11px]">Growth Tier Monthly Renewal + $100 Credit Pack</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-white font-bold">$179.00</span>
              <button 
                onClick={() => showToast('Simulated invoice PDF downloaded.')}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white font-mono">INV-2026-0820</p>
              <p className="text-slate-400 text-[11px]">Growth Tier Monthly Renewal</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-white font-bold">$79.00</span>
              <button 
                onClick={() => showToast('Simulated invoice PDF downloaded.')}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
