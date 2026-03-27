---
title: "Chapter 7: Why Noise-Free Quantum Computing Is So Difficult"
chapter: 07
concepts: 18
prerequisites: ["Chapter 6: Density Matrices and Decoherence Channels"]
bloom_levels: [Remember, Understand, Apply, Analyze]
---

# Chapter 7: Why Noise-Free Quantum Computing Is So Difficult

Picture a classical bit. Inside a modern transistor, the voltage representing a logical `1` sits atop an energy barrier roughly a billion times larger than room-temperature thermal fluctuations. You can vibrate the chip, expose it to mild radiation, heat it to 70 °C, and the bit will not spontaneously flip. Classical information is macroscopically robust by design.

Now picture a superconducting qubit cooled to 15 millikelvin. Its quantum state — the superposition \(\ket{\psi} = \alpha\ket{0} + \beta\ket{1}\) — stores information not in a macroscopic voltage but in a *relative phase* between two probability amplitudes. A single stray photon leaking through imperfect shielding, a magnetic field fluctuation of a few nanotesla from a distant passing vehicle, or a cosmic ray striking the silicon substrate can destroy that phase relationship in microseconds. The qubit's state collapses or rotates — and the quantum information it carried is gone.

This chapter explains why, in precise physical and mathematical terms. We will see that noise in quantum hardware is not an engineering nuisance to be eventually solved: it is a fundamental consequence of how quantum information is encoded. Understanding *why* it is hard is the prerequisite for understanding why quantum error correction (Chapter 8) is the most important result in the field.

---

## 7.1 The Fragility of Quantum Information

### 7.1.1 What a Qubit Actually Encodes

A single qubit's state lives on the Bloch sphere:

$$
\ket{\psi} = \cos\!\frac{\theta}{2}\ket{0} + e^{i\phi}\sin\!\frac{\theta}{2}\ket{1}
$$

Two real numbers, $\theta \in [0,\pi]$ and $\phi \in [0,2\pi)$, fully specify the state. The logical distinction between $\ket{0}$ and $\ket{1}$ is unambiguous at the poles, but the physically meaningful information in a general superposition is carried by the azimuthal angle $\phi$ — the *relative phase*. This phase is exquisitely sensitive to environmental perturbations, because any interaction with the environment that distinguishes $\ket{0}$ from $\ket{1}$ will randomize $\phi$.

A classical bit, by contrast, stores information in a binary voltage level. The two states are separated by an energy barrier $\Delta E$ that is engineered to be enormous compared to $k_B T$. For a modern CMOS transistor at room temperature:

$$
\frac{\Delta E}{k_B T} \approx 10^9
$$

The probability of a spontaneous bit flip is $\sim e^{-10^9}$ — effectively zero for the lifetime of the universe. Qubits have no analogous energy barrier protecting their phase. Any tiny Hamiltonian perturbation shifts $\phi$ continuously. This is the root cause of all quantum noise.

### 7.1.2 The Three Fundamental Error Types

Every single-qubit error can be decomposed in the **Pauli basis** $\{I, X, Y, Z\}$:

$$
X = \begin{pmatrix}0&1\\1&0\end{pmatrix}, \qquad
Y = \begin{pmatrix}0&-i\\i&0\end{pmatrix}, \qquad
Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

The three elementary error types are:

| Error | Operator | Physical effect | Classical analog? |
|-------|----------|-----------------|-------------------|
| Bit-flip | $X$ | $\ket{0}\leftrightarrow\ket{1}$ | Yes — voltage spike |
| Phase-flip | $Z$ | $\ket{+}\leftrightarrow\ket{-}$; multiplies $\ket{1}$ by $-1$ | No |
| Bit-and-phase-flip | $Y = iXZ$ | Both flips simultaneously | No |

Note that $Y = iXZ$, so any error-correcting code that handles both $X$ and $Z$ errors automatically handles $Y$ errors as well (up to global phase). This is not a coincidence — it reflects the algebraic structure of the Pauli group and is exploited heavily in stabilizer codes.

