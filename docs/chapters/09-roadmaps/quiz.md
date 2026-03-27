---
title: "Chapter 9 Quiz: Hardware Roadmaps"
chapter: 09
quiz_type: formative
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
total_questions: 30
---

# Chapter 9 Quiz: Hardware Roadmaps — IBM, Google, Microsoft, IonQ, and the Modular Scaling Revolution

*Answer each question based on the content of Chapter 9. Questions progress through Bloom's Taxonomy from recall to creation.*

---

## Level 1 — Remember (Questions 1–5)

**1.** What was the qubit count of IBM's Osprey processor, delivered in 2022?

- A) 127 qubits
- B) 433 qubits
- C) 133 qubits
- D) 120 qubits

??? success "Answer"
    **B) 433 qubits.** Osprey (2022) had 433 qubits, more than tripling Eagle's 127-qubit count.

---

**2.** What does the acronym "#AQ" stand for in IonQ's roadmap terminology?

- A) Advanced Qubits
- B) Algorithmic Qubits
- C) Addressable Qubits
- D) Annealing Quotient

??? success "Answer"
    **B) Algorithmic Qubits.** #AQ is IonQ's proprietary metric defined as the largest $n$ for which the system can execute a representative $n$-qubit algorithm with greater than 50% success probability.

---

**3.** Which IBM processor first demonstrated real-time qLDPC decoding under 480 nanoseconds?

- A) Nighthawk
- B) Kookaburra
- C) Loon
- D) Heron r2

??? success "Answer"
    **C) Loon (2025).** Loon was specifically designed to validate c-couplers and a real-time qLDPC decoder operating below 480 ns. It was delivered one year ahead of schedule.

---

**4.** What value of $\Lambda$ (error suppression factor) did Google's Willow processor achieve at code distance $d = 7$?

- A) 1.02
- B) 2.14
- C) 3.50
- D) 0.87

??? success "Answer"
    **B) 2.14.** Google's Willow demonstrated $\Lambda = 2.14$ — the first unambiguous demonstration of below-threshold surface code operation on a real device.

---

**5.** D-Wave's Advantage2 processor uses which computational paradigm?

- A) Gate-based universal quantum computing
- B) Quantum annealing
- C) Topological qubit computation
- D) Photonic linear optical computing

??? success "Answer"
    **B) Quantum annealing.** Advantage2 uses quantum annealing, where the system physically evolves toward the minimum-energy configuration of a problem Hamiltonian. It is not a gate-based or universal quantum computer.

---

## Level 2 — Understand (Questions 6–10)

**6.** Why is $\Lambda > 1$ in a quantum error correction experiment significant? What would $\Lambda < 1$ indicate?

??? success "Answer"
    $\Lambda > 1$ means that as the code distance increases (more physical qubits per logical qubit), the logical error rate *decreases* exponentially — the error correction is working as designed. This is the fundamental requirement for fault-tolerant scaling: more qubits makes the logical qubit better. $\Lambda < 1$ would mean that adding more qubits makes the logical qubit *worse* — the overhead of the error correction introduces more errors than it corrects. Prior to Willow, no real device had unambiguously demonstrated $\Lambda > 1$ for the surface code.

---

**7.** Explain the difference between IBM's "c-couplers" and "l-couplers." Which has been experimentally demonstrated, and which is projected?

??? success "Answer"
    **C-couplers** (chip-level couplers) enable non-nearest-neighbor qubit connectivity within a single chip — long-range intra-chip connections required for bivariate bicycle qLDPC codes. C-couplers were **demonstrated** in IBM's Loon chip (2025). **L-couplers** (link-level couplers) are inter-chip microwave links that transmit entangling signals between physically separate chips via cryogenic cables, enabling multi-chip quantum processors. L-couplers are **projected** for the Cockatoo processor in 2027. The foundational physics of l-couplers was demonstrated in IBM's Flamingo processor (2024) but full integration into a multi-chip system is planned, not delivered.

---

**8.** Why does all-to-all connectivity give IonQ's trapped-ion systems an advantage over superconducting nearest-neighbor architectures?

