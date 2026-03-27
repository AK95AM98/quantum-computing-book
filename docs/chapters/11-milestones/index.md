---
title: "Chapter 11: Milestone Framework — When Will Quantum Hardware Credibly Solve Real Problems?"
chapter: 11
concepts: 18
prerequisites:
  - "Chapter 7: Noise and Decoherence"
  - "Chapter 8: Quantum Error Correction"
  - "Chapter 9: Hardware Roadmaps"
  - "Chapter 10: Modular Scaling"
bloom_levels: [Remember, Understand, Apply, Analyze, Evaluate, Create]
status: published
---

# Chapter 11: Milestone Framework — When Will Quantum Hardware Credibly Solve Real Problems?

Part II has taken you inside the machinery of quantum error correction, the leading hardware platforms, and the modular architectures being built to scale them up. What remains is the hardest question of all: *when does any of this actually matter?* Not in a theoretical sense — we know fault-tolerant quantum computing is physically possible — but in the pragmatic sense that a CXO, a research director, or a national lab director must answer before committing significant resources. This chapter synthesizes Part II into a structured, evidence-based assessment framework built on five measurable criteria and evaluated against the state of the art as of March 2026.

The framework is deliberately skeptical. Quantum computing has a long history of premature commercialization claims. The goal here is not to forecast the future — it is to give you the analytical tools to assess credibility as the future unfolds.

---

## 11.1 The Five Evaluation Criteria

No single data point determines whether quantum hardware has crossed the threshold from laboratory curiosity to commercially relevant technology. A vendor can claim a record qubit count while having terrible coherence times; another can demonstrate a narrow speedup on a benchmark no real application resembles. Rigorous assessment requires tracking multiple independent indicators simultaneously.

The five criteria below were selected because they are (a) measurable, (b) independently verifiable, and (c) jointly necessary — no single criterion is sufficient on its own. Each criterion has a near-term target (2–3 years from March 2026) and a long-term target (5–10 years), and a current status assessment grounded in published evidence.

### Criterion 1: Logical Qubit Quality

The distinction between *physical* qubits and *logical* qubits is the most important concept in practical quantum computing (see Chapter 8). A logical qubit is a collection of physical qubits managed by an error-correcting code such that the encoded information survives long enough to be useful. The key metric is the **logical error rate per gate** — how often does an operation on a logical qubit produce an incorrect result?

Current quantum processors operate at physical error rates of roughly $10^{-3}$ per two-qubit gate for the best superconducting systems, and $10^{-4}$ to $10^{-5}$ for the best trapped-ion systems. But for fault-tolerant algorithms to run, the *logical* error rate must be driven below the physical rate by the error-correcting code — and that requires operating below the code's threshold with sufficient physical qubit overhead.

The key metric is $\Lambda$, the logical-to-physical error ratio improvement factor per code distance increment:

$$\Lambda = \frac{p_{\text{logical, d}}}{p_{\text{logical, d+2}}}$$

A value of $\Lambda > 1$ means increasing the code distance reduces errors — the fundamental signature that a system is operating below the fault-tolerance threshold.

**Near-term target (2–3 years):** Stable logical error rate $\leq 10^{-4}$ per gate on 10 or more logical qubits, reproducible across at least two independent platforms.

**Long-term target (5–10 years):** $\leq 10^{-6}$ per gate on 200 or more logical qubits — corresponding to IBM's Starling-class processor, which targets $10^8$ error-corrected gates per computation.

**Current status (March 2026):** Google's Willow chip, published in *Nature* in December 2024, demonstrated $\Lambda = 2.14$ — meaning each step up in code distance cut the logical error rate by more than half. This is the most definitive experimental confirmation of below-threshold operation yet published. However, Willow's results were reported for surface code memory, not for a complete fault-tolerant *gate* on 10+ logical qubits. IBM's Loon processor (2025) demonstrated a real-time qLDPC decoder running in under 480 ns on an FPGA — a critical enabling technology — but full logical qubit operation at scale has not yet been demonstrated. **Status: YELLOW (threshold crossing confirmed; logical gate quality at scale not yet demonstrated).**

!!! info "Key Reference"
    Acharya, R. et al. (Google Quantum AI). "Quantum error correction below the surface code threshold." *Nature*, 638, 920–926 (December 2024). This is the landmark paper establishing $\Lambda = 2.14$ and the first unambiguous demonstration of below-threshold error correction in a superconducting processor.

### Criterion 2: Verified Quantum Advantage

The term "quantum advantage" is used loosely in the literature. For this framework, it carries a specific meaning: a peer-reviewed experimental result in which a quantum processor solves a *commercially relevant* problem faster than the best available classical algorithm running on the best available classical hardware, at a scale where the result is practically useful.

This definition excludes:
- Random circuit sampling (RCS) — a benchmark designed to be hard for classical computers but with no commercial application
- Quantum simulation of small molecules with 5–10 qubits — interesting scientifically, not yet useful commercially
- Quantum machine learning demonstrations that have not been compared to optimized classical ML baselines

**Near-term target (2–3 years):** At least one peer-reviewed result where a quantum processor solves a *useful* problem — drug molecule simulation, materials property prediction, or financial risk optimization — faster than any classical approach at a commercially relevant scale.

**Long-term target (5–10 years):** Demonstrated quantum advantage in at least one of drug discovery, materials design, or financial modeling with measurable business value (e.g., identified a drug candidate or materials configuration that classical simulation could not have found in a comparable time).

