---
title: "Chapter 13 Quiz: Enterprise Use Cases"
chapter: 13
quiz_questions: 30
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
---

# Chapter 13 Quiz: Enterprise Use Cases — Where Quantum Computing Creates and Destroys Value

This quiz covers financial services quantum use cases, pharmaceutical applications, quantum sensing commercial maturity, optimization and production deployments, and the critical domain of where quantum computing does not help. Questions are arranged by Bloom's Taxonomy level, five questions per level.

---

## Level 1 — Remember (Recall of Key Facts)

**Q1.** What is the native problem format that quantum annealers (and QAOA) are designed to solve, and which optimization problems in logistics and finance naturally map to this format?

A) Satisfiability Problem (SAT) — applied to database query optimization
B) Quadratic Unconstrained Binary Optimization (QUBO) — applied to portfolio construction, vehicle routing, and resource scheduling
C) Linear Programming (LP) — applied to supply chain network design
D) Semidefinite Programming (SDP) — applied to financial derivatives pricing

**Correct answer: B**
*QUBO (Quadratic Unconstrained Binary Optimization) is the native format for quantum annealers like D-Wave and a natural target for QAOA. Portfolio construction, vehicle routing, crew scheduling, and facility location problems can all be formulated as QUBO instances.*

---

**Q2.** Which company holds the distinction of the first commercially demonstrated quantum advantage in GPS-denied navigation, recognized as TIME's Best Innovation of 2025?

A) SandboxAQ
B) Infleqtion
C) Q-CTRL
D) IonQ

**Correct answer: C**
*Q-CTRL achieved the first commercial quantum advantage in GPS-denied navigation, with a 50–100× improvement in inertial navigation accuracy. SandboxAQ's AQNav has accumulated 450+ flight hours but was not cited as the TIME recognition.*

---

**Q3.** McKinsey estimates quantum computing could generate what level of economic value in financial services by 2035?

A) $40–60 billion
B) $400–600 billion
C) $4–6 trillion
D) $4–6 billion

**Correct answer: B**
*McKinsey estimates $400–600 billion in economic value in financial services by 2035, with primary value drivers in portfolio optimization, risk analysis, and derivatives pricing.*

---

**Q4.** What algorithm provides the quantum speedup for Monte Carlo simulation acceleration in financial risk analysis?

A) Grover's algorithm — provides quadratic speedup for unstructured search
B) Shor's algorithm — provides exponential speedup for factoring
C) Quantum Amplitude Estimation (QAE) — provides quadratic speedup, achieving $\epsilon$ accuracy in $O(1/\epsilon)$ evaluations
D) Variational Quantum Eigensolver (VQE) — provides simulation speedup for financial models

**Correct answer: C**
*Quantum Amplitude Estimation (QAE) provides a quadratic speedup over classical Monte Carlo: $O(1/\epsilon)$ quantum evaluations versus $O(1/\epsilon^2)$ classical samples for $\epsilon$ accuracy. This is the basis for quantum speedup in credit risk, VaR, and derivatives pricing.*

---

**Q5.** What is the quantum sensing market size in 2025, and what is the projected market size by 2035 according to McKinsey?

A) $54 million in 2025; projected $700 million by 2035
B) $454 million in 2025; projected $7–10 billion by 2035
C) $4.5 billion in 2025; projected $70 billion by 2035
D) $4.5 million in 2025; projected $45 million by 2035

**Correct answer: B**
*McKinsey's Quantum Technology Monitor (2025) reports the quantum sensing market at $454 million in 2025, projected to reach $7–10 billion by 2035.*

---

## Level 2 — Understand (Explain Concepts)

**Q6.** Explain why cytochrome P450 enzymes represent a high-value target for quantum simulation in pharmaceutical chemistry.

A) They are present in all human cells and therefore universally relevant to drug design
B) They metabolize approximately 75% of approved drugs and contain iron-porphyrin active sites with strongly correlated electrons that classical DFT methods cannot accurately simulate
C) They are simple enough for NISQ-era hardware to simulate without error correction
D) They represent a purely classical chemistry problem where quantum simulation offers no advantage

**Correct answer: B**
*Cytochrome P450 enzymes are involved in the metabolism of ~75% of all approved drugs, making them critical targets for drug design. Their iron-porphyrin active sites contain transition metals with strongly correlated electrons — precisely the electronic structure problem where classical DFT approximations fail qualitatively and quantum simulation is expected to provide accurate results.*

---

**Q7.** What is the strategic importance of "quantum-inspired algorithms" like Toshiba SQBM+ and Fujitsu Digital Annealer for enterprise optimization programs?

A) They run on quantum hardware but are more affordable than gate-based quantum computers
B) They are classical algorithms designed using quantum computing principles that deliver near-term ROI without quantum hardware, serving as a bridge to actual quantum deployment while building problem-formulation expertise
C) They are exclusively useful for financial optimization and have no application in logistics
D) They require quantum hardware to achieve the 10–30% efficiency improvements reported