??? success "Answer"
    On nearest-neighbor superconducting architectures, any two-qubit gate between non-adjacent qubits requires a series of SWAP gates to move quantum information to adjacent positions — each SWAP costs 3 CNOT gates and adds noise. For a 36-qubit algorithm with many non-adjacent interactions, this SWAP overhead can consume a large fraction of the available circuit depth. IonQ's trapped-ion systems allow any pair of ions to interact directly via laser-mediated phonon modes, eliminating SWAP overhead entirely. This means IonQ's effective computational power is higher than raw qubit count suggests: a 36-qubit all-to-all system can run circuits that would require significantly more qubits on a nearest-neighbor architecture.

---

**9.** What is the Nature editorial caveat about Microsoft's Majorana 1 paper, and why is it significant?

??? success "Answer"
    The Nature editorial accompanying the Majorana 1 paper (February 2025) stated that "the results do not represent evidence for the presence of Majorana zero modes." This is significant because Nature's editors, who accepted the paper for publication, felt it necessary to explicitly clarify that the experimental results did not demonstrate the claimed physical phenomenon. This is unusual in high-profile journal publication and signals that even the paper's publishers do not endorse the strongest interpretations of the work. It also places a burden on independent researchers to scrutinize whether the interferometric parity measurement described constitutes evidence for topological protection.

---

**10.** What distinguishes D-Wave's commercial value proposition from that of IBM, Google, and IonQ?

??? success "Answer"
    D-Wave delivers commercial value today for combinatorial optimization problems using quantum annealing — without waiting for fault-tolerant quantum error correction. IBM, Google, and IonQ are building toward fault-tolerant universal quantum computing (a 2026–2030+ timeline depending on vendor). D-Wave cannot run algorithms requiring universal gates (Shor's, Grover's) but is already deployed in production at Ford Otosan and a major U.S. airline for optimization. The distinction is: D-Wave solves a narrower class of problems (combinatorial optimization) but delivers value now, while gate-based vendors solve a broader class of problems but require several more years of hardware development.

---

## Level 3 — Apply (Questions 11–15)

**11.** IBM's Blue Jay processor targets 2,000 logical qubits. If the gross code uses a 24:1 physical-to-logical qubit ratio (as described for Kookaburra), approximately how many physical qubits would Blue Jay require?

??? success "Answer"
    $2{,}000 \text{ logical} \times 24 \text{ physical/logical} = 48{,}000$ physical qubits. This is approximately 48,000 physical qubits, spread across multiple modules. At Nighthawk-class chip density (~1,400 qubits per chip), this would require roughly 34 chips — consistent with IBM's modular multi-chip architecture described in Chapter 10.

---

**12.** A technology executive is evaluating whether to plan a quantum computing initiative around IBM's Starling (2028–2029) or IonQ's two-chip system (2028). Apply the five-criterion roadmap evaluation framework from Worked Example 9.3 to compare these two milestones.

??? success "Answer"
    **IBM Starling:** (1) Track record: 5/5 on-schedule deliveries; (2) Peer review: all milestones leading to Starling are published; (3) Replication: foundational physics confirmed; (4) Specificity: explicit qubit counts and gate counts projected; (5) Physical plausibility: engineering execution of demonstrated component technologies. **High credibility.**

    **IonQ 2028 two-chip system:** (1) Track record: met every #AQ target; (2) Peer review: 99.99% fidelity paper under review; (3) Replication: foundational Oxford Ionics and Lightsynq physics need independent confirmation; (4) Specificity: explicit qubit counts and timelines stated; (5) Physical plausibility: requires successful integration of multiple newly acquired technologies simultaneously — higher engineering risk than IBM's internally developed architecture. **Moderate credibility, higher upside if acquisitions integrate well.**

    Executive recommendation: plan primary quantum initiative around IBM Starling (higher credibility, explicit pharmaceutical use case); monitor IonQ for potentially better near-term performance if acquisition integration proceeds.

---

**13.** Using the gross code ratio described in Chapter 9, if a processor has 1,440 physical qubits and uses the gross code with 12 logical qubits per 288 physical, how many logical qubits can it support? What is the code distance?

??? success "Answer"
    $\lfloor 1{,}440 / 288 \rfloor = 5$ code blocks $\times 12$ logical qubits per block $= 60$ logical qubits. The code distance for the gross code as described is $d = 12$. So this processor supports 60 logical qubits at code distance 12.

---

**14.** NVIDIA's NVQLink targets sub-4 μs latency between Grace Blackwell GPUs and quantum processors. A surface code cycle time for a superconducting processor is approximately 1 μs. Is NVQLink's latency fast enough for real-time error correction decoding? Explain.

