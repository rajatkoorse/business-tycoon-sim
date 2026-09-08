"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateWarfareEngine = void 0;
class CorporateWarfareEngine {
    activeMissions = [];
    activeTakeovers = [];
    regulatoryHeat = 10; // 0 - 100
    whistleblowerRisk = 0.02;
    getHeat() {
        return this.regulatoryHeat;
    }
    setHeat(heat) {
        this.regulatoryHeat = Math.max(0, Math.min(100, heat));
    }
    launchEspionage(mission) {
        const newMission = {
            id: 'ESP-' + Math.random().toString(36).substr(2, 7).toUpperCase(),
            status: 'PENDING',
            ...mission
        };
        // Calculate probability of success & detection
        const successRate = 0.4 + (mission.agentSkill / 100) * 0.45;
        const isSuccess = Math.random() < successRate;
        const detectionRisk = 0.35 - (mission.agentSkill / 100) * 0.2;
        const isDetected = Math.random() < detectionRisk;
        if (isSuccess && !isDetected) {
            newMission.status = 'SUCCESS';
            newMission.lootValue = mission.cost * (2.5 + Math.random() * 2.0);
        }
        else if (isSuccess && isDetected) {
            newMission.status = 'DETECTED_SUCCESS';
            newMission.lootValue = mission.cost * 2.0;
            newMission.penaltyFine = mission.cost * 1.5;
            this.regulatoryHeat += 15;
        }
        else if (!isSuccess && isDetected) {
            newMission.status = 'DETECTED_FAILED';
            newMission.penaltyFine = mission.cost * 2.0;
            this.regulatoryHeat += 25;
        }
        else {
            newMission.status = 'DETECTED_FAILED';
        }
        this.activeMissions.push(newMission);
        return newMission;
    }
    initiateHostileTakeover(acquirerCorpId, targetCorpId, targetCurrentStockPrice) {
        const bid = {
            id: 'TAKEOVER-' + Math.random().toString(36).substr(2, 7).toUpperCase(),
            acquirerCorpId,
            targetCorpId,
            sharesOwned: 100000,
            ownershipPct: 15.0,
            tenderOfferPrice: targetCurrentStockPrice * 1.3, // 30% premium
            isPoisonPillActivated: false,
            deadlineQuarters: 4,
            status: 'ACTIVE'
        };
        this.activeTakeovers.push(bid);
        return bid;
    }
    triggerPoisonPill(takeoverId) {
        const bid = this.activeTakeovers.find(t => t.id === takeoverId);
        if (!bid || bid.status !== 'ACTIVE')
            return false;
        // Dilute acquirer by issuing new shares to other shareholders at 50% discount
        bid.isPoisonPillActivated = true;
        bid.ownershipPct = bid.ownershipPct * 0.45; // Severe dilution
        bid.status = 'DEFENDED';
        return true;
    }
    stepDailyHeatDecay() {
        // Natural heat decay
        this.regulatoryHeat = Math.max(0, this.regulatoryHeat - 0.2);
        let whistleblowerTriggered = false;
        let secSubpoenaIssued = false;
        if (this.regulatoryHeat > 75) {
            this.whistleblowerRisk = 0.15;
            if (Math.random() < 0.05) {
                whistleblowerTriggered = true;
                secSubpoenaIssued = true;
            }
        }
        else if (this.regulatoryHeat > 50) {
            this.whistleblowerRisk = 0.05;
            if (Math.random() < 0.02) {
                secSubpoenaIssued = true;
            }
        }
        else {
            this.whistleblowerRisk = 0.01;
        }
        return {
            heat: this.regulatoryHeat,
            whistleblowerTriggered,
            secSubpoenaIssued
        };
    }
    getActiveMissions() {
        return [...this.activeMissions];
    }
    getActiveTakeovers() {
        return [...this.activeTakeovers];
    }
}
exports.CorporateWarfareEngine = CorporateWarfareEngine;