**Correct answer: B**
*Quantum-inspired algorithms implement quantum optimization principles (bifurcation dynamics, simulated annealing variants) on classical hardware. They deliver measurable efficiency improvements (10–30% in industrial deployments) without quantum hardware costs, quantum expertise requirements, or cloud quantum service dependencies — making them the pragmatic starting point for enterprise optimization programs.*

---

**Q8.** Why does the Haber-Bosch nitrogen fixation process represent a compelling target for quantum computing, despite the calculation requiring Blue Jay-class hardware (2033+)?

A) The Haber-Bosch process uses quantum mechanical principles that are already partly quantum-computed
B) The FeMoco active site of nitrogenase — the biological catalyst that achieves ambient nitrogen fixation — contains a complex iron-molybdenum cofactor that classical quantum chemistry cannot accurately simulate at the scale needed for catalyst design. Accurately simulating FeMoco could enable bio-inspired catalyst design that eliminates 1–2% of global energy consumption.
C) Nitrogen fixation is a simple classical chemistry problem that quantum computers could solve on current NISQ hardware
D) The value is primarily in simulation speed, not accuracy; classical DFT already produces correct results

**Correct answer: B**
*FeMoco's strongly correlated electronic structure defeats classical quantum chemistry approximations. A quantum simulation of sufficient accuracy could guide the design of synthetic catalysts that replicate biological nitrogen fixation at ambient conditions, eliminating the Haber-Bosch process's enormous energy consumption (~150M tonnes of CO₂ per year). The required ~4 million physical qubits places this in the Blue Jay (2033+) era.*

---

**Q9.** Explain the dequantization result (Tang, 2021) and its significance for quantum machine learning investment decisions.

A) Tang proved that quantum computers cannot be used for any machine learning task
B) Tang showed that several quantum ML algorithms claiming exponential speedup (quantum PCA, quantum recommendation systems) can be matched by classical randomized algorithms using polylogarithmic sampling — eliminating the theoretical basis for those claimed exponential advantages and raising the evidentiary bar for QML claims
C) Tang proved that quantum ML achieves a quadratic speedup for all neural network training tasks
D) The dequantization result only applies to academic algorithms and has no impact on commercial QML products

**Correct answer: B**
*Tang's 2021 result showed that the "exponential quantum speedups" claimed by several high-profile quantum ML algorithms relied on assumptions (quantum RAM, specific state preparation) that classical algorithms could exploit equivalently. This fundamentally changed the theoretical landscape for QML: algorithms that seemed to offer exponential advantage were revealed to depend on conditions that classical randomized algorithms could also satisfy.*

---

**Q10.** What is the key distinction between quantum computing applications in pharmaceutical chemistry and quantum sensing applications, in terms of commercial maturity?

A) Quantum sensing is more commercially mature — it delivers measured advantage in production deployments today; quantum computing chemistry applications are demonstrated at research scale but require fault-tolerant hardware for production pharmaceutical impact
B) Quantum computing chemistry applications are commercially deployed; quantum sensing remains purely experimental
C) Both are equally mature and ready for enterprise production deployment today
D) Neither is commercially mature; both require 2030+ hardware

**Correct answer: A**
*Quantum sensing (navigation, timing, gravimetry, medical imaging) is commercially deployed today with measurable advantages over classical instruments. Quantum computing for pharmaceutical chemistry has demonstrated promising results (IonQ/AstraZeneca Suzuki-Miyaura, IBM chemistry roadmap) but production-scale pharmaceutical advantage awaits fault-tolerant hardware (IBM 2026–2030 window).*

---

## Level 3 — Apply (Use Knowledge in New Situations)

**Q11.** A pharmaceutical company is deciding where to apply quantum computing resources first. Their pipeline includes: (a) simulating a simple organic molecule for lead optimization, (b) studying a metalloenzyme drug target involving a copper center, (c) optimizing a delivery route for clinical trial logistics, and (d) predicting the excited-state behavior of a photosensitizer. Which problems should be prioritized for quantum computing and which for classical methods?

A) All four should use quantum computing to maximize quantum exposure
B) Problems (b) and (d) are quantum-priority (strongly correlated metalloenzyme and excited-state dynamics); problem (c) is a classical optimization or quantum-inspired target; problem (a) is classical-priority (simple organic molecule handled well by DFT)
C) Only problem (c) should use quantum because logistics is the most commercially proven quantum application
D) Problems (a) and (c) should use quantum; metalloenzyme simulation requires classical DFT

**Correct answer: B**
*The quantum-first selection criterion is: strongly correlated electron systems and excited states where classical methods are known to fail. Metalloenzyme copper centers (b) and excited-state photosensitizer dynamics (d) meet this criterion. Simple organic molecule lead optimization (a) is well-served by DFT. Logistics optimization (c) is a quantum annealing or quantum-inspired target, not gate-model quantum chemistry.*

