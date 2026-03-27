# Quantum Computing — Concept List

150 core concepts organized by chapter, with dependency annotations.
Dependency numbers refer to the concept IDs in this list.

---

## Part I: Foundations (Chapters 1–6)

### Chapter 1: Classical Bits vs. Quantum Bits

1. **Classical bit** — depends on: none
2. **Boolean logic gates** — depends on: 1
3. **Reversibility and irreversibility** — depends on: 2
4. **Landauer's principle** — depends on: 3
5. **Information and entropy** — depends on: 1
6. **Classical register** — depends on: 1, 2
7. **Limits of classical computation** — depends on: 2, 5
8. **Motivation for quantum computing** — depends on: 7
9. **History of quantum computing** — depends on: 8
10. **Overview of quantum hardware** — depends on: 9

### Chapter 2: Quantum States and Qubits

11. **Qubit** — depends on: 1
12. **Dirac (bra-ket) notation** — depends on: 11
13. **Quantum state vector** — depends on: 12
14. **Normalization condition** — depends on: 13
15. **Quantum superposition** — depends on: 11, 14
16. **Bloch sphere** — depends on: 13, 15
17. **Global vs. relative phase** — depends on: 13
18. **Multi-qubit state space** — depends on: 11
19. **Tensor product** — depends on: 18
20. **Computational basis states** — depends on: 12, 19

### Chapter 3: Quantum Measurement

21. **Born rule** — depends on: 13, 14
22. **Projective measurement** — depends on: 21
23. **Measurement basis** — depends on: 20, 22
24. **Expectation value** — depends on: 21
25. **Collapse of the wavefunction** — depends on: 22
26. **No-cloning theorem** — depends on: 25
27. **Observable and Hermitian operator** — depends on: 24
28. **Pauli operators** — depends on: 27
29. **Measurement in the X and Y bases** — depends on: 23, 28
30. **Partial measurement of multi-qubit systems** — depends on: 19, 22

### Chapter 4: Quantum Gates

31. **Unitary matrix** — depends on: 13
32. **Single-qubit gates (X, Y, Z)** — depends on: 28, 31
33. **Hadamard gate** — depends on: 32
34. **Phase gates (S, T)** — depends on: 32
35. **Rotation gates (Rx, Ry, Rz)** — depends on: 31, 34
36. **Universal gate set** — depends on: 32, 33, 34
37. **Two-qubit gates (CNOT)** — depends on: 19, 31
38. **SWAP gate** — depends on: 37
39. **Controlled-U gate** — depends on: 37
40. **Toffoli gate** — depends on: 39

### Chapter 5: Entanglement

41. **Product state** — depends on: 19
42. **Entangled state** — depends on: 41
43. **Bell states** — depends on: 33, 37, 42
44. **Schmidt decomposition** — depends on: 42
45. **Entanglement entropy** — depends on: 44
46. **EPR paradox** — depends on: 42
47. **Bell inequalities** — depends on: 46
48. **Bell inequality violation** — depends on: 47
49. **Quantum teleportation** — depends on: 43, 26
50. **Superdense coding** — depends on: 43

### Chapter 6: Quantum Circuits

51. **Quantum circuit model** — depends on: 32, 37
52. **Circuit depth and width** — depends on: 51
53. **Circuit diagram conventions** — depends on: 51
54. **Ancilla qubits** — depends on: 51
55. **Reversible computation** — depends on: 3, 40
56. **Quantum parallelism** — depends on: 15, 51
57. **Quantum interference** — depends on: 15, 33
58. **Phase kickback** — depends on: 39, 57
59. **Quantum Fourier transform** — depends on: 34, 57
60. **Quantum phase estimation** — depends on: 58, 59

---

## Part II: Quantum Algorithms (Chapters 7–10)

### Chapter 7: Fundamental Algorithms

61. **Oracle (black-box function)** — depends on: 51
62. **Query complexity** — depends on: 61
63. **Deutsch's algorithm** — depends on: 61, 33
64. **Deutsch-Jozsa algorithm** — depends on: 63, 56
65. **Bernstein-Vazirani algorithm** — depends on: 64
66. **Simon's algorithm** — depends on: 64, 60
67. **Promise problem** — depends on: 62
68. **Quantum speedup (definition)** — depends on: 62, 63
69. **Amplitude encoding** — depends on: 56
70. **Quantum random access memory (qRAM)** — depends on: 69

### Chapter 8: Grover's Search Algorithm

71. **Unstructured search problem** — depends on: 61, 62
72. **Grover oracle** — depends on: 61
73. **Amplitude amplification** — depends on: 57, 72
74. **Diffusion operator** — depends on: 73
75. **Grover iteration** — depends on: 73, 74
76. **Optimal number of iterations** — depends on: 75
77. **Geometric picture (rotations in 2D)** — depends on: 75
78. **Quadratic speedup** — depends on: 76, 68
79. **Generalized amplitude amplification** — depends on: 73
80. **Applications of Grover's algorithm** — depends on: 78

