https://tcc.lovebyte.party/day6/

The first challenge is to get an animated sine scroller effect on the screen! Use a for loop to cycle through each character and animate its height with a sin value!

You can check out our [Day 6 video](https://www.youtube.com/watch?v=qUOlRYzs4_s) for an overview on this type of effect.

The second challenge is to keep your effect at a maximum of 256 characters. You should have plenty of room to play around with adding a background effect also, but you can always try for 128 if you need a bit more of a challenge!

-----

Can't alias ```drawText``` as ```print``` to match tic-80 in ```uncounted.js```, so used ```dText``` instead - 5 chars is 5 chars...

-----

I could shorten the code further by simplifying the demo - simpler background effect, no nice "end" to the tunnel, a much shorter message, drop the flashing text, introduce imperfections to the tunnel (e.g. replace ```m.PI)*2.546``` with ```3)*2```), etc... I *could* do all of that, but I won't :D I like the demo as it stands and am happy to accept defeat on the sizecoding. I think I managed to get a pretty nice result for just 285 bytes!
