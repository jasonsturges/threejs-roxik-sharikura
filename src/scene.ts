import {
  BoxGeometry,
  Color,
  DirectionalLight,
  HemisphereLight,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Scene,
} from "three";
import { MotionData } from "./MotionData.ts";

// Scene
export const scene = new Scene();
scene.background = new Color(0xfefefe);

// Lights
const directionalLight = new DirectionalLight(0x9090aa);
directionalLight.position.set(-10, 10, -10).normalize();
scene.add(directionalLight);

const hemisphereLight = new HemisphereLight(0xffffff, 0x444444);
hemisphereLight.position.set(1, 1, 1);
scene.add(hemisphereLight);

// Materials
const colors = [0x97350b, 0x266ea5, 0x00847f, 0x2f818e, 0x08917c, 0x08917c, 0x6b458c, 0x7a4526];
const sphereMaterials: MeshPhongMaterial[] = [];

for (let i = 0; i < colors.length; i++) {
  const material = new MeshPhongMaterial({
    color: colors[i],
    specular: colors[i],
    shininess: 16,
  });

  sphereMaterials.push(material);
}

const cubeMaterial = new MeshBasicMaterial({
  color: 0xdddddd,
  wireframe: true,
});

// Geometry
const length = 8;
const bet = 0.8;
const offset = (length - 1) * bet * 0.5;
const geometry = new IcosahedronGeometry(0.3, 2);

export const models: (Mesh<IcosahedronGeometry, MeshPhongMaterial> & MotionData)[] = [];

for (let i = 0; i < length; i++) {
  for (let j = 0; j < length; j++) {
    for (let k = 0; k < length; k++) {
      const material = sphereMaterials[Math.floor(Math.random() * 8)];
      const mesh = new Mesh(geometry, material);
      mesh.position.set(i * bet - offset, j * bet - offset, k * bet - offset);

      models.push(mesh as Mesh<IcosahedronGeometry, MeshPhongMaterial> & MotionData);
      scene.add(mesh);
    }
  }
}

const cube = new BoxGeometry(18, 18, 18, 4, 4, 4);
const cubeMesh = new Mesh(cube, cubeMaterial);
scene.add(cubeMesh);
