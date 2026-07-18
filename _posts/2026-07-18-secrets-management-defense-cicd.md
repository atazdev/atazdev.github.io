---
layout: post
title: "Secrets Management in Defense CI/CD"
subtitle: "A hardcoded credential is a finding. A secrets manager without rotation is a finding waiting to happen. Here is how DoD pipelines are finally getting this right"
date: 2026-07-18
category: devsecops
series: "Secure Delivery"
summary: "How defense CI/CD pipelines handle secrets without embedding credentials in code — covering HashiCorp Vault, SOPS, Platform One's approach, and how to wire rotation events into your cATO evidence stream."
featured: true
last-updated: 2026-07-18
share-img: /assets/img/hero/hero-secrets-management.png
tags: [devsecops, security, secrets, vault, sops, platform-one, dod, nist, cicd, zero-trust, compliance]
---

<figure class="post-figure">
  <img src="/assets/img/hero/hero-secrets-management.png" alt="Defense CI/CD secrets management dashboard showing Vault lease timers, SOPS-encrypted GitOps flows, and IL5 boundary enforcement">
  <figcaption>VAULT_STATUS: SEALED=FALSE — LEASES_ACTIVE=47 — ROTATION_POLICY=ENFORCED</figcaption>
</figure>

**The Big Picture:** Every security framework — RMF, CMMC, Zero Trust — lists credential exposure as a critical risk. Yet the most common finding on a DoD program assessment is still a hardcoded password in a configuration file or a static API key committed to a repository three years ago. The fix is not a policy reminder. It is a secrets management architecture that makes embedding credentials technically harder than doing the right thing.

---

### Why It Matters
A secret in a `.env` file is a finding under IA-5 (Authenticator Management). A secret in a git history — even after a force-push — is a finding that may have already been exfiltrated. A secret that never rotates is a finding that compounds daily. DoD programs running cATO pipelines need secrets management wired into the evidence stream, not bolted on as an afterthought before an assessment.

### The Details
- **Static credentials are a structural problem, not a discipline problem:** The only reliable fix is to make dynamic, short-lived credentials the path of least resistance for developers.
- **Vault, SOPS, and External Secrets Operator solve different layers of the same problem:** Vault handles runtime credential injection; SOPS handles encrypted secrets-as-code; ESO bridges the two for Kubernetes workloads.
- **Platform One's Iron Bank pipeline and Keycloak integration provide the DoD reference pattern:** Programs on P1 infrastructure inherit the secrets plumbing — the question is whether they use it correctly.
- **Rotation events must feed your cATO evidence stream:** A secret that rotates but produces no OSCAL-mappable evidence does not satisfy IA-5 for a cATO Authorizing Official.

---

## Go Deeper

### Why Hardcoded Credentials Keep Appearing

The pattern is not accidental, and it is not unique to poorly managed programs. Hardcoded credentials appear because they work immediately, require no infrastructure, and the consequences are deferred. A developer connecting a pipeline to a database at 11 PM the day before a demo does not reach for a secrets manager — they paste a connection string and move on.

The structural problem is that many DoD programs have secrets manager infrastructure deployed but not integrated into the developer workflow. Vault exists. Nobody uses it. Credentials end up in Kubernetes Secrets encoded as base64 — which is not encryption — or in pipeline environment variables set manually in a GitLab CI settings page, outside of any version control or audit trail.

The NIST SP 800-53 control most directly violated is **IA-5 (Authenticator Management)**, specifically IA-5(1) which requires password-based authenticators to be enforced with complexity, changed at defined frequencies, and not reused. When the "authenticator" is a static service account password that has not changed since the system was commissioned, the program has an open finding that an automated assessment will surface immediately.

**IA-7 (Cryptographic Module Authentication)** adds the requirement that authentication mechanisms use FIPS-validated cryptographic modules — a requirement that eliminates a large class of DIY secrets-storage approaches that rely on AES implementations outside a validated boundary.

### The Vault Architecture in an IL4/IL5 Environment

