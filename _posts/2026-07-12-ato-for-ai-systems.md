---
layout: post
title: "ATO for AI Systems"
subtitle: "You can authorize a system frozen in time — but a model changes behavior without a single line of code changing. Here is how the DoD is trying to authorize a moving target"
date: 2026-07-12
category: ai
series: "AI Governance"
summary: "How AI models actually get authorized in the DoD — the Assess Only construct, the coming NIST 800-53 AI overlays, and the re-authorization trigger problem nobody has solved."
featured: true
last-updated: 2026-07-12
share-img: /assets/img/hero/hero-ato-ai-systems.png
tags: [ai, ato, rmf, devsecops, compliance, dod, nist, cdao, authorization, governance]
---

<figure class="post-figure">
  <img src="/assets/img/hero/hero-ato-ai-systems.png" alt="AI model authorization dashboard showing the Assess Only evidence pipeline, eval gates, and drift monitoring against a re-authorization threshold">
  <figcaption>MODEL_STATUS: ASSESS_ONLY_EVIDENCE_COLLECTED — DRIFT_THRESHOLD_UNDEFINED</figcaption>
</figure>

**The Big Picture:** The Risk Management Framework authorizes a system as it existed on assessment day — but an AI model's behavior shifts with every retrain, every fine-tune, and every drift in production data. The DoD's answer so far: the model doesn't get its own ATO at all.

---

### Why It Matters
Every DoD program fielding AI is improvising an answer to the same question: what did the AO actually authorize, and is it still what's running? The traditional ATO has no vocabulary for behavior change without a code change. Until it does, programs sit stuck at the accreditation gate — or operate on paperwork describing a model that no longer exists.

### The Details
- **Models don't get ATOs — systems do.** The DoD AI Cybersecurity Risk Management Tailoring Guide routes AI models through the RMF **Assess Only** construct: the model produces a body of evidence (T&E results, change management records, acquisition documentation) that gets folded into the hosting system's authorization package.
- **The control catalog is catching up.** NIST's SP 800-53 **Control Overlays for Securing AI Systems (COSAIS)** — five publications covering generative AI, predictive AI, agents, and developer use cases — hit public draft in Q3 2026, with the full set expected in 2027.
- **Congress made it contractual.** The FY2026 NDAA directs the DoD to build an AI/ML security framework and wire it into DFARS and CMMC — meaning contractors who develop, host, or deploy AI for the Department will have to evidence compliance the same way they evidence CUI protection today.

---

## Go Deeper

### Where the RMF Assumptions Break

The RMF, as laid out in NIST SP 800-37, rests on an assumption so basic it's never stated: the system you assessed is the system that runs. Configuration drift is treated as an anomaly to detect and correct. For AI systems, that assumption fails four separate ways.

**1. Behavior changes without a deployment.** A fraud detection model scoring live traffic degrades as the traffic distribution shifts under it. Nothing was deployed. No commit exists to review. The system's operational behavior on Tuesday is measurably different from Monday's, and no traditional change control process fired.

**2. The training data is attack surface.** NIST's adversarial ML taxonomy (AI 100-2) catalogs poisoning, evasion, extraction, and inference attacks — none of which map cleanly onto a control catalog written for software vulnerabilities. A poisoned dataset passes every SAST scan you point at it. Your Trivy output is green while the model learns a backdoor.

**3. Retraining is redeployment with worse visibility.** When a model retrains on fresh data, you've shipped a new system component. But unlike a code deployment, the diff is millions of weight changes no human can review. The artifact changed; the reviewable surface didn't.

**4. Test coverage doesn't mean what it used to.** A deterministic function passes or fails a test. A model has an accuracy distribution, confidence intervals, and performance that varies by input subpopulation. "Did it pass T&E?" becomes a statistical claim with an expiration date, not a binary gate.

### What the DoD Actually Decided

The DoD CIO's **AI Cybersecurity Risk Management Tailoring Guide** made a structural call that surprised people expecting a "model ATO": AI models do not receive their own authorization. The infrastructure layer — the platform hosting, serving, and monitoring the model — gets the ATO through the normal RMF (or cATO) process. The model itself goes through **Assess Only**.