### 7.1.3 Why Continuous Errors Are Actually Manageable

Here is what appears to be a fatal problem: physical errors are *continuous*. A qubit does not suddenly suffer a perfect $X$ or $Z$ rotation. Instead, it might undergo a tiny rotation $R_x(\epsilon) = e^{-i\epsilon X/2}$ for some small angle $\epsilon$. The set of possible errors spans a continuous manifold on the Bloch sphere.

For a classical error-correcting code, the discrete alphabet (0s and 1s) makes correction conceptually straightforward. How can we correct errors drawn from an infinite continuous space?

The answer is the **discretization theorem** (previewed here; developed fully in Section 8.1): when we measure the *syndrome* of a quantum error-correcting code — collective parity checks on groups of qubits — the act of measurement itself collapses the continuous error onto one of the discrete Pauli basis elements. We never need to correct the exact error; we only correct the *Pauli component* of it.

More precisely: for any single-qubit error channel $\mathcal{E}(\rho) = \sum_{j} E_j \rho E_j^\dagger$, the operators $E_j$ can always be expanded in the Pauli basis:

$$
E_j = a_j I + b_j X + c_j Y + d_j Z
$$

Syndrome measurement projects $\rho$ onto the subspace corresponding to one of these four Paulis, and correcting that Pauli exactly restores the encoded state — even if the original error was an infinitesimally small rotation. The continuous infinity of possible errors collapses to just four cases: $\{I, X, Y, Z\}$.

!!! warning "Common Misconception"
    Many students assume that because physical errors are continuous rotations rather than discrete Pauli flips, quantum error correction must be fundamentally harder or less effective than classical error correction. In fact, syndrome measurement discretizes errors automatically. Correcting the four Pauli errors exactly restores the state for *any* single-qubit error, regardless of how small or large the rotation angle was. The discretization is not an approximation — it is exact, and it is the miracle that makes QEC work.

---

## 7.2 Sources of Noise in Real Quantum Hardware

Understanding noise sources concretely is essential for evaluating hardware claims and understanding why different platforms have different strengths. The dominant noise mechanisms differ substantially across qubit modalities.

### 7.2.1 Superconducting Qubits (IBM, Google)

Superconducting qubits — transmons and their variants — operate at ~15 mK inside dilution refrigerators. Despite this extreme cooling, multiple noise channels remain active:

**Thermal excitations.** At 15 mK, $k_B T \approx 1.3 \times 10^{-24}$ J, much smaller than the qubit energy splitting $\hbar\omega \approx 10^{-23}$ J (at ~6 GHz). The thermal photon occupation is:

$$
\bar{n} = \frac{1}{e^{\hbar\omega/k_BT}-1} \approx 0.003
$$

Small, but not zero. Residual thermal photons produce spontaneous qubit excitation and limit $T_1$.

**Dielectric loss.** The dominant $T_1$ limitation in state-of-the-art transmons. Two-level systems (TLS) — atomic-scale defects at material interfaces (substrate–metal, oxide layers on Josephson junctions) — absorb microwave photons, dissipating energy and depolarizing the qubit. TLS density depends critically on materials processing, substrate choice, and junction quality.

**Quasiparticle poisoning.** Thermal energy occasionally breaks Cooper pairs, creating quasiparticles that tunnel through Josephson junctions and depolarize the qubit. This creates a background depolarization floor that cannot be eliminated by further cooling below the superconducting transition temperature.

**Cosmic ray events.** A particularly insidious *burst* error source. A cosmic ray muon (or secondary particle) striking the silicon substrate deposits ~MeV of energy, creating thousands of quasiparticles that simultaneously depolarize many nearby qubits. Google's 2021 paper (McEwen et al.) measured these events occurring roughly every 10 seconds, affecting qubits across millimeter-scale regions. Such correlated errors are especially dangerous because most error-correction codes assume *independent* errors across qubits. Burst errors can flip many physical qubits in a single event, potentially overwhelming the correction capability of a surface code.

