# Chapter 3 Quiz: Quantum Gates and Circuits

Test your understanding of quantum gates, circuit construction, universality, and the no-cloning theorem.

---

## Level 1 — Remember

**Question 1.** What is the matrix representation of the Pauli-X gate?

??? success "Answer"
    The Pauli-X gate (also called the quantum NOT gate) is represented by the matrix:

    $$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$

    It flips $|0\rangle$ to $|1\rangle$ and $|1\rangle$ to $|0\rangle$, acting as the quantum analog of a classical NOT gate.

---

**Question 2.** What is the action of the Hadamard gate on the computational basis states $|0\rangle$ and $|1\rangle$?

??? success "Answer"
    The Hadamard gate maps:

    $$H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}} = |+\rangle, \qquad H|1\rangle = \frac{|0\rangle - |1\rangle}{\sqrt{2}} = |-\rangle$$

    It creates equal superpositions from computational basis states and is its own inverse: $H^2 = I$.

---

**Question 3.** State the no-cloning theorem.

??? success "Answer"
    The no-cloning theorem states that it is impossible to create an exact independent copy of an arbitrary unknown quantum state. Formally, there is no unitary operation $U$ such that $U|\psi\rangle|0\rangle = |\psi\rangle|\psi\rangle$ for all quantum states $|\psi\rangle$. This result was proven independently by Wootters & Zurek and by Dieks in 1982.

---

**Question 4.** What gate set is stated in the universality theorem for quantum computing?

??? success "Answer"
    The set $\{CNOT, H, T\}$ is universal for quantum computation. This means any unitary operation on any number of qubits can be approximated to arbitrary precision using only gates from this set. The $T$ gate (also called the $\pi/8$ gate) is particularly important because it introduces a non-Clifford operation that, combined with the Clifford gates $H$ and $CNOT$, achieves universality.

---

**Question 5.** How many classical bits does a projective measurement on a single qubit produce, and what happens to the qubit afterward?

??? success "Answer"
    A projective measurement on a single qubit produces exactly 1 classical bit of information (outcome 0 or 1). After measurement, the qubit collapses to the corresponding basis state: if outcome 0 is obtained, the qubit is in state $|0\rangle$; if outcome 1 is obtained, it is in state $|1\rangle$. The pre-measurement superposition is irreversibly destroyed.

---

## Level 2 — Understand

**Question 6.** Explain why the CNOT gate is a two-qubit gate and describe its action on all four computational basis states.

??? success "Answer"
    The CNOT (Controlled-NOT) gate is a two-qubit gate because it operates on two qubits: a control qubit and a target qubit. The rule is that the target qubit is flipped if and only if the control qubit is $|1\rangle$. Its action on the computational basis is:

    $$|00\rangle \to |00\rangle, \quad |01\rangle \to |01\rangle, \quad |10\rangle \to |11\rangle, \quad |11\rangle \to |10\rangle$$

    This gate is entangling: when the control qubit is in a superposition $|+\rangle$, the CNOT creates a Bell state from a product state, demonstrating that two-qubit entangling gates are qualitatively more powerful than single-qubit gates alone.

---

**Question 7.** Explain the difference between the $S$ gate and the $T$ gate in terms of their phase rotations, and state their relationship to the $Z$ gate.

??? success "Answer"
    The $S$ gate (phase gate) applies a phase of $i = e^{i\pi/2}$ to the $|1\rangle$ component: $S = \begin{pmatrix}1 & 0 \\ 0 & i\end{pmatrix}$. The $T$ gate (the $\pi/8$ gate) applies a phase of $e^{i\pi/4}$: $T = \begin{pmatrix}1 & 0 \\ 0 & e^{i\pi/4}\end{pmatrix}$. Their relationship to $Z$ is: $S^2 = Z$ and $T^4 = Z$, so they are "fractional" powers of the $Z$ gate. The $T$ gate is critical for universality because $T \notin$ Clifford group, while $S$ and the other Pauli gates are all Clifford gates.

---

