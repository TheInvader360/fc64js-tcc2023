romPalette = [0xff4400, 0xffa600, 0xfeff00, 0x70ff00, 0x00ffda, 0x0079ff, 0xd100ff, 0xff0081]; // red, orange, yellow, green, turquoise, blue, purple, pink

let timer = 0;

function romInit() {}

function romLoop() {
  timer++;
  for (let i = 0; i < 4096; i++) {
    const x = i % 64;
    const y = i / 64;
    poke(i, Math.floor((Math.sin(x / 5 + timer / 9) + Math.sin(y / 5 + timer / 9)) + timer / 9 + 9) % 8);
  }
}
