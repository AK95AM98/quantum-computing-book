---
title: "Chapter 11 Quiz: Milestone Framework"
chapter: 11
quiz_version: 1.0
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
questions: 30
---

# Chapter 11 Quiz: Milestone Framework — When Will Quantum Hardware Credibly Solve Real Problems?

This quiz covers the five milestone evaluation criteria, current hardware status (March 2026), the credibility assessment framework, common failure modes, and the quantum risk register. Questions follow Bloom's Taxonomy with five questions at each of the six levels.

---

## Level 1 — Remember

*Questions 1–5 test recall of key terms, definitions, and specific facts from Chapter 11.*

---

**Question 1**

What is $\Lambda$ (Lambda) in the context of quantum error correction?

- A) The wavelength of the laser used to address trapped ions
- B) The ratio of the logical error rate to the physical error rate
- C) The improvement factor in logical error rate per code distance increment
- D) The number of physical qubits required per logical qubit

??? success "Answer"
    **C) The improvement factor in logical error rate per code distance increment.**

    $\Lambda$ measures how much the logical error rate decreases each time the code distance is increased by 2. A value of $\Lambda > 1$ means the system is operating below the fault-tolerance threshold — increasing code size reduces errors. Google Willow achieved $\Lambda = 2.14$; Zuchongzhi 3.2 achieved $\Lambda = 1.4$.

---

**Question 2**

As of March 2026, what $\Lambda$ value did Google's Willow chip demonstrate, as published in *Nature* December 2024?

- A) 1.05
- B) 1.40
- C) 2.14
- D) 4.28

??? success "Answer"
    **C) 2.14.**

    Google Willow demonstrated $\Lambda = 2.14$ — meaning each step up in code distance cut the logical error rate by more than half. This was the most definitive experimental confirmation of below-threshold quantum error correction published to date.

---

**Question 3**

What is the near-term target (2–3 years from March 2026) for Criterion 1 (logical qubit quality) in the milestone framework?

- A) Physical error rate $\leq 10^{-4}$ per gate on 100+ physical qubits
- B) Logical error rate $\leq 10^{-4}$ per gate on 10+ logical qubits
- C) Logical error rate $\leq 10^{-6}$ per gate on 200+ logical qubits
- D) $\Lambda \geq 2.0$ on a single platform

??? success "Answer"
    **B) Logical error rate $\leq 10^{-4}$ per gate on 10+ logical qubits.**

    The near-term target requires demonstrating not just threshold crossing (already achieved) but actual logical gate operations at useful error rates on a meaningful number of logical qubits, reproducible across platforms. The $\leq 10^{-6}$ rate on 200+ qubits is the long-term (5–10 year) Starling-class target.

---

**Question 4**

Which two supercomputing centers adopted NVIDIA's NVQLink by 2025, as cited in Chapter 11?

- A) Oak Ridge National Laboratory and Lawrence Berkeley National Laboratory
- B) Jülich Supercomputing Centre and RIKEN
- C) Argonne National Laboratory and CERN
- D) NIST and the European XFEL

??? success "Answer"
    **B) Jülich Supercomputing Centre and RIKEN.**

    Chapter 11 cites Jülich (Germany), RIKEN (Japan), and NQCC UK as the three major international supercomputing centers that adopted NVIDIA CUDA-Q and NVQLink by 2025, establishing the production hybrid quantum-HPC infrastructure standard.

---

**Question 5**

Which of the following milestones is classified as CONTROVERSIAL (RED) in the Chapter 11 delivered scorecard?

- A) IBM bivariate bicycle code demonstration
- B) IonQ 99.99% two-qubit gate fidelity
- C) Microsoft topological qubits
- D) Google Willow $\Lambda = 2.14$

??? success "Answer"
    **C) Microsoft topological qubits.**

    As of March 2026, Microsoft's topological qubit approach — based on Majorana fermion quasi-particles — has not been independently replicated, and the experimental signatures reported in April 2025 remain disputed in the research community. It is classified as CONTROVERSIAL.

---

## Level 2 — Understand

*Questions 6–10 test comprehension of concepts, distinctions, and explanations.*

---

**Question 6**

What is the key distinction between "quantum supremacy" and "quantum advantage" as defined in Chapter 11?

- A) Supremacy applies to superconducting qubits; advantage applies to trapped ions
- B) Supremacy means outperforming classical on any task; advantage means outperforming on a commercially useful problem
- C) Supremacy requires peer review; advantage does not
- D) Supremacy applies to gate-based QC; advantage applies to annealing

