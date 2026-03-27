// Bloch Sphere Visualizer
// Interactive 3D Bloch sphere using p5.js orthographic projection

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// State
let theta = 0;        // polar angle [0, PI]
let phi = 0;          // azimuthal angle [0, TWO_PI]
let viewAngle = 0;    // slowly rotating view angle
let isAnimating = false;

// Sliders
let thetaSlider, phiSlider;
let sliderLeftMargin = 260;

// Sphere drawing params
let cx, cy;           // center of sphere in draw area
let radius = 170;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');

  cx = canvasWidth / 2;
  cy = drawHeight / 2;

  thetaSlider = createSlider(0, 314, 0, 1); // 0 to PI * 100
  thetaSlider.position(-1000, -1000);       // hide off-screen
  thetaSlider.style('width', '200px');

  phiSlider = createSlider(0, 628, 0, 1);   // 0 to 2PI * 100
  phiSlider.position(-1000, -1000);
  phiSlider.style('width', '200px');
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

  // Read sliders
  theta = thetaSlider.value() / 100.0;
  phi = phiSlider.value() / 100.0 + viewAngle;

  drawBlochSphere();
  drawStateVector();
  drawStateInfo();
  drawControls();
}

// ---- Projection helpers ----
// Orthographic projection with slight perspective tilt
// We tilt the sphere so we can see the equator from a slight angle
// viewAngle rotates the sphere around the Z axis

function project3D(x3d, y3d, z3d) {
  // Rotate around Z axis by viewAngle (for slow spin)
  // We also apply a fixed tilt so Z axis appears diagonal
  let tilt = 0.4; // radians, fixed vertical tilt for depth cue

  // Rotate around Z
  let xr = x3d * cos(viewAngle) - y3d * sin(viewAngle);
  let yr = x3d * sin(viewAngle) + y3d * cos(viewAngle);
  let zr = z3d;

  // Apply tilt (rotation around X axis)
  let yr2 = yr * cos(tilt) - zr * sin(tilt);
  let zr2 = yr * sin(tilt) + zr * cos(tilt);

  // Project to 2D (orthographic, scaled)
  let px = cx + xr * radius;
  let py = cy - yr2 * radius; // invert Y for screen coords
  let depth = zr2; // used for depth ordering

  return { x: px, y: py, depth: depth };
}

// Convert (theta, phi) to Cartesian on unit sphere
// Convention: Z up, |0> = north pole (0,0,1), |1> = south pole (0,0,-1)
function blochToCart(t, p) {
  return {
    x: sin(t) * cos(p),
    y: sin(t) * sin(p),
    z: cos(t)
  };
}

// ---- Sphere wireframe ----
function drawBlochSphere() {
  let numLat = 8;   // latitude lines
  let numLon = 12;  // longitude lines
  let segments = 60;

  // Draw longitude lines (meridians)
  for (let i = 0; i < numLon; i++) {
    let p = (i / numLon) * TWO_PI;
    let pts = [];
    for (let j = 0; j <= segments; j++) {
      let t = (j / segments) * PI;
      let cart = blochToCart(t, p);
      pts.push(project3D(cart.x, cart.y, cart.z));
    }
    stroke(180, 200, 220);
    strokeWeight(0.7);
    noFill();
    beginShape();
    for (let pt of pts) vertex(pt.x, pt.y);
    endShape();
  }

  // Draw latitude lines (parallels)
  for (let i = 1; i < numLat; i++) {
    let t = (i / numLat) * PI;
    let pts = [];
    for (let j = 0; j <= segments; j++) {
      let p = (j / segments) * TWO_PI;
      let cart = blochToCart(t, p);
      pts.push(project3D(cart.x, cart.y, cart.z));
    }
    stroke(180, 200, 220);
    strokeWeight(0.7);
    noFill();
    beginShape();
    for (let pt of pts) vertex(pt.x, pt.y);
    endShape();
  }

  // Draw equator in a slightly bolder style
  let eqPts = [];
  for (let j = 0; j <= segments; j++) {
    let p = (j / segments) * TWO_PI;
    let cart = blochToCart(PI / 2, p);
    eqPts.push(project3D(cart.x, cart.y, cart.z));
  }
  stroke(120, 160, 200);
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (let pt of eqPts) vertex(pt.x, pt.y);
  endShape();

  // Draw outer circle boundary (silhouette)
  stroke(80, 120, 180);
  strokeWeight(2);
  noFill();
  // Silhouette is always a circle in orthographic projection
  ellipse(cx, cy, radius * 2, radius * 2);

  // Draw axes
  drawAxes();
}

