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
  // ==========================================
  // TIER 0: UNSKILLED / HIGH SCHOOL GIGS (15 Questions)
  // ==========================================
  {
    id: 'UNSK-001',
    category: 'GENERAL',
    tier: 'UNSKILLED',
    topic: 'Profit Margin Math',
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
    category: 'GENERAL',
    tier: 'UNSKILLED',
    topic: 'Discount Pricing Math',
    question: 'A retail store offers a 20% discount on a $120 jacket, followed by an additional 10% coupon at checkout. What is the final customer price?',
    options: ['$86.40', '$84.00', '$90.00', '$96.00'],
    correctIndex: 0,
    explanation: 'After 20% discount: $120 * 0.80 = $96. After 10% coupon: $96 * 0.90 = $86.40.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-004',
    category: 'GENERAL',
    tier: 'UNSKILLED',
    topic: 'Customer Change Calculation',
    question: 'A customer buys goods totaling $37.45 and hands you a $50 bill and a $0.50 coin. How much change do you return?',
    options: ['$13.05', '$12.55', '$13.55', '$12.45'],
    correctIndex: 0,
    explanation: 'Total given = $50.50. Change = $50.50 - $37.45 = $13.05.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-005',
    category: 'DEV',
    tier: 'UNSKILLED',
    topic: 'Hardware Memory Bottleneck',
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
    id: 'UNSK-006',
    category: 'DEV',
    tier: 'UNSKILLED',
    topic: 'Spreadsheet Formula Basics',
    question: 'In Excel / Google Sheets, which formula correctly calculates the average of cells A1 through A10?',
    options: ['=AVERAGE(A1:A10)', '=MEAN(A1:A10)', '=SUM(A1:A10)/9', '=AVG(A1..A10)'],
    correctIndex: 0,
    explanation: '=AVERAGE(A1:A10) calculates the arithmetic mean of all numeric values in the specified range.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-007',
    category: 'DEV',
    tier: 'UNSKILLED',
    topic: 'Network Connectivity Troubleshooting',
    question: 'A client office computer cannot load websites. You run `ping 8.8.8.8` and receive replies, but `ping google.com` fails. What is the root cause?',
    options: [
      'DNS resolution failure',
      'Ethernet cable unplugged',
      'Defective computer monitor',
      'GPU driver crash'
    ],
    correctIndex: 0,
    explanation: 'Successful IP pinging (8.8.8.8) means IP routing works, but hostname failure (google.com) confirms DNS domain lookup is down.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-008',
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
    id: 'UNSK-009',
    category: 'SECURITY',
    tier: 'UNSKILLED',
    topic: 'Two-Factor Authentication (2FA)',
    question: 'Why is an Authenticator App (TOTP) significantly safer than SMS for 2-Factor Authentication?',
    options: [
      'SMS is vulnerable to SIM-swapping and carrier interception',
      'Authenticator apps require high-speed 5G',
      'SMS texts cost $5 per code',
      'Authenticator apps reveal your password to Google'
    ],
    correctIndex: 0,
    explanation: 'SMS codes travel over unencrypted SS7 cellular networks and are easily hijacked via SIM-swap identity theft.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-010',
    category: 'ACCOUNTING',
    tier: 'UNSKILLED',
    topic: 'Personal Solvency',
    question: 'You have $350 in your wallet and owe $120 for rent utilities due in 2 hours. What is your net available cash?',
    options: ['$230', '$470', '$350', '$120'],
    correctIndex: 0,
    explanation: 'Net Available Cash = Total Cash ($350) - Short-term liabilities ($120) = $230.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-011',
    category: 'ACCOUNTING',
    tier: 'UNSKILLED',
    topic: 'Sales Tax Calculation',
    question: 'A laptop costs $800 before taxes. If the local state sales tax rate is 8.5%, what is the total checkout amount?',
    options: ['$868.00', '$885.00', '$848.00', '$872.00'],
    correctIndex: 0,
    explanation: 'Tax = $800 * 0.085 = $68. Total = $800 + $68 = $868.00.',
    rewardMultiplier: 1.0
  },
  {
    id: 'UNSK-012',
    category: 'ACCOUNTING',
    tier: 'UNSKILLED',
    topic: 'Gross vs Net Pay',
    question: 'An employee earns $20/hr for 40 hours ($800 gross pay). If federal/state withholdings total 22%, what is their take-home net pay?',
    options: ['$624.00', '$640.00', '$700.00', '$580.00'],
    correctIndex: 0,
    explanation: 'Deductions = $800 * 0.22 = $176. Net Take-Home = $800 - $176 = $624.00.',
    rewardMultiplier: 1.0
  },

  // ==========================================
  // TIER 1: BOOTCAMP / JUNIOR LEVEL (15 Questions)
  // ==========================================
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
    category: 'DEV',
    tier: 'BOOTCAMP',
    topic: 'HTTP Status Codes',
    question: 'Which HTTP status code should a REST API return when a client makes an authenticated request to a resource they lack permission to access?',
    options: ['403 Forbidden', '401 Unauthorized', '404 Not Found', '500 Internal Error'],
    correctIndex: 0,
    explanation: '401 is for unauthenticated users; 403 Forbidden is for authenticated users who lack necessary authorization rights.',
    rewardMultiplier: 1.25
  },
  {
    id: 'BOOT-004',
    category: 'DEV',
    tier: 'BOOTCAMP',
    topic: 'Git Branching Strategies',
    question: 'What is the key difference between `git merge` and `git rebase` when incorporating feature branch changes into main?',
    options: [
      'Rebase creates a linear commit history by replaying commits; Merge creates a dedicated merge commit preserving branch topology',
      'Merge deletes the feature branch automatically',
      'Rebase cannot be undone',
      'Merge works only on GitHub'
    ],
    correctIndex: 0,
    explanation: 'Rebase rewrites commit SHAs onto the new base commit for a clean linear history, whereas merge joins histories with a merge commit.',
    rewardMultiplier: 1.25
  },
  {
    id: 'BOOT-005',
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
    id: 'BOOT-006',
    category: 'TRADING',
    tier: 'BOOTCAMP',
    topic: 'Bid-Ask Spread Arbitrage',
    question: 'Exchange A quotes BTC at Bid: $60,000 / Ask: $60,050. Exchange B quotes Bid: $60,200 / Ask: $60,250. What is the gross arbitrage spread per BTC?',
    options: ['$150 ($60,200 Bid - $60,050 Ask)', '$200', '$250', '$50'],
    correctIndex: 0,
    explanation: 'Buy on Exchange A at Ask ($60,050) and simultaneously sell on Exchange B at Bid ($60,200). Profit = $60,200 - $60,050 = $150.',
    rewardMultiplier: 1.3
  },
  {
    id: 'BOOT-007',
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
  {
    id: 'BOOT-008',
    category: 'ACCOUNTING',
    tier: 'BOOTCAMP',
    topic: 'Accrual vs Cash Basis',
    question: 'Under accrual accounting, you deliver a $3,000 software contract on March 28th and invoice the client with Net-30 payment terms (paid April 28th). When is revenue recorded?',
    options: [
      'In March, when the performance obligation was completed',
      'In April, when the cash wire is deposited',
      'Evenly split across March and April',
      'Never, until the tax year closes'
    ],
    correctIndex: 0,
    explanation: 'Accrual accounting recognizes revenue when earned (performance obligation satisfied), debiting Accounts Receivable in March.',
    rewardMultiplier: 1.25
  },
  {
    id: 'BOOT-009',
    category: 'FINANCE',
    tier: 'BOOTCAMP',
    topic: 'Compound Interest Growth',
    question: 'If you invest $2,000 at an 8% annual compound return, approximately how many years will it take for the portfolio to double to $4,000 using the Rule of 72?',
    options: ['9.0 years (72 / 8)', '12.5 years', '6.0 years', '16.0 years'],
    correctIndex: 0,
    explanation: 'The Rule of 72 estimates doubling time: Years = 72 / Interest Rate = 72 / 8 = 9.0 years.',
    rewardMultiplier: 1.25
  },

  // ==========================================
  // TIER 2: BACHELOR DEGREE / SENIOR LEVEL (12 Questions)
  // ==========================================
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
    category: 'DEV',
    tier: 'BACHELOR',
    topic: 'CAP Theorem Architecture',
    question: 'In a distributed database cluster experiencing a network partition (P), what trade-off does the system face?',
    options: [
      'Must choose between linearizable Consistency (CP) or high Availability (AP)',
      'Must choose between SQL or NoSQL schema',
      'Must choose between encryption or compression',
      'Must choose between TCP or UDP'
    ],
    correctIndex: 0,
    explanation: 'During network splits, a node can either refuse stale queries to preserve Consistency (CP) or answer with potentially stale data to stay Available (AP).',
    rewardMultiplier: 1.45
  },
  {
    id: 'BACH-003',
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
    id: 'BACH-004',
    category: 'FINANCE',
    tier: 'BACHELOR',
    topic: 'Discounted Cash Flow (DCF)',
    question: 'What is the present value of $1,210 to be received 2 years from today discounted at a 10% annual discount rate?',
    options: ['$1,000.00', '$1,100.00', '$950.00', '$1,050.00'],
    correctIndex: 0,
    explanation: 'PV = FV / (1 + r)^n = $1,210 / (1.10)^2 = $1,210 / 1.21 = $1,000.00.',
    rewardMultiplier: 1.5
  },
  {
    id: 'BACH-005',
    category: 'LEGAL',
    tier: 'BACHELOR',
    topic: 'Venture Capital Cap Table',
    question: 'A founder owns 1,000,000 shares (100%). An angel investor injects $500k at a $2.0M Pre-Money Valuation. What is the founder ownership post-money?',
    options: ['80.0%', '75.0%', '85.0%', '90.0%'],
    correctIndex: 0,
    explanation: 'Post-Money = $2.0M + $0.5M = $2.5M. Investor Ownership = $0.5M / $2.5M = 20%. Founder = 80%.',
    rewardMultiplier: 1.5
  },
  {
    id: 'BACH-006',
    category: 'TRADING',
    tier: 'BACHELOR',
    topic: 'Futures Liquidation Math',
    question: 'You open a 10x leveraged LONG position on ETH at $3,000. Neglecting maintenance margin fees, at what price does your equity drop to 0 (liquidation)?',
    options: ['$2,700 (-10%)', '$2,500', '$2,850', '$2,000'],
    correctIndex: 0,
    explanation: 'With 10x leverage, a 10% decline ($300 drop to $2,700) eliminates 100% of your initial margin capital.',
    rewardMultiplier: 1.5
  },

  // ==========================================
  // TIER 3: MASTERS / MBA / CFA LEVEL (10 Questions)
  // ==========================================
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
  {
    id: 'MAST-004',
    category: 'TRADING',
    tier: 'MASTERS',
    topic: 'Delta Neutrality Option Hedging',
    question: 'A market maker writes 10 Call contracts (1,000 shares) with Delta +0.50. How many underlying shares must they purchase to reach Delta-Neutrality?',
    options: ['+500 shares', '+1,000 shares', '+250 shares', '-500 shares'],
    correctIndex: 0,
    explanation: 'Short 1,000 options * (+0.50) = -500 portfolio Delta. Purchasing +500 shares (+1.0 Delta each) brings total Delta to 0.',
    rewardMultiplier: 1.9
  },

  // ==========================================
  // TIER 4: PHD & C-SUITE TITAN LEVEL (8 Questions)
  // ==========================================
  {
    id: 'PHD-001',
    category: 'AI',
    tier: 'PHD',
    topic: 'Attention Computational Complexity',
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
  },
  {
    id: 'PHD-003',
    category: 'FINANCE',
    tier: 'PHD',
    topic: 'Taylor Rule Central Bank Policy',
    question: 'Given i = r* + pi + 0.5(pi - pi*) + 0.5(y - y*), with r* = 2%, pi* = 2%, current inflation pi = 6%, and output gap +2%, what is the target interest rate?',
    options: ['11.0%', '8.5%', '9.0%', '13.0%'],
    correctIndex: 0,
    explanation: 'i = 2 + 6 + 0.5(6 - 2) + 0.5(2) = 8 + 2 + 1 = 11.0%.',
    rewardMultiplier: 2.2
  },
  {
    id: 'PHD-004',
    category: 'SECURITY',
    tier: 'PHD',
    topic: 'Zero-Knowledge Proofs (zk-SNARKs)',
    question: 'What mathematical construct allows evaluating polynomial equations over encrypted data without revealing the witness in zk-SNARKs?',
    options: [
      'Elliptic curve pairings and homomorphic polynomial commitments (KZG)',
      'Brute-force SHA-256 hash collision search',
      'AES-256 bitwise XOR permutations',
      'Linear regression gradient descent'
    ],
    correctIndex: 0,
    explanation: 'zk-SNARKs rely on bilinear pairings over elliptic curves to evaluate encrypted polynomials at secret evaluation points.',
    rewardMultiplier: 2.5
  }
];

