"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessSectorsEngine = void 0;
class BusinessSectorsEngine {
    // 1. FINTECH & CRYPTO MINING
    calculateCryptoDailyMetrics(rigs, btcPriceUSD, electricityRateKWh = 0.08) {
        let totalHashrateTH = 0;
        let totalPowerKw = 0;
        let totalCoins = 0;
        for (const rig of rigs) {
            if (rig.condition <= 0)
                continue;
            totalHashrateTH += rig.hashrateTH;
            totalPowerKw += rig.powerKw;
            totalCoins += rig.dailyCoinOutput * (rig.condition / 100);
            rig.condition = Math.max(0, rig.condition - 0.05); // Daily hardware wear
        }
        const dailyRevenueUSD = totalCoins * btcPriceUSD;
        const dailyPowerCostUSD = totalPowerKw * 24 * electricityRateKWh;
        const dailyNetProfitUSD = dailyRevenueUSD - dailyPowerCostUSD;
        return {
            totalHashrateTH,
            dailyRevenueUSD,
            dailyPowerCostUSD,
            dailyNetProfitUSD
        };
    }
    // 2. BIG TECH & FRONTIER AI CLUSTERS
    calculateAIClusterMetrics(clusters, powerGridCapacityMW = 50) {
        let totalPetaFlops = 0;
        let totalPowerDrawMW = 0;
        let monthlyMRR = 0;
        for (const cluster of clusters) {
            // Cluster scaling law: efficiency decays with log2 cluster size due to network interconnect
            const scalingEfficiency = 1.0 / (1.0 + 0.04 * Math.log2(Math.max(1, cluster.gpuCount)));
            const effectiveFlops = cluster.flopCapacityPetaFlops * scalingEfficiency;
            totalPetaFlops += effectiveFlops;
            totalPowerDrawMW += cluster.powerDrawMW;
            monthlyMRR += cluster.mrrGenerated;
        }
        const powerBottleneck = totalPowerDrawMW > powerGridCapacityMW;
        if (powerBottleneck) {
            monthlyMRR *= powerGridCapacityMW / totalPowerDrawMW;
        }
        return {
            totalPetaFlops,
            totalPowerDrawMW,
            monthlyMRR,
            powerBottleneck
        };
    }
    // 3. COMMERCIAL REAL ESTATE
    calculateRealEstateNOI(buildings, market10YRate = 0.045) {
        let totalPortfolioValuation = 0;
        let monthlyGrossRent = 0;
        let monthlyMortgageInterest = 0;
        for (const b of buildings) {
            // Cap rate = 10Y treasury + sector spread
            const capRate = market10YRate + 0.025 - (b.prestigeScore / 100) * 0.01;
            const buildingRent = b.floors * 15000 * b.monthlyRentalPerSqFt * b.occupancyRate;
            const maintenance = buildingRent * 0.15;
            const propertyTax = (b.valuation * 0.015) / 12;
            const buildingNOI = buildingRent - maintenance - propertyTax;
            // Real-world dynamic property valuation via capitalization rate
            b.valuation = Math.max(100000, buildingNOI * 12 / Math.max(0.02, capRate));
            totalPortfolioValuation += b.valuation;
            monthlyGrossRent += buildingRent;
            const mortgageInterest = (b.mortgageDebt * (market10YRate + 0.02)) / 12;
            monthlyMortgageInterest += mortgageInterest;
            // Occupancy transition (Markov lease rollover)
            if (Math.random() < 0.08) {
                b.occupancyRate = Math.min(1.0, Math.max(0.4, b.occupancyRate + (Math.random() * 0.1 - 0.05)));
            }
        }
        const monthlyNetOperatingIncome = monthlyGrossRent - monthlyMortgageInterest;
        return {
            totalPortfolioValuation,
            monthlyGrossRent,
            monthlyMortgageInterest,
            monthlyNetOperatingIncome
        };
    }
    // 4. INDUSTRIAL MANUFACTURING
    calculateFactoryDailyOutput(factories, marketUnitSellingPrices) {
        let totalUnitsProduced = 0;
        let totalRevenue = 0;
        let totalCOGS = 0;
        let rawMaterialShortage = false;
        for (const factory of factories) {
            const dailyTarget = factory.nameplateCapacityDaily;
            const rawNeeded = dailyTarget * 1.5;
            if (factory.rawMaterialStock < rawNeeded) {
                rawMaterialShortage = true;
            }
            const availableRawRatio = Math.min(1.0, factory.rawMaterialStock / Math.max(1, rawNeeded));
            factory.rawMaterialStock = Math.max(0, factory.rawMaterialStock - rawNeeded * availableRawRatio);
            // OEE = Availability * Performance * (1 - DefectRate)
            const effectiveDailyUnits = dailyTarget * factory.oeeEfficiency * (1.0 - factory.defectRate) * availableRawRatio;
            factory.currentInventory += effectiveDailyUnits;
            totalUnitsProduced += effectiveDailyUnits;
            const unitSellingPrice = marketUnitSellingPrices[factory.productType] || 250;
            const soldUnits = Math.min(factory.currentInventory, effectiveDailyUnits * 1.2);
            factory.currentInventory -= soldUnits;
            const unitCOGS = unitSellingPrice * 0.45;
            totalRevenue += soldUnits * unitSellingPrice;
            totalCOGS += soldUnits * unitCOGS;
        }
        return {
            totalUnitsProduced,
            totalRevenue,
            totalCOGS,
            rawMaterialShortage
        };
    }
    // 5. MEDIA & ENTERTAINMENT
    calculateMediaMonthlyRevenue(agencies) {
        let totalMonthlyImpressions = 0;
        let totalAdRevenue = 0;
        let totalSponsorshipRevenue = 0;
        let reputationBacklash = false;
        for (const a of agencies) {
            // Sensationalism boosts reach but risks sponsor abandonment if credibility drops
            const reachMultiplier = 1.0 + (a.sensationalismLevel / 100) * 0.8;
            const effectiveReach = a.monthlyReach * reachMultiplier;
            totalMonthlyImpressions += effectiveReach;
            const cpm = 18.5; // $18.50 per 1000 views
            const adRev = (effectiveReach / 1000) * cpm;
            totalAdRevenue += adRev;
            // Sponsor penalty if credibility < 40
            let sponsorMultiplier = a.credibilityScore / 100;
            if (a.credibilityScore < 40) {
                sponsorMultiplier *= 0.2;
                reputationBacklash = true;
            }
            totalSponsorshipRevenue += a.sponsorshipRevenueMonthly * sponsorMultiplier;
        }
        return {
            totalMonthlyImpressions,
            totalAdRevenue,
            totalSponsorshipRevenue,
            reputationBacklash
        };
    }
    // 6. UNDERGROUND GREY MARKETS
    calculateGreyMarketDaily(operations, currentHeatLevel, briberyLobbyBudgetMonthly) {
        let dailyIllicitCash = 0;
        let heatDelta = 0;
        let isRaidTriggered = false;
        let confiscatedLosses = 0;
        // Bribery reduces daily heat accumulation
        const briberyDecayBuff = Math.min(0.8, briberyLobbyBudgetMonthly / 100000);
        for (const op of operations) {
            const generated = op.capitalDeployed * op.dailyYieldRate;
            // Money laundering friction (15% - 40% based on heat)
            const launderingLossRate = Math.min(0.40, 0.15 + (currentHeatLevel / 100) * 0.25);
            const cleanCash = generated * (1.0 - launderingLossRate);
            dailyIllicitCash += cleanCash;
            heatDelta += op.heatGeneratedDaily * (1.0 - briberyDecayBuff);
            // Raid probability hazard curve
            const raidHazard = 1.0 / (1.0 + Math.exp(-0.08 * (currentHeatLevel - 70)));
            if (Math.random() < raidHazard && currentHeatLevel > 65) {
                isRaidTriggered = true;
                op.isUnderActiveInvestigation = true;
                confiscatedLosses += op.capitalDeployed * 0.6;
                op.capitalDeployed *= 0.4;
            }
        }
        return {
            dailyIllicitCash,
            heatDelta,
            isRaidTriggered,
            confiscatedLosses
        };
    }
}
exports.BusinessSectorsEngine = BusinessSectorsEngine;
