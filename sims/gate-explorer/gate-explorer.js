// Quantum Gate Explorer
// Interactive visualization of single-qubit gates on the Bloch sphere

let canvasWidth = 800;
let drawHeight = 580;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let isAnimating = false;

// Bloch sphere display
let sphereX = 220;    // center X of the sphere panel
let sphereY = 270;    // center Y
let sphereR = 160;    // radius

// Current Bloch angles (theta, phi) — state vector
let curTheta = 0.0;   // polar [0, PI]
let curPhi   = 0.0;   // azimuthal [0, TWO_PI]

// Animation state
let animating       = false;
let animFrame       = 0;
let animTotalFrames = 30;
let startTheta, startPhi;
let targetTheta, targetPhi;

// Gate history (last 5)
let gateHistory = [];

// ---- Gate definitions ----
// Each gate: name, 2x2 complex matrix [[a,b],[c,d]]
// Matrix entries as {re, im}
function c(re, im) { return { re: re, im: im || 0 }; }

function cmul(a, b) {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}
function cadd(a, b) {
  return { re: a.re + b.re, im: a.im + b.im };
}

let gates = [
  {
    name: "X",
    symbol: "X",
    color: [220, 60, 60],
    desc: "Pauli-X (NOT): flips |0⟩↔|1⟩. Rotates 180° around X axis.",
    matrix: [[c(0), c(1)], [c(1), c(0)]],
    short: "π rotation around X axis"
  },
  {
    name: "Y",
    symbol: "Y",
    color: [60, 180, 60],
    desc: "Pauli-Y: rotates 180° around Y axis. Flips and adds phase.",
    matrix: [[c(0), c(0,-1)], [c(0,1), c(0)]],
    short: "π rotation around Y axis"
  },
  {
    name: "Z",
    symbol: "Z",
    color: [60, 80, 220],
    desc: "Pauli-Z: flips phase of |1⟩. Rotates 180° around Z axis.",
    matrix: [[c(1), c(0)], [c(0), c(-1)]],
    short: "π rotation around Z axis"
  },
  {
    name: "H",
    symbol: "H",
    color: [160, 60, 200],
    desc: "Hadamard: creates superposition from basis state. Maps Z↔X axes.",
    matrix: [[c(1/Math.SQRT2), c(1/Math.SQRT2)], [c(1/Math.SQRT2), c(-1/Math.SQRT2)]],
    short: "π rotation around (X+Z)/√2 axis"
  },
  {
    name: "S",
    symbol: "S",
    color: [200, 130, 20],
    desc: "S gate (Phase): adds π/2 phase to |1⟩. Quarter turn around Z.",
    matrix: [[c(1), c(0)], [c(0), c(0,1)]],
    short: "π/2 rotation around Z axis"
  },
  {
    name: "T",
    symbol: "T",
    color: [20, 160, 160],
    desc: "T gate (π/8): adds π/4 phase to |1⟩. Eighth turn around Z.",
    matrix: [[c(1), c(0)], [c(0), c(Math.cos(Math.PI/4), Math.sin(Math.PI/4))]],
    short: "π/4 rotation around Z axis"
  },
  {
    name: "Rx(π/4)",
    symbol: "Rx",
    color: [220, 80, 140],
    desc: "Rx(π/4): rotates π/4 radians around X axis.",
    matrix: [
      [c(Math.cos(Math.PI/8)), c(0, -Math.sin(Math.PI/8))],
      [c(0, -Math.sin(Math.PI/8)), c(Math.cos(Math.PI/8))]
    ],
    short: "π/4 rotation around X axis"
  },
  {
    name: "Ry(π/4)",
    symbol: "Ry",
    color: [120, 180, 60],
    desc: "Ry(π/4): rotates π/4 radians around Y axis.",
    matrix: [
      [c(Math.cos(Math.PI/8)), c(-Math.sin(Math.PI/8))],
      [c(Math.sin(Math.PI/8)), c(Math.cos(Math.PI/8))]
    ],
    short: "π/4 rotation around Y axis"
  }
];

let selectedGateIdx = -1;

// ---- Canvas buttons layout ----
// Gate buttons row
let gateBtnStartX = 460;
let gateBtnStartY = 30;
let gateBtnW = 74;
let gateBtnH = 36;
let gateBtnCols = 4;
let gateBtnGap = 6;

