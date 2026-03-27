# Chapter 4 Quiz: Quantum Algorithms

Test your understanding of quantum algorithms, complexity theory, post-quantum cryptography, and NISQ-era algorithms.

---

## Level 1 — Remember

**Question 1.** What is the time complexity of Grover's algorithm for searching an unsorted database of $N$ items?

??? success "Answer"
    Grover's algorithm solves the unstructured search problem in $O(\sqrt{N})$ oracle queries, compared to $O(N)$ for the best classical algorithm. More precisely, it requires $\frac{\pi}{4}\sqrt{N}$ iterations of the Grover diffusion operator to find a marked item with high probability. This quadratic speedup is optimal — the BBBV theorem proves no quantum algorithm can do better than $\Omega(\sqrt{N})$ queries for unstructured search.

---

**Question 2.** What does BQP stand for, and what is its informal definition?

??? success "Answer"
    BQP stands for Bounded-error Quantum Polynomial time. It is the class of decision problems solvable by a quantum computer in polynomial time with error probability at most 1/3 (the bound 1/3 is conventional; it can be amplified to any constant by repetition). BQP is the quantum analog of the classical class BPP (Bounded-error Probabilistic Polynomial time). The containment $BPP \subseteq BQP \subseteq PSPACE$ is known, though the relationship between BQP and NP remains open.

---

**Question 3.** Name the three NIST post-quantum cryptography standards finalized in FIPS 203, 204, and 205, and state the hard problem underlying each.

??? success "Answer"
    - **FIPS 203 — ML-KEM** (Module-Lattice Key Encapsulation Mechanism, based on CRYSTALS-Kyber): security based on the Module Learning With Errors (MLWE) problem.
    - **FIPS 204 — ML-DSA** (Module-Lattice Digital Signature Algorithm, based on CRYSTALS-Dilithium): security based on MLWE and Module Short Integer Solution (MSIS).
    - **FIPS 205 — SLH-DSA** (Stateless Hash-based Digital Signature Algorithm, based on SPHINCS+): security based solely on the collision resistance and preimage resistance of the underlying hash function — no lattice assumptions required.

---

**Question 4.** State the gate complexity of the Quantum Fourier Transform (QFT) on $n$ qubits.

??? success "Answer"
    The QFT on $n$ qubits requires $O(n^2)$ gates: specifically, $n$ Hadamard gates and $\frac{n(n-1)}{2}$ controlled phase rotation gates $R_k = \begin{pmatrix}1&0\\0&e^{2\pi i/2^k}\end{pmatrix}$, plus $\lfloor n/2 \rfloor$ SWAP gates to reverse the output bit order. This is exponentially faster than the classical Fast Fourier Transform's $O(n \cdot 2^n)$ complexity for the same $2^n$-point transform, though the QFT output cannot be read out directly without losing the quantum speedup.

---

**Question 5.** What is the Gidney & Ekerå (2021) resource estimate for breaking RSA-2048 using a fault-tolerant quantum computer?

??? success "Answer"
    Gidney and Ekerå estimated that breaking RSA-2048 via Shor's algorithm would require approximately 20 million physical qubits (assuming a surface code with physical error rate $10^{-3}$) and roughly 8 hours of runtime. Earlier estimates had been orders of magnitude higher. By 2025, further algorithmic improvements to the modular exponentiation circuit have reduced estimates to under 1 million physical qubits for the same task, illustrating how rapidly resource estimates evolve as quantum compilation improves.

---

## Level 2 — Understand

**Question 6.** Explain how Shor's algorithm reduces the problem of integer factorization to period finding, and why this reduction is significant.

??? success "Answer"
    Shor's algorithm exploits a number-theoretic reduction: given $N$ to factor, choose a random $a$ coprime to $N$ and compute the function $f(x) = a^x \mod N$. This function is periodic with period $r$ (the multiplicative order of $a$ modulo $N$). If $r$ is even and $a^{r/2} \not\equiv -1 \pmod{N}$, then $\gcd(a^{r/2} \pm 1, N)$ yields a non-trivial factor of $N$ with high probability. The classical parts (choosing $a$, computing the GCD) are efficient on a classical computer. The hard part is finding the period $r$ of $f$, which is classically exponentially hard. The quantum subroutine solves period finding in polynomial time using the QFT, giving the overall $O((\log N)^3)$ complexity. The significance is that the hardness of factoring (which underlies RSA) is entirely concentrated in period finding — and period finding is efficiently quantum.

---

**Question 7.** Explain the concept of amplitude amplification in Grover's algorithm. How does repeated application of the Grover operator increase the probability of measuring the target state?

??? success "Answer"
    Amplitude amplification works by geometrically rotating the quantum state in the two-dimensional subspace spanned by the target state $|t\rangle$ and the uniform superposition $|s\rangle$ over all inputs. The Grover operator $G = -H^{\otimes n} O_0 H^{\otimes n} O_f$ consists of two reflections: the oracle $O_f$ reflects about the hyperplane orthogonal to $|t\rangle$ (flipping its amplitude sign), and the diffusion operator $-H^{\otimes n} O_0 H^{\otimes n}$ reflects about $|s\rangle$. Each application of $G$ rotates the state by $2\theta$ toward $|t\rangle$, where $\sin\theta = 1/\sqrt{N}$ for a single target. Starting at amplitude $1/\sqrt{N}$ for the target, after $k$ Grover iterations the amplitude is $\sin((2k+1)\theta)$. Choosing $k \approx \frac{\pi}{4}\sqrt{N}$ makes this approximately 1, so measurement yields the target with near-certainty.

