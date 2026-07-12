---
layout: post
title: "Continuous ATO in Practice"
subtitle: "The traditional Authority to Operate process is a compliance bottleneck — here is how to replace it with an automated, always-on evidence pipeline"
date: 2026-07-12
category: devsecops
series: "Secure Delivery"
summary: "A technical breakdown of Continuous ATO — what it actually requires, how OSCAL enables machine-readable evidence, and where most DoD programs fail to sustain it."
featured: true
last-updated: 2026-07-12
share-img: /assets/img/hero/hero-continuous-ato.png
tags: [ato, devsecops, compliance, security, dod, nist, oscal, platform-one, cmmc, authorization]
---

<figure class="post-figure">
  <img src="/assets/img/hero/hero-continuous-ato.png" alt="Continuous ATO compliance pipeline dashboard with real-time authorization status">
  <figcaption>ATO_STATUS: CONTINUOUSLY_AUTHORIZED — EVIDENCE_PIPELINE_ACTIVE</figcaption>
</figure>

**The Big Picture:** The traditional Authority to Operate process takes 18 months to produce a compliance document no one reads — Continuous ATO replaces the annual gate with an automated, always-on evidence pipeline wired directly into the CI/CD workflow.

---

### Why It Matters
Modern software deploys dozens of times per week. An ATO issued against a point-in-time assessment becomes stale the moment the first patch lands. Continuous ATO eliminates the authorization debt by treating security control evidence as a first-class artifact of every build — the Authorizing Official sees a live dashboard, not a six-month-old snapshot.

### The Details
- **OSCAL as the foundation:** NIST's Open Security Controls Assessment Language provides the machine-readable schema that makes continuous evidence collection possible — policies, assessments, and system security plans expressed as JSON or XML, not Word documents.
- **Policy gates in the pipeline:** Every CI commit is validated against security controls before merge — SAST, container scanning, dependency checks, and configuration compliance run as mandatory pipeline stages, not post-deployment audits.
- **Real-time AO visibility:** The Authorizing Official gets a live control inheritance dashboard showing current pass/fail status across all 110+ controls, with automated alerts when a new deployment changes the risk posture.

---

## Go Deeper

### Why the Legacy ATO Process Fails

The traditional Risk Management Framework (RMF) ATO process — defined in NIST SP 800-37 — was designed for static systems with infrequent change cycles. A weapons system that deploys firmware once every two years can reasonably be assessed at a point in time. A web application that merges 50 pull requests per week cannot.

The failure modes are structural:

**1. Evidence is a snapshot, not a stream.** A System Security Plan (SSP) documents what the system looked like when the assessor visited. The moment a developer commits new code, the evidence is stale. Traditional RMF has no mechanism to continuously reconcile the documented state against the deployed state.

**2. The authorization cycle creates security debt.** When an ATO takes 12–18 months, program teams learn to batch changes. Security improvements are deferred until the next authorization cycle rather than deployed incrementally. The result is a system that is simultaneously over-documented and under-secured.

**3. Assessors become bottlenecks, not advisors.** When security professionals spend the majority of their time writing and reviewing documentation artifacts, they have little capacity to engage with engineering teams on actual risk reduction. The process optimizes for documentation quality, not security posture.

### What Continuous ATO Actually Is

Continuous ATO (cATO) is not a shortcut around the RMF. It is the implementation of RMF's **Step 6 — Monitor** as a continuous, automated process rather than a periodic manual review. The authorization itself remains a formal AO decision; cATO changes the evidence cadence from annual to real-time.

The DoD defines cATO through **DoDI 8510.01** and the associated **cATO Reference Design** published by the DoD CIO. The framework requires three foundational capabilities:

1. **An active Authorizing Official** who accepts ongoing risk rather than point-in-time risk.
2. **Automated security controls assessment** integrated into the delivery pipeline.
3. **Continuous monitoring** with real-time visibility into the system's security posture.

Platform One — the DoD's DevSecOps platform — operationalized this framework and demonstrated that programs meeting these requirements could receive ongoing authorization without repetitive full assessment cycles.

### The OSCAL Foundation

**NIST's Open Security Controls Assessment Language (OSCAL)** is the technical enabler that makes machine-readable cATO possible. OSCAL defines a standard schema for expressing:

