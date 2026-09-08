import React from 'react';
import { GameSimulation, SimulationSummary } from '@tycoon/core-simulation';

interface FinanceTabProps {
  sim: GameSimulation;
  summary: SimulationSummary;
}

export const FinanceTab: React.FC<FinanceTabProps> = ({ sim, summary }) => {
  const cash = sim.ledger.getAccountBalance('ASSET:Cash');
  let ppeValue = 0;
  for (const r of sim.cryptoRigs) ppeValue += r.cost;
  for (const a of sim.aiClusters) ppeValue += a.cost;
  for (const b of sim.realEstate) ppeValue += b.cost;
  for (const f of sim.factories) ppeValue += f.cost;

  const balanceSheet = sim.ledger.generateBalanceSheet(
    0, // marketableSecurities
    0, // receivables
    0, // inventory
    ppeValue,
    0, // accDepr
    sim.isIncorporated ? 5000 : 0, // intangibles
    0, // payables
    0, // shortTermDebt
    0, // longTermDebt
    sim.isIncorporated ? 2500 : 25, // commonStock
    0
  );

  const grossRev = summary.passiveRevenuePerSec * 86400 * 30; // monthly rate
  const incomeStatement = sim.ledger.generateIncomeStatement(
    grossRev,
    grossRev * 0.2,
    0,
    0,
    sim.isIncorporated ? 500 : 0,
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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-[#f59e0b]">
            Financial Statements & Double-Entry Ledger
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            {sim.isIncorporated ? 'Official Corporate GAAP Statements' : 'Sole Proprietorship Cash Ledger'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
              zScore.distressRating === 'SAFE'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            Altman Z-Score: {zScore.zScore.toFixed(2)} ({zScore.distressRating})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Balance Sheet */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="font-cyber font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>Balance Sheet</span>
            <span className="text-xs font-mono text-[#f59e0b]">Real-Time</span>
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="text-slate-400 uppercase text-[10px] font-bold">Assets</div>
            <div className="flex justify-between">
              <span>Cash & Equivalents:</span>
              <span className="text-emerald-400">${balanceSheet.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span>Hardware & PP&E:</span>
              <span>${balanceSheet.ppeNet.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Intangibles & IP:</span>
              <span>${balanceSheet.intangiblesAndPatents.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-1 font-bold text-white">
              <span>Total Assets:</span>
              <span className="text-[#00f0ff]">${balanceSheet.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="text-slate-400 uppercase text-[10px] font-bold pt-3">Liabilities & Equity</div>
            <div className="flex justify-between">
              <span>Accounts Payable:</span>
              <span>${balanceSheet.accountsPayable.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Long-Term Debt:</span>
              <span>${balanceSheet.longTermDebt.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Owner Equity:</span>
              <span>${balanceSheet.commonStock.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Retained Earnings:</span>
              <span className="text-emerald-400">${balanceSheet.retainedEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-1 font-bold text-white">
              <span>Total Liab & Equity:</span>
              <span className="text-[#00f0ff]">${balanceSheet.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Income Statement */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="font-cyber font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>Income Statement</span>
            <span className="text-xs font-mono text-[#f59e0b]">Projected (Monthly)</span>
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span>Gross Automated Revenue:</span>
              <span className="text-emerald-400">${grossRev.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span>Power & Hosting Cost:</span>
              <span className="text-rose-400">-${(grossRev * 0.2).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-200 border-t border-slate-800/60 pt-1">
              <span>Gross Profit:</span>
              <span>${(grossRev * 0.8).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span>Staff Salaries & SG&A:</span>
              <span className="text-rose-400">-${(sim.isIncorporated ? 500 : 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-base text-emerald-400">
              <span>Net Monthly Flow:</span>
              <span>${Math.max(0, grossRev * 0.8 - (sim.isIncorporated ? 500 : 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Cash Flow Statement */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="font-cyber font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>Operational Cash Flow</span>
            <span className="text-xs font-mono text-[#f59e0b]">Live Run-Rate</span>
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span>Passive Income / Sec:</span>
              <span className="text-emerald-400">+${summary.passiveRevenuePerSec.toFixed(2)}/s</span>
            </div>
            <div className="flex justify-between">
              <span>Mining Hardware Deployed:</span>
              <span>{sim.cryptoRigs.length} Units</span>
            </div>
            <div className="flex justify-between">
              <span>AI Clusters Deployed:</span>
              <span>{sim.aiClusters.length} Nodes</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-base text-[#00f0ff]">
              <span>Liquid Cash on Hand:</span>
              <span>${balanceSheet.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
