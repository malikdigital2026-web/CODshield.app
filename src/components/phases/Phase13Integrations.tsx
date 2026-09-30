import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Copy, 
  Code, 
  Send, 
  ShieldCheck, 
  Plus,
  Sliders
} from 'lucide-react';

export const Phase13Integrations: React.FC = () => {
  const { 
    integrations, 
    simulateIncomingShopifyOrder, 
    showToast 
  } = useApp();

  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState<{ id: string; event: string; status: number; time: string }[]>([
    { id: 'evt_9981', event: 'shopify/orders/create', status: 200, time: '2 mins ago' },
    { id: 'evt_9980', event: 'shopify/orders/updated', status: 200, time: '14 mins ago' },
    { id: 'evt_9979', event: 'woocommerce/order/created', status: 200, time: '38 mins ago' },
  ]);

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText('https://api.codshield.io/v1/webhooks/shopify/wh_live_948201');
    setCopiedWebhook(true);
    showToast('Webhook URL copied to clipboard.');
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const handleTestWebhookEvent = () => {
    simulateIncomingShopifyOrder();
    setWebhookLogs(prev => [
      { id: `evt_${Math.floor(1000 + Math.random() * 9000)}`, event: 'shopify/orders/create', status: 200, time: 'Just now' },
      ...prev
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 13 · PLATFORM CONNECTORS
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Shopify & WooCommerce</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            E-Commerce Store Integrations & Webhooks
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time 2-way synchronization. Ingest orders instantly and write back order tags and fulfillment holds.
          </p>
        </div>

        <button
          onClick={handleTestWebhookEvent}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors shadow-xs"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Fire Test Webhook Ingest</span>
        </button>
      </div>

      {/* Connected Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map(int => (
          <div key={int.platform} className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold uppercase">
                  {int.platform === 'shopify' ? '🛍️' : '🛒'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{int.storeName}</h3>
                  <a 
                    href={int.storeUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 mt-0.5"
                  >
                    <span>{int.storeUrl}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                ACTIVE SYNC
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Orders Synced:</span>
                <span className="font-mono text-white font-bold">{int.syncedOrdersCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Last Event Received:</span>
                <span className="font-mono text-slate-400">{int.lastSyncAt}</span>
              </div>
            </div>

            {/* Sync Settings */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between text-slate-300">
                <span>Write back tags (<code>COD-Verified</code>)</span>
                <span className="text-emerald-400 font-mono font-medium">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Auto-cancel order in store if buyer cancels</span>
                <span className="text-emerald-400 font-mono font-medium">Enabled</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Webhook Configuration & Secret Box */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Webhook Ingestion Endpoint</h3>
            <p className="text-xs text-slate-400">Configure your Shopify Admin &gt; Notifications &gt; Webhooks</p>
          </div>
          <span className="text-xs font-mono text-emerald-400">HMAC SHA-256 Secured</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value="https://api.codshield.io/v1/webhooks/shopify/wh_live_948201"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 select-all"
          />
          <button
            onClick={handleCopyEndpoint}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copiedWebhook ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Live Webhook Event Ingestion Logs */}
        <div className="pt-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Recent Inbound Webhook Calls</span>
          <div className="mt-2 divide-y divide-slate-800 border border-slate-800 rounded-lg bg-slate-950/60 overflow-hidden text-xs">
            {webhookLogs.map(log => (
              <div key={log.id} className="p-2.5 flex items-center justify-between font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">POST {log.status}</span>
                  <span className="text-slate-300">{log.event}</span>
                  <span className="text-slate-500 text-[11px]">{log.id}</span>
                </div>
                <span className="text-slate-500 text-[11px]">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
