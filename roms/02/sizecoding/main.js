let t=0;function tic(){t++;cls(0);rect(0,42,64,22,1,1);circ(32,40,12,2,1);circ(32,23,8,2,1);for(let i=0;i<3;i++)line(32,24+i,37,26,3);[29,34].map(x=>rect(x,21,2,2,4));for(let i=0;i<32;i++)pix((t/4+i*14)%64,(t/2+i*6)%64,1)}