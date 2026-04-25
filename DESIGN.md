---
name: Ataz Labs Modern Editorial
version: 2.0.0
description: A high-authority, technical journal design system prioritizing readability, trust, and professional engagement.
author: AtazDev (via Antigravity)
---

# 🛡️ Design System: Modern Editorial

## 🌌 Atmosphere & Vibe
The "Modern Editorial" system is designed for high-end technical communication. It blends the precision of engineering with the readability of premium tech publications.

- **Vibe:** Authoritative, Clean, Minimalist, High-Trust.
- **Surface Strategy:** Deep obsidian backgrounds (`#0D1117`) with refined glassmorphism for navigation and interactive components.
- **Design Philosophy:** Content-first. Use white space (and "obsidian space") to drive focus. Tactical accents are used as subtle status indicators rather than heavy structural elements.

---

## 🎨 Color Palette

### Base Surfaces
| Token | Hex | Role |
| :--- | :--- | :--- |
| `bg-primary` | `#0D1117` | Main page background (Deep Obsidian) |
| `bg-surface` | `#161B22` | Panel backgrounds, CTAs, navbars |
| `border-subtle` | `#30363D` | Default structural borders |

### Functional Accents
| Token | Hex | Role |
| :--- | :--- | :--- |
| `accent-green` | `#00FF88` | Active status, primary CTA borders, success states |
| `accent-blue` | `#0EA5E9` | Technical metadata, secondary links, informational markers |

---

## 🔡 Typography

### Font Families
- **Editorial/Narrative:** `'Inter'`, sans-serif — Primary font for all headers and body copy.
- **Technical/Data:** `'JetBrains Mono'`, monospace — Reserved for metadata, code, and functional labels.

### Scale & Hierarchy
- **H1 (Primary Heading):** 2.5rem | Inter | Extra-Bold | 1.1 line-height
- **H2 (Section Heading):** 1.75rem | Inter | Bold | 1.2 line-height
- **H3 (Subheading):** 1.1rem | Inter | Semi-Bold | Border-bottom or subtle accent
- **Body Copy:** 1rem | Inter | Regular | 1.6 line-height
- **Technical Labels:** 0.75rem | Mono | Uppercase | 0.15em tracking

---

## 🧩 Signature Components

### 1. The Editorial Header
- **Navigation:** Compact, glassmorphic (`backdrop-filter: blur(12px)`) with a subtle `accent-blue` active state indicator.
- **Brand:** Bold Inter typography. Branding is clean and static (no blinking cursors in this version).

### 2. High-Impact CTA (Follow Block)
- **Style:** `bg-surface` with a `1px` border and `12px` corner radius.
- **Layout:** Flexbox-based split between narrative text and primary action buttons.
- **Button Aesthetic:** Outline-based buttons with `accent-green` borders that fill on hover.

### 3. Service Timeline
- **Style:** Vertical timeline with glowing `accent-green` nodes (`box-shadow` depth).
- **Typography:** Mono labels for "Phases" or "Dates" paired with Inter body text for descriptions.

---

## ⚡ Visual Language Guidelines

1.  **Consistency:** Never mix Mono and Inter within the same paragraph. Use Mono only for distinct data points.
2.  **Elevation:** Use `bg-surface` for cards. Avoid heavy drop-shadows; use subtle border highlights to define depth.
3.  **Interaction:** Use "soft-lift" transitions (`transform: translateY(-4px)`) for interactive cards to provide tactile feedback.
