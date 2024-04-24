romPalette = [0x2b0f54, 0xab1f65, 0xff4f69, 0xff8142, 0xffda45, 0x3368dc, 0x49e7ec, 0xfff7f8]; // https://lospec.com/palette-list/funkyfuture-8 (reordered)

const sin = Math.sin;
const cos = Math.cos;
let angle = 0;

function romInit() {}

function romLoop() {
  clearGfx();
  angle += 0.01;
  const points = [];
  for (let x = -3; x < 4; x += 2) {
    for (let y = -3; y < 4; y += 2) {
      for (let z = -3; z < 4; z += 2) {
        const point = rotateX(rotateY(rotateZ({ x: x, y: y, z: z}, angle), angle), angle);
        point.z += 70;
        points.push(point);
      }
    }
  }
  points.sort((a, b) => b.z - a.z); // sort by z value descending (z values increase heading "into" the screen)
  points.forEach(point => {
    const baseColor = Math.floor(Math.abs((sin(point.x / 16 + angle) + sin(point.y / 16 + angle)) * 8)) % 3; // base color index of 0/1/2
    for (let i = 0; i < 2; i++) {
      const x = 32 + 400 * point.x / point.z - i;
      const y = 32 + 400 * point.y / point.z - i;
      const r = 2 - i;
      const c = (baseColor * 2 + 1 + i) // 1/3/5 for "main" circle & 2/4/6 for "highlight" circle
      drawCircle(x, y, r, c, c);
    }
  });
}

const rotateY = (p, angle) => ({ x: p.x * cos(angle) - p.z * sin(angle), y: p.y, z: p.x * sin(angle) + p.z * cos(angle) });
const rotateX = (p, angle) => ({ x: p.x, y: p.y * cos(angle) - p.z * sin(angle), z: p.y * sin(angle) + p.z * cos(angle) });
const rotateZ = (p, angle) => ({ x: p.x * cos(angle) - p.y * sin(angle), y: p.x * sin(angle) + p.y * cos(angle), z: p.z });
