---
layout: page
title: Recommended Reading
subtitle: "A short path for new readers"
---

<section class="resource-intro">
  <p class="profile-kicker">Recommended</p>
  <h2>Start with these notes if you are new here.</h2>
  <p>
    A curated set of posts that best represent the site's themes: secure delivery,
    AI governance, architecture, and technical systems thinking.
  </p>
</section>

<div class="resource-grid">
  {% for post in site.posts %}
    {% if post.featured %}
    <section class="resource-card">
      <span>{{ post.category }}</span>
      <h3>{{ post.title }}</h3>
      <p>{{ post.summary | default: post.subtitle }}</p>
      <a href="{{ post.url | relative_url }}">Read note</a>
    </section>
    {% endif %}
  {% endfor %}
</div>
