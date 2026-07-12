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
</figure>**The Big Picture:** Executive Order 14028 turned Software Bills of Materials (SBOM) into a mandatory federal procurement requirement. To win defense contracts, organizations must present a machine-readable inventory of their software supply chain.

---

### Why It Matters
Exploits in transitive dependencies (like Log4Shell) highlight the threat of opaque software components. Programmatic SBOM pipelines allow security officers to verify dependency integrity and identify vulnerabilities instantly when new CVEs drop.

### The Details
- **Required Telemetry:** CISA requires SBOMs to document supplier names, component names, exact version strings, dependencies, and SHA-based hashes.
- **Industry Formats:** SPDX (Linux Foundation standard, ISO-certified) and CycloneDX (OWASP standard, security-first, supports VEX documents) are the primary format specifications.
- **Tooling Stack:** Syft scans build directories to output raw lists; Grype correlates lists against current CVE databases; Cosign signs and distributes outputs.

### Go Deeper: Top Supply Chain Implementation Gaps
Defense contractors frequently fail audits on these five supply chain compliance issues:
1. **Ignoring Transitive Libraries:** Scanning only direct dependencies while leaving sub-dependencies (where Log4j-style issues hide) uninventoried.
2. **Out-of-Band Generation:** Generating the SBOM before compiling the final build artifact rather than running scanner steps against the final container digest.
3. **Omitting Container Base Layers:** Documenting application code dependencies while failing to inventory OS packages in base container layers.
4. **Missing VEX Exclusions:** Sending uncontextualized CVE lists without Vulnerability Exploitability eXchange (VEX) files to document which vulnerabilities are not exploitable.
5. **Treating SBOM as a Checklist:** Generating a static SBOM at contract kickoff and failing to regenerate it on code merges or dependency updates.
ploitability status, and attach them to the release package.
4. **Continuous monitoring** — Dependency-Track or a commercial equivalent monitors production SBOMs against new CVE publications and alerts on new exposures in deployed software — not just at release time.
5. **Contractual delivery** — SBOMs in both SPDX and CycloneDX formats are delivered alongside software releases, signed with the same code-signing certificate as the software itself.

The key insight is that stage 4 — continuous monitoring — is what converts SBOM from a compliance artifact into an operational security capability. A new critical CVE disclosed against a library in production requires the same response speed regardless of when the software was released. Without monitoring, the SBOM is dead on arrival from a security standpoint.

## Summary: Transparency as Infrastructure

The EO 14028 SBOM mandate was not a documentation requirement — it was a transparency requirement. The underlying goal is an environment where a zero-day against a specific library version triggers an immediate, automated inventory query: which systems are affected, who is responsible for them, and what is the remediation path. The SBOM is the prerequisite for that query.

DIB contractors who treat SBOM as a one-time deliverable are satisfying the letter of the requirement while missing the operational value entirely. The assessors know this; the contracting officers are learning it. The organizations that get ahead of this are building SBOM generation and continuous monitoring into their delivery pipelines now — while the tooling is mature, the formats are stable, and the cost of implementation is low relative to the cost of demonstrating SR control compliance during a C3PAO assessment.

The SolarWinds attackers exploited opacity. SBOM is the infrastructure that removes it.
