# Chapter 6 Quiz: Density Matrices and Open Quantum Systems

Test your understanding of density matrices, quantum channels, error correction, adiabatic quantum computing, and quantum annealing.

---

## Level 1 — Remember

**Question 1.** State the definition of the density matrix for a statistical mixture of pure states, and give the condition that distinguishes a pure state from a mixed state using $\text{Tr}(\rho^2)$.

??? success "Answer"
    The density matrix for a statistical ensemble of pure states $\{(p_i, |\psi_i\rangle)\}$ is:

    $$\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|$$

    where $p_i \geq 0$ and $\sum_i p_i = 1$. The density matrix is Hermitian ($\rho = \rho^\dagger$), positive semidefinite ($\rho \geq 0$), and has unit trace ($\text{Tr}(\rho) = 1$).

    **Pure vs. mixed state condition:**
    - **Pure state:** $\text{Tr}(\rho^2) = 1$ (equivalently, $\rho^2 = \rho$, i.e., $\rho$ is a projector)
    - **Mixed state:** $\text{Tr}(\rho^2) < 1$

    The quantity $\text{Tr}(\rho^2)$ is called the purity. For a maximally mixed state on $d$ dimensions, $\rho = I/d$ and $\text{Tr}(\rho^2) = 1/d$.

---

**Question 2.** State the von Neumann entropy formula and give its value for a pure state and for the maximally mixed state of a qubit.

??? success "Answer"
    The von Neumann entropy is:

    $$S(\rho) = -\text{Tr}(\rho \log_2 \rho) = -\sum_i \lambda_i \log_2 \lambda_i$$

    where $\lambda_i$ are the eigenvalues of $\rho$ (using the convention $0 \log_2 0 = 0$).

    - **Pure state** ($\rho = |\psi\rangle\langle\psi|$): eigenvalues are $\{1, 0, \ldots, 0\}$, so $S(\rho) = -1 \cdot \log_2 1 = \mathbf{0}$.
    - **Maximally mixed qubit** ($\rho = I/2$): eigenvalues are $\{1/2, 1/2\}$, so $S(\rho) = -2 \cdot \frac{1}{2}\log_2\frac{1}{2} = \mathbf{1}$ bit.

    The von Neumann entropy quantifies the "quantumness" of ignorance: 0 for known pure states, maximum for maximally uncertain mixed states.

---

**Question 3.** Write the Kraus operator decomposition of a quantum channel (CPTP map) and state the completeness condition on the Kraus operators.

??? success "Answer"
    A quantum channel (completely positive trace-preserving map) $\mathcal{E}$ acts on a density matrix as:

    $$\mathcal{E}(\rho) = \sum_k K_k \rho K_k^\dagger$$

    where the operators $\{K_k\}$ are the **Kraus operators** of the channel. The completeness (trace-preserving) condition is:

    $$\sum_k K_k^\dagger K_k = I$$

    This ensures that $\text{Tr}(\mathcal{E}(\rho)) = \text{Tr}(\rho) = 1$ for all $\rho$. The number of Kraus operators can range from 1 (unitary evolution) to $d^2$ (for a $d$-dimensional system), though the minimum Kraus rank may be smaller.

---

**Question 4.** What is the QUBO formulation? Write the general QUBO objective function and state what problem structure it captures.

??? success "Answer"
    QUBO stands for Quadratic Unconstrained Binary Optimization. The general objective function is:

    $$\min_{x \in \{0,1\}^n} \sum_{i} Q_{ii} x_i + \sum_{i < j} Q_{ij} x_i x_j = \min_{x \in \{0,1\}^n} x^T Q x$$

    where $Q$ is an $n \times n$ upper triangular (or symmetric) real matrix and $x_i \in \{0,1\}$ are binary variables. QUBO captures all quadratic interactions between binary variables without linear or higher-order terms explicitly (though higher-order terms can be reduced to QUBO form). It is the standard input format for D-Wave quantum annealers and is NP-hard in general (it includes Max-Cut, number partitioning, and other NP-hard problems as special cases).

---

**Question 5.** Name the three Pauli quantum noise channels and briefly describe what physical process each models.

??? success "Answer"
    - **Bit-flip channel:** Models classical bit-flip errors — the qubit state $|0\rangle \leftrightarrow |1\rangle$ is flipped with probability $p$ and left unchanged with probability $1-p$. Kraus operators: $\{\sqrt{1-p}\, I,\ \sqrt{p}\, X\}$. Models charge noise, classical crosstalk.

    - **Phase-flip channel:** Models dephasing — the relative phase between $|0\rangle$ and $|1\rangle$ is flipped (multiplied by $-1$) with probability $p$. Kraus operators: $\{\sqrt{1-p}\, I,\ \sqrt{p}\, Z\}$. Models interactions with a fluctuating magnetic or electric environment.

    - **Depolarizing channel:** Models symmetric noise in all three Pauli directions — with probability $p$, one of the three Pauli errors $X$, $Y$, $Z$ is applied uniformly at random. Kraus operators: $\{\sqrt{1-p}\, I,\ \sqrt{p/3}\, X,\ \sqrt{p/3}\, Y,\ \sqrt{p/3}\, Z\}$. A common model for gate errors in superconducting and trapped-ion systems.

---

## Level 2 — Understand

**Question 6.** Explain the physical meaning of the partial trace operation. Why is it necessary to use density matrices (rather than pure state vectors) when describing a subsystem of a larger entangled system?

??? success "Answer"
    The partial trace $\text{Tr}_B(\rho_{AB})$ is the unique operation that correctly computes expectation values of observables acting only on subsystem $A$, regardless of the state of $B$. For any observable $O_A \otimes I_B$:
    $$\langle O_A \rangle = \text{Tr}_{AB}[(O_A \otimes I_B)\rho_{AB}] = \text{Tr}_A[O_A \cdot \text{Tr}_B(\rho_{AB})]$$

    The necessity of density matrices for subsystems arises from entanglement. If $|\Psi_{AB}\rangle$ is an entangled pure state (e.g., $|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt{2}$), then subsystem $A$ alone has no well-defined pure state description: there is no $|\phi_A\rangle$ such that $|\Psi_{AB}\rangle = |\phi_A\rangle \otimes |\phi_B\rangle$. The reduced state $\rho_A = \text{Tr}_B(|\Phi^+\rangle\langle\Phi^+|) = I/2$ is maximally mixed — all local measurements on $A$ give maximally random results. A pure state vector cannot represent this; a density matrix is mandatory. Physically, the partial trace represents the inaccessibility of the environment's degrees of freedom: any realistic quantum system is entangled with its environment, making density matrices the correct description of open systems.

---

**Question 7.** Explain the amplitude damping channel and its physical significance. Write its Kraus operators and describe how it models the T1 relaxation process.

