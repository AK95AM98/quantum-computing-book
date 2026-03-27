---
title: "Chapter 12: The Post-Quantum Cryptography Imperative"
chapter: 12
concepts: 18
prerequisites: ["Chapter 4: Quantum Algorithms — Shor, Grover, and the Complexity Landscape"]
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
---

# Chapter 12: The Post-Quantum Cryptography Imperative — From Shor's Algorithm to Enterprise Migration

!!! abstract "Chapter Summary"
    This chapter translates the mathematical threat of Shor's algorithm (Chapter 4) into an immediate enterprise risk management problem. The central message is urgent and specific: the harvest-now, decrypt-later (HNDL) threat requires action today, not at some future point when quantum computers become available. By the end of this chapter you will be able to apply Mosca's theorem to determine whether your organization's data is already at risk; identify the three NIST-finalized post-quantum cryptographic standards and their deployment characteristics; design a hybrid migration strategy that protects against both quantum and classical threats simultaneously; build a Cryptographic Bill of Materials (CBOM) as the foundation of your migration program; and sequence a four-phase migration across a real enterprise environment.

---

## 12.1 The Harvest-Now, Decrypt-Later Threat

The most important thing to understand about post-quantum cryptography is this: **the threat does not require a quantum computer.** It requires only an adversary with network access and storage capacity — both of which nation-state actors have possessed for decades.

**Harvest-now, decrypt-later (HNDL)** is an intelligence collection strategy in which an adversary intercepts and archives encrypted communications today, intending to decrypt them retrospectively once a cryptographically relevant quantum computer (CRQC) becomes available. The data targeted is encrypted with RSA or elliptic curve cryptography (ECC). Once a sufficiently powerful quantum computer can run Shor's algorithm at scale (Chapter 4), that encryption is broken — retroactively, applied to data collected years or decades earlier.

This threat is not hypothetical. The National Security Agency, CISA, the UK's National Cyber Security Centre (NCSC), and Germany's Federal Office for Information Security (BSI) have all publicly stated their assessment that HNDL campaigns are actively underway. This is the **assessed intelligence position of multiple allied Western governments**, not vendor speculation. These agencies cannot publicly confirm operational details — but their open guidance documents use language that leaves little ambiguity: *collect now, decrypt later* is a documented adversarial capability and posture.

The logic of HNDL exploits a fundamental asymmetry in the cryptographic timeline:

- **Interception** happens now, at the cost of network access and storage — cheap and scalable.
- **Decryption** happens later, when quantum hardware is available — expensive and speculative today, but not forever.
- **The data cannot be re-encrypted after the fact.** Once a TLS session has terminated and its ciphertext has been archived by an adversary, no future cryptographic upgrade can protect it.

This asymmetry is why the conventional risk management response — "we'll migrate when quantum computers are ready" — is precisely wrong. By the time a CRQC exists, the opportunity to protect data that was in transit years earlier has already passed.

### What Is Being Targeted

The primary target of HNDL campaigns is not the encrypted payload but the **cryptographic key exchange** that establishes the shared secret used to encrypt that payload.

In TLS (the protocol securing essentially all HTTPS traffic, VPN connections, and most enterprise network communications), the session proceeds in two stages:

1. **Handshake phase**: The client and server use an asymmetric algorithm — RSA or elliptic curve Diffie-Hellman (ECDH) — to agree on a shared secret without transmitting it directly. This is the step vulnerable to Shor's algorithm.

2. **Data transfer phase**: The shared secret is used to derive a symmetric key (typically AES-128 or AES-256), which encrypts the actual payload.

An adversary archiving a TLS session captures both the handshake and the encrypted payload. Once they can break the asymmetric key exchange with Shor's algorithm, they derive the symmetric key and decrypt everything — regardless of AES's continuing strength.

**What about AES?** AES is addressed by Grover's algorithm, which provides a quadratic speedup for unstructured search. This reduces the effective security of AES-256 from 256 bits to approximately 128 bits — still considered computationally infeasible. The mitigation is straightforward: use AES-256 instead of AES-128 (doubling the symmetric key length). The asymmetric key exchange is the urgent, unsolved problem.

### Mosca's Theorem: A Planning Framework

Mosca's theorem, developed by Michele Mosca at the Institute for Quantum Computing, provides the canonical framework for determining whether an organization's data is already at quantum risk. It defines three variables:

$$x = \text{years the data must remain confidential (shelf-life)}$$

$$y = \text{years required to complete migration to quantum-safe cryptography}$$