??? success "Answer"
    A surface code running at 1 μs cycle time generates syndrome data that must be decoded before the *next* cycle completes — ideally within 1 μs, or at minimum within a few cycles to avoid backlog. NVQLink's sub-4 μs latency is at the boundary of being fast enough: it is faster than many alternatives (e.g., Ethernet at ~1ms), but a 4 μs decoder latency means the decoder may lag 4 cycles behind the hardware. In practice, GPU decoders using NVQLink are designed to process multiple syndrome rounds in parallel, keeping the backlog manageable. The sub-4 μs threshold is therefore a minimum specification; actual deployed systems aim for sub-1 μs decoder throughput. NVQLink is necessary but not sufficient — the GPU decoder algorithms also matter.

---

**15.** IonQ's Forte Enterprise has 36 physical qubits with all-to-all connectivity and 99.6% two-qubit gate fidelity. A competitor has 100 physical qubits with nearest-neighbor connectivity and 99.5% two-qubit gate fidelity. Which system would you expect to have a higher #AQ for a 30-qubit circuit? Why?

??? success "Answer"
    IonQ Forte Enterprise would likely have a higher #AQ for a 30-qubit circuit. Two reasons: First, all-to-all connectivity means a 30-qubit random algorithm runs without SWAP overhead; on the nearest-neighbor 100-qubit system, implementing 30-qubit all-to-all gates requires many SWAPs that multiply gate count and error. Second, gate fidelity (99.6% vs 99.5%) differs by only 0.1%, but SWAP overhead can double or triple the effective two-qubit gate count. The nearest-neighbor system's SWAP overhead likely more than offsets its higher physical qubit count. This is precisely what #AQ is designed to measure: integrated system performance, not raw physical qubit count.

---

## Level 4 — Analyze (Questions 16–20)

**16.** Analyze the pattern of IBM's milestone delivery from Eagle (2021) through Loon (2025). What does the delivery pattern suggest about Kookaburra's (2026) probability of delivery? What are the main risks?

??? success "Answer"
    IBM has delivered Eagle (2021), Osprey (2022), Heron (2023-2024), Nighthawk (2025), and Loon (2025) — five consecutive milestones on or ahead of schedule. Loon was explicitly delivered one year ahead of schedule. This consistent execution suggests a mature development process with reliable milestone estimation. Kookaburra's probability of delivery on schedule appears high relative to any other vendor.

    Main risks: (1) **Integration complexity** — Kookaburra requires chip-to-chip coupling, which involves new fabrication and assembly steps not previously demonstrated at production scale; (2) **Yield** — the gross code requires all three chips to perform at high fidelity simultaneously; a single low-quality chip could limit the logical qubit count; (3) **Decoder** — the real-time qLDPC decoder demonstrated in Loon must now operate at 3× the problem size; (4) **Supply chain** — multi-chip cryogenic assembly introduces new points of failure. None of these risks are novel physics risks — they are engineering risks, which IBM's track record suggests it manages well.

---

**17.** Compare and contrast the scaling approaches of IBM (superconducting, modular chips) and IonQ (trapped ion, photonic networking). What are the fundamental advantages and limitations of each approach for reaching 1,000+ logical qubits?

??? success "Answer"
    **IBM (superconducting, microwave chip-to-chip links):**
    - Advantages: demonstrated fabrication scalability, fast gate times (~100ns), mature control electronics, on-schedule delivery history
    - Limitations: requires all modules at 15 mK (enormous cryogenic overhead at scale), microwave chip-to-chip links are lossy (target >99% fidelity, vs >99.9% on-chip), low physical error rates (0.3%) require high QEC overhead

    **IonQ (trapped ion, photonic networking):**
    - Advantages: very low physical error rates (99.99% achieved), photonic interconnects can work at room temperature between cryostats, all-to-all connectivity reduces SWAP overhead, long coherence times
    - Limitations: slow gate times (~1 μs vs 100ns for superconducting), photonic interconnect success rates are probabilistic (partially addressed by Lightsynq memory buffering), integration of multiple acquisitions creates organizational risk, no on-chip 10,000-qubit system yet demonstrated

    For 1,000+ logical qubits: IBM's path requires more physical qubits per logical qubit but has a clearer engineering roadmap. IonQ's path requires fewer physical qubits per logical qubit (due to lower error rates) but has higher integration risk. Both are plausible; IBM is nearer-term credible.

