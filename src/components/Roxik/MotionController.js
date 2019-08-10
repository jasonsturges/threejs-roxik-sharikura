import * as THREE from 'three';

export default class MotionController {

  static CYLINDER = 0;
  static SPHERE = 1;
  static CUBE = 2;
  static TUBE = 3;
  static WAVE = 4;
  static GRAVITY = 5;
  static ANTIGRAVITY = 6;

  models = [];
  scene = MotionController.CYLINDER;
  sceneLimit = 100;
  frame = 0;
  cutoff = 0;
  r = 0.0;
  r0 = 0.0;
  rp = 0.0;
  rl = 0.0;


  changeScene(scene, limit = -1) {
    this.cutoff = 0;
    this.scene = scene;
    this.frame = 0;

    if (limit < 0) {
      this.sceneLimit = Math.floor((Math.random() * 140) + 3)
    } else {
      this.sceneLimit = limit;
    }

    switch (this.scene) {
      case MotionController.CYLINDER:
        this.cylinder();
        break;
      case MotionController.SPHERE:
        this.sphere();
        break;
      case MotionController.CUBE:
        this.cube();
        break;
      case MotionController.TUBE:
        this.tube();
        break;
      case MotionController.WAVE:
        this.wave();
        break;
      case MotionController.GRAVITY:
        this.gravity();
        break;
      case MotionController.ANTIGRAVITY:
        this.antigravity();
        break;
    }
  }

  cylinder() {
    let n = 0;
    let r = ((Math.PI * 2) / this.models.length);
    let d = (r * (Math.floor((Math.random() * 40) + 1)));

    for (let i = 0; i < this.models.length; i++) {
      const m = this.models[i];
      m.speed = 0;
      m.accel = ((Math.random() * 0.05) + 0.022);
      m.animate = false;
      m.dest = new THREE.Vector3();

      if (i < (this.models.length - 50)) {
        m.dest.x = (Math.cos(n) * 4);
        m.dest.y = ((i * 0.008) - ((this.models.length - 50) * 0.004));
        m.dest.z = (Math.sin(n) * 4);
      } else {
        m.dest.x = ((Math.random() * 14) - 7);
        m.dest.y = ((Math.random() * 14) - 7);
        m.dest.z = ((Math.random() * 14) - 7);
      }

      n = (n + d);
    }
  }

  sphere() {
    let s = 0;
    let c = 0;
    const r = ((Math.PI * 2) / this.models.length);
    const d = r * (Math.floor((Math.random() * 40) + 1));
    const d2 = (Math.random() * 5) + 3;

    for (let i = 0; i < this.models.length; i++) {
      const m = this.models[i];
      m.speed = 0;
      m.accel = (Math.random() * 0.05) + 0.022;
      m.animate = false;
      m.dest = new THREE.Vector3();

      const d1 = (Math.cos(s) * d2);

      if (Math.random() > 0.06) {
        m.dest.x = Math.cos(c) * d1;
        m.dest.y = Math.sin(s) * d2;
        m.dest.z = Math.sin(c) * d1;
      } else {
        m.dest.x = (Math.random() * 7) - 7;
        m.dest.y = (Math.random() * 7) - 7;
        m.dest.z = (Math.random() * 7) - 7;
      }

      s = s + r;
      c = c + d;
    }
  }