---

**Question 8.** Explain the Learning With Errors (LWE) problem and describe intuitively why it is believed to be quantum-hard.

??? success "Answer"
    The Learning With Errors problem, introduced by Regev (2005), asks: given many noisy linear equations $b_i \approx \langle a_i, s \rangle \pmod{q}$ where each $b_i$ has a small random error $e_i$ added, recover the secret vector $s$. The "errors" make the equations inconsistent and destroy the structure that Gaussian elimination would exploit. LWE is believed to be hard for quantum computers because: (1) it is provably as hard as solving worst-case lattice problems (SVP/CVP) via a quantum reduction (Regev's theorem), (2) the best known quantum algorithms for lattice problems (lattice sieving) run in $2^{O(n)}$ time even with quantum speedup, (3) no subexponential quantum algorithm for LWE is known, unlike factoring and discrete log. The hardness rests on the geometry of high-dimensional lattices, which appears to resist both Grover-style and Fourier-based quantum speedups.

---

**Question 9.** Explain the difference between information-theoretic security and computational security in the context of post-quantum cryptography.

??? success "Answer"
    Computational security means a cryptosystem is secure against adversaries with bounded computational resources — they could theoretically break it given enough time, but the required time is astronomically large (e.g., $2^{128}$ operations). Classical RSA and post-quantum lattice schemes like ML-KEM are computationally secure: they are secure as long as no efficient (polynomial-time) algorithm exists for the underlying hard problem. Information-theoretic security means a system is secure even against computationally unbounded adversaries — the ciphertext simply does not contain enough information to determine the plaintext. The one-time pad and QKD (quantum key distribution) achieve information-theoretic security. Post-quantum cryptography is always computational security, because it uses mathematical hardness assumptions. A large enough quantum computer with sufficiently better lattice algorithms could in principle break PQC schemes — the hope is that no such algorithm exists, not that breaking is fundamentally impossible.

---

**Question 10.** Explain why NP is not believed to be contained in BQP, and what this implies for quantum computing's impact on NP-hard optimization problems.

??? success "Answer"
    The current state of complexity theory strongly suggests $NP \not\subseteq BQP$, though this is unproven (proving it would require proving $P \neq NP$ along the way, an open millennium problem). Evidence comes from oracle separations and the BBBV lower bound: since Grover's algorithm achieves the optimal $\Omega(\sqrt{N})$ lower bound for black-box search, and NP-complete problems like 3-SAT require checking $O(2^n)$ assignments in the worst case, Grover gives only a quadratic speedup — reducing $2^{2048}$ to $2^{1024}$, which is still infeasible. No quantum algorithm is known that solves NP-complete problems in polynomial time. The implication is that quantum computers are not general-purpose "NP oracles": they will not efficiently solve arbitrary combinatorial optimization problems. QAOA and quantum annealing may offer practical advantages for specific structured problems, but they do not provide worst-case polynomial-time solutions to NP-hard problems.

---

## Level 3 — Apply

**Question 11.** Apply the QFT circuit to a 2-qubit register initialized to $|00\rangle$. Show the state after each gate. (Use the 2-qubit QFT: $H$ on qubit 1, controlled-$R_2$ with qubit 1 target and qubit 2 control, $H$ on qubit 2, SWAP.)

??? success "Answer"
    **Input:** $|00\rangle = |0\rangle_1|0\rangle_2$

    **Step 1 — $H$ on qubit 1:**
    $$\frac{|0\rangle + |1\rangle}{\sqrt{2}}|0\rangle = \frac{|00\rangle + |10\rangle}{\sqrt{2}}$$

    **Step 2 — Controlled-$R_2$ ($R_2 = \begin{pmatrix}1&0\\0&i\end{pmatrix}$), control = qubit 2 = $|0\rangle$, target = qubit 1:**
    Control is $|0\rangle$, so $R_2$ does not apply. State unchanged: $\frac{|00\rangle + |10\rangle}{\sqrt{2}}$

    **Step 3 — $H$ on qubit 2:**
    $$\frac{|0\rangle + |1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + |1\rangle}{\sqrt{2}} = \frac{|00\rangle + |01\rangle + |10\rangle + |11\rangle}{2}$$

    **Step 4 — SWAP:** Qubits are swapped, but since both are in the same superposition the state is unchanged:
    $$\frac{|00\rangle + |01\rangle + |10\rangle + |11\rangle}{2}$$

    This is the uniform superposition over all 2-qubit states, confirming that QFT on $|0\rangle^{\otimes n}$ always produces the uniform superposition — consistent with the DFT of a delta function at 0 being a flat spectrum.

---

**Question 12.** Apply Grover's algorithm to search a 4-element database ($N=4$) with one marked element. Calculate how many Grover iterations are needed and what the success probability is after the optimal number of iterations.

??? success "Answer"
    **Setup:** $N = 4$, 1 marked element. The initial superposition has amplitude $1/2$ for each element ($2^{-n/2} = 2^{-1} = 1/2$ for $n = 2$ qubits).

    **Rotation angle:** $\sin\theta = 1/\sqrt{N} = 1/2$, so $\theta = \pi/6 = 30°$.

    **Optimal iterations:** $k = \lfloor \frac{\pi}{4\theta} \rfloor = \lfloor \frac{\pi/4}{\pi/6} \rfloor = \lfloor \frac{3}{2} \rfloor = 1$ iteration.

    **After 1 iteration:** The amplitude of the marked state is $\sin((2 \cdot 1 + 1)\theta) = \sin(3\theta) = \sin(90°) = 1$.

    **Success probability:** $|\sin(3\theta)|^2 = 1^2 = \mathbf{1.0}$ (100%).

    For $N = 4$, a single Grover iteration finds the marked element with certainty. This is a special case of "exact Grover search." Verifying: each Grover iteration rotates by $2\theta = 60°$ from initial angle $\theta = 30°$ toward $90°$, reaching exactly $90°$ after one step.

---

**Question 13.** A lattice-based key encapsulation mechanism uses a ring LWE problem with parameters $n = 256$, $q = 3329$, and Gaussian noise with standard deviation $\sigma \approx 1$. Explain what security level this corresponds to in terms of classical and quantum bit-security, and identify the NIST standard that uses these parameters.

??? success "Answer"
    These parameters precisely correspond to **CRYSTALS-Kyber (ML-KEM, FIPS 203)** at security level 1 (Kyber-512). The parameter $n = 256$ is the polynomial ring dimension, $q = 3329$ is the modulus (chosen as a prime close to $3 \cdot 2^{10}$ for efficient NTT), and the noise distribution is a centered binomial distribution with parameter $\eta = 2$ approximating a Gaussian with $\sigma \approx \sqrt{\eta/2} \approx 1$. Security level 1 targets approximately 128-bit classical security and 128-bit quantum security (i.e., the best known quantum lattice algorithms require roughly $2^{128}$ operations to break the scheme). This is equivalent to the security of AES-128. Kyber-768 (level 3) and Kyber-1024 (level 5) use $n = 768/1024$ for 192-bit and 256-bit security respectively.

---

**Question 14.** Apply the concept of quantum phase estimation to explain how Shor's algorithm uses the QFT to extract the period $r$ of $f(x) = a^x \mod N$ from a quantum register.

??? success "Answer"
    **Setup:** Prepare two registers: $\frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}|x\rangle|0\rangle$, where $n \approx 2\log_2 N$.

    **Oracle application:** Apply $U_f: |x\rangle|0\rangle \to |x\rangle|a^x \mod N\rangle$. The first register now encodes the superposition of all $x$ values; the second encodes the periodic function values.

    **Measurement of second register:** Collapsing the second register to some value $f_0 = a^{x_0} \mod N$ leaves the first register in the periodic superposition $\frac{1}{\sqrt{2^n/r}}\sum_{k} |x_0 + kr\rangle$ — a superposition over evenly spaced positions with spacing $r$.

    **QFT application:** The QFT of this comb function is another comb: $\frac{1}{\sqrt{r}}\sum_{j=0}^{r-1}|j \cdot 2^n/r\rangle$ (approximately). Measuring the first register yields a multiple of $2^n/r$.

    **Period extraction:** From several measurements, continued fraction expansion of $j/2^n$ yields rational approximations with denominator $r$. The period $r$ is recovered in $O(1)$ repetitions with high probability. The entire quantum procedure runs in $O(n^2)$ gates (dominated by the QFT), giving overall $O((\log N)^3)$ after accounting for quantum modular exponentiation.

