---
title: "Chapter 8 Quiz: Quantum Error Correction — The Surface Code and Beyond"
chapter: 08
quiz_type: chapter
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
questions: 30
---

# Chapter 8 Quiz: Quantum Error Correction — The Surface Code and Beyond

---

## Level 1: Remember (Questions 1–5)

**Question 1.** What is the stabilizer of the three-qubit bit-flip code used to detect errors on qubit 2, and what syndrome (measurement outcome pair) does it produce when qubit 2 has a bit-flip error?

??? success "Answer"
    The three-qubit bit-flip code uses two stabilizer operators:
    - $\hat{S}_1 = Z_1 Z_2$
    - $\hat{S}_2 = Z_2 Z_3$

    When qubit 2 suffers a bit-flip ($X_2$) error:
    - $Z_1 Z_2$ anticommutes with $X_2$ → measurement outcome **$-1$**
    - $Z_2 Z_3$ anticommutes with $X_2$ → measurement outcome **$-1$**

    Syndrome: $(\hat{S}_1, \hat{S}_2) = (-1, -1)$ → unambiguously identifies qubit 2 as the error location.

---

**Question 2.** What are the two types of ancilla qubits in the surface code, and what error types does each one detect?

??? success "Answer"
    The surface code uses two types of ancilla (syndrome-extraction) qubits:

    1. **X-type ancilla qubits** (also called "X stabilizers" or "plaquette" operators): measure the product $X_1 X_2 X_3 X_4$ on their neighboring data qubits. They detect **Z-type (phase-flip) errors** on data qubits, because $Z$ anticommutes with $X$.

    2. **Z-type ancilla qubits** (also called "Z stabilizers" or "vertex" operators): measure the product $Z_1 Z_2 Z_3 Z_4$ on their neighboring data qubits. They detect **X-type (bit-flip) errors** on data qubits, because $X$ anticommutes with $Z$.

    Note: Y errors ($Y = iXZ$) anticommute with both X and Z stabilizers, so they excite both types simultaneously — Y errors are detectable as well.

---

**Question 3.** State the $\Lambda$ (lambda) parameter in the context of the surface code. What value of $\Lambda$ was experimentally measured by Google Willow, and why was $\Lambda > 1$ considered a landmark result?

??? success "Answer"
    **Definition:** $\Lambda$ is the factor by which the logical error rate decreases when the code distance increases by 2:

    $$\Lambda = \frac{p_L(d)}{p_L(d+2)}$$

    A value $\Lambda > 1$ means the code is genuinely suppressing errors: going from distance $d$ to $d+2$ reduces logical errors.

    **Google Willow measured $\Lambda = 2.14 \pm 0.02$** across $d = 3, 5, 7$ surface codes (December 2024).

    **Why $\Lambda > 1$ was a landmark:** Before Willow, experimental systems had approached but not reliably exceeded $\Lambda = 1$. $\Lambda < 1$ means adding more physical qubits (increasing $d$) *worsens* the logical error rate — the overhead is counterproductive. $\Lambda > 1$ is the experimental confirmation that the hardware is genuinely operating below the fault-tolerance threshold and that the surface code's exponential error suppression actually works in hardware. It validated the entire theoretical framework of fault-tolerant quantum computing.

---

**Question 4.** What is the Shor $[[9,1,3]]$ code, and what fundamental advance did it represent?

??? success "Answer"
    The Shor $[[9,1,3]]$ code is a quantum error-correcting code that:
    - Uses **9 physical qubits** (the first number)
    - Encodes **1 logical qubit** (the second number)
    - Has **code distance 3** — can correct any single-qubit error (the third number)

    It is constructed by concatenating the 3-qubit phase-flip code (outer code) with the 3-qubit bit-flip code (inner code): first apply phase-flip protection to 3 qubits, then bit-flip protect each of those 3 qubits with 3 physical qubits each, yielding 9 total.

    **Fundamental advance (1995):** The Shor code was the first proof that a quantum error-correcting code can correct *any* single-qubit error — not just bit flips or phase flips separately, but any combination of $X$, $Y$, $Z$, or continuous rotations. It demonstrated that the discretization theorem was not just theoretical but implementable, establishing that quantum error correction was possible in principle.

---

**Question 5.** What is magic state distillation, and why is it needed for universal fault-tolerant quantum computation?

??? success "Answer"
    **Magic state distillation** is a procedure that takes many imperfect (noisy) copies of a "magic state" $\ket{T} = T\ket{+}$ and produces a single higher-fidelity copy, consuming the noisy copies in the process.

    **Why it is needed:** The Clifford group $\{H, S, \text{CNOT}\}$ alone is not computationally universal — Clifford circuits can be efficiently simulated on a classical computer (Gottesman–Knill theorem). Universal quantum computation requires at least one non-Clifford gate. The standard choice is the T gate.

    For all practically useful quantum codes (surface codes, bivariate bicycle codes), the T gate cannot be implemented fault-tolerantly by direct transversal action on the code — it would violate the stabilizer structure. Magic state injection teleports the action of T using a high-fidelity $\ket{T}$ state plus only Clifford operations (which are fault-tolerant).

    Since the $\ket{T}$ states cannot be prepared fault-tolerantly from scratch, they must be distilled from many noisy copies. The distillation circuit itself uses only Clifford gates, which are fault-tolerant — so the whole procedure is self-consistent.

---

## Level 2: Understand (Questions 6–10)

**Question 6.** Explain why the no-cloning theorem does not prevent quantum error correction. Be precise about what information is and is not being copied or measured.

??? success "Answer"
    The no-cloning theorem states: there is no physical operation that copies an *unknown* quantum state $\ket{\psi}$ to produce $\ket{\psi}\ket{\psi}$ from $\ket{\psi}\ket{0}$.

    Quantum error correction does NOT violate this because:

    1. **Encoding is not cloning.** Encoding $\alpha\ket{0} + \beta\ket{1}$ into $\alpha\ket{000} + \beta\ket{111}$ is not copying — it creates an entangled state where the logical information is distributed across three qubits. The individual qubits are not copies; they are in a joint entangled state.

    2. **Syndrome measurement does not measure the encoded state.** The syndrome operators $Z_1Z_2$ and $Z_2Z_3$ are designed to commute with the logical operators $\bar{X}$ and $\bar{Z}$. Measuring them yields information about the *error* (which qubit flipped) but zero information about $\alpha$ and $\beta$. This is verifiable: the syndrome measurement outcomes are identical regardless of whether the encoded state is $\ket{000}$ or $\ket{111}$ or any superposition.

    3. **Correction is a targeted Pauli, not a state measurement.** Applying $X_2$ to correct qubit 2 is a unitary operation targeting a known location — it requires no knowledge of $\alpha$ or $\beta$.

    The key insight: QEC exploits the structure of the code space to separate the "error sector" (which stabilizers detect) from the "logical sector" (which they leave invariant). These are orthogonal degrees of freedom. Measuring one does not disturb the other.

---

**Question 7.** Explain what a "hook error" is in the context of surface code stabilizer circuits. Why does the ordering of CNOT gates in the stabilizer circuit matter?

