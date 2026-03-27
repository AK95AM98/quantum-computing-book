# Surface Code Simulator

**Part II, Chapter 8 — Quantum Error Correction**

## Learning Objectives

- Identify the roles of **data qubits** and **ancilla qubits** in the surface code lattice.
- Distinguish between **X-type** and **Z-type** stabilizer measurements and explain which error type each detects.
- Describe how a single X, Z, or Y Pauli error creates a **syndrome** (excited ancilla pair) on the dual lattice.
- Explain the concept of **minimum-weight perfect matching (MWPM)** as a decoding strategy.

## Simulation

<iframe src="main.html" width="700" height="620" style="border:1px solid #ccc; border-radius:6px;"></iframe>

[Open in full screen](main.html){ .md-button }

## How to Use

1. **Click any data qubit** (coloured circle) to cycle its error state:
   healthy → X error (red) → Z error (blue) → Y error (purple) → healthy
2. Press **Extract Syndrome** to compute which ancilla qubits become excited.
3. Press **Decode** to highlight the minimum-weight correction path (green outlines).
4. Press **Reset** to clear all errors and start again.

## Lattice Layout

The surface code arranges **25 data qubits** on a 5×5 grid.
Between every 2×2 block of data qubits sits one **ancilla (stabilizer) qubit**,
giving a 4×4 array of 16 ancilla qubits.

The ancilla type alternates in a checkerboard pattern:

| Face index (r+c) | Ancilla type | Colour | Detects |
|:----------------:|:------------:|:------:|:-------:|
| Even             | Z-stabilizer | Blue   | X and Y errors on neighbouring data qubits |
| Odd              | X-stabilizer | Yellow | Z and Y errors on neighbouring data qubits |

A Y error on a data qubit excites **both** its Z-type and X-type neighbours,
because Y = iXZ applies both kinds of error simultaneously.

## Key Concepts

| Term | Definition |
|------|-----------|
| **Data qubit** | A qubit that stores logical information. Any of the 25 circle nodes in the grid. |
| **Ancilla qubit** | A helper qubit used only for measurement. The 16 square nodes between data qubits. |
| **X error** | A bit-flip Pauli X applied to a data qubit. Detected by Z-type stabilizers. |
| **Z error** | A phase-flip Pauli Z applied to a data qubit. Detected by X-type stabilizers. |
| **Y error** | A combined bit- and phase-flip (Y = iXZ). Excites both stabilizer types. |
| **Syndrome** | The pattern of excited ancilla qubits after a stabilizer measurement round. |
| **MWPM** | Minimum-Weight Perfect Matching — the standard classical algorithm for pairing syndrome defects and identifying the most likely correction. |

## Further Reading

- Nielsen & Chuang, *Quantum Computation and Quantum Information*, §10.6
- Fowler et al., "Surface codes: Towards practical large-scale quantum computation," *PRA* 86, 032324 (2012)
- Chapter 8 of this textbook for full mathematical treatment
