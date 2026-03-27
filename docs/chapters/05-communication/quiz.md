# Chapter 5 Quiz: Quantum Communication

Test your understanding of quantum teleportation, superdense coding, quantum key distribution, and entanglement as a communication resource.

---

## Level 1 — Remember

**Question 1.** How many classical bits and how many Bell pairs are consumed in the quantum teleportation protocol to transmit one qubit?

??? success "Answer"
    Quantum teleportation consumes **2 classical bits** and **1 Bell pair** (1 ebit of entanglement) to transmit the quantum state of one qubit. The 2 classical bits encode Alice's Bell-basis measurement outcome (one of four possible results: 00, 01, 10, 11) and are sent over a classical channel to Bob, who uses them to apply the appropriate Pauli correction. The Bell pair must be pre-shared between Alice and Bob before the protocol begins.

---

**Question 2.** State the BB84 QKD protocol steps. What four quantum states does Alice use to encode her key bits?

??? success "Answer"
    In BB84 (Bennett & Brassard 1984), Alice encodes key bits using four quantum states drawn from two conjugate bases:

    - **Rectilinear basis ($\oplus$):** $|0\rangle$ (bit 0) and $|1\rangle$ (bit 1)
    - **Diagonal basis ($\otimes$):** $|+\rangle$ (bit 0) and $|-\rangle$ (bit 1)

    **Protocol steps:** (1) Alice randomly chooses a basis and encodes a random bit, sending a qubit to Bob. (2) Bob randomly chooses a basis and measures. (3) After transmission, Alice and Bob announce their basis choices over a public classical channel. (4) They keep only the bits where they chose the same basis (approximately 50% of the raw key). (5) They sacrifice a fraction of these "sifted" bits to estimate the error rate (QBER); if too high, they abort. (6) Remaining bits are processed with error correction and privacy amplification to produce the final secret key.

---

**Question 3.** What is superdense coding, and how many classical bits can be transmitted per qubit using it?

??? success "Answer"
    Superdense coding is a quantum communication protocol (Bennett & Wiesner 1992) that allows the transmission of **2 classical bits** of information by sending only **1 qubit**, given that Alice and Bob share a pre-distributed Bell pair. Alice applies one of four local operations ($I$, $X$, $Z$, $iY$) to her half of the Bell pair, encoding her 2-bit message into the joint entangled state. She then sends her single qubit to Bob, who performs a Bell measurement on both qubits and unambiguously recovers the 2-bit message. Superdense coding saturates the Holevo bound for entanglement-assisted communication.

---

**Question 4.** What is the error rate introduced into a BB84 key by an intercept-resend attack by Eve?

??? success "Answer"
    An intercept-resend attack by Eve introduces a **25% Quantum Bit Error Rate (QBER)** in the sifted key. Eve intercepts each qubit, measures it in a randomly chosen basis (correct basis with probability 1/2), and resends a new qubit to Bob. When Eve chooses the wrong basis (probability 1/2), she disturbs the state, causing Bob's measurement to disagree with Alice's even when they use the same basis — with probability 1/2 in those cases. Net error rate: $\frac{1}{2} \times \frac{1}{2} = \frac{1}{4} = 25\%$. This elevated QBER signals eavesdropping and causes Alice and Bob to abort the protocol.

---

**Question 5.** What does quantum teleportation destroy, and what theorem does this illustrate?

??? success "Answer"
    Quantum teleportation destroys the original quantum state at Alice's location — after the protocol, Alice's qubit is in one of the computational basis states (the post-measurement state), not in the original $|\psi\rangle$. This illustrates the **no-cloning theorem**: if Alice's original state were preserved while Bob's qubit also ended up in state $|\psi\rangle$, there would be two copies of an arbitrary unknown quantum state, which is forbidden. Teleportation circumvents this by destroying the original: the state is transferred, not copied. The 2 classical bits consumed in teleportation carry the information needed to complete the transfer while ensuring the no-cloning theorem is respected.

---

## Level 2 — Understand

**Question 6.** Explain the role of entanglement in superdense coding. Why is it impossible to transmit 2 classical bits by sending 1 qubit without a pre-shared Bell pair?

??? success "Answer"
    Superdense coding requires the pre-shared Bell pair as an entanglement resource. Without it, a single qubit can encode at most 1 bit of accessible classical information — this is the Holevo bound: the maximum classical information extractable from a qubit is 1 bit, regardless of what quantum state it is prepared in. When Alice sends just 1 qubit with no pre-shared entanglement, Bob receives a single-qubit state from a four-element ensemble; the Holevo theorem limits mutual information to at most $\log_2(4) \cdot$[effective distinguishability] $\leq 1$ bit. The Bell pair transforms the situation: by entangling the transmitted qubit with Bob's local qubit, Alice's single-qubit operation changes the joint two-qubit state, which now carries 2 bits of information distinguishable via Bell measurement. The entanglement effectively "doubles" the channel capacity by providing Bob with a local quantum resource that amplifies the information content of the transmitted qubit.

---

**Question 7.** Explain why BB84 is information-theoretically secure while RSA is only computationally secure. What does this distinction mean for long-term key security?

??? success "Answer"
    RSA's security rests on the computational hardness of factoring large integers: no known efficient (polynomial-time) algorithm exists classically, but Shor's algorithm breaks it in polynomial time on a quantum computer. An adversary who records RSA-encrypted ciphertext today can decrypt it retroactively once a quantum computer is available — the security guarantee is conditional on the adversary's limited computational power at the time of decryption. Information-theoretic security means the system is secure against computationally unbounded adversaries — even given unlimited computational resources, an eavesdropper cannot extract the plaintext. BB84 achieves this because any eavesdropping disturbs the quantum states (detectable via QBER) and because the final key bits are information-theoretically hidden from Eve by privacy amplification: even if Eve measured some qubits, the information she gains is quantifiably bounded and removed. For long-term key security (data that must remain confidential for 20+ years), information-theoretic security is categorically stronger: a BB84-derived key cannot be retroactively broken even by a future computer with unlimited power, unlike any RSA-protected data.

---

**Question 8.** Explain the 5-step derivation of quantum teleportation. Focus on why 2 classical bits are necessary and sufficient.