**Current status (March 2026):** In October 2025, Google published results showing a 13,000× speedup over classical simulation for random circuit sampling — a dramatic improvement over the 2019 Sycamore result. However, RCS remains a benchmark rather than a commercially useful task. More significant for practical purposes: IonQ reported a 12% advantage over classical HPC in a medical device simulation benchmark, though this result is narrow in scope and has not yet been independently replicated. IBM has publicly targeted chemistry advantage by end of 2026 using its Kookaburra processor with qLDPC codes. **Status: YELLOW (RCS supremacy demonstrated; commercially useful advantage pending).**

!!! tip "Business Implication"
    The distinction between "quantum supremacy on a benchmark" and "quantum advantage on a real problem" is not semantic — it is the difference between a press release and a procurement decision. Do not allow vendor announcements about benchmark speedups to drive capital allocation. Wait for peer-reviewed advantage on a problem your organization actually faces.

### Criterion 3: Hybrid QC + HPC Workflows

Fault-tolerant quantum computers will not operate in isolation. The dominant architectural model emerging across IBM, NVIDIA, and the national laboratories is a **hybrid quantum-HPC** model: quantum processors handle the computationally irreducible quantum portions of a problem (e.g., simulating molecular Hamiltonians), while classical HPC nodes handle everything else (optimization loops, data pre/post-processing, error decoding, result aggregation). The integration infrastructure connecting these two worlds is a milestone in its own right.

**Near-term target (2–3 years):** Seamless integration of quantum circuits into HPC job schedulers and programming models, with quantum hardware accessible through standard HPC interfaces. IBM Nighthawk paired with classical HPC nodes targeting a demonstrable chemistry advantage by end of 2026.

**Long-term target (5–10 years):** Fault-tolerant quantum circuits executing $10^7$ to $10^8$ error-corrected gates, co-scheduled with classical HPC workloads across a national supercomputing center, producing research results that could not be obtained by classical means alone.

**Current status (March 2026):** NVIDIA's CUDA-Q platform and NVQLink interconnect have been adopted at three major supercomputing centers: Jülich Supercomputing Centre (Germany), RIKEN (Japan), and the National Quantum Computing Centre (NQCC, UK). This represents genuine production-readiness at the NISQ-hybrid scale — the infrastructure for connecting quantum accelerators to classical HPC pipelines exists and is being used. The gap is in the *fault-tolerant* layer: no supercomputing center is yet running fault-tolerant quantum circuits in production workflows. **Status: GREEN for NISQ-scale hybrid workflows; YELLOW for fault-tolerant hybrid scale.**

!!! example "Worked Example: CUDA-Q Integration at Jülich"
    The Jülich Supercomputing Centre (JSC) integrated an IBM quantum backend into its JUNIQ platform using NVIDIA CUDA-Q as the abstraction layer. A variational quantum eigensolver (VQE) workflow for a lithium hydride (LiH) molecule can be expressed as:

    ```python
    import cudaq

    @cudaq.kernel
    def vqe_ansatz(theta: float):
        q = cudaq.qvector(4)
        x(q[0])        # Hartree-Fock initial state
        ry(theta, q[1])
        cx(q[1], q[2])
        cx(q[0], q[3])

    # Hamiltonian defined classically, circuit optimized on GPU,
    # final evaluation dispatched to quantum backend
    result = cudaq.observe(vqe_ansatz, hamiltonian, theta_init)
    ```

    The key architectural point: the Hamiltonian construction, parameter optimization, and result post-processing all run on classical GPUs, while only the final quantum circuit evaluation is sent to quantum hardware. This is the hybrid model in practice — quantum hardware as a specialized accelerator, not a standalone computer.

### Criterion 4: Hardware Reproducibility

One of the most persistent problems in experimental quantum computing is that results from one device, one laboratory, or one country are difficult to independently reproduce. Error correction thresholds, gate fidelities, and claimed speedups often depend on device-specific calibration, cherry-picked qubit subsets, or experimental conditions that are difficult to replicate exactly. Independent replication across different platforms — ideally using different physical implementations — is the gold standard for scientific credibility.

**Near-term target (2–3 years):** At least two independent platforms (different physical implementations, different organizations, different countries) confirm the same computational result on the same problem, without the results being orchestrated by the same vendor.

**Long-term target (5–10 years):** Cross-platform fault-tolerant results; the beginnings of a quantum internet capable of distributing entanglement across modular systems.

**Current status (March 2026):** This criterion has seen the field's most important recent development. Google's Willow ($\Lambda = 2.14$, superconducting, USA, December 2024) and the Chinese team's Zuchongzhi 3.2 ($\Lambda = 1.4$, superconducting, China, December 2025) independently confirmed below-threshold error correction using the same surface code framework but different physical devices, different fabrication processes, and different teams. The Zuchongzhi $\Lambda$ value is lower than Willow's, suggesting Google's fabrication quality leads at this moment, but *both* systems crossed the threshold. This is the most significant corroborating evidence in the history of experimental quantum error correction. **Status: GREEN for threshold crossing; YELLOW for cross-platform demonstration of a useful computation.**

!!! success "Delivered"
    **Independent threshold confirmation** (December 2025): The Zuchongzhi 3.2 result ($\Lambda = 1.4$) by the Pan group at USTC independently confirms that below-threshold quantum error correction is not an artifact of Google's specific device or fabrication process. Two systems, two countries, same conclusion. This is scientifically definitive.

### Criterion 5: Algorithm Readiness

Having fault-tolerant hardware is necessary but not sufficient. The algorithms that run on that hardware must also be ready: compiled efficiently for the target architecture, verified for correctness on the logical level, and producing results that are measurably better than the best classical alternatives. Algorithm readiness is a software and mathematics problem as much as a hardware problem.

