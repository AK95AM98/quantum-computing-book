---
title: "Chapter 12 Quiz: The Post-Quantum Cryptography Imperative"
chapter: 12
quiz_questions: 30
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
---

# Chapter 12 Quiz: The Post-Quantum Cryptography Imperative

This quiz covers the harvest-now, decrypt-later threat, Mosca's theorem, NIST PQC standards (FIPS 203/204/205), hybrid migration, CBOM construction, and the four-phase migration framework. Questions are arranged by Bloom's Taxonomy level, five questions per level.

---

## Level 1 — Remember (Recall of Key Facts)

**Q1.** What does the acronym HNDL stand for in the context of post-quantum cryptography?

A) Hash-and-Decrypt Later
B) Harvest-Now, Decrypt-Later
C) Hybrid-NIST Deprecation Lifecycle
D) High-Noise Data Latency

**Correct answer: B**
*Harvest-Now, Decrypt-Later is the intelligence collection strategy in which an adversary archives encrypted communications today to decrypt them later using a future quantum computer.*

---

**Q2.** Which NIST FIPS standard corresponds to ML-KEM (Module-Lattice Key Encapsulation Mechanism)?

A) FIPS 204
B) FIPS 205
C) FIPS 206
D) FIPS 203

**Correct answer: D**
*FIPS 203 standardizes ML-KEM, derived from CRYSTALS-Kyber. FIPS 204 is ML-DSA, FIPS 205 is SLH-DSA, and FIPS 206 (not yet final) is FN-DSA.*

---

**Q3.** In Mosca's theorem, what does the variable $y$ represent?

A) Years until a cryptographically relevant quantum computer arrives
B) Years the sensitive data must remain confidential
C) Years required to complete migration to quantum-safe cryptography
D) Years since the data was encrypted

**Correct answer: C**
*In Mosca's theorem: $x$ = data shelf-life, $y$ = migration time, $z$ = estimated time until CRQC. The risk condition is $x + y > z$.*

---

**Q4.** In what year did NIST finalize and publish FIPS 203, 204, and 205?

A) 2022
B) 2023
C) 2024
D) 2025

**Correct answer: C**
*NIST published FIPS 203, 204, and 205 on August 13, 2024, completing an eight-year standardization process.*

---

**Q5.** According to NIST IR 8547, in what year will RSA, ECDH, and ECDSA be *disallowed* (not merely deprecated) in federal systems?

A) 2028
B) 2030
C) 2035
D) 2040

**Correct answer: C**
*The timeline is: deprecated in 2030 (no new deployments), disallowed in 2035 (all systems must have migrated).*

---

## Level 2 — Understand (Explain Concepts)

**Q6.** Which layer of a TLS session is the PRIMARY target of a harvest-now, decrypt-later attack, and why?

A) The application data layer, because it contains the most valuable information
B) The certificate authentication layer, because it allows identity spoofing
C) The asymmetric key exchange layer, because breaking it reveals the symmetric key used to decrypt all session data
D) The record layer, because it contains the MAC codes

**Correct answer: C**
*The asymmetric key exchange (RSA or ECDH) establishes the shared secret from which all session keys are derived. Breaking it with Shor's algorithm retroactively decrypts the entire archived session. AES (the symmetric layer) is not immediately vulnerable.*

---

**Q7.** Why is SLH-DSA (FIPS 205) considered strategically important even though it has larger signatures than ML-DSA?

A) It is significantly faster than ML-DSA for high-volume signing
B) It provides algorithm diversity because its security relies solely on hash function collision resistance, independent of lattice mathematics
C) It produces smaller public keys than all other PQC signature schemes
D) It is required by CNSA 2.0 as the mandatory signature algorithm

**Correct answer: B**
*SLH-DSA's security depends only on hash function collision resistance (SHA-2 or SHAKE), not on lattice problems. If a mathematical breakthrough ever compromised lattice-based schemes like ML-DSA, SLH-DSA would remain secure, providing crucial algorithm diversity.*

---

**Q8.** What is the fundamental reason that increasing RSA key size (e.g., from RSA-2048 to RSA-8192) does not solve the post-quantum problem?