??? success "Answer"
    A **hook error** is a correlated two-qubit error that arises from a single fault (a single gate error) in the stabilizer extraction circuit, but whose effect on the data qubits looks like two separate data qubit errors.

    **Why the CNOT ordering matters:** Consider a Z-type stabilizer that entangles ancilla $a$ with data qubits $d_1, d_2, d_3, d_4$ in sequence. If qubit $a$ suffers a $Z$ error between the CNOT on $d_2$ and the CNOT on $d_3$, the error has already been "passed" to $d_1$ and $d_2$ (through the completed CNOTs) but NOT to $d_3$ and $d_4$. The result is that data qubits $d_1$ and $d_2$ both acquire a correlated error from a single fault on the ancilla.

    If $d_1$ and $d_2$ are two qubits on the *same side* of a logical boundary in the surface code, this correlated pair can create a logical error (a chain crossing the logical boundary) from a single physical fault — exactly what the distance-$d$ code is supposed to prevent.

    **Prevention:** The CNOT ordering in surface code stabilizer circuits is specifically chosen so that hook errors create correlated pairs of data qubit errors that are "detected" by other stabilizers — effectively turning hook errors into detectable events rather than logical errors. This requires careful circuit optimization and is one reason the surface code stabilizer circuit is not arbitrary.

---

**Question 8.** Explain in words what the minimum-weight perfect matching (MWPM) decoder does and why it is the natural choice for the surface code.

??? success "Answer"
    **What MWPM does:**

    After syndrome extraction, the decoder receives a set of *violated stabilizers* — stabilizers that returned $-1$ instead of $+1$. In the surface code, errors create *pairs* of violated stabilizers (one at each end of an error chain). The decoder's task is to infer which physical qubit errors caused the observed violation pattern.

    MWPM models the syndrome defects as vertices in a graph. Each pair of defects is connected by an edge whose weight equals the most likely error chain connecting them (typically the Manhattan distance between the violated stabilizers). MWPM finds the **perfect matching** — the pairing of all defects into pairs — that minimizes the total weight (most probable overall error pattern). The matched pairs define which chains of Pauli corrections to apply.

    **Why MWPM is natural for the surface code:**

    1. *Errors create pairs of defects.* Single-qubit errors excite exactly two neighboring stabilizers, so defects always come in pairs — exactly the structure MWPM is designed to match.

    2. *Independent error model.* Under depolarizing noise, each qubit error is independent, making "minimum weight" equivalent to "most likely." MWPM finds the maximum likelihood correction under this model.

    3. *Efficient.* MWPM runs in $O(n^3)$ or near-linear with modern approximations, fast enough for real-time classical decoding within the 1 μs QEC cycle time budget.

    For more complex noise models (correlated errors, leakage), MWPM is suboptimal but remains the practical baseline. More sophisticated decoders (belief propagation, neural networks) improve on MWPM at higher computational cost.

---

**Question 9.** Why does the surface code require multiple rounds of syndrome measurement before decoding, rather than decoding after each single round?

??? success "Answer"
    The ancilla qubits used for syndrome extraction are themselves imperfect — they can suffer measurement errors, producing incorrect $+1$ or $-1$ readouts even when no data qubit error has occurred.

    If we decoded after a single syndrome measurement round, a measurement error on one ancilla would look identical to a data qubit error in that ancilla's neighborhood — we could not distinguish between "data qubit $d$ has a bit-flip error" and "ancilla $a$ gave a faulty readout."

    **By repeating syndrome measurements $d$ times (for a distance-$d$ code):**

    - A genuine data qubit error appears consistently in the same stabilizer across multiple rounds
    - A transient measurement error appears as a violation in one round but not adjacent rounds
    - The decoder operates in 2+1 dimensions (spatial position × time), treating repeated measurement rounds as a 3D syndrome history
    - In this 3D picture, data qubit errors are "spatial" chains (constant in time), while measurement errors are "temporal" chains (persist only one time step)
    - MWPM can distinguish these cases and correctly identify both types of errors

    Without multiple rounds, even a perfect decoder operating on a single noisy syndrome could not achieve threshold performance — measurement errors would be indistinguishable from data errors and would add an irreducible logical error floor.

---

**Question 10.** Compare the encoding rates of the surface code and the $[[144,12,12]]$ gross code. What fundamental property of qLDPC codes enables this difference?

??? success "Answer"
    **Surface code encoding rate:**

    A distance-$d$ surface code encodes 1 logical qubit in $\sim 2d^2$ physical qubits.

    $$\text{Rate}_{\text{SC}} = \frac{k}{n} = \frac{1}{2d^2}$$

    At $d = 12$: Rate = $1/288 \approx 0.35\%$. As $d \to \infty$, Rate $\to 0$.

    **Gross code encoding rate:**

    The $[[144, 12, 12]]$ gross code encodes 12 logical qubits in 144 data qubits:

    $$\text{Rate}_{\text{GC}} = \frac{12}{144} \approx 8.3\%$$

    This rate is *constant* — it does not decrease as the code is scaled up. Larger BB codes maintain $k/n \approx 1/12$ regardless of distance.

    **What enables this:** qLDPC codes have *constant-weight* stabilizers (each stabilizer involves a fixed number $w$ of qubits, independent of code size) and *constant-degree* connectivity (each qubit participates in a fixed number $c$ of stabilizers). The Bravyi–Freedman–Hastings result shows that on 2D surfaces, constant-rate codes are impossible — you need the ability to connect qubits non-locally (across the chip or between chips). qLDPC codes require non-nearest-neighbor connections, which is their engineering cost but also the source of their much better encoding efficiency.

---

## Level 3: Apply (Questions 11–15)

**Question 11.** The surface code at $d = 5$ has a physical error rate $p = 0.5\%$. Using $p_L \approx A(p/p_{\text{th}})^{\lfloor(d+1)/2\rfloor}$ with $A = 0.1$, $p_{\text{th}} = 1\%$, and $\Lambda = p_{\text{th}}/p$, calculate (a) the logical error rate per cycle, and (b) the logical error rate per cycle at $d = 7$. Then verify that the ratio matches $\Lambda$.

??? success "Answer"
    **Given:** $p = 0.005$, $p_{\text{th}} = 0.01$, $A = 0.1$.

    Ratio: $p/p_{\text{th}} = 0.5$.

    **(a) At $d = 5$:**

    $$\text{Exponent} = \left\lfloor\frac{5+1}{2}\right\rfloor = 3$$

    $$p_L(d=5) = 0.1 \times (0.5)^3 = 0.1 \times 0.125 = 0.0125$$

    **(b) At $d = 7$:**

    $$\text{Exponent} = \left\lfloor\frac{7+1}{2}\right\rfloor = 4$$

    $$p_L(d=7) = 0.1 \times (0.5)^4 = 0.1 \times 0.0625 = 6.25 \times 10^{-3}$$

    **Verification of $\Lambda$:**

    $$\Lambda = \frac{p_L(d=5)}{p_L(d=7)} = \frac{0.0125}{6.25 \times 10^{-3}} = 2.0$$

    Predicted $\Lambda = p_{\text{th}}/p = 0.01/0.005 = 2.0$ ✓

    The ratio matches exactly: each two-unit increase in distance multiplies the logical error rate by $p/p_{\text{th}} = 0.5$ (i.e., divides it by $\Lambda = 2$).

---

**Question 12.** A surface code at distance $d = 7$ achieves a QEC cycle time of 1.2 μs. A target quantum algorithm requires 10,000 fault-tolerant logical Clifford gate operations and $p_L < 10^{-5}$ per logical gate (so that the total algorithm fails with probability < 1%). How many syndrome measurement rounds per logical gate cycle are needed, and what is the total runtime?

