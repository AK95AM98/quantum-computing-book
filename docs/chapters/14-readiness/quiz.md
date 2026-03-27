---
title: "Chapter 14 Quiz: Regulatory Landscape and Organizational Readiness"
chapter: 14
quiz_type: formative
questions: 30
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
---

# Chapter 14 Quiz: Regulatory Landscape and Organizational Readiness

This quiz covers regulatory deadlines, organizational readiness frameworks, governance structures, and talent strategy for building the quantum-ready enterprise. Questions span all six levels of Bloom's Taxonomy, from recall of specific deadlines to creation of governance frameworks.

---

## Level 1 — Remember (Questions 1–5)

**1.** What is the CNSA 2.0 compliance deadline for all new National Security System (NSS) acquisitions in the United States?

- A) January 1, 2025
- B) January 1, 2027
- C) December 31, 2030
- D) January 2, 2035

??? success "Answer"
    **B) January 1, 2027.** The NSA's Commercial National Security Algorithm Suite 2.0 requires all new NSS acquisitions to comply with PQC algorithms (ML-KEM, ML-DSA, SLH-DSA) as of this date. This is an acquisition eligibility requirement, not a recommendation.

---

**2.** According to the IBM Quantum Readiness Index (October 2025), what was the average organizational readiness score globally?

- A) 10 out of 100
- B) 25 out of 100
- C) 50 out of 100
- D) 75 out of 100

??? success "Answer"
    **B) 25 out of 100.** The IBM Quantum Readiness Index found an average score of 25/100 across global organizations, with 87% having not yet completed a cryptographic inventory (Gartner 2025).

---

**3.** The EU Digital Operational Resilience Act (DORA) became effective on which date?

- A) November 2024
- B) January 17, 2025
- C) June 2025
- D) January 2026

??? success "Answer"
    **B) January 17, 2025.** DORA entered into force on January 17, 2025, and is binding on EU financial entities and their critical ICT third-party service providers.

---

**4.** According to NIST's transition plan (NIST IR 8547), what happens to RSA and ECC in 2030?

- A) They are disallowed entirely in all NIST-conformant systems
- B) They are deprecated — should no longer be used for new deployments
- C) They are required to coexist with PQC in hybrid deployments
- D) They are formally standardized as legacy algorithms

??? success "Answer"
    **B) They are deprecated.** In 2030, RSA and ECC are deprecated: they should no longer be used for new deployments and should be prioritized for migration. They are not fully *disallowed* until 2035.

---

**5.** How many questions does the QRAMM (Quantum Readiness Assurance Maturity Model) framework contain across its four dimensions?

- A) 40
- B) 80
- C) 120
- D) 200

??? success "Answer"
    **C) 120.** QRAMM comprises 120 questions across 4 dimensions and 12 practices, available open-source at qramm.org.

---

## Level 2 — Understand (Questions 6–10)

**6.** Which of the following best explains why cyber insurance is described as "the most powerful market-driven enforcement mechanism" for PQC adoption?

- A) Cyber insurers are required by law to offer PQC discounts
- B) Insurers price quantum risk in real time, creating immediate financial consequences for organizations without PQC transition plans
- C) Cyber insurance covers quantum computing losses directly
- D) Insurers rely exclusively on NIST standards for policy underwriting

??? success "Answer"
    **B) Insurers price quantum risk in real time, creating immediate financial consequences.** Unlike regulation, which requires legislative and rulemaking cycles, insurance underwriting adjusts continuously. Organizations without documented PQC plans face higher premiums, sublimit provisions, or coverage exclusions today — not in 2027 or 2030.

---

**7.** What distinguishes DORA from other EU financial regulations in the context of quantum computing?

- A) DORA is voluntary for financial institutions below €1B in assets
- B) DORA requires financial institutions to actively monitor cryptographic threats from quantum advances — the only binding financial regulation that explicitly names quantum as a risk
- C) DORA applies only to banks, not insurers or investment firms
- D) DORA requires quantum-safe algorithms to be in production by 2026

??? success "Answer"
    **B) DORA uniquely and explicitly mandates monitoring of quantum cryptographic threats.** Unlike PCI DSS 4.0 or NIS2 (which require "state-of-the-art" cryptography without naming quantum specifically), DORA directly identifies quantum advances as a cryptographic threat that must be tracked.

---

**8.** The UK NCSC three-phase PQC migration timeline establishes three milestones. What is the primary activity that must be completed by the 2028 deadline?

- A) Complete migration of all internet-facing services to PQC
- B) Complete the discovery phase — identify all asymmetric cryptography, assess dependencies, and document migration plans
- C) Decommission all HSMs using RSA key management
- D) Achieve full CNSA 2.0 compliance for government contracts

??? success "Answer"
    **B) Complete the discovery phase.** By 2028, all organizations should have identified every system using asymmetric cryptography, assessed dependencies, and produced documented migration plans. Actual migration of internet-facing services is the 2031 target.

---

