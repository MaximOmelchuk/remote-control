import { mouse } from "@nut-tree/nut-js";

const getPosition = async () => {
  const position = await mouse.getPosition();
  return [position.x, position.y];
};

export default getPosition;
