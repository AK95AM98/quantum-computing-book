---
title: "Chapter 4: Quantum Algorithms"
chapter: 4
concepts: 18
prerequisites: ["Chapter 2: Superposition, Entanglement", "Chapter 3: Quantum Gates and Circuits"]
bloom_levels: [Understand, Apply, Analyze, Evaluate]
---

# Chapter 4: Quantum Algorithms — Why Certain Problems Get Exponentially Faster

*In 1994, Peter Shor published an algorithm that could break every public-key cryptosystem then in use. He did this not by discovering a mathematical weakness in RSA — but by showing that quantum computers could solve the period-finding problem in polynomial time. This chapter develops the mechanics of quantum speedup: the Quantum Fourier Transform, Shor's algorithm, Grover's search, and the mathematical defenses (post-quantum cryptography) that replace the systems Shor's algorithm would break.*

---

## 1. The Quantum Fourier Transform

### 1.1 The Classical Discrete Fourier Transform

The classical Discrete Fourier Transform (DFT) maps a sequence of \(N\) complex numbers \(x_0, \ldots, x_{N-1}\) to:

$$y_k = \frac{1}{\sqrt{N}}\sum_{j=0}^{N-1} x_j \, e^{2\pi i jk/N}, \quad k = 0, 1, \ldots, N-1$$

The naive DFT requires \(O(N^2)\) operations. The Fast Fourier Transform (FFT) reduces this to \(O(N \log N)\). For \(N = 2^n\), this is \(O(2^n \cdot n)\).

### 1.2 The Quantum Fourier Transform

The **Quantum Fourier Transform (QFT)** performs the same transformation on quantum amplitudes. It maps:

$$\ket{j} \to \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1} e^{2\pi i jk/N} \ket{k}$$

For \(n\) qubits (\(N = 2^n\)), the QFT requires only \(O(n^2) = O((\log N)^2)\) gates — an exponential improvement over the classical FFT's \(O(N \log N)\).

The QFT circuit decomposes as:

$$\text{QFT}_N = \prod_{k=1}^{n}\left[H_k \cdot \prod_{j=k+1}^{n} CR_j^{(k)}\right] \cdot \text{SWAP}$$

where \(CR_j^{(k)}\) is a controlled phase rotation gate \(\begin{pmatrix}1&0\\0&e^{2\pi i/2^{j-k+1}}\end{pmatrix}\) applied to qubit \(k\) controlled on qubit \(j\).

**The critical subtlety:** The QFT operates on *amplitudes*, not on classically accessible data. You cannot load a classical dataset into a quantum register, apply the QFT, and read out all the Fourier coefficients — measurement collapses the superposition to a single coefficient. The QFT's power comes from its use *within* algorithms where the data is already in quantum superposition.

!!! example "Worked Example: 2-qubit QFT on |00⟩"
    For \(n=2\) qubits (\(N=4\)), starting from \(\ket{00}\):

    **Step 1:** Apply H to qubit 0: \(\frac{1}{\sqrt{2}}(\ket{0}+\ket{1})\ket{0}\)

    **Step 2:** Apply controlled-\(R_2\) (controlled-S) with qubit 1 as control:
    Since qubit 1 is \(\ket{0}\), no phase is added: \(\frac{1}{\sqrt{2}}(\ket{0}+\ket{1})\ket{0}\)

    **Step 3:** Apply H to qubit 1: \(\frac{1}{\sqrt{2}}(\ket{0}+\ket{1}) \otimes \frac{1}{\sqrt{2}}(\ket{0}+\ket{1}) = \frac{1}{2}(\ket{00}+\ket{01}+\ket{10}+\ket{11})\)

    The QFT of \(\ket{0}\) is the uniform superposition — exactly as expected from the DFT formula.

---

## 2. Shor's Algorithm — Exponential Speedup for Factoring

### 2.1 The RSA Cryptosystem and Its Classical Hardness

The RSA cryptosystem (Rivest, Shamir, Adleman, 1977) secures internet communications, digital signatures, and financial transactions worldwide. Its security rests on one assumption: **factoring large numbers is hard**.

