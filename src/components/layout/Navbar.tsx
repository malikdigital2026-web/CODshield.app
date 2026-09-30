import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Map, 
  Coins, 
  Sparkles,
  ExternalLink,
  Store,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeViewMode, 
    setActiveViewMode, 
    activePhaseId, 
    setActivePhaseId,
    setIsRoadmapModalOpen, 
    walletBalance, 
    setIsTopUpModalOpen,
    currentRole,
    setCurrentRole,
    isPublicLaunched
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-15 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase5_dashboard');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              CODShield
            </span>
          </button>

          {isPublicLaunched && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE PROD
            </span>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button 
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase5_dashboard');
            }}
            className={`transition-colors hover:text-white ${activeViewMode === 'saas_app' && activePhaseId === 'phase5_dashboard' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase6_orders');
            }}
            className={`transition-colors hover:text-white ${activeViewMode === 'saas_app' && activePhaseId === 'phase6_orders' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Orders
          </button>
          <button 
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase7_verification');
            }}
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${activeViewMode === 'saas_app' && activePhaseId === 'phase7_verification' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            <span>Verification Engine</span>
            <span className="text-amber-400 text-xs">⭐</span>
          </button>
          <button 
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase13_integrations');
            }}
            className={`transition-colors hover:text-white ${activeViewMode === 'saas_app' && activePhaseId === 'phase13_integrations' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Integrations
          </button>
          <button 
            onClick={() => {
              setActiveViewMode('saas_app');
              setActivePhaseId('phase11_subscriptions');
            }}
            className={`transition-colors hover:text-white ${activeViewMode === 'saas_app' && activePhaseId === 'phase11_subscriptions' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Pricing & Plans
          </button>
          <button 
            onClick={() => {
              setActiveViewMode('marketing_landing');
              setActivePhaseId('phase15_marketing');
            }}
            className={`transition-colors hover:text-white ${activeViewMode === 'marketing_landing' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Marketing Site
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* 18-Phase Roadmap Inspector Trigger */}
          <button
            onClick={() => setIsRoadmapModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:border-slate-600 transition-colors whitespace-nowrap"
            title="Inspect all 18 development phases and architecture roadmap"
          >
            <Map className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Phase Roadmap</span>
            <span className="text-emerald-400 font-mono text-[11px]">(18)</span>
          </button>

          {/* Quick Credit Wallet */}
          <button
            onClick={() => setIsTopUpModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-md hover:bg-emerald-900/40 transition-colors whitespace-nowrap"
            title="Current verification credit balance"
          >
            <Coins className="h-3.5 w-3.5 text-emerald-400" />
            <span>${walletBalance.toFixed(2)}</span>
          </button>

          {/* Role switcher for demonstration */}
          <div className="hidden md:flex items-center border border-slate-800 bg-slate-900 rounded-md p-0.5 text-xs">
            <button
              onClick={() => setCurrentRole('merchant_admin')}
              className={`px-2 py-1 rounded transition-colors ${currentRole === 'merchant_admin' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              title="Merchant View"
            >
              Merchant
            </button>
            <button
              onClick={() => {
                setCurrentRole('super_admin');
                setActiveViewMode('saas_app');
                setActivePhaseId('phase14_admin');
              }}
              className={`px-2 py-1 rounded transition-colors ${currentRole === 'super_admin' ? 'bg-slate-800 text-emerald-400 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              title="Super Admin View"
            >
              Super Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
