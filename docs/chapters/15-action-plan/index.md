---
title: "Chapter 15: The CXO Action Plan — Phased Roadmap, Budget, and the Path Forward"
chapter: 15
concepts: 20
prerequisites:
  - "Chapter 14: Regulatory Landscape and Organizational Readiness"
  - "Chapter 13: Quantum Computing Use Cases"
  - "Chapter 12: The Post-Quantum Cryptography Imperative"
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
---

# Chapter 15: The CXO Action Plan — Phased Roadmap, Budget, and the Path Forward

Every strategic technology transition eventually arrives at the same question: what exactly do we do, in what order, and with what resources? This chapter answers that question for quantum technology across three time horizons, three technology tracks, and organizations ranging from $50M in revenue to global enterprises. It is the capstone of this textbook — the synthesis of everything that precedes it into concrete, time-bound action.

The field has crossed a qualitative threshold. Quantum error correction works in practice. Post-quantum cryptography standards exist and are ratified. Quantum sensing delivers commercial value today. The remaining question for technology and business leaders is not whether quantum technology is real. It is whether your organization will be positioned to respond when the risk crystallizes and capture value when the opportunity matures.

This chapter provides the roadmap, the budget framework, the vendor selection criteria, the risk register structure, and the honest market outlook that CXOs need to act with confidence. The analysis is structured around a three-phase roadmap (Foundation 2026, Acceleration 2027–2028, Production Readiness 2029+), a budget model calibrated to organizational size, vendor selection principles for each technology track, a quantum risk register methodology integrated into enterprise risk management, and a market outlook grounded in consensus projections rather than promotional materials.

The chapter closes with three central insights — not recommendations, but structural observations about how quantum technology is unfolding — and five specific, time-bound action items for the next 12 months.

---

## 15.1 The Three-Phase Roadmap

The quantum technology landscape does not progress uniformly. Post-quantum cryptography migration is urgent now; quantum computing advantage is emerging selectively; quantum sensing is commercially available today in specific applications. A competent enterprise quantum strategy reflects this uneven progression rather than treating all quantum technology as a single investment horizon.

The three-phase roadmap below is structured around three parallel tracks: PQC migration, quantum computing experimentation, and quantum sensing evaluation. Each phase has distinct priorities per track, and the overall portfolio reflects the risk/opportunity gradient established in Chapters 12–14.

### Phase 1: Foundation (Q2–Q4 2026)

Phase 1 is about establishing the organizational and technical foundations without which no subsequent activity is coherent. It is not about demonstrating quantum advantage or achieving full compliance. It is about knowing what you have, naming who owns it, and beginning the work that matters most.

**PQC Track:**

*Appoint PQC Migration Lead (target: within 30 days of reading this chapter).* This is the highest-leverage action in Phase 1. As established in Chapter 14, this should be an existing VP or Director-level security professional with supplemental PQC training, not an external quantum hire. The DoD required this designation within 20 days for every Pentagon component. You have 30. The migration cannot proceed without a named owner.

*Launch cryptographic inventory.* Select a discovery platform — IBM Quantum Safe Explorer, Keyfactor, or Sectigo Certificate Manager — and begin generating your Cryptography Bill of Materials (CBOM) for all internet-facing systems. Target: complete CBOM for internet-facing systems within 6 months. This is the prerequisite for every regulatory deadline you face.

*Conduct executive briefing.* The full C-suite — not just CISO and CTO — should receive a 90-minute briefing on quantum risk, regulatory timelines, and business impact before any material investment decisions are made. The goal is shared understanding, not alarm. Leaders who understand Mosca's theorem make better budget decisions than leaders who have heard "quantum is coming."

*Begin pilot deployment of hybrid TLS.* Select 2–3 internet-facing services with low operational complexity and deploy ML-KEM hybrid TLS in parallel with existing RSA/ECC. This is not a migration — it is a proof-of-capability. The operational intelligence from this pilot informs your migration architecture, vendor selection, and timeline estimation.

*Evaluate HSM upgrade requirements.* HSMs (Hardware Security Modules) are the physical infrastructure of enterprise cryptography. If your current HSMs do not support FIPS 140-3 Level 3 with PQC algorithm capability, you cannot complete a compliant migration without replacing them. Evaluate Thales Luna Network HSM 7 (v7.9+) or Entrust nShield Connect PQC — both are FIPS 140-3 validated with ML-KEM and ML-DSA support. HSM procurement cycles are long; begin now.

*Establish Quantum Steering Committee.* Quarterly cadence, chaired by CTO or CIO, with CISO, CFO representative, Legal/Compliance, and relevant business unit leads as standing members. First meeting agenda: review CBOM progress, approve Phase 1 budget, establish decision rights framework.

**Quantum Computing Track:**

*Allocate exploratory budget.* Range: $100K–$500K annually depending on organizational size and ambition. This is not a production investment — it is an option premium on the quantum computing opportunity. The cost of not building this capability in 2026–2027 is being 2–3 years behind when fault-tolerant systems arrive.

*Identify 2–3 candidate business problems.* Quantum computing advantage is problem-specific, not general. Before accessing any platform, identify 2–3 concrete business problems that meet the quantum candidate criteria from Chapter 13: combinatorial optimization with large variable counts, molecular simulation, or sampling from complex distributions. Assign a business owner to each problem — not just a technical owner.

*Assign Quantum Computing Exploration Lead.* Dual-hatted with existing responsibilities is acceptable in Phase 1. Senior architect or principal engineer, reports to CTO. Responsible for cloud platform relationships, use case evaluation, and quarterly Steering Committee reporting.

*Enroll technical staff in quantum training.* Target: 5–10 technical staff complete IBM Qiskit certification or equivalent training by end of 2026. The IBM Qiskit Developer certification is free, high-quality, and the most widely recognized entry-level quantum computing credential. PennyLane's free courses are particularly strong for teams with machine learning or data science backgrounds.