??? success "Answer"
    The amplitude damping channel models energy relaxation from the excited state $|1\rangle$ to the ground state $|0\rangle$ — the $T_1$ process (longitudinal relaxation). The Kraus operators are:

    $$K_0 = \begin{pmatrix}1 & 0 \\ 0 & \sqrt{1-\gamma}\end{pmatrix}, \qquad K_1 = \begin{pmatrix}0 & \sqrt{\gamma} \\ 0 & 0\end{pmatrix}$$

    where $\gamma = 1 - e^{-t/T_1}$ is the damping parameter, increasing from 0 to 1 as $t$ grows from 0 to $\infty$.

    **Physical action:** $K_0$ represents "no decay" — the excited state amplitude is reduced by $\sqrt{1-\gamma}$; $K_1$ represents "decay event" — the qubit jumps from $|1\rangle$ to $|0\rangle$ (emitting a photon or phonon to the environment). For a general state $\rho = \begin{pmatrix}p & r^* \\ r & 1-p\end{pmatrix}$, the channel gives:
    $$\mathcal{E}_{AD}(\rho) = \begin{pmatrix}p + \gamma(1-p) & r^*\sqrt{1-\gamma} \\ r\sqrt{1-\gamma} & (1-p)(1-\gamma)\end{pmatrix}$$

    As $t \to \infty$ ($\gamma \to 1$): $\rho \to |0\rangle\langle 0|$ — the qubit decays to the ground state regardless of its initial state. The off-diagonal coherences decay as $e^{-t/(2T_1)}$, faster than the population $T_1$ decay.

---

**Question 8.** Explain the stabilizer formalism for quantum error correction. What is a stabilizer group, and how does syndrome measurement work without revealing the quantum information?

??? success "Answer"
    The stabilizer formalism (Gottesman 1997) describes quantum error-correcting codes using groups of Pauli operators that "stabilize" the code space — they have eigenvalue $+1$ on all codewords. Formally, for an $[[n,k,d]]$ code encoding $k$ logical qubits into $n$ physical qubits, the stabilizer group $\mathcal{S}$ is an abelian subgroup of the $n$-qubit Pauli group, with $|\mathcal{S}| = 2^{n-k}$ independent generators $\{g_1, \ldots, g_{n-k}\}$.

    **Syndrome measurement:** To detect errors without measuring the encoded information, the error correction procedure measures each generator $g_i$. For a codeword $|\psi\rangle$ in the code space, $g_i|\psi\rangle = +|\psi\rangle$, so all syndrome bits are 0. When error $E$ acts on the codeword, the corrupted state $E|\psi\rangle$ may satisfy $g_i(E|\psi\rangle) = \pm E|\psi\rangle$: if $E$ anticommutes with $g_i$, the syndrome bit for $g_i$ is $-1$ (outcome 1). The syndrome $(s_1, \ldots, s_{n-k})$ identifies the error type without revealing $|\psi\rangle$, because the measurements commute with the logical operators (by the definition of the code space). This is the key insight: error location information is encoded in the commutation relations with stabilizers, while the logical quantum information is encoded in the commutation relations with logical operators.

---

**Question 9.** Explain the discretization theorem (the idea that quantum error correction need only correct a discrete set of errors to protect against all errors). Why is this non-obvious and why does it work?

??? success "Answer"
    The discretization theorem (Knill-Laflamme) states that if a quantum error-correcting code can correct a discrete set of errors $\{E_k\}$ spanning all errors on up to $t$ qubits (i.e., the Pauli group on $t$ qubits), then the code can correct all physical errors (including continuous rotations, weak measurements, and correlated noise) on those qubits.

    **Why it is non-obvious:** Physical noise is continuous — a qubit might undergo a tiny rotation $e^{i\epsilon X}$ rather than a clean $X$ error. It is not obvious that correcting only discrete Pauli errors protects against such infinitesimal or partial errors.

    **Why it works:** The syndrome measurement itself discretizes the error. Measuring the syndrome of a state subjected to continuous noise $E = \sum_k c_k E_k$ (where $E_k$ are Pauli operators) projects the state into one of finitely many syndrome eigenspaces. The projection randomly selects one of the discrete Pauli errors with probability $|c_k|^2$, collapsing the continuous rotation into one of the correctable discrete cases. The error correction then applies the corresponding discrete correction. Effectively, the syndrome measurement performs quantum error discretization for free — the continuous error is converted into a discrete one by the act of syndrome extraction. This is one of the most remarkable features of quantum error correction and has no direct classical analog.

---

**Question 10.** Explain the adiabatic quantum computing model and describe how it connects to the quantum gate model through the adiabatic theorem.

??? success "Answer"
    Adiabatic quantum computing (AQC) (Farhi et al. 2000) solves optimization problems by slowly evolving a quantum system from an easy-to-prepare ground state to the ground state of a problem Hamiltonian that encodes the solution. The system evolves under:

    $$H(t) = \left(1 - \frac{t}{T}\right) H_0 + \frac{t}{T} H_f$$

    where $H_0$ is the initial Hamiltonian (e.g., $H_0 = -\sum_i X_i$, with ground state $|+\rangle^{\otimes n}$), $H_f$ is the problem Hamiltonian (e.g., an Ising model encoding the QUBO), and $T$ is the total evolution time.

    **Adiabatic theorem:** If the system starts in the ground state of $H(0)$ and evolves sufficiently slowly — specifically, if $T \gg 1/\Delta_{\min}^2$ where $\Delta_{\min}$ is the minimum spectral gap of $H(t)$ over $t \in [0,T]$ — then the system remains in the instantaneous ground state and ends in the ground state of $H_f$. Reading out the final state gives the solution.

    **Connection to gate model:** AQC is computationally equivalent to the standard gate model (Aharonov et al. 2007): any quantum gate circuit can be simulated by an adiabatic evolution and vice versa, with at most polynomial overhead. The key challenge is that $\Delta_{\min}$ can be exponentially small for NP-hard problems, requiring exponentially long evolution times — the same computational hardness shows up as a gap-closing problem. AQC does not solve NP-hard problems in polynomial time; it is a different computational model with equivalent power.

---

## Level 3 — Apply

**Question 11.** Compute the density matrix of the mixed state that is 50% $|0\rangle$ and 50% $|+\rangle$. Find its eigenvalues and determine whether it is a pure or mixed state.

??? success "Answer"
    **Density matrix:**
    $$\rho = \frac{1}{2}|0\rangle\langle 0| + \frac{1}{2}|+\rangle\langle +|$$
    $$= \frac{1}{2}\begin{pmatrix}1 & 0\\0 & 0\end{pmatrix} + \frac{1}{2}\cdot\frac{1}{2}\begin{pmatrix}1 & 1\\1 & 1\end{pmatrix} = \begin{pmatrix}3/4 & 1/4\\1/4 & 1/4\end{pmatrix}$$

    **Eigenvalues:** Solve $\det(\rho - \lambda I) = 0$:
    $$(3/4 - \lambda)(1/4 - \lambda) - 1/16 = 0$$
    $$\lambda^2 - \lambda + 3/16 - 1/16 = \lambda^2 - \lambda + 1/8 = 0$$
    $$\lambda = \frac{1 \pm \sqrt{1 - 1/2}}{2} = \frac{1 \pm 1/\sqrt{2}}{2}$$

    $\lambda_1 = \frac{1 + 1/\sqrt{2}}{2} \approx 0.854$, $\lambda_2 = \frac{1 - 1/\sqrt{2}}{2} \approx 0.146$

    **Check:** $\lambda_1 + \lambda_2 = 1$ ✓, $\lambda_1\lambda_2 = 1/8$ ✓

    **Purity:**
    $$\text{Tr}(\rho^2) = \lambda_1^2 + \lambda_2^2 = \left(\frac{1+1/\sqrt{2}}{2}\right)^2 + \left(\frac{1-1/\sqrt{2}}{2}\right)^2 = \frac{1 + 1/2 + 1 + 1/2 \cdot 2}{4} = \frac{3}{4} < 1$$

    The state is **mixed** (not a pure state).

