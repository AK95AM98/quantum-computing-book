---
title: "Chapter 1 (Alternate): Classical vs. Quantum — Explained with Quarky"
chapter: 1
variant: alternate
concepts: 20
prerequisites: []
bloom_levels: [Remember, Understand, Apply]
---

# Chapter 1 (Alternate): Classical vs. Quantum — Explained with Quarky

> **About this version:** This is a concept-first, analogy-driven companion to the [standard Chapter 1](index.md). Every idea is introduced by Quarky in plain English before the formal math. The two versions cover the same topics — use whichever helps you build intuition first.

---

## Meet Your Guide

<div style="display:flex; align-items:center; gap:20px; margin-bottom:1rem;">
<iframe src="../../sims/quarky/main.html" width="300" height="280"
  style="border:none; border-radius:12px; flex-shrink:0;"></iframe>
<div>

**This is Quarky.** Quarky is a qubit — the quantum version of a computer bit.

Press **▶ Start** and watch. Quarky's colour shifts between blue and pink. That shifting is **superposition** — Quarky is neither purely 0 nor purely 1. The number drifting on Quarky's body shows the full quantum state: **α\|0⟩ + β\|1⟩**.

Press **Measure** and Quarky snaps to one definite colour. That snap is **wave-function collapse** — the moment you look, the quantum uncertainty ends.

Press **Entangle** and Quarky glows gold. Two entangled Quarkys share a fate: measure one and the other "knows" instantly.

Everything in this chapter — bits, gates, superposition, the Bloch sphere, unitarity — is the story of *how* and *why* Quarky works the way it does.

</div>
</div>

[Open Quarky full screen](../../sims/quarky/main.html){ .md-button }

---

## 1.0 Why Does Physics Care About Bits?

!!! tip "Quarky Says"
    Imagine writing something on a whiteboard, then erasing it. The chalk dust flies off and heats up the room — just a tiny bit. That warmth is real energy. **Forgetting information always costs energy.** Quarky never forgets — every quantum operation is reversible, like always being able to un-erase the board.

In 1961, physicist **Rolf Landauer** proved that erasing one classical bit *must* release heat:

$$E_{\min} = k_B T \ln 2 \approx 2.8 \times 10^{-21} \text{ J at room temperature}$$

That's tiny — but it's not zero. Every AND gate, every OR gate in your laptop is erasing information millions of times per second, paying that thermal price.

Quantum mechanics imposes a stricter rule: **quantum operations cannot erase information at all.** The physics equation governing a qubit — the Schrödinger equation — produces only *reversible* transformations. Quarky can be rotated in any direction on the Bloch sphere, but it can always be rotated back. Nothing is lost.

!!! example "Worked Example: How Wasteful Is Your Laptop?"
    A 3 GHz processor does ~$10^{10}$ operations/second.
    Landauer minimum: $10^{10} \times 2.8 \times 10^{-21} \approx 2.8 \times 10^{-11}$ W.
    Actual dissipation: ~100 W.

    Your CPU wastes energy at roughly **$10^{12}$ times** the thermodynamic minimum — because irreversible logic gates are simpler to engineer. Quantum gates, being reversible, could in principle compute with zero thermodynamic cost.

---

## 1.1 Classical Bits — The World Before Quarky

!!! tip "Quarky Says"
    A classical bit is like a light switch: either ON (1) or OFF (0). Nothing in between. I'm different — I can be *any mixture* of on and off at the same time, until you look.

A **classical bit** is a two-state physical system: a transistor (on/off), a magnetic domain (north/south), a voltage level (high/low). It has exactly two distinguishable, stable states: **0** and **1**.

### Boolean Gates

Classical computers manipulate bits with **logic gates**:

| Gate | Inputs | Output | Reversible? |
|------|--------|--------|-------------|
| NOT | 1 bit | 1 bit | ✅ Yes — 0→1, 1→0; we can always undo it |
| AND | 2 bits | 1 bit | ❌ No — output 0 could come from (0,0), (0,1), or (1,0) |
| OR  | 2 bits | 1 bit | ❌ No — output 1 could come from (0,1), (1,0), or (1,1) |
| XOR | 2 bits | 1 bit | ✅ Yes — $(a \oplus b) \oplus b = a$ |
| NAND| 2 bits | 1 bit | ❌ No |

