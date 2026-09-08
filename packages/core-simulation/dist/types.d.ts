export declare enum AccountType {
    ASSET = "ASSET",
    LIABILITY = "LIABILITY",
    EQUITY = "EQUITY",
    REVENUE = "REVENUE",
    EXPENSE = "EXPENSE"
}
export declare enum MacroRegime {
    BOOM = "BOOM",
    EXPANSION = "EXPANSION",
    STAGFLATION = "STAGFLATION",
    RECESSION = "RECESSION",
    DEPRESSION = "DEPRESSION"
}
export declare enum SectorType {
    FINTECH_CRYPTO = "FINTECH_CRYPTO",
    BIG_TECH_AI = "BIG_TECH_AI",
    COMMERCIAL_REAL_ESTATE = "COMMERCIAL_REAL_ESTATE",
    MANUFACTURING = "MANUFACTURING",
    MEDIA_ENTERTAINMENT = "MEDIA_ENTERTAINMENT",
    GREY_MARKET = "GREY_MARKET"
}
export declare enum CSuiteRole {
    CEO = "CEO",
    CFO = "CFO",
    CTO = "CTO",
    COO = "COO",
    CMO = "CMO",
    CSO = "CSO"
}
export interface JournalEntry {
    id: string;
    timestamp: number;
    description: string;
    debits: {
        account: string;
        amount: number;
    }[];
    credits: {
        account: string;
        amount: number;
    }[];
}
export interface BalanceSheet {
    cash: number;
    marketableSecurities: number;
    accountsReceivable: number;
    allowanceDoubtfulAccounts: number;
    inventory: number;
    ppeGross: number;
    accumulatedDepreciation: number;
    ppeNet: number;
    intangiblesAndPatents: number;
    totalAssets: number;
    accountsPayable: number;
    shortTermDebt: number;
    longTermDebt: number;
    totalLiabilities: number;
    commonStock: number;
    retainedEarnings: number;
    treasuryStock: number;
    totalEquity: number;
}
export interface IncomeStatement {
    grossRevenue: number;
    cogs: number;
    grossProfit: number;
    salesAndMarketing: number;
    researchAndDevelopment: number;
    generalAndAdmin: number;
    operatingExpenses: number;
    ebitda: number;
    depreciationAndAmortization: number;
    ebit: number;
    interestExpense: number;
    interestIncome: number;
    ebt: number;
    taxExpense: number;
    netIncome: number;
}
export interface CashFlowStatement {
    netIncome: number;
    depreciation: number;
    changeInWorkingCapital: number;
    cashFromOperations: number;
    capitalExpenditures: number;
    acquisitionsAndInvestments: number;
    cashFromInvesting: number;
    debtIssuedOrRepaid: number;
    equityIssuedOrBoughtBack: number;
    dividendsPaid: number;
    cashFromFinancing: number;
    netCashFlow: number;
}
export interface DebtTranche {
    id: string;
    name: string;
    principal: number;
    interestRate: number;
    maturityQuarters: number;
    isFloating: boolean;
    spread: number;
}
export interface Employee {
    id: string;
    name: string;
    role: CSuiteRole | 'TRADER' | 'RESEARCHER' | 'ENGINEER' | 'SECURITY_OPERATIVE' | 'FACTORY_WORKER';
    salary: number;
    skills: {
        tech: number;
        finance: number;
        ops: number;
        charisma: number;
        stealth: number;
    };
    psych: {
        morale: number;
        burnout: number;
        loyalty: number;
        greed: number;
        paranoia: number;
    };
    dailyHours: number;
    dailyOutput: number;
    isCovertMole?: boolean;
    isAwareOfCrimes?: boolean;
    pendingPoachOffers?: number;
}
export interface CryptoMiningRig {
    id: string;
    tier: number;
    name: string;
    hashrateTH: number;
    powerKw: number;
    dailyCoinOutput: number;
    condition: number;
    cost: number;
}
export interface AIComputeCluster {
    id: string;
    name: string;
    gpuCount: number;
    gpuType: string;
    flopCapacityPetaFlops: number;
    mrrGenerated: number;
    powerDrawMW: number;
    cost: number;
}
export interface CommercialBuilding {
    id: string;
    name: string;
    zone: 'DOWNTOWN' | 'FINANCIAL_DISTRICT' | 'INDUSTRIAL_ZONE' | 'CYBER_VALLEY';
    floors: number;
    valuation: number;
    monthlyRentalPerSqFt: number;
    occupancyRate: number;
    mortgageDebt: number;
    prestigeScore: number;
    cost: number;
}
export interface FactoryUnit {
    id: string;
    name: string;
    productType: 'MICROCHIPS' | 'QUANTUM_SERVERS' | 'LUXURY_EV' | 'GRAPHENE_BATTERIES';
    nameplateCapacityDaily: number;
    oeeEfficiency: number;
    defectRate: number;
    currentInventory: number;
    rawMaterialStock: number;
    cost: number;
}
export interface MediaAgency {
    id: string;
    name: string;
    monthlyReach: number;
    sensationalismLevel: number;
    credibilityScore: number;
    sponsorshipRevenueMonthly: number;
    cost: number;
}
export interface GreyMarketOp {
    id: string;
    name: string;
    capitalDeployed: number;
    dailyYieldRate: number;
    heatGeneratedDaily: number;
    isUnderActiveInvestigation: boolean;
    cost: number;
}
export interface MacroState {
    regime: MacroRegime;
    centralBankRate: number;
    targetInflation: number;
    currentInflation: number;
    outputGap: number;
    gdpGrowthRate: number;
    marketVolatility: number;
    sentimentScore: number;
    quarter: number;
    year: number;
}
export declare enum OrderSide {
    BUY = "BUY",
    SELL = "SELL"
}
export declare enum OrderType {
    LIMIT = "LIMIT",
    MARKET = "MARKET",
    SHORT = "SHORT"
}
export interface Order {
    id: string;
    corpId: string;
    ticker: string;
    side: OrderSide;
    type: OrderType;
    price: number;
    quantity: number;
    remainingQuantity: number;
    timestamp: number;
}
export interface TradeExecution {
    buyOrderId: string;
    sellOrderId: string;
    buyerCorpId: string;
    sellerCorpId: string;
    ticker: string;
    price: number;
    quantity: number;
    timestamp: number;
}
export interface CandlestickBar {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}
export interface EspionageMission {
    id: string;
    attackerCorpId: string;
    targetCorpId: string;
    type: 'IP_THEFT' | 'LOGIC_BOMB' | 'SUPPLY_CHAIN_ARSON' | 'LEDGER_TAMPERING' | 'INSIDER_LEAK';
    agentSkill: number;
    cost: number;
    status: 'PENDING' | 'SUCCESS' | 'DETECTED_FAILED' | 'DETECTED_SUCCESS';
    lootValue?: number;
    penaltyFine?: number;
}
export interface HostileTakeoverBid {
    id: string;
    acquirerCorpId: string;
    targetCorpId: string;
    sharesOwned: number;
    ownershipPct: number;
    tenderOfferPrice: number;
    isPoisonPillActivated: boolean;
    deadlineQuarters: number;
    status: 'ACTIVE' | 'SUCCEEDED' | 'DEFENDED' | 'EXPIRED';
}
