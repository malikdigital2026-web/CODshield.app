export type VerificationStatus = 
  | 'pending'
  | 'whatsapp_sent'
  | 'sms_sent'
  | 'ivr_called'
  | 'confirmed'
  | 'cancelled_by_customer'
  | 'failed_unreachable'
  | 'auto_cancelled'
  | 'converted_prepaid';

export type RtoRiskLevel = 'low' | 'medium' | 'high';

export type VerificationChannel = 'whatsapp' | 'sms' | 'ivr_call';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  sku: string;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  storeSource: 'shopify' | 'woocommerce' | 'custom_api';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    landmark?: string;
    addressQualityScore: number; // 0-100
  };
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  paymentMethod: 'COD' | 'PREPAID';
  rtoRiskScore: number; // 0-100%
  rtoRiskLevel: RtoRiskLevel;
  rtoRiskFactors: string[];
  verificationStatus: VerificationStatus;
  verificationChannelUsed?: VerificationChannel;
  verificationAttempts: number;
  createdAt: string;
  verifiedAt?: string;
  cancelledAt?: string;
  notes?: string;
  shopifyTags: string[];
  trackingNumber?: string;
  courierStatus?: 'unfulfilled' | 'dispatched' | 'in_transit' | 'delivered' | 'rto_returned';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  totalOrders: number;
  codOrdersCount: number;
  deliveredCount: number;
  rtoCount: number;
  rtoRate: number; // percentage
  trustScore: number; // 0-100
  status: 'active' | 'blacklisted' | 'vip_whitelist';
  lastOrderDate: string;
  totalSpend: number;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: string;
  price: number;
  codAllowed: boolean;
  requiresAdvanceDeposit: boolean;
  advanceDepositAmount?: number;
  historicalRtoRate: number;
  stockQuantity: number;
}

export interface VerificationLog {
  id: string;
  orderId: string;
  orderNumber: string;
  channel: VerificationChannel;
  recipient: string;
  direction: 'outbound' | 'inbound';
  messageBody: string;
  status: 'sent' | 'delivered' | 'read' | 'clicked' | 'replied';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface VerificationRuleConfig {
  autoVerifyLowRisk: boolean;
  requireOtpForHighRisk: boolean;
  minOrderValueToVerify: number;
  maxOrderValueCodLimit: number;
  preferredChannel: VerificationChannel;
  channelFallback: boolean;
  autoCancelTimeoutHours: number;
  prepaidIncentiveDiscountPercent: number;
  blockBlacklistedPhones: boolean;
  sendAddressConfirmationPrompt: boolean;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  targetAudience: string;
  monthlyPrice: number;
  annualPrice: number;
  includedVerifications: number;
  extraVerificationCost: number;
  features: string[];
  hasAIVoiceIVR: boolean;
  hasCustomWhatsAppTemplate: boolean;
  hasAddressHygieneAI: boolean;
  hasPrioritySupport: boolean;
  popular?: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  units: number;
  description: string;
  channel?: VerificationChannel;
  timestamp: string;
  balanceAfter: number;
}

export interface IntegrationConnection {
  platform: 'shopify' | 'woocommerce' | 'custom_api';
  storeName: string;
  storeUrl: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSyncAt: string;
  autoTagOrders: boolean;
  autoCancelShopifyOrders: boolean;
  webhookSecret?: string;
  syncedOrdersCount: number;
}

export interface TestCase {
  id: string;
  name: string;
  category: 'api' | 'verification' | 'risk_scoring' | 'webhook' | 'billing';
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  executionTimeMs?: number;
  details?: string;
}

export type AppPhaseId = 
  | 'phase1_business'
  | 'phase2_uiux'
  | 'phase3_database'
  | 'phase4_auth'
  | 'phase5_dashboard'
  | 'phase6_orders'
  | 'phase7_verification'
  | 'phase8_customers'
  | 'phase9_products'
  | 'phase10_reports'
  | 'phase11_subscriptions'
  | 'phase12_payments'
  | 'phase13_integrations'
  | 'phase14_admin'
  | 'phase15_marketing'
  | 'phase16_testing'
  | 'phase17_beta'
  | 'phase18_launch';

export interface PhaseInfo {
  id: AppPhaseId;
  phaseNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'ready';
  tag: string;
  starred?: boolean;
}