Given \(N = p \times q\) (the product of two large primes), finding \(p\) and \(q\) classically requires super-polynomial time. The best classical algorithm — the General Number Field Sieve — has complexity:

$$O\left(\exp\left(c \cdot (\log N)^{1/3} \cdot (\log \log N)^{2/3}\right)\right)$$

For \(N\) with 2048 bits, this is estimated to require thousands of years on the world's most powerful classical supercomputer. RSA-2048 is considered safe against classical attack indefinitely.

### 2.2 The Mathematical Reduction: Factoring → Period-Finding

Shor's key insight is that **factoring reduces to period-finding** via classical number theory:

1. Choose a random integer \(a\) with \(1 < a < N\) and \(\gcd(a, N) = 1\).
2. The function \(f(x) = a^x \bmod N\) is **periodic**: there exists a period \(r\) such that \(f(x+r) = f(x)\) for all \(x\).
3. If \(r\) is even and \(a^{r/2} \not\equiv -1 \pmod{N}\), then:
   $$\gcd(a^{r/2} - 1, N) \quad \text{and} \quad \gcd(a^{r/2} + 1, N)$$
   are nontrivial factors of \(N\) (with probability \(\geq 1/2\) over random choices of \(a\)).

!!! example "Worked Example: Factoring N = 15"
    Choose \(a = 7\). Compute \(f(x) = 7^x \bmod 15\):

    | \(x\) | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
    |--------|---|---|---|---|---|---|---|
    | \(f(x)\) | 1 | 7 | 4 | 13 | 1 | 7 | 4 |

    Period \(r = 4\) (since \(f(4) = f(0) = 1\)).

    Check: \(r = 4\) is even. \(7^2 = 49 \equiv 4 \pmod{15} \neq -1 \equiv 14\). ✓

    Factors:
    - \(\gcd(7^2 - 1, 15) = \gcd(48, 15) = 3\)  ✓
    - \(\gcd(7^2 + 1, 15) = \gcd(50, 15) = 5\)  ✓

    **15 = 3 × 5**, found using the period of \(7^x \bmod 15\).

### 2.3 The Quantum Period-Finding Subroutine

The quantum algorithm finds the period \(r\) using the QFT:

**Step 1: Initialize.** Two registers — input of \(n = \lceil 2\log_2 N \rceil\) qubits (all \(\ket{0}\)) and output of \(\lceil \log_2 N \rceil\) qubits.

**Step 2: Create superposition.** Apply \(H^{\otimes n}\) to the input register:
$$\frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}\ket{x}\ket{0}$$

**Step 3: Apply the oracle.** Compute \(f(x) = a^x \bmod N\) in superposition:
$$\frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}\ket{x}\ket{a^x \bmod N}$$

Due to superposition, all \(2^n\) values of \(f(x)\) are computed **simultaneously** in a single application of the unitary oracle \(U_f\). This is quantum parallelism.

**Step 4: Apply QFT.** Apply the QFT to the input register. The periodicity in \(f(x)\) causes constructive interference at multiples of \(N/r\) and destructive interference elsewhere.

**Step 5: Measure.** Measurement yields an integer \(j\) close to a multiple of \(N/r\): \(j \approx k \cdot N/r\) for some integer \(k\). The **continued fractions algorithm** (classical, \(O((\log N)^3)\)) extracts \(r\) from the measurement outcome.

**Complexity:** The QFT requires \(O(n^2)\) gates; the modular exponentiation oracle requires \(O(n^3)\) gates. Total: \(O((\log N)^3)\) — **polynomial** in the number of digits of \(N\), compared to the classical super-exponential.

### 2.4 Resource Estimates for RSA-2048

| Year | Team | Physical qubits | Time |
|------|------|----------------|------|
| 1996 | Beckman et al. | ~10 million | — |
| 2003 | Beauregard | ~4 million | — |
| 2021 | Gidney & Ekerå | ~20 million | 8 hours |
| 2025 (May) | Gidney | **<1 million** | ~8 hours |

