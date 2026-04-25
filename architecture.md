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