$$z = \text{estimated years until a cryptographically relevant quantum computer arrives}$$

**The core inequality:**

$$\boxed{x + y > z \implies \text{data is at risk NOW}}$$

If the sum of how long your data must remain secure and how long it takes you to migrate exceeds the time until a CRQC exists, that data is currently being collected by adversaries who will eventually decrypt it.

The theorem forces organizations to confront three uncomfortable realities simultaneously: the sensitivity horizon of their data, the organizational inertia of their migration programs, and the technical trajectory of quantum hardware. IBM surveys indicate that enterprise executives estimate an average of **12 years** for full PQC integration — a number that, combined with typical data shelf-lives, pushes most large organizations well past any credible CRQC timeline.

### Applying Mosca's Theorem Across Data Categories

The following table applies Mosca's theorem to representative enterprise data categories. For the CRQC timeline ($z$), expert surveys in 2024–2025 produced estimates ranging from 2028 to 2040, with the modal expert consensus placing a 50% probability on $z < 2035$ and a meaningful fraction (15–20%) assigning $z < 2030$.

| Data Type | Shelf-life ($x$, years) | Migration time ($y$, years) | $x + y$ | At risk if $z <$ (year) |
|---|---|---|---|---|
| Healthcare records | 50 | 5 | 55 | 2076 |
| Financial transaction data | 7–30 | 4 | 11–34 | 2030–2053 |
| Trade secrets | Indefinite | 7 | $\infty$ | Always |
| Government contracts | 25+ | 6 | 31+ | 2051+ |
| M&A communications | 10 | 4 | 14 | 2038 |
| Defense procurement data | 30+ | 7 | 37+ | 2058+ |
| Critical infrastructure configs | 20 | 6 | 26 | 2046 |

Starting from 2026, with $z$ estimates between 2028 and 2035 carrying 50–85% probability across expert cohorts: **for every data category in this table, the threat window is already open under a meaningful fraction of plausible futures.**

!!! warning "Common Misconception"
    "We don't need to worry about PQC because quantum computers don't exist yet." This reverses the logic entirely. HNDL requires no quantum computer — only network access and storage. The adversary collects data today and waits. By the time a CRQC exists and the threat is "proven," data that was in transit five years earlier cannot be retroactively protected. The urgency of PQC migration is precisely that it must *precede* the threat's full materialization.

!!! tip "Business Implication"
    Organizations handling healthcare records, trade secrets, government contracts, or M&A communications have already crossed the Mosca threshold under any CRQC timeline estimate shorter than 2040. For these organizations, every month of delay in beginning PQC migration increases the volume of irreversibly exposed data. The question is not whether to migrate but how quickly.

---

## 12.2 The NIST Standards and the Deprecation Timeline

NIST published three finalized post-quantum cryptographic standards on **August 13, 2024**, completing an eight-year evaluation process that began in 2016, attracted 82 candidate algorithms, and subjected the survivors to years of public cryptanalysis by the global research community. This section describes each standard in deployment terms — not the underlying mathematics (covered in Chapter 4, §4.6) but the characteristics that determine how and where each algorithm is deployed.

### FIPS 203 — ML-KEM: The Highest Priority

**ML-KEM (Module-Lattice Key Encapsulation Mechanism)**, standardized as FIPS 203 and derived from CRYSTALS-Kyber, is the most immediately critical of the three standards because it directly addresses the HNDL threat.

ML-KEM replaces RSA and ECDH in the **key exchange** step of TLS, VPN protocols, and any other protocol where two parties must agree on a shared secret. It is a **Key Encapsulation Mechanism (KEM)** rather than a key agreement protocol: one party generates a public/private key pair, the other encapsulates a random shared secret using the public key and sends the resulting ciphertext, and the first party decapsulates using the private key to recover the shared secret.

Three parameter sets provide a range of security levels:

| Parameter Set | Security Level | Public Key (bytes) | Ciphertext (bytes) |
|---|---|---|---|
| ML-KEM-512 | Level 1 (AES-128 equiv.) | 800 | 768 |
| ML-KEM-768 | Level 3 (AES-192 equiv.) | 1,184 | 1,088 |
| ML-KEM-1024 | Level 5 (AES-256 equiv.) | 1,568 | 1,568 |

**ML-KEM-768** is the recommended general-purpose choice, balancing security and performance. Its public key of 1,184 bytes is larger than RSA-2048's 256 bytes, but ML-KEM encapsulation and decapsulation are **faster than RSA** in most implementations because the underlying lattice arithmetic does not require large-integer modular exponentiation.

