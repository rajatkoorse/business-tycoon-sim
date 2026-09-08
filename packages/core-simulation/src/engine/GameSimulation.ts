import { LedgerEngine } from '../accounting/LedgerEngine';
import { MacroEngine } from '../macro/MacroEngine';
import { BusinessSectorsEngine } from '../sectors/BusinessSectors';
import {
  AIComputeCluster,
  CommercialBuilding,
  CryptoMiningRig,
  FactoryUnit,
  GreyMarketOp,
  MediaAgency,
  SectorType
} from '../types';
import { CorporateWarfareEngine } from '../warfare/CorporateWarfare';
import { WorkforceEngine } from '../workforce/WorkforceEngine';
import {
  ChallengeQuestion,
  EducationTier,
  getRandomQuestion,
  QUESTION_BANK,
  QuestionCategory
} from '../challenges/QuestionBank';
import {
  DIET_DATA,
  DietTier,
  EDUCATION_PROGRAMS,
  HOUSING_DATA,
  HousingTier,
  LifeEngine,
  LifeStats,
  TRANSIT_DATA,
  TransitTier,
  WARDROBE_DATA,
  WardrobeTier
} from '../life/LifeEngine';

export type TycoonStage =
  | 'GARAGE_HUSTLER'
  | 'REGISTERED_STARTUP'
  | 'GROWTH_ENTERPRISE'
  | 'PUBLIC_CONGLOMERATE';

export interface HustleGig {
  id: string;
  name: string;
  category: QuestionCategory;
  requiredTier: EducationTier;
  description: string;
  rewardUSD: number;
  xpReward: number;
  energyCost: number;
  minSmarts: number;
}

export interface SimulationSummary {
  companyName: string;
  ticker: string;
  stage: TycoonStage;
  level: number;
  xp: number;
  xpToNext: number;
  stockPrice: number;
  marketCap: number;
  cash: number;
  passiveRevenuePerSec: number;
  dailyLivingCost: number;
  dailyExpenses: number;
  regulatoryHeat: number;
  macroRegime: string;
  interestRate: number;
  inflation: number;
  currentDay: number;
  currentQuarter: number;
  currentYear: number;
  isIncorporated: boolean;
  isIPOListed: boolean;
  life: LifeStats;
}

export class GameSimulation {
  public ledger: LedgerEngine;
  public sectors: BusinessSectorsEngine;
  public macro: MacroEngine;
  public workforce: WorkforceEngine;
  public warfare: CorporateWarfareEngine;
  public life: LifeEngine;

  // Progression & Stage
  public stage: TycoonStage = 'GARAGE_HUSTLER';
  public level: number = 1;
  public xp: number = 0;
  public xpToNext: number = 100;
  public isIncorporated: boolean = false;
  public isIPOListed: boolean = false;

  public companyName: string = 'Solo Hustler';
  public ticker: string = 'SOLO';
  public stockPrice: number = 0.0;
  public totalShares: number = 0;

  // Portfolio
  public cryptoRigs: CryptoMiningRig[] = [];
  public aiClusters: AIComputeCluster[] = [];
  public realEstate: CommercialBuilding[] = [];
  public factories: FactoryUnit[] = [];
  public mediaAgencies: MediaAgency[] = [];
  public greyMarketOps: GreyMarketOp[] = [];

  public btcPriceUSD: number = 68450;
  public currentDay: number = 1;
  public hqPrestige: number = 10;
  public perkTier: number = 1;