A) Larger RSA keys are vulnerable to classical factoring algorithms
B) Shor's algorithm provides an exponential speedup that scales polynomially with key size — larger keys only require more quantum resources, not an exponentially harder problem
C) NIST has explicitly prohibited RSA keys larger than 4096 bits
D) Larger RSA keys cannot be processed by modern HSMs

**Correct answer: B**
*Shor's algorithm breaks RSA in polynomial quantum time. Doubling the key size increases quantum resource requirements by a manageable polynomial factor, not exponentially. The algorithm remains efficient regardless of key size.*

---

**Q9.** What distinguishes ML-KEM from ECDH in terms of API semantics?

A) ML-KEM uses public key infrastructure while ECDH does not
B) ECDH is a Non-Interactive Key Exchange (NIKE) requiring only public keys from both parties; ML-KEM requires an explicit encapsulation step by one party
C) ML-KEM is symmetric while ECDH is asymmetric
D) ECDH produces larger ciphertexts than ML-KEM

**Correct answer: B**
*ECDH allows both parties to independently derive the same shared secret given only each other's public keys (NIKE semantics). ML-KEM requires one party to explicitly encapsulate a random secret under the other's public key and transmit the resulting ciphertext.*

---

**Q10.** Why does NIST IR 8547's deprecation of RSA in 2030 affect private-sector enterprises that do not directly operate under federal mandate?

A) Private enterprises are legally required to follow all NIST publications
B) The deprecation triggers non-compliance in FIPS 140-3 validated cryptographic modules, which cascades through procurement requirements, frameworks like PCI-DSS and FedRAMP, and international regulatory equivalents
C) RSA becomes technically inoperable in 2030 when OpenSSL removes support
D) NIST IR 8547 explicitly includes private enterprises with revenue above $1B

**Correct answer: B**
*FIPS 140-3 validation is required for federal procurement. Many private-sector frameworks (PCI-DSS, HIPAA, FedRAMP) reference FIPS 140-3, and supplier requirements cascade from federal agencies. The effect is broad even without direct federal mandate.*

---

## Level 3 — Apply (Use Knowledge in New Situations)

**Q11.** A healthcare organization has patient records that must remain confidential for 60 years. They estimate their PQC migration will take 6 years. Experts estimate a 50% probability that a CRQC arrives within 12 years. Is this organization at risk under Mosca's theorem?

A) No — 60 years is far in the future; there is no current risk
B) Yes — $x + y = 66$ years, and $z = 12$ years, so $x + y \gg z$
C) Only if the data includes financial information
D) No — Mosca's theorem only applies to government data

**Correct answer: B**
*$x = 60$, $y = 6$, $x + y = 66$. $z = 12$ years. Since $66 > 12$, the inequality $x + y > z$ is satisfied. The organization's data is at risk NOW under the stated assumptions.*

---

**Q12.** A financial services firm needs to protect a specific category of trading data for 8 years. Their migration program will take 4 years to complete. Expert consensus places the median CRQC arrival at 9 years from now. What does Mosca's theorem say about this data?

A) The data is safe; $x + y = 12 > 9$, so it is well within the margin
B) The data is at risk; $x + y = 12 > z = 9$, so the risk condition is satisfied
C) The data is safe because financial data has shorter shelf-life than government data
D) Mosca's theorem cannot be applied without knowing the exact CRQC date

**Correct answer: B**
*$x = 8$, $y = 4$, $x + y = 12$. $z = 9$. Since $12 > 9$, the risk condition $x + y > z$ is satisfied. The data is at risk NOW.*

---

**Q13.** An organization is deploying PQC for TLS and must choose between ML-KEM-512, ML-KEM-768, and ML-KEM-1024 for their general-purpose internet-facing web servers. Which parameter set is recommended, and why?

A) ML-KEM-512, because it minimizes performance overhead
B) ML-KEM-1024, because it provides the highest security regardless of performance
C) ML-KEM-768, because it balances Level 3 security (equivalent to AES-192) with strong performance characteristics
D) None; lattice-based KEMs should not be used until FN-DSA is finalized

**Correct answer: C**
*ML-KEM-768 at Level 3 security is the recommended general-purpose choice. ML-KEM-512 provides Level 1 security (AES-128 equivalent), which some security policies consider insufficient. ML-KEM-1024 provides Level 5 security at higher overhead when Level 3 is adequate.*

