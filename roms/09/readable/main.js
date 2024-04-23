romPalette = [0x464678, 0x9a6390, 0xe67595, 0xff8b6f, 0xffa936, 0xffc247, 0xffd647, 0xffff78]; // https://lospec.com/palette-list/sunset-8

let timer = 0;

function romInit() {}

function romLoop() {
  timer += 0.01;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const x = 32 + Math.cos(7 * timer) * 32;
      const y = 32 + Math.sin(6 * timer) * 32;
      const existingColor = getPixel(x, y);
      let newColor = existingColor;
      if (existingColor < 7) {
        newColor++;
      }
      drawPixel(x + i, y + j, newColor);
    }
  }

  if (timer > 32) {
    clearGfx();
    timer = 0;
  }
}
