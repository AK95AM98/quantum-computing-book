// Surface Code Simulator
// Part II, Chapter 8 — Quantum Error Correction
// Canvas: 700 wide, 680 tall (580 draw + 100 control)

// ─── Layout constants ────────────────────────────────────────────────────────
const CANVAS_W = 700;
const CANVAS_H = 680;
const CTRL_H   = 100;
const DRAW_H   = CANVAS_H - CTRL_H;  // 580

// Surface code grid parameters
const GRID_N     = 5;   // 5×5 data qubits
const CELL_SIZE  = 72;  // pixels between qubit centres
const GRID_OFF_X = 80;  // left margin to first data qubit
const GRID_OFF_Y = 60;  // top  margin to first data qubit

// Visual sizes
const DATA_R  = 16;  // data qubit circle radius
const ANC_SZ  = 22;  // ancilla square half-size

// ─── State ───────────────────────────────────────────────────────────────────
// dataQubit[r][c] – state: 0=healthy, 1=X error, 2=Z error, 3=Y error
let dataQubit   = [];
// ancilla[r][c] – excited state (bool)
let ancilla     = [];   // (4×4) ancilla grid
// ancillaType[r][c] – 'X' or 'Z'
let ancillaType = [];

// Correction path (set of {r,c} data qubit coords to highlight)
let correctionPath = [];
let syndromeExtracted = false;
let showDecoding      = false;

// Flash timer for excited ancilla
let flashTimer = 0;

// Buttons (drawn manually in control area)
let btnExtract, btnDecode, btnReset;

// ─── p5 setup ────────────────────────────────────────────────────────────────
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  textFont('monospace');
  initGrid();
  defineButtons();
}

function initGrid() {
  dataQubit = [];
  ancilla   = [];
  ancillaType = [];
  correctionPath = [];
  syndromeExtracted = false;
  showDecoding      = false;

  for (let r = 0; r < GRID_N; r++) {
    dataQubit.push([]);
    for (let c = 0; c < GRID_N; c++) {
      dataQubit[r].push(0);
    }
  }

  // Build ancilla type pattern — checkerboard on (GRID_N-1) × (GRID_N-1) grid
  // Each ancilla lives between data qubits at face position (r, c)
  // meaning between data rows r and r+1, cols c and c+1.
  // Convention: (r+c) even → Z-type (blue), (r+c) odd → X-type (yellow)
  for (let r = 0; r < GRID_N - 1; r++) {
    ancilla.push([]);
    ancillaType.push([]);
    for (let c = 0; c < GRID_N - 1; c++) {
      ancilla[r].push(false);
      ancillaType[r].push((r + c) % 2 === 0 ? 'Z' : 'X');
    }
  }
}

function defineButtons() {
  // Buttons sit in the 100px control panel below the draw area
  // They are drawn in draw() and tested in mousePressed()
  btnExtract = { x: 60,  y: DRAW_H + 30, w: 160, h: 36, label: 'Extract Syndrome' };
  btnDecode  = { x: 260, y: DRAW_H + 30, w: 120, h: 36, label: 'Decode'            };
  btnReset   = { x: 420, y: DRAW_H + 30, w: 100, h: 36, label: 'Reset'             };
}

// ─── Main draw ───────────────────────────────────────────────────────────────
function draw() {
  background(255);
  flashTimer = (flashTimer + 1) % 60;

  drawTitle();
  drawAncillaQubits();
  drawDataQubits();
  if (showDecoding) drawCorrectionPath();
  drawInfoPanel();
  drawControlArea();
}

// ─── Title ───────────────────────────────────────────────────────────────────
function drawTitle() {
  fill(30);
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  text('Surface Code Simulator  (5×5 Data Qubits)', CANVAS_W / 2, 10);
  textSize(11);
  fill(90);
  text('Click a data qubit to inject / cycle errors.  Extract Syndrome → Decode → Reset', CANVAS_W / 2, 32);
}

// ─── Coordinate helpers ──────────────────────────────────────────────────────
// Pixel position of data qubit at (row, col)
function dataPos(r, c) {
  return { x: GRID_OFF_X + c * CELL_SIZE, y: GRID_OFF_Y + r * CELL_SIZE };
}

// Pixel position of ancilla at face (r, c) — between data rows r,r+1 and cols c,c+1
function ancPos(r, c) {
  return {
    x: GRID_OFF_X + c * CELL_SIZE + CELL_SIZE / 2,
    y: GRID_OFF_Y + r * CELL_SIZE + CELL_SIZE / 2
  };
}

// ─── Draw ancilla qubits ─────────────────────────────────────────────────────
function drawAncillaQubits() {
  for (let r = 0; r < GRID_N - 1; r++) {
    for (let c = 0; c < GRID_N - 1; c++) {
      const p = ancPos(r, c);
      const type = ancillaType[r][c];
      const excited = ancilla[r][c];

      // Determine fill
      let baseColor;
      if (type === 'Z') {
        baseColor = excited
          ? (flashTimer < 30 ? color(50, 80, 255) : color(120, 160, 255))
          : color(180, 200, 240);
      } else {
        baseColor = excited
          ? (flashTimer < 30 ? color(220, 200, 0) : color(255, 240, 80))
          : color(230, 220, 170);
      }

      stroke(80);
      strokeWeight(1.5);
      fill(baseColor);
      rectMode(CENTER);
      rect(p.x, p.y, ANC_SZ * 2, ANC_SZ * 2, 3);

      // Label
      noStroke();
      fill(excited ? 20 : 100);
      textSize(10);
      textAlign(CENTER, CENTER);
      text(type, p.x, p.y);
    }
  }
}

