// Quarky - The Quantum Computing Mascot
// A friendly qubit character that demonstrates superposition, spin, and measurement
// p5.js animation for the Quantum Computing textbook
// Author: Prof. Sharat Batra, University of Minnesota

let isAnimating = false;
let state = 'superposition'; // 'superposition', 'measured0', 'measured1', 'entangled'
let measureBtn, resetBtn, startStopBtn, entangleBtn;

// Animation variables
let blochTheta = 0;       // polar angle on Bloch sphere (0=|0>, PI=|1>)
let blochPhi = 0;         // azimuthal angle
let orbitAngle = 0;
let glowPulse = 0;
let particleList = [];
let measureAnim = 0;      // 0..1 collapse animation
let isMeasuring = false;
let measuredValue = -1;
let entanglePartner = false;
let speechBubble = '';
let speechTimer = 0;
let eyeBlink = 0;
let blinkTimer = 0;

// Color palette
const C_BG       = [15, 10, 35];
const C_BODY0    = [80, 180, 255];   // |0> color — blue
const C_BODY1    = [255, 80, 180];   // |1> color — pink
const C_SUPER    = [160, 120, 255];  // superposition — purple
const C_GLOW0    = [80, 200, 255, 60];
const C_GLOW1    = [255, 80, 200, 60];
const C_ORBIT    = [100, 220, 255];

const MESSAGES = {
  superposition: ["I'm in BOTH states!", "Don't look at me!", "I'm a quantum qubit!", "Probability = magic!"],
  measured0:     ["Collapsed to |0⟩!", "Zero it is!", "You peeked! |0⟩", "Wave function: gone!"],
  measured1:     ["Collapsed to |1⟩!", "One! I'm |1⟩!", "You observed me!", "Measurement: |1⟩"],
  entangled:     ["We're entangled!", "Spooky action!", "My partner knows!", "EPR pair!"]
};

function setup() {
  let cnv = createCanvas(560, 480);
  cnv.parent('canvas-container');
  textFont('monospace');
  initParticles();
  buildButtons();
  say(MESSAGES.superposition[0]);
}

function draw() {
  background(...C_BG);

  if (isAnimating) {
    blochPhi  += 0.018;
    orbitAngle += 0.022;
    glowPulse  += 0.04;
    blinkTimer += 1;
    if (blinkTimer > 120) { eyeBlink = 1; blinkTimer = 0; }
    if (eyeBlink > 0) { eyeBlink += 0.15; if (eyeBlink > PI) eyeBlink = 0; }
    if (speechTimer > 0) speechTimer--;
    updateParticles();
    if (isMeasuring) {
      measureAnim = min(measureAnim + 0.04, 1);
      if (measureAnim >= 1) isMeasuring = false;
    }
    // Gently rotate Bloch polar angle in superposition
    if (state === 'superposition') {
      blochTheta = PI / 4 + sin(blochPhi * 0.7) * (PI / 6);
    } else if (state === 'entangled') {
      blochTheta = PI / 4 + sin(blochPhi * 1.3) * (PI / 4);
    }
  }

  drawStarfield();
  drawQuantumCircle();
  drawOrbitalRing();
  drawQuarkyBody();
  drawSpeechBubble();
  drawBlochIndicator();
  drawStateLabel();
  drawControlArea();
}

// ── Starfield ──────────────────────────────────────────────────────────────
function drawStarfield() {
  noStroke();
  randomSeed(42);
  for (let i = 0; i < 60; i++) {
    let x = random(width);
    let y = random(height - 100);
    let r = random(0.5, 2);
    let bright = 150 + 100 * sin(glowPulse * 0.5 + i);
    fill(bright, bright, bright, 180);
    ellipse(x, y, r);
  }
}

// ── Glowing quantum aura ───────────────────────────────────────────────────
function drawQuantumCircle() {
  push();
  translate(width / 2, 200);
  noFill();
  let g = 40 + 20 * sin(glowPulse);
  for (let r = 90; r >= 50; r -= 8) {
    let alpha = map(r, 50, 90, 60, 5);
    if (state === 'measured0')     stroke(80, 180, 255, alpha);
    else if (state === 'measured1') stroke(255, 80, 180, alpha);
    else if (state === 'entangled') stroke(255, 200, 80, alpha);
    else                            stroke(160, 120, 255, alpha);
    strokeWeight(6);
    ellipse(0, 0, r * 2);
  }
  pop();
}