**9.** In the QRAMM framework, which dimension addresses vendor PQC assessments and supply chain cryptographic risk?

- A) Governance and Strategy
- B) Technology and Security
- C) Operations and Risk Management
- D) Ecosystem and Supply Chain

??? success "Answer"
    **D) Ecosystem and Supply Chain.** This QRAMM dimension covers vendor assessments, contractual PQC requirements, consortium participation, and third-party dependency mapping.

---

**10.** Why does Chapter 14 recommend that the PQC Migration Lead be an existing cybersecurity professional with supplemental training rather than an external quantum hire?

- A) Quantum expertise is not required for PQC migration — the work requires PKI, TLS, HSM, and certificate lifecycle expertise that already exists in security organizations
- B) Quantum physicists are not permitted to hold compliance roles under CNSA 2.0
- C) External hires cannot obtain the security clearances required for CNSA 2.0 compliance work
- D) The IBM Quantum Readiness Index requires this profile

??? success "Answer"
    **A) PQC migration requires deep cryptographic engineering expertise, not quantum physics.** The skills — PKI, TLS, HSMs, certificate lifecycle management, regulatory compliance — exist in the cybersecurity talent pool. An existing professional needs 3–6 months of supplemental PQC training, not organizational integration time you don't have before the 2027 deadline.

---

## Level 3 — Apply (Questions 11–15)

**11.** A U.S.-based software company derives 30% of its revenue from federal agency contracts and is currently running TLS 1.2 across its SaaS platform. Apply the regulatory framework from Section 14.1 to identify the two most immediate compliance actions this company must take.

??? success "Answer"
    **Two immediate actions:**
    1. **CNSA 2.0 compliance for new NSS acquisitions (deadline: January 1, 2027):** The company must ensure its software products support ML-KEM, ML-DSA, and SLH-DSA before this date, or it will lose eligibility for NSS contracts. This requires CBOM generation and PQC algorithm integration within months.
    2. **TLS 1.3 upgrade (deadline: January 2, 2030):** The company cannot deploy hybrid PQC TLS while running TLS 1.2. TLS 1.3 is a prerequisite for the 2027 requirement. The upgrade should begin immediately to enable both the 2027 and 2030 compliance targets.

---

**12.** An EU-based payment processor falls under both NIS2 and DORA. Using the capability domain framework from Section 14.3, at which maturity level should they target Domain 1 (Cryptographic Visibility) by end of 2025, and what does that level require?

??? success "Answer"
    Given their dual NIS2 and DORA obligations — both of which are binding and effective — this organization should target **Level 3** (complete CBOM covering all systems, maintained as a living document) as their minimum threshold. Level 3 requires: automated discovery scanning across all network segments, CBOM generation in CycloneDX or SPDX format, classification of all discovered assets by algorithm/key length/certificate expiration/risk tier, and a process for keeping the CBOM current as systems change. DORA's requirement to monitor quantum threats cannot be satisfied without knowing where all cryptography lives.

---

**13.** Using Mosca's theorem, assess the migration urgency for the following asset: a government benefits management system holding personally identifiable information for 30 years, with an estimated migration time of 4 years, and a consensus estimate of CRQC arrival within 12 years.

$$L + M > Q \Rightarrow \text{migrate now}$$

??? success "Answer"
    **$L = 30$ years** (data remains sensitive for 30 years), **$M = 4$ years** (migration time), **$Q = 12$ years** (CRQC estimate). Since $L + M = 34 > 12 = Q$, the Mosca condition is satisfied — migration should have begun already. The data will remain sensitive long after a CRQC could decrypt it, and the migration window is narrowing. This system should be in the highest-priority migration tier, and the 4-year estimate needs immediate validation; any slippage further increases the risk exposure.

---

**14.** A $500M revenue healthcare company asks you to design a Quantum Steering Committee. Apply the governance framework from Section 14.4 to specify: who chairs it, who are the standing members, how often it meets, and what budget authority it holds.

??? success "Answer"
    **Structure:**
    - **Chair:** CTO or CIO (healthcare technology infrastructure makes either appropriate; CTO preferred if QC experimentation is in scope)
    - **Standing members:** CISO (owns PQC migration and cryptographic risk), CFO representative (owns budget authorization), General Counsel / Chief Compliance Officer (HIPAA, state PHI regulations, NIS2 if EU operations), Chief Medical Officer or CMO representative (owns highest-risk data categories — patient records), head of IT infrastructure (owns certificate management and HSM platforms)
    - **Cadence:** Quarterly, with the CISO empowered to call emergency sessions for critical regulatory or incident developments
    - **Budget authority:** The Steering Committee should own and approve the annual quantum budget (estimated $1–3M for this revenue tier). Individual decisions below a threshold (e.g., $100K) can be delegated; decisions above require Steering Committee approval. The committee should also own sign-off on external quantum-readiness disclosures and regulatory submissions.

---

