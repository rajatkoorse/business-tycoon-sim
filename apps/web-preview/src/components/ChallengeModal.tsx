import React, { useState } from 'react';
import { ChallengeQuestion, GameSimulation, HustleGig } from '@tycoon/core-simulation';
import {
  Brain,
  CheckCircle2,
  XCircle,
  Zap,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  gig?: HustleGig | null;
  examTier?: string | null;
  question: ChallengeQuestion | null;
  sim: GameSimulation;
  onCompleted: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  gig,
  examTier,
  question,
  sim,
  onCompleted
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [result, setResult] = useState<{
    isCorrect: boolean;
    earnedUSD: number;
    earnedXP: number;
    message: string;
  } | null>(null);

  if (!isOpen || !question) return null;

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null || hasSubmitted) return;
    setHasSubmitted(true);

    if (gig) {
      const res = sim.submitGigChallenge(gig.id, question.id, selectedIdx);
      setResult({
        isCorrect: res.isCorrect,
        earnedUSD: res.earnedUSD,
        earnedXP: res.earnedXP,
        message: res.message
      });
    } else if (examTier) {
      const res = sim.enrollAndTakeExam(examTier as any, selectedIdx, question.id);
      setResult({
        isCorrect: !!res.passed,
        earnedUSD: 0,
        earnedXP: res.passed ? 500 : 0,
        message: res.message
      });
    }

    onCompleted();
  };

  const handleFinish = () => {
    setSelectedIdx(null);
    setHasSubmitted(false);
    setResult(null);
    onClose();
  };

  const streak = sim.life.streakCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0d131f] border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d16]/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  {question.category} - {question.tier}
                </span>
                {streak > 1 && (
                  <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    {streak}x Streak (+{Math.min(100, streak * 10)}% Cash)
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-white font-chakra mt-0.5">
                {gig ? gig.name : `Comprehensive Exam: ${question.topic}`}
              </h2>
            </div>
          </div>

          {gig && (
            <div className="text-right font-mono">
              <div className="text-emerald-400 font-bold text-base">
                +${gig.rewardUSD.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">
                +{gig.xpReward} XP | -{gig.energyCost} Energy
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>TOPIC: <strong className="text-slate-200">{question.topic}</strong></span>
          </div>

          <div className="text-base font-medium text-slate-100 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {question.question}
          </div>

          {question.codeSnippet && (
            <pre className="p-4 rounded-xl bg-black/70 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto">
              <code>{question.codeSnippet}</code>
            </pre>
          )}

          <div className="space-y-2.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrectAnswer = idx === question.correctIndex;

              let btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:bg-cyan-950/20';

              if (hasSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-50';
                }
              } else if (isSelected) {
                btnStyle = 'bg-cyan-950/50 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3.5 ${btnStyle}`}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-current/40 flex items-center justify-center font-mono text-xs font-bold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="text-sm flex-1 leading-snug">{option}</div>
                  {hasSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {hasSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {hasSubmitted && result && (
            <div
              className={`p-4 rounded-2xl border ${
                result.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2 font-chakra font-bold text-sm mb-1">
                {result.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CORRECT! +${result.earnedUSD.toLocaleString()} (+${result.earnedXP} XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>INCORRECT! Streak Reset</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                <strong className="text-white">Explanation: </strong>
                {question.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#080d16] flex items-center justify-between">
          <button
            onClick={hasSubmitted ? handleFinish : onClose}
            className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition"
          >
            {hasSubmitted ? 'Dismiss' : 'Cancel (Keep Energy)'}
          </button>

          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIdx === null}
              className={`px-6 py-2.5 rounded-xl font-chakra font-bold text-sm transition-all flex items-center gap-2 ${
                selectedIdx !== null
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Submit Answer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-chakra font-bold text-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition cursor-pointer"
            >
              Continue Playing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};