**Question 8.** Explain why the choice of measurement basis matters in quantum mechanics, using the $\{|0\rangle, |1\rangle\}$ and $\{|+\rangle, |-\rangle\}$ bases as examples.

??? success "Answer"
    The measurement basis determines which physical observable is being measured, and the probabilities of outcomes depend entirely on the overlap between the state and the basis vectors. For a qubit in state $|+\rangle = (|0\rangle + |1\rangle)/\sqrt{2}$: measuring in the $\{|0\rangle, |1\rangle\}$ basis yields 0 or 1 each with probability 1/2, collapsing the superposition. But measuring the same state in the $\{|+\rangle, |-\rangle\}$ basis yields outcome $|+\rangle$ with certainty, revealing no randomness. This shows that a state can be "definite" in one basis and "maximally uncertain" in another — measurement is not a passive readout but an active interaction that is basis-dependent.

---

**Question 9.** Describe what the Toffoli gate does and explain why it is significant for classical reversible computation.

??? success "Answer"
    The Toffoli gate (CCNOT) is a three-qubit gate with two control qubits and one target qubit. The target qubit is flipped if and only if both control qubits are in state $|1\rangle$. It is significant for classical reversible computation because it is a universal reversible classical gate: any classical Boolean circuit can be simulated using Toffoli gates. Since the Toffoli gate is also a valid quantum gate (it is unitary), this shows that quantum computers can simulate any reversible classical computation. However, the Toffoli gate is not universal for quantum computation on its own — it cannot create superpositions.

---

**Question 10.** Explain the concept of T-gate cost in fault-tolerant quantum computing and why it differs from the cost of Clifford gates.

??? success "Answer"
    In fault-tolerant quantum computing using the surface code or similar stabilizer codes, Clifford gates ($H$, $S$, $CNOT$) can be implemented transversally or via code deformations with relatively low overhead. The $T$ gate, however, is a non-Clifford gate and cannot be implemented transversally in most codes. Instead, it requires a technique called magic state distillation, where a resource state (a "magic state") is prepared and consumed in a gate teleportation protocol. Magic state distillation is expensive: producing one high-fidelity $T$ gate may require hundreds or thousands of physical qubits and many rounds of distillation. Consequently, the "T-count" (number of $T$ gates in a circuit) is the primary metric for estimating the fault-tolerant resource cost of a quantum algorithm.

---

## Level 3 — Apply

**Question 11.** Apply the Hadamard gate followed by the Pauli-Z gate to the state $|0\rangle$. What is the resulting state? Show each step.

??? success "Answer"
    Starting with $|0\rangle$:

    **Step 1 — Apply $H$:**
    $$H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}} = |+\rangle$$

    **Step 2 — Apply $Z$:**
    $$Z|+\rangle = Z\frac{|0\rangle + |1\rangle}{\sqrt{2}} = \frac{Z|0\rangle + Z|1\rangle}{\sqrt{2}} = \frac{|0\rangle - |1\rangle}{\sqrt{2}} = |-\rangle$$

    The resulting state is $|-\rangle$, noting that $ZH|0\rangle = |-\rangle$. Observe that this equals $HX|0\rangle = H|1\rangle = |-\rangle$ as well, illustrating the conjugation relation $HXH = Z$ (equivalently $HZH = X$).

---

**Question 12.** Construct a quantum circuit that generates the Bell state $|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$ from the input $|00\rangle$. Write out each gate and show the intermediate states.

??? success "Answer"
    **Input:** $|00\rangle$

    **Gate 1 — Apply $H$ to qubit 1:**
    $$H \otimes I \, |00\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}} \otimes |0\rangle = \frac{|00\rangle + |10\rangle}{\sqrt{2}}$$

    **Gate 2 — Apply $CNOT$ (qubit 1 control, qubit 2 target):**
    $$CNOT \, \frac{|00\rangle + |10\rangle}{\sqrt{2}} = \frac{|00\rangle + |11\rangle}{\sqrt{2}} = |\Phi^+\rangle$$

    The circuit is $CNOT_{1\to2}(H \otimes I)|00\rangle$. This is the standard Bell state preparation circuit and is one of the most important two-qubit circuits in quantum information.

