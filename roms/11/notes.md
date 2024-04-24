https://tcc.lovebyte.party/day11/

The first challenge is to create a voxel cube that rotates around two axes, the voxel cube must have an additional effect incorporated. This can be an effect like coloring the voxels or it can be a movement effect.

You can check out our [Day 11 video](https://www.youtube.com/watch?v=K68NwsLGAPc) for an overview on this structure, the code mentioned in the video is [here](https://tcc.lovebyte.party/day11/#sample-code-for-tic-80).

~~The second challenge is to keep your effect at a maximum of 256 BYTES! We are on to the compressed file formats now so lets see how many extra bytes we can squeeze in!~~

-----

I won't be using the specified packers as I'm using [fc64js](https://github.com/TheInvader360/fc64js) not the assumed tic-80 or pico8. The target size challenge no longer applies.

-----

Sample code ported to javascript and modified to better suit fc64js constraints:

```js
const sin = Math.sin;
const cos = Math.cos;
let angle = 0;

function romInit() {}

function romLoop() {
  clearGfx();
  angle += 0.01;
  const points = [];
  for (let x = -3; x < 4; x += 2) {
    for (let y = -3; y < 4; y += 2) {
      for (let z = -3; z < 4; z += 2) {
        const point = rotateX(rotateY(rotateZ({ x: x, y: y, z: z}, angle), angle), angle);
        point.z += 70;
        points.push(point);
      }
    }
  }
  points.sort((a, b) => b.z - a.z); // sort by z value descending (z values increase heading "into" the screen)
  points.forEach(point => {for (let i = 0; i < 2; i++) drawCircle(32 + 400 * point.x / point.z - i, 32 + 400 * point.y / point.z - i, 2 - i, 2 + i, 2 + i)});
}

const rotateY = (p, angle) => ({ x: p.x * cos(angle) - p.z * sin(angle), y: p.y, z: p.x * sin(angle) + p.z * cos(angle) });
const rotateX = (p, angle) => ({ x: p.x, y: p.y * cos(angle) - p.z * sin(angle), z: p.y * sin(angle) + p.z * cos(angle) });
const rotateZ = (p, angle) => ({ x: p.x * cos(angle) - p.y * sin(angle), y: p.x * sin(angle) + p.y * cos(angle), z: p.z });
```

-----

Added a nice effect:

```js
romPalette = [0x2b0f54, 0xab1f65, 0xff4f69, 0xff8142, 0xffda45, 0x3368dc, 0x49e7ec, 0xfff7f8]; // https://lospec.com/palette-list/funkyfuture-8 (reordered)

const sin = Math.sin;
const cos = Math.cos;
let angle = 0;

function romInit() {}

function romLoop() {
  clearGfx();
  angle += 0.01;
  const points = [];
  for (let x = -3; x < 4; x += 2) {
    for (let y = -3; y < 4; y += 2) {
      for (let z = -3; z < 4; z += 2) {
        const point = rotateX(rotateY(rotateZ({ x: x, y: y, z: z}, angle), angle), angle);
        point.z += 70;
        points.push(point);
      }
    }
  }
  points.sort((a, b) => b.z - a.z); // sort by z value descending (z values increase heading "into" the screen)
  points.forEach(point => {
    const baseColor = Math.floor(Math.abs((sin(point.x / 16 + angle) + sin(point.y / 16 + angle)) * 8)) % 3; // base color index of 0/1/2
    for (let i = 0; i < 2; i++) {
      const x = 32 + 400 * point.x / point.z - i;
      const y = 32 + 400 * point.y / point.z - i;
      const r = 2 - i;
      const c = (baseColor * 2 + 1 + i) // 1/3/5 for "main" circle & 2/4/6 for "highlight" circle
      drawCircle(x, y, r, c, c);
    }
  });
}

const rotateY = (p, angle) => ({ x: p.x * cos(angle) - p.z * sin(angle), y: p.y, z: p.x * sin(angle) + p.z * cos(angle) });
const rotateX = (p, angle) => ({ x: p.x, y: p.y * cos(angle) - p.z * sin(angle), z: p.y * sin(angle) + p.z * cos(angle) });
const rotateZ = (p, angle) => ({ x: p.x * cos(angle) - p.y * sin(angle), y: p.x * sin(angle) + p.y * cos(angle), z: p.z });
```

-----

Sizecoding - lazy first pass:

```js
let a=0,c=Math.cos,d,i,o,p,s=Math.sin,t,u,v,x,y,z
function tic(){
  cls()
  a+=.01
  p=[]
  for(x=-3;x<4;x+=2){
    for(y=-3;y<4;y+=2){
      for(z=-3;z<4;z+=2){
        o=t(u(v({x:x,y:y,z:z},a),a),a)
        o.z+=70
        p.push(o)
      }
    }
  }
  p.sort((a,b)=>b.z-a.z)
  p.forEach(v=>{
    for(i=0;i<2;i++){
      x=32+400*v.x/v.z-i
      y=32+400*v.y/v.z-i
      d=((Math.floor(Math.abs((s(v.x/16+a)+s(v.y/16+a))*8))%3)*2+1+i)
      circ(x,y,2-i,d,d)
    }
  })
}
t=(p,a)=>({x:p.x*c(a)-p.z*s(a),y:p.y,z:p.x*s(a)+p.z*c(a)})
u=(p,a)=>({x:p.x,y:p.y*c(a)-p.z*s(a),z:p.y*s(a)+p.z*c(a)})
v=(p,a)=>({x:p.x*c(a)-p.y*s(a),y:p.x*s(a)+p.y*c(a),z:p.z})
```

-----

Reuse w/x/y/z as general purpose variables

```js
let a=0,b,c=Math.cos,d=Math.sin,e,f,g,w,x,y,z
function tic(){
  cls()
  a+=.01
  b=[]
  for(x=-3;x<4;x+=2){
    for(y=-3;y<4;y+=2){
      for(z=-3;z<4;z+=2){
        w=e(f(g({x:x,y:y,z:z},a),a),a)
        w.z+=70
        b.push(w)
      }
    }
  }
  b.sort((a,b)=>b.z-a.z)
  b.forEach(v=>{
    for(w=0;w<2;w++){
      z=((Math.floor(Math.abs((d(v.x/16+a)+d(v.y/16+a))*8))%3)*2+1+w)
      circ(32+400*v.x/v.z-w,32+400*v.y/v.z-w,2-w,z,z)
    }
  })
}
e=(p,a)=>({x:p.x*c(a)-p.z*d(a),y:p.y,z:p.x*d(a)+p.z*c(a)})
f=(p,a)=>({x:p.x,y:p.y*c(a)-p.z*d(a),z:p.y*d(a)+p.z*c(a)})
g=(p,a)=>({x:p.x*c(a)-p.y*d(a),y:p.x*d(a)+p.y*c(a),z:p.z})

```

-----

517 bytes:

```js
let a=0,b,c=Math.cos,d=Math.sin,e,f,g,w,x,y,z;function tic(){cls();a+=.01;b=[];for(x=-3;x<4;x+=2)for(y=-3;y<4;y+=2)for(z=-3;z<4;z+=2)w=e(f(g({x:x,y:y,z:z},a),a),a),w.z+=70,b.push(w);b.sort((a,b)=>b.z-a.z);b.forEach(v=>{for(w=0;w<2;w++)z=((~~(Math.abs((d(v.x/16+a)+d(v.y/16+a))*8))%3)*2+1+w),circ(32+400*v.x/v.z-w,32+400*v.y/v.z-w,2-w,z,z)})}e=(p,a)=>({x:p.x*c(a)-p.z*d(a),y:p.y,z:p.x*d(a)+p.z*c(a)});f=(p,a)=>({x:p.x,y:p.y*c(a)-p.z*d(a),z:p.y*d(a)+p.z*c(a)});g=(p,a)=>({x:p.x*c(a)-p.y*d(a),y:p.x*d(a)+p.y*c(a),z:p.z})
```

That'll do :)