??? success "Answer"
    **Step 1 — Shared entanglement:** Alice and Bob share Bell pair $|\Phi^+\rangle_{AB} = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$. Alice holds qubit $A$, Bob holds qubit $B$.

    **Step 2 — Total state:** Alice has an unknown qubit $|\psi\rangle_C = \alpha|0\rangle + \beta|1\rangle$ to teleport. The three-qubit state is $|\psi\rangle_C \otimes |\Phi^+\rangle_{AB}$.

    **Step 3 — Alice's Bell measurement:** Alice applies CNOT (C→A) then Hadamard (C), entangling her qubit with her half of the pair. The three-qubit state rewrites as:
    $$\frac{1}{2}\left[|00\rangle_{CA}(\alpha|0\rangle + \beta|1\rangle)_B + |01\rangle_{CA}(\alpha|1\rangle + \beta|0\rangle)_B + |10\rangle_{CA}(\alpha|0\rangle - \beta|1\rangle)_B + |11\rangle_{CA}(\alpha|1\rangle - \beta|0\rangle)_B\right]$$

    **Step 4 — Classical communication:** Alice measures qubits C and A, getting one of four outcomes (00, 01, 10, 11) with equal probability 1/4. She sends these 2 bits to Bob.

    **Step 5 — Bob's correction:** Bob applies the corresponding Pauli: $I$ (00), $X$ (01), $Z$ (10), or $XZ$ (11) to his qubit B, recovering $|\psi\rangle_B = \alpha|0\rangle + \beta|1\rangle$.

    The 2 classical bits are necessary because there are 4 equally likely measurement outcomes, requiring $\log_2 4 = 2$ bits to distinguish. They are sufficient because each outcome corresponds to a unique and reversible Pauli correction. Sending 0 bits leaves Bob's qubit in a maximally mixed state (no information about $\alpha, \beta$), and sending 1 bit still leaves 2-fold ambiguity — only 2 bits fully specify the correction.

---

**Question 9.** Explain the concept of "entanglement as a communication resource." How is it different from using entanglement for faster-than-light communication?

??? success "Answer"
    Entanglement is a communication resource in the sense that a pre-shared Bell pair enables communication protocols that are impossible without it: superdense coding (2 bits via 1 qubit) and teleportation (qubit transfer consuming 1 ebit + 2 classical bits). The resource is consumed in the process — each Bell pair is used exactly once. Entanglement can be quantified and traded against other resources (qubits, classical bits) in the quantum resource theory framework. However, entanglement cannot enable faster-than-light (FTL) communication. In both teleportation and superdense coding, the full protocol requires a classical channel whose speed is bounded by $c$. In teleportation, before Bob receives Alice's 2 classical bits, his qubit is in a maximally mixed state with no information about $|\psi\rangle$ — the measurement outcome is random from Bob's perspective. Measuring his qubit early gives a random result, independent of Alice's choice. The non-local correlations of entanglement are real but do not carry information: Alice's measurement result is random and uncontrollable, preventing signaling. This is the no-signaling theorem: entanglement correlations cannot be used to transmit information without a classical channel.

---

**Question 10.** Explain why the NSA does not recommend QKD for securing national security systems, even though QKD is information-theoretically secure.

??? success "Answer"
    The NSA's 2021 guidance explicitly recommends against QKD for national security systems, citing several practical concerns that outweigh the theoretical security advantage. First, QKD protects only the key distribution step — the classical encryption algorithm (AES), authentication protocols, and all endpoint security must still be implemented correctly; a mathematically perfect quantum channel provides no protection against implementation bugs, side-channel attacks, or Trojan hardware in the QKD devices themselves. Second, QKD has been broken in practice: numerous attacks on commercial QKD systems have been demonstrated, including detector blinding attacks (Lydersen et al. 2010), that exploit imperfections in physical implementations rather than the theoretical protocol. Third, QKD requires dedicated infrastructure (specialized fiber or free-space optical links) that is expensive, not scalable to internet deployment, and unavailable for most operational contexts (satellite, mobile, tactical communications). Fourth, PQC (NIST FIPS 203/204/205) provides a software upgrade path achieving comparable security (computationally, not information-theoretically) with no specialized hardware, interoperability with existing infrastructure, and well-understood implementation security. The NSA's position reflects a pragmatic engineering assessment: the operational limitations and attack surface of real QKD deployments outweigh its theoretical superiority over PQC.

---

## Level 3 — Apply

**Question 11.** Apply the quantum teleportation protocol to teleport the state $|\psi\rangle = \frac{|0\rangle + i|1\rangle}{\sqrt{2}}$. Show which Pauli correction Bob must apply for each of the four possible measurement outcomes.

??? success "Answer"
    **Setup:** $|\psi\rangle = \frac{1}{\sqrt{2}}(|0\rangle + i|1\rangle)$, so $\alpha = 1/\sqrt{2}$, $\beta = i/\sqrt{2}$.

    After Alice's Bell measurement, Bob's qubit is in one of four states:

    | Measurement outcome | Bob's state | Required correction | Result after correction |
    |---|---|---|---|
    | $|00\rangle$ | $\frac{1}{\sqrt{2}}(\alpha|0\rangle + \beta|1\rangle) = \frac{1}{\sqrt{2}}(|0\rangle + i|1\rangle)$ | $I$ | $|\psi\rangle$ ✓ |
    | $|01\rangle$ | $\frac{1}{\sqrt{2}}(\alpha|1\rangle + \beta|0\rangle) = \frac{1}{\sqrt{2}}(i|0\rangle + |1\rangle)$ | $X$ then phase fix | Apply $X$: $\frac{1}{\sqrt{2}}(|0\rangle + i|1\rangle)$ — but need to account for coefficient: Apply $X$ gives $\frac{1}{\sqrt{2}}(\beta|0\rangle + \alpha|1\rangle)$, then the correction is $X$ followed by noting $X$ alone gives $\frac{1}{\sqrt{2}}(i|0\rangle + |1\rangle)$. Correction: $X$, giving $\frac{1}{\sqrt{2}}(\beta|0\rangle + \alpha|1\rangle) \cdot e^{i\phi}$ ... let us be precise: Bob has $\frac{1}{\sqrt{2}}(i|0\rangle + |1\rangle) = i\frac{1}{\sqrt{2}}(|0\rangle - i|1\rangle)$. Apply $X$: $i\frac{1}{\sqrt{2}}(|1\rangle - i|0\rangle) = -i \cdot \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle/i)$ — apply $ZX$ instead: $ZX$ gives state $= |\psi\rangle$ up to global phase. |
    | $|10\rangle$ | $\frac{1}{\sqrt{2}}(\alpha|0\rangle - \beta|1\rangle) = \frac{1}{\sqrt{2}}(|0\rangle - i|1\rangle)$ | $Z$ | $Z\frac{1}{\sqrt{2}}(|0\rangle - i|1\rangle) = \frac{1}{\sqrt{2}}(|0\rangle + i|1\rangle) = |\psi\rangle$ ✓ |
    | $|11\rangle$ | $\frac{1}{\sqrt{2}}(\alpha|1\rangle - \beta|0\rangle) = \frac{1}{\sqrt{2}}(-i|0\rangle + |1\rangle)$ | $ZX$ | Apply $X$ then $Z$: recovers $|\psi\rangle$ up to global phase ✓ |

    **Summary:** Corrections are $I$ (00), $X$ (01), $Z$ (10), $ZX$ (11) — the standard Pauli corrections, independent of the specific state $|\psi\rangle$ being teleported.

---