---

**Question 15.** Apply the concept of crypto-agility to a hypothetical enterprise with 5,000 TLS endpoints currently using RSA-2048. Design a migration timeline that achieves quantum safety before a cryptographically relevant quantum computer (CRQC) is plausible, assuming the CRQC threat horizon is 10–15 years.

??? success "Answer"
    **Crypto-agility definition:** The ability to switch cryptographic algorithms with minimal disruption to applications, by abstracting algorithm choices from implementation.

    **Migration plan:**

    **Year 1 — Inventory and assessment:**
    - Audit all 5,000 endpoints: certificate authorities, key exchange mechanisms, signature schemes
    - Identify systems with long data lifetimes (critical infrastructure, medical records) — these face "harvest now, decrypt later" risk immediately
    - Prioritize migration by risk: longest-lived secrets first

    **Years 1–2 — Hybrid deployment:**
    - Deploy ML-KEM (FIPS 203) + ECDH hybrid key exchange on TLS endpoints
    - Hybrid ensures security even if ML-KEM has unforeseen weaknesses: both classic and PQC must be broken simultaneously
    - Update PKI infrastructure to support ML-DSA (FIPS 204) certificate signing

    **Years 2–4 — Full PQC rollout:**
    - Replace RSA-2048 certificates with ML-DSA or SLH-DSA signatures
    - Retire ECDH-only key exchange in favor of ML-KEM
    - Update hardware security modules (HSMs) to support PQC algorithms

    **Years 4–5 — Validation and monitoring:**
    - Conduct post-migration security audits
    - Monitor NIST for algorithm updates or advisories
    - Establish automated certificate lifecycle management supporting PQC algorithms

    **Key trade-off:** ML-KEM public keys (~800 bytes) and ciphertexts (~768 bytes) are larger than RSA-2048 (256 bytes), increasing TLS handshake sizes by ~2–3 KB. For most endpoints this is negligible; for constrained IoT devices, SLH-DSA's hash-based security may be preferred for signatures.

---

## Level 4 — Analyze

**Question 16.** Analyze why Shor's algorithm achieves an exponential speedup over the best known classical algorithms for factoring, while Grover's algorithm achieves only a quadratic speedup for search. What is the structural difference between the two problems that explains this asymmetry?