??? success "Answer"
    **B) Supremacy means outperforming classical on any task; advantage means outperforming on a commercially useful problem.**

    Chapter 11 distinguishes three levels: supremacy (beating classical on any benchmark, including non-useful ones like RCS), advantage (beating classical on a commercially relevant problem), and utility (producing useful results, even without being definitively faster than classical). As of March 2026, supremacy has been demonstrated; advantage has not.

---

**Question 7**

Why is the IBM gross (bivariate bicycle) code considered transformative for fault-tolerant quantum computing?

- A) It eliminates the need for magic state distillation entirely
- B) It operates without requiring syndrome measurements
- C) It reduces the physical qubit overhead per logical qubit by approximately 10× compared to surface codes
- D) It requires only nearest-neighbor interactions, simplifying fabrication

??? success "Answer"
    **C) It reduces the physical qubit overhead per logical qubit by approximately 10× compared to surface codes.**

    The bivariate bicycle (qLDPC) code demonstrated in *Nature* 2024 achieves logical error rates equivalent to the surface code but with roughly 10× fewer physical qubits per logical qubit. This changes the hardware scaling equation: a processor that could support 100 logical qubits under surface code overhead could support 1,000 under gross code overhead, at the same physical qubit count.

---

**Question 8**

Why does Chapter 11 assign a GREEN/YELLOW status to Criterion 4 (hardware reproducibility) but only YELLOW to Criterion 1 (logical qubit quality), even though the same Willow result underlies both assessments?

- A) Criterion 4 requires fewer qubits than Criterion 1
- B) Threshold crossing has been independently replicated (GREEN component), but logical gate operations on 10+ logical qubits at $\leq 10^{-4}$ error rate have not yet been demonstrated (YELLOW component of Criterion 1)
- C) Criterion 4 applies only to annealing platforms, which are less challenging
- D) Criterion 1 requires both superconducting and trapped-ion platforms to demonstrate the same result

??? success "Answer"
    **B) Threshold crossing has been independently replicated (GREEN component), but logical gate operations on 10+ logical qubits at $\leq 10^{-4}$ error rate have not yet been demonstrated (YELLOW component of Criterion 1).**

    Criterion 4 is GREEN for threshold crossing because Willow and Zuchongzhi 3.2 both independently confirmed $\Lambda > 1$. But Criterion 1 is YELLOW because the specific target — $\leq 10^{-4}$ logical error rate per *gate* on 10+ logical qubits — requires demonstrating logical *operations*, not just logical *memory*, at useful scale. Willow confirmed threshold crossing for memory; logical gate operations at this quality and scale remain to be demonstrated.

---

**Question 9**

Why does the chapter warn against the inference "100-qubit NISQ result implies twice the performance from a 200-qubit NISQ system"?

- A) NISQ systems cannot be scaled beyond 100 qubits due to fabrication limits
- B) The NISQ-to-fault-tolerant transition is a qualitative architecture change, not a continuous scaling curve
- C) 200-qubit systems require different compilers that introduce additional overhead
- D) The algorithms that work on 100 qubits are provably optimal and cannot benefit from more qubits

??? success "Answer"
    **B) The NISQ-to-fault-tolerant transition is a qualitative architecture change, not a continuous scaling curve.**

    Adding more physical qubits without error correction accumulates more errors, not more computational power. The fault-tolerant model requires fundamentally different hardware design (syndrome measurement circuits, decoders, feed-forward corrections) and fundamentally different algorithms (gate-based with T gates, not variational). NISQ results do not reliably predict fault-tolerant performance.

---

**Question 10**

What is the "harvest now, decrypt later" threat, and why does it make PQC migration urgent *before* quantum advantage is demonstrated?

- A) Hackers steal quantum hardware today to use it for decryption later
- B) Adversaries capture encrypted classical data today, storing it to decrypt once a cryptographically relevant quantum computer exists in the future
- C) Quantum computers harvest classical bits during hybrid computation and use them for unauthorized decryption
- D) The threat applies only to symmetric encryption; asymmetric encryption is safe indefinitely

??? success "Answer"
    **B) Adversaries capture encrypted classical data today, storing it to decrypt once a cryptographically relevant quantum computer exists in the future.**

    Because RSA and ECC ciphertexts captured today may still be confidential years or decades from now, the relevant threat horizon is not "when does a CRQC exist?" but "how long does my data need to remain confidential?" Long-lived sensitive data (medical, classified, financial) must be protected with quantum-safe cryptography now, regardless of the current status of quantum hardware milestones.

---

## Level 3 — Apply

*Questions 11–15 require applying the framework to new scenarios.*

---

**Question 11**

A vendor announces: "Our new quantum processor has 500,000 physical qubits, surpassing all competitors." Using the framework from Chapter 11, what is the FIRST question you should ask to assess this claim's significance?

