# QEC Overhead Calculator

**Part II, Chapters 7–8 — Fault-Tolerant Quantum Computing**

## Learning Objectives

- Calculate the number of **physical qubits** required per logical qubit for the surface code at a given distance d.
- Compare the overhead of the **surface code** (2d² scaling) against the **Gross [[144,12,12]] qLDPC code** (~24×, constant).
- Estimate the **total physical qubit budget** needed for a cryptographically relevant algorithm such as Shor's algorithm on RSA-2048.
- Understand why operating **below the fault-tolerance threshold** is a prerequisite for error correction to help rather than hurt.

## Simulation

<iframe src="main.html" width="700" height="620" style="border:1px solid #ccc; border-radius:6px;"></iframe>

[Open in full screen](main.html){ .md-button }

## How to Use

- Drag the **code distance** slider to see how overhead scales.
- Drag the **physical error rate** slider to explore above/below-threshold regimes.
- Toggle **Surface Code** or **Gross [[144,12]]** curves on and off.
- Select an **algorithm** to see the total physical qubit estimate.
- Toggle **Log scale** for a clearer view across orders of magnitude.

## Surface Code vs qLDPC Overhead

The dominant overhead formula for the rotated surface code is:

$$n_\text{phys} = 2d^2 \times n_\text{logical}$$

For a code distance of d = 17 (a practical near-term target), each logical qubit requires **578 physical qubits**. Running Shor's algorithm to factor RSA-2048 requires roughly 4,098 logical qubits, giving:

$$4{,}098 \times 578 \approx 2{,}369{,}000 \text{ physical qubits}$$

> **Key insight:** A machine with ~1,000 physical qubits operating at surface code distance d = 7 can support at most **20 logical qubits** — barely enough for algorithm research, far from cryptographic relevance.

## Gross [[144,12,12]] qLDPC Code

The Gross code is a quantum low-density parity-check (qLDPC) code that encodes **12 logical qubits in 144 physical qubits** — a fixed overhead of 12×, independent of the distance parameter. IBM's roadmap targets this code family for the **Loon and Kookaburra** processor generations (2025–2026).

The approximate 24× figure in the calculator represents the physical overhead per logical qubit when accounting for ancilla qubits needed for syndrome extraction.

## Fault-Tolerance Threshold

The surface code threshold is approximately **p_th ≈ 1%** for depolarising noise.
Below threshold, increasing d exponentially suppresses the logical error rate:

$$p_L \approx A \left(\frac{p}{p_\text{th}}\right)^{\lfloor(d+1)/2\rfloor}$$

Above threshold, adding more qubits makes things *worse*. Current best hardware platforms (Google Willow, IBM Heron, Quantinuum Helios) operate at physical error rates of 0.1–0.5%, comfortably below threshold.

## References

- Fowler et al., "Surface codes: Towards practical large-scale quantum computation," *Phys. Rev. A* 86, 032324 (2012)
- Bravyi et al., "High-threshold and low-overhead fault-tolerant quantum memory," *Nature* 627, 778 (2024) — Gross code analysis
- Beverland et al., "Assessing requirements to scale to practical quantum advantage," *arXiv:2211.07629* (2022)
