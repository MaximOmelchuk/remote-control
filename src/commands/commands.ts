import {
  Button,
  Point,
  down,
  left,
  mouse,
  right,
  straightTo,
  up,
} from "@nut-tree/nut-js";

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
type commandsType = {
  [key: string]: commandsMethod;
};

const commands: commandsType = {
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
  async draw_circle(command, value1, value2) {
    const position = await mouse.getPosition();
    return `draw_circle ${position.x}`;
  },
  async draw_rectangle(command, value1, value2) {
    const step1 = Number(value1);
    const step2 = Number(value2);
    const position = await mouse.getPosition();
    const x1 = position.x;
    const y1 = position.y;
    mouse.config.mouseSpeed = 100;
    const point1 = new Point(x1, y1 - step2);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(straightTo(point1));
    const point2 = new Point(x1 + step1, y1 - step2);
    await mouse.move(straightTo(point2));
    const point3 = new Point(x1 + step1, y1);
    await mouse.move(straightTo(point3));
    const point4 = new Point(x1, y1);
    await mouse.move(straightTo(point4));
    await mouse.releaseButton(Button.LEFT);
    return `${command}`;
  },
  async draw_square(command, value1, value2) {
    return await this.draw_rectangle(command, value1, value1)
  },
};

type commandsKeyType = keyof typeof commands;

export { commands, commandsKeyType };