---

**Q12.** A logistics company wants to deploy quantum optimization for their 500-truck delivery fleet. They have no quantum expertise and a modest budget. Design an appropriate near-term strategy.

A) Immediately purchase a D-Wave QPU system and connect it to the fleet management system
B) Begin with Toshiba SQBM+ or Fujitsu Digital Annealer (quantum-inspired, runs on classical hardware), formulate the VRP as a QUBO problem, benchmark against Gurobi/OR-Tools, and measure ROI — then evaluate D-Wave Leap hybrid if quantum-inspired ROI justifies further investment
C) Wait until fault-tolerant quantum computers are available in 2030+ before optimizing routing
D) Use QAOA on IBM Quantum cloud service; it handles VRP natively at commercial scale

**Correct answer: B**
*The appropriate near-term strategy begins with quantum-inspired algorithms (no quantum hardware required) to build QUBO formulation expertise and measure optimization improvement against classical benchmarks. This provides near-term ROI while creating the problem-formulation foundation for eventual quantum hardware deployment. D-Wave Leap hybrid is a natural next step if business justification warrants.*

---

**Q13.** A bank's risk management team is evaluating quantum computing for accelerating their VaR (Value at Risk) Monte Carlo calculations. Their current classical calculation runs 10 million scenarios and takes 45 minutes. The quantum team claims QAE will reduce this to 100 equivalent quantum evaluations. Is this technically accurate, and under what conditions would the speedup materialize?

A) The claim is completely inaccurate; QAE provides no speedup for financial Monte Carlo
B) The claimed speedup is mathematically correct for QAE versus classical Monte Carlo at matched accuracy ($O(1/\epsilon)$ vs $O(1/\epsilon^2)$ evaluations), but the speedup requires fault-tolerant quantum hardware with error correction — NISQ-era hardware cannot maintain sufficient coherence for the required circuit depth at production problem scales
C) The speedup is accurate and available today on NISQ hardware
D) The speedup requires 10 billion physical qubits and will not be available in this century

**Correct answer: B**
*QAE's $O(1/\epsilon)$ vs $O(1/\epsilon^2)$ comparison is mathematically correct — for $\epsilon = 0.01$ accuracy, this represents 100 quantum vs 10,000 classical evaluations. However, the QAE circuit depth required to achieve this speedup at production VaR accuracy requires fault-tolerant logical qubits. NISQ-era noise limits achievable circuit depth, preventing the full theoretical speedup from materializing. The advantage is genuine but hardware-gated to the 2026–2030 window.*

---

**Q14.** A manufacturing company considers investing in quantum computing to speed up its SQL database queries and business intelligence reporting. Using the principles from Section 13.6, advise on the appropriateness of this investment.

A) This is an excellent quantum computing application; database queries benefit significantly from Grover's algorithm
B) This investment is not appropriate. Database queries exploit indexed structures (B-trees, hash tables) that already achieve $O(\log N)$ or better retrieval — far superior to Grover's $O(\sqrt{N})$ unstructured search. BI and analytics workloads are classical-compute problems with no quantum speedup. Investment should be directed to classical database acceleration (columnar storage, in-memory analytics, GPU-accelerated OLAP).
C) The company should wait for quantum databases to become available in 2035
D) This is appropriate if the database exceeds 1 billion records, at which point Grover's advantage becomes significant

**Correct answer: B**
*Structured database queries with indexes are already near-optimal classically. Grover's algorithm addresses unstructured search (no index, random access). Real-world database systems use indexes that provide $O(\log N)$ or $O(1)$ retrieval — Grover's $O(\sqrt{N})$ is slower than an indexed lookup for any reasonable dataset size. BI and analytics workloads should be accelerated with classical tools (DuckDB, Snowflake, GPU-accelerated engines).*

---

**Q15.** An airline operations team is evaluating quantum optimization for crew scheduling. They have 3,000 crew members, 800 daily flights, and regulatory constraints (rest requirements, crew qualifications, union rules). Which quantum approach is most appropriate today?

A) QAOA on a 50-qubit IBM quantum system — enough qubits to handle the full problem
B) D-Wave Leap hybrid solver — partitions the combinatorial scheduling problem between quantum annealing (for the combinatorial structure) and classical computing (for constraint satisfaction); this is the architecture in production at airlines today
C) Wait for fault-tolerant quantum computers; current hardware cannot handle the problem
D) VQE on IonQ trapped-ion hardware — best suited for discrete optimization problems

**Correct answer: B**
*D-Wave Leap hybrid solvers are the appropriate choice for production-scale combinatorial scheduling today. D-Wave has disclosed a major U.S. airline as a production customer for crew scheduling and logistics optimization using this exact architecture. The hybrid approach handles problem sizes far beyond current pure-quantum capabilities by using classical optimization for the large-scale structure and quantum annealing for the most combinatorially dense subproblems.*

---