**Question 12.** In superdense coding, Alice wants to send the 2-bit message "11" to Bob. They share the Bell state $|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$. Show which operation Alice applies and what state is sent to Bob, and describe Bob's measurement.

??? success "Answer"
    **Encoding table for superdense coding:**
    | Message | Alice's operation | Resulting Bell state |
    |---|---|---|
    | 00 | $I$ | $|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$ |
    | 01 | $X$ | $|\Psi^+\rangle = \frac{|10\rangle + |01\rangle}{\sqrt{2}}$ |
    | 10 | $Z$ | $|\Phi^-\rangle = \frac{|00\rangle - |11\rangle}{\sqrt{2}}$ |
    | 11 | $iY$ | $|\Psi^-\rangle = \frac{|10\rangle - |01\rangle}{\sqrt{2}}$ |

    **For message "11":** Alice applies $iY = \begin{pmatrix}0 & 1 \\ -1 & 0\end{pmatrix}$ to her qubit (qubit 1):

    $$iY \otimes I \, \frac{|00\rangle + |11\rangle}{\sqrt{2}} = \frac{iY|0\rangle|0\rangle + iY|1\rangle|1\rangle}{\sqrt{2}} = \frac{|1\rangle|0\rangle - |0\rangle|1\rangle}{\sqrt{2}} = \frac{|10\rangle - |01\rangle}{\sqrt{2}} = |\Psi^-\rangle$$

    Alice sends her qubit to Bob. Bob now holds both qubits in state $|\Psi^-\rangle$.

    **Bob's Bell measurement:** Bob applies CNOT (qubit 1 → qubit 2) then $H$ to qubit 1, then measures both in the computational basis. For $|\Psi^-\rangle$: after CNOT, $|\Psi^-\rangle \to \frac{|11\rangle - |01\rangle}{\sqrt{2}} = \frac{|1\rangle - |0\rangle}{\sqrt{2}}|1\rangle = -|-\rangle|1\rangle$. After $H$ on qubit 1: $-H|-\rangle|1\rangle = -|1\rangle|1\rangle = -|11\rangle$. Bob measures outcome $|11\rangle$ (global phase is irrelevant), correctly recovering message "11".

---

**Question 13.** Apply the security analysis of BB84 to the following scenario: Alice and Bob measure a QBER of 8% after sifting. Should they abort the protocol? What does this QBER imply about Eve's information?

??? success "Answer"
    **Should they abort?** With a QBER of 8%, they should **not** abort — this is below the typical security threshold. For BB84 with one-way classical post-processing, the security threshold is approximately QBER $< 11\%$ (Shor-Preskill security proof). For two-way post-processing (Gottesman-Lo), the threshold extends to roughly 18.9%. At 8%, the protocol can proceed to error correction and privacy amplification.

    **Implications for Eve's information:**
    Under the intercept-resend attack model, a QBER of $e = 0.08$ implies Eve intercepted a fraction $f = 4e = 32\%$ of the qubits (since each intercepted qubit causes a 25% error rate: $f \times 0.25 = 0.08 \Rightarrow f = 0.32$). If Eve intercepted 32% of the raw key bits, she has partial information on up to 32% of the sifted key bits. Privacy amplification hashes the sifted key to a shorter final key, reducing Eve's information exponentially — if Alice and Bob sacrifice $\approx 32\%$ of the sifted key to privacy amplification (in addition to error correction overhead), the final key is information-theoretically secure against this level of eavesdropping. The protocol succeeds but yields a shorter final key than in the zero-QBER case.

---

**Question 14.** Apply the concept of entanglement swapping to sketch a quantum repeater protocol that extends the range of entanglement distribution between Alice and Bob beyond the direct fiber loss limit (~100 km).

??? success "Answer"
    **Problem:** Photon loss in optical fiber grows exponentially with distance ($\sim 0.2$ dB/km for telecom fiber). At 200 km, direct transmission has success probability $\sim 10^{-6}$ per photon, making Bell pair distribution infeasible.

    **Quantum repeater protocol:**

    **Setup:** Place repeater node C halfway between Alice and Bob.

    **Step 1 — Local Bell pair generation:**
    - Alice generates Bell pair $|\Phi^+\rangle_{A,C_1}$ with the first half going to Alice, second half to node C
    - Bob generates Bell pair $|\Phi^+\rangle_{C_2,B}$ with first half at node C, second half at Bob
    - Each pair spans only 100 km, with a much higher success probability

    **Step 2 — Entanglement swapping at node C:**
    - Node C performs a Bell measurement on its two qubits $C_1$ and $C_2$
    - This projects Alice's qubit and Bob's qubit into a Bell state, creating $|\Phi^+\rangle_{A,B}$ (up to a Pauli correction)

    **Step 3 — Classical communication:**
    - C broadcasts its 2-bit Bell measurement outcome to Alice and Bob
    - Bob applies the appropriate Pauli correction to his qubit

    **Step 4 — Result:**
    Alice and Bob share a Bell pair across 200 km without a photon ever traveling that distance.

    **Cascading:** Multiple repeater nodes can extend range further. With $n$ segments of 100 km each: probability of establishing all $n$ pairs simultaneously scales as $(p_{100km})^n$ rather than $p_{n \times 100km}$, a dramatic improvement. Quantum memories at nodes allow storing established pairs while waiting for other segments to succeed.

---

**Question 15.** Apply privacy amplification to explain how Alice and Bob reduce Eve's partial information to negligible levels after BB84 key sifting. Sketch the mathematical tool used.

??? success "Answer"
    **Setup after sifting and error correction:** Alice and Bob share an $n$-bit string $K$ that is identical (after error correction) but about which Eve has at most $m$ bits of information (estimated from the QBER).

    **Privacy amplification procedure:**

    Alice and Bob publicly agree on a random hash function $h: \{0,1\}^n \to \{0,1\}^r$ from a 2-universal hash family, where $r = n - m - s$ and $s$ is a security parameter (e.g., $s = 100$ bits).

    They apply $h$ to their shared string: final key $K_{final} = h(K)$.

    **Mathematical guarantee (Leftover Hash Lemma):**

    $$\|p_{K_{final}, E} - U_r \otimes p_E\|_1 \leq 2^{-(s/2)}$$

    where $U_r$ is the uniform distribution over $r$-bit strings and $E$ is Eve's quantum side information. This says that the final key is statistically indistinguishable from a uniformly random string, independent of Eve's system, with error exponentially small in $s$.

    **Practical implementation:** Universal hash families can be implemented using: random Toeplitz matrices (matrix-vector product over GF(2)), polynomial hashing mod a prime, or LFSR-based constructions. The randomness of the hash function is public but the output key remains secret. The key length is shortened by $m + s$ bits to guarantee $2^{-s/2}$ composable security — a quantifiable security guarantee that allows the key to be safely used in symmetric encryption.

---

## Level 4 — Analyze

