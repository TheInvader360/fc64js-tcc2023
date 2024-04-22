https://tcc.lovebyte.party/day6/

The first challenge is to get an animated sine scroller effect on the screen! Use a for loop to cycle through each character and animate its height with a sin value!

You can check out our [Day 6 video](https://www.youtube.com/watch?v=qUOlRYzs4_s) for an overview on this type of effect.

The second challenge is to keep your effect at a maximum of 256 characters. You should have plenty of room to play around with adding a background effect also, but you can always try for 128 if you need a bit more of a challenge!

-----

Can't alias ```drawText``` as ```print``` to match tic-80 in ```uncounted.js```, so used ```dText``` instead - 5 chars is 5 chars...

-----

~~I could shorten the code further by simplifying the demo - simpler background effect, no nice "end" to the tunnel, a much shorter message, drop the flashing text, introduce imperfections to the tunnel (e.g. replace ```m.PI)*2.546``` with ```3)*2```), etc... I *could* do all of that, but I won't :D I like the demo as it stands and am happy to accept defeat on the sizecoding. I think I managed to get a pretty nice result for just 285 bytes!~~

-----

I decided to revisit this having achieved the Day 7 target size - nested loops are a prime target now!

Replaced:

```js
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
```

With:

```js
for (let i = 0; i < 4096; i++) {
  const x = i % 64 - 32;
  const y = Math.floor(i / 64) - 32;
  const angle = Math.atan2(y, x);
  const distance = Math.sqrt(x * x + y * y);
  const angleModified = (angle + Math.PI) * 2.546;
  const distanceModified = 60 / (distance + 1) + timer / 16;
  const color = distance < 5 ? 0 : (Math.floor(angleModified) ^ Math.floor(distanceModified)) % 4;
  poke(i, color);
}
```

(in the readable version)

This *increased* the sizecoded version by 1 byte...

```js
let d,i,m=Math,s=32,t=0,x,y;function tic(){t++;for(i=0;i<4096;i++){x=i%64-s;y=~~(i/64)-s;d=m.hypot(x,y);poke(i,d<5?0:(~~((m.atan2(y,x)+m.PI)*2.546)^~~(60/(d+1)+t/16))%4)}for(i=0;i<28;i++){x=76+i*8-(t/4)%300;y=s+m.cos(-i+t/16)*16;dText(x,y,'THEINVADER360         FC64JS'[i],t%12<6?4:5)}}
```

-----

While looking at that I did spot something I had missed previously... Replaced `{x=76+i*8-(t/4)%300;y=s+m.cos(-i+t/16)*16;dText(x,y,...}` with `dText(76+i*8-(t/4)%300,s+m.cos(-i+t/16)*16,...` for an easy 10 byte saving :)

There was also an unnecessary semicolon wasting a byte...

274 bytes:

```js
let d,i,m=Math,s=32,t=0,x,y;function tic(){t++;for(y=-s;y<s;y++)for(x=-s;x<s;x++){d=m.hypot(x,y);pix(x+s,y+s,d<5?0:(~~((m.atan2(y,x)+m.PI)*2.546)^~~(60/(d+1)+t/16))%4)}for(i=0;i<28;i++)dText(76+i*8-(t/4)%300,s+m.cos(-i+t/16)*16,'THEINVADER360         FC64JS'[i],t%12<6?4:5)}
```

273 bytes:

```js
let d,i,m=Math,s=32,t=0,x,y;function tic(){t++;for(y=-s;y<s;y++)for(x=-s;x<s;x++)d=m.hypot(x,y),pix(x+s,y+s,d<5?0:(~~((m.atan2(y,x)+m.PI)*2.546)^~~(60/(d+1)+t/16))%4);for(i=0;i<28;i++)dText(76+i*8-(t/4)%300,s+m.cos(-i+t/16)*16,'THEINVADER360         FC64JS'[i],t%12<6?4:5)}
```

-----

261 bytes:

```js
let i,m=Math,s=32,t=0,x,y;function tic(){t++;for(y=-s;y<s;y++)for(x=-s;x<s;x++)pix(x+s,y+s,(~~((m.atan2(y,x)+m.PI)*2.546)^~~(60/(m.hypot(x,y)+1)+t/16))%4);for(i=0;i<28;i++)dText(76+i*8-(t/4)%300,s+m.cos(-i+t/16)*16,'THEINVADER360         FC64JS'[i],t%12<6?4:5)}
```

(drops the tunnel "end" effect)

-----

251 bytes:

```js
let d,i,m=Math,s=32,t=0,x,y;function tic(){t++;for(y=-s;y<s;y++)for(x=-s;x<s;x++)d=m.hypot(x,y),pix(x+s,y+s,d<5?0:(~~((m.atan2(y,x)+m.PI)*2.546)^~~(60/(d+1)+t/16))%4);for(i=0;i<6;i++)dText(64+i*12-(t/4)%136,s+m.cos(-i+t/16)*16,'FC64JS'[i],t%12<6?4:5)}
```

(shorter message)

-----

Failing to meet the target size was annoying me. Decided to either drop the end of the tunnel effect or shorten the message. The shorter message made achieving the challenge size easier, and looked better, so that option won. Final weigh-in - 251 bytes.