**15.** A financial services CTO wants to build quantum literacy across three teams: (1) the security operations team, (2) the quantitative risk modeling team, and (3) the executive leadership team. Apply the talent strategy from Section 14.5 to specify appropriate training resources and target outcomes for each team.

??? success "Answer"
    **Security operations team:** Target outcome — can execute PQC migration without external consultant dependency. Resources: NIST FIPS 203/204/205 documentation, HSM vendor certification programs (Thales, Entrust), QRAMM self-assessment training, CBOM tooling (IBM CBOMkit, Keyfactor). Timeline: 3–6 months of structured PQC training on top of existing PKI/TLS expertise.

    **Quantitative risk modeling team:** Target outcome — can formulate optimization problems as quantum algorithms, run experiments on cloud platforms, and interpret results against classical baselines. Resources: IBM Qiskit certification (free), D-Wave Leap Launchpad (3 months free), Amazon Braket hands-on labs. Timeline: 6 months to achieve cloud literacy and run first pilot. No quantum physics background required; operations research background is an asset.

    **Executive leadership team:** Target outcome — can distinguish quantum opportunity from hype, ask the right vendor questions, and make resource allocation decisions with appropriate risk calibration. Resources: WEF Quantum Economy Blueprint 2024, Deloitte/WEF Quantum Readiness Toolkit, 1-day executive briefing from a qualified quantum advisory firm. Timeline: 1-day workshop followed by quarterly Steering Committee updates.

---

## Level 4 — Analyze (Questions 16–20)

**16.** Compare the NIS2 Directive, DORA, and the proposed EU Quantum Act in terms of binding force, scope, and quantum-specificity. What gap does the proposed Quantum Act address that NIS2 and DORA do not?

??? success "Answer"
    **NIS2** (effective November 2024): Binding on 18-sector essential and important entities. Requires "state-of-the-art" cryptography and crypto-agility; not quantum-specific in original text, but a January 2026 proposed amendment adds explicit PQC references. Scope: broad (energy, transport, health, digital infrastructure, etc.).

    **DORA** (effective January 2025): Binding on EU financial entities and critical ICT providers specifically. Quantum-specific in naming quantum advances as a cryptographic threat requiring active monitoring. Scope: narrow (financial sector only).

    **Proposed EU Quantum Act** (Q2 2026): Addresses the governance gap neither NIS2 nor DORA fills — comprehensive framework for quantum *technology* governance (not just quantum *security*). Covers quantum computing investment, quantum workforce development, quantum technology standards, and governance structures for the entire quantum ecosystem. NIS2 and DORA address the security/risk dimension; the Quantum Act addresses the positive agenda: how the EU develops, governs, and gains competitive advantage from quantum technologies.

---

**17.** Analyze the organizational failure mode in which a company treats PQC migration as a "security project." What specific consequences flow from this misclassification, and what governance structure prevents it?

??? success "Answer"
    **The failure mode:** When PQC migration is classified as a security project, it receives security-team resourcing (typically 5–10% of IT budget), is owned exclusively by the CISO, and is managed through the normal security patch/upgrade cycle. The consequences are predictable:

    - **Budget insufficiency**: Enterprise-wide PQC migration requires infrastructure investment (HSM upgrades, certificate management platforms, application refactoring) that exceeds security-team budgets. Projects stall when they hit systems owned by CIO or individual business units.
    - **Scope blindness**: Security teams can migrate their perimeter (TLS, VPN, PKI) but cannot unilaterally migrate line-of-business applications, OT/ICS, or embedded systems owned by other parts of the organization.
    - **No connection to quantum computing strategy**: The security team does not own quantum computing exploration. Without shared governance, the organization may simultaneously over-invest in QC hype (at the board level) and under-invest in PQC compliance (at the CISO level).
    - **Regulatory exposure**: Missed deadlines in domains owned by teams that were never part of the "security project" create compliance gaps.

    **Prevention:** The Quantum Steering Committee structure in Section 14.4, chaired by CTO or CIO with CISO, CFO, and Legal as standing members, ensures budget authorization crosses functional lines, progress reporting is multi-functional, and both defensive (PQC) and offensive (QC) quantum initiatives are governed coherently.

---

**18.** The chapter describes crypto-agility as more strategically important than selecting the "right" algorithm today. Analyze this claim. Why is architectural agility more valuable than current algorithm choice?

??? success "Answer"
    **The core argument:** The history of cryptographic standards is a history of unexpected failures and transitions. MD5 was considered secure; SHA-1 was considered secure; RSA with 1024-bit keys was considered adequate. In each case, the organizations that had abstracted their cryptographic dependencies adapted quickly; those with hardcoded algorithms faced expensive emergency remediation.

    **Applied to PQC specifically:**
    - NIST is still finalizing additional PQC algorithms (HQC, FN-DSA). The "right" algorithm today may be ML-KEM; the "right" algorithm in 2030 may include additional options.
    - Implementation vulnerabilities in PQC algorithms are being discovered regularly. A crypto-agile architecture can rotate to an updated implementation without application changes; a hardcoded architecture requires redevelopment.
    - Different algorithms perform differently across use cases (ML-KEM for key encapsulation; ML-DSA for signatures; SLH-DSA for long-lived signatures). A crypto-agile system can select the optimal algorithm per context through policy configuration rather than code changes.

    **The strategic point:** The cost of building crypto-agility (architectural abstraction, centralized management) is paid once and enables all future algorithm transitions. The cost of hardcoded algorithms is paid on each transition — and the transitions will continue. Crypto-agility is the infrastructure investment that makes every subsequent algorithm change cheap.