---

**Question 12.** Apply the bit-flip channel with error probability $p = 0.1$ to the density matrix $\rho = |+\rangle\langle+| = \frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix}$. What is the output state $\mathcal{E}(\rho)$?

??? success "Answer"
    The bit-flip channel has Kraus operators $K_0 = \sqrt{0.9}\, I$ and $K_1 = \sqrt{0.1}\, X$.

    $$\mathcal{E}(\rho) = K_0 \rho K_0^\dagger + K_1 \rho K_1^\dagger = 0.9 \cdot I\rho I + 0.1 \cdot X\rho X$$

    Compute $X|+\rangle\langle+|X$:
    $$X \frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix} X = \frac{1}{2}\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}1&1\\1&1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix} = \frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix}$$

    (Note: $X|+\rangle = |+\rangle$, so $X\rho X = \rho$.)

    Therefore:
    $$\mathcal{E}(\rho) = 0.9\rho + 0.1\rho = \rho = \frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix}$$

    The $|+\rangle$ state is **unchanged** by the bit-flip channel. This makes sense: $|+\rangle$ is the $+1$ eigenstate of $X$, so applying $X$ leaves it invariant. The bit-flip channel does not dephase $|+\rangle$ — it is immune to $X$ errors but not to $Z$ errors (phase-flip channel would destroy it).

---

**Question 13.** Apply the three-qubit bit-flip code to encode the logical state $|0_L\rangle = |000\rangle$ and demonstrate that it can detect and correct a single bit-flip error on qubit 2.

??? success "Answer"
    **Code:**
    - Logical $|0_L\rangle = |000\rangle$, logical $|1_L\rangle = |111\rangle$
    - Encoded state: $|\bar{\psi}\rangle = \alpha|000\rangle + \beta|111\rangle$

    **Error:** Bit flip on qubit 2: $X_2|\bar{\psi}\rangle = \alpha|010\rangle + \beta|101\rangle$

    **Syndrome measurement:**
    - Stabilizer $g_1 = Z_1 Z_2$: measures the parity of qubits 1 and 2
      - For $|010\rangle$: $Z_1 Z_2|010\rangle = (+1)(-1)|010\rangle = -|010\rangle$ → outcome $-1$ (syndrome bit 1)
      - For $|101\rangle$: $Z_1 Z_2|101\rangle = (-1)(+1)|101\rangle = -|101\rangle$ → outcome $-1$ (syndrome bit 1)
      - So $g_1$ gives outcome $-1$ with certainty
    - Stabilizer $g_2 = Z_2 Z_3$: measures the parity of qubits 2 and 3
      - For $|010\rangle$: $(-1)(+1) = -1$ → outcome $-1$ (syndrome bit 1)
      - For $|101\rangle$: $(+1)(-1) = -1$ → outcome $-1$ (syndrome bit 1)

    **Syndrome table:**
    | Syndrome $(s_1, s_2)$ | Error |
    |---|---|
    | $(+1,+1)$ | No error |
    | $(-1,+1)$ | $X_1$ |
    | $(-1,-1)$ | $X_2$ |
    | $(+1,-1)$ | $X_3$ |

    Syndrome $(-1,-1)$ correctly identifies $X_2$. Apply $X_2$ correction:
    $$X_2(\alpha|010\rangle + \beta|101\rangle) = \alpha|000\rangle + \beta|111\rangle = |\bar{\psi}\rangle \checkmark$$

---

**Question 14.** Map the following QUBO problem to an Ising Hamiltonian: $\min_{x_1,x_2 \in \{0,1\}} 2x_1 + 3x_2 - 4x_1 x_2$. Write the corresponding Ising Hamiltonian and identify the ground state.

??? success "Answer"
    **QUBO to Ising substitution:** Replace $x_i = (1 - s_i)/2$ where $s_i \in \{-1, +1\}$ (equivalently, $s_i = 1 - 2x_i$).

    **Substitution:**
    - $x_1 = (1-s_1)/2$, $x_2 = (1-s_2)/2$
    - $x_1 x_2 = (1-s_1)(1-s_2)/4 = (1 - s_1 - s_2 + s_1 s_2)/4$

    **Expanded QUBO:**
    $$E = 2\cdot\frac{1-s_1}{2} + 3\cdot\frac{1-s_2}{2} - 4\cdot\frac{1-s_1-s_2+s_1s_2}{4}$$
    $$= (1 - s_1) + \frac{3}{2}(1-s_2) - (1 - s_1 - s_2 + s_1 s_2)$$
    $$= 1 - s_1 + \frac{3}{2} - \frac{3}{2}s_2 - 1 + s_1 + s_2 - s_1 s_2$$
    $$= \frac{3}{2} - \frac{1}{2}s_2 - s_1 s_2$$

    **Ising Hamiltonian:**
    $$H_{Ising} = -s_1 s_2 - \frac{1}{2}s_2 + \text{const}$$

    Dropping constants (irrelevant for ground state): $H_{Ising} = -J_{12}s_1 s_2 - h_2 s_2$ with $J_{12} = 1$, $h_2 = 1/2$.

    **Ground state:** Enumerate $2^2 = 4$ configurations:
    | $x_1, x_2$ | QUBO value | $(s_1, s_2)$ | Ising value |
    |---|---|---|---|
    | 0,0 | 0 | $(+1,+1)$ | $-1 - 1/2 = -3/2$ |
    | 1,0 | 2 | $(-1,+1)$ | $+1 - 1/2 = +1/2$ |
    | 0,1 | 3 | $(+1,-1)$ | $+1 + 1/2 = +3/2$ |
    | 1,1 | 1 | $(-1,-1)$ | $-1 + 1/2 = -1/2$ |

    Ground state: $(x_1, x_2) = (0, 0)$ with QUBO value 0, corresponding to Ising ground state $(s_1, s_2) = (+1, +1)$ with energy $-3/2$.

---

**Question 15.** Compute the von Neumann entropy of the reduced density matrix of qubit $A$ when the joint system is in the Bell state $|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$.