*D-Wave Leap Launchpad.* D-Wave's free 3-month Launchpad program provides full access to D-Wave Advantage quantum annealing and hybrid solver infrastructure at no cost. This is the right entry point for any organization with optimization problems — logistics routing, portfolio optimization, scheduling, resource allocation. Register immediately; the Launchpad is available for organizations with no prior D-Wave relationship.

**Quantum Sensing Track:**

Phase 1 for sensing is assessment, not investment. Quantum sensing is commercially available today in specific verticals — navigation, precision timing, subsurface mapping, semiconductor inspection — but is genuinely irrelevant to businesses outside those domains.

*Assess applicability.* Does your business involve any of the following: GPS-denied navigation (maritime, mining, autonomous vehicles), precision timing for financial transactions or network synchronization, subsurface geological mapping (oil and gas, mining), or semiconductor manufacturing quality control? If yes, engage Q-CTRL, SandboxAQ, or Infleqtion for a proof-of-concept evaluation in Phase 1. If no, monitor but do not invest.

**Phase 1 Budget Guidance:**

$$\text{PQC: 60–70\%} \quad \text{QC exploration: 15–20\%} \quad \text{Sensing: 5–10\%} \quad \text{Monitoring: 5–10\%}$$

Total Phase 1 investment: $500K–$5M/year depending on organizational size and regulatory exposure. Refer to Section 15.2 for detailed sizing by revenue tier.

!!! tip "Business Implication"
    Phase 1 actions are largely independent of whether quantum computing ever delivers commercial value. The CBOM, PQC Migration Lead, Steering Committee, and HSM evaluation are required by regulatory deadlines that exist today. The QC exploration track and sensing assessment are structured to create option value at low cost ($100K–$500K). Phase 1 is not a bet on quantum technology — it is organizational preparedness for a regulatory environment that is already in motion.

### Phase 2: Acceleration (2027–2028)

Phase 2 completes the foundational PQC migration for all internet-facing systems, moves quantum computing from exploration to targeted problem-solving, and (for applicable industries) advances quantum sensing from POC to pilot.

**PQC Track:**

*Complete PQC migration for all internet-facing TLS endpoints.* ML-KEM hybrid deployment initiated in Phase 1 expands to complete coverage of all internet-facing services. By the end of 2027, no internet-facing service should be presenting exclusively classical asymmetric cryptography.

*Migrate VPN infrastructure.* Enterprise and remote access VPN tunnels — the second-highest-volume asymmetric cryptography use after TLS — migrate to PQC-protected configurations. All major VPN vendors (Cisco, Palo Alto, Fortinet, Juniper) have PQC-capable releases; validate version requirements and upgrade.

*Deploy ML-DSA for code signing and internal CAs.* Code signing is a frequently overlooked asymmetric cryptography use case; a forged code signature using a future CRQC could enable supply chain attacks even after network communications are secured. Internal certificate authorities should migrate to ML-DSA issuance for all new certificates while maintaining cross-signed hybrid chains for compatibility.

*Upgrade all HSMs to PQC-capable models.* HSM procurement initiated in Phase 1 should complete deployment by mid-2027. No new HSM purchases should be made without FIPS 140-3 PQC capability.

*Include PQC compliance requirements in all vendor and supplier contracts.* Every new contract and material renewal should include explicit PQC migration requirements with documented timeline commitments from the vendor. This is the primary mechanism for closing Domain 6 (Vendor/Ecosystem Management) gaps identified in the CBOM.

*Achieve CNSA 2.0 compliance for all government-facing systems (January 2027 deadline).* This is not a Phase 2 target — it is the transition condition from Phase 1 to Phase 2. Government-facing systems must be CNSA 2.0 compliant before the January 2027 deadline. Phase 2 extends this compliance to all remaining internet-facing systems.

*Submit cryptographic inventory reports per OMB M-23-02.* For organizations with federal agency relationships, annual submissions under OMB M-23-02 document migration progress. These submissions should reflect Phase 1 CBOM completeness and Phase 2 migration execution.

*First crypto-agility exercise.* In Phase 2, execute a deliberate algorithm rotation in a non-production environment to validate Domain 3 maturity. The goal is not to rotate to a better algorithm; it is to prove that your architecture can rotate at all. Document all failure modes — hardcoded dependencies, certificate pinning, monitoring false-positives — as inputs to Phase 3 architecture improvements.

**Quantum Computing Track:**

*Expand from exploration to targeted problem-solving.* The Phase 1 exploration generated candidate problems and trained technical staff. Phase 2 runs these problems as structured pilots with defined KPIs and classical baselines. A pilot without a classical baseline is not a quantum experiment; it is a demonstration.

*Run optimization pilots on real business data.* D-Wave Leap hybrid solvers or QAOA implementations on gate-based hardware should be applied to real business problems: actual logistics routes, actual portfolio positions, actual scheduling constraints. Use production-scale data even in pilot mode; small-scale tests frequently fail to reveal scaling challenges.

*Evaluate molecular simulation relevance.* If your organization operates in pharmaceuticals, chemicals, materials science, or advanced manufacturing, Phase 2 is the time to evaluate whether IBM Quantum's progress toward chemistry advantage (anticipated 2026–2027 per the Nighthawk roadmap) is relevant to your specific molecular modeling workloads.

*Monitor IBM Quantum hardware progress.* IBM's Kookaburra processor (2025) and progression toward Starling (fault-tolerant, targeted 2029) represent the clearest public roadmap in gate-based quantum computing. Track quarterly announcement against roadmap commitments; hardware milestone achievement is a signal to accelerate QC investment.

*Consider consortium membership.* The Quantum Economic Development Consortium (QED-C), IBM Quantum Network, and similar consortia provide market intelligence, early access to platform capabilities, and peer benchmarking that is not available through commercial platform access alone. For organizations spending >$300K annually on QC, consortium membership typically provides more value than its cost.