**ZZ coupling (crosstalk).** Always-on parasitic coupling between neighboring qubits. When one qubit occupies state $\ket{1}$, it shifts the frequency of neighbors by a ZZ interaction energy, causing unwanted conditional phase accumulation during idle periods. IBM's Heron and Nighthawk processors introduced tunable couplers that suppress ZZ coupling to below 5 kHz, even while enabling fast two-qubit gates.

**Control electronics noise.** Digital-to-analog converters (DACs) generating microwave pulses have finite resolution (typically 14–16 bits) and thermal noise from the cable chain. Phase noise on the local oscillator translates directly to dephasing. Timing jitter in pulse generation causes systematic gate errors.

**Leakage to non-computational states.** Transmon qubits use the two lowest energy levels $\ket{0}$ and $\ket{1}$ of an anharmonic oscillator. The anharmonicity $\alpha \approx -200$ to $-300$ MHz separates $\ket{1}$ from $\ket{2}$ enough to address selectively, but fast gates can transiently populate $\ket{2}$ and $\ket{3}$. These *leakage* errors are particularly dangerous for quantum error correction because standard stabilizer codes only detect errors within the computational subspace $\{\ket{0},\ket{1}\}$. Leakage reduction units (LRUs) are required to actively detect and return leaking qubits to the computational subspace.

### 7.2.2 Trapped Ions (IonQ, Quantinuum)

Trapped-ion qubits store information in internal electronic or hyperfine states of individual ions held in electromagnetic traps. Their natural isolation gives dramatically longer coherence times but introduces different noise sources:

**Motional heating.** Ions are laser-cooled to near the motional ground state of their trap potential. Electric field fluctuations from the trap electrodes (Johnson noise and surface noise from adsorbed molecules) continuously add phonons to the motional modes. This is critical because two-qubit gates in trapped ions work by mediating interaction through shared motional modes (Mølmer–Sørensen or geometric phase gates). Even a few added phonons reduce gate fidelity substantially.

**Laser intensity and phase noise.** High-fidelity gates require laser pulses with phase stability at the $10^{-4}$ radian level and intensity stability at the $10^{-4}$ level. Achieving this demands sophisticated optical engineering: vibration-isolated optical tables, electro-optic modulators, and active phase-locking feedback loops.

**Off-resonant scattering.** Laser beams used for qubit control can scatter off nearby atomic transitions, causing decoherence proportional to laser intensity and inversely proportional to detuning from other levels.

**Anomalous heating from surface contaminants.** Residual gas molecules adsorbing to trap electrodes create fluctuating patch potentials that add noise far above the Johnson noise floor. This "anomalous heating" scales strongly with trap size, ion–electrode distance, and surface cleanliness — typically as $d^{-4}$ in the electrode spacing $d$.