HashiCorp Vault — and its downstream fork **OpenBao**, now the community-supported open-source continuation — operates as a secrets broker: applications request credentials at runtime, receive short-lived dynamic secrets, and never hold a long-lived static credential.

The core Vault workflow in a DoD pipeline:

**Dynamic Database Credentials**

Instead of a static `DB_PASSWORD` committed anywhere, the application authenticates to Vault using its Kubernetes service account token (via the Vault Kubernetes auth method), requests a database credential, and receives a username and password with a TTL of — typically — one hour. When the TTL expires, the credential is revoked at the database. The application renews or re-requests as needed.

```
App Pod              Vault                 PostgreSQL
  |                    |                       |
  |-- SA token ------> |                       |
  |                    |-- Authenticate ------> |  (none — Vault holds the db role)
  |<-- dynamic cred -- |                       |
  |-- connect with cred ----------------------------------------> |
  |                    |                       |
  |   (TTL expires)    |-- Revoke cred ------> |
  |                    |                       |
```

The database never has a password that a developer knows. The application never persists a credential. The Vault audit log records every issuance and revocation.

**PKI Secrets Engine for mTLS**

In a Zero Trust architecture — which the DoD Zero Trust Strategy requires all programs to implement — every service-to-service call is mutually authenticated via TLS certificates. Manually managing PKI at scale is operationally untenable. Vault's PKI secrets engine acts as an intermediate CA: workloads request certificates at startup with a TTL of 24–72 hours, Vault signs them, and Istio or Linkerd handles mutual authentication transparently.

This directly satisfies **SC-17 (Public Key Infrastructure Certificates)** and contributes to the Zero Trust pillar requirement for device and workload identity.

**KV v2 for Non-Dynamic Secrets**

Not every secret can be dynamic. Third-party API keys, external service tokens, and legacy system credentials often must be static. Vault's KV v2 secrets engine handles these with versioning, access policies, and — critically — an audit trail of every read. When a secret is accessed by an unauthorized principal, the Vault audit log captures it immediately.

**IL4/IL5 Deployment Considerations**

In an Impact Level 4 or IL5 environment, Vault must itself meet the baseline security requirements:

- Vault's backend storage must be encrypted at rest using FIPS 140-2 validated modules (the Vault Enterprise FIPS build, or deployment on a FIPS-compliant cloud storage service).
- The Vault cluster must be hardened per CIS Benchmarks and the applicable STIG — DISA does not publish a Vault STIG, so programs typically apply the General Purpose Operating System STIG to the underlying hosts and document Vault-specific controls in their SSP.
- Vault's auto-unseal in an IL5 environment typically uses AWS KMS or Azure Key Vault (both FedRAMP High authorized) as the unseal mechanism rather than Shamir key shares distributed to administrators.

### SOPS: Secrets-as-Code for GitOps Workflows

Vault handles runtime credential injection. A different problem exists at the infrastructure-as-code layer: how do you store Kubernetes Secret manifests, Helm values files containing sensitive configuration, or Terraform variable files with account IDs in a git repository without exposing plaintext?

**SOPS (Secrets OPerationS)**, maintained by Mozilla and widely adopted in DoD GitOps patterns, encrypts specific values within YAML, JSON, ENV, and INI files while leaving the structure readable. A SOPS-encrypted Kubernetes Secret manifest looks like this in git:

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: db-credentials
data:
    username: ENC[AES256_GCM,data:8xK2mN...,type:str]
    password: ENC[AES256_GCM,data:pQ7rLs...,type:str]
sops:
    kms:
    -   arn: arn:aws:kms:us-gov-east-1:123456789:key/mrk-abc123
        created_at: '2026-07-18T00:00:00Z'
    version: 3.8.1
