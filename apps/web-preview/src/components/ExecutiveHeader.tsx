import React, { useEffect, useState } from 'react';
import { SimulationSummary } from '@tycoon/core-simulation';
import {
  Heart,
  Smile,
  Brain,
  Sparkles,
  Zap,
  Flame,
  TrendingUp,
  DollarSign,
  ShieldAlert,
  Clock,
  Save,
  RotateCcw,
  Download,
  Upload
} from 'lucide-react';

interface ExecutiveHeaderProps {
  summary: SimulationSummary;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  openTab: (tab: string) => void;
  onSave: () => void;
  onReset: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  summary,
  simSpeed,
  setSimSpeed,
  openTab,
  onSave,
  onReset,
  onExport,
  onImport
}) => {
  const { life } = summary;
  const [realtimeClock, setRealtimeClock] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setRealtimeClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090d16]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none">
      {/* 1. BRAND & IDENTITY */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => openTab('LIFE')}
          className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 border border-cyan-400/40 flex items-center justify-center font-chakra font-bold text-black text-base shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer hover:scale-105 transition"
        >
          {summary.isIncorporated ? `$${summary.ticker.substring(0, 2)}` : '👑'}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-chakra font-bold text-sm md:text-base text-white truncate max-w-[160px] md:max-w-[220px]">
              {summary.companyName}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              {summary.isIncorporated ? `$${summary.ticker}` : 'Freelancer'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-cyan-300 font-bold">
              <Clock className="w-3 h-3 text-cyan-400" />
              {realtimeClock} (Real-Time)
            </span>
            <span>•</span>
            <span>Day {summary.currentDay}</span>
            {life.streakCount > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                  <Flame className="w-3 h-3 fill-amber-400" />
                  {life.streakCount}x Streak
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. LIFE QUICK GAUGES (BITLIFE TELEMETRY) */}
      <div className="hidden lg:flex items-center gap-4 bg-black/40 border border-slate-800/80 rounded-2xl px-4 py-1.5">
        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Health (100% full health)"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
          <span className="text-white font-bold">{life.health}%</span>
        </div>

        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Happiness"
        >
          <Smile className="w-3.5 h-3.5 text-amber-400 fill-amber-500/30" />
          <span className="text-white font-bold">{life.happiness}%</span>
        </div>

        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Smarts / IQ"
        >
          <Brain className="w-3.5 h-3.5 text-cyan-400 fill-cyan-500/30" />
          <span className="text-white font-bold">{life.smarts}%</span>
        </div>

        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Charisma"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 fill-purple-500/30" />
          <span className="text-white font-bold">{life.charisma}%</span>
        </div>

        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Energy (Recharging continuously)"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/30" />
          <span className="text-white font-bold">{life.energy}/{life.maxEnergy}</span>
        </div>
      </div>

      {/* 3. CASH & FINANCIAL METRICS */}
      <div className="flex items-center gap-4 md:gap-6 font-mono">
        <div
          onClick={() => openTab('FINANCE')}
          className="cursor-pointer flex flex-col text-right hover:opacity-80 transition"
        >
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Cash Treasury</span>
          <span className="font-bold text-base md:text-lg text-emerald-400">
            ${summary.cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="hidden sm:flex flex-col text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Monthly Bills</span>
          <span className="font-bold text-xs text-slate-300">
            ${summary.monthlyBills.toLocaleString()}/mo
          </span>
        </div>

        {summary.isIPOListed ? (
          <div
            onClick={() => openTab('EXCHANGE')}
            className="cursor-pointer flex flex-col text-right hover:opacity-80 transition"
          >
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Stock Price</span>
            <span className="font-bold text-sm text-cyan-400 flex items-center justify-end gap-1">
              ${summary.stockPrice.toFixed(2)}
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
          </div>
        ) : summary.passiveRevenuePerSec > 0 ? (
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Yield</span>
            <span className="font-bold text-xs text-cyan-400">
              +${summary.passiveRevenuePerSec.toFixed(3)}/s
            </span>
          </div>
        ) : null}
      </div>

      {/* 4. DATABASE SAVE & CONTROLS */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-black/60 border border-slate-800 rounded-xl p-1">
          <button
            onClick={onSave}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition cursor-pointer"
            title="Save Game to Database"
          >
            <Save className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onExport}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition cursor-pointer"
            title="Export Save File (JSON)"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
            title="Reset Game / New Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};