romPalette = [0x281d73, 0x4f388c, 0x7850b3, 0xb082d9, 0xff0000, 0xffff00]; // https://lospec.com/palette-list/st-gameboy-lightgrey + red + yellow

let timer = 0;

function romInit() {}

function romLoop() {
  timer++;
  for (let y = -32; y < 32; y++) {
    for (let x = -32; x < 32; x++) {
      const angle = Math.atan2(y, x);
      const distance = Math.sqrt(x * x + y * y);
      const angleModified = (angle + Math.PI) * 2.546;
      const distanceModified = 60 / (distance + 1) + timer / 16;
      const color = distance < 5 ? 0 : (Math.floor(angleModified) ^ Math.floor(distanceModified)) % 4;
      drawPixel(x + 32, y + 32, color);
    }
  }
  const timerBand = timer % 12;
  const color = timerBand < 6 ? 4 : 5;
  const message = 'THEINVADER360         FC64JS';
  for (let i = 0; i < message.length; i++) {
    const x = 76 + i * 8 - (timer / 4) % (76 + message.length * 8); 
    const y = 32 + Math.cos(-i + timer / 16) * 16;
    drawText(x, y, message[i], color);
  }
}
