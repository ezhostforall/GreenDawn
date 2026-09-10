import type { ResponsiveImageAsset } from "./media";

export interface NumberedContent {
  number: string;
  title: string;
  copy: string;
}

export interface SystemLayer extends NumberedContent {
  detail: string;
}

export interface Solution extends NumberedContent {
  href: string;
  image: ResponsiveImageAsset;
  alt: string;
}

export interface SurveyTier {
  id: string;
  name: string;
  price: number;
  suitableFor: string;
  scope: readonly string[];
  deliverable: string;
  benefitLabel: "Included support" | "Installation credit";
  benefit: string;
}

export interface SupportingProof {
  eyebrow: string;
  title: string;
  result: string;
  copy: string;
  image?: ResponsiveImageAsset;
  alt?: string;
  kind: "project" | "coverage" | "capability";
}

export interface InsightSummary {
  label: string;
  title: string;
  href: string;
  image: ResponsiveImageAsset;
  alt: string;
}

export interface AftercareService extends NumberedContent {}
