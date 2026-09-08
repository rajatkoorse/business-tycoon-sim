import { MatchingEngine } from './MatchingEngine';

export interface ChatMessage {
  id: string;
  sender: string;
  channel: 'GLOBAL' | 'SYNDICATE' | 'WARFARE' | 'MARKET_DEAL';
  text: string;
  timestamp: number;
}

export interface PlayerProfile {
  playerId: string;
  name: string;
  companyName: string;
  netWorth: number;
  stockTicker: string;
  stockPrice: number;
  rank: number;
  isYou?: boolean;
  avatarEmoji: string;
  sector: string;
}

export class MultiplayerClient {
  public matchingEngine: MatchingEngine;
  public messages: ChatMessage[] = [];
  public rivalTycoons: PlayerProfile[] = [];

  constructor() {
    this.matchingEngine = new MatchingEngine(145.5);
    this.seedRivals();
    this.seedChat();
  }

  private seedRivals() {
    this.rivalTycoons = [
      {
        playerId: 'RIV-01',
        name: 'Vance Sterling',
        companyName: 'Apex Syndicate Holdings',
        netWorth: 2450000000,
        stockTicker: 'APEX',
        stockPrice: 185.2,
        rank: 1,
        avatarEmoji: '🏛️',
        sector: 'Conglomerate'
      },
      {
        playerId: 'RIV-02',
        name: 'Helena Drake',
        companyName: 'Aegis Quantum Systems',
        netWorth: 1840000000,
        stockTicker: 'AEGIS',
        stockPrice: 142.5,
        rank: 2,
        avatarEmoji: '🔬',
        sector: 'Quantum Tech'
      },
      {
        playerId: 'RIV-03',
        name: 'Kaito Kuroda',
        companyName: 'Shinra Neural Network',
        netWorth: 1120000000,
        stockTicker: 'SHIN',
        stockPrice: 98.4,
        rank: 3,
        avatarEmoji: '🤖',
        sector: 'AI Compute'
      },
      {
        playerId: 'RIV-04',
        name: 'Victoria Vance',
        companyName: 'Vance Capital Partners',
        netWorth: 680000000,
        stockTicker: 'VCP',
        stockPrice: 74.1,
        rank: 4,
        avatarEmoji: '📈',
        sector: 'Hedge Fund'
      },
      {
        playerId: 'RIV-05',
        name: 'Darius Thorne',
        companyName: 'Blackrock Foundry & Steel',
        netWorth: 340000000,
        stockTicker: 'THRN',
        stockPrice: 48.0,
        rank: 5,
        avatarEmoji: '🏭',
        sector: 'Manufacturing'
      },
      {
        playerId: 'RIV-06',
        name: 'Sora Takahashi',
        companyName: 'CyberDEX Liquid Yield',
        netWorth: 95000000,
        stockTicker: 'CDEX',
        stockPrice: 32.5,
        rank: 6,
        avatarEmoji: '⚡',
        sector: 'DeFi Crypto'
      },
      {
        playerId: 'RIV-07',
        name: 'Marcus Brody',
        companyName: 'Metropolis Tower REIT',
        netWorth: 45000000,
        stockTicker: 'MREIT',
        stockPrice: 22.0,
        rank: 7,
        avatarEmoji: '🏢',
        sector: 'Real Estate'
      },
      {
        playerId: 'RIV-08',
        name: 'Elena Rostova',
        companyName: 'Nova Media Syndicate',
        netWorth: 18500000,
        stockTicker: 'NOVA',
        stockPrice: 15.4,
        rank: 8,
        avatarEmoji: '📡',
        sector: 'Media'
      },
      {
        playerId: 'RIV-09',
        name: 'Jax Zero Walker',
        companyName: 'Zero-Day Exploit Guild',
        netWorth: 5200000,
        stockTicker: 'ZDAY',
        stockPrice: 8.9,
        rank: 9,
        avatarEmoji: '🛡️',
        sector: 'Cybersecurity'
      },
      {
        playerId: 'RIV-10',
        name: 'Leo Chen',
        companyName: 'Silicon Garage Startup',
        netWorth: 280000,
        stockTicker: 'SILC',
        stockPrice: 3.2,
        rank: 10,
        avatarEmoji: '💻',
        sector: 'Early Tech'
      },
      {
        playerId: 'RIV-11',
        name: 'Maya Lin',
        companyName: 'Lin Accounting & Tax LLC',
        netWorth: 65000,
        stockTicker: 'LTAX',
        stockPrice: 1.5,
        rank: 11,
        avatarEmoji: '📊',
        sector: 'Accounting'
      },
      {
        playerId: 'RIV-12',
        name: 'Rookie Hustler #408',
        companyName: 'Independent Freelancer',
        netWorth: 450,
        stockTicker: 'FREE',
        stockPrice: 0.0,
        rank: 12,
        avatarEmoji: '🚴',
        sector: 'Gig Economy'
      }
    ];
  }

  private seedChat() {
    this.messages = [
      {
        id: 'MSG-01',
        sender: 'SYSTEM',
        channel: 'GLOBAL',
        text: 'Metropolis District #04 Room open. 64 Tycoons connected live.',
        timestamp: Date.now() - 120000
      },
      {
        id: 'MSG-02',
        sender: 'Helena Drake',
        channel: 'GLOBAL',
        text: 'Anyone looking for quantum server supply contracts? 5,000 units/mo ready for delivery.',
        timestamp: Date.now() - 80000
      },
      {
        id: 'MSG-03',
        sender: 'Kaito Kuroda',
        channel: 'WARFARE',
        text: 'Heads up: SEC audits are high this quarter. Keep your cash accounts clean.',
        timestamp: Date.now() - 45000
      },
      {
        id: 'MSG-04',
        sender: 'Victoria Vance',
        channel: 'MARKET_DEAL',
        text: 'Bidding on 100k shares of newly incorporated startups. DM your cap table.',
        timestamp: Date.now() - 15000
      }
    ];
  }

  public getLeaderboard(playerNetWorth: number, playerCompanyName: string, playerTicker: string, playerStockPrice: number): PlayerProfile[] {
    const playerEntry: PlayerProfile = {
      playerId: 'PLAYER_YOU',
      name: 'You (' + playerCompanyName + ')',
      companyName: playerCompanyName,
      netWorth: Math.max(0, playerNetWorth),
      stockTicker: playerTicker,
      stockPrice: playerStockPrice,
      rank: 1,
      isYou: true,
      avatarEmoji: '👑',
      sector: playerNetWorth > 1000000 ? 'Conglomerate' : playerNetWorth > 50000 ? 'Enterprise' : 'Hustler'
    };

    const all = [...this.rivalTycoons, playerEntry].map((t) => {
      if (t.isYou) return t;
      const noise = (Math.random() - 0.499) * 0.002;
      return {
        ...t,
        netWorth: Math.round(t.netWorth * (1 + noise)),
        stockPrice: Number((t.stockPrice * (1 + noise)).toFixed(2))
      };
    });

    all.sort((a, b) => b.netWorth - a.netWorth);

    return all.map((p, idx) => ({
      ...p,
      rank: idx + 1
    }));
  }

  public sendMessage(sender: string, channel: 'GLOBAL' | 'SYNDICATE' | 'WARFARE' | 'MARKET_DEAL', text: string): ChatMessage {
    const msg: ChatMessage = {
      id: 'MSG-' + Math.random().toString(36).substr(2, 7),
      sender,
      channel,
      text,
      timestamp: Date.now()
    };
    this.messages.push(msg);
    if (this.messages.length > 50) this.messages.shift();
    return msg;
  }
}