---

**Question 13.** The SWAP gate exchanges two qubits. Show how to decompose SWAP into three CNOT gates. Verify your decomposition on the input $|10\rangle$.

??? success "Answer"
    **Decomposition:** $SWAP = CNOT_{1\to2} \cdot CNOT_{2\to1} \cdot CNOT_{1\to2}$

    **Verification on $|10\rangle$ (qubit 1 = $|1\rangle$, qubit 2 = $|0\rangle$):**

    - After $CNOT_{1\to2}$: control is qubit 1 ($|1\rangle$), so flip qubit 2: $|10\rangle \to |11\rangle$
    - After $CNOT_{2\to1}$: control is qubit 2 ($|1\rangle$), so flip qubit 1: $|11\rangle \to |01\rangle$
    - After $CNOT_{1\to2}$: control is qubit 1 ($|0\rangle$), so no flip: $|01\rangle \to |01\rangle$

    The output is $|01\rangle$, which is the original $|10\rangle$ with the qubits swapped. The decomposition is correct.

---

**Question 14.** Apply the no-cloning theorem to explain why the following operation is impossible: given an unknown qubit $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$, produce two qubits both in state $|\psi\rangle$ using a unitary operation.

??? success "Answer"
    Suppose a unitary cloning operation $U$ existed such that $U|\psi\rangle|0\rangle = |\psi\rangle|\psi\rangle$ for all $|\psi\rangle$. Apply it to two orthogonal states:

    - $U|0\rangle|0\rangle = |00\rangle$
    - $U|1\rangle|0\rangle = |11\rangle$

    By linearity of $U$, applying it to $|\psi\rangle|0\rangle = (\alpha|0\rangle + \beta|1\rangle)|0\rangle$ gives $\alpha|00\rangle + \beta|11\rangle$, which is an entangled state. But the required output $|\psi\rangle|\psi\rangle = (\alpha|0\rangle + \beta|1\rangle)^{\otimes 2} = \alpha^2|00\rangle + \alpha\beta|01\rangle + \beta\alpha|10\rangle + \beta^2|11\rangle$ is a product state (for generic $\alpha, \beta$). These are not equal, so no such $U$ can exist. The impossibility follows from the interplay of linearity and the tensor product structure of quantum mechanics.

---

**Question 15.** Given that the Solovay-Kitaev theorem guarantees approximation of any single-qubit gate to precision $\varepsilon$ using $O(\log^c(1/\varepsilon))$ gates from a universal set, estimate how many $\{H, T, S\}$ gates are needed to approximate an arbitrary rotation to precision $10^{-3}$.

??? success "Answer"
    The Solovay-Kitaev theorem states that approximation to precision $\varepsilon$ requires $O(\log^c(1/\varepsilon))$ gates, where $c \approx 2$ in the original proof and $c \approx 1.44$ in improved versions (Harrow, Recht, Chuang 2002). For $\varepsilon = 10^{-3}$, $\log_2(1/\varepsilon) = \log_2(1000) \approx 10$. Using $c = 2$: approximately $O(10^2) = O(100)$ gates. With $c = 1.44$: approximately $O(10^{1.44}) \approx O(28)$ gates. In practice, efficient numerical synthesis algorithms (like gridsynth) can approximate a single-qubit rotation to precision $10^{-3}$ using roughly 20–50 $T$ gates, consistent with these theoretical bounds.

---

## Level 4 — Analyze

**Question 16.** Analyze why the Clifford group alone is insufficient for universal quantum computation, and what role the $T$ gate plays in completing it.

??? success "Answer"
    The Clifford group consists of all unitary operations generated by $\{H, S, CNOT\}$. By the Gottesman-Knill theorem, any quantum circuit composed entirely of Clifford gates acting on computational basis states can be efficiently simulated on a classical computer in polynomial time. This immediately shows that Clifford circuits cannot achieve quantum speedup — they offer no computational advantage. The Clifford group maps the Pauli group to itself under conjugation, so its action on stabilizer states is classically tractable. The $T$ gate lies outside the Clifford group: it cannot be expressed as a product of Clifford gates. Adding even a single non-Clifford gate like $T$ breaks this classical simulability and, combined with Clifford gates, enables universal quantum computation. Therefore, the $T$ gate is the "magic ingredient" that transitions quantum circuits from efficiently classically simulable to computationally universal.