- **System Security Plans (SSP)** — control implementations documented as structured data
- **Assessment Plans and Results** — automated test outputs mapped directly to control objectives
- **Plan of Action & Milestones (POA&M)** — open findings tracked as versioned data artifacts
- **Component Definitions** — reusable control implementations for common infrastructure (cloud providers, container platforms, identity services)

The practical implication: instead of a security engineer manually updating a 400-page Word document after every infrastructure change, the SSP is generated from Infrastructure-as-Code annotations and pipeline metadata. A Terraform module that provisions an S3 bucket with encryption-at-rest can assert — in machine-readable OSCAL — that it satisfies SC-28 (Protection of Information at Rest). The assessment tool reads the assertion and validates it against the actual deployed configuration.

Tools supporting OSCAL include **Trestle** (IBM's open-source OSCAL SDK), **Lula** (DoD's compliance validation tool that evaluates Kubernetes configurations against OSCAL-defined controls), and **eMASS** (the DoD's enterprise OSCAL consumer that ingests assessment results for AO review).

### The Four Technical Layers

A production cATO implementation requires four distinct layers operating in concert:

#### 1. Policy Gates (Shift-Left Enforcement)

Security controls are validated at the earliest possible point in the development lifecycle — on the developer's workstation and in the CI pipeline before code reaches a review stage.

- **Pre-commit hooks:** Lightweight checks using **detect-secrets**, **Checkov**, and **Trivy** catch obvious violations before they enter the codebase.
- **CI pipeline gates:** Every pull request triggers a full policy evaluation suite — SAST (Semgrep, SonarQube), dependency scanning (Grype, Dependabot), container image scanning (Trivy, Anchore), and IaC compliance (Checkov, OPA/Conftest).
- **Admission controllers:** In Kubernetes environments, **Kyverno** or **OPA Gatekeeper** enforce policy at the runtime layer — non-compliant workloads are rejected before scheduling, regardless of what passed in CI.

The critical design principle: every pipeline gate must produce a structured evidence artifact, not just a pass/fail exit code. The artifact feeds directly into the OSCAL assessment results layer.

#### 2. Evidence Collection and Control Mapping

The output of every automated control check must be mapped to a specific NIST SP 800-53 or SP 800-171 control. This mapping — connecting a technical test result to a compliance control objective — is what makes automated evidence admissible for AO review.

Lula operationalizes this in Kubernetes environments by defining **LulaValidations**: YAML-configured checks that query the cluster state and evaluate whether a specific control is satisfied. A LulaValidation for AC-3 (Access Enforcement) might query all ClusterRoleBindings, verify that no wildcards are present in production namespaces, and emit an OSCAL-formatted finding.

The evidence chain for a single deployment:

```
CI Build   -> Trivy scan    -> SARIF output -> OSCAL converter -> Assessment Result
IaC Plan   -> Checkov scan  -> JUnit output -> OSCAL converter -> Assessment Result
K8s Deploy -> Lula validate -> OSCAL Assessment Result (native output)
All Results -> Aggregate into SSP Assessment Layer -> Ingest into eMASS / AO dashboard
```

#### 3. Continuous Monitoring Dashboard

The Authorizing Official needs a single view answering three questions at any moment: What is the current control status? What changed since the last authorization decision? What is the residual risk posture?

DISA's SRG compliance dashboards, Grafana-based OSCAL viewers, and platform-specific tools like Platform One's **Party Bus** monitoring stack provide this visibility. The dashboard must reflect the live deployment state — not a static report uploaded weekly.

When a new CVE is published against a library in a production container, the monitoring layer should:
1. Identify affected containers within minutes via SBOM correlation
2. Automatically open a POA&M entry linked to the CVE, affected components, and risk rating
3. Notify the AO that the risk posture has changed
4. Track the patch through the pipeline and automatically close the POA&M when a clean build reaches production

#### 4. Control Inheritance and Component Reuse

One of the highest-leverage capabilities in a mature cATO program is **control inheritance** — the ability for multiple systems to inherit control implementations from a shared platform rather than re-documenting them independently.

Platform One's **Iron Bank** (the DoD's hardened container registry) and the associated **Big Bang** Kubernetes platform ship with pre-assessed OSCAL component definitions. A program team deploying on Platform One inherits the platform's container hardening controls, FIPS-compliant cryptography, and network policy implementations — reducing the controls the program must independently implement and evidence from 110 to roughly 40–60, depending on the system profile.

