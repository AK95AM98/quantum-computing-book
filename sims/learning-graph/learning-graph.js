// Quantum Computing Learning Graph Viewer
// Uses vis-network. Data loaded from ../../learning-graph/learning-graph.json

(function () {
  // ── Chapter color palette (15 chapters) ─────────────────────────────────
  const CHAPTER_COLORS = [
    "#e74c3c", // ch1  - Classical Bits vs Quantum Bits
    "#e67e22", // ch2  - Superposition
    "#f1c40f", // ch3  - Measurement
    "#2ecc71", // ch4  - Quantum Gates
    "#1abc9c", // ch5  - Entanglement
    "#3498db", // ch6  - Quantum Circuits
    "#9b59b6", // ch7  - Quantum Algorithms
    "#e91e63", // ch8  - Grover's Algorithm
    "#ff5722", // ch9  - Shor's Algorithm
    "#00bcd4", // ch10 - Quantum Complexity
    "#8bc34a", // ch11 - Quantum Error Correction
    "#ff9800", // ch12 - Physical Implementations
    "#607d8b", // ch13 - NISQ Devices
    "#795548", // ch14 - Quantum Machine Learning
    "#673ab7", // ch15 - Quantum Future
  ];

  const BLOOM_LEVELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

  let network = null;
  let allNodes = null;
  let allEdges = null;
  let currentChapterFilter = "all";
  let currentBloomFilter = "all";
  let currentSearch = "";

  // ── DOM setup ─────────────────────────────────────────────────────────────
  function init() {
    buildUI();
    loadData();
  }

  function buildUI() {
    const app = document.getElementById("app");
    app.innerHTML = `
      <div id="toolbar">
        <label for="chapterFilter">Chapter:</label>
        <select id="chapterFilter">
          <option value="all">All Chapters</option>
          ${Array.from({length: 15}, (_, i) =>
            `<option value="${i+1}">Chapter ${i+1}</option>`).join("")}
        </select>

        <label for="bloomFilter">Bloom's Level:</label>
        <select id="bloomFilter">
          <option value="all">All Levels</option>
          ${BLOOM_LEVELS.map(l => `<option value="${l}">${l}</option>`).join("")}
        </select>

        <label for="searchBox">Search:</label>
        <input id="searchBox" type="text" placeholder="concept name..." />

        <button id="resetBtn">Reset View</button>
      </div>
      <div id="graph-container"></div>
      <div id="info-panel">
        <p id="info-placeholder">Click a node to see concept details.</p>
        <div id="info-detail" style="display:none;"></div>
      </div>
      <div id="legend"></div>
    `;

    document.getElementById("chapterFilter").addEventListener("change", e => {
      currentChapterFilter = e.target.value;
      applyFilters();
    });
    document.getElementById("bloomFilter").addEventListener("change", e => {
      currentBloomFilter = e.target.value;
      applyFilters();
    });
    document.getElementById("searchBox").addEventListener("input", e => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
    document.getElementById("resetBtn").addEventListener("click", () => {
      if (network) network.fit({ animation: { duration: 600, easingFunction: "easeInOutQuad" } });
    });
  }

  function buildLegend(nodes) {
    // Collect chapters present in data
    const chapters = [...new Set(nodes.map(n => n.chapter))].sort((a,b)=>a-b);
    const legend = document.getElementById("legend");
    legend.innerHTML = "<strong>Chapters:</strong> " +
      chapters.map(ch => {
        const col = CHAPTER_COLORS[ch - 1] || "#999";
        return `<span class="legend-item">
          <span class="legend-swatch" style="background:${col}"></span>Ch ${ch}
        </span>`;
      }).join(" ");
  }

  // ── Data loading ──────────────────────────────────────────────────────────
  function loadData() {
    fetch("../../learning-graph/learning-graph.json")
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(data => {
        processData(data);
      })
      .catch(err => {
        document.getElementById("graph-container").innerHTML =
          `<p style="color:red;padding:20px;">Failed to load learning-graph.json: ${err.message}</p>`;
      });
  }

  function processData(data) {
    // Count dependents (how many edges point FROM this node)
    const dependentCount = {};
    data.nodes.forEach(n => { dependentCount[n.id] = 0; });
    data.edges.forEach(e => {
      if (dependentCount[e.to] !== undefined) dependentCount[e.to]++;
    });

    // Build vis DataSets
    const nodeItems = data.nodes.map(n => {
      const ch = n.chapter || 1;
      const col = CHAPTER_COLORS[ch - 1] || "#999";
      const deps = dependentCount[n.id] || 0;
      const size = 14 + deps * 3; // larger = more dependents
      return {
        id: n.id,
        label: wrapLabel(n.label, 18),
        title: buildTooltip(n),
        chapter: ch,
        bloom: n.bloom || "Remember",
        group: ch,
        color: {
          background: col,
          border: darken(col, 0.2),
          highlight: { background: lighten(col, 0.25), border: "#333" },
          hover: { background: lighten(col, 0.15), border: "#333" }
        },
        size: size,
        font: { size: 11, color: "#fff", face: "Arial" },
        shape: "dot",
        originalLabel: n.label,
        originalColor: col,
      };
    });

    const edgeItems = data.edges.map((e, i) => ({
      id: i,
      from: e.from,
      to: e.to,
      arrows: { to: { enabled: true, scaleFactor: 0.6 } },
      color: { color: "#bbb", highlight: "#555", hover: "#888" },
      width: 1,
      smooth: { type: "curvedCW", roundness: 0.15 }
    }));

    allNodes = new vis.DataSet(nodeItems);
    allEdges = new vis.DataSet(edgeItems);

    buildLegend(data.nodes);
    renderNetwork();
  }

  function wrapLabel(text, maxLen) {
    if (text.length <= maxLen) return text;
    // Break at space nearest middle
    let mid = Math.floor(text.length / 2);
    let left = text.lastIndexOf(" ", mid);
    let right = text.indexOf(" ", mid);
    let idx = (left === -1) ? right : (right === -1) ? left :
              (mid - left < right - mid) ? left : right;
    if (idx === -1) return text;
    return text.substring(0, idx) + "\n" + text.substring(idx + 1);
  }

  function buildTooltip(n) {
    const div = document.createElement("div");
    div.style.cssText = "padding:8px;max-width:220px;font-size:13px;";
    div.innerHTML = `<strong>${n.label}</strong><br/>
      Chapter: ${n.chapter}<br/>
      Bloom's: ${n.bloom || "—"}<br/>
      ID: ${n.id}`;
    return div;
  }

  // ── vis-network render ────────────────────────────────────────────────────
  function renderNetwork() {
    const container = document.getElementById("graph-container");
    const options = {
      nodes: {
        borderWidth: 1.5,
        shadow: { enabled: true, size: 6, x: 2, y: 2 }
      },
      edges: {
        selectionWidth: 2,
        shadow: false
      },
      physics: {
        solver: "forceAtlas2Based",
        forceAtlas2Based: {
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springLength: 95,
          springConstant: 0.08,
          damping: 0.4
        },
        stabilization: { iterations: 200 }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
        navigationButtons: true,
        keyboard: { enabled: true }
      },
      layout: {
        improvedLayout: true
      }
    };

    network = new vis.Network(container,
      { nodes: allNodes, edges: allEdges }, options);

    network.on("click", params => {
      if (params.nodes.length > 0) {
        showNodeInfo(params.nodes[0]);
      } else {
        hideNodeInfo();
      }
    });

    network.on("stabilizationIterationsDone", () => {
      network.setOptions({ physics: { enabled: false } });
    });
  }

  // ── Filtering ─────────────────────────────────────────────────────────────
  function applyFilters() {
    if (!allNodes) return;

    const updates = allNodes.map(n => {
      let visible = true;
      if (currentChapterFilter !== "all" && n.chapter !== parseInt(currentChapterFilter)) visible = false;
      if (currentBloomFilter !== "all" && n.bloom !== currentBloomFilter) visible = false;
      let matchSearch = false;
      if (currentSearch && n.originalLabel.toLowerCase().includes(currentSearch)) {
        matchSearch = true;
      }

      let nodeColor;
      if (!visible) {
        nodeColor = { background: "#e8e8e8", border: "#ccc",
          highlight: { background: "#e8e8e8", border: "#ccc" },
          hover: { background: "#e8e8e8", border: "#ccc" } };
      } else if (currentSearch && !matchSearch) {
        nodeColor = { background: "#e8e8e8", border: "#ccc",
          highlight: { background: "#e8e8e8", border: "#ccc" },
          hover: { background: "#e8e8e8", border: "#ccc" } };
      } else if (currentSearch && matchSearch) {
        nodeColor = { background: "#ffeb3b", border: "#f57f17",
          highlight: { background: "#fff176", border: "#f57f17" },
          hover: { background: "#fff176", border: "#f57f17" } };
      } else {
        const col = n.originalColor;
        nodeColor = { background: col, border: darken(col, 0.2),
          highlight: { background: lighten(col, 0.25), border: "#333" },
          hover: { background: lighten(col, 0.15), border: "#333" } };
      }

      return { id: n.id, color: nodeColor,
        hidden: !visible && !(currentSearch && matchSearch) };
    });

    allNodes.update(updates);
  }

  // ── Info panel ────────────────────────────────────────────────────────────
  function showNodeInfo(nodeId) {
    const node = allNodes.get(nodeId);
    if (!node) return;
    // Find prerequisites (edges TO this node)
    const prereqs = allEdges.get({
      filter: e => e.to === nodeId
    }).map(e => {
      const src = allNodes.get(e.from);
      return src ? src.originalLabel : e.from;
    });
    // Find dependents (edges FROM this node)
    const dependents = allEdges.get({
      filter: e => e.from === nodeId
    }).map(e => {
      const dst = allNodes.get(e.to);
      return dst ? dst.originalLabel : e.to;
    });

    document.getElementById("info-placeholder").style.display = "none";
    const detail = document.getElementById("info-detail");
    detail.style.display = "block";
    detail.innerHTML = `
      <h3>${node.originalLabel}</h3>
      <table>
        <tr><td><strong>Chapter</strong></td><td>${node.chapter}</td></tr>
        <tr><td><strong>Bloom's Level</strong></td><td>${node.bloom}</td></tr>
        <tr><td><strong>Node ID</strong></td><td>${nodeId}</td></tr>
        <tr><td><strong>Prerequisites</strong></td><td>${prereqs.length ? prereqs.join(", ") : "None"}</td></tr>
        <tr><td><strong>Enables</strong></td><td>${dependents.length ? dependents.join(", ") : "None"}</td></tr>
      </table>
    `;
  }

  function hideNodeInfo() {
    document.getElementById("info-placeholder").style.display = "block";
    document.getElementById("info-detail").style.display = "none";
  }

  // ── Color helpers ─────────────────────────────────────────────────────────
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return [r,g,b];
  }
  function rgbToHex(r,g,b) {
    return "#" + [r,g,b].map(v => Math.round(Math.min(255,Math.max(0,v))).toString(16).padStart(2,"0")).join("");
  }
  function darken(hex, amt) {
    const [r,g,b] = hexToRgb(hex);
    return rgbToHex(r*(1-amt), g*(1-amt), b*(1-amt));
  }
  function lighten(hex, amt) {
    const [r,g,b] = hexToRgb(hex);
    return rgbToHex(r+(255-r)*amt, g+(255-g)*amt, b+(255-b)*amt);
  }

  // ── Boot ──────────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);
})();
