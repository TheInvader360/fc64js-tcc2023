romPalette = [0x222222, 0xffff00, 0x1fd655, 0x5ced73, 0xff0000, 0xa020f0, 0x964b00, 0xffffff];
const palette = { grey: 0, yellow: 1, darkGreen: 2, lightGreen: 3, red: 4, purple: 5, brown: 6, white: 7 };
const model = [];
const randomDecoration = () => Math.random() < 0.5 ? palette.red : palette.purple;
const randomGreen = () => Math.random() < 0.75 ? palette.darkGreen : palette.lightGreen;
const rotateY = (p, angle) => ({ x: p.x * Math.cos(angle) - p.z * Math.sin(angle), y: p.y, z: p.x * Math.sin(angle) + p.z * Math.cos(angle), c: p.c });
let angle = 0;

function romInit() {
  model.push({ x:  0, y:-10, z: 0, c: palette.yellow });
  model.push({ x: -1, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  1, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -8, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -7, z: 0, c: palette.darkGreen });
  for (let i = 1; i < 5; i++) {         // four sections...
    for (let j = 0; j < 3; j++) {       // ...each one being three units high...
      for (let k = -i; k <= i; k++) {   // ...widening on the x-axis on each step...
        for (let l = -i; l <= i; l++) { // ...and also on the z-axis :)
          const x = k;
          const y = -9 + i*3 + j;
          const z = l;
          const isDecoration = (x + z) % 2 === 0 ? j % 3 === 1 : j % 3 === 2;
          const c = isDecoration ? randomDecoration(): randomGreen();
          model.push({ x: x, y: y, z: z, c: c });
        }
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    model.push({ x: 0, y: 6 + i, z: 0, c: palette.brown });
  }
}

function romLoop() {
  clearGfx();
  angle += 0.06;
  const points = [];
  model.forEach(mp => {
    const point = rotateY({ x: mp.x, y: mp.y, z: mp.z, c: mp.c}, angle);
    point.z += 135;
    points.push(point);
  });
  points.sort((a, b) => b.z - a.z); // sort by z value descending (z values increase heading "into" the screen)
  points.forEach(p => drawRectangle(Math.round(32 + 400 * p.x / p.z), Math.round(32 + 400 * p.y / p.z), 3, 3, p.c, p.c));
  drawText(0, 0, `FPS:${getFps()}`, palette.white);
}
