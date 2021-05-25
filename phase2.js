/* eslint-disable no-undef, no-unused-vars */
class Phase2 {
  constructor() {
    this.camShader = null;
    this.t_tiles = 32;
    this.finish_callback = null;
  }

  preload() {
    this.camShader = loadShader(
      "/shader/2/effect.vert",
      "/shader/2/effect.fraq"
    );
  }

  setup() {}

  draw() {
    translate(-width / 2, -height / 2, 0);
    shader(this.camShader);
    this.camShader.setUniform("tex0", video);
    this.camShader.setUniform("tiles", this.t_tiles);
    rect(0, 0, width, height);
  }

  exit() {
    this.finish_callback();
  }
}
