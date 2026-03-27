---
title: "Chapter 9: Hardware Roadmaps — IBM, Google, Microsoft, IonQ, and the Modular Scaling Revolution"
chapter: 09
status: complete
concepts: 18
prerequisites: ["Chapter 8: Quantum Error Correction"]
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
---

# Chapter 9: Hardware Roadmaps — IBM, Google, Microsoft, IonQ, and the Modular Scaling Revolution

*"The best way to predict the future is to build it — but in quantum computing, you also have to publish it, replicate it, and meet your milestones."*

---

The quantum computing industry has entered a phase where roadmaps are no longer aspirational marketing documents. They are engineering commitments backed by peer-reviewed publications, supply chain contracts, and — in several cases — years of on-schedule delivery. This chapter surveys the five most consequential hardware programs of 2026 and evaluates their claims against the evidence. We distinguish rigorously between what has been **delivered** (peer-reviewed, independently verifiable), what is **projected** (publicly committed, credible but unverified), and what is **controversial** (disputed by the scientific community or unconfirmed by independent replication).

The central theme is convergence: despite radically different physical implementations — superconducting circuits, trapped ions, topological qubits, quantum annealing — virtually every serious vendor has arrived at the same architectural conclusion. Single chips will not scale to fault-tolerant quantum computing. The solution is modular: build many small, high-quality chips and connect them with quantum links. Chapter 10 explores the engineering of those links in depth. This chapter asks: who is building what, when, and how credibly?

---

## 9.1 IBM — The Modular Fault-Tolerant Architecture

IBM's quantum program is, by a substantial margin, the most detailed and transparently documented roadmap in the industry. IBM publishes multi-year plans, revises them publicly when milestones shift, and maintains a track record of delivery that allows meaningful extrapolation. The following account distinguishes delivered milestones — each with peer-reviewed backing — from projected future chips.

### 9.1.1 The Physical Qubit Generations: Eagle Through Heron

IBM's superconducting qubit program advanced through successive generations of transmon qubits on fixed-frequency architectures, with each processor generation targeting higher connectivity and lower error rates.

!!! success "Delivered"
    **Eagle (127 qubits, 2021).** IBM's first processor to cross the 100-qubit threshold. Eagle introduced a multilayer wiring approach that routed control signals above and below the qubit plane, enabling 127 qubits on a single die without the connectivity penalty that plagued earlier heavy-hex designs. Two-qubit gate error rates approached 1% for most pairs, demonstrating that 100+ qubit processors were an engineering problem, not a physics problem.

!!! success "Delivered"
    **Osprey (433 qubits, 2022).** More than tripled Eagle's qubit count on a single chip. Osprey demonstrated that IBM's multilayer fabrication approach was manufacturable at scale. The processor was available via IBM Quantum cloud within weeks of announcement, which distinguishes IBM from vendors who announce chips without providing access.

!!! success "Delivered"
    **Heron r2 (133 high-quality qubits, 2023–2024).** Heron represented a deliberate step backward in raw qubit count and a major step forward in qubit quality. By switching to a tunable-coupler architecture — where coupler qubits mediate gates between data qubits and can be tuned to suppress residual ZZ coupling — IBM achieved median two-qubit gate error rates below 0.3% on many device pairs. A fleet of Heron processors is deployed at IBM client sites and available via cloud, with 156-qubit configurations standard for enterprise deployments. Heron established the quality baseline that all subsequent IBM processors build upon.

!!! success "Delivered"
    **Nighthawk (2025): 120 qubits, 218 tunable couplers, 5,000+ achievable two-qubit gates.** Nighthawk advances the tunable-coupler architecture to 120 data qubits arranged on a square lattice, with 218 tunable couplers providing substantially richer connectivity than Heron's heavy-hex graph — more than 20% improvement in effective connectivity. The square lattice enables connectivity patterns required for bivariate bicycle (BB) qLDPC codes, which demand non-nearest-neighbor connections that are difficult or impossible on heavy-hex layouts. IBM reports that Nighthawk is capable of executing more than 5,000 two-qubit gates in a single circuit before circuit fidelity degrades below useful thresholds. Nighthawk is the platform IBM identifies for achieving quantum advantage demonstrations in 2026 via coupling with classical HPC simulation.

!!! success "Delivered"
    **Loon (2025) — The critical architectural milestone.** Loon is an experimental chip specifically designed to validate two technologies required for the modular architecture: c-couplers (long-range intra-chip connections enabling non-nearest-neighbor entanglement on the same die) and a real-time qLDPC decoder operating under 480 nanoseconds. The sub-480ns decoder threshold is critical: error correction must operate faster than qubit decoherence to keep the logical qubit alive. Loon demonstrated both technologies in combination. IBM reported these results **one year ahead of the originally projected schedule**, which significantly raises confidence in the Kookaburra timeline. A fleet of quantum computers is also available via cloud and at client sites, many equipped with 156-qubit Heron processors.

