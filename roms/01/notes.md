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

This might make it a bit more difficult to hit the max character targets... I just about scraped under on Day 1 with 247 bytes but I'm guessing this will keep getting harder (getting my excuses in early :D)

-----

Update: fc64js v0.0.7 offers the option of specifying polygon paths as a flat array of numbers, so a triangle can now be drawn like this:

```js
poly([32,11,40,25,24,25],1,1)
```

Note that using a polygon to draw the star is still costlier than just drawing four lines:

```js
l(29,10,35,10,3);l(30,8,34,12,3);l(32,7,32,13,3);l(34,8,30,12,3) // 64 bytes
poly([32,10,32,7,32,10,34,8,32,10,35,10,32,10,34,12,32,10,32,13,32,10,30,12,32,10,29,10,32,10,30,8],3) // 103 bytes
```

-----

247 bytes:

```js
function tic(){let i,l=line,r=rect;cls();for(i=0;i<3;i++){let t=6+(i+5)*(i+1),b=16+(i+9)*(i+1);poly([{x:32,y:t},{x:40+4*i,y:b},{x:24-4*i,y:b}],1,1)}r(29,50,7,6,2,2);r(0,56,64,8,1,1);l(29,10,35,10,3);l(30,8,34,12,3);l(32,7,32,13,3);l(34,8,30,12,3)}
```

-----

229 bytes:

```js
function tic(){let i,l=line,r=rect;cls();for(i=0;i<3;i++){let t=6+(i+5)*(i+1),b=16+(i+9)*(i+1);poly([32,t,40+4*i,b,24-4*i,b],1,1)}r(29,50,7,6,2,2);r(0,56,64,8,1,1);l(29,10,35,10,3);l(30,8,34,12,3);l(32,7,32,13,3);l(34,8,30,12,3)}
```