The API differences from ECDH are real but manageable: ECDH is a Non-Interactive Key Exchange (NIKE) where both parties need only each other's public keys, while ML-KEM requires an explicit encapsulation step. Existing TLS 1.3 and SSH protocol structures accommodate this with minor changes, which is why ML-KEM is sometimes described as "almost a drop-in replacement for ECDH."

### FIPS 204 — ML-DSA: Digital Signatures at Scale

**ML-DSA (Module-Lattice Digital Signature Algorithm)**, standardized as FIPS 204 and derived from CRYSTALS-Dilithium, replaces RSA and ECDSA for **digital signatures**: code signing, certificate authority operations, document signing, authentication tokens, and any application requiring non-repudiation.

| Parameter Set | Security Level | Public Key (bytes) | Signature (bytes) |
|---|---|---|---|
| ML-DSA-44 | Level 2 | 1,312 | 2,420 |
| ML-DSA-65 | Level 3 | 1,952 | 3,293 |
| ML-DSA-87 | Level 5 | 2,592 | 4,595 |

The signature size increase is significant: ML-DSA-65 produces 3,293-byte signatures versus 256 bytes for RSA-2048. This matters in constrained environments — IoT firmware updates, TLS handshake sizes, code-signing pipeline throughput — and requires capacity planning for certificate databases and signing infrastructure. For most enterprise deployments the bandwidth and storage overhead is manageable; the primary concern is protocol-level constraints that assume small signature sizes.

Signing and verification speed for ML-DSA is comparable to ECDSA and substantially faster than RSA for equivalent security levels.

### FIPS 205 — SLH-DSA: The Conservative Backstop

**SLH-DSA (Stateless Hash-Based Digital Signature Algorithm)**, standardized as FIPS 205 and derived from SPHINCS+, occupies a unique position in the PQC landscape: its security relies **exclusively on the collision resistance of cryptographic hash functions** (SHA-2 or SHAKE), not on the hardness of lattice problems.

This matters because it provides **algorithm diversity**. ML-KEM and ML-DSA both rely on the hardness of Module Learning With Errors (MLWE), a lattice problem that has resisted three decades of academic cryptanalysis. But "resisted so far" and "will resist forever" are different statements. If a future mathematical breakthrough undermined lattice-based cryptography — an event most cryptographers consider unlikely but not impossible — SLH-DSA would remain secure because it makes no use of lattice mathematics.

SLH-DSA's trade-offs are substantial:

| Parameter Set | Security Level | Public Key (bytes) | Signature (bytes) | Optimization |
|---|---|---|---|---|
| SLH-DSA-SHA2-128s | Level 1 | 32 | 7,856 | Small |
| SLH-DSA-SHA2-128f | Level 1 | 32 | 17,088 | Fast |
| SLH-DSA-SHA2-192s | Level 3 | 48 | 16,224 | Small |
| SLH-DSA-SHA2-256s | Level 5 | 64 | 29,792 | Small |

The 12 parameter sets span three security levels and two optimization targets (small signatures vs. faster generation). For most high-throughput signing operations, ML-DSA is preferred. SLH-DSA is the appropriate choice where algorithm diversity is a priority, long-term archive signatures are required, or the deployment context can absorb the larger signature sizes.

### The Standards Pipeline

Two additional algorithms are in the standardization pipeline:

**FN-DSA (FIPS 206, based on FALCON)** produces significantly smaller signatures than ML-DSA — 666 bytes at security level 1 — and is computationally fast, making it attractive for constrained environments. Its limitation is implementation complexity: FN-DSA requires precise floating-point arithmetic over Gaussian distributions, which creates subtle implementation risks on platforms with non-IEEE 754 floating-point behavior. NIST expects to finalize FIPS 206 in late 2026 or early 2027.

**HQC (Hamming Quasi-Cyclic)**, selected in March 2025, is a code-based KEM providing a non-lattice alternative to ML-KEM. Its security relies on the hardness of decoding random linear codes — a problem independent of lattice mathematics. The standard is expected in 2027. Like SLH-DSA, HQC's value is primarily in algorithm diversity.

### The Deprecation Timeline

NIST Internal Report 8547 establishes the federal deprecation schedule for classical public-key algorithms:

- **2030**: RSA (all key sizes), ECDH, ECDSA, and Diffie-Hellman are **deprecated** — no new deployments in federal systems, and any system undergoing a technology refresh must migrate.
- **2035**: These algorithms are **disallowed** — all federal systems must have completed migration.