  public availableGigs: HustleGig[] = [
    // Tier 0: Unskilled / High School
    {
      id: 'GIG-01',
      name: 'DoorDash Flyer Distribution',
      category: 'GENERAL',
      requiredTier: 'UNSKILLED',
      description: 'Hand out marketing flyers in downtown transit hubs',
      rewardUSD: 35,
      xpReward: 15,
      energyCost: 10,
      minSmarts: 0
    },
    {
      id: 'GIG-02',
      name: 'Hardware PC Tune-Up',
      category: 'DEV',
      requiredTier: 'UNSKILLED',
      description: 'Clean dust, remove adware, and optimize RAM paging for local clients',
      rewardUSD: 65,
      xpReward: 25,
      energyCost: 15,
      minSmarts: 10
    },
    {
      id: 'GIG-03',
      name: 'Store Inventory Count',
      category: 'ACCOUNTING',
      requiredTier: 'UNSKILLED',
      description: 'Audit warehouse SKU quantities and tally unit economics',
      rewardUSD: 90,
      xpReward: 35,
      energyCost: 18,
      minSmarts: 15
    },

    // Tier 1: Bootcamp Graduate
    {
      id: 'GIG-04',
      name: 'Frontend React Bug Fixing',
      category: 'DEV',
      requiredTier: 'BOOTCAMP',
      description: 'Fix state re-renders and debug asynchronous microtask event loops',
      rewardUSD: 240,
      xpReward: 60,
      energyCost: 20,
      minSmarts: 25
    },
    {
      id: 'GIG-05',
      name: 'Crypto DEX Micro-Arbitrage',
      category: 'TRADING',
      requiredTier: 'BOOTCAMP',
      description: 'Exploit Uniswap AMM constant product invariant price discrepancies',
      rewardUSD: 380,
      xpReward: 85,
      energyCost: 22,
      minSmarts: 30
    },
    {
      id: 'GIG-06',
      name: 'Small Business Bookkeeping',
      category: 'ACCOUNTING',
      requiredTier: 'BOOTCAMP',
      description: 'Reconcile general ledger debit/credit transactions and cash accounts',
      rewardUSD: 450,
      xpReward: 95,
      energyCost: 25,
      minSmarts: 35
    },

    // Tier 2: Bachelor of Science
    {
      id: 'GIG-07',
      name: 'Database Architecture & B-Tree Indexing',
      category: 'DEV',
      requiredTier: 'BACHELOR',
      description: 'Optimize high-throughput relational database query planner',
      rewardUSD: 1200,
      xpReward: 220,
      energyCost: 30,
      minSmarts: 50
    },
    {
      id: 'GIG-08',
      name: 'Quant Risk & Liquidity Modeling',
      category: 'FINANCE',
      requiredTier: 'BACHELOR',
      description: 'Calculate Quick Ratios, working capital, and margin liquidation thresholds',
      rewardUSD: 1850,
      xpReward: 300,
      energyCost: 32,
      minSmarts: 55
    },
    {
      id: 'GIG-09',
      name: 'Startup Cap Table & Dilution Audit',
      category: 'LEGAL',
      requiredTier: 'BACHELOR',
      description: 'Model Series A pre-money equity distributions for VC term sheets',
      rewardUSD: 2400,
      xpReward: 380,
      energyCost: 35,
      minSmarts: 60
    },

    // Tier 3: Master of Business Administration / CFA
    {
      id: 'GIG-10',
      name: 'Commercial Debt & DSCR Structuring',
      category: 'FINANCE',
      requiredTier: 'MASTERS',
      description: 'Underwrite multi-million dollar real estate syndication debt tranches',
      rewardUSD: 6500,
      xpReward: 850,
      energyCost: 40,
      minSmarts: 75
    },
    {
      id: 'GIG-11',
      name: 'Delta-Neutral Options Market Making',
      category: 'TRADING',
      requiredTier: 'MASTERS',
      description: 'Dynamically hedge institutional options book across Greek volatilities',
      rewardUSD: 9500,
      xpReward: 1200,
      energyCost: 45,
      minSmarts: 80
    },

    // Tier 4: Ph.D. & C-Suite Titan
    {
      id: 'GIG-12',
      name: 'Frontier AI Attention Optimization',
      category: 'AI',
      requiredTier: 'PHD',
      description: 'Architect sub-quadratic FlashAttention kernels for frontier LLMs',
      rewardUSD: 28000,
      xpReward: 3500,
      energyCost: 50,
      minSmarts: 90
    },
    {
      id: 'GIG-13',
      name: 'Hostile Takeover Defense & Poison Pill',
      category: 'LEGAL',
      requiredTier: 'PHD',
      description: 'Draft SEC Schedule 13D defensive flip-in poison pill rights plan',
      rewardUSD: 60000,
      xpReward: 6000,
      energyCost: 55,
      minSmarts: 95
    }
  ];

