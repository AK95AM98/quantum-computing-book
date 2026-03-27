---
title: "Chapter 7 Quiz: Why Noise-Free Quantum Computing Is So Difficult"
chapter: 07
quiz_type: chapter
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
questions: 30
---

# Chapter 7 Quiz: Why Noise-Free Quantum Computing Is So Difficult

---

## Level 1: Remember (Questions 1–5)

**Question 1.** What are the three fundamental single-qubit error types, and which Pauli operators represent them?

??? success "Answer"
    The three fundamental error types are:

    - **Bit-flip error** — represented by the Pauli $X$ operator; maps $\ket{0} \leftrightarrow \ket{1}$.
    - **Phase-flip error** — represented by the Pauli $Z$ operator; maps $\ket{+} \leftrightarrow \ket{-}$, adding a $-1$ phase to $\ket{1}$.
    - **Bit-and-phase-flip error** — represented by the Pauli $Y = iXZ$ operator; applies both a bit flip and a phase flip simultaneously.

    Together with the identity $I$ (no error), these four operators $\{I, X, Y, Z\}$ form the Pauli basis in which any single-qubit error can be decomposed.

---

**Question 2.** Name four distinct physical noise sources specific to superconducting qubits that do not affect trapped-ion qubits.

??? success "Answer"
    Four noise sources specific to superconducting (not trapped-ion) qubits:

    1. **Dielectric loss** — microwave photon absorption by two-level system (TLS) defects at material interfaces.
    2. **Quasiparticle poisoning** — broken Cooper pairs tunneling through Josephson junctions.
    3. **Cosmic ray burst errors** — high-energy particles creating quasiparticles that simultaneously depolarize many neighboring qubits.
    4. **ZZ coupling / crosstalk** — always-on parasitic coupling between neighboring transmon qubits via shared bus or substrate.

    (Leakage to $\ket{2}, \ket{3}$ states is also specific to weakly-anharmonic transmon systems.)

---

**Question 3.** What is the surface code fault-tolerance threshold, and what does it mean in practical terms?

??? success "Answer"
    The surface code fault-tolerance threshold is approximately $p_{\text{th}} \approx 1\%$ (physical error rate per gate).

    Practical meaning: if a quantum processor's physical gate error rate is below 1%, then by encoding logical qubits in the surface code and increasing the code distance $d$, the logical error rate can be made arbitrarily small. Conversely, if physical error rates exceed 1%, adding more error correction layers *increases* logical errors rather than reducing them. Current superconducting processors at 0.1–0.5% two-qubit error rates are below this threshold.

---

**Question 4.** How many physical qubits does the surface code at distance $d = 7$ require per logical qubit?

??? success "Answer"
    The surface code at distance $d$ requires approximately $2d^2$ physical qubits per logical qubit.

    At $d = 7$:
    $$2 \times 7^2 = 2 \times 49 = 98 \text{ physical qubits per logical qubit}$$

    (In practice, the exact count depends on boundary conditions and ancilla qubit arrangement, but ~98 is the standard figure cited in the literature.)

---

**Question 5.** What is "motional heating" in trapped-ion qubits, and why does it harm two-qubit gate fidelity?

??? success "Answer"
    **Motional heating** is the gradual addition of phonons (quanta of vibrational energy) to the shared motional modes of ions in a trap, caused by electric field fluctuations from the trap electrodes (Johnson noise and surface noise from adsorbed molecules).

    It harms two-qubit gate fidelity because trapped-ion two-qubit gates (Mølmer–Sørensen, geometric phase) work by mediating interactions through shared motional modes. The gate assumes the ions are cooled near the motional ground state. Even a few added phonons change the coupling strength, introduce phase errors, and reduce the contrast of the entangling operation — directly lowering gate fidelity.

---

## Level 2: Understand (Questions 6–10)

**Question 6.** Explain in your own words why quantum errors are said to be "continuous" and why this initially seems to make quantum error correction impossible — and then explain why syndrome measurement resolves this apparent paradox.

??? success "Answer"
    **Why errors are continuous:** A physical qubit error is typically a small rotation on the Bloch sphere, such as $R_x(\epsilon) = e^{-i\epsilon X/2}$. The error angle $\epsilon$ can take any value in a continuous range, producing an infinite family of distinct error operations. Unlike a classical bit flip (discrete: either happened or did not), a qubit can suffer a rotation of $0.001°$ or $0.0001°$ — an uncountably infinite set of possible errors.

    **Why this seems fatal:** Classical error correction works because errors are discrete (a bit either flipped or did not). If quantum errors are continuous, it seems we would need to distinguish and correct infinitely many different error types — an impossible task.

    **How syndrome measurement resolves it:** When we perform a syndrome measurement (measuring commuting stabilizer operators on a group of qubits), the measurement back-projects the continuously-errored state onto one of the four Pauli eigenspaces: $\{I, X, Y, Z\}$. The measurement itself collapses the continuous error into a discrete Pauli. We then correct that discrete Pauli. By the discretization theorem, this correction *exactly* restores the original encoded state — not approximately, but exactly. The key is that the syndrome reveals which Pauli class the error belongs to without revealing any information about the encoded logical state.

---

**Question 7.** Explain why cosmic ray events are particularly dangerous for quantum error correction, even if individual qubit error rates are well below threshold.

??? success "Answer"
    Cosmic ray events are dangerous because they violate a core assumption of most quantum error-correcting codes: that errors on different qubits are *independent*.

    When a cosmic ray muon or secondary particle strikes a silicon substrate, it deposits ~MeV of energy, creating thousands of quasiparticles. These quasiparticles rapidly diffuse across the chip and depolarize many qubits simultaneously in a correlated burst. In a distance-$d$ surface code that can correct up to $\lfloor(d-1)/2\rfloor$ errors, a cosmic ray might simultaneously flip dozens of qubits in a region — far exceeding the code's correction capacity in one event.

    Furthermore, the burst is spatially correlated — neighboring qubits are much more likely to fail together. The decoder (which assumes independent errors) will compute a completely wrong error syndrome interpretation, potentially applying incorrect corrections that introduce new logical errors. Mitigations include real-time cosmic ray detection and post-selection, or using codes with better burst-error properties.