---

**19.** Analyze the differences among the IBM Quantum Readiness Index, QRAMM, and the Deloitte/WEF Toolkit in terms of their primary use case, audience, and output. For which organizational situation is each most appropriate?

??? success "Answer"
    **IBM Quantum Readiness Index:** Primary use: external benchmarking and awareness. Audience: CISOs and technology executives. Output: comparative score (25/100 global average) that positions your organization against peers. Most appropriate for: initial executive conversation to establish urgency, early-stage organizations that need to understand the gap between their current state and industry baseline before committing to a detailed assessment framework.

    **QRAMM:** Primary use: comprehensive self-assessment and maturity roadmap. Audience: technical and security teams conducting operational readiness analysis. Output: maturity score (1–5) across 12 practices, detailed gap analysis, improvement roadmap. Most appropriate for: organizations ready to conduct a serious internal assessment before engaging consultants; organizations that need a defensible, documented baseline for board or regulatory reporting; organizations with sufficient internal security expertise to interpret 120 detailed questions accurately.

    **Deloitte/WEF Toolkit:** Primary use: board-level reporting and executive decision-making. Audience: CXOs, board members, and governance functions. Output: structured workbooks organized around five principles (understand, identify, prioritize, migrate, monitor) that map to enterprise risk management language. Most appropriate for: organizations with active board engagement on cyber risk that need to integrate quantum readiness into existing governance reporting; organizations preparing first board presentation on quantum risk.

---

**20.** Compare the talent profiles needed for PQC migration vs. quantum computing experimentation. Where do these profiles overlap, and where do they diverge? What are the implications for organizational talent planning?

??? success "Answer"
    **PQC migration talent (needed now):** Cryptographic engineers (PKI, TLS, HSMs, certificate lifecycle), security architects (crypto-agility system design), program managers (cross-functional migration coordination). Requires existing cybersecurity expertise plus 3–6 months of PQC-specific training. No quantum physics required.

    **QC experimentation talent (needed 2027+):** Data scientists and operations researchers (problem formulation, classical baseline comparison), software engineers with quantum SDK familiarity (Qiskit, Cirq, PennyLane), quantum algorithm specialists for later phases. Requires quantitative analytical skills plus quantum computing training. Security expertise is not a prerequisite.

    **Overlap:** Senior architects who understand both infrastructure security and system design can bridge the two tracks. Program management expertise is shared. Quantum literacy (understanding the technology landscape, evaluating vendor claims) is relevant to both functions.

    **Divergence:** PQC talent can be built from existing security professionals through targeted training — no new hiring required if the organization has strong PKI/TLS expertise. QC talent requires building new capability in analytical and software teams that may not currently exist.

    **Talent planning implication:** These are two separate talent pipelines on different timelines. In 2026: invest exclusively in PQC capability development (training existing staff). In 2027–2028: begin building QC literacy in analytical teams. In 2029+: assess whether quantum algorithm specialist hiring is justified by experimental results. Do not let the difficulty of QC talent acquisition delay the more urgent and more tractable PQC capability building.

---

## Level 5 — Evaluate (Questions 21–25)

**21.** Evaluate the claim that Australia's end-of-2030 PQC transition deadline is "one of the most aggressive global timelines." Is this claim justified? What would need to be true for an organization to meet it, and what are the risks of this timeline for organizations with legacy infrastructure?

??? success "Answer"
    **The claim is justified.** The 2030 deadline is 4 years from the current date (2026), compressed compared to the U.S. (2031–2035 depending on system type) and EU/UK (2030 for high-risk, 2035 for all systems). For an organization that has not yet completed a CBOM, 2030 requires:

    - Year 1 (2026): Complete cryptographic inventory and risk assessment. Hire/designate PQC Migration Lead.
    - Year 2 (2027): Begin migration of all high-risk systems (internet-facing, PKI, VPN).
    - Year 3 (2028): Complete internet-facing migration; begin legacy system migration.
    - Year 4 (2029): Complete all remaining systems including embedded and OT/ICS.

    **The particular risk for legacy infrastructure:** OT/ICS and embedded systems are notoriously difficult to migrate. Many industrial control systems use proprietary protocols with hardcoded cryptography and vendors who provide infrequent firmware updates. A 4-year total timeline with legacy systems in scope is aggressive even for organizations that begin immediately; for organizations with significant operational technology footprints, meeting the ASD 2030 deadline may require renegotiating with OT vendors or accepting extended hybrid operation in isolated network segments.

    **Evaluation:** The 2030 deadline is appropriate as a compliance posture goal for internet-facing and enterprise systems. For legacy OT/ICS, the ASD may need to provide sector-specific guidance and extensions similar to the UK NCSC three-phase approach, which acknowledges that embedded systems require additional time.

