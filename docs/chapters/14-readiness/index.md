---
title: "Chapter 14: Regulatory Landscape and Organizational Readiness — Building the Quantum-Ready Enterprise"
chapter: 14
concepts: 18
prerequisites:
  - "Chapter 12: The Post-Quantum Cryptography Imperative"
  - "Chapter 13: Quantum Computing Use Cases"
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
---

# Chapter 14: Regulatory Landscape and Organizational Readiness — Building the Quantum-Ready Enterprise

The gap between knowing quantum risk is real and doing something about it is where most organizations currently live. This chapter closes that gap. The regulatory machinery is already in motion: hard deadlines are embedded in law, executive orders, and binding directives across every major jurisdiction. The organizational frameworks to respond to those deadlines exist and are freely available. What remains is the will to act and the clarity to know where to start.

This chapter provides both. Section 14.1 maps the complete regulatory landscape with precise deadlines and jurisdictional scope. Section 14.2 introduces the leading organizational readiness frameworks for benchmarking your current position. Section 14.3 defines the six capability domains that constitute genuine quantum readiness. Section 14.4 addresses governance — the executive structures that prevent quantum initiatives from dying in committee. Section 14.5 confronts the talent question directly, with a timeline that separates what you need now from what you will need later.

The goal is not comprehensive coverage of every regulation ever mentioned in relation to quantum computing. The goal is to give technology and business leaders exactly what they need to make defensible decisions, meet compliance deadlines, and build durable organizational capability.

---

## 14.1 The Regulatory Cascade: 2027–2035

Regulatory requirements for post-quantum cryptography are not a future concern. They are arriving in sequence across jurisdictions with binding force. The cascade begins in January 2027 and runs through 2035, when the NIST prohibition on RSA and ECC in all regulated contexts takes full effect. The question for every organization is not whether these requirements apply but how exposed you are to each deadline.

### United States: The Hardest Near-Term Deadlines

The United States has the most immediate binding requirements for any organization operating in, contracting with, or selling to the federal government.

!!! danger "Critical Deadline"
    **January 1, 2027: CNSA 2.0 Compliance for All New NSS Acquisitions**

    The Commercial National Security Algorithm Suite 2.0, published by the NSA in September 2022, requires that all **new** National Security System (NSS) acquisitions comply with PQC algorithms — specifically CRYSTALS-Kyber (ML-KEM), CRYSTALS-Dilithium (ML-DSA), and SPHINCS+ (SLH-DSA) — as of January 1, 2027. This deadline directly affects any company selling hardware, software, or services to the U.S. federal government or defense sector. There is no broadly available waiver process. If your products do not support these algorithms, they will not be eligible for NSS contracts after this date. Audit your sales pipeline and product roadmap against this deadline immediately.

**The Quantum Computing Cybersecurity Preparedness Act** (federal law, signed December 2022) requires all federal agencies to conduct annual cryptographic inventories and submit findings to Congress through 2029. This is a transparency and accountability mechanism that accelerates downstream pressure on agency contractors and technology vendors. If an agency must report its cryptographic posture annually, that agency will require its vendors to support that reporting.

**NSM-10** (National Security Memorandum 10, issued May 2022 and preserved across administrations) establishes the overarching federal commitment to full migration to PQC by 2035. It is not a single-event requirement but a binding directive that frames all subsequent executive branch action on quantum security. Its preservation across administrations signals that this is treated as a national security matter, not a policy preference.

**OMB Memorandum M-23-02** (December 2022) operationalizes NSM-10 by requiring annual cryptographic inventory submissions from all federal agencies through 2035. These inventories must identify every system using public-key cryptography, classify it by risk, and document migration progress. For agencies and their vendors, this creates documented compliance exposure on a 12-month cycle.

**Executive Order 14306** mandates TLS 1.3 as the minimum standard across all federal systems by January 2, 2030. While TLS 1.3 is not a PQC requirement per se, it is a prerequisite: you cannot deploy ML-KEM hybrid TLS on a system still running TLS 1.2 or earlier. Organizations serving federal clients must ensure their TLS stack is both current and PQC-ready by this date.

**DoD CIO Memorandum (November 2025)** directed all Pentagon components to complete two things within 20 days: inventory all cryptography in use and designate a named PQC migration lead. The significance extends beyond the DoD itself. The designation requirement — a named individual with accountability — signals the governance model the government expects contractors to mirror. Any company with significant defense business should have already followed suit.

**CNSA 2.0 Full Enforcement Timeline:** All NSS systems must achieve full CNSA 2.0 compliance by December 31, 2031. By 2035, the requirement transitions from hybrid PQC (classical + post-quantum algorithms in tandem) to pure PQC — no classical asymmetric cryptography remaining. This progression from hybrid to pure is deliberate: hybrid provides backward compatibility and operational continuity during the transition period. Pure PQC in 2035 means RSA and ECC are completely removed from NSS systems.

