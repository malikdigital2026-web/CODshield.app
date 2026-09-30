import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCheck, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ShieldCheck,
  Terminal
} from 'lucide-react';

export const Phase16TestingSimulator: React.FC = () => {
  const { testCases, isRunningTests, runAllTests } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              PHASE 16 · TEST AUTOMATION & QA
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">Critical Path Invariants</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            End-to-End Automated Test Suite Runner
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Validates webhook cryptographic signatures, atomic wallet balance operations, and risk scoring accuracy.
          </p>
        </div>

        <button
          onClick={runAllTests}
          disabled={isRunningTests}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
        >
          {isRunningTests ? (
            <>
              <RotateCcw className="h-4 w-4 animate-spin" />
              <span>Running Invariant Suites...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              <span>Run All Test Suites (6)</span>
            </>
          )}
        </button>
      </div>

      {/* Test summary banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">All Invariant Systems Healthy</h3>
            <p className="text-xs text-slate-400">Deterministic tests passing with zero detected regressions</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-emerald-400 font-bold">{testCases.filter(t => t.status === 'passed').length} / {testCases.length} Passed</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Coverage: 98.4%</span>
        </div>
      </div>

      {/* Test Cases List */}
      <div className="space-y-3">
        {testCases.map((tc, index) => (
          <div 
            key={tc.id}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400 uppercase">SUITE 0{index + 1}</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-emerald-400 text-[11px] uppercase">{tc.category}</span>
              </div>
              <h4 className="font-semibold text-white text-sm">{tc.name}</h4>
              <p className="text-slate-400 text-xs">{tc.description}</p>
              {tc.details && (
                <p className="text-[11px] font-mono text-slate-400 pt-1">
                  ↳ <span className="text-slate-300">{tc.details}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              {tc.executionTimeMs && (
                <span className="font-mono text-slate-400 text-[11px]">
                  {tc.executionTimeMs}ms
                </span>
              )}

              <span className={`inline-flex items-center gap-1 font-mono text-[11px] font-bold px-2.5 py-1 rounded ${
                tc.status === 'passed' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' :
                tc.status === 'running' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50 animate-pulse' :
                'bg-slate-800 text-slate-400'
              }`}>
                {tc.status === 'passed' && <CheckCircle2 className="h-3.5 w-3.5" />}
                {tc.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