*Assess NVIDIA CUDA-Q integration.* If your organization has already invested in NVIDIA AI/HPC infrastructure, CUDA-Q provides the most natural path to quantum computing experimentation. CUDA-Q's NVQLink protocol achieves sub-4μs latency and 400 Gb/s throughput between Grace Blackwell GPUs and quantum processors — enabling hybrid quantum-classical workflows that leverage existing GPU infrastructure. CUDA-Q has been adopted at Jülich, RIKEN, and the UK's NQCC, providing academic validation of the approach. Organizations without existing NVIDIA HPC infrastructure should not acquire it solely for quantum purposes.

**Quantum Sensing Track:**

For applicable industries, Phase 2 advances from proof-of-concept to pilot deployment. The primary decision criteria: did the Phase 1 POC demonstrate measurable performance advantage over classical alternatives in a realistic operational context? If yes, expand scope. If no, return to monitoring mode.

*Evaluate quantum timing sources.* For financial institutions, high-frequency trading infrastructure, and network operators, quantum-enhanced timing sources (atomic clocks, quantum optical clocks) are commercially available from companies including AOSense, Microsemi, and Oscilloquartz. The precision timing use case has the clearest near-term ROI for financial infrastructure.

!!! warning "Common Misconception"
    Phase 2 quantum computing investment is frequently conflated with a commitment to quantum production deployment. It is not. The purpose of Phase 2 QC investment is to develop the institutional capability — trained staff, experimental infrastructure, problem formulations, classical baselines — that positions your organization to move quickly when fault-tolerant computing becomes available. Phase 2 does not generate quantum ROI; it generates quantum readiness.

### Phase 3: Production Readiness (2029+)

Phase 3 addresses the systems that Phase 2 cannot reach — legacy applications, embedded systems, OT/ICS, IoT — and assesses quantum computing for production deployment as fault-tolerant hardware matures.

**PQC Track:**

*Complete migration for ALL remaining systems.* Legacy applications, operational technology (OT), industrial control systems (ICS), embedded systems, and IoT devices. These are the hardest migrations: they frequently involve proprietary protocols, infrequent vendor update cycles, and operational constraints that prevent standard migration approaches. The 2028–2029 window should be used to negotiate OT/ICS migration timelines with vendors and begin any required hardware replacement cycles.

*Achieve full CNSA 2.0 Phase 2 compliance (December 2031 deadline preparation).* The December 31, 2031 deadline requires all NSS systems — not just new acquisitions — to achieve full CNSA 2.0 compliance. Phase 3 drives the enterprise toward this target while maintaining parallel compliance documentation.

*Validate crypto-agility at production scale.* The Phase 2 crypto-agility exercise validated the capability in non-production. Phase 3 executes a controlled algorithm swap across production systems — a different operational risk profile requiring change management, customer communication, and real-time rollback capability. This is the maturity marker for Domain 3, Level 4.

*Begin planning for pure PQC.* Hybrid PQC (classical + post-quantum algorithms in tandem) provides compatibility and operational continuity during the transition. By 2035, NSS systems must run pure PQC — no classical asymmetric cryptography. Phase 3 identifies all systems that will require pure PQC by 2035 and sequences their transition planning.

*Reassess quantum risk posture against hardware milestones.* If IBM Starling (targeted 2029) achieves its fault-tolerance specifications, the CRQC timeline estimates underlying your Mosca analysis require immediate update. Phase 3 includes quarterly hardware milestone reviews tied directly to the quantum risk register.

**Quantum Computing Track:**

*Assess quantum computing for production deployment.* By 2029, fault-tolerant quantum systems from IBM (Starling), Quantinuum, and potentially others will be available in some form. The question is not whether they exist but whether they solve your specific problem faster, more cheaply, or more accurately than the best available classical solution. This assessment requires the experimental foundation built in Phases 1 and 2 — organizations that skipped experimentation will not be able to make this assessment credibly.

*If quantum advantage has been demonstrated in your domain:* Transition from experimentation to production integration. This requires dedicated quantum algorithm engineering staff, formal QA processes for quantum outputs, and integration with production data pipelines. Phase 3 is where quantum computing transitions from innovation budget to operations budget — for the organizations where advantage has been demonstrated.

*Reassess workforce needs.* If production quantum deployment is imminent, hire dedicated quantum algorithm engineers (1–3 FTEs). These are the scarce specialists for whom the talent gap is most severe; begin recruitment 12–18 months before anticipated deployment.

**Quantum Sensing Track:**

*Integrate quantum sensing into operational infrastructure where pilots demonstrated ROI.* Phase 3 is production integration for sensing. Quantum magnetometers, gravimeters, and atomic clocks that demonstrated performance advantage in Phase 2 pilots are integrated into operational workflows: navigation systems, timing infrastructure, subsurface mapping pipelines, inspection systems.

**Continuous Validation (Ongoing, All Phases):**

The quantum technology landscape does not hold still. Continuous validation activities run in parallel with all three phases:

- Monitor NIST standards evolution: FN-DSA and HQC are under active NIST evaluation; approve-or-reject decisions will require CBOM and migration plan updates.
- Track quantum hardware milestones quarterly: IBM, Quantinuum, IonQ, PsiQuantum roadmap developments signal when production quantum computing investment decisions must be made.
- Update Mosca's theorem analysis quarterly with revised CRQC timeline estimates from credible sources (NIST, NSA, IARPA, academic consensus).
- Annual crypto-agility exercises across progressively larger system scopes.
- Maintain and update CBOM continuously as systems change, new vendors are onboarded, and cryptographic deployments are added.
- Annual board reporting on quantum risk posture and migration progress (template provided in Section 15.4).

---

## 15.2 Budget Allocation Framework

