# Frequently Asked Questions

This FAQ addresses the most common questions from executives, technical practitioners, and students studying quantum computing and its implications for cybersecurity.

---

## For Executives

**Q: What is the single most urgent thing my organization needs to do about quantum computing today?**

Begin cryptographic inventory and PQC migration planning *now*, even if a cryptographically relevant quantum computer is still years away. The "Harvest Now, Decrypt Later" (HNDL) threat means adversaries may already be archiving your encrypted traffic today to decrypt it once a quantum computer exists. NIST finalized three post-quantum standards (FIPS 203, 204, 205) in August 2024. The NSA's CNSA 2.0 mandates PQC deployment for national security systems by 2030. Begin with a cryptographic inventory — know what algorithms protect your most sensitive data.

---

**Q: When will quantum computers break RSA?**

No one knows with certainty — this is precisely what makes planning difficult. The most credible academic estimates suggest a cryptographically relevant quantum computer (CRQC) capable of breaking RSA-2048 is 10–20 years away. The 2024 Gidney & Ekerå analysis (updated) estimates ~4,000–8,000 logical qubits are required, which requires roughly 4–8 million physical qubits at surface code distance d=17. Current best hardware: ~100 logical qubits equivalent. However, breakthroughs in hardware or algorithms could accelerate this dramatically, and the HNDL attack is happening now. Use Mosca's theorem: if your data shelf-life + migration time exceeds the CRQC timeline, you are already at risk.

---

**Q: Are my current data backups and archives at risk?**

Yes, for long-lived sensitive data. This is the HNDL (Harvest Now, Decrypt Later) threat. Encrypted archives, long-term contracts, health records, and classified documents that were encrypted with RSA or ECDH before the PQC transition may be decryptable by a future quantum adversary. Data with a shelf-life exceeding 10 years and protected by pre-quantum cryptography is at greatest risk.

---

**Q: Should my company invest in quantum computing hardware?**

Almost certainly not, unless you are a research institution or large enterprise with specific computational needs (e.g., materials science, drug discovery simulation). For most organisations, the correct approach is: access quantum hardware via cloud APIs (IBM Quantum, AWS Braket, Azure Quantum, IonQ Cloud) without capital investment. Current NISQ hardware is too noisy for most commercial applications. Wait for fault-tolerant systems (likely late 2020s) before making application-specific bets.

---

**Q: What is a cryptographically relevant quantum computer (CRQC)?**

A CRQC is a quantum computer powerful enough to run Shor's algorithm to completion on cryptographically significant problem instances — for example, factoring RSA-2048 or computing discrete logarithms on the ECDSA P-256 curve. It requires: thousands of *logical* qubits (each protected by many physical qubits), gate error rates well below the fault-tolerance threshold (~1%), and the ability to execute ~10^8–10^11 operations without catastrophic failure. No CRQC exists today or is expected within 5 years by most analysts. However, "expected within 10–15 years" is now a mainstream estimate.

---

**Q: How much should we budget for quantum-related activities?**

A practical framework: (1) Cryptographic inventory and risk assessment: 0.5–1% of annual IT security budget. (2) PQC migration (libraries, testing, deployment): 2–5% of security budget over 5 years. (3) Quantum computing exploration (cloud access, proofs of concept): $50K–$500K/year depending on industry relevance. (4) Avoid large capital expenditure on quantum hardware. Total cost for most mid-size enterprises: $500K–$5M over 5 years for cryptographic migration. This is comparable to any major cryptographic protocol upgrade.

---

## About Quantum Computing

**Q: What is a qubit in plain English?**

A classical bit is a switch: it is either OFF (0) or ON (1). A qubit is a quantum switch that can be in a *superposition* — a probabilistic combination of both 0 and 1 simultaneously — until it is measured. When measured, it collapses to either 0 or 1 with probabilities determined by its superposition state. The power of quantum computing comes from manipulating many qubits together: an n-qubit register can represent 2^n states simultaneously, enabling certain computations that are exponentially faster than any classical algorithm.

---

**Q: Why can't classical computers simulate quantum computers efficiently?**

A quantum system of n qubits lives in a Hilbert space of dimension 2^n. To simulate a general n-qubit state classically requires storing and manipulating 2^n complex amplitudes. For n=50, that is ~10^15 complex numbers — already beyond the memory of any existing supercomputer. For n=100, the simulation requires more memory than atoms in the observable universe. This exponential Hilbert space is not a storage trick; it reflects genuine physical degrees of freedom that quantum hardware exploits natively.

---

