# Preface

## Why This Book Exists

In December 2024, Google's Willow chip demonstrated something that physicists had been working toward for 30 years: quantum error correction that actually works — where adding more qubits *reduces* rather than increases the logical error rate. A month later, the quantum field's most important experimental confirmation in years appeared: China's Zuchongzhi 3.2 processor independently replicated the result. The threshold theorem, first proved mathematically in 1997, had crossed into engineering reality.

At the same time, the National Institute of Standards and Technology finalized three post-quantum cryptography standards — FIPS 203, 204, and 205 — with regulatory deadlines starting January 2027. Nation-states are already harvesting encrypted communications for future quantum decryption. The cryptographic threat from Shor's algorithm is not a 2035 problem; it is a 2026 planning problem.

These two developments — one scientific, one regulatory — motivated this book. The quantum computing field has a peculiar communication problem: its most important technical results are explained either in journal papers accessible only to physicists, or in breathless press releases that shed more heat than light. Technically literate decision-makers — the CISOs, CTOs, and technology strategists who must act — are left navigating between "quantum computers will break everything" and "quantum computers are useless hype." Neither is accurate.

This book attempts to tell the truth at the appropriate level of precision.

## Who This Book Is For

This book serves two audiences simultaneously, which is harder than serving one.

**For the technically curious executive or strategist:** You do not need to follow every equation — though many are included and explained. You need to understand *why* Shor's algorithm breaks RSA (not just that it does), *what* the threshold theorem means for IBM's roadmap credibility, and *how* the Mosca framework should inform your cryptographic migration timeline. The "Business Implication" callouts after each technical section are written specifically for you.

**For the graduate student or engineer:** You will find rigorous treatment of qubits, gates, algorithms, error correction, and noise — built from first principles with worked examples and Qiskit code. The level assumes linear algebra and basic probability but no prior quantum mechanics. Part I covers what is typically taught in a first graduate course on quantum computing; Part II covers the current state of the art in hardware and error correction.

Both audiences need to read the same book because the decisions that matter — PQC migration budgets, quantum research investments, vendor selection, talent hiring — require both the engineering credibility to evaluate claims and the strategic clarity to act on them.

## How to Use This Book

**Executives and strategists:** Read Chapters 1–2 for physical intuition, then proceed directly to Part III (Chapters 12–15). Return to specific sections of Parts I and II when you need the technical foundation behind a claim. The glossary and FAQ are designed for quick reference.

**Graduate students:** Work through Parts I and II sequentially. Each chapter builds on the previous. Part III provides the commercial context that explains why the engineering milestones in Part II matter.

**Everyone:** Use the MicroSims. The Bloch Sphere Visualizer makes qubit states tangible. The Gate Explorer shows how quantum gates rotate states. The Grover Visualization makes amplitude amplification intuitive in a way that equations alone cannot. The Mosca Calculator (Chapter 12) makes the PQC risk timeline personal.

## A Note on Intellectual Honesty

This book distinguishes carefully between:

- **Delivered milestones** — results published in peer-reviewed journals (Google Willow, IBM Loon, Quantinuum Helios)
- **Projected milestones** — vendor roadmap claims backed by credible engineering trajectories (IBM Kookaburra 2026, Starling 2029)
- **Controversial claims** — results disputed by the research community (Microsoft's topological qubit announcement, February 2025)

I have tried to be a reliable narrator. Where evidence supports a claim, I say so and cite it. Where a claim is disputed, I present the disagreement fairly and note whose judgment I find most credible. Where I don't know, I say I don't know.

The field is moving fast. Some statements in this book will be superseded by new results. The framework for evaluating claims — the five milestone criteria of Chapter 11 — is designed to remain useful even as specific numbers change.

## Acknowledgments

This book was developed using the dmccreary/intelligent-textbooks framework — an approach to open, interactive graduate education that I believe represents the future of technical learning. The interactive simulations were built with p5.js and vis-network. The mathematics is rendered by MathJax 3.

*Prof. Sharat Batra*
*University of Minnesota*
*March 2026*
