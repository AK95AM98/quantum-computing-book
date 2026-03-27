# Learning Graph

The **learning graph** maps every concept in this textbook to its prerequisites,
showing the full dependency structure across all 15 chapters and 150 concepts.
Use it to plan a study path, identify what you need to review before tackling
an advanced topic, or explore connections between ideas.

## Interactive Viewer

<iframe src="../sims/learning-graph/main.html" width="100%" height="720"
  style="border:none; display:block;"></iframe>

---

## About This Graph

| Property | Value |
|---|---|
| **Total concepts** | 150 |
| **Total dependency edges** | 211 |
| **Chapters covered** | 15 |
| **Bloom's levels used** | Remember, Understand, Apply, Analyze, Evaluate, Create |

Each node's **size** reflects how many other concepts depend on it — the most
critical prerequisite concepts (like *Qubit*, *Quantum superposition*, and
*Quantum circuit model*) are rendered largest.

## How to Navigate

- **Zoom** with scroll or pinch gestures.
- **Pan** by dragging the background.
- **Click any node** to see its prerequisites and the concepts it enables.
- Use the **Chapter** and **Bloom's Level** dropdowns to filter the view.
- Use the **Search** box to highlight any concept by name.
- Press **Reset View** to fit the whole graph back on screen.

## Concept Data Files

The raw concept data is available in two formats for programmatic use:

- [`concept-list.md`](concept-list.md) — Human-readable numbered list with dependency annotations
- [`learning-graph.csv`](learning-graph.csv) — Structured CSV with columns `concept_id, concept_name, depends_on, chapter, bloom_level`
- [`learning-graph.json`](learning-graph.json) — vis-network format JSON (nodes + edges) loaded by the viewer

## Part Summaries

### Part I: Foundations (Chapters 1–6)
Concepts 1–60 cover the essential vocabulary and mathematical framework:
classical vs. quantum information, qubits, measurement, gates, entanglement,
and the circuit model. Nearly every later concept traces dependencies back here.

### Part II: Quantum Algorithms (Chapters 7–10)
Concepts 61–100 build on the circuit model to develop the landmark algorithms
(Deutsch-Jozsa, Grover, Shor) and the complexity-theoretic framework for
understanding quantum speedup.

### Part III: Quantum Error Correction (Chapter 11)
Concepts 101–110 address the central challenge of noise — from the 3-qubit
repetition codes through the stabilizer formalism to the surface code.

### Part IV: Physical Implementations (Chapters 12–13)
Concepts 111–130 ground the abstract model in physical reality: different qubit
modalities, coherence, fidelity metrics, NISQ devices, and near-term algorithms.

### Part V: Advanced Topics (Chapters 14–15)
Concepts 131–150 survey quantum machine learning, quantum networking, and the
long-range roadmap toward fault-tolerant quantum computers.