- A) What is the operating temperature of the processor?
- B) Are these physical or logical qubits, and if logical, at what logical error rate?
- C) What programming language does the processor support?
- D) How many months did the engineering team take to build it?

??? success "Answer"
    **B) Are these physical or logical qubits, and if logical, at what logical error rate?**

    Chapter 11 identifies conflating physical and logical qubits as Failure Mode 1. 500,000 noisy physical qubits without error correction may support only a few hundred to a few thousand fault-tolerant logical qubits, or none at all if the gate fidelity is below threshold. The raw physical qubit count is the least informative metric for assessing computational capability.

---

**Question 12**

Your organization stores encrypted clinical trial data with a confidentiality requirement extending to 2040. Using the quantum risk register from Section 11.5, which indicator should trigger *immediate* action, and what action should be taken?

- A) Competitive positioning indicator; hire quantum computing researchers
- B) Quantum advantage flag; purchase quantum computing hardware
- C) PQC migration and CRQC timeline indicators; prioritize CBOM completion and migrate to hybrid PQC
- D) Logical qubit milestone; wait until 10+ logical qubits are demonstrated before acting

??? success "Answer"
    **C) PQC migration and CRQC timeline indicators; prioritize CBOM completion and migrate to hybrid PQC.**

    Data with confidentiality requirements extending to 2040 is vulnerable to harvest-now-decrypt-later attacks even at current $P(\text{CRQC by 2030}) = 1\%$. The appropriate action is not to wait for quantum hardware milestones but to immediately complete the Cryptographic Bill of Materials (CBOM) and migrate internet-facing systems handling this data to hybrid post-quantum cryptography. This is a cryptographic risk, not a quantum computing investment question.

---

**Question 13**

Using the resource estimation worked example in Section 11.5, calculate the approximate number of physical qubits required to run Shor's algorithm on a 2048-bit RSA key using the IBM gross code (bivariate bicycle), assuming $p_{\text{phys}} = 10^{-3}$, $p_{\text{log}} = 10^{-6}$, and 100 physical qubits per logical qubit.

- A) ~4,000 physical qubits
- B) ~40,000 physical qubits
- C) ~410,000 physical qubits
- D) ~4,000,000 physical qubits

??? success "Answer"
    **C) ~410,000 physical qubits.**

    Shor's algorithm on a 2048-bit key requires approximately 4,096 logical qubits. With the gross code overhead of 100 physical qubits per logical qubit: $4{,}096 \times 100 = 409{,}600 \approx 410{,}000$ physical qubits. Compare this to the surface code requirement of ~4,000,000 physical qubits — the gross code's 10× overhead reduction is transformative, but even at the reduced estimate, no current or near-term processor approaches this scale.

---

**Question 14**

A financial services CIO reads that IonQ demonstrated a 12% advantage over classical HPC in a medical device simulation. Should this trigger the "quantum advantage flag" action in the quantum risk register for a financial services firm?

- A) Yes — any quantum advantage in any domain triggers the flag
- B) No — the flag is triggered only by advantage in financial services problem classes (portfolio optimization, risk simulation), not by advantage in a different industry's problem domain
- C) Yes — medical device simulation is equivalent to financial modeling in computational complexity
- D) No — only IBM results trigger the quantum advantage flag because IBM has the strongest track record

??? success "Answer"
    **B) No — the flag is triggered only by advantage in financial services problem classes (portfolio optimization, risk simulation), not by advantage in a different industry's problem domain.**

    Chapter 11 specifies that the quantum advantage flag is triggered by peer-reviewed advantage "in your industry." Quantum advantage in medical device simulation, while scientifically interesting, does not imply advantage in portfolio optimization or risk simulation. Different problem classes have different quantum algorithmic pathways. The correct response is to note the result as a positive signal and increase monitoring, but not to trigger the full escalation protocol.

---

**Question 15**

IBM's Kookaburra processor is classified as PROJECTED with high credibility (YELLOW) in the delivered scorecard. What is the primary evidence cited in Chapter 11 for this HIGH credibility rating, compared to a MODERATE credibility projection?

- A) Kookaburra has been fabricated and is in testing
- B) IBM has a strong track record of on-schedule delivery from Eagle (2021) through Loon (2025)
- C) Kookaburra uses a simpler architecture than previous IBM processors
- D) Multiple independent analysts have endorsed the IBM roadmap

??? success "Answer"
    **B) IBM has a strong track record of on-schedule delivery from Eagle (2021) through Loon (2025).**

    Chapter 11 explicitly calibrates roadmap credibility by delivery track record. IBM delivered Eagle, Osprey, Condor, Heron, and Loon within one year of their roadmap projections, most on schedule. This empirical track record — not analyst opinion or architectural simplicity — justifies treating Kookaburra's 2026 projection with higher credibility than, say, Microsoft's topological qubit timeline.

