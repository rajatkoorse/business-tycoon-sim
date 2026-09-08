import { MacroState } from '../types';
export declare class MacroEngine {
    private state;
    private readonly transitionMatrix;
    private readonly regimeList;
    constructor();
    getState(): MacroState;
    stepQuarter(): MacroState;
}
