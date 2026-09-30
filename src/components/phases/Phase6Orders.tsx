import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  Send, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  ExternalLink, 
  Download, 
  AlertTriangle,
  ArrowUpDown,
  Zap,
  Eye,
  X
} from 'lucide-react';
import { Order, VerificationStatus } from '../../types';

export const Phase6Orders: React.FC = () => {
  const { 
    orders, 
    triggerVerification, 
    confirmOrder, 
    cancelOrder, 
    convertOrderToPrepaid,
    showToast,
    setActivePhaseId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'high_risk'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') return o.verificationStatus === 'pending' || o.verificationStatus.includes('sent');
    if (statusFilter === 'confirmed') return o.verificationStatus === 'confirmed' || o.verificationStatus === 'converted_prepaid';
    if (statusFilter === 'cancelled') return o.verificationStatus.includes('cancel');
    if (statusFilter === 'high_risk') return o.rtoRiskScore >= 50;

    return true;
  });

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Order,Customer,Phone,City,Total,Risk%,Status"].join(",") + "\n"
      + filteredOrders.map(o => `${o.orderNumber},"${o.customerName}",${o.customerPhone},${o.shippingAddress.city},${o.totalAmount},${o.rtoRiskScore},${o.verificationStatus}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `codshield-orders-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV of filtered orders.');
  };

  return (
    <div className="space-y-6">
      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 6 · FULFILLMENT QUEUE
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Order Ledger</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Orders & Verification Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Verify buyer intent, evaluate address reliability, and intercept fake or non-serious COD bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Control bar: search + segmented status filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search order number, customer, phone, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Segmented Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'pending'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'confirmed'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Verified / Ready
          </button>
          <button
            onClick={() => setStatusFilter('high_risk')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'high_risk'
                ? 'bg-slate-800 text-rose-400 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            High RTO Risk
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'cancelled'
                ? 'bg-slate-800 text-rose-300 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cancelled / Saved
          </button>
        </div>
      </div>

      {/* High Density Data Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">ORDER</th>
                <th className="py-3 px-4">CUSTOMER</th>
                <th className="py-3 px-4">DESTINATION</th>
                <th className="py-3 px-4 text-right">TOTAL</th>
                <th className="py-3 px-4 text-center">RTO RISK</th>
                <th className="py-3 px-4">VERIFICATION STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-normal">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const isHighRisk = order.rtoRiskScore >= 70;
                  const isMedRisk = order.rtoRiskScore >= 35 && order.rtoRiskScore < 70;

                  return (
                    <tr 
                      key={order.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {/* Order info */}
                      <td className="py-3 px-4 font-mono">
                        <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {order.orderNumber}
                        </span>
                        <div className="text-[10px] text-slate-500 capitalize">
                          {order.storeSource} · {order.items.length} items
                        </div>
                      </td>

                      {/* Customer info */}
                      <td className="py-3 px-4">
                        <p className="font-medium text-slate-200">{order.customerName}</p>
                        <p className="text-[11px] font-mono text-slate-400">{order.customerPhone}</p>
                      </td>

                      {/* Address */}
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-slate-300 truncate">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        <p className="text-[10px] text-slate-400 truncate">
                          Address score: <span className="font-mono text-slate-300">{order.shippingAddress.addressQualityScore}/100</span>
                        </p>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 text-right font-mono tabular-nums">
                        <span className="font-semibold text-white">${order.totalAmount.toFixed(2)}</span>
                        <div className="text-[10px] text-slate-400 uppercase">{order.paymentMethod}</div>
                      </td>

                      {/* RTO Risk */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center font-mono font-bold text-[11px] px-2 py-0.5 rounded border ${
                          isHighRisk 
                            ? 'text-rose-400 bg-rose-950/40 border-rose-800/50' 
                            : isMedRisk 
                            ? 'text-amber-400 bg-amber-950/40 border-amber-800/50' 
                            : 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50'
                        }`}>
                          {order.rtoRiskScore}%
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${
                            order.verificationStatus === 'confirmed' ? 'bg-emerald-400' :
                            order.verificationStatus === 'converted_prepaid' ? 'bg-amber-400' :
                            order.verificationStatus.includes('cancel') ? 'bg-rose-400' :
                            order.verificationStatus.includes('sent') ? 'bg-sky-400' : 'bg-slate-500'
                          }`} />
                          <span className="font-medium text-slate-200 capitalize">
                            {order.verificationStatus.replace(/_/g, ' ')}
                          </span>
                        </div>
                        {order.verificationChannelUsed && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            via {order.verificationChannelUsed}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {order.verificationStatus === 'pending' || order.verificationStatus.includes('sent') ? (
                            <>
                              <button
                                onClick={() => triggerVerification(order.id, 'whatsapp')}
                                className="p-1.5 text-emerald-400 hover:bg-emerald-950/50 border border-emerald-900/50 rounded transition-colors"
                                title="Send WhatsApp Verification"
                              >
                                <Send className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => confirmOrder(order.id)}
                                className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors"
                                title="Mark Manually Confirmed"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => cancelOrder(order.id)}
                                className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                                title="Cancel Order"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                            >
                              Inspect
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <span>{selectedOrder.orderNumber}</span>
                  <span>·</span>
                  <span>{selectedOrder.storeSource.toUpperCase()}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Order Details & Verification Audit
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400">CUSTOMER INFO</span>
                <p className="font-semibold text-white">{selectedOrder.customerName}</p>
                <p className="font-mono text-slate-300">{selectedOrder.customerPhone}</p>
                <p className="text-slate-400">{selectedOrder.customerEmail}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400">SHIPPING DESTINATION</span>
                <p className="text-slate-200">{selectedOrder.shippingAddress.street}</p>
                <p className="text-slate-300">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                <p className="text-slate-400">Address Score: <strong className="text-emerald-400 font-mono">{selectedOrder.shippingAddress.addressQualityScore}/100</strong></p>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-medium text-slate-400">RTO RISK ANALYSIS</span>
                <span className="font-mono font-bold text-amber-400">{selectedOrder.rtoRiskScore}% RISK</span>
              </div>
              <ul className="space-y-1 text-slate-300">
                {selectedOrder.rtoRiskFactors.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-slate-500">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions inside modal */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setActivePhaseId('phase7_verification');
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
              >
                <span>Launch in Phone Verification Simulator ⭐</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    cancelOrder(selectedOrder.id);
                    setSelectedOrder(null);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900 border border-rose-800/50 rounded-lg transition-colors"
                >
                  Cancel Order (Save RTO)
                </button>
                <button
                  onClick={() => {
                    confirmOrder(selectedOrder.id);
                    setSelectedOrder(null);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-xs"
                >
                  Approve COD & Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
