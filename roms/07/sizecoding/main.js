let a,d,i,m=Math,r,s,t=0,x,y;function tic(){t+=.4;for(i=0;i<4096;i++){x=i%64;y=~~(i/64);a=~~(((m.atan2(y-8,x-8)+t/24)+9)*5)%2;d=m.hypot(x-8,y-8);r=32+m.sin(t/64)*y/4;s=(y/4-t%8/4)%2<1?0:1;poke(i,y<32?(d<8?0:d<8+(t/3%2)?a:a+2)%8:x<r-y/3||x>r+y/3?4+s:6+s)}}