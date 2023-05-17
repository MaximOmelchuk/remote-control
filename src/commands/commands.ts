import { down, left, mouse, right, up } from "@nut-tree/nut-js";

type methodsArgs = {
  command: string;
  value1: string;
  value2: string | undefined;
};

type commandsMethod = {
  (
    command: string,
    value1: string,
    value2: string | undefined
  ): Promise<string>;
};
type comandsType = {
  [key: string]: commandsMethod;
};

const commands: comandsType = {
  async mouse_up(command, value1, value2) {
    await mouse.move(up(+value1));
    return `${command}`;
  },
  async mouse_down(command, value1, value2) {
    await mouse.move(down(+value1));
    return `${command}`;
  },
  async mouse_left(command, value1, value2) {
    await mouse.move(left(+value1));
    return `${command}`;
  },
  async mouse_right(command, value1, value2) {
    await mouse.move(right(+value1));
    return `${command}`;
  },
  async mouse_position(command, value1, value2) {
    const position = await mouse.getPosition();
    return `mouse_position ${position.x},${position.y}`;
  },
};

type commandsKeyType = keyof typeof commands;

export { commands, commandsKeyType };
