---
layout: post
title: "The Defense DevSecOps Toolkit"
subtitle: "Every policy document, platform, and pipeline tool referenced across the Secure Delivery series — in one index"
date: 2026-07-13
category: devsecops
series: "Resource Guides"
summary: "A curated index of the policy documents, NIST publications, Platform One services, pipeline tools, and compliance resources that defense software teams actually use."
featured: true
last-updated: 2026-07-13
full-width: true
toc: false
resource-index: true
tags: [devsecops, defense, resources, tools, compliance, nist, dod, platform-one, cmmc, sbom]
---

**The Big Picture:** Defense DevSecOps runs on a knowable set of documents, platforms, and tools. This index collects them in one place — the same sources cited across the Secure Delivery series.

---

### Why It Matters
Half the time lost on a defense software program is spent finding the authoritative document or the right tool, not reading it. Bookmark this page instead. Every link is the primary source or the working tool — no vendor summaries in between.

### The Details
- **Policy & Strategy:** The DoD-level documents that set the rules — CSRMC, DoDI 8510.01, the Zero Trust Strategy, cATO criteria.
- **NIST Publications:** The control catalogs and frameworks the evidence maps to.
- **Platforms & Pipeline Tools:** Platform One services and the open-source tools that produce the evidence.
- **Compliance & Training:** CMMC bodies, assessment portals, and where to build the skills.

*Bolding indicates resources I use or have used directly; non-bolded links are curated for reference. Verify the current version of any policy document before citing it — issuances change.*

<section class="resource-start" aria-labelledby="devsecops-toolkit-start">
  <div class="section-label">
    <span id="devsecops-toolkit-start">Start here</span>
    <span>Curated paths</span>
  </div>
  <div class="resource-path-grid">
    <a href="#policy-strategy">
      <span>Policy path</span>
      <strong>Policy &amp; Strategy</strong>
      <em>New to defense compliance? Start with the documents that set the rules of the game.</em>
    </a>
    <a href="#pipeline-tools">
      <span>Builder path</span>
      <strong>Pipeline &amp; DevOps Tools</strong>
      <em>Jump here for the scanners, policy engines, and GitOps controllers that produce evidence.</em>
    </a>
    <a href="#platform-cloud">
      <span>Platform path</span>
      <strong>Platform One &amp; Cloud</strong>
      <em>Use these when you're deploying on DoD platforms and inheriting their controls.</em>
    </a>
    <a href="#compliance-assessment">
      <span>Compliance path</span>
      <strong>CMMC &amp; Assessment</strong>
      <em>Start here when a contract clause or a C3PAO assessment is the forcing function.</em>
    </a>
  </div>
</section>

<section class="resource-featured" aria-labelledby="devsecops-toolkit-featured">
  <div class="section-label">
    <span id="devsecops-toolkit-featured">Featured resources</span>
    <span>High-signal sources</span>
  </div>
  <div class="resource-featured-grid">
    <a href="https://p1.dso.mil/"><span>Platform</span><strong>Platform One</strong></a>
    <a href="https://public.cyber.mil/stigs/"><span>Hardening</span><strong>DISA STIGs</strong></a>
    <a href="https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"><span>Controls</span><strong>NIST SP 800-53</strong></a>
    <a href="https://media.defense.gov/2025/Sep/24/2003808112/-1/-1/1/DOD-CIO-CYBER-SECURITY-RISK-MANAGEMENT-CONSTRUCT.PDF"><span>Framework</span><strong>DoD CSRMC</strong></a>
    <a href="https://www.openpolicyagent.org/"><span>Policy engine</span><strong>Open Policy Agent</strong></a>
    <a href="https://www.sigstore.dev/"><span>Signing</span><strong>Sigstore</strong></a>
  </div>
</section>

<section class="resource-filter" aria-label="Filter defense devsecops resources">
  <span>Filter the index</span>
  <div class="resource-filter-controls">
    <button class="resource-filter-button active" type="button" data-resource-filter="all">All</button>
    <button class="resource-filter-button" type="button" data-resource-filter="security">Security</button>
    <button class="resource-filter-button" type="button" data-resource-filter="devops">DevOps</button>
    <button class="resource-filter-button" type="button" data-resource-filter="cloud">Cloud</button>
    <button class="resource-filter-button" type="button" data-resource-filter="education">Education</button>
  </div>
</section>

## Resource Index

