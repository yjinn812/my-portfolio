---
name: Yu Jin Wong Portfolio
description: Night Ops Terminal — dark engineer portfolio with cyan signal and quiet GitHub Dark chrome
colors:
  ink-void: "#080c10"
  console-black: "#0d1117"
  panel-slate: "#111820"
  wire: "#1e2d3d"
  wire-strong: "#2a3e56"
  signal-cyan: "#00d4ff"
  signal-cyan-dim: "#00d4ff22"
  ember-orange: "#ff6b35"
  snow-code: "#e6edf3"
  fog: "#a8b3bf"
  dusk: "#6b7c8f"
  nav-glass: "rgba(8, 12, 16, 0.92)"
  terminal-header: "#161b22"
  terminal-border: "#30363d"
  terminal-muted: "#8b949e"
  json-key: "#7ee787"
  json-string: "#a5d6ff"
  json-const: "#79c0ff"
  json-danger: "#ff7b72"
  salesforce: "#00a1e0"
  traffic-red: "#ff5f57"
  traffic-yellow: "#ffbd2e"
  traffic-green: "#28c840"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(24px, 3.2vw, 34px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-hero:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(40px, 5.8vw, 76px)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  display-hero-mobile:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(40px, 8.5vw, 76px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(18px, 2.2vw, 24px)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  body-fluid:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(14px, 2vw, 16px)"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "0.02em"
  body-sm:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  micro:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.2em"
  nav:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  subtitle:
    fontFamily: "Syne, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  display-sm:
    fontFamily: "Syne, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
rounded:
  hairline: "2px"
  sm: "8px"
  md-soft: "10px"
  md: "12px"
  pill: "999px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "28px"
  xl: "32px"
  section-y: "72px"
  scroll-pad: "88px"
  container-x: "32px"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.ink-void}"
    typography: "{typography.nav}"
    rounded: "{rounded.sm}"
    padding: "0 28px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.ink-void}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.signal-cyan}"
    typography: "{typography.nav}"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "34px"
  button-outline-hover:
    backgroundColor: "{colors.signal-cyan-dim}"
    textColor: "{colors.signal-cyan}"
  chip-tech:
    backgroundColor: "{colors.signal-cyan-dim}"
    textColor: "{colors.signal-cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  card-surface:
    backgroundColor: "{colors.panel-slate}"
    textColor: "{colors.snow-code}"
    rounded: "{rounded.md}"
    padding: "22px"
  terminal-window:
    backgroundColor: "{colors.console-black}"
    textColor: "{colors.snow-code}"
    rounded: "{rounded.md}"
  command-pill:
    backgroundColor: "{colors.console-black}"
    textColor: "{colors.snow-code}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  input-field:
    backgroundColor: "{colors.ink-void}"
    textColor: "{colors.snow-code}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
---

# Design System: Yu Jin Wong Portfolio

## Overview

**Creative North Star: "Night Ops Terminal"**

This is a lead engineer’s after-hours workstation rendered as a portfolio: an ink-black canvas, cyan command highlights, a warm ember secondary, and GitHub Dark–faithful JSON chrome. The terminal is the brand stage — not a gimmick layered on top of a generic dark theme. Personality comes from mono labels (`// SECTION`), Syne display weight, and precise cyan signals, not from purple gradients, cream paper, or broadsheet rules.

Density stays deliberate and scannable: section headers are restrained so work and projects can land above the fold after hash navigation. Depth is tonal (nested dark surfaces + hairline borders), with ambient shadows reserved for chrome that needs presence (nav, terminal, command pill). Controls feel restrained and pressable — mono type, 8px radius, cyan fill or cyan outline — without glow spam.

**Confirmed visual rejections:** purple-on-white / purple-indigo gradients; warm cream + terracotta editorial; broadsheet hairline newspaper layouts; default Inter/Roboto stacks; flat single-color voids without atmosphere; oversized section titles that bury case-study content on hash land.

**Key Characteristics:**
- Dark ops palette with **Signal Cyan** as the single primary accent
- **Syne** display + **JetBrains Mono** body/labels (terminal literacy)
- GitHub Dark prettylights for JSON / terminal syntax
- Dot-grid atmosphere + soft cyan/ember radial glows (fixed, non-scrolling)
- Quiet elevation: tonal layers first; sparse ambient shadows
- Hash-aware spacing (`scroll-pad` / section pad) so every `#section` frames cleanly

## Colors

A near-black ops field with one cyan voice and a warm ember counterweight; neutrals stay cool blue-gray like GitHub Dark chrome.

### Primary
- **Signal Cyan** (`{colors.signal-cyan}`): Links, section labels, nav numbers, focus rings, primary CTA fills, tech chips, active case-study tabs. Rarity is the point — it marks what is interactive or labeled.

### Secondary
- **Ember Orange** (`{colors.ember-orange}`): Warm counter-accent for atmosphere (`--glow-warm`) and occasional emphasis; never competing with cyan for primary actions.

### Neutral
- **Ink Void** (`{colors.ink-void}`): Page background / body canvas
- **Console Black** (`{colors.console-black}`): Terminal surfaces, secondary bg (`--bg-2`)
- **Panel Slate** (`{colors.panel-slate}`): Cards / elevated panels (`--bg-card`)
- **Wire / Wire Strong** (`{colors.wire}`, `{colors.wire-strong}`): Dividers and borders
- **Snow Code** (`{colors.snow-code}`): Primary text
- **Fog / Dusk** (`{colors.fog}`, `{colors.dusk}`): Secondary and tertiary text — fog must stay readable on void for body/supporting copy; dusk is for quieter chrome (labels, plus marks), not long paragraphs.
- **Nav Glass** (`{colors.nav-glass}`): Scrolled navbar / mobile nav backdrop

### Terminal / Syntax (GitHub Dark prettylights)
- Keys **json-key**, strings **json-string**, constants **json-const**, danger **json-danger**, muted comments **terminal-muted** — used only inside terminal/JSON chrome, not as general UI accents.

### Named Rules
**The One Signal Rule.** Signal Cyan is the only primary interactive accent. Do not introduce a second “brand blue” or purple for CTAs.

**The Prettylights Stay Local Rule.** Syntax colors live inside terminal/JSON surfaces. Do not paint section headers or buttons with json-key green.

## Typography

**Display Font:** Syne (sans-serif fallback)
**Body / Label Font:** JetBrains Mono (monospace fallback)

**Character:** Wide, geometric Syne carries name and section authority; JetBrains Mono carries the operating-system voice — labels, nav, body, and CTAs — so the whole page reads as a literate terminal environment.

### Hierarchy
- **Display Hero** (800, `clamp(40px, 5.8vw, 76px)`, lh 1.12): Hero name only
- **Display / Section** (800, `clamp(24px, 3.2vw, 34px)`, lh 1.1): Section titles (`Work`, `Personal Projects`, …) — keep restrained for hash-land framing
- **Title** (800, `clamp(18px, 2.2vw, 24px)`, lh 1.25): Case-study titles, project names
- **Body** (400, 14px, lh 1.7): Default mono body
- **Label** (400, 11px, tracking ~0.2em, uppercase): `// SECTION` labels, eyebrows, steps
- **Nav / CTA** (400–500, 12–13px): Navbar links, hire me, buttons

### Named Rules
**The Fold Rule.** Section titles must not steal the first viewport from proof (impact, case beats, project card). Prefer the section clamp over hero-scale type outside the hero.

**The Mono Voice Rule.** UI chrome (nav, labels, buttons, command bar) stays JetBrains Mono. Syne is for names and headings only.

## Layout

- **Container:** max-width `1140px`, horizontal padding `32px` (mobile `20px`)
- **Section rhythm:** `--section-pad-y: 72px` (mobile `56px`); hairline `border-top` between sections
- **Hash framing:** `--scroll-pad: 88px` (mobile `76px`) via `scroll-padding-top` / `scroll-margin-top` + `HashScroll` settle logic
- **Hero:** two-column grid (copy | terminal), `minmax(0, …)` so terminal content cannot inflate the column; full-viewport feel with restrained bottom padding
- **Work:** compact impact strip + case study; beats should remain visible after `#experience` land on common laptop heights
- **Projects:** featured/wide cards as two-column grids; scroll-scrubbed project stages on desktop (one beat per project), normal flow on mobile
- **Breakpoints of note:** `768px` (section pad / stacks), `960px` (nav → drawer)

## Elevation & Depth

Primarily **tonal layering** (Ink Void → Console Black → Panel Slate) with hairline Wire borders. Shadows are **ambient and sparse**, not a card-lift system.

### Shadow Vocabulary
- **Ambient low** (`0 10px 30px rgba(0, 0, 0, 0.28)`): scrolled nav, command pill, light chrome
- **Ambient mid** (`0 18px 48px rgba(0, 0, 0, 0.42)`): stronger chrome when needed
- **Atmosphere:** fixed body radial glows (`--glow-cyan`, `--glow-warm`) + DotGrid — not scroll-attached

### Named Rules
**The Flat-By-Default Rule.** Cards and project surfaces do not rely on hover lift shadows. Depth comes from nesting and borders; shadows decorate chrome, not content cards.

## Shapes

Gently curved engineering chrome: **8px** default radius (`--radius`), **12px** for larger panels/terminal (`--radius-lg`), **pill** only for the hero command bar. Borders are 1px Wire / terminal-border — no heavy multi-layer outlines. Avoid `rounded-full` pills for general CTAs (hire me and primary buttons stay 8px).

### Named Rules
**The Soft Console Rule.** Prefer 8–12px radii. Full pills are reserved for the command bar, not every chip or button.

## Components

### Buttons
- **Shape:** 8px radius; min-heights 42px (hero primary) / 34px (nav hire me)
- **Primary:** Signal Cyan fill, Ink Void text, mono 13px, padding `0 28px`; hover brightness + slight lift; active scale `0.97`
- **Outline / Hire me:** transparent, Signal Cyan text + 1px cyan border; soft cyan wash on hover
- **Focus:** global `:focus-visible` 2px Signal Cyan outline, 3px offset
- **Optical note:** JetBrains Mono CTA labels may need `text-box` trim or slight translate so ink centers in the button box

### Chips / Tags
- Tech stack tags: cyan text on `--accent-dim` wash, mono, small padding, 8px radius — quiet, not pill clusters

### Cards / Containers
- Project cards: often transparent wrapper; featured/wide use panel treatment, 12px radius, ~22–28px padding, two-column media/copy
- Prefer borders over drop shadows; BorderGlow is optional FX on specific interactive surfaces, not default card chrome

### Inputs / Fields
- Resume/contact fields: dark void fill, Wire border, 8px radius, mono text; focus via global accent outline

### Navigation
- Fixed top; transparent until scrolled → Nav Glass + Wire border + ambient shadow
- Links: mono 12px Fog text; Signal Cyan index numbers; underline grow on hover
- Mobile: burger drawer (`960px`); opacity-only navbar entrance (no transform on `<nav>` — transforms break `position: fixed` drawer anchoring)

### Signature: Terminal Window
- Console Black body, terminal-header bar, macOS-style traffic lights, GitHub Dark prettylights JSON
- Radius 12px; terminal-border; primary hero visual alongside name/CTA

### Signature: Command Pill
- Pill radius; Console Black + terminal-border; `$` prompt in Signal Cyan; typing loop for `heroCommands`
- Sits under View My Work — keep strings short enough for mobile ellipsis without mid-word cuts on primary tokens

### Signature: Section Label
- Mono uppercase with `//` prefix, Signal Cyan, generous tracking — the recurring “ops annotation” before every Syne title

## Do's and Don'ts

### Do:
- **Do** keep Signal Cyan as the sole primary interactive accent and Syne/Mono pairing intact.
- **Do** preserve GitHub Dark prettylights inside terminal/JSON only.
- **Do** design hash landings so proof (metrics, case beats, project card) appears in the first viewport.
- **Do** use tonal nesting + hairline borders for depth; reserve shadows for nav/terminal/cmd chrome.
- **Do** keep CTA copy and contact paths obvious (hire me, resume, mailto).

### Don't:
- **Don't** introduce purple gradients, cream+terracotta editorial, or broadsheet newspaper aesthetics.
- **Don't** swap Syne/JetBrains Mono for Inter/Roboto/system UI defaults.
- **Don't** inflate section titles back toward hero scale — it breaks `#experience` fold.
- **Don't** put transform on the fixed navbar element (breaks mobile drawer).
- **Don't** fabricate testimonials, metrics, or employers in pursuit of visual “proof blocks.”
- **Don't** spam glow, multi-layer shadows, or rounded-full pill clusters across the page.