??? success "Answer"
    The asymmetry reflects a fundamental difference in problem structure. Factoring has rich algebraic structure: it reduces to period finding in the group $\mathbb{Z}_N^*$, and the QFT is perfectly matched to extracting periodicity via quantum interference — the quantum speedup is exponential precisely because the Fourier analysis exploits the hidden subgroup structure completely. The exponential speedup means going from $O(\exp(n^{1/3}))$ classical complexity (number field sieve) to $O(n^3)$ quantum complexity. Unstructured search, by contrast, has no algebraic structure to exploit. The BBBV lower bound proves that any quantum algorithm must make $\Omega(\sqrt{N})$ queries to an unstructured oracle, regardless of the quantum strategy. This is because quantum algorithms gain advantage from interference, which requires structure to constructively amplify correct answers; without structure, Grover's quadratic improvement is provably optimal. The deep lesson is that quantum advantage scales with the algebraic structure available: hidden subgroup problems (factoring, discrete log, graph isomorphism) yield exponential speedups; unstructured problems (general optimization, black-box search) yield at most polynomial speedups.

---

**Question 17.** Analyze the "harvest now, decrypt later" (HNDL) threat model. Which cryptographic systems are vulnerable to this attack, and which are not? How does this change the urgency of post-quantum migration?

??? success "Answer"
    In a HNDL attack, an adversary records encrypted ciphertext today (using current RSA or ECC-based systems) and stores it until a CRQC becomes available to decrypt it retrospectively. Vulnerable systems are those protecting data with long-term confidentiality requirements: any asymmetric key exchange (RSA, ECDH, DH) used to establish session keys. Since TLS session keys are derived from these exchanges, any TLS-protected data today could be decrypted in the future. Systems NOT vulnerable: symmetric encryption (AES-256 is secure even against Grover's $O(\sqrt{N})$ speedup — 128-bit security remains), hash functions for integrity (SHA-256 with output truncation is adequately quantum-resistant), and one-time-pad or information-theoretically secure systems. The urgency implication is critical: organizations protecting data that must remain confidential for more than 10–15 years (state secrets, medical records, long-term financial data, infrastructure control) are already under HNDL threat today, even without a CRQC in existence. Migration to ML-KEM for key exchange must happen before the CRQC, not after — every year of delay expands the window of retroactively decryptable historical communications.

---

**Question 18.** Analyze the scalability limitations of NISQ-era algorithms (VQE and QAOA) compared to fault-tolerant quantum algorithms like Shor's. What prevents NISQ algorithms from achieving the same provable speedups?

??? success "Answer"
    Fault-tolerant algorithms like Shor's operate on error-corrected logical qubits, enabling circuits of arbitrary depth with arbitrarily low error probability. The provable speedup is rigorous: the algorithm's correctness and complexity are mathematically established. NISQ algorithms like VQE (Variational Quantum Eigensolver) and QAOA (Quantum Approximate Optimization Algorithm) face fundamental scalability barriers. First, circuit depth is severely limited by decoherence: current NISQ devices tolerate roughly 100–1000 two-qubit gates before noise dominates, while useful applications may require $10^6$+ gates. Second, VQE and QAOA are heuristic: there are no known provable guarantees that their variational optimization converges to the global optimum for NP-hard problems, and barren plateau phenomena (exponentially vanishing gradients in the parameter landscape) make training increasingly difficult as problem size grows. Third, classical simulation of shallow NISQ circuits is often competitive: for small system sizes, tensor network methods and other classical heuristics can match or exceed NISQ performance without quantum hardware. The absence of error correction means that noise biases the variational landscape, potentially finding corrupted optima. NISQ algorithms may offer practical near-term utility for specific structured problems, but they lack the theoretical guarantees that make Shor's algorithm a definitive quantum advantage.

---

**Question 19.** Analyze the key size implications of transitioning from RSA-2048 to ML-KEM-768. Compare public key sizes, ciphertext sizes, and security levels, and evaluate the practical performance impact.

??? success "Answer"
    **Comparison table:**

    | Parameter | RSA-2048 | ML-KEM-768 (Kyber-768) |
    |---|---|---|
    | Public key | 256 bytes | 1,184 bytes |
    | Private key | 1,218 bytes | 2,400 bytes |
    | Ciphertext / encapsulation | 256 bytes | 1,088 bytes |
    | Classical security | 112 bits | ≥192 bits |
    | Quantum security | 0 bits (Shor breaks it) | ≥192 bits |
    | Algorithm type | Trapdoor RSA | Module LWE |

    ML-KEM-768 public keys are ~4.6× larger and ciphertexts ~4.25× larger than RSA-2048. For TLS 1.3 handshakes, this adds approximately 2–3 KB of data, which is negligible for broadband connections but relevant for: constrained IoT with limited packet sizes (e.g., CoAP over LoRa), high-frequency low-latency trading systems where handshake overhead matters, and certificate chains where multiple signatures compound. Key operations (encapsulation/decapsulation) are dramatically faster than RSA: ML-KEM-768 runs at ~100,000 operations/second on modern hardware vs. ~5,000 RSA-2048 operations/second. The net practical impact is that bandwidth is slightly increased but latency and CPU cost are actually improved, making ML-KEM-768 a practical and attractive replacement.

---

**Question 20.** Analyze the relationship between the Quantum Fourier Transform and the classical Discrete Fourier Transform. Why can the QFT not be used as a direct drop-in replacement for the FFT in classical signal processing applications?

??? success "Answer"
    The QFT computes exactly the same mathematical transformation as the DFT: it maps the $j$-th computational basis state as $|j\rangle \to \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1} e^{2\pi ijk/N}|k\rangle$, matching the DFT coefficient formula. The QFT circuit achieves this in $O(n^2)$ gates (vs. $O(n \cdot 2^n)$ for the classical FFT on $2^n = N$ points) — an exponential improvement in circuit complexity. However, the QFT cannot replace the FFT for classical signal processing for a fundamental reason: quantum measurement. To use the QFT result, one must measure the output register, which collapses the superposition to a single computational basis state, yielding only one DFT coefficient with probability proportional to its squared magnitude. Extracting all $N$ DFT coefficients would require $O(N)$ repetitions, eliminating the speedup entirely. The QFT's power is only realized when it is used as a subroutine within a larger quantum algorithm that exploits the entire superposition indirectly — as in phase estimation and period finding — without ever directly reading out all coefficients. It is a quantum interferometry tool, not a classical FFT replacement.

