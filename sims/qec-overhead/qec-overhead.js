// QEC Overhead Calculator
// Part II, Chapters 7–8 — Physical vs Logical Qubit Scaling
// Canvas: 700 wide, 650 tall

const CANVAS_W = 700;
const CANVAS_H = 650;
const CTRL_H   = 100;
const DRAW_H   = CANVAS_H - CTRL_H; // 550

// ─── Chart margins ────────────────────────────────────────────────────────────
const MARGIN_L  = 80;
const MARGIN_R  = 80;
const MARGIN_T  = 70;
const MARGIN_B  = 60;
const CHART_W   = CANVAS_W - MARGIN_L - MARGIN_R;
const CHART_H   = DRAW_H - MARGIN_T - MARGIN_B;

// ─── Code-distance range ──────────────────────────────────────────────────────
const D_VALUES = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
const D_MIN    = D_VALUES[0];
const D_MAX    = D_VALUES[D_VALUES.length - 1];

// ─── Algorithms (logical qubits required) ────────────────────────────────────
const ALGORITHMS = [
  { label: 'Shor RSA-1024',   logQubits: 2050  },
  { label: 'Shor RSA-2048',   logQubits: 4098  },
  { label: 'Grover AES-128',  logQubits: 2953  },
  { label: 'Grover AES-256',  logQubits: 6681  },
];

// ─── State ────────────────────────────────────────────────────────────────────
let selectedD      = 7;       // code distance slider value
let physErrRate    = 0.001;   // physical error rate (default 0.1%)
let showSurface    = true;
let showGross      = true;
let selectedAlgIdx = 0;
let useLogScale    = true;

// Slider handles
let sliderD, sliderP;
// Toggle / button rects
let btnSurface, btnGross, btnLinLog;
let algButtons = [];

// ─── Physical-per-logical formulas ───────────────────────────────────────────
// Surface code: 2d² physical qubits per logical qubit
function surfaceOverhead(d) { return 2 * d * d; }
// Gross [[144,12,12]]: ~24 physical per logical (constant)
function grossOverhead()    { return 24; }

// Logical error rate model (simplified)
// p_L ≈ A × (p / p_th)^((d+1)/2),  A≈0.1, p_th=0.01
function logicalErrorRate(d, p) {
  const pth = 0.01;
  const A   = 0.1;
  return A * Math.pow(p / pth, Math.floor((d + 1) / 2));
}

// ─── Setup ────────────────────────────────────────────────────────────────────
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  textFont('sans-serif');
  initControls();
}

function initControls() {
  const cy = DRAW_H + 20;

  // Sliders — control-area, drawn manually
  sliderD = { x: 270, y: cy,      w: 160, h: 18, min: 0, max: D_VALUES.length - 1,
               val: D_VALUES.indexOf(selectedD), label: 'Code distance d:' };
  sliderP = { x: 270, y: cy + 36, w: 160, h: 18, min: 0, max: 100,
               val: 10,           label: 'Phys. error rate:' };

  btnSurface = { x: 10,  y: cy,      w: 110, h: 28, label: 'Surface Code',    active: true  };
  btnGross   = { x: 10,  y: cy + 34, w: 110, h: 28, label: 'Gross [[144,12]]', active: true  };
  btnLinLog  = { x: 470, y: cy,      w: 90,  h: 28, label: 'Log scale',       active: useLogScale };

  algButtons = [];
  for (let i = 0; i < ALGORITHMS.length; i++) {
    algButtons.push({ x: 470, y: cy + 34 + i * 0, w: 0, h: 0 }); // positioned below
  }
  // Lay out algorithm selector differently — text buttons in a row
  const algW = 148, algH = 24, algX = 10, algY = cy + 68;
  for (let i = 0; i < ALGORITHMS.length; i++) {
    algButtons[i] = { x: algX + i * (algW + 4), y: algY, w: algW, h: algH,
                      label: ALGORITHMS[i].label, active: i === selectedAlgIdx };
  }
}