This is the mechanism that makes cATO scale across the enterprise. A shared platform assessed once provides inheritance to every tenant program — the investment in platform-level evidence compounds across the portfolio.

### Platform One as the Reference Implementation

The DoD's Platform One program demonstrated cATO at scale for classified and unclassified DoD workloads:

| Component | Function |
|---|---|
| **Party Bus** | Continuous monitoring and alerting — aggregates security telemetry from all hosted programs |
| **Iron Bank** | Hardened container registry with attached OSCAL component definitions, pre-assessed and inheritance-ready |
| **Repo One** | GitLab-based source control with mandatory pipeline policy gates on every commit |
| **Big Bang** | K8s platform deployed with a DoD-compliant security tool baseline (Istio, Kyverno, Falco) |

Programs onboarding to Platform One receive a dramatically reduced authorization surface. The platform's existing cATO covers the infrastructure layer; program teams focus exclusively on their application-specific controls.

### Where Programs Actually Fail

**1. Treating cATO as a one-time setup.**
The pipeline must produce current evidence on every deployment. Programs that configure tooling, generate an initial evidence package, and stop updating it have built a sophisticated point-in-time assessment — not continuous authorization. The cATO architecture is only as good as its cadence.

**2. Evidence without control mapping.**
A Trivy scan producing a vulnerability list is not admissible OSCAL evidence. The evidence must be mapped to specific control objectives with a clear assertion: this result satisfies (or does not satisfy) RA-5 (Vulnerability Monitoring and Scanning). Programs that produce raw tool outputs without the OSCAL mapping layer cannot support AO review.

**3. Incomplete inheritance documentation.**
Teams using cloud services or shared platforms without documenting the inheritance relationship enter assessments with undocumented control gaps. The SSP must explicitly identify which controls are inherited, from which provider or platform, and what residual responsibility the program retains.

**4. No AO engagement during development.**
Continuous ATO requires a culturally engaged Authorizing Official — one who reviews the risk posture dashboard regularly, not one who signs the package at the end. Programs that treat the AO as a final approver rather than a continuous stakeholder find that the authorization decision still becomes a bottleneck regardless of how automated the evidence pipeline is.

**5. POA&M management outside the pipeline.**
Open findings tracked in spreadsheets outside the automated pipeline degrade cATO effectiveness quickly. POA&M entries must be created automatically from evidence failures, linked to specific pipeline runs, and closed automatically when remediation is verified by a subsequent successful evidence collection.

### The CMMC Connection

cATO and CMMC 2.0 are not the same framework, but they share significant technical overlap. The automated control evidence pipeline that satisfies DoD RMF assessment requirements is largely the same infrastructure that satisfies CMMC Level 2 assessment evidence requirements.

Organizations implementing cATO for a DoD program find that the OSCAL evidence artifacts, pipeline gate configurations, and continuous monitoring dashboards significantly reduce the manual documentation burden during a C3PAO assessment. The assessor can query the live system state rather than reviewing static screenshots — a qualitatively different assessment experience.

The **SR (Supply Chain Risk Management)** controls added in NIST SP 800-171 Rev 3 — flowing into CMMC via the 2024 rulemaking — align directly with cATO's SBOM and dependency tracking requirements. An organization with a functioning cATO pipeline that includes SBOM generation and vulnerability correlation already has the evidence infrastructure for SR control satisfaction.

### The Bottom Line

Continuous ATO is the correct answer to an unsolvable problem: you cannot write documentation fast enough to keep pace with modern software delivery. The solution is not to slow down delivery — it is to make the evidence generation automatic, the control mapping machine-readable, and the authorization decision continuous.

The tooling is mature. OSCAL is stable. Platform One has demonstrated the model at DoD scale. The programs that implement cATO correctly — with genuine pipeline integration, control-mapped evidence, and an engaged AO — compress their authorization timelines from 18 months to weeks and maintain continuous authorization through the life of the system.

The programs that treat cATO as a documentation shortcut will find the AO's dashboard showing red controls and a risk posture they cannot explain. The difference is not the tools — it is whether the evidence pipeline is genuinely wired into how software ships.
