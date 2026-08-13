# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audiences are **co-equal**:

1. **Recruiters and hiring managers** evaluating Yu Jin for Staff / Lead Engineer (Salesforce), CRM / Solutions Architect, strong product engineering, or AI-across-SDLC roles.
2. **Engineering peers and craft-minded builders** assessing taste, judgment, and how he ships.

Situation: a short, high-scrutiny visit (often mobile) from someone deciding whether to reach out or take him seriously.

## Product Purpose

A personal portfolio site for **Yu Jin Wong** (Lead Engineer @ National Australia Bank). It makes his enterprise impact, case studies, stack, and side projects scannable so the right people can decide quickly and contact him.

**Success** = qualified inbound opportunities: hire-me / resume requests / LinkedIn or email from roles he actually wants — not vanity traffic alone.

## Positioning

Enterprise CRM / Salesforce delivery leadership in regulated banking (NAB), with measurable platform impact and hands-on ownership from design through production — plus credible AI adoption across the SDLC and personal builds that show he still ships for craft. A generic “full-stack React portfolio” could not truthfully claim this combination.

## Operating Context

- Single-page marketing/portfolio site (`https://www.yujinwong.com`), Vite + React.
- Visitor path: hero → profile (`profile.json`) → work (impact + case studies) → projects → about → skills → contact / resume request.
- Evaluation rituals: skim hero command pill, open/expand profile.json, check impact metrics, read a case study, open a project demo, request resume or email.
- Source of product truth for copy and claims: `src/data/portfolioData.js`.

## Capabilities and Constraints

**Confirmed capabilities**

- Sections: Hero, Work (`#experience`), Projects, About, Skills, Contact; resume request deep-link (`#resume`).
- Interactive demos on featured projects; sticky project stack on desktop.
- Analytics via Vercel Analytics when deployed on Vercel.

**Constraints**

- Must remain truthful: no fabricated employers, metrics, testimonials, clients, or case studies.
- Preserve identity: Yu Jin Wong; NAB Lead Engineer; Melbourne / Sydney; contact channels in portfolio data.
- Preserve open-to intent as listed (Lead/Staff Salesforce, Architect, product full-stack, AI SDLC) unless Yu Jin updates it.
- Personal projects may be curated/hidden (e.g. TBC), but published ones stay factual.
- Platform is **web** (responsive), not native iOS/Android.

**Open decisions**

- None recorded from init beyond future design/visual direction (owned by later Impeccable commands, not product truth).

## Brand Commitments

- Name / mark: **Yu Jin Wong** / `<YJW/>` logo treatment already in the site.
- Voice: direct, engineer-forward, terminal/developer-adjacent wit without sacrificing clarity for hiring.
- Binding content commitments from init: keep factual content as built (identity, NAB role, impact metrics, case studies, open-to roles, contacts, shown projects). Do not invent social proof.

## Evidence on Hand

Real, shippable evidence lives in-repo (do not invent beyond this):

- Profile, tagline, open-to roles, primary stack — `src/data/portfolioData.js`
- Impact metrics (e.g. 3k→13k users, 4× processing, 30 min setup saved)
- Featured case studies: SaaS conversion; 4× single-flow trigger redesign; AI adoption; APRA-grade sales conversation record (NAB)
- Personal projects + demos (AI Food Tracker, Sheets microservice, expense splitter, portfolio, etc.)
- Contact: email, LinkedIn, GitHub as in portfolio data

**Must not fabricate:** testimonials, press, unnamed clients, unverified benchmarks, or fake hiring outcomes.

## Product Principles

1. **Inbound over ornament** — every surface should make the right person more likely to reach out.
2. **Truth before polish** — metrics, employers, and case studies stay real; never invent proof.
3. **Dual audience without dilution** — serve recruiters and peers equally; don’t hide craft for conversion or bury impact for aesthetics.
4. **Scan in under a minute** — seniority, stack, and proof must land before deep scroll.
5. **Own the path to contact** — hire me, resume request, and contact stay obvious and working.

## Accessibility & Inclusion

No product-specific legal standard was set in init. Default expectation: usable keyboard navigation, readable contrast, and workable mobile layout for recruiter scans. Tighten standards later if required.
