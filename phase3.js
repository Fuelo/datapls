/* eslint-disable no-undef, no-unused-vars */
class Phase3 {
  constructor() {
    this.camShader = null;
    this.pupImg = null;
    this.finish_callback = null;
  }

  preload() {
    this.camShader = loadShader(
      "/shader/3/effect.vert",
      "/shader/3/effect.fraq"
    );
    this.pupImg = loadImage("/assets/zeroone.jpeg");
  }

  setup() {}

  drawShader() {
    shader(this.camShader);
    this.camShader.setUniform("tex0", video);
    this.camShader.setUniform("tex1", this.pupImg);
    this.camShader.setUniform("amt", map(width * 0.1, 0, width, 0, 0.2));
    rect(0, 0, width, height);
    resetShader();
    translate(-width / 2, -height / 2, 0);
  }

  draw() {
    this.drawShader();
    this.drawFaceConnectors();
  }

  drawFaceConnectors() {
    for (let i = 0; i < predictionsFace.length; i += 1) {
      const prediction = predictionsFace[i];
      for (let j = 0; j < FACEMESH_CONTOURS.length; j += 1) {
        const connectPair = FACEMESH_CONTOURS[j];
        fill(0, 255, 0);

        const partA = prediction[connectPair[0]];
        const partB = prediction[connectPair[1]];
        stroke(255, 255, 0);
        strokeWeight(2);
        line(
          partA.x * width,
          partA.y * height,
          partB.x * width,
          partB.y * height
        );
      }
    }
  }

  exit() {
    this.finish_callback();
  }
}