---

**Question 8.** Why does leakage to non-computational states $\ket{2}$ and $\ket{3}$ in superconducting qubits pose a special challenge that standard Pauli-based error correction cannot address directly?

??? success "Answer"
    Standard stabilizer codes (including the surface code) are designed to detect and correct errors *within* the computational subspace spanned by $\{\ket{0}, \ket{1}\}$. The Pauli operators $X$, $Y$, $Z$ all act within this subspace.

    When a transmon qubit leaks to $\ket{2}$ or $\ket{3}$ (non-computational states), it has *left the computational subspace entirely*. The stabilizer measurements, which are designed to detect Pauli errors, will not correctly identify leakage as a Pauli error — they may either fail to detect it, or worse, misidentify it as a Pauli error and attempt an incorrect correction.

    The leaked qubit also no longer participates correctly in subsequent stabilizer measurements, corrupting syndrome information for the entire code block. This is why leakage reduction units (LRUs) — active circuits that detect leakage and restore qubits to $\ket{0}$ — are essential components of fault-tolerant superconducting architectures, not optional accessories.

---

**Question 9.** Describe the conceptual shift the threshold theorem created in quantum computing. Why was it transformative?

??? success "Answer"
    Before the threshold theorem (proven 1997–1998), the quantum computing field faced a seemingly insurmountable obstacle: any real qubit has nonzero noise, so running longer computations only accumulates more errors. Building a *useful* quantum computer seemed to require physically perfect qubits — an impossible standard.

    The threshold theorem transformed this in two ways:

    1. **It replaced an impossible goal with an achievable one.** Instead of "build perfect qubits," the requirement became "build qubits with error rate below $p_{\text{th}}$." This is a finite, measurable engineering target — one that current hardware has demonstrably achieved.

    2. **It guaranteed a path to arbitrary accuracy.** By concatenating error-correcting codes (or increasing surface code distance), logical error rates can be made exponentially small at the cost of a *polynomial* overhead in physical resources. Computational power can be scaled by adding more qubits following the same engineering recipe, rather than requiring ever-more-perfect individual qubits.

    The theorem did not solve the engineering challenges, but it established that those challenges are *finite and scalable*, not infinite.

---

**Question 10.** Explain why "number of physical qubits" is a misleading metric for quantum computational power, and what more informative metrics a technically literate buyer should demand.

??? success "Answer"
    Physical qubit count is misleading because fault-tolerant quantum computation requires most physical qubits to be devoted to *error correction*, not direct computation. With the surface code:
    - Distance $d = 7$: ~98 physical qubits per logical qubit
    - Distance $d = 17$: ~578 physical qubits per logical qubit

    A "1,000 physical qubit" processor supports only ~10 fault-tolerant logical qubits at $d = 7$. The raw compute power is orders of magnitude less than the headline number suggests.

    A technically literate buyer should demand:
    1. **Number of fault-tolerant logical qubits** (at specified code distance)
    2. **Physical gate error rate** (especially two-qubit gate fidelity)
    3. **QEC cycle time** (how fast syndrome measurement + correction completes)
    4. **Code distance achievable** (determines logical error rate per cycle)
    5. **Connectivity** (nearest-neighbor limits gate compilation overhead)

    Without these five numbers, a qubit count is a marketing figure, not an engineering specification.

---

## Level 3: Apply (Questions 11–15)

**Question 11.** A trapped-ion system has $T_2 = 8$ seconds and a two-qubit gate time of $t_g = 200\ \mu\text{s}$. What is the maximum circuit depth (in two-qubit gate layers) this system can support before decoherence dominates?

??? success "Answer"
    Using the circuit depth formula:

    $$d_{\max} \approx \frac{T_2}{t_{\text{gate}}} = \frac{8\ \text{s}}{200 \times 10^{-6}\ \text{s}} = \frac{8}{2 \times 10^{-4}} = 40{,}000 \text{ gate layers}$$

    This system can support approximately **40,000 sequential two-qubit gate layers** before decoherence becomes dominant. Note that this 40,000-layer circuit would take $40{,}000 \times 200\ \mu\text{s} = 8$ seconds per execution — long compared to a superconducting system executing 40,000 layers in $\sim 2$ ms.

---

**Question 12.** A neutral atom platform has $T_2 = 3$ seconds, a two-qubit gate time of $t_g = 2\ \mu\text{s}$, and a two-qubit gate fidelity of 99.6% (error rate $p_{2q} = 0.004$). At what circuit depth does the gate fidelity contribution alone reduce total circuit fidelity below 50%?

??? success "Answer"
    Using the circuit fidelity formula:

    $$F_{\text{circuit}} = (1 - p_{2q})^n = (0.996)^n$$

    Setting $F = 0.50$:

    $$0.50 = (0.996)^n$$

    $$n = \frac{\ln 0.50}{\ln 0.996} = \frac{-0.6931}{-0.004008} \approx 173 \text{ gates}$$

    The circuit fidelity due to gate errors alone drops below 50% after approximately **173 two-qubit gates**.

    By comparison, the coherence depth:

    $$d_{\max} = \frac{3}{2 \times 10^{-6}} = 1{,}500{,}000 \text{ gate layers}$$

    The gate fidelity (not decoherence) is the binding constraint for this system at these parameters. Gate fidelity improvement, not longer coherence time, is the priority.

---

**Question 13.** Using the surface code logical error rate formula $p_L \approx A(p/p_{\text{th}})^{\lfloor(d+1)/2\rfloor}$ with $A = 0.1$ and $p_{\text{th}} = 1\%$, calculate the logical error rate per QEC cycle for a physical error rate of $p = 0.5\%$ at code distances $d = 5$, $d = 7$, and $d = 9$. What does the trend tell you?