```

The file is committed to git. The encrypted values are meaningless without the KMS key. Decryption happens in the pipeline or on authorized workstations via AWS KMS, Azure Key Vault, or age keys — the decryption event is logged in the KMS audit trail.

**SOPS + age for air-gapped environments:** In classified or air-gapped IL6 environments where cloud KMS is unavailable, `age` provides a modern, auditable alternative to PGP. An age identity file held by authorized automation and administrators serves as the decryption key, with the private key itself stored in Vault.

The SOPS pattern satisfies the git hygiene requirements of **CM-3 (Configuration Change Control)** — all configuration including sensitive values is version-controlled, change-tracked, and peer-reviewed through the standard pull request process. There is no separate secrets repository that bypasses code review.

### External Secrets Operator: The Kubernetes Bridge

Neither Vault nor SOPS alone solves the Kubernetes-native secrets problem cleanly. Running Vault agent sidecars on every pod adds operational overhead. SOPS decryption in the pipeline writes plaintext Kubernetes Secrets that still exist in etcd.

**External Secrets Operator (ESO)** bridges the gap. ESO is a Kubernetes operator that reads from an external secrets store (Vault, AWS Secrets Manager, Azure Key Vault) and creates native Kubernetes Secret objects on a defined sync interval — automatically refreshing them when the source updates.

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
  namespace: mission-app
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore
  target:
    name: db-credentials
    creationPolicy: Owner
  data:
  - secretKey: password
    remoteRef:
      key: secret/data/mission-app/db
      property: password
```

When Vault rotates the database credential (on a 24-hour lease), ESO detects the change on the next sync cycle and updates the Kubernetes Secret. Pods referencing the Secret pick up the new value on their next restart or via projected volume refresh. No developer action required. No hardcoded credential. The rotation is fully automated.

ESO is included in Platform One's **Big Bang** baseline and is the recommended pattern for Kubernetes workloads on DoD infrastructure.

### Platform One's Approach: Keycloak + Vault + Iron Bank

Platform One operationalizes secrets management as a platform-level service rather than a per-program implementation problem. The reference architecture has three integrated components:

| Component | Function |
|---|---|
| **Keycloak** | Federated identity provider — CAC/PIV authentication, OIDC token issuance, service account management |
| **Vault** | Secrets broker — dynamic credentials, PKI, KV storage; Kubernetes auth method backed by Keycloak OIDC |
| **Iron Bank** | Hardened container registry — every image is pre-scanned; Vault integration documented as an OSCAL component definition |

A program team onboarding to Platform One inherits this stack with the following posture: human users authenticate via CAC through Keycloak; pipeline service accounts authenticate to Vault via Kubernetes service account tokens; application workloads receive dynamic credentials scoped to least-privilege database roles.

The program team's responsibility reduces to: defining their Vault policies, configuring their ExternalSecret manifests, and ensuring their application code consumes credentials from environment variables or mounted secret files rather than hardcoded literals.

The Iron Bank component definitions include pre-mapped OSCAL evidence for IA-5 and SC-28 controls at the platform layer. Programs inheriting Platform One's secrets infrastructure document the inheritance relationship in their SSP and focus their independent evidence collection on their application-specific credential handling.

### Wiring Rotation Events into the cATO Evidence Stream

This is where most programs implementing secrets management stop short of full cATO integration. Vault rotates credentials on schedule. ESO syncs them to Kubernetes. The pipeline runs. But the cATO Authorizing Official's dashboard has no visibility into whether IA-5's rotation requirement is being satisfied.

The evidence gap: Vault produces an audit log, but that log is not automatically mapped to NIST SP 800-53 controls and ingested into eMASS or the AO's OSCAL viewer.

The fix is a rotation event pipeline:

```
Vault Audit Log (syslog/CloudWatch)
  -> Log aggregation (Elasticsearch / Splunk)
  -> Event filter: lease_renewal | credential_rotation | policy_change
  -> OSCAL Assessment Result generator
    (maps event type -> control ID, e.g., rotation_event -> IA-5(1))
  -> eMASS OSCAL ingestion endpoint / AO dashboard
```

The resulting OSCAL Assessment Result for a rotation event:

```json
{
  "uuid": "...",
  "title": "IA-5(1) Rotation Evidence — mission-app db credential",
  "reviewed-controls": {
    "control-selections": [{"include-controls": [{"control-id": "ia-5.1"}]}]
  },
  "findings": [{
    "title": "DB credential rotated within policy window",
    "description": "mission-app/db credential rotated at 2026-07-18T04:00:00Z, 23h58m after prior rotation. Policy TTL: 24h. COMPLIANT.",
    "target": {"type": "control", "target-id": "ia-5.1"},
    "status": {"state": "satisfied"}
  }]
}
```