Budget allocation for quantum readiness is calibrated by organizational size, regulatory exposure, and technology relevance. The framework below provides both percentage models (for portfolio allocation decisions) and absolute dollar ranges (for budget requests).

### Percentage Allocation Model

The following allocation applies across organizational sizes, with adjustments noted below:

| Category | % of Budget | Rationale |
|----------|------------|-----------|
| PQC migration | 60–70% | Regulatory urgency; immediate and measurable risk reduction; compliance deadlines starting 2027 |
| QC experimentation | 15–20% | Strategic option value; capability building for 2029–2031 advantage window |
| Quantum sensing | 5–10% | Near-term ROI for applicable industries; zero allocation for non-applicable sectors |
| Strategic monitoring | 5–10% | Regulatory intelligence, hardware milestone tracking, competitive intelligence |

### Dollar Range by Organizational Size

| Category | % of Budget | $500K total | $2M total | $5M total |
|---------|------------|------------|----------|----------|
| PQC migration | 60–70% | $300–350K | $1.2–1.4M | $3–3.5M |
| QC experimentation | 15–20% | $75–100K | $300–400K | $750K–1M |
| Quantum sensing | 5–10% | $25–50K | $100–200K | $250–500K |
| Strategic monitoring | 5–10% | $25–50K | $100–200K | $250–500K |

### Organization Sizing Guidance

**Less than $100M revenue:** $500K–$1M total quantum investment. Focus exclusively on PQC compliance track in Phase 1. QC exploration is optional; delay until Phase 2 unless specific use case clarity exists. Quantum sensing: evaluate only if directly relevant to core operations.

**$100M–$1B revenue:** $1–3M total. Full PQC track with designated Migration Lead. Limited QC exploration ($150–300K) focused on 1–2 candidate problems. Sensing: evaluate if applicable.

**$1B–$10B revenue:** $3–10M total. Full three-track program. Dedicated QC Exploration Lead (dual-hatted). Quantum Center of Excellence warranted if government exposure or multi-jurisdiction regulatory complexity is significant. Sensing: formal pilot investment if applicable.

**Greater than $10B revenue or defense contractor:** $10M+ total. Quantum Center of Excellence with 5–10 FTE. Full three-track program at scale. Board-level quantum risk reporting. Active consortium membership (QED-C, IBM Quantum Network). Potential for dedicated quantum computing infrastructure procurement decisions in Phase 3.

### Investment Horizon and ROI Profile

**PQC migration:** Immediate ROI via compliance risk reduction, operational continuity assurance, and cyber insurance premium impact. ROI horizon: 1–3 years. This is the one quantum investment category where ROI is measurable and near-term: organizations with documented PQC transition plans face materially lower cyber insurance premiums, avoid regulatory penalty exposure, and maintain federal contract eligibility after January 2027. The ROI is not speculative.

**Quantum computing experimentation:** Strategic option value. No near-term profit center. Expected ROI horizon for optimization use cases: 2027–2029 (D-Wave hybrid solvers demonstrating advantage today for specific problem types). For chemistry/simulation: 2029+ pending IBM Starling fault-tolerant capability. Broad enterprise QC ROI: 2030s. Juniper Research projects quantum computing commercial revenue approaching $10B globally by 2030, but notes that ROI reaches only approximately 6% of investment by that date — the gap between investment and returns persists through the late 2020s.

**Quantum sensing:** Fastest near-term ROI for applicable industries. Commercially available today. ROI horizon: immediate for navigation, timing, and inspection applications where classical alternatives are demonstrably inadequate. Zero ROI for non-applicable sectors — do not invest if the application does not fit.

**Quantum networking/QKD:** Pre-commercial. Monitor; do not invest materially yet except for the highest-sensitivity data channels (nation-state-level targets). QKD infrastructure costs remain prohibitive for enterprise deployment, and the technical immaturity means investment today will likely require replacement before practical operation.

!!! tip "Business Implication"
    The budget allocation model above is designed to be presented to a CFO as a risk management portfolio, not a technology bet. PQC migration spending is insurance with a quantifiable premium reduction. QC experimentation is an option contract on a market that most credible analysts project at $46–97B by 2035. Quantum sensing is a near-term operational investment for applicable industries. The portfolio logic is sound; the specific allocations are calibrated to the current risk/opportunity gradient.

---

## 15.3 Vendor Selection Principles

Vendor selection for quantum technology divides into two fundamentally different categories with different selection criteria, different failure modes, and different strategic risks.

### For PQC Migration: Standards Compliance and Automation

**The three criteria, in priority order:**

1. **FIPS 140-3 validation**: All cryptographic modules used in PQC migration must be FIPS 140-3 validated. This is not a preference; it is a compliance requirement for organizations with federal contracts and a best practice for all organizations. Validate FIPS certificates before any vendor selection.

2. **Automation capability**: Enterprise PQC migration at scale requires automated certificate discovery, automated lifecycle management (rotation, renewal, revocation), and automated compliance reporting. Manual processes at scale fail; evaluate vendors on the depth of their automation and the quality of their API surface for integration with existing ITSM and SIEM platforms.

3. **Hybrid support**: Pure PQC is the 2035 target; hybrid PQC (classical + post-quantum) is the operational requirement for 2027–2031. All PQC migration vendors must support hybrid algorithm negotiation in TLS, code signing, and key encapsulation. Validate hybrid support specifically — not just PQC algorithm support.

**Leading vendors by function:**

*Cryptographic discovery and CBOM:*
- **IBM Quantum Safe Explorer**: End-to-end platform covering discovery, CBOM generation, risk assessment, and migration planning. Best fit for organizations standardized on IBM infrastructure or requiring a single-vendor quantum readiness platform.
- **Keyfactor**: Certificate lifecycle management with cryptographic discovery capability and CBOM output. Strong in complex PKI environments with high certificate volumes.
- **Sectigo Certificate Manager**: Comparable capability to Keyfactor; stronger in SMB and mid-market segments.
- **DigiCert and Encryption Consulting**: Assessment services with CBOM deliverables; appropriate for organizations that prefer consultant-led discovery over tool deployment.