??? success "Answer"
    **Step 1 — Compute $\rho_{AB}$:**
    $$\rho_{AB} = |\Phi^+\rangle\langle\Phi^+| = \frac{1}{2}\begin{pmatrix}1\\0\\0\\1\end{pmatrix}(1,0,0,1) = \frac{1}{2}\begin{pmatrix}1&0&0&1\\0&0&0&0\\0&0&0&0\\1&0&0&1\end{pmatrix}$$

    **Step 2 — Partial trace over $B$:**
    $$\rho_A = \text{Tr}_B(\rho_{AB}) = \langle 0|_B \rho_{AB} |0\rangle_B + \langle 1|_B \rho_{AB} |1\rangle_B$$
    $$= \frac{1}{2}|0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1| = \frac{1}{2}\begin{pmatrix}1&0\\0&1\end{pmatrix} = \frac{I}{2}$$

    **Step 3 — Von Neumann entropy:**
    Eigenvalues of $\rho_A = I/2$: both equal $1/2$.
    $$S(\rho_A) = -\frac{1}{2}\log_2\frac{1}{2} - \frac{1}{2}\log_2\frac{1}{2} = -2 \cdot \frac{1}{2}(-1) = \mathbf{1 \text{ bit}}$$

    The von Neumann entropy of the reduced state equals 1 ebit — the maximum for a qubit. This is a signature of maximal entanglement: the subsystem of a maximally entangled pure state is maximally mixed. In general, $S(\rho_A) = S(\rho_B)$ for any pure state $|\Psi_{AB}\rangle$, and this common value is the entanglement entropy, quantifying the entanglement of $|\Psi_{AB}\rangle$.

---

## Level 4 — Analyze

**Question 16.** Analyze the depolarizing channel: what does it do to the Bloch vector, and why is it the most "symmetric" quantum noise model?

??? success "Answer"
    The depolarizing channel with error rate $p$ acts on a qubit as:

    $$\mathcal{E}_{dep}(\rho) = (1-p)\rho + \frac{p}{3}(X\rho X + Y\rho Y + Z\rho Z)$$

    Using the Bloch vector representation $\rho = (I + \vec{r} \cdot \vec{\sigma})/2$ where $\vec{r} = (r_x, r_y, r_z)$:

    After applying the channel: $\mathcal{E}_{dep}(\rho) = \frac{I + (1 - 4p/3)\vec{r} \cdot \vec{\sigma}}{2}$

    The Bloch vector shrinks isotropically: $\vec{r} \to (1 - 4p/3)\vec{r}$. All three components are contracted by the same factor, preserving the direction but reducing the magnitude. At $p = 3/4$: $\vec{r} \to 0$, giving the maximally mixed state regardless of input.

    **Why it is the most symmetric noise model:** The depolarizing channel is invariant under all unitary rotations $U$: $U\mathcal{E}_{dep}(\rho)U^\dagger = \mathcal{E}_{dep}(U\rho U^\dagger)$. This is because the three Pauli operators form a complete basis for traceless Hermitian operators, and applying each with equal probability $p/3$ is equivalent to a rotationally symmetric mixture. No direction on the Bloch sphere is preferred — the channel has the full $SU(2)$ symmetry of the qubit. This makes it the quantum analog of a symmetric classical binary symmetric channel, and it is the most common model used in threshold calculations for quantum error correcting codes.

---

**Question 17.** Analyze the three-qubit bit-flip code's ability to correct errors. What errors can it correct, what errors can it detect but not correct, and what errors defeat it entirely?

??? success "Answer"
    The three-qubit bit-flip code $|0_L\rangle = |000\rangle$, $|1_L\rangle = |111\rangle$ has distance $d = 3$, encoding 1 logical qubit in 3 physical qubits.

    **Correctable errors (weight ≤ 1 bit-flip errors):**
    - No error: $I \otimes I \otimes I$
    - Single $X$ errors: $X_1$, $X_2$, $X_3$

    The code can correct any single bit-flip on any of the three qubits. Since 4 syndromes uniquely identify these 4 error patterns, correction is unambiguous.

    **Detectable but not correctable errors (weight 2 bit-flip errors):**
    - $X_1 X_2$, $X_1 X_3$, $X_2 X_3$: these produce syndromes that indicate errors, but the syndrome is the same as a single error on the uncorrupted qubit (by syndrome ambiguity). If the correction algorithm assumes at most 1 error and a weight-2 error occurs, it applies the wrong correction, introducing a logical $X$ error. The code can detect these (syndrome is non-trivial) but the correction would be wrong.

    **Undetectable (logical) errors:**
    - $X_1 X_2 X_3$ (weight 3): maps $|000\rangle \to |111\rangle$ and $|111\rangle \to |000\rangle$, implementing a logical $X_L$ error. The syndrome is trivial (all stabilizers are satisfied), so this error is indistinguishable from the identity — it is undetectable and incorrectable.

    **Phase errors:**
    The code provides no protection against $Z$ errors. A single $Z_1$ maps $|000\rangle \to |000\rangle$ and $|111\rangle \to -|111\rangle$, implementing a logical $Z_L$ error, which the code cannot detect because $Z$ commutes with all stabilizers $\{Z_1Z_2, Z_2Z_3\}$.

---

**Question 18.** Analyze the relationship between the spectral gap of the adiabatic Hamiltonian and the required computation time. Why does this make quantum annealing ineffective for worst-case NP-hard instances?

??? success "Answer"
    The adiabatic theorem requires evolution time $T = O(1/\Delta_{\min}^2)$ where $\Delta_{\min} = \min_{t\in[0,T]} [E_1(t) - E_0(t)]$ is the minimum spectral gap between the ground state and first excited state during the evolution. If the gap closes exponentially — $\Delta_{\min} = e^{-cn}$ for problem size $n$ — then the required evolution time is $T = O(e^{2cn})$, which is exponential. This is the critical obstacle: for many NP-hard optimization problems (satisfiability, graph coloring, certain QUBO instances), the spectral gap along any adiabatic path between $H_0$ and $H_f$ closes exponentially in the worst case. This is consistent with computational complexity: if adiabatic quantum computing could solve NP-hard problems in polynomial time, it would imply $P = NP$ or $BQP \supseteq NP$, both strongly believed to be false. D-Wave quantum annealing exacerbates this issue by running at finite temperature and using a fixed annealing schedule that may not satisfy the adiabatic condition for hard instances. Annealing can find approximate or heuristic solutions quickly for many practical instances (where the gap is not worst-case), but it provides no polynomial-time worst-case guarantee for NP-hard problems. The spectral gap analysis thus explains both the theoretical limitation and the observed empirical performance of quantum annealers.

---

**Question 19.** Analyze the role of the Bloch vector representation in understanding decoherence. How do the $T_1$ and $T_2$ times relate to the Bloch vector, and what distinguishes them physically?

??? success "Answer"
    The Bloch vector $\vec{r} = (\langle X \rangle, \langle Y \rangle, \langle Z \rangle)$ provides a complete description of a single qubit's state. In the presence of decoherence, the Bloch vector components decay:

    $$r_z(t) = r_z(0)e^{-t/T_1} + r_{z,eq}(1 - e^{-t/T_1})$$
    $$r_x(t) = r_x(0)e^{-t/T_2}, \quad r_y(t) = r_y(0)e^{-t/T_2}$$

    **$T_1$ (longitudinal/energy relaxation time):** Governs the decay of the $z$-component toward thermal equilibrium. Physically, $T_1$ captures energy exchange between the qubit and its environment — the qubit emits (or absorbs) a quantum of energy, causing $|1\rangle \to |0\rangle$ transitions (or vice versa at finite temperature). $T_1$ determines how long population information is retained.

    **$T_2$ (transverse/dephasing time):** Governs decay of the equatorial ($x$-$y$) components — the loss of phase coherence. $T_2$ combines two mechanisms: $T_2 = (2T_1)^{-1} + T_\phi^{-1}$)^{-1}, where $T_\phi$ is the "pure dephasing" time from random phase kicks (low-frequency noise, charge fluctuations, magnetic noise) without energy exchange. $T_2 \leq 2T_1$ always (energy relaxation necessarily causes dephasing). Physically: $T_2$ destroys quantum interference, causing superposition states $|+\rangle \to$ mixed state $I/2$. For quantum computing, $T_2$ is typically the more stringent constraint because qubit operations require maintained coherence and $T_2 \leq 2T_1$.

