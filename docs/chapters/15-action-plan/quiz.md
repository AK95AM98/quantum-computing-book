# Chapter 15 Quiz: The CXO Action Plan

*30 questions across all six levels of Bloom's Taxonomy — 5 questions per level.*

---

## Level 1: Remember (Questions 1–5)

**Question 1.** What are the names of the three phases in the CXO quantum roadmap, and what years does each phase cover?

??? success "Answer"
    Phase 1 is **Foundation** (Q2–Q4 2026), Phase 2 is **Acceleration** (2027–2028), and Phase 3 is **Production Readiness** (2029).

**Question 2.** According to the chapter's recommended budget allocation, what percentage of the quantum budget should be directed toward Post-Quantum Cryptography (PQC)?

??? success "Answer"
    **60–70%** of the quantum budget should be allocated to PQC migration, making it by far the largest spending category.

**Question 3.** Name at least four vendors listed in the chapter as suppliers of PQC solutions.

??? success "Answer"
    The chapter lists: **IBM Quantum Safe, Keyfactor, Thales, Entrust, DigiCert,** and **Cloudflare** (as well as AWS). Any four of these is correct.

**Question 4.** What is Amazon Braket's per-shot price for quantum circuit execution, and what free tier does D-Wave offer to new users?

??? success "Answer"
    Amazon Braket charges **$0.0009 per shot**. D-Wave offers the **free Launchpad** tier through D-Wave Leap for new users.

**Question 5.** What market size does McKinsey project for quantum computing by 2035, and what economic value does BCG project by 2040?

??? success "Answer"
    McKinsey projects a quantum computing market of **$46–97 billion by 2035**. BCG projects **$450–850 billion in economic value by 2040**.

---

## Level 2: Understand (Questions 6–10)

**Question 6.** Explain why the chapter recommends a cloud-first approach to quantum computing experimentation rather than purchasing quantum hardware outright.

??? success "Answer"
    A cloud-first approach avoids **hardware lock-in**, eliminates large upfront capital expenditure, and allows teams to experiment across multiple backends (Amazon Braket, IBM Quantum, Azure Quantum, D-Wave Leap) using portable frameworks such as Qiskit, Cirq, and PennyLane. Hardware is still maturing rapidly, so owning a specific machine risks investing in a technology that is quickly superseded.

**Question 7.** What does "crypto-agility" mean, and why is it considered important in the context of PQC migration?

??? success "Answer"
    Crypto-agility is the architectural ability to **swap cryptographic algorithms quickly** without requiring redesign of the systems that use them. It is important because post-quantum standards are still evolving; an organization that has built crypto-agile systems can replace algorithms as better standards emerge or as vulnerabilities are discovered, rather than undertaking another full migration.

**Question 8.** The chapter identifies a January 2027 deadline for PQC. Explain what this deadline refers to and why it makes PQC a compliance imperative rather than merely a strategic option.

??? success "Answer"
    The **January 2027 deadline** corresponds to regulatory and government mandates (tied to NIST PQC standardization timelines and agency guidance) requiring organizations to begin or complete migration to post-quantum algorithms. Missing the deadline can result in **non-compliance penalties, loss of government contracts, or inability to operate in regulated industries**, elevating PQC from a forward-looking investment to a near-term legal obligation.

**Question 9.** The chapter states that quantum value "arrives unevenly." Explain what this means by describing which quantum application areas are viable today versus which are expected later.

??? success "Answer"
    Quantum annealing (e.g., optimization via D-Wave) is **viable today** and can be tested in production workflows. Quantum chemistry simulations are expected to provide value around **2027** as hardware matures. Broad fault-tolerant quantum computing — capable of running large-scale Shor's or Grover's algorithms — is not anticipated until the **2030s**. Organizations should time investments accordingly rather than waiting for a single "quantum moment."

**Question 10.** Why does the chapter describe quantum sensing as an "overlooked ROI" opportunity, despite it receiving only 5–10% of the recommended budget?

