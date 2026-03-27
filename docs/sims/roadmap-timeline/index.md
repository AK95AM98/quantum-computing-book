# Quantum Hardware Roadmap Timeline

**Part II, Chapter 9 — The Race to Fault-Tolerant Quantum Computing**

## Learning Objectives

- Identify the major quantum hardware vendors and their distinct technical approaches.
- Distinguish between **delivered** milestones (verified, peer-reviewed claims) and **projected** roadmap targets (vendor announcements subject to revision).
- Critically evaluate **controversial** milestones and understand why independent verification matters in quantum science.
- Assess the realistic timeline from current NISQ-era hardware to cryptographically relevant fault-tolerant systems.

## Simulation

<iframe src="main.html" width="700" height="700" style="border:1px solid #ccc; border-radius:6px;"></iframe>

[Open in full screen](main.html){ .md-button }

## How to Use

- **Click any milestone** symbol to see the full description in the info panel at the bottom.
- Use the **company toggle buttons** to show/hide individual vendors.
- Toggle **Delivered only** to filter out projected and controversial milestones.
- Hover over a milestone to see its name without clicking.

## Milestone Types

| Symbol | Type | Meaning |
|:------:|------|---------|
| Circle | DELIVERED | Peer-reviewed result or independently confirmed announcement. The milestone is considered achieved as of the publication date. |
| Diamond | PROJECTED | Vendor roadmap target. Based on publicly announced plans. Subject to delay or revision. Treat as aspirational. |
| Triangle | CONTROVERSIAL | A claimed milestone where the underlying science is disputed, under independent review, or where peer consensus has not yet formed. |

## A Note on Intellectual Honesty

Quantum hardware roadmaps present a unique challenge: vendors have both scientific reputations and commercial interests. The field has experienced several high-profile controversies, most notably:

- Google's 2019 "quantum supremacy" claim was contested by IBM, which argued the classical simulation time was overestimated. The dispute was largely resolved in Google's favour by 2023.
- Microsoft's 2022 Majorana qubit paper in *Nature* was retracted after independent experts found data inconsistencies. Microsoft published a new *Nature* paper in 2025 (Majorana 1 chip) — included here as CONTROVERSIAL pending independent replication.
- Reported "qubit counts" from different vendors are not comparable: IBM counts physical superconducting qubits, while IonQ reports Algorithmic Qubits (#AQ), a performance-adjusted metric.

This textbook aims to represent the state of the field accurately. Readers should consult primary sources and track post-publication commentary.

## Vendor Platform Summary

| Vendor | Qubit Type | Key Advantage | Key Limitation |
|--------|------------|--------------|----------------|
| IBM | Superconducting (transmon) | Scale, ecosystem, cloud access | Gate error rates ~0.1–0.5% |
| Google | Superconducting (Xmon) | Fidelity, error correction progress | Closed ecosystem |
| IonQ | Trapped ion | Best gate fidelities, all-to-all connectivity | Slow gate speeds |
| Microsoft | Topological (Majorana) | Theoretically low error rates | Unproven qubits |
| D-Wave | Quantum annealing | Thousands of qubits today | Not universal; optimisation only |
| Quantinuum | Trapped ion | Highest published 2Q fidelity | Limited scale |
| Chinese labs | Superconducting | Competitive RCS benchmarks | Limited transparency |

## Further Reading

- Preskill, J., "Quantum Computing in the NISQ Era and Beyond," *Quantum* 2, 79 (2018)
- IBM Quantum Development Roadmap (2024): ibm.com/quantum/roadmap
- Google Quantum AI, Willow chip paper, *Nature* 634, 965 (2024)
- Chapter 9 of this textbook — detailed analysis of each platform
