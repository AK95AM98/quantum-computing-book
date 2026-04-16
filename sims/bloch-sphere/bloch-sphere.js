// Bloch Sphere Visualizer
// Interactive 3D Bloch sphere using p5.js orthographic projection

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;

// State
let theta = 0;        // polar angle [0, PI]
let phi = 0;          // azimuthal angle [0, TWO_PI]
let viewAngle = 0;    // slowly rotating view angle
let isAnimating = false;

// Canvas-native slider values (scaled x100 for integer precision)
let thetaVal = 0;        // 0–314  (PI * 100)
let phiVal   = 0;        // 0–628  (TWO_PI * 100)
let activeSlider = null; // 'theta' | 'phi' | null

// Slider layout
let sliderLeftMargin = 260;
let trackX      = sliderLeftMargin + 10; // 270
let trackW      = 470;
let thetaTrackY = drawHeight + 55;       // row 1 of control area
let phiTrackY   = drawHeight + 110;      // row 2 of control area
let trackHitH   = 14;                    // vertical hit-area half-height

// Sphere drawing params
let cx, cy;
let radius = 170;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');
  cx = canvasWidth / 2;
  cy = drawHeight / 2;
}

function draw() {
  // Drawing area
  background(255);
  fill(230, 240, 255);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(30);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text("Bloch Sphere Visualizer", canvasWidth / 2, 10);

  if (isAnimating) {
    viewAngle += 0.008;
    if (viewAngle > TWO_PI) viewAngle -= TWO_PI;
  }

  theta = thetaVal / 100.0;
  phi   = phiVal   / 100.0 + viewAngle;

  drawBlochSphere();
  drawStateVector();
  drawStateInfo();
  drawControls();
}

// ---- Projection helpers ----
function project3D(x3d, y3d, z3d) {
  let tilt = 0.4;
  let xr  = x3d * cos(viewAngle) - y3d * sin(viewAngle);
  let yr  = x3d * sin(viewAngle) + y3d * cos(viewAngle);
  let zr  = z3d;
  let yr2 = yr * cos(tilt) - zr * sin(tilt);
  let zr2 = yr * sin(tilt) + zr * cos(tilt);
  return { x: cx + xr * radius, y: cy - yr2 * radius, depth: zr2 };
}

function blochToCart(t, p) {
  return { x: sin(t) * cos(p), y: sin(t) * sin(p), z: cos(t) };
}

// ---- Sphere wireframe ----
function drawBlochSphere() {
  let numLat = 8, numLon = 12, segments = 60;

  for (let i = 0; i < numLon; i++) {
    let p = (i / numLon) * TWO_PI;
    let pts = [];
    for (let j = 0; j <= segments; j++) {
      let cart = blochToCart((j / segments) * PI, p);
      pts.push(project3D(cart.x, cart.y, cart.z));
    }
    stroke(180, 200, 220); strokeWeight(0.7); noFill();
    beginShape();
    for (let pt of pts) vertex(pt.x, pt.y);
    endShape();
  }

  for (let i = 1; i < numLat; i++) {
    let t = (i / numLat) * PI;
    let pts = [];
    for (let j = 0; j <= segments; j++) {
      let cart = blochToCart(t, (j / segments) * TWO_PI);
      pts.push(project3D(cart.x, cart.y, cart.z));
    }
    stroke(180, 200, 220); strokeWeight(0.7); noFill();
    beginShape();
    for (let pt of pts) vertex(pt.x, pt.y);
    endShape();
  }

  // Equator
  let eqPts = [];
  for (let j = 0; j <= segments; j++) {
    let cart = blochToCart(PI / 2, (j / segments) * TWO_PI);
    eqPts.push(project3D(cart.x, cart.y, cart.z));
  }
  stroke(120, 160, 200); strokeWeight(1.5); noFill();
  beginShape();
  for (let pt of eqPts) vertex(pt.x, pt.y);
  endShape();

  // Silhouette
  stroke(80, 120, 180); strokeWeight(2); noFill();
  ellipse(cx, cy, radius * 2, radius * 2);

  drawAxes();
}

function drawAxes() {
  let axisLen = 1.25;

  let zTop = project3D(0, 0, axisLen), zBot = project3D(0, 0, -axisLen);
  stroke(40, 40, 200); strokeWeight(2);
  line(zBot.x, zBot.y, zTop.x, zTop.y);
  drawArrowHead(zBot.x, zBot.y, zTop.x, zTop.y, color(40, 40, 200));
  fill(40, 40, 200); noStroke(); textSize(14); textStyle(BOLD);
  textAlign(CENTER, BOTTOM); text("|0⟩", zTop.x, zTop.y - 6);
  textAlign(CENTER, TOP);    text("|1⟩", zBot.x, zBot.y + 6);

  let xPos = project3D(axisLen, 0, 0), xNeg = project3D(-axisLen, 0, 0);
  stroke(200, 40, 40); strokeWeight(2);
  line(xNeg.x, xNeg.y, xPos.x, xPos.y);
  drawArrowHead(xNeg.x, xNeg.y, xPos.x, xPos.y, color(200, 40, 40));
  fill(200, 40, 40); noStroke(); textSize(13);
  textAlign(LEFT, CENTER);  text("|+⟩",  xPos.x + 4, xPos.y);
  textAlign(RIGHT, CENTER); text("|−⟩",  xNeg.x - 4, xNeg.y);

  let yPos = project3D(0, axisLen, 0), yNeg = project3D(0, -axisLen, 0);
  stroke(40, 160, 40); strokeWeight(2);
  line(yNeg.x, yNeg.y, yPos.x, yPos.y);
  drawArrowHead(yNeg.x, yNeg.y, yPos.x, yPos.y, color(40, 160, 40));
  fill(40, 160, 40); noStroke(); textSize(13);
  textAlign(LEFT, CENTER);  text("|+i⟩", yPos.x + 4, yPos.y);
  textAlign(RIGHT, CENTER); text("|−i⟩", yNeg.x - 4, yNeg.y);

  textStyle(NORMAL);
}

