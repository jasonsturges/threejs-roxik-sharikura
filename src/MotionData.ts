import { Vector3 } from "three";

export type MotionData = {
  animate: boolean;
  dest: Vector3;
  dir: Vector3;
  accel: number;
  speed: number;
};
