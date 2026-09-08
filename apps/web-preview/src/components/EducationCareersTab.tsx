import React from 'react';
import {
  EDUCATION_PROGRAMS,
  EducationTier,
  GameSimulation,
  HustleGig
} from '@tycoon/core-simulation';
import {
  GraduationCap,
  Briefcase,
  Lock,
  CheckCircle2,
  Brain,
  Zap,
  Flame,
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';

interface EducationCareersTabProps {
  sim: GameSimulation;
  onOpenChallenge: (gig: HustleGig) => void;
  onOpenExam: (tier: EducationTier) => void;
}

export const EducationCareersTab: React.FC<EducationCareersTabProps> = ({
  sim,
  onOpenChallenge,
  onOpenExam
}) => {
  const currentEdu = sim.life.education;
  const smarts = sim.life.smarts;
  const cash = sim.ledger.getAccountBalance('ASSET:Cash');

  const tierOrder: Record<EducationTier, number> = {
    UNSKILLED: 0,
    BOOTCAMP: 1,
    BACHELOR: 2,
    MASTERS: 3,
    PHD: 4
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. UNIVERSITY & EDUCATION CERTIFICATES */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-chakra font-bold text-base text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Higher Education & Board Certifications</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pay tuition and pass the exit examination quiz to unlock high-paying corporate roles and enterprise contracts!
            </p>
          </div>
          <div className="text-right font-mono text-xs">
            <span className="text-slate-400">Current Degree: </span>
            <strong className="text-cyan-400">{EDUCATION_PROGRAMS[currentEdu].name}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {(Object.keys(EDUCATION_PROGRAMS) as EducationTier[]).map((tier) => {
            const prog = EDUCATION_PROGRAMS[tier];
            const isOwned = tierOrder[currentEdu] >= tierOrder[tier];
            const isNext = tierOrder[tier] === tierOrder[currentEdu] + 1;
            const canAfford = cash >= prog.tuitionCost;
            const hasSmarts = smarts >= prog.minSmarts;

            return (
              <div
                key={tier}
                className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                  isOwned
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : isNext
                    ? 'bg-slate-800/60 border-cyan-500/40'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      Tier {tierOrder[tier]}
                    </span>
                    {isOwned ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Graduated
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {prog.tuitionCost > 0 ? `$${prog.tuitionCost.toLocaleString()} Tuition` : 'Free'}
                      </span>
                    )}
                  </div>
                  <h4 className="font-chakra font-bold text-sm text-white">{prog.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{prog.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Min Smarts: <strong>{prog.minSmarts}%</strong> (You: {smarts}%)
                  </span>

                  {!isOwned && (
                    <button
                      onClick={() => onOpenExam(tier)}
                      disabled={!isNext || !canAfford || !hasSmarts}
                      className={`px-3 py-1.5 rounded-xl font-chakra font-bold text-xs transition flex items-center gap-1.5 ${
                        isNext && canAfford && hasSmarts
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black cursor-pointer hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {!isNext ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </>
                      ) : !hasSmarts ? (
                        <span>Low Smarts</span>
                      ) : !canAfford ? (
                        <span>Need Cash</span>
                      ) : (
                        <>
                          <span>Enroll & Take Exam</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CAREER & FREELANCE GIGS (CHALLENGE QUIZ HUB) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="font-chakra font-bold text-base text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <span>Career Hustles & Client Contracts (Click to Solve & Earn)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Every gig presents an authentic real-world problem. Solve correctly to claim payout + streak multiplier bonus!
            </p>
          </div>
          {sim.life.streakCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-2xl border border-amber-500/30">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>Active Streak: {sim.life.streakCount}x (+{Math.min(100, sim.life.streakCount * 10)}% Cash)</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {sim.availableGigs.map((gig) => {
            const check = sim.canPerformGig(gig);
            const isUnlocked = check.allowed;

            return (
              <div
                key={gig.id}
                className={`p-4 rounded-2xl border transition-all duration-150 flex flex-col justify-between gap-3 ${
                  isUnlocked
                    ? 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-700/60'
                    : 'bg-slate-950/30 border-slate-900 opacity-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {gig.category} - {gig.requiredTier}
                    </span>
                    <div className="font-mono font-bold text-base text-emerald-400">
                      +${gig.rewardUSD.toLocaleString()}
                    </div>
                  </div>
                  <h4 className="font-chakra font-bold text-sm text-white">{gig.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{gig.description}</p>
                </div>

                <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Zap className="w-3.5 h-3.5" /> -{gig.energyCost}
                    </span>
                    <span>+{gig.xpReward} XP</span>
                  </div>

                  <button
                    onClick={() => isUnlocked && onOpenChallenge(gig)}
                    disabled={!isUnlocked}
                    className={`px-4 py-1.5 rounded-xl font-chakra font-bold text-xs transition flex items-center gap-1.5 ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black cursor-pointer hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {!isUnlocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[140px]">{check.reason}</span>
                      </>
                    ) : (
                      <>
                        <span>Solve Challenge</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};