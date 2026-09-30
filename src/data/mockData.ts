import { 
  Order, 
  Customer, 
  Product, 
  SubscriptionTier, 
  WalletTransaction, 
  IntegrationConnection, 
  TestCase, 
  PhaseInfo,
  VerificationRuleConfig
} from '../types';

export const PHASES_DATA: PhaseInfo[] = [
  { id: 'phase1_business', phaseNumber: 1, title: 'Business Planning', description: 'Problem model, unit economics, market sizing, and RTO loss reduction thesis.', status: 'completed', tag: 'Strategy' },
  { id: 'phase2_uiux', phaseNumber: 2, title: 'UI/UX Design System', description: 'Tailwind 4 tokens, typography, dark/light contrast, and single-elevation layouts.', status: 'completed', tag: 'Design' },
  { id: 'phase3_database', phaseNumber: 3, title: 'Database & Schemas', description: 'Relational schema for orders, merchants, verifications, rules, and billing ledger.', status: 'completed', tag: 'Architecture' },
  { id: 'phase4_auth', phaseNumber: 4, title: 'Authentication & RBAC', description: 'Multi-role authentication: Store Owner, Fulfillment Ops, Support, and Super Admin.', status: 'completed', tag: 'Security' },
  { id: 'phase5_dashboard', phaseNumber: 5, title: 'Merchant Dashboard', description: 'Real-time COD funnel, RTO savings, channel efficiency, and active alerts.', status: 'completed', tag: 'Core Analytics' },
  { id: 'phase6_orders', phaseNumber: 6, title: 'Orders Management', description: 'High-density order grid with RTO risk score, verification status, and batch actions.', status: 'completed', tag: 'Operations' },
  { id: 'phase7_verification', phaseNumber: 7, title: 'COD Verification Engine', description: 'Interactive WhatsApp bot, SMS OTP, and AI IVR voice dialer with cascade rules.', status: 'completed', tag: 'Core Engine', starred: true },
  { id: 'phase8_customers', phaseNumber: 8, title: 'Customer Risk CRM', description: 'Trust scores, historical RTO tracking, and automated blacklist/VIP whitelist.', status: 'completed', tag: 'Fraud Defense' },
  { id: 'phase9_products', phaseNumber: 9, title: 'Product Catalog Rules', description: 'SKU-level COD toggles, high-ticket deposit requirements, and return probability.', status: 'completed', tag: 'Inventory' },
  { id: 'phase10_reports', phaseNumber: 10, title: 'Reports & Analytics', description: 'RTO reduction trends, courier benchmarks, courier NDR analytics, and net revenue saved.', status: 'completed', tag: 'Intelligence' },
  { id: 'phase11_subscriptions', phaseNumber: 11, title: 'Subscriptions', description: 'SaaS recurring plan tiers: Starter, Growth, Scale, and Enterprise packages.', status: 'completed', tag: 'Monetization', starred: true },
  { id: 'phase12_payments', phaseNumber: 12, title: 'Payments & Wallet', description: 'Pay-as-you-go verification credit wallet, auto-recharge, and billing invoices.', status: 'completed', tag: 'Billing', starred: true },
  { id: 'phase13_integrations', phaseNumber: 13, title: 'Shopify & WooCommerce', description: '2-way webhook sync, automatic order tags, and 1-click merchant install.', status: 'completed', tag: 'Integrations' },
  { id: 'phase14_admin', phaseNumber: 14, title: 'Super Admin Panel', description: 'Platform health, tenant directory, MRR billing telemetry, and API uptime.', status: 'completed', tag: 'Platform Ops' },
  { id: 'phase15_marketing', phaseNumber: 15, title: 'Marketing Website', description: 'High-converting SaaS landing page with interactive ROI RTO loss calculator.', status: 'completed', tag: 'Growth' },
  { id: 'phase16_testing', phaseNumber: 16, title: 'Testing & QA Simulator', description: 'Automated test suite runner: Webhooks, OTP delivery, RTO risk math, and billing.', status: 'completed', tag: 'QA' },
  { id: 'phase17_beta', phaseNumber: 17, title: 'Beta & Sandbox', description: 'Merchant sandbox mode, beta feature flags, and merchant feedback pipeline.', status: 'completed', tag: 'Staging' },
  { id: 'phase18_launch', phaseNumber: 18, title: 'PUBLIC LAUNCH 🚀', description: 'Launch readiness checklist, health audits, production DNS, and live status.', status: 'ready', tag: 'Milestone' },
];

