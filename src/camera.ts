import { IcosahedronGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, Vector3 } from "three";
import { models } from "./scene.ts";

export const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.001, 1000);

let targetModel: Mesh<IcosahedronGeometry, MeshPhongMaterial>;
let sceneLimit = 90;
let frame = 1000;
let speed = 0;
let offset = 0;
let distance = 6;
let targetDistance = 0;
let targetPosition = new Vector3(0, 0, 0);
let targetSpeed = 0;
let rotationAngle = 0;
let rotationSpeed = 0.03;

export const cameraFrameHandler = () => {
  if (++frame > sceneLimit) {
    frame = 0;
    sceneLimit = Math.floor(Math.random() * 60 + 30);
    targetModel = models[Math.floor(Math.random() * models.length)];
    targetSpeed = 0;
    speed = 0;
    offset = Math.random() * 8 - 4;
    rotationSpeed = Math.random() * 0.06 - 0.03;
    distance = Math.random() * 4 + 7;
  }

  if (targetSpeed < 0.05) targetSpeed += 0.005;
  if (speed < 0.5) speed += 0.005;

  targetPosition.x += (targetModel.position.x - targetPosition.x) * targetSpeed;
  targetPosition.y += (targetModel.position.y - targetPosition.y) * targetSpeed;
  targetPosition.z += (targetModel.position.z - targetPosition.z) * targetSpeed;

  camera.lookAt(targetPosition);

  rotationAngle += rotationSpeed;
  targetDistance += (distance - targetDistance) * 0.1;

  camera.position.x += (Math.cos(rotationAngle) * targetDistance + targetModel.position.x - camera.position.x) * speed;
  camera.position.y += (targetModel.position.y + offset - camera.position.y) * speed;
  camera.position.z += (Math.sin(rotationAngle) * targetDistance + targetModel.position.z - camera.position.z) * speed;
};