??? success "Answer"
    **Error ratio:** $p/p_{\text{th}} = 0.5\%/1\% = 0.5$

    **At $d = 5$:**
    $$\text{Exponent} = \left\lfloor\frac{6}{2}\right\rfloor = 3$$
    $$p_L = 0.1 \times (0.5)^3 = 0.1 \times 0.125 = 0.0125 = 1.25\%$$

    **At $d = 7$:**
    $$\text{Exponent} = \left\lfloor\frac{8}{2}\right\rfloor = 4$$
    $$p_L = 0.1 \times (0.5)^4 = 0.1 \times 0.0625 = 6.25 \times 10^{-3} = 0.625\%$$

    **At $d = 9$:**
    $$\text{Exponent} = \left\lfloor\frac{10}{2}\right\rfloor = 5$$
    $$p_L = 0.1 \times (0.5)^5 = 0.1 \times 0.03125 = 3.125 \times 10^{-3} = 0.3125\%$$

    **Trend:** Each time $d$ increases by 2, the logical error rate decreases by a factor of $0.5$ (halves). This is because $p/p_{\text{th}} = 0.5 < 1$, so the exponent increase multiplies by another factor of $0.5$. The suppression is modest here because $p = 0.5\%$ is only $2\times$ below threshold. Improving physical error rates to 0.1% would give $(0.1)^4 = 10^{-4}$ at $d=7$ — a $10{,}000\times$ better suppression ratio.

---

**Question 14.** A quantum computer uses the surface code with $d = 17$. A proposed algorithm for RSA-2048 requires 4,000 logical qubits. Calculate the required number of physical qubits.

??? success "Answer"
    Physical qubits per logical qubit (surface code, $d = 17$):

    $$N_{\text{phys/log}} \approx 2d^2 = 2 \times 17^2 = 2 \times 289 = 578$$

    Total physical qubits required:

    $$N_{\text{total}} = 4{,}000 \times 578 = 2{,}312{,}000 \approx 2.3 \text{ million physical qubits}$$

    For context, current leading processors have ~1,000–2,000 physical qubits. The gap to RSA-2048 is approximately three orders of magnitude in physical qubit count (even before considering magic state distillation overhead for non-Clifford gates, which may add another factor of 2–5).

---

**Question 15.** IBM's gross code $[[144, 12, 12]]$ encodes 12 logical qubits into 144 data qubits plus 144 ancilla qubits (288 physical total). How many physical qubits would a surface code require to encode the same 12 logical qubits at $d = 12$, and what is the improvement ratio?

