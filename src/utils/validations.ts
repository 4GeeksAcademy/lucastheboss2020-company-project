import {
  Assignment,
  Employee,
  JobOrder,
  PropertyType,
  Service,
  ServiceName,
  JobStatus,
} from "../types/models";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const SERVICE_NAMES: ServiceName[] = [
  "pointing",
  "caulking",
  "waterproofing",
  "cleaning",
  "masonry-repair",
];

const PROPERTY_TYPES: PropertyType[] = ["residential", "commercial"];

const JOB_STATUSES: JobStatus[] = ["pending", "scheduled", "completed"];

export function validateService(service: Service): ValidationResult {
  const errors: string[] = [];

  if (!SERVICE_NAMES.includes(service.name)) {
    errors.push(`Service ${service.id}: name must be a valid service type.`);
  }

  if (service.basePrice <= 0) {
    errors.push(`Service ${service.id}: basePrice must be > 0.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateJobOrder(
  job: JobOrder,
  services: Service[]
): ValidationResult {
  const errors: string[] = [];

  if (job.clientName.trim().length === 0) {
    errors.push(`JobOrder ${job.id}: clientName cannot be empty.`);
  }

  if (!PROPERTY_TYPES.includes(job.propertyType)) {
    errors.push(`JobOrder ${job.id}: propertyType must be valid.`);
  }

  if (!JOB_STATUSES.includes(job.status)) {
    errors.push(`JobOrder ${job.id}: status must be valid.`);
  }

  const service = services.find((item) => item.id === job.serviceId);
  if (!service) {
    errors.push(`JobOrder ${job.id}: serviceId does not reference an existing service.`);
  } else if (job.price < service.basePrice) {
    errors.push(
      `JobOrder ${job.id}: price must be >= the service basePrice (${service.basePrice}).`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateEmployee(employee: Employee): ValidationResult {
  const errors: string[] = [];

  if (employee.hourlyRate <= 0) {
    errors.push(`Employee ${employee.id}: hourlyRate must be > 0.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateAssignment(
  assignment: Assignment,
  jobs: JobOrder[],
  employees: Employee[]
): ValidationResult {
  const errors: string[] = [];

  if (assignment.hoursWorked < 0) {
    errors.push(`Assignment ${assignment.id}: hoursWorked must be >= 0.`);
  }

  const jobExists = jobs.some((job) => job.id === assignment.jobId);
  if (!jobExists) {
    errors.push(`Assignment ${assignment.id}: jobId does not reference an existing job.`);
  }

  const employeeExists = employees.some(
    (employee) => employee.id === assignment.employeeId
  );
  if (!employeeExists) {
    errors.push(
      `Assignment ${assignment.id}: employeeId does not reference an existing employee.`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
