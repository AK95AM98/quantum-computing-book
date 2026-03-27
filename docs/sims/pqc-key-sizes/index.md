# PQC Key Sizes — Algorithm Comparison

**Part III, Chapter 12 — Post-Quantum Cryptographic Standards**

## Learning Objectives

- Compare the **public key** and **signature/ciphertext sizes** of classical and post-quantum algorithms.
- Explain why different post-quantum security families (lattice, hash, code-based) produce dramatically different size trade-offs.
- Evaluate the practical deployment implications of large key or signature sizes for network protocols (TLS, certificates, firmware signing).
- Identify which NIST-standardised algorithms (FIPS 203/204/205) replace which classical primitives.

## Simulation

<iframe src="main.html" width="700" height="560" style="border:1px solid #ccc; border-radius:6px;"></iframe>

[Open in full screen](main.html){ .md-button }

## How to Use

- Toggle **Key Size** vs **Sig / Ciphertext Size** to switch the view.
- Toggle **Log scale** to compare sizes across orders of magnitude, or linear scale to feel the dramatic difference.
- **Click any bar** to see algorithm details in the info panel.

## Static Comparison Table

| Algorithm | Type | Public Key (B) | Signature / CT (B) | Security | NIST Standard |
|-----------|------|:--------------:|:------------------:|:--------:|:-------------:|
| RSA-2048 | Classical — Factoring | 256 | 256 | ~112-bit | Deprecated |
| ECDSA P-256 | Classical — ECDLP | 64 | 64 | ~128-bit | Deprecated |
| ML-KEM-768 | PQC Lattice (MLWE) | 1,184 | 1,088 | Level 3 | **FIPS 203** |
| ML-DSA-65 | PQC Lattice (Dilithium) | 1,952 | 3,293 | Level 3 | **FIPS 204** |
| SLH-DSA-SHA2-128f | PQC Hash (SPHINCS+) | 32 | 17,088 | Level 1 | **FIPS 205** |
| FN-DSA-512 | PQC Lattice (Falcon/NTRU) | 897 | 666 | Level 1 | FIPS 206 (draft) |

## Why Sizes Differ

**Lattice-based schemes** (ML-KEM, ML-DSA, FN-DSA) are built on the hardness of the Learning With Errors (LWE) or NTRU problems. Their security proof requires publishing high-dimensional vectors as keys, leading to kilobyte-scale keys and signatures — but with favourable performance characteristics.

**Hash-based schemes** (SLH-DSA / SPHINCS+) rely only on the security of a hash function — the most conservative assumption possible. The trade-off is a very large signature (17 KB for the "fast" variant, 7 KB for the "small" variant). The public key is tiny (32 B) because it is just a Merkle tree root. This makes SLH-DSA ideal for use cases where signing is infrequent and bandwidth is not a constraint (e.g., firmware signing, root CA certificates).

**FN-DSA (Falcon)** achieves the best signature-to-security ratio among NIST finalists by using NTRU lattices and a Gaussian sampler, but its implementation complexity and constant-time requirements make it harder to deploy securely.

## Deployment Considerations

- **TLS handshakes**: ML-KEM-768 adds ~2 KB to the handshake, acceptable for most internet traffic.
- **X.509 certificates**: ML-DSA signatures at 3.3 KB increase certificate chain sizes substantially.
- **IoT / embedded**: FN-DSA (666 B signatures) is the most attractive for constrained devices.
- **Code signing / firmware**: SLH-DSA's minimal public key and hash-only assumption make it ideal despite the large signature.
- **Hybrid mode**: NIST and major TLS libraries (OpenSSL 3.x, BoringSSL) recommend hybrid classical+PQC while the ecosystem matures.

## References

- NIST FIPS 203: ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism) — August 2024
- NIST FIPS 204: ML-DSA (Module-Lattice-Based Digital Signature Algorithm) — August 2024
- NIST FIPS 205: SLH-DSA (Stateless Hash-Based Digital Signature Algorithm) — August 2024
- Bernstein & Lange, "Post-quantum cryptography," *Nature* 549, 188–194 (2017)
- Chapter 12 of this textbook — full deployment framework
