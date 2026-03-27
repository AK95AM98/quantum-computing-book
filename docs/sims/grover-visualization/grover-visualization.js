// Grover's Algorithm Amplitude Amplification Visualization
// Canvas: 800 x 600

let cnv;

// Layout constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CHART_X = 60;
const CHART_Y = 30;
const CHART_W = 720;
const CHART_H = 380;
const CONTROLS_Y = 430;
const sliderLeftMargin = 260;

// State
let numQubits = 2;        // 2, 3, or 4
let N = 4;                // 2^numQubits
let targetIndex = 0;
let amplitudes = [];
let iteration = 0;
let optimalIterations = 1;
let isAnimating = false;
let animPhase = 0;        // 0=idle, 1=oracle flash, 2=diffusion
let animTimer = 0;
let animDuration = 40;    // frames per sub-step
let foundMessage = false;
let stepRequested = false;
let tempAmplitudes = [];  // for animated interpolation
let preOracleAmplitudes = [];
let postOracleAmplitudes = [];
let postDiffusionAmplitudes = [];

// Sliders (canvas-based)
let nSlider, targetSlider;

// Buttons (canvas-based)
let btnStartStop, btnReset, btnStep;

// Colors
const BG_COLOR        = [245, 248, 252];
const BAR_DEFAULT     = [70, 130, 200];
const BAR_TARGET      = [255, 160, 20];
const BAR_ORACLE_FLASH= [220, 50, 50];
const MEAN_LINE_COLOR = [180, 60, 180];
const GRID_COLOR      = [200, 210, 220];
const TEXT_COLOR      = [30, 40, 60];
const BTN_COLOR       = [70, 130, 200];
const BTN_HOVER       = [50, 100, 170];
const BTN_STOP_COLOR  = [200, 70, 70];
const BTN_STOP_HOVER  = [170, 50, 50];
const BTN_STEP_COLOR  = [80, 160, 80];
const BTN_STEP_HOVER  = [60, 130, 60];

// ─── Slider definition ───────────────────────────────────────────────────────
class CanvasSlider {
  constructor(x, y, w, minVal, maxVal, val, label, stepSize) {
    this.x = x; this.y = y; this.w = w;
    this.minVal = minVal; this.maxVal = maxVal;
    this.val = val;
    this.label = label;
    this.step = stepSize || 1;
    this.dragging = false;
    this.trackH = 6;
    this.thumbR = 9;
  }

  getValue() { return this.val; }

  draw() {
    let tx = this.x - 10;
    let ty = this.y + 5;
    textAlign(RIGHT, CENTER);
    textSize(13);
    fill(...TEXT_COLOR);
    noStroke();
    text(this.label + ": " + this.val, tx, ty);

    // Track
    let trackY = this.y;
    stroke(...GRID_COLOR);
    strokeWeight(this.trackH);
    strokeCap(ROUND);
    line(this.x, trackY, this.x + this.w, trackY);

    // Filled portion
    let frac = (this.val - this.minVal) / (this.maxVal - this.minVal);
    stroke(...BAR_DEFAULT);
    strokeWeight(this.trackH);
    strokeCap(ROUND);
    line(this.x, trackY, this.x + frac * this.w, trackY);

    // Thumb
    let tx2 = this.x + frac * this.w;
    noStroke();
    fill(255);
    circle(tx2, trackY, this.thumbR * 2);
    stroke(...BAR_DEFAULT);
    strokeWeight(2);
    noFill();
    circle(tx2, trackY, this.thumbR * 2);

    noStroke();
  }

  mousePressedHandler() {
    let frac = (this.val - this.minVal) / (this.maxVal - this.minVal);
    let tx = this.x + frac * this.w;
    let ty = this.y;
    if (dist(mouseX, mouseY, tx, ty) < 16) {
      this.dragging = true;
    }
  }

  mouseDraggedHandler() {
    if (!this.dragging) return;
    let frac = constrain((mouseX - this.x) / this.w, 0, 1);
    let raw = this.minVal + frac * (this.maxVal - this.minVal);
    this.val = Math.round(raw / this.step) * this.step;
    this.val = constrain(this.val, this.minVal, this.maxVal);
  }

  mouseReleasedHandler() { this.dragging = false; }
}

