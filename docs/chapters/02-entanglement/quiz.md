# Chapter 2 Quiz: Superposition, Entanglement, and Bell's Theorem

---

## Remember (Questions 1–5)

**1.** What is the matrix representation of the Hadamard gate?

??? success "Answer"
    **H = (1/√2)[[1,1],[1,−1]]**

**2.** Write all four Bell states.

??? success "Answer"
    |Φ⁺⟩ = (|00⟩+|11⟩)/√2, |Φ⁻⟩ = (|00⟩−|11⟩)/√2, |Ψ⁺⟩ = (|01⟩+|10⟩)/√2, |Ψ⁻⟩ = (|01⟩−|10⟩)/√2.

**3.** What does T1 measure in a qubit?

??? success "Answer"
    **Energy relaxation time** — how long before the qubit decays from |1⟩ to |0⟩ by releasing energy to the environment.

**4.** What is the CHSH bound for classical local hidden variable theories?

??? success "Answer"
    **S ≤ 2**. Quantum mechanics predicts S = 2√2 ≈ 2.83.

**5.** What theorem states that Clifford circuits can be efficiently simulated classically?

??? success "Answer"
    The **Gottesman-Knill theorem**.

---

## Understand (Questions 6–10)

**6.** Explain why |Φ⁺⟩ = (|00⟩+|11⟩)/√2 cannot be written as a product of two single-qubit states.

??? success "Answer"
    Assume (α|0⟩+β|1⟩)⊗(γ|0⟩+δ|1⟩) = αγ|00⟩+αδ|01⟩+βγ|10⟩+βδ|11⟩. Matching |Φ⁺⟩: αδ=0 and βγ=0, but αγ=βδ=1/√2≠0. From αδ=0: either α=0 or δ=0; both contradict αγ≠0 or βδ≠0. Contradiction — no product state exists.

**7.** Why does entanglement not enable faster-than-light communication?

??? success "Answer"
    Alice's measurement outcome is **random** — she cannot control whether she gets 0 or 1. Bob sees random outcomes too. Only by comparing results via a classical channel (limited to light speed) do they discover the correlation. No information is transmitted by the act of measurement itself.

**8.** What is the physical meaning of decoherence, and why is it described as "entanglement with the environment"?

??? success "Answer"
    When a qubit interacts with its environment, it becomes quantum-mechanically entangled with environmental particles. Since we cannot track the environment, tracing it out leaves the qubit in a mixed state. The quantum phase information (off-diagonal coherences) leaks into environmental degrees of freedom and becomes inaccessible — this is decoherence.

**9.** Why is entanglement necessary but not sufficient for quantum speedup?

??? success "Answer"
    Without entanglement, n qubits require only 2n classical parameters (Bloch vectors) — classically simulable. With entanglement, 2ⁿ parameters are required — exponentially harder. However, the Gottesman-Knill theorem shows Clifford circuits (which create entanglement) remain classically simulable. Only adding non-Clifford gates (T gate) enables genuinely hard-to-simulate computation. Entanglement is necessary but the *structure* of the entanglement matters.

**10.** Explain what T2 ≤ 2T1 means physically.

??? success "Answer"
    T2 (dephasing time) is always at most twice T1 (energy relaxation time). T1 processes cause both energy decay *and* dephasing (a qubit that decays from |1⟩ to |0⟩ certainly loses its phase). Additional pure dephasing mechanisms (magnetic field fluctuations, etc.) further reduce T2 below 2T1. Equality T2 = 2T1 occurs only when energy relaxation is the sole dephasing mechanism.

---

## Apply (Questions 11–15)

**11.** Starting from |01⟩, apply H⊗H (Hadamard to both qubits). What is the resulting state?

