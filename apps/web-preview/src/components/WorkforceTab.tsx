import React from 'react';
import { CSuiteRole, GameSimulation } from '@tycoon/core-simulation';

interface WorkforceTabProps {
  sim: GameSimulation;
}

export const WorkforceTab: React.FC<WorkforceTabProps> = ({ sim }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-[#00f3ff]">
            Executive C-Suite & Workforce Management
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Talent Retention • Psychological States • Salary Counter-Poach Defense
          </p>
        </div>
        <button
          onClick={() => {
            sim.workforce.hireEmployee({
              name: 'Marcus Croft',
              role: CSuiteRole.CSO,
              salary: 220000,
              skills: { tech: 75, finance: 50, ops: 80, charisma: 70, stealth: 90 },
              psych: { morale: 90, burnout: 10, loyalty: 95, greed: 65, paranoia: 80 },
              dailyHours: 8
            });
            sim.addLog('Hired new CSO: Marcus Croft ($220,000/yr)', 'SUCCESS');
          }}
          className="px-4 py-2 rounded-xl bg-[#00f3ff] hover:bg-[#00f3ff]/80 text-black font-cyber font-bold text-xs shadow-lg transition"
        >
          + Recruit Executive
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {sim.workforce.getEmployees().map((emp) => (
          <div key={emp.id} className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f3ff] to-blue-700 flex items-center justify-center font-cyber font-bold text-black text-sm">
                  {emp.role.substring(0, 3)}
                </div>
                <div>
                  <h4 className="font-cyber font-bold text-white text-base">{emp.name}</h4>
                  <span className="text-xs font-mono text-[#d4af37] font-semibold">
                    {emp.role} • ${emp.salary.toLocaleString()}/yr
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                {Math.round(emp.dailyOutput)}% Output
              </span>
            </div>

            {/* Psychological Meters */}
            <div className="space-y-2 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-400 mb-0.5">
                  <span>Morale:</span>
                  <span className="text-emerald-400">{Math.round(emp.psych.morale)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${emp.psych.morale}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-0.5">
                  <span>Burnout:</span>
                  <span className="text-rose-400">{Math.round(emp.psych.burnout)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${emp.psych.burnout}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-0.5">
                  <span>Loyalty:</span>
                  <span className="text-blue-400">{Math.round(emp.psych.loyalty)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${emp.psych.loyalty}%` }} />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => {
                  emp.psych.morale = Math.min(100, emp.psych.morale + 15);
                  emp.psych.burnout = Math.max(0, emp.psych.burnout - 20);
                  sim.addLog(`Disbursed $25,000 executive retention bonus to ${emp.name}`, 'SUCCESS');
                }}
                className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold border border-emerald-500/40 transition"
              >
                Disburse Bonus ($25k)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