??? success "Answer"
    Quantum sensing technologies such as atomic clocks, magnetometers, and gravimeters are **commercially available today** and do not depend on fault-tolerant quantum computers. They can deliver measurable returns in industries like defense, oil and gas, healthcare, and logistics **right now**, making them a low-risk, near-term investment. Because they receive little media attention compared to quantum computing, many organizations overlook them entirely, leaving a competitive advantage unclaimed.

---

## Level 3: Apply (Questions 11–15)

**Question 11.** A mid-sized financial services firm has an annual quantum budget of $2 million. Using the chapter's recommended allocation percentages (midpoint of each range), calculate the approximate dollar amounts for PQC, QC experimentation, sensing, and monitoring.

??? success "Answer"
    Using midpoint percentages — PQC 65%, QC experimentation 17.5%, sensing 7.5%, monitoring 7.5%:

    - **PQC:** $2,000,000 × 0.65 = **$1,300,000**
    - **QC experimentation:** $2,000,000 × 0.175 = **$350,000**
    - **Sensing:** $2,000,000 × 0.075 = **$150,000**
    - **Monitoring:** $2,000,000 × 0.075 = **$150,000**

    Total: $1,950,000 (rounding differences may apply depending on percentages chosen).

**Question 12.** A startup with a $500K annual quantum budget is deciding between AWS (Amazon Braket), IBM Quantum, and Azure Quantum for cloud QC access. Apply the vendor selection criteria from the chapter to recommend a primary platform and justify your choice.

??? success "Answer"
    For a resource-constrained startup, the key criteria are **cost, ease of access, and framework portability**. A strong recommendation is **Amazon Braket** because: (1) pricing is transparent at $0.0009/shot, allowing tight cost control; (2) it supports multiple hardware backends (IonQ, Rigetti, OQC) through a single API; (3) integration with existing AWS infrastructure reduces operational overhead. IBM Quantum is a viable alternative if the team uses Qiskit heavily. The core principle from the chapter is to **avoid lock-in** by ensuring code written in Qiskit, Cirq, or PennyLane can run on any backend.

**Question 13.** You are the CIO of a healthcare organization entering Phase 1 (Foundation, Q2–Q4 2026). List three concrete actions you should take during this phase, drawn directly from the chapter's Phase 1 guidance.

??? success "Answer"
    Phase 1 Foundation actions include (any three):

    1. **Conduct a cryptographic inventory** — identify all systems using RSA, ECC, or other quantum-vulnerable algorithms.
    2. **Launch a PQC pilot** — begin migrating at least one high-priority system (e.g., certificate management) to NIST-standardized post-quantum algorithms.
    3. **Establish a Quantum Center of Excellence (QCoE)** — identify internal champions and define governance structures for quantum initiatives.
    4. **Begin cloud-based QC experimentation** — set up accounts on at least one QC cloud platform and run proof-of-concept experiments relevant to the organization's use cases.
    5. **Assess quantum risk** — complete an initial quantum risk register across the five risk categories.

**Question 14.** Apply the five quantum risk categories from the chapter to a large retail bank. Give one specific example risk for each category.

??? success "Answer"
    1. **Cryptographic risk:** RSA-2048 used to secure customer transaction data becomes vulnerable to a cryptographically relevant quantum computer.
    2. **Compliance risk:** Failure to complete PQC migration before the January 2027 regulatory deadline results in sanctions from financial regulators.
    3. **Competitive risk:** A competitor uses quantum optimization to improve fraud detection or loan pricing models, eroding the bank's market position.
    4. **Supply chain risk:** A key payment processing vendor has not migrated to PQC, creating a weak link in the bank's cryptographic chain.
    5. **Technology investment risk:** The bank invests in proprietary quantum hardware from a vendor that fails or pivots, stranding the investment.

**Question 15.** The chapter recommends NVIDIA CUDA-Q with NVQLink as a hybrid quantum-classical standard. Describe how you would apply this recommendation when setting up a Phase 2 hybrid computing pilot in a manufacturing company.

