import React, { useState } from 'react';
import { MultiplayerClient, PlayerProfile } from '@tycoon/network-client';
import {
  Globe2,
  Trophy,
  MessageSquare,
  TrendingUp,
  Flame,
  Send,
  Users,
  Award,
  Bot,
  UserCheck,
  Share2,
  KeyRound
} from 'lucide-react';

interface MultiplayerTabProps {
  multiplayer: MultiplayerClient;
  playerNetWorth: number;
  playerCompanyName: string;
  playerTicker: string;
  playerStockPrice: number;
  chatInput: string;
  setChatInput: (input: string) => void;
  chatChannel: 'GLOBAL' | 'SYNDICATE' | 'WARFARE';
  handleSendChat: (e: React.FormEvent) => void;
}

export const MultiplayerTab: React.FC<MultiplayerTabProps> = ({
  multiplayer,
  playerNetWorth,
  playerCompanyName,
  playerTicker,
  playerStockPrice,
  chatInput,
  setChatInput,
  handleSendChat
}) => {
  const [mobileSubTab, setMobileSubTab] = useState<'LEADERBOARD' | 'CHAT'>('LEADERBOARD');
  const [roomCode, setRoomCode] = useState('METRO-04');
  const [isCopied, setIsCopied] = useState(false);

  const leaderboard: PlayerProfile[] = multiplayer.getLeaderboard(
    playerNetWorth,
    playerCompanyName,
    playerTicker,
    playerStockPrice
  );

  const yourRank = leaderboard.find((p) => p.isYou)?.rank || 12;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-12">
      {/* 1. ROOM STATUS & EXPLANATION BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 border border-slate-800 rounded-3xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex-shrink-0">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-chakra font-bold text-base text-white">
                Metropolis MMO District #04
              </h3>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                1 Real Player (You)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              You are currently competing in solo mode against <strong>12 AI Incumbent Megacorps & Hedge Funds</strong>. Scale your enterprise to conquer the #1 Forbes ranking!
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyLink}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-chakra font-bold transition flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isCopied ? 'Link Copied!' : 'Invite Friends (Share Link)'}</span>
        </button>
      </div>

      {/* 2. MOBILE SUB-TAB SWITCHER */}
      <div className="flex md:hidden bg-slate-900/80 border border-slate-800 rounded-2xl p-1 gap-1">
        <button
          onClick={() => setMobileSubTab('LEADERBOARD')}
          className={`flex-1 py-2 rounded-xl text-xs font-chakra font-bold flex items-center justify-center gap-1.5 transition ${
            mobileSubTab === 'LEADERBOARD'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Leaderboard (Rank #{yourRank})</span>
        </button>
        <button
          onClick={() => setMobileSubTab('CHAT')}
          className={`flex-1 py-2 rounded-xl text-xs font-chakra font-bold flex items-center justify-center gap-1.5 transition ${
            mobileSubTab === 'CHAT'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Market Wire ({multiplayer.messages.length})</span>
        </button>
      </div>

      {/* 3. MAIN COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEADERBOARD COLUMN */}
        <div
          className={`lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-4 md:p-5 space-y-4 ${
            mobileSubTab === 'CHAT' ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-chakra font-bold text-base text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Market Rivals & Forbes Rankings</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time valuation rankings across all active metropolis enterprises.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Your Rank: #{yourRank}
            </span>
          </div>

          <div className="space-y-2">
            {leaderboard.map((player) => {
              const isYou = !!player.isYou;

              let rankBadge = `${player.rank}`;
              let rankStyle = 'bg-slate-800 text-slate-300';
              if (player.rank === 1) {
                rankStyle = 'bg-amber-500 text-black font-bold';
              } else if (player.rank === 2) {
                rankStyle = 'bg-slate-300 text-black font-bold';
              } else if (player.rank === 3) {
                rankStyle = 'bg-amber-700 text-amber-100 font-bold';
              }

              return (
                <div
                  key={player.playerId}
                  className={`p-3 md:p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2 ${
                    isYou
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-xl flex items-center justify-center font-chakra font-bold text-xs flex-shrink-0 ${rankStyle}`}
                    >
                      #{rankBadge}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm md:text-base">{player.avatarEmoji}</span>
                        <span
                          className={`font-chakra font-bold text-xs md:text-sm truncate ${
                            isYou ? 'text-cyan-300' : 'text-white'
                          }`}
                        >
                          {player.name}
                        </span>
                        {isYou ? (
                          <span className="text-[9px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.2 rounded border border-cyan-500/40 flex-shrink-0 flex items-center gap-0.5">
                            <UserCheck className="w-2.5 h-2.5" /> YOU (HUMAN)
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-700 flex-shrink-0 flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5 text-purple-400" /> AI RIVAL
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">
                        {player.companyName} (${player.stockTicker}) • {player.sector}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono flex-shrink-0">
                    <div className="text-emerald-400 font-bold text-xs md:text-sm">
                      ${player.netWorth >= 1e9
                        ? (player.netWorth / 1e9).toFixed(2) + 'B'
                        : player.netWorth >= 1e6
                        ? (player.netWorth / 1e6).toFixed(2) + 'M'
                        : player.netWorth.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {player.stockPrice > 0 ? `$${player.stockPrice.toFixed(2)} / share` : 'Private'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMMS HUB COLUMN */}
        <div
          className={`bg-slate-900/80 border border-slate-800 rounded-3xl p-4 md:p-5 flex flex-col h-[520px] ${
            mobileSubTab === 'LEADERBOARD' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <h3 className="font-chakra font-bold text-sm text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Metropolis Market Wire</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Wire
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-mono text-xs">
            {multiplayer.messages.map((msg) => (
              <div
                key={msg.id}
                className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800/80 space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-bold text-cyan-400">{msg.sender}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 text-[9px]">
                    {msg.channel}
                  </span>
                </div>
                <p className="text-slate-200 text-xs leading-snug">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="mt-3 pt-2.5 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Broadcast to city wire..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-chakra font-bold text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition cursor-pointer flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};