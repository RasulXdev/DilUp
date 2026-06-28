---
name: dilup-design-suite
description: "DilUp combined design + frontend powerhouse. Invoke this ONE skill to activate all five design/frontend skills together: frontend-design, ui-ux-pro-max, senior-frontend, ui-design-system, mobile-design. Use whenever building, styling, designing, reviewing, or improving ANY DilUp UI/page/component — landing page, onboarding quiz, tutor cards, tutor profile, checkout, dashboards, admin panel. Triggers: design, build UI, style, beautify, component, page, layout, palette, typography, responsive, polish, frontend."
---

# DilUp Design Suite — All-in-One

This is a **meta-skill**. When invoked, you MUST load and apply ALL five underlying skills together as a single combined workflow. They are already installed in this same `.Codex/skills/` directory.

## Step 0 — Load all five skill files (do this first, every time)

Read these files before producing any UI/code:

1. `.Codex/skills/ui-ux-pro-max/SKILL.md` — design intelligence: 50 styles, palettes, font pairings, UX guidelines, per-stack recommendations. **Use its searchable scripts** (`scripts/search.py`, `scripts/design_system.py`) to pick concrete styles/palettes/fonts.
2. `.Codex/skills/frontend-design/SKILL.md` — distinctive, production-grade aesthetics that avoid generic "AI slop". Governs the *creative* quality bar.
3. `.Codex/skills/ui-design-system/SKILL.md` — design tokens, component documentation, responsive math, dev handoff. **Use `scripts/design_token_generator.py`** to emit a consistent token set.
4. `.Codex/skills/senior-frontend/SKILL.md` — React/Next.js/TypeScript/Tailwind implementation, component scaffolding, performance, bundle analysis. Governs the *engineering* quality bar. Has `scripts/component_generator.py`, `scripts/frontend_scaffolder.py`, `scripts/bundle_analyzer.py`.
5. `.Codex/skills/mobile-design/SKILL.md` — mobile-first / touch / responsive principles (apply for responsive web breakpoints; DilUp is web-only for now, no native app yet).

## How to combine them (priority order for DilUp)

When the request involves **deciding how something should look** (style, palette, typography, layout):
→ Lead with **ui-ux-pro-max** (search for concrete recommendations) + **frontend-design** (creative polish) → lock decisions into tokens with **ui-design-system**.

When the request involves **writing the actual code** (Next.js/React/Tailwind/shadcn):
→ Lead with **senior-frontend** (scaffolding, performance, types) → enforce the design with the tokens from **ui-design-system** → keep aesthetics at the **frontend-design** bar.

When the request involves **responsiveness / small screens**:
→ Apply **mobile-design** touch/breakpoint principles to the web layout.

For **review / fix / improve** requests: run all five lenses — UX correctness (ui-ux-pro-max), visual distinctiveness (frontend-design), token/consistency (ui-design-system), code/perf quality (senior-frontend), responsive/touch (mobile-design).

## DilUp non-negotiables (apply on every output)

- **Primary brand color: BLUE.** Never pink/magenta (that is Preply's color — DilUp must be visually unique).
- **Clone Preply's structure/layout/flow/button-placement**, but **colors, images, copy are unique to DilUp.**
- **Tech stack:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui. State: Zustand + React Query. i18n: next-intl (AZ/EN/RU).
- **Scope bans:** no "For Business"/corporate, no AppStore/PlayStore, no subscription/pricing-plan UI (pay-per-lesson marketplace; each tutor sets own price).
- **i18n:** all user-facing text via next-intl keys (AZ/EN/RU), never hardcoded.
- Cross-check every UI task against `docs/dilup-blueprint.md` and `docs/dilup-master-plan.md`.

## Output expectation

Produce real, working, production-grade code (no placeholders), visually distinctive, blue-branded, responsive, accessible (WCAG AA), and consistent with the generated design tokens.