**Draft White House Executive Order (February 2026)** outlines a whole-of-government quantum strategy establishing a Center of Excellence under the Departments of Energy, Commerce, and Defense. While in draft as of March 2026, its content reflects the trajectory of federal quantum policy: consolidated coordination, cross-agency accountability, and federal investment in quantum workforce and infrastructure.

**What the U.S. framework means for the private sector:** As of March 2026, there is no binding federal PQC mandate for private enterprise. The pressure is indirect but increasingly concrete:

- **Procurement**: Any company selling to federal agencies faces downstream PQC requirements through contracting vehicles.
- **Supervisory expectations**: Financial regulators, healthcare regulators, and sector-specific agencies are developing expectations based on NIST standards and federal agency requirements.
- **Cyber insurance**: The insurance market is moving faster than regulation. Insurers are incorporating PQC transition plans into risk assessments; organizations without documented plans face higher premiums, sublimit provisions, or policy exclusions.
- **Standards of care**: In litigation and regulatory enforcement contexts, the existence of NIST FIPS 203/204/205 and the 2027 federal deadline establishes what a "reasonable" organization should have done. Failing to act is defensible only with documented rationale for de minimis exposure.

### European Union: Binding Requirements Already in Force

The EU regulatory picture is distinctive in one important respect: binding requirements are already in effect, not merely imminent.

**NIS2 Directive** (effective November 2024) applies to essential and important entities across 18 sectors including energy, transport, banking, financial market infrastructure, health, and digital infrastructure. NIS2 requires entities to implement "state of the art" cryptography and maintain crypto-agility — the ability to update cryptographic algorithms without system redesign. A January 2026 proposed amendment to the implementing regulation makes the PQC reference explicit, citing HNDL (harvest now, decrypt later) attacks as "likely occurring already now." This is not a future concern in NIS2 terms; it is a current compliance requirement.

**EU PQC Coordinated Implementation Roadmap** (June 2025): Member states are required to initiate national PQC strategies by end of 2026. High-risk system transitions must complete by 2030; all systems by 2035. The roadmap's tiered structure mirrors the UK and U.S. frameworks, providing consistency for multinationals managing compliance across jurisdictions.

**DORA** (Digital Operational Resilience Act, effective January 17, 2025): This regulation applies to financial entities and their critical ICT third-party service providers across the EU. Uniquely among current EU financial regulation, DORA explicitly mandates that financial institutions monitor cryptographic threats arising from quantum computing advances. This is binding law, not guidance. Any financial institution subject to DORA — banks, insurance companies, investment firms, payment institutions — must have a documented process for monitoring quantum cryptographic risk. If you serve EU financial institutions as an ICT provider, your quantum readiness posture is subject to due diligence under your customers' DORA obligations.

**Proposed EU Quantum Act** (expected Q2 2026): A comprehensive framework for quantum technology governance, investment, and security is anticipated. The EU has already invested substantially through the Quantum Flagship program (€1B committed). The proposed Act would establish governance structures, security requirements, and investment coordination for quantum technologies beyond cryptography.

### United Kingdom: The Three-Phase Timeline

The UK National Cyber Security Centre (NCSC) published a clear, publicly available three-phase migration timeline in November 2025:

- **By 2028**: Complete the discovery phase. All organizations should have identified every system using asymmetric cryptography, assessed dependencies, and produced documented migration plans.
- **By 2031**: Complete high-priority migrations. All internet-facing services, certificate authorities, and critical infrastructure components must have migrated to PQC.
- **By 2035**: Complete all remaining migrations. Legacy systems, embedded systems, OT/ICS (operational technology and industrial control systems), and IoT devices must complete migration.

The NCSC framework is sector-neutral, applying to both public and private organizations operating critical national infrastructure. Its value lies in specificity: the three phases correspond directly to the three natural categories of system complexity (internet-facing, enterprise, legacy/embedded), and the phased timeline acknowledges the operational reality that not all migrations can happen simultaneously.

### Financial Sector: The Most Concentrated Regulatory Pressure

Financial services organizations face more concentrated PQC regulatory pressure than any other sector, driven by the combination of data sensitivity, interconnected systemic risk, and multiple overlapping regulatory frameworks.

**PCI DSS 4.0** requires annual cryptographic review and documented response strategies for all payment card data environments. The practical implication: any payment processor, merchant, or service provider in the PCI ecosystem must have a documented PQC response plan as part of their annual compliance cycle.

**EU DORA** (discussed above): Binding and explicit on quantum threats for EU financial entities.

**U.S. Federal Reserve** identified quantum computing as a "significant emerging risk area" in its Supervision and Regulation Report (July 2025). Fed-supervised institutions — bank holding companies, state member banks, and their technology service providers — should expect quantum risk to appear in examination modules within 18–24 months of this identification.

