import { IcosahedronGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";
import { MotionData } from "./MotionData.ts";
import { MotionType } from "./MotionType";
import { models } from "./scene.ts";

let motionType = MotionType.CUBE;
let sceneLimit = 100;
let frameNumber = 0;
let cutoff = 0;
let waveRadius = 0.0;
let waveRadiusInitial = 0.0;
let waveRadiusIncrement = 0.0;
let waveLength = 0.0;

export const changeMotion = (motionType: MotionType, limit = -1) => {
  cutoff = 0;
  frameNumber = 0;

  if (limit < 0) {
    sceneLimit = Math.floor(Math.random() * 140 + 3);
  } else {
    sceneLimit = limit;
  }

  switch (motionType) {
    case MotionType.ANTIGRAVITY:
      antigravity();
      break;
    case MotionType.CUBE:
      cube();
      break;
    case MotionType.CYLINDER:
      cylinder();
      break;
    case MotionType.GRAVITY:
      gravity();
      break;
    case MotionType.SPHERE:
      sphere();
      break;
    case MotionType.LINE:
      line();
      break;
    case MotionType.PLANE:
      plane();
      break;
    default:
      console.error(`Invalid motion type: ${motionType}`);
      break;
  }
};

const antigravity = () => {
  motionType = MotionType.ANTIGRAVITY;

  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    m.speed = 0;
    m.accel = 0.5;
    m.animate = false;
    m.dir = new Vector3();

    m.dir.x = Math.random() * 0.25 - 0.125;
    m.dir.y = Math.random() * 0.25 - 0.125;
    m.dir.z = Math.random() * 0.25 - 0.125;
  }
};

const cube = () => {
  motionType = MotionType.CUBE;

  const a = Math.random() * 0.05 + 0.022;
  const l = Math.cbrt(models.length);
  let n = 0;

  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      for (let k = 0; k < l; k++) {
        const m = models[n++];
        m.speed = 0;
        m.accel = a;
        m.animate = false;
        m.dest = new Vector3();

        m.dest.x = i * 0.8 + -(l - 1) * 0.8 * 0.5;
        m.dest.y = j * 0.8 + -(l - 1) * 0.8 * 0.5;
        m.dest.z = k * 0.8 + -(l - 1) * 0.8 * 0.5;
      }
    }
  }
};

const cylinder = () => {
  motionType = MotionType.CYLINDER;

  let n = 0;
  let r = (Math.PI * 2) / models.length;
  let d = r * Math.floor(Math.random() * 40 + 1);

  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    m.speed = 0;
    m.accel = Math.random() * 0.05 + 0.022;
    m.animate = false;
    m.dest = new Vector3();

    if (i < models.length - 50) {
      m.dest.x = Math.cos(n) * 4;
      m.dest.y = i * 0.008 - (models.length - 50) * 0.004;
      m.dest.z = Math.sin(n) * 4;
    } else {
      m.dest.x = Math.random() * 14 - 7;
      m.dest.y = Math.random() * 14 - 7;
      m.dest.z = Math.random() * 14 - 7;
    }

    n = n + d;
  }
};

const gravity = () => {
  motionType = MotionType.GRAVITY;
  sceneLimit = 60;

  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    m.dir = new Vector3();

    m.speed = 0;
    m.accel = 0.5;
    m.animate = false;
    m.dir.y = Math.random() * -0.2;
  }
};

const sphere = () => {
  motionType = MotionType.SPHERE;

  let s = 0;
  let c = 0;
  const r = (Math.PI * 2) / models.length;
  const d = r * Math.floor(Math.random() * 40 + 1);
  const d2 = Math.random() * 5 + 3;

  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    m.speed = 0;
    m.accel = Math.random() * 0.05 + 0.022;
    m.animate = false;
    m.dest = new Vector3();

    const d1 = Math.cos(s) * d2;

    if (Math.random() > 0.06) {
      m.dest.x = Math.cos(c) * d1;
      m.dest.y = Math.sin(s) * d2;
      m.dest.z = Math.sin(c) * d1;
    } else {
      m.dest.x = Math.random() * 7 - 7;
      m.dest.y = Math.random() * 7 - 7;
      m.dest.z = Math.random() * 7 - 7;
    }

    s = s + r;
    c = c + d;
  }
};

const line = () => {
  motionType = MotionType.LINE;

  const a = Math.random() * 0.05 + 0.022;
  const v = Math.random() * 0.025 + 0.02;
  const dx = -v * models.length * 0.44;
  const d = Math.random() + 1.2;

  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    m.speed = 0;
    m.accel = a;
    m.animate = false;
    m.dest = new Vector3();

    if (Math.random() > 0.05) {
      m.dest.x = i * v + dx;
      m.dest.y = Math.random() * d - d * 0.5;
      m.dest.z = Math.random() * d - d * 0.5;
    } else {
      m.dest.x = Math.random() * 14 - 7;
      m.dest.y = Math.random() * 14 - 7;
      m.dest.z = Math.random() * 14 - 7;
    }
  }
};

