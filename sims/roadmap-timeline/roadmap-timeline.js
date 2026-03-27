// Quantum Hardware Roadmap Timeline
// Part II, Chapter 9 — The Race to Fault-Tolerant Quantum Computing
// Canvas: 700 wide, 700 tall

const CANVAS_W = 700;
const CANVAS_H = 700;
const CTRL_H   = 120;
const DRAW_H   = CANVAS_H - CTRL_H;   // 580

// ─── Milestone data ───────────────────────────────────────────────────────────
// type: 'DELIVERED' | 'PROJECTED' | 'CONTROVERSIAL'
const MILESTONES = [
  // IBM
  { company:'IBM',         year:2021, name:'Eagle (127q)',                    type:'DELIVERED',     desc:'IBM Eagle: 127-qubit heavy-hex processor. First IBM chip to exceed 100 qubits.' },
  { company:'IBM',         year:2022, name:'Osprey (433q)',                   type:'DELIVERED',     desc:'IBM Osprey: 433-qubit processor. At the time the world\'s largest superconducting chip.' },
  { company:'IBM',         year:2023, name:'Heron 133q (high-quality)',       type:'DELIVERED',     desc:'IBM Heron: 133-qubit chip with fixed-frequency qubits and cross-resonance gates at dramatically improved error rates (~0.1% 2Q gate error).' },
  { company:'IBM',         year:2025, name:'Nighthawk (c-couplers)',          type:'DELIVERED',     desc:'IBM Nighthawk: 120-qubit chip with continuously-tunable couplers and 218 couplers, enabling denser connectivity.' },
  { company:'IBM',         year:2025, name:'Loon (qLDPC decoder)',            type:'DELIVERED',     desc:'IBM Loon: First demonstration of real-time qLDPC (Gross code) decoding hardware on a superconducting chip.' },
  { company:'IBM',         year:2026, name:'Kookaburra (modular qLDPC)',      type:'PROJECTED',     desc:'IBM Kookaburra: Modular multi-chip system targeting qLDPC logical qubits at scale. Expected 2026.' },
  { company:'IBM',         year:2027, name:'Cockatoo (24 logical qubits)',    type:'PROJECTED',     desc:'IBM Cockatoo: l-coupler architecture, targeting 24+ logical qubits using Gross [[144,12,12]] codes.' },
  { company:'IBM',         year:2029, name:'Starling (200 logical, 10⁸ ops)','type':'PROJECTED',   desc:'IBM Starling: 200 logical qubits with 10^8 gate operations capacity. Target for early fault-tolerant utility.' },
  { company:'IBM',         year:2033, name:'Blue Jay (2000 logical)',         type:'PROJECTED',     desc:'IBM Blue Jay: 2,000+ logical qubits, targeting cryptographically relevant and chemistry simulation tasks.' },

  // Google
  { company:'Google',      year:2019, name:'Sycamore (quantum supremacy)',    type:'DELIVERED',     desc:'Google Sycamore (53q): Claimed quantum computational supremacy for random circuit sampling in 200 seconds vs ~10,000 years classically (disputed).' },
  { company:'Google',      year:2024, name:'Willow (below-threshold, Λ=2.14)',type:'DELIVERED',     desc:'Google Willow: First demonstration of below-threshold quantum error correction where adding more qubits exponentially reduces error rates. Error suppression factor Λ = 2.14 per distance increase.' },
  { company:'Google',      year:2025, name:'Willow (verifiable advantage)',   type:'DELIVERED',     desc:'Google Willow: Demonstrated ~13,000× computational advantage over classical supercomputers on RCS benchmark, now widely considered verifiable quantum advantage.' },
  { company:'Google',      year:2026, name:'Dynamic surface codes',           type:'DELIVERED',     desc:'Google: First deployment of dynamic/floquet surface codes with real-time syndrome decoding. Published Nature paper confirming fault-tolerant operation.' },

  // IonQ
  { company:'IonQ',        year:2025, name:'Forte Enterprise (#AQ 36)',       type:'DELIVERED',     desc:'IonQ Forte Enterprise: Algorithmic Qubit (AQ) count of 36, equivalent to approximately 36 noiseless qubits for practical circuits.' },
  { company:'IonQ',        year:2025, name:'99.99% 2Q fidelity (smooth gates)',type:'DELIVERED',   desc:'IonQ: Demonstrated 99.99% two-qubit gate fidelity using smooth Mølmer-Sørensen gates, the best published ion trap result.' },
  { company:'IonQ',        year:2026, name:'256-qubit (Oxford Ionics 2D)',    type:'PROJECTED',     desc:'IonQ: 256-physical-qubit system using Oxford Ionics 2D ion trap technology for higher connectivity.' },
  { company:'IonQ',        year:2027, name:'10k physical, 800 logical',       type:'PROJECTED',     desc:'IonQ: 10,000 physical qubits system targeting 800 logical qubits using trapped-ion fault tolerance.' },
  { company:'IonQ',        year:2028, name:'Two-chip, 1600 logical (Lightsynq)',type:'PROJECTED',  desc:'IonQ: Two-chip architecture using Lightsynq photonic interconnect, targeting 1,600 logical qubits.' },

  // Microsoft
  { company:'Microsoft',   year:2025, name:'Majorana 1 chip',                type:'CONTROVERSIAL', desc:'Microsoft Majorana 1: Claimed first chip with topological qubits (Majorana zero modes). Independent verification of topological protection ongoing. Nature paper published Feb 2025.' },

  // D-Wave
  { company:'D-Wave',      year:2025, name:'Advantage2 (4400q, production)', type:'DELIVERED',     desc:'D-Wave Advantage2: 4,400+ qubit quantum annealer with Zephyr topology, now in full production. Note: quantum annealer — not gate-based, not universal.' },

  // Quantinuum
  { company:'Quantinuum',  year:2025, name:'Helios (99.921% 2Q fidelity)',   type:'DELIVERED',     desc:'Quantinuum Helios: H-series ion trap processor achieving 99.921% two-qubit gate fidelity, the highest published value for any qubit platform.' },

  // China
  { company:'China',       year:2025, name:'Zuchongzhi 3.2 (below threshold)',type:'DELIVERED',    desc:'USTC Zuchongzhi 3.2: Chinese superconducting chip with 105 qubits achieving below-threshold error correction and claiming quantum advantage on sampling tasks.' },
];

