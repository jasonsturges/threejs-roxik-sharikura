import { renderer } from "./renderer.ts";
import { camera } from "./camera.ts";

export const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener("resize", resize);
