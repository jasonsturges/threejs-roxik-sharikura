import { MotionType } from "./MotionType";
import { changeMotion } from "./motion";

const keydownHandler = (event: KeyboardEvent) => {
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
      changeMotion(MotionType.LINE, 90);
      break;
    case "5":
      changeMotion(MotionType.PLANE, 90);
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