// ── Orbital ring (Bloch equator) ───────────────────────────────────────────
function drawOrbitalRing() {
  if (state === 'measured0' || state === 'measured1') return;
  push();
  translate(width / 2, 200);
  noFill();
  strokeWeight(1.5);
  stroke(...C_ORBIT, 80);
  let rx = 72, ry = 22;
  ellipse(0, 0, rx * 2, ry * 2);
  // Orbiting electron dot
  let ex = rx * cos(orbitAngle);
  let ey = ry * sin(orbitAngle);
  let dotAlpha = map(sin(orbitAngle), -1, 1, 80, 255);
  fill(...C_ORBIT, dotAlpha);
  noStroke();
  ellipse(ex, ey, 8, 8);
  pop();
}

// ── Quarky body ───────────────────────────────────────────────────────────
function drawQuarkyBody() {
  push();
  translate(width / 2, 200);

  // Choose body color
  let bodyCol;
  if (state === 'measured0')      bodyCol = C_BODY0;
  else if (state === 'measured1') bodyCol = C_BODY1;
  else if (state === 'entangled') bodyCol = [255, 200, 60];
  else {
    // Superposition: lerp between blue and pink
    let t = 0.5 + 0.5 * sin(blochPhi * 1.3);
    bodyCol = [
      lerp(C_BODY0[0], C_BODY1[0], t),
      lerp(C_BODY0[1], C_BODY1[1], t),
      lerp(C_BODY0[2], C_BODY1[2], t)
    ];
  }

  // Wobble in superposition
  let wobbleX = (state === 'superposition' || state === 'entangled') ? 3 * sin(glowPulse * 1.1) : 0;
  let wobbleY = (state === 'superposition' || state === 'entangled') ? 2 * cos(glowPulse * 0.9) : 0;

  // Body glow layers
  for (let layer = 4; layer >= 0; layer--) {
    let alpha = map(layer, 4, 0, 8, 40);
    fill(...bodyCol, alpha);
    noStroke();
    ellipse(wobbleX, wobbleY, 80 + layer * 12, 80 + layer * 12);
  }

  // Main body
  fill(...bodyCol);
  stroke(255, 255, 255, 60);
  strokeWeight(2);
  ellipse(wobbleX, wobbleY, 78, 78);

  // Highlight
  noStroke();
  fill(255, 255, 255, 80);
  ellipse(wobbleX - 14, wobbleY - 16, 20, 14);

  // Eyes
  drawEyes(wobbleX, wobbleY, bodyCol);

  // Quantum state label on body
  fill(255, 255, 255, 200);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  let label = (state === 'measured0') ? '|0⟩' :
               (state === 'measured1') ? '|1⟩' :
               (state === 'entangled') ? '|Φ⟩' : 'α|0⟩+β|1⟩';
  text(label, wobbleX, wobbleY + 22);

  // Measurement collapse flash
  if (isMeasuring) {
    fill(255, 255, 255, (1 - measureAnim) * 180);
    ellipse(wobbleX, wobbleY, 90, 90);
  }

  pop();
}