---

## Level 4 — Analyze

*Questions 16–20 require breaking down arguments, identifying relationships, and examining evidence.*

---

**Question 16**

Chapter 11 argues that the Zuchongzhi 3.2 result ($\Lambda = 1.4$) is scientifically more significant than its lower $\Lambda$ value might suggest. What is the argument?

- A) A $\Lambda$ of 1.4 represents a more efficient use of physical qubits than $\Lambda = 2.14$
- B) The result was achieved at lower cost, demonstrating economic advantage
- C) Independent replication by a different team, in a different country, using different fabrication — without any coordination with Google — makes the threshold crossing result definitively scientific rather than device-specific
- D) The Zuchongzhi result used more qubits than Willow, making it a more comprehensive test

??? success "Answer"
    **C) Independent replication by a different team, in a different country, using different fabrication — without any coordination with Google — makes the threshold crossing result definitively scientific rather than device-specific.**

    The scientific value of replication lies in ruling out device-specific artifacts. A single lab could have a uniquely well-calibrated device that crosses the threshold while most real-world implementations cannot. Independent replication by USTC's Pan group — using different superconducting qubit designs, different fabrication facilities, and different software — confirms that below-threshold error correction is a general physical phenomenon, not a Google-specific achievement. The lower $\Lambda$ actually adds information: it shows the threshold can be crossed with less-optimized hardware, which is relevant for the broader field's scaling trajectory.

---

**Question 17**

Analyze the convergence scenario presented in Section 11.4. It is structured as a chain of conditionals: "If IBM Kookaburra delivers... AND IonQ 256-qubit delivers... AND quantum advantage is demonstrated by 2027–2028... THEN fault-tolerant quantum computing by 2031–2032 becomes credible." What is the logical weakness of this structure that a skeptic would identify?

- A) The scenario only includes two vendors, ignoring Google and Microsoft
- B) Each conditional is independent, so the probability of the joint scenario is the product of individual probabilities, which may be much lower than any individual probability
- C) The scenario does not specify the fault-tolerant algorithm that would benefit
- D) The 2031–2032 timeframe is too conservative; the convergence will happen faster

??? success "Answer"
    **B) Each conditional is independent, so the probability of the joint scenario is the product of individual probabilities, which may be much lower than any individual probability.**

    If Kookaburra has a 70% probability of delivering as projected, IonQ's 256-qubit system has a 60% probability, and quantum advantage demonstration by 2027–2028 has a 50% probability, then the joint probability of all three is $0.70 \times 0.60 \times 0.50 = 0.21$, or about 21%. The convergence scenario requires multiple simultaneous successes — and failures are correlated (e.g., a fundamental decoherence problem could affect both IBM and IonQ). Chapter 11 is honest about this: the convergence is "possible — perhaps likely" but "not guaranteed," and each conditional represents a real engineering challenge.

---

**Question 18**

Compare the credibility assessment of IonQ's roadmap versus IBM's roadmap, as presented in Chapter 11. What specific type of risk makes IonQ's longer-term projections less credible than IBM's, even though IonQ's physics results (99.99% fidelity) are strong?

- A) IonQ's trapped-ion technology is fundamentally less scalable than superconducting
- B) IonQ's roadmap depends on integrating technology from multiple simultaneous acquisitions, introducing integration risk not present in IBM's organic development path
- C) IonQ has fewer employees than IBM, creating execution capacity risk
- D) IonQ's roadmap requires new physics that has not been demonstrated in the laboratory

??? success "Answer"
    **B) IonQ's roadmap depends on integrating technology from multiple simultaneous acquisitions, introducing integration risk not present in IBM's organic development path.**

    Chapter 11 specifically cites "acquisition-dependent" as the key credibility modifier for IonQ's roadmap. The 2026 256-qubit target incorporates Oxford Ionics 2D trap technology acquired through acquisition. Integrating acquired technology — with different engineering cultures, IP frameworks, and technical approaches — historically takes longer than planned. IBM's roadmap, by contrast, builds on a single, internally developed hardware platform with a clear lineage from Eagle to Loon. The physics quality of IonQ's results is excellent; the organizational integration challenge is the primary risk factor.

---

**Question 19**

Chapter 11 notes that classical simulation "has repeatedly caught up with quantum hardware," citing the 2022 tensor network deinflation of the 2019 Sycamore result. Why is this pattern particularly problematic for demonstrating Criterion 2 (verified quantum advantage)?

- A) Classical simulation improvements make quantum hardware more expensive relative to classical
- B) If classical simulators continue improving, the quantum-classical performance gap may close before fault-tolerant QC arrives, meaning quantum never actually outperforms classical on useful problems
- C) Classical simulation improvements demonstrate that quantum computers are not needed
- D) The tensor network result showed that quantum computers are slower than classical on all tasks

