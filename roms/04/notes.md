https://tcc.lovebyte.party/day4/

The first challenge is to get a basic animated per-pixel plasma effect on the screen! Use two for loops to address every pixel, and set the colour based a combination of sin() values!

You can check out our [Day 4 video](https://www.youtube.com/watch?v=263vUVFX3F8) for an overview on this type of effect.

The second challenge is to keep your effect at a maximum of 128 characters. If you’re coming up against the character limit in PICO-8 using a custom palette you can choose not to include the palette in today’s challenge character count.

-----

```~~``` are two unary bitwise not operators next to one another that can be used as a shorter substitute for ```Math.floor()``` for small(ish) positive numbers (<~2billion according to some value I stumbled across online and haven't verified...)

-----

Using ```fc64Init``` in ```uncounted.js``` allows for most of the "off book" stuff to be nice and contained - an empty ```romInit()``` definition, the ```romPalette``` definition, and now a shorter ~~```romLoop```~~ ```tic``` main loop function label that more closely matches tic-80 and lua (```function tic(){...}``` vs ```function TIC()...end```). It's just ```fc64Init``` and the function aliases (again to more closely match tic80 and lua) in ```uncounted.js``` now. I think I'll go back and apply this standard to the previous challenges... [edit: done]

-----

Hitting the challenge length on this one was hard... I trial and errored my way to a nice effect in ```readable/main.js``` that I didn't really want to abandon by the time I started sizecoding. If I'd have been willing to go with much smaller circles, or a much too fast movement speed it would have been easier, but I refused to compromise :D

Here are some of my mis-steps along the way, before I finally managed it...

```js
let t=0;function romLoop(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,Math.abs(Math.floor((Math.sin(x/5+t/9)+Math.sin(y/5+t/9))+t/24)%8))}
let t=0,m=Math;function romLoop(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,m.abs(m.floor((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/24)%8))}
let m=Math,t=0,x=0,y=0;function romLoop(){t++;for(y=0;y<64;y++)for(x=0;x<64;x++)pix(x,y,m.abs(m.floor((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/24)%8))}
let t=0,m=Math;function romLoop(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,m.abs(m.ceil((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/24)%8))}
let t=0,m=Math;function romLoop(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,m.abs(m.ceil((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/9)%8))}
let t=0,m=Math;function romLoop(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,m.ceil((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/9+9)%8)}
let t=0,m=Math;const z=(v)=>m.sin(v/5+t/9);function romLoop(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,m.ceil((z(x)+z(y))+t/9+9)%8)}
let t=0,m=Math;function tic(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,m.ceil((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/9+9)%8)}
let t=0,m=Math;function tic(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,~~((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/9+9)%8)}
let s=Math.sin,t=0;function tic(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,~~((s(x/5+t/9)+s(y/5+t/9))+t/9+9)%8)}
```

No getting away from it, the javascript for loop syntax is costly compared to lua's, and there's a need for two of them here. Then there's the fact that tic-80 wraps colour values (so trying to use 20 gets you 4) whereas fc64js requires a valid palette index (i.e. 0-7, necessitating the ```%8```). I think tic-80 lets you use decimal numbers as the colour index values too, whereas fc64js requires a round integer (so necessitating a ```Math.round```, ```Math.ceil```, ```Math.floor```, or ```~~```). I also had a ```Math.abs``` in there for a while to deal with potential negative numbers, but a ```+9``` achieved the same result for fewer characters, again none of that would be necessary in tic-80.

Of course I could simply modify fc64js to more closely match tic-80 and make this kind of thing easier, but I'm not going to do that. This is a fun challenge, but if I can't meet the target character count set for a different platform, so be it - the tail won't be wagging the dog...

That said, Day 1 did have me wondering why I went for the approach I did for ```drawPolygon()``` in fc64js - I'll probably change that to accept an array of (paired) numbers rather than an array of vertex objects. That's not to make these challenges easier (I think we're probably done with polygons here by now anyway...) - it's just better! Similarly the fc64js draw methods *might* handle the wrapping and rounding of memory addresses and color indexes etc in the future, but only if it feels like the right thing to do. Currently that stuff is handled at the rom layer to keep the lower level code uncluttered/clear/efficient/etc. Relying on the rom dev to supply sanitised values doesn't seem unreasonable, the alternative of rounding all values which will usually already be integers doesn't really feel like the right call. Anyway, that's enough musing about the fc64js api for now...

-----

Finally managed this one in 125 bytes (with the usual ```uncounted.js``` caveat)