**Question 16.** Analyze the capacity advantage of superdense coding versus teleportation from a resource theory perspective. Which protocol is more "efficient" as a quantum communication protocol?

??? success "Answer"
    Comparing superdense coding and teleportation as resource conversion protocols reveals their dual relationship:

    - **Superdense coding:** 1 ebit + 1 qubit transmission → 2 classical bits
    - **Teleportation:** 1 ebit + 2 classical bits → 1 qubit transmission

    From the perspective of quantum communication complexity, teleportation is arguably more fundamental: it shows how to transmit an unknown quantum state (which requires infinitely many classical bits to describe exactly) using only a finite resource (1 ebit + 2 bits). Superdense coding is valuable when quantum channel capacity is the bottleneck but classical bits are cheap — a scenario relevant to quantum networks where qubit transmission is expensive. Neither protocol is universally "more efficient"; they solve dual problems. In the quantum Shannon theory framework, the two protocols are related by time-reversal (interchanging the roles of entanglement and channel use) and together define the capacity region of the entanglement-assisted quantum channel: $C_{EA} = 2Q$ (twice the quantum channel capacity $Q$), with each protocol achieving one extreme of the trade-off surface. Resource efficiency depends entirely on which resource (qubit channel use, ebit consumption, or classical bit channel use) is the binding constraint in a specific application.

---

**Question 17.** Analyze the practical limitations of quantum key distribution compared to post-quantum cryptography for securing internet communications at scale. Consider both technical and operational factors.

??? success "Answer"
    **Technical limitations of QKD:**
    - **Distance:** Fiber QKD is limited to ~100–150 km without quantum repeaters (which remain experimental, requiring quantum memories with second-scale coherence times not yet demonstrated). Satellite QKD (Micius experiments) achieves ~1,200 km but requires clear sky and satellite overhead windows.
    - **Rate:** Current QKD systems achieve secure key rates of ~kbps to Mbps at metropolitan distances — adequate for key distribution but not for bulk encryption. Continuous-variable QKD has better rates but stricter hardware requirements.
    - **Authentication:** QKD still requires an authenticated classical channel (using pre-shared symmetric keys or PQC signatures) to prevent man-in-the-middle attacks. It does not eliminate the key management problem.
    - **Hardware attacks:** Device-dependent QKD has been repeatedly compromised by physical attacks on detectors and sources. Device-independent QKD (DIQKD) is theoretically immune but experimentally immature.

    **Operational limitations:**
    - Each QKD link requires dedicated quantum hardware at both endpoints: specialized single-photon sources/detectors, precise optical alignment, environmental isolation
    - No packet routing: QKD is inherently point-to-point; networks require trusted relay nodes, each a security vulnerability
    - Incompatible with existing internet infrastructure (TCP/IP, VPNs, CDNs)
    - High deployment cost: $100K–$1M per link vs. PQC software upgrade costing essentially nothing

    **PQC advantages:** Runs on existing hardware, software-upgradable, internet-compatible, deployable globally within years, standardized (FIPS 203/204/205). The sole advantage of QKD — information-theoretic security — is not operationally relevant for most use cases where computational security (128-bit quantum) is sufficient. QKD is appropriate for specific high-value, physically secured, point-to-point links (government, military, financial clearing); PQC is the correct solution for internet-scale security.

---

**Question 18.** Analyze how the no-cloning theorem and the measurement disturbance principle together provide the security foundation for BB84. Which one alone would be insufficient?

??? success "Answer"
    BB84 security relies on both principles working in concert, and neither alone is sufficient. The **no-cloning theorem** prevents Eve from copying Alice's qubits to defer measurement: if cloning were possible, Eve could copy each qubit, let the original pass to Bob undisturbed, and measure her copy later to infer Alice's bits without introducing any errors. Cloning alone would completely defeat BB84. The **measurement disturbance principle** (a consequence of the uncertainty principle and projection postulate) ensures that measuring an unknown quantum state in the wrong basis irreversibly disturbs it: Eve measuring in the $\{|0\rangle, |1\rangle\}$ basis when Alice sent in the $\{|+\rangle, |-\rangle\}$ basis randomizes the qubit, causing errors that Alice and Bob detect via QBER estimation. However, if measurement could be performed without disturbance — hypothetically, if Eve could measure while leaving the qubit intact — then even with no-cloning, Eve could extract information undetected. Conversely, if cloning were allowed but measurement still caused disturbance, Eve could simply clone and measure the copy; Bob's qubit would remain undisturbed and no errors would arise. Only the combination guarantees security: no-cloning prevents undetected copying, and measurement disturbance ensures any attempt to extract information produces detectable evidence. Together, they make information gain and disturbance fundamentally inseparable in quantum mechanics.

---

**Question 19.** Analyze the "quantum internet" architecture. What are the distinct layers of functionality a quantum internet would require, and what is the current state of technology at each layer?

??? success "Answer"
    A quantum internet requires a layered architecture analogous to the classical internet's OSI model:

    **Layer 1 — Physical (quantum channel):**
    Function: transmit single photons or entangled photon pairs over fiber or free-space.
    Status: Mature for metropolitan distances (< 100 km). Commercial QKD systems exist. Satellite QKD demonstrated (Micius, 2017). Bottleneck: photon loss limits rates at distance.

    **Layer 2 — Entanglement distribution:**
    Function: distribute Bell pairs between adjacent network nodes with high fidelity.
    Status: Demonstrated in lab over fiber (Delft, 2022: three-node entanglement). Quantum memories with second-scale coherence needed; current best: ~1 second in NV centers, rare-earth doped crystals. Not yet deployed outside research labs.

    **Layer 3 — Quantum repeaters:**
    Function: extend entanglement range via entanglement swapping across multiple hops.
    Status: First-generation repeaters (without quantum error correction) demonstrated over short distances. Full fault-tolerant quantum repeaters (third generation) require quantum error correction at each node — not yet experimentally realized.

    **Layer 4 — Entanglement purification:**
    Function: distill high-fidelity Bell pairs from multiple noisy pairs.
    Status: Demonstrated in small-scale experiments. Requires two-way classical communication and quantum memories.

    **Layer 5 — Quantum network protocol:**
    Function: routing, resource allocation, qubit addressing.
    Status: Theoretical proposals exist (quantum network stack, QREP protocol). No deployed quantum network layer.

    **Layer 6 — Application:**
    Function: QKD, distributed quantum computing, quantum sensing.
    Status: QKD is commercially deployed at Layer 6 using classical repeaters (trusted nodes). True quantum network applications remain experimental.

    Overall assessment: the quantum internet is approximately at the stage of classical networking in the 1970s — point-to-point links work, but multi-hop quantum networks with full entanglement distribution are a decade+ away.

---

**Question 20.** Analyze the relationship between the channel capacity theorems of quantum information theory and the superdense coding / teleportation results. How do the Holevo bound and quantum channel capacity $Q$ connect to these protocols?