!!! tip "Quarky Says"
    The AND gate is a *one-way door*. You can walk through it (compute 0 AND 1 = 0), but you can't walk back through it to know whether the inputs were (0,1), (1,0), or (0,0). Information has been destroyed. I never destroy information — every gate I go through has an exit door that points right back to where I started.

!!! warning "Common Misconception"
    NAND is **logically universal** — you can build any classical function from NAND gates alone. But that universality comes with a cost: NAND is irreversible. Quantum universality requires a different primitive.

---

## 1.2 Making Classical Logic Reversible — The Toffoli Gate

!!! tip "Quarky Says"
    Can you make AND reversible? Yes — just don't throw away the inputs! If you keep *a*, *b*, and also store the result *a AND b* in a third slot, then all three inputs and all three outputs are there. You can always run it backwards. This three-legged gate is called **Toffoli**, and it's the bridge between the classical world and mine.

The **Toffoli gate** (CCNOT) takes three bits in and gives three bits out:

$$|a, b, c\rangle \;\longrightarrow\; |a,\; b,\; c \oplus (a \wedge b)\rangle$$

- **a** and **b** pass through unchanged (controls)
- **c** flips only if both **a = 1** and **b = 1**
- Set **c = 0** and you get AND without destroying the inputs: $|a\rangle|b\rangle|0\rangle \to |a\rangle|b\rangle|a \wedge b\rangle$

The Toffoli gate is **its own inverse**: apply it twice and you're back where you started.

!!! example "Worked Example: Reversible AND"
    Inputs: $a=1, b=1, c=0$

    Toffoli: $c' = 0 \oplus (1 \wedge 1) = 1$

    Output: $(1, 1, 1)$ — the AND result is in the third slot, but $a$ and $b$ are still there.

    Apply Toffoli again: $c'' = 1 \oplus (1 \wedge 1) = 0$. Back to $(1, 1, 0)$. ✅ Reversed.

!!! tip "Business Implication"
    Bennett (1973) proved that **any classical program can be rewritten reversibly** with modest overhead. This is why quantum computers can run classical subroutines — any classical function $f$ can be wrapped in a reversible quantum oracle and used inside a quantum algorithm. Quantum computing augments classical computing; it does not replace it.

---

## 1.3 Enter Quarky: What Is a Qubit?

!!! tip "Quarky Says"
    A classical bit is a coin lying flat — heads (0) or tails (1). I'm a coin *spinning in the air*. While I spin, I'm some mixture of heads and tails at the same time. When you catch me (measure me), I land on one side. But before you catch me — I genuinely had no definite value. I wasn't secretly heads or secretly tails. I was *both*, described by two numbers called amplitudes.

### From Classical Probability to Quantum Amplitude

Here is the clearest way to see where quantum mechanics comes from. Start with a **classical uncertain bit**:

$$\text{Classical probabilistic state: } \mathbf{p} = \begin{pmatrix}p_0 \\ p_1\end{pmatrix}, \quad p_0, p_1 \geq 0, \quad p_0 + p_1 = 1$$

Now make **one change**: replace real nonnegative probabilities with **complex numbers**, and replace "sum to 1" with "sum of squares equals 1":

$$\text{Quantum state: } |\psi\rangle = \begin{pmatrix}\alpha \\ \beta\end{pmatrix}, \quad \alpha, \beta \in \mathbb{C}, \quad |\alpha|^2 + |\beta|^2 = 1$$

That single change — L1 norm → L2 norm, real → complex — creates an entirely new computational universe. The reason it matters: **complex numbers can interfere**. Waves can cancel. Classical probabilities can only add.

| Concept | Classical probabilistic bit | Quarky (qubit) |
|---------|----------------------------|----------------|
| State | Probability vector $\mathbf{p}$ | Amplitude vector $|\psi\rangle$ |
| Entries | Real nonneg numbers | Complex numbers |
| Norm | $p_0 + p_1 = 1$ (L1) | $|\alpha|^2 + |\beta|^2 = 1$ (L2) |
| Operations | Stochastic matrices | Unitary matrices |
| Measurement rule | Observe $p_0$ directly | Probability = $|\alpha|^2$ |
| Can amplitudes cancel? | No | **Yes — this is interference** |

