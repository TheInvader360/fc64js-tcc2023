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
      const angleAndTime = Math.floor(((angle + timer / 24) + 9) * 5) % 2;
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

All those loops are expensive...

At its core the demo just iterates over all pixel locations and sets the colour of each one to a value derived from its x and y position and the running time. It does all this 60 times per second. That's it. It should therefore be possible to squeeze everything into a single loop.

Also, since fc64js uses memory mapped video ram (one nice contiguous block from address 0 to 4095 representing a full screen of pixels going from left to right and top to bottom), there's the option of just poking values into the relevant location rather than calling `drawPixel()`.

Here's a minimal example:

```js
let t = 0;
function romInit() {}
function romLoop() {
  t++;
  for (let i = 0; i < 4096; i++) {
    const x = i % 64;
    const y = Math.floor(i / 64);
    const c = Math.floor(x + y + t) % 8;  
    poke(i, c); // same result as `drawPixel(x, y, c);`
  }
}
```

Applying those principles to the animated scene:

```js
function romLoop() {
  timer += 0.4;
  for (let i = 0; i < 4096; i++) {
    const x = i % 64;
    const y = Math.floor(i / 64);
    let color;
    if (y < 32) {
      const shiftedX = x - 8;
      const shiftedY = y - 8;
      const angle = Math.atan2(shiftedY, shiftedX);
      const angleAndTime = Math.floor(((angle + timer / 24) + 9) * 5) % 2;
      const distance = Math.hypot(shiftedX, shiftedY);
      color = (distance < 8 ? 0 : distance < 8 + (timer / 3 % 2) ? angleAndTime : angleAndTime + 2) % 8;
    } else {
      const xOffsetCentre = 32 + Math.sin(timer / 64) * y / 4;
      const rowShade = (y / 4 - timer % 8 / 4) % 2 < 1 ? 0 : 1;
      color = x < xOffsetCentre - y / 3 ? 4 + rowShade : x < xOffsetCentre + y / 3 ? 6 + rowShade : 4 + rowShade;
    }
    poke(i, color);
  }
}
```

This is actually a few more bytes than the previous 4 loop version, but I'm willing to bet it'll shrink down nicely once those variables get factored out etc

-----

Some simple rejigging gets me this far quite easily:

```js
let a,c,d,m=Math,r,s,t=0,v,w,x,y
function tic(){
  t+=.4
  for(let i=0;i<4096;i++){
    x=i%64
    y=~~(i/64)
    v=x-8
    w=y-8
    a=~~(((m.atan2(w,v)+t/24)+9)*5)%2
    d=m.hypot(v,w)
    r=32+m.sin(t/64)*y/4
    s=(y/4-t%8/4)%2<1?0:1
    c=y<32?(d<8?0:d<8+(t/3%2)?a:a+2)%8:x<r-y/3?4+s:x<r+y/3?6+s:4+s
    poke(i,c)
  }
}
```

-----

`x<r-y/3?4+s:x<r+y/3?6+s:4+s` can be slimmed down a little to `x<r-y/3||x>r+y/3?4+s:6+s`

Then a little bit more rejigging and stripping of whitespace is enough to get under the 256 byte target:

255 bytes:

```js
let a,d,i,m=Math,r,s,t=0,x,y;function tic(){t+=.4;for(i=0;i<4096;i++){x=i%64;y=~~(i/64);a=~~(((m.atan2(y-8,x-8)+t/24)+9)*5)%2;d=m.hypot(x-8,y-8);r=32+m.sin(t/64)*y/4;s=(y/4-t%8/4)%2<1?0:1;poke(i,y<32?(d<8?0:d<8+(t/3%2)?a:a+2)%8:x<r-y/3||x>r+y/3?4+s:6+s)}}
```

This feels like a good place to stop :)

-----

253 bytes:

```js
let a,d,i,m=Math,r,s,t=0,x,y;function tic(){t+=.4;for(i=0;i<4096;i++)x=i%64,y=~~(i/64),a=~~(((m.atan2(y-8,x-8)+t/24)+9)*5)%2,d=m.hypot(x-8,y-8),r=32+m.sin(t/64)*y/4,s=(y/4-t%8/4)%2<1?0:1,poke(i,y<32?(d<8?0:d<8+(t/3%2)?a:a+2)%8:x<r-y/3||x>r+y/3?4+s:6+s)}
```

-----

249 bytes:

```js
let a,d,i,m=Math,r,s,t=0,x,y;function tic(){t+=.4;for(i=0;i<4096;i++)x=i%64,y=~~(i/64),a=~~(((m.atan2(y-8,x-8)+t/24)+9)*5)%2,d=m.hypot(x-8,y-8),r=32+m.sin(t/64)*y/4,s=~~(y/4-t%8/4)%2,poke(i,y<32?(d<8?0:d<8+(t/3%2)?a:a+2)%8:x<r-y/3||x>r+y/3?4+s:6+s)}
```
