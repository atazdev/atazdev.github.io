---
layout: page
title: DevSecOps
subtitle: "Secure delivery, automation, and policy-as-code"
---

<section class="resource-intro">
  <p class="profile-kicker">Cornerstone Topic</p>
  <h2>Security works best when it is built into the delivery system.</h2>
  <p>
    A curated path through posts on DevSecOps, automated controls, policy-as-code,
    and the engineering practices that make software delivery trustworthy.
  </p>
</section>

<div class="resource-grid">
  {% for post in site.posts %}
    {% if post.category == "devsecops" or post.tags contains "devsecops" or post.series == "Secure Delivery" %}
    <section class="resource-card">
      <span>{{ post.category | default: "delivery" }}</span>
      <h3>{{ post.title }}</h3>
      <p>{{ post.summary | default: post.subtitle }}</p>
      <a href="{{ post.url | relative_url }}">Read note</a>
    </section>
    {% endif %}
  {% endfor %}
</div>