export const INITIAL_RULE_CONFIG: VerificationRuleConfig = {
  autoVerifyLowRisk: false,
  requireOtpForHighRisk: true,
  minOrderValueToVerify: 20,
  maxOrderValueCodLimit: 500,
  preferredChannel: 'whatsapp',
  channelFallback: true,
  autoCancelTimeoutHours: 24,
  prepaidIncentiveDiscountPercent: 5,
  blockBlacklistedPhones: true,
  sendAddressConfirmationPrompt: true,
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8921',
    orderNumber: '#CS-8921',
    storeSource: 'shopify',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98201 44521',
    customerEmail: 'aarav.sharma@example.com',
    shippingAddress: {
      street: 'Flat 402, Lotus Heights, Park Road, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400053',
      country: 'India',
      landmark: 'Opposite Metro Station Pillar 42',
      addressQualityScore: 94,
    },
    items: [
      { id: 'item-1', name: 'Ultra-Comfort Wireless ANC Headphones', quantity: 1, price: 69.99, sku: 'TECH-ANC-BLK' },
      { id: 'item-2', name: 'Braided Type-C Fast Cable 2m', quantity: 2, price: 9.99, sku: 'ACC-CAB-2M' }
    ],
    totalAmount: 89.97,
    currency: '$',
    paymentMethod: 'COD',
    rtoRiskScore: 18,
    rtoRiskLevel: 'low',
    rtoRiskFactors: ['Valid complete address', 'Repeat verified phone', 'High address quality score'],
    verificationStatus: 'confirmed',
    verificationChannelUsed: 'whatsapp',
    verificationAttempts: 1,
    createdAt: '2026-09-28T03:15:00Z',
    verifiedAt: '2026-09-28T03:22:14Z',
    shopifyTags: ['COD-Verified', 'Auto-Approved'],
    trackingNumber: 'TRK-98421044',
    courierStatus: 'in_transit'
  },
  {
    id: 'ord-8922',
    orderNumber: '#CS-8922',
    storeSource: 'shopify',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 91234 56789',
    customerEmail: 'vikram.m88@example.com',
    shippingAddress: {
      street: 'Near temple, market area',
      city: 'Patna',
      state: 'Bihar',
      postalCode: '800001',
      country: 'India',
      addressQualityScore: 32,
    },
    items: [
      { id: 'item-3', name: 'Smartwatch Gen 4 Waterproof', quantity: 1, price: 129.50, sku: 'WAT-GEN4-SLV' }
    ],
    totalAmount: 129.50,
    currency: '$',
    paymentMethod: 'COD',
    rtoRiskScore: 84,
    rtoRiskLevel: 'high',
    rtoRiskFactors: ['Incomplete address (no house/flat number)', 'High COD return history in pin code 800001', 'High order value'],
    verificationStatus: 'whatsapp_sent',
    verificationChannelUsed: 'whatsapp',
    verificationAttempts: 1,
    createdAt: '2026-09-28T04:20:00Z',
    shopifyTags: ['COD-Verification-Pending', 'High-RTO-Risk'],
    courierStatus: 'unfulfilled',
    notes: 'Incomplete address. Customer prompted on WhatsApp to submit full house number and landmark.'
  },
  {
    id: 'ord-8923',
    orderNumber: '#CS-8923',
    storeSource: 'woocommerce',
    customerName: 'Pooja Iyer',
    customerPhone: '+91 97412 88910',
    customerEmail: 'pooja.iyer@example.com',
    shippingAddress: {
      street: 'Villa 14, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560066',
      country: 'India',
      landmark: 'Near Forum Value Mall',
      addressQualityScore: 96,
    },
    items: [
      { id: 'item-4', name: 'Organic Herbal Skincare Combo Set', quantity: 1, price: 44.00, sku: 'BEAUTY-SET-ORG' }
    ],
    totalAmount: 44.00,
    currency: '$',
    paymentMethod: 'COD',
    rtoRiskScore: 12,
    rtoRiskLevel: 'low',
    rtoRiskFactors: ['Frequent buyer', 'Verified landmark', 'Low return rate in locality'],
    verificationStatus: 'converted_prepaid',
    verificationChannelUsed: 'whatsapp',
    verificationAttempts: 1,
    createdAt: '2026-09-28T02:40:00Z',
    verifiedAt: '2026-09-28T02:44:30Z',
    shopifyTags: ['COD-Converted-Prepaid', '5%-Discount-Applied'],
    trackingNumber: 'TRK-55291033',
    courierStatus: 'dispatched',
    notes: 'Customer accepted 5% prepaid incentive discount link via WhatsApp and paid instantly with UPI.'
  },
  {
    id: 'ord-8924',
    orderNumber: '#CS-8924',
    storeSource: 'shopify',
    customerName: 'Rahul Verma',
    customerPhone: '+91 99887 76655',
    customerEmail: 'rahul.fake99@example.com',
    shippingAddress: {
      street: 'House 99, Street 4',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      postalCode: '208001',
      country: 'India',
      addressQualityScore: 45,
    },
    items: [
      { id: 'item-5', name: 'Premium Leather Biker Jacket', quantity: 1, price: 189.00, sku: 'APP-LEATH-JKT' }
    ],
    totalAmount: 189.00,
    currency: '$',
    paymentMethod: 'COD',
    rtoRiskScore: 91,
    rtoRiskLevel: 'high',
    rtoRiskFactors: ['Customer explicitly clicked Cancel on WhatsApp', 'Phone number flagged on blacklist network (2 prior RTOs)'],
    verificationStatus: 'cancelled_by_customer',
    verificationChannelUsed: 'whatsapp',
    verificationAttempts: 1,
    createdAt: '2026-09-28T01:10:00Z',
    cancelledAt: '2026-09-28T01:18:02Z',
    shopifyTags: ['COD-Cancelled-By-Customer', 'RTO-Prevented', 'Saved-$18-Courier-Cost'],
    courierStatus: 'unfulfilled',
    notes: 'Customer responded: "Ordered by mistake, please cancel". Order cancelled before dispatch, saving $18.50 courier & return shipping fee.'
  },
  {
    id: 'ord-8925',
    orderNumber: '#CS-8925',
    storeSource: 'shopify',
    customerName: 'Sneha Patel',
    customerPhone: '+91 98980 12345',
    customerEmail: 'sneha.patel@example.com',
    shippingAddress: {
      street: 'B-201, Greenwoods Residency, SG Highway',
      city: 'Ahmedabad',
      state: 'Gujarat',
      postalCode: '380054',
      country: 'India',
      landmark: 'Next to Grand Bhagwati Hotel',
      addressQualityScore: 92,
    },
    items: [
      { id: 'item-6', name: 'Ceramic Pour-Over Coffee Dripper Kit', quantity: 1, price: 38.50, sku: 'HOME-COF-DRIP' }
    ],
    totalAmount: 38.50,
    currency: '$',
    paymentMethod: 'COD',
    rtoRiskScore: 24,
    rtoRiskLevel: 'low',
    rtoRiskFactors: ['Standard delivery zone', 'Accurate pincode match'],
    verificationStatus: 'pending',
    verificationAttempts: 0,
    createdAt: '2026-09-28T04:45:00Z',
    shopifyTags: ['COD-Needs-Verification'],
    courierStatus: 'unfulfilled'
  },
  {
    id: 'ord-8926',
    orderNumber: '#CS-8926',
    storeSource: 'woocommerce',
    customerName: 'Karthik Raja',
    customerPhone: '+91 94441 55667',
    customerEmail: 'karthik.r@example.com',
    shippingAddress: {
      street: '12th Cross, Anna Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600040',
      country: 'India',
      landmark: 'Near Roundtana',
      addressQualityScore: 88,
    },
    items: [
      { id: 'item-7', name: 'Mechanical Gaming Keyboard RGB', quantity: 1, price: 74.00, sku: 'GAM-KB-MECH' }
    ],
    totalAmount: 74.00,
    currency: '$',
    paymentMethod: 'COD',
    rtoRiskScore: 36,
    rtoRiskLevel: 'medium',
    rtoRiskFactors: ['First-time buyer', 'WhatsApp delivered, awaiting confirmation'],
    verificationStatus: 'sms_sent',
    verificationChannelUsed: 'sms',
    verificationAttempts: 1,
    createdAt: '2026-09-28T03:50:00Z',
    shopifyTags: ['COD-SMS-OTP-Sent'],
    courierStatus: 'unfulfilled'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Aarav Sharma',
    phone: '+91 98201 44521',
    email: 'aarav.sharma@example.com',
    city: 'Mumbai',
    totalOrders: 6,
    codOrdersCount: 4,
    deliveredCount: 4,
    rtoCount: 0,
    rtoRate: 0,
    trustScore: 98,
    status: 'vip_whitelist',
    lastOrderDate: '2026-09-28',
    totalSpend: 342.80
  },
  {
    id: 'cust-2',
    name: 'Rahul Verma',
    phone: '+91 99887 76655',
    email: 'rahul.fake99@example.com',
    city: 'Kanpur',
    totalOrders: 3,
    codOrdersCount: 3,
    deliveredCount: 0,
    rtoCount: 2,
    rtoRate: 66.7,
    trustScore: 18,
    status: 'blacklisted',
    lastOrderDate: '2026-09-28',
    totalSpend: 0
  },
  {
    id: 'cust-3',
    name: 'Pooja Iyer',
    phone: '+91 97412 88910',
    email: 'pooja.iyer@example.com',
    city: 'Bengaluru',
    totalOrders: 8,
    codOrdersCount: 2,
    deliveredCount: 8,
    rtoCount: 0,
    rtoRate: 0,
    trustScore: 99,
    status: 'vip_whitelist',
    lastOrderDate: '2026-09-28',
    totalSpend: 580.40
  },
  {
    id: 'cust-4',
    name: 'Vikram Malhotra',
    phone: '+91 91234 56789',
    email: 'vikram.m88@example.com',
    city: 'Patna',
    totalOrders: 2,
    codOrdersCount: 2,
    deliveredCount: 1,
    rtoCount: 1,
    rtoRate: 50.0,
    trustScore: 42,
    status: 'active',
    lastOrderDate: '2026-09-28',
    totalSpend: 65.00
  },
  {
    id: 'cust-5',
    name: 'Sneha Patel',
    phone: '+91 98980 12345',
    email: 'sneha.patel@example.com',
    city: 'Ahmedabad',
    totalOrders: 4,
    codOrdersCount: 3,
    deliveredCount: 3,
    rtoCount: 0,
    rtoRate: 0,
    trustScore: 91,
    status: 'active',
    lastOrderDate: '2026-09-28',
    totalSpend: 198.50
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'TECH-ANC-BLK',
    title: 'Ultra-Comfort Wireless ANC Headphones',
    category: 'Consumer Electronics',
    price: 69.99,
    codAllowed: true,
    requiresAdvanceDeposit: false,
    historicalRtoRate: 6.2,
    stockQuantity: 142
  },
  {
    id: 'prod-2',
    sku: 'WAT-GEN4-SLV',
    title: 'Smartwatch Gen 4 Waterproof',
    category: 'Wearables',
    price: 129.50,
    codAllowed: true,
    requiresAdvanceDeposit: true,
    advanceDepositAmount: 15.00,
    historicalRtoRate: 18.5,
    stockQuantity: 48
  },
  {
    id: 'prod-3',
    sku: 'APP-LEATH-JKT',
    title: 'Premium Leather Biker Jacket (Custom Size)',
    category: 'Apparel & Outerwear',
    price: 189.00,
    codAllowed: false,
    requiresAdvanceDeposit: true,
    advanceDepositAmount: 30.00,
    historicalRtoRate: 31.4,
    stockQuantity: 18
  },
  {
    id: 'prod-4',
    sku: 'BEAUTY-SET-ORG',
    title: 'Organic Herbal Skincare Combo Set',
    category: 'Beauty & Personal Care',
    price: 44.00,
    codAllowed: true,
    requiresAdvanceDeposit: false,
    historicalRtoRate: 5.8,
    stockQuantity: 230
  },
  {
    id: 'prod-5',
    sku: 'GAM-KB-MECH',
    title: 'Mechanical Gaming Keyboard RGB',
    category: 'Computer Accessories',
    price: 74.00,
    codAllowed: true,
    requiresAdvanceDeposit: false,
    historicalRtoRate: 11.2,
    stockQuantity: 64
  }
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'starter',
    name: 'Starter Tier',
    targetAudience: 'For early-stage direct-to-consumer stores up to 300 orders/month',
    monthlyPrice: 29,
    annualPrice: 24,
    includedVerifications: 500,
    extraVerificationCost: 0.025,
    features: [
      '500 Automated Verifications / month',
      'WhatsApp Quick-Reply 1-Click Bot',
      'Basic SMS OTP Fallback',
      'Shopify & WooCommerce Webhook Sync',
      'Standard RTO Risk Scoring (0-100)',
      'Email Support (24h response)'
    ],
    hasAIVoiceIVR: false,
    hasCustomWhatsAppTemplate: false,
    hasAddressHygieneAI: false,
    hasPrioritySupport: false
  },
  {
    id: 'growth',
    name: 'Growth Tier',
    targetAudience: 'For scaling brands needing automated IVR voice calls and address AI',
    monthlyPrice: 79,
    annualPrice: 65,
    includedVerifications: 2500,
    extraVerificationCost: 0.018,
    features: [
      '2,500 Automated Verifications / month',
      'WhatsApp Interactive Bot with Custom Branding',
      'Automated AI Voice IVR Call Verification',
      'Address Hygiene & Landmark Autocorrect AI',
      'Prepaid Conversion Discounts (5% UPI incentive)',
      'Multi-Courier NDR Automation',
      'Priority Live Chat & Slack Support'
    ],
    hasAIVoiceIVR: true,
    hasCustomWhatsAppTemplate: true,
    hasAddressHygieneAI: true,
    hasPrioritySupport: true,
    popular: true
  },
  {
    id: 'scale',
    name: 'Scale Enterprise',
    targetAudience: 'For high-volume merchants, aggregators, and multi-brand retailers',
    monthlyPrice: 199,
    annualPrice: 159,
    includedVerifications: 10000,
    extraVerificationCost: 0.012,
    features: [
      '10,000 Automated Verifications / month',
      'Unlimited Store Connections',
      'Custom WhatsApp Green-Tick Sender Identity',
      'Custom Voice AI IVR Scripts in 12 Regional Dialects',
      'Cross-Merchant Blacklist Fraud Consortium',
      'Dedicated Account Engineer & 99.99% SLA',
      'Custom Webhook & ERP Export Pipes'
    ],
    hasAIVoiceIVR: true,
    hasCustomWhatsAppTemplate: true,
    hasAddressHygieneAI: true,
    hasPrioritySupport: true
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-101',
    type: 'credit',
    amount: 100.00,
    units: 10000,
    description: 'Wallet Credit Top-Up via Stripe (Visa ending in 4242)',
    timestamp: '2026-09-20T10:00:00Z',
    balanceAfter: 125.40
  },
  {
    id: 'tx-102',
    type: 'debit',
    amount: 0.015,
    units: 1,
    description: 'WhatsApp Interactive Verification for Order #CS-8921',
    channel: 'whatsapp',
    timestamp: '2026-09-28T03:15:05Z',
    balanceAfter: 125.385
  },
  {
    id: 'tx-103',
    type: 'debit',
    amount: 0.015,
    units: 1,
    description: 'WhatsApp Interactive Verification for Order #CS-8922',
    channel: 'whatsapp',
    timestamp: '2026-09-28T04:20:02Z',
    balanceAfter: 125.37
  },
  {
    id: 'tx-104',
    type: 'debit',
    amount: 0.008,
    units: 1,
    description: 'SMS OTP Verification for Order #CS-8926',
    channel: 'sms',
    timestamp: '2026-09-28T03:50:11Z',
    balanceAfter: 125.362
  }
];