??? success "Answer"
    **B) If classical simulators continue improving, the quantum-classical performance gap may close before fault-tolerant QC arrives, meaning quantum never actually outperforms classical on useful problems.**

    This is the "moving target" problem for quantum advantage. Quantum hardware is improving on a trajectory toward fault tolerance, but classical simulation is also improving — through better algorithms (tensor networks, Monte Carlo methods), better hardware (GPUs, TPUs), and better parallelization. If classical simulation improves faster than quantum error rates decrease, the moment of quantum advantage could continuously recede. The NISQ era has already seen this happen multiple times. For fault-tolerant quantum computing, the advantage must come from a computational task that is *provably* hard for classical methods (such as simulating large quantum many-body systems or factoring), not merely practically difficult today.

---

**Question 20**

Analyze why D-Wave's Advantage2 processor (classified as DELIVERED for quantum annealing) cannot be credited toward satisfying Criterion 2 (verified quantum advantage) as defined in Chapter 11.

- A) D-Wave's results have not been peer-reviewed
- B) D-Wave's processor uses a different qubit modality (superconducting flux qubits), which is excluded from the criterion
- C) Quantum annealing solves combinatorial optimization by sampling but has not demonstrated advantage over the best classical optimization algorithms (e.g., simulated annealing, branch-and-bound) at commercially relevant scale
- D) D-Wave did not publish the results in *Nature*

??? success "Answer"
    **C) Quantum annealing solves combinatorial optimization by sampling but has not demonstrated advantage over the best classical optimization algorithms (e.g., simulated annealing, branch-and-bound) at commercially relevant scale.**

    Criterion 2 requires advantage over the best available classical method. For combinatorial optimization — D-Wave's domain — the best classical methods include highly optimized simulated annealing, genetic algorithms, and branch-and-bound solvers that are extremely competitive. Despite substantial research, no published peer-reviewed result demonstrates D-Wave's quantum annealer consistently and significantly outperforming optimized classical solvers on real industrial problems at the relevant scale. D-Wave is commercially deployed for optimization, but that deployment is based on comparable (not superior) performance with potential energy and hardware cost advantages, not on demonstrated quantum speedup.

---

## Level 5 — Evaluate

*Questions 21–25 require making judgments, critiquing arguments, and weighing evidence.*

---

**Question 21**

A colleague argues: "Since Google demonstrated 13,000× speedup over classical simulation in October 2025, quantum computers are now proven to be superior to classical computers, and we should immediately start planning our quantum computing deployment." Evaluate this argument using the framework from Chapter 11.

- A) The argument is correct; a 13,000× speedup proves quantum advantage
- B) The argument conflates quantum supremacy (on a non-useful benchmark) with quantum advantage (on a commercially relevant problem); the RCS result does not support production deployment planning
- C) The argument is correct because Google published in a peer-reviewed venue
- D) The argument is partially correct — planning should begin, but not deployment

??? success "Answer"
    **B) The argument conflates quantum supremacy (on a non-useful benchmark) with quantum advantage (on a commercially relevant problem); the RCS result does not support production deployment planning.**

    This is Failure Mode 2 from Section 11.3. Random circuit sampling is a benchmark designed to be hard for classical computers — it has no commercial application. A 13,000× speedup on RCS does not imply any speedup on drug discovery, materials simulation, or financial optimization. The appropriate conclusion from the RCS result is: "quantum hardware is improving rapidly and is clearly outperforming classical simulation on designed benchmarks; watch for peer-reviewed advantage on commercially relevant problems." Production deployment planning should be triggered by Criterion 2, not by supremacy claims.

---

**Question 22**

Evaluate the following statement: "IBM Kookaburra's projected 2026 delivery is as uncertain as Microsoft's topological qubit timeline, since both are future projections that have not yet been demonstrated." Is this equivalence justified? Why or why not?

- A) Yes — all future projections carry equal uncertainty regardless of track record
- B) No — IBM has a demonstrated multi-year track record of on-schedule milestone delivery, while Microsoft's topological qubit approach has not yet produced an independently replicated functional qubit; the two projections carry fundamentally different levels of evidential support
- C) Yes — both IBM and Microsoft are large technology companies with similar resources
- D) No — Kookaburra is a higher-value milestone, so IBM will invest more to ensure delivery

