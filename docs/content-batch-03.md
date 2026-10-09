# Content batch 03: homepage compression and footer alignment

## Purpose

This reviewable batch reduces homepage repetition while preserving the established buyer journey, approved claims, interaction model and reusable source material. It also aligns the footer with the canonical WordPress destinations so the drop-in homepage does not introduce a competing information architecture.

## Homepage changes

- The problem model uses slightly shorter fragment tiles without changing its argument, content, animation hooks or mobile assembly.
- The complete-system section keeps the three system layers and two technical decision routes, but removes a closing statement that repeated the section premise.
- The process section keeps **Consult · Design · Install · Manage** and all four stage summaries, but removes the second evidence photograph because delivery evidence is already established by the featured project.
- System, process, featured-project, survey, solution and insight media/card heights are reduced modestly to improve page pace without changing the section order.
- Aftercare keeps its proposition, four service names, destination link and statement, while detailed service descriptions remain in structured data for reuse on the aftercare page.
- Supporting proof renders one compact photographed project. The coverage and capability records and component variants remain available in the source but are not rendered because their claims overlap with the trust and system sections.
- The final CTA keeps the approved “Discuss your site” callback trigger, phone route and survey context, but no longer repeats a separate process list.

## Footer changes

- Company and solution links are derived from `src/config/navigation.ts`, the same canonical source used by desktop, mobile and no-JavaScript header navigation.
- The footer links to the live About Us, Our Projects, Workplace Charging, Fleet Charging, Public Charging and Aftercare routes.
- Support retains direct routes to Customer support, Insights and Discuss your site.
- Contact, registered address, company number, VAT number, privacy, terms, modern-slavery statement and LinkedIn remain available.
- Homepage fragment-directory links are deliberately absent; the footer supports onward navigation rather than duplicating the page contents.

## Preserved contracts

- Hero content and the entrance-draw animation are unchanged, including the pre-paint stroke state that prevents a completed-arc flash.
- The public process language remains **Consult · Design · Install · Manage**.
- Survey guidance remains **£200 + VAT** and the former tier data/components remain dormant for possible future use.
- “Discuss your site” remains the callback label and progressively enhanced lead trigger.
- Current section order, approved claims, no-JavaScript behaviour, reduced-motion behaviour and GitHub Pages base-path handling remain unchanged.
- No analytics, new pages, backend submission or further primary-navigation remapping is introduced.

## Verification

Static validation now checks the compressed component counts, absence of repeated process/CTA markup, footer configuration ownership and canonical live-site routes. Functional and visual Playwright coverage remains in the repository for the seven configured projects; visual baselines must only be updated after the changed page composition has been reviewed.
