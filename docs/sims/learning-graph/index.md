# Learning Graph Viewer

## Interactive Graph

<iframe src="main.html" width="100%" height="700"
  style="border:none; display:block;"></iframe>

---

## What Is a Learning Graph?

A **learning graph** (also called a concept dependency graph or knowledge graph) is a directed graph where:

- Each **node** represents a concept or skill from the textbook.
- Each **directed edge** points from a concept to a prerequisite it depends on.
- The graph encodes the learning order: you must understand a concept's prerequisites before you can meaningfully learn that concept.

This viewer displays all 150 concepts from the textbook, organized across 15 chapters.

---

## How to Use the Viewer

### Navigation

| Action | Result |
|---|---|
| **Scroll / pinch** | Zoom in and out |
| **Click and drag** (background) | Pan the graph |
| **Click a node** | See concept details in the sidebar |
| **Hover a node** | See a tooltip with concept name and chapter |
| **Reset View button** | Fit the entire graph back into view |

### Filtering

- **Chapter dropdown** — Show only concepts from a selected chapter. All other nodes are hidden.
- **Bloom's Level dropdown** — Filter to concepts at a specific cognitive level (Remember, Understand, Apply, Analyze, Evaluate, Create).
- **Search box** — Type any part of a concept name to highlight matching nodes in yellow. All other nodes fade to grey.

Filters can be combined: for example, select *Chapter 4* and *Apply* to see all application-level concepts in the Quantum Gates chapter.

### Node Appearance

| Visual property | Meaning |
|---|---|
| **Color** | Chapter (see legend) |
| **Size** | Number of concepts that depend on this one (larger = more important prerequisite) |
| **Arrows** | Point from dependent concept to prerequisite |

### Sidebar Details

Clicking any node opens a panel showing:
- Concept name and chapter
- Bloom's taxonomy level
- List of **prerequisites** (concepts you need first)
- List of **enables** (concepts that build on this one)

---

## Learning Path Suggestions

The graph structure reveals several key **gateway concepts** — nodes with many dependents that appear early in the book:

1. **Qubit** (Ch. 2) — foundational for nearly every subsequent chapter
2. **Quantum superposition** (Ch. 2) — prerequisite for interference, measurement, and algorithms
3. **Quantum gate** (Ch. 4) — required for circuits, algorithms, and error correction
4. **Entanglement** (Ch. 5) — essential for teleportation, QKD, and multi-qubit algorithms
5. **Quantum circuit model** (Ch. 6) — the language of algorithm design

Use the graph to plan a study path by tracing prerequisite chains from advanced concepts back to foundational ones.
