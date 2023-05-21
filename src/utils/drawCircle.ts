import { Point, mouse, straightTo } from "@nut-tree/nut-js";

const drawCircle = async (x1: number, y1: number, radix: number) => {
  const oneDegreeRad = +(Math.PI / 180).toFixed(5);

  for (let i = 1; i <= 360; i++) {
    const degree = oneDegreeRad * i;
    const stepY = Math.sin(degree) * radix;
    const stepX = Math.cos(+degree) * radix;
    const y2 = y1 - stepY;
    const x2 = x1 + radix - stepX;
    const point = new Point(x2, y2);
    await mouse.move(straightTo(point));
  }
};

export default drawCircle;
