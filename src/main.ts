import { MotionType } from "./MotionType.ts";
import { changeMotion } from "./motion.ts";
import { resize } from "./resize.ts";
import "./interaction.ts";
import "./style.css";

changeMotion(MotionType.CUBE);
resize();
