export type QuestionCategory = 'DEV' | 'FINANCE' | 'ACCOUNTING' | 'TRADING' | 'SECURITY' | 'AI' | 'LEGAL' | 'GENERAL';
export type EducationTier = 'UNSKILLED' | 'BOOTCAMP' | 'BACHELOR' | 'MASTERS' | 'PHD';
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
export declare const QUESTION_BANK: ChallengeQuestion[];
export declare function shuffleQuestion(q: ChallengeQuestion): ChallengeQuestion;
export declare function getRandomQuestion(tier?: EducationTier, category?: QuestionCategory): ChallengeQuestion;
