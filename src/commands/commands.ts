import {
  Button,
  Point,
  Region,
  down,
  left,
  mouse,
  right,
  straightTo,
  up,
  screen,
} from "@nut-tree/nut-js";
import Jimp from "jimp";
import { commandsType } from "../types";
import drawCircle from "../utils/drawCircle";
import getPosition from "../utils/getPosition";

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
    const [x, y] = await getPosition();
    return `${command} ${x},${y}`;
  },

  async draw_rectangle(command, value1, value2) {
    const step1 = Number(value1);
    const step2 = Number(value2);
    const [x1, y1] = await getPosition();
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
    return await this.draw_rectangle(command, value1, value1);
  },
  async draw_circle(command, value1, value2) {
    const radix = Number(value1);
    const [x1, y1] = await getPosition();
    mouse.config.mouseSpeed = 500;
    await mouse.pressButton(Button.LEFT);
    await drawCircle(x1, y1, radix);
    await mouse.releaseButton(Button.LEFT);
    return `${command}`;
  },
  async prnt_scrn(command, value1, value2) {
    const step = 200;
    const [x1, y1] = await getPosition();

    try {
      const region = new Region(x1, y1, step, step);
      const image = await (await screen.grabRegion(region)).toRGB();
      const jimp = new Jimp({
        data: image.data,
        width: image.width,
        height: image.height,
      });
      const base64Buffer = await jimp.getBufferAsync(Jimp.MIME_PNG);
      const base64 = base64Buffer.toString("base64");
      return `${command} ${base64}`;
    } catch (e) {
      console.log("Error: Screenshot area is out of screen");
      return `${command}`;
    }
  },
};

export default commands;
