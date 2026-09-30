import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Order, 
  Customer, 
  Product, 
  SubscriptionTier, 
  WalletTransaction, 
  IntegrationConnection, 
  TestCase, 
  PhaseInfo,
  AppPhaseId,
  VerificationRuleConfig,
  VerificationChannel
} from '../types';
import { 
  PHASES_DATA, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_PRODUCTS, 
  SUBSCRIPTION_TIERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_INTEGRATIONS, 
  INITIAL_TEST_CASES,
  INITIAL_RULE_CONFIG 
} from '../data/mockData';

interface AppContextType {
  // Navigation & View
  activePhaseId: AppPhaseId;
  setActivePhaseId: (phaseId: AppPhaseId) => void;
  activeViewMode: 'saas_app' | 'marketing_landing';
  setActiveViewMode: (mode: 'saas_app' | 'marketing_landing') => void;
  phases: PhaseInfo[];
  isRoadmapModalOpen: boolean;
  setIsRoadmapModalOpen: (open: boolean) => void;

  // Role
  currentRole: 'merchant_admin' | 'store_manager' | 'super_admin';
  setCurrentRole: (role: 'merchant_admin' | 'store_manager' | 'super_admin') => void;

  // Orders
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  triggerVerification: (orderId: string, channel: VerificationChannel) => void;
  confirmOrder: (orderId: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  convertOrderToPrepaid: (orderId: string) => void;
  addNewOrder: (order: Partial<Order>) => void;
  batchVerifyPending: () => void;

  // Customers
  customers: Customer[];
  toggleBlacklistCustomer: (customerId: string) => void;
  toggleVipCustomer: (customerId: string) => void;

  // Products
  products: Product[];
  toggleProductCod: (productId: string) => void;

  // Rules
  ruleConfig: VerificationRuleConfig;
  updateRuleConfig: (updates: Partial<VerificationRuleConfig>) => void;

  // Subscriptions & Wallet
  subscriptionTiers: SubscriptionTier[];
  activeSubscriptionId: string;
  billingInterval: 'monthly' | 'annual';
  setBillingInterval: (interval: 'monthly' | 'annual') => void;
  setActiveSubscriptionId: (id: string) => void;
  walletBalance: number;
  transactions: WalletTransaction[];
  topUpWallet: (amount: number) => void;
  isTopUpModalOpen: boolean;
  setIsTopUpModalOpen: (open: boolean) => void;

  // Integrations
  integrations: IntegrationConnection[];
  simulateIncomingShopifyOrder: () => void;

  // Testing Simulator
  testCases: TestCase[];
  isRunningTests: boolean;
  runAllTests: () => void;

  // Launch Status
  isPublicLaunched: boolean;
  executePublicLaunch: () => void;

  // Toasts
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePhaseId, setActivePhaseId] = useState<AppPhaseId>('phase5_dashboard');
  const [activeViewMode, setActiveViewMode] = useState<'saas_app' | 'marketing_landing'>('saas_app');
  const [phases] = useState<PhaseInfo[]>(PHASES_DATA);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<'merchant_admin' | 'store_manager' | 'super_admin'>('merchant_admin');

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [ruleConfig, setRuleConfig] = useState<VerificationRuleConfig>(INITIAL_RULE_CONFIG);

  const [subscriptionTiers] = useState<SubscriptionTier[]>(SUBSCRIPTION_TIERS);
  const [activeSubscriptionId, setActiveSubscriptionId] = useState<string>('growth');
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');

  const [walletBalance, setWalletBalance] = useState<number>(125.36);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

