import { EspionageMission, HostileTakeoverBid } from '../types';

export class CorporateWarfareEngine {
  private activeMissions: EspionageMission[] = [];
  private activeTakeovers: HostileTakeoverBid[] = [];
  private regulatoryHeat: number = 10; // 0 - 100
  private whistleblowerRisk: number = 0.02;

  public getHeat(): number {
    return this.regulatoryHeat;
  }

  public setHeat(heat: number) {
    this.regulatoryHeat = Math.max(0, Math.min(100, heat));
  }

  public launchEspionage(mission: Omit<EspionageMission, 'id' | 'status'>): EspionageMission {
    const newMission: EspionageMission = {
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
    } else if (isSuccess && isDetected) {
      newMission.status = 'DETECTED_SUCCESS';
      newMission.lootValue = mission.cost * 2.0;
      newMission.penaltyFine = mission.cost * 1.5;
      this.regulatoryHeat += 15;
    } else if (!isSuccess && isDetected) {
      newMission.status = 'DETECTED_FAILED';
      newMission.penaltyFine = mission.cost * 2.0;
      this.regulatoryHeat += 25;
    } else {
      newMission.status = 'DETECTED_FAILED';
    }

    this.activeMissions.push(newMission);
    return newMission;
  }

  public initiateHostileTakeover(
    acquirerCorpId: string,
    targetCorpId: string,
    targetCurrentStockPrice: number
  ): HostileTakeoverBid {
    const bid: HostileTakeoverBid = {
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

  public triggerPoisonPill(takeoverId: string): boolean {
    const bid = this.activeTakeovers.find(t => t.id === takeoverId);
    if (!bid || bid.status !== 'ACTIVE') return false;

    // Dilute acquirer by issuing new shares to other shareholders at 50% discount
    bid.isPoisonPillActivated = true;
    bid.ownershipPct = bid.ownershipPct * 0.45; // Severe dilution
    bid.status = 'DEFENDED';
    return true;
  }

  public stepDailyHeatDecay(): {
    heat: number;
    whistleblowerTriggered: boolean;
    secSubpoenaIssued: boolean;
  } {
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
    } else if (this.regulatoryHeat > 50) {
      this.whistleblowerRisk = 0.05;
      if (Math.random() < 0.02) {
        secSubpoenaIssued = true;
      }
    } else {
      this.whistleblowerRisk = 0.01;
    }

    return {
      heat: this.regulatoryHeat,
      whistleblowerTriggered,
      secSubpoenaIssued
    };
  }

  public getActiveMissions(): EspionageMission[] {
    return [...this.activeMissions];
  }

  public getActiveTakeovers(): HostileTakeoverBid[] {
    return [...this.activeTakeovers];
  }
}
