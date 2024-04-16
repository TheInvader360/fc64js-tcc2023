https://tcc.lovebyte.party/day5/

The first challenge is to get an animated tunnel effect on the screen! Use two for loops to address every pixel, and use the polar coordinates to set the colour!

You can check out our [Day 5 video](https://www.youtube.com/watch?v=kkTebg0gNNU) for an overview on this type of effect.

The second challenge is to keep your effect at a maximum of 256 characters. You should have plenty of room to play around and come up with an awesome effect, but you can always try for 128 if you need a bit more of a challenge!

-----

The palette makes a big difference, took a fair amount of trial and error before I settled on [https://lospec.com/palette-list/fairydust-8](fairydust-8).

-----

I didn't like the artifacts around the origin so decided to draw a defined end to the tunnel - it looks nicer with a solid block of colour at the end (0x634b7d). Setting the colour based on polar distance when already looping was lighter on characters than a ```circ()``` call.

-----

Code shrinking...

```js
let t=0,a,d,c;function tic(){t+=.2;for(let y=-32;y<32;y++){for(let x=-32;x<32;x++){a=(Math.atan2(y,x)+t)/0.79;d=175/(Math.sqrt(x*x+y*y)+1);c=d>36?3:Math.floor((a+d)%8);pix(x+32,y+32,c)}}}
let t=0,a,d,c;function tic(){t+=.2;for(let y=-32;y<32;y++)for(let x=-32;x<32;x++){a=(Math.atan2(y,x)+t)/0.79;d=175/(Math.sqrt(x*x+y*y)+1);c=d>36?3:Math.floor((a+d)%8);pix(x+32,y+32,c)}}
let t=0,a,d,c;function tic(){t+=.2;for(let y=-32;y<32;y++)for(let x=-32;x<32;x++){a=(Math.atan2(y,x)+t)/0.79;d=175/Math.sqrt(x*x+y*y+1);c=d>36?3:Math.floor((a+d)%8);pix(x+32,y+32,c)}}
let t=0,a,d,c,x,y;function tic(){t+=.2;for(y=-32;y<32;y++)for(x=-32;x<32;x++){a=(Math.atan2(y,x)+t)/0.79;d=175/Math.sqrt(x*x+y*y+1);c=d>36?3:Math.floor((a+d)%8);pix(x+32,y+32,c)}}
let a,c,d,t=0,x,y;function tic(){t+=.2;for(y=-32;y<32;y++)for(x=-32;x<32;x++){a=(Math.atan2(y,x)+t)/0.8;d=175/Math.sqrt(x*x+y*y+1);c=d>36?3:Math.floor((a+d)%8);pix(x+32,y+32,c)}}
let a,d,t=0,x,y;function tic(){t+=.2;for(y=-32;y<32;y++)for(x=-32;x<32;x++){a=(Math.atan2(y,x)+t)/0.8;d=175/Math.sqrt(x*x+y*y+1);pix(x+32,y+32,d>36?3:Math.floor((a+d)%8))}}
let a,d,s=32,t=0,x,y;function tic(){t+=.2;for(y=-s;y<s;y++)for(x=-s;x<s;x++){a=(Math.atan2(y,x)+t)/0.8;d=175/Math.sqrt(x*x+y*y+1);pix(x+s,y+s,d>s?3:Math.floor((a+d)%8))}}
let a,d,m=Math,s=32,t=0,x,y;function tic(){t+=.2;for(y=-s;y<s;y++)for(x=-s;x<s;x++){a=(m.atan2(y,x)+t)/0.8;d=175/m.sqrt(x*x+y*y+1);pix(x+s,y+s,d>s?3:m.floor((a+d)%8))}}
let a,d,m=Math,s=32,t=0,x,y;function tic(){t+=.2;for(y=-s;y<s;y++)for(x=-s;x<s;x++){a=(m.atan2(y,x)+t)/0.8;d=175/m.sqrt(x*x+y*y+1);pix(x+s,y+s,d>s?3:~~((a+d)%8))}}
let a,d,s=32,t=0,x,y;function tic(){t+=.2;for(y=-s;y<s;y++)for(x=-s;x<s;x++){a=(Math.atan2(y,x)+t)/0.8;d=175/Math.sqrt(x*x+y*y+1);pix(x+s,y+s,d>s?3:~~((a+d)%8))}}
let a,d,s=32,t=0,x,y;function tic(){t+=.2;for(y=-s;y<s;y++)for(x=-s;x<s;x++){a=(Math.atan2(y,x)+t)/0.8;d=175/Math.sqrt(x*x+y*y+1);pix(x+s,y+s,d>s?3:~~(a+d)%8)}}
let a,d,s=32,t=0,x,y;function tic(){t+=.2;for(y=-s;y<s;y++)for(x=-s;x<s;x++){a=(Math.atan2(y,x)+t)/.8;d=175/Math.sqrt(x*x+y*y+1);pix(x+s,y+s,d>s?3:~~(a+d)%8)}}
let a,d,s=32,t=0,x,y;function tic(){t+=.2;for(y=-s;y<s;y++)for(x=-s;x<s;x++)a=(Math.atan2(y,x)+t)/.8,d=175/Math.sqrt(x*x+y*y+1),pix(x+s,y+s,d>s?3:~~(a+d)%8)}
```

-----

Ended up at 157 bytes (usual ```uncounted.js``` caveat) - happy with that :)
