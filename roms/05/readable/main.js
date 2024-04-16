romPalette = [0xf0dab1, 0xe39aac, 0xc45d9f, 0x634b7d, 0x6461c2, 0x2ba9b4, 0x93d4b5, 0xf0f6e8]; // https://lospec.com/palette-list/fairydust-8

let timer = 0;

function romInit() {}

function romLoop() {
  timer += 0.2;
  for (let y = -32; y < 32; y++) {
    for (let x = -32; x < 32; x++) {
      const a = (Math.atan2(y, x) + timer) / 0.8; // angle (in radians) between the origin (the middle of the screen, when translated) and the current x,y coordinates, modified by time, then scaled to cover all 8 colors in the palette
      const d = 175 / Math.sqrt(x * x + y * y + 1); // distance between the origin and the current x,y coordinates, inverted (to get smaller numbers for bigger distances) while avoiding division by zero,
      const c = d > 32 ? 3 : Math.floor((a + d) % 8); // color based on angle and distance from origin, or just distance if at the distant end of the tunnel
      drawPixel(x + 32, y + 32, c); // draw the pixel at the translated screen coordinates
    }
  }
}