??? success "Answer"
    In Phase 2 (2027–2028), the manufacturing company should: (1) **provision GPU cluster nodes** (NVIDIA H100 or later) with CUDA-Q installed as the orchestration layer; (2) **connect to a cloud QC backend** via NVQLink, allowing quantum circuits to be offloaded from the classical optimizer; (3) **implement a hybrid variational algorithm** — such as QAOA for production scheduling — where the classical CUDA-Q layer handles parameter optimization and the quantum backend evaluates the cost function; (4) **benchmark against purely classical solvers** to validate ROI before scaling. Using CUDA-Q ensures the codebase remains portable as quantum hardware improves.

---

## Level 4: Analyze (Questions 16–20)

**Question 16.** Compare the QC cloud offerings from Amazon Braket, IBM Quantum, and D-Wave Leap. Analyze the trade-offs in terms of cost structure, hardware access, and use-case fit for an enterprise beginning Phase 1.

??? success "Answer"
    - **Amazon Braket** offers transparent shot-based pricing ($0.0009/shot), broad hardware backend access, and tight AWS integration. Best for enterprises with existing AWS infrastructure and diverse hardware experimentation needs. Risk: costs can escalate quickly at scale.
    - **IBM Quantum** provides access to IBM's superconducting gate-model computers via Qiskit, with a strong ecosystem and extensive documentation. Best for teams investing heavily in gate-model algorithms. Risk: closer alignment to the IBM ecosystem can create soft lock-in.
    - **D-Wave Leap** offers free Launchpad access and specializes in quantum annealing for combinatorial optimization. Best for enterprises with immediate optimization problems (scheduling, routing). Risk: annealing is not universal — it does not run gate-model algorithms.

    For Phase 1, an enterprise should **prioritize D-Wave Leap** if optimization ROI is the near-term goal (annealing is mature today), while maintaining an account on Braket or IBM Quantum for gate-model experimentation.

**Question 17.** Analyze the credibility of the chapter's three-phase roadmap. What assumptions must hold true for Phase 3 (Production Readiness, 2029) to be achievable, and what could cause the timeline to slip?

??? success "Answer"
    **Assumptions required:** (1) Quantum hardware error rates continue declining on current trajectories; (2) NIST PQC standards remain stable and vendors ship compliant products on schedule; (3) the organization completes cryptographic inventory and PQC pilots in Phase 1 as planned; (4) sufficient skilled talent is available or developed internally.

    **Factors that could cause slippage:** (1) Quantum hardware decoherence improvements stall, delaying fault tolerance; (2) regulatory deadlines shift, reducing urgency and causing organizations to defer investment; (3) internal resistance or budget cuts derail Phase 1 and Phase 2 milestones; (4) a key vendor (PQC or QC cloud) pivots or fails, requiring platform migration; (5) the January 2027 compliance deadline passes without enforcement, creating a false sense of security.

    The roadmap is credible for PQC (driven by regulatory pressure) but more speculative for gate-model QC production use by 2029.

**Question 18.** Examine the Juniper Research finding that QC ROI will be achieved by only 6% of organizations by 2030. What does this figure imply about quantum strategy for organizations outside that 6%, and does it contradict the chapter's overall message?

??? success "Answer"
    The 6% figure implies that **most organizations will not derive direct ROI from gate-model quantum computing by 2030**, which aligns with the chapter's own timeline (broad fault-tolerant value in the 2030s). It does **not contradict** the chapter's message; rather, it reinforces three points: (1) PQC migration is driven by **compliance**, not ROI, so it is mandatory regardless; (2) quantum sensing and annealing can deliver ROI **today** outside the gate-model category; (3) the strategic value of building internal capability now (talent, infrastructure, cloud access) is positioning for the 2030s, not immediate financial return. Organizations outside the 6% should still proceed with Phase 1 because the cost of inaction on PQC compliance far exceeds experimentation costs.