**Q: What is quantum entanglement?**

Entanglement is a correlation between qubits that has no classical analogue. When two qubits are entangled, the measurement outcome of one *instantaneously* determines (or correlates with) the outcome of the other, regardless of the distance between them. Importantly, this does not allow faster-than-light communication — the correlation is only visible when comparing classical measurement records. Entanglement is the key resource that enables quantum teleportation, superdense coding, quantum key distribution, and many quantum algorithms.

---

**Q: Why does quantum computing need error correction?**

Qubits are fragile. Any interaction with the environment — electromagnetic noise, vibration, stray photons, temperature fluctuations — can perturb a qubit's state, a process called decoherence. Current physical qubits have error rates of 0.1–1% per gate operation, orders of magnitude worse than classical bits. For a computation requiring 10^8 operations, errors accumulate catastrophically. Quantum error correction (QEC) encodes one logical qubit across many physical qubits so that errors can be detected and corrected without directly measuring (and thereby collapsing) the logical state. This overhead — typically 100–1,000 physical qubits per logical qubit — is the central engineering challenge of the field.

---

**Q: What is the difference between NISQ and fault-tolerant quantum computing?**

NISQ (Noisy Intermediate-Scale Quantum) describes today's quantum hardware: 50–1,000+ physical qubits with gate error rates too high for error correction to be practical. NISQ devices are useful for exploration and research but cannot reliably execute the deep circuits required for algorithms like Shor's. Fault-tolerant quantum computing (FTQC) describes a future regime where logical qubits (each built from many physical qubits with error correction) can execute arbitrarily long computations with negligible logical error rates. FTQC is the prerequisite for cryptographically relevant quantum computation.

---

**Q: What is a logical qubit vs. a physical qubit?**

A physical qubit is a single quantum two-level system — a superconducting junction, a trapped ion, a photon, etc. Physical qubits have error rates of ~0.1–1%. A logical qubit is an abstract, error-corrected qubit encoded across many physical qubits. The surface code at distance d=17 uses 2×17² = 578 physical qubits per logical qubit, but the logical error rate drops exponentially with d. Fault-tolerant algorithms operate on logical qubits; physical qubits are the underlying hardware.

---

**Q: Can quantum computers solve NP-complete problems efficiently?**

Almost certainly no — and this is one of the most important and commonly misunderstood points. Quantum computers provide *polynomial* speedups (Grover: quadratic) or *superpolynomial* speedups only for problems with specific mathematical structure (Shor: factoring, discrete log). NP-complete problems lack this structure. The quantum complexity class BQP (efficiently solvable by a quantum computer) is believed to be neither a subset of P nor equal to NP. Quantum computers will not solve the Travelling Salesman Problem, SAT, or protein folding in general efficiently.

---

**Q: What is Shor's algorithm and why does it matter?**

Shor's algorithm (1994) is a quantum algorithm that factors large integers in polynomial time — specifically O((log N)³) operations. Classically, the best known algorithm (General Number Field Sieve) is sub-exponential but super-polynomial. The security of RSA encryption rests on the computational hardness of integer factoring classically. A sufficiently powerful quantum computer running Shor's algorithm would break RSA and, with variants, all elliptic curve cryptography. This is the primary quantum threat to current public-key cryptographic infrastructure.

---

**Q: What is Grover's algorithm and does it break AES?**

Grover's algorithm provides a quadratic speedup for searching an unsorted database — finding a target in N items in O(√N) operations instead of O(N). Applied to brute-force symmetric key search, it halves the effective key length: AES-128 provides ~64 bits of security against a quantum adversary; AES-256 provides ~128 bits. NIST's guidance is that AES-256 is quantum-safe; AES-128 should be considered marginal. Grover does *not* break AES cryptanalytically — it only speeds up exhaustive key search. Properly implemented AES-256 remains secure against quantum adversaries.

---

## About Post-Quantum Cryptography

**Q: What is the difference between quantum cryptography and post-quantum cryptography?**

These are completely different things. **Quantum cryptography** (e.g., Quantum Key Distribution / QKD) uses quantum physics — photons, entanglement — to implement cryptographic protocols with information-theoretic security guarantees. It requires dedicated quantum hardware and fibre links. **Post-quantum cryptography (PQC)** is classical mathematics — lattices, hash functions, error-correcting codes — that runs on conventional computers and is believed to resist attacks from both classical and quantum computers. PQC is a software upgrade; QKD requires hardware infrastructure. NIST standardised PQC (FIPS 203/204/205) — not QKD — as the primary quantum-safe solution for most organisations.

