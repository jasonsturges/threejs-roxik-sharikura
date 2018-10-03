import * as THREE from 'three';

export default class CameraController {

  constructor() {
    this.camera = null;
    this.models = [];

    this.frame = 1000;
    this.sceneLimit = 90;
    this.tm;
    this.target = new THREE.Vector3(0, 0, 0);
    this.cs = 0;
    this.gy = 0;
    this.l = 0;
    this.bl = 6;
    this.ts = 0;
    this.r = 0;
    this.rp = 0.03;
  }

  step() {
    if (++this.frame > this.sceneLimit) {
      this.frame = 0;
      this.sceneLimit = Math.floor((Math.random() * 60) + 30);
      this.tm = this.models[Math.floor(Math.random() * this.models.length)];
      this.ts = 0;
      this.cs = 0;
      this.gy = ((Math.random() * 8) - 4);
      this.rp = ((Math.random() * 0.06) - 0.03);
      this.bl = ((Math.random() * 4) + 7);
    }

    if (this.ts < 0.05) {
      this.ts += 0.005;
    }

    if (this.cs < 0.5) {
      this.cs += 0.005;
    }

    this.target.x += ((this.tm.position.x - this.target.x) * this.ts);
    this.target.y += ((this.tm.position.y - this.target.y) * this.ts);
    this.target.z += ((this.tm.position.z - this.target.z) * this.ts);

    this.camera.lookAt(this.target);

    this.r += this.rp;
    this.l += ((this.bl - this.l) * 0.1);
    this.camera.position.x += ((((Math.cos(this.r) * this.l) + this.tm.position.x) - this.camera.position.x) * this.cs);
    this.camera.position.y += (((this.tm.position.y + this.gy) - this.camera.position.y) * this.cs);
    this.camera.position.z += ((((Math.sin(this.r) * this.l) + this.tm.position.z) - this.camera.position.z) * this.cs);
  }
}