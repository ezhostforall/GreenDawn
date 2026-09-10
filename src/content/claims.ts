export type ClaimStatus = "approved" | "hold";

export interface PublishedClaim {
  status: ClaimStatus;
  wording: string;
  source: string;
  reviewedOn: string;
}

export const claims = {
  johnsonsProgramme: {
    status: "approved",
    wording: "Six years · 136 sites · 454 chargepoints · 11 automotive brands",
    source: "Supplied project evidence and recorded publication permission",
    reviewedOn: "2026-09-07",
  },
  salvationArmyProgramme: {
    status: "approved",
    wording: "50 sites · 71 chargepoints",
    source: "Supplied project evidence and recorded publication permission",
    reviewedOn: "2026-09-07",
  },
  deliveryFootprint: {
    status: "approved",
    wording: "England, Scotland and Wales",
    source: "Confirmed Greendawn delivery footprint",
    reviewedOn: "2026-09-07",
  },
  ozevAuthorisation: {
    status: "hold",
    wording: "OZEV authorised installer",
    source: "Requires current accreditation confirmation before publication",
    reviewedOn: "2026-09-07",
  },
} as const satisfies Record<string, PublishedClaim>;

export function approvedClaim(claim: PublishedClaim): string {
  if (claim.status !== "approved") {
    throw new Error(`Attempted to publish a claim that is on hold: ${claim.wording}`);
  }

  return claim.wording;
}
