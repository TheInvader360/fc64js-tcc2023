romPalette = [0xff4400, 0xffa600, 0xfeff00, 0x70ff00, 0x00ffda, 0x0079ff, 0xd100ff, 0x000080]; // red, orange, yellow, green, turquoise, blue, purple, navy blue

let timer = 0;

function romInit() {}

function romLoop() {
  timer += 0.04;
  clearGfx(7);
  for (let baseX = -20; baseX < 40; baseX++) {
    for (let i = 0; i < 5; i++) {
      const angle = Math.PI * 2 / 5 * i + timer;
      const x = baseX + 20 * Math.cos(angle);
      const y = 32 + 16 * Math.sin(angle) * baseX / 8 * (i + 3) / 16;
      const radius = Math.floor(4 + Math.cos(timer + baseX / 8 + i) * 2);
      const color = Math.floor(baseX + 20 + timer + i) % 7;
      drawCircle(x, y, radius, color, color);
    }
  }
}