??? success "Answer"
    H|0⟩ = |+⟩, H|1⟩ = |−⟩. Result: |+⟩⊗|−⟩ = (1/2)(|00⟩−|01⟩+|10⟩−|11⟩). Equal superposition with alternating signs — not entangled (it's a product state).

**12.** A superconducting qubit has T2 = 150 μs and two-qubit gate time = 40 ns. How many gates can execute within T2?

??? success "Answer"
    150,000 ns / 40 ns = **3,750 gates** per coherence window. This defines the maximum circuit depth without error correction.

**13.** Calculate the entanglement entropy of one qubit of the Bell state |Ψ⁺⟩ = (|01⟩+|10⟩)/√2.

??? success "Answer"
    Trace out qubit B: ρ_A = ⟨0|_B ρ_{AB} |0⟩_B + ⟨1|_B ρ_{AB} |1⟩_B = (1/2)|0⟩⟨0| + (1/2)|1⟩⟨1| = I/2. Eigenvalues: 1/2, 1/2. S = −(1/2)log₂(1/2) − (1/2)log₂(1/2) = **1 ebit** — maximally entangled.

**14.** A qubit starts with T2 = 200 μs. After 100 μs of free evolution (dephasing only), what fraction of its off-diagonal coherence remains?

??? success "Answer"
    Off-diagonal elements decay as e^{−t/T2} = e^{−100/200} = e^{−0.5} ≈ **0.607** (60.7% of original coherence remains).

**15.** Apply H⊗I to the Bell state |Φ⁺⟩ = (|00⟩+|11⟩)/√2. What state results?

??? success "Answer"
    H⊗I: H acts on qubit 1, I on qubit 2. H|0⟩=(|0⟩+|1⟩)/√2, H|1⟩=(|0⟩−|1⟩)/√2. Result: [(|0⟩+|1⟩)|0⟩ + (|0⟩−|1⟩)|1⟩]/2 = (|00⟩+|10⟩+|01⟩−|11⟩)/2. This is the state used in quantum teleportation after Alice applies H.

---

## Analyze (Questions 16–20)

**16.** Analyze the difference between a separable state like |+⟩⊗|+⟩ and an entangled state like |Φ⁺⟩ in terms of measurement correlations.

??? success "Answer"
    For |+⟩⊗|+⟩: measuring both qubits in the computational basis gives four outcomes (00, 01, 10, 11) each with probability 1/4 — outcomes are **independent** (knowing one tells you nothing about the other). For |Φ⁺⟩: outcomes are perfectly correlated — measuring 0 on qubit 1 guarantees 0 on qubit 2, and vice versa. The correlation exists in ALL measurement bases simultaneously for |Φ⁺⟩, whereas separable states show correlations only in specific bases.

**17.** The CHSH experiment gives S = 2.42. Analyze what this tells us about the physical world.

??? success "Answer"
    S = 2.42 > 2 violates the CHSH bound for **all** local hidden variable theories. This means no theory based on local predetermined values can explain quantum measurement correlations. The particles don't have pre-assigned properties — the correlations are genuinely quantum. The excess above 2 (= 0.42 here) represents the degree of Bell inequality violation. Tsirelson's bound (2√2 ≈ 2.83) is the quantum maximum — S = 2.42 is consistent with quantum mechanics and confirms genuine quantum nonlocality.

**18.** Compare decoherence in superconducting qubits vs. trapped ions at the physical mechanism level.

??? success "Answer"
    **Superconducting:** Dominated by dielectric loss in substrate, quasiparticle poisoning, cosmic ray events, and ZZ coupling crosstalk. T2 ~ 100–300 μs because the qubit is fabricated on a solid substrate with many environmental coupling channels. **Trapped ions:** Dominated by motional heating (phonons from electrode field fluctuations) and laser/microwave noise. T2 ~ seconds because ions are suspended in vacuum — far fewer environmental coupling channels. The fundamental difference is the qubit's physical isolation from its environment.

**19.** Analyze why the loophole-free Bell tests of 2015 (Hensen et al., Giustina et al., Shalm et al.) were needed even after Aspect's 1982 experiment already showed S > 2.

??? success "Answer"
    Aspect's 1982 experiment had two loopholes: (1) **Detection loophole** — not all photons were detected; if undetected photons were systematically biased, a local hidden variable theory could reproduce the results. (2) **Locality loophole** — Alice's and Bob's detector settings weren't changed fast enough to prevent light-speed communication between them. The 2015 experiments closed both loopholes simultaneously: fast random setting changes (closing locality) with high-efficiency detectors (closing detection). Only with both loopholes closed is the Bell test truly definitive.

**20.** Why does the Gottesman-Knill theorem not mean quantum computers are useless? What does it actually tell us?

??? success "Answer"
    Gottesman-Knill says Clifford circuits are classically simulable — but Clifford circuits are not the only quantum circuits. Adding the T gate (non-Clifford) creates computation that cannot be efficiently classically simulated. Gottesman-Knill tells us that entanglement alone (Clifford) is insufficient for quantum advantage — you need the right *kind* of entanglement enabled by non-Clifford gates. It also enables efficient classical simulation of the QEC syndrome measurement circuits (which are Clifford-dominated), which is practically important for error correction decoders.

---

## Evaluate (Questions 21–25)

**21.** A startup claims their "proprietary decoherence shield" eliminates T2 decay. Evaluate this claim.

??? success "Answer"
    **Almost certainly false.** Decoherence is a consequence of quantum entanglement with the environment — a fundamental physical process. Completely eliminating it would require perfect isolation of the qubit from all environmental degrees of freedom, including thermal photons, magnetic field fluctuations, and substrate phonons. No currently known material or engineering technique achieves this. The claim merits extreme skepticism. Genuine improvements (IBM: T2 from ~10 μs in 2017 to ~300 μs in 2025) come from incremental materials engineering and circuit design improvements — not "shields."

**22.** Evaluate whether quantum key distribution (QKD) provides better security than post-quantum cryptography (PQC) for a bank securing customer data.

??? success "Answer"
    **PQC is likely better for most banks.** QKD provides information-theoretic security (theoretically unbreakable) but requires: (1) quantum channel infrastructure (specialized fiber), (2) limited range without quantum repeaters, (3) vulnerability to implementation attacks despite theoretical security. PQC (FIPS 203/204/205) runs on existing hardware, is software-only, scalable globally, and NIST-standardized. For a bank with global operations, PQC is far more practical. QKD may be warranted for ultra-high-security point-to-point links (e.g., financial settlement between two nearby data centers), but not as a general solution.

**23.** Bell's theorem rules out local hidden variables. Does this mean "quantum mechanics is nonlocal"? Evaluate this statement carefully.

??? success "Answer"
    **Partially true, but requires precision.** Quantum mechanics is **nonlocal** in the sense that measurement correlations between entangled particles cannot be explained by any local classical model. However, quantum mechanics does NOT allow **signaling** faster than light — no information can be transmitted using entanglement alone. The nonlocality is in the correlations, not in causal influence. Bell's theorem rules out *local realistic* theories; quantum mechanics is non-local (correlations) but signal-local (no FTL information transfer). This is consistent with special relativity.

**24.** Evaluate the claim: "Trapped-ion quantum computers will always outperform superconducting quantum computers because their coherence times are 10,000× longer."

??? success "Answer"
    **False — coherence time alone doesn't determine performance.** What matters is circuit depth capacity (T2 / t_gate). Trapped ions: T2 ≈ 10 s, t_gate ≈ 100 μs → ~100,000 gates. Superconducting: T2 ≈ 200 μs, t_gate ≈ 50 ns → ~4,000 gates. For deep circuits, ions win. But: (1) superconducting systems run ~2,000× faster (ns vs. μs gates), enabling more experiments per day; (2) superconducting scaling (thousands of qubits) is more advanced than ion traps; (3) the "right" platform depends on the algorithm. Neither platform universally dominates.

**25.** Given Bell's theorem and the measurement postulate, evaluate whether the "many-worlds interpretation" of quantum mechanics is experimentally distinguishable from the Copenhagen interpretation.

??? success "Answer"
    **No — they make identical experimental predictions.** Both interpretations agree on all measurable outcomes (the Born rule, Bell inequality violations, etc.). The difference is philosophical: Copenhagen says measurement collapses the wavefunction to a definite outcome; Many-Worlds says all outcomes occur in branching universes (we experience only one branch). Bell's theorem rules out local hidden variables, but it doesn't distinguish between these two. The interpretations are empirically equivalent — the choice is philosophical, not scientific. For quantum computing purposes, the Copenhagen interpretation is practically sufficient.

---

## Create (Questions 26–30)

**26.** Design a quantum circuit that creates the Bell state |Ψ⁻⟩ = (|01⟩−|10⟩)/√2 from |00⟩.

??? success "Answer"
    (1) Apply X to qubit 2: |00⟩ → |01⟩. (2) Apply H to qubit 1: |01⟩ → |+⟩|1⟩ = (|0⟩+|1⟩)|1⟩/√2. (3) Apply CNOT (control: q1, target: q2): (|01⟩+|11⟩)/√2 → (|01⟩+|10⟩)/√2 = |Ψ⁺⟩. (4) Apply Z to qubit 1: (−|01⟩+|10⟩)/√2... better: Start with |01⟩, apply H to q1, apply CNOT, apply Z to q1 to get the minus sign, giving |Ψ⁻⟩. Alternative: (1) X on q2 to get |01⟩; (2) H on q1; (3) CNOT(q1→q2); (4) Z on q1. Verify: result = (|01⟩−|10⟩)/√2 = |Ψ⁻⟩. ✓

**27.** Construct a CHSH experiment design. Specify the entangled state, measurement settings, and predicted S value that would violate the classical bound.

??? success "Answer"
    **State:** |Φ⁺⟩ = (|00⟩+|11⟩)/√2. **Alice's settings:** a = 0°, a' = 45° (measurement angles in the XZ plane). **Bob's settings:** b = 22.5°, b' = 67.5°. **Correlations:** E(a,b) = cos(2×22.5°) = cos 45° = 1/√2. Similarly for all four pairs. **S = |1/√2 − (−1/√2) + 1/√2 + 1/√2| = |4/√2| = 2√2 ≈ 2.83** — maximum quantum violation, exceeding the classical bound of 2.

**28.** Design an experiment to measure T2 of a qubit using a Ramsey interferometry protocol. Describe each step.

??? success "Answer"
    (1) **Prepare |0⟩.** (2) **Apply H** → |+⟩ = (|0⟩+|1⟩)/√2 (π/2 pulse). (3) **Free evolution** for time t: phase accumulates; with dephasing, off-diagonal elements decay as e^{−t/T2}. (4) **Apply H again** (second π/2 pulse) → the phase acquired during free evolution maps to population difference. (5) **Measure** in computational basis. (6) **Repeat** for many values of t. The measured oscillation amplitude decays as e^{−t/T2} — fit this exponential to extract T2. Multiple repetitions at each t are needed for statistical confidence.

**29.** Propose a 5-year research roadmap for improving trapped-ion qubit coherence from T2 = 10 s to T2 > 1 hour. What are the key physical targets?

??? success "Answer"
    **Year 1–2:** Reduce electrode surface noise (dominant motional heating mechanism) by cleaning/coating with superconducting or crystalline materials; demonstrated 10× heating rate reduction in literature. **Year 2–3:** Reduce magnetic field fluctuations (dominant dephasing) using magnetic shielding and clock transitions insensitive to first-order magnetic fields (e.g., ⁴³Ca⁺ or ¹⁷¹Yb⁺ clock states — already achieving T2 > 10 min in some labs). **Year 3–4:** Implement sympathetic cooling to maintain ion crystal order during long computations without disturbing computational ions. **Year 4–5:** Combine all improvements in an integrated cryogenic ion trap (suppresses residual heating). T2 > 1 hour has been demonstrated for atomic clocks (passive, no gates) — the challenge is achieving it while executing gates simultaneously.

**30.** You are advising a Fortune 500 company on quantum strategy. Create a one-page quantum readiness assessment framework based on the concepts in Chapters 1–2.

??? success "Answer"
    **Quantum Readiness Assessment (Chapters 1–2 basis):**

    **Cryptographic Risk (Ch. 4 preview):** What data do you encrypt that must remain secure for >10 years? (Harvest-now-decrypt-later threat). Are you using RSA/ECDSA? → HIGH RISK, begin PQC migration immediately.

    **Computational Opportunity:** Which of your core computational problems involve: (a) large unstructured search? → Grover applies (quadratic speedup); (b) periodic functions or eigenvalue estimation? → Shor/QPE applies (exponential speedup); (c) combinatorial optimization? → QAOA/D-Wave applies (heuristic advantage now).

    **Hardware Timeline:** Based on your problem size, which hardware milestone do you need? <100 logical qubits (2027–2028)? ~1,000 logical qubits (2030)? >10,000 (2035+)? Match your investment timeline to the credible hardware trajectory.

    **Talent Gap:** Do you have anyone who understands density matrices, Hilbert spaces, and the Bloch sphere? → hire 1–2 quantum-literate engineers now, while talent is still accessible before 2028 competition intensifies.

    **Recommended Next Steps:** (1) Complete PQC audit; (2) identify top 3 quantum-amenable problems; (3) establish cloud access (IBM Quantum, D-Wave Leap); (4) monitor the 5 milestone criteria (Chapter 11) annually.
