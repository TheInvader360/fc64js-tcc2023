https://tcc.lovebyte.party/day9/

The first challenge is to get an animated shadebob effect on the screen! Use sin and cos to create an animated shadebob, you’ll have to do the additive bit yourself!

You can check out our [Day 9 video](https://www.youtube.com/watch?v=eYH_ZErT1-0) for an overview on this type of effect.

The second challenge is to keep your effect at a maximum of 256 characters. For TIC-80 experiment with some of the palettes from the Bytebattle page on sizecoding.org!

-----

The effect will eventually run it's course so it would be nice to keep restarting after running for a certain amount of time.

-----

```js
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
```

-----

Sizecoding:

```js
let a,b,i,j,t=0,x,y;function tic(){t+=.01;for(i=-1;i<2;i++)for(j=-1;j<2;j++){x=32+Math.cos(7*t)*32;y=32+Math.sin(6*t)*32;a=gpx(x,y);b=a++;if(a<7)b++,pix(x+i,y+j,b)}if(t>32)cls(),t=0} // 182 bytes
```

Replacing the five instances of `32` with e.g. `,s=32` and five instances of `s` offers no benefit

Replacing the two instances of `Math.` with `,m=Math` and two instances of `m.` costs an extra byte

`peek`ing and `poke`ing is way costlier than `gpx`ing and `pix`ing, even before rounding and guarding against out of bounds calls...

I'm happy with 182 bytes :)
