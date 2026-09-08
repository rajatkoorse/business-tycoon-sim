export type QuestionCategory =
  | 'DEV'
  | 'FINANCE'
  | 'ACCOUNTING'
  | 'TRADING'
  | 'SECURITY'
  | 'AI'
  | 'LEGAL'
  | 'GENERAL';

export type EducationTier =
  | 'UNSKILLED'
  | 'BOOTCAMP'
  | 'BACHELOR'
  | 'MASTERS'
  | 'PHD';

export interface ChallengeQuestion {
  id: string;
  category: QuestionCategory;
  tier: EducationTier;
  topic: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardMultiplier: number;
}

export const QUESTION_BANK: ChallengeQuestion[] = [
  // TIER 0: UNSKILLED
  {
    id: 'UNSK-001',
    category: 'GENERAL',
    tier: 'UNSKILLED',
    topic: 'Basic Profit & Margin',
    question: 'A retail flyer distribution gig costs you $12 in bus fare and pays $45 upon completion. What is your net profit margin percentage?',
    options: ['73.3%', '26.7%', '60.0%', '82.5%'],
    correctIndex: 0,
    explanation: 'Net Profit = $45 - $12 = $33. Profit Margin = ($33 / $45) * 100 = 73.33%.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-002',
    category: 'GENERAL',
    tier: 'UNSKILLED',
    topic: 'Inventory & Unit Economics',
    question: 'You buy 50 vintage t-shirts for $250. You sell 30 at $15 each and 20 at $8 each. What is your total gross profit?',
    options: ['$360', '$610', '$60', '$150'],
    correctIndex: 0,
    explanation: 'Total Revenue = (30 * $15) + (20 * $8) = $450 + $160 = $610. Total Cost = $250. Gross Profit = $610 - $250 = $360.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-003',
    category: 'DEV',
    tier: 'UNSKILLED',
    topic: 'Hardware Troubleshooting',
    question: 'A PC is lagging heavily with 98% RAM utilization and slow disk thrashing. What is the most effective hardware solution?',
    options: [
      'Upgrade RAM capacity (e.g., 8GB -> 32GB)',
      'Overclock the monitor refresh rate',
      'Replace the power supply cable',
      'Lower screen resolution to 720p'
    ],
    correctIndex: 0,
    explanation: 'Expanding RAM capacity prevents the operating system from thrashing page file swap memory on storage disks.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-004',
    category: 'SECURITY',
    tier: 'UNSKILLED',
    topic: 'Phishing Detection',
    question: 'You receive an email from paypaI-login.co asking to reset your banking password immediately. What attack is this?',
    options: [
      'Typosquatting Social Engineering Phish',
      'DDoS Packet Flood',
      'SQL Injection',
      'Buffer Overflow'
    ],
    correctIndex: 0,
    explanation: 'Typosquatting disguises malicious URLs using deceptive characters (like uppercase I for lowercase l).',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-005',
    category: 'ACCOUNTING',
    tier: 'UNSKILLED',
    topic: 'Personal Solvency',
    question: 'You have $350 in your wallet and owe $120 for rent utilities due in 2 hours. What is your net available cash?',
    options: ['$230', '$470', '$350', '$120'],
    correctIndex: 0,
    explanation: 'Net Available Cash = Total Cash ($350) - Short-term liabilities ($120) = $230.',
    rewardMultiplier: 1.0
  },

  // TIER 1: BOOTCAMP
  {
    id: 'BOOT-001',
    category: 'DEV',
    tier: 'BOOTCAMP',
    topic: 'JavaScript Event Loop',
    question: 'In what order do synchronous code, microtasks (Promises), and macrotasks (setTimeout) execute in the JS Event Loop?',
    options: [
      'Synchronous -> Microtasks -> Macrotasks',
      'Macrotasks -> Microtasks -> Synchronous',
      'Microtasks -> Synchronous -> Macrotasks',
      'Synchronous -> Macrotasks -> Microtasks'
    ],
    correctIndex: 0,
    explanation: 'Synchronous call stack executes first, followed by resolving all pending microtasks (Promises), then polling the macrotask queue (timers/I/O).',
    rewardMultiplier: 1.25
  },
  {
    id: 'BOOT-002',
    category: 'DEV',
    tier: 'BOOTCAMP',
    topic: 'SQL Security',
    question: 'Which technique is the primary defense against SQL Injection vulnerabilities?',
    options: [
      'Parameterized Queries & Prepared Statements',
      'String concatenation of inputs',
      'Running database with admin privileges',
      'Base64 encoding queries in the frontend'
    ],
    correctIndex: 0,
    explanation: 'Prepared statements treat user input strictly as bounded parameters, never interpreting input as SQL code syntax.',
    rewardMultiplier: 1.25
  },
  {
    id: 'BOOT-003',
    category: 'TRADING',
    tier: 'BOOTCAMP',
    topic: 'AMM Constant Product Math',
    question: 'An AMM liquidity pool has 10 ETH and 20,000 USDC (x * y = 200,000). A trader swaps to reduce pool ETH to 8. How much USDC must the pool contain?',
    options: ['25,000 USDC', '22,000 USDC', '18,000 USDC', '30,000 USDC'],
    correctIndex: 0,
    explanation: 'k = 200,000. New USDC = 200,000 / 8 = 25,000 USDC.',
    rewardMultiplier: 1.3
  },
  {
    id: 'BOOT-004',
    category: 'ACCOUNTING',
    tier: 'BOOTCAMP',
    topic: 'Double-Entry Fundamentals',
    question: 'When receiving $5,000 cash from a freelance client for completed services, what is the correct journal entry?',
    options: [
      'Debit Cash $5,000; Credit Revenue $5,000',
      'Credit Cash $5,000; Debit Revenue $5,000',
      'Debit Expense $5,000; Credit Liability $5,000',
      'Debit Equity $5,000; Credit Cash $5,000'
    ],
    correctIndex: 0,
    explanation: 'Debiting Cash increases the asset account; crediting Revenue increases equity through net income.',
    rewardMultiplier: 1.25
  },

  // TIER 2: BACHELOR / SENIOR
  {
    id: 'BACH-001',
    category: 'DEV',
    tier: 'BACHELOR',
    topic: 'B-Tree vs Hash Index',
    question: 'Why do relational databases (Postgres/MySQL) prefer B-Tree indexes over Hash indexes for range queries (e.g. WHERE price BETWEEN 10 AND 50)?',
    options: [
      'B-Tree keys are sorted and support O(log N) range traversals; Hash indexes only support O(1) point lookups',
      'Hash indexes take more disk space than B-Trees',
      'B-Trees do not require locking',
      'Hash indexes cannot store integers'
    ],
    correctIndex: 0,
    explanation: 'B-Trees maintain ordered key leaf nodes connected via linked lists, allowing efficient sequential range scanning.',
    rewardMultiplier: 1.45
  },
  {
    id: 'BACH-002',
    category: 'FINANCE',
    tier: 'BACHELOR',
    topic: 'Quick Ratio (Acid Test)',
    question: 'A startup has $400k Cash, $100k Receivables, $200k Inventory, and $250k Current Liabilities. What is its Quick Ratio?',
    options: ['2.00x', '2.80x', '1.50x', '3.20x'],
    correctIndex: 0,
    explanation: 'Quick Assets = Cash ($400k) + Receivables ($100k) = $500k. Quick Ratio = $500k / $250k = 2.00x.',
    rewardMultiplier: 1.5
  },
  {
    id: 'BACH-003',
    category: 'LEGAL',
    tier: 'BACHELOR',
    topic: 'Venture Capital Cap Table',
    question: 'A founder owns 1,000,000 shares (100%). An angel investor injects $500k at a $2.0M Pre-Money Valuation. What is the founder ownership post-money?',
    options: ['80.0%', '75.0%', '85.0%', '90.0%'],
    correctIndex: 0,
    explanation: 'Post-Money = $2.0M + $0.5M = $2.5M. Investor Ownership = $0.5M / $2.5M = 20%. Founder = 80%.',
    rewardMultiplier: 1.5
  },

  // TIER 3: MASTERS / MBA / CFA
  {
    id: 'MAST-001',
    category: 'FINANCE',
    tier: 'MASTERS',
    topic: 'Debt Service Coverage Ratio',
    question: 'A real estate asset has Net Operating Income of $1,500,000. Annual debt service is $1,000,000 ($600k principal + $400k interest). What is the DSCR?',
    options: ['1.50x', '1.25x', '2.50x', '0.75x'],
    correctIndex: 0,
    explanation: 'DSCR = NOI / Total Debt Service = $1,500,000 / $1,000,000 = 1.50x.',
    rewardMultiplier: 1.8
  },
  {
    id: 'MAST-002',
    category: 'FINANCE',
    tier: 'MASTERS',
    topic: 'WACC & Cost of Capital',
    question: 'Capital structure: 60% Equity (Cost 10%), 40% Debt (Pre-tax 5%, Tax rate 20%). What is the Weighted Average Cost of Capital (WACC)?',
    options: ['7.6%', '8.0%', '6.8%', '9.2%'],
    correctIndex: 0,
    explanation: 'After-tax Cost of Debt = 5% * (1 - 0.20) = 4.0%. WACC = (0.60 * 10%) + (0.40 * 4%) = 6.0% + 1.6% = 7.6%.',
    rewardMultiplier: 1.85
  },
  {
    id: 'MAST-003',
    category: 'LEGAL',
    tier: 'MASTERS',
    topic: 'SEC 13D Filing Trigger',
    question: 'At what beneficial equity ownership percentage does the SEC mandate filing a public Schedule 13D disclosure within 5 business days?',
    options: ['5% of voting shares', '10% of voting shares', '15% of voting shares', '51% of voting shares'],
    correctIndex: 0,
    explanation: 'Securities Exchange Act Section 13(d) requires filing a Schedule 13D upon crossing 5% beneficial ownership.',
    rewardMultiplier: 1.8
  },

  // TIER 4: PHD & C-SUITE TITAN
  {
    id: 'PHD-001',
    category: 'AI',
    tier: 'PHD',
    topic: 'Attention Complexity',
    question: 'What is the theoretical time and memory complexity of standard full Self-Attention with sequence length N and dimension d?',
    options: [
      'O(N^2 * d) time, O(N^2) memory',
      'O(N * d^2) time, O(N) memory',
      'O(N log N) time, O(N) memory',
      'O(N^3 * d) time, O(N^2) memory'
    ],
    correctIndex: 0,
    explanation: 'Matrix multiplication of QK^T produces an N x N matrix, requiring O(N^2 * d) operations and O(N^2) storage for attention maps.',
    rewardMultiplier: 2.2
  },
  {
    id: 'PHD-002',
    category: 'LEGAL',
    tier: 'PHD',
    topic: 'Flip-In Poison Pill Mechanics',
    question: 'How does a Flip-In Poison Pill defend against hostile takeovers when an acquirer breaches ownership thresholds?',
    options: [
      'Allows all shareholders except the bidder to buy shares at a huge discount, heavily diluting the bidder',
      'Liquidates company assets to zero immediately',
      'Cancels all outstanding common shares',
      'Transfers ownership to the federal government'
    ],
    correctIndex: 0,
    explanation: 'Flip-in pills dilute the hostile raider by allowing other shareholders to purchase newly minted shares at up to 50% discount.',
    rewardMultiplier: 2.3
  }
];

export function getRandomQuestion(tier?: EducationTier, category?: QuestionCategory): ChallengeQuestion {
  let pool = QUESTION_BANK;
  if (tier) {
    const tierPool = pool.filter((q) => q.tier === tier);
    if (tierPool.length > 0) pool = tierPool;
  }
  if (category) {
    const catPool = pool.filter((q) => q.category === category);
    if (catPool.length > 0) pool = catPool;
  }
  if (pool.length === 0) pool = QUESTION_BANK;
  return pool[Math.floor(Math.random() * pool.length)];
}