Craig Gidney's May 2025 update reduced the qubit requirement by **95%** through improved surface code implementations and circuit optimizations. Current hardware has ~100 high-quality qubits. The gap is closing but remains at roughly three orders of magnitude.

!!! tip "Business Implication"
    The 2025 resource reduction is significant: it moves the target from a machine requiring tens of millions of physical qubits (a 2040s prospect) to one requiring fewer than a million (potentially a 2030s prospect at IBM's Starling-class trajectory). Organizations encrypting data that must remain confidential for 10+ years face a mathematical deadline — **not** a 2026 concern, but absolutely a 2026 **planning** concern. The harvest-now-decrypt-later threat (Chapter 12) is already active.

---

## 3. Grover's Algorithm — Quadratic Speedup for Search

### 3.1 The Unstructured Search Problem

Given a function \(f: \{0,1\}^n \to \{0,1\}\) that equals 1 for exactly one "marked" input \(x^*\) and 0 for all others, find \(x^*\). Classically, this requires \(O(N)\) = \(O(2^n)\) evaluations in the worst case. Grover's algorithm solves it in \(O(\sqrt{N})\) evaluations.

### 3.2 The Algorithm

**Initialization:** Apply \(H^{\otimes n}\ket{0}^n\) to create the uniform superposition \(\ket{s} = \frac{1}{\sqrt{N}}\sum_{x=0}^{N-1}\ket{x}\).

**Grover iteration** (repeat \(\approx \frac{\pi}{4}\sqrt{N}\) times):

1. **Oracle:** Apply \(O\ket{x} = (-1)^{f(x)}\ket{x}\) — flip the sign of the marked state's amplitude.
2. **Diffusion:** Apply the operator \(D = 2\ket{s}\bra{s} - \mathbb{I}\) — invert all amplitudes about their mean.

**Geometric interpretation:** The algorithm rotates the state vector in the 2D subspace spanned by \(\ket{x^*}\) (the target) and \(\ket{s_\perp}\) (uniform superposition over non-target states). Each Grover iteration rotates by angle \(2\theta\) where \(\sin\theta = 1/\sqrt{N}\). After \(\frac{\pi}{4\theta} \approx \frac{\pi}{4}\sqrt{N}\) iterations, the state aligns with \(\ket{x^*}\).

!!! example "Worked Example: Grover on N=4 (2 qubits)"
    Target: \(\ket{11}\). Initial uniform superposition: \(\frac{1}{2}(\ket{00}+\ket{01}+\ket{10}+\ket{11})\). Mean amplitude: \(1/2\).

    **Iteration 1, Step 1 (Oracle):** Flip sign of \(\ket{11}\):
    \(\frac{1}{2}(\ket{00}+\ket{01}+\ket{10}-\ket{11})\). New mean: \(\frac{1}{4}(1+1+1-1) = \frac{1}{2} \cdot \frac{1}{2}\)... wait, let me redo.

    Amplitudes: \((+\frac{1}{2}, +\frac{1}{2}, +\frac{1}{2}, -\frac{1}{2})\). Mean = \(\frac{1}{4}(\frac{1}{2}+\frac{1}{2}+\frac{1}{2}-\frac{1}{2}) = \frac{1}{4}\).

    **Step 2 (Diffusion):** New amplitude \(= 2\mu - a_i\):
    - Non-target states: \(2 \cdot \frac{1}{4} - \frac{1}{2} = 0\)
    - Target \(\ket{11}\): \(2 \cdot \frac{1}{4} - (-\frac{1}{2}) = 1\)

    After **one** iteration: state is exactly \(\ket{11}\) with probability **1**. Measurement always finds the correct answer. For \(N=4\), one Grover iteration suffices (since \(\frac{\pi}{4}\sqrt{4} = \frac{\pi}{2} \approx 1.57 \approx 1\) iteration).

### 3.3 Optimality and Cryptographic Implications

Grover's \(O(\sqrt{N})\) is **provably optimal** for unstructured search — the BBBV theorem (Bennett, Bernstein, Brassard, Vazirani, 1997) shows no quantum algorithm can do better. This has direct cryptographic implications:

| Cryptosystem | Classical security | Quantum security (Grover) | Fix |
|-------------|-------------------|--------------------------|-----|
| AES-128 | 128-bit | **64-bit** (broken) | Use AES-256 |
| AES-256 | 256-bit | 128-bit (acceptable) | No change needed |
| SHA-256 (collision) | 128-bit | 85-bit | Use SHA-384+ |
| RSA-2048 | ~112-bit | **0-bit** (Shor breaks it) | Use PQC |
| ECDSA P-256 | ~128-bit | **0-bit** (Shor breaks it) | Use PQC |

The key distinction: Grover gives a **quadratic** speedup that can be countered by doubling key lengths. Shor gives an **exponential** speedup that fundamentally breaks asymmetric cryptography — no key size increase helps.

!!! warning "Common Misconception"
    Grover's algorithm does **not** break symmetric cryptography. AES-256 remains secure against quantum attack (128-bit quantum security). The symmetric ciphers do not require replacement — only key lengths may need adjustment. The cryptographic crisis is specifically about **asymmetric systems** (RSA, ECDSA, ECDH, Diffie-Hellman) that rely on factoring and discrete logarithms. Quantum computers threaten these completely.

---

## 4. The Quantum Complexity Landscape

### 4.1 Complexity Classes

| Class | Definition | Examples |
|-------|-----------|---------|
| P | Decidable in polynomial time classically | Sorting, shortest path, linear programming |
| BPP | Decidable in polynomial time with bounded error, classically randomized | Most practical problems |
| BQP | Decidable in polynomial time with bounded error, quantum | Factoring (Shor), search speedup (Grover) |
| NP | Solutions verifiable in polynomial time | Boolean SAT, traveling salesman |
| PSPACE | Decidable using polynomial space (may be exponential time) | Generalized chess, QBF |

Believed relationships: \(P \subseteq BPP \subseteq BQP \subseteq PSPACE\) and \(NP\) is believed to be outside \(BQP\) (though unproven).

**The most important fact for executives:** Quantum computers are **not** expected to solve NP-complete problems efficiently. Factoring (Shor) and unstructured search (Grover) are in BQP, but NP-complete problems like Boolean satisfiability, protein folding in full generality, and the traveling salesman problem are not believed to have efficient quantum algorithms.

!!! tip "Business Implication"
    Understanding the complexity landscape prevents two common executive errors: (1) over-investing based on the belief that quantum computers will be "faster at everything" — they won't; (2) under-investing based on the assumption that useful quantum advantage requires full fault tolerance — hybrid algorithms like VQE and QAOA are designed for near-term hardware. The quantum advantage for your organization depends on whether your key computational problems have the mathematical structure that quantum algorithms can exploit.

---

## 5. Other Important Quantum Algorithms

### 5.1 Quantum Phase Estimation (QPE)

QPE estimates the eigenvalue \(e^{2\pi i\phi}\) of a unitary operator \(U\) with eigenstate \(\ket{\psi}\):

$$U\ket{\psi} = e^{2\pi i\phi}\ket{\psi}$$

The algorithm uses the QFT to extract \(\phi\) to \(n\) bits of precision using an \(n\)-qubit ancilla register. QPE is the subroutine underlying Shor's algorithm, quantum chemistry algorithms, and the HHL linear systems algorithm. Its precision scales as \(O(1/2^n)\) with the ancilla qubit count.

### 5.2 Variational Quantum Eigensolver (VQE)

VQE is a **hybrid classical-quantum** algorithm for finding the ground state energy of a quantum system:

1. Prepare a parameterized ansatz state \(\ket{\psi(\theta)}\) on the quantum computer
2. Measure \(\langle\psi(\theta)|H|\psi(\theta)\rangle\) (the energy expectation value)
3. A classical optimizer adjusts \(\theta\) to minimize the energy
4. Repeat until convergence

VQE is designed for NISQ hardware: it uses shallow circuits (limiting exposure to noise) and offloads classical optimization to a conventional computer. IBM demonstrated in March 2025 that VQE on Nighthawk-class hardware could match classical supercomputer accuracy on certain molecular energy calculations.

### 5.3 Quantum Approximate Optimization Algorithm (QAOA)

QAOA tackles combinatorial optimization problems by encoding them as Ising Hamiltonians and using parameterized quantum circuits with alternating problem and mixer unitaries. It is designed for near-term hardware and has demonstrated advantages for specific problem instances. Like VQE, it is a hybrid algorithm with classical parameter optimization.

---

## 6. Post-Quantum Cryptography: Mathematical Defenses Against Shor's Algorithm

*Addendum to Chapter 4 — The PQC Mathematics*

### 6.1 Why Bigger Keys Don't Help Against Shor

Shor's algorithm has complexity \(O((\log N)^3)\). Doubling the RSA key size from 2048 to 4096 bits increases the quantum computation by a factor of \(2^3 = 8\) — negligible. Unlike Grover's attack (where doubling the symmetric key length restores security), **no finite RSA key size provides meaningful protection against Shor's algorithm**. The solution requires mathematically different problems.

### 6.2 Lattice Problems and Learning With Errors

A **lattice** is a regular array of points in high-dimensional space: \(\mathcal{L}(B) = \{Bz : z \in \mathbb{Z}^n\}\) for a basis matrix \(B \in \mathbb{R}^{n \times n}\). Two fundamental hard problems on lattices:

- **Shortest Vector Problem (SVP):** Given a lattice basis, find the shortest non-zero lattice vector.
- **Closest Vector Problem (CVP):** Given a lattice basis and a target point, find the closest lattice point.

Both are believed hard for **quantum** computers — no analogue of Shor's algorithm is known for lattice problems despite 20+ years of research.

The **Learning With Errors (LWE)** problem (Regev, 2005; 2024 Gödel Prize): given a system of approximate linear equations \(\mathbf{As} + \mathbf{e} \approx \mathbf{b} \pmod{q}\) where \(\mathbf{s}\) is a secret vector and \(\mathbf{e}\) is a small random error vector, recover \(\mathbf{s}\).

LWE is **provably as hard as worst-case lattice problems** under quantum reductions. This means any quantum algorithm that breaks LWE could be used to solve SVP and CVP — problems that the quantum community has studied intensively since Shor's 1994 result without finding efficient quantum algorithms.

### 6.3 The NIST Post-Quantum Standards

In August 2024, NIST finalized three post-quantum cryptography standards:

**FIPS 203 — ML-KEM (Module-Lattice Key Encapsulation Mechanism)**
Based on Module-LWE. Replaces RSA/ECDH for key exchange.

| Parameter set | Security level | Public key | Ciphertext |
|--------------|---------------|------------|------------|
| ML-KEM-512 | Level 1 (~AES-128) | 800 bytes | 768 bytes |
| ML-KEM-768 | Level 3 (~AES-192) | 1,184 bytes | 1,088 bytes |
| ML-KEM-1024 | Level 5 (~AES-256) | 1,568 bytes | 1,568 bytes |

For comparison, RSA-2048 public key: 256 bytes. ML-KEM keys are larger but **encapsulation/decapsulation is faster than RSA** in many implementations.

**FIPS 204 — ML-DSA (Module-Lattice Digital Signature Algorithm)**
Based on Module-LWE/SIS. Replaces RSA/ECDSA for digital signatures.

| Parameter set | Security level | Public key | Signature size |
|--------------|---------------|------------|---------------|
| ML-DSA-44 | Level 2 | 1,312 bytes | 2,420 bytes |
| ML-DSA-65 | Level 3 | 1,952 bytes | 3,293 bytes |
| ML-DSA-87 | Level 5 | 2,592 bytes | 4,595 bytes |

**FIPS 205 — SLH-DSA (Stateless Hash-Based Digital Signature Algorithm)**
Based on SPHINCS+. Security relies **only** on hash function collision resistance — no lattice mathematics. If lattice-based schemes are ever broken, SLH-DSA survives. Trade-off: large signatures (up to 49,856 bytes).

**Pipeline standards:**
- FN-DSA (FIPS 206, FALCON): Smaller signatures than ML-DSA, complex implementation. Expected 2026–2027.
- HQC: Code-based KEM (non-lattice), provides algorithmic diversity. Selected March 2025, standard expected 2027.

### 6.4 Algorithm Diversity — Defense in Depth

All three initial NIST standards use either lattice (ML-KEM, ML-DSA) or hash (SLH-DSA) assumptions. If a breakthrough quantum algorithm for lattice problems were discovered:
- ML-KEM and ML-DSA would fall simultaneously.
- SLH-DSA would survive (different mathematical foundation).
- HQC (code-based) would provide a third option for key exchange.

This is deliberate **defense in depth**: no single mathematical breakthrough should compromise all post-quantum defenses simultaneously. Well-designed PQC migration supports **crypto-agility** — the ability to swap algorithms without re-architecting the system.

!!! tip "Business Implication"
    Organizations deploying only ML-KEM without SLH-DSA backup are creating a single point of failure. The NIST recommendation is to use ML-KEM as the primary standard (performance-optimized) with SLH-DSA as the fallback (security-maximized). This dual deployment adds bandwidth overhead but provides resilience against the scenario — however unlikely — where lattice mathematics yields to a future quantum attack.

---

!!! abstract "Chapter Summary"

    1. **The QFT is the engine behind Shor's algorithm**: it converts periodic structures in quantum amplitudes into peaks measurable by classical post-processing, with \(O(n^2)\) gates vs. the classical FFT's \(O(2^n \cdot n)\).

    2. **Shor's algorithm factors \(N\) in \(O((\log N)^3)\) time**: an exponential speedup over classical algorithms. The 2025 resource estimate puts breaking RSA-2048 at fewer than 1 million physical qubits — still well beyond current hardware but within a credible future trajectory.

    3. **Grover's algorithm provides a provably optimal quadratic speedup for search**: it halves the security of symmetric keys (fixable by doubling key length) but does not break them. It does not exponentially break asymmetric cryptography — Shor does.

    4. **Quantum computers are not expected to solve NP-complete problems**: BQP ⊆ PSPACE, and NP-complete problems are not believed to be in BQP. Quantum advantage exists for problems with specific mathematical structure (periodicity, eigenvalue estimation, optimization over specific problem classes).

    5. **NIST finalized three PQC standards in August 2024**: ML-KEM (key exchange), ML-DSA (signatures), SLH-DSA (hash-based signatures). All rely on mathematical problems — lattice and hash — for which no efficient quantum algorithm is known. PQC migration should begin immediately.

---

## References

1. Shor, P. W. "Algorithms for quantum computation: discrete logarithms and factoring." *FOCS* 1994, 124–134. Also *SIAM Journal on Computing* 26(5), 1484–1509 (1997).
2. Grover, L. K. "A fast quantum mechanical algorithm for database search." *STOC* 1996, 212–219.
3. Gidney, C. & Ekerå, M. "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits." *Quantum* 5, 433 (2021).
4. Gidney, C. "Reduced RSA qubit requirements using approximate quantum Fourier transforms." arXiv:2505.xxxxx (May 2025).
5. Regev, O. "On lattices, learning with errors, random linear codes, and cryptography." *Journal of the ACM* 56(6) (2009).
6. NIST. *FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard*. August 2024.
7. NIST. *FIPS 204: Module-Lattice-Based Digital Signature Standard*. August 2024.
8. NIST. *FIPS 205: Stateless Hash-Based Digital Signature Standard*. August 2024.
9. Bennett, C. H., Bernstein, E., Brassard, G. & Vazirani, U. "Strengths and weaknesses of quantum computing." *SIAM Journal on Computing* 26(5), 1510–1523 (1997). (BBBV theorem)
