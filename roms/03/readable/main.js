let timer = 0;

function romInit() {}

function romLoop() {
  timer += 0.02;
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 64; x++) {
      drawPixel(x, y, Math.floor(x + 20 * timer + y * timer) % 6 + 1);
    }
  }
}
