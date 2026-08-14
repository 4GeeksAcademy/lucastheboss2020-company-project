import type { Assignment, Employee, JobOrder, Service } from "../../../../src/types/models";
import {
  validateAssignment,
  validateEmployee,
  validateJobOrder,
  validateService,
} from "../../../../src/utils/validations";
import {
  averageJobPrice,
  countJobsByPropertyType,
  countJobsByServiceType,
  employeesWithMostHoursWorked,
  totalLaborCostPerJob,
  totalRevenue,
} from "../../../../src/utils/transformations";

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

export default function BackofficeHome() {
  const serviceChecks = services.map(validateService);
  const jobChecks = jobs.map((job) => validateJobOrder(job, services));
  const employeeChecks = employees.map(validateEmployee);
  const assignmentChecks = assignments.map((assignment) =>
    validateAssignment(assignment, jobs, employees)
  );

  const totalErrors = [serviceChecks, jobChecks, employeeChecks, assignmentChecks]
    .flat()
    .reduce((acc, result) => acc + result.errors.length, 0);

  const byService = countJobsByServiceType(jobs, services);
  const byProperty = countJobsByPropertyType(jobs);
  const revenue = totalRevenue(jobs);
  const average = averageJobPrice(jobs);
  const laborCost = totalLaborCostPerJob(assignments, employees);
  const topHours = employeesWithMostHoursWorked(assignments, employees);

  return (
    <main>
      <h1>PAB Backoffice</h1>
      <p>Operational view with Milestone 2 logic rendered in UI.</p>

      <section className="panel">
        <h2>Validation Status</h2>
        <p className={totalErrors === 0 ? "good" : "bad"}>
          {totalErrors === 0
            ? "All current sample records pass validation."
            : `Validation issues found: ${totalErrors}`}
        </p>
      </section>

      <section className="panel">
        <h2>Core Metrics</h2>
        <div className="grid">
          <article className="stat">
            <h3>Total Revenue</h3>
            <strong>${revenue.toFixed(2)}</strong>
          </article>
          <article className="stat">
            <h3>Average Job Price</h3>
            <strong>${average.toFixed(2)}</strong>
          </article>
          <article className="stat">
            <h3>Jobs Count</h3>
            <strong>{jobs.length}</strong>
          </article>
        </div>
      </section>

      <section className="panel">
        <h2>Jobs by Service</h2>
        <ul>
          {Object.entries(byService).map(([name, count]) => (
            <li key={name}>
              {name}: {count}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Jobs by Property Type</h2>
        <ul>
          <li>Residential: {byProperty.residential}</li>
          <li>Commercial: {byProperty.commercial}</li>
        </ul>
      </section>

      <section className="panel">
        <h2>Total Labor Cost per Job</h2>
        <ul>
          {laborCost.map((entry) => (
            <li key={entry.jobId}>
              {entry.jobId}: ${entry.laborCost.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Employees With Most Hours Worked</h2>
        <ul>
          {topHours.map((entry) => (
            <li key={entry.employeeId}>
              {entry.employeeName}: {entry.totalHoursWorked} hours
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
