import React from 'react';
import {
  DIET_DATA,
  DietTier,
  GameSimulation,
  HOUSING_DATA,
  HousingTier,
  TRANSIT_DATA,
  TransitTier,
  WARDROBE_DATA,
  WardrobeTier
} from '@tycoon/core-simulation';
import {
  Heart,
  Smile,
  Brain,
  Sparkles,
  Zap,
  Home,
  Shirt,
  Utensils,
  Car,
  Dumbbell,
  BookOpen,
  Stethoscope,
  GlassWater,
  DollarSign
} from 'lucide-react';

interface LifeHubTabProps {
  sim: GameSimulation;
  onAction: () => void;
}

export const LifeHubTab: React.FC<LifeHubTabProps> = ({ sim, onAction }) => {
  const stats = sim.life.getStats();
  const cash = sim.ledger.getAccountBalance('ASSET:Cash');

  const handleGym = () => {
    if (cash < 20) {
      sim.addLog("Cannot afford gym pass ($20)!", "WARN");
      return;
    }
    const res = sim.life.hitGym();
    if (res.success) {
      sim.ledger.recordTransaction({
        description: "Gym Workout Session",
        debits: [{ account: "EXPENSE:Lifestyle", amount: res.cost }],
        credits: [{ account: "ASSET:Cash", amount: res.cost }]
      });
      sim.addLog(res.message, "SUCCESS");
      onAction();
    } else {
      sim.addLog(res.message, "WARN");
    }
  };

  const handleLibrary = () => {
    const res = sim.life.readLibrary();
    if (res.success) {
      sim.addLog(res.message, "SUCCESS");
      onAction();
    } else {
      sim.addLog(res.message, "WARN");
    }
  };

  const handleDoctor = () => {
    if (cash < 150) {
      sim.addLog("Cannot afford clinic checkup ($150)!", "WARN");
      return;
    }
    const res = sim.life.visitDoctor();
    sim.ledger.recordTransaction({
      description: "Medical Health Checkup",
      debits: [{ account: "EXPENSE:Lifestyle", amount: res.cost }],
      credits: [{ account: "ASSET:Cash", amount: res.cost }]
    });
    sim.addLog(res.message, "SUCCESS");
    onAction();
  };

  const handleNightclub = () => {
    if (cash < 120) {
      sim.addLog("Cannot afford nightclub VIP table ($120)!", "WARN");
      return;
    }
    const res = sim.life.goNightclub();
    if (res.success) {
      sim.ledger.recordTransaction({
        description: "Nightclub VIP Networking",
        debits: [{ account: "EXPENSE:Lifestyle", amount: res.cost }],
        credits: [{ account: "ASSET:Cash", amount: res.cost }]
      });
      sim.addLog(res.message, "SUCCESS");
      onAction();
    } else {
      sim.addLog(res.message, "WARN");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. TOP STATUS METERS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Health */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <Heart className="w-4 h-4 fill-rose-500/20" /> Health
            </span>
            <span className="font-bold text-white">{stats.health}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-red-400 transition-all duration-300"
              style={{ width: `${stats.health}%` }}
            />
          </div>
        </div>

        {/* Happiness */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Smile className="w-4 h-4 fill-amber-500/20" /> Happiness
            </span>
            <span className="font-bold text-white">{stats.happiness}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
              style={{ width: `${stats.happiness}%` }}
            />
          </div>
        </div>

        {/* Smarts */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Brain className="w-4 h-4 fill-cyan-500/20" /> Smarts / IQ
            </span>
            <span className="font-bold text-white">{stats.smarts}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-300"
              style={{ width: `${stats.smarts}%` }}
            />
          </div>
        </div>

        {/* Charisma */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <Sparkles className="w-4 h-4 fill-purple-500/20" /> Charisma
            </span>
            <span className="font-bold text-white">{stats.charisma}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-300"
              style={{ width: `${stats.charisma}%` }}
            />
          </div>
        </div>

        {/* Energy */}
        <div className="col-span-2 md:col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Zap className="w-4 h-4 fill-emerald-500/20" /> Energy
            </span>
            <span className="font-bold text-white">{stats.energy}/{stats.maxEnergy}</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${(stats.energy / stats.maxEnergy) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. DAILY ACTIVITIES (BITLIFE STYLE) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-chakra font-bold text-base text-white flex items-center gap-2">
            <span>🏋️ Personal Life Activities</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Age: <strong>{stats.ageYears} yrs ({stats.ageDays} days)</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={handleGym}
            className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between">
              <Dumbbell className="w-5 h-5 text-rose-400" />
              <span className="text-xs font-mono text-emerald-400 font-bold">$20</span>
            </div>
            <div>
              <div className="font-chakra font-bold text-sm text-white">Hit the Gym</div>
              <div className="text-[11px] text-slate-400 mt-0.5">+6 Health | +4 Happy | -15 Energy</div>
            </div>
          </button>

          <button
            onClick={handleLibrary}
            className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400 font-bold">FREE</span>
            </div>
            <div>
              <div className="font-chakra font-bold text-sm text-white">Public Library</div>
              <div className="text-[11px] text-slate-400 mt-0.5">+4 Smarts | -10 Energy</div>
            </div>
          </button>

          <button
            onClick={handleDoctor}
            className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between">
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 font-bold">$150</span>
            </div>
            <div>
              <div className="font-chakra font-bold text-sm text-white">Doctor Checkup</div>
              <div className="text-[11px] text-slate-400 mt-0.5">+30 Health Treatment</div>
            </div>
          </button>

          <button
            onClick={handleNightclub}
            className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between">
              <GlassWater className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-mono text-purple-400 font-bold">$120</span>
            </div>
            <div>
              <div className="font-chakra font-bold text-sm text-white">VIP Nightclub</div>
              <div className="text-[11px] text-slate-400 mt-0.5">+20 Happy | -4 Health | -25 Energy</div>
            </div>
          </button>
        </div>
      </div>

      {/* 3. COST OF LIVING & LIFESTYLE ASSETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Housing */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-chakra font-bold text-sm text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Housing & Residence</span>
            </h3>
            <span className="text-xs font-mono text-amber-400">
              Current: {HOUSING_DATA[stats.housing].name}
            </span>
          </div>

          <div className="space-y-2">
            {(Object.keys(HOUSING_DATA) as HousingTier[]).map((tier) => {
              const h = HOUSING_DATA[tier];
              const isCurrent = stats.housing === tier;
              return (
                <div
                  key={tier}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-cyan-950/30 border-cyan-500/50'
                      : 'bg-slate-800/40 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white font-chakra">{h.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      ${h.monthlyCost}/mo | Max Happy: {h.maxHappinessCap}%
                    </div>
                  </div>
                  {isCurrent ? (
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      Active Home
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (sim.upgradeHousing(tier)) onAction();
                      }}
                      className="text-xs px-3 py-1 rounded-xl bg-slate-700 hover:bg-cyan-600 text-white font-chakra font-bold transition"
                    >
                      Rent (${h.deposit} dep)
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Wardrobe & Professional Style */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-chakra font-bold text-sm text-white flex items-center gap-2">
              <Shirt className="w-4 h-4 text-purple-400" />
              <span>Wardrobe & Prestige</span>
            </h3>
            <span className="text-xs font-mono text-purple-400">
              Current: {WARDROBE_DATA[stats.wardrobe].name}
            </span>
          </div>

          <div className="space-y-2">
            {(Object.keys(WARDROBE_DATA) as WardrobeTier[]).map((tier) => {
              const w = WARDROBE_DATA[tier];
              const isCurrent = stats.wardrobe === tier;
              return (
                <div
                  key={tier}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-purple-950/30 border-purple-500/50'
                      : 'bg-slate-800/40 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white font-chakra">{w.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Buy: ${w.buyCost.toLocaleString()} | Upkeep: ${w.monthlyUpkeep}/mo | Charisma: {w.charismaScore}%
                    </div>
                  </div>
                  {isCurrent ? (
                    <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
                      Equipped
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (sim.buyWardrobe(tier)) onAction();
                      }}
                      className="text-xs px-3 py-1 rounded-xl bg-slate-700 hover:bg-purple-600 text-white font-chakra font-bold transition"
                    >
                      Buy (${w.buyCost.toLocaleString()})
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Diet & Nutrition */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-chakra font-bold text-sm text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-400" />
              <span>Nutrition & Groceries</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              Current: {DIET_DATA[stats.diet].name}
            </span>
          </div>

          <div className="space-y-2">
            {(Object.keys(DIET_DATA) as DietTier[]).map((tier) => {
              const d = DIET_DATA[tier];
              const isCurrent = stats.diet === tier;
              return (
                <div
                  key={tier}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-emerald-950/30 border-emerald-500/50'
                      : 'bg-slate-800/40 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white font-chakra">{d.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      ${d.monthlyCost}/mo | Health Buff: {d.healthBuff > 0 ? `+${d.healthBuff}` : d.healthBuff}/mo
                    </div>
                  </div>
                  {isCurrent ? (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Eating Daily
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        sim.setDiet(tier);
                        onAction();
                      }}
                      className="text-xs px-3 py-1 rounded-xl bg-slate-700 hover:bg-emerald-600 text-white font-chakra font-bold transition"
                    >
                      Switch Plan
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Transportation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-chakra font-bold text-sm text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-400" />
              <span>Vehicles & Commute</span>
            </h3>
            <span className="text-xs font-mono text-blue-400">
              Current: {TRANSIT_DATA[stats.transit].name}
            </span>
          </div>

          <div className="space-y-2">
            {(Object.keys(TRANSIT_DATA) as TransitTier[]).map((tier) => {
              const t = TRANSIT_DATA[tier];
              const isCurrent = stats.transit === tier;
              return (
                <div
                  key={tier}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-blue-950/30 border-blue-500/50'
                      : 'bg-slate-800/40 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white font-chakra">{t.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Buy: ${t.buyCost.toLocaleString()} | Gas & Maint: ${t.monthlyCost}/mo
                    </div>
                  </div>
                  {isCurrent ? (
                    <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
                      Primary Ride
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (sim.buyTransit(tier)) onAction();
                      }}
                      className="text-xs px-3 py-1 rounded-xl bg-slate-700 hover:bg-blue-600 text-white font-chakra font-bold transition"
                    >
                      Acquire (${t.buyCost.toLocaleString()})
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. MONTHLY RECURRING BILLS SUMMARY */}
      <div className="bg-gradient-to-r from-slate-900 via-[#131b2c] to-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="font-chakra font-bold text-base text-white">
              Total Monthly Cost of Living: ${stats.monthlyBills.toLocaleString()}/mo
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Daily burn deducted automatically: ~${sim.life.getDailyLivingCost()}/day
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-400 text-right font-mono">
          Ensure you maintain sufficient cash or earn from gigs to avoid health decay!
        </div>
      </div>
    </div>
  );
};