// ─── Draw data qubits ────────────────────────────────────────────────────────
function drawDataQubits() {
  for (let r = 0; r < GRID_N; r++) {
    for (let c = 0; c < GRID_N; c++) {
      const p = dataPos(r, c);
      const state = dataQubit[r][c];

      let fillColor;
      switch (state) {
        case 0: fillColor = color(200, 230, 200); break; // healthy – green-ish
        case 1: fillColor = color(240, 80,  80);  break; // X error  – red
        case 2: fillColor = color(80,  80,  240); break; // Z error  – blue
        case 3: fillColor = color(160, 60,  200); break; // Y error  – purple
      }

      stroke(60);
      strokeWeight(2);
      fill(fillColor);
      circle(p.x, p.y, DATA_R * 2);

      // Error label
      if (state > 0) {
        noStroke();
        fill(255);
        textSize(10);
        textAlign(CENTER, CENTER);
        const labels = ['', 'X', 'Z', 'Y'];
        text(labels[state], p.x, p.y);
      }

      // Qubit index (small)
      noStroke();
      fill(80);
      textSize(8);
      textAlign(CENTER, TOP);
      text(`(${r},${c})`, p.x, p.y + DATA_R + 1);
    }
  }
}

// ─── Draw correction path ────────────────────────────────────────────────────
function drawCorrectionPath() {
  for (const q of correctionPath) {
    const p = dataPos(q.r, q.c);
    stroke(0, 200, 80);
    strokeWeight(4);
    noFill();
    circle(p.x, p.y, DATA_R * 2 + 8);
    // Draw correction type label
    noStroke();
    fill(0, 160, 60);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text(q.fix, p.x, p.y - DATA_R - 2);
  }
}

// ─── Info panel (right side) ──────────────────────────────────────────────────
function drawInfoPanel() {
  const px = GRID_OFF_X + (GRID_N - 1) * CELL_SIZE + DATA_R + 20;
  const py = GRID_OFF_Y;

  fill(245);
  stroke(180);
  strokeWeight(1);
  rect(px, py, 145, 200, 6);

  noStroke();
  fill(30);
  textSize(12);
  textAlign(LEFT, TOP);
  text('Error Count', px + 8, py + 8);

  const counts = countErrors();
  const synd   = syndromeWeight();

  textSize(11);
  fill(200, 60, 60);   text(`X errors: ${counts.X}`, px + 8, py + 28);
  fill(60, 60, 200);   text(`Z errors: ${counts.Z}`, px + 8, py + 46);
  fill(140, 50, 180);  text(`Y errors: ${counts.Y}`, px + 8, py + 64);
  fill(30);            text(`Total:    ${counts.X + counts.Z + counts.Y}`, px + 8, py + 82);

  fill(30);
  textSize(12);
  text('Syndrome', px + 8, py + 106);
  textSize(11);
  text(`Weight: ${synd}`, px + 8, py + 124);
  text(`Extracted: ${syndromeExtracted ? 'yes' : 'no'}`, px + 8, py + 142);
  text(`Decoded: ${showDecoding ? 'yes' : 'no'}`,  px + 8, py + 160);

  // Legend
  const lx = px + 8;
  let ly = py + 188;
  textSize(10);
  fill(30);
  text('Legend:', lx, ly); ly += 16;
  fill(220, 200, 0); rect(lx, ly, 12, 12); fill(30); text(' X-anc', lx + 14, ly); ly += 16;
  fill(100, 130, 220); rect(lx, ly, 12, 12); fill(30); text(' Z-anc', lx + 14, ly); ly += 16;
  fill(200, 230, 200); circle(lx + 6, ly + 6, 12); fill(30); text(' healthy', lx + 14, ly); ly += 16;
  fill(240, 80, 80); circle(lx + 6, ly + 6, 12); fill(30); text(' X err', lx + 14, ly); ly += 16;
  fill(80, 80, 240); circle(lx + 6, ly + 6, 12); fill(30); text(' Z err', lx + 14, ly); ly += 16;
  fill(160, 60, 200); circle(lx + 6, ly + 6, 12); fill(30); text(' Y err', lx + 14, ly);
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  // Background
  fill(245);
  stroke(200);
  strokeWeight(1);
  rect(0, DRAW_H, CANVAS_W, CTRL_H);

  // Draw buttons
  for (const btn of [btnExtract, btnDecode, btnReset]) {
    drawButton(btn);
  }

  // Hint text
  noStroke();
  fill(100);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Click data qubit to cycle: healthy → X → Z → Y → healthy', 10, DRAW_H + 80);
}