---

**Question 20.** Analyze the limitations of D-Wave quantum annealing compared to fault-tolerant gate-based quantum computing. Under what conditions might a quantum annealer outperform a classical computer?

??? success "Answer"
    **Fundamental limitations of quantum annealing (D-Wave):**

    1. **No error correction:** D-Wave operates with thousands of noisy physical qubits without quantum error correction. At operating temperature (~15 mK), residual thermal fluctuations and control errors corrupt the annealing process for long or complex problems. The "quantum" nature of the speedup is therefore limited to regimes where the system maintains quantum coherence.

    2. **Limited connectivity:** D-Wave's Pegasus graph has limited qubit connectivity (degree 15). Embedding an arbitrary $n$-variable QUBO requires multiple physical qubits per logical variable (embedding overhead), reducing the effective problem size to $\sim n_{physical}/5$.

    3. **Fixed annealing schedule:** The annealing schedule $H(t)$ is smooth and fixed (though programmable in recent versions). For problems with exponentially small gaps, no fixed schedule achieves adiabatic evolution. Reverse annealing and pause-quench protocols provide partial flexibility.

    4. **Analog control errors:** The $J_{ij}$ coupling strengths and $h_i$ biases have finite precision ($\pm 1$–5%), introducing effective noise in the problem Hamiltonian.

    **Conditions for potential advantage over classical computers:**
    - **Structured optimization problems** where the energy landscape has an exponential number of local minima that trap classical simulated annealing, but quantum tunneling can traverse thin barriers between them
    - **Dense, low-connectivity graphs** native to the D-Wave architecture (avoiding embedding overhead)
    - **Specific real-world instances** (traffic optimization, financial portfolio, drug target identification) where empirical quantum annealing outperforms Tabu search or simulated annealing on available hardware

    **Honest assessment:** Despite two decades of research and numerous benchmarking studies, no definitive evidence of quantum advantage over classical optimization heuristics has been demonstrated on D-Wave hardware. Classical algorithms (tensor networks, simulated annealing, branch-and-bound) consistently match or outperform D-Wave on the problem sizes accessible to both. The debate remains active, with quantum advantage potentially emerging for larger, more structured problems as hardware scales.

---

## Level 5 — Evaluate

**Question 21.** Evaluate the claim that the three-qubit bit-flip code is a useful practical quantum error-correcting code. What does it protect against, and what does it fail to protect against?

??? success "Answer"
    The three-qubit bit-flip code is pedagogically essential but practically insufficient as a standalone error-correcting code. Its strengths: it perfectly corrects any single bit-flip ($X$) error on one of three physical qubits, consumes minimal overhead (only 3 physical qubits per logical qubit), and introduces the key concepts of stabilizer measurement and syndrome extraction. For a quantum channel where only $X$ errors occur (a bit-flip channel), it provides exactly the protection needed.

    However, it fails in every physically realistic noise model. Real quantum errors are not restricted to $X$ errors: phase errors ($Z$), depolarizing errors ($XYZ$ equally likely), and amplitude damping all affect the $z$-basis coherences that the code does not protect. A single $Z$ error on any qubit is a logical $Z_L$ error that this code cannot detect or correct. The Shor code (9 qubits) combines the bit-flip code with a phase-flip code (its dual) to correct both, and CSS codes generalize this to correct both errors simultaneously. Furthermore, the three-qubit code offers no protection against correlated errors or errors during syndrome measurement. For fault-tolerant computing, the surface code (distance 3 version requires 9 physical qubits per logical qubit) protects against both $X$ and $Z$ errors with the same hardware overhead as the Shor code but with a much more practical syndrome measurement geometry. The three-qubit bit-flip code's value is entirely conceptual — it should be viewed as the first step in a hierarchy of codes, not as a deployable solution.

---

**Question 22.** Evaluate the prospects and limitations of adiabatic quantum computing / quantum annealing as a path to quantum advantage. Compare it to the fault-tolerant gate model.

??? success "Answer"
    **Potential of adiabatic/annealing quantum computing:**
    - The model is computationally equivalent to the gate model in principle (polynomial overhead both ways), meaning any quantum speedup achievable by gates is in principle achievable adiabatically
    - For certain structured optimization problems with polynomial spectral gaps, adiabatic evolution can find solutions in polynomial time where classical simulated annealing requires exponential time
    - Quantum tunneling may allow faster escape from local optima in complex energy landscapes than thermal hopping in classical annealing, though evidence is contested
    - Hardware implementation is arguably simpler than fault-tolerant gate computers: D-Wave operates at 15 mK with 5000+ physical qubits today, while fault-tolerant gate computers have demonstrated only ~50–1000 logical operations

    **Fundamental limitations:**
    - No error correction means noise accumulates without bound for long anneal times, limiting the depth of effective quantum computation to short coherence windows
    - The equivalence to the gate model requires error correction in the adiabatic model too — without it, the polynomial equivalence does not imply equivalent computational power in practice
    - Problem encoding requires translating arbitrary problems to Ising/QUBO, often with significant overhead and precision requirements that exceed hardware capabilities
    - No provable quantum speedup has been demonstrated on any practically relevant problem

    **Comparison to fault-tolerant gate model:**
    The fault-tolerant gate model has a clear theoretical foundation: proven speedups (Shor, Grover), well-understood error thresholds, and a roadmap from current hardware to useful applications. Quantum annealing has a more ambiguous status: potentially useful as a heuristic optimizer for certain near-term applications, but with no clear path to provable, general quantum advantage. For algorithm development, the gate model is the correct framework; for near-term practical optimization, quantum annealing deserves continued empirical investigation.

---

**Question 23.** Evaluate the completeness of the Kraus representation theorem as a model of open quantum system dynamics. What physical assumptions does it require, and when does it break down?

??? success "Answer"
    The Kraus representation theorem states that any completely positive trace-preserving (CPTP) map can be written as $\mathcal{E}(\rho) = \sum_k K_k \rho K_k^\dagger$ with $\sum_k K_k^\dagger K_k = I$. This is one of the fundamental results of quantum information theory, and within its domain of applicability it is complete: every physically realizable quantum channel (including any possible interaction with an environment) has a Kraus decomposition.

    **Physical assumptions:**
    1. **Markovian dynamics:** The environment has no memory — the state of the system at time $t+dt$ depends only on its state at time $t$, not on earlier times. This is the quantum analog of the Markov assumption. It is valid when the environment correlation time is much shorter than the system's dynamical timescale.
    2. **Initial product state:** The system and environment start in a product state $\rho_S \otimes \rho_E$. If they are initially entangled (which can occur in practice after previous interactions), the Kraus decomposition may not exist for all initial system states, or the map may not be completely positive.
    3. **Fixed environment state:** The environment is typically assumed to be in a fixed state (e.g., thermal equilibrium) that is not significantly disturbed by the system.

    **When it breaks down:**
    - **Non-Markovian noise:** In superconducting qubits, $1/f$ charge noise and flux noise have long correlation times comparable to gate times — the environment has memory and the Lindblad (Kraus) framework is quantitatively inaccurate. The Nakajima-Zwanzig equation provides a more general framework.
    - **Initially entangled system-environment:** For qubits previously used in computations (without full reset), the Kraus map description may not accurately capture the dynamics.
    - **Coherent back-action:** In strong system-environment coupling regimes, energy flows back from the environment to the system (non-Markovian revival), which the static Kraus channel cannot capture.

