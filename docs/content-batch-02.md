# Process and survey content batch 02

This batch follows the tested canonical-navigation hotfix and changes only the agreed public process language and homepage survey presentation.

## Public process language

The hero proof strip and detailed process section now use the same four-stage customer-facing sequence:

1. Consult
2. Design
3. Install
4. Manage

The detailed descriptions retain the existing operational meaning: initial requirements, technical design and survey work, coordinated installation, then ongoing management after commissioning.

## Homepage survey presentation

The four-tier price comparison is no longer rendered on the homepage. It is replaced by one editorial survey section that explains:

- that the first step is a conversation;
- when an on-site survey is useful;
- the approved starting point of **£200 + VAT**;
- the principal questions a technical survey should answer; and
- that scope and cost are confirmed before booking.

The existing `surveyTiers` data and the `SurveyTier`, `SurveyTierMobile`, `SurveyTierDescription` and `SurveyTierCta` components remain unchanged in the repository. They are deliberately dormant so a future pricing or survey page can reuse them without rebuilding the model.

## Regression contracts

The production validator now requires the approved starting price, VAT wording and four-stage process language. It also rejects the three former higher tier prices in rendered homepage HTML and confirms that no tier comparison is rendered.

The functional suite now checks the survey overview and four outcomes at every configured viewport, plus matching process labels in the hero and detailed section. Existing overflow, reduced-motion, accessibility, lifecycle and visual tests remain in place.

## Scope boundary

This batch does not change navigation, footer information architecture, lead-capture behaviour, submission boundaries, analytics or page order. The full-page visual baselines will change intentionally because the survey section is substantially shorter and the hero proof strip gains a fourth stage.
