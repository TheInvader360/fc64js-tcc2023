https://tcc.lovebyte.party/day7/

The first challenge is to combine some of the techniques you have learned over the week into an effect! Playing around with mixing different effects is a great way to spark creativity! You could combine your Day 2 scene with a scroller to create an animated Christmas Card or go hard and great a xor-plasma-tunnel-scroller-christmas-tree!

Our [Day 7 video](https://www.youtube.com/watch?v=bCus9KXBk68) is about general sizecoding tips and tricks that may help you, but it’s not necessary so you can even start early!

The second challenge is to keep your effect at a maximum of 256 characters.

-----

Mockup of layout and palette:

```js
romPalette = [0xf9eb0f,  0xff6200,  0xa1dbe8,  0x65d1f8,  0x23d513,  0x20C011,  0xa2a2a2,  0x929292];

function romInit() {
  drawRectangle(0, 0, 32, 32, 2, 2);
  drawRectangle(32, 0, 32, 32, 3, 3);
  drawCircle(8, 8, 8, 1, 0);
  drawRectangle(0, 32, 32, 32, 4, 4);
  drawRectangle(32, 32, 32, 32, 5, 5);
  drawPolygon([{x: 31, y: 32}, {x: 31, y: 64}, {x: 12, y: 64}, {x: 23, y: 32}, ], 6, 6);
  drawPolygon([{x: 32, y: 32}, {x: 32, y: 64}, {x: 52, y: 64}, {x: 41, y: 32}, ], 7, 7);
}

function romLoop() {}
```

-----

Animated scene:

```js
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
```

-----