---

**Question 24.** Evaluate the role of von Neumann entropy in quantum information theory. What are three distinct settings where it serves as a meaningful measure, and where does it fail to capture the relevant information?

??? success "Answer"
    **Three settings where $S(\rho)$ is meaningful:**

    1. **Entanglement measure (bipartite pure states):** For a bipartite pure state $|\Psi_{AB}\rangle$, the entanglement entropy $S(\rho_A) = S(\rho_B) = -\text{Tr}(\rho_A \log \rho_A)$ is the unique measure of entanglement (unique given certain axioms: additivity, continuity, normalization). It equals the number of ebits of entanglement in $|\Psi_{AB}\rangle$ — the optimal rate of Bell pair conversion under local operations and classical communication.

    2. **Quantum channel capacity:** The quantum channel capacity $Q$ of a quantum channel $\mathcal{N}$ is related to the coherent information $I_c = S(\mathcal{N}(\rho)) - S_{AB}(\mathcal{N})$, where $S(\mathcal{N}(\rho))$ is the output entropy. The hashing inequality bounds $Q \geq I_c$, and for degradable channels $Q = \max_\rho I_c(\rho, \mathcal{N})$.

    3. **Thermodynamics of quantum systems:** In quantum statistical mechanics, $S(\rho) = -k_B \text{Tr}(\rho \log \rho)/\ln 2$ is the thermodynamic entropy of a quantum system in state $\rho$. It quantifies the heat exchanged in Landauer erasure: erasing 1 qubit of information requires work $k_B T \ln 2 \cdot S(\rho)$.

    **Where von Neumann entropy fails:**
    - **Mixed state entanglement:** For mixed bipartite states $\rho_{AB}$, $S(\rho_A)$ does not correctly quantify entanglement — a separable mixed state can have $S(\rho_A) > 0$ due to classical correlations. Correct mixed-state entanglement measures (entanglement of formation, distillable entanglement) are harder to compute and do not generally equal $S(\rho_A)$.
    - **Multi-party entanglement:** For three or more parties, von Neumann entropy on any subsystem cannot distinguish the GHZ state from the W state — different entanglement structures may have the same reduced state entropies.

---

**Question 25.** Evaluate the importance of the discretization theorem for practical quantum error correction. Without it, would fault-tolerant quantum computing be feasible?

??? success "Answer"
    The discretization theorem is arguably the single most enabling result for the practical feasibility of fault-tolerant quantum computing. Without it, quantum error correction would face a seemingly insurmountable obstacle: physical noise is continuous — every physical gate implements a slightly wrong unitary, every qubit undergoes a tiny unwanted rotation. If error correction required detecting and correcting continuous errors, the classical description of possible errors would be infinite-dimensional, and the syndrome measurement would need to distinguish infinitely many error types.

    The discretization theorem resolves this by showing that measuring the syndrome of a stabilizer code inherently projects the continuous error onto a discrete set of Pauli operators. The syndrome measurement itself performs "quantum error discretization" automatically, without requiring any special engineering. This means that engineers only need to worry about the probability of error, not about characterizing its continuous nature: if a gate applies $e^{i\epsilon X}$ instead of $I$, the syndrome measurement projects this into a "no error" outcome (with probability $\cos^2\epsilon \approx 1 - \epsilon^2$) or an "$X$ error" outcome (with probability $\sin^2\epsilon \approx \epsilon^2$). The small-angle rotation behaves exactly like a probabilistic discrete Pauli error. Without discretization, fault-tolerant computing would require tracking the exact analog error, which would itself require infinite classical resources. The theorem is what makes the threshold theorem possible: the threshold is a statement about a discrete error probability, not about a continuous error model. Fault-tolerant computing as currently understood is entirely predicated on this result.

---

## Level 6 — Create

**Question 26.** Design a quantum error-correcting code that can correct both a single $X$ error and a single $Z$ error (i.e., a distance-3 CSS code) using the minimum number of physical qubits. Specify the stabilizers, logical operators, and encoding circuit.

??? success "Answer"
    **The Steane $[[7,1,3]]$ CSS code** is the smallest distance-3 CSS code correcting both $X$ and $Z$ errors. However, the minimal distance-3 code correcting both $X$ and $Z$ errors is the **$[[5,1,3]]$ code** (perfect code), which uses only 5 physical qubits.

    **$[[5,1,3]]$ code stabilizers (4 generators for 5-1=4 stabilizer degrees of freedom):**
    $$g_1 = XZZXI, \quad g_2 = IXZZX, \quad g_3 = XIXZZ, \quad g_4 = ZXIXZ$$

    (using the notation $A_1A_2A_3A_4A_5$ for single-qubit operators on qubits 1–5)

    **Logical operators:**
    $$\bar{X} = XXXXX, \quad \bar{Z} = ZZZZZ$$

    These commute with all stabilizers and anti-commute with each other.

    **Code space:** The code space is the $+1$ eigenspace of all four stabilizers. The two codewords are:
    $$|0_L\rangle \propto \sum_{g \in \mathcal{S}} g|00000\rangle, \quad |1_L\rangle = \bar{X}|0_L\rangle$$

    **Encoding circuit** (from $|\psi\rangle|0000\rangle$):
    1. Apply $H$ to qubit 1
    2. Apply sequence of CNOTs to spread the encoding: $CNOT_{1\to 2}$, $CNOT_{1\to 3}$
    3. Apply additional stabilizer-generating gates to satisfy all four stabilizer conditions
    The full encoding requires $O(n) = O(5)$ CNOT gates; exact sequence depends on stabilizer tableau compilation.

    **Error correction:** All single-qubit $X$, $Y$, $Z$ errors on any of the 5 qubits produce unique 4-bit syndromes (there are $3\times5 = 15$ non-trivial single-qubit Pauli errors, and $2^4 = 16$ possible syndromes, leaving 1 for the identity — exactly sufficient). This is the perfect code with no wasted syndrome space.

---

**Question 27.** Design a quantum circuit that implements a noise characterization protocol (randomized benchmarking) to estimate the average error per gate on a single qubit. Specify the circuit structure, the classical data analysis, and how to extract $T_1$, $T_2$, and average gate fidelity from the results.

