import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  ArrowDown, 
  Sparkles, 
  ChevronRight, 
  Rocket, 
  Star,
  ExternalLink,
  Layers,
  Database,
  Lock,
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
  Globe,
  CheckCheck,
  FlaskConical
} from 'lucide-react';
import { AppPhaseId } from '../../types';

export const PhaseRoadmapModal: React.FC = () => {
  const { 
    isRoadmapModalOpen, 
    setIsRoadmapModalOpen, 
    phases, 
    activePhaseId, 
    setActivePhaseId,
    setActiveViewMode,
    isPublicLaunched
  } = useApp();

  if (!isRoadmapModalOpen) return null;

  const getPhaseIcon = (id: AppPhaseId) => {
    switch (id) {
      case 'phase1_business': return Layers;
      case 'phase2_uiux': return Sparkles;
      case 'phase3_database': return Database;
      case 'phase4_auth': return Lock;
      case 'phase5_dashboard': return LayoutDashboard;
      case 'phase6_orders': return ShoppingCart;
      case 'phase7_verification': return MessageSquare;
      case 'phase8_customers': return Users;
      case 'phase9_products': return Package;
      case 'phase10_reports': return BarChart3;
      case 'phase11_subscriptions': return CreditCard;
      case 'phase12_payments': return Wallet;
      case 'phase13_integrations': return Store;
      case 'phase14_admin': return ShieldAlert;
      case 'phase15_marketing': return Globe;
      case 'phase16_testing': return CheckCheck;
      case 'phase17_beta': return FlaskConical;
      case 'phase18_launch': return Rocket;
      default: return CheckCircle2;
    }
  };

  const handleSelectPhase = (id: AppPhaseId) => {
    setActivePhaseId(id);
    if (id === 'phase15_marketing') {
      setActiveViewMode('marketing_landing');
    } else {
      setActiveViewMode('saas_app');
    }
    setIsRoadmapModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                Full 18-Phase Architecture Journey
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400 font-mono">18 / 18 Implemented</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
              CODShield Complete Product Lifecycle Roadmap
            </h2>
          </div>
          <button
            onClick={() => setIsRoadmapModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content list with continuous flow */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <p className="text-xs text-slate-400 max-w-2xl">
            Select any phase to instantly navigate to its live, operational module. Every phase from initial planning through testing, verification bot simulators, and public launch is completely functional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
            {phases.map((phase, idx) => {
              const Icon = getPhaseIcon(phase.id);
              const isActive = activePhaseId === phase.id;

              return (
                <div
                  key={phase.id}
                  onClick={() => handleSelectPhase(phase.id)}
                  className={`group relative flex items-start gap-3.5 p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-emerald-950/20 border-emerald-500/50 shadow-sm' 
                      : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-900 border-slate-700/80 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 font-medium">
                        PHASE {phase.phaseNumber}
                      </span>
                      {phase.starred && (
                        <span className="text-amber-400 text-xs">⭐</span>
                      )}
                      <span className="text-xs text-slate-600">·</span>
                      <span className="text-[11px] font-medium text-emerald-400">
                        {phase.id === 'phase18_launch' && isPublicLaunched ? 'Live Public' : 'Complete'}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white truncate mt-0.5">
                      {phase.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {phase.description}
                    </p>
                  </div>

                  <div className="self-center pl-1 text-slate-500 group-hover:text-slate-300">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Enterprise Cash-On-Delivery Verification Engine</span>
          <button
            onClick={() => handleSelectPhase('phase7_verification')}
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
          >
            <span>Open Phase 7 COD Verification Simulator ⭐</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
