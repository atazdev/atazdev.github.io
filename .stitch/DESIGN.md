---
name: Ataz Labs Quiet Technical Journal
version: 1.1.0
description: A restrained, high-trust visual identity for technical writing, product notes, and engineering essays.
author: Codex via Stitch Skills
---

# Design System: Quiet Technical Journal

## Atmosphere & Vibe
The site should feel like a thoughtful engineering notebook: precise, calm, readable, and quietly modern. It keeps a dark technical foundation, but avoids militarized language, neon excess, glitch effects, and command-center metaphors.

- **Vibe:** Editorial, technical, focused, low-noise.
- **Surface Strategy:** Deep neutral backgrounds with subtle translucent surfaces, restrained borders, and soft depth.
- **Interaction Model:** Calm feedback through color, border contrast, and small movement. Avoid flicker, scanlines, aggressive glow, and animated distortion.

---

## Color Palette

### Base Surfaces
| Token | Hex | Role |
| :--- | :--- | :--- |
| `bg-primary` | `#0D1117` | Main page background |
| `bg-surface` | `#161B22` | Cards, navbars, content panels |
| `bg-elevated` | `#1C2128` | Hover states and raised surfaces |
| `border-subtle` | `#30363D` | Default structural borders |

### Accents
| Token | Hex | Role |
| :--- | :--- | :--- |
| `accent-blue` | `#38BDF8` | Primary links, selected states, quiet emphasis |
| `accent-green` | `#6EE7B7` | Positive states and rare secondary highlights |
| `accent-red` | `#F87171` | Error and destructive states |

### Typography
| Token | Hex | Role |
| :--- | :--- | :--- |
| `text-primary` | `#E6EDF3` | High-contrast body and heading text |
| `text-muted` | `#8B949E` | Dates, captions, metadata, inactive labels |

---

## Typography

### Font Families
- **Technical Labels:** `'JetBrains Mono'`, monospace — navigation, metadata, code, and compact labels.
- **Narrative Body:** `'Inter'`, sans-serif — long-form reading and excerpts.

### Scale
- **H1:** 2.25rem to 2.5rem | Mono | Bold | tight but readable tracking
- **H2:** 1.25rem | Mono | Semi-bold | subtle blue or neutral emphasis
- **Body:** 1rem | Sans | Regular | 1.75 to 1.85 line-height
- **Metadata:** 0.72rem to 0.78rem | Mono | All-caps optional | modest tracking

---

## Signature Components

### 1. Quiet Header
- **Background:** Solid `#0D1117` with a subtle neutral bottom border.
- **Brand:** Compact mono wordmark, white by default, blue on hover.
- **Navigation:** Muted labels with blue hover states. Avoid blinking cursors or glitch animation.

### 2. Journal Preview Cards
- **Style:** Translucent `bg-surface`, `1px` neutral border, 8px radius.
- **Interaction:** On hover, lift by 2px, increase border contrast, and reveal a thin blue left rule.
- **Content:** Date, title, subtitle, excerpt, and small topic chips. Keep hierarchy editorial rather than operational.

### 3. Tags And Metadata
- **Tags:** Small outlined chips using muted text and blue emphasis.
- **Dates:** Human-readable dates are preferred on public-facing pages.
- **Labels:** Use plain terms like "Journal," "Notes," and "Essays" instead of tactical/status language.

---

## Future Enhancements

1. **Editorial Feed Filters:** Add unobtrusive topic filters above the post list.
2. **Reading Density Modes:** Offer comfortable and compact layouts for the post index.
3. **Featured Essay Treatment:** Let the newest or pinned essay have a wider layout with stronger typography.
4. **Better Thumbnail System:** Use consistent aspect ratios and soft image treatments instead of floated thumbnails.