For enterprises outside the federal government, the direct enforcement mechanism is FIPS 140-3 validation (required for cryptographic modules used in federal procurement). As federal agencies enforce these timelines through procurement requirements, the effect cascades to any enterprise that sells to the U.S. government, operates under frameworks that reference FIPS 140-3 (PCI-DSS, HIPAA, FedRAMP), or operates internationally in jurisdictions with coordinated timelines.

**OpenSSL 3.5**, released April 2025, integrates ML-KEM, ML-DSA, and SLH-DSA with hybrid TLS support enabled by default — removing a significant deployment barrier.

### Full Algorithm Comparison

| Algorithm | Type | Public Key (bytes) | Ciphertext/Signature (bytes) | Security Level | Speed vs RSA-2048 |
|---|---|---|---|---|---|
| RSA-2048 | Classical | 256 | 256 (sig) | ~112-bit | Baseline |
| ECDSA P-256 | Classical | 64 | 64 (sig) | ~128-bit | ~10× faster |
| ML-KEM-768 | PQC KEM | 1,184 | 1,088 (ct) | Level 3 | Faster than RSA |
| ML-DSA-65 | PQC signature | 1,952 | 3,293 (sig) | Level 3 | Comparable |
| SLH-DSA-SHA2-128f | PQC signature | 32 | 17,088 (sig) | Level 1 | Slower |
| FN-DSA-512 | PQC signature | 897 | 666 (sig) | Level 1 | Fast |
| HQC-128 | PQC KEM | 2,249 | 4,433 (ct) | Level 1 | Slower than ML-KEM |

!!! warning "Common Misconception"
    "We can just increase our RSA key sizes to stay secure." RSA-4096 or RSA-8192 do not protect against Shor's algorithm. Gidney and Ekerå (2021) estimated approximately 20 million physical qubits to factor RSA-2048; larger keys increase the quantum resources required by a polynomial — not exponential — factor. Shor's algorithm renders RSA cryptographically broken regardless of key size once sufficient quantum hardware exists.

!!! info "Key Reference"
    NIST FIPS 203, 204, 205 (August 2024); NIST IR 8547 (2024): *Transition to Post-Quantum Cryptography Standards*; Gidney, C. and Ekerå, M. (2021). "How to factor 2048-bit RSA integers in 8 hours using 20 million noisy qubits." *Quantum*, 5, 433.

---

## 12.3 Hybrid Migration and Crypto-Agility

### The Case for Hybrid Deployment

The quantum threat is certain in direction but uncertain in timing. PQC algorithms have survived eight years of NIST evaluation and extensive public cryptanalysis — but they have not survived the decades of real-world adversarial use that RSA and ECC have. New algorithms, however well-designed, lack this track record.

**Hybrid cryptography** addresses both uncertainties simultaneously by combining a classical algorithm with a PQC algorithm in a single protocol negotiation. The canonical TLS hybrid construction is:

$$\text{Shared Secret} = \text{KDF}\!\left(\underbrace{X25519 \text{ output}}_{\text{classical}} \,\|\, \underbrace{\text{ML-KEM-768 output}}_{\text{post-quantum}}\right)$$

Both components contribute entropy to the final shared secret via a Key Derivation Function (KDF). If either component is compromised — whether because a quantum computer breaks X25519 or because an unforeseen mathematical attack breaks ML-KEM — the session remains secure, because breaking the session requires simultaneously defeating both algorithms.

This is why hybrid deployment is recommended by every major national cryptographic authority: NIST, UK NCSC, Germany BSI, and France ANSSI. It is not a compromise position — it is the technically correct approach for the current transitional period.

### Current Deployment State

Hybrid PQC is not a future aspiration. As of early 2026:

- **Chrome, Firefox, and Safari** all support hybrid ML-KEM + X25519 by default.
- **OpenSSL 3.5** (April 2025): hybrid TLS enabled by default; the upgrade from OpenSSL 3.x is a minor version bump.
- **Cloudflare**: over 35% of human-generated internet traffic flowing through Cloudflare's network already carries post-quantum protection via hybrid ML-KEM.
- **AWS**: first FIPS 140-3 validation of an open-source module including ML-KEM.
- **Microsoft**: ML-KEM integrated into Windows 11 and Windows Server 2025 TLS stack.

The infrastructure for hybrid PQC deployment exists today and is being actively used at internet scale. The bottleneck is not technology availability — it is organizational awareness and internal migration programs.

### Crypto-Agility: The Architectural Imperative