---

**18.** The chapter describes Google's quantum advantage claim for Sycamore (2019) as "disputed by later classical algorithms." Yet the October 2025 Willow quantum advantage result is described as "verifiable." What changed between 2019 and 2025 in how quantum advantage is demonstrated and verified?

??? success "Answer"
    The 2019 Sycamore claim used random circuit sampling with an estimated classical simulation time of 10,000 years. The limitation was that this estimate depended on the best *known* classical algorithms at the time — and within months, improved tensor network simulation methods reduced the classical time to days. The "advantage" was effectively an advantage over known algorithms, not an unconditional advantage.

    The 2025 Willow result used a verification protocol designed to be resistant to tensor network attacks: a random circuit sampling task with a cross-entropy benchmarking variant where the classical difficulty can be more rigorously lower-bounded. The 13,000× speedup is measured against *current best* classical algorithms on *current best* classical hardware (including classical supercomputers), and the protocol is designed so that classical simulation cannot exploit the same shortcuts that defeated the 2019 claim. The 2025 result is therefore "verifiable" in the sense that the quantum advantage is established against a stronger adversarial classical baseline.

---

**19.** Microsoft's 2021 Science paper on Majorana modes was retracted, and now the 2025 Nature paper carries an editorial caveat. Analyze what this history implies for how the scientific community should (and does) treat extraordinary experimental claims in quantum computing.

??? success "Answer"
    The pattern — a 2021 retraction followed by a 2025 paper with editorial caveat — suggests a systemic challenge specific to Majorana research: the signals expected from Majorana modes are subtle, easily mimicked by mundane physics, and extremely difficult to distinguish experimentally from trivial effects. Sergey Frolov's role in both episodes illustrates the importance of persistent external scrutiny.

    The scientific community's response has been appropriately calibrated: not blanket dismissal (the Nature paper was published, the theoretical physics is sound, Sankar Das Sarma and Scott Aaronson take the claims seriously) but elevated evidentiary standards (the Nature editorial caveat, the absence of independent replication, the Australian preprint on 1/f noise limits). This represents peer review working as intended — extraordinary claims receive extraordinary scrutiny, not reflexive acceptance or reflexive rejection.

    For technology planning, the lesson is: distinguish between the *theoretical plausibility* of an approach (high for topological qubits) and the *experimental confirmation* of its practical implementation (absent for topological qubits as of March 2026). Both matter, and conflating them leads to either premature investment or premature dismissal.

---

**20.** Analyze why NVIDIA's investment in quantum computing (CUDA-Q, NVQLink, minority stakes across multiple vendors) represents a strategically different position than the investments of IBM, Google, or IonQ in their own hardware.

??? success "Answer"
    IBM, Google, and IonQ are placing *technology bets*: each has committed to a specific physical implementation (superconducting, superconducting, trapped-ion respectively) and must be right about that technology winning or be stranded. NVIDIA is placing a *platform bet*: by building CUDA-Q as a vendor-neutral programming interface and NVQLink as a hardware interconnect that works across modalities, NVIDIA profits regardless of which physical platform wins.

    This mirrors NVIDIA's historical strategy in AI: NVIDIA did not try to determine whether image recognition, language modeling, or protein folding would dominate deep learning. It built the GPU and CUDA ecosystem that all of them require. If IBM wins and all quantum computing runs on superconducting chips, CUDA-Q runs on IBM backends. If IonQ wins, CUDA-Q runs on ion trap backends. NVIDIA collects the tolls on either path.

    The additional insight is that the classical decoding and control problem — running real-time QEC decoders that must operate on microsecond timescales — is a large, GPU-amenable workload that will exist regardless of hardware platform. NVQLink's sub-4 μs latency is a genuine technical contribution, not just marketing positioning.

---

## Level 5 — Evaluate (Questions 21–25)

**21.** A CXO asks you to evaluate whether to commit $50M to a quantum computing initiative centered on IBM's Kookaburra (projected 2026) versus waiting for Starling (projected 2028–2029). What factors would you weigh, and what recommendation would you make?