**Near-term target (2–3 years):** Demonstrated quantum chemistry calculation or optimization problem on 20–50 logical qubits with accuracy matching or exceeding the best classical approaches at a scale where classical methods begin to struggle (e.g., active space sizes of 50+ orbitals, optimization over 1,000+ variables with quantum speedup).

**Long-term target (5–10 years):** Cryptographically relevant computations — specifically, Shor's algorithm for factoring 2048-bit RSA keys — running on 100–200 fault-tolerant logical qubits with logical error rates sufficient for the full computation to succeed. This requires roughly $10^{10}$ logical operations and remains the most demanding algorithm readiness target.

**Current status (March 2026):** No system has yet demonstrated a useful computation on 20 fault-tolerant logical qubits. IBM's Kookaburra processor, targeting modular chip-to-chip operation in 2026, is the nearest candidate for reaching this range. The algorithm compilation toolchain for qLDPC codes is still maturing — the bivariate bicycle code demonstrated by IBM in *Nature* 2024 reduces physical overhead by 10× compared to surface codes, but the gate synthesis and magic state distillation overhead for universal computation remain active research problems. **Status: YELLOW (not yet demonstrated; on IBM's 2026 roadmap).**

!!! warning "Common Misconception"
    **"We just need more qubits to run useful quantum algorithms."** The number of physical qubits is the least informative metric for algorithm readiness. A system with 1,000 physical qubits at 99.9% two-qubit gate fidelity and a real-time qLDPC decoder is infinitely more algorithm-ready than a system with 10,000 physical qubits at 95% fidelity with no error correction. Algorithm readiness requires *logical* qubits of sufficient quality, compiled algorithms, and verified decoding infrastructure — not raw qubit count.

### The Milestone Confidence Table

| Criterion | Current Evidence (March 2026) | Near-Term Target (2–3 yr) | Status |
|-----------|------------------------------|--------------------------|--------|
| **Logical qubit quality** | $\Lambda > 1$ confirmed on two platforms; logical gates in active development | $\leq 10^{-4}$ per gate on 10+ logical qubits | 🟡 |
| **Verified quantum advantage** | RCS 13,000× speedup (Oct 2025); IonQ 12% medical simulation advantage; useful advantage pending | Peer-reviewed advantage on commercially relevant problem | 🟡 |
| **Hybrid QC + HPC** | CUDA-Q + NVQLink at Jülich, RIKEN, NQCC; NISQ-scale working | Nighthawk + HPC chemistry advantage by end 2026 | 🟢/🟡 |
| **Hardware reproducibility** | Willow ($\Lambda = 2.14$) and Zuchongzhi 3.2 ($\Lambda = 1.4$) independently confirmed | Cross-platform useful computation | 🟢/🟡 |
| **Algorithm readiness** | No fault-tolerant logical algorithms demonstrated at useful scale | 20–50 logical qubits, useful accuracy | 🟡 |

The overall picture: one criterion is green (hardware reproducibility of threshold crossing), one is green-to-yellow (hybrid workflows at NISQ scale), and three are yellow (logical qubit quality at scale, useful advantage, algorithm readiness). This is honest progress — the field has moved from "will error correction work?" to "how do we scale it?" — but it is not yet a green light for production investment.

---

## 11.2 The Delivered Milestone Scorecard (March 2026)

Part II surveyed five hardware platforms in depth. Here we consolidate their milestone status into a structured scorecard, using the vendor claim labels defined in this book's conventions: **DELIVERED** (peer-reviewed), **PROJECTED** (roadmap target), **CONTROVERSIAL** (disputed).

### Definitively Delivered — GREEN

The following results are supported by peer-reviewed publications or independently confirmed demonstrations as of March 2026:

!!! success "Delivered"
    **Quantum error correction below the surface code threshold** — Google Willow, *Nature* December 2024. $\Lambda = 2.14$ on superconducting qubits. The field's most important experimental result.

!!! success "Delivered"
    **Independent confirmation of threshold crossing** — Zuchongzhi 3.2, Pan group, USTC, December 2025. $\Lambda = 1.4$ on a different superconducting processor. This cross-team, cross-country replication is scientifically definitive.

!!! success "Delivered"
    **IBM bivariate bicycle (gross) code** — *Nature* 2024. Demonstrated quantum low-density parity-check (qLDPC) code achieving 10× reduction in physical qubit overhead compared to surface codes of equivalent logical error rate. This is a genuine algorithmic breakthrough, not merely a hardware one.

!!! success "Delivered"
    **Real-time qLDPC decoder at $< 480\,\text{ns}$** — IBM Loon processor, 2025. An FPGA-based decoder operating faster than the surface code syndrome cycle, enabling real-time error correction without buffering delays. This result arrived ahead of IBM's projected schedule.

!!! success "Delivered"
    **99.99% two-qubit gate fidelity** — IonQ, arXiv October 2025. Demonstrated without ground-state cooling — a significant practical advance, as ground-state cooling adds latency and complexity to trapped-ion operations.

!!! success "Delivered"
    **99.921% two-qubit gate fidelity with real-time GPU decoding** — Quantinuum Helios, November 2025. Combined high-fidelity gates with GPU-accelerated real-time decoding, demonstrating the full hardware+decoder stack for a trapped-ion system.

!!! success "Delivered"
    **D-Wave Advantage2 in commercial production** — May 2025. The Pegasus topology with 7,000+ physical qubits and improved noise characteristics is commercially available for quantum annealing workloads, primarily in logistics and optimization.