// ─── Button definition ────────────────────────────────────────────────────────
class CanvasButton {
  constructor(x, y, w, h, label, colorArr, hoverArr) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.label = label;
    this.colorArr = colorArr;
    this.hoverArr = hoverArr;
    this.onClick = null;
  }

  isOver() {
    return mouseX >= this.x && mouseX <= this.x + this.w &&
           mouseY >= this.y && mouseY <= this.y + this.h;
  }

  draw() {
    let c = this.isOver() ? this.hoverArr : this.colorArr;
    fill(...c);
    noStroke();
    rect(this.x, this.y, this.w, this.h, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  mousePressedHandler() {
    if (this.isOver() && this.onClick) this.onClick();
  }
}

// ─── Setup ────────────────────────────────────────────────────────────────────
function setup() {
  cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  cnv.parent('canvas-container');
  frameRate(30);

  // N-qubits slider: x position = sliderLeftMargin, label+value to its left
  nSlider = new CanvasSlider(sliderLeftMargin, CONTROLS_Y + 20, 200, 2, 4, 2, "Qubits (n)", 1);
  targetSlider = new CanvasSlider(sliderLeftMargin, CONTROLS_Y + 60, 200, 0, 3, 0, "Target state", 1);

  // Buttons
  let bx = sliderLeftMargin + 220;
  btnStartStop = new CanvasButton(bx, CONTROLS_Y + 10, 90, 32, "Start", BTN_COLOR, BTN_HOVER);
  btnStep      = new CanvasButton(bx + 100, CONTROLS_Y + 10, 90, 32, "Step", BTN_STEP_COLOR, BTN_STEP_HOVER);
  btnReset     = new CanvasButton(bx + 200, CONTROLS_Y + 10, 90, 32, "Reset", [120, 120, 130], [90, 90, 100]);

  btnStartStop.onClick = () => {
    isAnimating = !isAnimating;
    btnStartStop.label = isAnimating ? "Stop" : "Start";
    btnStartStop.colorArr = isAnimating ? BTN_STOP_COLOR : BTN_COLOR;
    btnStartStop.hoverArr = isAnimating ? BTN_STOP_HOVER : BTN_HOVER;
    if (isAnimating && animPhase === 0 && !foundMessage) beginIteration();
  };

  btnStep.onClick = () => {
    if (!isAnimating && animPhase === 0 && !foundMessage) {
      stepRequested = true;
      beginIteration();
    }
  };

  btnReset.onClick = () => {
    resetSim();
  };

  resetSim();
}

// ─── Simulation logic ─────────────────────────────────────────────────────────
function resetSim() {
  numQubits = nSlider ? nSlider.getValue() : 2;
  N = Math.pow(2, numQubits);
  targetIndex = targetSlider ? constrain(targetSlider.getValue(), 0, N - 1) : 0;
  optimalIterations = Math.max(1, Math.floor((Math.PI / 4) * Math.sqrt(N)));

  amplitudes = new Array(N).fill(1.0 / Math.sqrt(N));
  tempAmplitudes = amplitudes.slice();
  iteration = 0;
  animPhase = 0;
  animTimer = 0;
  foundMessage = false;
  isAnimating = false;
  stepRequested = false;

  if (btnStartStop) {
    btnStartStop.label = "Start";
    btnStartStop.colorArr = BTN_COLOR;
    btnStartStop.hoverArr = BTN_HOVER;
  }

  // Update target slider max
  if (targetSlider) {
    targetSlider.maxVal = N - 1;
    targetSlider.val = constrain(targetSlider.val, 0, N - 1);
  }
}

function beginIteration() {
  preOracleAmplitudes = amplitudes.slice();
  // Oracle: flip sign of target
  postOracleAmplitudes = amplitudes.slice();
  postOracleAmplitudes[targetIndex] *= -1;
  // Diffusion: inversion about mean
  postDiffusionAmplitudes = applyDiffusion(postOracleAmplitudes);
  animPhase = 1;
  animTimer = 0;
}

function applyDiffusion(amps) {
  let mean = amps.reduce((a, b) => a + b, 0) / N;
  return amps.map(a => 2 * mean - a);
}

function finishIteration() {
  amplitudes = postDiffusionAmplitudes.slice();
  tempAmplitudes = amplitudes.slice();
  iteration++;
  animPhase = 0;
  animTimer = 0;
  let prob = amplitudes[targetIndex] * amplitudes[targetIndex];
  if (prob >= 0.95 || iteration >= optimalIterations * 2) {
    foundMessage = (prob >= 0.80);
    isAnimating = false;
    stepRequested = false;
    if (btnStartStop) {
      btnStartStop.label = "Start";
      btnStartStop.colorArr = BTN_COLOR;
      btnStartStop.hoverArr = BTN_HOVER;
    }
  } else if (isAnimating) {
    beginIteration();
  } else if (stepRequested) {
    stepRequested = false;
  }
}

// ─── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  background(...BG_COLOR);

  // Re-read sliders and handle N change
  let newQubits = nSlider.getValue();
  let newTarget = constrain(targetSlider.getValue(), 0, Math.pow(2, newQubits) - 1);

  if (newQubits !== numQubits && animPhase === 0) {
    numQubits = newQubits;
    N = Math.pow(2, numQubits);
    targetSlider.maxVal = N - 1;
    targetSlider.val = constrain(targetSlider.val, 0, N - 1);
    targetIndex = targetSlider.val;
    resetSim();
  } else if (animPhase === 0) {
    if (newTarget !== targetIndex) {
      targetIndex = newTarget;
    }
  }

  // Update animation
  if (animPhase > 0) {
    animTimer++;
    if (animTimer >= animDuration) {
      if (animPhase === 1) {
        // Oracle done, start diffusion
        animPhase = 2;
        animTimer = 0;
      } else {
        finishIteration();
      }
    }
  }

  // Compute display amplitudes
  let displayAmps = amplitudes.slice();
  let oracleFlash = false;
  if (animPhase === 1) {
    let t = animTimer / animDuration;
    oracleFlash = true;
    // Interpolate between preOracle and postOracle (only target changes sign)
    displayAmps = preOracleAmplitudes.map((a, i) => {
      if (i === targetIndex) return a + t * (postOracleAmplitudes[i] - a);
      return a;
    });
  } else if (animPhase === 2) {
    let t = easeInOut(animTimer / animDuration);
    displayAmps = postOracleAmplitudes.map((a, i) => a + t * (postDiffusionAmplitudes[i] - a));
  }

  // Mean of displayed amplitudes
  let mean = displayAmps.reduce((a, b) => a + b, 0) / N;
  let maxAbsAmp = Math.max(...displayAmps.map(Math.abs), 1.0 / Math.sqrt(N) * 1.1);
  let axisMax = Math.max(maxAbsAmp * 1.15, 1.05 / Math.sqrt(N));
  axisMax = Math.max(axisMax, 0.3);

  drawChart(displayAmps, mean, axisMax, oracleFlash);
  drawInfo(displayAmps);
  drawSliders();
  drawButtons();
  drawIterationBar(displayAmps);
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function drawChart(displayAmps, mean, axisMax, oracleFlash) {
  // Background panel
  fill(255);
  stroke(...GRID_COLOR);
  strokeWeight(1);
  rect(CHART_X - 5, CHART_Y - 5, CHART_W + 10, CHART_H + 10, 8);

  // Zero line
  let zeroY = CHART_Y + CHART_H * 0.55;
  let scaleY = (CHART_H * 0.85) / axisMax;

  stroke(...GRID_COLOR);
  strokeWeight(1);
  // Grid lines at +0.5, +1, -0.5
  for (let g of [-1.0, -0.5, 0.5, 1.0]) {
    let gy = zeroY - g * scaleY;
    if (gy > CHART_Y && gy < CHART_Y + CHART_H) {
      stroke(215, 220, 230);
      strokeWeight(1);
      line(CHART_X, gy, CHART_X + CHART_W, gy);
      fill(160, 170, 180);
      noStroke();
      textAlign(RIGHT, CENTER);
      textSize(11);
      text(g.toFixed(1), CHART_X - 8, gy);
    }
  }

  // Zero line bold
  stroke(150, 160, 175);
  strokeWeight(1.5);
  line(CHART_X, zeroY, CHART_X + CHART_W, zeroY);

  // Y-axis label
  push();
  translate(18, CHART_Y + CHART_H / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(12);
  fill(...TEXT_COLOR);
  noStroke();
  text("Amplitude", 0, 0);
  pop();

  // Draw bars
  let barPad = N <= 4 ? 14 : N <= 8 ? 8 : 4;
  let totalBars = N;
  let barW = (CHART_W - barPad * (totalBars + 1)) / totalBars;
  barW = Math.max(barW, 4);

  for (let i = 0; i < N; i++) {
    let a = displayAmps[i];
    let bx = CHART_X + barPad + i * (barW + barPad);
    let barH = Math.abs(a) * scaleY;
    let by = a >= 0 ? zeroY - barH : zeroY;

    // Color
    let col;
    if (i === targetIndex && oracleFlash && animPhase === 1) {
      let t = animTimer / animDuration;
      col = lerpColor(color(...BAR_DEFAULT), color(...BAR_ORACLE_FLASH), t);
      if (a < 0) col = color(...BAR_ORACLE_FLASH);
    } else if (i === targetIndex) {
      col = color(...BAR_TARGET);
    } else {
      col = color(...BAR_DEFAULT);
    }

    fill(col);
    noStroke();
    rect(bx, by, barW, barH, 2);

    // Probability label on target
    if (i === targetIndex && barH > 10) {
      let prob = a * a;
      fill(80, 40, 0);
      textAlign(CENTER, TOP);
      textSize(10);
      let labelY = a >= 0 ? by - 14 : by + barH + 2;
      text("P=" + (prob * 100).toFixed(1) + "%", bx + barW / 2, labelY);
    }

    // State label below x-axis
    fill(...TEXT_COLOR);
    textAlign(CENTER, TOP);
    textSize(N <= 8 ? 12 : 10);
    let stateLabel = "|" + i + "⟩";
    if (N <= 8) {
      text(stateLabel, bx + barW / 2, zeroY + 4);
    } else {
      // Only label every other state for 16 states
      if (i % 2 === 0) text(stateLabel, bx + barW / 2, zeroY + 4);
    }
  }

  // Mean amplitude line
  let meanY = zeroY - mean * scaleY;
  if (meanY > CHART_Y && meanY < CHART_Y + CHART_H) {
    stroke(...MEAN_LINE_COLOR);
    strokeWeight(2);
    setLineDash([6, 4]);
    line(CHART_X, meanY, CHART_X + CHART_W, meanY);
    setLineDash([]);
    fill(...MEAN_LINE_COLOR);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text("mean = " + mean.toFixed(3), CHART_X + CHART_W + 2, meanY);
  }

  // Title
  fill(...TEXT_COLOR);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(15);
  textStyle(BOLD);
  text("Grover's Algorithm — Amplitude Amplification", CANVAS_WIDTH / 2, CHART_Y - 2);
  textStyle(NORMAL);
}

function setLineDash(segments) {
  drawingContext.setLineDash(segments);
}

function drawInfo(displayAmps) {
  let prob = displayAmps[targetIndex] * displayAmps[targetIndex];
  let infoX = CHART_X;
  let infoY = CHART_Y + CHART_H + 14;

  // Phase label
  let phaseLabel = "";
  if (animPhase === 1) phaseLabel = " [Oracle: flipping target sign...]";
  else if (animPhase === 2) phaseLabel = " [Diffusion: inverting about mean...]";

  fill(...TEXT_COLOR);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);

  let line1 = "Iteration: " + iteration + " / optimal: " + optimalIterations + phaseLabel;
  let line2 = "N = " + N + " states  |  Target: |" + targetIndex + "⟩  |  P(target) = " + (prob * 100).toFixed(2) + "%";

  text(line1, infoX, infoY);
  text(line2, infoX, infoY + 18);

  if (foundMessage) {
    fill(20, 150, 60);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("Measurement: Found target state |" + targetIndex + "⟩!", CANVAS_WIDTH / 2, infoY + 38);
    textStyle(NORMAL);
  } else if (iteration >= optimalIterations * 2 && !foundMessage) {
    fill(180, 60, 30);
    textSize(13);
    textAlign(CENTER, TOP);
    text("Maximum iterations reached. Try resetting.", CANVAS_WIDTH / 2, infoY + 38);
  }
}

function drawIterationBar(displayAmps) {
  // Small probability gauge
  let gx = CANVAS_WIDTH - 110;
  let gy = CHART_Y + 10;
  let gh = CHART_H - 20;
  let gw = 18;

  let prob = displayAmps[targetIndex] * displayAmps[targetIndex];
  fill(230, 235, 240);
  stroke(...GRID_COLOR);
  strokeWeight(1);
  rect(gx, gy, gw, gh, 4);

  let fillH = gh * prob;
  fill(255, 160, 20);
  noStroke();
  rect(gx, gy + gh - fillH, gw, fillH, 4);

  // Label
  fill(...TEXT_COLOR);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text("P", gx + gw / 2, gy - 13);
  text((prob * 100).toFixed(0) + "%", gx + gw / 2, gy + gh + 3);

  // Tick at 50% and 100%
  stroke(180, 190, 200);
  strokeWeight(1);
  line(gx + gw, gy + gh * 0.5, gx + gw + 4, gy + gh * 0.5);
  line(gx + gw, gy, gx + gw + 4, gy);
  fill(160);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(9);
  text("100%", gx + gw + 6, gy);
  text("50%", gx + gw + 6, gy + gh * 0.5);
}

function drawSliders() {
  nSlider.draw();
  targetSlider.draw();
  // Labels for sliders
  fill(100, 110, 130);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text("(drag thumbs to adjust)", sliderLeftMargin, CONTROLS_Y + 80);
}

function drawButtons() {
  btnStartStop.draw();
  btnStep.draw();
  btnReset.draw();
}

// ─── Input handlers ───────────────────────────────────────────────────────────
function mousePressed() {
  nSlider.mousePressedHandler();
  targetSlider.mousePressedHandler();
  btnStartStop.mousePressedHandler();
  btnStep.mousePressedHandler();
  btnReset.mousePressedHandler();
}

function mouseDragged() {
  nSlider.mouseDraggedHandler();
  targetSlider.mouseDraggedHandler();
}

function mouseReleased() {
  nSlider.mouseReleasedHandler();
  targetSlider.mouseReleasedHandler();
}