### Chapter 9: Shor's Factoring Algorithm

81. **Integer factorization problem** — depends on: 7
82. **RSA cryptography** — depends on: 81
83. **Period finding** — depends on: 60, 81
84. **Quantum phase estimation for period finding** — depends on: 60, 83
85. **Continued fractions algorithm** — depends on: 84
86. **Modular exponentiation circuit** — depends on: 40, 83
87. **Shor's algorithm structure** — depends on: 84, 85, 86
88. **Shor's algorithm complexity** — depends on: 87
89. **Implications for public-key cryptography** — depends on: 82, 88
90. **Post-quantum cryptography overview** — depends on: 89

### Chapter 10: Quantum Complexity Theory

91. **Computational complexity basics** — depends on: 7
92. **Complexity classes P and NP** — depends on: 91
93. **BQP (bounded-error quantum polynomial time)** — depends on: 92
94. **QMA class** — depends on: 93
95. **Relationship BQP vs. P, NP** — depends on: 93, 92
96. **Oracle separation results** — depends on: 95
97. **Quantum query complexity** — depends on: 62
98. **BQPSPACE and PSPACE** — depends on: 93
99. **Quantum advantage and supremacy** — depends on: 93, 95
100. **Hardness of quantum simulation** — depends on: 100

---

## Part III: Quantum Error Correction (Chapter 11)

### Chapter 11: Quantum Error Correction

101. **Quantum errors (bit-flip, phase-flip)** — depends on: 32
102. **Decoherence** — depends on: 101
103. **Quantum error correction conditions** — depends on: 101
104. **3-qubit bit-flip code** — depends on: 103
105. **3-qubit phase-flip code** — depends on: 103, 33
106. **Shor's 9-qubit code** — depends on: 104, 105
107. **Stabilizer formalism** — depends on: 106
108. **CSS codes** — depends on: 107
109. **Surface code** — depends on: 108
110. **Fault-tolerant quantum computation** — depends on: 109, 110

---

## Part IV: Physical Implementations (Chapters 12–13)

### Chapter 12: Physical Implementations of Qubits

111. **Two-level quantum system** — depends on: 11
112. **Superconducting qubits** — depends on: 111
113. **Transmon qubit** — depends on: 112
114. **Trapped-ion qubits** — depends on: 111
115. **Photonic qubits** — depends on: 111
116. **Spin qubits (quantum dots)** — depends on: 111
117. **Neutral atom qubits** — depends on: 111
118. **Topological qubits** — depends on: 109, 111
119. **Qubit coherence time (T1, T2)** — depends on: 102
120. **Gate fidelity** — depends on: 31, 119

### Chapter 13: NISQ Devices and Near-Term Algorithms

121. **NISQ era (definition)** — depends on: 120
122. **Variational quantum eigensolver (VQE)** — depends on: 60, 121
123. **Quantum approximate optimization algorithm (QAOA)** — depends on: 121
124. **Parameterized quantum circuits** — depends on: 35, 121
125. **Barren plateaus** — depends on: 124
126. **Quantum-classical hybrid algorithms** — depends on: 122, 123
127. **Noise mitigation techniques** — depends on: 121, 101
128. **Zero-noise extrapolation** — depends on: 127
129. **Randomized benchmarking** — depends on: 120
130. **Quantum volume** — depends on: 120, 52

---

## Part V: Advanced Topics (Chapters 14–15)

### Chapter 14: Quantum Machine Learning

131. **Quantum data encoding** — depends on: 69
132. **Quantum kernel methods** — depends on: 131
133. **Variational quantum classifiers** — depends on: 124, 131
134. **Quantum neural networks** — depends on: 133
135. **HHL algorithm (linear systems)** — depends on: 60, 70
136. **Quantum PCA** — depends on: 135
137. **Dequantization and quantum-inspired algorithms** — depends on: 135
138. **Quantum advantage in machine learning** — depends on: 137, 99
139. **Quantum data (datasets on quantum hardware)** — depends on: 131
140. **Quantum generative models** — depends on: 134

### Chapter 15: The Quantum Future

141. **Quantum key distribution (QKD)** — depends on: 26, 43
142. **BB84 protocol** — depends on: 141, 29
143. **Quantum networks** — depends on: 49, 141
144. **Quantum repeaters** — depends on: 143
145. **Fault-tolerant threshold theorem** — depends on: 110
146. **Road to logical qubits** — depends on: 109, 145
147. **Quantum simulation** — depends on: 51, 100
148. **Quantum chemistry applications** — depends on: 147, 122
149. **Quantum optimization applications** — depends on: 80, 123
150. **Quantum computing roadmap** — depends on: 146, 148, 149