function drawAxes() {
  let axisLen = 1.25;

  // Z axis (Blue) — |0> top, |1> bottom
  let zTop = project3D(0, 0, axisLen);
  let zBot = project3D(0, 0, -axisLen);
  stroke(40, 40, 200);
  strokeWeight(2);
  line(zBot.x, zBot.y, zTop.x, zTop.y);
  drawArrowHead(zBot.x, zBot.y, zTop.x, zTop.y, color(40, 40, 200));
  // Labels
  fill(40, 40, 200);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text("|0⟩", zTop.x, zTop.y - 6);
  textAlign(CENTER, TOP);
  text("|1⟩", zBot.x, zBot.y + 6);

  // X axis (Red) — |+> and |->
  let xPos = project3D(axisLen, 0, 0);
  let xNeg = project3D(-axisLen, 0, 0);
  stroke(200, 40, 40);
  strokeWeight(2);
  line(xNeg.x, xNeg.y, xPos.x, xPos.y);
  drawArrowHead(xNeg.x, xNeg.y, xPos.x, xPos.y, color(200, 40, 40));
  fill(200, 40, 40);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text("|+⟩", xPos.x + 4, xPos.y);
  textAlign(RIGHT, CENTER);
  text("|−⟩", xNeg.x - 4, xNeg.y);

  // Y axis (Green) — |+i> and |-i>
  let yPos = project3D(0, axisLen, 0);
  let yNeg = project3D(0, -axisLen, 0);
  stroke(40, 160, 40);
  strokeWeight(2);
  line(yNeg.x, yNeg.y, yPos.x, yPos.y);
  drawArrowHead(yNeg.x, yNeg.y, yPos.x, yPos.y, color(40, 160, 40));
  fill(40, 160, 40);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text("|+i⟩", yPos.x + 4, yPos.y);
  textAlign(RIGHT, CENTER);
  text("|−i⟩", yNeg.x - 4, yNeg.y);

  textStyle(NORMAL);
}

function drawArrowHead(x1, y1, x2, y2, col) {
  let angle = atan2(y2 - y1, x2 - x1);
  let aSize = 8;
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -aSize, -aSize / 2.5, -aSize, aSize / 2.5);
  pop();
}

// ---- State vector ----
function drawStateVector() {
  let t = thetaSlider.value() / 100.0;
  let p = phiSlider.value() / 100.0 + viewAngle;

  let cart = blochToCart(t, p);
  let pt = project3D(cart.x, cart.y, cart.z);

  // Draw dashed line from center to equator projection (ghost)
  let eqPt = project3D(cart.x, cart.y, 0);
  stroke(180, 180, 180);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(cx, cy, eqPt.x, eqPt.y);
  line(eqPt.x, eqPt.y, pt.x, pt.y);
  drawingContext.setLineDash([]);

  // Draw the state vector arrow (thick, orange)
  stroke(220, 100, 0);
  strokeWeight(3.5);
  line(cx, cy, pt.x, pt.y);
  drawArrowHead(cx, cy, pt.x, pt.y, color(220, 100, 0));

  // Draw point at tip
  fill(220, 100, 0);
  noStroke();
  circle(pt.x, pt.y, 10);
}

// ---- State information panel ----
function drawStateInfo() {
  let t = thetaSlider.value() / 100.0;
  let p = phiSlider.value() / 100.0;

  // Compute alpha and beta
  let alpha_r = cos(t / 2);
  let beta_r   = sin(t / 2) * cos(p);
  let beta_i   = sin(t / 2) * sin(p);

  let prob0 = cos(t / 2) * cos(t / 2);
  let prob1 = sin(t / 2) * sin(t / 2);

  // Panel background
  fill(255, 255, 240);
  stroke(180);
  strokeWeight(1);
  rect(10, drawHeight - 140, 220, 135, 6);

  fill(30);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Quantum State", 18, drawHeight - 136);
  textStyle(NORMAL);

  let alpha_str = nf(alpha_r, 1, 3);
  let beta_re_str = nf(beta_r, 1, 3);
  let beta_im_str = nf(abs(beta_i), 1, 3);
  let beta_sign = beta_i >= 0 ? "+" : "−";

  textSize(11);
  text("|ψ⟩ = " + alpha_str + "|0⟩ + (" + beta_re_str, 18, drawHeight - 118);
  text("       " + beta_sign + beta_im_str + "i)|1⟩", 18, drawHeight - 104);

  text("θ = " + nf(t, 1, 3) + " rad  (" + nf(degrees(t), 1, 1) + "°)", 18, drawHeight - 88);
  text("φ = " + nf(p, 1, 3) + " rad  (" + nf(degrees(p), 1, 1) + "°)", 18, drawHeight - 74);

  fill(40, 40, 200);
  text("P(|0⟩) = " + nf(prob0, 1, 4), 18, drawHeight - 58);
  fill(200, 40, 40);
  text("P(|1⟩) = " + nf(prob1, 1, 4), 18, drawHeight - 44);

  // Probability bar
  let barX = 18, barY = drawHeight - 32, barW = 200, barH = 12;
  fill(200);
  noStroke();
  rect(barX, barY, barW, barH, 3);
  fill(40, 40, 200);
  rect(barX, barY, barW * prob0, barH, 3, 0, 0, 3);
  fill(200, 40, 40);
  rect(barX + barW * prob0, barY, barW * prob1, barH, 0, 3, 3, 0);
}

