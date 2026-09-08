"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacroEngine = void 0;
const types_1 = require("../types");
class MacroEngine {
    state;
    // Markov Transition Matrix [Boom, Expansion, Stagflation, Recession, Depression]
    transitionMatrix = [
        [0.75, 0.15, 0.05, 0.04, 0.01], // BOOM
        [0.10, 0.70, 0.10, 0.08, 0.02], // EXPANSION
        [0.05, 0.10, 0.65, 0.15, 0.05], // STAGFLATION
        [0.02, 0.15, 0.10, 0.65, 0.08], // RECESSION
        [0.01, 0.04, 0.05, 0.20, 0.70] // DEPRESSION
    ];
    regimeList = [
        types_1.MacroRegime.BOOM,
        types_1.MacroRegime.EXPANSION,
        types_1.MacroRegime.STAGFLATION,
        types_1.MacroRegime.RECESSION,
        types_1.MacroRegime.DEPRESSION
    ];
    constructor() {
        this.state = {
            regime: types_1.MacroRegime.EXPANSION,
            centralBankRate: 0.045, // 4.5%
            targetInflation: 0.020, // 2.0%
            currentInflation: 0.024,
            outputGap: 0.005,
            gdpGrowthRate: 0.028,
            marketVolatility: 0.16,
            sentimentScore: 72,
            quarter: 1,
            year: 2026
        };
    }
    getState() {
        return { ...this.state };
    }
    stepQuarter() {
        this.state.quarter += 1;
        if (this.state.quarter > 4) {
            this.state.quarter = 1;
            this.state.year += 1;
        }
        // 1. Business Cycle Markov Regime Transition
        const currentRegimeIdx = this.regimeList.indexOf(this.state.regime);
        const row = this.transitionMatrix[currentRegimeIdx];
        const rand = Math.random();
        let cumulative = 0;
        for (let i = 0; i < row.length; i++) {
            cumulative += row[i];
            if (rand <= cumulative) {
                this.state.regime = this.regimeList[i];
                break;
            }
        }
        // 2. Regime-driven economic shifts
        switch (this.state.regime) {
            case types_1.MacroRegime.BOOM:
                this.state.gdpGrowthRate = 0.045 + (Math.random() * 0.02 - 0.01);
                this.state.outputGap = 0.025;
                this.state.marketVolatility = 0.12;
                this.state.sentimentScore = 90;
                break;
            case types_1.MacroRegime.EXPANSION:
                this.state.gdpGrowthRate = 0.028 + (Math.random() * 0.01 - 0.005);
                this.state.outputGap = 0.005;
                this.state.marketVolatility = 0.15;
                this.state.sentimentScore = 70;
                break;
            case types_1.MacroRegime.STAGFLATION:
                this.state.gdpGrowthRate = -0.005 + (Math.random() * 0.01 - 0.005);
                this.state.outputGap = -0.015;
                this.state.currentInflation = 0.065 + Math.random() * 0.02;
                this.state.marketVolatility = 0.28;
                this.state.sentimentScore = 40;
                break;
            case types_1.MacroRegime.RECESSION:
                this.state.gdpGrowthRate = -0.025 + (Math.random() * 0.01 - 0.005);
                this.state.outputGap = -0.035;
                this.state.marketVolatility = 0.32;
                this.state.sentimentScore = 30;
                break;
            case types_1.MacroRegime.DEPRESSION:
                this.state.gdpGrowthRate = -0.060 + (Math.random() * 0.02 - 0.01);
                this.state.outputGap = -0.070;
                this.state.marketVolatility = 0.45;
                this.state.sentimentScore = 15;
                break;
        }
        // 3. Phillips Curve Inflation Update
        if (this.state.regime !== types_1.MacroRegime.STAGFLATION) {
            const inflationNoise = (Math.random() - 0.5) * 0.005;
            this.state.currentInflation = Math.max(-0.01, 0.02 + 0.35 * this.state.outputGap + inflationNoise);
        }
        // 4. Central Bank Taylor Rule
        // i = r* + pi + 1.5*(pi - pi*) + 0.5*outputGap
        const rStar = 0.015; // 1.5% neutral real rate
        const phiPi = 1.5;
        const phiY = 0.5;
        const taylorTarget = rStar +
            this.state.currentInflation +
            phiPi * (this.state.currentInflation - this.state.targetInflation) +
            phiY * this.state.outputGap;
        // Inertial smoothing
        this.state.centralBankRate = Math.max(0.0025, 0.65 * this.state.centralBankRate + 0.35 * Math.max(0, taylorTarget));
        return { ...this.state };
    }
}
exports.MacroEngine = MacroEngine;