---

**22.** Critically evaluate the QRAMM framework's claim that 120 questions across 4 dimensions provides a complete picture of quantum readiness. What dimensions or capabilities might be underrepresented or absent?

??? success "Answer"
    **What QRAMM covers well:** Governance and strategy, technology and security (cryptographic inventory, PQC implementation), operations and risk management, ecosystem and supply chain. These four dimensions address the PQC migration challenge comprehensively.

    **Potential gaps or underrepresentations:**

    - **Quantum computing opportunity assessment**: QRAMM is primarily a security/compliance framework. It does not provide maturity markers for evaluating quantum computing use cases, managing QC experimentation, or assessing quantum advantage claims — the offensive quantum strategy that Chapter 13 covers.
    - **Quantum sensing**: Entirely absent from QRAMM's scope.
    - **Regulatory jurisdiction complexity**: QRAMM provides a single maturity score across an organization. For multinationals with operations under NIS2, DORA, CNSA 2.0, and ASD simultaneously, a single score may not capture the jurisdiction-specific compliance gaps.
    - **Hardware and embedded system specifics**: The OT/ICS and IoT migration challenge may be underweighted in a framework designed around IT governance structures.

    **Fair assessment:** QRAMM is the most operationally detailed self-assessment framework available for PQC-focused quantum readiness, and its limitations reflect its scope — it was designed for the cryptographic security challenge, not the full quantum technology opportunity. Organizations should use QRAMM for PQC governance and supplement it with separate evaluation frameworks for quantum computing experimentation and sensing opportunities.

---

**23.** The chapter recommends establishing a Quantum Center of Excellence for organizations above $1B in revenue or with significant government exposure. Evaluate the criteria for this threshold. Are there situations where a smaller organization would benefit from a QCoE, or a larger organization would not?

??? success "Answer"
    **The $1B revenue threshold is a reasonable proxy but not a universal rule.**

    **Smaller organizations that might benefit from a QCoE:**
    - Defense contractors below $1B revenue with 80%+ of revenue from NSS contracts: their regulatory exposure is high regardless of revenue size.
    - Healthcare organizations with significant PHI archives (40+ year retention) and complex multi-vendor supply chains: migration complexity may warrant the coordination structure a QCoE provides.
    - Financial institutions in highly regulated jurisdictions (EU DORA, PCI DSS) with legacy infrastructure: the compliance management burden may require a dedicated function even at $500M revenue.

    **Larger organizations that might not need a formal QCoE initially:**
    - Organizations above $1B revenue with minimal regulatory exposure (e.g., domestic retail with no government contracts and no EU operations): their quantum risk may be low enough that a Steering Committee with clear ownership is sufficient.
    - Organizations that have already completed their CBOM and begun migration through existing security team capacity: the organizational investment in a QCoE may not provide marginal value at this stage.

    **The real criteria:** The appropriate threshold is not revenue but the intersection of (1) regulatory complexity (multiple jurisdictions or NSS exposure), (2) system complexity (significant OT/ICS or embedded systems), and (3) QC experimentation investment (>$500K annually). When all three are present, a QCoE's coordination value justifies its cost. Revenue is a useful proxy for this intersection, not the underlying principle.

---

**24.** Evaluate the balance the chapter strikes between PQC compliance urgency and quantum computing opportunity. Does the advisory tone adequately capture both? What risks exist in over-emphasizing one relative to the other?

??? success "Answer"
    **The chapter's balance:** The chapter positions PQC migration as the urgent near-term imperative and quantum computing as the strategic medium-term opportunity, explicitly flagging the two failure modes of treating them as unrelated. This is an accurate representation of the current risk/opportunity landscape.

    **Risk of over-emphasizing PQC compliance at the expense of QC opportunity:**
    - Organizations may complete their PQC migration and conclude their "quantum work" is done, missing the window to build QC experimentation capability.
    - The 2027–2028 talent and platform competition for QC capability will intensify as hardware milestones are achieved; organizations that delay QC literacy-building will face a steeper ramp.
    - Competitors who begin QC experimentation in 2026–2027 will have 2–3 years of institutional learning before organizations that wait for "proof" of advantage.

    **Risk of over-emphasizing QC opportunity at the expense of PQC compliance:**
    - Regulatory exposure is real and immediate; missing the January 2027 CNSA 2.0 deadline has concrete contract eligibility consequences.
    - HNDL attacks are occurring today; every day without a completed CBOM is a day of increased exposure to retrospective decryption.
    - QC opportunity may not materialize on vendor timelines; PQC compliance deadlines are fixed.

    **Fair evaluation:** The chapter's framing — "60–70% of quantum budget to PQC, 15–20% to QC experimentation" — correctly reflects the current risk/opportunity balance. Neither dismissing QC as hype nor treating it as equivalent urgency to PQC compliance is accurate. The chapter's advisory stance appropriately captures this gradient.