??? success "Answer"
    **Syndrome rounds per logical gate cycle:**

    For a distance-$d$ code, standard practice requires $d$ syndrome measurement rounds per logical gate cycle to reliably distinguish data qubit errors from measurement errors.

    At $d = 7$: **7 syndrome rounds per logical gate cycle**.

    **Time per logical gate cycle:**

    $$t_{\text{gate}} = 7 \times 1.2\ \mu\text{s} = 8.4\ \mu\text{s}$$

    **Total runtime for 10,000 logical gates:**

    $$t_{\text{total}} = 10{,}000 \times 8.4\ \mu\text{s} = 8.4 \times 10^7\ \mu\text{s} = 84\ \text{s} \approx 1.4 \text{ minutes}$$

    **Checking fidelity:** With $p_L < 10^{-5}$ per gate:

    $$F_{\text{algo}} = (1 - 10^{-5})^{10{,}000} \approx e^{-0.1} \approx 0.905$$

    Total algorithm success probability is ~90.5%, which meets the "fails with probability < 10%" criterion.

---

**Question 13.** The $[[144, 12, 12]]$ gross code encodes 12 logical qubits in 288 total physical qubits (144 data + 144 ancilla). A quantum algorithm requires 50 logical qubits at code distance 12. Calculate (a) the number of gross code blocks required, (b) the total physical qubits needed, and (c) how this compares to using the surface code at $d = 12$.

??? success "Answer"
    **(a) Gross code blocks required:**

    Each block encodes 12 logical qubits. For 50 logical qubits:

    $$\text{Blocks} = \lceil 50/12 \rceil = \lceil 4.17 \rceil = 5 \text{ blocks}$$

    (5 blocks encode $5 \times 12 = 60$ logical qubits; 10 are spare or reserved for ancilla computations.)

    **(b) Total physical qubits (gross code):**

    $$N_{\text{phys, GC}} = 5 \times 288 = 1{,}440 \text{ physical qubits}$$

    **(c) Surface code at $d = 12$ for 50 logical qubits:**

    Physical qubits per logical qubit (data + ancilla): $\approx 2 \times 12^2 + 2 \times 12^2 = 576$.

    $$N_{\text{phys, SC}} = 50 \times 576 = 28{,}800 \text{ physical qubits}$$

    **Improvement ratio:**

    $$\frac{28{,}800}{1{,}440} = 20\times$$

    The gross code requires **20× fewer physical qubits** than the surface code for the same logical qubit count and code distance. This 20× factor (vs. the theoretical 24× — the difference arises because the 5th block has spare logical qubits) illustrates the practical efficiency gain.

---

**Question 14.** In the surface code, a specific syndrome pattern shows 4 violated stabilizers at positions $(2,3)$, $(2,5)$, $(6,3)$, and $(6,5)$ on the lattice (coordinates given as row, column). The MWPM decoder must pair them into 2 pairs. Identify the two possible pairings and their Manhattan distances. Which pairing does MWPM select, and what does this imply about the most likely error?

??? success "Answer"
    **Three possible pairings** of 4 defects into 2 pairs:

    Label defects: $A=(2,3)$, $B=(2,5)$, $C=(6,3)$, $D=(6,5)$.

    **Pairing 1: (A,B) + (C,D)**
    - $d(A,B) = |2-2| + |3-5| = 0 + 2 = 2$
    - $d(C,D) = |6-6| + |3-5| = 0 + 2 = 2$
    - Total weight: $2 + 2 = 4$

    **Pairing 2: (A,C) + (B,D)**
    - $d(A,C) = |2-6| + |3-3| = 4 + 0 = 4$
    - $d(B,D) = |2-6| + |5-5| = 4 + 0 = 4$
    - Total weight: $4 + 4 = 8$

    **Pairing 3: (A,D) + (B,C)**
    - $d(A,D) = |2-6| + |3-5| = 4 + 2 = 6$
    - $d(B,C) = |2-6| + |5-3| = 4 + 2 = 6$
    - Total weight: $6 + 6 = 12$

    **MWPM selects Pairing 1** (minimum total weight = 4).

    **Implication:** The most likely error scenario is two independent short horizontal error chains — one connecting qubits between columns 3 and 5 at row 2–3, and another connecting qubits between columns 3 and 5 at row 6. The decoder applies corrections along these two horizontal chains, consistent with two separate single-qubit errors near the indicated positions.

---

**Question 15.** A 15-to-1 magic state distillation factory takes 15 noisy $\ket{T}$ states with individual infidelity $\epsilon = 0.01$ (1% error probability each) and produces 1 output with infidelity $\approx 35\epsilon^3$. (a) What is the output infidelity after one round of distillation? (b) How many rounds are needed to reach output infidelity below $10^{-15}$?

??? success "Answer"
    **15-to-1 protocol output infidelity formula:** $\epsilon_{\text{out}} \approx 35\epsilon_{\text{in}}^3$

    **(a) After one round:**

    $$\epsilon_1 = 35 \times (0.01)^3 = 35 \times 10^{-6} = 3.5 \times 10^{-5}$$

    Starting at 1% error, one round of distillation improves to $3.5 \times 10^{-3}$% — a 286× improvement.

    **(b) Number of rounds to reach $\epsilon < 10^{-15}$:**

    **After round 2** (using $\epsilon_1$ as input):

    $$\epsilon_2 = 35 \times (3.5 \times 10^{-5})^3 = 35 \times 4.3 \times 10^{-14} = 1.5 \times 10^{-12}$$

    **After round 3:**

    $$\epsilon_3 = 35 \times (1.5 \times 10^{-12})^3 = 35 \times 3.4 \times 10^{-36} = 1.2 \times 10^{-34}$$

    After round 3, $\epsilon_3 \approx 10^{-34} \ll 10^{-15}$.

    After round 2, $\epsilon_2 \approx 10^{-12} > 10^{-15}$.

    **Three rounds of distillation** are sufficient to reach below $10^{-15}$ starting from 1% infidelity.

    **Resource cost:** Each round consumes 15 copies to produce 1. Three rounds require $15^3 = 3{,}375$ noisy copies to produce one output $\ket{T}$ state at $\epsilon < 10^{-15}$. At the scale of Shor's algorithm ($\sim 10^{10}$ T gates), this implies $\sim 3.4 \times 10^{13}$ noisy magic state preparations — motivating the engineering priority of higher-rate distillation protocols.

---

## Level 4: Analyze (Questions 16–20)

**Question 16.** Compare and contrast the syndrome structure of the 3-qubit bit-flip code and the surface code. What does each code's syndrome reveal, and what does it deliberately conceal?

??? success "Answer"
    **3-qubit bit-flip code:**

    *Syndrome structure:* Two binary measurements ($Z_1Z_2$, $Z_2Z_3$) produce a 2-bit syndrome. Each of the 4 possible syndrome values maps to a unique error: no error, qubit 1 flip, qubit 2 flip, qubit 3 flip.

    *Reveals:* Which of the three data qubits had a bit-flip error (if any).
    *Conceals:* The logical state $(\alpha, \beta)$ — syndrome is identical regardless of whether $\ket{\psi} = \alpha\ket{000}+\beta\ket{111}$ has $\alpha = 1, \beta = 0$ or $\alpha = \beta = 1/\sqrt{2}$.
    *Limitation:* Only detects $X$ errors; $Z$ errors are invisible to $Z_iZ_j$ stabilizers (they commute).

    **Surface code at distance $d$:**

    *Syndrome structure:* $\sim (d-1)^2$ X-type stabilizers and $\sim (d-1)^2$ Z-type stabilizers, each producing one binary outcome. Total syndrome is a $(d^2 - 1)$-bit binary string.

    *Reveals:* The *endpoints* of error chains (violated stabilizer positions), but NOT the interior of the chain (which is invisible).
    *Conceals:* (1) The encoded logical state — logical operators commute with all stabilizers; (2) The path of the error chain between its endpoints — only endpoints are detected, leaving the decoder to infer the most likely path.

    **Key contrast:** The 3-qubit code has a syndrome that unambiguously identifies the exact error; the surface code has a syndrome that identifies *endpoints* of error chains, requiring probabilistic decoding to determine the actual error pattern. This ambiguity is the tradeoff for the surface code's much higher correction capacity.