Assess Only is an existing RMF construct for components that operate inside an already-authorized boundary. Applied to AI, it works like this:

1. During model development, the team builds a **body of evidence**: test and evaluation results, change management documentation, data provenance records, and acquisition documentation.
2. That evidence package — including a categorization recommendation — is attached to the hosting system's security authorization package.
3. The Security Control Assessor reviews it, and the AO makes a single risk decision covering the system *and* the models it hosts.

The elegance is that it reuses machinery that already exists. The weakness is the same thing: Assess Only was designed for components that don't change much. A model retrained monthly generates a new body of evidence twelve times a year, and the guide leans on programs working out control gates with their AO — consistent with the DevSecOps Playbook — rather than prescribing what those gates are.

The guide also doesn't stand alone. It points programs at the DoD Cybersecurity Knowledge Service, the DevSecOps Playbook, and CDAO's Responsible AI Toolkit — which means the actual authorization workflow for an AI program is assembled from at least four documents, none of which is authoritative over the others.

### The NIST Layer: AI RMF and the 800-53 Overlays

Two NIST work streams matter here, and they solve different problems.

**The AI RMF (AI 100-1)** is a voluntary risk framework — Govern, Map, Measure, Manage — aimed at trustworthiness: bias, explainability, safety, adversarial resilience. It's useful for program-level risk conversations and it's increasingly cited in DoD guidance, but it produces no control evidence. You cannot hand an AO an AI RMF profile and call it an assessment.

**The SP 800-53 Control Overlays for Securing AI Systems (COSAIS)** are the piece that plugs into the ATO machinery. An overlay tailors the 800-53 catalog for a specific technology class — adding controls, modifying implementation guidance, marking controls not applicable. NIST published the concept paper in August 2025, released an annotated outline for the predictive AI overlay in January 2026, and is targeting public drafts of all five overlays (generative AI, predictive AI, single-agent systems, multi-agent systems, and AI developer environments) in Q3 2026.

This matters because overlays are the format AOs already understand. Once a COSAIS overlay is finalized, "authorize this AI system" becomes "assess against the 800-53 baseline plus the AI overlay" — the same mechanics as a FedRAMP or classified overlay today. Until then, every program is inventing its own control tailoring and hoping the assessor agrees.

### Continuous Evaluation: cATO Extended to Model Artifacts

If you already run a [Continuous ATO evidence pipeline](/2026-07-12-continuous-ato-in-practice/), the AI extension is conceptually clean: treat the model as one more artifact class flowing through the same evidence machinery.

The pipeline stages map like this:

```
Data ingest    -> provenance + poisoning checks   -> evidence: data lineage record
Training run   -> versioned artifact + model card -> evidence: training provenance
Eval suite     -> accuracy/adversarial/red-team   -> evidence: T&E results vs. thresholds
Deployment     -> signed model, admission control -> evidence: artifact integrity
Production     -> drift + performance monitors    -> evidence: continuous eval telemetry
```

Each stage produces a structured artifact mapped to a control objective, exactly the way a Trivy scan maps to RA-5 in a conventional cATO pipeline. Model registries (MLflow, SageMaker Model Registry), eval suites wired into CI, and drift monitors feeding the AO dashboard are the AI equivalents of the scanner-to-OSCAL chain.

Three practices carry most of the weight:

- **Model cards as compliance artifacts.** Version-controlled, generated at training time, recording data sources, eval results, intended use, and known limitations. This is the SSP fragment for the model.
- **Eval gates with declared thresholds.** The AO signs off on thresholds — minimum accuracy, maximum subgroup performance gap, a performance floor under adversarial perturbation — and the pipeline enforces them on every candidate model. A model below threshold doesn't promote, same as a failed policy gate.
- **Drift monitoring mapped to controls.** Input distribution shift and output performance decay tracked in production, with alerting into the same dashboard the AO already watches. This is RMF Step 6 — Monitor — applied to weights instead of configurations.

For systems operating at the tactical edge, this pipeline has to extend past deployment into runtime — the argument I made in [Runtime Governance for Mission AI](/2026-04-25-runtime-governance-mission-ai/).