**G7 Cyber Expert Group** published a financial sector PQC roadmap in January 2026, targeting critical systems migration by 2030–2032. For G7-jurisdiction financial institutions, this represents coordinated expectations from the world's leading financial regulatory authorities.

**Cyber insurance** represents the most powerful market-driven enforcement mechanism operating today. Major commercial cyber insurers are developing quantum risk assessment criteria. Organizations without documented PQC transition plans — specifically: a named lead, a completed or in-progress CBOM, and a migration timeline — face higher premiums, sublimit provisions, or coverage exclusions. The insurance market does not wait for regulators; it prices risk in real time.

### Australia: The Most Aggressive Global Timeline

The Australian Signals Directorate (ASD) has set one of the most aggressive national PQC timelines globally: complete PQC transition by end of 2030. Organizations with significant Australian government or critical infrastructure business face timeline pressure comparable to U.S. defense contractors facing the 2027 CNSA 2.0 deadline, compressed into four years.

### Master Regulatory Deadline Table

| Date | Requirement | Jurisdiction |
|------|-------------|-------------|
| January 1, 2027 | CNSA 2.0 compliance for all new NSS acquisitions | United States |
| End of 2026 | National PQC strategy initiation | EU member states |
| 2028 | Complete PQC discovery phase | United Kingdom |
| January 2, 2030 | TLS 1.3 mandatory across all federal systems | United States |
| 2030 | RSA and ECC deprecated by NIST | Global standard |
| End of 2030 | Complete PQC transition | Australia |
| 2030 | High-risk system migration complete | European Union |
| December 31, 2031 | Full CNSA 2.0 enforcement across all NSS | United States |
| 2031 | High-priority migration complete | United Kingdom |
| 2035 | RSA and ECC disallowed by NIST | Global standard |
| 2035 | Complete migration — all remaining systems | EU, UK, US |

!!! warning "Common Misconception"
    The 2030 NIST deprecation and 2035 NIST disallowance are frequently conflated. **Deprecated** (2030) means RSA and ECC should no longer be used for new deployments and should be prioritized for migration; existing use in non-regulated contexts is tolerated but discouraged. **Disallowed** (2035) means RSA and ECC cannot be used at all in NIST-conformant systems. The distinction matters for migration sequencing: plan your internet-facing migration to be complete well before 2030, not 2035.

---

## 14.2 Organizational Readiness Frameworks

The proliferation of quantum readiness frameworks since 2023 reflects both the urgency of the problem and the need for structured approaches to a genuinely novel organizational challenge. The leading frameworks are reviewed here with sufficient detail for selection and application.

### IBM Quantum Readiness Index

IBM's Quantum Readiness Index, published in October 2025 based on a survey of global organizations across sectors and sizes, produced a widely cited benchmark: **average score of 25 out of 100**. Disaggregated, the data is stark: **87% of organizations have not completed a cryptographic inventory** (Gartner, 2025). This is not a technology problem — cryptographic discovery tools are commercially available and mature. It is a governance and prioritization problem.

The Index evaluates organizations across five dimensions:

1. **Cryptographic visibility**: Does the organization know where all its cryptography is deployed?
2. **Risk assessment**: Has the organization systematically assessed which assets are most exposed to quantum risk?
3. **Architecture**: Has the organization designed systems for crypto-agility?
4. **Migration execution**: Is active migration underway?
5. **Governance**: Are there named owners, budgets, and reporting structures?

A score of 25/100 implies that most organizations have partial awareness but have not moved to systematic risk assessment, architectural change, or governance. If your organization has not completed a CBOM, you are average. Average is not a defensible position given the January 2027 deadline.

### QRAMM: Quantum Readiness Assurance Maturity Model

