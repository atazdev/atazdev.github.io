---
layout: page
title: Projects
subtitle: "Experiments, prototypes, and working notes"
---

<section class="resource-intro">
  <p class="profile-kicker">Project Index</p>
  <h2>Small systems and experiments connected to the journal.</h2>
  <p>
    A place for prototypes, technical explorations, and supporting work that does
    not quite belong in a long-form essay.
  </p>
</section>

<div class="project-grid">
  <section class="project-card">
    <span>Source Prototype</span>
    <h3>Dashboard Experiment</h3>
    <p>
      A Vite-based dashboard prototype in the repository for exploring operational
      interface ideas separately from the Jekyll site. It is source-backed here
      and excluded from the Jekyll build until it has a dedicated deployment path.
    </p>
    <a href="https://github.com/{{ site.repository }}/tree/main/dashboard" target="_blank" rel="noopener">View source</a>
  </section>

  <section class="project-card">
    <span>Design System</span>
    <h3>Quiet Technical Journal</h3>
    <p>
      The current site design system: dark editorial surfaces, restrained motion,
      topic browsing, and a writing-first content model.
    </p>
    <a href="{{ '/resources' | relative_url }}">View resources</a>
  </section>

  <section class="project-card">
    <span>Writing System</span>
    <h3>Topic Map</h3>
    <p>
      The blog's topic index and related-post structure, used to connect recurring
      themes across AI, DevSecOps, architecture, and security.
    </p>
    <a href="{{ '/tags' | relative_url }}">Browse topics</a>
  </section>
</div>