---

**Q14.** A DevSecOps team discovers that their continuous integration pipeline hardcodes the ECDSA P-256 algorithm in three separate files for code-signing operations. They want to become crypto-agile. Which architectural change most directly addresses this problem?

A) Replace ECDSA P-256 with ML-DSA-65 in all three files immediately
B) Refactor signing to call a centralized, configurable signing service that resolves algorithm choice from policy configuration at runtime
C) Add a comment in each file noting the algorithm for future reference
D) Deploy a new HSM that supports PQC algorithms

**Correct answer: B**
*Crypto-agility requires abstracting algorithm selection from application code. Replacing ECDSA with ML-DSA in three files solves the immediate problem but does not create agility — the next algorithm change requires the same three-file edit. A centralized configurable signing service enables future algorithm changes through policy updates alone.*

---

**Q15.** An organization's CBOM reveals that two critical production applications depend on a vendored OpenSSL 1.1.1 library (end-of-life September 2023). Why is this a blocking dependency for PQC migration, and what is the correct remediation approach?

A) It is not a blocking dependency; any OpenSSL version can be patched to support ML-KEM
B) OpenSSL 1.1.1 does not support ML-KEM or hybrid TLS; the applications must be updated to use OpenSSL 3.5+ before PQC deployment can proceed on those endpoints
C) The applications should be replaced with cloud-native alternatives immediately
D) The organization should use SLH-DSA instead, which is supported on older OpenSSL versions

**Correct answer: B**
*OpenSSL 1.1.1 (EOL since September 2023) does not include ML-KEM support. PQC deployment on those endpoints is blocked until the applications are updated to use a supported OpenSSL version (3.5+ for native ML-KEM and hybrid TLS). This is a planned application upgrade dependency, not a library patch.*

---

## Level 4 — Analyze (Break Down and Examine)

**Q16.** Analyze the trade-offs between ML-DSA-65 and SLH-DSA-SHA2-128f for a high-volume code-signing pipeline that processes 50,000 firmware signing operations per day. Which algorithm is more appropriate, and what is the key consideration?

A) SLH-DSA-SHA2-128f, because its hash-based security is more conservative
B) ML-DSA-65, because its smaller signatures (3,293 bytes vs. 17,088 bytes) and faster signing speed are more appropriate for high-volume operations; SLH-DSA's large signatures create storage and bandwidth burdens
C) Neither; FN-DSA should be used for all code signing because it produces the smallest signatures
D) SLH-DSA-SHA2-128f, because high-volume operations benefit from its parallel verification

**Correct answer: B**
*At 50,000 operations per day, SLH-DSA's 17,088-byte signatures create significant storage overhead (roughly 855 MB/day in signature data alone vs. ~165 MB/day for ML-DSA). SLH-DSA is appropriate where algorithm diversity is the primary concern and volume is lower. For high-volume pipelines, ML-DSA-65's performance and smaller output are decisive.*

---

**Q17.** A security architect argues that their organization should skip hybrid deployment and go directly to pure ML-KEM for all TLS endpoints to simplify the transition. Analyze the risks of this approach.

A) There is no risk; pure ML-KEM is more secure than hybrid and simpler to deploy
B) Pure ML-KEM eliminates the classical cryptographic protection layer. If an unforeseen weakness in ML-KEM were discovered before migration is complete, the organization would have no fallback. Hybrid preserves classical security if PQC is broken and PQC security if classical is broken.
C) Pure ML-KEM is incompatible with TLS 1.3 and would break all connections
D) The primary risk is performance; ML-KEM alone is 10× slower than hybrid configurations

**Correct answer: B**
*Hybrid deployment is recommended precisely because PQC algorithms, while rigorously vetted, lack decades of real-world adversarial exposure. Hybrid provides defense-in-depth: classical algorithms protect against unknown PQC weaknesses; PQC algorithms protect against quantum attacks. Eliminating the classical layer removes this defense-in-depth prematurely.*

---

**Q18.** Compare the HNDL risk profile of a public-facing e-commerce website's TLS traffic versus an internal HR system's database connections. Which system should be prioritized for ML-KEM deployment, and why?