!!! tip "Quarky Says"
    The difference between classical probability and quantum amplitude is like the difference between *mixing paint* and *combining waves*. Mix red and blue paint — you get purple, always. But combine a red wave and a blue wave — sometimes they amplify each other, sometimes they cancel completely. That cancellation is what makes quantum algorithms powerful.

### Superposition — What It Really Means

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$

!!! warning "Common Misconception"
    A qubit in superposition is **not** "secretly 0 or secretly 1 and we just don't know which." It genuinely has no definite value before measurement. This is not a statement about our ignorance — it is a statement about reality. Experiments (Bell inequality tests) have confirmed this to extraordinary precision.

The superposition state is described by two complex numbers $(\alpha, \beta)$. When you measure:

- You get outcome **0** with probability $|\alpha|^2$
- You get outcome **1** with probability $|\beta|^2$
- The state *becomes* $|0\rangle$ or $|1\rangle$ — the superposition is gone

Watch Quarky: press **▶ Start**, watch the colour shift. Press **Measure** — Quarky snaps. That snap is irreversible. The superposition is consumed.

!!! example "Worked Example: Measurement Probabilities"
    Quarky is in state $|\psi\rangle = \dfrac{1}{\sqrt{3}}|0\rangle + \sqrt{\dfrac{2}{3}}|1\rangle$

    Check normalization: $\left(\dfrac{1}{\sqrt{3}}\right)^2 + \left(\sqrt{\dfrac{2}{3}}\right)^2 = \dfrac{1}{3} + \dfrac{2}{3} = 1$ ✅

    Measurement results:
    - Probability of **\|0⟩**: $\dfrac{1}{3}$ ≈ 33%
    - Probability of **\|1⟩**: $\dfrac{2}{3}$ ≈ 67%

    This Quarky is *tilted* toward \|1⟩ — like a biased coin, but the bias comes from quantum amplitudes, not a weighted coin.

---

## 1.4 The Bloch Sphere — Quarky's Map

!!! tip "Quarky Says"
    Every possible state I can be in corresponds to a point on a globe. The North Pole is $|0\rangle$ (pure blue). The South Pole is $|1\rangle$ (pure pink). The equator is maximum superposition — equally likely to be either. The little Bloch sphere in my animation's top-right corner shows you exactly where I am at every moment. Quantum gates are *rotations* of that globe.

Any single-qubit pure state can be written:

$$|\psi\rangle = \cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle$$

where $\theta \in [0,\pi]$ (latitude) and $\phi \in [0,2\pi)$ (longitude). This is the **Bloch sphere**.

```
         |0⟩ (North Pole)
           ●
          /|\
         / | \
        /  |  \
  |+⟩ ●   |   ● |-⟩    ← Equator: equal superposition
        \  |  /
         \ | /
          \|/
           ●
         |1⟩ (South Pole)
```

Key landmarks on Quarky's globe:

| Location | State | What it means |
|----------|-------|---------------|
| North Pole | $|0\rangle$ | Measures as 0 with certainty |
| South Pole | $|1\rangle$ | Measures as 1 with certainty |
| Equator, +x | $\|{+}\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$ | 50/50 superposition, no phase |
| Equator, −x | $\|{-}\rangle = \frac{|0\rangle-|1\rangle}{\sqrt{2}}$ | 50/50 superposition, phase flipped |

!!! tip "Quarky Says"
    A classical bit only has two addresses: North Pole or South Pole. I have an **entire globe** of addresses — infinitely many states. But here's the catch: when you measure me, you always get North or South. The richness of my in-between states only matters *during computation*, while you let me evolve without looking.

!!! example "Worked Example: Finding a State on the Bloch Sphere"
    Given: $|\psi\rangle = \dfrac{1}{\sqrt{3}}|0\rangle + \sqrt{\dfrac{2}{3}}|1\rangle$

    Compare with $\cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle$:

    - $\cos(\theta/2) = 1/\sqrt{3}$ → $\theta \approx 109.5°$ (below the equator, tilted toward South Pole)
    - Coefficient of $|1\rangle$ is real and positive → $\phi = 0$ (on the $xz$-plane)

    Quarky sits in the southern hemisphere, leaning toward \|1⟩, on the prime meridian.

