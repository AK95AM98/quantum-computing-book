# Grover's Algorithm — Amplitude Amplification

## Interactive Visualization

<iframe src="main.html" width="820" height="660"
  style="border:none; display:block; margin: 0 auto;"></iframe>

---

## Learning Objectives

After working with this visualization, you should be able to:

1. Explain what **amplitude amplification** means geometrically.
2. Describe the two steps of each Grover iteration: the **oracle** and the **diffusion operator**.
3. Identify why the optimal number of iterations scales as $\lfloor \frac{\pi}{4}\sqrt{N} \rfloor$.
4. Predict how probability of success changes as a function of iteration count.
5. Recognize why **over-rotating** (too many iterations) decreases the success probability again.

---

## How Grover's Algorithm Works

### The Problem

Given an unstructured database of $N = 2^n$ items, find the single marked item (the **target state**).
A classical algorithm requires $O(N)$ queries on average. Grover's algorithm achieves this in $O(\sqrt{N})$ queries — a quadratic speedup.

### Initial State

The algorithm begins by putting all $n$ qubits in an equal superposition using Hadamard gates:

$$|\psi_0\rangle = H^{\otimes n}|0\rangle^{\otimes n} = \frac{1}{\sqrt{N}}\sum_{x=0}^{N-1}|x\rangle$$

Every basis state has identical amplitude $\frac{1}{\sqrt{N}}$, so the probability of measuring any particular state is $\frac{1}{N}$.

### The Grover Iteration

Each iteration $G$ consists of two operations:

**Step 1 — Oracle ($U_f$)**

The oracle is a quantum circuit that "knows" the target state $|t\rangle$.
It flips the *sign* (phase) of the target amplitude while leaving all others unchanged:

$$U_f|x\rangle = \begin{cases} -|x\rangle & \text{if } x = t \\ |x\rangle & \text{otherwise} \end{cases}$$

In the visualization, the target bar briefly flashes red as its amplitude sign is inverted.

**Step 2 — Diffusion Operator ($D$)**

The diffusion operator performs an **inversion about the mean**:

$$D|x\rangle = (2|\psi_0\rangle\langle\psi_0| - I)|x\rangle$$

For each amplitude $\alpha_x$, it maps $\alpha_x \mapsto 2\bar{\alpha} - \alpha_x$, where $\bar{\alpha}$ is the mean amplitude.

Because the oracle made the target amplitude negative (below the mean), inversion about the mean *amplifies* it while slightly reducing all others.

### Optimal Number of Iterations

After $k$ iterations, the amplitude of the target state is approximately $\sin\!\bigl((2k+1)\theta\bigr)$, where $\theta = \arcsin(1/\sqrt{N})$.

This is maximized when $(2k+1)\theta \approx \frac{\pi}{2}$, giving:

$$k_{\text{opt}} = \left\lfloor \frac{\pi}{4}\sqrt{N} \right\rfloor$$

The table below shows optimal iterations for common values of $N$:

| Qubits ($n$) | States ($N$) | Optimal Iterations | Success Probability |
|:---:|:---:|:---:|:---:|
| 2 | 4 | 1 | ~100% |
| 3 | 8 | 2 | ~97% |
| 4 | 16 | 3 | ~96% |
| 5 | 32 | 4 | ~97% |
| 6 | 64 | 6 | ~99% |
| 8 | 256 | 12 | ~99.8% |

### Measurement

After $k_{\text{opt}}$ iterations, the quantum state has nearly all its probability concentrated on the target state. Measuring the register then yields the target with high probability.

---

## Controls Guide

| Control | Description |
|---|---|
| **Qubits (n) slider** | Sets $n \in \{2, 3, 4\}$, giving $N \in \{4, 8, 16\}$ states |
| **Target state slider** | Selects which basis state $\|t\rangle$ the oracle marks |
| **Start / Stop** | Runs the full animation to optimal iterations |
| **Step** | Advances exactly one Grover iteration |
| **Reset** | Returns to the uniform superposition state |

The **orange bar** is the target state. The **purple dashed line** shows the current mean amplitude. The gauge on the right shows $P(\text{target})$.

---

## Related Concepts

- [Quantum Superposition](../../chapters/02-entanglement/index.md)
- [Quantum Gates and Circuits](../../chapters/03-gates-circuits/index.md)
- [Quantum Algorithms](../../chapters/04-algorithms/index.md)
- [Milestone Framework](../../chapters/11-milestones/index.md)
