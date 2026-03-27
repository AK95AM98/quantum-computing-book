# Chapter 1 Quiz: Classical Bits vs. Quantum Bits

*30 questions distributed across Bloom's Taxonomy levels.*

---

## Remember (Questions 1–5)

**1.** What is the minimum energy required to erase one bit of information at room temperature (300 K), according to Landauer's principle?

??? success "Answer"
    **~2.87 × 10⁻²¹ J** (= k_B T ln 2 ≈ 1.38×10⁻²³ × 300 × 0.693).

**2.** What is the general mathematical form of a single-qubit state?

??? success "Answer"
    **|ψ⟩ = α|0⟩ + β|1⟩** where α, β ∈ ℂ and |α|² + |β|² = 1.

**3.** What condition must a matrix U satisfy to be unitary?

??? success "Answer"
    **U†U = UU† = I** — its conjugate transpose equals its inverse.

**4.** On the Bloch sphere, where is the state |0⟩ located?

??? success "Answer"
    **The north pole** (θ = 0).

**5.** The Toffoli gate flips its target qubit when:

??? success "Answer"
    **Both control qubits are |1⟩** — it implements a reversible AND gate.

---

## Understand (Questions 6–10)

**6.** Explain why a classical AND gate is irreversible but a NOT gate is reversible.

??? success "Answer"
    AND maps (0,0), (0,1), and (1,0) all to output 0 — you cannot reconstruct the inputs from the output (many-to-one). NOT maps 0→1 and 1→0 (one-to-one bijection), so the input is always recoverable from the output.

**7.** Why does Landauer's principle imply that irreversible computation must dissipate heat?

??? success "Answer"
    Erasing information (reducing two possible states to one) decreases the system's entropy. By the second law of thermodynamics, this entropy must be transferred to the environment as heat — at least k_B T ln 2 per bit erased.

**8.** What is the difference between a qubit's amplitude and its probability?

??? success "Answer"
    The **amplitude** α is a complex number; the **probability** of measuring |0⟩ is |α|², the squared magnitude. Probabilities are real and non-negative; amplitudes can be negative or complex, enabling quantum interference.

**9.** Why does quantum parallelism not allow a quantum computer to simply "try all answers at once"?

??? success "Answer"
    Although a quantum register holds a superposition of all 2ⁿ states simultaneously, **measurement yields only one outcome** sampled from the probability distribution. The challenge is to engineer interference so the correct answer has high amplitude before measurement — raw parallelism without interference is useless.

**10.** Explain the significance of the equation U†U = I for quantum computing.

??? success "Answer"
    It means every quantum gate is **reversible** (U⁻¹ = U†), **norm-preserving** (total probability always equals 1), and **deterministic** in evolution. The only randomness in quantum computation comes from measurement, not from the gates themselves.

---

## Apply (Questions 11–15)

**11.** A qubit is in state |ψ⟩ = (√3/2)|0⟩ + (1/2)|1⟩. What are the probabilities of measuring 0 and 1?

??? success "Answer"
    P(0) = |√3/2|² = **3/4**; P(1) = |1/2|² = **1/4**.

**12.** Apply the Pauli-X gate to |ψ⟩ = (2/√5)|0⟩ + (1/√5)|1⟩. What is the resulting state?

??? success "Answer"
    X swaps amplitudes: result is **(1/√5)|0⟩ + (2/√5)|1⟩**. Measurement probabilities: P(0) = 1/5, P(1) = 4/5.

**13.** Apply the Hadamard gate to |1⟩. What state results, and what are the measurement probabilities?

??? success "Answer"
    H|1⟩ = (|0⟩ − |1⟩)/√2 = **|−⟩**. Measurement probabilities: P(0) = P(1) = **1/2**. Note the negative sign — |−⟩ differs from |+⟩ by a phase flip detectable in the Hadamard basis.

**14.** A classical computer performs 10¹⁰ irreversible operations per second at T = 300 K. What is the Landauer minimum power dissipation?

??? success "Answer"
    P_min = 10¹⁰ × k_B T ln 2 = 10¹⁰ × 2.87×10⁻²¹ ≈ **2.87×10⁻¹¹ W** ≈ 29 picowatts. A typical CPU dissipates ~100 W — more than 10¹² times this minimum.

**15.** Locate the state |ψ⟩ = (1/√2)|0⟩ + (i/√2)|1⟩ on the Bloch sphere.