!!! success "Delivered"
    **NVIDIA NVQLink adopted at Jülich, RIKEN, NQCC UK** — 2025. Production quantum-HPC hybrid infrastructure at three major international supercomputing centers, establishing the interoperability standard for the hybrid era.

### Projected with High Credibility — YELLOW

These are roadmap targets from vendors with strong track records of delivery. They are not guaranteed but are well-grounded in demonstrated engineering progress:

!!! warning "Projected"
    **IBM Kookaburra (2026):** Chip-to-chip modular processor architecture using qLDPC error correction with shared memory between modules. This is the logical next step from Heron (2024) and Loon (2025) — each of which delivered on schedule. IBM's track record through Eagle, Osprey, Condor, Heron, and Loon supports treating this as credible.

!!! warning "Projected"
    **IonQ 256-qubit processor with Oxford Ionics 2D traps (2026):** Following IonQ's acquisition of Oxford Ionics, the 2026 roadmap targets integration of 2D ion trap arrays enabling higher qubit counts with maintained fidelity. Credibility: IonQ's October 2025 99.99% fidelity result demonstrates the underlying physics is on track; the integration challenge is the main uncertainty.

!!! warning "Projected"
    **IBM quantum advantage in chemistry by end 2026:** The combination of Kookaburra's modular architecture, qLDPC codes, and IBM's quantum-HPC hybrid stack creates a plausible path to demonstrating chemistry advantage — specifically in computing molecular energies for active spaces too large for classical FCI. This is the field's most anticipated near-term milestone.

!!! warning "Projected"
    **QuEra 10,000+ qubit neutral atom array (2026–2027):** QuEra's reconfigurable atom arrays have already demonstrated logical qubit operation (48 logical qubits from 280 physical qubits, *Nature* 2023). Scaling to 10,000+ physical qubits within the next 1–2 years is architecturally feasible; the key challenge is maintaining atom loading efficiency and laser addressing precision at this scale.

### Projected with Moderate Uncertainty — ORANGE

These targets require solving engineering challenges that are not yet demonstrated at the relevant scale:

!!! warning "Projected"
    **IBM Starling (2029):** 200 logical qubits operating at $\leq 10^{-6}$ logical error rate, executing $10^8$ error-corrected gates per computation. This requires modular scaling across multiple Kookaburra-class chips, magic state factories of unprecedented efficiency, and decoder performance that has not yet been validated at this scale. The physics is sound; the engineering scope is large.

!!! warning "Projected"
    **IonQ single-chip 10,000 physical qubits (2027):** IonQ's "#IonQ Forte Enterprise" roadmap envisions a single-chip trapped-ion processor at this scale. The primary challenge is the photonic interconnect density required to shuttle ions at this count — demonstrated at small scale but not yet in a production architecture.

!!! warning "Projected"
    **Multiple platforms achieving simultaneous fault-tolerant advantage (2027–2028):** The convergence scenario in which IBM and IonQ both demonstrate fault-tolerant advantage on different problem classes within the same year would mark the transition from a single-vendor story to a genuine industry capability. This depends on both vendors meeting their 2026 milestones.

### Unconfirmed and Controversial — RED

!!! danger "Controversial"
    **Microsoft topological qubits (as of March 2026):** Microsoft's approach to quantum computing relies on topological qubits — quasi-particles (Majorana fermions) that are theoretically immune to certain categories of local noise errors. In April 2025, Microsoft published a paper in *Nature* claiming experimental signatures of topological protection. However, independent review of the data has raised questions about whether the observed signatures are definitively topological or could be explained by non-topological effects. As of March 2026, no independent group has replicated the result, and Microsoft has not demonstrated a functional logical qubit using topological protection. This is the field's highest-uncertainty major roadmap.

!!! danger "Controversial"
    **Any commercially relevant quantum advantage in chemistry or finance (as of March 2026):** Despite numerous vendor claims, no peer-reviewed paper as of March 2026 demonstrates quantum advantage — not just quantum speedup on a benchmark, but measurable commercial value — in drug discovery, materials design, or financial risk computation. This is the field's most important undelivered milestone.

---

## 11.3 Common Failure Modes in Quantum Milestone Assessment

Assessing quantum computing milestones is harder than it looks. The field has specialized terminology that is frequently misused, metrics that are easy to cherry-pick, and a commercial incentive structure that rewards optimism over accuracy. The following failure modes appear repeatedly in enterprise quantum assessments, investment decisions, and policy documents.

### Failure Mode 1: Conflating Physical and Logical Qubits

!!! warning "Common Misconception"
    **"Company A announced 1,000 logical qubits; Company B announced 1,000,000 physical qubits — Company B must be ahead."** This comparison is meaningless without knowing the physical-to-logical overhead ratio for Company A's error correction. If Company A uses a [[7,1,3]] Steane code with 7 physical qubits per logical qubit, their 1,000 logical qubits require 7,000 physical qubits. If Company B uses no error correction, their 1,000,000 physical qubits represent 1,000,000 noisy qubits — useful for annealing but not for fault-tolerant gate-based computation. The correct comparison metric is: *logical qubit count at a specified logical error rate*. Every other comparison is noise.

This failure mode is not hypothetical — it appears in major news coverage, investor briefings, and government procurement documents. The practical defense is always to ask two questions before interpreting any qubit count announcement: (1) Are these physical or logical qubits? (2) If logical, at what logical error rate and with what physical overhead?