const plane = () => {
  motionType = MotionType.PLANE;

  const a = Math.random() * 0.05 + 0.022;
  const l = Math.floor(Math.sqrt(models.length));
  const d = -(l - 1) * 0.55 * 0.5;
  const t = Math.random() * 0.3 + 0.05;
  const s = Math.random() + 1;
  let m;
  let n = 0;
  waveRadius = 0;
  waveRadiusInitial = 0;
  waveLength = Math.random() + 1;
  waveRadiusIncrement = Math.random() * 0.3 + 0.1;

  for (let i = 0; i < l; i++) {
    const ty = Math.cos(waveRadius) * s;
    waveRadius += t;

    for (let j = 0; j < l; j++) {
      n += 1;
      m = models[n - 1];
      m.speed = 0;
      m.accel = a;
      m.animate = false;
      m.dest = new Vector3();
      m.dir = new Vector3();

      m.dir.x = m.dir.y = m.dir.z = 0;
      m.dest.x = i * 0.55 + d;
      m.dest.y = ty;
      m.dest.z = j * 0.55 + d;
    }
  }

  while (n < models.length) {
    m = models[n];
    m.speed = 0;
    m.accel = a;
    m.animate = false;
    m.dest = new Vector3();

    m.dest.x = Math.random() * 14 - 7;
    m.dest.y = Math.random() * 14 - 7;
    m.dest.z = Math.random() * 14 - 7;
    n++;
  }
};

export const motionFrameHandler = () => {
  let m: Mesh<IcosahedronGeometry, MeshPhongMaterial> & MotionData;
  let maxp: number;

  switch (motionType) {
    case MotionType.CUBE:
    case MotionType.CYLINDER:
    case MotionType.SPHERE:
    case MotionType.LINE:
      for (let i = 0; i < cutoff; i++) {
        m = models[i];

        if (!m.animate) {
          if (m.speed < 0.8) {
            m.speed = m.speed + m.accel;
          }

          let c0 = m.dest.x - m.position.x;
          let c1 = m.dest.y - m.position.y;
          let c2 = m.dest.z - m.position.z;
          m.position.x = m.position.x + c0 * m.speed;
          m.position.y = m.position.y + c1 * m.speed;
          m.position.z = m.position.z + c2 * m.speed;
          if (Math.abs(c0) < 0.05 && Math.abs(c1) < 0.05 && Math.abs(c2) < 0.05) {
            m.animate = true;
            m.position.x = m.dest.x;
            m.position.y = m.dest.y;
            m.position.z = m.dest.z;
          }
        }
      }

      maxp = Math.floor(models.length / 40);
      cutoff += maxp;
      if (cutoff > models.length) cutoff = models.length;

      break;

    case MotionType.ANTIGRAVITY:
      for (let i = 0; i < cutoff; i++) {
        m = models[i];
        m.position.x += m.dir.x;
        m.position.y += m.dir.y;
        m.position.z += m.dir.z;
      }

      cutoff += 30;
      if (cutoff > models.length) {
        cutoff = models.length;
      }

      break;

    case MotionType.GRAVITY:
      for (let i = 0; i < models.length; i++) {
        m = models[i];
        m.position.y += m.dir.y;
        m.dir.y -= 0.06;
        if (m.position.y < -9) {
          m.position.y = -9;
          m.dir.y *= -m.accel;
          m.accel *= 0.9;
        }
      }

      break;

    case MotionType.PLANE:
      let cos = 0;
      let max = Math.floor(Math.sqrt(models.length));
      let cc = 0;

      for (let i = 0; i < max; i++) {
        cos = Math.cos(waveRadius) * waveLength;
        waveRadius = waveRadius + waveRadiusIncrement;
        for (let j = 0; j < max; j++) {
          m = models[cc++];
          m.dest.y = cos;
        }
      }

      waveRadiusInitial += 0.11;
      waveRadius = waveRadiusInitial;

      for (let i = 0; i < cutoff; i++) {
        m = models[i];
        if (m.speed < 0.5) {
          m.speed += m.accel;
        }

        m.position.x += (m.dest.x - m.position.x) * m.speed;
        m.position.y += (m.dest.y - m.position.y) * m.speed;
        m.position.z += (m.dest.z - m.position.z) * m.speed;
      }

      maxp = Math.floor(models.length / 40);
      cutoff += maxp;

      if (cutoff > models.length) {
        cutoff = models.length;
      }

      break;
  }

  if (++frameNumber > sceneLimit) {
    changeMotion(Math.floor(Math.random() * 7));
  }
};