---

## Level 5 — Evaluate

**Question 21.** Evaluate whether post-quantum cryptography (PQC) or quantum key distribution (QKD) represents the more practical path to quantum-safe communications for enterprise networks. Consider deployment costs, scalability, and the NSA's current stance.

??? success "Answer"
    PQC is the clearly more practical path for enterprise networks, for several interconnected reasons. QKD requires dedicated quantum channels (typically specialized optical fiber or free-space optical links), quantum hardware at each endpoint (single-photon sources, detectors), and is fundamentally point-to-point — it does not scale over the internet without trusted relay nodes, each of which becomes a security vulnerability. QKD also suffers from distance limitations (~100–150 km in fiber without quantum repeaters, which remain experimental) and offers no solution for software or protocol vulnerabilities. The NSA's publicly stated position (2021 Commercial National Security Algorithm Suite 2.0 guidance) is that NSA does not recommend QKD for securing national security systems and instead mandates NIST PQC standards for key exchange and signatures. PQC, by contrast, is a software upgrade: it runs on existing internet infrastructure, scales to arbitrary numbers of endpoints, is interoperable with current protocols (TLS, SSH, S/MIME), and is deployable globally without specialized hardware. The key cost of PQC is slightly larger key and signature sizes (manageable) and retraining security engineers. QKD remains a niche solution for ultra-high-security point-to-point links (e.g., interbank connections, military installations) where the infrastructure investment is justified and information-theoretic security is specifically required.

---

**Question 22.** Evaluate the claim that "Grover's algorithm halves the security of symmetric encryption, making AES-128 insecure against quantum adversaries." Is this claim accurate? What response does it justify?

??? success "Answer"
    The claim is partially accurate but often overstated in its security implications. Grover's algorithm does reduce the effective key search complexity of AES-128 from $2^{128}$ classical operations to approximately $2^{64}$ quantum operations (though with significant constant-factor overhead). A brute-force key search using Grover's algorithm on AES-128 would require roughly $2^{64}$ quantum oracle queries, each involving a full AES evaluation — a circuit with thousands of Toffoli gates running on millions of physical fault-tolerant qubits for years of runtime. The $2^{64}$ figure is a gate-count lower bound, not a wall-clock time. At plausible fault-tolerant quantum computing speeds (~$10^6$ logical operations per second), $2^{64} \approx 1.8 \times 10^{19}$ operations would take approximately $1.8 \times 10^{13}$ seconds — over 570,000 years. This renders AES-128 practically secure for decades even post-CRQC. NIST's assessment is that AES-128 provides 64-bit quantum security (below the 128-bit target but practically infeasible), while AES-256 provides full 128-bit quantum security. The justified response is to use AES-256 for long-term high-value data to maintain a comfortable security margin, but AES-128 is not "broken" in any operationally meaningful sense.

---

**Question 23.** Evaluate the practical and theoretical significance of the BBBV lower bound for Grover's algorithm. Does it close the door on quantum speedups for NP-complete problems?

??? success "Answer"
    The BBBV theorem (Bennett, Bernstein, Brassard, Vazirani 1994) proves that any quantum algorithm making queries to an unstructured black-box oracle must make $\Omega(\sqrt{N})$ queries to find a marked item, establishing that Grover's algorithm is optimal in the black-box query model. This is theoretically significant because it sets a hard limit on quantum search without structure. However, it does not close the door on quantum speedups for NP-complete problems for an important reason: the black-box model may not capture the structure of real problem instances. NP-complete problems in practice (satisfiability, graph coloring, traveling salesman) have rich structure — they are not arbitrary black-box functions. A quantum algorithm could in principle exploit the specific algebraic or combinatorial structure of 3-SAT instances to achieve better-than-Grover performance, just as Shor's algorithm exploits the group structure of the factoring problem. The BBBV bound rules out structure-free approaches but says nothing about structure-exploiting approaches. Whether any such algorithm exists is an open question. Most complexity theorists believe $NP \not\subseteq BQP$ because no structural quantum speedup for NP-complete problems has been found despite decades of search, but the BBBV theorem alone is not the proof.

---

**Question 24.** Evaluate the readiness of the NIST PQC standards (FIPS 203/204/205) for immediate deployment. What risks remain even after standardization?