---

**Q: Is quantum key distribution (QKD) better than post-quantum cryptography?**

For most use cases: no. QKD provides information-theoretic security for key exchange — a stronger guarantee than computational security. However, it: (1) requires dedicated quantum optical hardware and fibre, (2) is expensive and not scalable to the internet, (3) only secures key exchange, not authentication (which still requires PQC or classical signatures), (4) is vulnerable to implementation attacks (side-channels in detectors). The NSA has explicitly stated it does not endorse QKD for national security systems. PQC is the practical, deployable, standards-based solution for the vast majority of use cases.

---

**Q: Why not just use longer RSA keys — RSA-4096 or RSA-8192?**

Longer RSA keys provide no meaningful protection against Shor's algorithm. Shor's algorithm runs in polynomial time in the *bit length* of the number, so factoring RSA-4096 takes only ~8× more operations than RSA-4096 — a constant factor, not an exponential barrier. The quantum threat to RSA is structural: it breaks the underlying hardness assumption (integer factoring), not just the key length. The only solution is to switch to a cryptographic problem that quantum computers cannot solve efficiently, which is what PQC does.

---

**Q: What is ML-KEM? Is it secure?**

ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism, FIPS 203, formerly Kyber) is a key encapsulation mechanism based on the hardness of the Module Learning With Errors (MLWE) problem. Its security has been extensively analysed by hundreds of researchers over 7 years through the NIST PQC standardisation competition. No classical or quantum algorithm is known to solve MLWE efficiently. It is considered the primary replacement for ECDH/RSA in TLS and other key exchange protocols. Security: NIST Level 3 (ML-KEM-768) is roughly equivalent to AES-192 classical security.

---

**Q: What happens if lattice-based cryptography is broken?**

This is a legitimate concern driving the recommendation to support hybrid classical+PQC modes and to standardise diverse PQC families. NIST has standardised SLH-DSA (hash-based, FIPS 205) precisely because its security rests only on hash function properties — completely independent of lattice assumptions. BIKE and HQC (code-based) are in the NIST round 4 pipeline as backup KEMs. A practical defence is: deploy ML-KEM in hybrid mode (ML-KEM + X25519) so that breaking either one does not break the key exchange. IETF RFC 9180 and TLS 1.3 support hybrid mode.

---

**Q: Is AES quantum-safe?**

Yes, for AES-256 and with some caveats for AES-128. Grover's algorithm provides a quadratic speedup for brute-force key search, reducing AES-128 to ~64-bit equivalent security, which is below recommended thresholds. AES-256 retains ~128-bit quantum security, which NIST considers sufficient. However, AES must be used in an authenticated mode (AES-256-GCM) with a quantum-safe key exchange (ML-KEM) to be fully quantum-safe. AES alone does nothing to protect key exchange, which is where the quantum threat to TLS is most acute.

---

## About Hardware Platforms

**Q: What is the difference between IBM and Google's approaches?**

Both use superconducting qubits, but with different architectures. IBM uses fixed-frequency transmon qubits on a heavy-hex lattice with cross-resonance gates, prioritising scale and cloud access. Google uses tunable-frequency Xmon qubits with frequency-tunable coupling, prioritising gate fidelity. IBM's roadmap focuses on qLDPC codes (Gross code) for more efficient error correction overhead. Google's roadmap focuses on surface codes with real-time decoding. Both achieved below-threshold error correction in 2024–2025. IBM has the larger cloud user base; Google has demonstrated the highest error suppression scaling factor (Λ=2.14 with Willow).

---

**Q: Is IonQ better than IBM?**

It depends on the metric. Trapped-ion systems (IonQ, Quantinuum) achieve higher gate fidelities (IonQ: 99.9% 2Q fidelity; Quantinuum: 99.921%) and have all-to-all qubit connectivity, which reduces circuit depth for many algorithms. Superconducting systems (IBM, Google) have faster gate times (~50ns vs ~1ms for ions) and are scaling more rapidly in qubit count. For small high-precision circuits (chemistry, QKD-like protocols), ion traps are currently superior. For large-scale fault-tolerant computation (requiring thousands of qubits), superconducting systems are ahead. Neither is universally "better."

---

**Q: What makes Microsoft's topological qubits controversial?**