---

## 1.5 Quantum Gates — Spinning Quarky

!!! tip "Quarky Says"
    A quantum gate is a rotation on my Bloch sphere globe. The **X gate** (quantum NOT) flips me from North to South or South to North — just like a classical NOT. The **Hadamard gate** rotates me from a pole to the equator — putting me into perfect superposition. Every rotation is reversible; there's always a rotation that undoes it.

### The Three Essential Gates

**Pauli-X (quantum NOT — bit flip):**

$$X = \begin{pmatrix}0 & 1 \\ 1 & 0\end{pmatrix} \qquad X|0\rangle = |1\rangle, \quad X|1\rangle = |0\rangle$$

This is a 180° rotation around the x-axis of the Bloch sphere. Quarky flips from North to South.

**Pauli-Z (phase flip):**

$$Z = \begin{pmatrix}1 & 0 \\ 0 & -1\end{pmatrix} \qquad Z|0\rangle = |0\rangle, \quad Z|1\rangle = -|1\rangle$$

!!! tip "Quarky Says"
    The Z gate doesn't change *where* I am on the Bloch sphere — it changes my *phase*, which is like changing which direction I'm spinning. You can't see the phase directly, but it affects how I interfere with other qubits. Phase is quantum computing's secret ingredient.

**Hadamard (superposition maker):**

$$H = \frac{1}{\sqrt{2}}\begin{pmatrix}1 & 1 \\ 1 & -1\end{pmatrix} \qquad H|0\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}, \quad H|1\rangle = \frac{|0\rangle-|1\rangle}{\sqrt{2}}$$

The Hadamard takes Quarky from a pole to the equator — from "definitely 0" to "equally likely to be 0 or 1." It is the starting move of nearly every quantum algorithm.

!!! tip "Quarky Says"
    Apply Hadamard to me twice and I'm back where I started — $H^2 = I$. It's a 90° rotation followed by another 90° rotation that *undoes* the first. Every quantum gate has an undo button. That's the law.

### Why All Quantum Gates Are Reversible

All quantum gates are **unitary**: they satisfy $U^\dagger U = I$, where $U^\dagger$ is the conjugate transpose of $U$.

Three things follow automatically from this one equation:

1. **Probability is always preserved.** If Quarky starts with total probability 1, it ends with total probability 1. Nothing leaks out.
2. **Every gate has an inverse.** $U^{-1} = U^\dagger$. You can always undo a quantum gate.
3. **Evolution is deterministic.** Between measurements, Quarky's state evolves with perfect predictability. Randomness only enters at measurement.

!!! example "Worked Example: Verifying the X Gate Is Unitary"
    $X = \begin{pmatrix}0 & 1 \\ 1 & 0\end{pmatrix}$, which is real and symmetric, so $X^\dagger = X$.

    $X^\dagger X = X^2 = \begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix} = \begin{pmatrix}1&0\\0&1\end{pmatrix} = I$ ✅

    X is unitary. Applying X twice returns Quarky to the original state. NOT NOT = nothing. ✅

---

## 1.6 Dirac Notation — How Physicists Write About Quarky

!!! tip "Quarky Says"
    When scientists write about me, they use a special shorthand called **bra-ket notation**. My state is a *ket*: $|\psi\rangle$. The *bra* $\langle\psi|$ is like a mirror image used to compute overlaps. When you put bra and ket together — $\langle\phi|\psi\rangle$ — you get a number telling you how similar two states are. It's the quantum version of asking "how close are two directions on a compass?"

| Symbol | What it is | Analogy |
|--------|-----------|---------|
| $|\psi\rangle$ | Column vector (ket) | Quarky's full state |
| $\langle\psi|$ | Row vector (bra) = conjugate transpose | Quarky's "mirror" |
| $\langle\phi|\psi\rangle$ | Inner product = a number | Overlap / similarity |
| $|\psi\rangle\langle\phi|$ | Outer product = a matrix | A transformation |
| $\otimes$ | Tensor product | Two Quarkys combined |

Key facts:

