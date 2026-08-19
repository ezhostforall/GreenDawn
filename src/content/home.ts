import type {
  AftercareService,
  InsightSummary,
  NumberedContent,
  Solution,
  SupportingProof,
  SurveyTier,
  SystemLayer,
} from "../types/home";
import { homeMedia } from "./media";

export const systemLayers = [
  {
    number: "01",
    title: "Power & infrastructure",
    copy: "Capacity, distribution, cable routes, civils and dynamic load management are considered before the charging hardware is fixed.",
    detail: "Fix the foundations",
  },
  {
    number: "02",
    title: "Charging hardware",
    copy: "AC and DC equipment is selected around dwell time, vehicles, users, available power and the operational job the system needs to do.",
    detail: "Requirements-led",
  },
  {
    number: "03",
    title: "Software & operations",
    copy: "Access, tariffs, payments, reporting, monitoring and ongoing management are configured around how the charging estate will actually operate.",
    detail: "Visible and controlled",
  },
] satisfies readonly SystemLayer[];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    copy: "A no-cost first conversation establishes the sites, vehicles, users, objectives and likely charging requirement before we recommend a technical next step.",
  },
  {
    number: "02",
    title: "Survey",
    copy: "Where an on-site survey is required, our engineers assess the proposed locations, electrical routes, infrastructure and constraints needed for a dependable scope.",
  },
  {
    number: "03",
    title: "Design",
    copy: "Electrical, civil, hardware, load-management and software decisions are resolved together before installation begins.",
  },
  {
    number: "04",
    title: "Deliver",
    copy: "GreenDawn manages the installation programme using its own engineers and managed specialist contractors where the project requires them.",
  },
  {
    number: "05",
    title: "Commission",
    copy: "The charging system is configured, tested and commissioned with the software, access and operational setup required by the site.",
  },
  {
    number: "06",
    title: "Support",
    copy: "Monitoring, testing, maintenance, repairs, user support and warranty management can continue after the chargers go live.",
  },
] satisfies readonly NumberedContent[];

export const solutions = [
  {
    number: "01",
    title: "Fleet & depot charging",
    copy: "Charging infrastructure built around vehicle routes, battery demand, return times, dwell windows and the operational cost of downtime.",
    href: "/fleet-charging-solutions/",
    image: homeMedia.syncCharger,
    alt: "Sync commercial EV charger installed at a business site",
  },
  {
    number: "02",
    title: "Workplace charging",
    copy: "Reliable charging for employees, company vehicles and visitors, designed around site capacity, access requirements and future growth.",
    href: "/workplace-charging/",
    image: homeMedia.heroCharging,
    alt: "Commercial EV chargers installed at a business site",
  },
  {
    number: "03",
    title: "Dealerships & motor retail",
    copy: "Multi-brand and multi-site infrastructure for workshops, demonstrators, customers and dealership operations with differing manufacturer requirements.",
    href: "/guides/ev-charging-for-car-dealership/",
    image: homeMedia.johnsonsCars,
    alt: "EV charging equipment installed at a motor dealership",
  },
  {
    number: "04",
    title: "Destination & public charging",
    copy: "Charging for hotels, leisure, retail and publicly accessible locations with access, payment, user support and operational requirements considered from the start.",
    href: "/public-charging/",
    image: homeMedia.wallChargers,
    alt: "Wall-mounted commercial EV chargers installed at a business site",
  },
  {
    number: "05",
    title: "Multi-site programmes",
    copy: "A consistent programme across an estate without pretending every site is identical: common standards, site-specific engineering and managed delivery.",
    href: "/business-ev-charging-installations/",
    image: homeMedia.salvationArmy,
    alt: "Commercial EV charging equipment installed for The Salvation Army",
  },
  {
    number: "06",
    title: "Grid, power & load management",
    copy: "Understand what the site can support before power becomes a programme problem, from capacity assessment and DLM to network coordination.",
    href: "/guides/can-my-building-handle-ev-charging/",
    image: homeMedia.electricalCapacity,
    alt: "Engineers testing commercial electrical distribution equipment",
  },
] satisfies readonly Solution[];

export const aftercareServices = [
  {
    number: "01",
    title: "Monitoring & reporting",
    copy: "Back-office configuration, charging data, reporting and ongoing system management kept visible rather than scattered across suppliers.",
  },
  {
    number: "02",
    title: "Inspection & testing",
    copy: "Planned inspection and electrical testing scoped around the installed charging estate and its operating environment.",
  },
  {
    number: "03",
    title: "Maintenance, repairs & warranty",
    copy: "Fault investigation, maintenance and repair with warranty issues managed through a clear GreenDawn route.",
  },
  {
    number: "04",
    title: "Driver & user support",
    copy: "Support options for sites where charging is part of a fleet, public or customer-facing experience.",
  },
] satisfies readonly AftercareService[];

export const surveyTiers = [
  {
    price: 200,
    label: "1–2 sockets",
    credit: "Includes one year of selected back-office and testing support",
  },
  {
    price: 500,
    label: "3–7 sockets",
    credit: "Full £500 credit applied when the installation is ordered",
  },
  {
    price: 1000,
    label: "8–14 sockets",
    credit: "£500 credit applied when the installation is ordered",
  },
  {
    price: 1500,
    label: "15+ sockets or DC rapid",
    credit: "£500 credit applied when the installation is ordered",
  },
] satisfies readonly SurveyTier[];

export const supportingProof = [
  {
    eyebrow: "Multi-site delivery",
    title: "The Salvation Army",
    result: "50 sites · 71 chargepoints",
    copy: "A distributed charging programme delivered across a complex estate, with site requirements varying from location to location.",
    image: homeMedia.salvationArmy,
    alt: "Commercial EV chargers installed for The Salvation Army",
  },
  {
    eyebrow: "Great Britain coverage",
    title: "England, Scotland & Wales",
    result: "One managed delivery model",
    copy: "GreenDawn combines its own engineers with managed specialist contractors where required, with maintenance coverage following the same footprint.",
    image: homeMedia.heroCharging,
    alt: "Commercial EV chargers installed at a business site",
  },
  {
    eyebrow: "AC to DC infrastructure",
    title: "Built around the operation",
    result: "7–22 kW AC through to DC rapid charging",
    copy: "From workplace and destination charging to higher-demand fleet infrastructure, the specification follows dwell time, vehicles and available power.",
    image: homeMedia.chargerHardware,
    alt: "Commercial EV charging hardware installed at a business site",
  },
] satisfies readonly SupportingProof[];

export const insights = [
  {
    label: "Power & capacity",
    title: "Load balancing explained: how to use site power more effectively",
    href: "/guides/load-balancing-explained/",
    image: homeMedia.electricalCapacity,
    alt: "Engineers testing commercial electrical distribution equipment",
  },
  {
    label: "Project planning",
    title: "What a commercial EV charging survey should establish before installation",
    href: "/guides/greendawn-ev-charging-survey-pre-installation-guide/",
    image: homeMedia.surveyDucting,
    alt: "Electrical ducting prepared as part of a commercial EV charging project",
  },
  {
    label: "Fleet strategy",
    title: "Transitioning to electric fleets",
    href: "/guides/transitioning-to-electric-fleets/",
    image: homeMedia.syncCharger,
    alt: "Sync commercial EV charger installed at a business site",
  },
] satisfies readonly InsightSummary[];
