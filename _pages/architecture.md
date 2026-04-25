---
layout: page
title: Architecture
subtitle: "Systems, platforms, and operating models"
---

<section class="resource-intro">
  <p class="profile-kicker">Cornerstone Topic</p>
  <h2>Architecture is the shape of tradeoffs made visible.</h2>
  <p>
    A path through system design, distributed operations, platform decisions, and
    the patterns that help teams reason about complex technical environments.
  </p>
</section>

<div class="concept-grid">
  <section>
    <h3>Why It Matters</h3>
    <p>Architecture gives teams a shared way to reason about tradeoffs, constraints, and failure modes.</p>
  </section>
  <section>
    <h3>Key Concepts</h3>
    <p>Distributed systems, platform boundaries, data flow, resilience, and operating models.</p>
  </section>
  <section>
    <h3>Start With</h3>
    <p>Begin with system design fundamentals, then explore software-defined operations.</p>
  </section>
</div>

<div class="resource-grid">
  {% for post in site.posts %}
    {% if post.category == "architecture" or post.tags contains "architecture" or post.tags contains "system-design" %}
    <section class="resource-card">
      <span>{{ post.category | default: "architecture" }}</span>
      <h3>{{ post.title }}</h3>
      <p>{{ post.summary | default: post.subtitle }}</p>
      <a href="{{ post.url | relative_url }}">Read note</a>
    </section>
    {% endif %}
  {% endfor %}
</div>
