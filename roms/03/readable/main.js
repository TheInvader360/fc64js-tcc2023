let timer = 0;

function romInit() {}

function romLoop() {
  timer += 0.02;
  for (let i = 0; i < 4096; i++) {
    const x = i % 64;
    const y = i / 64;
    poke(i, Math.floor(x + 20 * timer + y * timer) % 6 + 1);
  }
}