??? success "Answer"
    The NIST PQC standards represent the outcome of a rigorous 7-year competition with extensive public cryptanalysis, making them the most vetted post-quantum schemes available. ML-KEM and ML-DSA benefit from strong security reductions to Module LWE, a well-studied problem with worst-case hardness foundations. SLH-DSA relies only on hash function security, offering conservative security with minimal algebraic assumptions. The standards are ready for deployment and should be adopted now for new systems. However, significant risks remain: (1) **Cryptanalytic surprise** — lattice cryptography is relatively young (30 years) compared to RSA (50 years); a breakthrough lattice algorithm analogous to the number field sieve would be devastating. (2) **Implementation vulnerabilities** — side-channel attacks (timing, power analysis) on PQC implementations are an active research area; ML-KEM and ML-DSA implementations must be carefully hardened. (3) **Quantum cryptanalysis advances** — Grover's algorithm applied to LWE search may achieve better-than-classical speedups in specific parameter regimes; while current parameter choices have margins, continuous monitoring is required. (4) **Hybrid transition risks** — improperly implemented hybrid classical/PQC schemes may inadvertently weaken security. The NIST process was thorough, but standardization does not equal elimination of risk; ongoing cryptanalytic vigilance and crypto-agility planning remain essential.

---

**Question 25.** Evaluate the long-term viability of QAOA for solving combinatorial optimization problems at scale. What evidence exists for or against quantum advantage in this setting?

??? success "Answer"
    The long-term viability of QAOA for achieving quantum advantage in combinatorial optimization remains deeply uncertain. Evidence against quantum advantage includes: (1) Bravyi et al. (2020) proved that low-depth QAOA ($p = O(1)$ layers) cannot achieve better approximation ratios than classical algorithms for Max-3-Lin-2 on 2D grids, showing structural limitations at shallow depths. (2) The barren plateau problem means that for random QAOA instances with many qubits, gradients of the objective function become exponentially small, making training classically intractable. (3) Competitive classical heuristics (simulated annealing, tabu search, tensor network methods) continue to improve and often match reported QAOA performance for problem sizes accessible to current hardware. Evidence for potential advantage: (1) For specific structured problem families (MaxCut on certain graph classes), QAOA may achieve approximation ratios exceeding the best-known classical algorithms at high circuit depth $p$. (2) Quantum tunneling in QAOA may help escape local optima that trap classical methods for certain energy landscapes. (3) Hardware improvements (lower noise, better connectivity) may enable deeper circuits where QAOA advantages emerge. The consensus view is that QAOA is a promising research direction but has not demonstrated practical quantum advantage on classically intractable problem sizes, and whether it will is an open question.

---

## Level 6 — Create

**Question 26.** Design a complete quantum algorithm for solving a 4-city Traveling Salesman Problem (TSP) using QAOA. Specify the QUBO formulation, the corresponding Ising Hamiltonian, the circuit structure, and how the solution is decoded from measurement outcomes.