QRAMM, available at [qramm.org](https://qramm.org) as an open-source framework, provides the most operationally detailed maturity model available. It comprises 120 questions across 4 dimensions and 12 practices.

**The four dimensions:**

1. **Governance and Strategy**: Board oversight, quantum risk policy, executive sponsorship, budget allocation, regulatory compliance tracking
2. **Technology and Security**: Cryptographic inventory, algorithm assessment, PQC implementation, crypto-agility architecture, HSM and PKI management
3. **Operations and Risk Management**: Incident response for cryptographic events, change management for algorithm transitions, continuous monitoring
4. **Ecosystem and Supply Chain**: Vendor assessments, contractual PQC requirements, consortium participation, third-party dependency mapping

QRAMM produces a maturity score on a 1–5 scale for each practice, enabling gap identification and roadmap prioritization. Its open-source availability makes it appropriate for self-assessments before engaging consultants. The 120-question structure is comprehensive enough to be credible with boards and regulators, and the output roadmap maps directly to resource allocation decisions.

!!! tip "Business Implication"
    QRAMM is the right framework to use before your first board presentation on quantum readiness. A QRAMM self-assessment gives you a defensible current-state baseline, a prioritized gap list, and a structured argument for budget allocation — all in a framework that is publicly recognized and independently validated.

### Deloitte/WEF Quantum Readiness Toolkit (2024)

The World Economic Forum and Deloitte jointly published a Quantum Readiness Toolkit specifically designed for board-level reporting. Its five principles — **understand, identify, prioritize, migrate, monitor** — provide an executive-accessible vocabulary that maps directly to organizational action.

Each principle includes practical workbooks: structured templates for conducting the associated activities without requiring deep technical expertise at the leadership level. The toolkit's strength is translation: it converts technical quantum security requirements into the language of enterprise risk management, making it compatible with existing board risk reporting frameworks.

### ISACA Risk IT Framework Applied to Quantum

ISACA's 2025 guidance on conducting quantum risk assessments using the Risk IT Framework provides the integration path for organizations that have already invested in GRC (Governance, Risk, and Compliance) systems based on ISACA's COBIT or Risk IT methodologies. The approach maps quantum risk categories — cryptographic risk, hardware availability risk, competitive displacement risk — to existing enterprise risk taxonomy, avoiding the need to create a parallel risk management structure.

This is operationally significant: organizations with mature GRC programs can incorporate quantum risk without building a separate tracking system. The ISACA approach is not the most comprehensive quantum-specific framework, but it is the most compatible with existing enterprise risk infrastructure.

### KPMG Quantum Readiness Methodology

KPMG's quantum readiness assessment covers five dimensions and explicitly provides peer benchmarking — allowing organizations to compare their posture against industry cohorts. For organizations where regulatory or investor pressure requires demonstrated peer comparison, the KPMG methodology provides that capability, though it is a consulting engagement rather than a self-service tool.

### Palo Alto Networks Quantum Readiness Guidance

For security operations teams, Palo Alto Networks provides technical guidance on integrating quantum readiness into existing security architectures. This is vendor-specific but practically valuable for organizations with Palo Alto Network security infrastructure, providing implementation guidance that translates policy decisions into technical configurations.

---

## 14.3 The Six Capability Domains for Quantum Readiness

Frameworks provide structure; capability domains define what your organization must actually be able to do. Six domains constitute genuine quantum readiness. Each is described with maturity markers to enable honest self-assessment.

### Domain 1: Cryptographic Visibility (Discover)

**What it means:** You know precisely where every instance of asymmetric cryptography lives across your entire environment — applications, infrastructure, embedded systems, third-party integrations, and supply chain connections.

**Core activities:**

- Automated cryptographic discovery scanning across all network segments
- Cryptography Bill of Materials (CBOM) generation in CycloneDX or SPDX format
- Real-time monitoring to detect new cryptographic deployments as systems change
- Classification of all discovered assets by algorithm, key length, certificate expiration, and risk tier

**Maturity markers:**

| Level | Description |
|-------|-------------|
| 1 | No systematic inventory. Cryptography assumed but not catalogued. |
| 2 | Partial inventory of internet-facing systems only. |
| 3 | Complete CBOM covering all systems, maintained as a living document. |
| 4 | Automated continuous monitoring with alerts for non-compliant deployments. |

**The hard reality:** An organization at Level 1 cannot meet any regulatory deadline because it does not know what it is migrating. The CBOM is not optional — it is the prerequisite for every subsequent domain.

### Domain 2: Risk Assessment and Prioritization

**What it means:** You have applied a systematic framework — specifically Mosca's theorem — to every data category your organization holds, producing a prioritized migration queue based on actual risk exposure rather than technical convenience.

**Core activities:**

- Mosca's theorem analysis: for each data category, estimate $(L)$ data sensitivity lifespan + $(M)$ migration time; compare to $(Q)$ CRQC arrival estimate. Trigger migration when $L + M > Q$.
- Key Risk Indicators (KRIs): percentage of internet-facing systems on vulnerable algorithms, estimated total migration time, data shelf-life distribution across the portfolio
- Integration of quantum risk into the enterprise risk register with defined risk owners
- Annual reassessment as CRQC timeline estimates are updated

**Maturity markers:**

| Level | Description |
|-------|-------------|
| 1 | No formal quantum risk assessment conducted. |
| 2 | Ad hoc assessment of highest-profile systems only. |
| 3 | Systematic annual Mosca analysis across all material data categories. |
| 4 | Continuous automated assessment with dashboard reporting to CISO and Steering Committee. |

!!! tip "Business Implication"
    Mosca's theorem analysis frequently reveals that the highest-risk assets are not the systems with the most sensitive data today, but the systems that are hardest to migrate. A healthcare organization's claims archive may hold data for 40 years; if the migration timeline for that archive is 3 years, and CRQC probability is significant within 10 years, the risk score is critical — regardless of whether the system appears in the top tier of a classical threat assessment.

### Domain 3: Crypto-Agility Architecture

**What it means:** Your systems are designed to replace cryptographic algorithms without application redesign. Cryptographic operations are abstracted, centrally managed, and independently updatable.

**Core activities:**

- Cryptographic API abstraction layer: applications call a cryptographic service rather than invoking specific algorithms directly
- Centralized key and certificate management platform (e.g., HashiCorp Vault, Thales CipherTrust, Keyfactor EJBCA)
- Automated certificate lifecycle management: rotation, renewal, and revocation without manual intervention
- Algorithm negotiation in all protocols: TLS handshakes, code signing workflows, and data-at-rest encryption support multiple algorithm options

**Maturity markers:**

| Level | Description |
|-------|-------------|
| 1 | Algorithms hardcoded in applications. Changing an algorithm requires code modification and redeployment. |
| 2 | Cryptographic functions isolated in shared libraries, but no centralized management. |
| 3 | Centralized key and certificate management with policy-driven algorithm selection. |
| 4 | Full crypto-agility: any algorithm can be rotated across all systems through centralized configuration with no application changes required. |

### Domain 4: Migration Execution

**What it means:** Your organization can deploy PQC algorithms in production, beginning with hybrid configurations and progressing to pure PQC as deadlines require.

**Core activities:**

- Phased deployment capability: hybrid PQC/classical first (for compatibility), pure PQC later (for full compliance)
- Testing and validation framework for PQC algorithm deployments including performance benchmarking (ML-KEM has larger key sizes; validate TLS handshake latency at scale)
- Change management process for algorithm transitions including rollback procedures
- Vendor coordination process to align migration timelines with supplier PQC readiness

**Maturity markers:**

| Level | Description |
|-------|-------------|
| 1 | No PQC deployment capability. No hybrid TLS running anywhere. |
| 2 | Pilot hybrid PQC TLS on 1–3 internet-facing services. |
| 3 | PQC complete for all internet-facing and TLS endpoints. |
| 4 | Full migration complete including legacy, embedded, and OT/ICS systems. |

### Domain 5: Quantum Computing Literacy and Experimentation

**What it means:** Your organization can evaluate quantum computing use cases, access cloud platforms, and develop the institutional judgment to distinguish genuine quantum advantage from vendor hype.

**Core activities:**

- Active accounts on cloud platforms: Amazon Braket, IBM Quantum Platform, Azure Quantum, D-Wave Leap
- Identified and owner-assigned business problems that are candidates for quantum evaluation (optimization, simulation, sampling)
- Technical staff trained on at least one quantum SDK (Qiskit, Cirq, or PennyLane)
- Documented evaluation methodology: how your organization assesses whether quantum outperforms classical baselines

**Maturity markers:**

| Level | Description |
|-------|-------------|
| 1 | Awareness only. No cloud access. No trained staff. |
| 2 | Training complete. Cloud accounts established. No active experiments. |
| 3 | Pilots underway with defined metrics and classical baselines. |
| 4 | Production experiments integrated into business processes where quantum advantage has been demonstrated. |

### Domain 6: Vendor and Ecosystem Management

**What it means:** Your organization treats cryptographic security in the supply chain with the same rigor as your internal systems, and participates in the quantum ecosystem to maintain strategic intelligence.

**Core activities:**

- PQC readiness assessments for all critical vendors: do they know what cryptography they use? Do they have a migration timeline?
- Participation in quantum technology consortia (QED-C, IBM Quantum Network) for market intelligence and standards influence
- Standardized contract language: PQC migration requirements in all new technology vendor contracts and material renewals
- Regulatory compliance tracking for vendors operating in your supply chain

**Maturity markers:**

| Level | Description |
|-------|-------------|
| 1 | No vendor PQC awareness or requirements. |
| 2 | PQC assessments underway for top 20 critical vendors. |
| 3 | PQC requirements included in all new contracts. |
| 4 | Consortium membership active. All critical vendors have documented and verified PQC transition plans. |

!!! warning "Common Misconception"
    Supply chain cryptographic risk is systematically underestimated. A healthcare system that completes its own PQC migration but fails to require PQC compliance from its medical device suppliers, claims processors, and EHR vendors has not reduced its overall cryptographic risk profile — it has merely shifted where the exposure sits. The perimeter is only as strong as the least-migrated vendor in your critical supply chain.

---

## 14.4 Executive Governance Structures

Quantum readiness fails organizationally before it fails technically. The failure mode is predictable: PQC migration is assigned to the security team, quantum computing exploration is assigned to R&D, and no one owns the strategy that connects them, allocates resources across them, or reports progress against both.

### Why Quantum Requires Executive Governance

Quantum readiness decisions cut across every major executive function:

- **CISO**: owns PQC migration, cryptographic risk, regulatory compliance
- **CTO**: evaluates quantum computing opportunities, manages cloud platform relationships
- **CIO**: owns infrastructure modernization, certificate management platforms, system dependencies
- **CFO**: authorizes budget, assesses ROI claims, manages cyber insurance relationships
- **CEO**: owns competitive strategy, investor communications, regulatory relationships

Without a governance structure that coordinates across these functions, two failure modes are consistently observed:

1. Treating PQC as a "security project" that gets resourced at security-department scale while the business ignores quantum computing as a strategic opportunity.
2. Chasing quantum computing hype at the board level while the CISO struggles to obtain budget for cryptographic migration.

Both failures are expensive. The governance structure below prevents both.

### The Quantum Steering Committee

**Purpose:** Strategic oversight, budget authorization, cross-functional conflict resolution, and progress tracking across all quantum initiatives.

**Structure:**
- Quarterly cadence, chaired by CTO or CIO
- Standing members: CISO, CFO representative, Legal/Compliance, R&D leadership, business unit leads with highest quantum exposure

**Owns:**
- Quantum strategy and 3-year roadmap
- Annual budget approval for all quantum-related investments
- Cross-functional conflict resolution (e.g., CISO needs HSM budget that CIO categorizes as infrastructure)
- Progress tracking against regulatory deadlines and business milestones
- External communications on quantum readiness (investor disclosures, regulatory submissions)

A steering committee that meets quarterly with explicit budget authority is sufficient for organizations through approximately $5B in revenue. Larger organizations or those with significant government exposure require the Quantum Center of Excellence structure described below.

### The PQC Migration Lead: The Most Important Quantum Hire for 2026

Every DoD component was required by the November 2025 CIO memorandum to designate a named PQC migration lead within 20 days. Enterprise organizations should follow the same logic: accountability without a name attached is not accountability.

**Profile:** VP or Director level. Reports to CISO. Does not require a quantum physics background — requires deep expertise in PKI, TLS, HSMs, certificate lifecycle management, and regulatory compliance. The DoD memo used the word "designate" deliberately: this should be an existing senior security professional with supplemental PQC training, not an external quantum hire who requires organizational integration time you do not have.

**Responsibilities:**

- Own the CBOM: its accuracy, completeness, and currency
- Drive migration planning: prioritized queue, vendor selection, timeline against regulatory deadlines
- Manage compliance tracking: OMB M-23-02 submissions, CNSA 2.0 audit readiness, NIS2 documentation
- Coordinate engineering teams across business units during active migration
- Report monthly to CISO and quarterly to Steering Committee

**The single most important organizational action any technology leader can take before June 2026 is to designate this person.** Every other quantum readiness activity depends on having a named owner.

### The Quantum Computing Exploration Lead

**Profile:** Senior architect or principal engineer. Reports to CTO. Can be dual-hatted or part-time until QC investments warrant a dedicated function — typically when annual QC experimentation spend exceeds $500K.

**Responsibilities:**

- Maintain relationships with cloud platform providers (AWS, IBM, Azure, D-Wave)
- Evaluate identified use cases against available quantum technology
- Manage proof-of-concept experiments with defined success criteria and classical baselines
- Report quarterly to Steering Committee on experimentation results and hardware milestones
- Monitor IBM Quantum, Quantinuum, and IonQ roadmap announcements for decision-relevant developments

### Decision Rights Framework

| Decision | Owner | Approver |
|----------|-------|---------|
| PQC migration priority and sequencing | PQC Migration Lead | CISO |
| QC experimentation budget (annual) | Steering Committee | Steering Committee |
| Vendor and platform selection | Technical leads (PQC Lead or QC Lead) | Steering Committee |
| Regulatory compliance reporting | PQC Migration Lead | Legal/Compliance |
| External communications on quantum readiness | Steering Committee | CEO |

### Quantum Center of Excellence (QCoE)

For organizations exceeding $1B in revenue or with significant government and defense exposure, a Quantum Center of Excellence provides the consolidated capability structure that a distributed steering committee cannot sustain.

**What a QCoE consolidates:**

- PQC migration expertise and tooling
- QC experimentation infrastructure (cloud access, development environments)
- Talent development (internal training, university partnerships, research relationships)
- Vendor management and contract coordination
- Knowledge management and institutional learning across business units

**Target size:** 3–10 people initially. Lean, cross-functional, with clear mandate from the Steering Committee. Resist the impulse to build a large organization before the work volume justifies it.

**Global precedents:** The draft White House Executive Order of February 2026 directs the establishment of a federal quantum Center of Excellence under the Departments of Energy, Commerce, and Defense. South Korea's KISTI national QCoE, operating in partnership with IonQ, demonstrates the model at national scale. SEALSQ's Geneva Quantum Center of Excellence (announced February 2026) represents the private-sector model for a security-focused technology company.

!!! info "Key Reference"
    The Open Quantum Institute at CERN published guidance in 2025–2026 on quantum governance structures for research institutions and enterprises. While research-focused, the governance models translate directly to commercial applications and provide a peer-reviewed foundation for board-level governance proposals.

---

## 14.5 Talent Strategy — What to Hire When

### The Talent Gap: Quantifying the Shortage

The quantum talent gap is severe and will remain so through at least 2030. McKinsey projects 250,000 quantum jobs globally by 2030, growing to 840,000 by 2035. Against these projections, the WEF 2025 Future of Jobs Report and the MIT Quantum Index 2025 estimate there is currently 1 qualified candidate for every 3 open quantum positions. In specialized sub-disciplines — quantum error correction in particular — the shortage is extreme: approximately 600–700 specialists exist worldwide as of 2025.

The RAND Corporation's 8-point plan for the quantum skills pipeline (RR-A3889-1, 2025) addresses this gap at the national level, recommending investments in university programs, apprenticeship pathways, and international talent recruitment. For individual enterprises, the national-level solution is too slow. The practical answer is to stop competing for the scarce PhDs and instead build the specific capabilities your organization actually needs.

**"Quantum literacy is the new digital literacy."** — WEF Quantum Economy Blueprint 2024. The analogy is instructive: enterprises do not need everyone to be a software engineer to benefit from digital technology. They need sufficient quantum literacy to evaluate vendor claims, direct resources, and recognize when external expertise is genuinely required.

### What You Need Now (2026)

**Cryptographic engineers**: The most urgent hires. The skills required — deep expertise in PKI, TLS, HSMs, and certificate lifecycle management — already exist in the cybersecurity talent market. What these professionals need is supplemental PQC-specific training (3–6 months of focused development), not quantum physics education. The PQC Migration Lead identified in Section 14.4 is this profile at senior level.

**Security architects**: The crypto-agility architectural work described in Domain 3 requires senior architects who can redesign system interfaces around cryptographic abstraction layers. This is systems design work combined with cryptographic expertise — a profile that exists in mature security organizations.

**Program managers**: PQC migration is a large-scale cross-functional program. The technical challenge is real, but the program management challenge — coordinating dozens of system migrations, managing vendor dependencies, tracking regulatory deadlines across multiple jurisdictions — is equally demanding. Experienced technology program managers with security context can drive migration execution that CISO-level leaders design but cannot manage at execution depth.

### What You Need Soon (2027–2028)

**Data scientists and operations researchers**: As quantum computing experimentation matures from exploration to systematic evaluation, the limiting factor becomes the ability to formulate business problems as quantum algorithms and assess whether quantum outperforms classical baselines. Data scientists who understand optimization, simulation, and sampling — and who are willing to learn quantum SDK syntax — are the right profile. Quantum physics expertise is not required; domain expertise in the specific business problem is more valuable.

**Software engineers with quantum SDK familiarity**: Qiskit, Cirq, and PennyLane are all Python-based frameworks. A software engineer comfortable with scientific Python can become productive in any of these frameworks within 3–6 months with structured training. As hybrid quantum-classical workflows become production-viable (2027–2029), these engineers become the execution capacity for QC programs.

### What You Need Later (2029 and Beyond)

**Quantum algorithm specialists**: Designing custom quantum circuits for specific business problems — beyond adapting existing algorithms from published research — requires genuine quantum computing expertise. This is the profile for which the talent shortage is most severe. Plan to hire 1–2 of these specialists when your QC program has demonstrated that at least one production use case justifies the investment.

**Quantum hardware engineers**: Required only if your organization is building quantum computing hardware or quantum sensing products. Enterprise technology buyers do not need this expertise; they access it through hardware vendors and cloud platforms.

### Building Quantum Literacy: The Free Resources

The self-study infrastructure for quantum literacy is robust and largely free:

- **IBM Qiskit**: Comprehensive online textbook, certification program, and course materials at no cost. The IBM Qiskit Developer certification is the most widely recognized entry-level credential.
- **Google Cirq**: Tutorials and documentation at [quantumai.google](https://quantumai.google)
- **Xanadu PennyLane**: Particularly strong on quantum machine learning; comprehensive documentation and free courses at [pennylane.ai](https://pennylane.ai)
- **Amazon Braket**: Hands-on labs via AWS Skill Builder; practical, infrastructure-focused
- **Microsoft Azure Quantum**: Learning paths on quantum computing fundamentals and Azure integration

**The organizational target for each function:**

- **Security teams**: can execute PQC migration without external consultant dependency. Requires cryptographic engineering depth, not quantum literacy.
- **Data science and operations teams**: can evaluate whether a given optimization or simulation problem has quantum merit, run experiments on cloud platforms, and interpret results against classical baselines.
- **Leadership team**: can distinguish opportunity from hype, ask the right questions of quantum vendors, and make resource allocation decisions with appropriate risk calibration.

!!! example "Worked Example"
    **A Fortune 500 Insurance Company: 3-Year Quantum Readiness Program**

    A 180,000-employee insurer faces concentrated quantum risk: long-duration policyholder data, DORA-adjacent EU operations, and a global supply chain of claims processors and medical device vendors.

    **Year 1 (2026):** The company designates its senior director of PKI infrastructure as PQC Migration Lead and provides 6 months of supplemental PQC training including NIST FIPS 203/204/205 curriculum, HSM vendor certifications, and regulatory compliance coursework. The CBOM initiative launches for all internet-facing systems using IBM Quantum Safe Explorer, targeting completion within 6 months. Separately, five data scientists complete IBM Qiskit certification and establish accounts on Amazon Braket and D-Wave Leap. The Quantum Steering Committee holds its first meeting; the CFO commits $2.5M annual budget: 70% PQC migration, 20% QC exploration, 10% strategic monitoring.

    **Year 2 (2027):** The PQC Migration Lead completes the CBOM and presents a prioritized migration queue. Migration begins on all internet-facing TLS endpoints and VPN infrastructure. Simultaneously, the data science team launches a quantum optimization pilot for actuarial pricing model calibration on D-Wave Leap ($150K budget, defined classical baseline). The pilot runs for 6 months; results show 12% improvement in optimization speed for a specific portfolio rebalancing problem. The company joins the QED-C.

    **Year 3 (2028):** PQC migration is complete for all TLS endpoints and VPNs; code signing infrastructure migrated to ML-DSA. The actuarial optimization pilot moves to limited production. A second QC evaluation launches for claims fraud detection using IBM Quantum Platform. The company achieves the NCSC discovery phase milestone ahead of the 2028 deadline.

---

!!! abstract "Chapter Summary"

    **Five Key Takeaways from Chapter 14:**

    1. **The January 2027 CNSA 2.0 deadline is binding for NSS vendors**: Any company selling to U.S. federal agencies or the defense sector faces a hard January 2027 compliance deadline. This is an acquisition eligibility requirement, not a recommendation. Audit your product portfolio against FIPS 203/204/205 support now.

    2. **87% of organizations have not completed a cryptographic inventory**: The IBM Quantum Readiness Index average of 25/100 reflects an organizational readiness crisis, not a technology gap. Cryptographic discovery tools are mature and available. The bottleneck is governance and prioritization.

    3. **DORA is binding on EU financial institutions — today**: The Digital Operational Resilience Act explicitly requires financial institutions to monitor quantum cryptographic threats. This has been in force since January 2025. EU financial entities and their ICT service providers are already non-compliant if they have no documented quantum risk monitoring process.

    4. **Designate your PQC Migration Lead within 30 days**: The DoD required this designation within 20 days of its November 2025 memorandum. The model is correct. No migration can proceed without a named owner. This is the single highest-leverage organizational action available in 2026.

    5. **The quantum talent gap is real but navigable**: Do not compete for scarce quantum PhD talent for your cryptographic migration. Build PQC capability from existing cybersecurity professionals through targeted training. Reserve quantum specialist hiring for the QC experimentation phase (2027+), and build quantum literacy through free, high-quality self-study resources.

---

## References

1. NSA, "Commercial National Security Algorithm Suite 2.0 (CNSA 2.0)," September 2022. [nsacyber.github.io/CNSA-2.0](https://nsacyber.github.io/CNSA-2.0)

2. NIST, "IR 8547: Transition to Post-Quantum Cryptography Standards," November 2024. [doi.org/10.6028/NIST.IR.8547.ipd](https://doi.org/10.6028/NIST.IR.8547.ipd)

3. IBM Institute for Business Value, "Quantum Readiness Index," October 2025. [ibm.com/thought-leadership/institute-business-value](https://www.ibm.com/thought-leadership/institute-business-value)

4. QRAMM, "Quantum Readiness Assurance Maturity Model," open source, Version 1.0, 2024. [qramm.org](https://qramm.org)

5. World Economic Forum and Deloitte, "Quantum Readiness Toolkit," 2024. [weforum.org](https://weforum.org)

6. RAND Corporation, "Building the National Quantum Workforce," RR-A3889-1, 2025. [rand.org/pubs/research\_reports/RRA3889-1.html](https://www.rand.org/pubs/research_reports/RRA3889-1.html)

7. McKinsey Global Institute, "Quantum Technology Monitor," April 2025. [mckinsey.com/capabilities/mckinsey-digital](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/quantum-technology)

8. MIT Quantum Index 2025. [quantumindex.mit.edu](https://quantumindex.mit.edu)

9. ISACA, "How to Conduct a Quantum Risk Assessment Using ISACA's Risk IT Framework," 2025. [isaca.org](https://isaca.org)

10. Open Quantum Institute / CERN, "Quantum Security for Enterprises," 2025–2026. [openquantuminstitute.org](https://openquantuminstitute.org)

11. European Parliament, "Digital Operational Resilience Act (DORA)," Regulation (EU) 2022/2554, in force January 17, 2025.

12. UK National Cyber Security Centre, "Post-Quantum Cryptography Migration Timeline," November 2025. [ncsc.gov.uk](https://www.ncsc.gov.uk)

13. Gartner, "Post-Quantum Cryptography: What Security Leaders Need to Know," 2025. [gartner.com](https://gartner.com)