// Control row buttons
let startStopBtn = { x: 20, y: drawHeight + 30, w: 110, h: 36 };
let resetBtn     = { x: 145, y: drawHeight + 30, w: 80,  h: 36 };

// ---- Setup ----
function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');
  frameRate(60);
}

// ---- Draw loop ----
function draw() {
  background(255);

  // Drawing area background
  fill(240, 245, 255);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Update animation
  if (animating) {
    animFrame++;
    let t = animFrame / animTotalFrames;
    t = easeInOut(t);
    curTheta = lerp(startTheta, targetTheta, t);
    curPhi   = lerpAngle(startPhi, targetPhi, t);
    if (animFrame >= animTotalFrames) {
      curTheta = targetTheta;
      curPhi   = targetPhi;
      animating = false;
      animFrame = 0;
    }
  }

  drawSpherePanel();
  drawInfoPanel();
  drawGateButtons();
  drawHistoryPanel();
  drawControls();
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Lerp angles taking shortest path
function lerpAngle(a, b, t) {
  let diff = b - a;
  while (diff > Math.PI)  diff -= TWO_PI;
  while (diff < -Math.PI) diff += TWO_PI;
  return a + diff * t;
}

// ---- Sphere Panel ----
function drawSpherePanel() {
  // Panel background
  fill(255);
  stroke(180, 200, 220);
  strokeWeight(1.5);
  rect(10, 10, 430, drawHeight - 20, 8);

  // Title
  fill(30);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(15);
  textStyle(BOLD);
  text("Bloch Sphere (2D Projection)", 10 + 215, 16);
  textStyle(NORMAL);

  // Draw the sphere circle
  let cx = sphereX, cy = sphereY, r = sphereR;

  // Sphere fill gradient hint
  fill(235, 243, 255);
  stroke(120, 160, 210);
  strokeWeight(2);
  ellipse(cx, cy, r * 2, r * 2);

  // Equator ellipse (perspective)
  stroke(160, 190, 220);
  strokeWeight(1.2);
  noFill();
  ellipse(cx, cy, r * 2, r * 0.5);

  // Latitude lines
  for (let lat = 1; lat <= 3; lat++) {
    let frac = lat / 4;
    let yr = r * (1 - 2 * frac);
    let rr = r * Math.sqrt(1 - (1 - 2 * frac) * (1 - 2 * frac));
    stroke(200, 215, 235);
    strokeWeight(0.8);
    ellipse(cx, cy + yr, rr * 2, rr * 0.45);
  }

  // Longitude lines (meridians)
  for (let i = 0; i < 6; i++) {
    let angle = (i / 6) * Math.PI;
    stroke(200, 215, 235);
    strokeWeight(0.8);
    line(cx + r * Math.cos(angle), cy + r * Math.sin(angle) * 0.25,
         cx - r * Math.cos(angle), cy - r * Math.sin(angle) * 0.25);
  }

  // Axes
  // Z axis (vertical) — blue
  stroke(40, 40, 200);
  strokeWeight(2);
  line(cx, cy - r - 20, cx, cy + r + 20);
  drawSphereArrow(cx, cy - r - 20, 0, -1, color(40, 40, 200));
  fill(40, 40, 200);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text("|0⟩", cx, cy - r - 22);
  textAlign(CENTER, TOP);
  text("|1⟩", cx, cy + r + 22);

  // X axis (horizontal) — red
  stroke(200, 40, 40);
  strokeWeight(2);
  line(cx - r - 20, cy, cx + r + 20, cy);
  drawSphereArrow(cx + r + 20, cy, 1, 0, color(200, 40, 40));
  fill(200, 40, 40);
  noStroke();
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("|+⟩", cx + r + 22, cy);
  textAlign(RIGHT, CENTER);
  text("|−⟩", cx - r - 22, cy);

  // Y axis (into screen — shown as dashed diagonal hint)
  stroke(40, 160, 40);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(cx, cy, cx + r * 0.65, cy - r * 0.2);
  drawingContext.setLineDash([]);
  fill(40, 160, 40);
  noStroke();
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("|+i⟩", cx + r * 0.67 + 2, cy - r * 0.22);
  textStyle(NORMAL);

  // State vector
  let svX = cx + r * sin(curTheta) * cos(curPhi);
  let svY = cy - r * cos(curTheta);

  // Shadow / dashed projection lines
  stroke(180, 180, 180);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  // Horizontal projection
  line(cx, cy, cx + r * sin(curTheta) * cos(curPhi), cy);
  // Vertical from endpoint to projection
  line(cx + r * sin(curTheta) * cos(curPhi), cy, svX, svY);
  drawingContext.setLineDash([]);

  // State vector arrow
  stroke(220, 90, 0);
  strokeWeight(3.5);
  line(cx, cy, svX, svY);
  drawSphereArrow(svX, svY,
    svX - cx, svY - cy,
    color(220, 90, 0));

  // Tip dot
  fill(220, 90, 0);
  noStroke();
  circle(svX, svY, 10);

  // Angle arc for theta
  stroke(100, 100, 200, 150);
  strokeWeight(1.5);
  noFill();
  let arcR = r * 0.28;
  arc(cx, cy, arcR * 2, arcR * 2, -HALF_PI, -HALF_PI + curTheta);
  fill(100, 100, 200);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text("θ", cx + arcR * cos(-HALF_PI + curTheta / 2) + 4,
            cy + arcR * sin(-HALF_PI + curTheta / 2));

  // Probability bar under sphere
  let prob0 = cos(curTheta / 2) * cos(curTheta / 2);
  let prob1 = sin(curTheta / 2) * sin(curTheta / 2);
  let barX = 30, barY = drawHeight - 58, barW = 380, barH = 14;
  fill(200);
  noStroke();
  rect(barX, barY, barW, barH, 4);
  fill(40, 40, 200);
  if (prob0 > 0.001) rect(barX, barY, barW * prob0, barH, 4, 0, 0, 4);
  fill(200, 40, 40);
  if (prob1 > 0.001) rect(barX + barW * prob0, barY, barW * prob1, barH, 0, 4, 4, 0);

  fill(30);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("P(|0⟩) = " + nf(prob0, 1, 4), barX, barY + 18);
  textAlign(RIGHT, TOP);
  text("P(|1⟩) = " + nf(prob1, 1, 4), barX + barW, barY + 18);
  textStyle(NORMAL);
}

function drawSphereArrow(tx, ty, dx, dy, col) {
  let len = sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  let angle = atan2(dy, dx);
  let aSize = 9;
  fill(col);
  noStroke();
  push();
  translate(tx, ty);
  rotate(angle);
  triangle(0, 0, -aSize, -aSize / 2.5, -aSize, aSize / 2.5);
  pop();
}

// ---- Info Panel ----
function drawInfoPanel() {
  let px = 450, py = 10, pw = 340, ph = 175;

  fill(255, 255, 248);
  stroke(180, 200, 180);
  strokeWeight(1);
  rect(px, py, pw, ph, 7);

  fill(30);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Current State", px + 10, py + 8);
  textStyle(NORMAL);

  let t = curTheta, p = curPhi;
  let alpha_r = cos(t / 2);
  let beta_r  = sin(t / 2) * cos(p);
  let beta_i  = sin(t / 2) * sin(p);
  let bSign   = beta_i >= 0 ? "+" : "−";

  textSize(12);
  fill(50);

  // State equation
  text("|ψ⟩ = " + nf(alpha_r, 1, 3) + "|0⟩", px + 10, py + 28);
  text("      + (" + nf(beta_r, 1, 3) + " " + bSign + " " + nf(abs(beta_i), 1, 3) + "i)|1⟩",
       px + 10, py + 44);

  text("θ = " + nf(t, 1, 3) + " rad  (" + nf(degrees(t), 1, 1) + "°)", px + 10, py + 62);
  text("φ = " + nf(p % TWO_PI, 1, 3) + " rad  (" + nf(degrees(p % TWO_PI), 1, 1) + "°)",
       px + 10, py + 78);

  // Selected gate info
  if (selectedGateIdx >= 0) {
    let g = gates[selectedGateIdx];
    let gc = g.color;
    fill(gc[0], gc[1], gc[2]);
    textSize(13);
    textStyle(BOLD);
    text("Last gate: " + g.name, px + 10, py + 98);
    textStyle(NORMAL);
    fill(60);
    textSize(11);
    text(g.desc, px + 10, py + 115, pw - 18, 58);
  } else {
    fill(120);
    textSize(11);
    textStyle(ITALIC);
    text("Click a gate button to apply it.", px + 10, py + 100);
    textStyle(NORMAL);
  }

  // Gate matrix display
  if (selectedGateIdx >= 0) {
    drawGateMatrix(px + 10, py + 155, gates[selectedGateIdx]);
  }
}

function drawGateMatrix(mx, my, gate) {
  let panelH = 100;
  fill(248, 248, 255);
  stroke(180, 180, 220);
  strokeWeight(1);
  rect(mx - 2, my, 320, panelH, 5);

  fill(30);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Gate Matrix: " + gate.name, mx + 4, my + 6);
  textStyle(NORMAL);

  let m = gate.matrix;
  textSize(11.5);
  textAlign(CENTER, CENTER);

  // Draw 2x2 bracket style
  let bx = mx + 50, by = my + 30, cellW = 90, cellH = 22;
  // Brackets
  stroke(60);
  strokeWeight(2);
  noFill();
  // Left bracket
  line(bx - 6, by - 4, bx - 12, by - 4);
  line(bx - 12, by - 4, bx - 12, by + cellH * 2 + 4);
  line(bx - 12, by + cellH * 2 + 4, bx - 6, by + cellH * 2 + 4);
  // Right bracket
  let rx = bx + cellW * 2 + 6;
  line(rx, by - 4, rx + 6, by - 4);
  line(rx + 6, by - 4, rx + 6, by + cellH * 2 + 4);
  line(rx + 6, by + cellH * 2 + 4, rx, by + cellH * 2 + 4);

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      let entry = m[row][col];
      let cx2 = bx + col * cellW + cellW / 2;
      let cy2 = by + row * cellH + cellH / 2;
      let s = formatComplex(entry);
      fill(30);
      noStroke();
      text(s, cx2, cy2);
    }
  }
}