---

**Question 17.** Analyze the engineering tradeoffs between the surface code and the $[[144,12,12]]$ gross code across five dimensions: overhead efficiency, connectivity requirements, decoder complexity, scalability, and current experimental readiness. Which code is better suited for a 2027 deployment and which for a 2032 deployment?

??? success "Answer"
    **Five-dimension comparison:**

    **1. Overhead efficiency:**
    - Surface code: ~576 physical qubits per logical qubit ($d=12$); encoding rate 0.17%
    - Gross code: ~24 physical qubits per logical qubit; encoding rate 8.3%
    - **Winner:** Gross code by 24×

    **2. Connectivity requirements:**
    - Surface code: nearest-neighbor only; directly compatible with current planar chip fabrication
    - Gross code: requires connections between qubits ~20 positions apart; needs c-couplers (demonstrated 2025) and eventually l-couplers (projected 2027)
    - **Winner:** Surface code today; gross code approaching parity by 2027

    **3. Decoder complexity:**
    - Surface code: MWPM decoder, well-characterized, runs in O(n³) or near-linear; 1 μs achievable with current FPGAs
    - Gross code: Belief propagation + OSD decoders, more complex syndrome patterns; IBM's June 2025 FPGA achieves real-time decoding but required 10× speedup development effort
    - **Winner:** Surface code today; gross code decoder maturing rapidly

    **4. Scalability:**
    - Surface code: Scales by adding more nearest-neighbor qubits; straightforward chip manufacturing
    - Gross code: Scaling requires maintaining non-local connectivity across larger chips; chip-to-chip links add latency and new noise sources
    - **Winner:** Surface code for near-term scale; gross code more efficient at large scale

    **5. Experimental readiness:**
    - Surface code: Demonstrated with $\Lambda > 1$ on Google Willow (2024) and Zuchongzhi 3.2 (2025); mature toolchain
    - Gross code: c-couplers demonstrated on IBM Loon (2025); full gross code operation not yet demonstrated end-to-end
    - **Winner:** Surface code clearly

    **2027 deployment:** Surface code — demonstrated, full toolchain available, no new hardware components needed.
    **2032 deployment:** Gross code — by then, c-couplers and l-couplers will be mature, decoders optimized, and the 24× efficiency advantage makes it the economically dominant choice for anything approaching RSA-scale computation.

---

**Question 18.** The Google Willow experiment measured $\Lambda = 2.14$, while the theoretical prediction for a perfect surface code at $p = 0.2\%$ and $p_{\text{th}} = 1\%$ is $\Lambda \approx p_{\text{th}}/p = 5$. Analyze the possible sources of the gap between $\Lambda_{\text{theory}} = 5$ and $\Lambda_{\text{measured}} = 2.14$.

??? success "Answer"
    The gap $\Lambda_{\text{measured}} / \Lambda_{\text{theory}} = 2.14/5 = 0.43$ (measured is 57% below theoretical maximum). Several factors contribute:

    **1. Sub-optimal decoder ($\sim 1.5$–$2\times$ contribution):**
    MWPM with a simplified noise model does not achieve the true maximum likelihood decoding for the actual Willow noise model (which includes spatially correlated errors, leakage, and measurement errors). A Bayesian maximum likelihood decoder with the exact Willow noise model would extract more information from the syndrome and achieve higher $\Lambda$. This is typically the largest single gap factor.

    **2. Non-independent noise ($\sim 1.3$–$1.5\times$ contribution):**
    The formula $\Lambda = p_{\text{th}}/p$ assumes independent depolarizing noise. Willow has: (a) residual ZZ crosstalk creating correlated phase errors between neighbors; (b) cosmic ray burst errors creating spatially correlated multi-qubit events; (c) TLS-induced temporal correlations (a TLS defect can affect many sequential gates). Correlated errors reduce the effective $\Lambda$ because they are harder to decode correctly.

    **3. Effective threshold is lower than 1% ($\sim 1.2\times$ contribution):**
    The report estimates Willow's effective $p_{\text{th}} \approx 0.7\%$, not 1%. With $p/p_{\text{th}} = 0.2\%/0.7\% = 0.286$, the theoretical $\Lambda = 1/0.286 = 3.5$ — closer to 2.14. The lower effective threshold reflects that the actual noise model is more challenging than the idealized depolarizing model.

    **4. Leakage ($\sim 1.1$–$1.2\times$ contribution):**
    Leakage to $\ket{2}$ states corrupts stabilizer measurements in ways the standard decoder cannot handle. Even with LRUs, residual leakage reduces effective fidelity.

    **Overall:** These factors compound multiplicatively: $3.5 \times 0.6 \approx 2.1$, consistent with the measured value. Improving the decoder to better handle correlated noise and leakage is the most direct path to pushing $\Lambda$ toward the theoretical maximum.

---

**Question 19.** Analyze the role of the Pauli frame in fault-tolerant quantum computing. Why is it preferable to real-time qubit correction, and what are its limitations?

??? success "Answer"
    **The Pauli frame** is a classical register that tracks the *cumulative effect* of all Pauli corrections inferred by the decoder, without physically applying those corrections to the qubits.

    **Why it is preferable to real-time correction:**

    1. **Speed.** Physically applying a correction ($X$ or $Z$ gate) to a data qubit takes 10–50 ns, consumes the qubit from other operations, and itself introduces gate error. Classical bit-flip operations (updating the Pauli frame) take <1 ns and are error-free. The entire QEC cycle is 1 μs; pausing for physical corrections would extend this significantly.

    2. **Clifford propagation.** Pauli operators commute through Clifford gates in a trackable way: $XCNOT = CNOTXZ$ (a Z propagates through a CNOT target, etc.). Since fault-tolerant Clifford gates are the bulk of any quantum algorithm, the decoder can simply update the classical Pauli frame register as each logical gate is tracked, without needing the qubits to be in the "corrected" state at every step.

    3. **No error accumulation.** Applying a correction gate introduces a small probability of additional error. Deferring all corrections to the final measurement avoids accumulating these correction errors.

    **Limitations:**

    1. **Non-Clifford gates require physical state preparation.** Magic state injection (for T gates) requires the logical qubit to actually be in a specific state when the injection circuit runs. The Pauli frame must be "settled" before injection, requiring actual corrections to be applied at T-gate boundaries.

    2. **Measurement in a basis that depends on Pauli frame.** When reading out a logical qubit, the measurement basis depends on accumulated Pauli corrections. With a large Pauli frame, the readout interpretation becomes complex.

    3. **No protection against logical errors.** The Pauli frame tracks corrections but cannot prevent a logical error from occurring — it only applies the *intended* correction. If the decoder makes a wrong inference (e.g., due to threshold violation), the Pauli frame applies the wrong correction, introducing a logical error that is invisible to the system.

---

**Question 20.** Google Willow demonstrated $\Lambda = 2.14$ at distances $d = 3, 5, 7$. A skeptic argues: "Willow only went to distance 7. At distance 15 or 17, the noise model might change and $\Lambda$ could collapse below 1." Analyze the validity and limits of this argument.

