import { EducationTier } from '../challenges/QuestionBank';
export type HousingTier = 'PARENTS_GARAGE' | 'SHARED_STUDIO' | 'SUBURBAN_APT' | 'LUXURY_CONDO' | 'HILLSIDE_MANSION';
export type WardrobeTier = 'THRIFT_RAGS' | 'CASUAL_HOODIE' | 'BUSINESS_CASUAL' | 'EXECUTIVE_SUIT' | 'BESPOKE_LUXURY';
export type DietTier = 'INSTANT_RAMEN' | 'HOME_COOKING' | 'ORGANIC_MEAL_PREP' | 'MICHELIN_PRIVATE_CHEF';
export type TransitTier = 'PUBLIC_BUS' | 'USED_BEATER_CAR' | 'TESLA_MODEL_S' | 'PORSCHE_911' | 'PRIVATE_GULFSTREAM';
export interface LifeStats {
    health: number;
    happiness: number;
    smarts: number;
    charisma: number;
    energy: number;
    maxEnergy: number;
    ageYears: number;
    ageDays: number;
    education: EducationTier;
    housing: HousingTier;
    wardrobe: WardrobeTier;
    diet: DietTier;
    transit: TransitTier;
    monthlyBills: number;
    streakCount: number;
}
export declare const HOUSING_DATA: Record<HousingTier, {
    name: string;
    monthlyCost: number;
    deposit: number;
    happinessBuff: number;
    maxHappinessCap: number;
}>;
export declare const WARDROBE_DATA: Record<WardrobeTier, {
    name: string;
    buyCost: number;
    monthlyUpkeep: number;
    charismaScore: number;
}>;
export declare const DIET_DATA: Record<DietTier, {
    name: string;
    monthlyCost: number;
    healthBuff: number;
}>;
export declare const TRANSIT_DATA: Record<TransitTier, {
    name: string;
    buyCost: number;
    monthlyCost: number;
    charismaBuff: number;
}>;
export declare const EDUCATION_PROGRAMS: Record<EducationTier, {
    name: string;
    tuitionCost: number;
    minSmarts: number;
    description: string;
}>;
export declare class LifeEngine {
    health: number;
    happiness: number;
    smarts: number;
    charisma: number;
    energy: number;
    maxEnergy: number;
    ageYears: number;
    ageDays: number;
    education: EducationTier;
    housing: HousingTier;
    wardrobe: WardrobeTier;
    diet: DietTier;
    transit: TransitTier;
    streakCount: number;
    getMonthlyBills(): number;
    getRealtimeBillsPerSec(): number;
    getDailyLivingCost(): number;
    stepRealtimeSecond(): {
        billsDue: number;
    };
    hitGym(): {
        success: boolean;
        cost: number;
        message: string;
    };
    readLibrary(): {
        success: boolean;
        cost: number;
        message: string;
    };
    visitDoctor(): {
        success: boolean;
        cost: number;
        message: string;
    };
    goNightclub(): {
        success: boolean;
        cost: number;
        message: string;
    };
    getStats(): LifeStats;
}