function formatComplex(c) {
  let r = round(c.re * 1000) / 1000;
  let i = round(c.im * 1000) / 1000;
  if (i === 0) return nf(r, 1, 3);
  if (r === 0) return nf(i, 1, 3) + "i";
  let sign = i > 0 ? "+" : "−";
  return nf(r, 1, 3) + sign + nf(abs(i), 1, 3) + "i";
}

// ---- Gate Buttons ----
function drawGateButtons() {
  let px = 450, py = 195;

  fill(30);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Apply Gate:", px, py - 2);
  textStyle(NORMAL);

  for (let i = 0; i < gates.length; i++) {
    let col = i % gateBtnCols;
    let row = floor(i / gateBtnCols);
    let bx = px + col * (gateBtnW + gateBtnGap);
    let by = py + 14 + row * (gateBtnH + gateBtnGap);
    let g = gates[i];
    let gc = color(g.color[0], g.color[1], g.color[2]);

    let hov = mouseX > bx && mouseX < bx + gateBtnW &&
              mouseY > by && mouseY < by + gateBtnH;
    let sel = i === selectedGateIdx;

    fill(sel ? lerpColor(gc, color(255), 0.1) :
         hov ? lerpColor(gc, color(255), 0.3) : lerpColor(gc, color(255), 0.5));
    stroke(g.color[0] * 0.6, g.color[1] * 0.6, g.color[2] * 0.6);
    strokeWeight(sel ? 2.5 : 1.5);
    rect(bx, by, gateBtnW, gateBtnH, 6);

    fill(sel || hov ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(g.name, bx + gateBtnW / 2, by + gateBtnH / 2);
    textStyle(NORMAL);
  }
}

// ---- History Panel ----
function drawHistoryPanel() {
  let px = 450, py = 360, pw = 340, ph = drawHeight - py - 10;

  fill(255, 252, 245);
  stroke(200, 190, 160);
  strokeWeight(1);
  rect(px, py, pw, ph, 7);

  fill(30);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Applied Gates (last 5):", px + 10, py + 8);
  textStyle(NORMAL);

  if (gateHistory.length === 0) {
    fill(140);
    textSize(12);
    textStyle(ITALIC);
    text("No gates applied yet.", px + 10, py + 32);
    textStyle(NORMAL);
  } else {
    for (let i = 0; i < gateHistory.length; i++) {
      let entry = gateHistory[i];
      let g = gates[entry.gateIdx];
      let gc = color(g.color[0], g.color[1], g.color[2]);
      let ey = py + 30 + i * 34;

      // Badge
      fill(gc);
      noStroke();
      rect(px + 10, ey, 36, 22, 4);
      fill(255);
      textSize(12);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(g.name, px + 10 + 18, ey + 11);
      textStyle(NORMAL);

      // State after
      fill(50);
      textSize(11);
      textAlign(LEFT, CENTER);
      text("θ=" + nf(entry.theta, 1, 2) + " φ=" + nf(entry.phi % TWO_PI, 1, 2),
           px + 54, ey + 11);
    }
  }
}

// ---- Control bar ----
function drawControls() {
  fill(245);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  stroke(200);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  drawCanvasButton(startStopBtn, isAnimating ? "Stop" : "Start",
    isAnimating ? color(200, 80, 80) : color(60, 160, 60));
  drawCanvasButton(resetBtn, "Reset", color(120, 120, 180));

  fill(80);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  text(isAnimating ? "Animation running..." : "Animation stopped. Apply gates above.",
       250, drawHeight + 48);
}

function drawCanvasButton(btn, label, col) {
  let hov = mouseX > btn.x && mouseX < btn.x + btn.w &&
            mouseY > btn.y && mouseY < btn.y + btn.h;
  fill(hov ? lerpColor(col, color(255), 0.2) : col);
  stroke(red(col) * 0.6, green(col) * 0.6, blue(col) * 0.6);
  strokeWeight(1.5);
  rect(btn.x, btn.y, btn.w, btn.h, 6);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  textStyle(NORMAL);
}

// ---- Apply a quantum gate to current state ----
function applyGate(gateIdx) {
  let g = gates[gateIdx];

  // Convert Bloch angles to state vector (column vector)
  // |psi> = cos(theta/2)|0> + e^{i*phi}*sin(theta/2)|1>
  let alpha = { re: cos(curTheta / 2), im: 0 };
  let beta  = { re: sin(curTheta / 2) * cos(curPhi),
                im: sin(curTheta / 2) * sin(curPhi) };

  // Apply gate matrix: [a b; c d] * [alpha; beta]
  let m = g.matrix;
  let newAlpha = cadd(cmul(m[0][0], alpha), cmul(m[0][1], beta));
  let newBeta  = cadd(cmul(m[1][0], alpha), cmul(m[1][1], beta));

  // Convert back to Bloch angles
  // |newAlpha|^2 = cos^2(theta/2), so theta = 2*acos(|newAlpha|)
  let normA = sqrt(newAlpha.re * newAlpha.re + newAlpha.im * newAlpha.im);
  normA = constrain(normA, 0, 1);
  let newTheta = 2 * acos(normA);

  // phi comes from the relative phase of newBeta / newAlpha (ignoring global phase)
  let newPhi = 0;
  if (abs(sin(newTheta / 2)) > 0.001) {
    // e^{i*phi} = (newBeta / sin(theta/2)) ... extract angle
    let sinH = sin(newTheta / 2);
    let bNorm = { re: newBeta.re / sinH, im: newBeta.im / sinH };
    newPhi = atan2(bNorm.im, bNorm.re);
    if (newPhi < 0) newPhi += TWO_PI;
  }

  // Set up animation
  startTheta = curTheta;
  startPhi   = curPhi;
  targetTheta = newTheta;
  targetPhi   = newPhi;
  animFrame   = 0;
  animating   = true;

  selectedGateIdx = gateIdx;

  // Record history
  gateHistory.push({ gateIdx: gateIdx, theta: newTheta, phi: newPhi });
  if (gateHistory.length > 5) gateHistory.shift();
}

// ---- Mouse interaction ----
function mousePressed() {
  // Start/Stop
  if (inBtn(startStopBtn)) {
    isAnimating = !isAnimating;
    return;
  }

  // Reset
  if (inBtn(resetBtn)) {
    curTheta = 0;
    curPhi   = 0;
    animating = false;
    animFrame = 0;
    gateHistory = [];
    selectedGateIdx = -1;
    isAnimating = false;
    return;
  }

  // Gate buttons
  for (let i = 0; i < gates.length; i++) {
    let col = i % gateBtnCols;
    let row = floor(i / gateBtnCols);
    let bx = 450 + col * (gateBtnW + gateBtnGap);
    let by = 209 + row * (gateBtnH + gateBtnGap);
    if (mouseX > bx && mouseX < bx + gateBtnW &&
        mouseY > by && mouseY < by + gateBtnH) {
      applyGate(i);
      return;
    }
  }
}

function inBtn(btn) {
  return mouseX > btn.x && mouseX < btn.x + btn.w &&
         mouseY > btn.y && mouseY < btn.y + btn.h;
}
