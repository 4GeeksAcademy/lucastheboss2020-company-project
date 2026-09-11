import {
  Facility,
  FacilityCity,
  FacilityCountry,
  LeadRequest,
  LeadStatus,
  LogisticsService,
  LogisticsServiceName,
  MonthlyShippingVolume,
  OperatingCountry,
  ProductType,
  TeamMember,
  TeamRole,
  ThreePLStatus,
} from "../types/models";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * Warning message shown when a lead has very low monthly shipping volume.
 * This is a business rule from TrackFlow - companies with < 100/month might not benefit from their services.
 */
export const LOW_VOLUME_WARNING =
  "For volumes under 100 monthly shipments, our services might not be the most efficient solution. Are you sure you want to continue?";

const SERVICE_NAMES: LogisticsServiceName[] = [
  "warehouse-management",
  "last-mile-delivery",
  "reverse-logistics",
];

const OPERATING_COUNTRIES: OperatingCountry[] = ["United States", "Spain", "Both", "Other"];

const PRODUCT_TYPES: ProductType[] = ["Fashion", "Electronics", "Cosmetics", "Food", "Other"];

const MONTHLY_VOLUMES: MonthlyShippingVolume[] = [
  "0-100",
  "101-500",
  "501-2000",
  "2000+",
  "Not sure",
];

const THREE_PL_STATUSES: ThreePLStatus[] = ["Yes", "No", "Evaluating options"];

const LEAD_STATUSES: LeadStatus[] = ["new", "qualified", "contacted", "not-fit"];

const FACILITY_CITIES: FacilityCity[] = ["Los Angeles", "Zaragoza"];

const FACILITY_COUNTRIES: FacilityCountry[] = ["United States", "Spain"];

const TEAM_ROLES: TeamRole[] = [
  "warehouse-operator",
  "route-coordinator",
  "account-manager",
  "support-specialist",
];

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string): boolean {
  return /^\+\d{1,3}[\d\s().-]{7,20}$/.test(value.trim());
}

/**
 * Validates a website URL format.
 * Accepts undefined/empty as valid (website is optional).
 * If provided, must start with http:// or https:// and have a valid hostname.
 */
function isValidWebsite(value: string | undefined): boolean {
  const website = value?.trim();

  if (!website) {
    return true;
  }

  if (!/^https?:\/\//i.test(website)) {
    return false;
  }

  try {
    const url = new URL(website);
    return url.hostname.includes(".");
  } catch (error) {
    return false;
  }
}

/**
 * Validates that a name contains at least first and last names (at least 2 words).
 */
function hasFirstAndLastName(value: string): boolean {
  return value.trim().split(/\s+/).filter(Boolean).length >= 2;
}

/**
 * Checks if a lead should trigger a low-volume warning.
 * Warning occurs when monthly volume is 0-100 AND a product type is selected.
 */
export function shouldWarnForLowVolume(lead: Pick<LeadRequest, "monthlyVolume" | "productType">): boolean {
  return lead.monthlyVolume === "0-100" && PRODUCT_TYPES.includes(lead.productType);
}

/**
 * Validates a LogisticsService entity.
 * Checks that service name is valid and monthly fee is positive.
 * 
 * @param service - The service to validate
 * @returns ValidationResult with errors array and valid flag
 */