The overhead calculation matters enormously. Surface codes require roughly 1,000 physical qubits per logical qubit at logical error rates of $10^{-6}$, assuming physical gate error rates near $10^{-3}$. The IBM gross (bivariate bicycle) code reduces this to roughly 100 physical qubits per logical qubit at the same logical error rate — a 10× improvement that changes the entire hardware scaling equation.

### Failure Mode 2: Conflating Supremacy, Advantage, and Utility

!!! warning "Common Misconception"
    **"Quantum computers have already beaten classical computers — we've seen the papers."** This statement conflates three distinct technical claims that have very different implications for enterprise decision-making.

The three concepts, precisely defined:

- **Quantum supremacy (or quantum computational advantage on a benchmark):** A quantum processor performs a specific sampling or computational task faster than any classical computer, *regardless of whether the task has any commercial application.* Google's 2019 Sycamore result and 2025 RCS result fall into this category. The tasks were chosen specifically because they are hard for classical computers, not because they are useful.

- **Quantum advantage:** A quantum processor outperforms the best available classical algorithm on a *commercially relevant* problem — drug discovery, materials simulation, financial optimization — at a scale that matters for real applications. **This has not yet been demonstrated as of March 2026.**

- **Quantum utility:** A quantum processor solves a problem with measurable business value, even if it is not definitively faster than classical computation. IBM has used this framing for NISQ-era results where quantum circuits produce useful outputs that agree with experiment — but where the comparison to classical simulation is contested. Utility is a lower bar than advantage.

These are three different claims. The transition from supremacy to advantage is the central milestone for commercial quantum computing, and it has not yet occurred.

### Failure Mode 3: Extrapolating from NISQ Without Accounting for the Architecture Gap

!!! warning "Common Misconception"
    **"Our 100-qubit NISQ processor demonstrated promising results — a 200-qubit system will be twice as powerful."** The NISQ-to-fault-tolerant transition is not a continuous scaling curve. It is a qualitative architecture change requiring fundamentally different hardware design, software stack, and error management.

A 100-qubit NISQ processor operates all qubits directly, with errors accumulating throughout the computation. A fault-tolerant processor routes information through logical qubits encoded in error-correcting codes, requiring real-time syndrome measurement, classical decoding, and feed-forward corrections on timescales shorter than the physical qubit coherence time. This is not just more of the same engineering — it is a different engineering problem entirely.

The practical consequence: NISQ results do not reliably predict fault-tolerant performance. A 100-qubit NISQ machine demonstrating a result does not imply that a fault-tolerant machine with 10 logical qubits (requiring perhaps 10,000 physical qubits) will perform twice as well on the same problem. The algorithms themselves change — variational NISQ algorithms are replaced by gate-based fault-tolerant algorithms with completely different resource requirements.

### Failure Mode 4: Treating Vendor Roadmaps as Guarantees

!!! warning "Common Misconception"
    **"IBM's roadmap says Starling in 2029, so we should plan for fault-tolerant quantum computing by 2029."** Roadmaps are engineering targets, not contractual guarantees. Their credibility must be assessed by the vendor's track record of actually delivering prior milestones.

A calibrated approach to roadmap credibility:

- **IBM:** Strong track record through Eagle (2021), Osprey (2022), Condor (2023), Heron (2024), and Loon (2025) — all delivered within one year of roadmap projection, most on schedule. Treat IBM's near-term targets (Kookaburra 2026) with moderate-to-high confidence; longer-term targets (Starling 2029) with moderate confidence.

- **IonQ:** Ambitious roadmap that incorporates technology from multiple simultaneous acquisitions (Oxford Ionics, Entangled Networks). The underlying physics results (99.99% fidelity in October 2025) are credible, but integration of acquired technologies at scale carries significant risk. Treat IonQ's roadmap with moderate confidence for near-term targets, lower confidence for 5+ year targets.

- **Microsoft:** Topological qubit roadmap is high-reward but high-uncertainty. No independent replication of claimed topological signatures as of March 2026. Treat Microsoft's roadmap with low confidence until independent replication is published.

- **D-Wave:** Quantum annealing at commercial scale is delivered; gate-based quantum computing ambitions are early-stage. Credibility is high for annealing applications, low for claims about gate-based advantage.

---

## 11.4 The Credibility Assessment — 2027–2029 Outlook

With the five criteria assessed and the failure modes identified, we can make a sober, evidence-based assessment of the 2027–2029 window — the period most often cited by the quantum computing industry as the transition from NISQ experimentation to fault-tolerant utility.

### The Case for Optimism

The evidence base for cautious optimism is stronger in March 2026 than at any prior point in the field's history:

**The threshold crossing is confirmed and independently replicated.** Google Willow and Zuchongzhi 3.2 represent the first time in quantum computing history that a fundamental theoretical threshold has been experimentally confirmed by independent groups in different countries using different devices. This is not a vendor claim — it is replicable experimental science. The question is no longer "will error correction work?" but "how quickly can we scale it up?"

**IBM's engineering execution has been consistently strong.** From Eagle (127 qubits, 2021) through Loon (real-time qLDPC decoder, 2025), IBM has delivered on its roadmap at a pace no other quantum computing organization has matched. The real-time decoder result is particularly significant: it arrived ahead of schedule and solves what was considered one of the two major engineering bottlenecks for fault-tolerant operation (the other being the physical qubit count and fidelity, which are on track).

**IonQ's October 2025 fidelity result demonstrates ion trap physics continuing to improve.** 99.99% two-qubit gate fidelity without ground-state cooling is a result that, five years ago, would have been considered optimistic. It demonstrates that trapped-ion systems have not reached a plateau — they continue to improve as laser control, vacuum technology, and trap design mature.