A) The internal HR system, because it contains sensitive personal data
B) The public-facing e-commerce website, because its TLS key exchanges are directly accessible to network-level adversaries without requiring internal network access
C) Both are equally at risk and should be migrated simultaneously
D) Neither; database connections are not encrypted with TLS

**Correct answer: B**
*HNDL targets data in transit over networks the adversary can access. Public-facing TLS traffic is accessible to any network-positioned adversary globally. Internal database connections require the adversary to have already achieved internal network access — a higher bar. Internet-facing TLS endpoints have the highest HNDL exposure and are the correct first priority.*

---

**Q19.** An enterprise has completed Phase 1 (CBOM) and finds the following: 1,200 TLS endpoints, 85 internal CAs, 400 code-signed applications, and 2,000 IoT devices with hardcoded firmware encryption. Analyze which component creates the longest migration timeline and explain why.

A) The 1,200 TLS endpoints, because each requires individual configuration
B) The 85 internal CAs, because root CA migration requires extensive testing
C) The 2,000 IoT devices with hardcoded firmware encryption, because they cannot be migrated through software updates and require hardware replacement on device lifecycle timelines (typically 5–10 years)
D) The 400 code-signed applications, because each requires individual certificate reissuance

**Correct answer: C**
*IoT devices with hardcoded cryptography and no over-the-air update capability cannot be migrated through software. They must be replaced at end-of-hardware-lifecycle, which may extend 5–10 years. This is why IoT devices are identified as Priority 6 (longest timeline) and why vendor engagement must begin in Phase 1 — the remediation lead time exceeds all other migration components.*

---

**Q20.** A CBOM analysis of a financial institution reveals that 40% of its cryptographic library usage is OpenSSL versions ranging from 1.0.2 to 3.1, spread across different applications with different owners. What does this finding reveal about the institution's crypto-agility posture, and what is the most important structural remediation?

A) The institution has strong crypto-agility because it uses many different library versions
B) The distribution of EOL and near-EOL OpenSSL versions across application-specific ownership reveals fragmented, decentralized cryptography management with no organization-wide lifecycle policy — the opposite of crypto-agility. The most important remediation is centralized cryptographic library governance with standardized version requirements enforced through build pipelines.
C) The institution should immediately replace all OpenSSL usage with BouncyCastle
D) The finding is low risk; OpenSSL version distribution is normal in large enterprises

**Correct answer: B**
*Multiple EOL library versions across siloed application ownership indicates no centralized cryptographic governance. Crypto-agility requires centralized policy enforcement — the ability to mandate library versions and algorithm choices across all applications simultaneously. Fragmented ownership makes coordinated migration virtually impossible.*

---

## Level 5 — Evaluate (Judge and Critique)

**Q21.** A CISO presents the following argument to the board: "Our data has a 5-year retention policy. Even under the most aggressive CRQC timeline of 3 years, our migration program takes 4 years, so $x + y = 9 > z = 3$. But 5-year-old data has no value to adversaries, so we have low urgency." Evaluate this argument.

A) The argument is sound; short data retention eliminates HNDL risk entirely
B) The argument is flawed because it conflates data retention policy with actual data sensitivity shelf-life; adversaries collecting today's data value it at collection time, not deletion time — and 3 years is an aggressive estimate representing perhaps 10–15% of expert probability distributions, not the median
C) The argument is correct and the organization can safely deprioritize PQC
D) The argument is valid only if the organization uses AES-256 for all data at rest

**Correct answer: B**
*The argument has two flaws. First, a 5-year retention policy does not mean data loses value at 5 years — it means the organization deletes its own copy, not the adversary's archived copy. Second, using the most aggressive $z$ estimate (3 years) underweights the probability distribution; at median estimates ($z \approx 9$–12 years), $x + y = 9$ satisfies the risk condition for many data categories.*

---

**Q22.** Evaluate the following vendor claim: "Our quantum-safe VPN product uses AES-256 for all traffic, making it fully post-quantum secure." Is this claim accurate?

A) Yes — AES-256 is post-quantum secure against Grover's algorithm
B) No — AES-256 addresses symmetric encryption security, but if the VPN uses RSA or ECDH for its key exchange handshake, that handshake remains vulnerable to Shor's algorithm. The claim is incomplete and potentially misleading.
C) Yes — AES-256 with 256-bit keys provides full protection against all quantum attacks
D) No — AES-256 is not quantum-safe; all AES variants are broken by Grover's algorithm