export function validateLogisticsService(service: LogisticsService): ValidationResult {
  const errors: string[] = [];

  if (!SERVICE_NAMES.includes(service.name)) {
    errors.push(`LogisticsService ${service.id}: name must be a valid TrackFlow service.`);
  }

  if (service.baseMonthlyFee <= 0) {
    errors.push(`LogisticsService ${service.id}: baseMonthlyFee must be > 0.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a LeadRequest entity.
 * Comprehensive validation including:
 * - Email format and phone format validation
 * - Company name length (minimum 2 characters)
 * - Contact person name (first and last name required)
 * - All required fields populated with valid values
 * - Service references exist in the provided services array
 * - Generates warnings for edge cases (low volume)
 * 
 * @param lead - The lead request to validate
 * @param services - Available services to validate against
 * @returns ValidationResult with errors and optional warnings
 */
export function validateLeadRequest(
  lead: LeadRequest,
  services: LogisticsService[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (lead.companyName.trim().length < 2) {
    errors.push("Company name must have at least 2 characters");
  }

  if (!hasFirstAndLastName(lead.contactPerson)) {
    errors.push("Enter first and last name of contact");
  }

  if (!isValidEmail(lead.corporateEmail)) {
    errors.push("Enter a valid corporate email (example: name@company.com)");
  }

  if (!isValidPhone(lead.phone)) {
    errors.push("Phone must include country code (example: +1 213 555 0147)");
  }

  if (!isValidWebsite(lead.companyWebsite)) {
    errors.push("If you include website, it must be a valid URL");
  }

  if (!OPERATING_COUNTRIES.includes(lead.operatingCountry)) {
    errors.push("Select main operating country");
  }

  if (!PRODUCT_TYPES.includes(lead.productType)) {
    errors.push("Select the type of product you handle");
  }

  if (!MONTHLY_VOLUMES.includes(lead.monthlyVolume)) {
    errors.push("Select estimated monthly volume");
  }

  if (lead.servicesOfInterest.length === 0) {
    errors.push("Select at least one service of interest");
  }

  const serviceNames = new Set(services.map((service) => service.name));
  const unknownServices = lead.servicesOfInterest.filter((serviceName) => !serviceNames.has(serviceName));
  if (unknownServices.length > 0) {
    errors.push(`LeadRequest ${lead.id}: servicesOfInterest contains unknown services.`);
  }

  if (!THREE_PL_STATUSES.includes(lead.current3pl)) {
    errors.push("Indicate if you currently work with another logistics provider");
  }

  if ((lead.comments?.length ?? 0) > 500) {
    errors.push("Comments cannot exceed 500 characters (X remaining)");
  }

  if (!lead.privacyAccepted) {
    errors.push("You must accept the privacy policy to continue");
  }

  if (!LEAD_STATUSES.includes(lead.status)) {
    errors.push(`LeadRequest ${lead.id}: status must be valid.`);
  }

  if (shouldWarnForLowVolume(lead)) {
    warnings.push(LOW_VOLUME_WARNING);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates a Facility entity.
 * Checks that city and country are valid, at least one service is supported,
 * and at least one carrier is listed.
 * 
 * @param facility - The facility to validate
 * @returns ValidationResult with errors array and valid flag
 */
export function validateFacility(facility: Facility): ValidationResult {
  const errors: string[] = [];

  if (!FACILITY_CITIES.includes(facility.city)) {
    errors.push(`Facility ${facility.id}: city must be Los Angeles or Zaragoza.`);
  }

  if (!FACILITY_COUNTRIES.includes(facility.country)) {
    errors.push(`Facility ${facility.id}: country must be United States or Spain.`);
  }

  if (facility.services.length === 0) {
    errors.push(`Facility ${facility.id}: at least one service must be supported.`);
  }

  const invalidServices = facility.services.filter((serviceName) => !SERVICE_NAMES.includes(serviceName));
  if (invalidServices.length > 0) {
    errors.push(`Facility ${facility.id}: services must be valid TrackFlow services.`);
  }

  if (facility.carriers.length === 0) {
    errors.push(`Facility ${facility.id}: at least one carrier must be listed.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a TeamMember entity.
 * Checks that name has minimum length, role is valid, and country is valid.
 * 
 * @param member - The team member to validate
 * @returns ValidationResult with errors array and valid flag
 */
export function validateTeamMember(member: TeamMember): ValidationResult {
  const errors: string[] = [];

  if (member.name.trim().length < 2) {
    errors.push(`TeamMember ${member.id}: name must have at least 2 characters.`);
  }

  if (!TEAM_ROLES.includes(member.role)) {
    errors.push(`TeamMember ${member.id}: role must be a valid logistics role.`);
  }

  if (!FACILITY_COUNTRIES.includes(member.country)) {
    errors.push(`TeamMember ${member.id}: country must be United States or Spain.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