---

**Question 17.** Analyze the consequences of the no-cloning theorem for quantum key distribution (QKD). How does the impossibility of cloning contribute to the security of QKD protocols?

??? success "Answer"
    In QKD (such as BB84), security relies on the fact that an eavesdropper (Eve) cannot copy quantum states to measure them later without disturbing them. If cloning were possible, Eve could intercept each qubit, clone it, forward the original undisturbed to Bob, and measure her copy at leisure to learn the key — all without introducing errors detectable by Alice and Bob. The no-cloning theorem prevents this: Eve cannot produce an exact copy of an unknown qubit state. Any attempt to measure the qubit must disturb it (due to the measurement postulate), introducing detectable errors. Furthermore, Eve cannot clone to "defer" measurement, because perfect cloning is forbidden. This makes QKD protocols information-theoretically secure against any eavesdropping strategy that obeys quantum mechanics, not merely secure against computationally bounded adversaries.

---

**Question 18.** Analyze the trade-off between circuit depth and T-gate count in the context of fault-tolerant computation. When might a designer choose a higher T-count circuit over a lower T-count one?

??? success "Answer"
    In fault-tolerant quantum computing, T-count measures the total number of non-Clifford gates and determines the total number of magic states needed, driving the qubit overhead for magic state distillation factories. T-depth (the number of sequential T-gates) determines wall-clock time, since T-gates in parallel can be executed simultaneously. A circuit with low T-count but high T-depth may be slow even if it uses few magic states overall; a circuit with high T-count but low T-depth can exploit parallelism for speed at the cost of more distillation factories running simultaneously. A designer might accept a higher T-count if: (a) they have an abundance of physical qubits and want to minimize runtime, (b) the algorithm is time-critical and parallelizing T-gates reduces latency, or (c) the T-depth is the bottleneck and additional T-gates enable deeper parallelism. This is the classic space-time trade-off in fault-tolerant architecture.

---

**Question 19.** Analyze the relationship between the rotation gates $R_x(\theta)$, $R_y(\theta)$, $R_z(\theta)$ and the Pauli matrices. What happens when $\theta = \pi$ in each case?

??? success "Answer"
    The rotation gates are defined as matrix exponentials of Pauli operators:

    $$R_x(\theta) = e^{-i\theta X/2} = \cos(\theta/2)I - i\sin(\theta/2)X$$
    $$R_y(\theta) = e^{-i\theta Y/2} = \cos(\theta/2)I - i\sin(\theta/2)Y$$
    $$R_z(\theta) = e^{-i\theta Z/2} = \cos(\theta/2)I - i\sin(\theta/2)Z$$

    When $\theta = \pi$: $\cos(\pi/2) = 0$ and $\sin(\pi/2) = 1$, giving $R_x(\pi) = -iX$, $R_y(\pi) = -iY$, $R_z(\pi) = -iZ$. These equal the Pauli gates up to a global phase of $-i$, which is physically unobservable. Therefore, the Pauli gates are $\pi$-rotations about their respective axes on the Bloch sphere, confirming the geometric interpretation of single-qubit gates as rotations.

---

**Question 20.** Analyze why magic state distillation is required for fault-tolerant T-gate implementation, rather than simply encoding the T-gate transversally like the CNOT gate.

