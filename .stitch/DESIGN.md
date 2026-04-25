---
name: Ataz Labs Quiet Technical Journal
version: 1.2.0
description: A restrained, high-trust visual identity for technical writing, cybersecurity notes, engineering essays, and project updates.
author: Codex via Stitch Skills
---

# Design System: Quiet Technical Journal

## Atmosphere

Ataz Labs should feel like a thoughtful engineering notebook: precise, calm, readable, and quietly modern. The site keeps a dark technical foundation, but avoids militarized language, neon excess, glitch effects, scanlines, and command-center metaphors.

- Vibe: editorial, technical, focused, low-noise.
- Density: information-rich, but not cramped.
- Surfaces: deep neutral backgrounds, subtle translucent cards, restrained borders.
- Motion: small, purposeful transitions only.
- Voice: plain terms like "Journal", "Notes", "Essays", and "Projects".

## Core Tokens

| Token | Value | Role |
| :--- | :--- | :--- |
| `bg-primary` | `#0D1117` | Main page background |
| `bg-surface` | `#161B22` | Cards, nav, content panels |
| `bg-elevated` | `#1C2128` | Hover states and raised surfaces |
| `border-subtle` | `#30363D` | Structural borders |
| `accent-blue` | `#38BDF8` | Primary links and selected states |
| `accent-green` | `#6EE7B7` | Secondary positive emphasis |
| `accent-red` | `#F87171` | Error and destructive states |
| `text-primary` | `#E6EDF3` | Body and heading text |
| `text-muted` | `#8B949E` | Metadata, captions, inactive labels |

## Typography

- Narrative body: `Inter`, sans-serif.
- Technical labels: `JetBrains Mono`, monospace.
- H1: 2.25rem to 2.75rem, bold, tight but readable line-height.
- H2: 1.25rem to 1.5rem, semi-bold, compact technical rhythm.
- Body: 1rem, 1.75 to 1.85 line-height.
- Metadata: 0.72rem to 0.78rem, mono, modest tracking.

## Page Structure

### Homepage

1. Intro block
   - Small eyebrow: "Technical Journal"
   - Direct headline describing the site.
   - Short supporting paragraph.
   - Two or three quiet text links for primary destinations.

2. Featured essay
   - First/latest post receives a wider treatment.
   - Stronger title scale.
   - Date, excerpt, tags, and optional thumbnail.

3. Journal feed
   - Remaining posts use consistent editorial cards.
   - Text-first layout with optional media on the right.
   - Tags sit below excerpt as compact topic chips.

### Post Cards

- Background: translucent `bg-surface`.
- Border: 1px neutral border, blue on hover.
- Radius: 8px.
- Motion: translateY(-2px) on hover.
- Accent: thin blue left rule, more visible on hover.
- Media: fixed-ratio thumbnail, never floated.
- Text order: date, title, subtitle, excerpt, tags.

### Navigation And Footer

- Header uses compact mono brand and muted nav links.
- Footer stays minimal and editorial.
- Avoid status copy like "online", "operational", or "system active".

## Implementation Notes

- Prefer structural HTML classes over inherited Beautiful Jekyll float behavior.
- Keep cards responsive with CSS grid, not manual image switching.
- Use human-readable public dates on the feed.
- Keep future Stitch generations aligned to the quiet journal direction.