??? success "Answer"
    **Factors favoring Kookaburra (2026) investment:**
    - Strong delivery credibility (5/5 IBM milestones delivered)
    - Kookaburra provides first access to logical qubit operation — valuable for building organizational capability and algorithm development pipelines
    - 2026 timing allows 2+ years of learning before Starling-class systems appear
    - First-mover advantage in developing quantum algorithms for your specific industry

    **Factors favoring waiting for Starling:**
    - Kookaburra's ~173 logical qubits may be insufficient for production-scale pharmaceutical or financial calculations (Starling's 200 logical qubits + $10^8$ gates is the threshold for early drug discovery applications per Chapter 10)
    - Starling represents a more mature platform with less technical risk for deploying actual applications
    - $50M committed to Kookaburra-era algorithm development may produce results only deployable on Starling-era hardware anyway

    **Recommendation:** A hybrid approach. Commit $10–15M now to a Kookaburra-era capability-building program — algorithm development, talent acquisition, partnership with IBM Research — but do not commit the full $50M until Kookaburra delivers logical qubit operation results (expected late 2026). The $50M deployment decision should be made on the basis of Kookaburra's actual performance, not its projected performance.

---

**22.** Evaluate the strength of evidence for IonQ's claim that Lightsynq photonic interconnects achieve 50× higher inter-module entanglement rates than probabilistic photon approaches. What evidence would you want to see before treating this as established fact?

??? success "Answer"
    As of March 2026, the 50× figure is a **projected specification**, not a demonstrated experimental result. Lightsynq was acquired in 2025; independent peer-reviewed experimental results from the Lightsynq technology have not yet appeared in the literature under IonQ ownership.

    To treat this claim as established fact, one would want:
    (1) A peer-reviewed paper demonstrating two-module entanglement generation with the memory-buffered architecture at the claimed rate
    (2) Independent replication by a group not affiliated with IonQ or Lightsynq
    (3) Characterization of the entanglement fidelity (rate alone is insufficient — high rate with low fidelity does not constitute a useful interconnect)
    (4) Demonstration at cryogenic operating conditions representative of full system deployment (not room-temperature proof-of-concept)

    The theoretical basis for memory-buffered asynchronous photonic links achieving higher rates than synchronous probabilistic links is sound — quantum memory buffering eliminates the penalty for timing mismatches. But the specific 50× figure requires experimental validation. IonQ's credibility in meeting #AQ targets supports tentative confidence; the acquisition-integration risk counsels caution.

---

**23.** A quantum computing vendor announces a processor with 10,000 qubits and claims it demonstrates "quantum advantage for financial portfolio optimization." Applying the five-criterion framework from Worked Example 9.3, evaluate what information you would need to assess this claim.

??? success "Answer"
    Using the five criteria:

    **1. Track record:** Has this vendor previously delivered processors meeting their specified qubit count and gate fidelity? Have prior claims been peer-reviewed and independently verified?

    **2. Peer-reviewed publication:** Is the quantum advantage claim published in a refereed journal with full methodology? "Quantum advantage" claims require comparison against the best available classical algorithms, not just slow classical implementations. Is the computational task well-defined?

    **3. Independent replication:** Have other groups reproduced the quantum advantage result? Financial optimization tasks are classical-algorithm-rich domains; has the comparison been made against state-of-the-art classical portfolio optimizers?

    **4. Near-term milestone specificity:** Are the 10,000-qubit specifications verified by independent benchmarks? What is the #AQ or equivalent integrated quality metric — raw qubit count on its own is insufficient?

    **5. Physical plausibility:** What error correction scheme supports 10,000 physical qubits? How many logical qubits does this represent? Portfolio optimization at commercially relevant scale likely requires hundreds of logical qubits — are those available from this system?

    Without positive answers to criteria 2 (peer review) and 3 (classical comparison against best algorithms), the claim should be treated as unverified marketing.

---

**24.** The chapter notes that Microsoft's topological approach has been "probably 20–30 years behind other platforms" according to Hensinger, yet Microsoft has invested in this approach since approximately 2005. Evaluate whether this continued investment represents irrational persistence or rational strategic choice.

