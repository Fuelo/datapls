/* eslint-disable no-undef, no-unused-vars */
let level1;
let level2;
let level3;
let imgDetector;
let font;

let video;

// Shared Vars
let predictionsFace = [];
let predictionsPose = [];
let leftHand = null;
let rightHand = null;

function preload() {
  font = loadFont("/assets/Padauk-Regular.ttf");

  leftHand = createVector(-100, -100);
  rightHand = createVector(-100, -100);
  imgDetector = new ImageDetection();
  level1 = new Phase1();
  level1.preload();
  level2 = new Phase2();
  level2.preload();
  level3 = new Phase3();
  level3.preload();
}
function setup() {
  function setupVideo() {
    video = createCapture(VIDEO, (el) => {
      videoElement = document.getElementsByTagName("video")[0];
      imgDetector.setupFaceMesh(videoElement);
      imgDetector.setupPoseNet(videoElement);
    });

    video.size(width, height);
    video.hide();
  }

  createCanvas(windowWidth, windowHeight, WEBGL);
  // Put setup code here
  setupVideo();
  const gl = canvas.getContext("webgl");
  gl.disable(gl.DEPTH_TEST);

  imgDetector.setEnablePoseDetection();

  level1.setup();
}

function draw() {
  imgDetector.processImageDetection();
  level1.draw();
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
