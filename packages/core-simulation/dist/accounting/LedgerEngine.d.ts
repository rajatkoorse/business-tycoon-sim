import { BalanceSheet, CashFlowStatement, IncomeStatement, JournalEntry } from '../types';
export declare class LedgerEngine {
    private journal;
    private accounts;
    private accumulatedNOL;
    constructor(initialCash?: number);
    recordTransaction(entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry;
    getAccountBalance(account: string): number;
    getJournalEntries(): JournalEntry[];
    generateBalanceSheet(marketableSecuritiesVal?: number, receivablesVal?: number, inventoryVal?: number, ppeGrossVal?: number, accumulatedDeprVal?: number, intangiblesVal?: number, payablesVal?: number, shortTermDebtVal?: number, longTermDebtVal?: number, commonStockVal?: number, retainedEarningsVal?: number): BalanceSheet;
    generateIncomeStatement(grossRevenue: number, cogs: number, smExpense: number, rdExpense: number, gaExpense: number, deprecExpense?: number, interestExpense?: number, taxRate?: number): IncomeStatement;
    generateCashFlowStatement(netIncome: number, depreciation: number, changeInWorkingCapital: number, capex: number, debtIssuanceNet: number, equityIssuanceNet: number, dividends: number): CashFlowStatement;
    calculateAltmanZScore(cash: number, retainedEarnings: number, ebit: number, marketCap: number, revenue: number, totalAssets: number, totalLiabilities: number): {
        zScore: number;
        distressRating: 'SAFE' | 'GREY' | 'DISTRESS';
    };
}
