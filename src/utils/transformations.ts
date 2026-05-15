import { Assignment, Employee, JobOrder, Service } from "../types/models";
import { groupBy } from "./collections";

export type JobsByServiceReport = Record<Service["name"], number>;

export function countJobsByServiceType(
  jobs: JobOrder[],
  services: Service[]
): JobsByServiceReport {
  const defaults: JobsByServiceReport = {
    pointing: 0,
    caulking: 0,
    waterproofing: 0,
    cleaning: 0,
    "masonry-repair": 0,
  };

  const serviceById = new Map(services.map((service) => [service.id, service.name]));

  for (const job of jobs) {
    const serviceName = serviceById.get(job.serviceId);
    if (serviceName) {
      defaults[serviceName] += 1;
    }
  }

  return defaults;
}

export type JobsByPropertyTypeReport = Record<"residential" | "commercial", number>;

export function countJobsByPropertyType(jobs: JobOrder[]): JobsByPropertyTypeReport {
  const grouped = groupBy(jobs, (job) => job.propertyType);

  return {
    residential: grouped.residential?.length ?? 0,
    commercial: grouped.commercial?.length ?? 0,
  };
}

export function totalRevenue(jobs: JobOrder[]): number {
  return jobs.reduce((sum, job) => sum + job.price, 0);
}

export function averageJobPrice(jobs: JobOrder[]): number {
  if (jobs.length === 0) {
    return 0;
  }

  return totalRevenue(jobs) / jobs.length;
}

export interface LaborCostPerJob {
  jobId: string;
  laborCost: number;
}

export function totalLaborCostPerJob(
  assignments: Assignment[],
  employees: Employee[]
): LaborCostPerJob[] {
  const employeeRateById = new Map(
    employees.map((employee) => [employee.id, employee.hourlyRate])
  );

  const costsByJob = new Map<string, number>();

  for (const assignment of assignments) {
    const hourlyRate = employeeRateById.get(assignment.employeeId);
    if (hourlyRate === undefined) {
      continue;
    }

    const current = costsByJob.get(assignment.jobId) ?? 0;
    const laborCost = assignment.hoursWorked * hourlyRate;
    costsByJob.set(assignment.jobId, current + laborCost);
  }

  return Array.from(costsByJob.entries()).map(([jobId, laborCost]) => ({
    jobId,
    laborCost,
  }));
}

export interface EmployeeHours {
  employeeId: string;
  employeeName: string;
  totalHoursWorked: number;
}

export function employeesWithMostHoursWorked(
  assignments: Assignment[],
  employees: Employee[]
): EmployeeHours[] {
  const hoursByEmployee = new Map<string, number>();

  for (const assignment of assignments) {
    const current = hoursByEmployee.get(assignment.employeeId) ?? 0;
    hoursByEmployee.set(assignment.employeeId, current + assignment.hoursWorked);
  }

  if (hoursByEmployee.size === 0) {
    return [];
  }

  const maxHours = Math.max(...Array.from(hoursByEmployee.values()));
  const employeeById = new Map(employees.map((employee) => [employee.id, employee]));

  return Array.from(hoursByEmployee.entries())
    .filter(([, totalHoursWorked]) => totalHoursWorked === maxHours)
    .map(([employeeId, totalHoursWorked]) => ({
      employeeId,
      employeeName: employeeById.get(employeeId)?.name ?? "Unknown",
      totalHoursWorked,
    }));
}