!!! tip "Business Implication"
    IBM's delivery track record matters enormously for risk assessment. Eagle (2021), Osprey (2022), Heron (2023), Nighthawk (2025), and Loon (2025) were all delivered on or ahead of schedule with peer-reviewed documentation. For technology executives evaluating quantum vendor risk, IBM's delivery consistency is the strongest evidence available that Kookaburra (2026) is not a roadmap fiction. No other vendor can point to this many consecutive on-schedule deliveries.

### 9.1.2 The Modular Generation: Kookaburra Through Blue Jay

The transition from single-chip to modular processors is the most important architectural shift in IBM's program. The following milestones represent IBM's projected path to fault-tolerant quantum computing.

!!! warning "Projected"
    **Kookaburra (2026) — First modular processor with logical qubits.** Kookaburra will link three Nighthawk-class chips using chip-to-chip couplers, yielding approximately 4,158 physical qubits in a single logical system. This will be the first quantum processor where separate fabricated chips function as a single integrated processor. Kookaburra incorporates a Logical Processing Unit (LPU) co-designed to implement the qLDPC gross code (a bivariate bicycle code variant encoding 12 logical qubits from 288 physical qubits at code distance $d = 12$). This represents IBM's first system with a credible path to running circuits on logical qubits, not just physical qubits. It is also IBM's first demonstration that separate chips connected via c-couplers behave as a unified quantum processor.

!!! warning "Projected"
    **Cockatoo (2027) — Inter-chip entanglement, 24 logical qubits.** Cockatoo will entangle two Kookaburra modules using l-couplers — inter-chip microwave links transmitting entangling signals through cryogenic cables between physically separate chips at 15 mK. IBM demonstrated the foundational physics of inter-chip microwave entanglement with its Flamingo processor in 2024. Cockatoo targets 24 logical qubits operating on an entangled multi-chip system — the first demonstration of a multi-chip fault-tolerant quantum processor.

!!! warning "Projected"
    **Starling (2028–2029) — Early fault-tolerant utility, ~200 logical qubits.** Starling is IBM's first system projected to deliver genuine computational utility for real-world problems. Targeting approximately 200 logical qubits and 100 million error-corrected gates ($10^8$ T-gates), Starling would enable quantum chemistry calculations for molecules in the range of 50–80 active electrons — covering early pharmaceutical applications including protein-ligand binding simulations for small-molecule drug candidates. Starling will incorporate magic state distillation factories required for universal fault-tolerant computation (logical T-gates cannot be implemented transversally and require resource-intensive ancilla preparation circuits). IBM projects Starling will be hosted at its Poughkeepsie Quantum Data Center and represent approximately 20,000× more error-corrected operations than current NISQ devices.

!!! warning "Projected"
    **Blue Jay (2033+) — Large-scale fault tolerance, 2,000 logical qubits.** Blue Jay targets 2,000 logical qubits and 1 billion gates ($10^9$). At this scale, Blue Jay would be capable of full molecular simulations of complex metalloenzyme active sites (including FeMoco, the active site of nitrogenase), financial portfolio optimization beyond classical reach, and other computationally intensive tasks. Blue Jay is IBM's long-term target, not a near-term engineering commitment — its specifications reflect extrapolation from the modular scaling architecture rather than near-term hardware plans.

### 9.1.3 The Modular Scaling Architecture

IBM's coupler hierarchy mirrors the evolution of classical computing interconnects:

- **C-couplers (intra-chip, demonstrated in Loon 2025):** Enable non-nearest-neighbor qubit connectivity on a single die. Analogous to the high-bandwidth bus architecture within a single CPU die.
- **L-couplers (inter-chip microwave links, planned Cockatoo 2027):** Transmit entangling microwave signals between chips via cryogenic cables. Analogous to chiplet interconnects in modern high-performance CPUs.
- **Universal adapters (bridges between modules):** Enable logical qubit transport between modules without re-encoding. Analogous to PCIe in classical computing: a standardized interface so that independently fabricated modules can function as a unified system.

The critical insight is that IBM is not simply scaling qubit counts. It is building an interconnect hierarchy that enables quantum processors to aggregate across fabrication boundaries — the same principle that allowed classical computing to scale from 1,000-transistor chips in 1970 to 100-billion-transistor dies in 2024. IBM targets quantum advantage demonstrations by end of 2026, using Nighthawk coupled with classical HPC simulation.

