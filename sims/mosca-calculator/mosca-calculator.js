// Mosca Calculator — PQC Migration Urgency
// Part III, Chapter 12
// Canvas: 700 wide, 600 tall

const CANVAS_W = 700;
const CANVAS_H = 600;
const CTRL_H   = 100;
const DRAW_H   = CANVAS_H - CTRL_H;

// ─── State ────────────────────────────────────────────────────────────────────
let x = 20;  // data shelf-life (years)
let y = 8;   // PQC migration time (years)
let z = 10;  // estimated years to CRQC

// Slider definitions (drawn in control panel)
let sliderX, sliderY, sliderZ;
let dragging = null;

// Preset buttons
let presets = [
  { label: 'Healthcare Records', x: 50, y: 5,  z: 10 },
  { label: 'Financial Data',     x: 20, y: 7,  z: 10 },
  { label: 'Trade Secrets',      x: 30, y: 8,  z: 10 },
  { label: 'Web Session Data',   x: 1,  y: 3,  z: 10 },
];
let presetButtons = [];

// Traffic-light colours
const COL_RED    = [210, 40,  40 ];
const COL_YELLOW = [220, 185, 20 ];
const COL_GREEN  = [40,  170, 70 ];
const COL_DIM    = [160, 160, 160];

// ─── Setup ────────────────────────────────────────────────────────────────────
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  textFont('sans-serif');
  initControls();
}

function initControls() {
  const cy = DRAW_H + 14;

  // Three sliders side by side in the control area
  sliderX = { x: 270, y: cy,      w: 160, h: 18, min: 1,  max: 50, val: x, label: 'Shelf-life x (years):' };
  sliderY = { x: 270, y: cy + 28, w: 160, h: 18, min: 1,  max: 15, val: y, label: 'Migration time y (yr):' };
  sliderZ = { x: 270, y: cy + 56, w: 160, h: 18, min: 1,  max: 20, val: z, label: 'Years to CRQC z:       ' };

  // Preset buttons — row just above control area
  const pbW = 154, pbH = 28, pbY = DRAW_H - 38;
  for (let i = 0; i < presets.length; i++) {
    presetButtons.push({
      x: 10 + i * (pbW + 4),
      y: pbY,
      w: pbW, h: pbH,
      label: presets[i].label,
      preset: presets[i]
    });
  }
}

// ─── Risk assessment ──────────────────────────────────────────────────────────
function riskLevel() {
  const sum = x + y;
  if (sum > z + 3)  return 'RED';
  if (sum >= z - 3) return 'YELLOW';
  return 'GREEN';
}

// ─── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  background(248);
  drawTitle();
  drawTrafficLight();
  drawArithmeticPanel();
  drawTimeline();
  drawPresetButtons();
  drawControlArea();
}

function drawTitle() {
  noStroke();
  fill(30);
  textSize(16);
  textAlign(CENTER, TOP);
  text("Mosca's Theorem — PQC Migration Urgency Calculator", CANVAS_W / 2, 10);
  textSize(11);
  fill(90);
  text('x + y > z  →  Data is at risk from "Harvest Now, Decrypt Later" attacks', CANVAS_W / 2, 34);
}

// ─── Traffic light ────────────────────────────────────────────────────────────
function drawTrafficLight() {
  const tlX  = 90;   // centre of traffic light
  const tlY  = 240;  // centre (vertical midpoint)
  const r    = 36;
  const gap  = 20;
  const boxW = 100;
  const boxH = 3 * r * 2 + 2 * gap + 40;

  // Housing
  stroke(50);
  strokeWeight(3);
  fill(40);
  rectMode(CENTER);
  rect(tlX, tlY, boxW, boxH, 12);

  const level = riskLevel();

  // Three lights (top = red, middle = yellow, bottom = green)
  const reds    = ['RED'];
  const yellows = ['YELLOW'];
  const greens  = ['GREEN'];

  const lightY = [tlY - r - gap, tlY, tlY + r + gap];
  const baseColors = [COL_RED, COL_YELLOW, COL_GREEN];
  const levels     = ['RED', 'YELLOW', 'GREEN'];

  for (let i = 0; i < 3; i++) {
    const active = (level === levels[i]);
    const c = active ? baseColors[i] : COL_DIM;
    stroke(active ? 255 : 100);
    strokeWeight(active ? 2.5 : 1);
    fill(c[0], c[1], c[2], active ? 255 : 100);
    circle(tlX, lightY[i], r * 2);

    // Glow effect for active light
    if (active) {
      noStroke();
      fill(c[0], c[1], c[2], 40);
      circle(tlX, lightY[i], r * 2 + 28);
    }
  }
  rectMode(CORNER);

  // Status message
  const msgs = {
    RED:    ['CRITICAL', 'Begin PQC migration immediately.', 'Data is at HIGH RISK.'],
    YELLOW: ['WARNING',  'Migration should be underway.', 'You are in the risk window.'],
    GREEN:  ['SAFE',     "You have some buffer — don't delay.", 'But start planning now.']
  };
  const levelColors = { RED: color(210,40,40), YELLOW: color(180,150,0), GREEN: color(30,140,60) };
  const [heading, line1, line2] = msgs[level];

  noStroke();
  fill(levelColors[level]);
  textSize(20);
  textAlign(LEFT, TOP);
  text(heading, 160, 170);
  fill(30);
  textSize(13);
  text(line1, 160, 198);
  fill(80);
  textSize(12);
  text(line2, 160, 218);
}

