# About This Book

## Title

**Quantum Computing: From Qubits to Business Value — A Technical and Strategic Guide**

## Author

**Prof. Sharat Batra**
University of Minnesota

Prof. Batra's research and teaching spans quantum computing, post-quantum cryptography, cybersecurity strategy, and technology management. This textbook grew from graduate courses in quantum information systems and emerging technology strategy taught at the University of Minnesota.

## Purpose and Audience

This book is designed for three overlapping audiences:

1. **Technical practitioners** (security engineers, software architects, data scientists) who need a rigorous but accessible grounding in quantum computing and its cryptographic implications.
2. **Business and policy professionals** (CISOs, CTOs, risk managers, regulators) who need to make decisions about quantum risk and post-quantum migration without deep mathematical prerequisites.
3. **Graduate students** in computer science, electrical engineering, information security, or business who are approaching quantum computing for the first time.

The book is structured to support multiple reading paths: Chapters 1–6 for algorithms foundations, Chapters 7–9 for hardware and error correction, and Chapters 10–16 for applications, cryptographic implications, and business strategy.

## How to Cite

### APA 7th Edition

Batra, S. (2025). *Quantum computing: From qubits to business value — A technical and strategic guide*. University of Minnesota. https://AK95AM98.github.io/quantum-computing-book/

### BibTeX

```bibtex
@book{batra2025quantum,
  author    = {Batra, Sharat},
  title     = {Quantum Computing: From Qubits to Business Value ---
               A Technical and Strategic Guide},
  year      = {2025},
  publisher = {University of Minnesota},
  url       = {https://AK95AM98.github.io/quantum-computing-book/},
  note      = {Open educational resource, CC BY 4.0}
}
```

### Chicago Author-Date

Batra, Sharat. 2025. *Quantum Computing: From Qubits to Business Value — A Technical and Strategic Guide*. University of Minnesota. https://AK95AM98.github.io/quantum-computing-book/.

## Technical Stack

This textbook is built as a fully open, browser-based interactive resource:

| Component | Technology | Version |
|-----------|------------|---------|
| Site framework | MkDocs Material | 9.7 |
| Mathematics typesetting | MathJax 3 | 3.x |
| Interactive simulations | p5.js | 1.9.0 |
| Knowledge graph | vis-network | 9.x |
| Hosting | GitHub Pages | — |
| Source format | Markdown (CommonMark) | — |

All simulations are written in vanilla p5.js with no external dependencies beyond the p5.js CDN. They run directly in the browser without any server-side computation.

## Intelligent Textbooks Framework

This book was built using the **[dmccreary/intelligent-textbooks](https://github.com/dmccreary/intelligent-textbooks)** framework — an open educational resource pattern for creating interactive, MkDocs-based STEM textbooks with:

- Chapter-level learning objectives aligned to Bloom's Taxonomy
- Interactive MicroSims (p5.js simulations) embedded in relevant chapters
- Visual learning graph showing concept dependencies
- Integrated glossary with cross-references
- AI-generated quiz questions for self-assessment

The framework is designed to be forked and adapted by educators. See the dmccreary/intelligent-textbooks repository for templates and documentation.

## Interactive Simulations (MicroSims)

This textbook includes the following interactive p5.js simulations:

| Simulation | Chapter | Description |
|------------|---------|-------------|
| Bloch Sphere Explorer | Ch. 2 | Visualise single-qubit states and gate operations |
| Quantum Circuit Builder | Ch. 3 | Step through quantum circuits gate by gate |
| Quantum Fourier Transform | Ch. 4 | Watch QFT applied to a register |
| Phase Estimation Demo | Ch. 4 | Interactive quantum phase estimation |
| Shor's Algorithm Step-Through | Ch. 5 | Animated factoring of small numbers |
| Grover Search Visualiser | Ch. 6 | Watch amplitude amplification iterations |
| QEC Overhead Calculator | Ch. 7–8 | Physical vs logical qubit scaling chart |
| Surface Code Simulator | Ch. 8 | Inject errors and extract syndromes |
| Quantum Hardware Roadmap | Ch. 9 | Interactive vendor milestone timeline |
| VQE Energy Landscape | Ch. 10 | Variational quantum eigensolver demo |
| Portfolio Optimisation | Ch. 11 | QAOA for small portfolio problems |
| Mosca Calculator | Ch. 12 | PQC migration urgency traffic light |
| PQC Key Sizes Comparison | Ch. 12 | Interactive bar chart of algorithm sizes |
| Quantum Advantage Regions | Ch. 13 | Map of problem types vs quantum benefit |
| Learning Graph | All | Concept dependency graph for the book |

## License

This textbook is published under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license.

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, including commercially

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

Full license text: https://creativecommons.org/licenses/by/4.0/

## Feedback and Corrections

This is a living textbook. The quantum computing field moves rapidly, and some content will become outdated. Corrections, suggestions, and contributions are welcome.

- **GitHub Issues**: [Open an issue](https://github.com/AK95AM98/quantum-computing-book/issues) for factual corrections, broken simulations, or unclear explanations.
- **Pull Requests**: Contributions to content, simulations, or exercises are welcome. See `CONTRIBUTING.md` in the repository.
- **Errata**: Confirmed errors are tracked in the [GitHub Issues](https://github.com/AK95AM98/quantum-computing-book/issues).

## Acknowledgements

The author thanks:
- Dan McCreary for the intelligent-textbooks framework and MicroSim patterns
- The NIST post-quantum cryptography team for their public standardisation process documentation
- IBM Quantum, Google Quantum AI, IonQ, and Quantinuum for their public technical documentation and roadmaps
- Students in CSCI 8980 Quantum Computing Systems at the University of Minnesota for feedback on early drafts

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 0.1 | 2025-01 | Initial structure, Chapters 1–6 |
| 0.5 | 2025-06 | Added Chapters 7–12, first 10 MicroSims |
| 0.9 | 2026-01 | Full 16-chapter draft, all MicroSims, learning graph |
| 1.0 | 2026-03 | First public release |