??? success "Answer"
    Writing as cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩: cos(θ/2) = 1/√2 → θ = π/2; e^{iφ} = i → φ = π/2. This is the **+y axis** of the Bloch sphere, the state |+i⟩.

---

## Analyze (Questions 16–20)

**16.** Compare a qubit in state |+⟩ = (|0⟩+|1⟩)/√2 with a classical coin flipped to give 50% heads and 50% tails. What is physically different?

??? success "Answer"
    Both give 50/50 in the computational basis. But |+⟩ gives a **deterministic outcome** (always |+⟩) when measured in the Hadamard basis — it has a definite quantum phase. The classical mixture has no phase, and measures 50/50 in every basis. The off-diagonal coherence term (i.e., the relative phase) distinguishes them.

**17.** Why does the n-qubit state space being 2ⁿ-dimensional not mean quantum computers can solve NP-complete problems efficiently?

??? success "Answer"
    The 2ⁿ amplitudes exist in superposition but **measurement yields only one outcome**. Without a clever algorithm that concentrates amplitude on correct answers via interference, measuring a superposition gives a random sample — no better than guessing. Quantum speedup requires exploiting specific mathematical structure, not just the large state space.

**18.** The Toffoli gate is universal for classical reversible computation. Why does adding the Hadamard gate H extend this to universal quantum computation?

??? success "Answer"
    Toffoli alone can only compute classical Boolean functions (it permutes computational basis states). Adding H creates superpositions, enabling quantum parallelism and interference. The set {Toffoli, H} generates all quantum operations on the computational basis, but {CNOT, H, T} is more practically efficient for universal quantum computation.

**19.** Compare the energy costs of reversible vs. irreversible computation from a thermodynamic perspective.

??? success "Answer"
    Landauer's principle places a minimum energy cost of k_B T ln 2 **per bit erased** for irreversible computation. Reversible computation (no information erasure) has **zero thermodynamic minimum** — it can in principle be performed without dissipating heat. Quantum gates are reversible by necessity (unitarity), so quantum computing is thermodynamically favored over irreversible classical computing in principle, though practical overheads (control electronics, cryogenic cooling) dominate current energy costs.

**20.** A vendor claims a "1,000-qubit quantum computer." What questions should you ask before accepting this as a meaningful performance claim?

??? success "Answer"
    Key questions: (1) What is the **physical qubit error rate per gate**? (2) What is the **coherence time T2** and gate time — i.e., how many gates can be executed per coherence window? (3) Is the connectivity **all-to-all or nearest-neighbor**? (4) How many **logical qubits** does this support? (5) Has below-threshold operation been demonstrated? Raw qubit count without these metrics is a marketing number.

---

## Evaluate (Questions 21–25)

**21.** Assess whether "quantum computing will solve all optimization problems exponentially faster than classical computers." Is this claim valid?

??? success "Answer"
    **No — this is a common misconception.** Quantum speedup exists only for problems with specific mathematical structure exploitable by quantum algorithms. Unstructured search gets only a quadratic speedup (Grover). Many optimization problems (NP-complete problems like TSP) are not known to have efficient quantum algorithms. BQP is not believed to contain NP. The claim is marketing hype.

**22.** Evaluate the following hardware trade-off: superconducting qubits have T2 ≈ 200 μs with 50 ns gates (~4,000 gates/coherence); trapped ions have T2 ≈ 10 s with 100 μs gates (~100,000 gates/coherence). Which is better?

??? success "Answer"
    **Neither is universally better — it depends on the algorithm.** For shallow circuits (NISQ algorithms, VQE), superconducting's speed enables many short experiments quickly. For deep circuits (Shor's algorithm, complex quantum chemistry), trapped ions' ~25× deeper circuit capability is critical. The right platform depends on the target application.

**23.** A qubit manufacturer claims their qubits have a "purity of 0.99." Evaluate what this tells you about the qubit's state.

??? success "Answer"
    Purity = Tr(ρ²) = 0.99 means the qubit is in a nearly-pure state. Bloch vector length |r| = √(2×0.99-1) ≈ 0.99. The qubit retains ~99% of its quantum coherence — very high quality. For comparison, a perfectly mixed state has purity 0.5. This is a good qubit metric, but purity alone doesn't capture gate fidelity or T2 time.

**24.** Landauer's minimum dissipation is ~10⁻²¹ J per bit at room temperature, yet quantum computers require cryogenic cooling consuming kilowatts. Evaluate whether quantum computing is "more energy efficient" than classical computing.