*HSMs (Hardware Security Modules):*
- **Thales Luna Network HSM 7 (firmware v7.9+)**: FIPS 140-3 Level 3 validated with ML-KEM and ML-DSA support. Industry-leading deployment base; strong cloud HSM options via Thales Data Protection on Demand.
- **Entrust nShield Connect PQC**: FIPS 140-3 Level 3 validated; strong integration with enterprise PKI environments.

*Network and cloud infrastructure:*
- **Cloudflare**: PQC-protected TLS at global edge; ML-KEM hybrid enabled by default on Cloudflare-proxied traffic. Most accessible path to internet-facing PQC for organizations already using Cloudflare.
- **AWS, Microsoft Azure, Google Cloud**: All three major cloud providers have PQC-protected options in their TLS termination, VPN, and key management services. Validate specific service-level PQC availability against your architecture.

*Open source:*
- **liboqs (Open Quantum Safe)**: Open-source PQC algorithm implementations for testing and non-production validation.
- **OpenSSL 3.5**: Integrates all NIST PQC algorithms (ML-KEM, ML-DSA, SLH-DSA) for hybrid TLS; the foundational library for most enterprise TLS deployments.
- **IBM CBOMkit**: Open-source CBOM generation and scanning tools; compatible with CycloneDX and SPDX formats.

### For Quantum Computing Experimentation: Cloud-First, Hardware-Agnostic

**The fundamental principle:** Do not make hardware vendor commitments in 2026. The quantum hardware landscape will consolidate significantly over the next 3–5 years. Lock-in to a single hardware vendor today exposes your program to the risk of that vendor's hardware trajectory diverging from your use case requirements. Use hardware-agnostic frameworks (Qiskit, Cirq, PennyLane) and maintain access to multiple backends.

**Platform selection by use case:**

*Amazon Braket:*
Broadest hardware diversity among all cloud quantum platforms: IonQ (trapped ion), Rigetti (superconducting), QuEra (neutral atom), IQM (superconducting). Pay-per-shot pricing as low as $0.0009 per shot; no long-term commitments. Managed infrastructure with no hardware operations overhead. Best fit: organizations that want to evaluate multiple hardware modalities without committing to a single vendor, or organizations already standardized on AWS infrastructure.

*IBM Quantum Platform:*
Deepest software ecosystem. The most mature Qiskit software stack, with the largest library of existing quantum algorithms, tutorials, and educational resources. Monthly subscriptions from approximately $96 for limited compute time. IBM's roadmap from Kookaburra (2025) to Starling (2029) is the most publicly detailed in the industry — providing the clearest basis for timing production deployment decisions. Best fit: organizations prioritizing software ecosystem maturity and long-term roadmap visibility over hardware diversity.

*Azure Quantum:*
Microsoft's quantum platform provides access to Quantinuum (best-in-class gate fidelity on trapped ion hardware) and IonQ, with strong integration into the Microsoft enterprise cloud ecosystem. If your organization is Azure-first, Azure Quantum provides the most natural operational integration. Microsoft's own quantum hardware program (topological qubits) remains research-stage as of March 2026.

*D-Wave Leap:*
The correct choice for quantum annealing and hybrid optimization. D-Wave Advantage with 5,000+ qubits is the most commercially deployed quantum hardware in history; D-Wave's hybrid solvers extend quantum annealing to problems too large for the quantum hardware alone. Free 3-month Launchpad program for new organizations. Then approximately $0.00019 per microsecond of annealing time in production. Best fit: logistics optimization, portfolio optimization, scheduling, resource allocation — any combinatorial optimization problem where you can formulate the objective as a QUBO (Quadratic Unconstrained Binary Optimization).

*Google Cloud Quantum AI:*
Research-focused, most constrained access. Best fit: organizations with research partnerships or academic collaborations where Google's specific hardware architecture is relevant. Not recommended as a primary enterprise experimentation platform.

**The NVIDIA factor:**

NVIDIA's CUDA-Q platform and NVQLink interconnect represent an emerging de facto standard for hybrid quantum-classical computing that technology leaders should understand, regardless of whether they currently use NVIDIA infrastructure.

**CUDA-Q** is NVIDIA's open-source quantum computing framework that enables hybrid programs running simultaneously on CPUs, GPUs, and quantum processors. Its key capability: when classical and quantum computation must alternate at low latency — as in variational quantum algorithms — CUDA-Q handles the orchestration natively.

**NVQLink** is the hardware interconnect protocol providing sub-4μs latency and 400 Gb/s throughput between NVIDIA Grace Blackwell GPUs and connected quantum processors. For algorithms requiring tight classical-quantum feedback loops, this latency advantage over network-connected hybrid approaches is architecturally significant.

**Adoption context:** CUDA-Q + NVQLink has been adopted at Jülich Supercomputing Centre, RIKEN (Japan), and the UK's National Quantum Computing Centre — three of the most credible quantum computing research facilities in the world. This institutional adoption establishes CUDA-Q as a legitimate standard, not a promotional initiative.

**Enterprise implication:** If your organization has already invested in NVIDIA AI/HPC infrastructure, CUDA-Q provides the most natural path to quantum computing experimentation without separate infrastructure investment. If you have not invested in NVIDIA HPC infrastructure, the case for acquiring it solely for quantum purposes is weak in 2026; re-evaluate in 2028 as hybrid workflow requirements mature.

!!! info "Key Reference"
    The QED-C (Quantum Economic Development Consortium) publishes annual state-of-the-industry reports and vendor capability assessments. QED-C membership provides access to vendor benchmarking data not available through commercial channels. For organizations spending >$300K annually on QC, the membership cost is typically recovered through the market intelligence value alone.

---

## 15.4 Risk Assessment — The Quantum Risk Register

