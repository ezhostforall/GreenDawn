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
    copy: "Capacity, cable routes, civils and load management are resolved before hardware is fixed.",
    detail: "Fix the foundations",
  },
  {
    number: "02",
    title: "Charging hardware",
    copy: "AC and DC equipment is selected around dwell time, vehicles, users and available power.",
    detail: "Requirements-led",
  },
  {
    number: "03",
    title: "Software & operations",
    copy: "Access, payments, reporting and monitoring are configured around how the charging estate operates.",
    detail: "Visible and controlled",
  },
] satisfies readonly SystemLayer[];

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    copy: "We establish the sites, vehicles, users and objectives before recommending the next technical step.",
  },
  {
    number: "02",
    title: "Plan",
    copy: "Where an on-site survey is appropriate, engineers assess locations, electrical routes and constraints before design.",
  },
  {
    number: "03",
    title: "Install",
    copy: "Greendawn coordinates electrical, civil, hardware, software and commissioning work as one programme.",
  },
  {
    number: "04",
    title: "Support",
    copy: "Agreed monitoring, testing, maintenance, user support and warranty services continue after commissioning.",
  },
] satisfies readonly NumberedContent[];

export const audiences = [
  {
    number: "01",
    title: "Fleet & depot charging",
    copy: "Infrastructure built around routes, battery demand, dwell windows and the cost of downtime.",
    href: "/fleet-charging-solutions/",
    image: homeMedia.fleetChargingBays,
    alt: "Completed EV charging bays at a commercial site",
  },
  {
    number: "02",
    title: "Workplace charging",
    copy: "Reliable employee, company-vehicle and visitor charging designed around capacity, access and growth.",
    href: "/workplace-charging/",
    image: homeMedia.workplaceCharging,
    alt: "Wall-mounted EV charger beside a parked vehicle",
  },
  {
    number: "03",
    title: "Destination & hospitality",
    copy: "Hotel, leisure and retail charging with access, payment and user support considered from the start.",
    href: "/public-charging/",
    image: homeMedia.destinationHospitality,
    alt: "EV chargers installed outside a hotel",
  },
  {
    number: "04",
    title: "Multi-site programmes",
    copy: "Common standards, site-specific engineering and coordinated delivery across an estate.",
    href: "/business-ev-charging-installations/",
    image: homeMedia.multiSiteCharging,
    alt: "Completed EV charging installation with multiple marked bays",
  },
  {
    number: "05",
    title: "Dealerships & motor retail",
    copy: "Multi-brand infrastructure for workshops, demonstrators, customers and differing manufacturer requirements.",
    href: "/guides/ev-charging-for-car-dealership/",
    image: homeMedia.dealershipCharging,
    alt: "EV charging equipment installed at a Ford dealership",
  },
] satisfies readonly Solution[];

export const aftercareServices = [
  {
    number: "01",
    title: "Monitoring & reporting",
    copy: "Back-office configuration, charging data and reporting kept visible through one support route.",
  },
  {
    number: "02",
    title: "Inspection & testing",
    copy: "Planned inspection and electrical testing scoped to the estate and its operating environment.",
  },
  {
    number: "03",
    title: "Maintenance, repairs & warranty",
    copy: "Fault investigation, maintenance, repair and warranty coordination through Greendawn.",
  },
  {
    number: "04",
    title: "Driver & user support",
    copy: "Driver support options for fleet, public and customer-facing charging.",
  },
] satisfies readonly AftercareService[];

export const surveyTiers = [
  {
    id: "survey-1-2",
    name: "Essential site survey",
    price: 200,
    suitableFor: "1–2 charging sockets",
    scope: ["Proposed charger positions", "Electrical route and practical constraints"],
    deliverable: "A documented site assessment and scoped next step.",
    benefitLabel: "Included support",
    benefit: "One year of selected back-office and testing support",
  },
  {
    id: "survey-3-7",
    name: "Standard site survey",
    price: 500,
    suitableFor: "3–7 charging sockets",
    scope: ["Site capacity and electrical routes", "Infrastructure, civils and charger locations"],
    deliverable: "A documented technical scope suitable for formal quotation.",
    benefitLabel: "Installation credit",
    benefit: "Full £500 credit applied when the installation is ordered",
  },
  {
    id: "survey-8-14",
    name: "Extended site survey",
    price: 1000,
    suitableFor: "8–14 charging sockets",
    scope: ["Multi-unit capacity and phasing", "Infrastructure, civils and operational constraints"],
    deliverable: "A documented technical scope with phased installation considerations.",
    benefitLabel: "Installation credit",
    benefit: "£500 credit applied when the installation is ordered",
  },
  {
    id: "survey-15-plus",
    name: "Complex site survey",
    price: 1500,
    suitableFor: "15+ sockets or DC rapid charging",
    scope: ["Higher-demand electrical and operational requirements", "Infrastructure, phasing and network dependencies"],
    deliverable: "A documented technical scope for a complex or higher-demand project.",
    benefitLabel: "Installation credit",
    benefit: "£500 credit applied when the installation is ordered",
  },
] satisfies readonly SurveyTier[];

export const supportingProof = [
  {
    eyebrow: "Multi-site delivery",
    title: "The Salvation Army",
    result: "50 sites · 71 chargepoints",
    copy: "A distributed programme delivered across a complex estate with varied site requirements.",
    image: homeMedia.salvationArmy,
    alt: "Commercial EV chargers installed for The Salvation Army",
    kind: "project",
  },
  {
    eyebrow: "Great Britain coverage",
    title: "England, Scotland & Wales",
    result: "One managed delivery model",
    copy: "Greendawn combines its engineers with managed specialists where required, with maintenance following the same footprint.",
    kind: "coverage",
  },
  {
    eyebrow: "AC to DC infrastructure",
    title: "Built around the operation",
    result: "7–22 kW AC through to DC rapid charging",
    copy: "The specification follows dwell time, vehicles and available power—from workplace AC to higher-demand fleet infrastructure.",
    kind: "capability",
  },
] satisfies readonly SupportingProof[];

export const insights = [
  {
    label: "Power & capacity",
    title: "Load balancing explained: how to use site power more effectively",
    href: "/guides/load-balancing-explained/",
    image: homeMedia.electricalConnection,
    alt: "New electrical connection for a commercial EV charging project",
  },
  {
    label: "Project planning",
    title: "What a commercial EV charging survey should establish before installation",
    href: "/guides/greendawn-ev-charging-survey-pre-installation-guide/",
    image: homeMedia.siteSurvey,
    alt: "Completed paving and ducting area for an EV charging installation",
  },
  {
    label: "Fleet strategy",
    title: "Transitioning to electric fleets",
    href: "/guides/transitioning-to-electric-fleets/",
    image: homeMedia.fleetChargingBays,
    alt: "Completed EV charging bays at a commercial fleet site",
  },
] satisfies readonly InsightSummary[];
