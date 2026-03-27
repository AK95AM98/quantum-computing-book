---
title: "Chapter 5: Quantum Communication"
chapter: 5
concepts: 10
prerequisites: ["Chapter 2: Superposition, Entanglement", "Chapter 3: Quantum Gates and Circuits"]
bloom_levels: [Understand, Apply]
---

# Chapter 5: Quantum Teleportation, Superdense Coding, and Quantum Communication

*Entanglement is not merely a measurement curiosity — it is a physical resource that can be consumed to accomplish communication tasks impossible by any classical means. This chapter develops three canonical protocols: teleportation (transmitting a quantum state using classical bits and a shared Bell pair), superdense coding (transmitting two classical bits using one qubit and a shared Bell pair), and BB84 (provably secure key distribution). Together they illustrate how entanglement bridges quantum and classical communication.*

---

## 1. Quantum Teleportation

### 1.1 The Problem

Alice holds an unknown qubit \(\ket{\psi} = \alpha\ket{0} + \beta\ket{1}\). She wants to transmit this quantum state to Bob. She cannot:
- Measure it (measurement collapses and destroys the superposition).
- Copy it (no-cloning theorem forbids this).
- Transmit the amplitudes \(\alpha, \beta\) classically (she doesn't know them, and learning them would require infinitely many measurements).

The solution: quantum teleportation. Alice and Bob pre-share a Bell pair \(\ket{\Phi^+}_{AB} = \frac{1}{\sqrt{2}}(\ket{00}+\ket{11})_{AB}\).

### 1.2 The Protocol

**Initial state:** The total three-qubit system is:

$$\ket{\psi}_1 \otimes \ket{\Phi^+}_{23} = (\alpha\ket{0}_1 + \beta\ket{1}_1) \otimes \frac{\ket{00}+\ket{11}}{\sqrt{2}}_{23}$$

$$= \frac{1}{\sqrt{2}}\left(\alpha\ket{000} + \alpha\ket{011} + \beta\ket{100} + \beta\ket{111}\right)_{123}$$

**Step 1: Alice applies CNOT** (control: qubit 1, target: qubit 2):

$$\frac{1}{\sqrt{2}}\left(\alpha\ket{000} + \alpha\ket{011} + \beta\ket{110} + \beta\ket{101}\right)$$

**Step 2: Alice applies H** to qubit 1:

$$\frac{1}{2}\left[\ket{00}(\alpha\ket{0}+\beta\ket{1}) + \ket{01}(\alpha\ket{1}+\beta\ket{0}) + \ket{10}(\alpha\ket{0}-\beta\ket{1}) + \ket{11}(\alpha\ket{1}-\beta\ket{0})\right]$$

**Step 3: Alice measures** qubits 1 and 2, getting one of four outcomes with equal probability \(1/4\):

| Alice's outcome | Bob's qubit state | Correction needed |
|----------------|------------------|------------------|
| \(\ket{00}\) | \(\alpha\ket{0}+\beta\ket{1}\) | None (I) |
| \(\ket{01}\) | \(\alpha\ket{1}+\beta\ket{0}\) | X |
| \(\ket{10}\) | \(\alpha\ket{0}-\beta\ket{1}\) | Z |
| \(\ket{11}\) | \(\alpha\ket{1}-\beta\ket{0}\) | XZ |

**Step 4:** Alice sends 2 classical bits (her measurement outcome) to Bob via a classical channel.

**Step 5:** Bob applies the corresponding Pauli correction (I, X, Z, or XZ) to his qubit. The result is:

$$\alpha\ket{0} + \beta\ket{1} = \ket{\psi}$$

Bob now holds the original state \(\ket{\psi}\) — perfectly, regardless of the values of \(\alpha\) and \(\beta\).

### 1.3 What Teleportation Achieves and What It Doesn't

**What it achieves:**
- Perfect transmission of an arbitrary quantum state without knowing it.
- The no-cloning theorem is preserved: Alice's qubit is destroyed by measurement (the original does not survive).
- Phase information (the relative phase between \(\alpha\) and \(\beta\)) is transmitted — something impossible to transmit classically without knowing \(\alpha\) and \(\beta\) exactly.

**What it doesn't achieve:**
- Faster-than-light communication. The 2 classical bits must travel from Alice to Bob via a classical channel — limited to light speed. Without them, Bob cannot determine which correction to apply and his qubit appears random.
- Cloning. The original qubit is destroyed at Alice's end.
- Teleportation of physical matter. Only the **quantum information** (the state) is transmitted, not any physical particles.

!!! info "Key Reference"
    Bennett, C. H. et al. "Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels." *Physical Review Letters* 70, 1895 (1993). One of the most cited papers in physics.

!!! tip "Business Implication"
    Quantum teleportation is the foundational primitive for **quantum networking** and the quantum internet. When quantum computers need to share quantum information — for distributed quantum computing or secure quantum communication — they use teleportation (consuming entanglement) rather than physically transmitting qubits. IBM's l-couplers (Chapter 9) implement a chip-level version of this: entangling separate quantum modules by consuming pre-generated Bell pairs to teleport logical qubit states between chips.

---

## 2. Superdense Coding

### 2.1 The Protocol

Superdense coding is the "dual" of teleportation: instead of transmitting a quantum state using classical bits and a Bell pair, it transmits **two classical bits using one qubit and a Bell pair**.

Alice and Bob pre-share \(\ket{\Phi^+}_{AB} = \frac{1}{\sqrt{2}}(\ket{00}+\ket{11})\). To encode 2 classical bits, Alice applies one of four Pauli operations to her qubit:

| Message | Alice applies | Resulting state |
|---------|--------------|----------------|
| 00 | \(\mathbb{I}\) | \(\frac{1}{\sqrt{2}}(\ket{00}+\ket{11}) = \ket{\Phi^+}\) |
| 01 | \(X\) | \(\frac{1}{\sqrt{2}}(\ket{10}+\ket{01}) = \ket{\Psi^+}\) |
| 10 | \(Z\) | \(\frac{1}{\sqrt{2}}(\ket{00}-\ket{11}) = \ket{\Phi^-}\) |
| 11 | \(XZ\) | \(\frac{1}{\sqrt{2}}(\ket{10}-\ket{01}) = \ket{\Psi^-}\) |

Alice sends her qubit to Bob. Bob now holds both qubits and performs a **Bell measurement** (CNOT followed by H on the first qubit, then measure both). The four Bell states are perfectly distinguishable, so Bob recovers Alice's 2-bit message with certainty.

**Result:** Two classical bits are transmitted using one qubit (plus the pre-shared entanglement). This doubles the classical capacity of a quantum channel — but only when pre-shared entanglement is available.

!!! example "Worked Example: Superdense Coding for message '10'"
    Start with \(\ket{\Phi^+} = \frac{1}{\sqrt{2}}(\ket{00}+\ket{11})\).
    Alice applies \(Z\): \(\frac{1}{\sqrt{2}}(Z\ket{0}\ket{0}+Z\ket{1}\ket{1}) = \frac{1}{\sqrt{2}}(\ket{00}-\ket{11}) = \ket{\Phi^-}\).
    Bob performs CNOT (control: qubit 1, target: qubit 2): \(\frac{1}{\sqrt{2}}(\ket{00}-\ket{10}) = \frac{1}{\sqrt{2}}(\ket{0}-\ket{1})\otimes\ket{0} = \ket{-}\ket{0}\).
    Bob applies H to qubit 1: \(H\ket{-} = \ket{1}\). Measures \(\ket{10}\) — correctly decodes message '10'. ✓

---

## 3. Quantum Key Distribution: BB84

### 3.1 The Goal

Quantum Key Distribution (QKD) allows Alice and Bob to establish a **shared secret key** over an insecure quantum channel with **provable security** based on the laws of physics, not computational hardness. Unlike RSA (which could be broken by a sufficiently powerful quantum computer), BB84's security holds even against a quantum-equipped adversary.

### 3.2 The BB84 Protocol

**Setup:** Alice and Bob are connected by (1) a quantum channel (for qubits) and (2) an authenticated classical channel.

**Alice's preparation:** For each bit position, Alice randomly chooses:
- A **bit value** (0 or 1)
- A **basis** (rectilinear \(\{|0\rangle, |1\rangle\}\) or diagonal \(\{|+\rangle, |-\rangle\}\))

| Bit | Basis | State sent |
|-----|-------|-----------|
| 0 | Rectilinear (+) | \(\ket{0}\) |
| 1 | Rectilinear (+) | \(\ket{1}\) |
| 0 | Diagonal (×) | \(\ket{+}\) |
| 1 | Diagonal (×) | \(\ket{-}\) |

**Bob's measurement:** For each received qubit, Bob randomly chooses a measurement basis (rectilinear or diagonal).

**Sifting:** Alice and Bob announce their basis choices over the classical channel (not their outcomes). They **discard** positions where bases don't match. For matching bases, their measurement outcomes agree.

**Error detection:** Alice and Bob publicly compare a random subset of their sifted key. If the error rate exceeds a threshold (~11%), they abort (Eve is eavesdropping). Otherwise, they apply privacy amplification to distill a secure key.

### 3.3 Why It's Secure

The security rests on two quantum mechanical facts:

1. **No-cloning:** Eve cannot copy the qubits in transit without disturbing them.
2. **Measurement disturbs the state:** If Eve measures a qubit to learn Alice's bit, she must send a qubit to Bob — but if she measured in the wrong basis, she sends the wrong state.

**Quantifying Eve's disturbance:** If Eve intercepts every qubit and measures in a random basis (the optimal intercept-resend attack), she causes a 25% error rate on the sifted key. Since Alice and Bob check their error rate, Eve's interference is detected with high probability.

**Information-theoretic security:** The security of BB84 can be proven from quantum mechanics alone — it does not rely on assumptions about computational hardness. A computationally unbounded Eve cannot break BB84. This is categorically different from classical cryptography.

!!! warning "Common Misconception"
    QKD is **not** the recommended solution to the PQC crisis for most organizations. The NSA explicitly does not recommend QKD for national security systems due to: (1) requiring expensive quantum channel infrastructure (specialized fiber or free-space optics), (2) limited transmission distance without quantum repeaters, (3) vulnerability to implementation attacks (even if the protocol is theoretically secure, imperfect hardware creates exploitable side channels). **Post-quantum cryptography (Chapter 12) is the practical near-term defense** — it runs on existing hardware and is supported by NIST standards.

!!! info "Key Reference"
    Bennett, C. H. & Brassard, G. "Quantum cryptography: Public key distribution and coin tossing." *Proceedings of IEEE International Conference on Computers, Systems and Signal Processing* (1984). Toshiba demonstrated cross-state QKD on live U.S. fiber in December 2025, establishing a 900-mile quantum-secured communication link.

---

!!! abstract "Chapter Summary"

    1. **Quantum teleportation transmits an unknown qubit state using 2 classical bits and 1 Bell pair**: the original is destroyed (no-cloning preserved), and no faster-than-light communication occurs. It is the foundational primitive for quantum networking.

    2. **Superdense coding transmits 2 classical bits using 1 qubit and 1 Bell pair**: demonstrating that entanglement is a quantifiable communication resource that can double classical channel capacity.

    3. **Entanglement is consumed by both protocols**: each teleportation or superdense coding event consumes one Bell pair. Entanglement generation and distribution are therefore critical infrastructure for quantum networks.

    4. **BB84 provides information-theoretically secure key distribution**: its security follows from no-cloning and measurement disturbance — it holds against a quantum-equipped adversary. However, practical deployment requires quantum channel infrastructure that limits its applicability.

    5. **PQC (Chapter 12) is the practical near-term defense**, not QKD: PQC runs on existing hardware, meets NIST standards, and is already being deployed. QKD is a complement for extremely high-security applications where quantum channel infrastructure is feasible.

---

## References

1. Bennett, C. H. et al. "Teleporting an unknown quantum state via dual classical and EPR channels." *Physical Review Letters* 70, 1895 (1993).
2. Bennett, C. H. & Brassard, G. "Quantum cryptography: public key distribution and coin tossing." *Proc. IEEE ICCSSP* (1984).
3. Bennett, C. H. & Wiesner, S. J. "Communication via one- and two-particle operators on Einstein-Podolsky-Rosen states." *Physical Review Letters* 69, 2881 (1992). (Superdense coding)
4. Lo, H.-K., Curty, M. & Tamaki, K. "Secure quantum key distribution." *Nature Photonics* 8, 595–604 (2014).
5. Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*. Cambridge (2000), Chapter 2.
