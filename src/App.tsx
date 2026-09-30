import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { PhaseRoadmapModal } from './components/common/PhaseRoadmapModal';
import { TopUpWalletModal } from './components/modals/TopUpWalletModal';

// 18 Phases
import { Phase1BusinessPlanning } from './components/phases/Phase1BusinessPlanning';
import { Phase2DesignSystem } from './components/phases/Phase2DesignSystem';
import { Phase3DatabaseSchema } from './components/phases/Phase3DatabaseSchema';
import { Phase4AuthRoles } from './components/phases/Phase4AuthRoles';
import { Phase5Dashboard } from './components/phases/Phase5Dashboard';
import { Phase6Orders } from './components/phases/Phase6Orders';
import { Phase7VerificationEngine } from './components/phases/Phase7VerificationEngine';
import { Phase8Customers } from './components/phases/Phase8Customers';
import { Phase9Products } from './components/phases/Phase9Products';
import { Phase10Reports } from './components/phases/Phase10Reports';
import { Phase11Subscriptions } from './components/phases/Phase11Subscriptions';
import { Phase12PaymentsWallet } from './components/phases/Phase12PaymentsWallet';
import { Phase13Integrations } from './components/phases/Phase13Integrations';
import { Phase14AdminPanel } from './components/phases/Phase14AdminPanel';
import { Phase15MarketingLanding } from './components/phases/Phase15MarketingLanding';
import { Phase16TestingSimulator } from './components/phases/Phase16TestingSimulator';
import { Phase17BetaStaging } from './components/phases/Phase17BetaStaging';
import { Phase18PublicLaunch } from './components/phases/Phase18PublicLaunch';

const AppContent: React.FC = () => {
  const { activePhaseId, activeViewMode, toastMessage } = useApp();

  const renderActivePhase = () => {
    switch (activePhaseId) {
      case 'phase1_business': return <Phase1BusinessPlanning />;
      case 'phase2_uiux': return <Phase2DesignSystem />;
      case 'phase3_database': return <Phase3DatabaseSchema />;
      case 'phase4_auth': return <Phase4AuthRoles />;
      case 'phase5_dashboard': return <Phase5Dashboard />;
      case 'phase6_orders': return <Phase6Orders />;
      case 'phase7_verification': return <Phase7VerificationEngine />;
      case 'phase8_customers': return <Phase8Customers />;
      case 'phase9_products': return <Phase9Products />;
      case 'phase10_reports': return <Phase10Reports />;
      case 'phase11_subscriptions': return <Phase11Subscriptions />;
      case 'phase12_payments': return <Phase12PaymentsWallet />;
      case 'phase13_integrations': return <Phase13Integrations />;
      case 'phase14_admin': return <Phase14AdminPanel />;
      case 'phase15_marketing': return <Phase15MarketingLanding />;
      case 'phase16_testing': return <Phase16TestingSimulator />;
      case 'phase17_beta': return <Phase17BetaStaging />;
      case 'phase18_launch': return <Phase18PublicLaunch />;
      default: return <Phase5Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Bar Contract (3 Zones) */}
      <Navbar />

      {/* Main View Area */}
      {activeViewMode === 'marketing_landing' ? (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Phase15MarketingLanding />
        </main>
      ) : (
        <div className="flex-1 flex w-full">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-y-auto w-full">
            {renderActivePhase()}
          </main>
        </div>
      )}

      {/* Modals & Dialogs */}
      <PhaseRoadmapModal />
      <TopUpWalletModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-lg bg-slate-900 border border-emerald-500/50 text-white text-xs font-medium shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-150">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
