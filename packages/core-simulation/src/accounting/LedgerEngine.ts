import {
  BalanceSheet,
  CashFlowStatement,
  DebtTranche,
  IncomeStatement,
  JournalEntry
} from '../types';

export class LedgerEngine {
  private journal: JournalEntry[] = [];
  private accounts: Map<string, number> = new Map();
  private accumulatedNOL: number = 0;

  constructor(initialCash: number = 25) {
    this.accounts.set('ASSET:Cash', initialCash);
    this.accounts.set('EQUITY:CommonStock', initialCash);
  }

  public recordTransaction(entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry {
    const totalDebits = entry.debits.reduce((sum, d) => sum + d.amount, 0);
    const totalCredits = entry.credits.reduce((sum, c) => sum + c.amount, 0);

    if (Math.abs(totalDebits - totalCredits) > 0.001) {
      throw new Error(
        `Double-entry imbalance in "${entry.description}": Debits ($${totalDebits}) != Credits ($${totalCredits})`
      );
    }

    const journalEntry: JournalEntry = {
      id: 'TX-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: Date.now(),
      ...entry
    };

    for (const d of entry.debits) {
      const current = this.accounts.get(d.account) || 0;
      this.accounts.set(d.account, current + d.amount);
    }

    for (const c of entry.credits) {
      const current = this.accounts.get(c.account) || 0;
      this.accounts.set(c.account, current - c.amount);
    }

    this.journal.push(journalEntry);
    if (this.journal.length > 100) this.journal.shift();
    return journalEntry;
  }

  public getAccountBalance(account: string): number {
    return this.accounts.get(account) || 0;
  }

  public getJournalEntries(): JournalEntry[] {
    return [...this.journal].reverse();
  }

  public generateBalanceSheet(
    marketableSecuritiesVal: number = 0,
    receivablesVal: number = 0,
    inventoryVal: number = 0,
    ppeGrossVal: number = 0,
    accumulatedDeprVal: number = 0,
    intangiblesVal: number = 0,
    payablesVal: number = 0,
    shortTermDebtVal: number = 0,
    longTermDebtVal: number = 0,
    commonStockVal: number = 25,
    retainedEarningsVal: number = 0
  ): BalanceSheet {
    const cash = Math.max(0, this.getAccountBalance('ASSET:Cash'));
    const ppeNet = Math.max(0, ppeGrossVal - accumulatedDeprVal);
    const totalAssets =
      cash +
      marketableSecuritiesVal +
      receivablesVal +
      inventoryVal +
      ppeNet +
      intangiblesVal;

    const totalLiabilities = payablesVal + shortTermDebtVal + longTermDebtVal;
    const calculatedRetainedEarnings = totalAssets - totalLiabilities - commonStockVal;

    return {
      cash,
      marketableSecurities: marketableSecuritiesVal,
      accountsReceivable: receivablesVal,
      allowanceDoubtfulAccounts: receivablesVal * 0.05,
      inventory: inventoryVal,
      ppeGross: ppeGrossVal,
      accumulatedDepreciation: accumulatedDeprVal,
      ppeNet,
      intangiblesAndPatents: intangiblesVal,
      totalAssets,

      accountsPayable: payablesVal,
      shortTermDebt: shortTermDebtVal,
      longTermDebt: longTermDebtVal,
      totalLiabilities,

      commonStock: commonStockVal,
      retainedEarnings: calculatedRetainedEarnings,
      treasuryStock: 0,
      totalEquity: commonStockVal + calculatedRetainedEarnings
    };
  }

  public generateIncomeStatement(
    grossRevenue: number,
    cogs: number,
    smExpense: number,
    rdExpense: number,
    gaExpense: number,
    deprecExpense: number = 0,
    interestExpense: number = 0,
    taxRate: number = 0.21
  ): IncomeStatement {
    const grossProfit = grossRevenue - cogs;
    const operatingExpenses = smExpense + rdExpense + gaExpense;
    const ebitda = grossProfit - operatingExpenses;
    const ebit = ebitda - deprecExpense;
    const ebt = ebit - interestExpense;

    let taxExpense = 0;
    if (ebt > 0) {
      if (this.accumulatedNOL > 0) {
        const taxableShield = Math.min(this.accumulatedNOL, ebt * 0.8);
        taxExpense = Math.max(0, (ebt - taxableShield) * taxRate);
        this.accumulatedNOL -= taxableShield;
      } else {
        taxExpense = ebt * taxRate;
      }
    } else {
      this.accumulatedNOL += Math.abs(ebt);
    }

    const netIncome = ebt - taxExpense;

    return {
      grossRevenue,
      cogs,
      grossProfit,
      salesAndMarketing: smExpense,
      researchAndDevelopment: rdExpense,
      generalAndAdmin: gaExpense,
      operatingExpenses,
      ebitda,
      depreciationAndAmortization: deprecExpense,
      ebit,
      interestExpense,
      interestIncome: 0,
      ebt,
      taxExpense,
      netIncome
    };
  }

  public generateCashFlowStatement(
    netIncome: number,
    depreciation: number,
    changeInWorkingCapital: number,
    capex: number,
    debtIssuanceNet: number,
    equityIssuanceNet: number,
    dividends: number
  ): CashFlowStatement {
    const cashFromOperations = netIncome + depreciation - changeInWorkingCapital;
    const cashFromInvesting = -capex;
    const cashFromFinancing = debtIssuanceNet + equityIssuanceNet - dividends;
    const netCashFlow = cashFromOperations + cashFromInvesting + cashFromFinancing;

    return {
      netIncome,
      depreciation,
      changeInWorkingCapital,
      cashFromOperations,
      capitalExpenditures: capex,
      acquisitionsAndInvestments: 0,
      cashFromInvesting,
      debtIssuedOrRepaid: debtIssuanceNet,
      equityIssuedOrBoughtBack: equityIssuanceNet,
      dividendsPaid: dividends,
      cashFromFinancing,
      netCashFlow
    };
  }

  public calculateAltmanZScore(
    cash: number,
    retainedEarnings: number,
    ebit: number,
    marketCap: number,
    revenue: number,
    totalAssets: number,
    totalLiabilities: number
  ): { zScore: number; distressRating: 'SAFE' | 'GREY' | 'DISTRESS' } {
    if (totalAssets <= 0) return { zScore: 3.5, distressRating: 'SAFE' };

    const workingCapital = Math.max(0, cash - (totalLiabilities * 0.2));
    const x1 = workingCapital / totalAssets;
    const x2 = retainedEarnings / totalAssets;
    const x3 = ebit / totalAssets;
    const x4 = marketCap / Math.max(1, totalLiabilities);
    const x5 = revenue / totalAssets;

    const z = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 0.999 * x5;

    let distressRating: 'SAFE' | 'GREY' | 'DISTRESS' = 'SAFE';
    if (z < 1.81) distressRating = 'DISTRESS';
    else if (z < 2.99) distressRating = 'GREY';

    return { zScore: z, distressRating };
  }
}