## Level 4 — Analyze (Break Down and Examine)

**Q16.** Analyze the difference between the quantum advantage cases for (a) portfolio optimization using QAOA/annealing and (b) derivatives pricing using QAE. Which has a stronger current advantage, and why?

A) Derivatives pricing (QAE) has a stronger current advantage because it runs on available NISQ hardware
B) Portfolio optimization via D-Wave hybrid has a demonstrated production advantage today because it exploits hybrid quantum-classical architecture suited to current hardware; QAE for derivatives pricing has a mathematically proven but hardware-gated speedup that requires fault-tolerant circuits — the theoretical advantage is larger but the practical advantage awaits better hardware
C) Both have equally strong advantages today on NISQ hardware
D) Neither has any demonstrated advantage; all quantum finance applications are purely theoretical

**Correct answer: B**
*D-Wave hybrid portfolio optimization has production deployment evidence (Intesa Sanpaolo, D-Wave customer disclosures) using today's available hardware. QAE's quadratic Monte Carlo speedup is mathematically provable and compelling, but requires fault-tolerant circuits to fully materialize — current NISQ hardware limits achievable circuit depth, reducing the practical speedup below the theoretical maximum. Portfolio optimization's production maturity is ahead of QAE's today.*

---

**Q17.** Analyze the claim: "Quantum computing will give our ML team a major advantage because we can train larger neural networks faster on quantum hardware." What is wrong with this reasoning, and what would be a more appropriate quantum ML strategy?

A) The reasoning is correct; quantum backpropagation is proven to be faster than classical gradient descent
B) The reasoning is flawed on two counts: (1) there is no proven quantum speedup for gradient descent or backpropagation — the core operations of neural network training; (2) dequantization results have eliminated several claimed QML speedups. A more appropriate strategy focuses on quantum kernel methods for specific structured problems, not replacing classical neural network training.
C) The reasoning is correct for transformer architectures but incorrect for CNNs
D) The claim is valid only if the neural networks have more than 1 trillion parameters

**Correct answer: B**
*Neural network training via gradient descent and backpropagation has no proven quantum speedup. Tang's dequantization results eliminated several quantum ML algorithms' claimed advantages. The most credible near-term QML application is quantum kernel methods for specific problem types — not general neural network training acceleration.*

---

**Q18.** SandboxAQ's AQNav has accumulated 450+ flight hours with the USAF, Boeing, and Airbus. Analyze what this milestone means for enterprise adoption of quantum navigation, and contrast this with the commercial readiness of quantum computing for aerospace optimization.

A) Both quantum navigation and quantum computing for aerospace optimization are at similar commercial readiness stages
B) AQNav's 450+ flight hours represents operational maturity — tested in real flight conditions with major aerospace partners, approaching certification readiness. This contrasts sharply with quantum computing for aerospace optimization (route optimization, maintenance scheduling), which remains at pilot/research stage. Quantum sensing has a 5–7 year commercial maturity lead over quantum computing in this sector.
C) AQNav's flight hours are insufficient to draw conclusions about commercial readiness
D) Quantum computing for aerospace optimization is more commercially mature than quantum navigation

**Correct answer: B**
*450+ operational flight hours with USAF, Boeing, and Airbus represents genuine operational testing in real-world conditions — a maturity level that quantum computing applications in aerospace have not reached. Quantum sensing (specifically quantum navigation) has demonstrated commercial advantage years ahead of quantum gate-model computing in this sector.*

---

**Q19.** A quantum vendor claims their system achieves "10× speedup for portfolio optimization" compared to classical methods. Analyze what additional information is needed to evaluate this claim properly.

A) Only the qubit count of the quantum system is needed to evaluate the claim
B) Several pieces of information are needed: (1) What is the baseline classical method — a random algorithm or best-in-class (Gurobi, CPLEX)? (2) What is the problem size — toy instances or production-scale portfolios? (3) What type of speedup — wall-clock time, solution quality, or both? (4) Is this pure quantum or hybrid quantum-classical? (5) Has the result been independently replicated? A 10× speedup against Gurobi at production scale would be highly significant; against an unoptimized baseline at toy scale it is unremarkable.
C) The vendor's certification by a standards body is sufficient to validate the claim
D) Only the accuracy of the portfolio output matters; speedup claims are irrelevant

**Correct answer: B**
*Quantum advantage claims require careful scrutiny on: (1) classical baseline quality (optimized vs. naive), (2) problem scale (toy vs. production), (3) what is measured (time, quality, or both), (4) hybrid vs. pure quantum architecture, and (5) independent replication. The absence of any of these clarifications makes a speedup claim uninterpretable.*

---

**Q20.** Analyze the strategic significance of quantum sensing for a company that operates oil and gas exploration. Consider both the quantum gravimetry application and the GPS-denied navigation application. What specific operational improvements are achievable, and what engagement path is appropriate?

