import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Smartphone, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  PhoneForwarded,
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { VerificationChannel } from '../../types';

export const Phase7VerificationEngine: React.FC = () => {
  const { 
    orders, 
    triggerVerification, 
    confirmOrder, 
    cancelOrder, 
    convertOrderToPrepaid,
    ruleConfig,
    updateRuleConfig,
    showToast,
    walletBalance
  } = useApp();

  const [activeChannelTab, setActiveChannelTab] = useState<VerificationChannel>('whatsapp');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[1]?.id || orders[0]?.id || '');
  const [otpInput, setOtpInput] = useState('');
  const [ivrState, setIvrState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [ivrTranscript, setIvrTranscript] = useState<string[]>([]);

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleSimulateWhatsAppConfirm = () => {
    if (!currentOrder) return;
    confirmOrder(currentOrder.id);
  };

  const handleSimulateWhatsAppCancel = () => {
    if (!currentOrder) return;
    cancelOrder(currentOrder.id, 'Customer cancelled via interactive WhatsApp button.');
  };

  const handleSimulatePrepaidConversion = () => {
    if (!currentOrder) return;
    convertOrderToPrepaid(currentOrder.id);
  };

  const handleVerifyOtp = () => {
    if (otpInput === '8492' || otpInput.length === 4) {
      if (currentOrder) confirmOrder(currentOrder.id);
      showToast('✅ OTP Verified successfully! Order approved for shipping.');
      setOtpInput('');
    } else {
      showToast('❌ Invalid OTP entered. Try typing 8492.');
    }
  };

  const startIvrCall = () => {
    setIvrState('calling');
    setIvrTranscript(['Initiating automated AI outbound call to ' + currentOrder?.customerPhone + '...']);
    
    setTimeout(() => {
      setIvrState('connected');
      setIvrTranscript(prev => [
        ...prev,
        'Call connected.',
        `AI Voice Agent: "Hello ${currentOrder?.customerName}! This is UrbanStyle. We received your Cash on Delivery order for ${currentOrder?.items[0]?.name} totaling $${currentOrder?.totalAmount.toFixed(2)}."`,
        'AI Voice Agent: "To confirm this order for immediate dispatch, press 1. To cancel this order, press 2."'
      ]);
    }, 1200);
  };

  const pressIvrKey = (key: '1' | '2') => {
    if (key === '1') {
      setIvrTranscript(prev => [
        ...prev,
        'Customer pressed [1]',
        'AI Voice Agent: "Thank you! Your order is confirmed and will be dispatched today. Goodbye!"',
        'Call completed.'
      ]);
      setIvrState('ended');
      if (currentOrder) confirmOrder(currentOrder.id);
    } else {
      setIvrTranscript(prev => [
        ...prev,
        'Customer pressed [2]',
        'AI Voice Agent: "We have cancelled your order as requested. No charges applied. Goodbye!"',
        'Call completed.'
      ]);
      setIvrState('ended');
      if (currentOrder) cancelOrder(currentOrder.id, 'Customer pressed 2 to cancel on automated IVR phone call.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 7 · CORE ENGINE ⭐
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Multi-Channel RTO Elimination</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Automated COD Verification Simulator & Rule Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Simulate end-customer verification journeys across WhatsApp Business Quick-Replies, SMS OTP, and AI Voice IVR. Responses sync to the merchant order ledger instantly.
          </p>
        </div>

        {/* Order Selector */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-2">
          <span className="text-xs text-slate-400 whitespace-nowrap">Testing Order:</span>
          <select
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            className="text-xs font-mono bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-emerald-500"
          >
            {orders.map(o => (
              <option key={o.id} value={o.id}>
                {o.orderNumber} - {o.customerName} (${o.totalAmount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Simulator Device on Left, Rules & Logic on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Phone Device Simulator */}
        <div className="lg:col-span-7 space-y-4">
          {/* Channel Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setActiveChannelTab('whatsapp')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeChannelTab === 'whatsapp'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp Bot</span>
              </button>

              <button
                onClick={() => setActiveChannelTab('sms')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeChannelTab === 'sms'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>SMS OTP</span>
              </button>

              <button
                onClick={() => setActiveChannelTab('ivr_call')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeChannelTab === 'ivr_call'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>AI Voice IVR</span>
              </button>
            </div>

            <button
              onClick={() => triggerVerification(currentOrder.id, activeChannelTab)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-md hover:bg-emerald-900/40 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Dispatch Trigger</span>
            </button>
          </div>

          {/* Interactive Phone Frame */}
          <div className="relative mx-auto max-w-sm rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 shadow-2xl overflow-hidden p-3 min-h-[580px] flex flex-col justify-between">
            {/* Top phone speaker notch */}
            <div className="flex justify-between items-center px-4 pt-1 pb-3 border-b border-slate-900 text-[10px] font-mono text-slate-500">
              <span>9:41</span>
              <div className="h-4 w-20 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-slate-800"></div>
              </div>
              <span>5G · 98%</span>
            </div>

            {/* Simulated Screen Content */}
            <div className="flex-1 py-2 flex flex-col justify-between">
              {/* WhatsApp UI Simulation */}
              {activeChannelTab === 'whatsapp' && (
                <div className="space-y-3">
                  {/* WhatsApp chat header */}
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/40">
                    <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                      U
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-white">UrbanStyle Store</span>
                        <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Official Verified Business</span>
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 text-xs text-slate-200">
                    <p className="font-medium text-white">
                      Hello {currentOrder.customerName}! 👋
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Thank you for your Cash on Delivery order <span className="font-mono text-emerald-400 font-semibold">{currentOrder.orderNumber}</span> for:
                    </p>
                    <div className="bg-slate-950/80 p-2 rounded border border-slate-800 text-[11px]">
                      <p className="font-semibold text-white truncate">{currentOrder.items[0]?.name}</p>
                      <div className="flex justify-between text-slate-400 mt-0.5 font-mono">
                        <span>Qty: {currentOrder.items[0]?.quantity}</span>
                        <span className="text-emerald-400 font-bold">${currentOrder.totalAmount.toFixed(2)} COD</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-[11px]">
                      📍 <span className="text-slate-300">Deliver to:</span> {currentOrder.shippingAddress.street}, {currentOrder.shippingAddress.city} ({currentOrder.shippingAddress.postalCode})
                    </p>

                    <div className="p-2 rounded bg-amber-950/20 border border-amber-900/30 text-[10px] text-amber-300">
                      ⚡ Special Offer: Convert to Prepaid now and get <strong>5% OFF ($4.50 discount)</strong> via UPI / Card!
                    </div>

                    <div className="text-[9px] text-slate-500 text-right font-mono">
                      Sent 09:41 · Delivered
                    </div>
                  </div>

                  {/* Interactive WhatsApp Quick-Reply Action Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] text-slate-400 text-center font-mono">
                      👇 TAP BELOW AS THE CUSTOMER:
                    </p>

                    <button
                      onClick={handleSimulateWhatsAppConfirm}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>✅ Confirm My Order for Shipping</span>
                    </button>

                    <button
                      onClick={handleSimulatePrepaidConversion}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/50 rounded-lg transition-colors"
                    >
                      <Zap className="h-4 w-4 text-amber-400" />
                      <span>⚡ Pay Now & Get 5% Discount ($85.47)</span>
                    </button>

                    <button
                      onClick={handleSimulateWhatsAppCancel}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-300 bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/40 rounded-lg transition-colors"
                    >
                      <XCircle className="h-4 w-4 text-rose-400" />
                      <span>❌ Cancel Order (No Penalty)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SMS OTP Simulation */}
              {activeChannelTab === 'sms' && (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>Sender: VK-URBNST</span>
                      <span>Just now</span>
                    </div>
                    <p className="text-slate-200">
                      Your UrbanStyle COD verification code for order {currentOrder.orderNumber} is <strong className="text-emerald-400 text-sm font-mono tracking-widest">8492</strong>. Valid for 5 minutes. Do not share.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-4 space-y-3">
                    <p className="text-xs font-semibold text-white text-center">
                      Enter 4-Digit Customer Verification Code
                    </p>
                    <div className="flex justify-center">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="8492"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-36 text-center text-xl font-mono tracking-widest bg-slate-950 border border-slate-700 rounded-md py-2 text-emerald-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
                    >
                      Validate OTP & Confirm Order
                    </button>
                  </div>
                </div>
              )}

              {/* AI Voice IVR Simulation */}
              {activeChannelTab === 'ivr_call' && (
                <div className="space-y-4">
                  <div className="text-center py-2 space-y-1">
                    <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                      <PhoneCall className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-semibold text-white">{currentOrder.customerPhone}</p>
                    <p className="text-[11px] font-mono text-emerald-400">
                      {ivrState === 'idle' ? 'Ready to Call' : ivrState === 'calling' ? 'Dialing...' : ivrState === 'connected' ? 'Connected · AI Agent Speaking' : 'Call Finished'}
                    </p>
                  </div>

                  {/* Transcript box */}
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1.5 max-h-44 overflow-y-auto">
                    {ivrTranscript.length === 0 ? (
                      <span className="text-slate-500">Click "Start Outbound Call" to test the AI dialer.</span>
                    ) : (
                      ivrTranscript.map((t, idx) => (
                        <p key={idx} className={t.includes('AI Voice') ? 'text-emerald-300' : t.includes('Customer') ? 'text-amber-300 font-semibold' : 'text-slate-400'}>
                          {t}
                        </p>
                      ))
                    )}
                  </div>

                  {/* Actions */}
                  {ivrState === 'idle' && (
                    <button
                      onClick={startIvrCall}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneForwarded className="h-4 w-4" />
                      <span>Start Outbound AI Call</span>
                    </button>
                  )}

                  {ivrState === 'connected' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => pressIvrKey('1')}
                        className="py-2 px-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors text-center"
                      >
                        Press [1] Confirm
                      </button>
                      <button
                        onClick={() => pressIvrKey('2')}
                        className="py-2 px-2 text-xs font-semibold text-rose-300 bg-rose-950 border border-rose-800 rounded-lg transition-colors text-center"
                      >
                        Press [2] Cancel
                      </button>
                    </div>
                  )}

                  {ivrState === 'ended' && (
                    <button
                      onClick={() => {
                        setIvrState('idle');
                        setIvrTranscript([]);
                      }}
                      className="w-full py-1.5 text-xs font-medium text-slate-300 bg-slate-800 rounded hover:bg-slate-700 transition-colors"
                    >
                      Reset Call Simulator
                    </button>
                  )}
                </div>
              )}

              {/* Order Status Ribbon inside phone */}
              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Current State:</span>
                <span className={`font-semibold uppercase ${
                  currentOrder.verificationStatus === 'confirmed' ? 'text-emerald-400' :
                  currentOrder.verificationStatus === 'cancelled_by_customer' ? 'text-rose-400' :
                  currentOrder.verificationStatus === 'converted_prepaid' ? 'text-amber-400' : 'text-slate-300'
                }`}>
                  {currentOrder.verificationStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verification Automation Rules & Cascade Config */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">
                  Verification Trigger Rules
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-medium">Auto-Enforced</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <div>
                  <p className="font-medium text-slate-200">Require OTP for High-Risk Orders</p>
                  <p className="text-slate-400 text-[11px]">Enforces 4-digit SMS OTP when RTO score &gt; 70%</p>
                </div>
                <input
                  type="checkbox"
                  checked={ruleConfig.requireOtpForHighRisk}
                  onChange={(e) => updateRuleConfig({ requireOtpForHighRisk: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <div>
                  <p className="font-medium text-slate-200">Multi-Channel Cascade Fallback</p>
                  <p className="text-slate-400 text-[11px]">If WhatsApp unread after 15m, trigger SMS OTP</p>
                </div>
                <input
                  type="checkbox"
                  checked={ruleConfig.channelFallback}
                  onChange={(e) => updateRuleConfig({ channelFallback: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <div>
                  <p className="font-medium text-slate-200">Block Known Blacklisted Numbers</p>
                  <p className="text-slate-400 text-[11px]">Auto-cancel serial returners with &gt; 50% RTO history</p>
                </div>
                <input
                  type="checkbox"
                  checked={ruleConfig.blockBlacklistedPhones}
                  onChange={(e) => updateRuleConfig({ blockBlacklistedPhones: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="py-2 border-b border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-200">Prepaid Conversion Discount Incentive</span>
                  <span className="font-mono text-emerald-400 font-bold">{ruleConfig.prepaidIncentiveDiscountPercent}% OFF</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={ruleConfig.prepaidIncentiveDiscountPercent}
                  onChange={(e) => updateRuleConfig({ prepaidIncentiveDiscountPercent: Number(e.target.value) })}
                  className="w-full accent-emerald-500"
                />
                <p className="text-[11px] text-slate-400">
                  Offers customer an instant discount link to eliminate COD handling fees and eliminate 100% of RTO risk.
                </p>
              </div>

              <div className="py-2 space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-200">Auto-Cancel Timeout</span>
                  <span className="font-mono text-emerald-400 font-bold">{ruleConfig.autoCancelTimeoutHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="72"
                  step="4"
                  value={ruleConfig.autoCancelTimeoutHours}
                  onChange={(e) => updateRuleConfig({ autoCancelTimeoutHours: Number(e.target.value) })}
                  className="w-full accent-emerald-500"
                />
                <p className="text-[11px] text-slate-400">
                  If customer does not respond within this window, the order is cancelled before shipping to protect courier fee.
                </p>
              </div>
            </div>
          </div>

          {/* Economics comparison box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Cost Per Verification vs Average RTO Loss</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <p className="text-slate-400 text-[11px]">WhatsApp Session</p>
                <p className="text-base font-mono font-bold text-emerald-400">$0.015</p>
                <p className="text-[10px] text-slate-500">Per 24h interactive thread</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <p className="text-slate-400 text-[11px]">Courier RTO Penalty</p>
                <p className="text-base font-mono font-bold text-rose-400">$4.50 – $9.20</p>
                <p className="text-[10px] text-slate-500">Lost freight + repackaging</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every 1 order cancelled before dispatch yields a <strong className="text-white">300x return on investment</strong> relative to the verification message cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
