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
  private accumulatedNOL: number = 0; // Net Operating Loss tax shield carryforward

  constructor(initialCash: number = 250000) {
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

    // Apply Debits (Assets & Expenses increase with Debit; Liabilities, Equity & Revenue decrease)
    for (const d of entry.debits) {
      const current = this.accounts.get(d.account) || 0;
      this.accounts.set(d.account, current + d.amount);
    }

    // Apply Credits (Assets & Expenses decrease with Credit; Liabilities, Equity & Revenue increase)
    for (const c of entry.credits) {
      const current = this.accounts.get(c.account) || 0;
      this.accounts.set(c.account, current - c.amount);
    }

    this.journal.push(journalEntry);
    return journalEntry;
  }

  public getAccountBalance(account: string): number {
    return this.accounts.get(account) || 0;
  }

  public generateBalanceSheet(
    marketableSecuritiesVal: number = 0,
    receivablesVal: number = 0,
    inventoryVal: number = 0,
    ppeGrossVal: number = 500000,
    accumulatedDeprVal: number = 50000,
    intangiblesVal: number = 100000,
    payablesVal: number = 15000,
    shortTermDebtVal: number = 50000,
    longTermDebtVal: number = 200000,
    commonStockVal: number = 250000,
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
    
    // Balanced equity calculation
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
    depreciation: number,
    interestExpense: number,
    interestIncome: number,
    taxRate: number = 0.21
  ): IncomeStatement {
    const grossProfit = grossRevenue - cogs;
    const operatingExpenses = smExpense + rdExpense + gaExpense;
    const ebitda = grossProfit - operatingExpenses;
    const ebit = ebitda - depreciation;
    const netInterest = interestExpense - interestIncome;
    const ebt = ebit - netInterest;

    let taxExpense = 0;
    if (ebt > 0) {
      const taxableAfterNOL = Math.max(0, ebt - this.accumulatedNOL);
      this.accumulatedNOL = Math.max(0, this.accumulatedNOL - ebt);
      taxExpense = taxableAfterNOL * taxRate;
    } else {
      // Accumulate loss as tax shield carryforward
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
      depreciationAndAmortization: depreciation,
      ebit,
      interestExpense,
      interestIncome,
      ebt,
      taxExpense,
      netIncome
    };
  }

  public generateCashFlowStatement(
    income: IncomeStatement,
    changeInNWC: number,
    capEx: number,
    investments: number,
    debtDelta: number,
    equityDelta: number,
    dividendsPaid: number
  ): CashFlowStatement {
    const cashFromOperations = income.netIncome + income.depreciationAndAmortization - changeInNWC;
    const cashFromInvesting = -capEx - investments;
    const cashFromFinancing = debtDelta + equityDelta - dividendsPaid;
    const netCashFlow = cashFromOperations + cashFromInvesting + cashFromFinancing;

    return {
      netIncome: income.netIncome,
      depreciation: income.depreciationAndAmortization,
      changeInWorkingCapital: changeInNWC,
      cashFromOperations,
      capitalExpenditures: capEx,
      acquisitionsAndInvestments: investments,
      cashFromInvesting,
      debtIssuedOrRepaid: debtDelta,
      equityIssuedOrBoughtBack: equityDelta,
      dividendsPaid,
      cashFromFinancing,
      netCashFlow
    };
  }

  public calculateAltmanZScore(
    workingCapital: number,
    retainedEarnings: number,
    ebit: number,
    marketValueOfEquity: number,
    sales: number,
    totalAssets: number,
    totalLiabilities: number
  ): { zScore: number; distressRating: 'SAFE' | 'GREY' | 'DISTRESS' } {
    if (totalAssets <= 0 || totalLiabilities <= 0) {
      return { zScore: 3.5, distressRating: 'SAFE' };
    }

    const x1 = workingCapital / totalAssets;
    const x2 = retainedEarnings / totalAssets;
    const x3 = ebit / totalAssets;
    const x4 = marketValueOfEquity / totalLiabilities;
    const x5 = sales / totalAssets;

    const zScore = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 0.999 * x5;

    let distressRating: 'SAFE' | 'GREY' | 'DISTRESS' = 'SAFE';
    if (zScore < 1.81) distressRating = 'DISTRESS';
    else if (zScore <= 2.99) distressRating = 'GREY';

    return { zScore, distressRating };
  }

  public calculateCovenants(
    ebitda: number,
    interestExpense: number,
    principalRepayment: number,
    totalDebt: number
  ): {
    dscr: number;
    leverage: number;
    interestCoverage: number;
    isCompliant: boolean;
  } {
    const dscr = (principalRepayment + interestExpense > 0)
      ? ebitda / (principalRepayment + interestExpense)
      : 99.0;
    
    const leverage = ebitda > 0 ? totalDebt / ebitda : 99.0;
    const interestCoverage = interestExpense > 0 ? (ebitda - 0) / interestExpense : 99.0;

    const isCompliant = dscr >= 1.25 && leverage <= 4.5 && interestCoverage >= 2.0;

    return { dscr, leverage, interestCoverage, isCompliant };
  }
}
