/* eslint-disable no-undef, no-unused-vars */
class Steps {
  preload() {}
}

class Phase1 {
  constructor() {
    this.camShader = null;
    this.touchPoints = [];
    this.touchPointsTouched = 0;
    this.music = new MusicPhase1();
  }
  preload() {
    this.camShader = loadShader(
      "/shader/1/effect.vert",
      "/shader/1/effect.fraq"
    );
    this.music.preload();
  }

  setup() {
    this.setupPhase0();
  }

  setupPhase0() {
    this.processCurrentStep = this.processStep0;
  }

  processStep0() {
    this.drawText("Click me");
    if (mouseIsPressed) {
      this.setupPhase1();
      return;
    }
  }

  setupPhase1() {
    console.log("setupStep1");
    this.clearTouchPoints();
    this.touchPoints.push(new TouchPoint());
    this.processCurrentStep = this.processStep1;
  }
  processStep1() {
    this.drawText("Touch the dOts to play the music");
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep2();
    }
  }
  setupStep2() {
    console.log("setupStep2");

    this.clearTouchPoints();
    this.touchPoints.push(new TouchPoint());
    this.music.count1();
    this.processCurrentStep = this.processStep2;
  }
  processStep2() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep3();
    }
  }

  setupStep3() {
    console.log("setupStep3");

    this.clearTouchPoints();
    this.touchPoints.push(new TouchPoint());
    this.processCurrentStep = this.processStep3;
  }

  processStep3() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep4();
    }
  }

  setupStep4() {
    console.log("setupStep4");

    this.clearTouchPoints();
    this.music.count2();
    this.processCurrentStep = this.processStep4;
    this.finishTime = millis() + 10000;
  }

  processStep4() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();
    this.drawText("GOt it!");
    if (this.finishTime <= millis()) {
      this.setupStep5();
    }
  }

  setupStep5() {
    console.log("setupStep5");

    this.clearTouchPoints();
    this.touchPoints.push(new TouchPoint("left"));
    this.processCurrentStep = this.processStep5;
  }

  processStep5() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep6();
    }
  }

  setupStep6() {
    console.log("setupStep6");
    this.music.count3();
    this.clearTouchPoints();
    this.touchPoints.push(new TouchPoint("right"));
    this.touchPoints.push(new TouchPoint("left"));
    this.processCurrentStep = this.processStep6;
    this.finishTime = millis() + 16000;
  }

  processStep6() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.finishTime <= millis()) {
      this.setupStep7();
    }
  }

  setupStep7() {
    console.log("setupStep7");
    this.clearTouchPoints();
    this.touchPoints.push(new TouchPoint("right"));
    this.touchPoints.push(new TouchPoint("left"));
    this.processCurrentStep = this.processStep7;
  }

  processStep7() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep8();
    }
  }

  setupStep8() {
    console.log("setupStep8");
    this.clearTouchPoints();
    this.music.count4();
    this.touchPoints.push(new TouchPoint("right"));
    this.touchPoints.push(new TouchPoint("left"));
    this.processCurrentStep = this.processStep8;
  }

  processStep8() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep9();
    }
  }

  setupStep9() {
    console.log("setupStep9");
    this.clearTouchPoints();
    this.touchPoints.push(new TouchPoint("right"));
    this.touchPoints.push(new TouchPoint("left"));
    this.processCurrentStep = this.processStep9;
  }

  processStep9() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep10();
    }
  }

  setupStep10() {
    console.log("setupStep10");
    this.clearTouchPoints();
    this.music.stopE4();
    this.touchPoints.push(new TouchPoint("right"));
    this.touchPoints.push(new TouchPoint("left"));
    this.processCurrentStep = this.processStep10;
  }

  processStep10() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.setupStep11();
    }
  }

  setupStep11() {
    console.log("setupStep11");
    this.clearTouchPoints();
    this.music.stopG1();
    this.touchPoints.push(new TouchPoint("right"));
    this.touchPoints.push(new TouchPoint("left"));
    this.processCurrentStep = this.processStep11;
  }

  processStep11() {
    this.drawHandPoints();
    this.drawTouchPoints();
    this.processTouchPoints();

    if (this.getCurrentTouchedPoints() === this.touchPoints.length) {
      this.processFinish();
    }
  }

  setupFinished() {
    console.log("finished");
    this.music.clearAllSounds();
  }
  processFinish() {
    this.drawText("Finished");
  }

  drawShader() {
    shader(this.camShader);
    this.camShader.setUniform("tex0", video);
    rect(0, 0, width, height);
    resetShader();
    translate(-width / 2, -height / 2, 0);
  }

  drawText(text_) {
    textFont(font);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255, 255, 255);
    text(text_, width * 0.5, height * 0.5);
  }

  draw() {
    this.drawShader();
    this.processCurrentStep();
  }

  drawHandPoints() {
    if (predictionsPose.length === 0) return;
    const right = predictionsPose[POSE_LANDMARKS.RIGHT_INDEX];
    fill(255, 255, 0);
    noStroke();
    ellipse(right.x * width, right.y * height, 20, 20);
    const left = predictionsPose[POSE_LANDMARKS.LEFT_INDEX];
    fill(0, 255, 0);
    noStroke();
    ellipse(left.x * width, left.y * height, 20, 20);
  }

  drawTouchPoints() {
    for (let i = 0; i < this.touchPoints.length; i++) {
      if (!this.touchPoints[i].collided) {
        this.touchPoints[i].draw();
      }
    }
  }

  processTouchPoints() {
    for (let i = 0; i < this.touchPoints.length; i++) {
      let t_point = this.touchPoints[i];
      if (t_point.collided === true) continue;
      if (t_point.intersectsWith(rightHand, "right")) {
        t_point.collided = true;
      }
      if (t_point.intersectsWith(leftHand, "left")) {
        t_point.collided = true;
      }
    }
  }

  clearTouchPoints() {
    this.touchPoints = [];
    this.touchPointsTouched = 0;
  }

  getCurrentTouchedPoints() {
    let count = 0;
    for (let i = 0; i < this.touchPoints.length; i++) {
      if (this.touchPoints[i].collided) {
        count++;
      }
    }
    return count;
  }
}