A) Neither application is relevant to oil and gas; quantum sensing only applies to military and pharmaceutical sectors
B) Quantum gravimetry enables subsurface mapping at higher resolution and lower cost than seismic surveying, potentially reducing dry well rates by identifying reservoir structures more accurately. GPS-denied navigation improves positioning accuracy for autonomous drilling and subsea operations. Both applications are commercially available today and represent ROI-positive engagements: contact quantum gravimetry vendors (Muquans, Q-NEXT) for exploration POC and Q-CTRL/SandboxAQ for subsea/downhole navigation.
C) Quantum sensing is only applicable after fault-tolerant quantum computers are deployed
D) The quantum gravimetry advantage is theoretical; no operational quantum gravimeters are available

**Correct answer: B**
*Quantum gravimeters provide measurement precision that reveals subsurface geological structures invisible to classical instruments — directly relevant to exploration success rates and dry well reduction. GPS-denied quantum navigation addresses real operational challenges in subsea and downhole environments. Both technologies are commercially available and ROI-positive for oil and gas applications.*

---

## Level 5 — Evaluate (Judge and Critique)

**Q21.** Evaluate the following CTO statement: "We're investing in quantum computing for our e-commerce recommendation engine because quantum ML will give us exponential speedup in matching customers to products." Is this investment justified?

A) The investment is justified; quantum recommendation systems are among the most proven QML applications
B) The investment is not well-justified. E-commerce recommendation systems are matrix factorization and collaborative filtering problems — precisely the class where Tang's dequantization results eliminated claimed quantum exponential advantages. Furthermore, modern recommendation systems at scale use GPU-accelerated classical ML with results that quantum hardware cannot currently match. Investment should target classical ML infrastructure and, if quantum exploration is desired, focus on genuinely quantum-hard problems.
C) The investment is justified if the product catalog exceeds 10 million items
D) The investment is justified as a research initiative but not a production deployment

**Correct answer: B**
*Quantum recommendation systems were explicitly cited in Tang's dequantization paper as a case where the claimed exponential quantum speedup can be matched by classical randomized algorithms. E-commerce recommendation is a high-data, high-throughput problem well-served by classical GPU acceleration. The CTO's premise rests on a quantum ML claim that has been theoretically undermined.*

---

**Q22.** A pharmaceutical company's computational chemistry team argues: "We should apply quantum computing to all our molecular simulation work because it will be more accurate across the board." Evaluate this proposal.

A) The proposal is correct; quantum computing provides higher accuracy for all molecular simulation
B) The proposal misallocates quantum resources. DFT already provides sufficient accuracy for approximately 80% of pharmaceutical molecular simulations — applying quantum computing here wastes expensive and scarce quantum resources on problems classical methods already solve well. Quantum simulation should be reserved for the specific problem class where classical methods fail qualitatively: strongly correlated systems, transition metal active sites, and excited-state dynamics. The correct approach is to identify the 20% of simulations where DFT is acknowledged to fail and apply quantum to those targets only.
C) The proposal is incorrect because quantum computing is less accurate than DFT for all molecules
D) The proposal is correct only if the company is using NISQ hardware; fault-tolerant systems should be used for all simulations

**Correct answer: B**
*The chapter is explicit: "Quantum computing will enable calculations that were previously impossible — not calculations that were already tractable." Applying quantum computing to problems DFT already handles accurately wastes quantum resources (expensive, scarce, lower throughput than classical). The strategic value is in filling the DFT capability gaps, not replacing DFT's extensive successful applications.*

---

**Q23.** Evaluate whether a company with a 200-truck delivery fleet should invest in D-Wave Leap hybrid quantum optimization for vehicle routing, or in Gurobi (a classical mixed-integer programming solver). What factors determine the right choice?

A) D-Wave Leap is always superior for VRP; invest in quantum regardless of fleet size
B) The decision depends on: (1) problem structure — if routes have strong combinatorial interdependencies (time windows, capacity constraints, traffic interaction), D-Wave hybrid may outperform Gurobi; (2) current Gurobi implementation quality — many organizations deploy Gurobi with poor formulations, so proper Gurobi tuning should precede quantum evaluation; (3) ROI measurement — if Gurobi already achieves near-optimal solutions, quantum overhead may not justify the investment; (4) budget — D-Wave Leap has ongoing cloud costs versus a one-time Gurobi license. The pragmatic approach: benchmark properly-tuned Gurobi against D-Wave hybrid on a representative sample of actual routes before committing.
C) Gurobi is always superior; D-Wave does not help with VRP
D) Fleet size is the only factor; quantum is always better for fleets larger than 100 trucks

**Correct answer: B**
*Neither Gurobi nor D-Wave is universally superior. The appropriate decision is empirical: benchmark both against actual production problem instances with proper implementation quality on each side. Gurobi with poor formulations will lose to a well-configured D-Wave hybrid, and vice versa. The benchmark should use wall-clock time, solution quality, and cost-per-solution-improvement as metrics.*