---

**25.** The chapter notes that OMB Memorandum M-23-02 requires annual cryptographic inventory submissions through 2035 from federal agencies. Evaluate the likely downstream effect of this requirement on private-sector technology vendors over the 2026–2030 period.

??? success "Answer"
    **The downstream mechanism:** Federal agencies subject to OMB M-23-02 must annually report their cryptographic inventory and migration progress. This requires agencies to know not just their own cryptographic posture but the cryptographic posture of their vendors (supply chain risk). As agencies build CBOMs, they will need vendor-provided cryptographic information; this creates contractual and procurement pressure.

    **Predicted private-sector effects over 2026–2030:**

    - **2026–2027:** Contracting officers begin including cryptographic disclosure requirements in new contracts. Vendors that have not conducted their own CBOM cannot comply with disclosure requests and lose competitive advantage in federal procurements.
    - **2027–2028:** CNSA 2.0 compliance becomes a binary requirement for new NSS contracts. Vendors without PQC-capable products are excluded from the federal market segment entirely.
    - **2028–2030:** Federal agencies under OMB M-23-02 reporting pressure will request annual updates from vendors on migration progress. This transforms the cryptographic inventory requirement from a one-time event to a recurring audit activity, creating ongoing compliance infrastructure investment among federal technology suppliers.

    **Second-order effects:** Vendors who build the CBOM and migration infrastructure to satisfy federal requirements gain a compliance capability they can market to enterprise customers facing NIS2, DORA, and insurance requirements. Federal compliance pressure, while technically applicable only to agencies, creates market differentiation for PQC-capable vendors across all sectors.

---

## Level 6 — Create (Questions 26–30)

**26.** Design a 12-month quantum readiness program for a mid-size ($750M revenue) U.S.-based defense contractor. Include: governance structure, budget allocation, key milestones, regulatory compliance targets, and talent plan. Justify your choices.

??? success "Answer"
    **Program Design: Defense Contractor Quantum Readiness (12 months)**

    **Governance structure:**
    - Designate PQC Migration Lead (VP level, reports to CISO) by Day 30. Given defense contractor profile, this individual must have security clearance and deep familiarity with DoD acquisition regulations.
    - Establish Quantum Steering Committee (CTO chair, CISO, CFO rep, Contracts/Legal) by Day 45 with monthly cadence (more frequent than standard given the 2027 deadline).
    - Consider a lean QCoE with 3–4 staff given government exposure justification.

    **Budget ($1.5M total, 12 months):**
    - PQC migration: $1.1M (73%) — HSM evaluation and pilot upgrade, cryptographic discovery tooling (IBM Quantum Safe Explorer or equivalent), CBOM generation, TLS migration pilot on 5 internet-facing services, consultant support for CNSA 2.0 compliance documentation.
    - QC exploration: $225K (15%) — Amazon Braket accounts, D-Wave Launchpad, Qiskit training for 5 data scientists/engineers.
    - Strategic monitoring: $175K (12%) — Regulatory monitoring service, QED-C membership, quarterly hardware milestone briefings.

    **Key milestones against regulatory targets:**
    - Month 3: CBOM complete for all internet-facing and government-contract systems. (Prerequisite for CNSA 2.0 compliance documentation.)
    - Month 6: Hybrid ML-KEM TLS pilot deployed on 3 highest-risk government-facing services. CNSA 2.0 compliance plan submitted to Steering Committee.
    - Month 9: HSM upgrade decision made; procurement underway for Thales Luna v7.9+ or Entrust nShield PQC. PQC requirements included in all new vendor contracts.
    - Month 12: CNSA 2.0 compliance audit-ready documentation complete. Hybrid TLS deployed across all internet-facing government systems. QC training complete for technical staff. Annual OMB M-23-02 input prepared.

    **Talent plan:**
    - Month 1: Designate existing senior PKI engineer as PQC Migration Lead; enroll in NIST FIPS 203/204/205 curriculum.
    - Month 2: Identify 5 data scientists/engineers for Qiskit training. Enroll in IBM Qiskit certification program.
    - Month 6: Assess whether QC Exploration Lead needs to be formalized as a part-time dedicated role.
    - Month 12: Determine if QCoE staffing is warranted based on 12-month budget execution and QC pipeline.

---

**27.** Create a quantum risk register entry for an international bank's SWIFT messaging infrastructure, including: risk description, likelihood/impact scores, Mosca analysis, mitigation status indicators, and recommended actions for the next two quarters.

