https://tcc.lovebyte.party/day1/

The first challenge is to make a Christmas scene out of the basic shapes that the fantasy consoles provide: maybe draw a Christmas Tree out of triangles or a Snow Man out of circles? Why not both?

You can read the documentation on these shapes for TIC-80 and PICO-8, and you can watch our [Day 1 video](https://www.youtube.com/watch?v=ys4N6itxi44) that gives an overview of using both Fantasy Consoles and these shape functions they provide!

The second challenge is to keep your code to a maximum of 256 characters!

-----

I thought this could have been a nice way to draw the star, but it uses a lot more characters than the 4 drawLine calls...
Note: 0.8 is a good enough approximation of pi/4 for the sake of this demo

```js
let c=Math.cos,s=Math.sin,r=Math.round
for(let i=0;i<8;i++)line(32,10,r(32+3*c(i*0.8)),r(10+3*s(i*0.8)),6)
```

-----

The sizecoding version makes use of ```uncounted.js``` to try to level the playing field a little with the expected tic80 and lua combination

My alternative approach using fc64js and javascript does still cost a few more bytes:

* iterating via ```for(let i=0;i<3;i++){...}``` costs more bytes than ```for i=0,2 do...end```
* javascript requires ```{```/```}``` where lua does not
* javascript requires ```const```/```let```/```var``` keywords where lua does not

This might make it a bit more difficult to hit the max character targets... I just about scraped under on Day 1 with 249 bytes but I'm guessing this will keep getting harder (getting my excuses in early :D)