??? success "Answer"
    **The skeptic's argument has partial validity but is ultimately weak:**

    **Where the argument has merit:**

    1. *Bootstrapping required.* Willow's $\Lambda$ was measured only up to $d=7$. For fault-tolerant Shor's algorithm, distances $d=17$–$21$ are needed. It is logically possible that new noise mechanisms become relevant at larger scales (e.g., crosstalk from more neighbors, different TLS density at scale, more frequent cosmic ray events affecting larger code footprints).

    2. *Engineering challenges increase with scale.* At $d=17$ on current architecture, the surface code would require a ~$36 \times 36$ qubit grid — much larger than Willow's 105 qubits. Maintaining uniform qubit quality across larger chips is historically difficult; outlier qubits with higher error rates can dominate logical error rates.

    **Where the argument is weak:**

    1. *Physical noise sources are local.* The noise mechanisms measured in Willow (dielectric loss, ZZ coupling, quasiparticle poisoning) are fundamentally local. They scale with the number of qubits (proportionally), not super-linearly. There is no physical reason why noise sources would suddenly worsen at $d=17$ unless new hardware is introduced.

    2. *Zuchongzhi 3.2 independent confirmation.* A different team using different hardware confirmed $\Lambda > 1$, making the result more robust. If both independent implementations show $\Lambda > 1$, the result is unlikely to be an artifact of Willow's specific hardware.

    3. *The threshold theorem provides theoretical backing.* The threshold theorem guarantees that below-threshold operation should be maintained at arbitrary $d$ (for the idealized noise model). The question is how closely the physical hardware approximates the assumed model — not whether the theorem could suddenly fail at large $d$.

    **Balanced assessment:** The skeptic correctly identifies that extrapolation beyond measured distances carries uncertainty. But the physical mechanisms are understood, the extrapolation is theoretically justified, and independent experimental confirmation exists. The argument is legitimate scientific caution, not a compelling objection to the Willow result.

---

## Level 5: Evaluate (Questions 21–25)

**Question 21.** Evaluate this claim: "The Google Willow result ($\Lambda = 2.14$) proves that fault-tolerant quantum computing is solved. The remaining work is just engineering scale."

??? success "Answer"
    **Evaluation: The claim significantly overstates what Willow demonstrated, while containing a kernel of truth.**

    **What Willow did prove:**
    - That a physical quantum processor can be operated below the surface code fault-tolerance threshold ($\Lambda > 1$)
    - That the exponential error suppression predicted by the threshold theorem actually works in hardware
    - That the gap between theory and experiment for surface code QEC has been demonstrably closed at small scale
    - This is genuinely a landmark result — the conceptual proof of principle that fault-tolerant QEC works in practice

    **What Willow did NOT prove:**
    1. **Logical computation, not just memory.** Willow demonstrated error-corrected quantum *memory* — storing a logical qubit and running stabilizer cycles. It did not demonstrate fault-tolerant *computation* (executing logical gates on encoded qubits while maintaining below-threshold error rates).
    2. **Insufficient scale.** $\Lambda = 2.14$ at $d = 7$ is below the theoretical maximum of ~5–10. Achieving the $p_L \sim 10^{-15}$ needed for RSA-2048 at $\Lambda = 2.14$ would require $d \approx 50$–60, implying ~5,000–7,200 physical qubits per logical qubit — worse than the surface code at ideal parameters.
    3. **Major unsolved engineering challenges remain.** Magic state distillation at scale is undemonstrated. Logical gate compilation on QEC-encoded qubits is immature. Non-local connectivity for qLDPC codes is partially demonstrated but not production-ready. Classical real-time decoding at full scale is at the edge of current capabilities.
    4. **"Just engineering scale" understates the difficulty.** Building 100,000–1,000,000 high-fidelity qubits with non-local connectivity, real-time classical decoding, cryogenic packaging, and calibration infrastructure represents many billions of dollars and a decade or more of engineering work.

    **Verdict:** Willow represents a necessary milestone, not a sufficient one. The claim should be restated as: "Willow proved that fault-tolerant quantum computing is *physically possible* with existing hardware. The remaining work is engineering scale, logical gate protocols, and decoder infrastructure — which is substantial but in principle tractable."

---

**Question 22.** Evaluate whether the IBM gross code $[[144, 12, 12]]$ is ready for practical deployment in 2026, considering both technical and systems-level factors.

??? success "Answer"
    **Technical readiness assessment:**

    **Arguments for readiness:**
    - Theory is mature: bivariate bicycle codes are fully analyzed (Bravyi et al. 2024)
    - Encoding efficiency proven: 24× better than surface code at equivalent distance
    - IBM Loon (2025) demonstrated functioning c-couplers enabling non-local connectivity
    - IBM June 2025 FPGA decoder achieves real-time syndrome decoding within 1 μs

    **Arguments against immediate practical deployment:**
    1. *End-to-end demonstration missing.* As of early 2026, no experiment has demonstrated the full gross code operating with $\Lambda > 1$. The individual components (c-couplers, decoder, stabilizer circuits) have been demonstrated separately but not fully integrated.
    2. *Connectivity incomplete.* The gross code requires connections across multiple qubit distances on chip. While c-couplers have been demonstrated, their yield (fraction of functional couplers after fabrication), stability, and contribution to noise have not been characterized at production scale.
    3. *Logical gate protocols immature.* The LPU (Logical Processing Unit) architecture for logical gates on BB codes was introduced in June 2025 papers. It has not been experimentally validated; lattice surgery protocols for BB codes are more complex than for the surface code and lack the years of experimental refinement that surface code lattice surgery has.
    4. *Calibration and drift.* Long-range connections require more complex cross-chip calibration. Frequency drift, coupler calibration, and cross-resonance errors at scale have not been fully characterized.

    **Systems-level factors:**
    - No complete software stack (compiler, optimizer, noise model) exists for gross code computation
    - Existing quantum cloud APIs do not support gross code logical qubit programming

    **Verdict:** The gross code is not ready for practical deployment in 2026. It is ready for *research demonstrations* — specifically, demonstrating $\Lambda > 1$ for the full gross code, characterizing c-coupler noise, and validating one or two logical gate operations. Full practical deployment is more likely in the 2028–2029 timeframe, consistent with IBM's published roadmap.

---

**Question 23.** The Zuchongzhi 3.2 team measured $\Lambda = 1.4$ at distance 7, compared to Google Willow's $\Lambda = 2.14$. Evaluate what conclusions can and cannot be drawn from this comparison between the two results.