// ─── Companies and row assignments ───────────────────────────────────────────
const COMPANIES = ['IBM', 'Google', 'IonQ', 'Microsoft', 'D-Wave', 'Quantinuum', 'China'];
const COMPANY_COLORS = {
  IBM:          [30,  90,  200],
  Google:       [220, 60,  40 ],
  IonQ:         [30,  160, 110],
  Microsoft:    [0,   120, 212],
  'D-Wave':     [130, 50,  180],
  Quantinuum:   [200, 120, 30 ],
  China:        [180, 30,  30 ],
};

// ─── State ────────────────────────────────────────────────────────────────────
let companyVisible = {};
let showDeliveredOnly = false;
let selectedMilestone = null;
let hoverMilestone    = null;

// Timeline range
const YEAR_MIN = 2019;
const YEAR_MAX = 2034;

// Layout
const TL_LEFT   = 110;  // x of year 2019
const TL_RIGHT  = CANVAS_W - 20;
const TL_TOP    = 55;
const ROW_H     = 62;

// ─── Buttons ─────────────────────────────────────────────────────────────────
let btnDeliveredOnly;
let companyButtons = [];

// ─── Setup ───────────────────────────────────────────────────────────────────
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  textFont('sans-serif');

  for (const c of COMPANIES) companyVisible[c] = true;

  initButtons();
}

function initButtons() {
  const cy = DRAW_H + 16;

  btnDeliveredOnly = {
    x: 10, y: cy, w: 160, h: 26,
    label: 'Delivered only', active: false
  };

  // Company toggles — two rows
  const cbW = 100, cbH = 22;
  for (let i = 0; i < COMPANIES.length; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    companyButtons.push({
      x: 180 + col * (cbW + 4),
      y: cy + row * (cbH + 4),
      w: cbW, h: cbH,
      label: COMPANIES[i],
      company: COMPANIES[i],
      active: true
    });
  }
}

