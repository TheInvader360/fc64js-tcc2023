romPalette = [0x3a3585, 0x3d8f45, 0x6f452c, 0xfaeb50]; // blue, green, brown, yellow

function romInit() {}

function romLoop() {
  clearGfx(0);
  for (let i = 0; i < 3; i++) {
    const t = 6 + ((i + 5) * (i + 1)), b = 16 + ((i + 9) * (i + 1));
    drawPolygon([32, t, 40 + i * 4, b, 24 - i * 4, b], 1, 1);
  }
  drawRectangle(29, 50, 7, 6, 2, 2);
  drawRectangle(0, 56, 64, 8, 1, 1);
  drawLine(29, 10, 35, 10, 3);
  drawLine(30, 8, 34, 12, 3);
  drawLine(32, 7, 32, 13, 3);
  drawLine(34, 8, 30, 12, 3);
}