**Ion loss and crystal reconfiguration.** Background gas collisions can eject ions from the trap. In systems with ion shuttling (e.g., Quantinuum's H-series), reordering ions in the chain for connectivity purposes causes brief interruptions and potential phase errors during the shuttle sequence.

### 7.2.3 Neutral Atoms (QuEra, Atom Computing)

Neutral atom platforms trap individual atoms in arrays of optical tweezers and use Rydberg blockade interactions for two-qubit gates:

**Atom loss from optical traps.** The photon scattering that provides trapping also heats atoms; periodically some are lost entirely. Atom loss rates of ~1% per second are typical, requiring probabilistic loss detection and atom reinsertion.

**Rydberg state decay.** Rydberg states with principal quantum number $n \sim 50$–$80$ have spontaneous emission lifetimes of order 100 μs, limiting the duration over which Rydberg-mediated gates can operate.

**Position fluctuations in tweezers.** Atoms are not fixed precisely at the trap center; zero-point motion and thermal fluctuations cause the atom position to vary by tens of nanometers, modifying the Rydberg–Rydberg interaction strength from shot to shot and introducing gate error.

**Laser phase noise.** Rydberg excitation requires UV or near-UV lasers. Phase noise in these systems — harder to control than in near-infrared telecom-band lasers — contributes directly to gate errors.

### 7.2.4 Hardware Comparison Table (Early 2026)

| Parameter | Superconducting | Trapped Ion | Neutral Atom |
|-----------|----------------|-------------|--------------|
| $T_1$ | 100–300 μs | seconds–minutes | seconds |
| $T_2$ | 100–300 μs | seconds | seconds |
| 1-qubit gate fidelity | 99.9%+ | 99.99%+ | 99.9%+ |
| 2-qubit gate fidelity | 99.5–99.9% | 99.7–99.99% | 99.5–99.8% |
| 2-qubit gate time | 20–100 ns | 50–200 μs | 0.5–5 μs |
| Measurement fidelity | 99%+ | 99.9%+ | 99%+ |
| Connectivity | Nearest-neighbor | All-to-all | Reconfigurable |
| Leading qubit count | 1,000+ | 50–100 | 1,000+ |

!!! tip "Business Implication"
    Hardware spec sheets invariably emphasize qubit *count* and *coherence time*. Neither metric alone determines computational power. Two-qubit gate fidelity and gate time are equally critical. A system with $10\times$ longer coherence time but $1{,}000\times$ slower gates is not necessarily better for any given algorithm. Always demand all four numbers: coherence time, gate fidelity, gate time, and qubit count — and then ask how they combine for your specific workload.

!!! example "Worked Example 7.1 — Effective Gate Error Rate from Decoherence"
    A superconducting qubit has $T_1 = 200\ \mu\text{s}$, $T_2 = 150\ \mu\text{s}$, and a two-qubit CNOT gate time of $t_g = 50\ \text{ns}$. What is the effective gate error probability due to decoherence alone?

    **Step 1: Depolarization error from $T_1$ during the gate (per qubit):**

    $$p_1 = 1 - e^{-t_g/T_1} \approx \frac{t_g}{T_1} = \frac{50 \times 10^{-9}}{200 \times 10^{-6}} = 2.5 \times 10^{-4}$$

    **Step 2: Dephasing error from $T_2$ during the gate (per qubit):**

    $$p_\phi = 1 - e^{-t_g/T_2} \approx \frac{t_g}{T_2} = \frac{50 \times 10^{-9}}{150 \times 10^{-6}} = 3.3 \times 10^{-4}$$

    **Step 3: Total decoherence error for a two-qubit gate** (both qubits contribute):

    $$p_{\text{dec}} \approx 2 \times (p_1 + p_\phi) = 2 \times 5.8 \times 10^{-4} \approx 1.2 \times 10^{-3}$$

    **Conclusion:** Decoherence alone contributes ~0.12% per two-qubit gate. Adding control electronics noise and residual ZZ coupling pushes realistic two-qubit gate error rates to 0.2–0.5%, consistent with IBM Heron's measured 0.3%.

---

## 7.3 Coherence Time vs. Circuit Depth — The Fundamental Race

### 7.3.1 The Circuit Depth Bottleneck

Every quantum algorithm is compiled into a sequence of gates applied layer by layer — a *circuit*. The number of sequential gate layers is the **circuit depth**. Each layer takes time; while later layers execute, qubits initialized earlier continue to decohere.

The maximum useful circuit depth before decoherence overwhelms the computation is roughly:

$$
d_{\max} \approx \frac{T_2}{t_{\text{gate}}}
$$

This ratio — coherence time divided by gate time — tells us how many sequential gate operations a qubit can survive before its coherence is lost.

**Superconducting qubits** ($T_2 \approx 200\ \mu\text{s}$, $t_{\text{gate}} \approx 50\ \text{ns}$):

$$
d_{\max}^{\text{SC}} \approx \frac{200 \times 10^{-6}}{50 \times 10^{-9}} = 4{,}000 \text{ sequential gate layers}
$$

**Trapped ions** ($T_2 \approx 10\ \text{s}$, $t_{\text{gate}} \approx 100\ \mu\text{s}$):

$$
d_{\max}^{\text{TI}} \approx \frac{10}{100 \times 10^{-6}} = 100{,}000 \text{ sequential gate layers}
$$

Trapped ions have a 25× advantage in circuit depth — they can run deeper algorithms before decoherence dominates. But the absolute gate time matters equally: a 100,000-layer circuit in trapped ions takes $100{,}000 \times 100\ \mu\text{s} = 10$ seconds per execution. Superconducting qubits execute the same depth in 200 μs, enabling vastly more circuit repetitions per unit time. For variational algorithms (VQE, QAOA) that require thousands of repetitions to estimate expectation values, this clock-speed advantage is decisive.

!!! warning "Common Misconception"
    "Trapped ions are clearly superior because they have much longer coherence times." This conflates two distinct figures of merit. The *ratio* $T_2/t_{\text{gate}}$ (maximum circuit depth) and the absolute gate time (clock speed) both matter, and they favor different platforms for different tasks. Trapped ions excel at deep circuits requiring all-to-all connectivity. Superconducting qubits excel at high repetition rate and fast classical feedback. Neither platform dominates the other universally.

### 7.3.2 The Fidelity Cliff

Fidelity does not degrade gracefully — it degrades geometrically with circuit depth. For $n$ two-qubit gates each with error rate $p_{2q}$, the circuit fidelity is approximately:

$$
F_{\text{circuit}} \approx (1 - p_{2q})^n
$$

!!! example "Worked Example 7.2 — When Does IBM Heron Cross the Fidelity Cliff?"
    IBM Heron has a measured two-qubit CNOT error rate of approximately $p_{2q} = 0.003$ (0.3%). At what circuit depth does the fidelity fall from near 99% to 50%?

    **Finding the depth where $F = 0.99$:**

    $$0.99 = (1 - 0.003)^n \implies n = \frac{\ln 0.99}{\ln 0.997} \approx \frac{-0.01005}{-0.003005} \approx 3.3 \text{ gates}$$

    So just 3–4 CNOT gates already degrade fidelity to ~99% — below the error floor for most useful computations.

    **Finding the depth where $F = 0.50$:**

    $$0.50 = (0.997)^n \implies n = \frac{\ln 0.5}{\ln 0.997} \approx \frac{-0.6931}{-0.003005} \approx 230 \text{ gates}$$

    **Conclusion:** IBM Heron loses 50% of its computational fidelity after approximately **230 two-qubit gates**. Shor's algorithm on a 2048-bit RSA key requires *billions* of two-qubit gates. Without error correction, the gap is roughly seven orders of magnitude. Noise-free Shor's algorithm on today's hardware is not merely difficult — it is categorically impossible.

!!! tip "Business Implication"
    RSA-2048 encryption is not threatened by near-term quantum computers. Breaking it with Shor's algorithm requires billions of *error-corrected* logical gates. Current physical hardware, without error correction, can execute at most a few hundred useful two-qubit operations before fidelity degrades to noise. The gap is not 10× or 100× — it is millions-fold. Any vendor or media report claiming near-term cryptographic threat from current-generation hardware should be treated with extreme skepticism.

---

## 7.4 The Threshold Theorem — The Most Important Result in Quantum Computing

### 7.4.1 Statement of the Theorem

The threshold theorem, proven independently by Aharonov and Ben-Or (1997), Kitaev (1997), and Knill, Laflamme, and Zurek (1998), establishes:

> *If the physical error rate per gate $p$ is below a critical value $p_{\text{th}}$ — the* ***fault-tolerance threshold*** *— then arbitrarily long quantum computations can be performed with arbitrarily high reliability, using a number of physical qubits and gates that scales only polylogarithmically with the desired computation length.*

This is the most important theoretical result in quantum computing. Before it, the field faced a seemingly insurmountable barrier: any real physical system has noise, and running longer computations only accumulates more errors. The threshold theorem showed that this doom is not inevitable — noise can be beaten *in principle* with sufficient but finite overhead.

The proof works by *concatenating* error-correcting codes. If one level of encoding reduces the error rate from $p$ to $Ap^2$ (for some constant $A$), then two levels reduce it to $A(Ap^2)^2 = A^3 p^4$, and $k$ levels reduce it to:

$$
p_{\text{eff}}^{(k)} = \frac{1}{A}\left(Ap\right)^{2^k}
$$

When $Ap < 1$ (i.e., $p < 1/A = p_{\text{th}}$), this vanishes super-exponentially as $k$ grows. Unlimited accuracy at the cost of polynomial overhead.

### 7.4.2 Key Threshold Values by Code

| Code | Threshold $p_{\text{th}}$ | Physical qubit overhead (per logical) |
|------|--------------------------|---------------------------------------|
| Concatenated 7-qubit Steane | $\sim 10^{-3}$ to $10^{-4}$ | Grows as $7^k$ for $k$ levels |
| Surface code (toric) | $\sim 1\%$ | $\sim 2d^2$ |
| Bivariate bicycle (gross code) | $\sim 0.7\%$ | $\sim 12$ (at $d=12$, 12 logicals) |

The surface code threshold of ~1% is the landmark figure. Current superconducting two-qubit gate error rates of 0.1–0.5% sit **below the surface code threshold** — meaning today's hardware is, in principle, already good enough to support fault-tolerant operation. The challenge is now engineering scale and managing overhead, not the fundamental physics of threshold.

### 7.4.3 Logical Error Rate Formula

For the surface code at distance $d$, the logical error rate per error correction cycle scales as:

$$
\boxed{p_L \approx A \left(\frac{p}{p_{\text{th}}}\right)^{\lfloor(d+1)/2\rfloor}}
$$

where $A \approx 0.1$ is a fitting constant, $p$ is the physical gate error rate, and $p_{\text{th}} \approx 1\%$ for the surface code.

This is a polynomial in $(p/p_{\text{th}})$ with an exponent that grows with code distance. As $d$ increases by 2, the exponent increases by 1, and the logical error rate decreases by another factor of $(p/p_{\text{th}})$. When $p < p_{\text{th}}$, this ratio is less than 1, so logical errors are suppressed *exponentially* in the code distance.

!!! example "Worked Example 7.3 — Logical Error Rate at Distance 7"
    **Given:** Physical error rate $p = 0.001$ (0.1%), threshold $p_{\text{th}} = 0.01$ (1%), distance $d = 7$, prefactor $A = 0.1$.

    **Step 1: Compute the exponent:**

    $$\left\lfloor\frac{d+1}{2}\right\rfloor = \left\lfloor\frac{8}{2}\right\rfloor = 4$$

    **Step 2: Compute the error ratio:**

    $$\frac{p}{p_{\text{th}}} = \frac{0.001}{0.01} = 0.1$$

    **Step 3: Logical error rate per cycle:**

    $$p_L \approx 0.1 \times (0.1)^4 = 0.1 \times 10^{-4} = 10^{-5}$$

    **Interpretation:** The physical error rate of 0.1% is suppressed to a logical error rate of $10^{-3}$% per QEC cycle — a **100-fold improvement** from this single level of encoding. Increasing to $d = 9$ gives:

    $$p_L(d=9) \approx 0.1 \times (0.1)^5 = 10^{-6}$$

    Another 10-fold improvement from increasing distance by just 2. This exponential scaling with distance is the economic engine of fault-tolerant quantum computing.

### 7.4.4 Why This Changes Everything

The threshold theorem transforms the engineering challenge from "build perfect qubits" (physically impossible) to "build qubits below threshold" (demonstrated achievable as of 2024). This conceptual shift is fundamental. Qubits do not need to be perfect; they need to be *good enough* — and "good enough" has a precise, measurable definition: physical error rate below ~1% for the surface code.

The theorem does *not* say fault-tolerant computation is easy or cheap in practice. The overhead is real: achieving a logical error rate of $10^{-15}$ (needed for Shor on RSA-2048) requires hundreds of physical qubits per logical, for thousands of logical qubits. But unlike the pre-threshold regime, the path is finite and calculable.

---

## 7.5 The Overhead Problem — Logical vs. Physical Qubits

### 7.5.1 The Surface Code Overhead

The surface code at distance $d$ corrects $\lfloor(d-1)/2\rfloor$ arbitrary single-qubit errors per correction round. The number of physical qubits required per logical qubit is approximately $2d^2$:

| Distance $d$ | Errors correctable | Physical qubits per logical qubit |
|-------------|-------------------|-----------------------------------|
| 3 | 1 | ~18 |
| 5 | 2 | ~50 |
| 7 | 3 | ~98 |
| 11 | 5 | ~242 |
| 17 | 8 | ~578 |

Google's Willow chip (105 physical qubits) demonstrated a distance-7 surface code — consistent with ~98 physical qubits per logical qubit, supporting roughly one full logical qubit in the surface code geometry.

### 7.5.2 What Shor's Algorithm on RSA-2048 Actually Needs

Breaking RSA-2048 with Shor's algorithm requires approximately 4,000 logical qubits, each maintained at sufficient distance to keep logical error rates below $\sim 10^{-15}$ per gate throughout the entire computation (which requires on the order of $10^{10}$ to $10^{12}$ logical gate operations). With the surface code at $d = 17$:

$$
4{,}000\ \text{logical qubits} \times 578\ \text{physical/logical} \approx 2.3\ \text{million physical qubits}
$$

**Gidney and Ekerå (2021)** calculated that breaking RSA-2048 with Shor's algorithm using surface code error correction would require approximately 20 million noisy physical qubits and 8 hours of runtime at realistic error rates. The largest quantum processors in early 2026 have ~1,000–2,000 physical qubits.

**Gidney (May 2025)** revised this estimate dramatically downward using more efficient algorithmic compilation and the bivariate bicycle (gross) codes: the physical qubit requirement drops to **under 1 million**, and potentially to the hundreds of thousands with further optimization. This is still far beyond current hardware, but the trajectory is now visible and finite.

### 7.5.3 The qLDPC Breakthrough: Gross Code Efficiency

IBM's bivariate bicycle codes, announced formally in 2024 and experimentally pursued through 2025–2026, offer a fundamentally more efficient approach. The $[[144, 12, 12]]$ "gross code" encodes **12 logical qubits** into 144 data qubits (plus 144 ancillae = 288 physical total) at code distance 12, correcting up to 5 errors per correction round.

Compare with surface code at equivalent protection ($d = 12$):
- Surface code: 288 physical qubits for **1** logical qubit (distance 12)
- Gross code: 288 physical qubits for **12** logical qubits (distance 12)

This is a **12× improvement** in encoding efficiency. For RSA-2048, this pushes the physical qubit requirement from millions into the hundreds of thousands — a threshold current roadmaps may approach by 2028–2030.

!!! tip "Business Implication"
    When a quantum hardware vendor announces "1,000 qubits," this counts *physical* qubits. With surface code error correction, 1,000 physical qubits at $d = 7$ supports approximately $1{,}000 / 98 \approx 10$ **logical qubits** — and only at relatively low code distance. With the gross code at $d = 12$, 1,000 physical qubits can support roughly $1{,}000 / 24 \approx 40$ logical qubits. Either way, the computational power is orders of magnitude less than the headline number implies. Always ask vendors: "How many *fault-tolerant logical qubits* does your system support, and at what code distance?" An answer that does not directly address this question should be treated with skepticism.

### 7.5.4 The Qubit Count Gap in Perspective

| Year | Largest processor | Physical qubits | Fault-tolerant logical qubits (est.) |
|------|------------------|-----------------|--------------------------------------|
| 2019 | Google Sycamore | 53 | ~0 |
| 2022 | IBM Osprey | 433 | ~4 (surface, $d=7$) |
| 2024 | IBM Condor | 1,121 | ~11 (surface, $d=7$) |
| 2025 | IBM Heron-based | ~1,000+ | ~45 (gross code, $d=12$) |
| 2026 | IBM Flamingo+ | Planned: 3,000+ | ~125+ (gross code) |
| Needed (RSA-2048) | — | ~100,000–1,000,000 | 4,000 |

The gap between where we are and where we need to be for cryptographically relevant computation is approximately two to three orders of magnitude in physical qubit count — and the error correction engineering (non-local connectivity, real-time decoders) presents additional challenges covered in Chapter 8.

---

!!! abstract "Chapter Summary"

    **Five key takeaways from Chapter 7:**

    1. **Quantum information is fragile by nature.** The relative phase $\phi$ in $\ket{\psi} = \alpha\ket{0} + e^{i\phi}\beta\ket{1}$ encodes information without any macroscopic energy barrier protecting it. A single stray photon or nanotesla magnetic fluctuation can destroy it in microseconds. There is no classical analog to this fragility.

    2. **All single-qubit errors decompose into $\{I, X, Y, Z\}$.** Despite appearing continuous, quantum errors are discretized by syndrome measurement. This is not an approximation — it is exact. The discretization theorem is the mathematical foundation of quantum error correction.

    3. **Hardware platforms trade off differently across four axes.** Coherence time, gate fidelity, gate time, and connectivity all matter. Superconducting qubits offer speed (ns gates); trapped ions offer depth ($T_2$ of seconds); neutral atoms offer reconfigurability. The optimal choice depends on the algorithm.

    4. **The threshold theorem guarantees fault-tolerant computation is achievable.** If physical error rates fall below ~1% (surface code threshold), logical error rates can be suppressed exponentially by increasing code distance. Current hardware — at 0.1–0.5% two-qubit error rates — is already below this threshold. Engineering scale remains the challenge.

    5. **Physical qubit count vastly overstates computational power.** Fault-tolerant logical computation requires 98–578 physical qubits per logical qubit (surface code) or ~24 per logical (gross code). Breaking RSA-2048 requires hundreds of thousands to millions of physical qubits — still two to three orders of magnitude beyond current systems.

---

## References

1. Aharonov, D. & Ben-Or, M. (1997). Fault-tolerant quantum computation with constant error. *Proceedings of the 29th ACM Symposium on Theory of Computing*, 176–188. arXiv:quant-ph/9611025.

2. Kitaev, A. Yu. (1997). Quantum computations: algorithms and error correction. *Russian Mathematical Surveys*, 52(6), 1191–1249.

3. Knill, E., Laflamme, R. & Zurek, W. H. (1998). Resilient quantum computation. *Science*, 279(5349), 342–345.

4. McEwen, M., et al. (Google Quantum AI). (2022). Resolving catastrophic error bursts from cosmic rays in large arrays of superconducting qubits. *Nature Physics*, 18, 107–111.

5. Gidney, C. & Ekerå, M. (2021). How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits. *Quantum*, 5, 433.

6. Gidney, C. (2025). Less than $10^6$ qubits to factor 2048-bit RSA. arXiv:2505.00689.

7. Google Quantum AI. (2024). Quantum error correction below the surface code threshold. *Nature*, 614, 676–681.

8. Bravyi, S., et al. (2024). High-threshold and low-overhead fault-tolerant quantum memory. *Nature*, 627, 778–782.

9. Koch, J., et al. (2007). Charge-insensitive qubit design derived from the Cooper pair box. *Physical Review A*, 76, 042319.

10. Fowler, A. M., et al. (2012). Surface codes: Towards practical large-scale quantum computation. *Physical Review A*, 86, 032324.