??? success "Answer"
    **Quantum Risk Register Entry — SWIFT Messaging Infrastructure**

    | Field | Content |
    |-------|---------|
    | **Risk ID** | QR-001 |
    | **Asset** | SWIFT messaging infrastructure (PKI authentication, message encryption, non-repudiation signing) |
    | **Risk Category** | Cryptographic Risk / Compliance Risk |
    | **Risk Description** | SWIFT messaging relies on RSA/ECC for authentication and message integrity. HNDL attacks targeting financial messaging are likely occurring; future CRQC could retrospectively decrypt intercepted SWIFT messages. Non-compliance with SWIFT's PQC roadmap creates correspondent bank relationship risk. |
    | **Likelihood** | HIGH — HNDL campaigns targeting financial infrastructure confirmed by multiple intelligence agencies; SWIFT CSP (Customer Security Programme) is beginning to incorporate PQC requirements. |
    | **Impact** | CRITICAL — SWIFT compromise enables fraudulent transfers and correspondent banking relationship termination. |
    | **Risk Score** | 25/25 |
    | **Mosca Analysis** | $L = 10$ years (financial transaction records required for decade-long fraud investigation), $M = 2$ years (SWIFT PQC migration with vendor support), $Q = 10$ years (CRQC probability). $L + M = 12 > 10 = Q$. Migration threshold already crossed. |
    | **Mitigation Status** | RED — No CBOM completed for SWIFT infrastructure. PQC Migration Lead not yet designated. SWIFT CSP PQC requirements not yet reviewed. |
    | **Next Review** | Q2 2026 |

    **Recommended actions — Q2 2026:**
    1. Add SWIFT infrastructure to CBOM scope immediately (30 days).
    2. Contact SWIFT CSP program manager to understand PQC roadmap and timeline requirements.
    3. Engage correspondent banking relationships to understand their PQC migration timelines (supply chain risk).

    **Recommended actions — Q3 2026:**
    1. Begin hybrid PQC pilot for SWIFT authentication layer in test environment.
    2. Evaluate whether SWIFT Alliance infrastructure upgrades are required (HSM compatibility check).
    3. Report mitigation progress to Steering Committee and Board Risk Committee.

---

**28.** Construct a board-level one-page quantum risk reporting template that a CISO could use for an annual report to the board of directors. Include all five required sections from Section 15.4, with illustrative content for a hypothetical organization.

??? success "Answer"
    **Annual Quantum Risk Report to the Board of Directors**
    *[Company Name] | Fiscal Year 2026 | Prepared by: CISO*

    ---

    **1. PQC Migration Progress**

    | Metric | Status | Target |
    |--------|--------|--------|
    | Internet-facing systems with PQC | 35% | 100% by Dec 2027 |
    | CBOM completeness | 78% | 100% by Q3 2026 |
    | VPN infrastructure migrated | 20% | 100% by Dec 2027 |
    | HSMs upgraded to PQC-capable | 40% | 100% by Q2 2027 |

    **2. Regulatory Compliance Status**

    | Deadline | Requirement | Status |
    |----------|-------------|--------|
    | Jan 2027 | CNSA 2.0 (NSS contracts) | YELLOW — plan in place, execution 35% complete |
    | Jan 2025 (past) | DORA monitoring process | GREEN — documented and operational |
    | End 2028 | UK NCSC discovery phase | GREEN — CBOM 78% complete |
    | Jan 2030 | TLS 1.3 mandatory | GREEN — already deployed |

    **3. Quantum Hardware Milestone Status**

    No CRQC milestone has been achieved. IBM Kookaburra (2025, 1,386 qubits) deployed; IBM Starling fault-tolerant system targeted 2029. Consensus CRQC estimate: 8–12 years. No change to migration urgency assessment from prior year.

    **4. Quantum Computing Investment Summary**

    FY2026 QC spend: $180K. Experiments: 3 optimization pilots (D-Wave Leap). Results: 12% improvement in logistics routing optimization (pilot stage, not production-ready). No production deployments. Recommendation: continue exploratory investment at current level in FY2027.

    **5. Key Decisions Required — FY2027**

    1. **Budget approval**: PQC migration requires $2.1M in FY2027 (HSM replacement, TLS migration completion). CISO requests board approval.
    2. **Vendor selection**: RFP for enterprise certificate management platform closes Q1 2027. Board approval not required; notification provided for transparency.
    3. **QCoE consideration**: With revenue exceeding $1.2B, Board should consider whether a Quantum Center of Excellence is warranted in FY2027 planning.

---

**29.** Design a crypto-agility test exercise — an organizational drill that validates Domain 3 maturity by deliberately rotating a cryptographic algorithm across a defined system scope. Include: scope definition, success criteria, failure modes to test, and lessons-learned structure.

