import { AIComputeCluster, CommercialBuilding, CryptoMiningRig, FactoryUnit, GreyMarketOp, MediaAgency } from '../types';
export declare class BusinessSectorsEngine {
    calculateCryptoDailyMetrics(rigs: CryptoMiningRig[], btcPriceUSD: number, electricityRateKWh?: number): {
        totalHashrateTH: number;
        dailyRevenueUSD: number;
        dailyPowerCostUSD: number;
        dailyNetProfitUSD: number;
    };
    calculateAIClusterMetrics(clusters: AIComputeCluster[], powerGridCapacityMW?: number): {
        totalPetaFlops: number;
        totalPowerDrawMW: number;
        monthlyMRR: number;
        powerBottleneck: boolean;
    };
    calculateRealEstateNOI(buildings: CommercialBuilding[], market10YRate?: number): {
        totalPortfolioValuation: number;
        monthlyGrossRent: number;
        monthlyMortgageInterest: number;
        monthlyNetOperatingIncome: number;
    };
    calculateFactoryDailyOutput(factories: FactoryUnit[], marketUnitSellingPrices: Record<string, number>): {
        totalUnitsProduced: number;
        totalRevenue: number;
        totalCOGS: number;
        rawMaterialShortage: boolean;
    };
    calculateMediaMonthlyRevenue(agencies: MediaAgency[]): {
        totalMonthlyImpressions: number;
        totalAdRevenue: number;
        totalSponsorshipRevenue: number;
        reputationBacklash: boolean;
    };
    calculateGreyMarketDaily(operations: GreyMarketOp[], currentHeatLevel: number, briberyLobbyBudgetMonthly: number): {
        dailyIllicitCash: number;
        heatDelta: number;
        isRaidTriggered: boolean;
        confiscatedLosses: number;
    };
}