function drawEyes(bx, by, bodyCol) {
  // Eye whites
  let eyeY = by - 8;
  let blinkH = (eyeBlink > 0) ? abs(sin(eyeBlink)) : 1;

  fill(255);
  noStroke();
  // Left eye
  ellipse(bx - 14, eyeY, 16, 14 * blinkH);
  // Right eye
  ellipse(bx + 14, eyeY, 16, 14 * blinkH);

  if (blinkH > 0.2) {
    // Pupils (track state)
    fill(20, 10, 50);
    ellipse(bx - 13, eyeY + 1, 9, 9 * blinkH);
    ellipse(bx + 15, eyeY + 1, 9, 9 * blinkH);

    // Shine dots
    fill(255);
    ellipse(bx - 11, eyeY - 1, 3, 3);
    ellipse(bx + 17, eyeY - 1, 3, 3);
  }

  // Smile / expression
  noFill();
  strokeWeight(2.5);
  if (state === 'measured0') {
    // Happy :)
    stroke(255, 255, 255, 200);
    arc(bx, by + 8, 26, 16, 0, PI);
  } else if (state === 'measured1') {
    // Excited :D
    stroke(255, 255, 255, 200);
    arc(bx, by + 7, 28, 18, 0, PI);
    fill(255, 160, 100);
    noStroke();
    ellipse(bx, by + 14, 14, 8);
  } else if (state === 'entangled') {
    // Heart mouth
    stroke(255, 120, 120, 200);
    arc(bx - 6, by + 9, 12, 10, PI, TWO_PI);
    arc(bx + 6, by + 9, 12, 10, PI, TWO_PI);
    line(bx - 12, by + 9, bx, by + 18);
    line(bx + 12, by + 9, bx, by + 18);
  } else {
    // Quizzical ~
    stroke(255, 255, 255, 200);
    beginShape();
    for (let t = -PI / 3; t <= PI / 3; t += 0.1) {
      vertex(bx + t * 15, by + 10 + 4 * sin(t * 3 + glowPulse));
    }
    endShape();
  }
}

// ── Floating quantum particles ─────────────────────────────────────────────
function initParticles() {
  particleList = [];
  for (let i = 0; i < 18; i++) {
    particleList.push({
      x: random(80, width - 80),
      y: random(40, 340),
      vx: random(-0.4, 0.4),
      vy: random(-0.6, -0.1),
      r: random(2, 5),
      alpha: random(80, 200),
      symbol: random(['ψ', 'ħ', '⟩', '⟨', 'φ', 'Ω', '0', '1'])
    });
  }
}

function updateParticles() {
  for (let p of particleList) {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.4;
    if (p.alpha <= 0 || p.y < 20) {
      p.x = random(100, width - 100);
      p.y = random(280, 360);
      p.vy = random(-0.6, -0.1);
      p.alpha = random(100, 200);
    }
    let col = (state === 'measured0') ? [80, 180, 255] :
              (state === 'measured1') ? [255, 80, 180] :
              (state === 'entangled') ? [255, 200, 60] :
              [180, 140, 255];
    fill(...col, p.alpha);
    noStroke();
    textSize(p.r * 3);
    textAlign(CENTER, CENTER);
    text(p.symbol, p.x, p.y);
  }
}

// ── Speech bubble ─────────────────────────────────────────────────────────
function drawSpeechBubble() {
  if (!speechBubble || speechTimer <= 0) return;
  push();
  let bx = width / 2 + 60, by = 120;
  let bw = max(textWidth(speechBubble) + 24, 120), bh = 36;
  fill(255, 255, 255, 230);
  stroke(160, 120, 255);
  strokeWeight(2);
  rect(bx - bw / 2, by - bh / 2, bw, bh, 10);
  // Tail
  noStroke();
  fill(255, 255, 255, 230);
  triangle(bx - 30, by + bh / 2 - 2, bx - 45, by + bh / 2 + 16, bx - 20, by + bh / 2 - 2);
  // Text
  fill(40, 20, 80);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text(speechBubble, bx, by);
  pop();
}

// ── Bloch sphere mini indicator ───────────────────────────────────────────
function drawBlochIndicator() {
  push();
  translate(width - 70, 80);
  noFill();
  stroke(100, 100, 150, 150);
  strokeWeight(1);
  ellipse(0, 0, 80, 80);
  ellipse(0, 0, 80, 26);  // equator

  // Axes
  stroke(80, 80, 120, 120);
  line(0, -44, 0, 44);
  line(-44, 0, 44, 0);

  // Labels
  fill(180, 180, 220, 160);
  noStroke();
  textSize(9);
  textAlign(CENTER);
  text('|0⟩', 0, -50);
  text('|1⟩', 0, 54);

  // State vector arrow
  let theta = blochTheta;
  let vx = 36 * sin(theta) * cos(blochPhi);
  let vy = -36 * cos(theta);
  stroke(200, 160, 255, 220);
  strokeWeight(2.5);
  line(0, 0, vx, vy);
  fill(200, 160, 255);
  noStroke();
  ellipse(vx, vy, 7, 7);

  // Label
  fill(180, 140, 255, 180);
  noStroke();
  textSize(8);
  textAlign(CENTER);
  text('Bloch', 0, 66);
  pop();
}