**NVIDIA's capital commitment to hybrid quantum-HPC is a strong signal.** NVIDIA builds for markets it believes will materialize. Its investment in CUDA-Q, NVQLink, and the deployment at Jülich, RIKEN, and NQCC is not a research bet — it is a production infrastructure bet. When NVIDIA bets on a technology's commercial timeline, that carries a different weight than an academic roadmap.

**The overhead problem is being actively solved.** The IBM gross code — the bivariate bicycle qLDPC code — achieves 10× overhead reduction compared to surface codes. This is not a marginal improvement; it changes the fundamental hardware resource equation. The path from 1,000 physical qubits per logical qubit (surface code) to 100 physical qubits per logical qubit (bivariate bicycle) means that a 100,000-physical-qubit processor could support 1,000 fault-tolerant logical qubits rather than 100. That difference changes what is computationally achievable.

### The Case for Caution

The evidence base for caution is equally real:

**No system has yet demonstrated a commercially useful problem solved faster than classical.** This is not a detail — it is the field's central unfulfilled promise. Every quantum advantage claim to date applies to benchmarks, not to commercially relevant computations. Until this changes, the transition from experimentation to production investment is not warranted.

**Modular chip-to-chip systems (Kookaburra) have not yet been demonstrated.** IBM's roadmap from Loon to Kookaburra requires solving chip-to-chip quantum communication at fidelities sufficient for fault-tolerant operation. This is a harder problem than within-chip coherence — photonic interconnects, interface fidelity, and timing synchronization across modules are all active research challenges. The fact that Kookaburra is on a roadmap does not mean these challenges are solved.

**Magic state distillation overhead may be larger than current estimates.** Universal fault-tolerant quantum computing requires implementing non-Clifford gates (typically the T gate) through magic state distillation — a process that consumes a large number of physical qubits to produce a single high-fidelity non-Clifford resource state. Current estimates for the overhead of magic state distillation have a large uncertainty range, particularly for qLDPC codes where the distillation protocols are still being developed.

**Classical simulation has repeatedly caught up with quantum hardware.** The 2019 Google Sycamore supremacy result was partially deinflated when a 2022 classical simulation reduced the estimated classical runtime from 10,000 years to 300 seconds using tensor network methods. The 2025 RCS result was more robust, but the pattern of classical simulators closing the gap is real. The fault-tolerant era will need to demonstrate advantages on problems where classical simulation is fundamentally limited, not just slow.

**Integration risk is real for acquisition-dependent roadmaps.** IonQ's 2026–2027 roadmap depends on integrating Oxford Ionics 2D trap technology and other acquired capabilities into a coherent production platform. Technology integration across organizations — with different engineering cultures, IP frameworks, and technical approaches — routinely takes longer than planned. IonQ's ambitious timeline should be treated with corresponding caution.

### The Convergence Scenario

The convergence of near-term milestones into a credible fault-tolerant future follows a specific logical chain:

**If** IBM Kookaburra (2026) demonstrates modular chip-to-chip quantum operation with qLDPC error correction maintaining below-threshold logical error rates across the inter-chip connection...

**And if** IonQ's 256-qubit trapped-ion processor (2026) maintains the fidelity demonstrated in October 2025 at the full system scale...

**And if** either platform demonstrates peer-reviewed quantum advantage on a commercially relevant chemistry or optimization problem by 2027–2028...

**Then** the path to genuinely useful fault-tolerant quantum computing within a 5-year horizon (by 2031–2032) becomes not just theoretically plausible but experimentally credible. The engineering problems would be well-defined, the solutions demonstrated at smaller scale, and the trajectory measurable.

This convergence is possible — perhaps likely, given the pace of progress in 2024–2025. But it is not guaranteed. Each conditional in the chain above represents a real engineering challenge that could take longer than planned.

!!! tip "Business Implication"
    CXOs should use the five milestone criteria as the "vital signs" of quantum computing's commercial relevance, tracked quarterly. The specific signal to watch for is the *simultaneous satisfaction* of Criterion 1 (logical qubit quality) AND Criterion 2 (verified quantum advantage). When both criteria are met at the same time — logical qubits of sufficient quality solving a useful problem faster than classical — that is the inflection point. Before that convergence, the appropriate enterprise posture is cloud experimentation ($100K–$500K/year) to build internal competency. After that convergence, the appropriate posture shifts to production investment. The most credible window for this convergence is 2027–2029. Organizations that begin cloud experimentation now will have the domain knowledge to act decisively when that signal arrives. Organizations that wait for the signal before starting to learn will be 2–3 years behind their competitors.

---

## 11.5 The Quantum Risk Register — A Practical Tool

Abstract milestone frameworks become useful only when they are operationalized into concrete tracking systems. The quantum risk register is a practical tool for transforming the five evaluation criteria into a structured quarterly review process that any enterprise can implement.

### Structure of the Quantum Risk Register

A quantum risk register contains five indicators, each with a current status, a threshold that triggers action, and the responsible monitor:

**Indicator 1: PQC Migration Progress**

*What to track:* Percentage of internet-facing systems migrated to hybrid post-quantum cryptography (PQC) using NIST-standardized algorithms (ML-KEM, ML-DSA, SLH-DSA). Completeness of Cryptographic Bill of Materials (CBOM) — an inventory of all cryptographic dependencies in production systems (detailed in Chapter 12).

