import {
  CandlestickBar,
  Order,
  OrderSide,
  OrderType,
  TradeExecution
} from '@tycoon/core-simulation';

export interface OrderBookLevel {
  price: number;
  totalQuantity: number;
  orderCount: number;
}

export class MatchingEngine {
  private bids: Order[] = []; // Sorted descending by price, then ascending by timestamp
  private asks: Order[] = []; // Sorted ascending by price, then ascending by timestamp
  private tradeHistory: TradeExecution[] = [];
  private candlesticks: CandlestickBar[] = [];
  private currentCandle: CandlestickBar | null = null;
  public lastPrice: number = 145.5;

  constructor(initialPrice: number = 145.5) {
    this.lastPrice = initialPrice;
    this.seedInitialDepth();
  }

  private seedInitialDepth() {
    // Generate initial realistic market maker depth around lastPrice
    for (let i = 1; i <= 8; i++) {
      const bidPrice = Number((this.lastPrice * (1 - i * 0.005)).toFixed(2));
      const askPrice = Number((this.lastPrice * (1 + i * 0.005)).toFixed(2));

      this.bids.push({
        id: 'MM-BID-' + i,
        corpId: 'MARKET_MAKER_01',
        ticker: 'APEX',
        side: OrderSide.BUY,
        type: OrderType.LIMIT,
        price: bidPrice,
        quantity: 500 * i,
        remainingQuantity: 500 * i,
        timestamp: Date.now() - (1000 - i * 50)
      });

      this.asks.push({
        id: 'MM-ASK-' + i,
        corpId: 'MARKET_MAKER_02',
        ticker: 'APEX',
        side: OrderSide.SELL,
        type: OrderType.LIMIT,
        price: askPrice,
        quantity: 500 * i,
        remainingQuantity: 500 * i,
        timestamp: Date.now() - (1000 - i * 50)
      });
    }

    this.sortBook();
  }

  private sortBook() {
    this.bids.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
    this.asks.sort((a, b) => a.price - b.price || a.timestamp - b.timestamp);
  }

  public getDepth(levels: number = 6): { bids: OrderBookLevel[]; asks: OrderBookLevel[] } {
    const aggregate = (orders: Order[]): OrderBookLevel[] => {
      const map = new Map<number, { qty: number; count: number }>();
      for (const ord of orders) {
        if (ord.remainingQuantity <= 0) continue;
        const entry = map.get(ord.price) || { qty: 0, count: 0 };
        entry.qty += ord.remainingQuantity;
        entry.count += 1;
        map.set(ord.price, entry);
      }
      return Array.from(map.entries())
        .map(([price, val]) => ({
          price,
          totalQuantity: val.qty,
          orderCount: val.count
        }))
        .slice(0, levels);
    };

    return {
      bids: aggregate(this.bids),
      asks: aggregate(this.asks)
    };
  }

  public placeOrder(order: Omit<Order, 'id' | 'remainingQuantity' | 'timestamp'>): {
    orderId: string;
    trades: TradeExecution[];
  } {
    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 7).toUpperCase(),
      remainingQuantity: order.quantity,
      timestamp: Date.now(),
      ...order
    };

    const trades: TradeExecution[] = [];

    if (newOrder.side === OrderSide.BUY) {
      // Match against Asks
      while (this.asks.length > 0 && newOrder.remainingQuantity > 0) {
        const bestAsk = this.asks[0];
        if (newOrder.type === OrderType.LIMIT && newOrder.price < bestAsk.price) {
          break; // No cross
        }

        const matchQty = Math.min(newOrder.remainingQuantity, bestAsk.remainingQuantity);
        const tradePrice = bestAsk.price;

        trades.push({
          buyOrderId: newOrder.id,
          sellOrderId: bestAsk.id,
          buyerCorpId: newOrder.corpId,
          sellerCorpId: bestAsk.corpId,
          ticker: newOrder.ticker,
          price: tradePrice,
          quantity: matchQty,
          timestamp: Date.now()
        });

        newOrder.remainingQuantity -= matchQty;
        bestAsk.remainingQuantity -= matchQty;
        this.lastPrice = tradePrice;
        this.recordCandlestick(tradePrice, matchQty);

        if (bestAsk.remainingQuantity <= 0) {
          this.asks.shift();
        }
      }

      if (newOrder.remainingQuantity > 0 && newOrder.type === OrderType.LIMIT) {
        this.bids.push(newOrder);
      }
    } else {
      // Match against Bids
      while (this.bids.length > 0 && newOrder.remainingQuantity > 0) {
        const bestBid = this.bids[0];
        if (newOrder.type === OrderType.LIMIT && newOrder.price > bestBid.price) {
          break;
        }

        const matchQty = Math.min(newOrder.remainingQuantity, bestBid.remainingQuantity);
        const tradePrice = bestBid.price;

        trades.push({
          buyOrderId: bestBid.id,
          sellOrderId: newOrder.id,
          buyerCorpId: bestBid.corpId,
          sellerCorpId: newOrder.corpId,
          ticker: newOrder.ticker,
          price: tradePrice,
          quantity: matchQty,
          timestamp: Date.now()
        });

        newOrder.remainingQuantity -= matchQty;
        bestBid.remainingQuantity -= matchQty;
        this.lastPrice = tradePrice;
        this.recordCandlestick(tradePrice, matchQty);

        if (bestBid.remainingQuantity <= 0) {
          this.bids.shift();
        }
      }

      if (newOrder.remainingQuantity > 0 && newOrder.type === OrderType.LIMIT) {
        this.asks.push(newOrder);
      }
    }

    this.sortBook();
    this.tradeHistory.push(...trades);
    return { orderId: newOrder.id, trades };
  }

  private recordCandlestick(price: number, volume: number) {
    const now = Math.floor(Date.now() / 1000) * 1000;
    if (!this.currentCandle || now - this.currentCandle.timestamp >= 5000) {
      if (this.currentCandle) {
        this.candlesticks.push(this.currentCandle);
        if (this.candlesticks.length > 60) this.candlesticks.shift();
      }
      this.currentCandle = {
        timestamp: now,
        open: price,
        high: price,
        low: price,
        close: price,
        volume
      };
    } else {
      this.currentCandle.high = Math.max(this.currentCandle.high, price);
      this.currentCandle.low = Math.min(this.currentCandle.low, price);
      this.currentCandle.close = price;
      this.currentCandle.volume += volume;
    }
  }

  public getCandlesticks(): CandlestickBar[] {
    const list = [...this.candlesticks];
    if (this.currentCandle) list.push(this.currentCandle);
    return list;
  }

  public getTradeHistory(): TradeExecution[] {
    return [...this.tradeHistory].slice(-20);
  }
}