??? success "Answer"
    **Crypto-Agility Exercise: Algorithm Rotation Drill**

    **Objective:** Validate that the organization can rotate a cryptographic algorithm across a defined system scope within a controlled timeframe, without application code changes, using only centralized configuration.

    **Scope (Year 1 — non-production):**
    - Target environment: staging/QA copy of the customer-facing web application (TLS termination, internal API authentication)
    - Algorithm rotation: change TLS cipher suite preference from current hybrid (X25519MLKEM768) to a secondary hybrid (P-256 + ML-KEM-512)
    - Duration: complete within 4 hours of exercise start

    **Success criteria:**
    1. Algorithm rotation is completed without any application code changes (configuration-only change)
    2. All automated tests pass against the rotated environment within 2 hours of rotation completion
    3. Certificate chain validation succeeds across all client types (browser, mobile, API clients)
    4. Rollback to original configuration completed within 30 minutes of rollback initiation
    5. Exercise completed without involving application development teams

    **Failure modes to deliberately test:**
    - Hardcoded algorithm references in application configuration files (Domain 3, Level 1 symptom)
    - Certificate pinning in mobile clients that breaks when algorithm changes
    - Monitoring systems that alert on "unexpected algorithm" and create false-positive incident response
    - Dependencies on specific cipher suites in third-party integration points not included in scope definition

    **Exercise structure:**
    - Pre-exercise (2 weeks prior): Document scope, identify all system dependencies, brief all participating teams, confirm rollback procedure is documented and tested
    - Day of exercise: 4-hour window, live observation by PQC Migration Lead and security architect
    - Post-exercise (48 hours): Complete lessons-learned document; classify all failure modes as (a) already known, (b) discovered by exercise, or (c) systemic gaps requiring architectural change

    **Lessons-learned structure:**
    - What worked: which components rotated cleanly through centralized configuration?
    - What failed: which components required manual intervention or code changes?
    - Systemic gaps: which failures indicate architectural debt in the crypto-agility design?
    - Year 2 exercise scope: expand to production environment based on Year 1 gap remediation

---

**30.** You have been asked by the CEO to write a 500-word memo recommending whether your organization ($2B revenue, 40% federal government revenue, operations in EU and UK) should establish a Quantum Center of Excellence in 2026. Using the criteria from Chapter 14 and your synthesis of all six capability domains, construct the recommendation memo.

??? success "Answer"
    **MEMORANDUM**

    **To:** Chief Executive Officer
    **From:** Chief Technology Officer
    **Subject:** Recommendation — Establishment of Quantum Center of Excellence (2026)
    **Date:** [Current Date]

    ---

    **Recommendation:** Establish a Quantum Center of Excellence by Q3 2026 with an initial team of 5 and a first-year budget of $3.2M.

    **Rationale:**

    Our organization meets every threshold criterion for a QCoE. Revenue exceeds $1B. Federal government revenue (40% of total, or approximately $800M) means the January 2027 CNSA 2.0 deadline applies directly to our product eligibility for NSS contracts — this is not a strategic risk, it is a contractual survival question. EU and UK operations bring DORA, NIS2, and NCSC obligations simultaneously. No steering committee structure can manage this regulatory complexity without a dedicated coordination function.

    Against the six capability domains, our current state is:

    - Cryptographic Visibility: Level 1 (no systematic CBOM completed)
    - Risk Assessment: Level 1 (no Mosca analysis conducted)
    - Crypto-Agility Architecture: Level 2 (shared libraries; no centralized management)
    - Migration Execution: Level 1 (no hybrid TLS deployed)
    - QC Literacy: Level 1 (no cloud accounts, no trained staff)
    - Vendor/Ecosystem Management: Level 1 (no PQC requirements in contracts)

    A distributed ownership model — CISO owns PQC, CTO owns QC exploration, no shared governance — has already produced the Level 1/2 profile above despite 3 years of quantum awareness. A QCoE changes the organizational equation.

    **Proposed QCoE structure:**

    - Director, Quantum Readiness (PQC Migration Lead function): VP-level, reports to CISO. Immediate hire/designation.
    - Senior Cryptographic Engineer (2): Build and manage CBOM, drive technical migration.
    - Quantum Computing Program Lead: Senior architect, dual-reports to CTO and QCoE Director.
    - Program Manager: Cross-functional migration coordination.

    **Year 1 priorities:**

    1. Complete CBOM for all internet-facing and federal-contract systems (Month 6 target).
    2. Deploy hybrid ML-KEM TLS on all federal-facing services (Month 9 target, required for CNSA 2.0 audit readiness).
    3. Establish QC cloud accounts and train 5 data scientists (Month 6 target).
    4. Include PQC requirements in all contract renewals (Month 3 target).

    **Budget:** $3.2M in Year 1. Breakdown: $2.2M PQC migration (HSMs, tooling, migration execution), $640K QC exploration, $360K strategic monitoring and regulatory intelligence. This represents 0.16% of revenue — a risk management investment, not a speculative technology bet.

    **The case against a QCoE** — and why it fails: The argument for managing quantum readiness through existing structures collapses against a single fact: we have had 3 years of awareness and achieved Level 1 readiness across all six capability domains. CNSA 2.0 compliance is 13 months away. The cost of the QCoE is small; the cost of losing federal contract eligibility in January 2027 is not.

    I recommend board approval of this investment at the next board meeting.