- **Normalization:** $\langle\psi|\psi\rangle = |\alpha|^2 + |\beta|^2 = 1$
- **Orthogonality:** $\langle 0|1\rangle = 0$ — basis states are perpendicular (like x and y axes)
- **Measurement probability:** $P(\text{outcome } i) = |\langle i|\psi\rangle|^2$
- **Completeness:** $|0\rangle\langle 0| + |1\rangle\langle 1| = I$ — every measurement yields *some* outcome

!!! tip "Quarky Says"
    Why not just use matrices and columns? Because with 50 qubits, the matrix has $2^{50} \approx 10^{15}$ rows. Nobody writes that out. Dirac notation lets us write $\sum_{x} \alpha_x |x\rangle$ to mean all $10^{15}$ amplitudes at once. It's a compression format for quantum states.

---

## 1.7 Many Quarkys: The n-Qubit State Space

!!! tip "Quarky Says"
    Put two of me together and we live in a space with **4 dimensions** (representing states \|00⟩, \|01⟩, \|10⟩, \|11⟩). Put 10 of us together: $2^{10} = 1{,}024$ dimensions. Put 300 of us together: $2^{300}$ dimensions — more than the number of atoms in the universe. That exponential explosion is where quantum computing's power lives. But it comes with a catch: you can only *read* one value when you measure.

The state of $n$ qubits:

$$|\psi\rangle = \sum_{x=0}^{2^n-1} \alpha_x |x\rangle, \qquad \sum_{x=0}^{2^n-1} |\alpha_x|^2 = 1$$

There are $2^n$ complex amplitudes. For $n = 300$, this is a number larger than $10^{80}$ — more coefficients than atoms in the observable universe.

### Quantum Parallelism and Its Catch

Apply Hadamard to all $n$ qubits starting from $|0\cdots 0\rangle$:

$$H^{\otimes n}|0\rangle^{\otimes n} = \frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}|x\rangle$$

With one operation, Quarky is now simultaneously in *all* $2^n$ basis states with equal amplitude.

Apply an oracle $B_f$ to this superposition:

$$B_f \left(\frac{1}{\sqrt{2^n}}\sum_x |x\rangle\right)|0\rangle = \frac{1}{\sqrt{2^n}}\sum_x |x\rangle|f(x)\rangle$$

**One oracle call evaluates $f$ on all $2^n$ inputs at once.** This is quantum parallelism.

!!! warning "The Catch"
    If you measure now, you get $f(x)$ for just *one* randomly chosen $x$. All that parallel computation collapses to a single answer. Quantum algorithms must **use interference to amplify the probability of the right answer** before measuring. Simply running the oracle once and measuring is not useful by itself.

!!! tip "Quarky Says"
    Quantum parallelism is like writing every possible answer on a whiteboard simultaneously — but then a fog machine covers the board and you can only peek at one spot. The art of quantum algorithm design is arranging the fog so that when you peek, the correct answer is almost always where you look.

### Entanglement vs. Superposition — Two Different Things

!!! tip "Quarky Says"
    Press **Entangle** on my animation. I turn gold. Now imagine there's a second Quarky across the room. If you measure me and I turn blue (\|0⟩), the other Quarky *instantly* turns pink (\|1⟩) — even if it's on the other side of the world. That's entanglement. It's not the same as superposition. Superposition is me being uncertain on my own. Entanglement is two of us being *correlated* in a way that has no classical explanation.

**Superposition:** A single qubit has a non-definite state. $|\psi\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$ is a *product* state — there's no second qubit involved.

**Entanglement:** Two qubits whose joint state *cannot* be written as a product of individual states:

$$\frac{|00\rangle + |11\rangle}{\sqrt{2}} \neq |\psi_A\rangle \otimes |\psi_B\rangle \quad \text{for any single-qubit states } |\psi_A\rangle, |\psi_B\rangle$$

!!! example "Worked Example: Is This State Entangled?"
    State A: $\frac{1}{2}(|00\rangle + |01\rangle + |10\rangle + |11\rangle)$

    This *looks* complicated but equals $|{+}\rangle \otimes |{+}\rangle$ — a product state. **Not entangled.**

    State B: $\frac{|00\rangle + |11\rangle}{\sqrt{2}}$ (Bell state)

    If it factored: we'd need $\alpha\delta = 0$ AND $\beta\gamma = 0$ but also $\alpha\gamma \neq 0$ AND $\beta\delta \neq 0$. Impossible. **Entangled.** ✅

