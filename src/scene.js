import * as THREE from "three";
import { stepCamera } from "./camera";
import { changeMotion, MotionType, stepMotion } from "./motion";
import "./keyboard";

let renderer;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfefefe);

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);
camera.position.set(2, 2, -2);

const directionalLight = new THREE.DirectionalLight(0x9090aa);
directionalLight.position.set(-10, 10, -10).normalize();
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemisphereLight.position.set(1, 1, 1);
scene.add(hemisphereLight);

const colors = [
  0x97350b,
  0x266ea5,
  0x00847f,
  0x2f818e,
  0x08917c,
  0x08917c,
  0x6b458c,
  0x7a4526,
];

const sphereMaterials = [];

for (let i = 0; i < colors.length; i++) {
  const material = new THREE.MeshPhongMaterial({
    color: colors[i],
    specular: colors[i],
    shininess: 16,
  });

  sphereMaterials.push(material);
}

export const models = [];

const bet = 0.7;
const offset = (8 - 1) * bet * 0.5;
const geometry = new THREE.IcosahedronBufferGeometry(0.3, 2);
const length = 8;

for (let i = 0; i < length; i++) {
  for (let j = 0; j < length; j++) {
    for (let k = 0; k < length; k++) {
      const material = sphereMaterials[Math.floor(Math.random() * 8)];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(i * bet - offset, j * bet - offset, k * bet - offset);

      models.push(mesh);
      scene.add(mesh);
    }
  }
}

const cube = new THREE.BoxGeometry(18, 18, 18, 4, 4, 4);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xdddddd,
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cube, cubeMaterial);
scene.add(cubeMesh);

changeMotion(MotionType.CUBE);

export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  resize();
  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  stepCamera(camera);
  stepMotion();
  renderer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener("resize", resize);