??? success "Answer"
    The Holevo bound states that $n$ qubits can carry at most $n$ bits of accessible classical information, regardless of encoding. This appears to conflict with superdense coding transmitting 2 bits per qubit — but the bound is circumvented because the qubit in superdense coding is transmitted through an entanglement-assisted channel, not a bare quantum channel. The relevant capacity theorem for entanglement-assisted quantum channels (Bennett et al. 2002) states that the entanglement-assisted classical capacity is $C_{EA} = Q + S(\rho)$, where $Q$ is the quantum channel capacity and $S(\rho)$ is the von Neumann entropy of the channel input. For a noiseless qubit channel ($Q = 1$ qubit/use, $S = 1$ bit for maximally mixed input), $C_{EA} = 1 + 1 = 2$ bits/qubit — exactly the superdense coding result. Teleportation corresponds to the complementary resource trading: 1 ebit + 2 classical bits = 1 qubit channel use, consistent with the quantum capacity formula $Q = 2[C_{EA}/2 - S]$ in the appropriate limit. The superdense coding capacity (2 bits/qubit-channel-use with ebits) and the teleportation capacity (1 qubit-channel-use per ebit + 2 classical bits) together define the complete entanglement-classical-quantum capacity region, showing that these protocols are not just clever tricks but achieve the information-theoretic limits of quantum communication.

---

## Level 5 — Evaluate

**Question 21.** Evaluate the security assumptions underlying BB84. Under what conditions does the information-theoretic security guarantee actually hold, and what are the most dangerous gaps between theory and practice?

??? success "Answer"
    BB84's information-theoretic security guarantee is proven under several idealized assumptions that may not hold in practice. The theory assumes: (1) Alice sends single photons — real attenuated laser sources send weak coherent pulses that occasionally emit multiple photons, enabling the photon-number-splitting (PNS) attack where Eve intercepts extra photons without causing errors. The decoy state protocol (Lo, Ma, Chen 2005) partially addresses this. (2) Measurements are projective and basis-aligned — real detectors have efficiency imbalances, dark counts, and detector blinding vulnerabilities (Lydersen 2010 attack). (3) The classical authentication channel is secure — without this, man-in-the-middle attacks break BB84 completely; authentication requires pre-shared keys, re-introducing the key distribution problem. (4) Alice's random number generator is truly random — compromised randomness breaks security. (5) Alice's and Bob's devices are trusted — device-independent QKD removes this assumption but is experimentally immature. The most dangerous gap is the implementation vs. model mismatch: Scarani et al.'s review (2009) showed that every practical QKD implementation has been successfully attacked by exploiting physical imperfections not captured in the theoretical model. The information-theoretic security proof applies to the mathematical protocol, not necessarily to any physical realization. Device-independent QKD would close most gaps but requires loophole-free Bell test conditions that impose severe distance and rate constraints.

---

**Question 22.** Evaluate the prospects for practical quantum repeaters. What technical milestones are needed, and how far away is a functional intercontinental quantum network?

??? success "Answer"
    Practical quantum repeaters require simultaneous advances on multiple fronts, each currently facing fundamental challenges. The required milestones are:

    **Quantum memories:** Need storage times of seconds (to bridge the ~5ms light travel time for 1000 km) with high efficiency ($> 90\%$) and high fidelity ($> 99\%$). Current best laboratory results: NV centers in diamond achieve ~1 second coherence with ~10% efficiency; rare-earth crystals (Eu:Y$_2$SiO$_5$) show hours of coherence but poor efficiency. Gap: 1–2 orders of magnitude improvement needed.

    **Entanglement generation rate:** Bell pairs must be generated at rates exceeding the memory decoherence rate. Current entanglement generation between nodes (Delft group, 2022): ~10–100 Hz over ~2 km fiber. Required for 1000 km network: ~kHz rates at each node.

    **Error correction at repeater nodes:** Third-generation repeaters require local quantum error correction with logical qubit coherence exceeding round-trip classical communication time. This requires fault-tolerant quantum processors at each node — essentially a small quantum computer at every repeater station.

    **Timeline assessment:**
    - First-generation quantum repeater (no error correction, probabilistic): 5–10 years
    - Metropolitan quantum network (< 50 km, trusted nodes + limited quantum nodes): 5 years (near-term)
    - Continental quantum network with full quantum repeaters: 15–25 years
    - Intercontinental quantum network at practical rates: 20–30 years minimum

    Satellite-based quantum communication (ground-to-satellite entanglement distribution) may provide an alternative path to intercontinental range within 10–15 years, circumventing fiber loss, though this requires space-qualified quantum hardware and is weather-dependent.

---

**Question 23.** Evaluate the claim that "quantum teleportation allows faster-than-light communication." Provide a rigorous argument for why this is impossible, and explain what teleportation actually achieves.

??? success "Answer"
    The claim is false, and multiple rigorous arguments establish this. The most direct: **No-signaling from quantum mechanics.** Before Alice sends her 2 classical bits, Bob's reduced state is $\rho_B = \text{Tr}_{CA}(|\Psi\rangle\langle\Psi|)$, which is the maximally mixed state $I/2$ regardless of Alice's qubit state $|\psi\rangle$. Bob cannot distinguish $|\psi\rangle = |0\rangle$ from $|\psi\rangle = |+\rangle$ by measuring his qubit without the classical bits — both give maximally mixed outcomes. No information about $|\psi\rangle$ reaches Bob until the classical bits arrive, which travel at most at speed $c$.

    **No-cloning argument:** If teleportation permitted FTL communication, Alice could send bit $b$ by: choosing $|0\rangle$ for $b=0$ or $|1\rangle$ for $b=1$, teleporting it, and having Bob's qubit "instantaneously" be in the right state. But Bob's state is $I/2$ before classical communication — he cannot read Alice's choice. The classical channel is not a bug; it is the mechanism that carries all the information.

    **What teleportation actually achieves:** It transfers an unknown quantum state from Alice to Bob using entanglement as a resource, consuming it in the process. It demonstrates that quantum states are a transferable resource and that entanglement + classical communication is equivalent to quantum channel use in certain resource-theoretic senses. It is fundamental for quantum networking: it allows quantum states to be moved between nodes that share Bell pairs, enabling distributed quantum computing and quantum key distribution relay without direct quantum channels at the time of transmission.

---

**Question 24.** Evaluate whether the security of BB84 and the security of lattice-based PQC can be compared on the same scale. What are the fundamental differences in the nature of their security guarantees?