function drawArrowHead(x1, y1, x2, y2, col) {
  let angle = atan2(y2 - y1, x2 - x1), aSize = 8;
  fill(col); noStroke();
  push(); translate(x2, y2); rotate(angle);
  triangle(0, 0, -aSize, -aSize / 2.5, -aSize, aSize / 2.5);
  pop();
}

// ---- State vector ----
function drawStateVector() {
  let t = thetaVal / 100.0;
  let p = phiVal   / 100.0 + viewAngle;
  let cart = blochToCart(t, p);
  let pt   = project3D(cart.x, cart.y, cart.z);
  let eqPt = project3D(cart.x, cart.y, 0);

  stroke(180, 180, 180); strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(cx, cy, eqPt.x, eqPt.y);
  line(eqPt.x, eqPt.y, pt.x, pt.y);
  drawingContext.setLineDash([]);

  stroke(220, 100, 0); strokeWeight(3.5);
  line(cx, cy, pt.x, pt.y);
  drawArrowHead(cx, cy, pt.x, pt.y, color(220, 100, 0));

  fill(220, 100, 0); noStroke();
  circle(pt.x, pt.y, 10);
}

// ---- State information panel ----
function drawStateInfo() {
  let t = thetaVal / 100.0;
  let p = phiVal   / 100.0;

  let alpha_r = cos(t / 2);
  let beta_r  = sin(t / 2) * cos(p);
  let beta_i  = sin(t / 2) * sin(p);
  let prob0   = alpha_r * alpha_r;
  let prob1   = 1 - prob0;

  fill(255, 255, 240); stroke(180); strokeWeight(1);
  rect(10, drawHeight - 140, 220, 135, 6);

  fill(30); noStroke(); textSize(12); textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Quantum State", 18, drawHeight - 136);
  textStyle(NORMAL);

  let beta_sign = beta_i >= 0 ? "+" : "−";
  textSize(11);
  text("|ψ⟩ = " + nf(alpha_r, 1, 3) + "|0⟩ + (" + nf(beta_r, 1, 3), 18, drawHeight - 118);
  text("       " + beta_sign + nf(abs(beta_i), 1, 3) + "i)|1⟩",       18, drawHeight - 104);
  text("θ = " + nf(t, 1, 3) + " rad  (" + nf(degrees(t), 1, 1) + "°)", 18, drawHeight - 88);
  text("φ = " + nf(p, 1, 3) + " rad  (" + nf(degrees(p), 1, 1) + "°)", 18, drawHeight - 74);

  fill(40, 40, 200);  text("P(|0⟩) = " + nf(prob0, 1, 4), 18, drawHeight - 58);
  fill(200, 40, 40);  text("P(|1⟩) = " + nf(prob1, 1, 4), 18, drawHeight - 44);

  let barX = 18, barY = drawHeight - 32, barW = 200, barH = 12;
  fill(200); noStroke(); rect(barX, barY, barW, barH, 3);
  fill(40, 40, 200);  rect(barX,              barY, barW * prob0, barH, 3, 0, 0, 3);
  fill(200, 40, 40);  rect(barX + barW*prob0, barY, barW * prob1, barH, 0, 3, 3, 0);
}

// ---- Canvas slider ----
function drawCanvasSlider(x, y, w, val, maxVal, label) {
  let pct    = val / maxVal;
  let thumbX = x + pct * w;
  let trackH = 5;
  let thumbR = 8;
  let active = activeSlider === label;
  let hov    = dist(mouseX, mouseY, thumbX, y) < thumbR + 6;

  // Track background
  fill(200); noStroke();
  rect(x, y - trackH / 2, w, trackH, 3);

  // Track fill
  fill(80, 120, 200);
  rect(x, y - trackH / 2, pct * w, trackH, 3, 0, 0, 3);

  // Thumb
  fill(active || hov ? color(40, 80, 180) : color(80, 120, 200));
  stroke(255); strokeWeight(2);
  circle(thumbX, y, thumbR * 2);

  // Label — right-aligned, left of track
  fill(50); noStroke();
  textSize(13); textStyle(NORMAL); textAlign(RIGHT, CENTER);
  text(label + ":", x - 8, y);

  // Value readout — right of track
  fill(80); textAlign(LEFT, CENTER); textSize(12);
  text(nf(val / 100.0, 1, 2) + " rad", x + w + 10, y);
}

