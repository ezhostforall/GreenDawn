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
  price: number;
  label: string;
  credit: string;
}

export interface SupportingProof {
  eyebrow: string;
  title: string;
  result: string;
  copy: string;
  image: ResponsiveImageAsset;
  alt: string;
}

export interface InsightSummary {
  label: string;
  title: string;
  href: string;
  image: ResponsiveImageAsset;
  alt: string;
}

export interface AftercareService extends NumberedContent {}
