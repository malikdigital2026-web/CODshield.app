import React, { useState } from 'react';
import { Database, Code, Table, ShieldCheck, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Phase3DatabaseSchema: React.FC = () => {
  const { showToast } = useApp();
  const [activeSchemaTab, setActiveSchemaTab] = useState<'tables' | 'sql'>('tables');

  const tables = [
    { name: 'merchants', fields: 'id, name, email, plan_id, wallet_balance, created_at' },
    { name: 'stores', fields: 'id, merchant_id, platform (shopify/woo), store_url, webhook_secret' },
    { name: 'orders', fields: 'id, store_id, order_number, total_amount, rto_risk_score, verification_status, courier_status' },
    { name: 'verifications', fields: 'id, order_id, channel (whatsapp/sms/ivr), recipient, status, attempts, response_payload' },
    { name: 'customers', fields: 'id, phone, name, email, trust_score, total_orders, rto_count, is_blacklisted' },
    { name: 'wallet_ledger', fields: 'id, merchant_id, transaction_type, units, amount, balance_after, created_at' },
    { name: 'rto_rules', fields: 'id, store_id, min_order_value, require_otp, auto_cancel_hours, discount_incentive_percent' }
  ];

  const sqlDdl = `-- CODShield Relational Database Schema (PostgreSQL)

CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  wallet_balance_cents INTEGER NOT NULL DEFAULT 0,
  active_plan VARCHAR(50) DEFAULT 'growth',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  order_number VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(30) NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  rto_risk_score INTEGER NOT NULL DEFAULT 0,
  verification_status VARCHAR(50) DEFAULT 'pending',
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_merchant_status ON orders(merchant_id, verification_status);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 3 · DATA ARCHITECTURE
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">PostgreSQL Relational Schema</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Database Schema & Entity-Relationship Architecture
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Designed for sub-millisecond atomic wallet operations, high-concurrency webhook ingestion, and phone fraud indexing.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveSchemaTab('tables')}
            className={`px-3 py-1.5 rounded transition-colors ${activeSchemaTab === 'tables' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
          >
            Entity Tables
          </button>
          <button
            onClick={() => setActiveSchemaTab('sql')}
            className={`px-3 py-1.5 rounded transition-colors ${activeSchemaTab === 'sql' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
          >
            SQL DDL
          </button>
        </div>
      </div>

      {activeSchemaTab === 'tables' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tables.map(t => (
            <div key={t.name} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Table className="h-4 w-4" />
                <span>{t.name}</span>
              </div>
              <p className="text-slate-300 font-sans text-xs pt-1">
                Fields: <span className="text-slate-400 font-mono text-[11px]">{t.fields}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
          <pre>{sqlDdl}</pre>
        </div>
      )}
    </div>
  );
};