  public eventLog: { id: string; timestamp: number; text: string; type: 'INFO' | 'WARN' | 'DANGER' | 'SUCCESS' }[] = [];

  constructor() {
    // START STRICTLY FROM ZERO ($25 cash in pocket!)
    this.ledger = new LedgerEngine(25);
    this.sectors = new BusinessSectorsEngine();
    this.macro = new MacroEngine();
    this.workforce = new WorkforceEngine();
    this.warfare = new CorporateWarfareEngine();
    this.life = new LifeEngine();

    this.workforce.clearStaff();

    this.addLog("Born into the metropolis with $25 in your pocket, living in parents' garage. Hustle, study, solve challenges, and conquer the financial world!", 'SUCCESS');
  }

  public addLog(text: string, type: 'INFO' | 'WARN' | 'DANGER' | 'SUCCESS' = 'INFO') {
    this.eventLog.unshift({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      text,
      type
    });
    if (this.eventLog.length > 60) this.eventLog.pop();
  }

  // Check if player has education needed for a gig
  public canPerformGig(gig: HustleGig): { allowed: boolean; reason?: string } {
    const tierOrder: Record<EducationTier, number> = {
      UNSKILLED: 0,
      BOOTCAMP: 1,
      BACHELOR: 2,
      MASTERS: 3,
      PHD: 4
    };

    const playerTierLevel = tierOrder[this.life.education];
    const reqTierLevel = tierOrder[gig.requiredTier];

    if (playerTierLevel < reqTierLevel) {
      return {
        allowed: false,
        reason: `Requires ${EDUCATION_PROGRAMS[gig.requiredTier].name} degree/certification!`
      };
    }

    if (this.life.smarts < gig.minSmarts) {
      return {
        allowed: false,
        reason: `Requires at least ${gig.minSmarts} Smarts (Current: ${this.life.smarts}). Study at the library!`
      };
    }

    if (this.life.energy < gig.energyCost) {
      return {
        allowed: false,
        reason: `Low Energy (${this.life.energy}/${this.life.maxEnergy}). Rest or grab coffee!`
      };
    }

    return { allowed: true };
  }

  // Get Challenge Question for a gig or exam
  public getQuestionForGig(gigId: string): ChallengeQuestion {
    const gig = this.availableGigs.find((g) => g.id === gigId);
    if (!gig) return getRandomQuestion('UNSKILLED');
    return getRandomQuestion(gig.requiredTier, gig.category);
  }

  // Submit answer for a gig challenge
  public submitGigChallenge(
    gigId: string,
    questionId: string,
    selectedOptionIndex: number
  ): {
    success: boolean;
    isCorrect: boolean;
    earnedUSD: number;
    earnedXP: number;
    question: ChallengeQuestion;
    message: string;
  } {
    const gig = this.availableGigs.find((g) => g.id === gigId);
    if (!gig) {
      return {
        success: false,
        isCorrect: false,
        earnedUSD: 0,
        earnedXP: 0,
        question: getRandomQuestion(),
        message: 'Gig not found.'
      };
    }

    const check = this.canPerformGig(gig);
    if (!check.allowed) {
      return {
        success: false,
        isCorrect: false,
        earnedUSD: 0,
        earnedXP: 0,
        question: getRandomQuestion(),
        message: check.reason || 'Cannot perform gig.'
      };
    }

    const question = QUESTION_BANK.find((q) => q.id === questionId) || this.getQuestionForGig(gigId);
    this.life.energy = Math.max(0, this.life.energy - gig.energyCost);

    const isCorrect = selectedOptionIndex === question.correctIndex;

    if (isCorrect) {
      this.life.streakCount += 1;
      const streakMultiplier = 1 + Math.min(1.0, this.life.streakCount * 0.1); // +10% per streak up to 2x
      const earnedUSD = Math.round(gig.rewardUSD * question.rewardMultiplier * streakMultiplier);
      const earnedXP = Math.round(gig.xpReward * streakMultiplier);

      this.ledger.recordTransaction({
        description: `Challenge Payout: ${gig.name}`,
        debits: [{ account: 'ASSET:Cash', amount: earnedUSD }],
        credits: [{ account: 'REVENUE:Freelance', amount: earnedUSD }]
      });

      this.addXP(earnedXP);
      this.life.smarts = Math.min(100, this.life.smarts + 1);
      this.life.happiness = Math.min(100, this.life.happiness + 2);

      this.addLog(
        `SOLVED: "${gig.name}"! +$${earnedUSD.toLocaleString()} (+$${earnedXP} XP) [Streak: ${this.life.streakCount}x]`,
        'SUCCESS'
      );

      return {
        success: true,
        isCorrect: true,
        earnedUSD,
        earnedXP,
        question,
        message: `Correct! Earned $${earnedUSD.toLocaleString()} (${this.life.streakCount}x streak bonus).`
      };
    } else {
      this.life.streakCount = 0;
      this.life.happiness = Math.max(0, this.life.happiness - 4);
      this.addLog(`FAILED challenge for "${gig.name}". Energy lost, streak reset.`, 'WARN');
      return {
        success: true,
        isCorrect: false,
        earnedUSD: 0,
        earnedXP: 0,
        question,
        message: `Incorrect answer. Correct: "${question.options[question.correctIndex]}".`
      };
    }
  }