* <a id="policy-strategy"></a>[DoD Policy & Security Strategy](https://dodcio.defense.gov/Library/)
  * **[DoD CIO Cybersecurity Risk Management Construct (CSRMC)](https://media.defense.gov/2025/Sep/24/2003808112/-1/-1/1/DOD-CIO-CYBER-SECURITY-RISK-MANAGEMENT-CONSTRUCT.PDF)** — the RMF replacement; covered in [my RMF 2.0 post](/2026-07-05-army-rmf-2-0/)
  * **[CSRMC Strategic Tenets](https://media.defense.gov/2025/Sep/24/2003808111/-1/-1/1/DOD-CIO-CYBER-SECURITY-RISK-MANAGEMENT-CONSTRUCT-STRATEGIC-TENETS.PDF)** — the ten tenets, one page each
  * **[DoDI 8510.01 — Risk Management Framework for DoD Systems](https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/851001p.pdf)** — still the issuance of record during transition
  * **[Continuous ATO Evaluation Criteria](https://dodcio.defense.gov/Portals/0/Documents/Library/cATO-EvaluationCriteria.pdf)** — what the DoD actually checks; pairs with [my cATO post](/2026-07-12-continuous-ato-in-practice/)
  * **[DoD Zero Trust Strategy](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD-ZTStrategy.pdf)** — the FY2027 mandate; covered [here](/2026-04-25-dod-zero-trust-strategy/)
  * [DoD AI Cybersecurity Risk Management Tailoring Guide](https://dodcio.defense.gov/Portals/0/Documents/Library/AI-CybersecurityRMTailoringGuide.pdf) — how models get authorized; covered in [ATO for AI Systems](/2026-07-12-ato-for-ai-systems/)
  * [EO 14028 — Improving the Nation's Cybersecurity](https://www.federalregister.gov/documents/2021/05/17/2021-10460/improving-the-nations-cybersecurity) — the order behind SBOM and ZT mandates
  * [DoD CIO Library](https://dodcio.defense.gov/Library/) — the index of record when you need the current version of anything above

* [NIST Security Publications & Frameworks](https://csrc.nist.gov/publications)
  * **[SP 800-37r2 — Risk Management Framework](https://csrc.nist.gov/pubs/sp/800/37/r2/final)** — the framework CSRMC restructures
  * **[SP 800-53r5 — Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)** — the control catalog everything maps to
  * **[SP 800-171r3 — Protecting CUI](https://csrc.nist.gov/pubs/sp/800/171/r3/final)** — the CMMC Level 2 baseline
  * [SP 800-172 — Enhanced Requirements for CUI](https://csrc.nist.gov/pubs/sp/800/172/final) — the Level 3 delta
  * **[SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)** — the ZT reference model
  * [SP 800-218 — Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final) — the EO 14028 development standard
  * [SP 800-161r1 — Supply Chain Risk Management](https://csrc.nist.gov/pubs/sp/800/161/r1/final) — the C-SCRM practices behind the SR controls
  * **[OSCAL — Open Security Controls Assessment Language](https://pages.nist.gov/OSCAL/)** — machine-readable compliance; the foundation of cATO evidence
  * [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — Govern, Map, Measure, Manage
  * [SP 800-53 Control Overlays for Securing AI Systems (COSAIS)](https://csrc.nist.gov/Projects/cosais) — the AI overlays, drafts landing Q3 2026

* <a id="platform-cloud"></a>[Platform One & DoD Cloud Services](https://p1.dso.mil/)
  * **[Platform One](https://p1.dso.mil/)** — the DoD DevSecOps platform; the reference cATO implementation
  * **[Iron Bank](https://p1.dso.mil/services/iron-bank)** — hardened container registry with inheritance-ready assessments
  * [Iron Bank Documentation](https://docs-ironbank.dso.mil/) — onboarding and hardening requirements for getting an image accepted
  * **[Big Bang](https://repo1.dso.mil/big-bang/bigbang)** — the P1 Kubernetes baseline (Istio, Kyverno, Falco) as code
  * **[Repo One](https://repo1.dso.mil/)** — DoD source repository; pipelines with mandatory policy gates
  * **[DoD Cyber Exchange](https://public.cyber.mil/)** — STIGs, SRGs, and cyber policy in one place
  * **[DISA STIGs](https://public.cyber.mil/stigs/)** — the hardening baselines assessors check against
  * [NSA/CISA Kubernetes Hardening Guidance](https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF) — the K8s baseline worth reading before the STIG

* <a id="pipeline-tools"></a>[Pipeline Security & DevOps Tooling](https://www.cncf.io/projects/)
  * **[Open Policy Agent](https://www.openpolicyagent.org/)** — policy as code; the engine behind most pipeline gates ([my PaC post](/2026-02-05-policy-as-code-devsecops/))
  * **[Kyverno](https://kyverno.io/)** — Kubernetes-native policy; easier entry than Rego for K8s-only shops
  * [OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/) — OPA as a K8s admission controller
  * **[Checkov](https://www.checkov.io/)** — IaC scanning for Terraform, CloudFormation, K8s manifests
  * **[Trivy](https://trivy.dev/)** — container and dependency scanning plus SBOM generation in one pass
  * [Semgrep](https://semgrep.dev/) — SAST with writable rules; tune it for LLM failure modes ([why that matters](/2026-03-22-ai-agents-cicd-pipeline/))
  * **[Argo CD](https://argo-cd.readthedocs.io/)** — GitOps controller; declarative state reconciliation ([the GitOps case](/2026-01-27-gitops-modern-age/))
  * [Flux](https://fluxcd.io/) — the other GitOps controller; lighter footprint, same principle
  * [detect-secrets](https://github.com/Yelp/detect-secrets) — pre-commit secret scanning; cheapest control you'll ever implement

* [Supply Chain & SBOM Security](https://www.cisa.gov/sbom)
  * **[Syft](https://github.com/anchore/syft)** — SBOM generation for containers and filesystems; SPDX and CycloneDX output
  * **[Grype](https://github.com/anchore/grype)** — vulnerability correlation against the SBOM
  * [cdxgen](https://github.com/CycloneDX/cdxgen) — CycloneDX-native generation; strongest polyglot support
  * [OWASP Dependency-Track](https://dependencytrack.org/) — continuous SBOM monitoring against new CVEs
  * **[Sigstore / cosign](https://www.sigstore.dev/)** — artifact signing and verification
  * [SLSA](https://slsa.dev/) — supply chain integrity levels; the provenance framework
  * [SPDX](https://spdx.dev/) — the ISO SBOM format
  * [CycloneDX](https://cyclonedx.org/) — the OWASP SBOM format; native VEX support
  * [CISA SBOM Resources](https://www.cisa.gov/sbom) — minimum elements and current guidance ([my SBOM post](/2026-06-20-sbom-dib-supply-chain/))
  * [OSV](https://osv.dev/) — open source vulnerability database
  * [NVD](https://nvd.nist.gov/) — the National Vulnerability Database

* <a id="compliance-assessment"></a>[CMMC, Compliance & Security Assessment](https://dodcio.defense.gov/cmmc/)
  * **[CMMC Program (DoD CIO)](https://dodcio.defense.gov/cmmc/)** — the official program page; start here, not with vendors ([my CMMC post](/2026-04-29-cmmc-2-in-practice/))
  * [The Cyber AB](https://cyberab.org/) — the accreditation body; C3PAO marketplace
  * [DIBNet](https://dibnet.dod.mil/) — the 72-hour incident reporting portal; know it before you need it
  * [eMASS (DCSA)](https://www.dcsa.mil/Systems-Applications/Enterprise-Mission-Assurance-Support-Service-eMASS/) — where authorization packages live
  * [Lula](https://github.com/defenseunicorns/lula) — validates K8s state against OSCAL-defined controls
  * [Compliance Trestle](https://github.com/oscal-compass/compliance-trestle) — the OSCAL SDK for automating SSP and assessment artifacts
  * [FedRAMP](https://www.fedramp.gov/) — cloud service authorization; the inheritance source for most SaaS controls

* [Getting Started: Education & Training](https://public.cyber.mil/training/)
  * [DoD Cyber Exchange Training](https://public.cyber.mil/training/) — free role-based training, including RMF and ZT courses
  * [Defense Acquisition University](https://www.dau.edu/) — acquisition and cybersecurity credentials; free for the workforce
  * **[CIS Critical Security Controls](https://www.cisecurity.org/controls)** — the threat-informed control set behind Army RMF 2.0's baseline
  * **[MITRE ATT&CK](https://attack.mitre.org/)** — the adversary behavior catalog; the "threat" in threat-informed
  * [NIST RMF Small Enterprise Quick Start](https://csrc.nist.gov/projects/risk-management/about-rmf) — the plain-language RMF walkthrough
  * [The Secure Delivery series on this blog](/2026-07-12-continuous-ato-in-practice/) — GitOps → Policy as Code → Zero Trust → CMMC → SBOM → cATO, in reading order

###### [TOC](#toc)