---

## 1.8 The No-Cloning Theorem — You Can't Copy Quarky

!!! tip "Quarky Says"
    Can you make a copy of me? In the classical world, copying is trivial — Ctrl+C. But there's a fundamental law of physics that says **you cannot copy an unknown quantum state**. If you could, it would violate the rules of unitary evolution. This has huge implications: quantum error correction has to be clever, and quantum networks work differently from classical ones.

**Theorem (Wootters & Zurek, 1982):** There is no unitary $U$ such that $U|\psi\rangle|0\rangle = |\psi\rangle|\psi\rangle$ for *all* states $|\psi\rangle$.

**Why?** Suppose such a $U$ existed. Take two states $|\psi\rangle$ and $|\phi\rangle$ and apply $U$ to both:

$$\langle\phi|\psi\rangle = \langle\phi|\psi\rangle^2$$

This equation only holds when $\langle\phi|\psi\rangle = 0$ (orthogonal) or $= 1$ (identical). For the infinitely many states in between — no cloning machine can exist.

Three consequences:

| Implication | Classical | Quantum |
|-------------|-----------|---------|
| Error correction | Copy bits, take majority vote | Must detect errors *without* reading the state |
| Networking | Copy packets freely | Use quantum teleportation (destroys original) |
| Fan-out | $|x\rangle|0\rangle \to |x\rangle|x\rangle$ works for $x \in \{0,1\}$ | Fails for superpositions — creates entanglement instead |

!!! warning "Common Misconception"
    No-cloning does NOT mean quantum states can't be *moved*. Quantum teleportation transfers a state perfectly from Alice to Bob. The original is destroyed. There is never a moment where both Alice and Bob have a copy simultaneously.

---

## 1.9 Quantum vs. Classical — The Full Picture

!!! tip "Quarky Says"
    Let me summarize the key differences between me and a classical bit, side by side. The most important lesson: quantum advantage is not automatic. My exponential state space only helps if a clever algorithm uses interference to point the measurement at the right answer.

### Side-by-Side Comparison

| Dimension | Classical bit | Quarky (qubit) |
|-----------|--------------|----------------|
| States available | 2 (0 or 1) | Infinite (entire Bloch sphere) |
| State space for $n$ units | $2^n$ possible states, one at a time | $2^n$-dimensional amplitude vector |
| Gates | Irreversible (AND, OR, NAND) | Reversible (unitary matrices) |
| Parallelism | One input at a time | All $2^n$ inputs simultaneously in superposition |
| Copying | Trivial | Impossible for unknown states |
| Randomness | External (RNG) | Fundamental (measurement) |
| Error model | Discrete bit flips | Continuous amplitude rotation + decoherence |
| Energy per gate | $\geq k_B T \ln 2$ (if irreversible) | 0 (ideal; reversible evolution) |

### Where Quantum Wins

| Problem type | Speedup | Algorithm |
|-------------|---------|-----------|
| Integer factoring | **Exponential** | Shor's algorithm (Ch. 4) |
| Unstructured search | **Quadratic** ($\sqrt{N}$ vs $N$) | Grover's algorithm (Ch. 4) |
| Quantum simulation | **Polynomial** in system size | VQE, QPE (Ch. 4) |
| NP-complete problems (TSP, SAT) | **None known** | Quantum computers are NOT magic solvers |

!!! tip "Business Implication"
    The most urgent business implication is **cryptography**. Shor's algorithm (running on a future fault-tolerant quantum computer) will break RSA and elliptic-curve cryptography — the security layer protecting essentially all internet commerce and banking today. Nation-state adversaries are storing encrypted data now to decrypt later ("harvest now, decrypt later"). Organizations with data that must stay secret for 10+ years should begin **post-quantum cryptographic migration** now, following NIST FIPS 203/204/205 standards (finalized August 2024).

---

## 1.10 Complexity: Where Does Quantum Sit in the Map?

!!! tip "Quarky Says"
    Computer scientists sort problems into buckets based on how hard they are. My bucket is called **BQP** — problems I can solve efficiently. It overlaps with but is different from the classical buckets P, BPP, and NP. The most important thing to know: **I cannot solve NP-complete problems efficiently.** Quantum speedup requires mathematical structure I can exploit through interference. Without that structure, I'm not much faster than a classical computer.

