---
name: Ataz Labs Tactical Terminal
version: 1.0.0
description: A high-fidelity, mission-ready visual identity system blending terminal-core aesthetics with modern UI/UX principles.
author: Antigravity (via Stitch Skills)
---

# 🛡️ Design System: Tactical Terminal

## 🌌 Atmosphere & Vibe
The "Tactical Terminal" system is designed to feel like a mission-critical command interface. It prioritizes information density, legibility under low-light conditions, and a sense of "active system" engagement.

- **Vibe:** Minimalist, Brutalist, Tech-Noir, Precise.
- **Surface Strategy:** Deep obsidian backgrounds with layered elevation using subtle borders rather than heavy shadows.
- **Interaction Model:** "Active" feedback (scan-lines, blinking cursors, neon glows) that makes the interface feel alive.

---

## 🎨 Color Palette

### Base Surfaces
| Token | Hex | Role |
| :--- | :--- | :--- |
| `bg-primary` | `#0D1117` | Main page background (Deep Obsidian) |
| `bg-surface` | `#161B22` | Card backgrounds, navbars |
| `bg-elevated` | `#1C2128` | Hover states, active modal layers |
| `border-subtle` | `#30363D` | Default structural borders |

### Tactical Accents
| Token | Hex | Role |
| :--- | :--- | :--- |
| `accent-green` | `#00FF88` | "System Go" status, primary actions, branding |
| `accent-blue` | `#0EA5E9` | "Processing" status, info links, secondary highlights |
| `accent-red` | `#FF4444` | "Alert" status, critical errors, destructive actions |

### Typography
| Token | Hex | Role |
| :--- | :--- | :--- |
| `text-primary` | `#E6EDF3` | High-contrast body and header text |
| `text-muted` | `#8B949E` | Secondary metadata, captions, inactive labels |

---

## 🔡 Typography

### Font Families
- **System/Data:** `'JetBrains Mono'`, monospace — Used for headers, nav, labels, and code.
- **Narrative/Body:** `'Inter'`, sans-serif — Used for long-form reading to reduce cognitive load.

### Scale
- **H1 (Hero):** 2.5rem | Mono | Bold | -0.02em tracking
- **H2 (Section):** 1.25rem | Mono | Semi-Bold | Green left-border (3px)
- **Body:** 1rem | Sans | Regular | 1.85 line-height
- **Metadata:** 0.75rem | Mono | All-Caps | 0.1em tracking

---

## 🧩 Signature Components

### 1. The Tactical Header
- **Background:** Solid `#0D1117` with a `1px` bottom-border of `accent-green`.
- **Brand:** Uppercase Mono text with a trailing blinking underscore (`_`).
- **Status:** A small, low-opacity "SYSTEM STATUS: ACTIVE" label in the nav.

### 2. Post Preview Cards
- **Style:** `bg-surface` with a `1px` border and a `3px` accent-green left-tab.
- **Interaction:** On hover, transform `translateX(4px)` and activate a subtle scan-line overlay.
- **Glow:** Add a `0 0 20px rgba(0, 255, 136, 0.05)` glow on hover.

### 3. Intel Callouts (Blockquotes)
- **Prefix:** Every blockquote starts with a `// INTEL` mono-label in `accent-blue`.
- **Styling:** Italicized text with a blue left-border and light surface tint.

---

## ⚡ WOW-Factor Enhancements (Future)

1.  **Glassmorphism Layers:** Use `backdrop-filter: blur(8px)` on navigation and modals to add depth to the dark theme.
2.  **CRT Scanlines:** Implement a global (or component-level) CSS overlay that simulates a high-end terminal monitor.
3.  **Terminal Transitions:** Use "typing" animations for hero headlines and "staggered fade-in" for grid items to mimic a system boot sequence.
4.  **Neon Depth:** Use very subtle outer glows (`box-shadow`) on primary buttons to make them pop against the obsidian background.