??? success "Answer"
    BB84 and lattice-based PQC (e.g., ML-KEM) provide security guarantees of fundamentally different types that cannot be directly compared on a single scale.

    **BB84 security (information-theoretic):** The guarantee is unconditional — it holds against computationally unbounded adversaries and does not depend on any mathematical hardness assumption. It is proven within the laws of quantum mechanics: any eavesdropping strategy, however clever, either leaves detectable traces or gains zero information. The security parameter is the final key length minus Eve's information bound (measured in bits of smooth min-entropy). This guarantee is permanent: a key established via BB84 remains secure forever.

    **ML-KEM security (computational):** Security is reducible to the Module LWE problem — breaking ML-KEM is at least as hard as solving MLWE. The reduction is tight and well-understood. However, the security depends on: (a) the MLWE problem remaining hard (no breakthrough algorithm discovered), (b) the security reduction holding tightly (reduction losses are known and bounded), (c) correct implementation (side-channel free). Security is measured in "bits" defined as $-\log_2$ of the best known attack success probability per unit resource.

    **Comparison difficulty:** These are qualitatively different: "secure against all adversaries" vs. "secure against known classes of algorithms." 128-bit lattice security is not equivalent to 128-bit information-theoretic security — the former means the best known attack takes $2^{128}$ operations; the latter means even unlimited computation gains no information. Neither scale applies to both: BB84's information-theoretic security has no classical/quantum operational complexity; ML-KEM's computational security has no meaning in information-theoretic terms. The comparison is a category error. For practical purposes: BB84 provides stronger theoretical security but with severe operational constraints; ML-KEM provides sufficient security for all foreseeable practical threats with universal deployability.

---

**Question 25.** Evaluate the "entanglement distribution" step as the fundamental bottleneck in quantum networking. What approaches are being pursued to overcome it, and which shows the most promise?

??? success "Answer"
    Entanglement distribution is indeed the critical bottleneck because all quantum network protocols (teleportation, QKD, distributed quantum computing) require Bell pairs as a shared resource, and generating them reliably between distant nodes is orders of magnitude harder than classical bit transmission. The core problem is photon loss: generating and transmitting a single photon between nodes 100 km apart succeeds with probability $\sim 10^{-4}$, making direct Bell pair generation at rates above a few Hz impractical.

    **Approaches and assessment:**

    **1. Quantum memories + heralded entanglement generation (most mature):**
    Entangle a qubit (NV center, trapped ion, rare-earth atom) with a photon; transmit the photon; perform Bell measurement at a midpoint. Success is heralded by the midpoint measurement. Store the successful qubit in a quantum memory while the other segment is attempted. Status: demonstrated in lab (Delft 2022), requires memory improvements. Timeline: 5–10 years for useful deployment.

    **2. Satellite QKD / entanglement (medium-term):**
    Satellites eliminate fiber loss (free-space loss scales as $R^2$ not $e^{\alpha R}$). China's Micius demonstrated entanglement distribution at 1200 km (2017). Constellation of low-Earth-orbit quantum satellites could provide global coverage. Limitations: weather dependence, low rates (kHz), high hardware cost, primarily useful for QKD rather than general quantum networking.

    **3. All-photonic quantum repeaters (no quantum memories):**
    Use photonic cluster states and linear optical Bell measurements to create "forward error corrected" entanglement distribution without storing qubits. Proposed by Azuma et al. (2015). Advantage: no coherence time requirement. Disadvantage: extremely high photon generation and detection efficiency required ($> 99.9\%$), not yet achievable.

    **Most promising near-term path:** Quantum memories in rare-earth-doped crystals combined with frequency-converted telecom-wavelength photons, operating in quantum memory-assisted entanglement distribution networks at the metropolitan scale. This approach has the most credible experimental pathway to practical deployment within 10 years, while fully global quantum networks await third-generation repeaters.

---

## Level 6 — Create

**Question 26.** Design a three-node quantum network protocol that distributes a GHZ state $|\text{GHZ}\rangle = \frac{|000\rangle + |111\rangle}{\sqrt{2}}$ among Alice, Bob, and Charlie using only Bell pairs and local operations. Specify the entanglement swapping steps and classical communication requirements.

??? success "Answer"
    **Goal:** Distribute $|\text{GHZ}\rangle_{ABC}$ using Bell pairs as primitive resources.

    **Resource preparation:**
    - Alice and Bob pre-share Bell pair: $|\Phi^+\rangle_{A_1B_1} = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$
    - Bob and Charlie pre-share Bell pair: $|\Phi^+\rangle_{B_2C_1} = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$
    - Alice holds qubit $A_1$, Bob holds $B_1$ and $B_2$, Charlie holds $C_1$

    **Step 1 — Prepare Alice's GHZ seed qubit:**
    Alice prepares a fresh ancilla $A_0 = |0\rangle$ and applies:
    - $H$ to $A_0$: $|0\rangle \to |+\rangle$
    - $CNOT_{A_0 \to A_1}$: entangles $A_0$ with the Bell pair

    After this: the three-qubit state $A_0, A_1, B_1$ is:
    $$\frac{|000\rangle + |111\rangle}{\sqrt{2}}_{A_0,A_1,B_1}$$

    **Step 2 — Entanglement swapping at Bob:**
    Bob performs a Bell measurement on his two qubits $B_1$ and $B_2$. This projects the state of $A_0, B_2, C_1$ into a GHZ-like state (up to local Pauli corrections). Specifically, the four-qubit state $A_0, A_1, B_1, B_2, C_1$ before Bob's measurement is:
    $$\frac{|0\rangle_{A_0}(|00\rangle + |11\rangle)_{A_1,B_1}(|00\rangle + |11\rangle)_{B_2,C_1} + |1\rangle_{A_0}...}{...}$$

    After Bob's Bell measurement on $(B_1, B_2)$ with outcome $|xy\rangle$: the remaining state of $(A_0, B_2 \to \text{discard}, C_1)$ projects onto a state that, after Bob broadcasts the 2-bit outcome, can be corrected by Charlie.

    **Step 3 — Correction:**
    Bob broadcasts 2 classical bits to Charlie. Charlie applies: $I$ (outcome 00), $X$ (01), $Z$ (10), $ZX$ (11) to qubit $C_1$.

    **Result:** $\frac{|000\rangle + |111\rangle}{\sqrt{2}}_{A_0, A_1, C_1}$ — the GHZ state distributed across Alice ($A_0$), Alice's node ($A_1$ discarded or kept), and Charlie.

    **Classical communication:** 2 bits from Bob to Charlie. Total resources: 2 Bell pairs + 1 ancilla qubit + local operations.

    **Extension:** For a true three-party GHZ with one qubit each at Alice, Bob, Charlie, use a direct GHZ source (e.g., type-II SPDC) or extend the swapping chain with Bob keeping qubit $B_2$ as his share rather than discarding it.

---

**Question 27.** Design a device-independent QKD (DIQKD) protocol outline. Explain how the CHSH inequality violation replaces the need to trust Alice's and Bob's devices, and identify the key experimental requirements.