---

**Q24.** A board is considering whether to invest $5 million in quantum computing pilots for financial risk modeling over the next 3 years, versus investing the same amount in PQC migration. Evaluate the strategic priorities.

A) The quantum computing investment is higher priority; PQC migration can wait until 2035
B) PQC migration is the higher priority investment for three reasons: (1) it addresses an active, quantified risk (HNDL) with hard regulatory deadlines (CNSA 2.0 by 2027, NIST deprecation in 2030); (2) ROI is measurable and compliance-driven; (3) failure to migrate creates irreversible data exposure and regulatory non-compliance. Quantum risk modeling pilots are valuable for building expertise but address future, uncertain advantage. The two investments are not mutually exclusive, but PQC migration should be funded first and as a non-optional compliance program, not a discretionary pilot.
C) Both investments are equally important and should receive equal funding
D) Quantum risk modeling is higher priority because it generates revenue; PQC is only a cost

**Correct answer: B**
*PQC migration has hard regulatory deadlines, active threat exposure (HNDL), and compliance consequences. Quantum risk modeling has potential future value but uncertain timing, uncertain advantage magnitude, and no regulatory deadline. Risk-adjusted ROI favors PQC migration, and the framing as "either/or" is a false choice — PQC migration is a compliance obligation, quantum pilots are an exploration investment that can proceed at smaller scale.*

---

**Q25.** IonQ, AstraZeneca, and AWS achieved approximately 20× speedup for a specific Suzuki-Miyaura reaction simulation (2025). Critically evaluate whether this result justifies a pharmaceutical company beginning large-scale quantum computing deployments for drug discovery.

A) Yes — a 20× speedup justifies immediate large-scale deployment across all simulations
B) The result is significant but does not justify large-scale deployment for several reasons: (1) the 20× speedup was demonstrated for a specific molecular fragment of the Suzuki-Miyaura reaction, not for full drug candidate simulations; (2) production pharmaceutical simulations involve far larger molecular systems than research demonstrations; (3) the result must be independently replicated and extended to relevant drug target classes before informing deployment; (4) the speedup may be hardware-limited at larger scale. The appropriate response is to expand pilot scope to additional reaction types and drug target classes, establish a quantum chemistry center of excellence, and plan for fault-tolerant hardware as the production deployment platform.
C) The result has no significance because IonQ is not a credible vendor
D) A 20× speedup is below the threshold needed to justify any pharmaceutical quantum investment

**Correct answer: B**
*Research demonstrations on specific molecular fragments are genuine scientific progress but not sufficient to justify production-scale deployment decisions. The gap between "we demonstrated 20× speedup on a fragment of one reaction" and "we can accelerate our drug discovery pipeline" involves scaling to larger molecules, demonstrating on drug-relevant targets, independent replication, and hardware maturation. The appropriate response is continued, expanded pilot work — not either dismissal or immediate large-scale deployment.*

---

## Level 6 — Create (Synthesize New Solutions)

**Q26.** Design a 3-year quantum strategy roadmap for a mid-size bank ($15B assets, 600 employees) covering: (a) quantum sensing opportunities, (b) quantum computing pilots, and (c) PQC migration. Allocate budget ($500K/year) and prioritize by risk-adjusted ROI.

**Model answer:**

*Year 1 ($500K):*

- **PQC migration (mandatory, $300K)**: CBOM discovery (automated, $50K tooling + $100K personnel), begin ML-KEM hybrid deployment on all internet-facing TLS endpoints (OpenSSL 3.5 upgrade, $150K engineering). This addresses HNDL risk and EU DORA requirements — non-discretionary.

- **Quantum sensing evaluation ($100K)**: Engage optical atomic clock vendors for precision timestamping POC for HFT regulatory compliance. Issue RFI to two vendors ($0), conduct 60-day POC ($100K). This addresses a real commercial need with proven technology.

- **Quantum computing education ($100K)**: Train 2–3 quant researchers in QUBO formulation and D-Wave Leap ($30K training, $70K cloud access). Build internal portfolio optimization QUBO formulation on a specific asset class.

*Year 2 ($500K):*

- **PQC migration continued ($200K)**: CA hierarchy upgrade, ML-DSA code signing deployment, VPN migration (covers regulatory milestones for 2027 CNSA compliance).

- **Quantum sensing deployment ($150K)**: Deploy precision timing solution if Year 1 POC successful ($150K implementation).

- **D-Wave pilot ($150K)**: Benchmark D-Wave Leap hybrid for portfolio optimization on a real asset class against Gurobi. Measure solution quality and time vs. current classical tools. Published ROI metric required for Year 3 funding decision.

*Year 3 ($500K):*

- **PQC maintenance and IoT remediation ($150K)**: Address remaining embedded systems, automate CBOM refresh, annual board report.