Microsoft has pursued topological qubits (Majorana zero modes) for over a decade, claiming they would have intrinsically lower error rates than conventional qubits. In 2022, Microsoft's landmark *Nature* paper was retracted after independent analysis found the data did not support the claimed detection of topological Majorana modes. Microsoft's new Majorana 1 chip paper (*Nature*, February 2025) makes more measured claims — topological signatures observed, but the full topological protection required for error-suppressed qubits has not yet been independently verified. The scientific community is cautiously sceptical but watching closely.

---

**Q: What is quantum annealing and how does D-Wave differ?**

D-Wave builds quantum *annealers* — not universal gate-based quantum computers. Quantum annealers are designed to solve optimisation problems by finding the minimum-energy state of an Ising Hamiltonian. They can sample from complex combinatorial landscapes faster than classical methods for certain problem structures. D-Wave Advantage2 has 4,400 qubits (but these are not logical qubits and have very limited connectivity). Quantum annealers cannot run Shor's algorithm, cannot implement universal quantum gates, and are not cryptographically threatening. They have potential commercial applications in logistics, finance (portfolio optimisation), and materials discovery, but the evidence for practical quantum advantage is still limited.

---

**Q: How many qubits do we actually need for a useful quantum computer?**

It depends entirely on the application and the error correction scheme:

| Application | Logical qubits needed | Physical qubits (surface code d=17) |
|-------------|:--------------------:|:-----------------------------------:|
| Shor RSA-2048 | ~4,100 | ~2.4 million |
| Grover AES-128 | ~2,953 | ~1.7 million |
| Quantum chemistry (FeMoco) | ~200 | ~116,000 |
| Useful NISQ (no QEC) | ~100–1,000 | 100–1,000 |

For cryptographic relevance: millions of physical qubits. For early fault-tolerant utility in chemistry or materials: hundreds of thousands. Current hardware: ~1,000–5,000 physical qubits.

---

## About Timeline

**Q: When will quantum computing be useful for my business?**

For most businesses: not before 2030, and realistically 2030–2035 for the first commercially relevant fault-tolerant applications. NISQ-era applications (variational algorithms, quantum ML) have so far failed to demonstrate genuine advantage over classical methods for practically relevant problem sizes. The first credible "quantum utility" windows are in: (1) quantum chemistry simulation for drug discovery and materials science (mid-2030s), (2) optimisation with quadratic speedup for logistics and finance (late 2030s). The exception is the *defensive* action of PQC migration, which your business should be doing now.

---

**Q: When will IBM's Starling processor be available?**

IBM's roadmap targets Starling — a processor with 200 logical qubits and capacity for 10^8 gate operations — for approximately 2029. Starling represents the first IBM processor IBM claims will enable "early fault-tolerant utility." Roadmap milestones prior to Starling include: Kookaburra (modular qLDPC, ~2026) and Cockatoo (24 logical qubits, ~2027). IBM has a reasonably strong track record of meeting roadmap milestones within 1–2 years, but 2029 targets carry significant uncertainty.

---

**Q: What is the "2030 deadline" I keep hearing about?**

Several overlapping deadlines converge around 2030:

1. **NSA CNSA 2.0**: National Security Systems must complete PQC migration by 2030 for key establishment protocols; signatures by 2030–2033.
2. **EU NIS2/DORA**: Encourages crypto-agility and PQC readiness for critical infrastructure by 2030.
3. **IBM Quantum roadmap**: Targets fault-tolerant utility by ~2029–2030 with Starling.
4. **NIST post-quantum transition guidance**: Recommends full PQC deployment by 2030 for most systems.
5. **Academic consensus**: The "10-year window" estimate for CRQC development (from most 2022–2024 surveys) puts the risk window at 2032–2035.

The 2030 date is less a hard deadline than a convergence of regulatory mandates and technical risk horizons. For organisations with long-lived sensitive data, PQC migration should be underway by 2026–2027 at the latest.

---

**Q: What should a CISO do in the next 12 months regarding quantum risk?**

1. Commission a **cryptographic inventory** — identify all uses of RSA, ECDH, ECDSA, and Diffie-Hellman in your infrastructure, code, and vendor products.
2. Assess **data sensitivity and shelf-life** — apply Mosca's theorem to identify highest-risk data categories.
3. Evaluate **crypto-agility** — can your systems swap algorithms without major re-engineering?
4. Begin **piloting ML-KEM hybrid mode** in TLS and internal key exchange.
5. Establish a **quantum risk register** in your enterprise risk framework.
6. Engage **vendors** on their PQC roadmaps — software, HSMs, PKI, cloud providers.
7. Train your **security engineering team** on PQC basics (this textbook is a starting point).

---

*For corrections or additional questions, please open an issue on the textbook's GitHub repository.*
