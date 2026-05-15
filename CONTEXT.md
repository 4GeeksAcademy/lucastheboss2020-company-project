# Context, Inc.

## Company Overview

PAB Restoration is a specialized construction company dedicated to protecting and preserving building exteriors through expert masonry and waterproofing services. Founded and owned by a seasoned exterior waterproofing mason, the company brings hands‑on craftsmanship, technical precision, and decades of field experience to every project.

PAB Restoration focuses on three core services. pointing, caulking, and waterproofing, ensuring that residential, commercial, and multi‑unit properties remain structurally sound, weather‑resistant, and visually appealing. With a deep understanding of how water, time, and climate impact masonry structures, the company approaches each job with a commitment to long‑term durability and meticulous detail. 

## Product & Service

Brick and Stone Pointing
- Removal of deteriorated mortar
- Installation of new, properly matched mortar
- Structural reinforcement of masonry walls
- Improved appearance and extended building lifespan

Pointing restores the integrity of brick and stone surfaces, preventing water penetration and preserving the building’s original character.

Professional Caulking Services
- Joint sealing around windows, doors, and façade transitions
- Expansion joint caulking
- High‑performance sealants for long‑term flexibility and adhesion

Proper caulking prevents air leaks, water infiltration, and energy loss while maintaining a clean, finished exterior.

Exterior Waterproofing
- Above‑grade waterproof coatings
- Sealants and protective barriers
- Crack repair and water intrusion prevention
- Moisture‑control solutions for masonry, concrete, and façade systems

These services protect buildings from leaks, mold, and structural damage caused by moisture exposure.

Façade Cleaning and Surface Prep
- Power washing
- Efflorescence removal
- Surface preparation for coatings or repairs

Minor Masonry Repairs
- Brick replacement
- Patchwork
- Small‑scale restoration to maintain structural integrity

Commercial & Residential Service
- Multi‑unit buildings
- Commercial properties
- Townhomes and single‑family residences

## Data Model

1. Service
Represents one of the services the company offers.

Fields:

id: string

name: "pointing" | "caulking" | "waterproofing" | "cleaning" | "masonry-repair"

basePrice: number

2. JobOrder
Represents a job requested by a client.

Fields:

id: string

clientName: string

propertyType: "residential" | "commercial"

serviceId: string (references Service)

price: number

address: string

date: string

status: "pending" | "scheduled" | "completed"

3. Employee
Represents a worker.

Fields:

id: string

name: string

role: "mason" | "laborer" | "foreman"

hourlyRate: number

4. Assignment
Represents which employees are assigned to which job.

Fields:

id: string

jobId: string

employeeId: string

hoursWorked: number

## Validation Rules

1. Service

basePrice must be > 0

2. JobOrder

clientName cannot be empty

price must be >= the service’s basePrice

status must be one of the allowed values

propertyType must be "residential" or "commercial"

3. Employee

hourlyRate must be > 0

4. Assignment

hoursWorked must be >= 0

## Reports to Generate

1. Count jobs by service type

2. Count jobs by property type (residential vs commercial)

3. Total revenue from all jobs

4. Average job price

5. Total labor cost per job

6. Employees with the most hours worked