??? success "Answer"
    **Case for rational strategy:** Topological protection, if achieved, would provide error rates low enough that fault-tolerant quantum computing might require 10–100× fewer physical qubits than any other approach. The expected value calculation — low probability of a very large payoff — can rationally justify sustained investment, especially for a company (Microsoft) with the financial resources to carry a 20-year research program. The theoretical foundations are rigorous; the experimental difficulty is engineering, not physics impossibility.

    **Case for irrational persistence:** Microsoft has invested approximately two decades and very large resources (Station Q, multiple nanowire research programs) in a technology that has produced zero independently verified qubits. The 2021 retraction represents a significant setback. The 2025 Nature paper's editorial caveat suggests the community remains unpersuaded. At some point, continued investment without results shifts from patient strategy to sunk-cost fallacy.

    **Balanced assessment:** Microsoft's investment is probably rational at the *corporate level* — the potential payoff justifies some continued investment — but the implicit claim that topological qubits are on a near-term competitive timeline with superconducting or trapped-ion systems is not supported by evidence. Microsoft should invest in topological research while building quantum capabilities on proven platforms (as it does via Azure Quantum partnerships with IonQ and Quantinuum) — not treat unconfirmed results as a substitute for demonstrated systems.

---

**25.** Google publishes Willow results in Nature with $\Lambda = 2.14$ at $d = 7$. IBM's Loon chip demonstrates real-time qLDPC decoding under 480 ns. Both are described as critical milestones. Which result is more significant for the long-term prospects of fault-tolerant quantum computing, and why?

??? success "Answer"
    Both results are critical and address different bottlenecks; their relative importance depends on the specific path to fault-tolerant quantum computing.

    **Google's $\Lambda = 2.14$** is more fundamental scientifically: it demonstrates that the surface code actually operates in the below-threshold regime on a real physical device. Without $\Lambda > 1$, no amount of engineering can make the surface code work — more qubits would make things worse. Willow closes the question of whether fault-tolerant QEC is physically achievable.

    **IBM's sub-480 ns decoder** is more significant for a specific architecture (qLDPC-based modular systems). qLDPC codes offer dramatically lower physical-to-logical qubit overhead than surface codes ($O(\log n)$ vs $O(1)$ scaling in some regimes), but require decoders that can operate at the code cycle rate. If IBM's decoder work enables qLDPC codes to operate in real-time, the resource reduction could be 10–100× compared to surface code alternatives.

    **Net assessment:** Google's Willow result is more broadly significant — it confirms the physics works for any surface-code-based approach. IBM's Loon result is more significant for the specific modular-qLDPC path, which may ultimately be more resource-efficient. Both should be considered together as establishing that fault-tolerant quantum computing is an engineering problem, not a physics problem.

---

## Level 6 — Create (Questions 26–30)

**26.** Design a quantum hardware evaluation scorecard for a pharmaceutical company considering a 3-year quantum computing initiative. What metrics would you track quarterly, what thresholds would trigger acceleration or pause, and how would you weight delivered vs. projected milestones?

??? success "Answer"
    **Quarterly tracking metrics:**
    - Logical qubit count (IBM Kookaburra target: 173 by Q4 2026; Cockatoo: 24 by Q4 2027)
    - Logical gate fidelity (target: >99.9% for pharmaceutical applications)
    - Circuit depth achievable (gate count before circuit fidelity degrades)
    - Peer-reviewed publications from key vendors (number per year, journal quality)
    - Independent replication of vendor claims by academic groups
    - Algorithm resource estimates for your specific target molecules (quarterly update as hardware improves)

    **Acceleration triggers:** IBM Kookaburra delivers 100+ logical qubits by Q2 2027 (ahead of schedule); IonQ smooth gate result peer-reviewed and confirmed; quantum simulation of a target molecule active site with >5× speedup over classical DFT

    **Pause triggers:** Kookaburra misses logical qubit target by >50%; no peer-reviewed demonstrations of logical qubits from any vendor by Q1 2027; classical simulation improvements eliminate the molecular simulation quantum advantage window

    **Weighting scheme:** Delivered milestones count 3× projected milestones when forecasting timelines. A delivered result from any vendor informs estimates for all vendors. Independently replicated results count 2× single-vendor results.

---

**27.** IBM's modular scaling roadmap uses c-couplers → l-couplers → universal adapters as three hierarchical tiers. Create an analogous three-tier hierarchy for IonQ's photonic networking approach, naming the analogous technology at each tier and its current delivery status.

