# Bloch Sphere Visualizer

The Bloch sphere is the standard geometric representation of the state space of a single qubit.
Every pure quantum state |ψ⟩ = α|0⟩ + β|1⟩ (with |α|² + |β|² = 1) corresponds to exactly one
point on the surface of a unit sphere, parameterized by two angles θ and φ.

## Learning Objectives

- Understand how a qubit state is described by two angles θ (polar) and φ (azimuthal)
- Visualize the relationship between the Bloch sphere representation and the probability
  of measuring |0⟩ vs |1⟩
- Identify the positions of the six standard basis states |0⟩, |1⟩, |+⟩, |−⟩, |+i⟩, |−i⟩
  on the sphere surface
- Develop geometric intuition for how quantum gates rotate the state vector on the sphere

## Interactive Simulation

<iframe
  src="main.html"
  width="820"
  height="620"
  style="border: none; display: block; margin: 0 auto;"
  title="Bloch Sphere Visualizer">
</iframe>

[Open Full Screen](main.html){: .md-button target="_blank"}

## How to Use

| Control | Description |
|---------|-------------|
| **θ slider** | Sets the polar angle from 0 (north pole, |0⟩) to π (south pole, |1⟩) |
| **φ slider** | Sets the azimuthal angle from 0 to 2π around the equator |
| **Start / Stop** | Toggles slow rotation of the 3D view |
| **Reset** | Returns to |0⟩ state with no rotation |
| **Preset buttons** | Jump directly to a named computational basis state |

## What is the Bloch Sphere?

A qubit's state can always be written as:

$$|\psi\rangle = \cos\!\left(\frac{\theta}{2}\right)|0\rangle + e^{i\phi}\sin\!\left(\frac{\theta}{2}\right)|1\rangle$$

where θ ∈ [0, π] is the polar angle and φ ∈ [0, 2π) is the azimuthal angle. This maps every
pure state to a unique point on the unit sphere. Mixed states (statistical mixtures) lie
**inside** the sphere, but pure states always sit on its surface.

The three coordinate axes have physical meaning:

- **Z axis (blue):** The standard computational basis. The north pole is |0⟩ and the south pole is |1⟩.
- **X axis (red):** The Hadamard basis. |+⟩ = (|0⟩+|1⟩)/√2 lies at +x and |−⟩ at −x.
- **Y axis (green):** The circular basis. |+i⟩ = (|0⟩+i|1⟩)/√2 lies at +y and |−i⟩ at −y.

## Key States Reference

| State | Name | θ | φ | P(0) | P(1) |
|-------|------|---|---|------|------|
| \|0⟩  | Computational zero | 0 | — | 1.000 | 0.000 |
| \|1⟩  | Computational one  | π | — | 0.000 | 1.000 |
| \|+⟩  | Plus (Hadamard)    | π/2 | 0 | 0.500 | 0.500 |
| \|−⟩  | Minus (Hadamard)   | π/2 | π | 0.500 | 0.500 |
| \|+i⟩ | Plus-i (Y basis)  | π/2 | π/2 | 0.500 | 0.500 |
| \|−i⟩ | Minus-i (Y basis) | π/2 | 3π/2 | 0.500 | 0.500 |

## Key Insight

Measuring the qubit in the computational basis gives:

$$P(|0\rangle) = \cos^2\!\left(\frac{\theta}{2}\right), \qquad P(|1\rangle) = \sin^2\!\left(\frac{\theta}{2}\right)$$

Notice that only θ — **not φ** — determines the measurement outcome probabilities.
The azimuthal angle φ encodes the quantum phase, which is invisible to a single
measurement but matters profoundly for interference and gate operations.
