---
title: "Chapter 10 Quiz: Modular Scaling"
chapter: 10
quiz_type: formative
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
total_questions: 30
---

# Chapter 10 Quiz: Modular Scaling — Connecting Chips into Quantum Supercomputers

*Answer each question based on the content of Chapter 10. Questions progress through Bloom's Taxonomy from recall to creation.*

---

## Level 1 — Remember (Questions 1–5)

**1.** Approximately how much cooling power does a single transmon superconducting qubit require at the 15 mK stage of a dilution refrigerator?

- A) 1 μW
- B) 100 nW
- C) 1 mW
- D) 10 pW

??? success "Answer"
    **B) 100 nW.** Each transmon qubit requires approximately 100 nanowatts of cooling power at the 15 mK stage. For 1,000 qubits this amounts to ~100 μW — already at the limit of today's dilution refrigerators.

---

**2.** What is the name of the technology IonQ acquired to enable memory-buffered photonic inter-module interconnects?

- A) Oxford Ionics
- B) ID Quantique
- C) Lightsynq
- D) Vector Atomic

??? success "Answer"
    **C) Lightsynq.** IonQ acquired Lightsynq for $1.1 billion in 2025 for its memory-buffered photonic interconnect technology enabling asynchronous entanglement between trapped-ion modules.

---

**3.** Which of the following represents the correct tier ordering of IBM's coupler hierarchy from smallest to largest physical scale?

- A) L-couplers → C-couplers → Universal adapters
- B) Universal adapters → L-couplers → C-couplers
- C) C-couplers → L-couplers → Universal adapters
- D) C-couplers → Universal adapters → L-couplers

??? success "Answer"
    **C) C-couplers → L-couplers → Universal adapters.** C-couplers operate within a single chip (intra-chip). L-couplers operate between chips within a module (inter-chip). Universal adapters enable logical qubit transport between separate modules.

---

**4.** What algorithm did Peruzzo et al. introduce in 2014 for computing molecular ground-state energies on NISQ hardware?

- A) Quantum Phase Estimation (QPE)
- B) Variational Quantum Eigensolver (VQE)
- C) Quantum Approximate Optimization Algorithm (QAOA)
- D) Harrow-Hassidim-Lloyd (HHL)

??? success "Answer"
    **B) Variational Quantum Eigensolver (VQE).** VQE was introduced by Peruzzo et al. in *Nature Communications* (2014) as a hybrid quantum-classical algorithm for molecular ground-state energy calculation accessible on shallow-circuit NISQ hardware.

---

**5.** According to the classical computing analogy in Chapter 10, what does IBM's Kookaburra (3-chip system, 2026) correspond to in the history of classical computing?

- A) Intel 4004 (1971) — first microprocessor
- B) Pentium (1993) — single monolithic high-performance chip
- C) Intel Core 2 Duo (2006) — first dual-core processor
- D) InfiniBand HPC cluster (2010s)

??? success "Answer"
    **C) Intel Core 2 Duo (2006) — first dual-core processor.** Kookaburra represents the quantum equivalent of multi-core: multiple chips (cores) connected by a high-bandwidth link, operating as a single logical processor. Just as Core 2 Duo put two independent cores on a die connected by shared cache, Kookaburra links three chips via l-couplers into a single quantum processor.

---

## Level 2 — Understand (Questions 6–10)

**6.** Explain why the wiring bottleneck makes single-chip scaling to 1,000,000 qubits geometrically impossible, not merely practically difficult.

??? success "Answer"
    Each superconducting qubit requires approximately 3 control cables (drive, flux, readout) threading through the cryostat from room temperature to 15 mK. For 1,000,000 qubits, this would require 3,000,000 cables. At 0.5 mm cable diameter, the total cross-sectional area of these cables would be approximately 0.59 m² — more than the entire interior cross-section of the largest dilution refrigerators. The cables physically cannot fit. This is a geometric impossibility, not a technical challenge that can be solved by making cables thinner or refrigerators larger; it requires a fundamentally different architecture where each small chip module has its own manageable set of cables.

---

**7.** Explain the difference between VQE and QPE in terms of circuit depth requirements, susceptibility to noise, and the type of answer each produces.

??? success "Answer"
    **VQE:** Uses shallow parameterized circuits (accessible on NISQ hardware), iterates with a classical optimizer to minimize energy. Susceptible to barren plateaus (vanishing gradients with system size) and gives an answer limited by the expressiveness of the chosen ansatz — it cannot distinguish between local and global minima of the energy landscape. Benefits from relatively few T-gates. Practical on today's hardware for small molecules (up to ~10 electrons).

    **QPE:** Uses deep circuits — millions to billions of T-gates — to directly compute the eigenvalue (energy) of the molecular Hamiltonian with precision $2^{-k}$ for $k$ ancilla qubits. No ansatz bias: the answer is the exact eigenvalue, not an approximation. Requires fault-tolerant hardware because the circuit is too deep for NISQ noise. Practical only with Starling-class or better hardware (200+ logical qubits, $10^8$+ T-gates).

    The trade-off is: VQE is shallower and noisier (works today but gives approximate answers for small systems); QPE is deeper but exact (works only on fault-tolerant hardware but gives the correct answer for any system size).

---

**8.** Why is reconfigurable connectivity in neutral atom arrays particularly advantageous for implementing qLDPC error correction codes?