??? success "Answer"
    **What CAN be concluded:**

    1. *Both teams achieved below-threshold operation.* $\Lambda > 1$ for both. This is the important shared conclusion — it establishes robustness of the result across independent hardware and teams.

    2. *The Willow hardware has better effective surface code performance.* $\Lambda = 2.14$ vs. $\Lambda = 1.4$ means Willow is further below threshold (or has a better decoder, or both). At practical code distances needed for useful computation, Willow would achieve lower logical error rates per physical qubit.

    3. *Different noise models.* The gap in $\Lambda$ suggests different dominant noise sources or different decoder efficiencies. Zuchongzhi's all-microwave leakage suppression architecture trades off differently on the noise landscape than Willow's leakage reduction units.

    **What CANNOT be concluded:**

    1. *Technology superiority in general.* $\Lambda$ is one metric for one code (surface code) at one set of distances. Zuchongzhi may outperform Willow on other metrics (connectivity, qubit count, specific gate fidelities, or future code types).

    2. *$\Lambda = 1.4$ is "worse."* Both are proof-of-principle demonstrations. The practical difference between $\Lambda = 1.4$ and $\Lambda = 2.14$ for demonstrations at $d = 7$ is modest; both show the code works. $\Lambda = 1.4$ means slightly more physical qubit overhead per logical qubit, but does not affect the qualitative conclusion.

    3. *Long-term trajectory.* Zuchongzhi's novel leakage suppression architecture may prove more scalable or may achieve higher $\Lambda$ at larger distances. A single data point from each team is insufficient to project trajectories.

    **Bottom line:** Both results confirm the surface code threshold has been crossed. The numerical difference in $\Lambda$ reflects hardware engineering choices, not a fundamental asymmetry. Independent confirmation by a second team is scientifically more valuable than the specific $\Lambda$ difference.

---

**Question 24.** Evaluate the following engineering design decision: "For our fault-tolerant quantum computer targeting quantum chemistry applications (requiring ~500 logical qubits and $10^9$ logical gates), we will use the surface code because it is more mature than qLDPC codes, even though it requires 20× more physical qubits."

??? success "Answer"
    **Evaluation: This decision is defensible for a 2027–2028 deployment but suboptimal for a 2030+ system.**

    **Arguments supporting the surface code choice:**

    1. *Maturity advantage is real.* Surface code has demonstrated $\Lambda > 1$ (Willow 2024, Zuchongzhi 2025), a complete software stack (Qiskit, lattice surgery compilers), experimentally validated logical gate protocols, and multi-year MWPM decoder optimization. For a 2027 deployment, the surface code risk is well-characterized.

    2. *20× overhead is bearable at 500 qubits.* Surface code at $d = 12$ for 500 logical qubits requires $500 \times 576 = 288{,}000$ physical qubits. This is beyond current hardware but potentially reachable by 2028–2030 with modular scaling (IBM Flamingo/Condor generation). If the timeline is 2028+, the choice is defensible.

    3. *Correctness risk.* An improperly implemented gross code that fails in subtle ways could produce wrong answers. In quantum chemistry, wrong answers are worse than no answers.

    **Arguments against the surface code choice:**

    1. *Gross code is maturing rapidly.* IBM's roadmap targets gross code demonstration by 2026–2027. By 2028, the gross code may be nearly as mature as the surface code while requiring $288{,}000/12{,}000 = 24\times$ fewer physical qubits.

    2. *Physical qubit count is the binding constraint.* 288,000 physical qubits requires either a single very large chip (not feasible by 2028) or many modular chips with inter-chip connections (which are also needed for gross codes). If inter-chip links are required either way, the connectivity overhead of qLDPC codes is less differentiated.

    3. *Total system cost.* Each physical qubit requires dilution refrigerator space, control electronics, cabling, and calibration overhead. 24× more physical qubits means ~24× higher system cost (at first order). For a commercial product, this cost difference is decisive.

    **Verdict:** The decision is reasonable if the deployment timeline is 2026–2027 and the physical qubit budget is available. It should be revisited if the timeline extends to 2029+, when gross codes will likely be sufficiently mature to be the better engineering choice.

---

**Question 25.** Evaluate the claim made in IBM's June 2025 roadmap papers that Logical Processing Units (LPUs) for bivariate bicycle codes represent a production-ready architecture for fault-tolerant computation. What evidence would be needed to fully validate this claim?

??? success "Answer"
    **Current state of evidence (as of early 2026):**

    **What IBM has demonstrated:**
    - Theoretical LPU architecture is fully specified in June 2025 papers
    - c-couplers enabling non-local connectivity demonstrated on Loon processor (2025)
    - Real-time FPGA decoder for BB code syndromes demonstrated at 10× speedup
    - Gross code encoding efficiency validated numerically and through small-scale experiments

    **What "production-ready" would require (and what is currently missing):**

    1. *End-to-end logical gate demonstration.* A complete demonstration of: (a) encoding into $[[144,12,12]]$ gross code, (b) applying one or more logical Clifford gates via LPU/lattice surgery, (c) measuring logical outcome, (d) showing gate fidelity better than unencoded physical gate fidelity. This has not been published as of early 2026.

    2. *$\Lambda > 1$ for the full gross code.* Demonstrating that increasing BB code distance actually reduces logical error rates in hardware — the analog of Willow's landmark result for the gross code.

    3. *Scalability of c-couplers.* Demonstrating 144 simultaneous c-couplers (the number needed for one gross code block) with acceptable yield (>95%) and without crosstalk or calibration failure. Loon demonstrated the concept with fewer couplers.

    4. *Magic state injection compatibility.* Demonstrating T-gate implementation via magic state injection into a BB-encoded logical qubit — critical for universal computation.

    5. *Multi-block operation.* Demonstrating logical gates *between* two separate gross code blocks — needed for any non-trivial algorithm.

    **Conclusion:** IBM's LPU architecture is a well-specified theoretical framework with promising early experimental evidence, but "production-ready" overstates the current experimental status. A more accurate characterization: "theoretically sound with demonstrated key components, requiring 2–3 years of experimental validation before production deployment."

---

## Level 6: Create (Questions 26–30)

**Question 26.** Design a minimal quantum error correction experiment for a 20-qubit superconducting processor that would (1) demonstrate below-threshold operation and (2) be publishable as a significant result. Specify the code, measurements, and success criteria.

??? success "Answer"
    **Proposed Experiment: Distance-3 Surface Code with Repeated Syndrome Extraction**

    **System:** 17 physical qubits (9 data + 8 ancilla, standard distance-3 surface code layout).

    **Goal:** Demonstrate $\Lambda > 1$ between $d=3$ (17 qubits) and an effective $d=2$ (9 qubits) comparison, and verify exponential error suppression over increasing QEC cycle count.

    **Protocol:**

    *Step 1: Calibration and characterization.*
    - Measure all 1Q and 2Q gate fidelities using randomized benchmarking
    - Measure $T_1$, $T_2$, measurement fidelity for all 17 qubits
    - Identify and exclude any qubits with error rates >5× median (use as chip quality filter)

    *Step 2: Surface code $d=3$ memory experiment.*
    - Encode logical $\ket{0}_L$, $\ket{1}_L$, $\ket{+}_L$, $\ket{-}_L$ in the distance-3 surface code
    - Run 100 syndrome extraction cycles (100 μs total at 1 μs/cycle)
    - Measure logical state fidelity vs. number of QEC cycles (expected: exponential decay with time constant $= 1/p_L$)
    - Repeat 10,000 shots per initial state

    *Step 3: Compare with $d=1$ (unencoded) and $d=2$ (4-qubit code).*
    - Track logical fidelity vs. time for all three "distances"
    - Extract logical error rate $p_L(d)$ from exponential fit for each $d$
    - Compute $\Lambda = p_L(d=1)/p_L(d=3)$

    *Step 4: Vary physical error rate.*
    - Deliberately degrade gate fidelity by adding calibrated depolarizing noise
    - Measure $\Lambda$ vs. physical error rate $p$
    - Identify the effective threshold $p_{\text{th}}$ as the point where $\Lambda = 1$

    **Success criteria:**
    1. $\Lambda > 1$ for the natural (non-degraded) physical error rates — demonstrates below-threshold operation
    2. $\Lambda$ decreases monotonically as $p$ increases above threshold — validates the phase transition
    3. Logical error rate vs. cycle count shows clear exponential decay with QEC, not exponential growth — demonstrates error correction is net beneficial

    **Publishability:** If criteria 1–3 are met, this experiment directly parallels Google Willow but on a minimal system, providing independent confirmation and potentially revealing how $\Lambda$ depends on hardware parameters differently from Willow's architecture.

