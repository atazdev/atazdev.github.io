---
layout: post
title: "CMMC 2.0 in Practice"
subtitle: "The assessment framework that determines whether defense contractors win or lose DoD contracts — and what it actually requires"
date: 2026-04-29
category: cybersecurity
series: "Secure Delivery"
summary: "A practical breakdown of CMMC 2.0 levels, NIST SP 800-171 control domains, and what contractors must demonstrate to pass a C3PAO assessment."
featured: true
last-updated: 2026-04-29
share-img: /assets/img/hero/hero-zero-trust-ai.png
tags: [cmmc, compliance, defense, cybersecurity, nist, dod, dib, devsecops]
---

<figure class="post-figure">
  <img src="/assets/img/hero/hero-zero-trust-ai.png" alt="Neural security shield HUD with cryptographic patterns">
  <figcaption>CMMC_STATUS: C3PAO_ASSESSMENT_PENDING — LEVEL2_CONTROLS_UNDER_REVIEW</figcaption>
</figure>

## What CMMC Actually Is

**Cybersecurity Maturity Model Certification (CMMC) 2.0** is the DoD's contractual enforcement mechanism for cybersecurity in the Defense Industrial Base (DIB). If your organization handles **Controlled Unclassified Information (CUI)** and wants to win DoD contracts, CMMC is the gate. It is not a best-practices framework — it is a pass/fail assessment tied directly to contract eligibility.

CMMC 2.0 replaced the original five-level model in 2021, consolidating it into three levels aligned directly to existing NIST standards. The final rule took effect in December 2024, meaning assessments are now a contractual reality, not a future requirement.

## The Three Levels

| Level | Who It Applies To | Standard | Assessment Type |
|---|---|---|---|
| **Level 1** | FCI only (no CUI) | 15 basic safeguarding practices | Annual self-assessment |
| **Level 2** | CUI handlers — the majority of the DIB | NIST SP 800-171 (110 controls) | Triennial C3PAO assessment or self-assessment |
| **Level 3** | High-priority CUI, critical programs | NIST SP 800-172 (110 + 24 enhanced controls) | Government-led assessment |

Most defense contractors fall under **Level 2**. The operative document is **NIST SP 800-171**, and a third-party assessor organization (**C3PAO**) certified by the Cyber AB conducts the triennial audit. There is no partial credit on Level 2: deficiencies require a **Plan of Action & Milestones (POA&M)** with a credible remediation timeline to maintain contract eligibility during remediation.

## The 14 Control Domains

NIST SP 800-171 organizes its 110 controls into 14 domains. Organizations consistently underestimate three of them:

**Access Control (AC) — 22 controls**
The largest domain. Least privilege, session lock, remote access restrictions, and CUI access logging. This is where Zero Trust architecture directly maps to compliance: every AC control is easier to satisfy if you have an identity-governed, microsegmented environment. Organizations running flat networks with shared service accounts fail AC consistently.

**Configuration Management (CM) — 9 controls**
Requires a baseline configuration for all systems, change control processes, and documented deviation approval. The practical requirement: every system in scope must have a documented configuration baseline in version control, and changes must go through an approval process. CI/CD pipelines with policy gates satisfy this natively.

**Incident Response (IR) — 3 controls**
Deceptively short but operationally demanding. IR requires a tested, documented incident response plan and the capability to report incidents to DoD within 72 hours via the **DIBNet portal**. Many organizations have plans they have never exercised. Assessors ask for evidence of tabletop exercises, not just document existence.

**The remaining 11 domains** — Audit & Accountability, Awareness & Training, Identification & Authentication, Maintenance, Media Protection, Personnel Security, Physical Protection, Risk Assessment, Security Assessment, System & Communications Protection, System & Information Integrity — follow the same pattern: each control requires documented implementation and supporting evidence artifacts.

## The System Security Plan

The **System Security Plan (SSP)** is the central artifact of a CMMC assessment. It must describe:

- The **authorization boundary**: exactly which systems, networks, and users are in scope for CUI handling
- Implementation status for all 110 controls (Implemented / Partially Implemented / Planned / Not Applicable)
- For every implemented control: the specific policy, procedure, or technical configuration that satisfies it
- All external service providers (cloud, managed services) and their inherited controls

The SSP is a living document. Assessors will cross-reference it against actual system configurations during the assessment. A well-written SSP with inaccurate technical claims fails faster than a sparse SSP that accurately reflects a partially implemented environment.

## Where Organizations Actually Fail

**1. Scope creep on the authorization boundary.**
Organizations try to shrink their CUI boundary to reduce assessment scope, but draw it too narrowly. When the assessor finds CUI flowing through a system excluded from the SSP, the entire assessment is at risk. Define the boundary conservatively, then work to reduce the actual CUI footprint.

**2. Inadequate audit logging.**
AU controls require logging of user activity, privileged commands, and CUI access — with logs protected from tampering and retained for at least three years. Most organizations have logging enabled but lack the centralized SIEM, integrity protection, and retention policies the controls require.

**3. Inherited controls without documentation.**
Cloud providers (AWS GovCloud, Azure Government) satisfy many controls at the infrastructure layer. But CMMC requires the organization to document which controls are inherited, from which provider, and under what shared responsibility model. "We use GovCloud" is not sufficient — the SSP must map inherited controls explicitly.

**4. Software supply chain gaps.**
SR controls (from NIST SP 800-171 Rev 3, added in the 2024 rulemaking) require supply chain risk management: SBOM documentation, vendor vetting, and controls against counterfeit components. Organizations that have not updated their SSP for Rev 3 additions enter assessments with unmitigated gaps.

## Connecting CMMC to Zero Trust

The DoD's ZT Strategy and CMMC are complementary frameworks targeting the same underlying controls from different directions. The ZT pillar requirements directly satisfy CMMC control families:

- **User pillar** → AC (Access Control) and IA (Identification & Authentication)
- **Device pillar** → CM (Configuration Management) and SI (System & Information Integrity)
- **Data pillar** → MP (Media Protection) and AC data controls
- **Visibility pillar** → AU (Audit & Accountability)

Organizations implementing ZT architecture as a genuine operational model — not just for compliance — will find CMMC Level 2 assessments significantly easier. The controls are the same; ZT just implements them as automated, continuously enforced policy rather than documented procedures.

## Summary: Assessment Is an Engineering Problem

CMMC 2.0 assessments are won or lost on evidence quality, not intent. The C3PAO is not evaluating whether your organization cares about security — they are evaluating whether each of 110 controls is implemented and documented. That is an engineering and documentation problem as much as a security problem.

The organizations that pass Level 2 assessments cleanly share three traits: an accurate, current SSP; technical implementations that match what the SSP claims; and evidence artifacts (screenshots, configuration exports, log samples, policy documents) pre-organized by control family. Build the evidence package as you build the controls, not the week before the assessment.

The deadline is no longer theoretical. Contracts are being awarded with CMMC requirements in the solicitation. The time to close the gap is before the assessor shows up.
