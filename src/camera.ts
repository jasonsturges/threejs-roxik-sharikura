import { IcosahedronGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, Vector3 } from "three";
import { models } from "./scene.ts";

export const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.001, 1000);

let targetModel: Mesh<IcosahedronGeometry, MeshPhongMaterial>;
let frame = 1000;
let sceneLimit = 90;
let target = new Vector3(0, 0, 0);
let cs = 0;
let gy = 0;
let l = 0;
let bl = 6;
let ts = 0;
let r = 0;
let rp = 0.03;

export const cameraFrameHandler = () => {
  if (++frame > sceneLimit) {
    frame = 0;
    sceneLimit = Math.floor(Math.random() * 60 + 30);
    targetModel = models[Math.floor(Math.random() * models.length)];
    ts = 0;
    cs = 0;
    gy = Math.random() * 8 - 4;
    rp = Math.random() * 0.06 - 0.03;
    bl = Math.random() * 4 + 7;
  }

  if (ts < 0.05) ts += 0.005;
  if (cs < 0.5) cs += 0.005;

  target.x += (targetModel.position.x - target.x) * ts;
  target.y += (targetModel.position.y - target.y) * ts;
  target.z += (targetModel.position.z - target.z) * ts;

  camera.lookAt(target);

  r += rp;
  l += (bl - l) * 0.1;

  camera.position.x += (Math.cos(r) * l + targetModel.position.x - camera.position.x) * cs;
  camera.position.y += (targetModel.position.y + gy - camera.position.y) * cs;
  camera.position.z += (Math.sin(r) * l + targetModel.position.z - camera.position.z) * cs;
};
