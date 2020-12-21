import { changeMotion } from "./motion";
import { MotionType } from "./MotionType";

const keydownHandler = (event) => {
  const keyCode = event.key;

  switch (keyCode) {
    case "1":
      changeMotion(MotionType.CYLINDER, 90);
      break;
    case "2":
      changeMotion(MotionType.SPHERE, 90);
      break;
    case "3":
      changeMotion(MotionType.CUBE, 90);
      break;
    case "4":
      changeMotion(MotionType.TUBE, 90);
      break;
    case "5":
      changeMotion(MotionType.WAVE, 90);
      break;
    case "6":
      changeMotion(MotionType.GRAVITY, 90);
      break;
    case "7":
      changeMotion(MotionType.ANTIGRAVITY, 90);
      break;
  }
};

document.addEventListener("keydown", keydownHandler);