- **Quantum computing expansion or pause ($200K)**: If Year 2 benchmark shows D-Wave advantage: expand to additional use cases (credit risk, FX exposure). If no advantage: redirect to quantum-inspired (Toshiba SQBM+) and maintain education budget only.

- **Research bridge ($150K)**: Establish QAE proof-of-concept for VaR acceleration, targeting fault-tolerant advantage when hardware matures (planning for 2028–2030 deployment).

*Budget allocation summary*: PQC migration 50% (non-optional compliance); quantum sensing 20% (near-term ROI from proven technology); quantum computing pilots 30% (exploratory, evidence-gated continuation).

---

**Q27.** A life sciences company wants to identify which molecules in their current active pipeline are most likely to benefit from quantum simulation. Design a screening methodology to prioritize molecules for quantum computing resources.

**Model answer:**

*Step 1 — Electronic structure screening*: For each active program, query the computational chemistry team on: Does the target active site contain a transition metal? (Yes → quantum-priority.) Does lead optimization involve predicting excited-state behavior? (Yes → quantum-priority.) Has DFT produced predictions that were contradicted by experimental results? (Yes → quantum-priority.)

*Step 2 — Active space analysis*: For quantum-priority candidates, estimate the active space size (number of electrons and orbitals that require correlated treatment). Programs requiring active spaces larger than 20 electrons/20 orbitals are beyond classical CCSD(T) feasibility and are strong quantum candidates.

*Step 3 — Classical simulation track record*: Review all existing computational results for each program. Programs where computational predictions have consistently failed to predict experimental SAR (structure-activity relationships) are high-value quantum targets.

*Step 4 — Scoring matrix*:

| Criterion | Score |
|---|---|
| Transition metal in active site | +3 |
| Active space > 20e/20o | +3 |
| DFT predictions historically inaccurate for this target class | +2 |
| Excited-state dynamics required | +2 |
| Drug in clinical stage (value of improvement is highest) | +1 |

Programs scoring 7+ are quantum-priority. Programs scoring 3–6 are quantum-candidate (monitor hardware progress). Programs scoring < 3 should use classical DFT.

*Step 5 — Vendor matching*: For top-priority programs, issue RFP to IBM Quantum (VQE, large-scale simulation), Quantinuum (trapped-ion, high-fidelity chemistry), and QSimulate (quantum chemistry specialization). Evaluate vendor capability against the specific molecular target class.

---

**Q28.** Design a framework for a logistics company to decide between four quantum/quantum-inspired options for a vehicle routing problem: (1) Gurobi (classical exact solver), (2) Toshiba SQBM+ (quantum-inspired), (3) D-Wave Leap hybrid, and (4) QAOA on IBM Quantum. Include evaluation criteria, benchmark methodology, and decision rules.

**Model answer:**

*Evaluation criteria*: (a) Solution quality (% gap from optimal or % improvement over current solution), (b) Compute time (wall-clock time to achieve target quality), (c) Scalability (performance as fleet/order size scales), (d) Cost ($per solution), (e) Integration complexity (API maturity, maintenance burden).

*Benchmark methodology*:

- Select 10 representative routing instances from production history, spanning small (50 vehicles), medium (200 vehicles), and large (500 vehicles) cases.
- Formulate each instance as a QUBO for quantum/quantum-inspired options; use standard MIP formulation for Gurobi.
- Run each solver 10 times per instance; record best solution found, mean solution quality, and time-to-best-solution.
- For QAOA, limit to the 50-vehicle instances (NISQ hardware scale constraint); report circuit depth and shot counts.
- Measure integration complexity by having one engineer implement each integration with no prior experience; record hours to working prototype.

*Decision rules*:

| Finding | Decision |
|---|---|
| Gurobi achieves ≥98% of optimal within time budget | Remain with Gurobi; no quantum investment justified |
| SQBM+ improves solution quality by ≥5% at same cost | Deploy SQBM+; re-evaluate D-Wave after 6 months of production data |
| D-Wave outperforms SQBM+ at large scale (500+ vehicles) by ≥3% | Deploy D-Wave Leap for production; retire SQBM+ |
| QAOA matches or exceeds Gurobi at 50-vehicle scale | Include in fault-tolerant hardware planning; NISQ deployment not justified at scale |

---

**Q29.** Design a quantum sensing evaluation program for a multinational energy company that operates oil and gas fields in remote locations, offshore platforms, and underground facilities. Identify which quantum sensing technologies apply to their operations, prioritize by ROI, and propose a phased engagement.

**Model answer:**

*Applicable quantum sensing technologies*:

| Technology | Application | Commercial Readiness |
|---|---|---|
| Quantum gravimetry | Subsurface reservoir mapping, replacing/augmenting seismic surveys | Commercially available (Muquans, Q-NEXT) |
| Quantum-enhanced INS (Q-CTRL, SandboxAQ) | GPS-denied navigation for autonomous surface vessels, subsea ROVs, drilling tools | Commercially available, 450+ flight hours |
| Optical atomic clocks | Precision timing for SCADA system synchronization across distributed platforms | Commercially available |
| NV-center magnetometry | Pipeline corrosion detection, well integrity monitoring | Early commercial stage |

