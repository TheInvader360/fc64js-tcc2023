let s=Math.sin,t=0;function tic(){t++;for(let y=0;y<64;y++)for(let x=0;x<64;x++)pix(x,y,~~((s(x/5+t/9)+s(y/5+t/9))+t/9+9)%8)}