### The Unsolved Problem: Re-Authorization Triggers

Here is the gap in every current framework, and it's worth being blunt about it: nobody has defined when model change requires a new authorization decision.

Traditional RMF has a concept of "significant change" that triggers reassessment. For software, programs have workable heuristics — new external interface, new data type, architectural change. For models, the analogous question has no agreed answer:

- Does a scheduled retrain on new data constitute a significant change?
- Does 5% accuracy decay from drift? 10%? On which subpopulation?
- Does a fine-tune that alters behavior on inputs no one thought to test?

Independent analysis of the DoD's AI governance stack flags exactly this: lifecycle coverage is partial because the framework lacks clear drift-detection, retraining, and re-authorization triggers. CDAO's Responsible AI Toolkit gets closest — its Stage 7 covers continuous monitoring of the system, its use, and its ecosystem, and the SHIELD assessment generates Statements of Concern through the lifecycle — but it's a risk-management aid, not an authorization instrument.

In practice, programs are solving this contractually with their AO: negotiate drift and performance thresholds upfront, write them into the authorization decision as conditions, and treat a threshold breach the way cATO treats a failed control — automated POA&M, AO notification, and a defined remediation clock. It works. It's also bespoke every single time, which is exactly the situation the RMF existed to eliminate.

### The NDAA FY2026 Angle: This Is Coming for Contractors

The FY2026 NDAA directs the DoD to develop an AI/ML cybersecurity and physical security framework and — the consequential part — to incorporate it into **DFARS and the CMMC program**. Analysts are already calling it "CMMC for AI," and the shape is familiar: contractors developing, deploying, storing, or hosting AI/ML for the Department will have to demonstrate framework compliance as a condition of contract.

If you watched the CMMC 2.0 rulemaking cycle, you know how this plays out. The framework gets defined, the DFARS clause appears, primes flow the requirement down, and the DIB spends two years retrofitting evidence infrastructure it could have built incrementally. The organizations that extended their cATO pipelines to model artifacts early will treat the new clause as a reporting format change. Everyone else gets an unfunded compliance program.

### Where AI Programs Will Fail

**1. Authorizing the demo, fielding the drift.** The model that passed T&E is not the model running eight months later. Programs that treat the initial Assess Only package as done — with no continuous eval feeding the authorization — are running on stale evidence, and unlike stale software evidence, stale model evidence describes behavior that provably no longer occurs.

**2. Evidence without thresholds.** Logging eval metrics isn't a control. Evidence becomes admissible when it's compared against a threshold the AO accepted. Dashboards full of unjudged metrics give the AO data and no decision.

**3. Skipping data provenance.** The training pipeline is part of the authorization boundary. Programs that document the serving infrastructure but not data lineage have an unassessed supply chain sitting upstream of every prediction — the AI equivalent of shipping without an SBOM.

**4. Waiting for COSAIS.** The overlays land in draft in Q3 2026 and finalize into 2027. Programs deferring their control tailoring until then lose a year they could have spent building the evidence pipeline the overlays will demand anyway. The overlay changes the mapping, not the machinery.

**5. Treating the RAI Toolkit as the authorization.** SHIELD assessments and Statements of Concern inform risk; they don't evidence controls. Programs conflating responsible-AI process artifacts with security assessment evidence show up to the SCA review with the wrong genre of paperwork.

### The Bottom Line

The DoD's current answer — ATO the platform, Assess Only the model — is a reasonable bridge. It keeps AI programs inside existing RMF machinery instead of inventing a parallel accreditation system, and it composes cleanly with cATO for programs that already have an evidence pipeline.

But it's a bridge with a missing span. Until re-authorization triggers are defined — by COSAIS, by the NDAA-directed framework, or by DoD policy — the hardest question in AI authorization is settled program-by-program in negotiation with each AO. The programs in the strongest position are the ones treating models as first-class pipeline artifacts today: versioned, evaluated against AO-accepted thresholds, monitored for drift, and wired into the same continuous evidence flow as everything else they ship.

The model will change. That's not the risk to eliminate — it's the property to authorize.
