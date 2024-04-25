https://tcc.lovebyte.party/day12/

The first challenge is to create a voxel christmas tree that rotates around the y-axis, What other effects can you add? Landscape? Snow?

You can check out our [Day 12 video](https://www.youtube.com/watch?v=MXMN1Q2z-MI) above for an overview of the challenge, but there’s no code samples today! If you’ve made it this far, you possess the knowledge within you!

~~The second challenge is to keep your effect at a maximum of 256 BYTES! We are on to the compressed file formats now so lets see how many extra bytes we can squeeze in!~~

-----

I won't be using the specified packers as I'm using [fc64js](https://github.com/TheInvader360/fc64js) not the assumed tic-80 or pico8. The target size challenge no longer applies.

-----

Static 2d tree:

```js
romPalette = [0x222222, 0xffff00, 0x1fd655, 0x5ced73, 0xff0000, 0xa020f0, 0x964b00, 0xffffff];
const palette = { grey: 0, yellow: 1, darkGreen: 2, lightGreen: 3, red: 4, purple: 5, brown: 6, white: 7 };
const points = [];
const randomDecoration = () => Math.random() < 0.5 ? palette.red : palette.purple;
const randomGreen = () => Math.random() < 0.75 ? palette.darkGreen : palette.lightGreen;

function romInit() {
  points.push({ x:  0, y:-10, c: palette.yellow });
  points.push({ x: -1, y: -9, c: palette.yellow });
  points.push({ x:  0, y: -9, c: palette.yellow });
  points.push({ x:  1, y: -9, c: palette.yellow });
  points.push({ x:  0, y: -8, c: palette.yellow });
  points.push({ x:  0, y: -7, c: palette.darkGreen });
  for (let i = 1; i < 5; i++) {     // four sections...
    for (let j = -i; j <= i; j++) { // ...widening on each step...
      for (let k = 0; k < 3; k++) { // ...each one being three units high
        const x = j;
        const y = -9 + i*3 + k;
        const c = y % 3 !== 0 && (x - i + k) % 2 !== 0 ? randomDecoration(): randomGreen();
        points.push({ x: x, y: y, c: c });
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    points.push({ x: 0, y: 6 + i, c: palette.brown });
  }
}

function romLoop() {
  points.forEach(point => drawRectangle(32 + point.x * 3 , 32 + point.y * 3, 2, 2, point.c));
}
```

-----

Rotating 3d cuboid:

```js
const rotateY = (p, angle) => ({ x: p.x * Math.cos(angle) - p.z * Math.sin(angle), y: p.y, z: p.x * Math.sin(angle) + p.z * Math.cos(angle) });
let angle = 0;

function romInit() {}

function romLoop() {
  clearGfx();
  angle += 0.01;
  const points = [];
  for (let x = -4; x < 5; x++) {
    for (let y = -10; y < 11; y++) {
      for (let z = -4; z < 5; z++) {
        const point = rotateY({ x: x, y: y, z: z}, angle);
        point.z += 140;
        points.push(point);
      }
    }
  }
  points.sort((a, b) => b.z - a.z); // sort by z value descending (z values increase heading "into" the screen)
  points.forEach(point => drawPixel(32 + 400 * point.x / point.z, 32 + 400 * point.y / point.z, COL_GRN));
}
```

-----

Bring the two together:

```js
romPalette = [0x222222, 0xffff00, 0x1fd655, 0x5ced73, 0xff0000, 0xa020f0, 0x964b00, 0xffffff];
const palette = { grey: 0, yellow: 1, darkGreen: 2, lightGreen: 3, red: 4, purple: 5, brown: 6, white: 7 };
const model = [];
const randomDecoration = () => Math.random() < 0.5 ? palette.red : palette.purple;
const randomGreen = () => Math.random() < 0.75 ? palette.darkGreen : palette.lightGreen;
const rotateY = (p, angle) => ({ x: p.x * Math.cos(angle) - p.z * Math.sin(angle), y: p.y, z: p.x * Math.sin(angle) + p.z * Math.cos(angle), c: p.c });
let angle = 0;

function romInit() {
  model.push({ x:  0, y:-10, z: 0, c: palette.yellow });
  model.push({ x: -1, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  1, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -8, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -7, z: 0, c: palette.darkGreen });
  for (let i = 1; i < 5; i++) {       // four sections...
    for (let j = 0; j < 3; j++) {     // ...each one being three units high...
      for (let k = -i; k <= i; k++) { // ...and widening on each step
        const x = k;
        const y = -9 + i*3 + j;
        const z = 0;
        const c = y % 3 !== 0 && (x - i + j) % 2 !== 0 ? randomDecoration(): randomGreen();
        model.push({ x: x, y: y, z: z, c: c });
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    model.push({ x: 0, y: 6 + i, z: 0, c: palette.brown });
  }
}

function romLoop() {
  clearGfx();
  angle += 0.05;
  const points = [];
  model.forEach(mp => {
    const point = rotateY({ x: mp.x, y: mp.y, z: mp.z, c: mp.c}, angle);
    point.z += 135;
    points.push(point);
  });
  points.sort((a, b) => b.z - a.z); // sort by z value descending (z values increase heading "into" the screen)
  points.forEach(p => drawRectangle(Math.round(32 + 400 * p.x / p.z), Math.round(32 + 400 * p.y / p.z), 3, 3, p.c, p.c));
  drawText(0, 0, `FPS:${getFps()}`, palette.white);
}
```

* Rotating 3d tree
* Model on a flat z-axis plane
* The model array is never modified (maintain randomised colours)

-----

Then really bring the tree into the third dimension:

```js
romPalette = [0x222222, 0xffff00, 0x1fd655, 0x5ced73, 0xff0000, 0xa020f0, 0x964b00, 0xffffff];
const palette = { grey: 0, yellow: 1, darkGreen: 2, lightGreen: 3, red: 4, purple: 5, brown: 6, white: 7 };
const model = [];
const randomDecoration = () => Math.random() < 0.5 ? palette.red : palette.purple;
const randomGreen = () => Math.random() < 0.75 ? palette.darkGreen : palette.lightGreen;
const rotateY = (p, angle) => ({ x: p.x * Math.cos(angle) - p.z * Math.sin(angle), y: p.y, z: p.x * Math.sin(angle) + p.z * Math.cos(angle), c: p.c });
let angle = 0;

function romInit() {
  model.push({ x:  0, y:-10, z: 0, c: palette.yellow });
  model.push({ x: -1, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  1, y: -9, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -8, z: 0, c: palette.yellow });
  model.push({ x:  0, y: -7, z: 0, c: palette.darkGreen });
  for (let i = 1; i < 5; i++) {         // four sections...
    for (let j = 0; j < 3; j++) {       // ...each one being three units high...
      for (let k = -i; k <= i; k++) {   // ...widening on the x-axis on each step...
        for (let l = -i; l <= i; l++) { // ...and also on the z-axis :)
          const x = k;
          const y = -9 + i*3 + j;
          const z = l;
          const isDecoration = (x + z) % 2 === 0 ? j % 3 === 1 : j % 3 === 2;
          const c = isDecoration ? randomDecoration(): randomGreen();
          model.push({ x: x, y: y, z: z, c: c });
        }
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    model.push({ x: 0, y: 6 + i, z: 0, c: palette.brown });
  }
}

function romLoop() {
  clearGfx();
  angle += 0.06;
  const points = [];
  model.forEach(mp => {
    const point = rotateY({ x: mp.x, y: mp.y, z: mp.z, c: mp.c}, angle);
    point.z += 135;
    points.push(point);
  });
  points.sort((a, b) => b.z - a.z); // sort by z value descending (z values increase heading "into" the screen)
  points.forEach(p => drawRectangle(Math.round(32 + 400 * p.x / p.z), Math.round(32 + 400 * p.y / p.z), 3, 3, p.c, p.c));
  drawText(0, 0, `FPS:${getFps()}`, palette.white);
}
```

-----

Sizecoding

First pass:

```js
const model = [
  { x:  0, y:-10, z: 0, c: 1 },
  { x: -1, y: -9, z: 0, c: 1 },
  { x:  0, y: -9, z: 0, c: 1 },
  { x:  1, y: -9, z: 0, c: 1 },
  { x:  0, y: -8, z: 0, c: 1 },
  { x:  0, y: -7, z: 0, c: 2 },
]
for (let i = 1; i < 5; i++) {
  for (let j = 0; j < 3; j++) {
    for (let k = -i; k <= i; k++) {
      for (let l = -i; l <= i; l++) {
        model.push({ x: k, y: -9 + i*3 + j, z: l, c: ((k + l) % 2 === 0 ? j % 3 === 1 : j % 3 === 2) ? (Math.random() < 0.5 ? 4 : 5) : (Math.random() < 0.75 ? 2 : 3) })
      }
    }
  }
}
for (let i = 0; i < 4; i++) {
  model.push({ x: 0, y: 6 + i, z: 0, c: 6 })
}
let angle = 0
function tic() {
  cls()
  angle += .06
  const points = []
  model.forEach(mp => points.push({ x: mp.x * Math.cos(angle) - mp.z * Math.sin(angle), y: mp.y, z: mp.x * Math.sin(angle) + mp.z * Math.cos(angle) + 135, c: mp.c }))
  points.sort((a, b) => b.z - a.z)
  points.forEach(p => rect(Math.round(32 + 400 * p.x / p.z), Math.round(32 + 400 * p.y / p.z), 3, 3, p.c, p.c))
}
```

Second pass:

```js
let a=0,i,j,k,l,m=[{x:0,y:-10,z:0,c:1},{x:-1,y:-9,z:0,c:1},{x:0,y:-9,z:0,c:1},{x:1,y:-9,z:0,c:1},{x:0,y:-8,z:0,c:1},{x:0,y:-7,z:0,c:2}],p,q=Math,r=q.random,s=q.sin,t=q.cos,u=q.round
for(i=1;i<5;i++)for(j=0;j<3;j++)for(k=-i;k<=i;k++)for(l=-i;l<=i;l++)m.push({x:k,y:-9+i*3+j,z:l,c:((k+l)%2==0?j%3==1:j%3==2)?(r()<.5?4:5):(r()<.75?2:3)})
for(i=0;i<4;i++)m.push({x:0,y:6+i,z:0,c:6})
function tic(){
cls()
a+=.06
p=[]
m.forEach(n=>p.push({x:n.x*t(a)-n.z*s(a),y:n.y,z:n.x*s(a)+n.z*t(a)+135,c:n.c}))
p.sort((p,q)=>q.z-p.z)
p.forEach(q=>rect(u(32+400*q.x/q.z),u(32+400*q.y/q.z),3,3,q.c,q.c))
}
```

579 bytes:

```js
let a=0,i,j,k,l,m=[{x:0,y:-10,z:0,c:1},{x:-1,y:-9,z:0,c:1},{x:0,y:-9,z:0,c:1},{x:1,y:-9,z:0,c:1},{x:0,y:-8,z:0,c:1},{x:0,y:-7,z:0,c:2}],p,q=Math,r=q.random,s=q.sin,t=q.cos,u=q.round;for(i=1;i<5;i++)for(j=0;j<3;j++)for(k=-i;k<=i;k++)for(l=-i;l<=i;l++)m.push({x:k,y:-9+i*3+j,z:l,c:((k+l)%2==0?j%3==1:j%3==2)?r()<.5?4:5:r()<.75?2:3});for(i=0;i<4;i++)m.push({x:0,y:6+i,z:0,c:6});function tic(){cls();a+=.06;p=[];m.forEach(n=>p.push({x:n.x*t(a)-n.z*s(a),y:n.y,z:n.x*s(a)+n.z*t(a)+135,c:n.c}));p.sort((p,q)=>q.z-p.z);p.forEach(q=>rect(u(32+400*q.x/q.z),u(32+400*q.y/q.z),3,3,q.c,q.c))}
```