??? success "Answer"
    **Not at current scale.** While quantum gate operations are thermodynamically reversible (approaching Landauer's minimum), the cryogenic infrastructure (dilution refrigerators, control electronics) consumes kilowatts to maintain 15 mK. At current scale (100s of qubits), quantum computers are enormously less energy-efficient than classical hardware. The energy efficiency argument applies at fault-tolerant scale (millions of logical operations per second) which is years away. The correct framing is not "quantum is more efficient" but "certain quantum algorithms can solve specific problems with fewer computational steps."

**25.** Given that the Toffoli gate is universal for classical computation and quantum gates are also universal, evaluate whether quantum computers make classical computers obsolete.

??? success "Answer"
    **No.** Quantum computers provide exponential speedup only for specific problem classes (factoring, period-finding, quantum simulation). For the vast majority of everyday computational tasks — databases, web services, machine learning inference, video rendering — classical computers are faster, cheaper, and more practical. Quantum computers are specialized co-processors for specific algorithms, not general-purpose replacements.

---

## Create (Questions 26–30)

**26.** Design a reversible classical circuit that computes XOR(a, b, c) — the XOR of three bits — using only Toffoli and CNOT gates. How many ancilla bits are needed?

??? success "Answer"
    CNOT computes XOR of two bits reversibly. Chain two CNOTs: first CNOT(a→d) where d is an ancilla initialized to b, giving d = a⊕b. Then CNOT(d→e) where e is initialized to c, giving e = (a⊕b)⊕c = a⊕b⊕c. **1 ancilla** needed if we overwrite one input; **0 ancilla** if we allow input destruction. Full reversibility requires 2 ancilla bits to store both intermediate results.

**27.** Create a measurement protocol to distinguish the states |+⟩ and |−⟩ (which are indistinguishable by computational basis measurement). Describe the circuit.

??? success "Answer"
    Apply a **Hadamard gate** before measuring in the computational basis. H|+⟩ = |0⟩ → always measures 0. H|−⟩ = |1⟩ → always measures 1. The protocol: (1) Apply H to the unknown qubit; (2) Measure in {|0⟩, |1⟩} basis. Outcome 0 → state was |+⟩; outcome 1 → state was |−⟩. This works perfectly (100% discrimination) because |+⟩ and |−⟩ are orthogonal.

**28.** Design a quantum experiment that demonstrates Landauer's principle: the erasure of quantum information releases heat. What would you measure, and what result would confirm the principle?

??? success "Answer"
    Prepare a qubit in an unknown state (either |0⟩ or |1⟩ with equal probability — a mixed state). "Erase" it by applying amplitude damping until ρ → |0⟩⟨0|. Measure the heat absorbed by a calorimeter coupled to the qubit's environment. Confirmation: the calorimeter absorbs at least k_B T ln 2 ≈ 2.87×10⁻²¹ J. This has been demonstrated experimentally (e.g., Bérut et al., Nature 2012, using a colloidal particle). For a quantum version, see Cottet et al. (PNAS, 2017) using a superconducting qubit.

**29.** You are asked to build a quantum circuit that prepares the state |ψ⟩ = (√3/2)|0⟩ + (1/2)|1⟩ from |0⟩. Design the circuit using rotation gates.

??? success "Answer"
    The target state has cos(θ/2) = √3/2 → θ/2 = 30° → θ = 60° = π/3. No phase (φ = 0). Apply **R_y(π/3)** to |0⟩:
    R_y(π/3)|0⟩ = (cos π/6)|0⟩ + (sin π/6)|1⟩ = (√3/2)|0⟩ + (1/2)|1⟩ ✓
    Circuit: single R_y(π/3) gate on the initial |0⟩ qubit.

**30.** Propose a business case for investing in quantum computing research in 2026, given that fault-tolerant quantum computers are still 3–7 years away. What specific actions generate value now?

??? success "Answer"
    A strong business case includes: (1) **PQC migration** — NIST FIPS 203/204/205 must be implemented before 2030 regulatory deadline; beginning now avoids a compliance crisis. (2) **Talent pipeline** — quantum expertise is scarce; hiring 2–3 quantum-literate engineers now costs far less than a team in 2029. (3) **Algorithm development** — identifying quantum-amenable problems in your domain (logistics, drug discovery, finance) requires 2–3 years of research before hardware is ready. (4) **NISQ experimentation** — D-Wave (optimization), IBM cloud (VQE, QAOA) offer real quantum utility today for narrow problems. (5) **Vendor relationship** — early access programs with IBM, IonQ, and Google provide roadmap visibility and priority allocation on future hardware.