export const INITIAL_INTEGRATIONS: IntegrationConnection[] = [
  {
    platform: 'shopify',
    storeName: 'UrbanStyle Apparel & Gear',
    storeUrl: 'https://urbanstyle-store.myshopify.com',
    status: 'connected',
    lastSyncAt: 'Just now (Real-time Webhook active)',
    autoTagOrders: true,
    autoCancelShopifyOrders: true,
    syncedOrdersCount: 1482
  },
  {
    platform: 'woocommerce',
    storeName: 'Organica Naturals Store',
    storeUrl: 'https://organicanaturals.in',
    status: 'connected',
    lastSyncAt: '12 minutes ago',
    autoTagOrders: true,
    autoCancelShopifyOrders: true,
    syncedOrdersCount: 624
  }
];

export const INITIAL_TEST_CASES: TestCase[] = [
  {
    id: 'test-1',
    name: 'Shopify Webhook Signature Verification',
    category: 'webhook',
    description: 'Validates HMAC-SHA256 signature on incoming orders/create events.',
    status: 'passed',
    executionTimeMs: 14,
    details: 'Verified secret header against shopify client payload. Match confirmed.'
  },
  {
    id: 'test-2',
    name: 'WhatsApp Cloud API 2-Way Message Dispatch',
    category: 'verification',
    description: 'Dispatches template with interactive quick-reply buttons (Confirm / Cancel).',
    status: 'passed',
    executionTimeMs: 82,
    details: 'Payload dispatched to Meta Cloud API endpoint. Message ID: wamid.HBgL... delivered.'
  },
  {
    id: 'test-3',
    name: 'RTO Risk Scoring Matrix Computation',
    category: 'risk_scoring',
    description: 'Calculates risk % across 14 signals: Pin code RTO history, address quality, phone trust.',
    status: 'passed',
    executionTimeMs: 8,
    details: 'Tested against 1,000 synthetic test orders. Prediction accuracy: 94.2% ROC-AUC.'
  },
  {
    id: 'test-4',
    name: 'SMS OTP Rate Limiter & Expiry Invariant',
    category: 'verification',
    description: 'Ensures maximum 3 OTP requests per phone per 15 minutes, with 5-minute expiry.',
    status: 'passed',
    executionTimeMs: 19,
    details: 'Rate limits enforced correctly in cache. Expired OTP attempts rejected.'
  },
  {
    id: 'test-5',
    name: 'Prepaid Conversion UPI Link Generator',
    category: 'billing',
    description: 'Generates dynamic payment link with 5% discount tag applied.',
    status: 'passed',
    executionTimeMs: 27,
    details: 'Payment link generated with exact discounted amount: $41.80 for $44.00 order.'
  },
  {
    id: 'test-6',
    name: 'Credit Balance Debit & Protection Against Overdraft',
    category: 'billing',
    description: 'Verifies wallet transactions prevent negative balance and alert merchant at threshold.',
    status: 'passed',
    executionTimeMs: 12,
    details: 'Atomic decrement tested under simulated concurrency. No double-spend detected.'
  }
];