**Correct answer: B**
*AES-256 is quantum-resistant for the symmetric encryption layer (Grover's algorithm halves effective security to ~128 bits, which remains secure). However, most VPN key exchange uses RSA or ECDH, which is fully broken by Shor's algorithm. A VPN product that uses RSA/ECDH for key establishment but AES-256 for data encryption is NOT fully post-quantum secure.*

---

**Q23.** An organization's board is evaluating two migration strategies: (A) wait for FN-DSA (FIPS 206) to be finalized in 2027 before beginning any signature migration, to benefit from its smaller signature sizes; or (B) begin ML-DSA deployment now in hybrid mode while planning for FN-DSA adoption when available. Evaluate these strategies.

A) Strategy A is correct; waiting for the best algorithm minimizes total migration effort
B) Strategy B is correct; delaying signature migration until 2027 exposes code signing and certificates to unnecessary risk for 2+ additional years, and a crypto-agile architecture enables FN-DSA adoption later without restarting the migration
C) Both strategies are equivalent if the organization deploys AES-256 for all signing operations immediately
D) Strategy A is correct; ML-DSA's large signatures make it unsuitable for production deployments

**Correct answer: B**
*Strategy A trades near-term risk reduction for marginal future optimization. Code signing infrastructure and certificate authorities represent significant attack surface; delaying their migration exposes software supply chain integrity for 2+ years. Strategy B's hybrid ML-DSA deployment addresses current risk immediately, and a crypto-agile architecture enables FN-DSA adoption through a configuration change when FIPS 206 is finalized.*

---

**Q24.** Evaluate the adequacy of the following CBOM discovery approach: "We ran static analysis on our main application codebase and found 4 cryptographic algorithm usages. We consider our CBOM complete." What is missing, and how significant are the gaps?

A) The approach is adequate for organizations with fewer than 500 employees
B) Static analysis of the main codebase captures only application-layer cryptography in owned code; it misses cryptography in third-party libraries and vendored dependencies, all network infrastructure (load balancers, VPNs, network appliances), certificate infrastructure, key management systems, HSMs, and any cryptography in containerized or cloud-deployed components — likely representing the majority of the organization's cryptographic surface
C) The approach is adequate if the organization also reviews its SSL certificates
D) Static analysis is sufficient if combined with a manual interview of the security team

**Correct answer: B**
*Static analysis of the main codebase is one of three discovery approaches (static analysis, runtime observation, network analysis), and even within static analysis covers only owned source code. In a typical enterprise, network infrastructure, load balancers, VPN appliances, identity providers, payment processors, and cloud services may represent far more cryptographic surface area than the main application codebase.*

---

**Q25.** A security team argues that since OpenSSL 3.5 now supports ML-KEM by default, their organization "is already post-quantum ready" simply by upgrading OpenSSL across all servers. Evaluate this claim.

A) The claim is correct — OpenSSL 3.5 is all that is required for full PQC readiness
B) The claim significantly overstates readiness. OpenSSL 3.5 enables PQC at the library level, but readiness also requires: enabling hybrid cipher suites in server configurations; migrating VPN and non-TLS protocols; upgrading internal PKI and CA hierarchy to issue PQC certificates; updating code signing infrastructure; addressing HSM firmware compatibility; remediating IoT and embedded systems; and establishing CBOM-based governance and crypto-agility — none of which are provided by an OpenSSL upgrade alone
C) The claim is approximately correct; the remaining work is minor configuration
D) The claim is incorrect because OpenSSL 3.5 does not actually support ML-KEM

**Correct answer: B**
*OpenSSL 3.5 removes a significant deployment barrier for TLS key exchange, but PQC readiness encompasses the full cryptographic surface of the enterprise: protocols beyond TLS, PKI hierarchy, code signing, HSMs, embedded systems, vendor dependencies, and organizational governance. An OpenSSL upgrade is necessary but far from sufficient.*

---

## Level 6 — Create (Synthesize New Solutions)

