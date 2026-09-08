import { EducationTier } from '../challenges/QuestionBank';

export type HousingTier =
  | 'PARENTS_GARAGE'
  | 'SHARED_STUDIO'
  | 'SUBURBAN_APT'
  | 'LUXURY_CONDO'
  | 'HILLSIDE_MANSION';

export type WardrobeTier =
  | 'THRIFT_RAGS'
  | 'CASUAL_HOODIE'
  | 'BUSINESS_CASUAL'
  | 'EXECUTIVE_SUIT'
  | 'BESPOKE_LUXURY';

export type DietTier =
  | 'INSTANT_RAMEN'
  | 'HOME_COOKING'
  | 'ORGANIC_MEAL_PREP'
  | 'MICHELIN_PRIVATE_CHEF';

export type TransitTier =
  | 'PUBLIC_BUS'
  | 'USED_BEATER_CAR'
  | 'TESLA_MODEL_S'
  | 'PORSCHE_911'
  | 'PRIVATE_GULFSTREAM';

export interface LifeStats {
  health: number;       // 0 - 100
  happiness: number;    // 0 - 100
  smarts: number;       // 0 - 100
  charisma: number;     // 0 - 100
  energy: number;       // 0 - 100
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

export const HOUSING_DATA: Record<HousingTier, { name: string; monthlyCost: number; deposit: number; happinessBuff: number; maxHappinessCap: number }> = {
  PARENTS_GARAGE: { name: "Parents' Garage", monthlyCost: 50, deposit: 0, happinessBuff: -2, maxHappinessCap: 45 },
  SHARED_STUDIO: { name: "Cramped Shared Studio", monthlyCost: 450, deposit: 450, happinessBuff: +2, maxHappinessCap: 65 },
  SUBURBAN_APT: { name: "Suburban 1-Bed Apartment", monthlyCost: 1400, deposit: 1400, happinessBuff: +8, maxHappinessCap: 80 },
  LUXURY_CONDO: { name: "Downtown High-Rise Condo", monthlyCost: 4500, deposit: 4500, happinessBuff: +15, maxHappinessCap: 95 },
  HILLSIDE_MANSION: { name: "Hillside Penthouse Estate", monthlyCost: 25000, deposit: 25000, happinessBuff: +25, maxHappinessCap: 100 }
};

export const WARDROBE_DATA: Record<WardrobeTier, { name: string; buyCost: number; monthlyUpkeep: number; charismaScore: number }> = {
  THRIFT_RAGS: { name: "Thrift Store Rags", buyCost: 0, monthlyUpkeep: 0, charismaScore: 5 },
  CASUAL_HOODIE: { name: "Startup Hoodie & Jeans", buyCost: 150, monthlyUpkeep: 15, charismaScore: 25 },
  BUSINESS_CASUAL: { name: "Business Casual Blazer", buyCost: 650, monthlyUpkeep: 45, charismaScore: 55 },
  EXECUTIVE_SUIT: { name: "Tailored Executive Suit", buyCost: 2800, monthlyUpkeep: 150, charismaScore: 85 },
  BESPOKE_LUXURY: { name: "Bespoke Haute Couture", buyCost: 12000, monthlyUpkeep: 500, charismaScore: 100 }
};

export const DIET_DATA: Record<DietTier, { name: string; monthlyCost: number; healthBuff: number }> = {
  INSTANT_RAMEN: { name: "Instant Cup Noodles", monthlyCost: 60, healthBuff: -1 },
  HOME_COOKING: { name: "Home Cooking & Groceries", monthlyCost: 350, healthBuff: +1 },
  ORGANIC_MEAL_PREP: { name: "Organic Meal Delivery", monthlyCost: 1200, healthBuff: +3 },
  MICHELIN_PRIVATE_CHEF: { name: "Private Executive Chef", monthlyCost: 6000, healthBuff: +6 }
};

export const TRANSIT_DATA: Record<TransitTier, { name: string; buyCost: number; monthlyCost: number; charismaBuff: number }> = {
  PUBLIC_BUS: { name: "Monthly Subway / Bus Pass", buyCost: 0, monthlyCost: 60, charismaBuff: 0 },
  USED_BEATER_CAR: { name: "1998 Beater Sedan", buyCost: 1800, monthlyCost: 250, charismaBuff: +5 },
  TESLA_MODEL_S: { name: "Tesla Model S Plaid", buyCost: 85000, monthlyCost: 850, charismaBuff: +20 },
  PORSCHE_911: { name: "Porsche 911 GT3 RS", buyCost: 220000, monthlyCost: 2400, charismaBuff: +40 },
  PRIVATE_GULFSTREAM: { name: "Gulfstream G650 Jet", buyCost: 65000000, monthlyCost: 45000, charismaBuff: +60 }
};

export const EDUCATION_PROGRAMS: Record<EducationTier, { name: string; tuitionCost: number; minSmarts: number; description: string }> = {
  UNSKILLED: { name: "High School Diploma", tuitionCost: 0, minSmarts: 0, description: "Basic literacy. Limited to manual low-paying freelance tasks." },
  BOOTCAMP: { name: "Coding & Finance Bootcamp", tuitionCost: 750, minSmarts: 25, description: "12-Week Intensive. Unlocks Junior Software & Crypto Arbitrage gigs." },
  BACHELOR: { name: "B.S. in Computer Science & Finance", tuitionCost: 14000, minSmarts: 50, description: "4-Year Degree. Unlocks Senior Engineering, Quant Risk & Audit roles." },
  MASTERS: { name: "MBA & CFA Charterholder", tuitionCost: 45000, minSmarts: 75, description: "Elite Graduate Degree. Unlocks Hedge Fund Management, VP & Director positions." },
  PHD: { name: "Ph.D. in AI & Quantitative Economics", tuitionCost: 95000, minSmarts: 90, description: "Terminal Doctorate. Unlocks Chief AI Scientist, IPO Bell Ringer & Titan status." }
};

export class LifeEngine {
  public health: number = 85;
  public happiness: number = 60;
  public smarts: number = 30;
  public charisma: number = 20;
  public energy: number = 100;
  public maxEnergy: number = 100;
  public ageYears: number = 21;
  public ageDays: number = 1;

