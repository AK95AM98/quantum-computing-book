# Quantum Gate Explorer

Single-qubit quantum gates are the building blocks of quantum circuits. Each gate is a unitary
2×2 matrix that rotates the qubit's state vector on the Bloch sphere. This simulator lets you
apply gates one at a time and watch the state evolve, building geometric intuition for quantum
operations.

## Learning Objectives

- Recognize how each single-qubit gate corresponds to a specific rotation on the Bloch sphere
- Observe that quantum gates are reversible: applying the same gate twice returns to the original state (for X, Y, Z, H)
- Understand why the Hadamard gate is so powerful — it rotates |0⟩ into an equal superposition |+⟩
- Track sequences of gate applications and predict where the state vector will end up
- Connect the abstract 2×2 matrix representation to geometric intuition

## Interactive Simulation

<iframe
  src="main.html"
  width="820"
  height="700"
  style="border: none; display: block; margin: 0 auto;"
  title="Quantum Gate Explorer">
</iframe>

[Open Full Screen](main.html){: .md-button target="_blank"}

## How to Use

1. The state starts at **|0⟩** — the north pole of the Bloch sphere.
2. Click any **gate button** on the right side to apply that gate.
3. The state vector animates smoothly to its new position.
4. The **Current State** panel shows the angles (θ, φ) and the state written as α|0⟩ + β|1⟩.
5. The **gate matrix** is displayed so you can see the 2×2 unitary.
6. The **Applied Gates** log shows the last 5 gates and resulting states.
7. Click **Reset** to return to |0⟩ and clear history.

## Gate Reference

Each gate below is described by its geometric action on the Bloch sphere and its effect on
the computational basis states.

| Gate | Full Name | Bloch Sphere Action | |0⟩ → | |1⟩ → |
|------|-----------|---------------------|--------|--------|
| **X** | Pauli-X (NOT) | 180° rotation around X axis | \|1⟩ | \|0⟩ |
| **Y** | Pauli-Y | 180° rotation around Y axis | i\|1⟩ | −i\|0⟩ |
| **Z** | Pauli-Z (Phase flip) | 180° rotation around Z axis | \|0⟩ | −\|1⟩ |
| **H** | Hadamard | 180° rotation around (X+Z)/√2 axis | \|+⟩ | \|−⟩ |
| **S** | S gate (Phase) | 90° rotation around Z axis | \|0⟩ | i\|1⟩ |
| **T** | T gate (π/8) | 45° rotation around Z axis | \|0⟩ | e^{iπ/4}\|1⟩ |
| **Rx(π/4)** | X-rotation by π/4 | 45° rotation around X axis | (towards \|+⟩) | (towards \|−⟩) |
| **Ry(π/4)** | Y-rotation by π/4 | 45° rotation around Y axis | (towards \|1⟩ via Y) | (towards \|0⟩ via Y) |

## Gate Matrices

$$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \qquad
Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix} \qquad
Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

$$H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \qquad
S = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix} \qquad
T = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}$$

$$R_x(\theta) = \begin{pmatrix} \cos(\theta/2) & -i\sin(\theta/2) \\ -i\sin(\theta/2) & \cos(\theta/2) \end{pmatrix} \qquad
R_y(\theta) = \begin{pmatrix} \cos(\theta/2) & -\sin(\theta/2) \\ \sin(\theta/2) & \cos(\theta/2) \end{pmatrix}$$

## Key Observations to Make

**Try this sequence:**

1. Start at |0⟩. Apply **H** → you get |+⟩ (equator, +X direction).
2. Apply **H** again → you return to |0⟩. Hadamard is its own inverse!

**Pauli gates:**

- Applying **X** twice returns to the original state (X² = I).
- The same holds for Y and Z.

**Phase vs. probability:**

- Apply **Z** to |0⟩: nothing visible happens to the probabilities! The state stays at the north pole.
  But apply **H** first, then **Z**, then **H** again — you get |1⟩. Phase matters for interference.

**Building T from S:**

- Apply **S** twice — you get **Z**. Apply **T** twice — you get **S**. These are nested rotations.