??? success "Answer"
    **Motivation:** Standard QKD assumes Alice and Bob trust their own devices. A compromised device could leak key bits to the manufacturer. Device-independent QKD removes this assumption: security is certified by the observed violation of a Bell inequality alone.

    **Protocol outline:**

    **Step 1 — Entanglement generation:**
    An untrusted source (potentially controlled by the adversary Eve) generates pairs of particles and sends one to Alice and one to Bob.

    **Step 2 — Random measurement settings:**
    Each round, Alice independently and uniformly randomly chooses input $x \in \{0, 1\}$ and measures with setting $A_x$; Bob independently chooses $y \in \{0, 1\}$ and measures with setting $B_y$. Outputs are $a, b \in \{-1, +1\}$.

    **Step 3 — CHSH test:**
    Compute the CHSH correlation:
    $$S = |\langle A_0 B_0 \rangle + \langle A_0 B_1 \rangle + \langle A_1 B_0 \rangle - \langle A_1 B_1 \rangle|$$
    Classical local hidden variable theories satisfy $S \leq 2$. Quantum mechanics allows $S \leq 2\sqrt{2} \approx 2.83$. Observing $S > 2$ certifies genuine quantum correlations.

    **Step 4 — Key extraction:**
    The output bits from a designated subset of rounds (e.g., $x = y = 0$) form the raw key. Rounds used for the CHSH test are sacrificed (announced publicly).

    **Step 5 — Classical postprocessing:**
    Apply error correction and privacy amplification. The amount of randomness that must be sacrificed in privacy amplification is quantified by Eve's conditional entropy, which is upper bounded by the observed CHSH violation via the Pironio et al. (2010) entropy accumulation framework.

    **Security guarantee:** If $S > 2$, the outputs $a$ when $x = 0$ are partially random even from Eve's perspective. As $S \to 2\sqrt{2}$, the outputs become maximally random and Eve's information approaches zero.

    **Key experimental requirements:**

    1. **Loophole-free Bell test:** The detection loophole (detector efficiency $> 82\%$ for qubits) and locality loophole (space-like separated measurement events) must both be closed simultaneously. This requires: (a) high-efficiency ($> 90\%$) single-photon detectors, (b) measurement stations separated by hundreds of meters with synchronized fast switching.

    2. **High-rate entanglement generation:** Current loophole-free Bell test rates are ~1 Hz (Hensen et al. 2015, Delft). Practical DIQKD requires rates of kHz–MHz to achieve useful key rates. This is the primary experimental gap.

    3. **Fast random number generation:** Measurement settings must be chosen faster than any light-speed signal between stations.

    4. **Low noise:** QBER must be low enough that $S$ significantly exceeds 2 with high statistical confidence.

    DIQKD was recently demonstrated experimentally (Nadlinger et al., Nature 2022; Zhang et al., Nature 2022) at very low key rates (~bits/minute), confirming feasibility. Practical deployment requires several orders of magnitude improvement in entanglement generation rates.

---

**Question 28.** Create a protocol for quantum secret sharing, where a secret qubit state $|\psi\rangle$ is split into three shares (for Alice, Bob, Charlie) such that any two shares can reconstruct the secret but one share alone reveals nothing. Specify the encoding circuit and the reconstruction procedure.

??? success "Answer"
    **Protocol: $[[3,1,2]]$ quantum secret sharing (Hillery, Bužek, Berthiaume 1999)**

    **Goal:** Encode $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ into a three-qubit state such that any 2 of 3 parties can reconstruct $|\psi\rangle$ and no single party gains any information.

    **Encoding circuit:**

    **Inputs:** Dealer has $|\psi\rangle_D$ (the secret) and two ancilla qubits $|0\rangle_B$, $|0\rangle_C$.

    **Step 1:** Hadamard on all three: $H_D \otimes H_B \otimes H_C$

    Actually, a cleaner protocol uses the GHZ-based encoding:

    **Step 1:** Apply $H$ to $|\psi\rangle_D$
    **Step 2:** Apply $CNOT_{D\to B}$
    **Step 3:** Apply $CNOT_{D\to C}$

    For $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$:

    $$\alpha|0\rangle_{D}\to \alpha \frac{|000\rangle + |011\rangle}{\sqrt{2}} \quad \text{(after H and CNOTs)}$$
    $$\beta|1\rangle_{D}\to \beta \frac{|111\rangle + |100\rangle}{\sqrt{2}}$$

    More precisely, the encoded state is:
    $$|\Psi_{enc}\rangle = \alpha\frac{|000\rangle + |011\rangle}{\sqrt{2}} + \beta\frac{|110\rangle + |101\rangle}{\sqrt{2}}$$

    Shares: Alice holds qubit $D$, Bob holds qubit $B$, Charlie holds qubit $C$.

    **Single-party information:** Tracing out any two qubits: each party holds a maximally mixed state $I/2$, independent of $\alpha, \beta$. No information about the secret is accessible from any single share.

    **Two-party reconstruction (Alice + Bob have qubits $D, B$; Charlie is absent):**

    1. Alice and Bob bring their qubits together
    2. Apply $CNOT_{D\to B}$, then $H$ to $D$, then measure $D$ and $B$ in computational basis
    3. Depending on measurement outcome $(m_D, m_B)$: apply Pauli corrections $X^{m_D} Z^{m_D \oplus m_B}$ to a fresh ancilla that has been teleportation-corrected — the two-qubit state of Alice+Bob holds sufficient information to reconstruct $|\psi\rangle$ via a local Bell measurement + correction protocol

    **Security:** The $[[3,1,2]]$ quantum secret sharing scheme has information-theoretic security: without Charlie, even computationally unbounded Alice+Bob (without Charlie) cannot reconstruct the secret; any two parties can reconstruct it. This is the quantum analog of Shamir's $k$-of-$n$ classical secret sharing, here with $k = 2$, $n = 3$.

---

**Question 29.** Design an experiment to demonstrate quantum teleportation using polarization-encoded photons in an optical laboratory. Specify the required optical components, the Bell state measurement approach, and the classical feed-forward system. Estimate the required detector efficiencies for a convincing demonstration.