Quantum risk should not exist in a separate risk management structure. It should be integrated into the enterprise risk framework — with quantum-specific categories, KRIs, and escalation criteria that map to existing governance structures.

### Five Quantum Risk Categories

**1. Cryptographic Risk**

*Definition:* The probability that sensitive data in transit or storage is compromised by HNDL attacks today, or by CRQC-enabled decryption in the future.

*Primary indicator:* Mosca's theorem score across your top 10 data categories. For each category, compute $L + M > Q$; any category where this condition is met has triggered migration urgency.

*Current assessment (March 2026):* HIGH likelihood. HNDL campaigns targeting government, defense, healthcare, and financial data are confirmed by multiple intelligence agencies. Impact is CRITICAL for any organization holding data with >5-year sensitivity lifespan.

**2. Compliance Risk**

*Definition:* The probability of regulatory penalties, contract loss, or reputational damage from missed PQC migration deadlines.

*Primary indicator:* Percentage of internet-facing systems still running exclusively classical asymmetric cryptography past their applicable regulatory deadline.

*Current assessment (March 2026):* MEDIUM-HIGH likelihood for organizations with government contracts (January 2027 deadline) and EU financial operations (DORA already in force). MEDIUM for others.

**3. Competitive Risk**

*Definition:* The probability that competitors achieve quantum advantage in your market before you, affecting market position, pricing power, or customer relationships.

*Primary indicator:* Competitor QC experimentation disclosures in investor materials and press, vendor partnership announcements (IBM Quantum Network membership, D-Wave customer case studies), and industry analyst reports on quantum adoption by sector.

*Current assessment (March 2026):* LOW-MEDIUM in most sectors. High in pharmaceutical/biotech (molecular simulation), financial services (portfolio optimization), and logistics (route optimization).

**4. Supply Chain Risk**

*Definition:* The probability that third-party vendors' cryptographic vulnerabilities expose your organization to HNDL or CRQC risk even after your own migration is complete.

*Primary indicator:* Percentage of critical vendors with documented PQC transition plans. Organizations with high vendor dependency (financial services, healthcare, manufacturing) face elevated supply chain cryptographic risk.

*Current assessment (March 2026):* HIGH for organizations with complex vendor ecosystems. Most enterprises have not assessed their critical vendors' cryptographic posture.

**5. Technology Investment Risk**

*Definition:* The probability that quantum computing investments fail to deliver ROI within the expected horizon.

*Primary indicator:* Hardware milestone achievement against published roadmaps (IBM Kookaburra, Quantinuum H-series, IonQ Forte). Significant delay in Q1–Q4 2027 milestones signals timeline slippage.

*Current assessment (March 2026):* MEDIUM. Hardware progress has been consistent with roadmaps in 2024–2025; fault-tolerant computing by 2029–2031 is achievable but not guaranteed. Cloud experimentation-only strategy limits this risk to the cost of the experimentation, not the cost of failed hardware investment.

### Quantum Risk Register Structure

The following template should be populated for all material quantum risks and reviewed quarterly by the PQC Migration Lead with escalation to the Steering Committee for high/critical items:

| Risk | Current Likelihood | Current Impact | Risk Score | Mitigation Status | Next Review |
|------|--------------------|----------------|-----------|-------------------|------------|
| HNDL data exfiltration (internet-facing systems) | HIGH | CRITICAL | 25/25 | TLS migration 10% complete | Q2 2026 |
| CNSA 2.0 non-compliance — January 2027 | MEDIUM | HIGH | 15/25 | PQC Lead not yet hired | Q1 2026 |
| DORA non-compliance — quantum monitoring gap | LOW | HIGH | 10/25 | Monitoring process in draft | Q2 2026 |
| QC investment fails to deliver ROI | MEDIUM | MEDIUM | 9/25 | Cloud experimentation only | Q4 2026 |
| Vendor supply chain cryptographic exposure | HIGH | HIGH | 20/25 | No vendor assessments underway | Q2 2026 |

### Board Reporting Template

Annual quantum risk reporting to the board of directors should fit on one page. The five required sections:

1. **PQC migration progress**: Percentage of internet-facing systems migrated; CBOM completeness score; percentage of critical vendors with documented transition plans.

2. **Regulatory compliance status**: Color-coded (green/yellow/red) against all material deadlines from Section 14.1. Any red items require board-level attention and authorization.

3. **Quantum hardware milestone status**: Brief summary of significant hardware announcements against the five fault-tolerance criteria from Chapter 11. Has any milestone been achieved that materially changes the CRQC timeline estimate?

4. **Quantum computing investment summary**: Total spend in the period, number of experiments run, results against classical baselines, production deployments (if any).

5. **Key decisions required for next period**: Budget requests, governance changes, vendor selections, or strategic pivots that require board-level authorization.

!!! success "Action Item"
    If your board has never received a quantum risk report, prepare one using this template before the next regularly scheduled board meeting. A board that has not been informed of quantum risk cannot provide effective oversight. The reporting template above requires 2–3 hours to populate and communicates everything a board needs to provide informed governance.

---

## 15.5 Market Outlook and Investment Thesis

Strategic technology investment decisions require a clear-eyed view of the market. The projections below represent consensus estimates from credible analysts; they are not promotional materials.

### Market Size Projections

**Total quantum technology market:**

- McKinsey Global Institute (2025): $46–97B by 2035 (depending on hardware milestone timing), growing to $198B by 2040.
- BCG (2024): $450–850B in economic value creation by 2040 — a broader measure that includes productivity gains in adjacent industries rather than direct quantum technology revenue.

**By technology segment:**

