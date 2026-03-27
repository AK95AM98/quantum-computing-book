// PQC Key Sizes — Algorithm Comparison
// Part III, Chapter 12
// Canvas: 700 wide, 580 tall

const CANVAS_W = 700;
const CANVAS_H = 580;
const CTRL_H   = 80;
const DRAW_H   = CANVAS_H - CTRL_H;   // 500

// ─── Algorithm data ───────────────────────────────────────────────────────────
const ALGORITHMS = [
  {
    name:       'RSA-2048',
    type:       'Classical',
    family:     'Integer Factoring',
    pubKey:     256,
    sig:        256,
    secLevel:   '~112-bit',
    nist:       'Legacy (deprecated)',
    useCase:    'Key exchange, digital signatures',
    color:      [100, 140, 210],
    colorLabel: 'Classical'
  },
  {
    name:       'ECDSA P-256',
    type:       'Classical',
    family:     'Elliptic Curve Discrete Log',
    pubKey:     64,
    sig:        64,
    secLevel:   '~128-bit',
    nist:       'Legacy (deprecated)',
    useCase:    'TLS, code signing, certificates',
    color:      [80, 120, 200],
    colorLabel: 'Classical'
  },
  {
    name:       'ML-KEM-768',
    type:       'PQC Lattice',
    family:     'Module Learning with Errors',
    pubKey:     1184,
    sig:        1088,   // ciphertext (KEM encapsulation)
    secLevel:   'Level 3 (~192-bit)',
    nist:       'FIPS 203 (2024)',
    useCase:    'Key encapsulation (replaces ECDH/RSA)',
    color:      [50, 170, 90],
    colorLabel: 'PQC Lattice'
  },
  {
    name:       'ML-DSA-65',
    type:       'PQC Lattice',
    family:     'Module Lattice (Dilithium)',
    pubKey:     1952,
    sig:        3293,
    secLevel:   'Level 3 (~192-bit)',
    nist:       'FIPS 204 (2024)',
    useCase:    'Digital signatures',
    color:      [30, 145, 70],
    colorLabel: 'PQC Lattice'
  },
  {
    name:       'SLH-DSA-128f',
    type:       'PQC Hash',
    family:     'Stateless Hash-Based (SPHINCS+)',
    pubKey:     32,
    sig:        17088,
    secLevel:   'Level 1 (~128-bit)',
    nist:       'FIPS 205 (2024)',
    useCase:    'Code signing, firmware',
    color:      [210, 120, 30],
    colorLabel: 'PQC Hash'
  },
  {
    name:       'FN-DSA-512',
    type:       'PQC Lattice',
    family:     'NTRU Lattice (Falcon)',
    pubKey:     897,
    sig:        666,
    secLevel:   'Level 1 (~128-bit)',
    nist:       'FIPS 206 (draft 2024)',
    useCase:    'Compact digital signatures',
    color:      [160, 80, 200],
    colorLabel: 'PQC Lattice (NTRU)'
  },
];

// ─── State ────────────────────────────────────────────────────────────────────
let viewMode   = 'key';    // 'key' or 'sig'
let logScale   = true;
let selectedAlg = null;    // index of clicked algorithm

// Buttons
let btnKey, btnSig, btnLog;

// ─── Chart layout ─────────────────────────────────────────────────────────────
const CHART_L  = 170;
const CHART_T  = 60;
const CHART_R  = CANVAS_W - 20;
const CHART_B  = DRAW_H - 50;
const CHART_W  = CHART_R - CHART_L;
const CHART_H  = CHART_B - CHART_T;
const BAR_PAD  = 12;

// ─── Setup ────────────────────────────────────────────────────────────────────
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  textFont('sans-serif');
  initButtons();
}

function initButtons() {
  const cy = DRAW_H + 18;
  btnKey = { x: 10,  y: cy, w: 110, h: 28, label: 'Key Size',              active: true  };
  btnSig = { x: 128, y: cy, w: 160, h: 28, label: 'Sig / Ciphertext Size', active: false };
  btnLog = { x: 310, y: cy, w: 120, h: 28, label: 'Log scale',             active: logScale };
}