---

**Question 27.** Propose an experiment that could determine whether leakage errors or Pauli errors are the dominant contributor to logical error rate in a superconducting surface code processor. Specify controls, measurements, and how you would distinguish the two error sources.

??? success "Answer"
    **Experiment: Leakage vs. Pauli Contribution to Logical Error Rate**

    **Core challenge:** Standard surface code syndrome measurements cannot distinguish leakage (population in $\ket{2}$) from Pauli errors (within $\{\ket{0}, \ket{1}\}$). Both produce syndrome violations.

    **Experimental design:**

    *Group 1: Standard surface code (no LRUs).*
    - Run distance-5 surface code memory experiment for 50 syndrome cycles
    - Measure logical fidelity decay → extract $p_L^{\text{no-LRU}}$
    - After each experiment, apply a "leakage readout" step: map $\ket{2} \to \ket{0}$ via a selective $\pi$-pulse on the $\ket{1}$–$\ket{2}$ transition, then re-measure all qubits in the Z basis to detect which were in $\ket{2}$

    *Group 2: Surface code with LRUs active every cycle.*
    - Same experiment but with leakage reduction units (ancilla-based $\ket{2}$ detection + reset) applied every syndrome cycle
    - Measure $p_L^{\text{with-LRU}}$

    *Group 3: Intentionally amplified leakage.*
    - Apply calibrated leakage injection pulses (partial $\ket{1} \to \ket{2}$ transitions) at known rates
    - Measure $p_L$ vs. injected leakage rate (with and without LRUs)
    - Expected: with LRUs active, $p_L$ is insensitive to leakage injection; without LRUs, $p_L$ increases linearly with leakage injection rate

    **Key measurements:**

    1. **Ratio $p_L^{\text{with-LRU}} / p_L^{\text{no-LRU}}$:** If close to 1, leakage is not the dominant error. If significantly < 1, leakage contributes meaningfully.

    2. **Syndrome correlation analysis:** Leakage events should produce characteristic syndrome patterns (a data qubit that is leaked produces the same syndrome violation across multiple consecutive cycles, unlike a transient Pauli error). Analyze temporal correlation of syndrome violations to separate transient Pauli signatures from persistent leakage signatures.

    3. **Leakage population spectroscopy:** Use the post-experiment $\ket{2}$ readout to measure the spatial distribution of leakage at the end of each syndrome run. Correlate leakage location with logical error events to identify whether leakage precedes logical errors.

    **Distinguishing the two sources:**
    - Pauli errors: transient (one syndrome cycle), spatially uncorrelated
    - Leakage errors: persistent (multiple syndrome cycles), spatially local (each qubit independent), invisible to standard syndrome until LRU detects

    **Success criterion:** If $p_L^{\text{no-LRU}} / p_L^{\text{with-LRU}} > 2$, leakage is the dominant contributor. If < 1.2, Pauli errors dominate and LRU overhead may not be justified at current operating points.

---

**Question 28.** Design a software benchmarking suite that a quantum hardware vendor could run to independently certify that their processor is "surface code fault-tolerant ready" according to objectively defined criteria. The suite should be runnable in under 2 hours on cloud access.

??? success "Answer"
    **Surface Code Fault-Tolerant Readiness Certification Suite (SFTRC-1)**

    **Total estimated runtime: ~90 minutes**

    ---

    **Module 1: Physical Qubit Characterization (20 min)**

    *Tests:* T1, T2 (echo), T2* for all qubits; single-qubit RB; two-qubit RB; measurement fidelity matrix; cross-talk matrix (simultaneous RB on all pairs).

    *Pass criteria:*
    - Median 2Q gate error < 0.5%
    - Worst 5th percentile 2Q gate error < 1.5%
    - Median measurement fidelity > 99%
    - Crosstalk-induced error increase < 30% under simultaneous operation

    ---

    **Module 2: Syndrome Extraction Fidelity (15 min)**

    *Test:* Implement a distance-3 surface code; prepare all four logical Pauli eigenstates ($\ket{0}_L, \ket{1}_L, \ket{+}_L, \ket{-}_L$); run 1, 5, 10, 20 syndrome extraction cycles; measure logical state fidelity after each.

    *Pass criteria:*
    - Logical state fidelity after 1 cycle > 97% for all four states
    - Fidelity decay over 20 cycles is approximately exponential (R² > 0.9 for exponential fit)
    - Extracted logical error rate per cycle < 1% (all four logical states)

    ---

    **Module 3: Below-Threshold Demonstration (25 min)**

    *Test:* Implement distance-3 and distance-5 surface codes; run 50 syndrome cycles each; extract logical fidelity decay rates; compute $\Lambda = p_L(d=3)/p_L(d=5)$.

    *Pass criteria:*
    - $\Lambda > 1.2$ (conservative: allows for decoder suboptimality while confirming below-threshold)
    - $\Lambda > 1.5$ (strong pass: indicates comfortable below-threshold operation)

    ---

    **Module 4: Decoder Latency (10 min)**

    *Test:* Measure classical decoder latency from syndrome input to correction output for distance-3 and distance-5 codes; measure end-to-end QEC cycle time (gate + measurement + decode + correction).

    *Pass criteria:*
    - Classical decoding latency < 500 ns (for distance-5 syndrome)
    - Total QEC cycle time < 2 μs

    ---

    **Module 5: Leakage Characterization (15 min)**

    *Test:* Apply standard gate sequences; after each sequence, perform leakage readout (spectroscopy of $\ket{2}$ population); measure leakage rate per two-qubit gate; optionally test LRU effectiveness.

    *Pass criteria:*
    - Leakage per 2Q gate < 0.1%
    - If LRUs present: demonstrate LRU reduces persistent leakage by >5×

    ---

    **Module 6: Multi-Cycle Stability (5 min)**

    *Test:* Run distance-3 surface code for 200 cycles; monitor logical error rate in 10-cycle windows; check for temporal drift.

    *Pass criteria:*
    - Logical error rate standard deviation across 20 windows < 30% of mean (stable operation)
    - No single window shows logical error rate > 3× median

    ---

    **Certification levels:**
    - **Level 1 (Research Qualified):** Pass Modules 1+2 ($\Lambda$ not required) — suitable for error correction research demonstrations
    - **Level 2 (Threshold Certified):** Pass all 6 modules with $\Lambda > 1.2$ — suitable for publishing fault-tolerant memory results
    - **Level 3 (Computation Ready):** Pass all 6 modules with $\Lambda > 1.5$ and Module 4 passing — suitable for fault-tolerant logical gate demonstrations

---

**Question 29.** Construct a mathematical argument for why, given the surface code's $\Lambda$ parameter and physical error rate, there exists an optimal code distance $d^*$ that minimizes total qubit overhead for a target algorithm, rather than simply "always using higher distance."

