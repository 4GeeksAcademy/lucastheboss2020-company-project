import { Facility, LeadRequest, LogisticsService, TeamMember } from "./types/models";
import { filterBy, groupBy, sortBy } from "./utils/collections";
import { binarySearch, linearSearch } from "./utils/search";
import {
  validateFacility,
  validateLeadRequest,
  validateLogisticsService,
  validateTeamMember,
} from "./utils/validations";
import {
  countLeadsByMonthlyVolume,
  countLeadsByOperatingCountry,
  countLeadsByProductType,
  countLeadsByServiceInterest,
  countLeadsByThreePLStatus,
  lowVolumeWarningLeads,
} from "./utils/transformations";

const services: LogisticsService[] = [
  { id: "svc-1", name: "warehouse-management", baseMonthlyFee: 2500 },
  { id: "svc-2", name: "last-mile-delivery", baseMonthlyFee: 1800 },
  { id: "svc-3", name: "reverse-logistics", baseMonthlyFee: 1500 },
];

const leads: LeadRequest[] = [
  {
    id: "lead-1",
    companyName: "Nova Fashion Co",
    contactPerson: "Elena Morris",
    corporateEmail: "elena@novafashion.com",
    phone: "+1 213 555 0198",
    companyWebsite: "https://novafashion.com",
    operatingCountry: "United States",
    productType: "Fashion",
    monthlyVolume: "501-2000",
    servicesOfInterest: ["warehouse-management", "last-mile-delivery"],
    current3pl: "Evaluating options",
    comments: "Launching a West Coast fulfillment operation next quarter.",
    privacyAccepted: true,
    status: "qualified",
  },
  {
    id: "lead-2",
    companyName: "CircuitBox",
    contactPerson: "Miguel Santos",
    corporateEmail: "miguel@circuitbox.es",
    phone: "+34 976 123 777",
    companyWebsite: "https://circuitbox.es",
    operatingCountry: "Spain",
    productType: "Electronics",
    monthlyVolume: "101-500",
    servicesOfInterest: ["reverse-logistics"],
    current3pl: "Yes",
    privacyAccepted: true,
    status: "contacted",
  },
  {
    id: "lead-3",
    companyName: "GlowCart",
    contactPerson: "Aisha Patel",
    corporateEmail: "aisha@glowcart.com",
    phone: "+1 310 555 0142",
    operatingCountry: "Both",
    productType: "Cosmetics",
    monthlyVolume: "2000+",
    servicesOfInterest: ["warehouse-management", "last-mile-delivery", "reverse-logistics"],
    current3pl: "No",
    privacyAccepted: true,
    status: "new",
  },
  {
    id: "lead-4",
    companyName: "Small Batch Goods",
    contactPerson: "Laura Chen",
    corporateEmail: "laura@smallbatchgoods.com",
    phone: "+1 323 555 0110",
    operatingCountry: "Other",
    productType: "Other",
    monthlyVolume: "0-100",
    servicesOfInterest: ["last-mile-delivery"],
    current3pl: "No",
    comments: "Testing whether outsourced logistics makes sense yet.",
    privacyAccepted: true,
    status: "not-fit",
  },
];

const facilities: Facility[] = [
  {
    id: "fac-1",
    city: "Los Angeles",
    country: "United States",
    services: ["warehouse-management", "last-mile-delivery", "reverse-logistics"],
    carriers: ["UPS", "FedEx", "DHL"],
  },
  {
    id: "fac-2",
    city: "Zaragoza",
    country: "Spain",
    services: ["warehouse-management", "last-mile-delivery", "reverse-logistics"],
    carriers: ["MRW", "SEUR", "DHL"],
  },
];

const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Miguel Torres", role: "account-manager", country: "Spain" },
  { id: "tm-2", name: "Nora Kim", role: "warehouse-operator", country: "United States" },
  { id: "tm-3", name: "Diego Ruiz", role: "route-coordinator", country: "Spain" },
  { id: "tm-4", name: "Maya Johnson", role: "support-specialist", country: "United States" },
];

function runSearchExamples(): void {
  const newLead = linearSearch(leads, (lead) => lead.status === "new");
  console.log("linearSearch new lead:", newLead);

  const leadsSortedById = sortBy(leads, (lead) => lead.id);
  const targetLead = binarySearch(leadsSortedById, "lead-3", (lead) => lead.id);
  console.log("binarySearch by id lead-3:", targetLead);
}

function runCollectionExamples(): void {
  const binationalLeads = filterBy(leads, (lead) => lead.operatingCountry === "Both");
  console.log("filterBy binational leads:", binationalLeads);

  const leadsByHighestVolume = sortBy(leads, (lead) => lead.monthlyVolume, "desc");
  console.log("sortBy monthly volume desc:", leadsByHighestVolume);

  const leadsGroupedByStatus = groupBy(leads, (lead) => lead.status);
  console.log("groupBy status:", leadsGroupedByStatus);
}

function runValidationExamples(): void {
  console.log("validateLogisticsService:", services.map(validateLogisticsService));
  console.log("validateLeadRequest:", leads.map((lead) => validateLeadRequest(lead, services)));
  console.log("validateFacility:", facilities.map(validateFacility));
  console.log("validateTeamMember:", teamMembers.map(validateTeamMember));
}

function runTransformationExamples(): void {
  console.log("countLeadsByServiceInterest:", countLeadsByServiceInterest(leads, services));
  console.log("countLeadsByOperatingCountry:", countLeadsByOperatingCountry(leads));
  console.log("countLeadsByProductType:", countLeadsByProductType(leads));
  console.log("countLeadsByMonthlyVolume:", countLeadsByMonthlyVolume(leads));
  console.log("countLeadsByThreePLStatus:", countLeadsByThreePLStatus(leads));
  console.log("lowVolumeWarningLeads:", lowVolumeWarningLeads(leads));
}

function runDemo(): void {
  runSearchExamples();
  runCollectionExamples();
  runValidationExamples();
  runTransformationExamples();
}

runDemo();