??? success "Answer"
    **Surface code at $d = 12$, per logical qubit:**

    $$N_{\text{phys/log}}^{\text{SC}} \approx 2 \times 12^2 = 288$$

    **For 12 logical qubits (surface code):**

    $$N_{\text{SC}} = 12 \times 288 = 3{,}456 \text{ physical qubits}$$

    (Note: each logical qubit in the surface code also needs ~288 ancilla qubits for syndrome extraction, so the true surface code count per logical qubit at $d=12$ is ~576 total; let's use 576 for fair comparison.)

    $$N_{\text{SC, total}} = 12 \times 576 = 6{,}912 \text{ physical qubits}$$

    **Gross code:** 288 physical qubits for 12 logical qubits.

    **Improvement ratio:**

    $$\text{Ratio} = \frac{6{,}912}{288} = 24$$

    The gross code achieves **24× better physical qubit efficiency** than the surface code at equivalent distance and logical qubit count. This is the core argument for qLDPC codes in next-generation fault-tolerant architectures.

---

## Level 4: Analyze (Questions 16–20)

**Question 16.** The following table shows two hypothetical quantum processors. Analyze which is better suited for (a) a deep variational circuit requiring 10,000 gate layers, and (b) a shallow circuit requiring 100 gate layers repeated 1,000,000 times to estimate expectation values.

| Platform | $T_2$ | 2Q gate time | 2Q gate fidelity |
|----------|-------|-------------|-----------------|
| System A | 5 s | 500 μs | 99.95% |
| System B | 300 μs | 30 ns | 99.6% |

??? success "Answer"
    **Circuit depth capacities:**
    - System A: $d_{\max} = 5 / (500 \times 10^{-6}) = 10{,}000$ gate layers
    - System B: $d_{\max} = (300 \times 10^{-6}) / (30 \times 10^{-9}) = 10{,}000$ gate layers

    Both systems have similar maximum depth! So circuit depth is not the differentiator here.

    **Fidelity after 10,000 gates:**
    - System A: $(0.9995)^{10{,}000} = e^{10{,}000 \times \ln 0.9995} \approx e^{-5.0} \approx 0.007$ (0.7%)
    - System B: $(0.996)^{10{,}000} = e^{10{,}000 \times \ln 0.996} \approx e^{-40.2} \approx 4 \times 10^{-18}$ (essentially zero)

    **(a) Deep circuit (10,000 layers):** System A is clearly better. System B's lower gate fidelity (99.6% vs. 99.95%) completely destroys fidelity in a deep circuit. The superior gate fidelity of System A dominates.

    **Time per circuit repetition:**
    - System A: $10{,}000 \times 500\ \mu\text{s} = 5$ seconds per shot
    - System B: $10{,}000 \times 30\ \text{ns} = 0.3$ ms per shot

    **(b) Shallow circuit repeated $10^6$ times:** System B is vastly better. Despite lower gate fidelity, the circuit is shallow (100 gates): System B fidelity = $(0.996)^{100} \approx 0.67$; System A fidelity = $(0.9995)^{100} \approx 0.95$. Both are usable. But System B completes $10^6$ repetitions in $10^6 \times 100 \times 30\ \text{ns} = 3$ seconds; System A needs $10^6 \times 100 \times 500\ \mu\text{s} = 50{,}000$ seconds (14 hours). System B wins decisively on throughput.

---

**Question 17.** Analyze the following vendor claim: "Our 500-qubit quantum processor has achieved 99.5% two-qubit gate fidelity, making it ready for fault-tolerant computation." Identify at least three separate reasons this claim may be misleading or incomplete.

??? success "Answer"
    Three reasons the claim is misleading or incomplete:

    1. **Physical vs. logical qubits confusion.** "500 qubits" refers to physical qubits. With the surface code at $d = 7$, this supports only $500/98 \approx 5$ logical qubits — far too few for any practically useful fault-tolerant algorithm.

    2. **"99.5% fidelity" may not be below threshold in context.** While 99.5% (0.5% error rate) is below the nominal surface code threshold of ~1%, the threshold assumes certain noise models (local, independent errors). If the processor has significant correlated errors (crosstalk, cosmic rays), the effective threshold may be much lower, and 99.5% fidelity may not actually be below the operational threshold.

    3. **"Ready for fault-tolerant computation" ignores multiple required components.** Fault-tolerant computation requires not just high gate fidelity but also: (a) high measurement fidelity for syndrome extraction; (b) fast classical decoding (must complete in <1 μs per cycle); (c) leakage reduction units (for superconducting qubits); (d) multiple rounds of measurement for reliable syndrome extraction; (e) a complete compiler stack for logical gates. High gate fidelity alone is necessary but far from sufficient.

    **Bonus:** The claim also doesn't specify whether 99.5% is an *average* across all qubit pairs or a *worst-case* fidelity. A few bad qubits in a surface code can dramatically increase logical error rates.

---

**Question 18.** The Gidney–Ekerå 2021 estimate required ~20 million physical qubits for RSA-2048 in 8 hours. The 2025 Gidney estimate reduced this to under 1 million physical qubits. Analyze what categories of improvement could account for this ~20× reduction in physical qubit overhead.

??? success "Answer"
    The ~20× reduction likely comes from multiple compounding improvements across three categories:

    **1. Algorithmic improvements (~3–5× contribution):**
    - More efficient quantum arithmetic circuits for modular exponentiation (reduced gate count per Shor step)
    - Better window techniques for classical preprocessing
    - Improved quantum phase estimation algorithms requiring fewer repetitions
    - Better classical–quantum co-optimization

    **2. Error-correcting code efficiency (~5–10× contribution):**
    - The 2021 estimate used surface code; the 2025 estimate used bivariate bicycle (gross) codes
    - Gross code: ~24 physical/logical vs. surface code: ~576 physical/logical at $d = 12$ → 24× overhead reduction
    - However, not the full 24× because not all qubits benefit equally (magic state factories may still use surface codes in part)

    **3. Improved logical gate compilation (~2–3× contribution):**
    - More efficient lattice surgery protocols for logical Clifford gates
    - Better magic state distillation protocols (fewer T gates needed, or higher-rate distillation)
    - Better classical compilation reducing total circuit depth (fewer logical gate cycles needed)

    These improvements compound multiplicatively, readily accounting for 20× or more. This illustrates that resource estimation in quantum computing is highly sensitive to algorithmic and software optimization — not just hardware.

---

**Question 19.** Compare and contrast the dominant decoherence mechanisms in superconducting qubits vs. neutral atom qubits. Which platform has a fundamentally different *type* of error (not just magnitude), and why does this matter for error correction?

??? success "Answer"
    **Superconducting qubits — dominant mechanisms:**
    - $T_1$ (energy relaxation): primarily dielectric loss from TLS defects at material interfaces → amplitude damping errors
    - $T_2$ (dephasing): ZZ crosstalk, charge noise, flux noise, magnetic field fluctuations → dephasing errors
    - Leakage: transitions to $\ket{2}, \ket{3}$ states → errors *outside* the computational subspace
    - Burst errors: cosmic rays → spatially correlated errors

    **Neutral atoms — dominant mechanisms:**
    - Atom loss: atoms leave the trap entirely → *erasure* errors (qubit removed from register)
    - Rydberg state decay: limits gate time but is a standard amplitude damping error within the qubit subspace
    - Position fluctuations: gate-to-gate variation in interaction strength → coherent overrotation errors

    **Fundamentally different error type:** Neutral atoms have a significant *erasure* error channel — the atom simply disappears. Erasure errors are actually *easier* to correct than Pauli errors because the code knows *which* qubit was lost (the trap detects absence). An erasure error at a known location is roughly twice as correctable as an unknown Pauli error: a distance-$d$ surface code can correct $\lfloor(d-1)/2\rfloor$ unknown Pauli errors but $d-1$ known erasures.

    **Why it matters for QEC:** Neutral atom platforms may achieve lower overhead for fault-tolerant computation than superconducting qubits *not* because of lower raw error rates, but because their dominant error mode (erasure) is more correctable. Recent theoretical work (Wu et al., 2022) showed erasure-dominated noise models allow QEC thresholds significantly above 1%.

---

**Question 20.** The threshold theorem states that logical error rates decrease exponentially as code distance increases. Yet the Gidney–Ekerå calculation still required millions of physical qubits for RSA-2048. Analyze why exponential suppression of errors does not translate to modest overhead.

??? success "Answer"
    The apparent paradox resolves by examining *what error rate is required* for RSA-2048.

    **The target logical error rate:** Shor's algorithm on RSA-2048 requires approximately $10^{10}$–$10^{12}$ logical gate operations. For the computation to succeed with high probability (say, 99%), the logical error rate per gate must be below roughly $10^{-12}$ to $10^{-14}$.

    **What distance achieves this?** Using $p_L = 0.1 \times (0.1)^{\lfloor(d+1)/2\rfloor}$ (at $p = 0.1\%$, $p_{\text{th}} = 1\%$):

    - $d = 7$: $p_L = 10^{-5}$ — far too high
    - $d = 17$: $p_L = 0.1 \times (0.1)^9 = 10^{-10}$ — still marginal
    - $d = 21$: $p_L = 0.1 \times (0.1)^{11} = 10^{-12}$ — approaching sufficient

    **The overhead:** Distance $d = 21$ requires $\approx 2 \times 21^2 = 882$ physical qubits per logical qubit. With 4,000 logical qubits: $4{,}000 \times 882 \approx 3.5$ million physical qubits — even before accounting for magic state factory overhead.

    **The key insight:** Exponential suppression is *exponential in code distance*, not in qubit count. And distance grows only as the *square root* of qubit count: $d \propto \sqrt{N_{\text{phys}}}$. So reducing logical error rate by $10\times$ requires $10\times$ more gate overhead (increase exponent by 1), which requires increasing $d$ by 2, which increases qubit count by $\sim 2d^2/(2(d-2)^2) \approx (d/(d-2))^2$ — sub-linearly, but still substantial. The overhead is manageable per qubit but large in absolute terms when 4,000 high-fidelity logical qubits are needed simultaneously.

---

## Level 5: Evaluate (Questions 21–25)

**Question 21.** Evaluate the following argument: "Since IBM has demonstrated 99.9% single-qubit gate fidelity, single-qubit errors are negligible for fault-tolerant quantum computing, and all research effort should focus exclusively on improving two-qubit gate fidelity."

??? success "Answer"
    **The argument is partially correct but oversimplified.** A more nuanced evaluation:

    **Where it is correct:**
    - Two-qubit gate error rates (0.1–0.5%) are indeed 5–50× higher than single-qubit rates (~0.1%), so they dominate the error budget in typical circuits.
    - In fault-tolerant circuit compilations, CNOT gates are approximately 10× more frequent than single-qubit rotations (for many algorithms), compounding the two-qubit gate dominance.

    **Where it is wrong or incomplete:**
    1. **Measurement errors are often comparable to or worse than single-qubit gate errors.** Syndrome extraction requires high-fidelity ancilla measurements; 99%+ measurement fidelity is typical but still contributes significantly to the logical error budget. Measurement errors require multiple rounds of syndrome measurement to resolve.
    2. **Leakage during single-qubit gates is non-negligible.** Even a 99.9% single-qubit gate can have leakage errors at the $10^{-4}$ level that are disproportionately harmful because they escape the QEC subspace.
    3. **Idle errors accumulate.** When two-qubit gates run on some qubits, neighboring qubits idle and experience dephasing. Reducing T1/T2 (which matters for idle qubits) improves the overall logical error rate even if gate fidelity is unchanged.
    4. **The holistic error budget matters.** At sufficiently low two-qubit error rates, single-qubit errors and measurement errors can become the new bottleneck. Balanced improvement across all error channels is ultimately necessary.

    **Verdict:** Prioritizing two-qubit gate fidelity is *currently* correct, but the categorical statement that single-qubit errors are "negligible" and deserve zero research attention is wrong. Fault-tolerant operation requires all error channels to be below threshold.

---

**Question 22.** Evaluate whether the following claim constitutes a realistic timeline for commercial advantage: "Our roadmap shows 10,000 physical qubits by 2027. This will be sufficient for commercially relevant fault-tolerant quantum computing."

??? success "Answer"
    **Assessment: The claim is almost certainly misleading, for quantifiable reasons.**

    **Physical qubit to logical qubit conversion:**
    - Surface code at $d = 7$: $10{,}000 / 98 \approx 102$ logical qubits
    - Surface code at $d = 17$: $10{,}000 / 578 \approx 17$ logical qubits
    - Gross code at $d = 12$: $10{,}000 / 24 \approx 417$ logical qubits

    Even under the optimistic gross code scenario with perfect implementation, 10,000 physical qubits yields ~417 logical qubits.

    **What is commercially relevant fault-tolerant QC?** Current best estimates suggest:
    - Useful quantum chemistry (e.g., accurate FeMoco nitrogenase simulation): ~1,000–2,000 logical qubits
    - Grover's search over useful databases: >1,000 logical qubits for advantage
    - RSA-2048 cryptography: ~4,000 logical qubits
    - Optimization problems at enterprise scale: 1,000+ logical qubits

    **Evaluation:** 10,000 physical qubits is insufficient for any currently known commercially relevant fault-tolerant application, even with the most efficient QEC codes. The claim conflates physical and logical qubits and does not account for the magic state distillation overhead (which consumes a large fraction of physical qubits for T-gate factory purposes). A reviewer should push back and ask: "How many logical qubits at what distance, including magic state distillation overhead?"

    A *technically honest* version of this claim would be: "10,000 physical qubits represents approximately 100–400 fault-tolerant logical qubits depending on the error-correcting code — sufficient for early fault-tolerant demonstrations but not yet commercially relevant algorithms."

---

**Question 23.** The Google Willow chip achieved $\Lambda = 2.14$ (the error suppression factor when increasing surface code distance by 2). Evaluate whether this result is significant, given that the theoretical maximum $\Lambda$ for a perfect surface code at these parameters would be $1/p_{\text{th}}^{-1} \approx 10$. Is $\Lambda = 2.14$ a cause for celebration or concern?

??? success "Answer"
    **Evaluation: $\Lambda = 2.14$ is genuinely significant, though far from the theoretical maximum — and this combination makes it both a cause for celebration and a clear indicator of how much further work remains.**

    **Why it is significant:**
    - $\Lambda > 1$ means increasing distance *reduces* logical error rate. This is the defining criterion for being "below threshold." Before Google Willow, no experiment had demonstrated $\Lambda > 1$ reliably in hardware. This was the first experimental proof that the surface code's exponential error suppression actually works in practice.
    - The result was reproducible across distances $d = 3, 5, 7$ and consistent with theoretical models — indicating systematic, not accidental, behavior.

    **Why the gap from $\Lambda \approx 10$ matters:**
    - Theoretical $\Lambda$ depends on how far below threshold the physical error rate is. At $p/p_{\text{th}} = 0.2$ (physical error rate 0.2%, threshold 1%), theory predicts $\Lambda \sim 1/0.2 = 5$ (roughly). The gap between $\sim 5$ and $2.14$ suggests the effective threshold in Willow's noise model is closer to $p_{\text{th}} \approx 0.7\%$ (not 1%), consistent with the report. This means the Willow processor is operating less comfortably below threshold than headline numbers suggest.
    - To achieve large-scale fault-tolerant computation efficiently, $\Lambda$ values of 5–10 are needed to suppress logical errors to $<10^{-12}$ without requiring unreasonably large distances.

    **Overall verdict:** $\Lambda = 2.14$ is a landmark experimental result demonstrating the surface code works as theoretically predicted. It is cause for celebration as a proof of principle. The gap from the theoretical maximum is cause for continued engineering effort on gate fidelity, leakage suppression, and decoder performance — not cause for alarm.

---

**Question 24.** A company claims their trapped-ion system is "obviously better" than superconducting for fault-tolerant computing because $T_2(\text{ion}) \gg T_2(\text{SC})$. Evaluate this claim rigorously.

??? success "Answer"
    **Evaluation: The claim is a significant oversimplification. Coherence time alone does not determine fault-tolerant computing capability. At least four other factors complicate or contradict it:**

    **1. Gate time matters as much as coherence time.**
    The figure of merit for circuit depth is $T_2/t_{\text{gate}}$, not $T_2$ alone. Trapped ions: $T_2 \sim 10$ s, $t_g \sim 100\ \mu\text{s}$ → depth $\sim 10^5$. Superconducting: $T_2 \sim 200\ \mu\text{s}$, $t_g \sim 50\ \text{ns}$ → depth $\sim 4{,}000$. Ions win on depth but by only ~25×, not orders of magnitude.

    **2. QEC cycle time determines throughput.**
    A fault-tolerant algorithm requires thousands of QEC cycles, each consisting of syndrome extraction, classical decoding, and correction. Trapped-ion QEC cycles take milliseconds; superconducting cycles take ~1 μs. For a 10-second algorithm needing $10^4$ QEC cycles: trapped ions need $10^4 \times 1\ \text{ms} = 10\ \text{s}$; superconducting needs $10^4 \times 1\ \mu\text{s} = 10\ \text{ms}$ — 1,000× faster.

    **3. Two-qubit gate fidelity is what actually determines the threshold margin.**
    If a trapped-ion system achieves 99.9% two-qubit fidelity (not all do; Quantinuum's H2 achieves this, but with slow gates), it is only 3× below threshold — comparable to or only modestly better than superconducting. The threshold margin, not raw coherence, determines how easily fault-tolerant operation is achieved.

    **4. Qubit count scalability.**
    Trapped-ion systems with ~50–100 qubits face significant engineering challenges in scaling to thousands of qubits (ion chain stability, addressing, trap complexity). Superconducting systems are manufactured using standard lithography and have scaled to 1,000+ qubits. At the physical qubit counts needed for fault-tolerant computation (~100,000+), scalability constraints may dominate.

    **Verdict:** The claim ignores gate time, QEC cycle time, threshold margin, and scalability. A complete evaluation requires all four. Trapped ions currently lead on gate fidelity and $T_2/t_{\text{gate}}$; superconducting leads on clock speed and scalability. Neither is "obviously better" for fault-tolerant computing.

---

**Question 25.** Evaluate the significance of the threshold theorem's existence vs. its practical implications. Could a threshold theorem result that required $p < 10^{-10}$ (instead of $p < 10^{-2}$) still be called a transformative result?

??? success "Answer"
    **Evaluation: The existence of the theorem is transformative regardless of the specific threshold value, but the *practical* value depends critically on whether the threshold is achievable.**

    **Why existence alone matters:**
    The threshold theorem was conceptually transformative because it proved for the first time that *fault-tolerant quantum computation is possible in principle*, regardless of noise. Before 1997, no theoretical argument ruled out the possibility that any noise level, however small, would prevent useful computation. The theorem established that a finite noise ceiling exists below which computation is possible. This existential result changed the entire intellectual trajectory of the field.

    **Why the specific value matters enormously for practice:**
    If $p_{\text{th}} = 10^{-10}$ (rather than $10^{-2}$), achieving this physically would require:
    - Gate error rates 8 orders of magnitude below current best values
    - Temperature and isolation requirements possibly violating thermodynamic constraints
    - Timescales for achieving this experimentally measured in centuries

    A threshold at $10^{-10}$ would be a mathematical existence theorem with no engineering path to realization — analogous to knowing that nuclear fusion is possible in principle but being unable to achieve net energy gain. The theoretical result would be important but not *practically* transformative.

    **The surface code threshold at ~1% is transformative precisely because it is achievable.** Current 0.1–0.5% error rates are measurably below threshold. The gap between theory and experiment was bridged within ~25 years. This tight coupling between theoretical threshold and experimental capability is what makes the threshold theorem not just intellectually important but economically and strategically significant.

    **Conclusion:** A threshold at $10^{-10}$ would retain its existential philosophical importance but would not be practically transformative in any near-term engineering sense. The specific value of ~1% for the surface code is what elevates the theorem from theoretical curiosity to engineering roadmap.

---

## Level 6: Create (Questions 26–30)

**Question 26.** Design a noise benchmarking protocol for a quantum processor that a technically literate procurement team could use to independently validate vendor fidelity claims before signing a contract. Your protocol should be executable in under 30 minutes on any quantum cloud API.

??? success "Answer"
    **Proposed Protocol: Independent Fidelity Validation Suite (IFVS)**

    **Component 1: Randomized Benchmarking (RB) for two-qubit gates (~10 minutes)**
    - Run standard Clifford-based randomized benchmarking across all qubit pairs
    - Sequence lengths: 1, 2, 5, 10, 20, 50, 100 Clifford gates
    - 200 random sequences per length, 1,024 shots each
    - Extract exponential decay constant → average error per Clifford gate
    - Compare with vendor-reported values; discrepancy >2× warrants rejection

    **Component 2: Interleaved RB for CNOT gates (~5 minutes)**
    - Interleave CNOT between Clifford gates in RB sequences for the 10 worst-reported qubit pairs
    - Ratio of IRB to RB decay constants gives CNOT-specific error rate
    - This specifically targets the metric most relevant to circuit performance

    **Component 3: Crosstalk Detection (~5 minutes)**
    - Run simultaneous RB on spatially separated qubit pairs (neighboring pairs active simultaneously)
    - Compare error rates to isolated RB; increase >20% indicates significant crosstalk
    - Also run "dressed" T1/T2 measurements with neighboring qubits actively driven

    **Component 4: Measurement Fidelity Matrix (~5 minutes)**
    - Prepare all computational basis states for a representative 10-qubit register
    - Measure 10,000 times each; extract confusion matrix
    - Verify diagonal elements (correct assignment probability) exceed 99%

    **Component 5: Leakage Detection (~5 minutes)**
    - Run leakage randomized benchmarking on 10 representative qubits
    - Measure population in $\ket{2}$ state after known gate sequences
    - Leakage exceeding 0.1% per gate raises concerns for fault-tolerant use

    **Decision criteria:** Accept if: (1) CNOT fidelity ≥ 99.5% across ≥90% of qubit pairs, (2) measurement fidelity ≥ 99% across all qubits, (3) crosstalk increase <20%, (4) leakage <0.1% per CNOT.

---

**Question 27.** Construct a mathematical argument explaining why increasing physical qubit count without improving gate fidelity cannot arbitrarily extend the boundary of classically intractable problems solvable by a noisy quantum computer.

??? success "Answer"
    **Argument:**

    Let $n$ be the number of physical qubits and $p$ the per-gate error rate. A circuit of depth $D$ (sequential layers) using all $n$ qubits has roughly $nD/2$ two-qubit gates (assuming each layer involves $n/2$ parallel CNOT gates).

    **Circuit fidelity:**

    $$F \approx (1-p)^{nD/2} = e^{-(nD/2) p}$$

    For the output to be distinguishable from noise, we need $F > F_{\text{noise}} \approx 2^{-n}$ (the fidelity achievable by random guessing). This requires:

    $$e^{-nDp/2} > 2^{-n}$$

    $$-\frac{nDp}{2} > -n\ln 2$$

    $$D < \frac{2\ln 2}{p}$$

    **Key result:** The maximum useful circuit depth is $D_{\max} = 2\ln 2 / p \approx 1.4/p$, independent of $n$!

    Adding more qubits (increasing $n$) does *not* increase the maximum useful depth — it only increases the *width* of circuits that can be run at that fixed depth. The boundary of classically intractable problems scales with both depth and width together. Problems requiring depth greater than $1.4/p$ cannot be solved regardless of how many qubits are available.

    Specifically: to solve a problem requiring $D > 1.4/p$ operations, one must either (1) improve $p$ below $1.4/D$ or (2) use quantum error correction to achieve lower logical error rates. Simply adding more physical qubits at the same fidelity provides no additional help for those problems.

---

**Question 28.** You are advising a financial institution contemplating a 5-year quantum computing strategy. Create a decision framework that maps specific quantum hardware milestones to specific organizational preparedness actions, incorporating what you know about the threshold theorem, qubit overhead, and coherence constraints.

??? success "Answer"
    **Five-Year Quantum Readiness Decision Framework**

    **Stage 1: "Pre-threshold era" (current–2026)**
    *Hardware milestone:* Physical error rates 0.1–0.5%; no demonstrated fault-tolerant algorithms at useful scale.

    *Organizational actions:*
    - Inventory classical encryption dependencies; identify RSA-2048 and ECC-256 certificate lifecycles
    - Begin PQC (post-quantum cryptography) migration planning; deploy NIST-standardized algorithms (ML-KEM, ML-DSA) for new systems
    - Assign quantum technology literacy training to IT security and CTO teams
    - No quantum hardware investments justified for commercial computation yet

    **Stage 2: "Early fault-tolerant era" (2026–2028)**
    *Hardware milestone:* 100–500 fault-tolerant logical qubits demonstrated; Λ > 3; gross codes deployed on hardware.

    *Organizational actions:*
    - Engage 2–3 quantum hardware vendors via research partnership (not procurement contracts)
    - Run pilot fault-tolerant simulations of small optimization subproblems
    - Accelerate PQC migration for all externally-facing systems; complete crypto inventory
    - Begin workforce development: hire 1–2 quantum algorithm specialists

    **Stage 3: "Intermediate fault-tolerant era" (2028–2031)**
    *Hardware milestone:* 1,000–5,000 fault-tolerant logical qubits; demonstrated quantum advantage for specific optimization or chemistry problems.

    *Organizational actions:*
    - Evaluate quantum cloud services for specific high-value use cases (portfolio optimization, drug interaction modeling)
    - Complete PQC migration across all internal systems; deprecate RSA/ECC entirely
    - Procurement criteria: require vendors to specify logical qubit count, distance, and error rates
    - Build hybrid classical-quantum pipeline for 1–2 target applications

    **Stage 4: "Cryptographically relevant era" (2031+)**
    *Hardware milestone:* >100,000 fault-tolerant logical qubits; Shor's algorithm viable on RSA-2048.

    *Organizational actions:*
    - All encryption should already be PQC-migrated from Stage 2–3; this stage should present no new crisis
    - Evaluate quantum advantage in core business processes with demonstrated ROI
    - Long-lived data encrypted with hybrid classical+PQC schemes since Stage 2

    **Key principle:** Cryptographic preparedness (PQC migration) should be driven by *data sensitivity lifetime*, not by quantum hardware progress. Data encrypted today that must remain secret in 2035+ must be protected now, regardless of quantum hardware timelines.

---

**Question 29.** A startup claims to have a new qubit technology with $T_2 = 1$ ms, two-qubit gate time of 10 ns, and gate fidelity of 99.8%. Construct an analysis of whether this platform, at scale, would represent a meaningful improvement over current superconducting qubits for fault-tolerant computing, using quantitative comparisons.

??? success "Answer"
    **Analysis of hypothetical startup platform vs. current superconducting (IBM Heron baseline)**

    **Baseline comparison:**

    | Metric | IBM Heron (current) | Startup (claimed) | Improvement |
    |--------|-------------------|------------------|-------------|
    | $T_2$ | 200 μs | 1,000 μs | 5× |
    | Gate time | 50 ns | 10 ns | 5× faster |
    | Gate fidelity | 99.7% ($p = 0.003$) | 99.8% ($p = 0.002$) | 1.5× |
    | $T_2/t_g$ ratio | 4,000 | 100,000 | 25× |

    **Circuit depth capacity:** $100{,}000$ gate layers vs. $4{,}000$ — a 25× improvement. This is significant: deeper algorithms become accessible without error correction.

    **Fidelity cliff analysis at 500 gate circuits:**
    - IBM Heron: $F = (0.997)^{500} = e^{-500 \times 0.003} = e^{-1.5} \approx 0.22$
    - Startup: $F = (0.998)^{500} = e^{-500 \times 0.002} = e^{-1.0} \approx 0.37$

    Modest improvement for NISQ algorithms.

    **Fault-tolerant threshold analysis:**
    - Startup error rate $p = 0.002 = 0.2\%$; threshold $p_{\text{th}} = 1\%$
    - Ratio: $p/p_{\text{th}} = 0.2$ — same as the IBM baseline at 0.2%
    - Logical error rate at $d = 7$: $p_L = 0.1 \times (0.2)^4 = 0.1 \times 1.6 \times 10^{-3} = 1.6 \times 10^{-4}$

    Compare IBM Heron at $p = 0.003$: $p_L = 0.1 \times (0.3)^4 = 0.1 \times 8.1 \times 10^{-3} = 8.1 \times 10^{-4}$

    Startup's logical error rate is **5× better** at $d = 7$, which could translate to reaching lower distances for the same logical error rate — a real overhead advantage.

    **Critical missing information:** Gate fidelity of 99.8% at 10 ns gates is a very bold claim. Current 10-ns gates typically achieve ~98% fidelity; 99.8% would require breakthrough coherence properties at fast timescales. Additionally: Does the 1 ms $T_2$ hold during simultaneous two-qubit operations (typically $T_2$ degrades under active driving)? What connectivity is achievable? What is the measurement fidelity and time?

    **Verdict:** If the claims hold under independent verification, this would be a meaningful improvement — particularly the 25× better circuit depth capacity and 5× better logical error rate. But the combination of fast (10 ns) gates with high fidelity (99.8%) and long coherence (1 ms) simultaneously is extraordinary and requires extremely rigorous validation before investment decisions.

---

**Question 30.** Propose a research experiment that would, if successful, settle the debate about whether neutral atom erasure errors genuinely provide a fault-tolerance advantage over superconducting Pauli errors in practice (not just in theory). Specify the experimental conditions, measurements, and success criteria.

??? success "Answer"
    **Proposed Experiment: Comparative Fault-Tolerance Advantage of Erasure Errors in Neutral Atoms**

    **Background:** Theory predicts that erasure errors (atom loss, detectable at known locations) are twice as correctable as Pauli errors (unknown location, unknown type). A distance-$d$ surface code corrects $\lfloor(d-1)/2\rfloor$ Pauli errors but up to $d-1$ erasures. If neutral atoms' dominant error is erasure, their effective fault-tolerance threshold should significantly exceed the standard ~1% Pauli threshold.

    **Experimental design:**

    *Platform 1 — Neutral atoms (QuEra/Atom Computing):*
    - Implement a distance-5 and distance-7 surface code on a neutral atom array
    - Instrument to detect atom loss events (fluorescence imaging between cycles)
    - Use detected loss positions as explicit erasure location inputs to the decoder
    - Run 10,000 syndrome extraction cycles per code distance
    - Measure: Λ (logical error rate improvement from $d=5$ to $d=7$) as a function of intentionally-induced loss rate

    *Platform 2 — Superconducting qubits:*
    - Implement identical distance-5 and distance-7 surface codes
    - Inject known errors at controlled rates (Pauli injection via calibrated depolarizing noise)
    - Measure Λ as a function of injected Pauli error rate

    *Controlled comparison:*
    - Match total error rates (neutral atom loss rate = superconducting Pauli error rate) at three levels: 0.2%, 0.5%, 1.0%
    - Measure Λ for both platforms at each error rate

    **Predicted results (if erasure advantage is real):**
    - Neutral atoms at 0.5% loss rate: Λ(loss-decoded) > Λ(Pauli-decoded at 0.5%)
    - Neutral atoms threshold: measured effective $p_{\text{th,erasure}} > 2\%$ (theory prediction ~2×)
    - Specifically: neutral atoms show $\Lambda > 1$ at error rates where superconducting shows $\Lambda \approx 1$ (near threshold)

    **Success criteria:**
    1. Neutral atom Λ exceeds superconducting Λ by >2× at equal total error rates (p < threshold)
    2. Neutral atom effective threshold exceeds superconducting threshold by >1.5× in matched conditions
    3. Erasure decoder provides >1.5× improvement over Pauli decoder applied to neutral atom data

    **Controls needed:**
    - Verify that non-erasure (Pauli) errors in neutral atoms are truly subdominant
    - Account for correlated errors (neighboring atoms lost together in some configurations)
    - Validate that the erasure detection itself (fluorescence imaging) does not disturb the quantum state or introduce additional errors

    **Impact:** If successful, this would establish that neutral atoms' error *type* provides a genuine, quantifiable, and hardware-inherent fault-tolerance advantage — justifying different QEC code designs and potentially different physical qubit overhead calculations for this platform.