// ─── Main draw ────────────────────────────────────────────────────────────────
function draw() {
  background(255);
  drawTitle();
  drawBars();
  drawAxes();
  drawDetailPanel();
  drawControlArea();
}

function drawTitle() {
  noStroke();
  fill(30);
  textSize(15);
  textAlign(CENTER, TOP);
  const modeStr = viewMode === 'key' ? 'Public Key Size' : 'Signature / Ciphertext Size';
  text(`PQC Algorithm Comparison — ${modeStr} (bytes)`, CANVAS_W / 2, 10);
  fill(90);
  textSize(10);
  text('Click a bar for details.  Use buttons to switch view mode and scale.', CANVAS_W / 2, 30);
}

// ─── Bars ─────────────────────────────────────────────────────────────────────
function drawBars() {
  const n      = ALGORITHMS.length;
  const slotH  = (CHART_H - BAR_PAD) / n;
  const barH   = slotH - BAR_PAD;

  const values = ALGORITHMS.map(a => viewMode === 'key' ? a.pubKey : a.sig);
  const maxV   = Math.max(...values);

  for (let i = 0; i < n; i++) {
    const alg = ALGORITHMS[i];
    const v   = values[i];
    const y   = CHART_T + i * slotH + BAR_PAD / 2;

    // Bar width
    let bw;
    if (logScale) {
      bw = (Math.log10(v) / Math.log10(maxV)) * CHART_W;
    } else {
      bw = (v / maxV) * CHART_W;
    }

    // Highlight selected
    const selected = (selectedAlg === i);
    stroke(selected ? 40 : 160);
    strokeWeight(selected ? 2.5 : 1);
    fill(alg.color[0], alg.color[1], alg.color[2], selected ? 230 : 180);
    rect(CHART_L, y, bw, barH, 3);

    // Algorithm name label (left, right-aligned to CHART_L - 4)
    noStroke();
    fill(selected ? 20 : 50);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text(alg.name, CHART_L - 6, y + barH / 2);

    // Size label inside / after bar
    fill(bw > 60 ? 255 : 40);
    textSize(10);
    textAlign(bw > 60 ? RIGHT : LEFT, CENTER);
    const xLabel = bw > 60 ? CHART_L + bw - 4 : CHART_L + bw + 4;
    fill(bw > 60 ? 20 : 40);
    text(`${v.toLocaleString()} B`, xLabel, y + barH / 2);

    // Security level tag
    noStroke();
    fill(120);
    textSize(9);
    textAlign(LEFT, CENTER);
    text(alg.secLevel, CHART_L + bw + (bw > 60 ? 4 : 60), y + barH / 2);
  }
}

// ─── Axes ─────────────────────────────────────────────────────────────────────
function drawAxes() {
  stroke(100);
  strokeWeight(1.5);
  line(CHART_L, CHART_T, CHART_L, CHART_B);
  line(CHART_L, CHART_B, CHART_R, CHART_B);

  const values = ALGORITHMS.map(a => viewMode === 'key' ? a.pubKey : a.sig);
  const maxV   = Math.max(...values);

  // X-axis ticks
  const ticks = logScale
    ? [1, 10, 32, 64, 100, 256, 1000, 5000, 17088]
    : [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 17000];

  noStroke();
  fill(80);
  textSize(9);
  textAlign(CENTER, TOP);
  for (const t of ticks) {
    if (t === 0) continue;
    let xp;
    if (logScale) {
      xp = CHART_L + (Math.log10(t) / Math.log10(maxV)) * CHART_W;
    } else {
      xp = CHART_L + (t / maxV) * CHART_W;
    }
    if (xp < CHART_L || xp > CHART_R) continue;
    stroke(200);
    strokeWeight(0.5);
    line(xp, CHART_T, xp, CHART_B);
    noStroke();
    fill(80);
    text(t >= 1000 ? `${(t/1000).toFixed(t%1000===0?0:1)}k` : t, xp, CHART_B + 4);
  }

  // X-axis title
  noStroke();
  fill(50);
  textSize(11);
  textAlign(CENTER, TOP);
  text('Size in bytes' + (logScale ? ' (log scale)' : ' (linear)'), CHART_L + CHART_W / 2, CHART_B + 20);

  // Legend
  drawLegend();
}

