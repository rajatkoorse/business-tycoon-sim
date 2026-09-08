import React from 'react';
import { GameSimulation, SimulationSummary } from '@tycoon/core-simulation';
import { Award, ChevronRight } from 'lucide-react';

interface WarfareTabProps {
  sim: GameSimulation;
  summary: SimulationSummary;
}

export const WarfareTab: React.FC<WarfareTabProps> = ({ sim, summary }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-rose-500">
            Corporate Espionage & Asymmetric Warfare
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Black-Hat Cyber Ops • Hostile Takeover Raids • SEC Whistleblower Defense
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold">
            Heat Level: {summary.regulatoryHeat}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Launch Ops */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="font-cyber font-bold text-white text-base border-b border-slate-800 pb-2">
            Deploy Black-Ops Mission
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                const res = sim.warfare.launchEspionage({
                  attackerCorpId: 'APEX',
                  targetCorpId: 'AEGIS',
                  type: 'IP_THEFT',
                  agentSkill: 85,
                  cost: 50000
                });
                sim.addLog(
                  `Espionage launched: ${res.type} -> Result: ${res.status}`,
                  res.status === 'SUCCESS' ? 'SUCCESS' : 'DANGER'
                );
              }}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition flex items-center justify-between"
            >
              <div>
                <div className="font-cyber font-bold text-white text-sm">Exfiltrate AI Blueprints</div>
                <div className="text-xs text-slate-400 font-mono">Target: Aegis Quantum • Cost: $50,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                const res = sim.warfare.launchEspionage({
                  attackerCorpId: 'APEX',
                  targetCorpId: 'TITN',
                  type: 'LOGIC_BOMB',
                  agentSkill: 90,
                  cost: 75000
                });
                sim.addLog(
                  `Espionage launched: ${res.type} -> Result: ${res.status}`,
                  res.status === 'SUCCESS' ? 'SUCCESS' : 'DANGER'
                );
              }}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition flex items-center justify-between"
            >
              <div>
                <div className="font-cyber font-bold text-white text-sm">Deploy Server Logic Bomb</div>
                <div className="text-xs text-slate-400 font-mono">Target: Titan Petro • Cost: $75,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                sim.warfare.setHeat(Math.max(0, sim.warfare.getHeat() - 25));
                sim.addLog('Deployed $50,000 Political PAC Lobbying: Regulatory Heat reduced by 25%', 'SUCCESS');
              }}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-emerald-800/40 to-teal-800/40 hover:from-emerald-700/60 hover:to-teal-700/60 border border-emerald-500/40 text-left transition flex items-center justify-between"
            >
              <div>
                <div className="font-cyber font-bold text-emerald-300 text-sm">Lobby Regulators & PACs</div>
                <div className="text-xs text-slate-300 font-mono">Reduce SEC Heat (-25%) • Cost: $50,000</div>
              </div>
              <Award className="w-5 h-5 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Corporate Defense Shield */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="font-cyber font-bold text-white text-base border-b border-slate-800 pb-2">
            Corporate Defense Shield
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-white">
                <span>Poison Pill Defense:</span>
                <span className="text-emerald-400">ARMED</span>
              </div>
              <p className="text-slate-400">
                Automatically dilutes hostile bidders by 50% if any competitor crosses 15% open-market ownership.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-white">
                <span>Tier-3 Security Operations Center:</span>
                <span className="text-[#00f3ff]">ACTIVE</span>
              </div>
              <p className="text-slate-400">
                Rival espionage detection chance boosted to 65%. Honeypots active on trading servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
