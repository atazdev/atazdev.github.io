---
layout: default
title: "Connection Lost"
permalink: /offline/
---

<section class="not-found-panel glass-panel" style="text-align: center; margin: 4rem auto; max-width: 500px;">
  <div style="font-family: var(--font-mono); font-size: 3rem; color: var(--accent-red); margin-bottom: 1.5rem; text-shadow: 0 0 10px rgba(248, 113, 113, 0.4);">
    [offline]
  </div>
  <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem;">
    Technical archives are unavailable without network sync.
  </p>
  <p style="font-size: 1rem; color: var(--text-primary); line-height: 1.6; margin-bottom: 2rem;">
    You are viewing the offline placeholder page. Cache index requires an active pipeline connection to transmit documents.
  </p>
  <a href="/" style="display: inline-block; font-family: var(--font-mono); font-size: 0.78rem; text-decoration: none !important; color: var(--accent-blue) !important; border: 1px solid var(--accent-blue); padding: 0.6rem 1.5rem; border-radius: 6px; background-color: transparent; transition: all 0.2s ease;"
     onmouseover="this.style.backgroundColor='rgba(56, 189, 248, 0.08)'" 
     onmouseout="this.style.backgroundColor='transparent'">
    Retry Sync
  </a>
</section>
