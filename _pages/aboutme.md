---
layout: page
title: About Me
subtitle: "Cybersecurity, cloud operations, and technical leadership"
---

<div class="profile-page">

<section class="profile-hero">
  <p class="profile-kicker">Professional Background</p>
  <h2>Cybersecurity and cloud operations leader</h2>
  <p>
    I work at the intersection of secure systems, cloud modernization, and technical
    leadership, with more than 20 years of experience across defense and commercial
    technology environments.
  </p>
</section>

<section class="profile-grid">
  <div class="profile-panel">
    <h3>Background</h3>
    <p>
      My work spans cyberspace operations, enterprise IT, cloud platforms, and
      software delivery practices for complex organizations.
    </p>
    <p>
      I am drawn to practical systems: the kind that teams can understand, operate,
      secure, and improve under real-world constraints.
    </p>
    <blockquote>
      I care about building high-trust teams and dependable technical foundations.
    </blockquote>
  </div>

  <div class="profile-panel">
    <h3>Technical Payload</h3>
    <div class="focus-list">
      <div class="status-value" style="margin-bottom: 1rem;">CISSP_CERTIFIED</div>
      <div class="status-value" style="margin-bottom: 1rem;">MS_CYBERSECURITY</div>
      <div style="margin-top: 2rem;">
        <span class="sidebar-label">Core Domains</span>
        <ul class="tech-list" style="margin-top: 1rem;">
          <li>Secure Delivery</li>
          <li>Cloud Operations</li>
          <li>Enterprise Risk</li>
          <li>Identity (IAM)</li>
          <li>Infrastructure (IaC)</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="profile-timeline">
  <h3>Experience</h3>
  
  {% assign timeline_entries = "" | split: "," %}
  
  {% capture e1 %}
  date: "Present"
  title: "Defense Sector Leadership"
  content: "Progressing through IT leadership roles across defense agencies, focusing on secure systems, cloud modernization, and technical strategy."
  tags: ["Leadership", "Strategy", "Cloud"]
  {% endcapture %}
  
  {% capture e2 %}
  date: "Education"
  title: "National Defense University"
  content: "Earned a **Master of Science in Cybersecurity**, specializing in enterprise risk and infrastructure security."
  tags: ["MS Cybersecurity", "Risk Management"]
  {% endcapture %}
  
  {% capture e3 %}
  date: "20+ Years"
  title: "Enterprise Technology"
  content: "Managed enterprise IT systems and led technical teams through complex modernization, operations, and security challenges."
  tags: ["Operations", "Modernization"]
  {% endcapture %}

  {% capture e4 %}
  date: "Early Career"
  title: "CNET"
  content: "Associate Technical Producer, deploying updates across major platforms using web technologies and early version control systems."
  tags: ["Web", "DevOps"]
  {% endcapture %}

  {% assign entries = "e1,e2,e3,e4" | split: "," %}
  
  <div class="mission-timeline">
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content glass-panel">
        <div class="timeline-header">
          <span class="timeline-date">Present</span>
          <h3 class="timeline-title">Defense Sector Leadership</h3>
        </div>
        <div class="timeline-body">
          Progressing through IT leadership roles across defense agencies, focusing on secure systems, cloud modernization, and technical strategy.
        </div>
        <div class="timeline-tags">
          <span class="timeline-tag">Leadership</span>
          <span class="timeline-tag">Strategy</span>
          <span class="timeline-tag">Cloud</span>
        </div>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content glass-panel">
        <div class="timeline-header">
          <span class="timeline-date">Education</span>
          <h3 class="timeline-title">National Defense University</h3>
        </div>
        <div class="timeline-body">
          Earned a **Master of Science in Cybersecurity**, specializing in enterprise risk and infrastructure security.
        </div>
        <div class="timeline-tags">
          <span class="timeline-tag">MS Cybersecurity</span>
          <span class="timeline-tag">Risk Management</span>
        </div>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content glass-panel">
        <div class="timeline-header">
          <span class="timeline-date">20+ Years</span>
          <h3 class="timeline-title">Enterprise Technology</h3>
        </div>
        <div class="timeline-body">
          Managed enterprise IT systems and led technical teams through complex modernization, operations, and security challenges.
        </div>
        <div class="timeline-tags">
          <span class="timeline-tag">Operations</span>
          <span class="timeline-tag">Modernization</span>
        </div>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content glass-panel">
        <div class="timeline-header">
          <span class="timeline-date">Early Career</span>
          <h3 class="timeline-title">CNET</h3>
        </div>
        <div class="timeline-body">
          Associate Technical Producer, deploying updates across major platforms using web technologies and early version control systems.
        </div>
        <div class="timeline-tags">
          <span class="timeline-tag">Web</span>
          <span class="timeline-tag">DevOps</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="profile-panel contact-panel">
  <h3>Contact</h3>
  <p>
    For questions, corrections, collaboration, or professional context, email is
    the most direct path. GitHub is best for site or writing-system changes.
  </p>
  <div class="follow-actions contact-actions">
    <a href="mailto:{{ site.social-network-links.email }}">Email</a>
    <a href="https://github.com/{{ site.social-network-links.github }}" target="_blank" rel="noopener">GitHub</a>
    <a href="{{ '/feed.xml' | relative_url }}">RSS</a>
  </div>
</section>

<section class="follow-block" aria-labelledby="about-cta-title">
  <div>
    <span class="profile-kicker">Next Steps</span>
    <h2 id="about-cta-title">Explore the writing system.</h2>
    <p>Start with the recommended reading path, browse projects, or reach out directly.</p>
  </div>
  <div class="follow-actions">
    <a href="{{ '/recommended' | relative_url }}">Read</a>
    <a href="{{ '/projects' | relative_url }}">Projects</a>
    <a href="mailto:{{ site.social-network-links.email }}">Contact</a>
  </div>
</section>

</div>