// ─── Arithmetic panel ─────────────────────────────────────────────────────────
function drawArithmeticPanel() {
  const px = 155;
  const py = 248;

  noStroke();
  fill(245);
  stroke(200);
  rect(px, py, 400, 110, 6);

  noStroke();
  fill(40);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Mosca Calculation:', px + 10, py + 8);

  const sum = x + y;
  const gap = sum - z;

  fill(30);
  textSize(12);
  text(`  Shelf-life   x = ${x} years`, px + 10, py + 28);
  text(`  Migration    y = ${y} years`, px + 10, py + 44);
  text(`  x + y        = ${sum} years`, px + 10, py + 60);
  text(`  CRQC         z = ${z} years`, px + 10, py + 76);

  const gapColor = gap > 0 ? color(210, 40, 40) : color(30, 140, 60);
  fill(gapColor);
  textSize(13);
  const gapStr = gap >= 0 ? `+${gap}` : `${gap}`;
  text(`  GAP (x+y−z) = ${gapStr} years   ${gap > 0 ? '← AT RISK' : '← OK'}`, px + 10, py + 92);
}

// ─── Timeline bar ─────────────────────────────────────────────────────────────
function drawTimeline() {
  const ty  = 400;
  const tx  = 30;
  const tw  = CANVAS_W - 60;
  const th  = 30;
  const maxYears = Math.max(x + y + 5, z + 5, 25);

  // Background track
  stroke(180);
  strokeWeight(1);
  fill(230);
  rect(tx, ty, tw, th, 4);

  const scale = tw / maxYears;

  // x segment (shelf-life) — orange
  fill(220, 140, 30, 200);
  noStroke();
  rect(tx, ty, x * scale, th, 4, 0, 0, 4);

  // y segment (migration) starts at x — red-ish
  fill(200, 60, 60, 180);
  rect(tx + x * scale, ty, y * scale, th);

  // z marker (CRQC line) — purple vertical line
  stroke(130, 0, 200);
  strokeWeight(3);
  line(tx + z * scale, ty - 12, tx + z * scale, ty + th + 6);

  // Labels
  noStroke();
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  if (x * scale > 30) text('Shelf-life x', tx + x * scale / 2, ty + th / 2);
  if (y * scale > 30) text('Migration y', tx + x * scale + y * scale / 2, ty + th / 2);

  fill(130, 0, 200);
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('CRQC (z)', tx + z * scale, ty - 14);

  // X-axis ruler
  noStroke();
  fill(80);
  textSize(9);
  textAlign(CENTER, TOP);
  for (let yr = 0; yr <= maxYears; yr += 5) {
    text(yr, tx + yr * scale, ty + th + 4);
    stroke(180);
    strokeWeight(0.5);
    line(tx + yr * scale, ty + th, tx + yr * scale, ty + th + 4);
    noStroke();
  }
  fill(60);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Years from now', tx, ty + th + 16);

  // Overlap warning
  if (x + y > z) {
    fill(200, 40, 40);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    text(`OVERLAP: ${x + y - z} yrs of unprotected data exposure`, CANVAS_W / 2, ty + th + 34);
  }
}

// ─── Preset buttons ───────────────────────────────────────────────────────────
function drawPresetButtons() {
  for (const btn of presetButtons) {
    stroke(140);
    strokeWeight(1);
    fill(225, 235, 255);
    rect(btn.x, btn.y, btn.w, btn.h, 5);
    noStroke();
    fill(30);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  fill(245);
  stroke(200);
  strokeWeight(1);
  rect(0, DRAW_H, CANVAS_W, CTRL_H);

  drawSlider(sliderX, `${x} yr`);
  drawSlider(sliderY, `${y} yr`);
  drawSlider(sliderZ, `${z} yr`);
}

function drawSlider(sl, valueLabel) {
  noStroke();
  fill(60);
  textSize(11);
  textAlign(RIGHT, CENTER);
  text(sl.label, sl.x - 4, sl.y + sl.h / 2);

  stroke(160);
  strokeWeight(2);
  line(sl.x, sl.y + sl.h / 2, sl.x + sl.w, sl.y + sl.h / 2);

  const t  = (sl.val - sl.min) / (sl.max - sl.min);
  const tx = sl.x + t * sl.w;
  fill(60, 120, 220);
  noStroke();
  circle(tx, sl.y + sl.h / 2, 14);

  noStroke();
  fill(30);
  textSize(11);
  textAlign(LEFT, CENTER);
  text(valueLabel, sl.x + sl.w + 6, sl.y + sl.h / 2);
}

// ─── Mouse ────────────────────────────────────────────────────────────────────
function mousePressed() {
  // Preset buttons
  for (const btn of presetButtons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      x = btn.preset.x;
      y = btn.preset.y;
      z = btn.preset.z;
      sliderX.val = x;
      sliderY.val = y;
      sliderZ.val = z;
      return;
    }
  }
  if (onSlider(sliderX)) { dragging = 'x'; updateSlider(sliderX, 'x'); }
  else if (onSlider(sliderY)) { dragging = 'y'; updateSlider(sliderY, 'y'); }
  else if (onSlider(sliderZ)) { dragging = 'z'; updateSlider(sliderZ, 'z'); }
}

function mouseDragged() {
  if (dragging === 'x') updateSlider(sliderX, 'x');
  else if (dragging === 'y') updateSlider(sliderY, 'y');
  else if (dragging === 'z') updateSlider(sliderZ, 'z');
}

function mouseReleased() { dragging = null; }

function onSlider(sl) {
  return mouseX >= sl.x - 10 && mouseX <= sl.x + sl.w + 10 &&
         mouseY >= sl.y - 4  && mouseY <= sl.y + sl.h + 4;
}

function updateSlider(sl, name) {
  const t   = constrain((mouseX - sl.x) / sl.w, 0, 1);
  sl.val = Math.round(sl.min + t * (sl.max - sl.min));
  if (name === 'x') x = sl.val;
  if (name === 'y') y = sl.val;
  if (name === 'z') z = sl.val;
}