  cube() {
    const a = ((Math.random() * 0.05) + 0.022);
    let n = 0;
    let l = 1;

    while (true) {
      if (((l * l) * l) > this.models.length) {
        l--;
        break;
      }

      l++;
    }

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l; j++) {
        for (let k = 0; k < l; k++) {
          const m = this.models[n++];
          m.speed = 0;
          m.accel = a;
          m.animate = false;
          m.dest = new THREE.Vector3();

          m.dest.x = ((i * 0.8) + ((-((l - 1)) * 0.8) * 0.5));
          m.dest.y = ((j * 0.8) + ((-((l - 1)) * 0.8) * 0.5));
          m.dest.z = ((k * 0.8) + ((-((l - 1)) * 0.8) * 0.5));
        }
      }
    }
  }

  tube() {
    const a = ((Math.random() * 0.05) + 0.022);
    const v = (0.02 + (Math.random() * 0.025));
    const dx = ((-(v) * this.models.length) * 0.44);
    const d = (1.2 + (Math.random()));

    for (let i = 0; i < this.models.length; i++) {
      const m = this.models[i];
      m.speed = 0;
      m.accel = a;
      m.animate = false;
      m.dest = new THREE.Vector3();

      if (Math.random() > 0.05) {
        m.dest.x = ((i * v) + dx);
        m.dest.y = ((Math.random() * d) - (d * 0.5));
        m.dest.z = ((Math.random() * d) - (d * 0.5));
      } else {
        m.dest.x = ((Math.random() * 14) - 7);
        m.dest.y = ((Math.random() * 14) - 7);
        m.dest.z = ((Math.random() * 14) - 7);
      }
    }
  }

  wave() {
    const a = (Math.random() * 0.05) + 0.022;
    const l = Math.floor(Math.sqrt(this.models.length));
    const d = ((-((l - 1)) * 0.55) * 0.5);
    const t = (Math.random() * 0.3) + 0.05;
    const s = Math.random() + 1;
    let m;
    let n = 0;
    this.r = 0;
    this.r0 = 0;
    this.rl = Math.random() + 1;
    this.rp = (Math.random() * 0.3) + 0.1;

    for (let i = 0; i < l; i++) {
      const ty = Math.cos(this.r) * s;
      this.r += t;

      for (let j = 0; j < l; j++) {
        n += 1;
        m = this.models[n - 1];
        m.speed = 0;
        m.accel = a;
        m.animate = false;
        m.dest = new THREE.Vector3();
        m.dir = new THREE.Vector3();

        m.dir.x = (m.dir.y = (m.dir.z = 0));
        m.dest.x = ((i * 0.55) + d);
        m.dest.y = ty;
        m.dest.z = ((j * 0.55) + d);
      }
    }

    while (n < this.models.length) {
      m = this.models[n];
      m.speed = 0;
      m.accel = a;
      m.animate = false;
      m.dest = new THREE.Vector3();

      m.dest.x = ((Math.random() * 14) - 7);
      m.dest.y = ((Math.random() * 14) - 7);
      m.dest.z = ((Math.random() * 14) - 7);
      n++;
    }
  }

  gravity() {
    this.sceneLimit = 60;

    for (let i = 0; i < this.models.length; i++) {
      const m = this.models[i];
      m.dir = new THREE.Vector3();

      m.speed = 0;
      m.accel = 0.5;
      m.animate = false;
      m.dir.y = (Math.random() * -0.2);
    }
  }

  antigravity() {
    for (let i = 0; i < this.models.length; i++) {
      const m = this.models[i];
      m.speed = 0;
      m.accel = 0.5;
      m.animate = false;
      m.dir = new THREE.Vector3();

      m.dir.x = ((Math.random() * 0.25) - 0.125);
      m.dir.y = ((Math.random() * 0.25) - 0.125);
      m.dir.z = ((Math.random() * 0.25) - 0.125);
    }
  }

  step() {
    let m = null;
    let maxp = null;

    switch (this.scene) {
      case MotionController.CYLINDER:
      case MotionController.SPHERE:
      case MotionController.CUBE:
      case MotionController.TUBE:
        for (let i = 0; i < this.cutoff; i++) {
          m = this.models[i];

          if (!m.animate) {
            if (m.speed < 0.8) {
              m.speed = (m.speed + m.accel);
            }

            let c0 = (m.dest.x - m.position.x);
            let c1 = (m.dest.y - m.position.y);
            let c2 = (m.dest.z - m.position.z);
            m.position.x = (m.position.x + (c0 * m.speed));
            m.position.y = (m.position.y + (c1 * m.speed));
            m.position.z = (m.position.z + (c2 * m.speed));
            if ((((((Math.abs(c0) < 0.05)) && ((Math.abs(c1) < 0.05)))) && ((Math.abs(c2) < 0.05)))) {
              m.animate = true;
              m.position.x = m.dest.x;
              m.position.y = m.dest.y;
              m.position.z = m.dest.z;
            }
          }
        }

        maxp = Math.floor(this.models.length / 40);
        this.cutoff += maxp;
        if (this.cutoff > this.models.length)
          this.cutoff = this.models.length;

        break;

      case MotionController.WAVE:
        let cos = 0;
        let max = Math.floor(Math.sqrt(this.models.length));
        let cc = 0;

        for (let i = 0; i < max; i++) {
          cos = (Math.cos(this.r) * this.rl);
          this.r = (this.r + this.rp);
          for (let j = 0; j < max; j++) {
            m = this.models[cc++];
            m.dest.y = cos;
          }
        }

        this.r0 += 0.11;
        this.r = this.r0;

        for (let i = 0; i < this.cutoff; i++) {
          m = this.models[i];
          if (m.speed < 0.5) {
            m.speed += m.accel;
          }

          m.position.x = (m.position.x + ((m.dest.x - m.position.x) * m.speed));
          m.position.y = (m.position.y + ((m.dest.y - m.position.y) * m.speed));
          m.position.z = (m.position.z + ((m.dest.z - m.position.z) * m.speed));
        }

        maxp = Math.floor(this.models.length / 40);
        this.cutoff += maxp;
        if (this.cutoff > this.models.length)
          this.cutoff = this.models.length;

        break;

      case MotionController.GRAVITY:
        for (let i = 0; i < this.models.length; i++) {
          m = this.models[i];
          m.position.y = m.position.y + m.dir.y;
          m.dir.y = m.dir.y - 0.06;
          if (m.position.y < -9) {
            m.position.y = -9;
            m.dir.y = (m.dir.y * -(m.accel));
            m.accel = (m.accel * 0.9);
          }
        }

        break;

      case MotionController.ANTIGRAVITY:
        for (let i = 0; i < this.cutoff; i++) {
          m = this.models[i];
          m.position.x = m.position.x + m.dir.x;
          m.position.y = m.position.y + m.dir.y;
          m.position.z = m.position.z + m.dir.z;
        }

        this.cutoff += 30;
        if (this.cutoff > this.models.length)
          this.cutoff = this.models.length;

        break;
    }


    if (++this.frame > this.sceneLimit)
      this.changeScene(Math.floor(Math.random() * 7));
  }
}
