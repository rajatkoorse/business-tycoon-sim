import React from 'react';
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
  Play,
  Pause,
  FastForward,
  Award
} from 'lucide-react';

interface ExecutiveHeaderProps {
  summary: SimulationSummary;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  openTab: (tab: string) => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  summary,
  simSpeed,
  setSimSpeed,
  openTab
}) => {
  const { life } = summary;

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
            <span>Level {summary.level}</span>
            <span>•</span>
            <span>Day {summary.currentDay} (Q{summary.currentQuarter} Y{summary.currentYear})</span>
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
        {/* Health */}
        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Health"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
          <span className="text-white font-bold">{life.health}%</span>
        </div>

        {/* Happiness */}
        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Happiness"
        >
          <Smile className="w-3.5 h-3.5 text-amber-400 fill-amber-500/30" />
          <span className="text-white font-bold">{life.happiness}%</span>
        </div>

        {/* Smarts */}
        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Smarts / IQ"
        >
          <Brain className="w-3.5 h-3.5 text-cyan-400 fill-cyan-500/30" />
          <span className="text-white font-bold">{life.smarts}%</span>
        </div>

        {/* Charisma */}
        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Charisma"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 fill-purple-500/30" />
          <span className="text-white font-bold">{life.charisma}%</span>
        </div>

        {/* Energy */}
        <div
          onClick={() => openTab('LIFE')}
          className="flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:opacity-80 transition"
          title="Energy"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/30" />
          <span className="text-white font-bold">{life.energy}/{life.maxEnergy}</span>
        </div>
      </div>

      {/* 3. CASH & FINANCIAL METRICS */}
      <div className="flex items-center gap-4 md:gap-6 font-mono">
        {/* Cash in Pocket */}
        <div
          onClick={() => openTab('FINANCE')}
          className="cursor-pointer flex flex-col text-right hover:opacity-80 transition"
        >
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Cash Treasury</span>
          <span className="font-bold text-base md:text-lg text-emerald-400">
            ${summary.cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Daily Burn Rate */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Living Cost</span>
          <span className="font-bold text-xs text-rose-400">
            -${summary.dailyLivingCost.toFixed(2)}/day
          </span>
        </div>

        {/* Stock Price or Passive */}
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
              +${summary.passiveRevenuePerSec.toFixed(2)}/s
            </span>
          </div>
        ) : null}
      </div>

      {/* 4. SIM CONTROLS */}
      <div className="flex items-center gap-1.5 bg-black/60 border border-slate-800 rounded-xl p-1 font-mono">
        <button
          onClick={() => setSimSpeed(0)}
          className={`p-1.5 rounded-lg text-xs font-bold transition ${
            simSpeed === 0 ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
          }`}
          title="Pause"
        >
          <Pause className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setSimSpeed(1)}
          className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
            simSpeed === 1 ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
          }`}
          title="Normal Speed"
        >
          1x
        </button>
        <button
          onClick={() => setSimSpeed(5)}
          className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
            simSpeed === 5 ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
          }`}
          title="Fast Speed (5x)"
        >
          5x
        </button>
      </div>
    </header>
  );
};