**Question 19.** Analyze the risk register implications of a supply chain that has not adopted PQC. How would this entry appear across multiple risk categories, and what mitigation steps does the chapter suggest?

??? success "Answer"
    A non-PQC supply chain creates **cascading risk across multiple categories:**

    - **Cryptographic risk:** Even if the organization's own systems are migrated, data exchanged with the non-PQC supplier (invoices, contracts, authentication tokens) remains vulnerable to harvest-now-decrypt-later attacks.
    - **Compliance risk:** Regulators may hold the organization responsible for the security posture of its supply chain, creating compliance exposure.
    - **Competitive risk:** A breach through the supply chain vector damages brand reputation and customer trust.

    **Mitigations from the chapter:** (1) Include PQC migration requirements in **vendor contracts and procurement criteria**; (2) conduct a **supply chain cryptographic audit** as part of Phase 1; (3) require vendors to demonstrate PQC readiness on a defined timeline aligned with the organization's own Phase 2 schedule; (4) prioritize suppliers of critical data paths for immediate remediation.

**Question 20.** The chapter recommends a board reporting template with five items reported annually. Analyze whether annual reporting is sufficient for quantum risk governance, considering the pace of developments in the field.

??? success "Answer"
    **Arguments that annual is sufficient:** Board-level reporting is strategic, not operational; quantum risk categories (cryptographic, compliance, competitive, supply chain, technology investment) are unlikely to shift dramatically within a single quarter; annual rhythm aligns with standard enterprise risk management cycles.

    **Arguments that annual is insufficient:** The quantum landscape is moving quickly — NIST PQC standards finalized on a compressed timeline, hardware announcements (IBM, Google, IonQ) occur quarterly, and regulatory guidance updates may require faster organizational response. A single annual report could leave the board unaware of a material compliance risk for up to 12 months.

    **Balanced conclusion:** Annual board reporting is a **minimum baseline**, appropriate for organizations beginning their quantum journey. Mature organizations in Phase 2 or 3 should supplement with **quarterly executive summaries** and real-time monitoring dashboards for cryptographic vulnerability exposure. The chapter's template is a starting point, not a ceiling.

---

## Level 5: Evaluate (Questions 21–25)

**Question 21.** A CFO proposes cutting the QC experimentation budget from 17.5% to 5% and redirecting the savings to PQC, arguing "we won't get ROI from quantum computing until the 2030s anyway." Evaluate this argument. Is the CFO correct, and what would you recommend?

??? success "Answer"
    The CFO's reasoning is **partially valid but strategically shortsighted**. It is true that broad gate-model ROI is unlikely before the 2030s. However, eliminating QC experimentation creates several problems: (1) **Talent atrophy** — quantum skills take years to build; deferring experimentation means the organization starts from zero when the technology matures; (2) **Missed near-term value** — quantum annealing (optimization) and early chemistry simulations may deliver ROI sooner than the CFO assumes, particularly in industries like logistics, finance, and pharma; (3) **Competitive positioning** — competitors who experiment now will have a significant head start in production deployment.

    **Recommendation:** Maintain at least 10–15% for QC experimentation, but be disciplined about targeting use cases with near-term viability (annealing, hybrid optimization) rather than speculative gate-model projects. The PQC budget increase is reasonable, but zero-sum cuts to experimentation are not.

**Question 22.** Evaluate whether a small business with a $500K annual quantum budget should join or establish a Quantum Center of Excellence (QCoE). What criteria should guide this decision?

??? success "Answer"
    For a **small business at the $500K budget floor**, establishing a dedicated QCoE is likely premature and cost-inefficient. Criteria for the decision:

    **Against a standalone QCoE:** (1) A QCoE requires dedicated staff (quantum engineers, security architects, project managers) whose salaries alone could consume the budget; (2) at this scale, quantum experimentation can be managed by a small cross-functional team without formal governance overhead; (3) the opportunity cost is high — every dollar spent on QCoE infrastructure is a dollar not spent on PQC migration.

    **For joining an industry consortium QCoE:** Small organizations can access shared research, benchmarking data, and talent networks without bearing full costs. Industry groups (e.g., financial services quantum working groups) offer this model.

    **Recommendation:** At $500K, assign quantum responsibility to an existing security or innovation leader, participate in an external consortium, and revisit establishing a formal QCoE once the budget exceeds $1–2M and Phase 2 activities justify dedicated governance.

