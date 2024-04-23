https://tcc.lovebyte.party/day8/

The first challenge is to get an animated tentacle effect on the screen! Use a for loop to create multiple circles, rotate them and apply the pixel effect to create the tentacles!

You can check out our [Day 8 video](https://www.youtube.com/watch?v=Xvtpi0HJ44A) for an overview on this type of effect.

The second challenge is to keep your effect at a maximum of 256 characters. Experiment with some of the palettes from the Bytebattle page on sizecoding.org!

-----

Basic:

```js
function romLoop() {
  timer += 0.02;
  clearGfx(7);
  for (let baseX = 0; baseX < 32; baseX++) {
    for (let i = 0; i < 5; i++) {
      const angle = Math.PI * 2 / 5 * i + timer;
      const x = baseX + 16 * Math.cos(angle);
      const y = 32 + 16 * Math.sin(angle);
      const radius = 5;
      const color = Math.floor(baseX) % 7;
      drawCircle(x, y, radius, color, color);
    }
  }
}
```

-----

Wibbly:

```js
function romLoop() {
  timer += 0.04;
  clearGfx(7);
  for (let baseX = -20; baseX < 40; baseX++) {
    for (let i = 0; i < 5; i++) {
      const angle = Math.PI * 2 / 5 * i + timer;
      const x = baseX + 20 * Math.cos(angle);
      const y = 32 + 16 * Math.sin(angle) * baseX / 8 * (i + 3) / 16;
      const radius = Math.floor(4 + Math.cos(timer + baseX / 8 + i) * 2);
      const color = Math.floor(baseX + 20 + timer + i) % 7;
      drawCircle(x, y, radius, color, color);
    }
  }
}
```

-----

190 bytes:

```js
let a,b,c,i,m=Math,t=0;function tic(){t+=.04;cls(7);for(b=-20;b<40;b++)for(i=0;i<5;i++)a=1.25*i+t,c=~~(b+20+t+i)%7,circ(b+20*m.cos(a),32+16*m.sin(a)*b/8*(i+3)/16,~~(4+m.cos(t+b/8+i)*2),c,c)}
```

-----

188 bytes:

```js
let a,b,c,i,m=Math,t=0;function tic(){t+=.04;cls(7);for(b=-20;b++<40;)for(i=0;i++<5;)a=1.25*i+t,c=~~(b+20+t+i)%7,circ(b+20*m.cos(a),32+16*m.sin(a)*b/8*(i+3)/16,~~(4+m.cos(t+b/8+i)*2),c,c)}
```

-----
