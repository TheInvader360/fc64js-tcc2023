let d,e,i,m=Math,p=poke,t=0,v,w,x,y;function tic(){t++;for(i=0;i<4096;i++){x=i%64;y=~~(i/64);v=x-32;w=y-32;d=m.sqrt(v*v+w*w+1);e=~~(t/264)%4;if(e<4)p(i,d<5?3:(~~((m.atan2(w,v)+m.PI)*2.546)^~~(60/d+t/16))%4+1);if(e<3)p(i,~~((m.sin(x/5+t/9)+m.sin(y/5+t/9))+t/9+9)%6+1);if(e<2)p(i,175/d>32?3:~~(((m.atan2(w,v)+t/5)/0.9+175/d)%7));if(e<1)p(i,~~(x+20*t/50+y*t/50)%6+1)}for(i=0;i<6;i++)dText(64+i*12-(t/4)%136,m.cos(-i+t/16)*16+30,'FC64JS'[i],7)}