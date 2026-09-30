import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  ChevronRight,
  PlusCircle,
  Zap,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';

export const Phase5Dashboard: React.FC = () => {
  const { 
    orders, 
    walletBalance, 
    batchVerifyPending, 
    simulateIncomingShopifyOrder,
    setActivePhaseId,
    triggerVerification,
    confirmOrder,
    cancelOrder
  } = useApp();

  const totalOrders = orders.length;
  const confirmedOrders = orders.filter(o => o.verificationStatus === 'confirmed' || o.verificationStatus === 'converted_prepaid');
  const cancelledOrders = orders.filter(o => o.verificationStatus === 'cancelled_by_customer' || o.verificationStatus === 'auto_cancelled');
  const pendingOrders = orders.filter(o => o.verificationStatus === 'pending' || o.verificationStatus === 'whatsapp_sent' || o.verificationStatus === 'sms_sent');
  
  const verificationSuccessRate = totalOrders > 0 ? ((confirmedOrders.length / (totalOrders - pendingOrders.length || 1)) * 100).toFixed(1) : '89.2';
  
  // Calculate estimated saved courier freight & dead stock loss (avg $16 per prevented RTO order)
  const savedRtoCost = cancelledOrders.length * 16.50;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 5 · REAL-TIME OPS
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Merchant Store Telemetry</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Cash-on-Delivery Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated multi-channel fraud barrier protecting orders before courier fulfillment.
          </p>
        </div>

        {/* Quick Batch Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={simulateIncomingShopifyOrder}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>Simulate Order</span>
          </button>

          <button
            onClick={batchVerifyPending}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors shadow-xs"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Verify All Pending ({pendingOrders.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total COD Orders</span>
            <ShoppingBag className="h-4 w-4 text-slate-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-white tabular-nums">
              {totalOrders + 1480}
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center">
              +14.8% <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            ${((totalOrders + 1480) * 64.2).toLocaleString()} gross GMV tracked
          </p>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Verification Rate</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">
              89.4%
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              +31.2% vs unverified
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Avg customer response: 7.4 minutes
          </p>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>RTO Losses Prevented</span>
            <RotateCcw className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-white tabular-nums">
              ${(savedRtoCost + 6240).toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </span>
            <span className="text-xs text-amber-400 font-mono">
              379 orders stopped
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Saved 2x courier shipping & restocking fees
          </p>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Prepaid Conversions</span>
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-white tabular-nums">
              18.6%
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              Zero RTO risk
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Buyers who upgraded to UPI / Card on WhatsApp
          </p>
        </div>
      </div>

      {/* Two Column Section: Live COD Pipeline Funnel & High-Risk Priority Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Verification Pipeline Funnel */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Live COD Verification Pipeline
              </h3>
              <p className="text-xs text-slate-400">
                Automated progression from order placement to verified dispatch
              </p>
            </div>
            <button
              onClick={() => setActivePhaseId('phase7_verification')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
            >
              <span>Test Engine ⭐</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Visual Step Funnel */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">1. Ingested</span>
              <p className="text-lg font-mono font-bold text-white mt-1 tabular-nums">
                {orders.length}
              </p>
              <span className="text-[10px] text-slate-500">Shopify / Woo</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-center">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">2. Dispatched</span>
              <p className="text-lg font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                {orders.filter(o => o.verificationAttempts > 0).length}
              </p>
              <span className="text-[10px] text-slate-500">WhatsApp / SMS</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-center">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">3. Confirmed</span>
              <p className="text-lg font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                {confirmedOrders.length}
              </p>
              <span className="text-[10px] text-slate-500">Safe to ship</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-center">
              <span className="text-[10px] font-mono text-rose-400 uppercase">4. Intercepted</span>
              <p className="text-lg font-mono font-bold text-rose-400 mt-1 tabular-nums">
                {cancelledOrders.length}
              </p>
              <span className="text-[10px] text-slate-500">RTO saved</span>
            </div>
          </div>

          {/* Recent Verification Actions */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono text-slate-400 font-medium">RECENT ACTIVITY STREAM</span>
            <div className="space-y-1.5">
              {orders.slice(0, 4).map(o => (
                <div 
                  key={o.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-mono text-slate-400">{o.orderNumber}</span>
                    <span className="text-white font-medium truncate">{o.customerName}</span>
                    <span className="text-slate-400 truncate">({o.shippingAddress.city})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-300 font-semibold">${o.totalAmount.toFixed(2)}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                      o.verificationStatus === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' :
                      o.verificationStatus === 'cancelled_by_customer' ? 'bg-rose-950 text-rose-400 border border-rose-800/50' :
                      o.verificationStatus === 'converted_prepaid' ? 'bg-amber-950 text-amber-300 border border-amber-800/50' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {o.verificationStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Action Queue: High RTO Risk Orders */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">
                RTO Risk Alerts
              </h3>
            </div>
            <button
              onClick={() => setActivePhaseId('phase6_orders')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
            >
              <span>View All</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Orders flagged by AI risk scoring (incomplete address, previous non-delivery history, high value).
          </p>

          <div className="space-y-3">
            {orders.filter(o => o.rtoRiskLevel === 'high' || o.rtoRiskScore > 50).slice(0, 3).map(o => (
              <div 
                key={o.id} 
                className="p-3 rounded-lg bg-slate-950 border border-rose-900/30 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-rose-400">{o.orderNumber}</span>
                  <span className="font-mono text-[11px] text-rose-400 font-bold bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/50">
                    {o.rtoRiskScore}% RISK
                  </span>
                </div>

                <div className="text-slate-300">
                  <p className="font-medium text-white">{o.customerName} · {o.customerPhone}</p>
                  <p className="text-slate-400 text-[11px] truncate">
                    {o.shippingAddress.street}, {o.shippingAddress.city}
                  </p>
                </div>

                <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-1.5 rounded border border-amber-900/30">
                  ⚠️ {o.rtoRiskFactors[0] || 'High return probability detected'}
                </div>

                {/* Instant Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => triggerVerification(o.id, 'whatsapp')}
                    className="flex-1 py-1 px-2 text-[11px] font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/50 rounded transition-colors text-center"
                  >
                    Send WhatsApp OTP
                  </button>
                  <button
                    onClick={() => cancelOrder(o.id, 'Proactively cancelled due to high fraud risk.')}
                    className="py-1 px-2 text-[11px] font-medium text-rose-300 hover:text-white bg-slate-900 border border-slate-800 rounded transition-colors"
                  >
                    Hold / Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
