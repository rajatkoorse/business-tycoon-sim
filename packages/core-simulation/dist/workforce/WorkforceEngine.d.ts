import { Employee } from '../types';
export declare class WorkforceEngine {
    private employees;
    constructor();
    clearStaff(): void;
    getEmployees(): Employee[];
    hireEmployee(employee: Omit<Employee, 'id' | 'dailyOutput'>): Employee;
    stepDaily(hqPrestige?: number, perksTier?: number, activeScandals?: number): {
        totalSalariesDaily: number;
        aggregateProductivity: number;
        poachedEmployees: Employee[];
    };
}