Beyond deploying specific PQC algorithms, the most durable architectural investment an organization can make is **crypto-agility**: designing systems so that cryptographic algorithms can be updated without requiring application code changes, protocol redesigns, or extended system outages.

The PQC transition is larger in scope than any previous migration, and it will not be the last. FN-DSA, HQC, and future standards will require updates. Quantum-safe symmetric algorithm guidance will evolve. Crypto-agile architecture converts future migrations from multi-year programs into configuration management exercises.

**Four structural requirements for crypto-agility:**

**1. Abstract cryptographic operations from application logic**

Cryptographic operations must be accessed through configurable APIs, not hardcoded algorithm choices. The application calls `encrypt(data, key, algorithm_policy)` where `algorithm_policy` is resolved at runtime from a configuration store — not `AES_CBC_encrypt(data, key)` baked into source code. When the algorithm must change, only the configuration changes; application code does not.

**2. Centralize key and certificate lifecycle management**

Fragmented key management — where different teams manage their own keys, certificates expire silently, and algorithm updates require manual coordination across hundreds of systems — is incompatible with crypto-agility. Centralized platforms (HashiCorp Vault, AWS Certificate Manager, Azure Key Vault) provide the policy enforcement point through which algorithm transitions can be executed organizationally.

**3. Automate certificate lifecycle management**

Manual certificate management cannot scale across the thousands of certificates in a typical enterprise environment, and the PQC transition requires updating all of them. Certificate lifecycle automation platforms — Venafi, Keyfactor, Sectigo, DigiCert — provide discovery, renewal, and revocation automation with policy enforcement.

**4. Implement and preserve algorithm negotiation**

TLS 1.3's cipher suite negotiation is the correct model: client and server advertise their supported algorithms; the protocol selects the strongest mutually supported option. This provides automatic backward compatibility during migration and automatic adoption of stronger algorithms as they become available. The failure mode is organizations that override this negotiation with hardcoded cipher suite configurations "for performance" — destroying the agility the protocol provides and requiring manual intervention for every algorithm update.

!!! tip "Business Implication"
    Every architectural decision that hardcodes a specific cryptographic algorithm — in application code, infrastructure configuration, protocol implementation, or hardware — creates technical debt that must be paid during the PQC migration. The cost of crypto-agility is paid once, at design time. The cost of crypto-rigidity is paid repeatedly, at each migration event, and compounds with organizational scale.

!!! danger "Critical Risk"
    IoT and embedded systems represent the highest-risk segment for PQC migration. Devices with 5–15 year deployment lifespans that were shipped with hardcoded RSA or ECC implementations and no over-the-air update capability cannot be migrated through software changes. Organizations must audit their embedded device inventory now to identify systems that will require physical replacement — a process that can take years for industrial, medical, or critical infrastructure deployments.

---

## 12.4 The Cryptographic Bill of Materials (CBOM)

A migration program cannot succeed without a complete inventory of what must be migrated. In the PQC context, this inventory is the **Cryptographic Bill of Materials (CBOM)**: a structured record of every cryptographic asset in an organization's environment and the dependencies that connect them.

The urgency of this step is starkly illustrated by current organizational readiness:

- **87% of organizations have not completed a cryptographic inventory** (Gartner, 2025)
- **IBM Quantum-Safe Readiness Index**: global average score of 25/100 as of October 2025

Organizations that have not completed a CBOM are, by definition, unable to scope their migration effort, prioritize their remediation work, or demonstrate progress to regulators.

### What a CBOM Captures

A complete CBOM documents the following for each cryptographic asset:

**Algorithms and parameters**: The specific algorithm and its configuration — not just "RSA" but "RSA-2048 with PKCS#1 v1.5 padding." Parameter precision matters because security levels vary substantially within algorithm families.

**Cryptographic libraries and versions**: OpenSSL 3.2.1, BouncyCastle 1.78, Windows CNG. Versions determine which PQC algorithms are available without library replacement.

**Protocols and versions**: TLS 1.2 vs. 1.3 (TLS 1.2 does not support the KEM API used by ML-KEM directly); SSH protocol version and key exchange algorithms; IPsec IKEv1 vs. IKEv2; PKCS#11 HSM interface versions.

**Certificates and their properties**: Issuer, validity period, subject, key type, key size, signing algorithm — for every certificate in the environment, along with which systems depend on each.

**Keys and secrets metadata**: Key type, length, creation date, rotation policy, storage location (HSM slot, software keystore, cloud KMS), and access control policy. The CBOM captures metadata only, never key material.

