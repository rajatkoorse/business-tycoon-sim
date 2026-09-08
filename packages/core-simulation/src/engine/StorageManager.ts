import { GameSimulation } from './GameSimulation';
import { SerializedGameState } from './SaveTypes';

const SAVE_KEY = 'EMPIRE_BUSINESS_SIM_SAVE_V1';

export class StorageManager {
  public static saveToLocalStorage(sim: GameSimulation): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const state = sim.exportState();
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
      return false;
    }
  }

  public static loadFromLocalStorage(sim: GameSimulation): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const state: SerializedGameState = JSON.parse(raw);
      return sim.importState(state);
    } catch (e) {
      console.warn('Failed to load from localStorage:', e);
      return false;
    }
  }

  public static clearSave(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      window.localStorage.removeItem(SAVE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  public static exportSaveFile(sim: GameSimulation): string {
    const state = sim.exportState();
    return JSON.stringify(state, null, 2);
  }

  public static importSaveFile(sim: GameSimulation, jsonStr: string): boolean {
    try {
      const state: SerializedGameState = JSON.parse(jsonStr);
      return sim.importState(state);
    } catch (e) {
      return false;
    }
  }
}