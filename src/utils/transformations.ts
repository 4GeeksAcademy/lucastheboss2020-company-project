import {
  LeadRequest,
  LogisticsService,
  MonthlyShippingVolume,
  OperatingCountry,
  ProductType,
  ThreePLStatus,
} from "../types/models";
import { groupBy } from "./collections";
import { shouldWarnForLowVolume } from "./validations";

/**
 * Report type showing count of leads interested in each service.
 * Each service maps to a number representing how many leads selected it.
 */
export type LeadsByServiceReport = Record<LogisticsService["name"], number>;

/**
 * Counts leads by their service interests.
 * Each lead can be interested in multiple services, so a lead may be counted multiple times.
 * 
 * @param leads - Array of lead requests to analyze
 * @param services - Available services (used to initialize counts to 0 for each service)
 * @returns Report with service names as keys and lead counts as values
 * 
 * @example
 * const report = countLeadsByServiceInterest(leads, services);
 * // Returns: { "warehouse-management": 3, "last-mile-delivery": 4, "reverse-logistics": 2 }
 */
export function countLeadsByServiceInterest(
  leads: LeadRequest[],
  services: LogisticsService[]
): LeadsByServiceReport {
  const defaults = services.reduce((report, service) => {
    report[service.name] = 0;
    return report;
  }, {} as LeadsByServiceReport);

  for (const lead of leads) {
    for (const serviceName of lead.servicesOfInterest) {
      if (serviceName in defaults) {
        defaults[serviceName] += 1;
      }
    }
  }

  return defaults;
}

/**
 * Report type showing count of leads by operating country.
 */
export type LeadsByOperatingCountryReport = Record<OperatingCountry, number>;

/**
 * Counts leads by their operating country (United States, Spain, Both, Other).
 * 
 * @param leads - Array of lead requests to analyze
 * @returns Report with countries as keys and lead counts as values
 */
export function countLeadsByOperatingCountry(leads: LeadRequest[]): LeadsByOperatingCountryReport {
  const grouped = groupBy(leads, (lead) => lead.operatingCountry);

  return {
    "United States": grouped["United States"]?.length ?? 0,
    Spain: grouped.Spain?.length ?? 0,
    Both: grouped.Both?.length ?? 0,
    Other: grouped.Other?.length ?? 0,
  };
}

/**
 * Report type showing count of leads by product type.
 */
export type LeadsByProductTypeReport = Record<ProductType, number>;

/**
 * Counts leads by their product type (Fashion, Electronics, Cosmetics, Food, Other).
 * 
 * @param leads - Array of lead requests to analyze
 * @returns Report with product types as keys and lead counts as values
 */
export function countLeadsByProductType(leads: LeadRequest[]): LeadsByProductTypeReport {
  const grouped = groupBy(leads, (lead) => lead.productType);

  return {
    Fashion: grouped.Fashion?.length ?? 0,
    Electronics: grouped.Electronics?.length ?? 0,
    Cosmetics: grouped.Cosmetics?.length ?? 0,
    Food: grouped.Food?.length ?? 0,
    Other: grouped.Other?.length ?? 0,
  };
}

/**
 * Report type showing count of leads by monthly volume bracket.
 */
export type LeadsByMonthlyVolumeReport = Record<MonthlyShippingVolume, number>;

/**
 * Counts leads by their estimated monthly shipping volume bracket.
 * 
 * @param leads - Array of lead requests to analyze
 * @returns Report with volume brackets as keys and lead counts as values
 */
export function countLeadsByMonthlyVolume(leads: LeadRequest[]): LeadsByMonthlyVolumeReport {
  const grouped = groupBy(leads, (lead) => lead.monthlyVolume);

  return {
    "0-100": grouped["0-100"]?.length ?? 0,
    "101-500": grouped["101-500"]?.length ?? 0,
    "501-2000": grouped["501-2000"]?.length ?? 0,
    "2000+": grouped["2000+"]?.length ?? 0,
    "Not sure": grouped["Not sure"]?.length ?? 0,
  };
}

/**
 * Report type showing count of leads by their 3PL provider status.
 */
export type LeadsByThreePLStatusReport = Record<ThreePLStatus, number>;

/**
 * Counts leads by whether they currently work with another 3PL provider.
 * 
 * @param leads - Array of lead requests to analyze
 * @returns Report with 3PL statuses as keys and lead counts as values
 */
export function countLeadsByThreePLStatus(leads: LeadRequest[]): LeadsByThreePLStatusReport {
  const grouped = groupBy(leads, (lead) => lead.current3pl);

  return {
    Yes: grouped.Yes?.length ?? 0,
    No: grouped.No?.length ?? 0,
    "Evaluating options": grouped["Evaluating options"]?.length ?? 0,
  };
}

/**
 * Filters leads that should trigger the low-volume warning.
 * These are leads with monthly volume of 0-100 with a specific product type.
 * 
 * @param leads - Array of lead requests to analyze
 * @returns Array of leads that trigger the low-volume warning
 */
export function lowVolumeWarningLeads(leads: LeadRequest[]): LeadRequest[] {
  return leads.filter(shouldWarnForLowVolume);
}
