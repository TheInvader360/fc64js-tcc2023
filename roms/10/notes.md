https://tcc.lovebyte.party/day10/

The first challenge is to set up multiple effects that cycle based on the time. Include at least 2 different effects, these can be new or they can be from previous days.

You can check out our [Day 10 video](https://www.youtube.com/watch?v=qmmgEJOVg_s) for an overview on this structure.

~~The second challenge is to keep your effect at a maximum of 256 BYTES! We are on to the compressed file formats now so lets see how many extra bytes we can squeeze in!~~

-----

I won't be using the specified packers as I'm using [fc64js](https://github.com/TheInvader360/fc64js) not the assumed tic-80 or pico8. The target size challenge no longer applies.

-----

Minimal example:

```js
let timer = 0;
function romInit() {}
function romLoop() {
  timer++;
  const timeSlot = Math.floor(timer / 60) % 3;
  if (timeSlot === 0) clearGfx(0);
  if (timeSlot === 1) clearGfx(1);
  if (timeSlot === 2) clearGfx(2);
  drawText(20, 30, 'FC64JS', COL_WHT);
}
```

-----

Four background effects and a foreground sine scroller:

```js
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
          drawPixel(x, y, Math.floor((Math.sin(x / 5 + timer / 9) + Math.sin(y / 5 + timer / 9)) + timer / 9 + 9) % 6 + 1);
          break;
        case 2:
          d = 175 / Math.sqrt(offsetX * offsetX + offsetY * offsetY + 1);
          drawPixel(x, y, d > 32 ? 3 : Math.floor(((Math.atan2(offsetY, offsetX) + timer / 5) / 0.9 + d) % 7));
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
```

-----

460 bytes:

```js
let d,e,i,t=0,v,w,x,y;function tic(){t++;for(y=0;y<64;y++)for(x=0;x<64;x++){v=x-32;w=y-32;d=Math.sqrt(v*v+w*w+1);e=~~(t/264)%4;if(e<4)pix(x,y,d<5?3:(~~((Math.atan2(w,v)+Math.PI)*2.546)^~~(60/d+t/16))%4+1);if(e<3)pix(x,y,~~((Math.sin(x/5+t/9)+Math.sin(y/5+t/9))+t/9+9)%6+1);if(e<2)pix(x,y,175/d>32?3:~~(((Math.atan2(w,v)+t/5)/0.9+175/d)%7));if(e<1)pix(x,y,~~(x+20*t/50+y*t/50)%6+1)}for(i=0;i<6;i++)dText(64+i*12-(t/4)%136,Math.cos(-i+t/16)*16+30,'FC64JS'[i],7)}
```

459 bytes:

```js
let d,e,i,t=0,v,w,x,y;function tic(){t++;for(i=0;i<4096;i++){x=i%64;y=~~(i/64);v=x-32;w=y-32;d=Math.sqrt(v*v+w*w+1);e=~~(t/264)%4;if(e<4)poke(i,d<5?3:(~~((Math.atan2(w,v)+Math.PI)*2.546)^~~(60/d+t/16))%4+1);if(e<3)poke(i,~~((Math.sin(x/5+t/9)+Math.sin(y/5+t/9))+t/9+9)%6+1);if(e<2)poke(i,175/d>32?3:~~(((Math.atan2(w,v)+t/5)/0.9+175/d)%7));if(e<1)poke(i,~~(x+20*t/50+y*t/50)%6+1)}for(i=0;i<6;i++)dText(64+i*12-(t/4)%136,Math.cos(-i+t/16)*16+30,'FC64JS'[i],7)}
```

445 bytes:

```js
let d,e,i,m=Math,t=0,v,w,x,y;function tic(){t++;for(i=0;i<4096;i++){x=i%64;y=~~(i/64);v=x-32;w=y-32;d=m.sqrt(v*v+w*w+1);e=~~(t/264)%4;if(e<4)poke(i,d<5?3:(~~((m.atan2(w,v)+m.PI)*2.546)^~~(60/d+t/16))%4+1);if(e<3)poke(i,~~((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/9+9)%6+1);if(e<2)poke(i,175/d>32?3:~~(((m.atan2(w,v)+t/5)/0.9+175/d)%7));if(e<1)poke(i,~~(x+20*t/50+y*t/50)%6+1)}for(i=0;i<6;i++)dText(64+i*12-(t/4)%136,m.cos(-i+t/16)*16+30,'FC64JS'[i],7)}
```

440 bytes:

```js
let d,e,i,m=Math,p=poke,t=0,v,w,x,y;function tic(){t++;for(i=0;i<4096;i++){x=i%64;y=~~(i/64);v=x-32;w=y-32;d=m.sqrt(v*v+w*w+1);e=~~(t/264)%4;if(e<4)p(i,d<5?3:(~~((m.atan2(w,v)+m.PI)*2.546)^~~(60/d+t/16))%4+1);if(e<3)p(i,~~((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/9+9)%6+1);if(e<2)p(i,175/d>32?3:~~(((m.atan2(w,v)+t/5)/0.9+175/d)%7));if(e<1)p(i,~~(x+20*t/50+y*t/50)%6+1)}for(i=0;i<6;i++)dText(64+i*12-(t/4)%136,m.cos(-i+t/16)*16+30,'FC64JS'[i],7)}
```

-----