??? success "Answer"
    **Randomized Benchmarking (RB) protocol:**

    **Goal:** Estimate the average Clifford gate fidelity without full process tomography.

    **Circuit structure:**

    For each sequence length $m \in \{1, 2, 5, 10, 20, 50, 100, 200\}$:
    1. Prepare qubit in $|0\rangle$
    2. Sample $m$ random Clifford gates $C_1, C_2, \ldots, C_m$ uniformly from the single-qubit Clifford group (24 elements)
    3. Compute the inverse: $C_{inv} = (C_m \cdots C_1)^{-1}$ (a single Clifford gate)
    4. Apply $C_1, C_2, \ldots, C_m, C_{inv}$ to the qubit
    5. Measure in the $Z$ basis; record outcome (0 or 1)

    Repeat steps for $K = 50$–100 random sequences per length $m$.

    **Classical data analysis:**

    Compute the average survival probability $P(m) = \Pr[\text{measure } 0 | \text{circuit of length }m]$.

    Fit the model:
    $$P(m) = A \cdot p^m + B$$

    where $A$ and $B$ are state preparation/measurement (SPAM) error parameters and $p$ is the depolarizing parameter.

    **Average error per Clifford gate:**
    $$r = \frac{d-1}{d}(1-p) = \frac{1}{2}(1-p) \quad \text{(for } d=2 \text{ qubit)}$$

    **Average gate fidelity:** $F_{avg} = 1 - r$.

    **Extracting $T_1$ and $T_2$:**

    RB alone does not separate $T_1$ from $T_2$. Separate experiments:

    - **$T_1$ measurement:** Prepare $|1\rangle$, wait time $\tau$, measure $P(|1\rangle|\tau) = e^{-\tau/T_1}$. Fit exponential decay.
    - **$T_2^*$ measurement (Ramsey):** Prepare $|+\rangle$ ($H|0\rangle$), wait $\tau$, apply $H$, measure. Fit $P(|0\rangle|\tau) = \frac{1}{2}(1 + e^{-\tau/T_2^*}\cos(\delta\omega\tau))$ where $\delta\omega$ is detuning.
    - **$T_2$ (Hahn echo):** Same as Ramsey but with a $\pi$ pulse at $\tau/2$ to refocus slow noise.

    **Cross-validation:** The gate error from RB should satisfy $r \approx \frac{1}{2}\left(\frac{t_{gate}}{T_1} + \frac{t_{gate}}{T_2}\right)$ where $t_{gate}$ is the gate time, providing a consistency check between RB and $T_1$/$T_2$ measurements. Discrepancies indicate coherent (unitary) errors not captured by the depolarizing model.

---

**Question 28.** Design a QUBO formulation for the Maximum Independent Set (MIS) problem on a graph $G = (V, E)$. Derive the Ising Hamiltonian, specify the penalty coefficient, and describe how to map this problem to D-Wave's Chimera/Pegasus connectivity graph.

??? success "Answer"
    **MIS problem:** Find the largest subset $S \subseteq V$ such that no two vertices in $S$ are adjacent (no edge connects two selected vertices).

    **QUBO formulation:**

    Binary variable: $x_i = 1$ if vertex $i$ is in the independent set, 0 otherwise.

    **Objective (maximize number of selected vertices):**
    $$\max \sum_i x_i \quad \Leftrightarrow \quad \min -\sum_i x_i$$

    **Constraint (no two adjacent vertices selected):**
    For each edge $(i,j) \in E$: $x_i x_j = 0$ (penalty $A \cdot x_i x_j$ for each violation).

    **Combined QUBO:**
    $$\min_{x \in \{0,1\}^{|V|}} \left[ -\sum_i x_i + A\sum_{(i,j)\in E} x_i x_j \right]$$

    **Penalty coefficient:** Choose $A > 1$ (specifically, $A = 1 + \epsilon$ for any $\epsilon > 0$) ensures that adding a conflicting pair to the set always costs more than the benefit of adding one vertex. Standard choice: $A = 2$ guarantees feasible solutions are preferred.

    **Ising Hamiltonian:** Substitute $x_i = (1-s_i)/2$:

    $$H_{Ising} = -\sum_i \frac{1-s_i}{2} + A\sum_{(i,j)\in E}\frac{(1-s_i)(1-s_j)}{4}$$

    $$= \sum_i \left(\frac{A \cdot \deg(i)}{4} - \frac{1}{2}\right)s_i + \frac{A}{4}\sum_{(i,j)\in E}s_i s_j + \text{const}$$

    So: $h_i = A \cdot \deg(i)/4 - 1/2$ and $J_{ij} = A/4$ for each edge.

    **D-Wave embedding:**

    D-Wave's Pegasus graph has 5627 physical qubits with each qubit connected to at most 15 others. For a general graph $G$ with maximum degree $\Delta > 15$, direct embedding is impossible: high-degree vertices require "chains" of physical qubits coupled ferromagnetically ($J_{chain} \ll 0$) to act as a single logical qubit.

    **Embedding procedure (minor embedding):**
    1. Find a minor embedding of $G$ into the Pegasus graph: map each vertex $v$ to a chain $C_v$ of physical qubits, and each edge $(u,v)$ to a physical coupler between a qubit in $C_u$ and a qubit in $C_v$.
    2. Set chain-coupling strength: $J_{chain} = -A \cdot |E|$ (strong ferromagnetic coupling enforces chain agreement).
    3. Distribute the $h_i$ bias equally among qubits in chain $C_i$.
    4. Embedding overhead: a vertex of degree $\Delta$ requires a chain of $O(\Delta/15)$ qubits, reducing effective problem size by a factor of $\sim 5$–$10$ for typical dense graphs.

    **Practical limitation:** For dense random graphs with $|V| > 100$, embedding overhead reduces D-Wave's effective capacity to $\sim 100$–200 logical variables — competitive problem sizes are much smaller than D-Wave's raw qubit count suggests.

---

**Question 29.** Create a protocol for quantum process tomography (QPT) of a single-qubit channel using the minimum number of state preparations and measurements. Specify the input states, measurements, and the linear inversion or maximum likelihood procedure to reconstruct the Kraus operators.