  // University / Bootcamp Exam Enrollment & Completion
  public enrollAndTakeExam(tier: EducationTier, selectedOptionIndex?: number, questionId?: string): {
    success: boolean;
    passed?: boolean;
    question?: ChallengeQuestion;
    message: string;
  } {
    const program = EDUCATION_PROGRAMS[tier];
    const cash = this.ledger.getAccountBalance('ASSET:Cash');

    if (cash < program.tuitionCost) {
      return { success: false, message: `Insufficient cash for tuition. Required: $${program.tuitionCost.toLocaleString()}` };
    }

    if (this.life.smarts < program.minSmarts) {
      return { success: false, message: `Smarts too low. Required: ${program.minSmarts} Smarts (Current: ${this.life.smarts}). Study more at the library!` };
    }

    // If no answer supplied, return the exam question
    if (selectedOptionIndex === undefined) {
      const examQuestion = getRandomQuestion(tier);
      return { success: true, question: examQuestion, message: `Exam question retrieved for ${program.name}` };
    }

    // Verify exam question
    const question = QUESTION_BANK.find((q) => q.id === questionId) || getRandomQuestion(tier);
    const passed = selectedOptionIndex === question.correctIndex;

    // Deduct tuition fee
    this.ledger.recordTransaction({
      description: `Tuition Fee: ${program.name}`,
      debits: [{ account: 'EXPENSE:Education', amount: program.tuitionCost }],
      credits: [{ account: 'ASSET:Cash', amount: program.tuitionCost }]
    });

    if (passed) {
      this.life.education = tier;
      this.life.smarts = Math.min(100, this.life.smarts + 10);
      this.life.happiness = Math.min(100, this.life.happiness + 15);
      this.addXP(500);
      this.addLog(`GRADUATED! Earned degree: ${program.name}! Higher tier jobs and businesses unlocked.`, 'SUCCESS');
      return { success: true, passed: true, question, message: `Congratulations! You passed the comprehensive exam and earned your ${program.name}!` };
    } else {
      this.life.happiness = Math.max(0, this.life.happiness - 10);
      this.addLog(`Failed ${program.name} exam. Tuition spent. Hit the books and try again!`, 'WARN');
      return { success: true, passed: false, question, message: `Failed exam. Correct answer: ${question.options[question.correctIndex]}. Study and re-attempt!` };
    }
  }

  // Housing upgrade
  public upgradeHousing(tier: HousingTier): boolean {
    const data = HOUSING_DATA[tier];
    const cash = this.ledger.getAccountBalance('ASSET:Cash');
    if (cash < data.deposit) {
      this.addLog(`Insufficient funds for security deposit: $${data.deposit.toLocaleString()}`, 'WARN');
      return false;
    }

    if (data.deposit > 0) {
      this.ledger.recordTransaction({
        description: `Housing Security Deposit: ${data.name}`,
        debits: [{ account: 'EXPENSE:Housing', amount: data.deposit }],
        credits: [{ account: 'ASSET:Cash', amount: data.deposit }]
      });
    }

    this.life.housing = tier;
    this.addLog(`Moved into ${data.name}! Monthly rent: $${data.monthlyCost.toLocaleString()}/mo.`, 'SUCCESS');
    return true;
  }