**Q26.** Design a Mosca's theorem risk assessment framework for a large hospital system with the following data categories: (1) patient health records retained for 50 years, (2) financial billing data retained for 7 years, (3) research trial data retained for 30 years, and (4) staff HR records retained for 10 years. The hospital estimates its PQC migration will take 6 years. Using a conservative CRQC estimate of $z = 10$ years, prioritize these categories by risk level and recommend migration sequencing.

**Model answer:**

| Category | $x$ (years) | $y$ (years) | $x + y$ | Risk condition ($> z = 10$)? | Priority |
|---|---|---|---|---|---|
| Patient health records | 50 | 6 | 56 | Yes (56 > 10) | 1 (Highest) |
| Research trial data | 30 | 6 | 36 | Yes (36 > 10) | 2 |
| HR records | 10 | 6 | 16 | Yes (16 > 10) | 3 |
| Financial billing data | 7 | 6 | 13 | Yes (13 > 10) | 4 |

All four categories satisfy the risk condition. Prioritization: patient records first (highest shelf-life, likely subject to HIPAA requirements), research data second (30-year retention and regulatory obligations), HR records third, financial data fourth. All should be included in the same migration program, sequenced by priority with internet-facing TLS endpoints serving each data category as the first migration target within each category.

---

**Q27.** Construct a hybrid PQC deployment plan for a financial services firm's public-facing REST API gateway that currently uses TLS 1.2 with ECDH-RSA cipher suites. The plan must maintain backward compatibility with legacy client integrations and achieve full ML-KEM protection for all new clients. Include specific technical steps, configuration choices, and validation criteria.

**Model answer:**

*Step 1 — Library upgrade*: Upgrade API gateway TLS library to OpenSSL 3.5+ (or equivalent vendor release). Verify ML-KEM and X25519 cipher suite support in the gateway's TLS configuration.

*Step 2 — Enable hybrid cipher suites*: Configure cipher suite priority: (1) X25519 + ML-KEM-768 hybrid, (2) X25519 (ECDH, classical), (3) ECDH-RSA (legacy). This ordering ensures new clients negotiate hybrid ML-KEM while legacy clients fall back gracefully to classical ciphers.

*Step 3 — TLS 1.3 migration*: Enable TLS 1.3 as the preferred protocol version. TLS 1.3's KEM-compatible handshake structure enables ML-KEM more cleanly than TLS 1.2. Maintain TLS 1.2 as a fallback for legacy clients with a deprecation timeline.

*Step 4 — Certificate update*: Transition to dual-algorithm certificates (classical ECDSA + ML-DSA-65) for the API gateway, issued by a CA supporting both algorithm types.

*Step 5 — Validation*: (a) Confirm hybrid ML-KEM negotiation for a test client using a TLS 1.3-capable client; (b) Confirm TLS 1.2/ECDH fallback for a legacy test client; (c) Measure TLS handshake latency baseline before and after; (d) Monitor error rates for 48 hours post-deployment.

*Backward compatibility*: Maintained through cipher suite priority ordering and continued TLS 1.2 support with a 12-month deprecation notice to legacy integration partners.

---

**Q28.** Design a crypto-agility maturity model for assessing an organization's readiness for future cryptographic migrations beyond PQC. Define at least four maturity levels with specific, measurable criteria at each level.

**Model answer:**

| Level | Name | Criteria |
|---|---|---|
| 1 — Ad Hoc | Cryptographic operations are hardcoded in application source code; no centralized inventory; algorithm changes require application code changes across all affected systems. | No CBOM exists; algorithms are hardcoded; certificate management is manual; no crypto governance policy. |
| 2 — Managed | CBOM exists and is updated at least annually; certificate lifecycle is automated for at least 80% of certificates; cryptographic libraries are standardized on supported versions. | CBOM present; ≥80% certificate automation; library version standard exists; algorithm changes require configuration effort but are scoped and documented. |
| 3 — Defined | Cryptographic operations are abstracted behind configurable APIs; a centralized key/cert management platform enforces organization-wide policy; algorithm negotiation is preserved in all protocols; CBOM is continuously updated from automated discovery. | API abstraction in ≥80% of applications; centralized KMS; automated CBOM regeneration quarterly; algorithm changes achievable within a single sprint via configuration. |
| 4 — Optimized | Algorithm changes are tested through scheduled crypto-agility drills; new PQC standards are evaluated and staged for deployment within 30 days of finalization; CBOM is real-time and integrated with CI/CD pipelines; board-level quantum risk metrics are reported quarterly. | Annual crypto-agility drill completed; new standard onboarding < 30 days; real-time CBOM; zero hardcoded algorithms across all codebases. |

