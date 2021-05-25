/* eslint-disable no-undef, no-unused-vars */

class ImageDetection {
  constructor() {
    this.videoElement = null;
    // FaceMesh
    this.faceMeshOptions = {
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    };
    this.faceMesh = null;
    this.faceLock = false;
    this.enableFaceDetection = false;

    // Posenet
    this.poseOptions = {
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6
    };
    this.pose = null;
    this.enablePoseDetection = false;
    this.poseLock = false;
  }
  onFaceResults(results) {
    // draw method
    if (results.multiFaceLandmarks === undefined) {
      predictionsFace = [];
    } else {
      predictionsFace = results.multiFaceLandmarks;
    }
  }

  setupFaceMesh(videoElement) {
    this.faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });
    this.videoElement = videoElement;
    this.faceMesh.setOptions(this.faceMeshOptions);
    this.faceMesh.onResults(this.onFaceResults);
  }

  onPoseResults(results) {
    if (results.poseLandmarks === undefined) {
      predictionsPose = [];
    } else {
      rightHand.x = results.poseLandmarks[POSE_LANDMARKS.RIGHT_INDEX].x * width;
      rightHand.y =
        results.poseLandmarks[POSE_LANDMARKS.RIGHT_INDEX].y * height;
      leftHand.x = results.poseLandmarks[POSE_LANDMARKS.LEFT_INDEX].x * width;
      leftHand.y = results.poseLandmarks[POSE_LANDMARKS.LEFT_INDEX].y * height;
      predictionsPose = results.poseLandmarks;
    }
  }

  setEnableFaceDetection() {
    this.enableFaceDetection = true;
    this.enablePoseDetection = false;
  }

  setEnablePoseDetection() {
    this.enableFaceDetection = false;
    this.enablePoseDetection = true;
  }

  setupPoseNet() {
    this.pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });
    this.pose.setOptions(this.poseOptions);
    this.pose.onResults(this.onPoseResults);
  }

  async face_t() {
    await this.faceMesh.send({ image: this.videoElement });
    this.faceLock = false;
  }

  async pose_t() {
    await this.pose.send({ image: this.videoElement });
    this.poseLock = false;
  }
  processImageDetection() {
    if (
      this.videoElement != null &&
      this.faceLock === false &&
      this.enableFaceDetection === true
    ) {
      this.faceLock = true;
      this.face_t();
    }

    if (
      this.videoElement != null &&
      this.poseLock === false &&
      this.enablePoseDetection === true
    ) {
      this.poseLock = true;
      this.pose_t();
    }
  }
}