  // Wardrobe upgrade
  public buyWardrobe(tier: WardrobeTier): boolean {
    const data = WARDROBE_DATA[tier];
    const cash = this.ledger.getAccountBalance('ASSET:Cash');
    if (cash < data.buyCost) {
      this.addLog(`Insufficient funds for wardrobe: $${data.buyCost.toLocaleString()}`, 'WARN');
      return false;
    }

    if (data.buyCost > 0) {
      this.ledger.recordTransaction({
        description: `Purchased Wardrobe: ${data.name}`,
        debits: [{ account: 'EXPENSE:Lifestyle', amount: data.buyCost }],
        credits: [{ account: 'ASSET:Cash', amount: data.buyCost }]
      });
    }

    this.life.wardrobe = tier;
    this.life.charisma = Math.min(100, Math.max(this.life.charisma, data.charismaScore));
    this.addLog(`Equipped ${data.name}! Professional charisma elevated to ${data.charismaScore}%.`, 'SUCCESS');
    return true;
  }

  // Diet switch
  public setDiet(tier: DietTier): boolean {
    this.life.diet = tier;
    this.addLog(`Diet changed to ${DIET_DATA[tier].name}.`, 'INFO');
    return true;
  }

  // Transit upgrade
  public buyTransit(tier: TransitTier): boolean {
    const data = TRANSIT_DATA[tier];
    const cash = this.ledger.getAccountBalance('ASSET:Cash');
    if (cash < data.buyCost) {
      this.addLog(`Insufficient funds for transit vehicle: $${data.buyCost.toLocaleString()}`, 'WARN');
      return false;
    }

    if (data.buyCost > 0) {
      this.ledger.recordTransaction({
        description: `Purchased Vehicle: ${data.name}`,
        debits: [{ account: 'ASSET:PPE', amount: data.buyCost }],
        credits: [{ account: 'ASSET:Cash', amount: data.buyCost }]
      });
    }

    this.life.transit = tier;
    this.life.charisma = Math.min(100, this.life.charisma + data.charismaBuff);
    this.addLog(`Acquired ${data.name}! Transit updated.`, 'SUCCESS');
    return true;
  }

  public addXP(amount: number) {
    this.xp += amount;
    while (this.xp >= this.xpToNext) {
      this.xp -= this.xpToNext;
      this.level += 1;
      this.life.maxEnergy += 10;
      this.life.energy = this.life.maxEnergy;
      this.xpToNext = Math.round(this.xpToNext * 1.5);
      this.addLog(`LEVEL UP! Reached Level ${this.level}. Max energy increased to ${this.life.maxEnergy}!`, 'SUCCESS');
    }
  }

  // INCORPORATE LLC ($2,500 Registration)
  public incorporateBusiness(name: string, ticker: string): boolean {
    const cash = this.ledger.getAccountBalance('ASSET:Cash');
    const fee = 2500;
    if (cash < fee) {
      this.addLog(`Insufficient funds to incorporate LLC. Required: $${fee.toLocaleString()}`, 'WARN');
      return false;
    }

    this.ledger.recordTransaction({
      description: `State LLC Registration & Incorporation: ${name}`,
      debits: [{ account: 'EXPENSE:Legal', amount: fee }],
      credits: [{ account: 'ASSET:Cash', amount: fee }]
    });

    this.companyName = name;
    this.ticker = ticker.toUpperCase();
    this.isIncorporated = true;
    this.stage = 'REGISTERED_STARTUP';
    this.hqPrestige = 45;
    this.totalShares = 100000;
    this.stockPrice = 5.0;
    this.addXP(250);

    this.addLog(`CONGRATULATIONS! "${this.companyName}" ($${this.ticker}) is officially registered! You can now hire staff and deploy compute infrastructure.`, 'SUCCESS');
    return true;
  }