---

**Q29.** An organization asks you to design a CBOM for a microservices architecture with 200 services, each potentially using different cryptographic libraries, TLS configurations, and certificate chains. Propose a discovery methodology that achieves comprehensive coverage without requiring manual inspection of each service.

**Model answer:**

*Layer 1 — CI/CD pipeline integration*: Integrate CBOMkit-hyperion (or equivalent) into the build pipeline for all 200 services. Every build automatically scans source code and vendored dependencies, producing a per-service CBOM fragment stored in the artifact registry alongside the build artifact.

*Layer 2 — Container image scanning*: Deploy CBOMkit-theia to scan all container images at push time. This captures cryptographic dependencies compiled into images that may not be visible in source code (e.g., base image OpenSSL versions).

*Layer 3 — Runtime service mesh observation*: In a service mesh (Istio, Linkerd), configure mTLS reporting to log cipher suites and TLS versions for all service-to-service calls. This captures actual negotiated algorithms, not just configured ones.

*Layer 4 — Certificate discovery*: Deploy Keyfactor or Venafi agent-based discovery across the Kubernetes cluster to enumerate all certificates, their properties, and their service associations.

*Layer 5 — Aggregation and deduplication*: A central CBOM aggregation service combines fragments from all four layers, deduplicates algorithm/library combinations, resolves service dependencies, and produces a master CBOM in CycloneDX 1.6 format.

*Continuous update*: Automate CBOM regeneration on every CI/CD build and every certificate renewal event. Maintain a CBOM drift alert if any service has not reported a CBOM update within 30 days.

---

**Q30.** You are advising a company with 500 employees, 95% of whose revenue depends on U.S. government contracts, on how to prioritize PQC migration to meet CNSA 2.0 requirements. The company has limited resources (one security engineer, a $200,000 annual security budget). Design a pragmatic, prioritized 18-month migration roadmap that addresses the highest-risk items within the available constraints.

**Model answer:**

*Context*: CNSA 2.0 requires government contractors to begin PQC deployment by January 2027, with ML-KEM for key exchange as the first priority. Resource constraint requires strict prioritization.

*Months 1–3 — Discovery (automated, low-cost)*: Deploy IBM CBOMkit (open-source) on CI/CD pipelines. Run Qualys SSL Labs scans on all external endpoints. Enumerate certificates via existing CA admin console. Output: CBOM for all internet-facing systems. Estimated cost: 0.25 FTE-months + $0 tooling (open-source).

*Months 3–9 — TLS migration (highest ROI)*: Upgrade all internet-facing servers to OpenSSL 3.5 (handles the majority with standard OS package upgrades). Enable ML-KEM-768 + X25519 hybrid cipher suites in nginx/Apache/IIS configurations. This addresses the primary CNSA 2.0 requirement and the highest HNDL exposure. Estimated cost: 0.5 FTE-months engineering, $0 licensing.

*Months 6–12 — Certificate automation and CA upgrade*: Deploy Sectigo or DigiCert managed PKI (approximately $15,000/year) to automate certificate renewal and enable ML-DSA certificate issuance. Issue dual-algorithm TLS certificates.

*Months 9–18 — VPN and code signing*: Upgrade VPN firmware (vendor-provided updates for major platforms). Update code signing certificates to ML-DSA-65. Estimated cost: $20,000 in vendor upgrade fees.

*Ongoing*: Annual CBOM review and board report. IoT/embedded device migration deferred to hardware refresh cycle (out of 18-month scope; document and communicate to board with timeline estimate).

*Budget allocation*: $15,000 PKI automation, $20,000 vendor upgrades, $165,000 reserved for incident response and unexpected remediation. Total first-year spend: approximately $35,000, well within the $200,000 budget.

*Key risk*: The single security engineer constraint means all migration work must use automated tooling and vendor-managed services rather than manual configuration. Every step above is designed to minimize engineering time through automation.
