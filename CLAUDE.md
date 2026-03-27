# CLAUDE.md — Quantum Computing: From Qubits to Business Value

## Project Identity
- **Title:** Quantum Computing: From Qubits to Business Value — A Technical and Strategic Guide
- **Author:** Prof. Sharat Batra, University of Minnesota
- **GitHub:** https://github.com/AK95AM98/quantum-computing-book
- **Pages:** https://AK95AM98.github.io/quantum-computing-book/
- **Framework:** dmccreary/intelligent-textbooks, Level 2+

## Structure
- 15 chapters across 3 parts (~100,000 words target)
- Part I (Ch. 1–6): Quantum foundations
- Part II (Ch. 7–11): Engineering — noise, QEC, roadmaps, scaling, milestones
- Part III (Ch. 12–15): Business — PQC, use cases, readiness, CXO action plan

## Math Conventions
- **Engine:** MathJax 3 via pymdownx.arithmatex
- **Inline:** `\(...\)` or `$...$`
- **Display:** `\[...\]` or `$$...$$`
- **Dirac notation:** `\ket{}`, `\bra{}`, `\braket{}{}` (defined in mathjax.js)
- **Qiskit notation:** Little Endian; filled circles = controls; ⊕ = CNOT target

## Admonition Conventions
```
!!! tip "Business Implication"      — connects physics to enterprise decisions
!!! example "Worked Example"        — numerical examples (2–3 per chapter)
!!! warning "Common Misconception"  — at least 1 per chapter
!!! info "Key Reference"            — seminal papers
!!! abstract "Chapter Summary"      — 3–5 takeaways, end of each chapter
!!! success "Delivered"             — vendor milestones: verified/published
!!! warning "Projected"             — vendor milestones: planned/roadmap
!!! danger "Controversial"          — disputed claims (e.g. Microsoft topological)
```

## Figures
- PNGs stored in `docs/images/`
- Always use `<figure markdown="span">` blocks with bold captions

## MicroSims
- p5.js simulations in `docs/sims/<name>/`
- Each requires: `index.md`, `main.html`, `<name>.js`
- All animations default to STOPPED; include Start/Stop + Reset buttons
- Slider labels RIGHT-ALIGNED, left of track, sliderLeftMargin ≥ 250px

## Code Blocks
- All Qiskit code: include `title=` and `linenums="1"`
- Language tags: `python`, `qiskit`, `bash`

## Chapter Rules
- Open with 2–3 sentence hook
- 2–3 worked numerical examples per chapter
- 1 Business Implication callout per major section
- At least 1 Common Misconception warning
- End with Chapter Summary (abstract admonition)
- End with References section
- Cross-references: relative paths `../chapter-name/index.md`

## Vendor Claim Labels
- Always label: DELIVERED (peer-reviewed), PROJECTED (roadmap), CONTROVERSIAL (disputed)

## Build Commands
```bash
conda activate mkdocs
mkdocs serve          # http://localhost:8000
mkdocs build --strict
mkdocs gh-deploy
```

## Content Generation Workflow
1. course-description.md
2. learning-graph (concept-list.md, CSV, JSON)
3. Chapter content (15 chapters)
4. Glossary (100+ terms, ISO 11179)
5. Quizzes (30 questions/chapter, Bloom's aligned)
6. MicroSims (8 p5.js + learning graph viewer)
7. FAQ (40+ entries)
8. References (36 sources)
9. Build + deploy
