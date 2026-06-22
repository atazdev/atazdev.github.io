---
layout: post
title: "SBOM in the Defense Industrial Base"
subtitle: "EO 14028 mandated it. CISA defined it. Contractors are still figuring out how to actually deliver it."
date: 2026-06-20
category: cybersecurity
series: "Secure Delivery"
summary: "A practical breakdown of SBOM requirements, format standards, toolchain options, and where DIB contractors consistently fall short when the contracting officer asks for one."
featured: true
last-updated: 2026-06-20
share-img: /assets/img/hero/hero-runtime-governance.png
tags: [sbom, supply-chain, defense, cybersecurity, nist, dod, dib, devsecops, cmmc]
---

<figure class="post-figure">
  <img src="/assets/img/hero/hero-runtime-governance.png" alt="Software supply chain dependency graph with provenance tracking">
  <figcaption>SBOM_STATUS: DEPENDENCY_GRAPH_INCOMPLETE — PROVENANCE_CHAIN_UNVERIFIED</figcaption>
</figure>

## The Mandate That Changed Software Procurement

**Executive Order 14028** — signed May 2021 — did something novel for federal IT policy: it made software transparency a contractual requirement, not a best practice. Section 4 directed NIST to define minimum elements for a Software Bill of Materials, and directed federal agencies to require SBOMs from software vendors. The order was triggered by SolarWinds and Kaseya, two incidents where attackers exploited the opacity of software supply chains to move laterally through government networks without detection.

Three years later, NIST delivered **SP 800-218** (Secure Software Development Framework), **SP 800-161r1** (C-SCRM Practices), and CISA published its minimum SBOM element guidance. OMB followed with **M-23-16** requiring agencies to collect SBOMs for software used in federal environments. The regulatory scaffolding is complete. The procurement reality is more complicated.

## What an SBOM Actually Is

An SBOM is a machine-readable inventory of every software component in a given artifact — libraries, packages, operating system layers, and their transitive dependencies — along with version information, licensing data, and provenance metadata.

The practical value is vulnerability correlation: when a new CVE drops for a specific component version, an organization with current SBOMs can immediately identify every system in its environment running that version and prioritize remediation without manual scanning. Log4Shell in December 2021 demonstrated the cost of not having this capability — organizations spent weeks answering the question "are we affected?" that an SBOM would have answered in minutes.

CISA's minimum elements define three data categories an SBOM must contain to be actionable:

| Category | Required Fields |
|---|---|
| **Supplier Name** | Who provides the component (not who uses it) |
| **Component Name** | As published — not internal nicknames |
| **Version of Component** | Exact version string, not ranges |
| **Other Unique Identifiers** | CPE, PURL, or hash-based identifier |
| **Dependency Relationship** | What depends on what |
| **Author of SBOM Data** | Who generated the document, with timestamp |
| **Timestamp** | When the SBOM was created |

These are minimum elements. A useful SBOM for CUI environments also includes license expressions, known vulnerabilities at time of generation, and integrity hashes for each component.

## The Format Question: SPDX vs. CycloneDX

Two formats dominate the SBOM ecosystem. The contracting officer's solicitation will typically specify one; understanding both is necessary for toolchain selection.

**SPDX (Software Package Data Exchange)** — ISO/IEC 5962:2021 — was developed by the Linux Foundation with a focus on license compliance. It is the older standard, with broad tooling support and the advantage of being an ISO standard (which matters for some acquisition vehicles). SPDX 2.3 added support for vulnerability data and relationships that make it more competitive for security use cases.

**CycloneDX** — maintained by OWASP — was built security-first. It natively supports vulnerability information (VEX — Vulnerability Exploitability eXchange), hardware BOMs, machine learning model BOMs, and service dependency graphs. For defense contractors producing embedded systems or ML-enabled software, CycloneDX's hardware BOM support is a meaningful differentiator.

The practical answer for most DIB contractors: generate both. The toolchain overhead is minimal, and federal customers have not standardized on one format. Syft generates both natively. The NTIA interoperability study confirmed that minimal-element SBOMs in either format are parseable by both communities.

## The Toolchain

An SBOM pipeline has three stages: generation, enrichment, and distribution. Most organizations have only stage one.

**Generation tools** scan build artifacts, containers, or source trees and produce raw SBOMs:

- **Syft** (Anchore) — open source, generates SPDX and CycloneDX, works on container images, filesystems, and language-specific manifests. The de facto standard for container-era workloads.
- **Trivy** (Aqua Security) — open source, combines SBOM generation with vulnerability scanning in a single pass. Well-suited for CI pipeline integration.
- **cdxgen** — open source, CycloneDX-native, strong support for polyglot repos and language-specific package managers that Syft sometimes misses.
- **FOSSA** and **Snyk** — commercial, add license compliance workflows and continuous monitoring. Common in enterprises with legal requirements around open source licensing.

**Enrichment** is where most pipelines stop prematurely. A raw SBOM from Syft is a snapshot of components with version strings. An actionable SBOM correlates those versions against known vulnerability databases — NVD, OSV, GitHub Advisory — and produces either a scored vulnerability list or a VEX document asserting which known vulnerabilities are not exploitable in this context. **Grype** (Anchore), **OWASP Dependency-Track**, and **Trivy** all perform this enrichment step.