**Question 23.** The chapter allocates only 5–10% of the quantum budget to sensing. Evaluate whether this is an appropriate allocation, given the chapter's own claim that quantum sensing is an "overlooked ROI today."

??? success "Answer"
    There is a **tension in the chapter's guidance** worth acknowledging: if quantum sensing genuinely offers the best near-term ROI of the three categories, a 5–10% allocation seems low.

    **Defense of the current allocation:** (1) PQC is a compliance mandate with hard deadlines — it must dominate the budget regardless of ROI arguments; (2) quantum sensing deployments are relatively inexpensive (sensor hardware is commercially available and does not require cloud compute); (3) most organizations have not completed a cryptographic inventory, making PQC the prerequisite.

    **Critique:** For organizations in industries where sensing ROI is clearest (defense, energy, healthcare), the 5–10% ceiling may be too conservative. A logistics company piloting quantum gravimetry for pipeline monitoring, for example, might rationally allocate 20% to sensing if the use case is well-defined.

    **Conclusion:** The 5–10% allocation is appropriate as a **default starting point** for organizations with no existing sensing programs, but should be treated as a floor rather than a cap for industries with strong sensing use cases. The chapter's framing as "overlooked" implies the allocation should scale up as awareness grows.

**Question 24.** Assess the quality of the board reporting template recommended in the chapter. Does a five-item annual report provide adequate transparency for a board member trying to understand quantum risk exposure?

??? success "Answer"
    **Strengths of the template:** A five-item structure imposes discipline and prevents information overload; it forces leadership to distill quantum risk to its most material elements; annual cadence aligns with typical board risk review cycles; standardization enables year-over-year comparison.

    **Weaknesses:** (1) Five items may be **too few** to capture the nuance of five distinct risk categories plus budget performance; (2) annual frequency is insufficient for rapidly evolving compliance deadlines (the January 2027 PQC deadline would warrant interim reporting in 2026); (3) without quantified metrics (e.g., percentage of systems migrated to PQC, number of algorithms inventoried), the report risks being qualitative and difficult to act upon; (4) board members without technical backgrounds may need contextual benchmarking (how does our progress compare to industry peers?).

    **Verdict:** The template is a useful **starting framework** but requires augmentation with quantitative KPIs, milestone tracking, and at least one interim update during active compliance periods. It is adequate for a board with low quantum sophistication but insufficient for organizations in Phase 2 or beyond.

**Question 25.** Evaluate the McKinsey ($46–97B by 2035) and BCG ($450–850B by 2040) market projections. What do the wide ranges in these estimates tell you about the reliability of quantum market forecasting, and how should a CXO weight these figures in decision-making?

