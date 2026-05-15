import { Assignment, Employee, JobOrder, Service } from "./types/models";
import { filterBy, groupBy, sortBy } from "./utils/collections";
import { binarySearch, linearSearch } from "./utils/search";
import {
  validateAssignment,
  validateEmployee,
  validateJobOrder,
  validateService,
} from "./utils/validations";
import {
  averageJobPrice,
  countJobsByPropertyType,
  countJobsByServiceType,
  employeesWithMostHoursWorked,
  totalLaborCostPerJob,
  totalRevenue,
} from "./utils/transformations";

const services: Service[] = [
  { id: "svc-1", name: "pointing", basePrice: 1500 },
  { id: "svc-2", name: "caulking", basePrice: 900 },
  { id: "svc-3", name: "waterproofing", basePrice: 2000 },
  { id: "svc-4", name: "cleaning", basePrice: 500 },
  { id: "svc-5", name: "masonry-repair", basePrice: 1200 },
];

const jobs: JobOrder[] = [
  {
    id: "job-1",
    clientName: "Apex Realty",
    propertyType: "commercial",
    serviceId: "svc-3",
    price: 3200,
    address: "101 Main St",
    date: "2026-05-01",
    status: "scheduled",
  },
  {
    id: "job-2",
    clientName: "Sarah Johnson",
    propertyType: "residential",
    serviceId: "svc-1",
    price: 1700,
    address: "22 Pine Ave",
    date: "2026-05-04",
    status: "pending",
  },
  {
    id: "job-3",
    clientName: "Maple Condos",
    propertyType: "commercial",
    serviceId: "svc-2",
    price: 1250,
    address: "88 Elm Rd",
    date: "2026-05-07",
    status: "completed",
  },
  {
    id: "job-4",
    clientName: "Luis Gomez",
    propertyType: "residential",
    serviceId: "svc-5",
    price: 1450,
    address: "9 Cedar Ln",
    date: "2026-05-09",
    status: "scheduled",
  },
];

const employees: Employee[] = [
  { id: "emp-1", name: "Maria", role: "foreman", hourlyRate: 55 },
  { id: "emp-2", name: "Devon", role: "mason", hourlyRate: 45 },
  { id: "emp-3", name: "Jules", role: "laborer", hourlyRate: 30 },
];

const assignments: Assignment[] = [
  { id: "asg-1", jobId: "job-1", employeeId: "emp-1", hoursWorked: 6 },
  { id: "asg-2", jobId: "job-1", employeeId: "emp-2", hoursWorked: 8 },
  { id: "asg-3", jobId: "job-2", employeeId: "emp-2", hoursWorked: 7 },
  { id: "asg-4", jobId: "job-3", employeeId: "emp-3", hoursWorked: 9 },
  { id: "asg-5", jobId: "job-4", employeeId: "emp-1", hoursWorked: 5 },
  { id: "asg-6", jobId: "job-4", employeeId: "emp-3", hoursWorked: 5 },
];

function runSearchExamples(): void {
  const pendingJob = linearSearch(jobs, (job) => job.status === "pending");
  console.log("linearSearch pending job:", pendingJob);

  const jobsSortedById = sortBy(jobs, (job) => job.id);
  const targetJob = binarySearch(jobsSortedById, "job-3", (job) => job.id);
  console.log("binarySearch by id job-3:", targetJob);
}

function runCollectionExamples(): void {
  const commercialJobs = filterBy(jobs, (job) => job.propertyType === "commercial");
  console.log("filterBy commercial jobs:", commercialJobs);

  const jobsByHighestPrice = sortBy(jobs, (job) => job.price, "desc");
  console.log("sortBy price desc:", jobsByHighestPrice);

  const jobsGroupedByStatus = groupBy(jobs, (job) => job.status);
  console.log("groupBy status:", jobsGroupedByStatus);
}

function runValidationExamples(): void {
  console.log("validateService:", services.map(validateService));
  console.log("validateJobOrder:", jobs.map((job) => validateJobOrder(job, services)));
  console.log("validateEmployee:", employees.map(validateEmployee));
  console.log(
    "validateAssignment:",
    assignments.map((assignment) => validateAssignment(assignment, jobs, employees))
  );
}

function runTransformationExamples(): void {
  console.log("countJobsByServiceType:", countJobsByServiceType(jobs, services));
  console.log("countJobsByPropertyType:", countJobsByPropertyType(jobs));
  console.log("totalRevenue:", totalRevenue(jobs));
  console.log("averageJobPrice:", averageJobPrice(jobs));
  console.log("totalLaborCostPerJob:", totalLaborCostPerJob(assignments, employees));
  console.log(
    "employeesWithMostHoursWorked:",
    employeesWithMostHoursWorked(assignments, employees)
  );
}

function runDemo(): void {
  runSearchExamples();
  runCollectionExamples();
  runValidationExamples();
  runTransformationExamples();
}

runDemo();