  // FILE IPO ($100,000 Filing fee)
  public fileIPO(): boolean {
    const cash = this.ledger.getAccountBalance('ASSET:Cash');
    const fee = 100000;
    if (cash < fee || !this.isIncorporated) {
      this.addLog(`IPO Requirements not met. Must have $100k capital and registered business.`, 'WARN');
      return false;
    }

    this.ledger.recordTransaction({
      description: `Wall Street IPO Underwriting & SEC S-1 Registration`,
      debits: [{ account: 'EXPENSE:IPO', amount: fee }],
      credits: [{ account: 'ASSET:Cash', amount: fee }]
    });

    this.isIPOListed = true;
    this.stage = 'PUBLIC_CONGLOMERATE';
    this.stockPrice = 25.0;
    this.totalShares = 1000000;
    this.addXP(1000);

    this.addLog(`RING THE BELL! $${this.ticker} is now officially listed on the Metropolis Stock Exchange!`, 'SUCCESS');
    return true;
  }

  // BUY ASSET
  public buyAsset(sector: SectorType, asset: any): boolean {
    const cash = this.ledger.getAccountBalance('ASSET:Cash');
    if (cash < asset.cost) {
      this.addLog(`Insufficient funds for ${asset.name}. Required: $${asset.cost.toLocaleString()}`, 'WARN');
      return false;
    }

    this.ledger.recordTransaction({
      description: `Purchased asset: ${asset.name}`,
      debits: [{ account: 'ASSET:PPE', amount: asset.cost }],
      credits: [{ account: 'ASSET:Cash', amount: asset.cost }]
    });

    switch (sector) {
      case SectorType.FINTECH_CRYPTO:
        this.cryptoRigs.push(asset);
        break;
      case SectorType.BIG_TECH_AI:
        this.aiClusters.push(asset);
        break;
      case SectorType.COMMERCIAL_REAL_ESTATE:
        this.realEstate.push(asset);
        break;
      case SectorType.MANUFACTURING:
        this.factories.push(asset);
        break;
      case SectorType.MEDIA_ENTERTAINMENT:
        this.mediaAgencies.push(asset);
        break;
      case SectorType.GREY_MARKET:
        this.greyMarketOps.push(asset);
        break;
    }

    this.addXP(Math.max(10, Math.round(asset.cost / 200)));

    if (this.isIncorporated && this.stage === 'REGISTERED_STARTUP' && this.cryptoRigs.length + this.aiClusters.length >= 2) {
      this.stage = 'GROWTH_ENTERPRISE';
      this.hqPrestige = 70;
      this.addLog('ENTERPRISE STAGE UNLOCKED! You have expanded into enterprise compute and hardware operations.', 'SUCCESS');
    }

    this.addLog(`Deployed $${asset.cost.toLocaleString()} into ${asset.name}.`, 'SUCCESS');
    return true;
  }

