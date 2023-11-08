import { WebGLRenderer } from "three";
import { camera, cameraFrameHandler } from "./camera.ts";
import { motionFrameHandler } from "./motion.ts";
import { scene } from "./scene.ts";

const el = document.querySelector<HTMLCanvasElement>("canvas");
export const renderer = new WebGLRenderer({ antialias: true, canvas: el! });

renderer.setAnimationLoop(() => {
  cameraFrameHandler();
  motionFrameHandler();
  renderer.render(scene, camera);
});
