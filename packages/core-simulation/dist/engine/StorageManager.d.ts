import { GameSimulation } from './GameSimulation';
export declare class StorageManager {
    static saveToLocalStorage(sim: GameSimulation): boolean;
    static loadFromLocalStorage(sim: GameSimulation): boolean;
    static clearSave(): boolean;
    static exportSaveFile(sim: GameSimulation): string;
    static importSaveFile(sim: GameSimulation, jsonStr: string): boolean;
}
