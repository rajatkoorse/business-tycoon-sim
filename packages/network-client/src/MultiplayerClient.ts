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
}

export class MultiplayerClient {
  public matchingEngine: MatchingEngine;
  public messages: ChatMessage[] = [];
  public activePlayers: PlayerProfile[] = [];

  constructor() {
    this.matchingEngine = new MatchingEngine(145.5);
    this.seedLeaderboard();
    this.seedChat();
  }

  private seedLeaderboard() {
    this.activePlayers = [
      {
        playerId: 'PLY-01',
        name: 'Vance Sterling (You)',
        companyName: 'Apex Syndicate Group',
        netWorth: 1455000000,
        stockTicker: 'APEX',
        stockPrice: 145.5,
        rank: 1
      },
      {
        playerId: 'PLY-02',
        name: 'Helena Drake',
        companyName: 'Aegis Quantum Holdings',
        netWorth: 1240000000,
        stockTicker: 'AEGIS',
        stockPrice: 112.0,
        rank: 2
      },
      {
        playerId: 'PLY-03',
        name: 'Kaito Kuroda',
        companyName: 'Shinra Neural Network',
        netWorth: 980000000,
        stockTicker: 'SHIN',
        stockPrice: 88.4,
        rank: 3
      },
      {
        playerId: 'PLY-04',
        name: 'Vladimir Volkov',
        companyName: 'Titan Petro & Smelting',
        netWorth: 750000000,
        stockTicker: 'TITN',
        stockPrice: 64.2,
        rank: 4
      }
    ];
  }

  private seedChat() {
    this.messages = [
      {
        id: 'MSG-01',
        sender: 'SYSTEM',
        channel: 'GLOBAL',
        text: 'Metropolis District #04 Room open. 64 Tycoons connected.',
        timestamp: Date.now() - 60000
      },
      {
        id: 'MSG-02',
        sender: 'Helena Drake',
        channel: 'GLOBAL',
        text: 'Anyone looking for quantum server supply contracts? 5,000 units/mo ready for delivery.',
        timestamp: Date.now() - 40000
      },
      {
        id: 'MSG-03',
        sender: 'Kaito Kuroda',
        channel: 'WARFARE',
        text: 'Heads up: SEC audits are high this quarter. Clean your accounts.',
        timestamp: Date.now() - 20000
      }
    ];
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