??? success "Answer"
    **Experimental design: Polarization-encoded photonic teleportation**

    **Physical encoding:**
    - Qubit basis: horizontal polarization $|H\rangle = |0\rangle$, vertical $|V\rangle = |1\rangle$
    - Source state $|\psi\rangle = \alpha|H\rangle + \beta|V\rangle$ prepared with a waveplates setup

    **Component list:**

    **Entangled pair source (Bell pair for Alice and Bob):**
    - Type-II SPDC crystal (e.g., beta-barium borate, BBO) pumped by 405 nm CW laser
    - Generates collinear or non-collinear photon pairs at 810 nm in state $|\Phi^+\rangle_{AB}$
    - PBS (polarizing beam splitter) to separate signal/idler

    **State preparation (Alice's unknown state):**
    - Attenuated coherent source at 810 nm
    - Half-wave plate (HWP) and quarter-wave plate (QWP) to set arbitrary $|\psi\rangle = \alpha|H\rangle + \beta|V\rangle$

    **Bell state measurement (Alice's node):**
    - Combine Alice's qubit ($C$) and her half of the entangled pair ($A$) on a 50/50 fiber beam splitter (HOM setup)
    - Hong-Ou-Mandel interference occurs when photons are indistinguishable
    - Two PBS after beam splitter, each followed by two single-photon avalanche detectors (SPADs)
    - Coincidence detection in 4-fold configuration identifies which of the 4 Bell states was measured
    - Note: linear optical Bell measurement can distinguish at most 2 of 4 Bell states deterministically; partial BSM identifies $|\Psi^+\rangle$ and $|\Psi^-\rangle$ (50% efficiency)

    **Classical feed-forward (real-time):**
    - FPGA-based coincidence electronics (timing resolution < 1 ns)
    - Alice's BSM result triggers electro-optic modulators (EOMs) at Bob's node within < 10 μs
    - EOM 1 (HWP equivalent): applies $X$ (bit flip correction) based on detection in $|\Psi^-\rangle$
    - EOM 2 (phase modulator): applies $Z$ (phase flip correction) based on detection pattern

    **Bob's verification:**
    - Quantum state tomography: measure Bob's output qubit in three bases ($\{H,V\}$, $\{D,A\}$, $\{R,L\}$)
    - Reconstruct density matrix, compute fidelity $F = \langle\psi|\rho_{Bob}|\psi\rangle$ with target state

    **Required efficiencies:**
    - For 4-fold coincidence teleportation: need $\eta_{detector}^4 \cdot \eta_{fiber}^4 \cdot \eta_{source}$ to be detectable
    - Minimum detector efficiency for reasonable rates (> 10 events/minute at source rate $10^6$/sec): $\eta > 0.5$ (50%)
    - For high-fidelity feed-forward ($F > 90\%$): detector timing jitter $< 200$ ps (to maintain photon indistinguishability at BSM)
    - Practically: Si-SPAD detectors at 810 nm achieve $\eta \approx 70\%$, sufficient
    - For telecom wavelength (1550 nm) using InGaAs SPADs: $\eta \approx 20–30\%$, requires source rate $> 10^7$/sec

    **Key figure of merit:** Teleportation fidelity $F > 2/3$ (classical limit) certifies quantum teleportation. State-of-the-art demonstrations achieve $F > 97\%$ (Bouwmeester 1997, improved to >99% in recent experiments).

---

**Question 30.** Design a complete quantum network security architecture for a hypothetical city-scale quantum internet with 10 nodes, each pair potentially needing to share a secret key. Specify the entanglement distribution strategy, key management protocol, integration with existing classical TLS infrastructure, and your strategy for handling node compromise.

??? success "Answer"
    **Network architecture: 10-node city-scale quantum key network**

    **Topology design:**
    With 10 nodes ($\binom{10}{2} = 45$ potential pairs), direct point-to-point quantum links to all pairs is impractical. Use a hub-and-spoke + ring hybrid:

    - **Quantum backbone ring:** 5 core nodes (banks, government) connected in a ring with direct quantum links (fiber, ~10–20 km spans)
    - **Edge nodes:** 5 peripheral nodes (enterprise, data centers) each with a direct link to one hub node
    - **Entanglement routing:** Use quantum repeaters at hub nodes to distribute entanglement between non-adjacent pairs via multi-hop entanglement swapping

    **Entanglement distribution strategy:**

    1. **Continuous Bell pair generation:** Each quantum link maintains a continuous entanglement generation service using single-photon sources + BSM at midpoints, targeting 1 Bell pair/second at $F > 95\%$
    2. **Quantum memory buffering:** Each node maintains quantum memories (rare-earth crystal, 100ms coherence) to buffer Bell pairs while the other end of a longer path is established
    3. **On-demand entanglement routing:** Classical network control plane (quantum network controller, QNC) schedules entanglement swapping at intermediate nodes, establishes end-to-end Bell pairs for requesting node pairs
    4. **Entanglement monitoring:** Continuous QBER and Bell violation monitoring on all links; links below $F < 90\%$ are flagged and traffic rerouted

    **Key management protocol:**

    Each established Bell pair is immediately consumed by BB84 (or E91 protocol using entanglement-based QKD) to generate a shared secret key bit between the two requesting nodes. Generated key bits are stored in hardware security modules (HSMs) at each node.

    Key rates: at 1 Bell pair/second per link with 50% sifting efficiency, each direct link produces ~0.3–0.5 secure bits/second (accounting for error correction and privacy amplification at 8% QBER). For 10-hop paths, rates drop to ~0.05 bits/second — sufficient for key establishment but not bulk encryption.

    **Integration with existing TLS infrastructure:**

    QKD-generated keys are used as pre-shared symmetric keys (PSK) in TLS 1.3:
    - TLS connections between nodes use `tls_psk` cipher suites with AES-256-GCM
    - QKD PSKs are refreshed hourly (or when key material drops below threshold)
    - Each node runs a local "quantum key server" (QKS) exposing a standard PKCS#11 API; existing TLS stacks query the QKS for pre-shared keys by node identifier
    - Hybrid mode: combine QKD-derived PSK with ML-KEM (FIPS 203) key exchange — both must be broken for security compromise
    - Certificate authentication: node certificates signed with ML-DSA (FIPS 204) to prevent man-in-the-middle attacks on the classical authentication channel

    **Node compromise response:**

    Threat model: an attacker gains physical access to a node, extracting stored quantum keys and quantum memory states.

    **Detection:** Each node monitors for physical intrusion (tamper-evident hardware, HSM zeroization triggers). Anomaly detection on key generation rates and QBER values.

    **Isolation:** Compromised node is immediately isolated from the quantum network (classical control plane severs quantum link scheduling). Adjacent nodes initiate emergency key refresh from alternate paths.

    **Key revocation:** All keys distributed via the compromised node are zeroized at all peer nodes. Since QKD keys are pre-shared symmetric keys, revocation is immediate and requires only classical communication.

    **Re-establishment:** Node is physically inspected and re-provisioned with new HSM credentials before re-admission. All peer nodes must independently verify the new node's BB84 identity via ML-DSA-signed certificates before resuming quantum key exchange.

    **Limitation:** Trusted relay nodes (where quantum memories store intermediate entanglement) are a fundamental security vulnerability — a compromised relay can reconstruct keys distributed through it. Mitigation: minimize relay trust by using quantum repeaters (no stored key material, only quantum states), multi-path key distribution with XOR combination (compromise of one path does not reveal the key if other paths are uncompromised).

    **Overall security assessment:** The architecture provides information-theoretic security for all direct quantum links and computational security (ML-KEM) for paths traversing trusted relays, with crypto-agility for rapid algorithm updates and a well-defined incident response plan for node compromise.
