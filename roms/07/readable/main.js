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

let timer = 0;

function romInit() {}

function romLoop() {
  timer += 0.4;
  for (let i = 0; i < 4096; i++) {
    const x = i % 64;
    const y = Math.floor(i / 64);
    let color;
    if (y < 32) {
      const shiftedX = x - 8;
      const shiftedY = y - 8;
      const angle = Math.atan2(shiftedY, shiftedX);
      const angleAndTime = Math.floor(((angle + timer / 24) + 9) / 0.2) % 2;
      const distance = Math.hypot(shiftedX, shiftedY);
      color = (distance < 8 ? 0 : distance < 8 + (timer / 3 % 2) ? angleAndTime : angleAndTime + 2) % 8;
    } else {
      const xOffsetCentre = 32 + Math.sin(timer / 64) * y / 4;
      const rowShade = Math.floor(y / 4 - timer % 8 / 4) % 2;
      color = x < xOffsetCentre - y / 3 ? 4 + rowShade : x < xOffsetCentre + y / 3 ? 6 + rowShade : 4 + rowShade;
    }
    poke(i, color);
  }
}