class MusicPhase1 {
  constructor() {
    this.music = null;
  }

  preload() {
    soundFormats("mp3", "ogg");
    this.ABC1 = loadSound("/sounds/phase1/ABC1-vox.mp3");
    this.ABC2 = loadSound("/sounds/phase1//ABC2-vox.mp3");
    this.D1 = loadSound("/sounds/phase1/D1-vox.mp3");
    this.D2 = loadSound("/sounds/phase1/ABCD2E-vox.mp3");
    this.D3 = loadSound("/sounds/phase1/D3-vox.mp3");
    this.E2 = loadSound("/sounds/phase1/ABCDE2-vox.mp3");
    this.E4 = loadSound("/sounds/phase1/E4-vox.mp3");
    this.F1 = loadSound("/sounds/phase1/F1-vox.mp3");
    this.F2 = loadSound("/sounds/phase1/F2-vox.mp3");
    this.G1 = loadSound("/sounds/phase1/G1-vox.mp3");
  }

  count1() {
    this.ABC1.loop();
    this.D1.setVolume(0.6);
    this.D1.loop();
  }

  count2() {
    this.D1.setLoop(false);
    this.ABC1.setLoop(false);
    this.D1.onended(() => this.triggerE2());
  }

  count3() {
    this.ABC1.setLoop(false);
    this.E4.setLoop(false);
    this.D1.setLoop(false);
    this.D1.onended(() => this.triggerD2());
  }

  count4() {
    this.ABC1.setLoop(false);
    this.D3.setLoop(false);
    this.E4.setLoop(false);
    this.ABC1.onended(() => this.triggerG1());
  }

  triggerE2() {
    console.log("triggerE2");
    this.E2.play();
    this.E2.onended(() => this.triggerE4());
  }

  triggerE4() {
    console.log("triggerE4");
    this.ABC1.loop();
    this.D1.loop();
    this.E4.setVolume(0.4);
    this.E4.loop();
  }

  triggerD2() {
    //E4.loop();
    this.D2.play();
    this.D2.onended(() => this.triggerD3());
  }

  triggerD3() {
    this.ABC1.stop();
    this.E4.stop();
    this.D3.loop();
    this.ABC1.loop();
    this.E4.setVolume(0.4);
    this.E4.loop();
    console.log("triggerD3");
  }

  triggerG1() {
    this.ABC1.loop();
    this.D3.loop();
    this.E4.loop();
    this.G1.loop();
    console.log("triggerG1");
  }

  stopE4() {
    this.clearSound(this.E4);
  }

  stopG1() {
    this.clearSound(this.G1);
  }

  clearSound(snd) {
    snd.onended(() => {});
    snd.setLoop(false);
    snd.stop();
  }

  clearAllSounds() {
    this.clearSound(this.ABC1);
    this.clearSound(this.ABC2);
    this.clearSound(this.D1);
    this.clearSound(this.D2);
    this.clearSound(this.D3);
    this.clearSound(this.E2);
    this.clearSound(this.E4);
    this.clearSound(this.F1);
    this.clearSound(this.F2);
    this.clearSound(this.G1);
  }
}

class TouchPoint {
  constructor(type = "all") {
    this.radius = 40;
    this.vector = this.getRandomTouchpoint();
    this.type = type;
    this.collided = false;
  }

  getRandomTouchpoint() {
    let x = this.radius * 2 + random() * (width - this.radius * 4);
    let y = this.radius * 2 + random() * (height - this.radius * 4);
    return createVector(x, y);
  }

  draw() {
    switch (this.type) {
      case "right":
        fill(255, 255, 0);
        break;
      case "left":
        fill(0, 255, 0);
        break;
      default:
        fill(255, 255, 255);
    }

    stroke(0, 0, 0);
    strokeWeight(2);
    ellipse(this.vector.x, this.vector.y, this.radius, this.radius);
  }

  intersectsWith(v1, type_ = "all") {
    if (this.type !== "all" && this.type !== type_) {
      return false;
    }

    let v2 = this.vector;
    let distance = dist(v1.x, v1.y, v2.x, v2.y);
    if (distance < this.radius) {
      return true;
    }
    return false;
  }
}