// Track recently seen questions to prevent immediate repeats
const recentlySeenIds: string[] = [];

// Helper to shuffle options so correct answer position changes dynamically!
function shuffleQuestion(q: ChallengeQuestion): ChallengeQuestion {
  const correctOptionText = q.options[q.correctIndex];
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

  return {
    ...q,
    options: shuffledOptions,
    correctIndex: newCorrectIndex
  };
}

export function getRandomQuestion(tier?: EducationTier, category?: QuestionCategory): ChallengeQuestion {
  let pool = QUESTION_BANK;

  if (tier && category) {
    const strictPool = pool.filter((q) => q.tier === tier && q.category === category);
    if (strictPool.length > 0) pool = strictPool;
    else {
      const tierOnlyPool = pool.filter((q) => q.tier === tier);
      if (tierOnlyPool.length > 0) pool = tierOnlyPool;
    }
  } else if (tier) {
    const tierPool = pool.filter((q) => q.tier === tier);
    if (tierPool.length > 0) pool = tierPool;
  } else if (category) {
    const catPool = pool.filter((q) => q.category === category);
    if (catPool.length > 0) pool = catPool;
  }

  // Filter out recently seen questions if possible
  const unseenPool = pool.filter((q) => !recentlySeenIds.includes(q.id));
  const activePool = unseenPool.length > 0 ? unseenPool : pool;

  const chosen = activePool[Math.floor(Math.random() * activePool.length)];

  recentlySeenIds.push(chosen.id);
  if (recentlySeenIds.length > 10) recentlySeenIds.shift();

  return shuffleQuestion(chosen);
}