??? success "Answer"
    The extremely wide ranges — McKinsey's estimate spans a **2x range** ($51B spread) and BCG's spans nearly **2x** ($400B spread) — reveal fundamental uncertainty in quantum market forecasting. This uncertainty stems from: (1) unknown timelines for fault-tolerant quantum hardware; (2) difficulty predicting which industries will adopt quantum applications and at what speed; (3) the difference between "economic value created" (BCG's framing) and "market revenue" being inconsistently defined across analysts; (4) forecasts made without a clear historical analog, making extrapolation unreliable.

    **Implications for CXO decision-making:** These figures should be used to **justify the strategic importance of quantum awareness**, not to size investment portfolios. A CXO who says "we're investing in quantum because it could be a $100B market" is making a reasonable strategic argument. A CXO who uses these figures to calculate expected ROI on a specific quantum project is misusing the data. Decisions should be anchored on **nearer-term certainties** (PQC compliance deadlines, specific use case pilots with measurable KPIs) rather than decade-long market projections.

---

## Level 6: Create (Questions 26–30)

**Question 26.** Design a quantum risk register for a large pharmaceutical company. Include at least one specific, quantified entry for each of the five risk categories, with likelihood, impact, and a proposed mitigation for each.

??? success "Answer"
    Sample risk register (entries are illustrative; exact numbers should be calibrated to the organization):

    | Risk Category | Risk Description | Likelihood (1–5) | Impact (1–5) | Risk Score | Mitigation |
    |---|---|---|---|---|---|
    | Cryptographic | RSA-2048 securing clinical trial data becomes decryptable by a CRQC by 2030; harvest-now-decrypt-later attack already occurring | 4 | 5 | 20 | Begin PQC migration of data-at-rest encryption in Phase 1; prioritize clinical and IP data stores |
    | Compliance | FDA and EMA adopt post-quantum requirements for drug submission systems; pharma fails to comply by 2027 deadline | 4 | 5 | 20 | Engage regulatory affairs team now; map submission systems to cryptographic inventory; begin pilot migration Q3 2026 |
    | Competitive | A competitor uses quantum chemistry (2027 horizon) to accelerate molecular simulation, shortening drug discovery timelines by 18 months | 3 | 4 | 12 | Establish QC cloud access (IBM Quantum or Braket) for chemistry use-case pilots in Phase 2; partner with quantum chemistry software vendors |
    | Supply Chain | CRO (contract research organization) partner has not adopted PQC for data transfer; creates vulnerability in shared clinical data pipeline | 3 | 4 | 12 | Add PQC readiness requirement to CRO contract renewals; audit top 10 partners by data sensitivity in Phase 1 |
    | Technology Investment | $3M investment in proprietary quantum annealing hardware from a startup vendor that pivots or fails | 2 | 4 | 8 | Follow cloud-first strategy; cap hardware investment at 5% of quantum budget until vendor viability is demonstrated over 3+ years |

**Question 27.** Develop a three-year quantum roadmap (2027–2029) for a mid-sized logistics company (1,000 employees, $50M IT budget, $1.5M annual quantum budget). Include phase milestones, budget allocation, vendor selections, and success metrics.

??? success "Answer"
    **Quantum Roadmap: MidCo Logistics (2027–2029)**

    **Annual Budget:** $1.5M | **Allocation:** PQC $975K (65%), QC Experimentation $262.5K (17.5%), Sensing $112.5K (7.5%), Monitoring $112.5K (7.5%), Contingency $37.5K (2.5%)

    ---

    **2027 — Phase 2 Acceleration (Year 1)**

    *Milestones:*
    - Complete PQC migration of TLS certificates across all customer-facing APIs and partner EDI connections (vendor: Cloudflare or Keyfactor)
    - Launch quantum annealing pilot for route optimization using D-Wave Leap; compare against current OR-Tools solver on 50-vehicle fleet
    - Deploy quantum-enhanced GPS timing (sensing) at 2 distribution centers for precision synchronization
    - Establish QCoE with 3 FTEs (security architect, quantum data scientist, project lead)

    *Vendors:* D-Wave Leap (annealing), Keyfactor (PQC certificate management), Cloudflare (TLS), AWS Braket (backup gate-model access)

    *Success Metrics:* 100% of external APIs on PQC TLS; route optimization pilot shows ≥5% cost reduction; sensing deployment reduces GPS drift incidents by 50%

    ---

    **2028 — Phase 2 Acceleration (Year 2)**

    *Milestones:*
    - Migrate internal data-at-rest encryption (warehouse management system, HR) to NIST PQC algorithms (CRYSTALS-Kyber/Dilithium)
    - Expand annealing to dynamic load optimization across full fleet (500+ vehicles); integrate with real-time traffic data
    - Pilot CUDA-Q hybrid classical-quantum solver for demand forecasting in partnership with NVIDIA
    - Audit top 20 supply chain partners for PQC compliance; require remediation plans from non-compliant vendors

    *Vendors:* IBM Quantum Safe or Thales (data-at-rest), NVIDIA CUDA-Q, D-Wave Leap (production annealing)

    *Success Metrics:* 80% of internal systems on PQC; annealing in production saving ≥$500K/year in fuel and routing costs; 20/20 supply chain partners audited

    ---

    **2029 — Phase 3 Production Readiness**

    *Milestones:*
    - Achieve full cryptographic agility: all systems using algorithm-agile libraries, PQC migration 100% complete
    - Promote quantum annealing to Tier 1 operational system with SLA; deprecate legacy OR-Tools solver
    - Publish annual board quantum risk report; present to audit committee
    - Evaluate gate-model QC for next-generation demand sensing (Phase 4 planning)

    *Success Metrics:* Zero cryptographic compliance findings in annual audit; annealing system uptime ≥99.5%; board report completed and accepted; Phase 4 business case submitted

**Question 28.** Design a board presentation on quantum risk for a financial services company's annual board meeting. Outline the five agenda items, the key data point or visual for each item, and the ask (decision or acknowledgment) from the board for each item.

??? success "Answer"
    **Board Quantum Risk Update — Annual Presentation**
    *Presenter: CISO / CTO | Duration: 20 minutes + 10 minutes Q&A*

    ---

    **Item 1: Quantum Threat Landscape**

    *Key Data Point:* McKinsey $46–97B quantum market by 2035; CRQC timeline estimates (IBM, Google roadmaps); January 2027 PQC compliance deadline.

    *Visual:* Timeline graphic showing CRQC probability curve overlaid with the organization's current encryption migration progress.

    *Board Ask:* **Acknowledgment** that quantum risk is material and warrants dedicated governance; no vote required.

    ---

    **Item 2: PQC Migration Status**

    *Key Data Point:* Percentage of systems migrated to NIST PQC algorithms (e.g., "42% complete, on track for 90% by Q4 2026 deadline"); cryptographic inventory coverage (systems audited vs. total).

    *Visual:* Progress bar dashboard by system category (customer-facing, internal, supply chain partners).

    *Board Ask:* **Approval** of $750K supplemental budget to accelerate migration of legacy core banking system identified as high-risk.

    ---

    **Item 3: Quantum Risk Register Summary**

    *Key Data Point:* Top 3 risks by risk score from the five-category register; year-over-year change in aggregate risk score.

    *Visual:* Heat map of five risk categories (likelihood vs. impact) with directional arrows showing improvement or deterioration since last report.

    *Board Ask:* **Acknowledgment** of risk register and **approval** of proposed mitigation priorities for the coming year.

    ---

    **Item 4: Competitive and Investment Positioning**

    *Key Data Point:* Status of QC experimentation pilots (ROI achieved or projected); comparison to named industry peers' quantum programs (if public); PQC market at $4.6B by 2030.

    *Visual:* Competitive positioning matrix: our organization vs. peer set on two axes — PQC migration progress and QC experimentation maturity.

    *Board Ask:* **Strategic discussion** on whether to accelerate QC investment to close competitive gap; no formal vote, but directional guidance sought.

    ---

    **Item 5: Supply Chain Quantum Risk**

    *Key Data Point:* Number of critical vendors audited for PQC compliance; percentage compliant; top 3 non-compliant vendors and remediation status.

    *Visual:* Supply chain risk heatmap showing vendor tier vs. data sensitivity vs. PQC readiness.

    *Board Ask:* **Policy approval** to include mandatory PQC compliance requirements in all new and renewed vendor contracts above $500K annual value.

**Question 29.** Create a vendor evaluation scorecard for selecting a PQC solution provider. Define five evaluation criteria, explain why each matters, assign weights that sum to 100%, and score two hypothetical vendors to demonstrate its use.

??? success "Answer"
    **PQC Vendor Evaluation Scorecard**

    | Criterion | Weight | Rationale |
    |---|---|---|
    | NIST Algorithm Compliance | 30% | Vendor must support finalized NIST PQC standards (CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+); non-compliant vendors create migration debt |
    | Crypto-Agility Architecture | 25% | Solution must support algorithm swapping without system redesign; critical given evolving standards |
    | Integration with Existing PKI/IAM | 20% | Seamless integration with current certificate management, LDAP, and identity infrastructure reduces deployment risk and cost |
    | Vendor Financial Stability & Support | 15% | PQC migration spans 3–5 years; vendor must have credible long-term viability and enterprise SLA commitments |
    | Pricing Model & Total Cost of Ownership | 10% | Subscription, per-certificate, or perpetual licensing must fit budget model; hidden costs (professional services, hardware) must be transparent |

    ---

    **Scoring Example (1–5 scale per criterion):**

    | Criterion | Weight | Vendor A (IBM Quantum Safe) | Weighted A | Vendor B (Startup PQC Co.) | Weighted B |
    |---|---|---|---|---|---|
    | NIST Compliance | 30% | 5 | 1.50 | 4 | 1.20 |
    | Crypto-Agility | 25% | 5 | 1.25 | 3 | 0.75 |
    | PKI/IAM Integration | 20% | 4 | 0.80 | 2 | 0.40 |
    | Vendor Stability | 15% | 5 | 0.75 | 2 | 0.30 |
    | Pricing/TCO | 10% | 3 | 0.30 | 5 | 0.50 |
    | **Total** | **100%** | | **4.60** | | **3.15** |

    **Conclusion:** Vendor A scores significantly higher (4.60 vs. 3.15) despite a weaker pricing score. For a multi-year compliance program, stability and integration quality outweigh upfront cost savings from a less-established vendor. Vendor B might be reconsidered in Phase 2 if it matures and obtains certifications.

**Question 30.** Synthesize the three central insights from Chapter 15 into a cohesive strategic memo of approximately 300 words addressed to the CEO of a mid-sized manufacturing company. The memo should explain why quantum strategy matters now, what actions are urgent, and what can be deferred.

??? success "Answer"
    **MEMORANDUM**

    **To:** CEO, MidCo Manufacturing
    **From:** Chief Information Officer
    **Re:** Quantum Computing Strategy — Why We Must Act in 2026
    **Date:** Q1 2026

    ---

    Three developments make 2026 the right moment to formalize our quantum strategy.

    **First, post-quantum cryptography is no longer optional.** The January 2027 deadline for PQC compliance means that our RSA and ECC encryption — protecting everything from customer contracts to supplier communications — must be migrated to quantum-resistant algorithms within the next 12 months. This is not a technology investment; it is a compliance imperative on par with GDPR or SOX. We recommend allocating $750,000 (65% of our $1.15M quantum budget) to begin cryptographic inventory and PQC migration immediately, prioritizing our customer-facing EDI systems and partner API connections.

    **Second, quantum value will not arrive all at once — and some of it is available today.** Quantum annealing for production scheduling and logistics optimization is commercially viable on platforms like D-Wave Leap right now. We do not need to wait for fault-tolerant quantum computers to begin capturing value. A $200,000 pilot in Phase 1 could reduce scheduling costs by 5–10% — a return measurable within 18 months. Gate-model quantum computing, by contrast, will not be broadly useful in manufacturing until the early 2030s. We should experiment at low cost now to build capability, but we should not over-invest.

    **Third, quantum sensing is our least obvious, most overlooked opportunity.** Quantum gravimeters and magnetometers are available today and can improve predictive maintenance accuracy in our heavy equipment lines. A $100,000 sensing pilot at our largest facility could validate significant preventive maintenance savings with minimal technology risk.

    **What can wait:** Dedicated quantum hardware, a formal Quantum Center of Excellence, and gate-model application development can all be deferred to 2027–2028. Our Phase 1 focus is PQC compliance, one annealing pilot, and one sensing evaluation.

    I recommend approving the Phase 1 budget and roadmap at the April board meeting.