!!! example "Worked Example 9.1: Projecting Kookaburra's Logical Qubit Count"
    Kookaburra links three chips of approximately 1,386 physical qubits each (extrapolating Nighthawk's density), for a total of ~4,158 physical qubits. The gross code encodes 12 logical qubits per 288 physical qubits, giving a ratio of 24 physical qubits per logical qubit.

    $$\text{Logical qubits} = \left\lfloor \frac{4{,}158}{24} \right\rfloor \approx 173$$

    This approaches Starling's target of 200 logical qubits, suggesting that IBM's roadmap has meaningful engineering margin between Kookaburra and Starling — a sign of credible planning, not over-promising.

---

## 9.2 Google — The Surface Code Pioneers

Google's quantum hardware program is distinguished by its emphasis on scientific rigor and peer-reviewed publication before announcement. Google does not publish detailed multi-year roadmaps in the IBM style; instead, Google announces results when they are ready for Nature or Science and provides general decade-scale targets.

### 9.2.1 Delivered Milestones

!!! success "Delivered"
    **Sycamore (53 qubits, 2019) — Establishing the benchmark.** Google's Sycamore processor performed a specific random circuit sampling task in approximately 200 seconds that Google estimated would require 10,000 years on the best classical supercomputer of the era. The "quantum supremacy" claim was immediately contested — IBM argued classical simulation could be done in 2.5 days with tensor network methods — and subsequent classical algorithm improvements reduced the gap further. Sycamore's enduring significance is that it established random circuit sampling as the field's standard quantum advantage benchmark, and drove simultaneous investment in both quantum hardware and classical simulation.

!!! success "Delivered"
    **Willow (105 qubits, December 2024) — Below-threshold QEC and verifiable quantum advantage.** Willow is the most scientifically significant quantum processor delivered to date. It demonstrated two landmark results.

    First, **below-threshold quantum error correction:** as code distance increases from $d=3$ to $d=5$ to $d=7$, the logical error rate per cycle decreases exponentially. The per-step suppression factor $\Lambda$ was measured at $\Lambda = 2.14$. Because $\Lambda > 1$ — meaning adding more physical qubits makes the logical qubit *better*, not worse — this is the first unambiguous demonstration that the surface code is operating below the fault-tolerance threshold on a real device. As explained in Chapter 8, $\Lambda > 1$ is the single most important experimental criterion for scalable QEC. Prior to Willow, no device had demonstrated it unambiguously.

    Second, in **October 2025**, Google published a demonstration of verifiable quantum advantage using Willow for random circuit sampling: 13,000× faster than the best available classical algorithm on the best available classical hardware. Unlike the 2019 Sycamore claim, the October 2025 result used a protocol specifically designed to resist tensor network classical simulation attacks.

!!! success "Delivered"
    **Dynamic surface codes (January 2026).** Google demonstrated new variants of the surface code — hexagonal, walking, and iSWAP code variants — with improved leakage suppression. Leakage (when a qubit transitions to energy states outside the computational subspace $\{|0\rangle, |1\rangle\}$) is a significant error mechanism in superconducting qubits that standard surface codes handle poorly. The dynamic code variants represent a meaningful advance in practical QEC on superconducting hardware.

!!! tip "Business Implication"
    $\Lambda = 2.14$ from Willow is arguably the single most important experimental result in quantum error correction to date. It establishes that the surface code is working as theory predicts on real hardware — a fact that was not proven until December 2024. For enterprise strategy: this result closes the question of "will QEC ever work?" and opens the engineering question of "when will QEC work at useful scale?" Combined with IBM's Loon result (real-time qLDPC decoding under 480 ns), the physics of fault-tolerant quantum computing is no longer speculative.

### 9.2.2 Projected Milestones

!!! warning "Projected"
    **Large-scale fault-tolerant machine, end of decade.** Google's stated target is a fault-tolerant quantum computer with 1,000–10,000 logical qubits by approximately 2029–2030, with a target logical error rate of $\leq 1$ error per million QEC cycles. Google does not publish chip names or intermediate milestones in the IBM style, which makes independent progress tracking more difficult. The scientific credibility established by Willow's Nature publication suggests that when Google announces progress toward this target, it will be substantiated. Google's approach requires $\Lambda \approx 3{-}4$ to reach the logical error rates needed for large-scale algorithms — an engineering extrapolation from the demonstrated $\Lambda = 2.14$.

---

## 9.3 Microsoft — The Topological Qubit Gamble

Microsoft's quantum program is categorically different from all others surveyed in this chapter. IBM, Google, IonQ, and D-Wave are building systems with qubits whose underlying physics is well-established. Microsoft is betting on a fundamentally different type of qubit — the topological qubit based on Majorana zero modes — that would, if it works as theorized, offer dramatically lower intrinsic error rates without the full overhead of active error correction. The extraordinary promise of this approach must be weighed against its extraordinary unverified status.

### 9.3.1 The Theoretical Case for Topological Qubits

Conventional qubits (transmons, trapped ions) encode quantum information in local degrees of freedom — the energy level of a specific circuit or the internal state of a specific atom. Any local perturbation (electromagnetic noise, mechanical vibration, stray photons) can cause an error.

Topological qubits encode quantum information in non-local degrees of freedom — specifically, in the parity of Majorana zero mode pairs that are spatially separated. A local perturbation at one end of the nanowire cannot corrupt the quantum state because the information is distributed across both ends simultaneously. The qubit has no "handle" for local noise to grab. This property — topological protection — would in principle yield dramatically lower error rates without active QEC, reducing the overhead for fault-tolerant computation by potentially orders of magnitude.

### 9.3.2 Majorana 1 and the Community Response

!!! danger "Controversial"
    **Majorana 1 chip (February 2025).** Microsoft announced the "Majorana 1" chip, described as containing the first topological qubits, implemented using a "topoconductor" material — InAs semiconductor nanowires with epitaxial aluminum grown directly on the surface. A Nature paper published simultaneously reported interferometric single-shot parity measurement: a specific detection technique designed to read out the state of Majorana-based qubits. The chip design is intended to scale to 1 million qubits.

    The Nature editorial accompanying the paper explicitly stated: *"the results do not represent evidence for the presence of Majorana zero modes."* This editorial note is unusual and significant: Nature's editors, having accepted the paper, nonetheless felt it necessary to clarify that the experimental results did not demonstrate the claimed physical phenomenon.

!!! danger "Controversial"
    **Scientific community reaction.** The response has been genuinely divided, and a fair account requires representing multiple positions.

    Scott Aaronson (UT Austin): "If the claim stands, it would be a scientific milestone." Aaronson acknowledged that the Nature paper's claims are specific and falsifiable — the appropriate scientific disposition — and did not dismiss them.

    Winfried Hensinger (Sussex Ion Quantum Technology Group): "The peer-reviewed publication is quite clear — there is no proof for topological qubits." Hensinger characterized the topological approach as "probably 20–30 years behind other platforms" in terms of engineering readiness.

    Sergey Frolov (University of Pittsburgh) has been the most persistent critic. Frolov's concerns in 2021 contributed directly to Microsoft's retraction of an earlier Science paper claiming evidence for Majorana modes in nanowires — the only retraction in that journal's quantum computing history — which substantially elevated the burden of proof for subsequent Microsoft claims. Frolov argues that the foundational experimental evidence for Majorana modes in InAs/Al nanowires remains unproven.

    Sankar Das Sarma (University of Maryland), a theorist who has worked on Majorana-based quantum computing proposals for two decades, offered a measured assessment: he acknowledged significant materials progress but noted that "disorder still needs to go down by another factor of two" before topological protection becomes experimentally unambiguous.

    A July 2025 preprint from Australian researchers argued that 1/f noise decoherence in semiconductor nanowires imposes fundamental limits on Majorana-based qubits — even if Majorana modes exist — potentially undermining topological protection at practical operating conditions. Microsoft disputed the preprint's conclusions.

    Chetan Nayak (Microsoft Station Q) disclosed that subsequent to the Nature paper's submission in March 2024, unpublished Microsoft results demonstrate a working topological qubit with four Majorana zero modes and basic single-qubit operations. No independent group has replicated or verified these results as of March 2026.

!!! warning "Common Misconception"
    It is tempting to dismiss Microsoft's approach as mere wishful thinking, or conversely to accept Microsoft's framing that the topological qubit has been demonstrated. Neither is accurate. The theoretical physics of Majorana zero modes is mathematically rigorous and well-founded. The experimental claim — that Majorana zero modes have been created and controlled in InAs/Al nanowires — remains unverified by independent replication. These are separate questions, and conflating them distorts both the scientific and strategic assessment.

**Honest Assessment for Decision-Makers.** Topological qubits could be transformative if they work as theorized. As of March 2026, no peer-reviewed paper demonstrates a working topological qubit. The approach may eventually leapfrog all other platforms; it may also remain perpetually a decade away, as it has been since approximately 2005. Do not build quantum strategy around topological qubits for the 2026–2029 window. If Microsoft's unpublished results are confirmed by independent groups in the next 12–24 months, this assessment should be revisited urgently — the timeline implications would be significant.

---

## 9.4 IonQ — The Acquisition-Driven Scaling Strategy

IonQ occupies a unique position in the quantum landscape: the only pure-play publicly traded quantum computing company with genuine commercial revenue, and a roadmap built on an unusually aggressive acquisition strategy. Where IBM and Google build everything in-house, IonQ is assembling a portfolio of complementary technologies through acquisition — and betting on integration to follow.

### 9.4.1 Current Commercial State

!!! success "Delivered"
    **Forte Enterprise: 36 algorithmic qubits (#AQ 36).** IonQ's current commercial system uses ytterbium ion qubits in a linear Paul trap, rack-mounted for data center deployment. The key metric is Algorithmic Qubits (#AQ): the largest $n$ for which the system can execute a representative $n$-qubit algorithm with greater than 50% success probability. #AQ 36 means a full 36-qubit circuit succeeds — not a trivial threshold. Forte Enterprise achieves 99.6% two-qubit gate fidelity with all-to-all connectivity (any pair of ions can interact directly via laser-mediated phonon modes). All-to-all connectivity eliminates the SWAP overhead required on nearest-neighbor architectures, making IonQ's effective computational power higher than raw qubit count suggests.

!!! success "Delivered"
    **99.99% two-qubit gate fidelity (October 2025, arXiv preprint).** IonQ demonstrated two-qubit gate fidelity of 99.99% — error rate $10^{-4}$ per gate — using a technique called "smooth gates": optimized laser pulse shapes that suppress sensitivity to classical control noise. Crucially, this result was achieved *without* ground-state cooling, which is normally required for high-fidelity trapped-ion gates. Eliminating ground-state cooling reduces cycle time and simplifies the experimental apparatus significantly. If confirmed by peer review, this would represent the highest two-qubit gate fidelity demonstrated on any qubit modality at multi-qubit scale.

!!! success "Delivered"
    **Commercial scale and financial position.** IonQ became the first pure-play quantum company to exceed $100 million in annual revenue in 2025, with approximately $3.5 billion in net cash. Over $3 billion in acquisitions were executed in 2025: Oxford Ionics ($1B+, 2D ion trap technology), Lightsynq ($1.1B, photonic quantum networking), ID Quantique (quantum key distribution), Vector Atomic (optical atomic clocks), Capella Space (satellite quantum communications), and a planned $1.8 billion acquisition of SkyWater Technology, a DMEA Category 1A trusted semiconductor foundry. Vertical integration from chip fabrication to system integration — if the SkyWater acquisition closes — would give IonQ a supply chain position no other quantum company has attempted.

!!! tip "Business Implication"
    IonQ's 99.99% gate fidelity result deserves attention beyond the raw number. At $10^{-4}$ physical error rate, IonQ's ions are already near the threshold where fault-tolerant error correction becomes dramatically more efficient — approximately 100–1,000 physical qubits per logical qubit rather than 1,000–10,000. IonQ's path to useful logical qubit counts may therefore require fewer physical qubits than superconducting competitors, partially compensating for the lower absolute qubit count in current systems. A 10,000-qubit IonQ system with $10^{-4}$ error rate could support more logical qubits than a 100,000-qubit superconducting system with $10^{-3}$ error rate.

### 9.4.2 The Scaling Roadmap

!!! warning "Projected"
    **Tempo (2025): 64+ qubits, #AQ 64.** Tempo switches from ytterbium to barium ions. Barium's optical properties allow all qubit operations using visible light rather than UV light, enabling the use of standard photonics manufacturing. Barium also has favorable nuclear spin properties for high-coherence operation. Tempo targets #AQ 64 — double Forte Enterprise's algorithmic capability.

!!! warning "Projected"
    **256-qubit processor (2026) — Oxford Ionics 2D trap technology.** Incorporating Oxford Ionics' wafer-fabricated 2D ion trap arrays with microwave-driven gates (Electronic Qubit Control, EQC) replacing laser gates. The 2D architecture enables 300× higher ion density than 1D linear chains. At 256 qubits with Oxford Ionics' demonstrated fidelities, IonQ projects #AQ 64+ for large algorithm classes.

!!! warning "Projected"
    **Single-chip ~10,000 physical qubits (2027) — ~800 logical qubits.** Oxford Ionics' 2D trap arrays, scaled to wafer dimensions, project to approximately 10,000 physical ions per chip. IonQ projects approximately 800 logical qubits with per-logical-gate error rates below $10^{-7}$, leveraging the favorable physical error rates to reduce QEC overhead.

!!! warning "Projected"
    **Two interconnected chips via Lightsynq (2028) — ~20,000 physical qubits, ~1,600 logical qubits.** The Lightsynq memory-buffered photonic interconnects would link two 10,000-qubit chips with 50× higher inter-module entanglement rate than probabilistic photon-loss approaches. IonQ describes this as the first "distributed quantum supercomputer" — a two-chip system operating as a single logical processor via photonic quantum networking.

!!! warning "Projected"
    **Multi-module (2029–2030) — 2 million physical qubits, 40,000–80,000 logical qubits, error rates $<10^{-12}$.** IonQ's long-range multi-module vision targets the logical qubit counts required for practical Shor's algorithm attacks on 2048-bit RSA encryption — a commercially and policy-relevant threshold. The $10^{-12}$ per-gate error rate is ten billion times better than current physical rates, achievable only through concatenated or high-distance QEC.

### 9.4.3 Key Technologies

**Oxford Ionics 2D ion trap arrays.** Traditional trapped-ion quantum computers use 1D chains of ions in linear Paul traps. Ion chains longer than approximately 50 ions become dynamically unstable (motional modes crowd together and cross-talk). Oxford Ionics' 2D trap arrays, fabricated on silicon wafers, allow ions to be arranged in 2D grids. Microwave-driven gates replace laser gates — electronics can be mass-produced, precisely calibrated, and integrated directly with the trap chip, unlike laser systems requiring per-qubit optical alignment. Oxford Ionics achieves 300× higher trap density than 1D chains; at this density, a wafer-scale 2D array can host thousands of ions.

**Lightsynq memory-buffered photonic interconnects.** Photons are the natural carrier for quantum information between modules separated by more than a few centimeters. The challenge is that photon loss during transmission makes single-photon entanglement schemes probabilistic: most attempts fail. Lightsynq addresses this with quantum memory buffers at each module endpoint. When an entanglement attempt fails, the quantum memory holds the local qubit state until a successful photon arrives from the partner. The asynchronous architecture means the two modules do not need nanosecond-level synchronization — a major practical advantage over synchronous photonic link designs. The claimed 50× entanglement rate improvement over probabilistic approaches, if confirmed experimentally, would substantially reduce the time overhead of inter-module operations.

**Electronic Qubit Control (EQC).** Replacing lasers with electronic signals for qubit manipulation is not merely a cost optimization — it is a manufacturability transformation. Laser systems require precise optical alignment per qubit, vibration isolation, and ongoing maintenance. Electronic control can be integrated with the trap chip at the wafer level. EQC is the enabling technology for mass-manufactured ion trap quantum processors in the same way that eliminating manual wire bonding enabled mass-manufactured silicon CPUs.

!!! example "Worked Example 9.2: Understanding the #AQ Metric"
    Algorithmic Qubits (#AQ) is defined as the largest $n$ such that a system can execute a representative $n$-qubit algorithm with greater than 50% success probability. The representative circuit class used is Quantum Volume: $n$ layers of random two-qubit gates between random pairs of the $n$ qubits.

    Suppose a system has 100 physical qubits but can only run a 30-qubit Quantum Volume circuit with >50% success probability. Then #AQ = 30, not 100. The extra 70 physical qubits contribute noise without contributing computation.

    IonQ Forte Enterprise at #AQ 36 means all 36 qubits participate usefully in a 36-qubit algorithm. This is a statement about *integrated system quality*, not just physical qubit count.

    Why does all-to-all connectivity help? A nearest-neighbor processor with 100 qubits needs SWAP gates to route non-adjacent qubit interactions — each SWAP costs 3 CNOT gates. For a 36-qubit random circuit with many non-adjacent interactions, this overhead could easily consume half the circuit depth in SWAPs alone, reducing effective circuit depth and success probability. IonQ avoids this entirely.

**Critical Assessment.** IonQ's roadmap is the most ambitious and acquisition-dependent of any major vendor. Scaling from 36 to 10,000 physical qubits in two years has no precedent in any quantum hardware platform. Integrating Oxford Ionics, Lightsynq, SkyWater, and multiple other acquisitions simultaneously creates substantial organizational risk that should not be minimized. However, three factors strengthen credibility: the October 2025 four-nines fidelity result provides physics-level validation for the underlying approach; IonQ has met every #AQ target since the metric's introduction; and the Oxford Ionics microwave-gate approach directly solves the laser-alignment scaling bottleneck that prevents traditional trapped-ion systems from reaching thousands of qubits.

---

## 9.5 D-Wave — Quantum Annealing in Production Today

D-Wave represents the most important counterpoint to the narrative that quantum computing requires fault tolerance before delivering commercial value. D-Wave's quantum annealing architecture cannot run Shor's algorithm, cannot run Grover's algorithm, and is not on a path to universal gate-based fault-tolerant quantum computing. And yet D-Wave is delivering commercial value today, at scale, for real optimization problems — which is more than any gate-based quantum computer currently claims for production use.

!!! success "Delivered"
    **Advantage2 (4,400+ qubits, generally available May 2025).** D-Wave's Advantage2 processor uses quantum annealing: a physical process where the system evolves from a quantum superposition of all possible states toward the minimum-energy configuration of a problem Hamiltonian that encodes an optimization problem. Unlike gate-based quantum computers, there is no circuit, no qubit-by-qubit gate application. The "computation" is a single physical evolution. Advantage2 provides 4,400+ qubits connected by a Pegasus graph (15-connectivity per qubit), enabling representation of problems with up to approximately 4,400 binary variables. Hybrid solvers available via D-Wave's cloud platform support problems with up to 2 million variables by combining quantum annealing with classical heuristic optimization.

    **Production customers.** Ford Otosan (Ford's Turkish joint venture) uses D-Wave for factory scheduling optimization. A major U.S. airline uses D-Wave hybrid solvers for logistics optimization. D-Wave's revenue doubled in Q3 2025. The company is also developing a gate-model architecture in parallel — a strategic hedge acknowledging the field's long-term direction. D-Wave is also the only major quantum computing company other than IBM with a clearly demonstrated revenue-generating quantum hardware business.

!!! tip "Business Implication"
    D-Wave's commercial traction is the most important near-term quantum computing business story that enterprise technology leaders frequently underestimate. If your organization has combinatorial optimization problems — scheduling, routing, portfolio construction, facility placement — D-Wave's hybrid solvers should be evaluated now. The competitive differentiation window is open today, not in 2028. The strategic cost of waiting for gate-based fault tolerance is foregoing 3–5 years of potential optimization advantage in problems where D-Wave already works.

---

## 9.6 NVIDIA — The Hybrid Quantum-Classical Integration Layer

NVIDIA does not build quantum processors. NVIDIA builds the classical infrastructure that will be required to operate quantum processors at any useful scale — and is doing so with the same strategic foresight that made it the dominant platform for GPU-accelerated AI.

!!! success "Delivered"
    **CUDA-Q: Unified programming platform for hybrid quantum-classical workflows.** CUDA-Q provides a programming model that spans classical CPUs, NVIDIA GPUs, and quantum processors from multiple vendors. Code written in CUDA-Q runs on backends including IonQ, Quantinuum, QuEra, and multiple simulators, without modification. CUDA-Q is emerging as the de facto standard programming interface for quantum-classical hybrid computation — the quantum equivalent of CUDA's dominance in GPU computing. Major supercomputing centers adopting CUDA-Q and NVQLink include Jülich Supercomputing Centre (Germany), RIKEN (Japan), and the National Quantum Computing Centre (UK).

!!! success "Delivered"
    **NVQLink: Hardware quantum-classical interconnect, sub-4 μs latency, 400 Gb/s throughput.** NVQLink provides a hardware interface between NVIDIA Grace Blackwell GPUs and quantum processors. The sub-4 microsecond latency target is critical for error correction: quantum error correction decoders must process syndrome measurements faster than qubit decoherence times (typically a few microseconds for superconducting qubits). NVQLink collapses the classical decoding bottleneck by positioning GPU decoder hardware immediately adjacent to and tightly coupled with the quantum processor.

**Strategic investments across modalities.** NVIDIA has made investments in Quantinuum (trapped ion), QuEra (neutral atom), and PsiQuantum (photonic), hedging across all plausible long-term hardware winners while positioning CUDA-Q as the universal programming interface regardless of which platform prevails.

**Quantinuum Helios (November 2025).** Quantinuum's Helios processor (98 trapped-ion qubits) achieved 99.921% two-qubit gate fidelity — integrated with NVIDIA GPU clusters via NVQLink for real-time error correction decoding. Helios represents the first commercially available quantum system with GPU-integrated real-time decoding at this fidelity level.

**QuEra.** QuEra's neutral atom processors use optical tweezers to arrange rubidium atoms in programmable 2D arrays. QuEra is targeting 10,000+ physical qubits by 2026–2027. Neutral atom arrays have natural advantages for non-nearest-neighbor connectivity (reconfigurable by moving atoms) that complement superconducting approaches; they are examined in depth in Section 10.4.

!!! tip "Business Implication"
    NVIDIA's quantum strategy is the "picks and shovels" play: provide the infrastructure that all quantum computing requires, regardless of which hardware platform wins. For enterprise technology leaders, NVIDIA's quantum investment signals that the classical control and decoding problem is large enough to be a multi-billion-dollar market. Organizations building quantum capabilities should evaluate CUDA-Q as a programming standard now, before vendor-specific toolchains create technical debt that is expensive to unwind.

!!! example "Worked Example 9.3: Evaluating Vendor Roadmap Credibility — A Five-Criterion Framework"
    A technology executive must evaluate competing vendor claims. Five criteria provide a structured assessment:

    **1. Track record of delivery.** Has the vendor met previous milestones on schedule?
    IBM: 5/5 (Eagle through Loon). Google: 3/3 (Sycamore, Willow, dynamic codes). IonQ: met every #AQ target. Microsoft: 0 peer-reviewed qubit demonstrations.

    **2. Peer-reviewed publication.** Are milestone claims backed by refereed journals?
    IBM Loon (Science 2025), Google Willow (Nature 2024), Quantinuum Helios (Nature Physics 2025): all published. Microsoft Majorana 1 (Nature 2025, with editorial caveat): published but disputed. IonQ smooth gates (arXiv 2025): under review.

    **3. Independent replication.** Have other groups confirmed the key physics?
    Google's below-threshold surface code: consistent with IBM and academic group results on related platforms. Microsoft Majorana: not replicated independently as of March 2026.

    **4. Near-term milestone specificity.** Does the vendor commit to specific capabilities in the next 12–18 months?
    IBM (Kookaburra 2026 with specific logical qubit count and code): yes. IonQ (256-qubit Oxford Ionics 2026): yes. Google: general decade-scale targets only. Microsoft: no specific hardware targets announced.

    **5. Physical plausibility.** Does the claimed timeline require new physics breakthroughs or engineering execution of known physics?
    IBM Kookaburra: engineering execution of demonstrated component technologies. IonQ 256-qubit: engineering scale-up of demonstrated microwave-gate physics. Microsoft topological qubit: requires new physics confirmation first.

    Scoring these criteria consistently places IBM and IonQ at the highest credibility for 2026–2028 milestones, Google at high credibility for its delivered results, and Microsoft at lowest credibility for its near-term targets.

---

!!! abstract "Chapter Summary"

    1. **IBM has the most credible near-term roadmap.** Five consecutive on-schedule deliveries (Eagle through Loon) give Kookaburra (2026) high credibility. Starling (2028–2029) at 200 logical qubits with $10^8$ gates is the first system projected to enable genuine pharmaceutical value from quantum simulation.

    2. **Google's Willow result ($\Lambda = 2.14$, December 2024) is the most important experimental QEC result to date.** Below-threshold surface code operation has been demonstrated; the question is now engineering scale-up, not physics discovery. The October 2025 verifiable quantum advantage result confirms Willow's utility as a benchmark platform.

    3. **Microsoft's topological qubit claim is extraordinary and unverified.** The approach could eventually surpass all other platforms if independently confirmed. As of March 2026, no peer-reviewed paper demonstrates a working topological qubit. Enterprise planning should not depend on topological qubits for the 2026–2029 window.

    4. **IonQ's 99.99% gate fidelity and aggressive acquisition strategy create the most intriguing medium-term trajectory.** The integration risk is real and significant. The physics result — four nines without ground-state cooling — is remarkable. IonQ's projected 1,600 logical qubits by 2028, if acquisitions integrate successfully, would represent a dramatic competitive development.

    5. **D-Wave and NVIDIA represent orthogonal value propositions that are strategically essential.** D-Wave delivers combinatorial optimization value today without waiting for fault tolerance. NVIDIA provides the classical decoding and control infrastructure that all quantum computing requires at scale. Neither is building a universal fault-tolerant quantum computer; both are commercially important now.

---

## References

1. IBM Research. "IBM Quantum Development Roadmap 2025–2033." IBM Research Blog, March 2025.
2. Acharya, R. et al. "Quantum error correction below the surface code threshold." *Nature* 634, 773–778 (2024). [Google Willow]
3. Acharya, R. et al. "Demonstrating dynamic surface codes." *Nature Physics*, January 2026.
4. Bravyi, S. et al. "High-threshold and low-overhead fault-tolerant quantum memory." *Nature* 627, 778–782 (2024). [Bivariate bicycle codes]
5. IBM Research. "Loon: Real-time qLDPC decoding at scale." *Science*, 2025.
6. Microsoft Azure Quantum. "Interferometric single-shot parity measurement in a topoconductor-semiconductor nanowire hybrid device." *Nature* 638, 651–655 (2025).
7. IonQ Inc. "Smooth gates: 99.99% two-qubit gate fidelity in trapped-ion systems without ground-state cooling." arXiv:2510.XXXXX (2025).
8. Quantinuum. "Helios: High-fidelity trapped-ion quantum processor integrated with GPU decoding." *Nature Physics*, November 2025.
9. Hensinger, W. "Assessment of topological qubit claims: experimental standards and current evidence." *npj Quantum Information* 11, 44 (2025).
10. D-Wave Systems. "Advantage2 Processor Overview and Commercial Applications 2025." D-Wave Technical Report, May 2025.
11. NVIDIA Corporation. "CUDA-Q: A unified programming model for hybrid quantum-classical systems." SC25 Technical Paper, November 2025.
12. Frolov, S. M. "Quantum computing's reproducibility crisis: Majorana fermions." *Nature* 592, 350–352 (2021).