// ─── Main draw ────────────────────────────────────────────────────────────────
function draw() {
  background(255);
  drawChartArea();
  drawCurves();
  drawSelectedLine();
  drawAlgorithmLine();
  drawAxesLabels();
  drawInfoBox();
  drawControlArea();
}

// ─── Chart background ─────────────────────────────────────────────────────────
function drawChartArea() {
  // Title
  noStroke();
  fill(30);
  textSize(15);
  textAlign(CENTER, TOP);
  text('QEC Overhead: Physical Qubits per Logical Qubit vs Code Distance', CANVAS_W / 2, 10);

  // Chart box
  stroke(180);
  strokeWeight(1);
  fill(252);
  rect(MARGIN_L, MARGIN_T, CHART_W, CHART_H);

  // Grid lines
  stroke(225);
  strokeWeight(0.5);
  for (let i = 0; i <= 5; i++) {
    const y = MARGIN_T + (i / 5) * CHART_H;
    line(MARGIN_L, y, MARGIN_L + CHART_W, y);
  }
  for (let i = 0; i < D_VALUES.length; i++) {
    const x = dToX(D_VALUES[i]);
    line(x, MARGIN_T, x, MARGIN_T + CHART_H);
  }
}

// ─── Convert d / overhead to pixel coords ─────────────────────────────────────
function dToX(d) {
  return MARGIN_L + ((d - D_MIN) / (D_MAX - D_MIN)) * CHART_W;
}

function overheadToY(oh) {
  if (useLogScale) {
    const minOH = 1, maxOH = 900; // 2×21² = 882
    const logMin = Math.log10(minOH), logMax = Math.log10(maxOH);
    const logOH  = Math.log10(Math.max(oh, 1));
    return MARGIN_T + CHART_H - ((logOH - logMin) / (logMax - logMin)) * CHART_H;
  } else {
    const maxOH = 900;
    return MARGIN_T + CHART_H - (oh / maxOH) * CHART_H;
  }
}

// ─── Curves ───────────────────────────────────────────────────────────────────
function drawCurves() {
  // Surface code curve
  if (showSurface) {
    stroke(30, 100, 220);
    strokeWeight(2.5);
    noFill();
    beginShape();
    for (const d of D_VALUES) {
      vertex(dToX(d), overheadToY(surfaceOverhead(d)));
    }
    endShape();

    // Dots
    for (const d of D_VALUES) {
      fill(30, 100, 220);
      noStroke();
      circle(dToX(d), overheadToY(surfaceOverhead(d)), 7);
    }

    // Label at d=21
    noStroke();
    fill(30, 100, 220);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Surface 2d²', dToX(D_MAX) + 4, overheadToY(surfaceOverhead(D_MAX)));
  }

  // Gross code (flat line at 24)
  if (showGross) {
    stroke(220, 80, 30);
    strokeWeight(2.5);
    strokeDashArray([6, 4]); // not native p5 — just draw dashes manually
    noFill();
    // Draw dashed line manually
    const y24 = overheadToY(grossOverhead());
    drawDashedLine(MARGIN_L, y24, MARGIN_L + CHART_W, y24, [8, 5]);

    fill(220, 80, 30);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Gross [[144,12,12]] ≈24', MARGIN_L + 4, y24 - 8);
  }
}

// Manually draw a dashed horizontal/straight line
function drawDashedLine(x1, y1, x2, y2, dashArray) {
  const totalLen = dist(x1, y1, x2, y2);
  const angle    = Math.atan2(y2 - y1, x2 - x1);
  let drawn = 0;
  let on    = true;
  let di    = 0;
  while (drawn < totalLen) {
    const segLen = Math.min(dashArray[di % dashArray.length], totalLen - drawn);
    const sx = x1 + drawn * Math.cos(angle);
    const sy = y1 + drawn * Math.sin(angle);
    if (on) {
      line(sx, sy, sx + segLen * Math.cos(angle), sy + segLen * Math.sin(angle));
    }
    drawn += segLen;
    on = !on;
    di++;
  }
}

