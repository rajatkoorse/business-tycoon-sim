import React from 'react';
import { GameSimulation, SectorType } from '@tycoon/core-simulation';
import {
  Cpu,
  Server,
  Building2,
  Factory,
  Radio,
  Skull,
  DollarSign,
  TrendingUp,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';

interface OperationsTabProps {
  sim: GameSimulation;
  onOpenIncorporation: () => void;
  onRefresh: () => void;
}

export const OperationsTab: React.FC<OperationsTabProps> = ({
  sim,
  onOpenIncorporation,
  onRefresh
}) => {
  const summary = sim.getSummary();
  const cash = sim.ledger.getAccountBalance('ASSET:Cash');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. INCORPORATION / IPO BANNER */}
      {!sim.isIncorporated ? (
        <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/40 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-chakra font-bold text-base text-white">
                Primary Milestone: Incorporate Official LLC ($2,500)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Register your business with the state to unlock automated compute clusters, hire C-Suite officers, and scale enterprise revenue!
              </p>
            </div>
          </div>

          <button
            onClick={onOpenIncorporation}
            disabled={cash < 2500}
            className={`px-6 py-2.5 rounded-xl font-chakra font-bold text-sm transition flex items-center gap-2 ${
              cash >= 2500
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black cursor-pointer hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Register LLC ($2,500)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : !sim.isIPOListed ? (
        <div className="bg-gradient-to-r from-cyan-950/40 via-blue-900/20 to-slate-900 border border-cyan-500/40 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-chakra font-bold text-base text-white">
                Next Stage: Wall Street Public IPO ($100,000)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Float shares of "{summary.companyName}" on the Metropolis Stock Exchange to unlock institutional liquidity and hostile takeover bids!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (sim.fileIPO()) onRefresh();
            }}
            disabled={cash < 100000}
            className={`px-6 py-2.5 rounded-xl font-chakra font-bold text-sm transition flex items-center gap-2 ${
              cash >= 100000
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black cursor-pointer hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Ring Wall Street Bell (IPO)</span>
            <Award className="w-4 h-4" />
          </button>
        </div>
      ) : null}

      {/* 2. LIVE ASSET PORTFOLIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Crypto Mining Rigs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-chakra font-bold text-white text-sm">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Crypto ASIC Mining</span>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">
              {sim.cryptoRigs.length} Rigs Deployed
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Hashrate mining yields BTC continuously into ledger cash accounts.
          </p>
          <button
            onClick={() => {
              sim.buyAsset(SectorType.FINTECH_CRYPTO, {
                id: 'RIG-' + Math.random().toString(36).substr(2, 5),
                tier: 1,
                name: 'Antminer S21 Pro Hydro (335 TH/s)',
                hashrateTH: 335,
                powerKw: 5.3,
                dailyCoinOutput: 0.00045,
                condition: 1.0,
                cost: 4500
              });
              onRefresh();
            }}
            disabled={cash < 4500}
            className={`w-full py-2.5 rounded-xl font-chakra font-bold text-xs transition ${
              cash >= 4500
                ? 'bg-amber-500 text-black hover:bg-amber-400 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Deploy Hydro ASIC ($4,500)
          </button>
        </div>

        {/* AI Compute Clusters */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-chakra font-bold text-white text-sm">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>AI GPU Compute Cluster</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              {sim.aiClusters.length} Clusters
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Rent high-performance H100 SXM5 pods to frontier AI labs for recurring monthly MRR.
          </p>
          <button
            onClick={() => {
              sim.buyAsset(SectorType.BIG_TECH_AI, {
                id: 'AI-' + Math.random().toString(36).substr(2, 5),
                name: 'NVIDIA 8x H100 SXM5 Pod (160 PFLOPS)',
                gpuCount: 8,
                gpuType: 'H100_SXM5',
                flopCapacityPetaFlops: 160,
                mrrGenerated: 24000,
                powerDrawMW: 0.01,
                cost: 320000
              });
              onRefresh();
            }}
            disabled={cash < 320000}
            className={`w-full py-2.5 rounded-xl font-chakra font-bold text-xs transition ${
              cash >= 320000
                ? 'bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Acquire 8x H100 Pod ($320k)
          </button>
        </div>

        {/* Commercial Real Estate */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-chakra font-bold text-white text-sm">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Commercial Skyscrapers</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {sim.realEstate.length} Buildings
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Prime downtown office towers generating stable multi-tenant triple-net rental income.
          </p>
          <button
            onClick={() => {
              sim.buyAsset(SectorType.COMMERCIAL_REAL_ESTATE, {
                id: 'CRE-' + Math.random().toString(36).substr(2, 5),
                name: 'Financial District Tower #7',
                zone: 'FINANCIAL_DISTRICT',
                floors: 35,
                valuation: 12000000,
                monthlyRentalPerSqFt: 65,
                occupancyRate: 0.94,
                mortgageDebt: 8000000,
                prestigeScore: 85,
                cost: 4000000
              });
              onRefresh();
            }}
            disabled={cash < 4000000}
            className={`w-full py-2.5 rounded-xl font-chakra font-bold text-xs transition ${
              cash >= 4000000
                ? 'bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Acquire Skyscraper ($4.0M Equity)
          </button>
        </div>
      </div>
    </div>
  );
};