**Distribution** — securely delivering SBOMs to customers alongside software releases — is operationally immature across most of the DIB. The emerging standard is embedding SBOMs as OCI artifacts attached to container image digests (using tools like **cosign** and the ORAS spec). For traditional software deliverables, contractual delivery alongside the release package is still common and acceptable.

## The CMMC Connection

**NIST SP 800-171 Rev 3** — incorporated in the CMMC 2.0 final rule (December 2024) — added supply chain risk management controls that directly reference SBOM practices. Control **SR.1.001** requires identifying, assessing, and managing supply chain risks. **SR.2.002** requires establishing and managing a provenance record for the software, hardware, and services used in organizational systems.

Assessors interpreting these controls look for evidence that the organization knows what software components are running in its CUI environment and has a mechanism to respond when vulnerabilities are identified in those components. A maintained SBOM pipeline, coupled with a vulnerability tracking system, satisfies this evidence requirement in a way that manual software inventories do not. Organizations that lack SBOMs will find SR controls among the hardest to demonstrate during a C3PAO assessment.

## Where DIB Contractors Actually Fail

**1. Transitive dependencies are invisible.**
Most contractors generate SBOMs for their own code and direct dependencies but stop there. A Log4j-style vulnerability lives in a transitive dependency — a library pulled in by a library you explicitly depend on. SBOMs that only capture declared dependencies miss the attack surface that matters most. Tools must be configured for recursive dependency resolution, which requires more accurate build environment replication.

**2. SBOM generation is not in the build pipeline.**
SBOMs generated manually, infrequently, or before the final build artifact diverge from what is actually shipped. An SBOM attached to a release that was generated from source rather than the final compiled artifact may be inaccurate. SBOM generation must run as a pipeline step against the final artifact — the container image digest or the compiled binary — not against source manifests.

**3. Container base layer provenance is missing.**
A CycloneDX or SPDX document that accounts for application dependencies but not the OS packages in the container base layer is incomplete. An attacker who compromises a vulnerable `glibc` version in the base layer does not care that your application dependencies are well-inventoried. Full container SBOMs require scanning all layers, not just application files.

**4. VEX documents are not being produced.**
A complete SBOM often surfaces dozens of known CVEs in dependencies — many of which are not actually exploitable in the specific deployment context. Without a **VEX (Vulnerability Exploitability eXchange)** document asserting which vulnerabilities are not exploitable and why, contracting officers and security teams reviewing SBOMs are left with uncontextualized vulnerability lists that generate false urgency. VEX is the complement to SBOM that makes the vulnerability data actionable rather than alarming.

**5. SBOMs are treated as a deliverable, not a capability.**
The most common failure: contractors produce an SBOM once, attach it to the initial contract deliverable, and stop. Software changes. Dependencies are updated. Vulnerabilities are disclosed. An SBOM that does not track the actual running software is not a supply chain risk management capability — it is a document artifact that satisfies a checkbox without providing the underlying value. SBOMs must be regenerated on every meaningful software change and continuously correlated against current vulnerability intelligence.

## The Operational Model That Works

Organizations that have solved SBOM operationally share a pipeline pattern:

1. **Generation on merge to main** — Syft or Trivy runs in the post-build CI stage against the final artifact. SBOM output is stored as a build artifact alongside binaries.
2. **Vulnerability enrichment at release time** — Grype or Dependency-Track correlates the SBOM against current CVE feeds and produces a scored vulnerability report.
3. **VEX generation for high-severity findings** — Security engineers review critical CVEs, produce VEX documents asserting exploitability status, and attach them to the release package.
4. **Continuous monitoring** — Dependency-Track or a commercial equivalent monitors production SBOMs against new CVE publications and alerts on new exposures in deployed software — not just at release time.
5. **Contractual delivery** — SBOMs in both SPDX and CycloneDX formats are delivered alongside software releases, signed with the same code-signing certificate as the software itself.

The key insight is that stage 4 — continuous monitoring — is what converts SBOM from a compliance artifact into an operational security capability. A new critical CVE disclosed against a library in production requires the same response speed regardless of when the software was released. Without monitoring, the SBOM is dead on arrival from a security standpoint.

## Summary: Transparency as Infrastructure

The EO 14028 SBOM mandate was not a documentation requirement — it was a transparency requirement. The underlying goal is an environment where a zero-day against a specific library version triggers an immediate, automated inventory query: which systems are affected, who is responsible for them, and what is the remediation path. The SBOM is the prerequisite for that query.

DIB contractors who treat SBOM as a one-time deliverable are satisfying the letter of the requirement while missing the operational value entirely. The assessors know this; the contracting officers are learning it. The organizations that get ahead of this are building SBOM generation and continuous monitoring into their delivery pipelines now — while the tooling is mature, the formats are stable, and the cost of implementation is low relative to the cost of demonstrating SR control compliance during a C3PAO assessment.

The SolarWinds attackers exploited opacity. SBOM is the infrastructure that removes it.
