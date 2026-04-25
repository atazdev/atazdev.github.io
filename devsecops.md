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

<div class="concept-grid">
  <section>
    <h3>Why It Matters</h3>
    <p>Security that depends on manual review alone does not scale. DevSecOps turns security expectations into repeatable delivery behavior.</p>
  </section>
  <section>
    <h3>Key Concepts</h3>
    <p>Policy-as-code, automated gates, secure pipelines, continuous validation, and shared responsibility.</p>
  </section>
  <section>
    <h3>Start With</h3>
    <p>Read the policy-as-code note first, then follow the Secure Delivery series.</p>
  </section>
</div>

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