??? success "Answer"
    qLDPC codes such as the bivariate bicycle code require non-nearest-neighbor qubit connectivity — each data qubit must interact with stabilizer qubits that may be far away on the physical chip. On a fixed-connectivity superconducting chip, this requires either c-couplers (IBM's Loon approach) or SWAP overhead. On a neutral atom array, the optical tweezers can physically move atoms to create any desired connectivity pattern before each QEC syndrome measurement cycle. This means the native connectivity of the neutral atom array matches the code's connectivity requirements on-demand, without any additional hardware overhead. The result: neutral atom arrays can implement qLDPC codes more naturally than fixed-connectivity superconducting architectures, potentially achieving lower QEC overhead.

---

**9.** What is "asynchronous entanglement" in the context of Lightsynq's photonic interconnects, and why does it matter for inter-module entanglement rates?

??? success "Answer"
    In a **synchronous** photonic entanglement scheme, both modules must attempt to generate and receive a photon at precisely the same time. If the photon is lost in transit (which happens probabilistically), both modules must restart the attempt simultaneously — they must "wait for each other." The effective entanglement rate is the emission rate multiplied by the photon transmission efficiency and detector efficiency — often much less than the raw photon rate.

    In Lightsynq's **asynchronous** scheme, quantum memory at each module endpoint stores successful entanglement events until the partner module signals readiness. Module A can attempt photon emission continuously; when a photon successfully arrives at module B, the resulting Bell pair is stored in B's quantum memory. When module A's data qubit needs an inter-module operation, the pre-stored Bell pair is consumed — no need for a synchronized new entanglement attempt at that moment. This dramatically increases the effective entanglement delivery rate (approaching the photon emission rate, limited by memory lifetime) rather than the single-shot success probability, and decouples entanglement generation from computational scheduling.

---

**10.** The chapter states that quantum computers provide a "space advantage" for molecular simulation rather than a pure speedup. What does this mean?

??? success "Answer"
    A classical computer requires exponential memory to store the full many-body wavefunction: for $N$ electrons in $M$ orbitals, the wavefunction has $\binom{M}{N}$ complex amplitudes, growing combinatorially. For 54 electrons in 108 orbitals, this is ~$10^{31}$ amplitudes — impossible to store classically.

    A quantum computer with $M$ qubits naturally represents a superposition of $\binom{M}{N}$ states simultaneously — the quantum state *is* the wavefunction. The quantum computer does not need to store each amplitude separately; it stores them in the amplitudes of the quantum state. This is the "space advantage": quantum memory (qubits) scales linearly in $M$, while classical memory scales exponentially.

    This does not automatically give an exponential time speedup: quantum algorithms like QPE still require polynomial time to extract the energy eigenvalue. But for strongly correlated molecules where classical methods fail qualitatively (not just quantitatively), the quantum computer provides the exact answer while classical methods provide only wrong approximations — a qualitative advantage, not just a quantitative speedup.

---

## Level 3 — Apply (Questions 11–15)

**11.** Using the gross code ratio of 24 physical qubits per logical qubit (as discussed in Chapters 9 and 10), calculate how many physical qubits would be required to support 200 logical qubits (IBM Starling's target). If Starling is based on 4-chip modules with Nighthawk-class density (~1,400 physical qubits per chip), how many chips does Starling require?

??? success "Answer"
    **Physical qubits needed:**
    $200 \text{ logical} \times 24 \text{ physical/logical} = 4{,}800$ physical qubits for logical qubit blocks.
    Adding overhead for magic state distillation and ancilla (~50% overhead): approximately 7,200–9,600 physical qubits total.

    **Number of chips:**
    At ~1,400 qubits per Nighthawk-class chip:
    $\lceil 9{,}600 / 1{,}400 \rceil \approx 7$ chips minimum.

    Starling with a target of ~200 logical qubits likely requires 6–8 chips, consistent with IBM's description of multi-chip multi-module architecture at the Starling generation.

---

**12.** A chemist wants to simulate the active site of a metalloenzyme with 30 active electrons in 60 active orbitals. Using Jordan-Wigner mapping (2 qubits per spin-orbital) and the QPE T-gate estimate $\approx M^3/\epsilon$ for $M$ orbitals and chemical accuracy $\epsilon = 10^{-3}$ hartree, estimate the logical qubit count and T-gate count required.

??? success "Answer"
    **Logical qubits:**
    $2 \times 60 = 120$ spin-orbital qubits + $\sim$15 ancilla for QPE $\approx$ **135 logical qubits**.

    **T-gate count:**
    $$T\text{-gates} \approx \frac{M^3}{\epsilon} = \frac{60^3}{10^{-3}} = \frac{216{,}000}{0.001} = 2.16 \times 10^8 \approx 10^8 \text{ T-gates}$$

    **Hardware match:** This is within IBM Starling's projected capabilities (200 logical qubits, $10^8$ T-gates, target 2029). A metalloenzyme active site with 30 active electrons is a realistic pharmaceutical target — for example, the heme iron center in cytochrome P450 enzymes involved in drug metabolism. This calculation could be run on Starling-class hardware.

---

**13.** A dilution refrigerator can sustain 200 μW of cooling power at 15 mK. If each superconducting qubit requires 100 nW, what is the maximum number of qubits this refrigerator can support? If IBM wants 1,000 logical qubits using a 24:1 physical-to-logical ratio, how many refrigerators would be needed?

??? success "Answer"
    **Maximum qubits per refrigerator:**
    $$\frac{200 \text{ μW}}{100 \text{ nW/qubit}} = \frac{200{,}000 \text{ nW}}{100 \text{ nW/qubit}} = 2{,}000 \text{ qubits per refrigerator}$$

    **Refrigerators needed for 1,000 logical qubits:**
    Physical qubits required: $1{,}000 \times 24 = 24{,}000$ (plus overhead, say 30,000 total).
    Refrigerators: $\lceil 30{,}000 / 2{,}000 \rceil = 15$ refrigerators.

    This illustrates why modular quantum data centers with multiple refrigerators are the correct architecture for large-scale fault-tolerant systems — not a single enormous refrigerator.

---

**14.** The chapter states that neutral atom arrays can implement qLDPC codes "more naturally" than fixed-connectivity superconducting chips. Given IBM's Kookaburra architecture (3 chips + c-couplers for non-nearest-neighbor connectivity), design a conceptual comparison: what is the additional overhead IBM must pay in c-coupler hardware that a QuEra-style neutral atom system avoids?

??? success "Answer"
    **IBM's c-coupler overhead for bivariate bicycle codes:**
    The BB code requires each data qubit to connect to 6 specific neighbors, some non-adjacent in the physical layout. IBM addresses this with c-couplers: additional fabricated circuit elements (tunable coupling qubits) that create long-range connections. Each c-coupler:
    - Occupies chip area (reducing the space available for data qubits)
    - Introduces additional potential failure modes (the coupler itself can fail)
    - Adds control lines (microwave drive for each coupler)
    - Must be calibrated and characterized

    For a 1,386-qubit Nighthawk chip with BB code connectivity, each of the ~1,000 data qubits needs ~3 c-couplers for non-nearest-neighbor connections, plus ~3 standard nearest-neighbor couplers = ~6,000 total coupler elements on one chip.

    **QuEra neutral atom avoidance:**
    A neutral atom system reonfigures the array between syndrome measurement rounds by moving atoms. No additional hardware elements are required. The overhead is *time* (reconfiguration takes microseconds) rather than *space* (fabricated elements). For codes with complex connectivity requirements, this time overhead may be smaller than the area overhead of fabricating and calibrating thousands of c-couplers.

    The key trade-off: IBM pays area/hardware overhead; QuEra pays time overhead. Which is more efficient depends on the ratio of c-coupler area cost to atom reconfiguration time cost for a specific code and system size.

---

**15.** IonQ claims Lightsynq photonic interconnects achieve 50× higher inter-module entanglement rate than probabilistic approaches. If a probabilistic approach achieves 200 Bell pairs per second between two modules, what rate does IonQ claim? How many logical qubit inter-module operations per second could this support, assuming each operation consumes one Bell pair?

??? success "Answer"
    **Claimed entanglement rate:**
    $200 \text{ Bell pairs/s} \times 50 = 10{,}000$ Bell pairs per second (10 kHz).

    **Logical operations per second:**
    If each inter-module logical gate consumes one Bell pair: 10,000 inter-module logical gates per second.

    **Practical significance:**
    If a quantum algorithm running on a 2-chip system requires 1,000 inter-module logical gates per circuit and must execute in 1 second of wall clock time, the 10 kHz rate supports 10 circuits per second. At the probabilistic rate (200/s), only 0.2 circuits per second — a 50× throughput improvement. For pharmaceutical simulations expected to run thousands to millions of circuit repetitions, this rate difference is commercially significant.

---

## Level 4 — Analyze (Questions 16–20)

**16.** Analyze the four barriers to single-chip scaling discussed in Chapter 10 (fabrication defects, crosstalk, thermal management, wiring). Which of these barriers is most fundamental — in the sense that it cannot be overcome even in principle with improved engineering, short of a fundamentally new physical approach?

??? success "Answer"
    **Thermal management is the most fundamental barrier.** The Carnot efficiency of a refrigerator operating between 15 mK and 300 K is $\eta_{\text{Carnot}} = 15/300{,}000 = 5 \times 10^{-5}$. This is a thermodynamic upper bound that no engineering can exceed. Removing 1 watt of heat at 15 mK requires at minimum $1/\eta_{\text{Carnot}} = 20{,}000$ watts of input power regardless of how clever the refrigerator design is. As qubit counts grow, the total heat load grows proportionally, and the room-temperature power consumption for a million-qubit single-chip system would be on the order of gigawatts — an absurdity.

    The wiring constraint could in principle be addressed by on-chip cryo-CMOS control electronics (eliminating most room-temperature cables), though this is not yet demonstrated at scale. Crosstalk could be mitigated by improved chip layout, materials, and qubit isolation. Fabrication defects could be mitigated by improved processes and chip-level redundancy. But the thermodynamic limit on cooling power is irreducible. Modular architecture — multiple separate refrigerators each with a manageable load — is the physically necessary response to Carnot's theorem, not merely an engineering preference.

---

**17.** Compare IonQ's use of Oxford Ionics 2D trap arrays to address intra-module scaling with IBM's use of c-couplers to address the same problem. What is the fundamental difference in approach, and what are the implications for system complexity?

??? success "Answer"
    **IBM c-couplers — extending fixed connectivity:** IBM fabricates additional coupling elements on the chip that create new qubit-to-qubit connections. This is a *hardware addition* approach: the chip gets more complex with each additional long-range connection, but the fundamental architecture (fixed-position qubits with engineered couplings) remains the same.

    **Oxford Ionics 2D arrays — restructuring the substrate:** Oxford Ionics reorganizes ions into 2D clusters separated from each other, with long-range connectivity achieved by physically shuttling ions between clusters. This is a *substrate transformation* approach: instead of adding hardware to connect things that are far apart, the architecture is designed so that things that need to interact are kept close together (within a cluster) and the cluster boundaries define the connectivity hierarchy.

    **Implications for complexity:** IBM's c-coupler approach accumulates complexity on the chip — each additional long-range coupler adds fabrication steps, calibration requirements, and failure modes. The chip becomes more complex as the code requires more non-nearest-neighbor connections. Oxford Ionics' approach offloads connectivity complexity to the control system (ion shuttling logic), which can be programmed and reprogrammed without chip refabrication. IBM's chip complexity is static (determined at fabrication); Oxford Ionics' is dynamic (determined by the control software). For codes that evolve over time or need to adapt to hardware failures, dynamic connectivity may be more robust.

---

**18.** The classical networking analogy maps single-chip quantum processors to single-core classical processors. Analyze where the analogy breaks down — what aspects of quantum computing modular scaling have no classical analogy?

??? success "Answer"
    **Where the analogy holds:** Both classical and quantum modular systems must solve interconnect bandwidth, latency, and coherency problems. Both benefit from dividing computation into local units with limited inter-unit communication. Both follow a hierarchy from on-chip to chip-to-chip to module-to-module.

    **Where the analogy breaks down:**

    1. **Quantum coherence over links:** Classical chip-to-chip communication transmits classical bits (0 or 1). Quantum chip-to-chip links must transmit quantum states (superpositions) without measurement-induced decoherence. There is no classical equivalent of this constraint — no classical protocol needs to avoid "observing" the data in transit.

    2. **No-cloning theorem:** Classical networks can retransmit data on failure; if a packet is lost, resend a copy. Quantum networks cannot copy quantum states (no-cloning theorem). A failed quantum transmission cannot be retried by resending the same state — the original state may have been disturbed by the attempt. This is why Lightsynq's memory-buffered approach retries the *entanglement generation* (not the data transmission) while keeping the data safe in memory.

    3. **Entanglement as a resource:** Classical networks route bits from source to destination. Quantum networks consume entanglement (Bell pairs) as a fuel for quantum teleportation. Entanglement must be pre-distributed and stored — there is no classical equivalent of "pre-distributing computation fuel."

    4. **Error correction overhead:** Classical bits are robust (a transistor either is or isn't 0/1 at any reasonable noise level). Quantum bits require active error correction consuming hundreds to thousands of physical qubits per logical qubit. The "overhead" of quantum modular computing is much higher than classical.

---

**19.** Analyze the risk profile of IonQ's 2027 target of a single-chip ~10,000-qubit system (Oxford Ionics 2D arrays). What would need to go right for this milestone to be achieved, and what are the two or three most plausible failure modes?

??? success "Answer"
    **What must go right:**
    1. Oxford Ionics 2D trap arrays must scale from current small demonstrations to wafer-scale 2D ion arrays with ~10,000 trapping sites
    2. Microwave EQC gate fidelity must be maintained as trap density increases (no evidence yet that high-density 2D arrays maintain the fidelity of 1D chains)
    3. Ion-shuttling between clusters must be implemented with sufficiently low errors and high enough speed to not bottleneck computation
    4. IonQ must successfully integrate Oxford Ionics' team and technology into its own development pipeline within 1–2 years of acquisition

    **Most plausible failure modes:**
    1. **2D array crosstalk:** As Oxford Ionics increases ion density in 2D arrays, microwave cross-talk between adjacent trapping sites may degrade two-qubit gate fidelity below the $10^{-4}$ levels demonstrated in 1D chains. Demonstrating 99.99% fidelity in a 100-qubit 2D array is not equivalent to demonstrating it in a 10,000-qubit array.
    2. **Ion loss scaling:** Individual ion loss from traps increases with array size (more traps = more opportunities for loss events). Reloading atoms interrupts computation. At 10,000 ions, even 0.01% loss rate per second means 1 ion lost per second — potentially requiring continuous atom reloading.
    3. **Acquisition integration timeline:** 2027 gives IonQ only ~2 years from acquisition to production-scale deployment. Classical semiconductor acquisitions of comparable complexity have typically taken 3–5 years to fully integrate. If Oxford Ionics' key engineers depart post-acquisition, or if the integration timeline extends, the 2027 milestone shifts to 2028–2029.

---

**20.** Chapter 10 argues that the modular approach is "consensus across all leading platforms." Analyze whether this consensus is based on independent reasoning or represents herding — the tendency for an industry to converge on a solution because everyone else is doing it.

??? success "Answer"
    The evidence for **independent reasoning** leading to consensus is strong:

    1. **Different physics, same conclusion:** Superconducting (IBM, Google), trapped-ion (IonQ, Quantinuum), neutral atom (QuEra), and photonic (PsiQuantum) vendors have all reached the modular conclusion despite radically different underlying physics. If this were herding, one would expect some outliers to find single-chip scaling paths in their specific physics.

    2. **Independent physical derivations:** The four barriers described in Chapter 10 (fabrication defects, crosstalk, thermal management, wiring) are independently derivable from physical principles. Any competent engineering team analyzing any quantum hardware platform will encounter these barriers and reach the same conclusion about their severity.

    3. **Pre-competitive academic confirmation:** The modular architecture conclusion was reached in academic literature (theoretical work on distributed quantum computing, quantum networking) well before commercial vendors converged on it. Vendors are following physics, not each other.

    **Evidence for some herding:**
    IBM's explicit 3-tier coupler hierarchy has influenced how other vendors describe their approaches — some vocabulary (e.g., "quantum data center," "distributed quantum supercomputer") appears to spread from IBM's public communications to other vendors. This is influence, not herding: the physical constraints are real regardless of vocabulary.

    **Conclusion:** The consensus is primarily independent reasoning driven by physics, with some herding at the level of vocabulary and roadmap presentation. The physical barriers to single-chip scaling are independently derivable and real; modular architecture is the correct response. Enterprises should treat the modular consensus as well-founded, not as an industry fashion.

---

## Level 5 — Evaluate (Questions 21–25)

**21.** Evaluate whether VQE or QPE is more commercially relevant for a pharmaceutical company in the 2026–2029 timeframe, given the hardware that will be available during this period.

??? success "Answer"
    **2026–2027 (NISQ/early logical qubit, 20–173 logical qubits):** VQE is more relevant. For small molecules (up to ~20 active electrons), VQE provides useful results on today's hardware with modest circuit depth. The IonQ/AstraZeneca/AWS VQE demonstration (Suzuki-Miyaura reaction, 2025) shows commercial applicability. QPE requires fault-tolerant hardware not available at scale until 2028+.

    **2028–2029 (Starling-class, ~200 logical qubits, $10^8$ T-gates):** QPE becomes the commercially relevant algorithm for the problems that matter most. The ibrutinib binding calculation (80 logical qubits, $10^8$ T-gates) requires QPE to get the correct answer — VQE at this system size faces barren plateau problems that prevent optimization. Starling-class systems make QPE feasible for medium-sized drug candidates.

    **Strategic implication:** A pharmaceutical company should invest in VQE now (it works today, builds organizational quantum chemistry capability, generates results for small molecules) while developing QPE implementations for target molecules in the 20–80 active electron range, timed for Starling-class hardware deployment. Starting QPE development only when the hardware arrives would waste 2–3 years.

---

**22.** Evaluate the classical networking analogy's usefulness as a tool for quantum computing timeline prediction. Where does it help, and where might it lead to incorrect predictions?

??? success "Answer"
    **Where it helps:**
    - Calibrates expectations: the classical transition from single-core to multi-socket took roughly 15 years (1995–2010); quantum may move faster (more concentrated investment) but the engineering challenges are harder
    - Identifies the correct architectural direction: the convergence on modular architecture is as well-founded as the classical convergence on multi-processor systems
    - Suggests that "distributed quantum supercomputer" is not a distant aspiration but an engineering milestone with a clear precedent

    **Where it may mislead:**
    - **Timeline:** Classical computing scaling was driven by Moore's Law (transistor density doubling every 18–24 months). Quantum computing faces fundamentally different scaling constraints (coherence time, error rate, not just transistor density). The classical timeline gives qualitative structure but not quantitative timeline prediction.
    - **Error rates:** Classical computing did not require active error correction — transistor error rates are far below the level where correction is needed. Quantum computing must solve QEC before modular scaling delivers value. This has no classical parallel and makes the quantum timeline harder to predict.
    - **Absence of a "qubit Moore's Law":** Quantum qubit counts have grown faster than classical transistor counts in recent years (100 qubits in 2021 → predicted 10,000 by 2027) but this has not translated to proportional algorithmic capability growth. The distinction between physical and logical qubits has no clean classical parallel.
    - **Conclusion:** Use the analogy for structural insights (modular is correct, the data center is the long-term unit), but derive timeline estimates from hardware-specific resource calculations (as in Section 10.5.5) rather than from Moore's Law analogy.

---

**23.** A startup proposes building a "room-temperature quantum computer" using photonic qubits (photons in fiber optic loops as qubits). Evaluate this proposal against the four barriers to scaling discussed in Chapter 10.

??? success "Answer"
    **Fabrication defects:** Photonic components (beam splitters, wave guides, detectors) can be fabricated in standard silicon photonics fabs with high yield. Photons do not have the charge-sensitive defect sensitivity of transmon qubits. **Advantage for photonics.**

    **Crosstalk:** Photons in guided modes interact weakly with each other and with adjacent waveguides if properly designed. **Moderate advantage for photonics**, though waveguide crosstalk at high density is a real engineering challenge.

    **Thermal management:** This is where photonic systems shine. Photons propagate and interact at room temperature — no dilution refrigerator required. Superconducting nanowire photon detectors (SNSPDs) require 2–4 K (achievable with pulse tube cryocoolers, far cheaper than 15 mK dilution refrigerators), not 15 mK. **Major advantage for photonics.**

    **Wiring/interconnect:** Photonic circuits use optical fiber and waveguides, not coaxial cables. High-bandwidth, low-loss optical interconnects scale more easily than microwave coaxial cables. **Advantage for photonics.**

    **Key challenge not captured by these four barriers:** Two-photon gates are probabilistic in linear optics (KLM scheme success probability ~$1/n$ for $n$ photons). This makes photonic quantum gates inherently inefficient and requires massive redundancy (PsiQuantum's resource estimates require millions of physical qubits per logical qubit). The barriers in Chapter 10 are specific to superconducting/trapped-ion systems; photonics trades different barriers (no thermal, no wiring) for different ones (photon loss, probabilistic gates). A room-temperature photonic quantum computer addresses IBM/IonQ's barriers but faces its own significant challenges.

---

**24.** Evaluate whether the FeMoco (nitrogenase) calculation — estimated to require $10^{11}$ T-gates and "beyond Blue Jay" hardware — will ever be commercially relevant, or whether classical methods will have improved enough by 2035 to make it unnecessary.

??? success "Answer"
    **The case that quantum remains necessary:**
    FeMoco (the iron-molybdenum cofactor of nitrogenase) involves 54 active electrons in 54 active orbitals with strong multi-reference character — the hallmark of classically intractable strong correlation. CCSD(T) fails qualitatively for FeMoco. DFT gives inconsistent results across functionals. Tensor network methods (DMRG, TTNS) have improved but scale as $O(e^{n})$ in the entanglement entropy, which for FeMoco remains intractable. The electronic structure of FeMoco is not a problem that classical methods will solve by incremental improvement; it requires an exponential-in-entanglement classical memory that does not scale.

    **The case that classical methods may suffice:**
    Machine learning-based quantum chemistry methods (neural network quantum states) have made rapid progress since 2020 and have demonstrated accuracy approaching CCSD(T) for some strongly correlated systems using polynomial classical resources. If these methods continue to improve, they may reach FeMoco accuracy before 2035 without quantum hardware.

    **Balanced assessment:** The FeMoco calculation will remain a valid quantum computing target through the 2030s. Whether it becomes *necessary* for industrial nitrogen fixation catalyst design depends on whether ML-based quantum chemistry breakthroughs scale to this system size. It is prudent to develop quantum algorithms for FeMoco-class systems while monitoring classical ML chemistry progress. The commercial value (nitrogen fixation = Haber-Bosch process = 1–2% of global energy consumption) justifies pursuing both classical and quantum approaches simultaneously.

---

**25.** Compare the strategic positions of a pharmaceutical company that begins quantum chemistry algorithm development in 2026 versus one that waits until 2028. Evaluate the risk-adjusted value of early vs. late entry.

??? success "Answer"
    **Early entry (2026):**
    - 2026–2027: VQE chemistry for small drug candidate fragments on IonQ Forte/Tempo or IBM Nighthawk. Limited commercial impact but significant learning.
    - 2027–2028: Transition to early fault-tolerant systems (IBM Cockatoo, IonQ 256-qubit). Begin QPE development for target molecule active spaces.
    - 2029: Deploy Starling-class calculations for ibrutinib-class molecules. 3-year head start in computational pipeline development.
    - Risk: Hardware delays (e.g., Kookaburra slips to 2027) reduce but do not eliminate the advantage; early-entry organizations use the time for algorithm development even if hardware is late.

    **Late entry (2028):**
    - 2028: Begin learning on hardware that is already available (Starling-class systems, 100+ logical qubits). Start from zero on algorithm expertise.
    - 2030: First computational results for drug-relevant molecules — 3–4 years behind early entrants.
    - Risk: Reduced (no investment in hardware that might not deliver), but the competitive gap is significant. Early entrants will have developed proprietary quantum chemistry pipelines, trained specialized staff, and published results that influence regulatory guidance.

    **Risk-adjusted evaluation:**
    If hardware delivers on schedule (IBM has 5/5 track record), early entry has clearly positive expected value. Even with 20% probability of hardware delays, the expected value calculation favors early entry: the investment in algorithm development is not wasted if hardware is late — algorithms developed for 2026 NISQ systems translate directly to 2028 fault-tolerant systems. The $50M investment in early quantum chemistry development has an expected value of several hundred million dollars if it influences even one drug development program in the 2029–2033 window.

---

## Level 6 — Create (Questions 26–30)

**26.** Design a modular quantum computing architecture for a neutral atom platform targeting 1,000 logical qubits. Specify the intra-module structure (atom count, connectivity method), inter-module links (photonic or microwave), and QEC code choice. Justify each design choice against alternatives.

??? success "Answer"
    **Intra-module structure:**
    - 3,000 atoms per module in a $55 \times 55$ 2D array, with 24:1 physical-to-logical ratio → 125 logical qubits per module
    - Connectivity: reconfigurable optical tweezers, rearranging every QEC cycle for non-nearest-neighbor stabilizer measurements
    - QEC code: bivariate bicycle (BB) code — natural fit for neutral atom reconfigurability; better overhead than surface code ($\sim$10:1 vs 100+:1 for same code distance)
    - Justification: 3,000 atoms is within QuEra's projected 2026–2027 range; BB code exploits neutral atom connectivity advantage; reconfigurable tweezers eliminate c-coupler hardware overhead

    **Inter-module links:**
    - Photonic interconnects using atom-photon entanglement: neutral atoms emit photons when transitioning between hyperfine states; photons can be collected into fiber for inter-module transmission
    - Quantum memory at each module boundary: buffer successful Bell pairs until consumed
    - Target 10 modules × 125 logical qubits/module = **1,250 logical qubits total** (with margin above 1,000)
    - Justification: photonic links work at room temperature between modules; no microwave links required (avoids cryogenic inter-module cabling); memory-buffered asynchronous architecture increases effective Bell pair rate

    **System-level design:**
    - 10 modules in a rack-mounted array, each module a separate small optical table or enclosed chamber
    - Each module contains its own atom source, tweezer array control, and photon collection optics
    - Central classical control computer coordinates inter-module operations via pre-distributed Bell pairs
    - Total physical atom count: ~30,000 atoms; total logical qubit count: ~1,000

---

**27.** Create a roadmap for a financial institution planning to use quantum computing for portfolio optimization and credit risk modeling. Specify milestones for 2026, 2027, 2028, and 2029, technology dependencies at each stage, and decision gates for continuing or pausing investment.

??? success "Answer"
    **2026 — Foundation:**
    - Milestone: Deploy quantum algorithm development team (3–5 quantum chemistry + finance domain experts); run first VQE-class quantum circuits on IBM Quantum Network or IonQ cloud for small test problems
    - Technology dependency: IBM Nighthawk cloud access or IonQ Forte Enterprise
    - Decision gate: If no vendors deliver on-schedule in 2026 and no logical qubit demonstrations emerge, pause hardware-specific development; continue algorithm theory work. If Kookaburra delivers 100+ logical qubits by Q4 2026, accelerate 2027 plan.

    **2027 — Algorithm Development:**
    - Milestone: Implement quantum Monte Carlo for option pricing on early fault-tolerant hardware; develop proprietary quantum portfolio optimization circuit library
    - Technology dependency: IBM Cockatoo (24 logical qubits) or IonQ 256-qubit system; assume 20–100 logical qubits available
    - Decision gate: If quantum Monte Carlo shows >5× speedup on problem instances relevant to the institution's risk models, commit full $20M to 2028 production pilot. If no speedup, renegotiate partnership scope.

    **2028 — Pilot Production:**
    - Milestone: Run daily quantum Monte Carlo for a $500M portfolio slice on 50–200 logical qubit hardware; compare results to classical Monte Carlo
    - Technology dependency: IBM pre-Starling or IonQ 2-chip system; 100–200 logical qubits
    - Decision gate: If quantum computation delivers results within regulatory accuracy requirements with wall-clock time competitive with classical, commit to full deployment planning. If hardware delays or accuracy issues, extend pilot.

    **2029 — Production Deployment:**
    - Milestone: Daily production quantum risk modeling for core credit and market risk portfolios; quantum computing results integrated into regulatory capital calculations (subject to regulatory guidance)
    - Technology dependency: IBM Starling-class or equivalent competitor (200 logical qubits, $10^8$ gates)
    - Decision gate: Regulatory acceptance of quantum computation outputs; if regulation lags technology, deploy in parallel with classical (not as replacement) until regulatory clarity.

---

**28.** Synthesize the IBM, IonQ, and QuEra modular approaches into a unified framework describing how different vendors are solving the same three engineering problems: (1) intra-module connectivity, (2) inter-module entanglement, (3) logical qubit transport across modules.

??? success "Answer"
    **Intra-module connectivity:**
    - *IBM:* Fixed-connectivity square lattice with c-couplers for non-nearest-neighbor connections. Deterministic, hardware-defined, calibrated at fabrication. Limitation: adds chip complexity for each non-nearest-neighbor connection.
    - *IonQ/Oxford Ionics:* 2D ion trap arrays with all-to-all connectivity within clusters via phonon modes; EQC microwave gates. Deterministic, software-configurable within clusters. Ion shuttling for inter-cluster connections. Limitation: shuttling time overhead.
    - *QuEra:* Reconfigurable optical tweezers enabling arbitrary 2D connectivity by physical atom movement. Software-configurable on each QEC cycle. Limitation: reconfiguration time; atom loss.

    **Inter-module entanglement:**
    - *IBM:* L-couplers — microwave photons through cryogenic cables at 15 mK. Both modules must be cryogenic; cable must be thermally isolated. Bell pair generation rate target: >10 kHz. Fidelity target: >99%. Limitation: all modules must be cold; microwave photon loss in cables.
    - *IonQ:* Lightsynq photonic interconnects — optical photons through room-temperature fiber. Asynchronous memory-buffered architecture. Claimed 50× rate improvement over probabilistic approaches. Modules can be physically separated. Limitation: photon loss in fiber; quantum memory lifetime limits Bell pair storage time.
    - *QuEra:* Atom-photon entanglement via cavity QED; photons emitted from atoms collected into fiber. Similar to IonQ photonic approach. Limitation: photon collection efficiency from free-space atoms is lower than from waveguide-coupled systems.

    **Logical qubit transport across modules:**
    - All three vendors: logical teleportation via pre-distributed Bell pairs. A logical qubit is teleported (not physically moved) across the inter-module link by consuming a Bell pair and performing a logical Bell measurement and correction. IBM calls this "universal adapters"; IonQ and QuEra achieve the same via photonic Bell pair distribution.
    - The QEC code must support cross-module operations: the error correction decoder must track syndrome measurements across both modules simultaneously, which requires the classical decoder (e.g., NVIDIA GPU via NVQLink) to have low-latency access to data from all modules in real time.

    **Unified framework:** All three vendors solve the same three problems with the same logical structure — high-quality local computation + quantum link for entanglement distribution + teleportation for cross-module logical operations — while differing in the physical implementation of each layer. The convergence on this logical structure is the best evidence that it is the correct architecture.

---

**29.** Create a risk matrix for the pharmaceutical quantum computing use case described in Chapter 10. For each of five major risk categories, specify the risk event, probability (High/Medium/Low), impact (High/Medium/Low), and the mitigation strategy.

??? success "Answer"
    | Risk Category | Risk Event | Probability | Impact | Mitigation |
    |---|---|---|---|---|
    | **Hardware delivery** | IBM Starling delayed to 2031+ (hardware milestone miss) | Low (IBM 5/5 track record) | High (core 2029 use case timeline shifts) | Develop algorithms on NISQ+early fault-tolerant; IonQ as backup platform via CUDA-Q abstraction |
    | **Classical algorithm improvement** | ML-based quantum chemistry (neural network quantum states) achieves CCSD(T) accuracy for 50-electron molecules, eliminating quantum advantage for target active spaces | Medium (rapid ML chemistry progress since 2020) | High (eliminates the accuracy advantage for some molecules) | Focus on genuinely strongly correlated targets (metalloenzymes, FeMoco analogs) where classical ML also fails; monitor arXiv quarterly |
    | **Regulatory/IP** | Pharmaceutical regulatory agencies do not accept quantum simulation outputs in IND filings without extensive classical validation, doubling computational cost | Medium (regulatory agencies have not yet addressed quantum computation) | Medium (slows deployment, does not eliminate value) | Engage FDA/EMA quantum chemistry working groups proactively; publish validation studies in peer-reviewed literature from 2027 |
    | **Talent scarcity** | Inability to hire quantum chemists with pharmaceutical domain knowledge at competitive salaries | High (field is small; competition from IBM, Google, national labs is intense) | Medium (slows algorithm development) | Partner with university quantum chemistry groups; develop internal training programs; use IBM Quantum Network for access to IBM Research scientists |
    | **QEC overhead underestimate** | Actual T-gate counts for ibrutinib calculation are $10^{10}$ rather than $10^8$ (a factor of 100 underestimate, within the range of current estimation uncertainty) | Medium (resource estimates have 2–3 order of magnitude uncertainty) | High (pushes calculation to Blue Jay-class, ~2033) | Use most conservative (largest) resource estimates in planning; validate estimates with toy problem scaling on early logical qubit systems in 2027 |

---

**30.** You are a quantum computing strategist advising a national laboratory. Design a 5-year quantum computing research agenda (2026–2030) that would advance the state of the art in modular scaling. Specify three research programs, the technical problems each addresses, the milestones that would mark success, and the resources required.

??? success "Answer"
    **Research Program 1: Universal Quantum Adapters for Logical Teleportation**

    *Technical problem:* IBM's universal adapter concept for logical qubit transport between modules has no experimentally demonstrated implementation as of 2026. The physics of logical teleportation across a code boundary requires co-designed QEC decoders, Bell pair distribution systems, and logical gate correction procedures that have not been integrated in a multi-chip system.

    *Milestones:*
    - 2026: Theoretical design of cross-module logical gate protocol for bivariate bicycle code
    - 2027: Simulation of full decode-teleport-re-encode cycle including decoder latency
    - 2028: Experimental demonstration on a 2-chip test system (10 logical qubits × 2 modules)
    - 2029: Integration with IBM Cockatoo-class hardware; first cross-module logical algorithm

    *Resources:* 8 FTE (4 theorists, 4 experimentalists), 2 superconducting test chips, 1 dilution refrigerator pair, ~$15M over 5 years

    ---

    **Research Program 2: Real-Time Distributed QEC Decoding**

    *Technical problem:* When a quantum algorithm spans two or more modules, the QEC decoder must process syndrome data from all modules simultaneously, across inter-module communication latency. Today's single-chip decoders (IBM Loon: <480 ns) are not designed for distributed operation. A distributed decoder with sub-millisecond cross-module communication could be a critical bottleneck for multi-module logical computations.

    *Milestones:*
    - 2026: Characterize decoder latency requirements for 2-module BB code; identify critical path
    - 2027: Implement distributed decoder on NVIDIA Grace Blackwell GPU cluster with sub-microsecond syndrome aggregation
    - 2028: Test distributed decoder in simulation with realistic inter-module entanglement rates
    - 2029: Deploy distributed decoder on 2-module experimental system; measure logical error rates vs single-module baseline

    *Resources:* 6 FTE (2 QEC theorists, 2 NVIDIA GPU engineers, 2 quantum hardware engineers), access to NVIDIA Grace Blackwell cluster, ~$10M over 5 years

    ---

    **Research Program 3: High-Rate Photonic Bell Pair Distribution for Trapped-Ion Modules**

    *Technical problem:* IonQ's Lightsynq approach claims 50× higher entanglement rates than probabilistic photonic schemes via memory buffering. No peer-reviewed independent experimental demonstration exists as of 2026. An independent national laboratory demonstration of memory-buffered photonic inter-module entanglement would validate the approach and measure actual rates under realistic conditions.

    *Milestones:*
    - 2026: Build two-module ytterbium ion trap testbed with cavity-coupled photon emission at telecom wavelengths
    - 2027: Demonstrate single-photon Bell pair generation between modules with >90% heralding efficiency
    - 2028: Implement quantum memory at module boundaries; characterize memory lifetime vs Bell pair delivery rate
    - 2029: Achieve >5 kHz Bell pair delivery rate between modules; compare with theoretical Lightsynq predictions; publish in Nature Physics

    *Resources:* 10 FTE (5 trapped-ion physicists, 3 photonics engineers, 2 quantum information theorists), two ion trap setups with cavity QED, fiber optic testbed, ~$20M over 5 years

    *Combined impact:* These three programs address the three most critical unresolved engineering challenges in modular quantum computing. Results would directly inform IBM's universal adapter design, all vendors' distributed decoding architectures, and provide independent validation of IonQ's photonic networking claims — advancing the entire field while establishing the national laboratory as a hub for modular quantum computing research.