??? success "Answer"
    **Protocol: Minimal single-qubit QPT**

    **Goal:** Reconstruct the process matrix $\chi$ (or equivalently the Kraus operators) of a single-qubit channel $\mathcal{E}$.

    **Theoretical basis:** Any single-qubit channel $\mathcal{E}: \rho \to \mathcal{E}(\rho)$ can be expressed in the $\chi$-matrix representation:
    $$\mathcal{E}(\rho) = \sum_{m,n} \chi_{mn} E_m \rho E_n^\dagger$$

    where $\{E_m\} = \{I, X, Y, Z\}/\sqrt{2}$ is a basis for single-qubit operators, and $\chi$ is a $4\times4$ positive semidefinite Hermitian matrix with $\text{Tr}(\chi) = 1$.

    **Input state set (minimal informationally complete):**

    Prepare 4 linearly independent input states spanning the Bloch sphere:
    $$\rho_1 = |0\rangle\langle 0|, \quad \rho_2 = |1\rangle\langle 1|, \quad \rho_3 = |+\rangle\langle +|, \quad \rho_4 = |i+\rangle\langle i+|$$

    where $|i+\rangle = (|0\rangle + i|1\rangle)/\sqrt{2}$.

    **Measurement (quantum state tomography per output):**

    For each input $\rho_j$, perform state tomography on $\mathcal{E}(\rho_j)$. This requires measuring in 3 bases:
    - $\{|0\rangle, |1\rangle\}$ (Z basis): measure $\langle Z \rangle$
    - $\{|+\rangle, |-\rangle\}$ (X basis): measure $\langle X \rangle$
    - $\{|i+\rangle, |i-\rangle\}$ (Y basis): measure $\langle Y \rangle$

    For each measurement, repeat $N = 1000$–$10000$ shots to estimate the Bloch vector of $\mathcal{E}(\rho_j)$.

    **Total measurements:** $4 \text{ inputs} \times 3 \text{ bases} \times N \text{ shots} = 12N$ experimental runs.

    **Linear inversion procedure:**

    1. From the measurement data, estimate the output Bloch vectors $(r_x^{(j)}, r_y^{(j)}, r_z^{(j)})$ for each input $\rho_j$, giving the $2\times 2$ output density matrices $\tilde{\rho}_j = (\mathcal{E}(\rho_j))_{estimated}$.

    2. Express each output as: $\tilde{\rho}_j = \sum_{mn} \chi_{mn} E_m \rho_j E_n^\dagger$

    This is a system of $4 \times 4 = 16$ linear equations in the 16 complex components of $\chi$ (reduced to 16 real parameters by Hermiticity).

    3. Solve by linear inversion: $\vec{\chi} = M^{-1}\vec{\rho}_{out}$ where $M$ is the $16\times16$ system matrix.

    **Maximum likelihood refinement:**

    Linear inversion can produce non-physical $\chi$ (not positive semidefinite) due to statistical noise. Refine using maximum likelihood estimation:

    $$\hat{\chi} = \arg\max_{\chi \geq 0, \text{Tr}(\chi)=1} \sum_{j,b} n_{j,b} \log P(b|\mathcal{E}_\chi, \rho_j)$$

    where $n_{j,b}$ is the observed count for input $j$, basis $b$, and $P(b|\cdot)$ is the Born rule probability. This is a semidefinite programming (SDP) problem, solvable efficiently.

    **Kraus operator extraction:** Eigendecompose $\chi = V \Lambda V^\dagger$, then $K_k = \sqrt{\lambda_k} \sum_m V_{mk} E_m$ gives the Kraus operators. Operators with eigenvalue $\lambda_k < \text{noise threshold}$ are discarded.

---

**Question 30.** Design a complete hybrid quantum-classical error mitigation scheme for a 10-qubit NISQ circuit that combines zero-noise extrapolation (ZNE), probabilistic error cancellation (PEC), and post-selection. Specify the error model, the amplification strategy, the overhead analysis, and the conditions under which this scheme provides a meaningful improvement over unmitigated results.

??? success "Answer"
    **Target circuit:** 10-qubit variational circuit with 50 two-qubit (CNOT) gates and 100 single-qubit gates. Objective: estimate the expectation value $\langle O \rangle$ of a Pauli observable $O$ with reduced bias.

    **Error model assumption:**
    Depolarizing noise per two-qubit gate: $\epsilon_{2q} = 0.5\%$ (500 ppm), per single-qubit gate: $\epsilon_{1q} = 0.05\%$. Total expected error: $\approx 50 \times 0.005 + 100 \times 0.0005 = 0.25 + 0.05 = 0.30$ (30% average infidelity for deep circuits).

    **Stage 1 — Post-selection (cheapest, first):**

    If $O$ only has support on states satisfying a conserved quantity (e.g., particle number parity), discard measurement shots violating the conservation law. This removes errors that violate the symmetry without any additional circuit overhead. Typical rejection rate: 10–30% of shots; post-selection reduces error by a factor corresponding to the fraction of error events that violate the symmetry.

    **Stage 2 — Zero-Noise Extrapolation (ZNE):**

    **Noise amplification:** Amplify noise by factors $\lambda = \{1, 1.5, 2\}$ using gate folding:
    - At $\lambda = 1$: run original circuit
    - At $\lambda = 1.5$: fold 50% of CNOT gates: each selected gate $G$ is replaced by $G G^\dagger G$ (3 applications), tripling that gate's error rate
    - At $\lambda = 2$: fold all CNOT gates

    **Expectation value measurement:** Collect $N_{shots}$ for each noise level. Estimate $\langle O \rangle(\lambda)$.

    **Extrapolation:** Fit the model $\langle O \rangle(\lambda) = \langle O \rangle_0 + a\lambda + b\lambda^2$ using least squares. The zero-noise extrapolant is $\hat{\langle O \rangle}_0 = \langle O \rangle(\lambda=0)$ from the fit.

    **ZNE overhead:** $3\times$ more shots for 3 noise levels. Circuit depth increases by up to $3\times$ for fully folded circuits.

    **Stage 3 — Probabilistic Error Cancellation (PEC):**

    PEC provides unbiased estimation by importance sampling from a quasi-probability distribution that inverts the error channel.

    **Setup:** Characterize each CNOT's error channel $\mathcal{E}_{gate}$ via gate set tomography. Express the inverse: $\mathcal{E}_{gate}^{-1}(\cdot) = \sum_i \eta_i \mathcal{O}_i(\cdot)$ where $\mathcal{O}_i$ are implementable operations and $\eta_i$ are real coefficients (some negative). The 1-norm $\gamma = \sum_i |\eta_i|$ is the overhead cost.

    **Sampling:** In each shot, for each gate, sample an operation $\mathcal{O}_i$ with probability $|\eta_i|/\gamma$ and record sign $\text{sgn}(\eta_i)$. Multiply the measurement outcome by the product of all signs times $\gamma^{N_{gates}}$.

    **Overhead:** The sampling overhead to achieve bias-corrected estimation with variance $\sigma^2$ is $\gamma^{2N_{gates}}$ times the unmitigated shot count. For 50 CNOT gates with $\gamma \approx 1.01$ (1% error): $\gamma^{100} = (1.01)^{100} \approx 2.7$. For $\epsilon_{2q} = 0.5\%$: $\gamma \approx 1.01$, overhead $\approx 2.7\times$.

    **Combined scheme (in order):**
    1. Post-selection: reduces error, minimal overhead
    2. ZNE: $3\times$ shot overhead, extrapolates remaining bias
    3. PEC (if further bias reduction needed): $\sim 3\times$ additional overhead

    **Total overhead:** $\sim 10\times$ shot overhead vs. unmitigated.

    **Conditions for meaningful improvement:**
    - $\epsilon_{2q} < 1\%$ (PEC overhead must be $< 10\times$; above 1% error, PEC overhead becomes exponential)
    - Observable $O$ has non-trivial unmitigated error ($\langle O \rangle_{mitigated} - \langle O \rangle_{unmitigated} > 2\sigma_{statistical}$)
    - The noise is well-characterized and predominantly incoherent (depolarizing); coherent errors require different mitigation strategies
    - The circuit is shallow enough that mitigated error is smaller than the target precision: mitigation reduces bias but does not eliminate it entirely; residual error is $O(\epsilon^{k+1})$ for $k$-th order ZNE

    **When this scheme fails:**
    - Deep circuits ($> 100$ CNOT gates): PEC overhead $\gamma^{2N} > 100\times$, making it impractical
    - $1/f$ noise (non-Markovian): ZNE extrapolation model is wrong; amplifying noise changes its character
    - Limited shot budget: all three techniques trade shots for bias reduction; with $< 10,000$ total shots, statistical errors dominate over the bias being corrected