// ---- Preset buttons ----
let presets = [
  { label: "|0⟩",  theta: 0,    phi: 0 },
  { label: "|1⟩",  theta: 314,  phi: 0 },
  { label: "|+⟩",  theta: 157,  phi: 0 },
  { label: "|−⟩",  theta: 157,  phi: 314 },
  { label: "|+i⟩", theta: 157,  phi: 157 },
];

let presetBtnX = 245, presetBtnY = drawHeight + 148;
let presetBtnW = 54,  presetBtnH = 28, presetBtnGap = 8;

function drawPresetButtons() {
  fill(30); noStroke(); textSize(12); textStyle(NORMAL);
  textAlign(LEFT, BOTTOM);
  text("Presets:", presetBtnX, presetBtnY - 4);

  for (let i = 0; i < presets.length; i++) {
    let bx = presetBtnX + i * (presetBtnW + presetBtnGap);
    let by = presetBtnY;
    let hov = mouseX > bx && mouseX < bx + presetBtnW &&
              mouseY > by && mouseY < by + presetBtnH;
    fill(hov ? color(80, 130, 200) : color(100, 150, 220));
    stroke(60, 100, 180); strokeWeight(1);
    rect(bx, by, presetBtnW, presetBtnH, 5);
    fill(255); noStroke();
    textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
    text(presets[i].label, bx + presetBtnW / 2, by + presetBtnH / 2);
    textStyle(NORMAL);
  }
}

// ---- Control area ----
let startStopBtn = { x: 20,  y: drawHeight + 145, w: 110, h: 36 };
let resetBtn     = { x: 145, y: drawHeight + 145, w: 80,  h: 36 };

function drawControls() {
  // Background + separator
  fill(245); noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(200); strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Canvas sliders — fully inside control region
  drawCanvasSlider(trackX, thetaTrackY, trackW, thetaVal, 314, "θ (polar)");
  drawCanvasSlider(trackX, phiTrackY,   trackW, phiVal,   628, "φ (azimuthal)");

  // Buttons
  drawCanvasButton(startStopBtn, isAnimating ? "Stop" : "Start",
    isAnimating ? color(200, 80, 80) : color(60, 160, 60));
  drawCanvasButton(resetBtn, "Reset", color(120, 120, 180));

  // Preset buttons (in drawing area)
  drawPresetButtons();
}

function drawCanvasButton(btn, label, col) {
  let hov = mouseX > btn.x && mouseX < btn.x + btn.w &&
            mouseY > btn.y && mouseY < btn.y + btn.h;
  fill(hov ? lerpColor(col, color(255), 0.2) : col);
  stroke(red(col) * 0.6, green(col) * 0.6, blue(col) * 0.6);
  strokeWeight(1.5);
  rect(btn.x, btn.y, btn.w, btn.h, 6);
  fill(255); noStroke();
  textAlign(CENTER, CENTER); textSize(14); textStyle(BOLD);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  textStyle(NORMAL);
}

// ---- Mouse interaction ----
function sliderHit(y) {
  return mouseX >= trackX - 10 && mouseX <= trackX + trackW + 10 &&
         mouseY >= y - trackHitH && mouseY <= y + trackHitH;
}

function sliderValFromMouse(maxVal) {
  return constrain(round(map(mouseX, trackX, trackX + trackW, 0, maxVal)), 0, maxVal);
}

function mousePressed() {
  // Sliders (check first so dragging doesn't trigger buttons)
  if (sliderHit(thetaTrackY)) {
    activeSlider = 'theta';
    thetaVal = sliderValFromMouse(314);
    return;
  }
  if (sliderHit(phiTrackY)) {
    activeSlider = 'phi';
    phiVal = sliderValFromMouse(628);
    return;
  }

  // Start/Stop
  if (mouseX > startStopBtn.x && mouseX < startStopBtn.x + startStopBtn.w &&
      mouseY > startStopBtn.y && mouseY < startStopBtn.y + startStopBtn.h) {
    isAnimating = !isAnimating;
    return;
  }

  // Reset
  if (mouseX > resetBtn.x && mouseX < resetBtn.x + resetBtn.w &&
      mouseY > resetBtn.y && mouseY < resetBtn.y + resetBtn.h) {
    thetaVal = 0; phiVal = 0; viewAngle = 0; isAnimating = false;
    return;
  }

  // Presets
  for (let i = 0; i < presets.length; i++) {
    let bx = presetBtnX + i * (presetBtnW + presetBtnGap);
    if (mouseX > bx && mouseX < bx + presetBtnW &&
        mouseY > presetBtnY && mouseY < presetBtnY + presetBtnH) {
      thetaVal = presets[i].theta;
      phiVal   = presets[i].phi;
      viewAngle = 0;
      return;
    }
  }
}

function mouseDragged() {
  if (activeSlider === 'theta') thetaVal = sliderValFromMouse(314);
  if (activeSlider === 'phi')   phiVal   = sliderValFromMouse(628);
}

function mouseReleased() {
  activeSlider = null;
}