**Application dependencies**: Which applications call which cryptographic libraries, which certificates, and which key management systems. This dependency map is essential for understanding the blast radius of each algorithm change.

### Standards and Tooling

**CycloneDX 1.6 (OWASP)** is the definitive CBOM schema, providing native support for cryptographic asset types including algorithms, certificates, keys, protocols, and related-crypto-material. CycloneDX CBOMs are machine-readable (JSON or XML) and interoperable across tooling vendors.

**Discovery approaches** fall into three categories:

- **Static analysis**: Scan source code and compiled binaries for cryptographic API calls, algorithm strings, and library imports. Tools: IBM CBOMkit-hyperion (SonarQube integration), Checkmarx SCA, GitHub CodeQL queries. Coverage: application-layer cryptography in owned code.
- **Runtime observation**: Monitor actual TLS negotiations and cryptographic operations during system operation. Coverage: actual algorithm usage including third-party and legacy systems.
- **Network analysis**: Passive inspection of network traffic to identify TLS versions, cipher suites, and certificate characteristics. Tools: Qualys SSL Labs API, Shodan, custom packet capture analysis. Coverage: all network-exposed endpoints regardless of application architecture.

**Vendor tooling** for enterprise CBOM generation and management:

- **IBM CBOMkit** (open-source): CBOMkit-hyperion for source code scanning, CBOMkit-theia for container image scanning. Produces CycloneDX-compliant CBOMs.
- **IBM Quantum Safe Explorer**: end-to-end discovery, CBOM generation, risk scoring, and migration planning workflow.
- **Keyfactor, Sectigo, DigiCert**: certificate lifecycle management platforms with discovery capabilities that form the certificate layer of the CBOM.
- **Venafi**: machine identity management with cryptographic asset visibility and policy enforcement.

**NIST SP 1800-38B** explicitly recommends automated CBOM generation as the foundational step for PQC readiness assessment and migration planning.

!!! example "Worked Example"
    A regional healthcare system with 12,000 employees conducts a CBOM discovery exercise. Static analysis of 847 repositories finds 23 distinct combinations of algorithm, library, and parameter set. Runtime observation identifies 156 active TLS endpoints; 34 are still negotiating TLS 1.2 with RSA key exchange. Network scanning finds 8 internet-facing endpoints with expired or near-expiry certificates. Critically, the CBOM reveals that 3 production applications are using a vendored OpenSSL 1.1.1 fork (end-of-life since September 2023) that cannot be upgraded to OpenSSL 3.x without application changes — creating a blocking dependency for ML-KEM deployment on those endpoints. Without the CBOM, this dependency would have been discovered only when the PQC migration attempted to update those endpoints and failed.

---

## 12.5 The Four-Phase Migration Framework

PQC migration is not a single project but a multi-year program requiring coordination across network engineering, application development, PKI operations, HSM management, vendor management, and executive governance. The following framework sequences the work to maximize risk reduction earliest while maintaining forward momentum.

### Phase 1: Discover (Months 1–6)

The objective of Phase 1 is a complete, machine-readable CBOM for all internet-facing systems, with preliminary inventory for internal systems.

**Target**: Complete CBOM covering all external-facing TLS endpoints, VPN infrastructure, code signing systems, and CA hierarchy within six months of program initiation.

**Workstreams**:

- Deploy static analysis tooling across all source code repositories (CBOMkit-hyperion, CodeQL).
- Run network scanning against all internet-facing IP ranges (TLS fingerprinting, certificate discovery).
- Enumerate HSM inventory with vendor and firmware versions.
- Catalog all certificate authorities — internal, external, subordinate, issuing — with algorithm inventory.
- Document all third-party vendor dependencies that involve cryptography (payment processors, identity providers, EDI partners).

**Deliverable**: CBOM inventory report with algorithm distribution, TLS version breakdown, certificate expiry timeline, library version map, and identification of blocking dependencies (EOL libraries, non-upgradeable embedded systems, vendor-controlled endpoints).

### Phase 2: Prioritize (Months 4–9, Overlapping with Phase 1)

The objective of Phase 2 is a risk-ranked migration plan with Mosca's theorem applied to each critical data category.

**Risk ranking for migration priority:**

