"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeEngine = exports.EDUCATION_PROGRAMS = exports.TRANSIT_DATA = exports.DIET_DATA = exports.WARDROBE_DATA = exports.HOUSING_DATA = void 0;
exports.HOUSING_DATA = {
    PARENTS_GARAGE: { name: "Parents' Garage", monthlyCost: 50, deposit: 0, happinessBuff: 0, maxHappinessCap: 70 },
    SHARED_STUDIO: { name: "Cramped Shared Studio", monthlyCost: 450, deposit: 450, happinessBuff: +2, maxHappinessCap: 80 },
    SUBURBAN_APT: { name: "Suburban 1-Bed Apartment", monthlyCost: 1400, deposit: 1400, happinessBuff: +8, maxHappinessCap: 90 },
    LUXURY_CONDO: { name: "Downtown High-Rise Condo", monthlyCost: 4500, deposit: 4500, happinessBuff: +15, maxHappinessCap: 98 },
    HILLSIDE_MANSION: { name: "Hillside Penthouse Estate", monthlyCost: 25000, deposit: 25000, happinessBuff: +25, maxHappinessCap: 100 }
};
exports.WARDROBE_DATA = {
    THRIFT_RAGS: { name: "Thrift Store Rags", buyCost: 0, monthlyUpkeep: 0, charismaScore: 10 },
    CASUAL_HOODIE: { name: "Startup Hoodie & Jeans", buyCost: 150, monthlyUpkeep: 10, charismaScore: 30 },
    BUSINESS_CASUAL: { name: "Business Casual Blazer", buyCost: 650, monthlyUpkeep: 30, charismaScore: 60 },
    EXECUTIVE_SUIT: { name: "Tailored Executive Suit", buyCost: 2800, monthlyUpkeep: 80, charismaScore: 85 },
    BESPOKE_LUXURY: { name: "Bespoke Haute Couture", buyCost: 12000, monthlyUpkeep: 250, charismaScore: 100 }
};
exports.DIET_DATA = {
    INSTANT_RAMEN: { name: "Instant Cup Noodles", monthlyCost: 60, healthBuff: 0 },
    HOME_COOKING: { name: "Home Cooking & Groceries", monthlyCost: 350, healthBuff: +1 },
    ORGANIC_MEAL_PREP: { name: "Organic Meal Delivery", monthlyCost: 1200, healthBuff: +3 },
    MICHELIN_PRIVATE_CHEF: { name: "Private Executive Chef", monthlyCost: 6000, healthBuff: +6 }
};
exports.TRANSIT_DATA = {
    PUBLIC_BUS: { name: "Monthly Subway / Bus Pass", buyCost: 0, monthlyCost: 50, charismaBuff: 0 },
    USED_BEATER_CAR: { name: "1998 Beater Sedan", buyCost: 1800, monthlyCost: 150, charismaBuff: +5 },
    TESLA_MODEL_S: { name: "Tesla Model S Plaid", buyCost: 85000, monthlyCost: 600, charismaBuff: +20 },
    PORSCHE_911: { name: "Porsche 911 GT3 RS", buyCost: 220000, monthlyCost: 1800, charismaBuff: +40 },
    PRIVATE_GULFSTREAM: { name: "Gulfstream G650 Jet", buyCost: 65000000, monthlyCost: 30000, charismaBuff: +60 }
};
exports.EDUCATION_PROGRAMS = {
    UNSKILLED: { name: "High School Diploma", tuitionCost: 0, minSmarts: 0, description: "Basic literacy. Limited to manual low-paying freelance tasks." },
    BOOTCAMP: { name: "Coding & Finance Bootcamp", tuitionCost: 750, minSmarts: 20, description: "12-Week Intensive. Unlocks Junior Software & Crypto Arbitrage gigs." },
    BACHELOR: { name: "B.S. in Computer Science & Finance", tuitionCost: 14000, minSmarts: 45, description: "4-Year Degree. Unlocks Senior Engineering, Quant Risk & Audit roles." },
    MASTERS: { name: "MBA & CFA Charterholder", tuitionCost: 45000, minSmarts: 70, description: "Elite Graduate Degree. Unlocks Hedge Fund Management, VP & Director positions." },
    PHD: { name: "Ph.D. in AI & Quantitative Economics", tuitionCost: 95000, minSmarts: 85, description: "Terminal Doctorate. Unlocks Chief AI Scientist, IPO Bell Ringer & Titan status." }
};
class LifeEngine {
    health = 100;
    happiness = 85;
    smarts = 30;
    charisma = 20;
    energy = 100;
    maxEnergy = 100;
    ageYears = 21;
    ageDays = 1;
    education = 'UNSKILLED';
    housing = 'PARENTS_GARAGE';
    wardrobe = 'THRIFT_RAGS';
    diet = 'INSTANT_RAMEN';
    transit = 'PUBLIC_BUS';
    streakCount = 0;
    getMonthlyBills() {
        const housing = exports.HOUSING_DATA[this.housing].monthlyCost;
        const wardrobe = exports.WARDROBE_DATA[this.wardrobe].monthlyUpkeep;
        const diet = exports.DIET_DATA[this.diet].monthlyCost;
        const transit = exports.TRANSIT_DATA[this.transit].monthlyCost;
        return housing + wardrobe + diet + transit;
    }
    // Real-time cost per second (Monthly bills / (30 days * 86400 seconds))
    getRealtimeBillsPerSec() {
        return this.getMonthlyBills() / (30 * 86400);
    }
    getDailyLivingCost() {
        return Number((this.getMonthlyBills() / 30).toFixed(2));
    }
    // Called each real-time second
    stepRealtimeSecond() {
        // Energy steadily recharges when idle (+1 every 2 seconds)
        this.energy = Math.min(this.maxEnergy, this.energy + 0.5);
        // Health and Happiness stay stable; gentle recovery if diet is good
        if (this.health < 100 && this.diet !== 'INSTANT_RAMEN') {
            this.health = Math.min(100, this.health + 0.01);
        }
        return {
            billsDue: this.getRealtimeBillsPerSec()
        };
    }
    hitGym() {
        if (this.energy < 15)
            return { success: false, cost: 0, message: "Too exhausted for the gym! Rest a moment to recover energy." };
        this.energy -= 15;
        this.health = Math.min(100, this.health + 10);
        this.happiness = Math.min(100, this.happiness + 6);
        this.charisma = Math.min(100, this.charisma + 3);
        return { success: true, cost: 20, message: "Crushed a heavy workout! (+10 Health, +6 Happiness, +3 Charisma)" };
    }
    readLibrary() {
        if (this.energy < 10)
            return { success: false, cost: 0, message: "Too tired to focus on reading! Rest a moment." };
        this.energy -= 10;
        this.smarts = Math.min(100, this.smarts + 5);
        this.happiness = Math.min(100, this.happiness + 2);
        return { success: true, cost: 0, message: "Studied finance and computer systems at the public library! (+5 Smarts)" };
    }
    visitDoctor() {
        this.health = 100;
        return { success: true, cost: 150, message: "Full medical checkup completed. Health restored to 100%!" };
    }
    goNightclub() {
        if (this.energy < 20)
            return { success: false, cost: 0, message: "Too drained for nightlife!" };
        this.energy -= 20;
        this.happiness = 100;
        return { success: true, cost: 120, message: "Partied with fellow entrepreneurs! (Happiness restored to 100%)" };
    }
    getStats() {
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
exports.LifeEngine = LifeEngine;
