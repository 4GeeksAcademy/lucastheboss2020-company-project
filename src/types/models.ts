export type ServiceName =
  | "pointing"
  | "caulking"
  | "waterproofing"
  | "cleaning"
  | "masonry-repair";

export type PropertyType = "residential" | "commercial";

export type JobStatus = "pending" | "scheduled" | "completed";

export type EmployeeRole = "mason" | "laborer" | "foreman";

export interface Service {
  id: string;
  name: ServiceName;
  basePrice: number;
}

export interface JobOrder {
  id: string;
  clientName: string;
  propertyType: PropertyType;
  serviceId: string;
  price: number;
  address: string;
  date: string;
  status: JobStatus;
}

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  hourlyRate: number;
}

export interface Assignment {
  id: string;
  jobId: string;
  employeeId: string;
  hoursWorked: number;
}
