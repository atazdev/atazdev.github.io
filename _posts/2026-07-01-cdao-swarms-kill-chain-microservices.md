---
layout: post
title: "CDAO, Swarms, and the Kill Chain as Microservices"
subtitle: "Replicator proved the Pentagon can buy drones. It also proved that a swarm without an orchestration layer is just inventory"
date: 2026-07-01
category: architecture
series: "Software-Defined Operations"
summary: "Why the kill chain is decomposing into services on a data fabric — what Replicator's dissolution into DAWG reveals, how Open DAGIR works as an API contract, and where the microservices metaphor breaks."
featured: true
last-updated: 2026-07-01
share-img: /assets/img/hero/hero-swarm-kill-web.png
tags: [cdao, jadc2, defense, swarms, autonomy, architecture, microservices, software-defined-warfare, military, ai]
---

<figure class="post-figure">
  <img src="/assets/img/hero/hero-swarm-kill-web.png" alt="Kill web control plane dashboard showing a sensor-effector mesh re-routing around a jammed node, kill chain service statuses, and a DDIL partition panel">
  <figcaption>SWARM_STATUS: KILL_WEB_SYNCHRONIZED — PARTITION_TOLERANCE_ENGAGED</figcaption>
</figure>

**The Big Picture:** The Pentagon spent two years and over a billion dollars learning that autonomous swarms fail exactly the way microservice architectures fail — healthy nodes, broken system. The hardware was never the hard part.

---

### Why It Matters
Replicator dissolved into the Defense Autonomous Warfare Group in late 2025. The postmortem reads like a distributed systems incident report: platforms that couldn't integrate with existing C2, no software to orchestrate mixed-vendor swarms, "hundreds" fielded against a target of thousands. Every failure mode has a name in commercial software engineering. The DoD is now betting roughly $54 billion it can solve the orchestration problem it skipped the first time.

### The Details
- **Replicator's real lesson:** The drones mostly worked. What failed was the coordination layer — the [ACT program](https://www.diu.mil/latest/defense-innovation-unit-announces-software-vendors-to-support-replicator) (Anduril, L3Harris, Swarm Aero) was supposed to make thousands of individually capable platforms behave as one coherent system, and it wasn't ready when the hardware was.
- **Open DAGIR is an API contract, not a program:** CDAO's ecosystem approach lets any vendor build applications against government-owned data — the procurement expression of a service-oriented architecture, and the piece that keeps the kill web from becoming one prime's monolith.
- **Swarm Forge is the CI/CD loop:** CDAO's follow-on effort packages validated swarm behaviors for transition to operational units in 90 days or less — treating swarm capability as a software release cycle, not a hardware acquisition milestone.

---

## Go Deeper

### What Replicator Actually Proved

Replicator launched in August 2023 with a clear pitch: field thousands of attritable autonomous systems within 18–24 months to offset China's mass. Judged as a procurement sprint, it half-worked. Judged as a systems integration effort, the [Congressional Research Service assessment](https://www.congress.gov/crs-product/IF12611) is blunt — hundreds materialized, not thousands, and the systems that did arrive struggled to plug into existing command-and-control.

By late 2025 the initiative was folded into the **Defense Autonomous Warfare Group (DAWG)**, and the Department's [next bet on autonomous warfare](https://www.defenseone.com/ideas/2026/05/pentagons-54-billion-bet-autonomous-warfare/413735/) is an order of magnitude larger.

Here's the part that matters for anyone building software: the failure wasn't aerodynamics or batteries. Individual platforms flew fine. The program failed at exactly the layer commercial engineering spent fifteen years learning to build — the one that turns a pile of working components into a working system. A swarm without an orchestration layer isn't a capability. It's inventory with propellers.

If you've operated a microservice architecture, you've seen this incident before. Every service passes its health check. The system is down. The problem lives in the seams — discovery, routing, contract mismatches, backpressure — and no amount of improving the individual services fixes it.

### Decomposing the Kill Chain

In [the JADC2 post](/2026-03-22-jadc2-software-defined-battlefield/) I argued the kill web is a distributed systems problem. Take it one level deeper and the classic targeting cycle — find, fix, track, target, engage, assess — decomposes into services with familiar shapes:

| Kill chain stage | Software equivalent |
|---|---|
| **Find** | Event producers — sensors publishing detections onto the fabric |
| **Fix / Track** | Stream processing — correlation, deduplication, track fusion |
| **Target** | Matching engine — pairing effects to targets under constraint |
| **Engage** | Task execution with authorization gates |
| **Assess** | Feedback telemetry closing the loop |

The legacy model is a monolith: one platform owns its own sensor, its own processing, its own effector, end to end. That's an F-35 — a vertically integrated stack, brilliant and expensive and single-vendor. The kill web bet is that decomposed services on a shared data fabric beat vertically integrated platforms for the same reason services beat monoliths in commercial systems: independent scaling, graceful degradation, and the ability to swap implementations without rewriting the system.

The microservices analogy isn't decoration. The engineering problems transfer almost one-to-one:

**Service discovery is sensor-shooter pairing.** "Any sensor cues any shooter" is a service registry problem. A new node joins the mesh, advertises its capabilities, and becomes discoverable — under jamming, with intermittent links, and with the registry itself as a contested target.