  // REAL-TIME TICK LOOP
  public stepDailyTick(): SimulationSummary {
    this.currentDay += 1;

    // Step Life Engine (bills, health, happiness, age)
    const lifeTick = this.life.stepDaily();

    // Deduct daily living expenses (Rent, Food, Transit, Clothes upkeep)
    const dailyLivingCost = lifeTick.billsDue;
    const currentCash = this.ledger.getAccountBalance('ASSET:Cash');
    if (currentCash >= dailyLivingCost) {
      this.ledger.recordTransaction({
        description: 'Daily Subsistence & Living Expenses',
        debits: [{ account: 'EXPENSE:Lifestyle', amount: dailyLivingCost }],
        credits: [{ account: 'ASSET:Cash', amount: dailyLivingCost }]
      });
    } else {
      // Eviction / Starvation warning
      this.life.happiness = Math.max(0, this.life.happiness - 2);
      this.life.health = Math.max(5, this.life.health - 2);
      if (this.currentDay % 10 === 0) {
        this.addLog("Overdue bills notice! Cash insufficient for living expenses. Health & happiness dropping!", 'DANGER');
      }
    }

    // BTC Brownian motion
    const btcShock = (Math.random() - 0.49) * 0.02;
    this.btcPriceUSD = Math.max(10000, this.btcPriceUSD * (1 + btcShock));

    // Automated passive income from owned assets
    let totalPassiveIncomePerSec = 0;
    let totalPowerCostPerSec = 0;

    for (const rig of this.cryptoRigs) {
      if (rig.condition <= 0) continue;
      const secCoins = rig.dailyCoinOutput / 86400 * 2000;
      const secPower = (rig.powerKw * 0.08) / 3600;
      totalPassiveIncomePerSec += secCoins * this.btcPriceUSD;
      totalPowerCostPerSec += secPower;
      rig.condition = Math.max(0, rig.condition - 0.001);
    }

    for (const cluster of this.aiClusters) {
      const secMRR = cluster.mrrGenerated / (30 * 86400) * 2000;
      totalPassiveIncomePerSec += secMRR;
    }

    for (const building of this.realEstate) {
      const buildingRent = building.floors * 15000 * building.monthlyRentalPerSqFt * building.occupancyRate;
      const secRent = buildingRent / (30 * 86400) * 2000;
      totalPassiveIncomePerSec += secRent;
    }

    for (const grey of this.greyMarketOps) {
      const secYield = (grey.capitalDeployed * grey.dailyYieldRate) / 86400 * 2000;
      totalPassiveIncomePerSec += secYield;
    }

    // Workforce salaries
    let totalSalariesPerSec = 0;
    for (const emp of this.workforce.getEmployees()) {
      totalSalariesPerSec += emp.salary / (365 * 86400) * 2000;
    }

    const netCashFlowPerSec = totalPassiveIncomePerSec - totalPowerCostPerSec - totalSalariesPerSec;

    if (netCashFlowPerSec > 0.01) {
      this.ledger.recordTransaction({
        description: 'Automated Operations Yield',
        debits: [{ account: 'ASSET:Cash', amount: netCashFlowPerSec }],
        credits: [{ account: 'REVENUE:Operations', amount: netCashFlowPerSec }]
      });
    } else if (netCashFlowPerSec < -0.01) {
      const deduct = Math.min(this.ledger.getAccountBalance('ASSET:Cash'), Math.abs(netCashFlowPerSec));
      if (deduct > 0) {
        this.ledger.recordTransaction({
          description: 'Operations Overhead Cost',
          debits: [{ account: 'EXPENSE:Operations', amount: deduct }],
          credits: [{ account: 'ASSET:Cash', amount: deduct }]
        });
      }
    }

    // Heat decay
    this.warfare.stepDailyHeatDecay();

    // Stock price tick
    if (this.isIPOListed) {
      const noise = (Math.random() - 0.495) * 0.01;
      this.stockPrice = Math.max(0.5, this.stockPrice * (1 + noise));
    }

    return this.getSummary();
  }

  public getSummary(): SimulationSummary {
    const macro = this.macro.getState();
    const cash = Math.max(0, this.ledger.getAccountBalance('ASSET:Cash'));

    let passiveSec = 0;
    for (const rig of this.cryptoRigs) {
      passiveSec += (rig.dailyCoinOutput / 86400 * 2000) * this.btcPriceUSD;
    }
    for (const c of this.aiClusters) {
      passiveSec += c.mrrGenerated / (30 * 86400) * 2000;
    }

    return {
      companyName: this.companyName,
      ticker: this.ticker,
      stage: this.stage,
      level: this.level,
      xp: this.xp,
      xpToNext: this.xpToNext,
      stockPrice: this.isIPOListed ? Number(this.stockPrice.toFixed(2)) : 0,
      marketCap: this.isIPOListed ? Math.round(this.stockPrice * this.totalShares) : (this.isIncorporated ? 500000 : 0),
      cash: Math.round(cash * 100) / 100,
      passiveRevenuePerSec: Number(passiveSec.toFixed(2)),
      dailyLivingCost: this.life.getDailyLivingCost(),
      dailyExpenses: 0,
      regulatoryHeat: Math.round(this.warfare.getHeat()),
      macroRegime: macro.regime,
      interestRate: Number((macro.centralBankRate * 100).toFixed(2)),
      inflation: Number((macro.currentInflation * 100).toFixed(2)),
      currentDay: this.currentDay,
      currentQuarter: macro.quarter,
      currentYear: macro.year,
      isIncorporated: this.isIncorporated,
      isIPOListed: this.isIPOListed,
      life: this.life.getStats()
    };
  }
}