??? success "Answer"
    **B) No — IBM has a demonstrated multi-year track record of on-schedule milestone delivery, while Microsoft's topological qubit approach has not yet produced an independently replicated functional qubit; the two projections carry fundamentally different levels of evidential support.**

    Uncertainty is not uniform across all projections. Evidence-based credibility assessment requires weighting projections by their empirical foundation. IBM's Kookaburra builds on a sequence of five on-schedule deliveries (Eagle through Loon) and extends demonstrated technology (qLDPC codes, chip architecture) in well-understood directions. Microsoft's topological qubit requires a physics regime (topological protection via Majorana fermions) that has not yet been independently confirmed in the laboratory. These are not equivalent uncertainties — one is engineering uncertainty (will the timeline slip?), the other is fundamental physics uncertainty (does the underlying physical effect exist as described?).

---

**Question 23**

Evaluate whether the five criteria in the milestone framework are truly *jointly necessary* or whether satisfying just two or three of them would be sufficient to justify production-level quantum investment.

- A) Just Criterion 2 (verified advantage) is sufficient — if a useful problem is solved faster, that's enough to invest
- B) Criteria 1 and 2 together are sufficient — logical qubits plus useful advantage covers the essentials
- C) All five are jointly necessary because they address orthogonal risk dimensions: quality, usefulness, integration, replicability, and software readiness — a failure in any one makes commercial deployment impractical even if the others are met
- D) Criterion 4 (reproducibility) is not necessary — single-vendor demonstrations are sufficient for enterprise procurement

??? success "Answer"
    **C) All five are jointly necessary because they address orthogonal risk dimensions: quality, usefulness, integration, replicability, and software readiness — a failure in any one makes commercial deployment impractical even if the others are met.**

    Consider the failure cases: (1) If logical qubit quality is insufficient, algorithms produce wrong answers. (2) If quantum advantage is not demonstrated, the investment has no business return. (3) If hybrid QC+HPC workflows don't work, the quantum processor cannot be integrated into actual enterprise computing pipelines. (4) If results are not reproducible across platforms, vendor lock-in and single points of failure make commercial deployment risky. (5) If algorithms are not ready, there is no software to run even on perfect hardware. Each criterion addresses a different failure mode; satisfying fewer than all five leaves a material gap. Criterion 2 alone, for example, might be triggered by a single experiment that is never reproduced (addressed by Criterion 4) or never deployable in an HPC pipeline (addressed by Criterion 3).

---

**Question 24**

Chapter 11 notes that magic state distillation overhead "may be larger than current estimates." Evaluate the significance of this uncertainty for the 2027–2029 convergence scenario.

- A) Minor significance — magic state distillation is only needed for certain algorithm types
- B) Minor significance — IBM's gross code eliminates the need for magic state distillation
- C) Major significance — magic state distillation is required for universal fault-tolerant computation (specifically T gates), and if the overhead is 5–10× larger than estimated, the physical qubit requirements for useful algorithms could push viability past 2030
- D) Minor significance — classical preprocessing can substitute for magic state distillation

??? success "Answer"
    **C) Major significance — magic state distillation is required for universal fault-tolerant computation (specifically T gates), and if the overhead is 5–10× larger than estimated, the physical qubit requirements for useful algorithms could push viability past 2030.**

    Universal fault-tolerant computation requires implementing arbitrary gates, including non-Clifford operations. The standard method is magic state distillation: a protocol that consumes many noisy non-Clifford resource states to produce a single high-fidelity one. For algorithms like quantum chemistry simulations, the T gate count can be $10^8$ or higher, and each T gate requires distillation overhead. If distillation is 5× more costly than current estimates for qLDPC codes (which are still being worked out), the total physical qubit count for the quantum chemistry advantage scenario roughly doubles. This could push the hardware threshold above what Kookaburra or its successors can provide by 2027–2029, extending the timeline materially.

---

**Question 25**

A quantum computing startup claims: "We've demonstrated quantum utility on a logistics optimization problem — our system found a better solution than classical optimization in 40% of test cases." Evaluate this claim against the Chapter 11 criteria for credible milestone assessment.

- A) This is a strong result that satisfies Criterion 2 (verified quantum advantage)
- B) The claim needs to be evaluated on three dimensions: (1) Was this peer-reviewed? (2) What is "better" — is the quality gap statistically significant? (3) What classical baseline was used — was it an optimized solver, or a simple heuristic? Without these, the claim cannot be assessed as credible
- C) Since logistics optimization is commercially relevant, this satisfies the advantage criterion
- D) The claim is credible because it specifies a percentage (40%) rather than a vague assertion

