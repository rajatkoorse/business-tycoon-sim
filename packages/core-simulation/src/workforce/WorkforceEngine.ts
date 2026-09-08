import { CSuiteRole, Employee } from '../types';

export class WorkforceEngine {
  private employees: Employee[] = [];

  constructor() {
    // Starts empty for zero-to-hero progression
  }

  public clearStaff() {
    this.employees = [];
  }

  public getEmployees(): Employee[] {
    return [...this.employees];
  }

  public hireEmployee(employee: Omit<Employee, 'id' | 'dailyOutput'>): Employee {
    const newEmp: Employee = {
      id: 'EMP-' + Math.random().toString(36).substr(2, 7).toUpperCase(),
      dailyOutput: 80,
      ...employee
    };
    this.employees.push(newEmp);
    return newEmp;
  }

  public stepDaily(
    hqPrestige: number = 80,
    perksTier: number = 2,
    activeScandals: number = 0
  ): {
    totalSalariesDaily: number;
    aggregateProductivity: number;
    poachedEmployees: Employee[];
  } {
    let totalSalariesDaily = 0;
    let totalOutput = 0;
    const poachedEmployees: Employee[] = [];

    for (let i = this.employees.length - 1; i >= 0; i--) {
      const emp = this.employees[i];
      totalSalariesDaily += emp.salary / 365;

      // 1. Burnout Evolution
      const hoursFactor = Math.pow(emp.dailyHours / 8.0, 2);
      const dB = 0.08 * hoursFactor - 0.04 * perksTier - 0.02 * (hqPrestige / 100);
      emp.psych.burnout = Math.max(0, Math.min(100, emp.psych.burnout + dB));

      // 2. Morale Evolution
      const dM = 0.03 * (hqPrestige / 100) - 0.05 * (emp.psych.burnout / 100) - 0.1 * activeScandals;
      emp.psych.morale = Math.max(0, Math.min(100, emp.psych.morale + dM));

      // 3. Effective Daily Output
      const skillAvg =
        (emp.skills.tech +
          emp.skills.finance +
          emp.skills.ops +
          emp.skills.charisma +
          emp.skills.stealth) /
        5;

      emp.dailyOutput =
        skillAvg *
        (emp.psych.morale / 100) *
        (1.0 - Math.pow(emp.psych.burnout / 100, 2)) *
        (1.0 + (hqPrestige / 100) * 0.2);

      totalOutput += emp.dailyOutput;

      // 4. Poaching Risk
      if (Math.random() < 0.005) {
        const poachUtility =
          0.3 * (emp.psych.greed / 100) +
          0.4 * (emp.psych.burnout / 100) -
          0.5 * (emp.psych.loyalty / 100);

        if (poachUtility > 0.15) {
          poachedEmployees.push(emp);
          this.employees.splice(i, 1);
        }
      }
    }

    const aggregateProductivity =
      this.employees.length > 0 ? totalOutput / this.employees.length : 0;

    return {
      totalSalariesDaily,
      aggregateProductivity,
      poachedEmployees
    };
  }
}
