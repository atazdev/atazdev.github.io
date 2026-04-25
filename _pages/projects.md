---
layout: page
title: Projects
subtitle: "Experiments, prototypes, and working notes"
---

<section class="resource-intro">
  <p class="profile-kicker">Project Index</p>
  <h2>Technical explorations and supporting work.</h2>
  <p>
    A collection of prototypes, research notes, and architectural experiments 
    connected to the journal.
  </p>
</section>

<div class="project-list">
  <section class="project-brief">
    <div class="brief-main">
      <span class="profile-kicker">Source Prototype</span>
      <h3>Dashboard Experiment</h3>
      <p>
        A Vite-based dashboard prototype designed for exploring operational interface 
        ideas separately from the main journal. This prototype serves as a sandbox for 
        high-fidelity UI experiments.
      </p>
      <div class="brief-actions">
        <a href="https://github.com/{{ site.repository }}/tree/main/dashboard" target="_blank" rel="noopener">View source</a>
      </div>
    </div>
    <div class="brief-sidebar">
      <div>
        <span class="sidebar-label">Payload</span>
        <ul class="tech-list">
          <li>React</li>
          <li>Vite</li>
          <li>Tailwind</li>
          <li>Lucide</li>
        </ul>
      </div>
      <div>
        <span class="sidebar-label">Status</span>
        <span class="status-value">// IN_PROTOTYPE</span>
      </div>
    </div>
  </section>

  <section class="project-brief">
    <div class="brief-main">
      <span class="profile-kicker">Design System</span>
      <h3>Modern Editorial V2</h3>
      <p>
        The current site design system: high-trust editorial surfaces, refined 
        typography scales, balanced grid layouts, and a content-first philosophy.
      </p>
      <div class="brief-actions">
        <a href="{{ '/resources' | relative_url }}">View resources</a>
      </div>
    </div>
    <div class="brief-sidebar">
      <div>
        <span class="sidebar-label">Payload</span>
        <ul class="tech-list">
          <li>Jekyll</li>
          <li>Inter</li>
          <li>JetBrains Mono</li>
        </ul>
      </div>
      <div>
        <span class="sidebar-label">Status</span>
        <span class="status-value">// PRODUCTION</span>
      </div>
    </div>
  </section>

  <section class="project-brief">
    <div class="brief-main">
      <span class="profile-kicker">Writing System</span>
      <h3>Knowledge Graph</h3>
      <p>
        The journal's series and topic navigation structure, designed to connect 
        recurring themes across security, DevSecOps, and architecture.
      </p>
      <div class="brief-actions">
        <a href="{{ '/tags' | relative_url }}">Browse topics</a>
      </div>
    </div>
    <div class="brief-sidebar">
      <div>
        <span class="sidebar-label">Payload</span>
        <ul class="tech-list">
          <li>Liquid</li>
          <li>Jekyll Series</li>
        </ul>
      </div>
      <div>
        <span class="sidebar-label">Status</span>
        <span class="status-value">// ACTIVE</span>
      </div>
    </div>
  </section>
</div>