1. **Internet-facing TLS endpoints** — highest HNDL exposure; actively targeted; highest priority
2. **VPN infrastructure** — site-to-site and remote access VPNs carry sensitive long-lived traffic
3. **Internal PKI and certificate authorities** — CA compromise has cascade effects; root CA key upgrade required before issuing PQC certificates
4. **Code signing infrastructure** — integrity of software supply chain; mandated by CNSA 2.0
5. **Data-at-rest encryption** — lower HNDL exposure; addressed primarily by AES-256 upgrade
6. **Embedded and IoT systems** — longest replacement timeline; begin inventory and vendor engagement immediately

**Deliverable**: Prioritized migration plan with Mosca's theorem calculations for the top 10 data categories, estimated migration timeline by system tier, budget estimates, and vendor engagement plan.

### Phase 3: Migrate (Months 6–36+)

Migration proceeds in priority order, with hybrid mode deployed before pure PQC to maintain backward compatibility.

**TLS key exchange (ML-KEM) — Priority 1**

Configure ML-KEM-768 + X25519 hybrid in OpenSSL 3.5+ or equivalent TLS library. Enable in web servers (nginx, Apache, IIS), load balancers (F5, AWS ALB, Cloudflare), and API gateways. Monitor for client compatibility failures — clients that do not support hybrid ML-KEM fall back to classical X25519 in properly configured hybrid deployments.

**Code signing and certificates (ML-DSA) — Priority 2**

Issue new code signing certificates with ML-DSA-65. Update CI/CD pipeline signing tooling. Issue dual-algorithm certificates (classical + PQC) during the transition period to maintain compatibility with existing verification infrastructure.

**VPN tunnels — Priority 3**

IKEv2 supports PQC key exchange through RFC 9370 (Multiple Key Exchanges in IKEv2). Major VPN vendors (Cisco, Palo Alto, Fortinet) have released or are releasing PQC-capable firmware.

**Application-layer encryption — Priority 4**

Replace RSA-encrypted key wrapping with ML-KEM; apply AES-256 upgrade for symmetric components. Application-level encryption migrates after the transport layer because HNDL primarily targets data in transit.

**HSM upgrades**

Hardware Security Modules require firmware or hardware upgrades to support PQC operations. Current PQC-capable HSM platforms include Thales Luna Network HSM v7.9+, Entrust nShield 5s, and AWS CloudHSM (ML-KEM support announced). Procurement lead times for HSM upgrades can be 6–18 months; begin vendor engagement in Phase 2.

### Phase 4: Validate and Iterate (Ongoing)

**Interoperability testing**: Verify that PQC-protected connections successfully negotiate with all expected clients and servers. Common failure modes include MTU fragmentation issues with larger PQC key sizes in constrained network paths, and handshake failures with legacy clients that reject unrecognized extensions.

**Performance validation**: Measure TLS handshake latency, CPU utilization on HSMs, and signing throughput under load. ML-KEM should show latency improvement over RSA; ML-DSA signature size may require HTTP/2 header compression tuning.

**Standards monitoring**: FN-DSA (FIPS 206) and HQC are expected in 2026–2027. A crypto-agile architecture enables their adoption without a new migration program — but this must be tested by deliberately exercising algorithm rotation.

**Annual board reporting**: PQC migration progress, percentage of endpoints protected, outstanding blocking dependencies, budget vs. plan, and quantum risk posture assessment should be presented to the board annually. This converts PQC from a technical project into an enterprise risk management program with appropriate governance visibility.

!!! example "Worked Example"
    A mid-size financial services firm has 847 TLS endpoints (public-facing APIs and partner integrations), 23 internal certificate authorities in a three-tier hierarchy, 1,200 code-signed applications, and embedded cryptography in 6,000 IoT devices (ATMs, POS terminals, branch networking equipment).

    Applying Mosca's theorem: customer transaction data has a shelf-life of 30 years ($x = 30$), estimated migration time is 5 years ($y = 5$), so $x + y = 35$. With $z$ estimates placing a 50% probability on CRQC before 2035, the firm has already crossed the Mosca risk threshold.

    **Phase 1 result**: 780 TLS endpoints run nginx or Apache on Linux with OpenSSL 3.2+; upgrading to OpenSSL 3.5 and enabling hybrid ciphers requires 4 FTE-months of engineering. 67 endpoints run Windows Server with IIS; covered by Windows Server 2025 update. 3 legacy appliances require hardware replacement with an 18-month procurement lead time — identified by CBOM, procurement begun immediately.

    **Phase 3 timeline**: Priority 1 (TLS endpoints, months 1–6): 97% of internet-facing endpoints protected by ML-KEM hybrid. Priority 2 (CA hierarchy and code signing, months 4–12): 23 CAs upgraded; 1,200 signing workflows updated via Keyfactor automation. Priority 3 (VPN, months 12–24): 23 site-to-site tunnels and 4,000 remote access endpoints migrated. Priority 4 (IoT, months 24–48): ATMs covered by existing vendor replacement contract; POS terminals covered by vendor patch; branch networking covered by standard hardware refresh cycle.

    **Total estimated budget**: \$2.8M over 4 years, 60% personnel and 40% hardware/vendor costs. Risk reduction: 95% of internet-facing TLS traffic protected by ML-KEM within 18 months of program start.