??? success "Answer"
    Transversal gate implementation applies the same gate independently to each qubit in corresponding positions across the code blocks, ensuring that errors cannot propagate between qubits within a single block. For stabilizer codes like the surface code, Clifford gates (including $CNOT$, $H$, $S$) can be applied transversally because they map the code space to itself and preserve the stabilizer structure. However, the Eastin-Knill theorem proves that no quantum error-correcting code can have a universal transversal gate set — there is a fundamental obstruction to implementing non-Clifford gates transversally. The $T$ gate, being non-Clifford, falls under this prohibition for the surface code. Magic state distillation circumvents the Eastin-Knill theorem by using only Clifford operations (which are transversal) to consume a pre-prepared non-stabilizer resource state (the magic state $|T\rangle = T|+\rangle$), effectively implementing the $T$ gate without directly applying it transversally. The distillation process purifies many noisy magic states into fewer high-fidelity ones using Clifford measurements.

---

## Level 5 — Evaluate

**Question 21.** Evaluate the claim that "quantum gates are just rotations on the Bloch sphere." Is this a complete and accurate characterization? What does it miss?

??? success "Answer"
    The claim is accurate for single-qubit gates: every single-qubit unitary $U \in SU(2)$ can indeed be parameterized as a rotation on the Bloch sphere by the Euler angle decomposition $U = R_z(\alpha)R_y(\beta)R_z(\gamma)$. For single-qubit gates, the Bloch sphere picture is complete and provides excellent geometric intuition. However, the claim becomes seriously incomplete for multi-qubit gates. The Bloch sphere description does not generalize to two or more qubits because multi-qubit states live in a $2^n$-dimensional Hilbert space whose geometry is far richer than a sphere. Entangling gates like the CNOT cannot be understood as Bloch sphere rotations — they create correlations between qubits that have no single-qubit analog. Additionally, even for single qubits, global phase is invisible on the Bloch sphere but can matter in multi-qubit contexts. A complete characterization requires the full unitary group $U(2^n)$, not $SU(2)$.

---

**Question 22.** Evaluate the pedagogical and practical usefulness of the universality theorem $\{CNOT, H, T\}$. What are its limitations as a guide for real circuit design?

??? success "Answer"
    The universality theorem is pedagogically valuable because it establishes that a small, finite gate set suffices for universal quantum computation, analogous to NAND universality in classical computing. It provides a theoretical foundation for quantum algorithms and shows that hardware need not implement infinitely many gates. However, it has significant practical limitations. First, the Solovay-Kitaev approximation introduces overhead: approximating an arbitrary rotation to precision $\varepsilon$ requires $O(\text{polylog}(1/\varepsilon))$ gates, which can be costly. Second, real quantum computers use different native gate sets (e.g., $\{R_z, \sqrt{X}, CNOT\}$ on superconducting processors) that may not include $H$ or $T$ directly, requiring additional compilation. Third, the gate set says nothing about connectivity constraints, decoherence, or realistic noise models. Fourth, in fault-tolerant computation, the emphasis shifts to minimizing T-count specifically, since T-gates cost orders of magnitude more than Clifford gates — the symmetric treatment of $\{CNOT, H, T\}$ in the theorem obscures this asymmetry. Practical circuit optimization requires hardware-specific compilation, not just theoretical universality.

---

**Question 23.** Evaluate the significance of the no-cloning theorem as a fundamental constraint of quantum mechanics. Is it a limitation or a feature?

??? success "Answer"
    The no-cloning theorem is genuinely both a limitation and a feature, and whether it is viewed as one or the other depends on context. As a limitation: it prevents the straightforward broadcasting of quantum information, complicates quantum networking (no quantum repeaters via simple amplification), and means that unlike classical bits, quantum states cannot be backed up trivially. Quantum error correction must work around this constraint using entanglement and syndrome measurements. As a feature: no-cloning is the foundational security guarantee for quantum key distribution — eavesdroppers cannot copy qubits without detection. It also ensures the consistency of quantum mechanics with special relativity: if cloning were possible, one could use entanglement for faster-than-light signaling. The theorem is therefore not an arbitrary restriction but a deep consistency requirement of quantum mechanics. It also drives the development of quantum teleportation as the correct framework for transmitting quantum information, which is arguably richer than naive copying. Overall, no-cloning is best viewed as a fundamental structural feature of quantum information that has both costs and profound benefits.

---