??? success "Answer"
    **QUBO Formulation:**

    Encode a tour as binary variables $x_{i,t} \in \{0,1\}$ where $x_{i,t} = 1$ means city $i$ is visited at time step $t$. For 4 cities, this requires $4 \times 4 = 16$ binary variables.

    **Objective (minimize tour length):**
    $$C_{obj} = \sum_{u,v} w_{uv} \sum_t x_{u,t} x_{v,t+1}$$

    **Constraints (each city visited exactly once, each time step exactly one city):**
    $$C_{constraint} = A \sum_i \left(1 - \sum_t x_{i,t}\right)^2 + A \sum_t \left(1 - \sum_i x_{i,t}\right)^2$$

    where $A$ is a penalty coefficient large enough to enforce feasibility (choose $A > \max(w_{uv})$).

    **Total QUBO:** $Q = C_{obj} + C_{constraint}$.

    **Ising Hamiltonian:** Map $x_{i,t} = (1 - Z_{it})/2$ to transform the QUBO into an Ising Hamiltonian $H_C = \sum_{it,jt'} J_{it,jt'} Z_{it}Z_{jt'} + \sum_{it} h_{it} Z_{it}$.

    **QAOA Circuit:**
    1. Initialize all 16 qubits in $|+\rangle^{\otimes 16}$ using $H^{\otimes 16}$
    2. For layer $k = 1, \ldots, p$:
       - **Phase operator** $U(H_C, \gamma_k) = e^{-i\gamma_k H_C}$: apply $ZZ$ rotations $R_{ZZ}(2\gamma_k J_{it,jt'})$ for each coupling and single-qubit $R_Z(2\gamma_k h_{it})$ rotations
       - **Mixer operator** $U(H_B, \beta_k) = e^{-i\beta_k H_B}$ with $H_B = -\sum_{it} X_{it}$: apply $R_X(2\beta_k)$ to each qubit
    3. Measure all qubits in the $Z$ basis

    **Parameter optimization:** Use a classical optimizer (e.g., COBYLA, BFGS) to maximize $\langle \psi(\gamma, \beta) | H_C | \psi(\gamma, \beta) \rangle$ over parameters $\{\gamma_k, \beta_k\}$.

    **Solution decoding:** Repeat circuit 1000+ times. For each bitstring, check if it satisfies constraints (exactly one city per time step, each city exactly once). Among feasible bitstrings, select the one with minimum tour length $\sum w_{uv}$. The 4-city TSP has only $4!/2 = 12$ distinct tours (due to direction symmetry), making exact classical verification straightforward for validation.

---

**Question 27.** Design a quantum algorithm that uses quantum phase estimation to determine the eigenvalues of a $4 \times 4$ Hermitian matrix. Specify the QPE circuit, the number of ancilla qubits needed for 3-bit precision, and how to extract the eigenvalues from measurement outcomes.

??? success "Answer"
    **Setup:** Given $4 \times 4$ Hermitian $H$, we want eigenvalues $\lambda_j \in [0, 2\pi)$ (rescale $H$ if needed so all eigenvalues lie in this range). QPE estimates $\lambda_j/2\pi \in [0,1)$.

    **Circuit structure:**

    **Registers:**
    - Ancilla register: $m = 3$ qubits (for 3-bit binary precision $0.b_1b_2b_3$, representing $\lambda/(2\pi)$ to precision $1/8$)
    - System register: $2$ qubits (for $4 \times 4$ matrix acting on 2-qubit space)

    **Step 1 — Prepare ancilla superposition:**
    Apply $H^{\otimes 3}$ to all 3 ancilla qubits: $|000\rangle \to \frac{1}{\sqrt{8}}\sum_{k=0}^{7}|k\rangle$

    **Step 2 — Prepare eigenstate in system register:**
    Initialize system register in an approximate eigenstate $|\psi_j\rangle$ (if known) or any state (QPE will project onto eigenstates stochastically).

    **Step 3 — Controlled-$U^{2^k}$ operations:**
    For $k = 0, 1, 2$: apply controlled-$U^{2^k}$ where $U = e^{iH}$, with ancilla qubit $k$ as control.

    Circuit: $CU^1$ (controlled by ancilla 0), $CU^2$ (controlled by ancilla 1), $CU^4$ (controlled by ancilla 2).

    **Step 4 — Inverse QFT on ancilla register:** Apply $QFT^{-1}_3$.

    **Step 5 — Measure ancilla register:** Get 3-bit outcome $b_1b_2b_3$.

    **Eigenvalue extraction:**
    The measurement outcome is the 3-bit binary representation of $\phi = \lambda_j/(2\pi)$:
    $$\lambda_j \approx 2\pi \cdot \frac{b_1 \cdot 4 + b_2 \cdot 2 + b_3 \cdot 1}{8}$$

    Example: outcome $|101\rangle = 5$ gives $\lambda_j \approx 2\pi \cdot 5/8 = 5\pi/4$.

    **Precision and repetition:** With 3 ancilla qubits, eigenvalues are resolved to precision $\Delta\lambda = 2\pi/2^3 = \pi/4$. For higher precision, add more ancilla qubits (each additional qubit doubles precision). Repeat the protocol to build a histogram; peaks correspond to distinct eigenvalues weighted by the squared overlap of the initial system state with each eigenstate.

---

**Question 28.** Design a resource estimation framework for Shor's algorithm targeting RSA-1024. Your framework should incorporate: logical qubit counts, T-gate requirements, magic state distillation overhead, and surface code physical qubit estimates. State your assumptions explicitly.

??? success "Answer"
    **Assumptions:**
    - Surface code with physical error rate $p = 10^{-3}$
    - Logical error rate target: $10^{-12}$ per logical gate (sufficient for $10^{10}$ gate circuit)
    - Surface code threshold: $p_{th} \approx 1\%$
    - Code distance $d$ needed: $p_L \approx (p/p_{th})^{(d+1)/2} \Rightarrow$ for $p_L = 10^{-12}$: $d \approx 25$
    - Physical qubits per logical qubit (surface code): $2d^2 \approx 1250$

    **Logical qubit count:**
    - Input register: $n = 1024$ qubits
    - Ancilla for QFT and modular exponentiation: $\approx 2n = 2048$ qubits
    - Workspace for modular multiplication: $\approx 5n = 5120$ qubits
    - **Total logical qubits: $\approx 8,192$**

    **T-gate count:**
    - Modular exponentiation dominates: $O(n^3)$ T-gates $\approx 10^9$ T-gates for $n = 1024$ (using optimized windowed arithmetic; Gidney-style compilation)
    - With T-count optimization (parallelism and circuit synthesis): reduce to $\approx 2 \times 10^8$ T-gates

    **Magic state distillation overhead:**
    - Each T-gate requires one magic state: $\approx 2 \times 10^8$ magic states
    - 15-to-1 distillation protocol: each high-fidelity magic state requires 15 noisy inputs and ~100 physical qubits for the distillation factory
    - Running 100 parallel distillation factories (space-time trade-off): overhead $\approx 10,000$ additional physical qubits

    **Physical qubit estimate:**
    - Logical computation qubits: $8,192 \times 1,250 = 10.24 \times 10^6$
    - Magic state factories: $100 \times 100 = 10,000 \approx 0.01 \times 10^6$
    - **Total: approximately $10.25$ million physical qubits**

    **Runtime estimate:**
    - At 1 MHz logical clock rate: $2 \times 10^8$ T-gates / 100 parallel factories = $2 \times 10^6$ T-gate rounds
    - Plus Clifford overhead: total $\approx 10^7$ logical cycles $\approx 10$ seconds

    **Summary:**
    | Parameter | Estimate |
    |---|---|
    | Logical qubits | ~8,192 |
    | T-gate count | ~$2 \times 10^8$ |
    | Physical qubits (surface code, $d=25$) | ~10.3 million |
    | Runtime at 1 MHz | ~10 seconds |

    These estimates are consistent with scaled-down versions of the Gidney-Ekerå RSA-2048 analysis and confirm that RSA-1024 would require substantially fewer resources than RSA-2048.

---

**Question 29.** Design a hybrid classical-quantum algorithm for portfolio optimization that combines QAOA with classical preprocessing. Specify the problem encoding, the division of work between classical and quantum components, and the criteria for claiming quantum advantage.

??? success "Answer"
    **Problem formulation:**
    Portfolio optimization: given $n$ assets with expected returns $\mu_i$, covariance matrix $\Sigma_{ij}$, and budget constraint, find binary allocation $x_i \in \{0,1\}$ maximizing risk-adjusted return:
    $$\min_x \left[ \lambda x^T \Sigma x - (1-\lambda)\mu^T x \right] \quad \text{subject to} \quad \sum_i x_i = k$$

    where $\lambda$ is risk aversion and $k$ is portfolio size.

    **Classical preprocessing (run classically):**
    1. **Dimensionality reduction:** For $n > 50$ assets, apply PCA or hierarchical clustering to identify $m \leq 50$ representative asset clusters
    2. **Covariance estimation:** Use Ledoit-Wolf shrinkage estimator for robust $\Sigma$ estimation
    3. **Initial point generation:** Solve relaxed LP (continuous $x_i \in [0,1]$) to identify promising binary solutions as QAOA warm start
    4. **Constraint encoding:** Compute penalty coefficient $A = \max|\mu_i| \cdot n$ for budget constraint

    **Quantum component (QAOA on quantum hardware):**
    1. Encode $m$-asset subproblem as Ising Hamiltonian on $m$ qubits
    2. Warm-start QAOA: initialize qubit states biased toward LP relaxation solution (angles $\theta_i = 2\arcsin(\sqrt{x_i^{LP}})$)
    3. Run $p = 5$–$10$ QAOA layers
    4. Classical optimization of $\{\gamma_k, \beta_k\}$ parameters using SPSA or Bayesian optimization

    **Classical postprocessing:**
    - Decode top-$K$ measurement outcomes to feasible portfolios
    - Apply classical local search (1-swap improvement) to refine solutions
    - Select maximum Sharpe ratio portfolio from candidates

    **Criteria for quantum advantage:**
    - **Quality:** QAOA solution achieves higher expected Sharpe ratio than classical heuristics (simulated annealing, branch-and-bound) within the same time budget
    - **Time-to-solution:** For a fixed solution quality threshold (e.g., within 1% of optimal), quantum hardware finds it faster than classical
    - **Scaling:** Advantage must grow with problem size $n$, not shrink
    - **Statistical significance:** Improvement measured over $\geq 100$ problem instances with $p < 0.01$

    Current evidence does not support a claimed advantage for QAOA portfolio optimization at classically tractable problem sizes. This framework is designed to rigorously test for advantage as hardware improves.

---

**Question 30.** Create a comprehensive comparison framework for evaluating the suitability of five quantum algorithms (Shor's, Grover's, VQE, QAOA, QFT-based phase estimation) for a specific industrial application: drug discovery (protein-ligand binding affinity prediction). Your framework should evaluate algorithmic fit, hardware requirements, timeline to practical utility, and expected impact.

??? success "Answer"
    **Application context:** Protein-ligand binding affinity prediction requires computing electronic structure energies of molecular systems to determine whether a drug candidate will bind to its target protein. The core computational bottleneck is solving the electronic Schrödinger equation for systems of ~50–200 electrons.

    **Evaluation framework:**

    | Algorithm | Algorithmic fit | Hardware requirement | Timeline | Expected impact |
    |---|---|---|---|---|
    | **VQE** | High — directly targets ground state energy of molecular Hamiltonians | NISQ (50–1000 qubits, low depth) or early fault-tolerant | 5–10 years for meaningful molecules | Medium: may outperform classical DFT for strongly correlated systems (e.g., metalloenzymes, cytochrome P450) |
    | **QPE (phase estimation)** | Very high — provably exact ground state energy with polynomial resources | Fault-tolerant ($>10^6$ physical qubits, deep circuits) | 15–25 years | Very high: could exactly solve electronic structure for 50-electron active spaces, revolutionizing hit identification |
    | **Grover's** | Low — unstructured search over chemical space is $O(\sqrt{N})$, not exponential | NISQ-compatible | Near-term but marginal | Low: virtual screening databases have $10^{12}$ compounds; $O(\sqrt{10^{12}}) = O(10^6)$ queries still requires enormous circuits |
    | **QFT** | Medium — as subroutine in QPE; indirect application to spectroscopy | Fault-tolerant | Long-term (15+ years) | Medium-high: enables precise energy differences needed for selectivity prediction |
    | **QAOA/QUBO** | Low-medium — molecular docking geometry can be encoded as QUBO but poorly captures continuous bonding | NISQ (100–1000 qubits) | 3–7 years for small molecules | Low-medium: likely inferior to classical force-field methods at current depth; potential for specific conformational search |

    **Recommendation ranking for drug discovery:**

    1. **QPE (fault-tolerant, long-term):** The correct quantum algorithm for the problem — provably exponentially faster than classical for exact electronic structure. Critical bottleneck: timeline and hardware scale.

    2. **VQE (near-term):** Best near-term bet for quantum advantage in electronic structure. Focus on strongly correlated active sites where DFT fails (CASSCF benchmark problems). Key risk: barren plateaus and shot noise limit practical scalability.

    3. **QFT as QPE subroutine (long-term):** Enables the full fault-tolerant pipeline.

    4. **QAOA (speculative):** May accelerate docking pose sampling for rigid receptor models; unlikely to outperform classical for flexible docking.

    5. **Grover's (not recommended):** Quadratic speedup insufficient for the required scale of virtual screening; classical deep learning (AlphaFold, Boltz-1) provides more practical near-term value.

    **Key insight:** The most impactful quantum application in drug discovery is fault-tolerant QPE for exact electronic structure — not NISQ heuristics. Investment should prioritize fault-tolerant hardware milestones and quantum chemistry compilation research rather than near-term NISQ demonstrations that compete with continuously improving classical methods.