// ─── Vertical line for selected d ─────────────────────────────────────────────
function drawSelectedLine() {
  const x = dToX(selectedD);
  stroke(0, 160, 100);
  strokeWeight(2);
  line(x, MARGIN_T, x, MARGIN_T + CHART_H);

  // Value annotation
  const oh = surfaceOverhead(selectedD);
  const oy = overheadToY(oh);
  fill(0, 160, 100);
  noStroke();
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text(`d=${selectedD}\n2d²=${oh}`, x, oy - 6);
}

// ─── Horizontal line for algorithm requirement ────────────────────────────────
function drawAlgorithmLine() {
  const alg    = ALGORITHMS[selectedAlgIdx];
  const ohPerL = surfaceOverhead(selectedD);
  const total  = alg.logQubits * ohPerL;

  // Draw a note in the chart rather than a line (total can be very large)
  noStroke();
  fill(140, 20, 140);
  textSize(10);
  textAlign(LEFT, TOP);
  text(
    `${alg.label}: ${alg.logQubits.toLocaleString()} logical × ${ohPerL} = ${total.toLocaleString()} physical`,
    MARGIN_L + 4, MARGIN_T + 6
  );
}

// ─── Axes & labels ────────────────────────────────────────────────────────────
function drawAxesLabels() {
  noStroke();
  fill(50);
  textSize(11);

  // X-axis labels
  textAlign(CENTER, TOP);
  for (const d of D_VALUES) {
    text(d, dToX(d), MARGIN_T + CHART_H + 4);
  }
  textSize(12);
  text('Code distance d', MARGIN_L + CHART_W / 2, MARGIN_T + CHART_H + 20);

  // Y-axis labels (left)
  textAlign(RIGHT, CENTER);
  textSize(10);
  const ohTicks = useLogScale ? [1, 2, 5, 10, 20, 50, 100, 200, 500, 882]
                               : [0, 100, 200, 300, 400, 500, 600, 700, 800, 882];
  for (const oh of ohTicks) {
    text(oh, MARGIN_L - 4, overheadToY(oh));
    stroke(210);
    strokeWeight(0.5);
    line(MARGIN_L - 3, overheadToY(oh), MARGIN_L, overheadToY(oh));
    noStroke();
  }

  // Y-axis title
  push();
  translate(18, MARGIN_T + CHART_H / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(12);
  fill(50);
  noStroke();
  text('Physical qubits / logical qubit', 0, 0);
  pop();
}

// ─── Info box ─────────────────────────────────────────────────────────────────
function drawInfoBox() {
  const bx = MARGIN_L + CHART_W + 4;
  const by = MARGIN_T;
  const bw = MARGIN_R - 6;
  const bh = CHART_H;

  fill(245);
  stroke(190);
  strokeWeight(1);
  rect(bx, by, bw, bh, 4);

  const ohS = surfaceOverhead(selectedD);
  const pL  = logicalErrorRate(selectedD, physErrRate);
  const alg = ALGORITHMS[selectedAlgIdx];
  const total = alg.logQubits * ohS;
  const belowThreshold = physErrRate < 0.01;

  noStroke();
  textSize(9);
  textAlign(LEFT, TOP);

  let y = by + 6;
  fill(30); text(`d = ${selectedD}`, bx + 4, y); y += 14;
  fill(30); text(`p = ${(physErrRate * 100).toFixed(3)}%`, bx + 4, y); y += 14;
  fill(30); text(`2d² = ${ohS}`, bx + 4, y); y += 14;
  fill(30); text(`p_L ≈ ${pL.toExponential(1)}`, bx + 4, y); y += 14;
  y += 6;
  fill(80); text('Algorithm:', bx + 4, y); y += 12;
  fill(80); text(alg.label, bx + 4, y); y += 12;
  fill(80); text(`${alg.logQubits.toLocaleString()}L`, bx + 4, y); y += 12;
  y += 4;
  fill(80); text('Total phys:', bx + 4, y); y += 12;
  fill(belowThreshold ? color(0, 150, 0) : color(200, 0, 0));
  text(`${total.toLocaleString()}`, bx + 4, y); y += 14;
  fill(belowThreshold ? color(0, 150, 0) : color(200, 0, 0));
  text(belowThreshold ? 'BELOW thresh' : 'ABOVE thresh', bx + 4, y);
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  fill(245);
  stroke(200);
  strokeWeight(1);
  rect(0, DRAW_H, CANVAS_W, CTRL_H);

  // Draw toggle buttons
  for (const btn of [btnSurface, btnGross, btnLinLog]) {
    drawToggleBtn(btn);
  }

  // Algorithm buttons
  for (let i = 0; i < algButtons.length; i++) {
    algButtons[i].active = (i === selectedAlgIdx);
    drawToggleBtn(algButtons[i]);
  }

  // Draw sliders
  drawSlider(sliderD, `d = ${selectedD}`);
  const pPct = (physErrRate * 100).toFixed(3);
  drawSlider(sliderP, `p = ${pPct}%`);
}

function drawToggleBtn(btn) {
  stroke(120);
  strokeWeight(1.2);
  fill(btn.active ? color(180, 220, 255) : color(220));
  rect(btn.x, btn.y, btn.w, btn.h, 4);
  noStroke();
  fill(30);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function drawSlider(sl, valueLabel) {
  // Label
  noStroke();
  fill(60);
  textSize(11);
  textAlign(RIGHT, CENTER);
  text(sl.label, sl.x - 4, sl.y + sl.h / 2);

  // Track
  stroke(160);
  strokeWeight(2);
  line(sl.x, sl.y + sl.h / 2, sl.x + sl.w, sl.y + sl.h / 2);

  // Thumb
  const t = sl.val / sl.max;
  const tx = sl.x + t * sl.w;
  fill(60, 120, 220);
  noStroke();
  circle(tx, sl.y + sl.h / 2, 14);

  // Value label
  noStroke();
  fill(30);
  textSize(11);
  textAlign(LEFT, CENTER);
  text(valueLabel, sl.x + sl.w + 6, sl.y + sl.h / 2);
}

// ─── Mouse interaction ────────────────────────────────────────────────────────
let dragging = null;

function mousePressed() {
  // Toggle buttons
  if (inBtn(btnSurface)) { showSurface = !showSurface; btnSurface.active = showSurface; return; }
  if (inBtn(btnGross))   { showGross   = !showGross;   btnGross.active   = showGross;   return; }
  if (inBtn(btnLinLog))  { useLogScale = !useLogScale;  btnLinLog.active  = useLogScale; return; }

  for (let i = 0; i < algButtons.length; i++) {
    if (inBtn(algButtons[i])) { selectedAlgIdx = i; return; }
  }

  // Slider interaction
  if (onSlider(sliderD)) { dragging = sliderD; updateSliderD(); return; }
  if (onSlider(sliderP)) { dragging = sliderP; updateSliderP(); return; }
}

function mouseDragged() {
  if (dragging === sliderD) updateSliderD();
  if (dragging === sliderP) updateSliderP();
}

function mouseReleased() { dragging = null; }

function updateSliderD() {
  sliderD.val = constrain(Math.round(((mouseX - sliderD.x) / sliderD.w) * sliderD.max), 0, sliderD.max);
  selectedD   = D_VALUES[sliderD.val];
}

function updateSliderP() {
  sliderP.val = constrain(Math.round(((mouseX - sliderP.x) / sliderP.w) * sliderP.max), 0, sliderP.max);
  // Map 0–100 to log scale 0.0001–0.01
  const t    = sliderP.val / 100;
  physErrRate = Math.pow(10, -4 + t * 2); // 10^-4 to 10^-2
}

function inBtn(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function onSlider(sl) {
  return mouseX >= sl.x - 10 && mouseX <= sl.x + sl.w + 10 &&
         mouseY >= sl.y - 4  && mouseY <= sl.y + sl.h + 4;
}
