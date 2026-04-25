---
layout: page
title: AI Governance
subtitle: "Controls, accountability, and runtime policy for AI-enabled systems"
---

<section class="resource-intro">
  <p class="profile-kicker">Cornerstone Topic</p>
  <h2>AI governance is moving from review boards into delivery pipelines and runtime systems.</h2>
  <p>
    This path collects notes on agentic development, zero trust for AI, runtime
    policy, and the operating model needed when automation starts making decisions.
  </p>
</section>

<div class="concept-grid">
  <section>
    <h3>Why It Matters</h3>
    <p>AI systems are becoming participants in delivery, operations, and decision workflows. Governance has to move closer to where those systems act.</p>
  </section>
  <section>
    <h3>Key Concepts</h3>
    <p>Runtime policy, agent accountability, zero trust for AI systems, auditability, and human oversight.</p>
  </section>
  <section>
    <h3>Start With</h3>
    <p>Begin with runtime governance, then move into CI/CD controls and zero trust patterns for AI-enabled environments.</p>
  </section>
</div>

<div class="resource-grid">
  {% for post in site.posts %}
    {% if post.series == "AI Governance" or post.tags contains "ai" %}
    <section class="resource-card">
      <span>{{ post.category | default: "ai" }}</span>
      <h3>{{ post.title }}</h3>
      <p>{{ post.summary | default: post.subtitle }}</p>
      <a href="{{ post.url | relative_url }}">Read note</a>
    </section>
    {% endif %}
  {% endfor %}
</div>