Key complexity classes:

- **P** — Solvable in polynomial time, classically and deterministically
- **BPP** — Solvable efficiently with classical randomness
- **BQP** — Solvable efficiently on a quantum computer (Quarky's home)
- **NP** — Solutions can be *verified* in polynomial time (e.g., Sudoku, traveling salesman)
- **PSPACE** — Solvable with polynomial memory (possibly exponential time)

Known relationships:

$$P \subseteq BPP \subseteq BQP \subseteq PSPACE$$

**Factoring** is in BQP (Shor) and in NP, but is NOT believed NP-complete.
**NP-complete problems** are NOT believed to be in BQP.

!!! warning "The Most Important Quantum Computing Misconception"
    Quantum computers will **not** solve the traveling salesman problem, protein folding in general, or combinatorial optimization problems in polynomial time. Grover's algorithm gives a quadratic speedup on brute-force search — still exponential, just a smaller exponent. When a vendor claims their quantum hardware "solves optimization," ask: *compared to what classical benchmark, on what instance size, with what approximation guarantee?*

---

## Chapter 1 Summary — Quarky's Recap

<iframe src="../../sims/quarky/main.html" width="100%" height="200"
  style="border:none; border-radius:8px; margin-bottom:1rem;"></iframe>

!!! abstract "Chapter Summary"
    1. **Computation is physical.** Erasing a bit costs energy ($E = k_B T \ln 2$). Quantum gates, being reversible, are thermodynamically free.

    2. **Classical can be made reversible.** The Toffoli gate (Bennett, 1973) shows any irreversible circuit can be rewritten reversibly. This bridge connects classical and quantum computation via the oracle model $B_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle$.

    3. **Quantum = Classical probabilistic + complex amplitudes + L2 norm.** Replace probabilities with amplitudes. Replace L1 norm with L2 norm. Gain: interference. This is not a mystery — it is a natural generalization.

    4. **Quarky lives on a Bloch sphere.** Every single-qubit state is a point on a globe. Quantum gates are rotations. Measurement collapses to a pole.

    5. **Exponential power + measurement bottleneck.** $n$ qubits span $2^n$ dimensions. But measurement collapses to one outcome. Interference must amplify the right answer before you look.

    6. **You can't copy Quarky.** The no-cloning theorem is a law of physics, not an engineering limitation.

    7. **Quantum advantage requires structure.** BQP ≠ NP. Quantum computers are not universal optimizers.

### Key Equations at a Glance

| Concept | Equation |
|---------|----------|
| Landauer's limit | $E_{\min} = k_B T \ln 2$ |
| Qubit state | $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$, $\|\alpha\|^2+\|\beta\|^2=1$ |
| Measurement probability | $P(\text{outcome }i) = |\langle i|\psi\rangle|^2$ |
| Bloch sphere | $|\psi\rangle = \cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle$ |
| Unitarity | $U^\dagger U = I$ |
| Toffoli gate | $|a,b,c\rangle \to |a,b,c \oplus (a \wedge b)\rangle$ |
| Oracle model | $B_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle$ |
| $n$-qubit space | $2^n$ dimensions |
| No-cloning | $\nexists\, U: U|\psi\rangle|0\rangle = |\psi\rangle|\psi\rangle\ \forall\, |\psi\rangle$ |

---

## References

- Landauer, R. "Irreversibility and heat generation in the computing process." *IBM Journal of Research and Development* 5(3), 1961.
- Bennett, C.H. "Logical reversibility of computation." *IBM Journal of Research and Development* 17(6), 1973.
- Wootters, W.K. and Zurek, W.H. "A single quantum cannot be cloned." *Nature* 299, 1982.
- Feynman, R.P. "Simulating physics with computers." *International Journal of Theoretical Physics* 21(6–7), 1982.
- Nielsen, M.A. and Chuang, I.L. *Quantum Computation and Quantum Information.* Cambridge University Press, 2000.
- Watrous, J. Quantum Computation lecture notes, University of Calgary, 2006.

---

*← [Standard Chapter 1](index.md) | [Chapter 2: Entanglement →](../02-entanglement/index.md)*
