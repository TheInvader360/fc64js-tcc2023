romPalette = [0x3f65eb, 0xffffff, 0x686b6d, 0xe46c1f, 0x000000]; // blue, white, grey, orange, black

let ticks = 0;

function romInit() {}

function romLoop() {
  ticks++;
  clearGfx(0);
  drawRectangle(0, 42, 64, 22, 1, 1);
  drawCircle(32, 40, 12, 2, 1);
  drawCircle(32, 23, 8, 2, 1);
  for (let i = 0; i < 3; i++) {
    drawLine(32, 24 + i, 37, 26, 3);
  }
  drawRectangle(29, 21, 2, 2, 4);
  drawRectangle(34, 21, 2, 2, 4);
  for (let i = 0; i < 32; i++) {
    drawPixel((ticks / 4 + i * 14) % 64, (ticks / 2 + i * 6) % 64, 1);
  }
}