??? success "Answer"
    **Setup:**

    Let an algorithm require $N_L$ logical qubits, $N_G$ logical gate operations, and a maximum total logical error probability $\epsilon_{\text{algo}}$.

    The required logical error rate per gate is:

    $$p_L^{\text{required}} = \frac{\epsilon_{\text{algo}}}{N_G}$$

    The surface code achieves:

    $$p_L(d) = A\left(\frac{p}{p_{\text{th}}}\right)^{\lfloor(d+1)/2\rfloor}$$

    The minimum distance satisfying $p_L(d) \leq p_L^{\text{required}}$:

    $$\left\lfloor\frac{d^*+1}{2}\right\rfloor \geq \frac{\log(p_L^{\text{required}}/A)}{\log(p/p_{\text{th}})}$$

    $$d^* \approx 2 \cdot \frac{\log(A \cdot N_G/\epsilon_{\text{algo}})}{\log(p_{\text{th}}/p)} - 1$$

    **Total physical qubit cost as a function of $d$:**

    $$N_{\text{phys}}(d) = N_L \times 2d^2$$

    This grows as $d^2$. For any $d > d^*$, the algorithm's fidelity requirements are met but the physical qubit cost is higher than necessary.

    **The optimum:**

    For a fixed algorithm ($N_G$, $N_L$, $\epsilon_{\text{algo}}$) and fixed hardware ($p$, $p_{\text{th}}$), the optimal distance is exactly $d^*$ — the minimum $d$ satisfying the fidelity requirement. Going to $d > d^*$ wastes physical qubits without algorithmic benefit. Going to $d < d^*$ fails the fidelity requirement.

    **Numerical example:** $N_G = 10^8$, $\epsilon_{\text{algo}} = 0.01$, $p = 0.001$, $p_{\text{th}} = 0.01$, $A = 0.1$, $N_L = 100$.

    $$p_L^{\text{req}} = 0.01/10^8 = 10^{-10}$$

    $$\left\lfloor\frac{d^*+1}{2}\right\rfloor \geq \frac{\log(10^{-10}/0.1)}{\log(0.1)} = \frac{\log(10^{-11})}{-1} = 11$$

    $$d^* \geq 2 \times 11 - 1 = 21$$

    Physical qubit cost at $d^* = 21$: $100 \times 2 \times 21^2 = 88{,}200$. At $d = 25$ (unnecessarily high): $100 \times 2 \times 25^2 = 125{,}000$ — 41% more physical qubits with no fidelity benefit.

    This analysis is how resource estimates are generated for specific algorithms: find $d^*$ from the algorithm's gate count and fidelity requirement, then multiply by $2d^{*2} \times N_L$.

---

**Question 30.** Design a fault-tolerant quantum computing architecture for a specific application: breaking a 1024-bit RSA key (using Shor's algorithm) with 99% success probability, using the $[[144, 12, 12]]$ gross code. Specify the logical qubit count, code distance selection, physical qubit budget, runtime estimate, and key engineering challenges.

??? success "Answer"
    **Fault-Tolerant RSA-1024 Architecture Using the Gross Code**

    ---

    **Step 1: Algorithmic requirements (RSA-1024)**

    RSA-1024 requires approximately half the resources of RSA-2048. From Gidney's 2025 work (scaled):
    - Logical qubits: ~2,000 logical qubits (half of RSA-2048's ~4,000)
    - Logical gate count: ~$5 \times 10^9$ logical gates (T gates dominant)
    - Required success probability: 99% → total logical error probability < 1% → per-gate error rate < $2 \times 10^{-12}$

    ---

    **Step 2: Required code distance**

    Using gross code with effective $p_{\text{th}} \approx 0.7\%$ and $p = 0.2\%$:

    $$p_L^{\text{req}} = 2 \times 10^{-12}$$

    $$p_L = A\left(\frac{p}{p_{\text{th}}}\right)^{\lfloor(d+1)/2\rfloor} = 0.1 \times (0.286)^k \leq 2 \times 10^{-12}$$

    $$(0.286)^k \leq 2 \times 10^{-11}$$

    $$k \geq \frac{\log(2 \times 10^{-11})}{\log(0.286)} = \frac{-10.7}{-0.543} \approx 19.7 \implies k = 20$$

    $$d^* = 2k - 1 = 39$$

    Gross code at distance $d = 39$ is needed. The standard gross code is $[[144, 12, 12]]$ ($d = 12$); a scaled BB code at $d = 39$ would follow the family structure with higher distance. The two-gross code $[[288, 12, 18]]$ provides $d = 18$; extrapolation to $d = 39$ requires a higher-distance family member, e.g., $[[n, 12, 39]]$ BB code.

    Physical qubits per 12 logical qubits at $d = 39$ (scaling: $n \approx 3d^2/2$ for BB codes):

    $$n_{\text{data}} \approx 3 \times 39^2/2 \approx 2{,}282 \text{ data qubits per 12 logical qubits}$$

    Physical/logical: $\approx 2{,}282 \times 2/12 \approx 380$ physical qubits per logical qubit.

    ---

    **Step 3: Physical qubit budget**

    *Computation array (2,000 logical qubits):*
    $$N_{\text{compute}} = 2{,}000 \times 380 = 760{,}000 \text{ physical qubits}$$

    *Magic state factory (for $5 \times 10^9$ T gates):*
    Assume factories produce 1 magic state per 20 QEC cycles, running in parallel with computation. Need ~1,000 parallel T-gate slots to keep up with the computation rate. Each factory block: ~200 physical qubits.

    $$N_{\text{factory}} = 1{,}000 \times 200 = 200{,}000 \text{ physical qubits}$$

    **Total physical qubit budget:**

    $$N_{\text{total}} \approx 760{,}000 + 200{,}000 = 960{,}000 \approx \mathbf{10^6} \text{ physical qubits}$$

    ---

    **Step 4: Runtime estimate**

    QEC cycle time: 1 μs (1 μs per syndrome cycle × $d = 39$ syndrome rounds per logical gate cycle = 39 μs per logical gate).

    $$t_{\text{total}} = 5 \times 10^9 \text{ gates} \times 39\ \mu\text{s/gate} = 1.95 \times 10^{11}\ \mu\text{s} = 1.95 \times 10^5\ \text{s} \approx 54 \text{ hours}$$

    With parallelism and algorithm optimization: realistically **10–24 hours**.

    ---

    **Step 5: Key engineering challenges**

    1. **Scaling gross code to $d = 39$.** The $[[144, 12, 12]]$ code family needs to be generalized to higher distance. The theory exists; hardware fabrication of c-couplers at this scale has not been demonstrated.

    2. **$\sim 10^6$ physical qubit chip integration.** This requires either a single very large chip or ~1,000 smaller chips with low-latency inter-chip l-couplers. Each inter-chip link adds latency (~100 ns) to the syndrome cycle, potentially pushing QEC cycle time above 1 μs.

    3. **Real-time decoder at scale.** Decoding $\sim 2{,}000$ gross code blocks simultaneously, each generating syndromes at 1 MHz, requires $\sim 2 \times 10^9$ syndrome bits per second of classical decoding throughput — demanding specialized ASICs beyond current FPGA capabilities.

    4. **Cryogenic engineering.** $10^6$ qubits require a dilution refrigerator with cooling power of ~tens of milliwatts at 15 mK, plus handling $10^6$ microwave control lines. Current systems handle ~1,000–2,000 qubits; scaling requires new packaging approaches (e.g., multiplexed control lines, on-chip classical circuits).

    5. **Algorithm compilation.** Shor's algorithm at this scale requires a complete quantum compiler that maps the algorithm to gross code logical gates, schedules magic state injections, and optimizes routing between code blocks — a significant software engineering effort with no complete precedent.

    **Timeline assessment:** This architecture is technically sound but requires approximately 5–8 years of engineering development beyond the current state (early 2026). The physics is validated; the systems engineering is the binding constraint.
