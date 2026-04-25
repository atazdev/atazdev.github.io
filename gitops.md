---
layout: page
title: GitOps
subtitle: "Declarative operations and reproducible infrastructure"
---

<section class="resource-intro">
  <p class="profile-kicker">Cornerstone Topic</p>
  <h2>GitOps turns operational intent into reviewable, versioned, recoverable state.</h2>
  <p>
    Notes on declarative infrastructure, automated reconciliation, software supply
    chains, and delivery practices that keep complex systems understandable.
  </p>
</section>

<div class="resource-grid">
  {% for post in site.posts %}
    {% if post.category == "gitops" or post.tags contains "gitops" %}
    <section class="resource-card">
      <span>{{ post.category | default: "gitops" }}</span>
      <h3>{{ post.title }}</h3>
      <p>{{ post.summary | default: post.subtitle }}</p>
      <a href="{{ post.url | relative_url }}">Read note</a>
    </section>
    {% endif %}
  {% endfor %}
</div>