function drawButton(btn) {
  stroke(120);
  strokeWeight(1.5);
  fill(220);
  rect(btn.x, btn.y, btn.w, btn.h, 5);
  noStroke();
  fill(30);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

// ─── Mouse interaction ────────────────────────────────────────────────────────
function mousePressed() {
  // Check buttons
  if (inButton(btnExtract)) { extractSyndrome(); return; }
  if (inButton(btnDecode))  { decodeErrors();    return; }
  if (inButton(btnReset))   { initGrid();        return; }

  // Check data qubits
  for (let r = 0; r < GRID_N; r++) {
    for (let c = 0; c < GRID_N; c++) {
      const p = dataPos(r, c);
      if (dist(mouseX, mouseY, p.x, p.y) < DATA_R + 4) {
        dataQubit[r][c] = (dataQubit[r][c] + 1) % 4;
        // After injecting, clear previous syndrome / decode results
        syndromeExtracted = false;
        showDecoding      = false;
        correctionPath    = [];
        for (let ar = 0; ar < GRID_N - 1; ar++)
          for (let ac = 0; ac < GRID_N - 1; ac++)
            ancilla[ar][ac] = false;
        return;
      }
    }
  }
}

function inButton(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

// ─── Syndrome extraction ──────────────────────────────────────────────────────
// Each Z-ancilla at face (r,c) couples to the 4 neighbouring data qubits:
// (r,c), (r,c+1), (r+1,c), (r+1,c+1).
// A Z-ancilla becomes excited if any neighbour has an X or Y error.
// An X-ancilla becomes excited if any neighbour has a Z or Y error.
function extractSyndrome() {
  for (let ar = 0; ar < GRID_N - 1; ar++) {
    for (let ac = 0; ac < GRID_N - 1; ac++) {
      const type = ancillaType[ar][ac];
      const neighbours = [[ar, ac], [ar, ac + 1], [ar + 1, ac], [ar + 1, ac + 1]];
      let excited = false;
      for (const [dr, dc] of neighbours) {
        const st = dataQubit[dr][dc];
        if (type === 'Z' && (st === 1 || st === 3)) excited = !excited; // parity
        if (type === 'X' && (st === 2 || st === 3)) excited = !excited;
      }
      ancilla[ar][ac] = excited;
    }
  }
  syndromeExtracted = true;
  showDecoding      = false;
  correctionPath    = [];
}

// ─── Minimal-weight decoder (greedy nearest-pair matching) ───────────────────
function decodeErrors() {
  if (!syndromeExtracted) { extractSyndrome(); }

  correctionPath = [];
  showDecoding   = true;

  // Collect excited Z-ancilla → suggest X corrections (flip Z error data qubits)
  // Collect excited X-ancilla → suggest Z corrections
  const excitedZ = [];
  const excitedX = [];
  for (let ar = 0; ar < GRID_N - 1; ar++) {
    for (let ac = 0; ac < GRID_N - 1; ac++) {
      if (ancilla[ar][ac]) {
        if (ancillaType[ar][ac] === 'Z') excitedZ.push({ ar, ac });
        else                             excitedX.push({ ar, ac });
      }
    }
  }

  // For each excited ancilla, pick the nearest data qubit with the corresponding
  // error and mark it for correction.  This is a simplified (non-MWPM) approach
  // but is illustrative and correct for single-error cases.
  correctionPath.push(...greedyCorrect(excitedZ, 'X', [1, 3]));
  correctionPath.push(...greedyCorrect(excitedX, 'Z', [2, 3]));
}

function greedyCorrect(excitedAnc, fixLabel, errorStates) {
  const path = [];
  const used = new Set();

  for (const { ar, ac } of excitedAnc) {
    // Find closest data qubit with an appropriate error
    let best = null, bestDist = Infinity;
    for (let r = 0; r < GRID_N; r++) {
      for (let c = 0; c < GRID_N; c++) {
        const key = `${r},${c}`;
        if (used.has(key)) continue;
        if (!errorStates.includes(dataQubit[r][c])) continue;
        const d = Math.abs(r - ar - 0.5) + Math.abs(c - ac - 0.5);
        if (d < bestDist) { bestDist = d; best = { r, c }; }
      }
    }
    if (best) {
      used.add(`${best.r},${best.c}`);
      path.push({ r: best.r, c: best.c, fix: fixLabel });
    }
  }
  return path;
}

// ─── Utility helpers ──────────────────────────────────────────────────────────
function countErrors() {
  let X = 0, Z = 0, Y = 0;
  for (let r = 0; r < GRID_N; r++)
    for (let c = 0; c < GRID_N; c++) {
      if (dataQubit[r][c] === 1) X++;
      else if (dataQubit[r][c] === 2) Z++;
      else if (dataQubit[r][c] === 3) Y++;
    }
  return { X, Z, Y };
}

function syndromeWeight() {
  let w = 0;
  for (let r = 0; r < GRID_N - 1; r++)
    for (let c = 0; c < GRID_N - 1; c++)
      if (ancilla[r][c]) w++;
  return w;
}