function drawLegend() {
  const lx = CHART_L;
  const ly = CHART_T - 30;
  const families = [
    { label: 'Classical', color: [100, 140, 210] },
    { label: 'PQC Lattice', color: [50, 170, 90] },
    { label: 'PQC Hash', color: [210, 120, 30] },
    { label: 'PQC NTRU', color: [160, 80, 200] },
  ];
  let lxCur = lx;
  for (const f of families) {
    fill(f.color[0], f.color[1], f.color[2]);
    noStroke();
    rect(lxCur, ly + 4, 14, 14, 2);
    fill(40);
    textSize(10);
    textAlign(LEFT, CENTER);
    text(f.label, lxCur + 17, ly + 11);
    lxCur += 80;
  }
}

// ─── Detail panel (right) ─────────────────────────────────────────────────────
function drawDetailPanel() {
  if (selectedAlg === null) {
    noStroke();
    fill(160);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Click a bar to see\nalgorithm details', CHART_R - 135, CHART_T + 10);
    return;
  }
  const alg = ALGORITHMS[selectedAlg];
  const px  = CHART_R - 148;
  const py  = CHART_T;

  fill(248);
  stroke(180);
  strokeWeight(1);
  rect(px, py, 145, 210, 5);

  noStroke();
  fill(alg.color[0], alg.color[1], alg.color[2]);
  textSize(12);
  textAlign(LEFT, TOP);
  text(alg.name, px + 6, py + 6);

  fill(50);
  textSize(10);
  const lines = [
    `Type: ${alg.type}`,
    `Family: ${alg.family}`,
    `Pub key: ${alg.pubKey} B`,
    `Sig/CT: ${alg.sig} B`,
    `Security: ${alg.secLevel}`,
    `NIST: ${alg.nist}`,
    `Use: ${alg.useCase}`,
  ];
  let y = py + 26;
  for (const l of lines) {
    text(l, px + 6, y);
    y += 24;
  }
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  fill(245);
  stroke(200);
  strokeWeight(1);
  rect(0, DRAW_H, CANVAS_W, CTRL_H);

  for (const btn of [btnKey, btnSig, btnLog]) {
    drawToggleBtn(btn);
  }

  noStroke();
  fill(100);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Click bar for details. Note: SLH-DSA signature (17,088 B) is ~267× larger than ECDSA.',
       10, DRAW_H + 60);
}

function drawToggleBtn(btn) {
  stroke(130);
  strokeWeight(1.2);
  fill(btn.active ? color(180, 220, 255) : color(220));
  rect(btn.x, btn.y, btn.w, btn.h, 5);
  noStroke();
  fill(30);
  textSize(11);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

// ─── Mouse ────────────────────────────────────────────────────────────────────
function mousePressed() {
  if (inBtn(btnKey)) {
    viewMode = 'key';
    btnKey.active = true; btnSig.active = false;
    selectedAlg = null;
    return;
  }
  if (inBtn(btnSig)) {
    viewMode = 'sig';
    btnSig.active = true; btnKey.active = false;
    selectedAlg = null;
    return;
  }
  if (inBtn(btnLog)) {
    logScale = !logScale;
    btnLog.active = logScale;
    return;
  }

  // Check bar clicks
  const n     = ALGORITHMS.length;
  const slotH = (CHART_H - BAR_PAD) / n;
  const values = ALGORITHMS.map(a => viewMode === 'key' ? a.pubKey : a.sig);
  const maxV   = Math.max(...values);

  for (let i = 0; i < n; i++) {
    const y  = CHART_T + i * slotH + BAR_PAD / 2;
    const barH = slotH - BAR_PAD;
    const v  = values[i];
    let bw;
    if (logScale) {
      bw = (Math.log10(v) / Math.log10(maxV)) * CHART_W;
    } else {
      bw = (v / maxV) * CHART_W;
    }
    if (mouseX >= CHART_L && mouseX <= CHART_L + bw &&
        mouseY >= y && mouseY <= y + barH) {
      selectedAlg = (selectedAlg === i) ? null : i;
      return;
    }
  }
  selectedAlg = null;
}

function inBtn(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}