**Question 24.** Evaluate the Solovay-Kitaev theorem's impact on the feasibility of fault-tolerant quantum computing. Does polylogarithmic overhead make arbitrary gate synthesis practical?

??? success "Answer"
    The Solovay-Kitaev theorem guarantees that any single-qubit gate can be approximated to precision $\varepsilon$ using $O(\log^c(1/\varepsilon))$ gates, with $c \approx 2$. This polylogarithmic scaling is theoretically efficient — far better than polynomial or exponential — and establishes that fault-tolerant universal computation is in principle achievable with a finite gate set. However, practical feasibility depends on the precision required. For quantum algorithms that require $n$ gates each approximated to precision $\varepsilon/n$ (to keep total error below $\varepsilon$), the overhead per gate grows as $O(\log^c(n/\varepsilon))$, adding a circuit overhead factor that scales with the algorithm size. For near-term algorithms with $10^6$ gates requiring $10^{-10}$ per-gate fidelity, this could add a factor of 30–50 in T-count. More recent advances (gridsynth, optimal synthesis algorithms) bring practical T-counts much closer to the theoretical minimum, making the overhead manageable. The theorem's real significance is existential: it proves the overhead is not catastrophic, enabling researchers to focus on reducing T-count through better synthesis rather than questioning fundamental feasibility.

---

**Question 25.** Evaluate the importance of quantum circuit notation as a communication and analysis tool. What are its strengths and its limitations for describing large-scale fault-tolerant circuits?

??? success "Answer"
    Quantum circuit notation is an extremely effective language for small to medium circuits. Its strengths include visual clarity (left-to-right time ordering mirrors computation flow), explicit representation of entanglement and controlled operations, direct correspondence to matrix operations (rightmost gate = leftmost matrix factor), and universality across hardware platforms. It is the standard for algorithm description and pedagogical communication. However, for large-scale fault-tolerant circuits its limitations become severe. A full surface code implementation of, say, Shor's algorithm for RSA-2048 involves billions of physical gates — no circuit diagram is practical at this scale. The notation also does not natively represent: error correction rounds interspersed with logical operations, the distinction between physical and logical qubits, classical control flow from syndrome measurements, or the 3D spacetime structure of topological codes. Researchers instead use high-level resource estimation frameworks, quantum programming languages (Qiskit, Cirq, Q#), or lattice surgery instruction sets. Circuit diagrams remain invaluable for algorithm design and analysis at the logical level, but a complete description of fault-tolerant execution requires additional abstraction layers beyond the diagram.

---

## Level 6 — Create

**Question 26.** Design a quantum circuit that implements the three-qubit GHZ state $|GHZ\rangle = \frac{|000\rangle + |111\rangle}{\sqrt{2}}$ from $|000\rangle$. Extend your design to verify entanglement by specifying what measurements you would perform and what results would confirm genuine tripartite entanglement.

??? success "Answer"
    **Circuit construction:**

    - Apply $H$ to qubit 1: $|000\rangle \to \frac{|0\rangle + |1\rangle}{\sqrt{2}}|00\rangle$
    - Apply $CNOT_{1\to2}$: $\to \frac{|00\rangle + |11\rangle}{\sqrt{2}}|0\rangle$
    - Apply $CNOT_{1\to3}$: $\to \frac{|000\rangle + |111\rangle}{\sqrt{2}}$

    Total: 1 Hadamard + 2 CNOT gates.

    **Entanglement verification strategy (Mermin inequality test):**

    To verify genuine tripartite entanglement, measure in three settings: (XXY), (XYX), (YXX), and (YYY), where X and Y denote single-qubit Pauli measurements on the respective qubits. For the GHZ state, the Mermin operator $M = XXY + XYX + YXX - YYY$ has expectation value $\langle M \rangle = 4$ (quantum), while any local hidden variable theory predicts $|\langle M \rangle| \leq 2$. A measured value near 4 with high statistical confidence confirms genuine tripartite entanglement that cannot be explained by biseparable states. Alternatively, full quantum state tomography (measuring all combinations of $\{X, Y, Z\}$ per qubit) can reconstruct the density matrix and compute the three-tangle to verify entanglement.

