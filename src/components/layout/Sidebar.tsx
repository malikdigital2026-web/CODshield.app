import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  MessageSquare, 
  Users, 
  Package, 
  BarChart3, 
  CreditCard, 
  Wallet, 
  Store, 
  ShieldAlert, 
  Layers, 
  Sparkles, 
  Database, 
  Lock, 
  CheckCheck, 
  FlaskConical, 
  Rocket, 
  PlusCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { AppPhaseId } from '../../types';

export const Sidebar: React.FC = () => {
  const { 
    activePhaseId, 
    setActivePhaseId, 
    orders, 
    simulateIncomingShopifyOrder,
    currentRole,
    walletBalance,
    setIsTopUpModalOpen
  } = useApp();

  const pendingCount = orders.filter(o => o.verificationStatus === 'pending').length;

  const coreNavItems = [
    { id: 'phase5_dashboard' as AppPhaseId, label: 'Dashboard', icon: LayoutDashboard, phase: 'Phase 5' },
    { id: 'phase6_orders' as AppPhaseId, label: 'Orders', icon: ShoppingCart, badge: pendingCount > 0 ? pendingCount : undefined, phase: 'Phase 6' },
    { id: 'phase7_verification' as AppPhaseId, label: 'COD Verification Engine', icon: MessageSquare, starred: true, phase: 'Phase 7' },
    { id: 'phase8_customers' as AppPhaseId, label: 'Customers & Risk CRM', icon: Users, phase: 'Phase 8' },
    { id: 'phase9_products' as AppPhaseId, label: 'Product COD Rules', icon: Package, phase: 'Phase 9' },
    { id: 'phase10_reports' as AppPhaseId, label: 'Reports & Analytics', icon: BarChart3, phase: 'Phase 10' },
    { id: 'phase11_subscriptions' as AppPhaseId, label: 'Subscriptions', icon: CreditCard, starred: true, phase: 'Phase 11' },
    { id: 'phase12_payments' as AppPhaseId, label: 'Payments & Wallet', icon: Wallet, starred: true, phase: 'Phase 12' },
    { id: 'phase13_integrations' as AppPhaseId, label: 'Shopify / WooCommerce', icon: Store, phase: 'Phase 13' },
    { id: 'phase14_admin' as AppPhaseId, label: 'Super Admin Console', icon: ShieldAlert, phase: 'Phase 14' },
  ];

  const devLifecycleItems = [
    { id: 'phase1_business' as AppPhaseId, label: '1. Business Planning', icon: Layers },
    { id: 'phase2_uiux' as AppPhaseId, label: '2. UI/UX Design System', icon: Sparkles },
    { id: 'phase3_database' as AppPhaseId, label: '3. Database & Schemas', icon: Database },
    { id: 'phase4_auth' as AppPhaseId, label: '4. Authentication & RBAC', icon: Lock },
    { id: 'phase16_testing' as AppPhaseId, label: '16. Testing & QA Suite', icon: CheckCheck },
    { id: 'phase17_beta' as AppPhaseId, label: '17. Beta & Sandbox', icon: FlaskConical },
    { id: 'phase18_launch' as AppPhaseId, label: '18. Public Launch 🚀', icon: Rocket },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950/70 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-3.75rem)]">
      <div className="p-3 space-y-6">
        {/* Connected Store Header */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono text-[10px] text-emerald-400">SHOPIFY CONNECTED</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <p className="text-sm font-semibold text-white truncate">UrbanStyle Apparel</p>
          <p className="text-[11px] text-slate-400 truncate">urbanstyle-store.myshopify.com</p>
          
          <button
            onClick={simulateIncomingShopifyOrder}
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded border border-slate-700/60 transition-colors"
            title="Simulate incoming order from Shopify webhook"
          >
            <PlusCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>Simulate Incoming COD</span>
          </button>
        </div>

        {/* Core Merchant Modules */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-mono font-medium text-slate-400">
            MERCHANT OPERATING SYSTEM
          </div>
          <nav className="space-y-0.5">
            {coreNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activePhaseId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePhaseId(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-slate-800 text-white font-semibold shadow-xs' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                    {item.starred && <span className="text-amber-400 text-[10px]">⭐</span>}
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Development & Phase Architecture */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-mono font-medium text-slate-400">
            ARCHITECTURE & LIFECYCLE
          </div>
          <nav className="space-y-0.5">
            {devLifecycleItems.map(item => {
              const Icon = item.icon;
              const isActive = activePhaseId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePhaseId(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-slate-800 text-white font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom status */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span>Verification Credits</span>
          <button 
            onClick={() => setIsTopUpModalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 font-medium text-[11px]"
          >
            + Top Up
          </button>
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-white font-semibold">${walletBalance.toFixed(2)}</span>
          <span className="text-slate-400">~{Math.floor(walletBalance * 100)} OTPs</span>
        </div>
      </div>
    </aside>
  );
};