// ── State label ───────────────────────────────────────────────────────────
function drawStateLabel() {
  push();
  textAlign(LEFT, CENTER);
  textSize(12);
  let stateText, stateCol;
  if (state === 'superposition') {
    stateText = 'State: Superposition  α|0⟩ + β|1⟩';
    stateCol = [180, 140, 255];
  } else if (state === 'measured0') {
    stateText = 'State: Measured  |0⟩';
    stateCol = [80, 200, 255];
  } else if (state === 'measured1') {
    stateText = 'State: Measured  |1⟩';
    stateCol = [255, 100, 200];
  } else {
    stateText = 'State: Entangled  |Φ+⟩';
    stateCol = [255, 200, 60];
  }
  fill(...stateCol, 200);
  noStroke();
  text(stateText, 20, height - 90);
  pop();
}

// ── Control area ──────────────────────────────────────────────────────────
function drawControlArea() {
  // Background strip
  fill(25, 20, 50, 220);
  noStroke();
  rect(0, height - 100, width, 100);
  stroke(60, 50, 100);
  strokeWeight(1);
  line(0, height - 100, width, height - 100);
}

// ── Buttons ───────────────────────────────────────────────────────────────
function buildButtons() {
  let y = height - 55;

  startStopBtn = makeBtn('▶ Start', 20, y, 90, 34, () => {
    isAnimating = !isAnimating;
    startStopBtn.label = isAnimating ? '⏸ Stop' : '▶ Start';
    if (isAnimating && state === 'superposition') say(pick(MESSAGES.superposition));
  });

  measureBtn = makeBtn('Measure', 125, y, 90, 34, () => {
    if (state !== 'superposition' && state !== 'entangled') return;
    measuredValue = random() < 0.5 ? 0 : 1;
    state = measuredValue === 0 ? 'measured0' : 'measured1';
    blochTheta = measuredValue === 0 ? 0 : PI;
    isMeasuring = true;
    measureAnim = 0;
    say(pick(MESSAGES[state]));
    isAnimating = true;
    startStopBtn.label = '⏸ Stop';
  });

  entangleBtn = makeBtn('Entangle', 230, y, 90, 34, () => {
    state = 'entangled';
    blochTheta = PI / 4;
    say(pick(MESSAGES.entangled));
    isAnimating = true;
    startStopBtn.label = '⏸ Stop';
  });

  let resetBtn = makeBtn('Reset', 335, y, 80, 34, () => {
    state = 'superposition';
    blochTheta = PI / 4;
    blochPhi = 0;
    isAnimating = false;
    isMeasuring = false;
    measureAnim = 0;
    startStopBtn.label = '▶ Start';
    say(MESSAGES.superposition[0]);
    initParticles();
  });
}

function makeBtn(label, x, y, w, h, action) {
  let btn = { label, x, y, w, h, action, hover: false };
  return btn;
}

function drawBtn(btn) {
  let mx = mouseX, my = mouseY;
  btn.hover = mx > btn.x && mx < btn.x + btn.w && my > btn.y && my < btn.y + btn.h;
  let bg = btn.hover ? [80, 60, 160] : [45, 35, 100];
  fill(...bg, 220);
  stroke(120, 100, 220, 180);
  strokeWeight(1.5);
  rect(btn.x, btn.y, btn.w, btn.h, 8);
  fill(200, 190, 255);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function mousePressed() {
  for (let btn of [startStopBtn, measureBtn, entangleBtn]) {
    if (btn && btn.hover) btn.action();
  }
}

// Override draw to include button rendering
let _origDraw = draw;
draw = function () {
  _origDraw();
  if (startStopBtn) drawBtn(startStopBtn);
  if (measureBtn)   drawBtn(measureBtn);
  if (entangleBtn)  drawBtn(entangleBtn);
  // Reset btn drawn separately since it's not in the loop
};

// ── Helpers ───────────────────────────────────────────────────────────────
function say(msg) {
  speechBubble = msg;
  speechTimer = 200;
}

function pick(arr) {
  return arr[floor(random(arr.length))];
}