  const [integrations, setIntegrations] = useState<IntegrationConnection[]>(INITIAL_INTEGRATIONS);
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const [isPublicLaunched, setIsPublicLaunched] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const triggerVerification = (orderId: string, channel: VerificationChannel) => {
    const cost = channel === 'whatsapp' ? 0.015 : channel === 'sms' ? 0.008 : 0.025;
    if (walletBalance < cost) {
      showToast('⚠️ Wallet balance too low. Please top up verification credits.');
      setIsTopUpModalOpen(true);
      return;
    }

    setWalletBalance(prev => +(prev - cost).toFixed(4));
    
    // Add debit transaction
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'debit',
      amount: cost,
      units: 1,
      description: `${channel.toUpperCase()} verification sent for ${orderId}`,
      channel,
      timestamp: new Date().toISOString(),
      balanceAfter: +(walletBalance - cost).toFixed(4)
    };
    setTransactions(prev => [newTx, ...prev]);

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const nextStatus = channel === 'whatsapp' ? 'whatsapp_sent' : channel === 'sms' ? 'sms_sent' : 'ivr_called';
        return {
          ...o,
          verificationStatus: nextStatus,
          verificationChannelUsed: channel,
          verificationAttempts: o.verificationAttempts + 1,
          shopifyTags: Array.from(new Set([...o.shopifyTags, `COD-${channel.toUpperCase()}-Sent`]))
        };
      }
      return o;
    }));

    showToast(`Dispatched ${channel.toUpperCase()} verification to customer.`);
  };

  const confirmOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          verificationStatus: 'confirmed',
          verifiedAt: new Date().toISOString(),
          courierStatus: 'dispatched',
          trackingNumber: o.trackingNumber || `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
          shopifyTags: Array.from(new Set([...o.shopifyTags.filter(t => !t.includes('Pending')), 'COD-Verified', 'Approved-For-Dispatch']))
        };
      }
      return o;
    }));
    showToast(`Order marked as COD Confirmed and ready for fulfillment.`);
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          verificationStatus: 'cancelled_by_customer',
          cancelledAt: new Date().toISOString(),
          courierStatus: 'unfulfilled',
          notes: reason || 'Customer requested order cancellation during COD verification.',
          shopifyTags: Array.from(new Set([...o.shopifyTags, 'COD-Cancelled-Saved-RTO', 'Courier-Hold']))
        };
      }
      return o;
    }));
    showToast(`Order cancelled. RTO avoided, courier fees saved!`);
  };

  const convertOrderToPrepaid = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          paymentMethod: 'PREPAID',
          verificationStatus: 'converted_prepaid',
          verifiedAt: new Date().toISOString(),
          notes: 'Customer converted from COD to Prepaid with 5% discount incentive.',
          shopifyTags: Array.from(new Set([...o.shopifyTags, 'COD-Converted-Prepaid', '5%-Discount-Paid']))
        };
      }
      return o;
    }));
    showToast(`Order successfully converted to Prepaid via WhatsApp payment link!`);
  };

  const addNewOrder = (partial: Partial<Order>) => {
    const newId = `ord-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newId,
      orderNumber: `#CS-${Math.floor(8927 + orders.length)}`,
      storeSource: 'shopify',
      customerName: partial.customerName || 'New Customer',
      customerPhone: partial.customerPhone || '+91 98765 43210',
      customerEmail: partial.customerEmail || 'customer@example.com',
      shippingAddress: partial.shippingAddress || {
        street: '101 Modern Avenue, Tech Zone',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500081',
        country: 'India',
        addressQualityScore: 85
      },
      items: partial.items || [
        { id: `item-${Date.now()}`, name: 'Smart Lifestyle Product', quantity: 1, price: 49.99, sku: 'PROD-NEW' }
      ],
      totalAmount: partial.totalAmount || 49.99,
      currency: '$',
      paymentMethod: 'COD',
      rtoRiskScore: partial.rtoRiskScore || 28,
      rtoRiskLevel: partial.rtoRiskScore && partial.rtoRiskScore > 70 ? 'high' : partial.rtoRiskScore && partial.rtoRiskScore > 40 ? 'medium' : 'low',
      rtoRiskFactors: ['Live incoming simulated order', 'Standard delivery zone'],
      verificationStatus: 'pending',
      verificationAttempts: 0,
      createdAt: new Date().toISOString(),
      shopifyTags: ['COD-Needs-Verification'],
      courierStatus: 'unfulfilled',
      ...partial
    };

    setOrders(prev => [newOrder, ...prev]);
    showToast(`New simulated COD Order ${newOrder.orderNumber} ingested.`);
  };

  const batchVerifyPending = () => {
    const pendingOrders = orders.filter(o => o.verificationStatus === 'pending');
    if (pendingOrders.length === 0) {
      showToast('No pending orders need verification at this moment.');
      return;
    }

    pendingOrders.forEach(o => {
      triggerVerification(o.id, ruleConfig.preferredChannel);
    });
    showToast(`Batch verification triggered for ${pendingOrders.length} pending orders.`);
  };

  const toggleBlacklistCustomer = (customerId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const nextStatus = c.status === 'blacklisted' ? 'active' : 'blacklisted';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    showToast('Customer fraud status updated.');
  };

  const toggleVipCustomer = (customerId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const nextStatus = c.status === 'vip_whitelist' ? 'active' : 'vip_whitelist';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    showToast('Customer VIP whitelist status updated.');
  };

  const toggleProductCod = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, codAllowed: !p.codAllowed };
      }
      return p;
    }));
    showToast('Product COD eligibility updated.');
  };

  const updateRuleConfig = (updates: Partial<VerificationRuleConfig>) => {
    setRuleConfig(prev => ({ ...prev, ...updates }));
    showToast('COD Verification Rules saved successfully.');
  };

  const topUpWallet = (amount: number) => {
    const units = Math.floor(amount * 100);
    const newBal = +(walletBalance + amount).toFixed(4);
    setWalletBalance(newBal);

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'credit',
      amount,
      units,
      description: `Wallet top-up payment processed ($${amount.toFixed(2)})`,
      timestamp: new Date().toISOString(),
      balanceAfter: newBal
    };
    setTransactions(prev => [newTx, ...prev]);
    setIsTopUpModalOpen(false);
    showToast(`Successfully added $${amount} to verification credit balance!`);
  };

  const simulateIncomingShopifyOrder = () => {
    const names = ['Ananya Roy', 'Rohan Mehta', 'Deepak Joshi', 'Kavita Pillai', 'Tariq Al-Mansoor'];
    const cities = ['Pune', 'Jaipur', 'Lucknow', 'Indore', 'Kochi'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomAmount = +(25 + Math.random() * 120).toFixed(2);
    const randomRisk = Math.floor(10 + Math.random() * 85);

    addNewOrder({
      customerName: randomName,
      customerPhone: `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`,
      totalAmount: randomAmount,
      rtoRiskScore: randomRisk,
      shippingAddress: {
        street: 'Plot 42, Sector 18, Commercial Belt',
        city: randomCity,
        state: 'State',
        postalCode: '110001',
        country: 'India',
        addressQualityScore: Math.floor(50 + Math.random() * 45)
      }
    });

    // Update synced count
    setIntegrations(prev => prev.map(int => {
      if (int.platform === 'shopify') {
        return { ...int, syncedOrdersCount: int.syncedOrdersCount + 1, lastSyncAt: 'Just now' };
      }
      return int;
    }));
  };

  const runAllTests = () => {
    setIsRunningTests(true);
    setTestCases(prev => prev.map(t => ({ ...t, status: 'running' })));

    setTimeout(() => {
      setTestCases(prev => prev.map(t => ({
        ...t,
        status: 'passed',
        executionTimeMs: Math.floor(10 + Math.random() * 60)
      })));
      setIsRunningTests(false);
      showToast('All 6 automated test suites passed (100% test coverage).');
    }, 1200);
  };

  const executePublicLaunch = () => {
    setIsPublicLaunched(true);
    showToast('🚀 CODShield Public Launch executed! Production traffic is live.');
  };

  return (
    <AppContext.Provider
      value={{
        activePhaseId,
        setActivePhaseId,
        activeViewMode,
        setActiveViewMode,
        phases,
        isRoadmapModalOpen,
        setIsRoadmapModalOpen,
        currentRole,
        setCurrentRole,
        orders,
        selectedOrder,
        setSelectedOrder,
        triggerVerification,
        confirmOrder,
        cancelOrder,
        convertOrderToPrepaid,
        addNewOrder,
        batchVerifyPending,
        customers,
        toggleBlacklistCustomer,
        toggleVipCustomer,
        products,
        toggleProductCod,
        ruleConfig,
        updateRuleConfig,
        subscriptionTiers,
        activeSubscriptionId,
        billingInterval,
        setBillingInterval,
        setActiveSubscriptionId,
        walletBalance,
        transactions,
        topUpWallet,
        isTopUpModalOpen,
        setIsTopUpModalOpen,
        integrations,
        simulateIncomingShopifyOrder,
        testCases,
        isRunningTests,
        runAllTests,
        isPublicLaunched,
        executePublicLaunch,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