  public education: EducationTier = 'UNSKILLED';
  public housing: HousingTier = 'PARENTS_GARAGE';
  public wardrobe: WardrobeTier = 'THRIFT_RAGS';
  public diet: DietTier = 'INSTANT_RAMEN';
  public transit: TransitTier = 'PUBLIC_BUS';

  public streakCount: number = 0;

  public getMonthlyBills(): number {
    const housing = HOUSING_DATA[this.housing].monthlyCost;
    const wardrobe = WARDROBE_DATA[this.wardrobe].monthlyUpkeep;
    const diet = DIET_DATA[this.diet].monthlyCost;
    const transit = TRANSIT_DATA[this.transit].monthlyCost;
    return housing + wardrobe + diet + transit;
  }

  public getDailyLivingCost(): number {
    return Number((this.getMonthlyBills() / 30).toFixed(2));
  }

  public stepDaily(): { billsDue: number; healthDelta: number; happinessDelta: number } {
    this.ageDays += 1;
    if (this.ageDays % 365 === 0) {
      this.ageYears += 1;
    }

    // Energy recovery
    this.energy = Math.min(this.maxEnergy, this.energy + 5);

    // Diet impact
    const dietImpact = DIET_DATA[this.diet].healthBuff;
    this.health = Math.min(100, Math.max(0, this.health + dietImpact * 0.1));

    // Housing impact
    const housingCap = HOUSING_DATA[this.housing].maxHappinessCap;
    const housingBuff = HOUSING_DATA[this.housing].happinessBuff;
    this.happiness = Math.min(housingCap, Math.max(5, this.happiness + housingBuff * 0.05));

    return {
      billsDue: this.getDailyLivingCost(),
      healthDelta: dietImpact * 0.1,
      happinessDelta: housingBuff * 0.05
    };
  }

  public hitGym(): { success: boolean; cost: number; message: string } {
    if (this.energy < 15) return { success: false, cost: 0, message: "Too exhausted for the gym!" };
    this.energy -= 15;
    this.health = Math.min(100, this.health + 6);
    this.happiness = Math.min(100, this.happiness + 4);
    this.charisma = Math.min(100, this.charisma + 2);
    return { success: true, cost: 20, message: "Crushed a heavy workout! (+6 Health, +4 Happiness, +2 Charisma)" };
  }

  public readLibrary(): { success: boolean; cost: number; message: string } {
    if (this.energy < 10) return { success: false, cost: 0, message: "Too tired to focus on reading!" };
    this.energy -= 10;
    this.smarts = Math.min(100, this.smarts + 4);
    this.happiness = Math.min(100, this.happiness + 1);
    return { success: true, cost: 0, message: "Studied finance and computer systems at the public library! (+4 Smarts)" };
  }

  public visitDoctor(): { success: boolean; cost: number; message: string } {
    this.health = Math.min(100, this.health + 30);
    return { success: true, cost: 150, message: "Full medical checkup completed. (+30 Health)" };
  }

  public goNightclub(): { success: boolean; cost: number; message: string } {
    if (this.energy < 25) return { success: false, cost: 0, message: "Too drained for nightlife!" };
    this.energy -= 25;
    this.happiness = Math.min(100, this.happiness + 20);
    this.health = Math.max(5, this.health - 4);
    return { success: true, cost: 120, message: "Partied with fellow entrepreneurs! (+20 Happiness, -4 Health)" };
  }

  public getStats(): LifeStats {
    return {
      health: Math.round(this.health),
      happiness: Math.round(this.happiness),
      smarts: Math.round(this.smarts),
      charisma: Math.round(this.charisma),
      energy: Math.round(this.energy),
      maxEnergy: this.maxEnergy,
      ageYears: this.ageYears,
      ageDays: this.ageDays,
      education: this.education,
      housing: this.housing,
      wardrobe: this.wardrobe,
      diet: this.diet,
      transit: this.transit,
      monthlyBills: this.getMonthlyBills(),
      streakCount: this.streakCount
    };
  }
}
