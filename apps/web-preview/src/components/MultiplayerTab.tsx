import React from 'react';
import { MultiplayerClient } from '@tycoon/network-client';

interface MultiplayerTabProps {
  multiplayer: MultiplayerClient;
  chatInput: string;
  setChatInput: (input: string) => void;
  chatChannel: 'GLOBAL' | 'SYNDICATE' | 'WARFARE';
  handleSendChat: (e: React.FormEvent) => void;
}

export const MultiplayerTab: React.FC<MultiplayerTabProps> = ({
  multiplayer,
  chatInput,
  setChatInput,
  handleSendChat
}) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
      {/* Leaderboard */}
      <div className="col-span-2 glass-panel p-5 rounded-2xl space-y-4">
        <h3 className="font-cyber font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>Metropolis Global Tycoon Leaderboard</span>
          <span className="text-xs font-mono text-emerald-400">64 Active Tycoons</span>
        </h3>

        <div className="space-y-2">
          {multiplayer.activePlayers.map((player) => (
            <div
              key={player.playerId}
              className={`p-3.5 rounded-xl border transition flex items-center justify-between ${
                player.playerId === 'PLY-01'
                  ? 'bg-[#d4af37]/10 border-[#d4af37]/50 shadow-lg shadow-[#d4af37]/10'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-cyber font-bold text-[#d4af37]">
                  #{player.rank}
                </div>
                <div>
                  <div className="font-cyber font-bold text-white text-sm">{player.name}</div>
                  <div className="text-xs text-slate-400 font-mono">
                    {player.companyName} (${player.stockTicker})
                  </div>
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-emerald-400 font-bold text-sm">
                  ${(player.netWorth / 1e6).toFixed(1)}M Net Worth
                </div>
                <div className="text-xs text-slate-400">
                  Share: ${player.stockPrice.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comms Hub */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col h-[520px]">
        <h3 className="font-cyber font-bold text-white text-sm border-b border-slate-800 pb-2 mb-3">
          Metropolis Comms Hub
        </h3>

        <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
          {multiplayer.messages.map((msg) => (
            <div key={msg.id} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                <span className="font-bold text-[#00f3ff]">{msg.sender}</span>
                <span className="px-1 rounded bg-slate-800">{msg.channel}</span>
              </div>
              <p className="text-slate-200">{msg.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendChat} className="mt-3 pt-2 border-t border-slate-800 flex space-x-2">
          <input
            type="text"
            placeholder="Broadcast to city..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-[#00f3ff] text-black font-mono text-xs font-bold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