- **PQC market**: $4.6B by 2030 at 39–42% CAGR (consensus). This is the most immediately realizable quantum-adjacent market, driven by regulatory compliance investment.
- **Quantum computing revenue**: Less than $10B by 2030 (Juniper Research). ROI reaches approximately 6% of total investment by 2030; the gap between investment and returns persists through the late 2020s. This is not a bearish outlook — it is an honest one that correctly calibrates expectation and timing.
- **Quantum sensing**: $7–10B by 2035 (McKinsey). The fastest near-term ROI segment for applicable industries.
- **Quantum networking/QKD**: Pre-commercial. Not material in projections through 2030.

**Quantum talent market:**

- McKinsey: 250,000 quantum jobs by 2030; 840,000 by 2035.
- WEF/MIT Quantum Index 2025: 1 qualified candidate for every 3 open positions.

### The Honest Investment Thesis

**PQC: invest now, ROI is immediate.** Compliance risk reduction is measurable. Cyber insurance premium impact is quantifiable. Federal contract eligibility after January 2027 is binary — compliant or not. This is the one quantum investment where ROI calculation does not require assumptions about quantum hardware timelines.

**Quantum computing: invest $100K–$500K/year now for option value, scale in 2029–2031.** The quantum computing commercial market will reach scale — McKinsey and BCG projections are consistent with a $50–100B market by 2035. The ROI question is not "whether" but "when and for which problems." Organizations that build QC capability during 2026–2028 at low cost will be 2–3 years ahead of organizations that wait for clear ROI evidence. The cost of early capability building is small; the cost of being behind when advantage arrives is large.

**Quantum sensing: immediate ROI for applicable industries; zero investment for non-applicable.** If your business involves navigation, timing, subsurface exploration, or precision measurement — evaluate quantum sensors now. They deliver advantage today, not in 2030. If these applications are not relevant to your core operations, the sensing investment should be zero.

**Quantum networking/QKD: monitor, do not invest.** The technical immaturity, high infrastructure cost, and absence of a clear commercial deployment model make QKD a poor investment for enterprise organizations in 2026. Monitor for developments; revisit in 2029.

**The key differentiator:** Organizations that build quantum literacy and experimentation capability now (2026–2027) will be positioned to capture value when fault-tolerant quantum computing arrives (2029–2031). The cost of building the capability now is low ($100K–$500K/year); the cost of being unprepared is high. The technology transition from classical to quantum computing will not be gradual and evenly distributed — it will be uneven, sector-specific, and driven by hardware milestones that currently appear to be on track. Organizations that treat quantum computing as someone else's problem in 2026 will be making urgent, unplanned investments in 2029.

!!! tip "Business Implication"
    The Juniper Research finding that QC ROI reaches only 6% of investment by 2030 is frequently misread as evidence that quantum computing investment is unwise. The correct reading is: the value creation will be concentrated in 2030–2035, not 2026–2030. An organization that starts investing in QC capability in 2030 will be 4–5 years behind organizations that started in 2026. The gap between investment timing and value timing is a feature of transformative technologies, not a bug.

---

## 15.6 Conclusion — The Three Central Insights

### Insight 1: PQC Migration Is Not a Technology Project

It is a compliance and risk management imperative with hard deadlines starting January 2027. The harvest-now, decrypt-later threat exists today. Intelligence agencies from the United States, United Kingdom, European Union, and Australia have confirmed that state-sponsored actors are collecting encrypted traffic with the explicit intention of decrypting it when cryptographically relevant quantum computers become available.

Every day without a completed CBOM is a day in which you do not know which of your systems are exposed to this threat. Every day without a designated PQC Migration Lead is a day in which no one is accountable for closing that exposure. Every month without hybrid TLS deployment on internet-facing systems is a month in which newly collected encrypted traffic is vulnerable to future decryption.

The regulatory deadlines create accountability structures for this risk; they do not create the risk. The risk exists independently of whether any regulator has yet noticed your specific organization. The appropriate response is the same whether your nearest regulatory deadline is January 2027 or 2030: begin immediately, because migration takes time and the threat is active.

**Act within 90 days.** Designate your PQC Migration Lead. Launch your cryptographic inventory. Establish your Quantum Steering Committee. These three actions cost no capital and take no more than 30 days each. They are the prerequisite for everything else.

### Insight 2: Quantum Computing's Enterprise Value Will Arrive Unevenly

Organizations that bet on a single quantum computing timeline — "by 2030 quantum will be commercially ready" or "quantum won't matter until 2040" — will misallocate resources regardless of which direction they err.

The correct model is a gradient:

- **Quantum annealing (D-Wave)**: Available today for combinatorial optimization. Production-ready for organizations with well-formulated optimization problems. ROI window: now.
- **Near-term gate-based advantages (IBM Nighthawk/chemistry, simulation)**: Potentially available 2026–2027 for specific molecular modeling problems. ROI window: 2027–2029 for chemistry and materials science.
- **Fault-tolerant broad advantage (IBM Starling, Quantinuum Scale)**: Targeted 2029–2031. ROI window: 2030s for general enterprise computing.

An investment strategy calibrated to this gradient invests in D-Wave exploration today, monitors IBM Nighthawk progress for chemistry applications, and positions for Starling-era deployment through capability building rather than hardware commitment.

Organizations that match their investment timing to this gradient will capture value efficiently. Those that wait for "general quantum advantage" will miss the optimization and chemistry windows entirely; those who over-invest in gate-based computing before fault tolerance exists will struggle to demonstrate ROI.

### Insight 3: Quantum Sensing Is the Overlooked Opportunity

The quantum sensing market is commercially available, demonstrates genuine advantage over classical alternatives in specific applications, and is largely absent from enterprise quantum strategies.

The gap between quantum sensing's commercial availability and enterprise adoption is remarkable. Quantum-enhanced gravimeters are being used for subsurface mapping today by oil and gas companies. Quantum magnetometers are in clinical and industrial use. Quantum optical clocks exceed the precision of any classical timing source by multiple orders of magnitude. These are not research demonstrations; they are commercial products with active customer deployments.