// ─── Coordinate helpers ───────────────────────────────────────────────────────
function yearToX(yr) {
  return TL_LEFT + ((yr - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * (TL_RIGHT - TL_LEFT);
}

function companyRow(company) {
  return COMPANIES.indexOf(company);
}

function rowToY(row) {
  return TL_TOP + row * ROW_H + ROW_H / 2;
}

// ─── Main draw ────────────────────────────────────────────────────────────────
function draw() {
  background(255);
  drawTitle();
  drawGrid();
  drawCompanyLabels();
  drawMilestones();
  drawInfoBox();
  drawControlArea();
}

function drawTitle() {
  noStroke();
  fill(30);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Quantum Hardware Roadmap — 2019 to 2033+', CANVAS_W / 2, 8);
  fill(90);
  textSize(10);
  text('Green circle = DELIVERED   Yellow diamond = PROJECTED   Red triangle = CONTROVERSIAL', CANVAS_W / 2, 28);
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
function drawGrid() {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];

  // Vertical year lines
  stroke(220);
  strokeWeight(1);
  for (const yr of years) {
    const x = yearToX(yr);
    line(x, TL_TOP - 10, x, TL_TOP + COMPANIES.length * ROW_H + 10);
  }

  // Horizontal row dividers
  stroke(235);
  strokeWeight(0.5);
  for (let r = 0; r <= COMPANIES.length; r++) {
    const y = TL_TOP + r * ROW_H;
    line(TL_LEFT - 5, y, TL_RIGHT, y);
  }

  // Year labels
  noStroke();
  fill(100);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  for (const yr of years) {
    text(yr, yearToX(yr), TL_TOP - 2);
  }

  // Today line (2026)
  stroke(200, 100, 100, 180);
  strokeWeight(1.5);
  const todayX = yearToX(2026);
  line(todayX, TL_TOP - 12, todayX, TL_TOP + COMPANIES.length * ROW_H + 6);
  noStroke();
  fill(180, 60, 60);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text('Today', todayX, TL_TOP - 14);
}

function drawCompanyLabels() {
  for (let i = 0; i < COMPANIES.length; i++) {
    const company = COMPANIES[i];
    const y       = rowToY(i);
    const c       = COMPANY_COLORS[company];
    const visible = companyVisible[company];

    noStroke();
    fill(visible ? color(c[0], c[1], c[2]) : color(180));
    textSize(11);
    textAlign(RIGHT, CENTER);
    text(company, TL_LEFT - 8, y);
  }
}

// ─── Milestones ───────────────────────────────────────────────────────────────
function drawMilestones() {
  hoverMilestone = null;
  const R = 9;  // base radius

  for (let mi = 0; mi < MILESTONES.length; mi++) {
    const m = MILESTONES[mi];
    if (!companyVisible[m.company]) continue;
    if (showDeliveredOnly && m.type !== 'DELIVERED') continue;

    const x   = yearToX(m.year + 0.25 * (mi % 3 - 1));  // slight jitter for same-year items
    const row = companyRow(m.company);
    const y   = rowToY(row);
    const c   = COMPANY_COLORS[m.company];

    const isSelected = (selectedMilestone === mi);
    const isHover    = (dist(mouseX, mouseY, x, y) < R + 4);

    if (isHover) hoverMilestone = mi;

    const alpha = isSelected ? 255 : (isHover ? 230 : 190);

    stroke(isSelected ? 30 : 100);
    strokeWeight(isSelected ? 2.5 : 1);

    if (m.type === 'DELIVERED') {
      // Green-tinted circle
      fill(min(c[0]+30,255), min(c[1]+60,255), min(c[2]+30,255), alpha);
      circle(x, y, R * 2);
    } else if (m.type === 'PROJECTED') {
      // Yellow diamond
      fill(240, 220, 50, alpha);
      drawDiamond(x, y, R + 2);
    } else {
      // Red triangle (controversial)
      fill(220, 50, 50, alpha);
      drawTriangle(x, y, R + 2);
    }

    // Name label (short) — show on hover or selected
    if (isHover || isSelected) {
      noStroke();
      fill(20);
      textSize(9);
      textAlign(CENTER, BOTTOM);
      text(m.name, x, y - R - 2);
    }
  }
}

function drawDiamond(x, y, r) {
  beginShape();
  vertex(x,     y - r);
  vertex(x + r, y    );
  vertex(x,     y + r);
  vertex(x - r, y    );
  endShape(CLOSE);
}

function drawTriangle(x, y, r) {
  beginShape();
  vertex(x,         y - r);
  vertex(x + r * 0.9, y + r * 0.6);
  vertex(x - r * 0.9, y + r * 0.6);
  endShape(CLOSE);
}

// ─── Info box (bottom of draw area) ──────────────────────────────────────────
function drawInfoBox() {
  const bx = 10, by = DRAW_H - 72, bw = CANVAS_W - 20, bh = 70;

  fill(248);
  stroke(180);
  strokeWeight(1);
  rect(bx, by, bw, bh, 5);

  const idx = selectedMilestone !== null ? selectedMilestone : hoverMilestone;

  if (idx === null) {
    noStroke();
    fill(150);
    textSize(11);
    textAlign(CENTER, CENTER);
    text('Click a milestone to see details.', bx + bw / 2, by + bh / 2);
    return;
  }

  const m   = MILESTONES[idx];
  const c   = COMPANY_COLORS[m.company];
  const typeColors = { DELIVERED: [30,160,60], PROJECTED: [160,140,0], CONTROVERSIAL: [180,30,30] };
  const tc  = typeColors[m.type];

  noStroke();
  fill(c[0], c[1], c[2]);
  textSize(12);
  textAlign(LEFT, TOP);
  text(`${m.company} — ${m.year}: ${m.name}`, bx + 8, by + 6);

  fill(tc[0], tc[1], tc[2]);
  textSize(10);
  text(`[${m.type}]`, bx + 8, by + 22);

  fill(50);
  textSize(10);
  text(m.desc, bx + 8, by + 36, bw - 16, 30);
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  fill(245);
  stroke(200);
  strokeWeight(1);
  rect(0, DRAW_H, CANVAS_W, CTRL_H);

  drawToggleBtn(btnDeliveredOnly);

  for (let i = 0; i < companyButtons.length; i++) {
    const btn = companyButtons[i];
    btn.active = companyVisible[btn.company];
    drawCompanyBtn(btn);
  }
}

function drawToggleBtn(btn) {
  stroke(130);
  strokeWeight(1.2);
  fill(btn.active ? color(180, 220, 255) : color(220));
  rect(btn.x, btn.y, btn.w, btn.h, 4);
  noStroke();
  fill(30);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function drawCompanyBtn(btn) {
  const c = COMPANY_COLORS[btn.company];
  stroke(btn.active ? color(c[0], c[1], c[2]) : color(160));
  strokeWeight(1.5);
  fill(btn.active ? color(c[0], c[1], c[2], 60) : color(230));
  rect(btn.x, btn.y, btn.w, btn.h, 4);
  noStroke();
  fill(btn.active ? color(c[0]*0.6, c[1]*0.6, c[2]*0.6) : color(130));
  textSize(10);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

// ─── Mouse ────────────────────────────────────────────────────────────────────
function mousePressed() {
  if (inBtn(btnDeliveredOnly)) {
    showDeliveredOnly = !showDeliveredOnly;
    btnDeliveredOnly.active = showDeliveredOnly;
    return;
  }

  for (const btn of companyButtons) {
    if (inBtn(btn)) {
      companyVisible[btn.company] = !companyVisible[btn.company];
      return;
    }
  }

  // Click milestones
  const R = 12;
  for (let mi = 0; mi < MILESTONES.length; mi++) {
    const m = MILESTONES[mi];
    if (!companyVisible[m.company]) continue;
    if (showDeliveredOnly && m.type !== 'DELIVERED') continue;

    const x   = yearToX(m.year + 0.25 * (mi % 3 - 1));
    const row = companyRow(m.company);
    const y   = rowToY(row);

    if (dist(mouseX, mouseY, x, y) < R) {
      selectedMilestone = (selectedMilestone === mi) ? null : mi;
      return;
    }
  }
  selectedMilestone = null;
}

function inBtn(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}
