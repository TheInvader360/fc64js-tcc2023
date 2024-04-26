https://tcc.lovebyte.party/day2/

The first challenge is to add animated snow to your scene! You can draw circles or individual pixels as snow, you can use the time value to animate them, but you have approach this from a sizecoding point of view. You can check out the documentation (TIC-80 and PICO-8) or take a look at our [Day 2 video](https://www.youtube.com/watch?v=KE19iH-NzEc) for a brief history of time and to get set up with some snow, but you’ll have to add the magic to make it fall!

If you already made it snow yesterday: Congratulations! Check the technique in the video and see if it’s smaller than your implementation, as an additional challenge adjust your scene so that the snow gets heavier with time and/or accumulates on the ground!

The second challenge is to keep your entire scene at a maximum of 256 characters. You might have to make a trade-off to see what gets to stay, snow or your Christmas tree decorations!

-----

Changed to a snowman scene :

* For fun
* Because it makes more sense than a tree without any snow on it in a blizzard
* So I had some hope of hitting the character target!

-----

Three strategies for drawing the snowman's nose...

```js
l=line;l(32,24,37,26,2);l(32,25,37,26,2);l(32,26,37,26,2) // the ```l=line``` alias would be added to an existing aliasing line so no ```let ``` cost, it's still the costliest option overall though...
```

```js
poly([{x:32,y:24},{x:37,y:26},{x:32,y:26}],2,2) // aliasing ```poly``` would be costlier than not (only called once)...
```

```js
for(let i=0;i<3;i++)line(32,24+i,37,26,2) // aliasing ```line``` would be costlier than not (only called once)...
```

-----

The eye drawing code:

```js
rect(29,21,2,2,4);rect(34,21,2,2,4)
```

can be reduced to:

```js
[29,34].map(x=>rect(x,21,2,2,4))
```

-----

Managed a nice scene in 215 bytes (allowing for the same ```uncounted.js``` caveat as before)

-----

Update: fc64js v0.0.7 offers the option of specifying polygon paths as a flat array of numbers, so the nose/carrot can now be drawn like this:

```js
poly([32,24,37,26,32,26],3,3)
```

-----

215 bytes:

```js
let i,t=0;function tic(){t++;cls();rect(0,42,64,22,1,1);circ(32,40,12,2,1);circ(32,23,8,2,1);for(i=0;i<3;i++)line(32,24+i,37,26,3);[29,34].map(x=>rect(x,21,2,2,4));for(i=0;i<32;i++)pix((t/4+i*14)%64,(t/2+i*6)%64,1)}
```

-----

207 bytes:

```js
let i,t=0;function tic(){t++;cls();rect(0,42,64,22,1,1);circ(32,40,12,2,1);circ(32,23,8,2,1);poly([32,24,37,26,32,26],3,3);[29,34].map(x=>rect(x,21,2,2,4));for(i=0;i<32;i++)pix((t/4+i*14)%64,(t/2+i*6)%64,1)}
```
