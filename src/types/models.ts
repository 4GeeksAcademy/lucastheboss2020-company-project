/** Valid LogisticsService names offered by TrackFlow */
export type LogisticsServiceName =
  | "warehouse-management"
  | "last-mile-delivery"
  | "reverse-logistics";

/** Countries where a lead operates (based on CONTEXT.md) */
export type OperatingCountry = "United States" | "Spain" | "Both" | "Other";

/** Product types that TrackFlow specializes in */
export type ProductType = "Fashion" | "Electronics" | "Cosmetics" | "Food" | "Other";

/** Estimated monthly shipping volume brackets */
export type MonthlyShippingVolume =
  | "0-100"
  | "101-500"
  | "501-2000"
  | "2000+"
  | "Not sure";

export type ThreePLStatus = "Yes" | "No" | "Evaluating options";

/** Status of a lead in TrackFlow's sales pipeline */
export type LeadStatus = "new" | "qualified" | "contacted" | "not-fit";

export type FacilityCity = "Los Angeles" | "Zaragoza";

export type FacilityCountry = "United States" | "Spain";

export type TeamRole =
  | "warehouse-operator"
  | "route-coordinator"
  | "account-manager"
  | "support-specialist";

/**
 * Represents a logistics service offered by TrackFlow.
 * @property id - Unique identifier
 * @property name - Service name (must match TrackFlow's offerings)
 * @property baseMonthlyFee - Base monthly fee (must be > 0)
 */
export interface LogisticsService {
  id: string;
  name: LogisticsServiceName;
  baseMonthlyFee: number;
}

/**
 * Represents a lead request submitted through the contact form.
 * All fields correspond to form inputs from CONTEXT.md's Contact section.
 * @property id - Unique identifier
 * @property companyName - Company name (min 2 characters)
 * @property contactPerson - Contact person (first and last name required)
 * @property corporateEmail - Valid corporate email
 * @property phone - Phone with country code
 * @property companyWebsite - Optional company website URL
 * @property operatingCountry - Primary operating country
 * @property productType - Type of products handled
 * @property monthlyVolume - Estimated monthly shipping volume
 * @property servicesOfInterest - Services interested in (at least 1 required)
 * @property current3pl - Whether they currently use another 3PL
 * @property comments - Optional additional comments (max 500 chars)
 * @property privacyAccepted - Must be true
 * @property status - Sales pipeline status
 */
export interface LeadRequest {
  id: string;
  companyName: string;
  contactPerson: string;
  corporateEmail: string;
  phone: string;
  companyWebsite?: string;
  operatingCountry: OperatingCountry;
  productType: ProductType;
  monthlyVolume: MonthlyShippingVolume;
  servicesOfInterest: LogisticsServiceName[];
  current3pl: ThreePLStatus;
  comments?: string;
  privacyAccepted: boolean;
  status: LeadStatus;
}

/**
 * Represents a TrackFlow warehouse facility.
 * Based on CONTEXT.md coverage: Los Angeles (US) and Zaragoza (Spain).
 * @property id - Unique identifier
 * @property city - Warehouse city
 * @property country - Country where facility operates
 * @property services - Services offered at this facility
 * @property carriers - Carrier partners (must have at least 1)
 */
export interface Facility {
  id: string;
  city: FacilityCity;
  country: FacilityCountry;
  services: LogisticsServiceName[];
  carriers: string[];
}

/**
 * Represents a TrackFlow team member.
 * From CONTEXT.md: TrackFlow has ~130 professionals across US and Spain.
 * @property id - Unique identifier
 * @property name - Full name (min 2 characters)
 * @property role - Job role in logistics operations
 * @property country - Country where team member is based
 */
export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  country: FacilityCountry;
}
