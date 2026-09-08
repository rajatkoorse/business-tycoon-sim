"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageManager = void 0;
const SAVE_KEY = 'EMPIRE_BUSINESS_SIM_SAVE_V1';
class StorageManager {
    static saveToLocalStorage(sim) {
        try {
            if (typeof window === 'undefined' || !window.localStorage)
                return false;
            const state = sim.exportState();
            window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
            return true;
        }
        catch (e) {
            console.warn('Failed to save to localStorage:', e);
            return false;
        }
    }
    static loadFromLocalStorage(sim) {
        try {
            if (typeof window === 'undefined' || !window.localStorage)
                return false;
            const raw = window.localStorage.getItem(SAVE_KEY);
            if (!raw)
                return false;
            const state = JSON.parse(raw);
            return sim.importState(state);
        }
        catch (e) {
            console.warn('Failed to load from localStorage:', e);
            return false;
        }
    }
    static clearSave() {
        try {
            if (typeof window === 'undefined' || !window.localStorage)
                return false;
            window.localStorage.removeItem(SAVE_KEY);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static exportSaveFile(sim) {
        const state = sim.exportState();
        return JSON.stringify(state, null, 2);
    }
    static importSaveFile(sim, jsonStr) {
        try {
            const state = JSON.parse(jsonStr);
            return sim.importState(state);
        }
        catch (e) {
            return false;
        }
    }
}
exports.StorageManager = StorageManager;
