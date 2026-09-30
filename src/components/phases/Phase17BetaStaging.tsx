import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FlaskConical, 
  ToggleLeft, 
  ToggleRight, 
  MessageSquare, 
  Send, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Phase17BetaStaging: React.FC = () => {
  const { showToast } = useApp();

  const [sandboxMode, setSandboxMode] = useState(true);
  const [flags, setFlags] = useState({
    aiVoiceClone: true,
    addressGeofence: false,
    ndrCourierReattempt: true,
    upiOneClickLink: true,
  });

  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState<string[]>([
    'UrbanStyle: WhatsApp Quick-replies cut our verification time from 4 hours to 6 minutes.',
    'Organica: Adding 5% prepaid discount converted 42 COD orders on our first weekend!'
  ]);

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
    showToast(`Beta feature flag updated.`);
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    setSubmittedFeedback(prev => [feedback, ...prev]);
    setFeedback('');
    showToast('Merchant Beta feedback logged successfully.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 17 · PRE-LAUNCH STAGING
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Sandbox & Beta Cohort</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Beta Sandbox & Experimental Feature Flags
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Test cutting-edge RTO defense mechanisms with private beta merchants prior to global GA.
          </p>
        </div>

        {/* Sandbox Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-xs">
          <span className="text-slate-400">Sandbox Simulation Mode:</span>
          <button
            onClick={() => {
              setSandboxMode(!sandboxMode);
              showToast(sandboxMode ? 'Switched to Live Production Traffic' : 'Switched to Sandbox Test Mode');
            }}
            className={`font-mono font-bold px-2 py-0.5 rounded transition-colors ${
              sandboxMode 
                ? 'bg-amber-950 text-amber-300 border border-amber-800/50' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
            }`}
          >
            {sandboxMode ? 'SANDBOX ACTIVE' : 'LIVE READY'}
          </button>
        </div>
      </div>

      {/* Feature Flags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Beta Feature Flags</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <p className="font-semibold text-white">AI Voice Clone for IVR Calling</p>
                <p className="text-slate-400 text-[11px]">Human-like voice cadence in Hindi, Tamil, and Hinglish</p>
              </div>
              <input
                type="checkbox"
                checked={flags.aiVoiceClone}
                onChange={() => toggleFlag('aiVoiceClone')}
                className="h-4 w-4 rounded accent-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <p className="font-semibold text-white">Address Geofencing & Landmark AI</p>
                <p className="text-slate-400 text-[11px]">Auto-resolves missing house numbers via Google Maps API</p>
              </div>
              <input
                type="checkbox"
                checked={flags.addressGeofence}
                onChange={() => toggleFlag('addressGeofence')}
                className="h-4 w-4 rounded accent-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <p className="font-semibold text-white">Automated NDR Courier Re-Attempt Bot</p>
                <p className="text-slate-400 text-[11px]">Sends WhatsApp if delivery boy marks "Customer unavailable"</p>
              </div>
              <input
                type="checkbox"
                checked={flags.ndrCourierReattempt}
                onChange={() => toggleFlag('ndrCourierReattempt')}
                className="h-4 w-4 rounded accent-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-white">1-Click UPI Payment Deep Link</p>
                <p className="text-slate-400 text-[11px]">Opens GPay / PhonePe / Paytm directly from WhatsApp button</p>
              </div>
              <input
                type="checkbox"
                checked={flags.upiOneClickLink}
                onChange={() => toggleFlag('upiOneClickLink')}
                className="h-4 w-4 rounded accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Merchant Feedback Collector */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Beta Merchant Feedback Pipeline</h3>
            <p className="text-xs text-slate-400">
              Direct telemetry feedback from pilot merchants running high COD volume.
            </p>

            <div className="space-y-2">
              <textarea
                rows={3}
                placeholder="Log pilot merchant qualitative feedback or edge case..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSendFeedback}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                Log Feedback Entry
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-mono text-slate-400">RECORDED PILOT FEEDBACK</span>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {submittedFeedback.map((fb, idx) => (
                <p key={idx} className="text-[11px] text-slate-300 p-2 rounded bg-slate-950 border border-slate-800">
                  {fb}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