Yet in 2026, virtually no enterprise quantum strategy documents explicitly evaluate quantum sensing against current business operations. This represents either genuine irrelevance (most enterprises have no application for precision navigation, timing, subsurface mapping, or high-sensitivity measurement) or systematic oversight.

If your business involves any of the following, evaluate quantum sensing now:

- GPS-denied navigation (maritime, mining, autonomous vehicles, defense)
- Precision timing for financial transaction timestamping or network synchronization
- Subsurface geological or structural mapping
- Semiconductor manufacturing quality control and defect detection
- Medical or industrial magnetic field sensing

The opportunity window is open. Unlike quantum computing, where the technology is maturing toward advantage, quantum sensing advantage is available today. The question is only whether your specific operations have an application.

---

### The Path Forward

The field has crossed a qualitative threshold in 2024–2025. Quantum error correction works in practice — demonstrated by Google's below-threshold results and IBM's fault-tolerant roadmap progress. Post-quantum cryptography standards exist, are ratified, and are enforceable by regulators. Quantum sensing delivers commercial value in multiple industries. Quantum computing shows selective advantage in optimization and early chemistry applications.

The question for technology and business leaders is no longer whether quantum technology is real. It is whether your organization will be positioned to respond when the risk crystallizes — in the form of a CRQC capable of breaking current encryption — and capture value when the opportunity matures — in the form of fault-tolerant quantum advantage in your specific domain.

This textbook has provided the technical foundation to evaluate vendor claims: you understand superposition, entanglement, quantum error correction, and the hardware milestones that separate marketing from progress. It has provided the business context to prioritize investments: you understand Mosca's theorem, the harvest-now-decrypt-later threat, the regulatory cascade, and the use case landscape. It has provided the strategic framework to act: the three-phase roadmap, the budget model, the governance structures, the vendor selection criteria, and the risk register methodology are all in this chapter.

The next move is yours.

---

!!! abstract "Chapter Summary"

    **Five Key Action Items for the Next 12 Months:**

    1. **Designate your PQC Migration Lead within 30 days.** This is the foundational governance action. VP or Director level, reports to CISO, existing security professional with supplemental PQC training. Without this person, no migration proceeds with coherent accountability.

    2. **Complete your CBOM for all internet-facing systems within 6 months.** Launch IBM Quantum Safe Explorer, Keyfactor, or equivalent. The cryptographic inventory is the prerequisite for every regulatory deadline you face and every risk assessment you need to conduct. 87% of organizations have not done this; doing it puts you ahead of the vast majority of your peers.

    3. **Establish your Quantum Steering Committee by end of Q2 2026.** Quarterly cadence, CTO or CIO chair, with CISO, CFO representative, and Legal/Compliance as standing members. This is the governance structure that prevents the two most common failure modes: treating PQC as a security-only project, and chasing QC hype while neglecting compliance.

    4. **Access D-Wave Leap Launchpad and enroll 5 technical staff in IBM Qiskit certification — both free.** D-Wave's 3-month Launchpad provides access to production-grade quantum annealing at no cost. Qiskit certification builds the baseline quantum computing literacy your data science and engineering teams need to evaluate QC use cases and run meaningful experiments. This is $0 of capital investment for capabilities that will take 6–12 months to build.

    5. **Prepare your first board quantum risk report before the next board meeting.** Use the five-section template from Section 15.4. A board that has not been briefed on quantum risk cannot provide effective oversight; a board that has been briefed is a governance asset, not an obstacle. This report costs 2–3 hours to prepare and establishes the accountability structure for all subsequent quantum investment decisions.

---

## References

1. McKinsey Global Institute, "Quantum Technology Monitor," April 2025. [mckinsey.com/capabilities/mckinsey-digital/our-insights/quantum-technology](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/quantum-technology)

2. BCG, "The Coming Quantum Leap in Computing," 2024. [bcg.com/publications/2024/quantum-computing-investment](https://www.bcg.com)

3. Juniper Research, "Quantum Computing: Market Opportunity, Readiness Assessment and Forecasts 2025–2030," 2025.

4. QED-C (Quantum Economic Development Consortium), "State of the U.S. Quantum Industry," 2025. [quantumconsortium.org](https://quantumconsortium.org)

5. NIST, "FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard," August 2024. [doi.org/10.6028/NIST.FIPS.203](https://doi.org/10.6028/NIST.FIPS.203)

6. NIST, "FIPS 204: Module-Lattice-Based Digital Signature Standard," August 2024. [doi.org/10.6028/NIST.FIPS.204](https://doi.org/10.6028/NIST.FIPS.204)

7. NIST, "FIPS 205: Stateless Hash-Based Digital Signature Standard," August 2024. [doi.org/10.6028/NIST.FIPS.205](https://doi.org/10.6028/NIST.FIPS.205)

8. IBM Quantum, "IBM Quantum Development Roadmap 2024–2033," 2024. [ibm.com/quantum/roadmap](https://www.ibm.com/quantum/roadmap)

9. D-Wave Systems, "Quantum Computing for Business Leaders," 2025. [dwavesys.com/solutions](https://www.dwavesys.com/solutions-and-products)

10. NSA, "CNSA 2.0 Cybersecurity Advisory," September 2022. [nsacyber.github.io/CNSA-2.0](https://nsacyber.github.io/CNSA-2.0)

11. NVIDIA, "CUDA Quantum Platform Documentation," 2024. [nvidia.com/en-us/solutions/quantum-computing](https://www.nvidia.com/en-us/solutions/quantum-computing)

12. World Economic Forum, "Quantum Economy Blueprint," 2024. [weforum.org/publications/quantum-economy-blueprint](https://www.weforum.org)

13. RAND Corporation, "Building the National Quantum Workforce," RR-A3889-1, 2025. [rand.org/pubs/research_reports/RRA3889-1.html](https://www.rand.org/pubs/research_reports/RRA3889-1.html)
