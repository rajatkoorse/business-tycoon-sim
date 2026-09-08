import { EspionageMission, HostileTakeoverBid } from '../types';
export declare class CorporateWarfareEngine {
    private activeMissions;
    private activeTakeovers;
    private regulatoryHeat;
    private whistleblowerRisk;
    getHeat(): number;
    setHeat(heat: number): void;
    launchEspionage(mission: Omit<EspionageMission, 'id' | 'status'>): EspionageMission;
    initiateHostileTakeover(acquirerCorpId: string, targetCorpId: string, targetCurrentStockPrice: number): HostileTakeoverBid;
    triggerPoisonPill(takeoverId: string): boolean;
    stepDailyHeatDecay(): {
        heat: number;
        whistleblowerTriggered: boolean;
        secSubpoenaIssued: boolean;
    };
    getActiveMissions(): EspionageMission[];
    getActiveTakeovers(): HostileTakeoverBid[];
}
