romPalette = [
  0xf9eb0f, // yellow
  0xff6200, // orange
  0xa1dbe8, // blue (light)
  0x65d1f8, // blue (dark)
  0x23d513, // green (light)
  0x20C011, // green (dark)
  0xa2a2a2, // grey (light)
  0x929292, // grey (dark)
];

function romInit() {}

let timer = 0;

function romLoop() {
  timer += 0.4;
  for (let y = -8; y < 24; y++) {
    for (let x = -8; x < 56; x++) {
      const angle = Math.atan2(y, x);
      const angleAndTime = Math.floor(((angle + timer / 24) + 9) / 0.2) % 2;
      const distance = Math.hypot(x, y);
      const color = (distance < 8 ? 0 : distance < 8 + (timer / 3 % 2) ? angleAndTime : angleAndTime + 2) % 8;
      drawPixel(x + 8, y + 8, color);
    }
  }
  for (let y = 32; y < 64; y++) {
    for (let x = 0; x < 64; x++) {
      const xOffsetCentre = 32 + Math.sin(timer / 64) * y / 4;
      const rowShade = (y / 4 - timer % 8 / 4) % 2 < 1 ? 0 : 1;
      drawPixel(x, y, x < xOffsetCentre - y / 3 ? 4 + rowShade : x < xOffsetCentre + y / 3 ? 6 + rowShade : 4 + rowShade);
    }
  }
}
