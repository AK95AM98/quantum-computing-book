# How to Use This Book

## Navigation Guide

### For Executives and Technology Strategists

| If you want to... | Go to |
|------------------|-------|
| Understand what a qubit actually is | [Chapter 1](chapters/01-classical-vs-quantum/index.md) §2 |
| Understand why entanglement enables quantum speedup | [Chapter 2](chapters/02-entanglement/index.md) §3 |
| Understand why Shor's algorithm breaks RSA | [Chapter 4](chapters/04-algorithms/index.md) §2 |
| Understand what post-quantum cryptography is | [Chapter 4](chapters/04-algorithms/index.md) §6 |
| Assess your PQC migration urgency | [Chapter 12](chapters/12-pqc-imperative/index.md) |
| Evaluate vendor roadmap claims | [Chapter 11](chapters/11-milestones/index.md) |
| Build a quantum readiness plan | [Chapter 15](chapters/15-action-plan/index.md) |
| Get the executive summary | [Home page](index.md) |

### For Graduate Students and Engineers

Work through the book sequentially. Each chapter builds on prior concepts.

| Part | Chapters | Topics |
|------|---------|--------|
| I — Foundations | 1–6 | Qubits, gates, algorithms, communication, noise theory |
| II — Engineering | 7–11 | QEC, hardware roadmaps, modular scaling, milestones |
| III — Business | 12–15 | PQC, use cases, readiness, CXO action plan |

## Interactive Features

### MicroSims
The [MicroSims gallery](sims/index.md) contains 9 interactive simulations:

- **[Bloch Sphere](sims/bloch-sphere/index.md)** — Visualize qubit states; adjust θ and φ to see how amplitudes and probabilities change. Start here.
- **[Gate Explorer](sims/gate-explorer/index.md)** — Apply X, Y, Z, H, S, T gates and watch the state vector rotate on the Bloch sphere.
- **[Grover Visualization](sims/grover-visualization/index.md)** — Watch amplitude amplification in action for N = 4, 8, or 16 states.
- **[Surface Code Sim](sims/surface-code-sim/index.md)** — Inject errors and watch syndrome extraction (Part II).
- **[QEC Overhead](sims/qec-overhead/index.md)** — See how code distance d scales physical qubit requirements (Part II).
- **[Mosca Calculator](sims/mosca-calculator/index.md)** — Input your data shelf-life and migration time; get a traffic-light risk assessment (Part III).
- **[PQC Key Sizes](sims/pqc-key-sizes/index.md)** — Compare RSA, ECDSA, ML-KEM, ML-DSA key and signature sizes visually (Part III).
- **[Roadmap Timeline](sims/roadmap-timeline/index.md)** — Filter vendor milestones by company and year (Part II).
- **[Learning Graph](sims/learning-graph/index.md)** — Explore concept dependencies interactively.

### Learning Graph
The [Learning Graph](learning-graph/index.md) maps dependencies between all 150 concepts in the book. Use it to:
- Identify prerequisites before jumping into a chapter
- Plan a reading path for your specific background
- Find related concepts across chapters

### Quizzes
Each chapter ends with a 30-question quiz distributed across all six Bloom's taxonomy levels. Use them to test comprehension before moving on.

## Math and Notation

All equations use **MathJax 3** notation:
- Inline math: \(E = mc^2\)
- Display math: \[\ket{\psi} = \alpha\ket{0} + \beta\ket{1}\]

Dirac notation macros are defined: `\ket{}`, `\bra{}`, `\braket{}{}`.

**Qiskit convention:** Little-endian (q0 is the least significant qubit). Controlled gates shown with filled circles (●) for controls and ⊕ for CNOT targets.

## Vendor Claim Labeling

Throughout the book, vendor milestones are labeled:

!!! success "Delivered"
    Peer-reviewed, published, independently verified results.

!!! warning "Projected"
    Vendor roadmap targets backed by credible engineering trajectory — not yet demonstrated.

!!! danger "Controversial"
    Claims disputed by the research community; treat with caution.
