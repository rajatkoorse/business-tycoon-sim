import React, { useEffect, useState } from 'react';
import {
  ChallengeQuestion,
  EducationTier,
  GameSimulation,
  HustleGig,
  OrderSide,
  OrderType,
  StorageManager
} from '@tycoon/core-simulation';
import { MultiplayerClient } from '@tycoon/network-client';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { LifeHubTab } from './components/LifeHubTab';
import { EducationCareersTab } from './components/EducationCareersTab';
import { OperationsTab } from './components/OperationsTab';
import { FinanceTab } from './components/FinanceTab';
import { ExchangeTab } from './components/ExchangeTab';
import { WorkforceTab } from './components/WorkforceTab';
import { WarfareTab } from './components/WarfareTab';
import { MultiplayerTab } from './components/MultiplayerTab';
import { ChallengeModal } from './components/ChallengeModal';
import { IncorporationModal } from './components/IncorporationModal';
import {
  User,
  GraduationCap,
  Building2,
  TrendingUp,
  DollarSign,
  Users,
  ShieldAlert,
  Globe2,
  Terminal,
  Flame,
  Zap
} from 'lucide-react';

export default function App() {
  const [sim] = useState(() => {
    const s = new GameSimulation();
    StorageManager.loadFromLocalStorage(s);
    return s;
  });
  const [multiplayer] = useState(() => new MultiplayerClient());

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('LIFE');
  const [summary, setSummary] = useState(() => sim.getSummary());
  const [eventLogs, setEventLogs] = useState(() => [...sim.eventLog]);
  const [simSpeed, setSimSpeed] = useState<number>(1);

  // Modals
  const [isIncorporationOpen, setIsIncorporationOpen] = useState(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [activeGig, setActiveGig] = useState<HustleGig | null>(null);
  const [activeExamTier, setActiveExamTier] = useState<EducationTier | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<ChallengeQuestion | null>(null);

  // Stock Exchange state
  const [orderSide, setOrderSide] = useState<OrderSide>(OrderSide.BUY);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.LIMIT);
  const [orderPrice, setOrderPrice] = useState<number>(25.0);
  const [orderQty, setOrderQty] = useState<number>(100);
  const [orderBook, setOrderBook] = useState(() => multiplayer.matchingEngine.getDepth(6));
  const [tradeHistory, setTradeHistory] = useState(() => multiplayer.matchingEngine.getTradeHistory());

  // Chat
  const [chatInput, setChatInput] = useState('');
  const [chatChannel, setChatChannel] = useState<'GLOBAL' | 'SYNDICATE' | 'WARFARE'>('GLOBAL');

  // Real-Time 1-Second Tick Loop (Steady, Real-World Pacing)
  useEffect(() => {
    let autoSaveCounter = 0;

    const timer = setInterval(() => {
      sim.stepRealtimeTick();
      setSummary(sim.getSummary());
      setEventLogs([...sim.eventLog]);

      autoSaveCounter += 1;
      if (autoSaveCounter % 10 === 0) {
        StorageManager.saveToLocalStorage(sim);
      }

      // Market simulation (if listed)
      if (sim.isIPOListed && Math.random() < 0.2) {
        const side = Math.random() > 0.5 ? OrderSide.BUY : OrderSide.SELL;
        const delta = (Math.random() - 0.5) * 1.5;
        const price = Number((summary.stockPrice + delta).toFixed(2));
        multiplayer.matchingEngine.placeOrder({
          corpId: 'BOT_TRADER_' + Math.floor(Math.random() * 10),
          ticker: summary.ticker,
          side,
          type: OrderType.LIMIT,
          price,
          quantity: Math.floor(Math.random() * 200 + 50)
        });
        setOrderBook(multiplayer.matchingEngine.getDepth(6));
        setTradeHistory(multiplayer.matchingEngine.getTradeHistory());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [summary.stockPrice]);

  const handleRefresh = () => {
    StorageManager.saveToLocalStorage(sim);
    setSummary(sim.getSummary());
    setEventLogs([...sim.eventLog]);
  };

  const handleManualSave = () => {
    if (StorageManager.saveToLocalStorage(sim)) {
      sim.addLog('Game database saved locally to IndexedDB/LocalStorage!', 'SUCCESS');
      handleRefresh();
    }
  };

  const handleResetGame = () => {
    if (window.confirm('Are you sure you want to reset your career and start a New Game from $25?')) {
      StorageManager.clearSave();
      window.location.reload();
    }
  };

  const handleExportSave = () => {
    const json = StorageManager.exportSaveFile(sim);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Empire_Save_${sim.companyName.replace(/\\s+/g, '_')}_Day${sim.currentDay}.json`;
    a.click();
    URL.revokeObjectURL(url);
    sim.addLog('Game database export downloaded!', 'SUCCESS');
    handleRefresh();
  };

  const handleImportSave = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (re) => {
        const text = re.target?.result as string;
        if (text && StorageManager.importSaveFile(sim, text)) {
          StorageManager.saveToLocalStorage(sim);
          handleRefresh();
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleOpenGigChallenge = (gig: HustleGig) => {
    const q = sim.getQuestionForGig(gig.id);
    setActiveGig(gig);
    setActiveExamTier(null);
    setActiveQuestion(q);
    setIsChallengeOpen(true);
  };

  const handleOpenExam = (tier: EducationTier) => {
    const res = sim.enrollAndTakeExam(tier);
    if (res.question) {
      setActiveGig(null);
      setActiveExamTier(tier);
      setActiveQuestion(res.question);
      setIsChallengeOpen(true);
    } else {
      sim.addLog(res.message, 'WARN');
      handleRefresh();
    }
  };

  const handlePlaceOrder = () => {
    multiplayer.matchingEngine.placeOrder({
      corpId: 'PLAYER_YOU',
      ticker: summary.ticker,
      side: orderSide,
      type: orderType,
      price: orderPrice,
      quantity: orderQty
    });
    setOrderBook(multiplayer.matchingEngine.getDepth(6));
    setTradeHistory(multiplayer.matchingEngine.getTradeHistory());
    sim.addLog(`Order placed: ${orderSide} ${orderQty} ${summary.ticker} @ $${orderPrice}`, 'INFO');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    multiplayer.sendMessage('You (' + summary.companyName + ')', chatChannel, chatInput);
    setChatInput('');
  };

  const playerNetWorth =
    summary.cash +
    (summary.marketCap || 0) +
    sim.cryptoRigs.reduce((s, r) => s + r.cost, 0) +
    sim.aiClusters.reduce((s, a) => s + a.cost, 0) +
    sim.realEstate.reduce((s, b) => s + b.cost, 0);

  const navItems = [
    { id: 'LIFE', label: 'Life & Lifestyle', icon: User, badge: `${summary.life.happiness}% Happy` },
    { id: 'EDUCATION', label: 'Education & Gigs', icon: GraduationCap, badge: summary.life.streakCount > 0 ? `${summary.life.streakCount}x Streak` : undefined },
    { id: 'OPERATIONS', label: 'Operations & Assets', icon: Building2, badge: sim.isIncorporated ? `${sim.cryptoRigs.length + sim.aiClusters.length} Assets` : 'Private' },
    { id: 'EXCHANGE', label: 'Stock Exchange', icon: TrendingUp, badge: sim.isIPOListed ? `$${summary.stockPrice}` : 'Pre-IPO' },
    { id: 'FINANCE', label: 'GAAP Financials', icon: DollarSign, badge: undefined },
    { id: 'WORKFORCE', label: 'Executive Staff', icon: Users, badge: `${sim.workforce.getEmployees().length} Staff` },
    { id: 'WARFARE', label: 'Corporate Warfare', icon: ShieldAlert, badge: `${summary.regulatoryHeat}% Heat` },
    { id: 'MULTIPLAYER', label: 'Metropolis MMO', icon: Globe2, badge: '64 Online' }
  ];

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-y-auto">
      {/* 1. TOP EXECUTIVE TELEMETRY HEADER */}
      <ExecutiveHeader
        summary={summary}
        simSpeed={simSpeed}
        setSimSpeed={setSimSpeed}
        openTab={setActiveTab}
        onSave={handleManualSave}
        onReset={handleResetGame}
        onExport={handleExportSave}
        onImport={handleImportSave}
      />

      {/* 2. MAIN APP LAYOUT */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-3 md:p-6 gap-6">
        {/* Navigation Sidebar (Desktop) / Scrollable Bar (Mobile) */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:w-64 flex-shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl font-chakra font-bold text-sm transition-all duration-150 whitespace-nowrap md:whitespace-normal cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'bg-slate-900/50 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`hidden md:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Logs Feed Box on Sidebar */}
          <div className="hidden md:flex flex-col mt-4 p-4 rounded-3xl bg-slate-900/60 border border-slate-800 flex-1 max-h-[320px] overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-2.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>LIVE WIRE COMM LOGS</span>
            </div>
            <div className="space-y-2 overflow-y-auto pr-1 text-[11px] font-mono leading-relaxed flex-1">
              {eventLogs.slice(0, 15).map((log) => (
                <div
                  key={log.id}
                  className={`p-2 rounded-xl border transition ${
                    log.type === 'SUCCESS'
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                      : log.type === 'WARN'
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                      : log.type === 'DANGER'
                      ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                      : 'bg-slate-800/30 border-slate-800 text-slate-300'
                  }`}
                >
                  {log.text}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* 3. ACTIVE TAB MAIN WORKSPACE VIEW */}
        <main className="flex-1 min-w-0">
          {activeTab === 'LIFE' && (
            <LifeHubTab sim={sim} onAction={handleRefresh} />
          )}

          {activeTab === 'EDUCATION' && (
            <EducationCareersTab
              sim={sim}
              onOpenChallenge={handleOpenGigChallenge}
              onOpenExam={handleOpenExam}
            />
          )}

          {activeTab === 'OPERATIONS' && (
            <OperationsTab
              sim={sim}
              onOpenIncorporation={() => setIsIncorporationOpen(true)}
              onRefresh={handleRefresh}
            />
          )}

          {activeTab === 'EXCHANGE' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              {sim.isIPOListed ? (
                <ExchangeTab
                  sim={sim}
                  multiplayer={multiplayer}
                  summary={summary}
                  orderSide={orderSide}
                  setOrderSide={setOrderSide}
                  orderType={orderType}
                  setOrderType={setOrderType}
                  orderPrice={orderPrice}
                  setOrderPrice={setOrderPrice}
                  orderQty={orderQty}
                  setOrderQty={setOrderQty}
                  orderBook={orderBook}
                  tradeHistory={tradeHistory}
                  handlePlaceOrder={handlePlaceOrder}
                />
              ) : (
                <div className="text-center py-16 space-y-4">
                  <TrendingUp className="w-14 h-14 text-amber-400 mx-auto" />
                  <h3 className="font-chakra font-bold text-xl text-white">
                    Metropolis Stock Exchange (Wall Street LOB)
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    "{summary.companyName}" is currently a private company. Scale your corporate capital to $100,000 and file your Wall Street IPO to begin public secondary trading!
                  </p>
                  {summary.cash >= 100000 && sim.isIncorporated && (
                    <button
                      onClick={() => {
                        sim.fileIPO();
                        handleRefresh();
                      }}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-chakra font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
                    >
                      File Wall Street IPO ($100k)
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'FINANCE' && (
            <FinanceTab sim={sim} summary={summary} />
          )}

          {activeTab === 'WORKFORCE' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              {sim.isIncorporated ? (
                <WorkforceTab sim={sim} />
              ) : (
                <div className="text-center py-16 space-y-4">
                  <Users className="w-14 h-14 text-cyan-400 mx-auto" />
                  <h3 className="font-chakra font-bold text-xl text-white">
                    Incorporation Required to Hire Workforce
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    You must register your business LLC ($2,500) before you can hire engineers, quants, and C-Suite officers!
                  </p>
                  {summary.cash >= 2500 && (
                    <button
                      onClick={() => setIsIncorporationOpen(true)}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-chakra font-bold text-sm cursor-pointer"
                    >
                      Incorporate Official LLC ($2,500)
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'WARFARE' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <WarfareTab sim={sim} summary={summary} />
            </div>
          )}

          {activeTab === 'MULTIPLAYER' && (
            <MultiplayerTab
              multiplayer={multiplayer}
              playerNetWorth={playerNetWorth}
              playerCompanyName={summary.companyName}
              playerTicker={summary.ticker}
              playerStockPrice={summary.stockPrice}
              chatInput={chatInput}
              setChatInput={setChatInput}
              chatChannel={chatChannel}
              handleSendChat={handleSendChat}
            />
          )}
        </main>
      </div>

      {/* 4. INTELLECTUAL CHALLENGE / EXAM MODAL */}
      <ChallengeModal
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
        gig={activeGig}
        examTier={activeExamTier}
        question={activeQuestion}
        sim={sim}
        onCompleted={handleRefresh}
      />

      {/* 5. INCORPORATION MODAL */}
      <IncorporationModal
        isOpen={isIncorporationOpen}
        onClose={() => setIsIncorporationOpen(false)}
        sim={sim}
        onIncorporated={handleRefresh}
      />
    </div>
  );
}