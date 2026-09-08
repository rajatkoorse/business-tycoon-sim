import React from 'react';
import { GameSimulation, OrderSide, OrderType, SimulationSummary } from '@tycoon/core-simulation';
import { MultiplayerClient } from '@tycoon/network-client';
import { AlertTriangle } from 'lucide-react';

interface ExchangeTabProps {
  sim: GameSimulation;
  multiplayer: MultiplayerClient;
  summary: SimulationSummary;
  orderSide: OrderSide;
  setOrderSide: (side: OrderSide) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  orderPrice: number;
  setOrderPrice: (price: number) => void;
  orderQty: number;
  setOrderQty: (qty: number) => void;
  orderBook: ReturnType<MultiplayerClient['matchingEngine']['getDepth']>;
  tradeHistory: ReturnType<MultiplayerClient['matchingEngine']['getTradeHistory']>;
  handlePlaceOrder: () => void;
}

export const ExchangeTab: React.FC<ExchangeTabProps> = ({
  sim,
  summary,
  orderSide,
  setOrderSide,
  orderType,
  setOrderType,
  orderPrice,
  setOrderPrice,
  orderQty,
  setOrderQty,
  orderBook,
  tradeHistory,
  handlePlaceOrder
}) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        {/* Candlestick / Price Chart */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-cyber font-bold text-lg text-white">APEX / USD</span>
              <span className="text-emerald-400 font-mono font-bold text-xl">
                ${summary.stockPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Tick Rate: 20 Hz • Sub-ms Matching
            </div>
          </div>

          <div className="h-48 bg-slate-950/80 rounded-xl border border-slate-800 flex items-end p-4 space-x-2 overflow-hidden">
            {tradeHistory.slice(-20).map((t, idx) => {
              const height = Math.min(100, Math.max(20, (t.price - 130) * 4));
              return (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-emerald-500/40 to-emerald-400 rounded-t transition-all duration-300 relative group"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 px-2 py-1 rounded text-[10px] font-mono text-white pointer-events-none z-30">
                    ${t.price.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Limit Order Book Depth */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="font-cyber font-bold text-white text-sm flex items-center justify-between">
            <span>Live Limit Order Book (LOB) Depth</span>
            <span className="text-xs font-mono text-slate-400">Price-Time FIFO</span>
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            {/* Bids */}
            <div className="space-y-1.5">
              <div className="text-emerald-400 font-bold uppercase text-[10px] flex justify-between border-b border-emerald-500/20 pb-1">
                <span>Bid Price ($)</span>
                <span>Quantity</span>
              </div>
              {orderBook.bids.map((b, i) => (
                <div
                  key={i}
                  className="flex justify-between p-1.5 rounded bg-emerald-500/5 hover:bg-emerald-500/10 transition"
                >
                  <span className="text-emerald-400 font-semibold">${b.price.toFixed(2)}</span>
                  <span className="text-slate-300">{b.totalQuantity.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Asks */}
            <div className="space-y-1.5">
              <div className="text-rose-400 font-bold uppercase text-[10px] flex justify-between border-b border-rose-500/20 pb-1">
                <span>Ask Price ($)</span>
                <span>Quantity</span>
              </div>
              {orderBook.asks.map((a, i) => (
                <div
                  key={i}
                  className="flex justify-between p-1.5 rounded bg-rose-500/5 hover:bg-rose-500/10 transition"
                >
                  <span className="text-rose-400 font-semibold">${a.price.toFixed(2)}</span>
                  <span className="text-slate-300">{a.totalQuantity.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Entry Terminal */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <h3 className="font-cyber font-bold text-white text-base border-b border-slate-800 pb-2">
          Order Submission Terminal
        </h3>

        <div className="flex rounded-lg overflow-hidden border border-slate-700">
          <button
            onClick={() => setOrderSide(OrderSide.BUY)}
            className={`flex-1 py-2 text-xs font-mono font-bold transition ${
              orderSide === OrderSide.BUY
                ? 'bg-emerald-500 text-black'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            BUY
          </button>
          <button
            onClick={() => setOrderSide(OrderSide.SELL)}
            className={`flex-1 py-2 text-xs font-mono font-bold transition ${
              orderSide === OrderSide.SELL
                ? 'bg-rose-500 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            SELL / SHORT
          </button>
        </div>

        <div className="space-y-3 text-xs font-mono">
          <div>
            <label className="text-slate-400 block mb-1">Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value as OrderType)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
            >
              <option value={OrderType.LIMIT}>Limit Order</option>
              <option value={OrderType.MARKET}>Market Order</option>
              <option value={OrderType.SHORT}>Short Sell (Margin)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Limit Price ($)</label>
            <input
              type="number"
              step="0.1"
              value={orderPrice}
              onChange={(e) => setOrderPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Quantity (Shares)</label>
            <input
              type="number"
              step="10"
              value={orderQty}
              onChange={(e) => setOrderQty(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
            />
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Total Order Value:</span>
              <span className="text-white font-bold">${(orderPrice * orderQty).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Est. Commission:</span>
              <span className="text-white font-bold">$15.00</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className={`w-full py-3 rounded-xl font-cyber font-bold tracking-wider text-sm shadow-lg transition ${
              orderSide === OrderSide.BUY
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
            }`}
          >
            {orderSide} {orderQty} APEX
          </button>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <button
            onClick={() =>
              sim.warfare.initiateHostileTakeover('APEX', 'AEGIS', 112.0)
            }
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-mono text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Launch Hostile Takeover ($150M)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
