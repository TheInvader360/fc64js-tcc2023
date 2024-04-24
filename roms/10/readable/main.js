romPalette = [0xf0dab1, 0xe39aac, 0xc45d9f, 0x634b7d, 0x6461c2, 0x2ba9b4, 0x93d4b5, 0xf0f6e8]; // https://lospec.com/palette-list/fairydust-8

let timer = 0;

function romInit() {}

function romLoop() {
  timer++;
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 64; x++) {
      const offsetX = x - 32;
      const offsetY = y - 32;
      let d;
      switch(Math.floor(timer / 264) % 4) {
        case 0:
          drawPixel(x, y, Math.floor(x + 20 * timer / 50 + y * timer / 50) % 6 + 1);
          break;
        case 1:
          d = 175 / Math.sqrt(offsetX * offsetX + offsetY * offsetY + 1);
          drawPixel(x, y, d > 32 ? 3 : Math.floor(((Math.atan2(offsetY, offsetX) + timer / 5) / 0.9 + d) % 7));
          break;
        case 2:
          drawPixel(x, y, Math.floor((Math.sin(x / 5 + timer / 9) + Math.sin(y / 5 + timer / 9)) + timer / 9 + 9) % 6 + 1);
          break;
        case 3:
          d = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
          drawPixel(x, y, d < 5 ? 3 : (Math.floor((Math.atan2(offsetY, offsetX) + Math.PI) * 2.546) ^ Math.floor(60 / (d + 1) + timer / 16)) % 4 + 1);
          break;
      }
    }
  }
  const message = 'FC64JS';
  for (let i = 0; i < message.length; i++) {
    drawText(64 + i * 12 - (timer / 4) % (64 + message.length * 12), Math.cos(-i + timer / 16) * 16 + 30, message[i], 7);
  }
}