---

**Question 27.** Design a protocol using only $\{H, CNOT, T, T^\dagger, S\}$ gates to implement a controlled-Z (CZ) gate between two qubits. Justify each gate choice and analyze the T-count of your construction.

??? success "Answer"
    **Key identity:** $CZ = (I \otimes H) \cdot CNOT \cdot (I \otimes H)$

    This follows because $H$ conjugates $X \to Z$ and $Z \to X$. Applying $H$ to the target qubit transforms CNOT (which flips target when control is $|1\rangle$) into CZ (which applies a $Z$ phase to target when control is $|1\rangle$).

    **Circuit:**
    1. Apply $H$ to qubit 2 (target)
    2. Apply $CNOT_{1\to2}$
    3. Apply $H$ to qubit 2

    **Gate analysis:**
    - Gates used: 2 Hadamards ($H$), 1 CNOT — all Clifford gates
    - T-count: **0**
    - This is a Clifford-only construction, which means CZ is itself a Clifford gate

    **Justification:** CZ is related to CNOT by a local Clifford operation (Hadamard on the target), so no non-Clifford resources are needed. This is important in fault-tolerant computing: CZ gates are "free" in terms of magic state cost. The design illustrates how understanding gate equivalences under Clifford operations enables T-count optimization — a key skill in fault-tolerant circuit compilation.

---

**Question 28.** Devise a scheme to use the Toffoli gate to implement a classical reversible full adder (computing sum and carry-out from three input bits). Specify the qubit assignments, the gate sequence, and explain how the reversibility is maintained while computing the classical function.

??? success "Answer"
    **Inputs:** qubits $a$, $b$, $c_{in}$ (the three classical bits); ancilla qubit $s = |0\rangle$ for sum; output qubit for carry-out initially in $|0\rangle$.

    **Classical full adder:** sum $= a \oplus b \oplus c_{in}$, carry-out $= (a \wedge b) \vee (b \wedge c_{in}) \vee (a \wedge c_{in})$.

    **Gate sequence:**
    1. $CNOT_{a \to s}$: $s \leftarrow a$
    2. $CNOT_{b \to s}$: $s \leftarrow a \oplus b$
    3. $CNOT_{c_{in} \to s}$: $s \leftarrow a \oplus b \oplus c_{in}$ (sum computed)
    4. $Toffoli_{a,b \to carry}$: $carry \leftarrow a \wedge b$
    5. $Toffoli_{a,c_{in} \to carry}$: $carry \leftarrow (a \wedge b) \oplus (a \wedge c_{in})$
    6. $Toffoli_{b,c_{in} \to carry}$: $carry \leftarrow (a \wedge b) \oplus (a \wedge c_{in}) \oplus (b \wedge c_{in})$ (carry-out computed)

    **Reversibility:** Every gate (CNOT and Toffoli) is its own inverse. The input values $a$, $b$, $c_{in}$ remain unchanged and available in their original qubits. Running the circuit in reverse restores the ancillae to $|0\rangle$ and the carry to $|0\rangle$, achieving classical uncomputation — critical in quantum algorithms to avoid garbage ancilla entanglement.

---

**Question 29.** Create a minimal quantum circuit that tests whether two unknown single-qubit states $|\phi\rangle$ and $|\psi\rangle$ are identical (i.e., equal up to global phase), using only one ancilla qubit and measurements. Describe the SWAP test protocol, derive its success probability, and explain what the measurement outcome statistics reveal about the states.