!!! tip "Business Implication"
    PQC migration is not a technology project — it is a compliance and risk management imperative with hard regulatory deadlines. CNSA 2.0 requires U.S. government suppliers to begin PQC deployment by January 2027. UK NCSC mandates discovery phase completion by 2028. NIST IR 8547 triggers FIPS 140-3 non-compliance for RSA/ECDH starting in 2030. Organizations without an active, board-governed migration program today are accumulating technical debt, regulatory exposure, and — for organizations with long-lived sensitive data — irreversible data exposure. The time to start is now.

---

## Chapter Summary

!!! abstract "Five Key Takeaways"

    1. **The HNDL threat is active today.** Nation-state adversaries are intercepting and archiving encrypted communications now, requiring no quantum hardware. Multiple allied governments have assessed HNDL campaigns as underway. The window for protecting data already collected has closed; the window for data generated today is closing.

    2. **Mosca's theorem quantifies the urgency.** If your data's shelf-life ($x$) plus your migration time ($y$) exceeds the CRQC arrival estimate ($z$), your data is already at risk under a meaningful fraction of plausible futures. For organizations with long-lived sensitive data and multi-year migration programs, the Mosca threshold has already been crossed.

    3. **Three NIST standards are finalized and deployable.** FIPS 203 (ML-KEM) addresses key exchange and is the highest priority; FIPS 204 (ML-DSA) addresses signatures; FIPS 205 (SLH-DSA) provides algorithm diversity through hash-based signatures that do not depend on lattice mathematics. Hybrid deployment combining classical and PQC algorithms is the recommended approach during the transitional period.

    4. **Crypto-agility is the durable architectural investment.** Abstracting cryptography from applications, centralizing key management, automating certificate lifecycle, and preserving algorithm negotiation converts future migrations from multi-year programs into configuration changes.

    5. **You cannot migrate what you cannot see.** A CBOM is the non-negotiable foundation of any PQC migration program. The 87% of organizations that have not completed a cryptographic inventory cannot know their migration scope, cannot prioritize their remediation, and cannot demonstrate compliance with approaching regulatory deadlines.

---

## References

1. Mosca, M. (2018). "Cybersecurity in an era of quantum computing." *IEEE Security & Privacy*, 16(5), 38–41.

2. NIST. (2024). *FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard*. National Institute of Standards and Technology.

3. NIST. (2024). *FIPS 204: Module-Lattice-Based Digital Signature Standard*. National Institute of Standards and Technology.

4. NIST. (2024). *FIPS 205: Stateless Hash-Based Digital Signature Standard*. National Institute of Standards and Technology.

5. NIST. (2024). *NIST IR 8547 (Initial Public Draft): Transition to Post-Quantum Cryptography Standards*. National Institute of Standards and Technology.

6. NIST. (2023). *NIST SP 1800-38B: Migration to Post-Quantum Cryptography*. National Cybersecurity Center of Excellence.

7. NSA. (2022). *Commercial National Security Algorithm Suite 2.0 (CNSA 2.0) Advisory*. National Security Agency Cybersecurity Advisory.

8. Gidney, C. and Ekerå, M. (2021). "How to factor 2048-bit RSA integers in 8 hours using 20 million noisy qubits." *Quantum*, 5, 433.

9. IBM Research. (2025). *Quantum-Safe Readiness Index: Global Assessment 2025*. IBM Institute for Business Value.

10. Bernstein, D. J. and Lange, T. (2017). "Post-quantum cryptography." *Nature*, 549(7671), 188–194.

11. UK National Cyber Security Centre. (2023). *Post-Quantum Cryptography: Preparing for the Quantum Threat*. NCSC Guidance.

12. BSI. (2024). *Recommendations for Post-Quantum Cryptography*. Federal Office for Information Security (Germany).

13. Alagic, G. et al. (2022). *Status Report on the Third Round of the NIST Post-Quantum Cryptography Standardization Process*. NISTIR 8413.