??? success "Answer"
    **B) The claim needs to be evaluated on three dimensions: (1) Was this peer-reviewed? (2) What is "better" — is the quality gap statistically significant? (3) What classical baseline was used — was it an optimized solver, or a simple heuristic? Without these, the claim cannot be assessed as credible.**

    Chapter 11 establishes that credible milestone assessment requires peer-reviewed publication and comparison against *best available classical methods*. Many quantum utility claims fail on the baseline question — comparing against a simple heuristic rather than branch-and-bound or highly optimized simulated annealing. "Better in 40% of test cases" could mean better by 0.1% on hand-picked instances, or it could mean genuinely superior solution quality on hard instances. The framing of the claim (percentage of cases, no peer review cited, no classical baseline specified) is a red flag for credibility assessment under the Chapter 11 framework.

---

## Level 6 — Create

*Questions 26–30 require synthesis, design, and original application of the framework.*

---

**Question 26**

Design a one-page quantum milestone dashboard for a board of directors. The dashboard must communicate the current status (March 2026) of all five criteria in a format suitable for non-technical executives. What elements would you include, and why?

??? success "Sample Answer"
    A strong board-level quantum milestone dashboard would include:

    **1. Five-criterion status grid (traffic light format):**
    Each criterion displayed as a row with a colored status indicator (green/yellow/red), one-line current status, and one-line next expected milestone. Avoids jargon — "Logical qubit quality" becomes "Error-corrected qubit performance: on track, not yet commercially useful scale."

    **2. Single headline sentence:**
    "Quantum error correction has crossed its fundamental threshold (confirmed independently). No commercially useful quantum advantage has been demonstrated yet. The 2027–2029 window is the credible convergence target."

    **3. Business action line:**
    "Recommended posture: cloud experimentation ($200K/year) to build capability. Trigger for escalation: peer-reviewed advantage in [your industry's problem class]."

    **4. Top three risks:**
    (a) Magic state distillation overhead underestimated; (b) Modular chip-to-chip scaling not yet demonstrated; (c) Classical simulation may close the gap before fault-tolerant QC arrives.

    **5. PQC migration status (separate from quantum advantage):**
    "Cryptographic risk is INDEPENDENT of quantum computing milestones. CBOM completeness: [X]%. Target: 100% hybrid PQC for long-lived data by Q4 2026."

    The dashboard separates two distinct quantum computing discussions that boards often conflate: (a) when will quantum provide business advantage? and (b) when will quantum break our current encryption? These have different timelines and require different actions.

---

**Question 27**

Construct a credibility-weighted forecast for the following scenario: "IBM achieves peer-reviewed quantum advantage in chemistry by end of 2027." Identify the key dependencies, assign subjective probabilities to each, and compute a joint probability estimate.

??? success "Sample Answer"
    **Key dependencies and subjective probability estimates:**

    1. **Kookaburra delivers chip-to-chip modular operation by end of 2026 as projected (P = 0.70):** IBM's track record is strong; chip-to-chip interconnects are the new challenge. 70% reflects high confidence in IBM's engineering execution, discounted for the novel integration challenge.

    2. **qLDPC codes perform at projected logical error rates in the modular architecture (P = 0.75):** The bivariate bicycle code is demonstrated within a single chip; inter-chip qLDPC fidelity has additional decoherence risks. 75% reflects good fundamental physics, modest integration uncertainty.

    3. **Chemistry algorithm (VQE + qLDPC error correction) compiles efficiently enough to outperform DMRG on a 60+ orbital active space (P = 0.55):** This requires not just hardware but software (T gate overhead, circuit optimization for the qLDPC architecture). 55% reflects genuine uncertainty about algorithm readiness.

    4. **Classical simulation does not close the gap before IBM's result (P = 0.80):** 60+ orbital active space with accurate energetics is genuinely hard classically. 80% reflects that tensor network methods struggle at this scale, though there is meaningful risk.

    **Joint probability:** $0.70 \times 0.75 \times 0.55 \times 0.80 \approx 0.23$, or roughly **23%**.

    This 23% estimate should be read as: "There is a roughly 1-in-4 chance that IBM achieves peer-reviewed quantum advantage in chemistry by end of 2027." That is not negligible — it is sufficient to justify preparatory investment — but it also means a 77% chance that this milestone takes longer. A responsible planning assumption is to prepare for the event while not betting on it.

---

**Question 28**

You are advising a national quantum initiative (budget: $500M over 5 years) on how to structure its investment portfolio across the five milestone criteria. How would you allocate resources across criteria and why?