// ---- Preset buttons on canvas ----
let presets = [
  { label: "|0⟩",  theta: 0,    phi: 0 },
  { label: "|1⟩",  theta: 314,  phi: 0 },
  { label: "|+⟩",  theta: 157,  phi: 0 },
  { label: "|−⟩",  theta: 157,  phi: 314 },
  { label: "|+i⟩", theta: 157,  phi: 157 },
];

let presetBtnX = 245;
let presetBtnY = drawHeight - 140;
let presetBtnW = 54;
let presetBtnH = 28;
let presetBtnGap = 8;

function drawPresetButtons() {
  textStyle(NORMAL);
  fill(30);
  noStroke();
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text("Presets:", presetBtnX, presetBtnY - 4);

  for (let i = 0; i < presets.length; i++) {
    let bx = presetBtnX + i * (presetBtnW + presetBtnGap);
    let by = presetBtnY;
    // Check hover
    let hov = mouseX > bx && mouseX < bx + presetBtnW &&
              mouseY > by && mouseY < by + presetBtnH;
    fill(hov ? color(80, 130, 200) : color(100, 150, 220));
    stroke(60, 100, 180);
    strokeWeight(1);
    rect(bx, by, presetBtnW, presetBtnH, 5);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(presets[i].label, bx + presetBtnW / 2, by + presetBtnH / 2);
    textStyle(NORMAL);
  }
}

// ---- Control area ----
let startStopBtn = { x: 20, y: drawHeight + 30, w: 110, h: 36 };
let resetBtn     = { x: 145, y: drawHeight + 30, w: 80, h: 36 };

let thetaSliderX = sliderLeftMargin + 10;
let thetaSliderY = drawHeight + 18;
let phiSliderX   = sliderLeftMargin + 10;
let phiSliderY   = drawHeight + 58;
let sliderW      = 490;

function drawControls() {
  // Control area background
  fill(245);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Separator line
  stroke(200);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Theta slider
  thetaSlider.position(thetaSliderX, thetaSliderY);
  thetaSlider.style('width', sliderW + 'px');

  // Phi slider
  phiSlider.position(phiSliderX, phiSliderY);
  phiSlider.style('width', sliderW + 'px');

  // Slider labels (right-aligned, left of track)
  fill(50);
  noStroke();
  textSize(13);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER);
  text("θ (polar):", thetaSliderX - 6, thetaSliderY + 10);
  text("φ (azimuthal):", phiSliderX - 6, phiSliderY + 10);

  // Slider value readouts
  let tVal = thetaSlider.value() / 100.0;
  let pVal = phiSlider.value() / 100.0;
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(nf(tVal, 1, 2) + " rad", thetaSliderX + sliderW + 8, thetaSliderY + 10);
  text(nf(pVal, 1, 2) + " rad", phiSliderX + sliderW + 8, phiSliderY + 10);

  // Draw Start/Stop button
  drawCanvasButton(startStopBtn, isAnimating ? "Stop" : "Start",
    isAnimating ? color(200, 80, 80) : color(60, 160, 60));

  // Draw Reset button
  drawCanvasButton(resetBtn, "Reset", color(120, 120, 180));

  // Draw preset buttons
  drawPresetButtons();
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

// ---- Mouse interaction ----
function mousePressed() {
  // Start/Stop
  if (mouseX > startStopBtn.x && mouseX < startStopBtn.x + startStopBtn.w &&
      mouseY > startStopBtn.y && mouseY < startStopBtn.y + startStopBtn.h) {
    isAnimating = !isAnimating;
    return;
  }

  // Reset
  if (mouseX > resetBtn.x && mouseX < resetBtn.x + resetBtn.w &&
      mouseY > resetBtn.y && mouseY < resetBtn.y + resetBtn.h) {
    thetaSlider.value(0);
    phiSlider.value(0);
    viewAngle = 0;
    isAnimating = false;
    return;
  }

  // Preset buttons
  for (let i = 0; i < presets.length; i++) {
    let bx = presetBtnX + i * (presetBtnW + presetBtnGap);
    let by = presetBtnY;
    if (mouseX > bx && mouseX < bx + presetBtnW &&
        mouseY > by && mouseY < by + presetBtnH) {
      thetaSlider.value(presets[i].theta);
      phiSlider.value(presets[i].phi);
      viewAngle = 0;
      return;
    }
  }
}
