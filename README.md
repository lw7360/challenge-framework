[challenge-framework](http://larrywu.com/challenge-framework/)
===================


#1. Esprima vs Acorn. 

I ended up picking Acorn. 

Esprima's own [tests](http://esprima.org/test/compare.html) show that Acorn is on the order of milliseconds faster that Esprima. This probably doesn't translate to any sort of meaningful improvement for the user, but it's still nice to be able to say that you're faster. 

Documentation wise, Acorn won here too. At least for me personally, I found acorn's README to be more helpful than Esprima's documentation page. Furthermore, Acorn's source code was more readable than Esprima's, plus it was made pretty with Docco, which is always nice. 

Some other factors. Acorn has support for ECMAScript 4, 5, and 6. Esprima just 5.1 and partially 6. Acorn is also a cooler name than Esprima.

#2. Browser Support.

I tested Firefox, Chrome, and Safari on my own Mac Book Pro, and everything seemed to work fine. I used BrowserStack to test IE, and it also seemed to be in working condition.

#3. API.

#4. Text editor
I used Ace. It's very pretty.

#5. Not blocking.
To make sure