??? success "Answer"
    **IonQ three-tier photonic hierarchy:**

    **Tier 1 — Intra-trap connectivity (analogous to c-couplers):** All-to-all connectivity within a single ion trap via laser-mediated phonon modes. IonQ's current systems achieve this with 99.99% two-qubit gate fidelity. **Status: DELIVERED** (Forte Enterprise, October 2025 smooth gates result).

    **Tier 2 — On-chip 2D array connectivity (analogous to l-couplers, intra-module):** Oxford Ionics 2D trap arrays with microwave-driven gates enabling connectivity across a wafer-scale 2D ion array. Eliminates the need for photonic links within a single chip. **Status: PROJECTED** (256-qubit system 2026, 10,000-qubit system 2027).

    **Tier 3 — Inter-module photonic networking (analogous to universal adapters):** Lightsynq memory-buffered photonic interconnects linking separate trap modules via fiber optic channels. Asynchronous entanglement enables inter-module logical qubit operations without re-encoding. **Status: PROJECTED** (two-chip system 2028).

    The key structural difference from IBM's hierarchy: IonQ's Tier 2 (2D trap arrays) replaces the need for intra-module quantum links (IBM's l-couplers) with a fundamentally different physical substrate, while IonQ's Tier 3 (photonic networking) provides inter-module connectivity at longer range than IBM's microwave l-couplers can support.

---

**28.** Create a 2-page briefing document outline (section headers and key bullets only) for a CXO who must decide in Q1 2026 whether to partner with IBM, IonQ, or Google for a quantum computing initiative in financial services (specifically: portfolio optimization and credit risk modeling).

??? success "Answer"
    **CXO Briefing: Quantum Computing Partnership Selection for Financial Services**
    *Q1 2026 Decision Document*

    **Executive Summary**
    - Recommendation: Primary partnership with IBM; secondary monitoring of IonQ; defer Google
    - Decision timeline: 60 days; commitment level: $5M proof-of-concept, with $20M decision gate at Kookaburra delivery

    **Section 1: Current State of Quantum Hardware**
    - No vendor has demonstrated fault-tolerant computation useful for portfolio optimization or credit risk at production scale
    - IBM Kookaburra (2026): first logical qubit system — proof-of-concept feasibility window
    - IonQ Forte Enterprise: #AQ 36, production system, appropriate for algorithm development
    - D-Wave: deployable today for combinatorial optimization; separate evaluation recommended

    **Section 2: Use Case Fit Analysis**
    - Portfolio optimization: D-Wave (today), IBM Kookaburra (2026–2027 algorithm dev), IBM Starling (2029 production)
    - Credit risk modeling: Monte Carlo acceleration possible with gate-based NISQ (limited) → fault-tolerant target 2029+
    - Algorithm development timeline: 18–24 months to production-ready algorithms regardless of hardware

    **Section 3: Vendor Risk Assessment**
    - IBM: highest credibility, cloud access available now, Poughkeepsie QDC for enterprise SLA
    - IonQ: higher upside if Oxford Ionics integration succeeds, higher integration risk, cloud available
    - Google: no enterprise cloud product for financial use cases; research partnership possible; defer

    **Section 4: Recommended Partnership Structure**
    - Immediate: IBM Quantum Network membership ($500K/yr); algorithm development for target use cases
    - Q3 2026: Evaluate Kookaburra performance; decision on expanding to IonQ Tempo partnership
    - 2028: Production pilot on IBM Cockatoo or IonQ 256-qubit system
    - 2029: Starling-era production deployment decision

    **Section 5: Key Risk Factors**
    - Classical algorithm improvements may close quantum advantage window for specific use cases
    - Talent scarcity: quantum algorithm developers with finance domain knowledge are rare
    - Regulatory uncertainty: quantum computing outputs in regulated financial models may require validation frameworks not yet established

---

**29.** Synthesize the roadmap information from Chapter 9 to create a predicted "state of quantum computing" timeline for 2026, 2027, 2028, and 2029. For each year, identify the most credible hardware milestone, the most credible algorithm capability, and the most plausible commercial application.

??? success "Answer"
    **2026:**
    - Hardware: IBM Kookaburra — first multi-chip processor with ~173 logical qubits (PROJECTED, HIGH CREDIBILITY). Google: continued Willow-class demonstrations. IonQ: 256-qubit Oxford Ionics processor.
    - Algorithm capability: First demonstrations of small fault-tolerant circuits on logical qubits. Quantum simulation of small molecules ($\leq 20$ active electrons) with full QEC. IBM + HPC hybrid advantage demonstration.
    - Commercial application: Early pharmaceutical algorithm development on logical qubits; D-Wave optimization at scale for logistics and scheduling.

    **2027:**
    - Hardware: IBM Cockatoo — 24 logical qubits across entangled multi-chip system. IonQ: ~10,000-qubit single chip, ~800 logical qubits (if Oxford Ionics integration succeeds). Quantinuum and QuEra: 1,000+ physical qubits.
    - Algorithm capability: ~24–100 logical qubits available; quantum chemistry for drug-like molecules (~40 active electrons); fault-tolerant quantum Monte Carlo begins.
    - Commercial application: First quantum-assisted drug candidate screening for small lead compounds; financial risk modeling proof-of-concepts.

    **2028:**
    - Hardware: IBM pre-Starling class; IonQ two-chip photonic system (~1,600 logical qubits if Lightsynq delivers). Google: large-scale surface code demonstration.
    - Algorithm capability: 100–200 logical qubits available. Ibrutinib-class drug simulations feasible (~80 active electrons per Chapter 10 resource estimates). T-gate counts in the $10^7-10^8$ range.
    - Commercial application: First pharmaceutical company runs quantum simulation to inform a drug candidate selection. Quantum portfolio optimization for large asset managers.

    **2029:**
    - Hardware: IBM Starling — 200 logical qubits, $10^8$ T-gates. Multiple vendors at 100+ logical qubits.
    - Algorithm capability: Full quantum chemistry for real drug discovery targets. Quantum advantage over classical CCSD(T) for strongly correlated systems. Early cryptographically relevant integer factoring demonstrations (small key sizes).
    - Commercial application: First quantum simulation results contributing to an approved drug development pipeline. Quantum computing as a standard tool in computational chemistry groups at top pharmaceutical companies.

---

**30.** Design a hypothetical study that would definitively resolve whether Microsoft has demonstrated Majorana zero modes. Specify the experimental conditions, the measurements required, the comparison groups, and the publication standards that would satisfy the scientific community's current skepticism.

??? success "Answer"
    **Study Design: Definitive Majorana Zero Mode Verification**

    **Hypothesis to test:** InAs/Al topoconductor nanowire devices host topological Majorana zero modes that provide measurable topological protection against local perturbations.

    **Required experimental conditions:**
    - Multiple device samples from at least two independent fabrication runs (to demonstrate reproducibility)
    - Disorder characterization meeting Sankar Das Sarma's "factor of two" improvement threshold (mean free path and coherence length measurements)
    - Temperature: base temperature $\leq 30$ mK to suppress trivial Andreev bound states that mimic Majorana signatures

    **Required measurements:**
    - Topological phase boundary mapping: demonstrate a clear phase transition as a function of magnetic field and chemical potential consistent with topological band structure theory
    - Non-Abelian braiding statistics: fuse two Majorana modes and measure the resulting state — non-Abelian statistics would give a definitive signature impossible with trivial Andreev states
    - Single-shot parity measurement with error rate below 1% (demonstrated independently of braiding)
    - Decoherence characterization specifically testing for 1/f noise at operating conditions, with comparison to the Australian preprint's theoretical predictions

    **Comparison groups:**
    - Same device architecture fabricated without topoconductor (pure semiconductor nanowire): should not show Majorana signatures
    - Same device measured above the topological phase boundary (paramagnetic phase): should not show topological protection

    **Publication standards:**
    - Submission to Nature or Science with full raw data deposited in a public repository
    - Independent analysis of raw data by at least one group not affiliated with Microsoft (open data requirement)
    - Replication by at least two independent groups (academic laboratories with no Microsoft funding) within 12 months of publication
    - Explicit response to Frolov's reproducibility criteria checklist in the supplementary methods

    **Specific test against the 2025 Nature caveat:** The 2025 paper demonstrated interferometric parity measurement but not Majorana zero modes per se. The definitive study must demonstrate that the parity measurement tracks a *topologically protected* degree of freedom — specifically, that applying a local perturbation at one end of the nanowire does not corrupt the parity state. This non-locality test is the gold standard that distinguishes topological Majorana modes from trivial Andreev bound states.
