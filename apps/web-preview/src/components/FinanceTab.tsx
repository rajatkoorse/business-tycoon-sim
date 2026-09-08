import React, { useState } from 'react';
import { GameSimulation, SimulationSummary } from '@tycoon/core-simulation';
import {
  DollarSign,
  FileText,
  TrendingUp,
  ShieldCheck,
  Building2,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface FinanceTabProps {
  sim: GameSimulation;
  summary: SimulationSummary;
}

export const FinanceTab: React.FC<FinanceTabProps> = ({ sim, summary }) => {
  const [mobileTab, setMobileTab] = useState<'BALANCE' | 'INCOME' | 'CASHFLOW' | 'AUDIT'>('BALANCE');

  let ppeValue = 0;
  for (const r of sim.cryptoRigs) ppeValue += r.cost;
  for (const a of sim.aiClusters) ppeValue += a.cost;
  for (const b of sim.realEstate) ppeValue += b.cost;
  for (const f of sim.factories) ppeValue += f.cost;

  const balanceSheet = sim.ledger.generateBalanceSheet(
    0,
    0,
    0,
    ppeValue,
    0,
    sim.isIncorporated ? 5000 : 0,
    0,
    0,
    0,
    sim.isIncorporated ? 2500 : 25,
    0
  );

  const monthlyGrossRev = summary.passiveRevenuePerSec * 86400 * 30;
  const monthlyPowerCost = monthlyGrossRev * 0.15;
  const monthlySalaries = sim.workforce.getEmployees().reduce((sum, e) => sum + e.salary / 12, 0);

  const incomeStatement = sim.ledger.generateIncomeStatement(
    monthlyGrossRev,
    monthlyPowerCost,
    0,
    0,
    monthlySalaries,
    0,
    0,
    0
  );

  const zScore = sim.ledger.calculateAltmanZScore(
    balanceSheet.cash,
    balanceSheet.retainedEarnings,
    incomeStatement.ebit,
    summary.marketCap || 1000,
    incomeStatement.grossRevenue * 4 || 1000,
    balanceSheet.totalAssets || 1000,
    balanceSheet.totalLiabilities || 1
  );

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Header & Solvency Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-chakra font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <span>GAAP Financial Statements & General Ledger</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {sim.isIncorporated ? 'Official Registered LLC 3-Statement Reporting' : 'Personal Freelance Cash Accounting'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 ${
              zScore.distressRating === 'SAFE'
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                : 'bg-rose-950/40 text-rose-400 border-rose-500/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Altman Z: {zScore.zScore.toFixed(2)} ({zScore.distressRating})</span>
          </span>
        </div>
      </div>

      {/* Mobile Sub-Tab Buttons */}
      <div className="flex md:hidden bg-slate-900/80 border border-slate-800 rounded-2xl p-1 gap-1 overflow-x-auto">
        <button
          onClick={() => setMobileTab('BALANCE')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-chakra font-bold whitespace-nowrap transition ${
            mobileTab === 'BALANCE' ? 'bg-cyan-500 text-black' : 'text-slate-400'
          }`}
        >
          Balance Sheet
        </button>
        <button
          onClick={() => setMobileTab('INCOME')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-chakra font-bold whitespace-nowrap transition ${
            mobileTab === 'INCOME' ? 'bg-cyan-500 text-black' : 'text-slate-400'
          }`}
        >
          Income (P&L)
        </button>
        <button
          onClick={() => setMobileTab('CASHFLOW')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-chakra font-bold whitespace-nowrap transition ${
            mobileTab === 'CASHFLOW' ? 'bg-cyan-500 text-black' : 'text-slate-400'
          }`}
        >
          Cash Flow
        </button>
        <button
          onClick={() => setMobileTab('AUDIT')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-chakra font-bold whitespace-nowrap transition ${
            mobileTab === 'AUDIT' ? 'bg-cyan-500 text-black' : 'text-slate-400'
          }`}
        >
          Ledger Logs
        </button>
      </div>

      {/* 3-STATEMENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. BALANCE SHEET */}
        <div
          className={`bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 ${
            mobileTab !== 'BALANCE' ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <h3 className="font-chakra font-bold text-base text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Balance Sheet</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
              Live GAAP
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="text-slate-400 uppercase text-[10px] font-bold tracking-wider text-cyan-400">
              Current & Fixed Assets
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Cash Treasury:</span>
              <span className="text-emerald-400 font-bold">${balanceSheet.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Hardware & PP&E:</span>
              <span className="text-slate-200 font-bold">${balanceSheet.ppeNet.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">IP & Software:</span>
              <span className="text-slate-200 font-bold">${balanceSheet.intangiblesAndPatents.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 font-bold text-white text-sm bg-cyan-950/20 p-2 rounded-xl border border-cyan-500/20">
              <span>Total Assets:</span>
              <span className="text-cyan-400">${balanceSheet.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="text-slate-400 uppercase text-[10px] font-bold tracking-wider text-purple-400 pt-2">
              Liabilities & Equity
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Accounts Payable:</span>
              <span className="text-slate-200 font-bold">${balanceSheet.accountsPayable.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Long-Term Debt:</span>
              <span className="text-slate-200 font-bold">${balanceSheet.longTermDebt.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Paid-In Capital:</span>
              <span className="text-slate-200 font-bold">${balanceSheet.commonStock.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Retained Earnings:</span>
              <span className="text-emerald-400 font-bold">${balanceSheet.retainedEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center pt-2 font-bold text-white text-sm bg-purple-950/20 p-2 rounded-xl border border-purple-500/20">
              <span>Total Liab & Equity:</span>
              <span className="text-purple-400">${balanceSheet.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* 2. INCOME STATEMENT (P&L) */}
        <div
          className={`bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 ${
            mobileTab !== 'INCOME' ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <h3 className="font-chakra font-bold text-base text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Income Statement (P&L)</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Monthly
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Automated Revenue:</span>
              <span className="text-emerald-400 font-bold">+${monthlyGrossRev.toLocaleString(undefined, { minimumFractionDigits: 2 })}/mo</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Power & Server Hosting:</span>
              <span className="text-rose-400 font-bold">-${monthlyPowerCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}/mo</span>
            </div>
            <div className="flex justify-between items-center py-1.5 font-bold text-slate-200 border-t border-slate-800">
              <span>Gross Profit:</span>
              <span className="text-white">${Math.max(0, monthlyGrossRev - monthlyPowerCost).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Employee Payroll (SG&A):</span>
              <span className="text-rose-400 font-bold">-${monthlySalaries.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Personal Living Subsistence:</span>
              <span className="text-rose-400 font-bold">-${summary.monthlyBills.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between items-center pt-2 font-bold text-white text-sm bg-emerald-950/20 p-2 rounded-xl border border-emerald-500/20">
              <span>Net Monthly Flow:</span>
              <span className="text-emerald-400">
                ${(monthlyGrossRev - monthlyPowerCost - monthlySalaries - summary.monthlyBills).toLocaleString(undefined, { minimumFractionDigits: 2 })}/mo
              </span>
            </div>
          </div>
        </div>

        {/* 3. OPERATIONAL CASH FLOW */}
        <div
          className={`bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 ${
            mobileTab !== 'CASHFLOW' ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <h3 className="font-chakra font-bold text-base text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Operational Cash Flow</span>
            </h3>
            <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Per Second
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Real-Time Yield:</span>
              <span className="text-emerald-400 font-bold">+${summary.passiveRevenuePerSec.toFixed(3)}/sec</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Mining Rigs Deployed:</span>
              <span className="text-slate-200 font-bold">{sim.cryptoRigs.length} Units</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">AI Compute Pods:</span>
              <span className="text-slate-200 font-bold">{sim.aiClusters.length} Pods</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-300">Commercial Buildings:</span>
              <span className="text-slate-200 font-bold">{sim.realEstate.length} Towers</span>
            </div>
            <div className="flex justify-between items-center pt-2 font-bold text-white text-sm bg-amber-950/20 p-2 rounded-xl border border-amber-500/20">
              <span>Liquid Cash on Hand:</span>
              <span className="text-amber-400">${balanceSheet.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. GENERAL LEDGER JOURNAL ENTRIES (Mobile Audit Log) */}
      <div
        className={`bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 ${
          mobileTab !== 'AUDIT' ? 'hidden md:block' : 'block'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <h3 className="font-chakra font-bold text-sm text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Double-Entry General Ledger Journal (Latest Postings)</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Strict GAAP Reconciliation</span>
        </div>

        <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 text-xs font-mono">
          {sim.ledger.getJournalEntries().slice(0, 10).map((entry) => (
            <div key={entry.id} className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-bold">
                <span>{entry.description}</span>
                <span className="text-slate-500 text-[10px]">{new Date(entry.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px]">
                {entry.debits.map((d, i) => (
                  <span key={i} className="text-emerald-400 font-bold">
                    DR: {d.account} (${d.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })})
                  </span>
                ))}
                {entry.credits.map((c, i) => (
                  <span key={i} className="text-cyan-400 font-bold">
                    CR: {c.account} (${c.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};