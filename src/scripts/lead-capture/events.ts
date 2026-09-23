import type { LeadFunnelEventDetail, LeadFunnelEventName } from "../../types/lead";

export const LEAD_FUNNEL_EVENT = "greendawn:lead-funnel";

/**
 * PII-safe boundary for the later analytics/GTM implementation.
 * Never add names, contact details or free text to this event detail.
 */
export function emitLeadFunnelEvent(
  event: LeadFunnelEventName,
  context: Omit<LeadFunnelEventDetail, "event">,
): void {
  window.dispatchEvent(new CustomEvent<LeadFunnelEventDetail>(LEAD_FUNNEL_EVENT, {
    detail: { event, ...context },
  }));
}