??? success "Answer"
    **Protocol — the SWAP test:**

    **Qubit assignments:** ancilla $|0\rangle$, register 1 holds $|\phi\rangle$, register 2 holds $|\psi\rangle$.

    **Circuit:**
    1. $H$ on ancilla: $|0\rangle \to |+\rangle$
    2. Controlled-SWAP (Fredkin gate) with ancilla as control, registers as targets
    3. $H$ on ancilla
    4. Measure ancilla in $\{|0\rangle, |1\rangle\}$ basis

    **State evolution:**

    After step 1: $|+\rangle|\phi\rangle|\psi\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)|\phi\rangle|\psi\rangle$

    After CSWAP: $\frac{1}{\sqrt{2}}(|0\rangle|\phi\rangle|\psi\rangle + |1\rangle|\psi\rangle|\phi\rangle)$

    After second $H$: $\frac{1}{2}|0\rangle(|\phi\rangle|\psi\rangle + |\psi\rangle|\phi\rangle) + \frac{1}{2}|1\rangle(|\phi\rangle|\psi\rangle - |\psi\rangle|\phi\rangle)$

    **Measurement probabilities:**
    $$P(\text{outcome }0) = \frac{1}{2} + \frac{1}{2}|\langle\phi|\psi\rangle|^2, \qquad P(\text{outcome }1) = \frac{1}{2} - \frac{1}{2}|\langle\phi|\psi\rangle|^2$$

    **Interpretation:** If $|\phi\rangle = |\psi\rangle$ (up to global phase), $|\langle\phi|\psi\rangle|^2 = 1$, so outcome 0 occurs with certainty and outcome 1 never occurs. If $|\phi\rangle \perp |\psi\rangle$, each outcome occurs with probability 1/2. The protocol cannot definitively confirm equality from a single shot but can detect inequality: a single outcome-1 result proves the states are not identical. Repeated trials allow estimation of the fidelity $|\langle\phi|\psi\rangle|^2$.

---

**Question 30.** Design a fault-tolerant strategy for reducing T-count in a hypothetical quantum algorithm that initially requires 10,000 T-gates to implement a unitary $U$. Your strategy should incorporate: gate synthesis optimization, circuit identities, and the Clifford+T framework. Estimate the resource savings and identify the trade-offs.

??? success "Answer"
    **Step 1 — Identify and cancel T-gate pairs:**
    Scan the circuit for consecutive $T$ and $T^\dagger$ gates on the same qubit: these cancel to identity. Also look for $TT = S$ and $TTTT = Z$ reductions. In typical unoptimized circuits, 10–20% cancellations are achievable, reducing from 10,000 to approximately 8,500 T-gates.

    **Step 2 — Commute and merge through Clifford layers:**
    Use the identity that $T$ can be commuted past Clifford gates by conjugation: $HTH = R_x(\pi/4)$ up to phase. Rearrange the circuit to cluster T-gates, enabling further cancellations. This requires a Clifford+T optimizer (e.g., the T-par algorithm by Amy et al. 2014) and can reduce T-count by an additional 20–40%, bringing the estimate to approximately 5,500–6,800 T-gates.

    **Step 3 — Ancilla-assisted T-count reduction:**
    Techniques such as the TODD optimizer and phase polynomial optimization can trade ancilla qubits for T-gate reductions. With $k$ ancilla qubits, the T-count of a $k$-qubit subcircuit can sometimes be reduced by a factor of up to 2. Adding 50 ancilla qubits might reduce T-count by a further 15–25%, reaching approximately 4,500–5,800 T-gates.

    **Step 4 — Replace subcircuits with known low-T implementations:**
    Look up or precompute optimal Clifford+T implementations of common subcircuits (adders, multipliers, rotations). For rotations, use gridsynth to achieve near-optimal T-count synthesis.

    **Summary of trade-offs:**
    | Strategy | T-count savings | Cost |
    |---|---|---|
    | Pair cancellation | ~15% | Low (syntactic) |
    | Phase polynomial opt. | ~30% | Moderate compile time |
    | Ancilla-assisted | ~15% | Extra qubits required |
    | Subcircuit replacement | ~10% | Design time |
    | **Combined estimate** | **~50–55%** | Moderate overhead |

    Starting from 10,000 T-gates, the combined strategy could achieve approximately 4,500–5,000 T-gates — roughly halving the magic state distillation cost and proportionally reducing fault-tolerant runtime. The primary trade-off is compilation time and ancilla qubit overhead, both of which are generally acceptable given the enormous cost reduction in the distillation factories.