**Partition tolerance is the whole game.** Commercial architects read CAP theorem and pick a tradeoff. In a contested electromagnetic environment, the partition isn't an edge case — it's the adversary's explicit goal. Systems must keep operating with local, possibly stale state, then reconcile when connectivity returns. That's why GitOps-style declarative convergence keeps showing up at the tactical edge: it's the pattern built for exactly this.

**Heterogeneity is the contract problem.** Replicator's swarm software had to orchestrate drones from different vendors with different autonomy stacks — a schema and API versioning problem wearing camouflage. This is what the **Modular Open Systems Approach (MOSA)** mandates and what Replicator's timeline couldn't wait for: agreed interface contracts before scale, not after.

**Backpressure decides who gets shot at first.** Ten thousand sensor detections and a hundred available effects is a queueing and prioritization problem. Get flow control wrong in a commercial system and you drop requests. The military version of dropped requests is targets that never get serviced.

### Open DAGIR: The Government Owns the Data Plane

CDAO's **Open Data and Applications Government-owned Interoperable Repositories** — [Open DAGIR](https://media.defense.gov/2024/Oct/27/2003571833/-1/-1/0/2024-07-18-CDAO-OPEN-DAGIR-FACT-SHEET.PDF) — is the acquisition-policy expression of a clean architectural principle: the government owns the data plane; vendors compete on the application layer.

Under the platform-centric model, the prime that built the platform owned the data formats, the interfaces, and effectively the roadmap. Replacing an application meant renegotiating the stack. Open DAGIR inverts this: government-owned repositories with published interfaces, multiple vendors building against them, and — critically — the ability to onboard a new application without a new integration contract for the data underneath.

Any engineer who has unwound a monolith recognizes the move. Separating storage from compute, defining the contract at the data layer, and letting application teams iterate independently is the standard playbook. CJADC2's minimum viable capability, delivered in early 2024, was built this way, and the multi-vendor experiments running since — Palantir, Lockheed's interoperability factory, and others — are effectively contract tests against a shared fabric.

The strategic point: Open DAGIR is what stops the kill web from re-monolithizing. Without a government-owned data plane, the first vendor to win the integration contract becomes the new platform owner, and the Department is back where it started with extra steps.

### Swarm Forge and the 90-Day Release Cycle

The most quietly radical thing CDAO is doing is [**Swarm Forge**](https://www.tradewindai.com/swarm-forge) — an effort to discover, validate, and field AI-enabled swarm capability in 90 days or less per cycle.

Read that against traditional acquisition timelines and the shift is structural: swarm behavior is being treated as a software artifact with a release cadence, not a program of record with a fielding date. A validated swarm package is, in effect, a versioned release — behaviors tested in simulation and on the range, packaged, and shipped to operational units on a loop measured in weeks.

This is the same move the DevSecOps world made a decade ago, and it drags in the same dependencies: you need tests you trust (validation ranges and simulation), an artifact pipeline (signed, versioned behavior packages), and — the part that connects to everything else I've written this year — an authorization process that can keep up. A 90-day capability loop attached to an 18-month ATO process is an 18-month capability loop. The [continuous authorization machinery](/2026-07-12-continuous-ato-in-practice/) isn't adjacent to this; it's load-bearing.

### Where the Metaphor Breaks

The microservices frame is productive right up until it isn't, and it's worth being precise about where it stops.

**Engagement is not a stateless service.** In commercial systems, retries and at-least-once delivery are safe defaults. In a kill web, the engage stage carries legal and ethical weight that no other "service" does — engagement authority is held by humans under rules of engagement, and the architecture has to make that gate structural, not advisory. Idempotency isn't a performance nicety when the operation is a strike; duplicate delivery isn't an error budget item.

**Latency asymmetry cuts the other way.** Commercial systems tune for the happy path and tolerate slow failure recovery. Contested C2 inverts this: the system must degrade in milliseconds and can afford to recover slowly. Designs that fail closed — no valid policy, no engagement — are mandatory, which is the argument I made in [Runtime Governance for Mission AI](/2026-04-25-runtime-governance-mission-ai/): policy enforcement has to travel with the node, because the node can't phone home for permission from inside a jammed partition.

**The registry is a target.** Nobody DDoSes your Consul cluster with cruise missiles. Every piece of shared infrastructure in a kill web — the discovery layer, the data fabric, the orchestration plane — is a high-value target precisely because it's shared. Architectural centralization that would be a mild availability risk commercially becomes a single point of strategic failure.

### The Bottom Line

Replicator's dissolution wasn't a failure of the swarm concept. It was a demonstration — an expensive one — that mass without orchestration is theater, and that the orchestration layer is a harder engineering problem than the platforms it coordinates. The Department appears to have absorbed the lesson: DAWG inherits the mission with the software problem named up front, Open DAGIR keeps the data plane out of vendor hands, and Swarm Forge puts swarm capability on a release cadence instead of a fielding schedule.

The kill chain is becoming a set of services on a government-owned fabric, and the engineering disciplines that matter — interface contracts, partition-tolerant design, flow control, fail-closed authorization — are the ones commercial distributed systems teams already practice daily. The difference is the failure domain. When your service mesh has a bad day, you write a postmortem. When this one does, the postmortem has casualties. That asymmetry, not the technology, is what should shape every architectural decision in the stack.