??? success "Sample Answer"
    A rational allocation should be weighted toward the criteria with the largest gap between current status and the near-term target, adjusted for leverage (where additional investment most accelerates progress):

    **Criterion 1 — Logical qubit quality (~30%, $150M):** The biggest remaining gap is demonstrating logical gate operations on 10+ logical qubits at $\leq 10^{-4}$ error rate. National lab investment in competing platform development (trapped-ion, neutral atom) alongside superconducting expands the reproducibility base and accelerates finding the right architectural approach. This is the field's most critical near-term bottleneck.

    **Criterion 2 — Verified quantum advantage (~20%, $100M):** Fund algorithm development, chemistry benchmark creation, and independent verification infrastructure. A national initiative can commission independent replication of quantum advantage claims — a public good that the private sector undersupplies. Fund one or two dedicated quantum chemistry problem teams to define the specific computational targets.

    **Criterion 3 — Hybrid QC + HPC (~25%, $125M):** National supercomputing infrastructure investment in quantum-HPC integration is a public good. Supplement NVIDIA's commercial NVQLink investments with open-standard quantum-HPC interfaces accessible to academic researchers. Avoid duplicating private sector hardware investment; focus on integration, software, and open access.

    **Criterion 4 — Hardware reproducibility (~15%, $75M):** Fund independent benchmarking facilities capable of running standardized quantum computing benchmarks across all major platforms. This is a public-good function that builds field-wide credibility. Modeled on NIST's role in classical computing standards.

    **Criterion 5 — Algorithm readiness (~10%, $50M):** Fund quantum algorithm theory research, compiler development for qLDPC architectures, and magic state distillation optimization. This is relatively capital-light (it is primarily a talent investment) but high-leverage — algorithm breakthroughs can make hardware requirements 10× less demanding overnight.

---

**Question 29**

Design an enhanced version of the quantum risk register for a vertically integrated semiconductor manufacturer. Identify at least two industry-specific indicators you would add to the five standard indicators from Section 11.5, and justify their inclusion.

??? success "Sample Answer"
    A semiconductor manufacturer faces quantum computing risk and opportunity on multiple fronts simultaneously — both as a potential user of quantum computing for materials design and as a potential supplier of quantum hardware components. The standard five indicators should be supplemented with:

    **Additional Indicator 6: Quantum-enhanced DFT/molecular simulation status**
    Semiconductor manufacturers use density functional theory (DFT) to model new materials, transistor gate dielectrics, and interconnect metal properties. Classical DFT scales poorly beyond ~500 atoms. Track whether any peer-reviewed result demonstrates quantum-enhanced simulation of semiconductor materials (Si, Ge, GaAs, high-k dielectrics) outperforming classical FCI+DFT hybrid methods. *Trigger:* If quantum-enhanced materials simulation demonstrates advantage for any semiconductor-relevant material, immediately engage the demonstrating lab for a joint collaboration to simulate your specific materials of interest. This could directly accelerate transistor scaling roadmap by identifying novel gate dielectric candidates.

    **Additional Indicator 7: Quantum hardware supply chain relevance**
    Semiconductor manufacturers may become suppliers of critical quantum hardware components: dilution refrigerator components, superconducting qubit substrates, photonic interconnect components, or MEMS-based ion trap structures. Track whether any major quantum hardware platform announces a transition from laboratory-scale fabrication to semiconductor-fab-compatible manufacturing processes. *Trigger:* If IBM, Google, or IonQ announces a partnership with a semiconductor foundry for quantum chip fabrication at scale, this represents both a competitive threat (if a competitor fab wins the contract) and a business opportunity (if your fab is positioned to compete). Quarterly review of quantum hardware supply chain partnerships in investor filings.

    Both indicators translate the generic milestone framework into specific competitive intelligence relevant to the semiconductor sector's unique position at the intersection of quantum computing's hardware supply chain and potential algorithmic beneficiaries.

---

**Question 30**

Write the executive summary paragraph (150–200 words) of a strategic quantum computing report for a Fortune 500 CEO, synthesizing the Chapter 11 milestone framework into a clear, evidence-based recommendation. The summary should address: current status, the convergence window, the right near-term action, and the specific trigger for escalation.

??? success "Sample Answer"
    **Executive Summary — Quantum Computing Strategic Assessment, Q1 2026**

    Quantum computing has achieved its most important engineering milestone: below-threshold error correction has been independently confirmed by two separate research groups in different countries, using different hardware. The field has crossed from "will error correction work?" to "how quickly can we scale it?" However, no quantum processor has yet demonstrated a commercially useful problem solved faster than classical computing — the transition from laboratory milestone to business value remains ahead. The most credible window for that transition is 2027 to 2029, contingent on IBM's modular Kookaburra processor (2026) and independent replication of quantum chemistry advantage. The recommended near-term posture is deliberate experimentation: $100K–$500K annually on quantum cloud access and internal capability building — sufficient to build the domain knowledge needed to act when the signal arrives, without premature production commitment. The specific trigger for escalation is the simultaneous delivery of two criteria: a peer-reviewed quantum advantage result in a commercially relevant problem class AND demonstration of fault-tolerant logical qubits at $\leq 10^{-4}$ error rate. Monitor quarterly; expect the signal in 2027–2028.