*ROI priority ranking*:

1. **Quantum navigation for subsea ROVs and autonomous drilling** ($1–5M per dry well avoided): High ROI, proven technology, direct operational application. Engage SandboxAQ AQNav for subsea adaptation POC. Timeline: 6-month POC.

2. **Quantum gravimetry for exploration** ($5–50M value per improved exploration success rate): High value but longer deployment timeline (gravity surveys require operational integration). Engage Muquans or Q-NEXT for a specific exploration campaign POC. Timeline: 12-month pilot on one active exploration block.

3. **Precision timing for SCADA** ($500K–2M in avoided SCADA errors and compliance): Lower unit value but straightforward deployment. Contact timing system vendors for 60-day integration trial. Timeline: Q3 Year 1.

*Phased engagement*:

- **Phase 1 (Months 1–6)**: Issue RFI to SandboxAQ, Q-CTRL, Muquans, and atomic clock vendors. Conduct technical feasibility sessions. Select highest-ROI POC (likely quantum navigation for subsea).

- **Phase 2 (Months 6–18)**: Run quantum navigation POC on one offshore platform's ROV fleet. Define success metrics: positioning accuracy in GPS-denied environment, operationally relevant improvements in inspection efficiency.

- **Phase 3 (Months 12–24)**: If Phase 2 successful, run quantum gravimetry pilot on one exploration block. Parallel deployment of precision timing for SCADA.

- **Phase 4 (Year 2+)**: Scale successful POCs to production; evaluate NV-center pipeline integrity monitoring as it reaches commercial readiness.

---

**Q30.** A venture capital firm is evaluating three quantum technology investment opportunities: (A) a quantum ML company claiming exponential speedup for recommendation systems, (B) a quantum navigation startup with 200 operational flight hours in GPS-denied environments, and (C) a quantum chemistry startup targeting metalloenzyme simulation for pharmaceutical clients. Evaluate each investment's risk-adjusted potential and rank them.

**Model answer:**

*Opportunity A — Quantum ML for recommendation systems*:

- Technical validity: **Low.** Tang (2021) specifically addressed quantum recommendation systems as a case where claimed exponential speedups are eliminated by classical dequantization. The technical basis for the company's core claim has been undermined by peer-reviewed results.
- Market: Large (recommendation systems are widely deployed) but the competitive advantage is not defensible if the quantum speedup claim is invalid.
- Risk: **High.** The company's core IP may not provide the claimed advantage. Any technically sophisticated customer will eventually benchmark against optimized classical methods.
- Assessment: **Do not invest** without seeing independent benchmarks against optimized classical baselines (not naive implementations) at production-relevant scale, post-dequantization.

*Opportunity B — Quantum navigation startup*:

- Technical validity: **High.** 200 operational flight hours in GPS-denied environments is empirical evidence of a real, measurable advantage over classical INS. This is not a theoretical claim — it is operational data.
- Market: Defense, aviation, maritime, mining, and autonomous systems — large and growing as GPS vulnerability becomes a strategic concern.
- Risk: **Low-to-medium.** The technology works (demonstrated operationally); the risk is commercialization/scale-up, not technical validity.
- Comparable: Q-CTRL (TIME Best Innovation 2025), SandboxAQ (USAF/Boeing/Airbus). This sector has proven commercial viability.
- Assessment: **Attractive investment.** Operational flight hours are the most credible evidence available in this technology class. Evaluate team quality, IP position, and path to aviation certification.

*Opportunity C — Quantum chemistry for metalloenzyme simulation*:

- Technical validity: **High for the problem selection** (metalloenzyme simulation is a genuine quantum computing problem class), but the commercial application (pharmaceutical clients paying for simulation) requires hardware that is not yet fault-tolerant at production scale.
- Market: Pharmaceutical molecular simulation is a large and high-value market. If the company can serve as a bridge (NISQ-era results for specific systems, scaling to fault-tolerant hardware) and attract pharma clients willing to pay for best-available accuracy, there is a real business.
- Risk: **Medium-to-high.** Hardware dependency is the primary risk — the company's full value proposition awaits fault-tolerant hardware (IBM 2026–2028 window). Revenue from NISQ-era demonstrations may be limited.
- Assessment: **Conditional investment.** Attractive if: (a) the company has existing pharma customer relationships and pilot revenue, (b) the team has published, peer-reviewed results on relevant molecular targets, and (c) the business model bridges NISQ-era research services to fault-tolerant production deployments.

*Ranking*: B > C > (A not recommended). Opportunity B has demonstrated commercial traction in a proven, growing market. Opportunity C has genuine technical foundation with hardware-gated risk that could yield significant returns in the 2026–2030 window. Opportunity A's core technical claim has been undermined by peer-reviewed dequantization results.
