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
