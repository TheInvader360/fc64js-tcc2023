https://tcc.lovebyte.party/day3/

The first challenge is to get a basic animated per-pixel effect on the screen!

Use two for loops to address every pixel, and set the color based on the x or y location, this should give you a nice gradient in TIC-80, and something a little less smooth in PICO-8 unless you rearrange the palette. Add in a time value so that your effect is animated! You can animate the color, position, scale, or anything else you can think of. Tomorrow we’ll be extending this to create a classic plasma effect. You don’t have to match the example perfectly, it’s just a basic example of one possible effect.

You can take a look at our [Day 3 video](https://www.youtube.com/watch?v=IPMDLlxB6Lw) for an overview on this type of effect.

The second challenge is to keep your effect at a maximum of 128 characters! Half the amount we used on the previous challenges! On the PICO-8 this may be more difficult to do with a custom palette, so for this challenge you can choose not to include the palette in your character count.

-----

Achieved a pretty cool effect in 96 bytes (same ```uncounted.js``` caveat as before)

-----

96 bytes:

```js
let t=0,x,y;function tic(){t+=.02;for(y=0;y<64;y++)for(x=0;x<64;x++)pix(x,y,~~(x+20*t+y*t)%6+1)}
```

-----

84 bytes:

```js
let i,t=0;function tic(){t+=.02;for(i=0;i<4096;i++)poke(i,~~(i%64+20*t+i/64*t)%6+1)}
```