When this evidence flows into the AO's dashboard on every rotation cycle, the Authorizing Official sees continuous, machine-generated proof that IA-5(1) is being satisfied — not a one-time screenshot from the last assessment.

### The CMMC 2.0 Alignment

CMMC Level 2 maps directly to NIST SP 800-171, which in turn references SP 800-53 for many control families. The secrets management controls most directly assessed in a C3PAO evaluation:

| 800-171 Practice | Description | Secrets Management Satisfier |
|---|---|---|
| **3.5.10** | Store and transmit only cryptographically protected passwords | Vault KV (encrypted at rest, TLS in transit), SOPS-encrypted git |
| **3.5.11** | Obscure feedback of authentication information | Application-level (passwords never echoed), Vault masks secrets in UI |
| **3.13.10** | Establish and manage cryptographic keys | Vault PKI engine + KMS-backed auto-unseal |
| **3.13.16** | Protect the confidentiality of CUI at rest | FIPS 140-2 encryption on Vault backend storage |

A C3PAO assessor reviewing a program with Vault, ESO, and SOPS deployed and integrated — with rotation evidence collected — will spend their time reviewing policy configuration rather than hunting for hardcoded credentials. The tooling converts a potentially severe finding into a policy review conversation.

### Common Failure Modes

**1. Vault deployed, no Kubernetes auth integration.**
The most common pattern: Vault exists as a standalone service, accessed via token-based auth using long-lived root or admin tokens passed as environment variables in the pipeline. This recreates the static credential problem inside the secrets manager.

The fix: Vault Kubernetes auth method using pod service account tokens. Each pod receives a uniquely scoped token from the Kubernetes API that Vault validates directly — no static Vault token anywhere in the system.

**2. ESO syncing to base64-encoded Kubernetes Secrets with no encryption at rest.**
Kubernetes Secrets are base64-encoded, not encrypted, by default. An attacker with etcd access reads them trivially. The fix is etcd encryption at rest — enabled in EKS, AKS, and OpenShift by default for IL4+ deployments, but must be verified in the SSP.

**3. SOPS keys managed informally.**
SOPS encrypted with a developer's personal age key or PGP key creates a key-person dependency: the developer leaves, and the secret is inaccessible. All SOPS encryption keys must be managed in a central KMS with role-based access, rotation policies, and key custodian processes documented in the SSP.

**4. Rotation configured but not tested.**
A rotation policy that has never been exercised in production is a configuration artifact, not a security control. Rotation must be tested under realistic conditions — with applications connected and serving traffic — to verify that the application handles credential refresh without a restart-required failure mode. Document the test as part of your cATO evidence.

**5. Secrets manager access policies not reviewed.**
Vault policies that grant `path "secret/*" { capabilities = ["read"] }` — access to all secrets in the KV store — are a privilege escalation risk. Policies must be scoped to the minimum path and capability required for each service account, reviewed at each RMF authorization boundary.

### The Bottom Line

Secrets management is not glamorous. It does not appear in program executive briefings or capability roadmaps. It is the operational plumbing beneath every defense application — the infrastructure that determines whether a compromised container yields a 24-hour TTL credential or a five-year-old service account password with production database access.

The tooling is mature, open-source, and already deployed in Platform One's baseline. The challenge is not availability — it is integration depth. Programs that deploy Vault but leave long-lived tokens in pipeline environment variables, that encrypt secrets with SOPS but manage keys informally, that configure ESO but skip etcd encryption, have added infrastructure complexity without adding security posture.

The programs that get this right treat secrets management as a first-class pipeline concern: dynamic by default, rotation-automated, and evidence-generating. When the cATO evidence stream includes machine-generated proof that IA-5(1) is satisfied on every rotation cycle, the Authorizing Official is looking at a live security control, not trusting a compliance document. That is the difference between a secrets manager and a secrets management program.