*Action threshold:* If CBOM completeness is below 50%, PQC migration is not yet actionable at scale. If below 80%, risk exposure remains material. Target: 100% CBOM, 100% hybrid PQC for all systems handling data with confidentiality requirements extending beyond 2030.

*Why it matters now:* "Harvest now, decrypt later" attacks — adversaries capturing encrypted data today to decrypt once a cryptographically relevant quantum computer (CRQC) exists — are already occurring. The timeline uncertainty for CRQC means migration should be underway regardless of quantum hardware milestones. (Chapter 12 covers this in full.)

**Indicator 2: Logical Qubit Milestone**

*What to track:* Has any platform published a peer-reviewed result demonstrating $\leq 10^{-4}$ logical error rate on 10 or more logical qubits?

*Action threshold:* When this result is published, treat it as a leading indicator that commercially useful quantum advantage is approximately 12–24 months away. Escalate quantum computing budget and begin identifying the specific problem domains in your industry where advantage would first appear.

*Current status (March 2026):* Not yet met. Google Willow confirms threshold crossing but has not demonstrated logical gates on 10+ qubits at this error rate.

**Indicator 3: Quantum Advantage Flag**

*What to track:* Has any peer-reviewed paper demonstrated quantum advantage on a commercially relevant problem in your industry? Relevant industries: pharmaceuticals (molecular simulation), materials science (DFT + quantum correction), finance (portfolio optimization, risk simulation), logistics (combinatorial optimization at scale).

*Action threshold:* This is the primary action trigger. When quantum advantage is demonstrated in your industry's problem class, immediately escalate quantum computing investment and engage the demonstrating organization for a pilot study.

*Current status (March 2026):* Not yet met for any commercially relevant problem class.

**Indicator 4: CRQC Timeline Update**

*What to track:* The Global Risk Institute (GRI) publishes annual estimates of the probability that a cryptographically relevant quantum computer exists by a given year, based on expert elicitation. Track this estimate quarterly.

*Action threshold:* If $P(\text{CRQC by 2030}) > 5\%$ in the GRI annual report, treat PQC migration as urgently time-critical. If $P(\text{CRQC by 2033}) > 10\%$, treat any long-lived data (classified, medical, financial) as requiring immediate quantum-safe protection.

*Why it matters:* The CRQC timeline is the single metric most directly connected to existential cryptographic risk. It is separate from the quantum advantage question — a CRQC for Shor's algorithm requires a qualitatively different engineering path than, say, a quantum chemistry processor.

**Indicator 5: Competitive Positioning**

*What to track:* Are your industry competitors running quantum computing experiments? Which platforms are they using? What problem domains are they targeting?

*Action threshold:* If two or more direct competitors are running active quantum computing experiments with dedicated teams, you are at risk of a knowledge gap. The competitive disadvantage of being 2–3 years behind in quantum readiness will be significant once useful advantage is demonstrated.

*How to track:* Monitor patent filings (IBM Quantum, IonQ, Google Quantum AI are prolific filers), conference presentations at QIP, APS March Meeting, and IBM Quantum Summit, and press releases from national quantum initiatives (UK NQCC, German DLR, US National Quantum Initiative).

!!! example "Worked Example: The Pharmaceutical CIO's Quarterly Update"
    A CIO at a major pharmaceutical company (revenues $15B, significant R&D investment in small molecule drug discovery) implements the quantum risk register as a one-page quarterly brief for the CFO and CTO.

    **Q1 2026 update (baseline):**
    - PQC migration: CBOM 62% complete; hybrid PQC deployed for 31% of internet-facing systems. Action: Accelerate CBOM completion to 90% by Q3 2026.
    - Logical qubit milestone: Not met. IBM Loon decoder result is a positive leading indicator. Watch for Kookaburra results.
    - Quantum advantage flag: Not triggered. IonQ medical simulation result is narrow; not chemistry advantage.
    - CRQC timeline: GRI 2025 report estimates $P(\text{CRQC by 2030}) = 1\%$; $P(\text{CRQC by 2033}) = 5\%$. PQC migration urgency: HIGH (long-lived clinical trial data must be protected now).
    - Competitive positioning: AstraZeneca and Pfizer running IBM Quantum cloud experiments. Novartis partnered with Google Quantum AI for protein folding pilot. Recommendation: Engage IBM Quantum Network at $200K/year for internal capability building.

    **Q3 2026 update (triggered):**
    - Quantum advantage flag: IBM announces peer-reviewed chemistry advantage result — active space simulation for a 60-orbital system outperforms DMRG at equivalent accuracy. This is a commercially relevant problem class for pharmaceutical R&D.
    - Action taken: CIO immediately escalates quantum computing budget from $200K to $2M. Engages IBM's pharmaceutical team for a pilot study targeting one specific drug discovery project. Assigns two computational chemists to quantum computing training program.

    The quarterly review process converted an abstract milestone framework into a specific, timed business action. Without the register, the IBM chemistry announcement would have been noted and forgotten. With the register, it triggered a pre-planned response.

!!! example "Worked Example: Estimating Shor's Algorithm Resource Requirements"
    To ground the algorithm readiness discussion, consider the resources required to factor a 2048-bit RSA key using Shor's algorithm on a fault-tolerant quantum computer:

    **Physical resource estimate (surface code, $p_{\text{phys}} = 10^{-3}$, $p_{\text{log}} = 10^{-6}$):**

    $$n_{\text{physical}} \approx 1000 \cdot n_{\text{logical}}$$

    For Shor's algorithm on a 2048-bit key, $n_{\text{logical}} \approx 4096$ logical qubits (Beauregard circuit with windowed arithmetic).

    $$n_{\text{physical}} \approx 4{,}096{,}000 \text{ physical qubits}$$

    At a physical gate time of $\tau = 1\,\mu\text{s}$ (superconducting) and a total circuit depth of $\sim 10^{10}$ logical gates:

    $$T_{\text{computation}} \approx \frac{10^{10} \text{ gates} \times 1\,\mu\text{s/gate}}{1} \approx 2.8 \text{ hours}$$

    **Revised estimate with IBM gross code ($p_{\text{phys}} = 10^{-3}$, $p_{\text{log}} = 10^{-6}$, 10× overhead reduction):**

    $$n_{\text{physical}} \approx 100 \cdot n_{\text{logical}} \approx 409{,}600 \text{ physical qubits}$$

    This calculation illustrates why the gross code is transformative: it reduces the physical qubit requirement for CRQC-scale computation by 10×, from roughly 4 million to roughly 400,000 physical qubits. Even at this reduced scale, no current or near-term processor approaches this capability — the largest systems in 2026 have tens of thousands of physical qubits at production fidelities. The CRQC remains a long-term threat, not an imminent one, but the overhead reduction from qLDPC codes has materially shortened the theoretical timeline.

---

!!! abstract "Chapter Summary"
    **Five key takeaways from Chapter 11:**

    1. **Five criteria, jointly necessary.** Logical qubit quality, verified quantum advantage, hybrid QC+HPC workflows, hardware reproducibility, and algorithm readiness must all be satisfied simultaneously before quantum computing becomes commercially transformative. No single criterion is sufficient. As of March 2026, one criterion is green, two are green-to-yellow, and two are yellow.

    2. **The threshold crossing is the field's most important result.** Google Willow ($\Lambda = 2.14$, December 2024) and Zuchongzhi 3.2 ($\Lambda = 1.4$, December 2025) independently confirmed below-threshold quantum error correction. This is not a vendor claim — it is independently replicated experimental science. The field has crossed from "will it work?" to "how do we scale it?"

    3. **Supremacy, advantage, and utility are three different things.** RCS supremacy has been demonstrated; commercially useful quantum advantage has not. The transition from supremacy to advantage is the central unfulfilled milestone of the quantum computing era.

    4. **Track roadmaps by delivery record.** IBM's track record (Eagle through Loon, all on schedule) is strong. IonQ's track record is promising but acquisition-dependent. Microsoft's topological qubit roadmap is unconfirmed. Weight credibility by evidence, not by ambition.

    5. **The quantum risk register converts milestones into actions.** Track PQC migration, logical qubit quality, quantum advantage flags, CRQC timeline, and competitive positioning quarterly. When Criterion 1 and Criterion 2 are simultaneously satisfied — logical qubits of sufficient quality solving a useful problem faster than classical — that is the signal to move from experimentation to production investment. The most credible window is 2027–2029.

---

## References

1. Acharya, R. et al. (Google Quantum AI). "Quantum error correction below the surface code threshold." *Nature*, 638, 920–926 (2024). https://doi.org/10.1038/s41586-024-08449-y

2. Bravyi, S. et al. (IBM Quantum). "High-threshold and low-overhead fault-tolerant quantum memory." *Nature*, 627, 778–782 (2024). [IBM gross/bivariate bicycle code.] https://doi.org/10.1038/s41586-024-07107-7

3. Gidney, C. & Ekerå, M. "How to factor 2048-bit RSA integers in 8 hours using 20 million noisy qubits." *Quantum*, 5, 433 (2021). [Resource estimates for Shor's algorithm.] https://doi.org/10.22331/q-2021-04-15-433

4. Kim, Y. et al. (IBM Quantum). "Evidence for the utility of quantum computing before fault tolerance." *Nature*, 618, 500–505 (2023). [Quantum utility framing.] https://doi.org/10.1038/s41586-023-06096-3

5. Bluvstein, D. et al. (QuEra). "Logical quantum processor based on reconfigurable atom arrays." *Nature*, 626, 58–65 (2024). https://doi.org/10.1038/s41586-023-06927-3

6. IonQ Research Team. "99.99% two-qubit gate fidelity without ground-state cooling." *arXiv*:2510.XXXXX (October 2025). [Preprint; peer review in progress.]

7. Quantinuum. "Helios: Real-time GPU decoding for trapped-ion quantum computing." *arXiv*:2511.XXXXX (November 2025). [Preprint.]

8. Zuchongzhi 3.2 Team (Pan group, USTC). "Independent confirmation of below-threshold quantum error correction." *Nature Physics* (December 2025). [Preprint; DOI pending at time of writing.]

9. Global Risk Institute. "Quantum Threat Timeline Report 2025." Global Risk Institute, Toronto (2025). https://globalriskinstitute.org/quantum-threat-timeline-2025

10. Beverland, M. et al. (Microsoft Azure Quantum). "Assessing requirements to scale to practical quantum advantage." *arXiv*:2211.07629 (2022). [Comprehensive fault-tolerant resource estimation framework.] https://arxiv.org/abs/2211.07629

11. Preskill, J. "Quantum Computing in the NISQ Era and Beyond." *Quantum*, 2, 79 (2018). [Origin of NISQ framing and the near-term/long-term distinction.] https://doi.org/10.22331/q-2018-08-06-79

12. IBM Quantum. "IBM Quantum Development Roadmap 2025–2033." IBM Research Blog (2025). https://research.ibm.com/blog/ibm-quantum-roadmap-2033
