[challenge-framework](http://larrywu.com/challenge-framework/)
===================


#1. Esprima vs Acorn. 

I ended up picking Acorn. 

Esprima's own [tests](http://esprima.org/test/compare.html) show that Acorn is on the order of milliseconds faster that Esprima. This probably doesn't translate to any sort of meaningful improvement for the user, but it's still nice to be able to say that you're faster. 

Documentation wise, Acorn won here too. At least for me personally, I found Acorn's README to be far more helpful than Esprima's documentation page. Furthermore, Acorn's source code was much more readable than Esprima's, and it was styled with Docco, which is always nice.

Both support a fairly wide array of browsers. Acorn also comes with an AST walker utility method, which was really helpful.
#2. Browser Support.

I tested Firefox, Chrome, and Safari on my own Mac Book Pro, and everything seemed to work fine. I used BrowserStack to test IE, and everything still seemed to be in working order.

#3. API.

Set Whitelist requirements with...

    challenge.whitelist = {
      // Requirement : Description,
      "ForStatement" : "Use a for loop",
      "VariableDeclaration" : "Declare a variable"
    }

You can set Blacklist requirements similarly with...

    challenge.blacklist = {
      // Requirement : Description,
      "WhileStatement" : "Don't use a while loop"
    }
Setting Structure requirements are a little bit different...

    challenge.struct = {
      // Description : {Structure : null}
      "'for loop' and inside of it 'if statement'." : {
        "ForStatement" : {
          "IfStatement" : null
        }
      }
    };
    
After setting some requirements, call `challenge.parse(code)`  where `code` is the JS code you want to check vs the requirements you set. `parse` will return an object like this...

    {
        whitelist : {
            "ForStatement" : true, // Found a "ForStatement"
            "VariableDeclaration": true
        },
        blacklist : {
            "WhileStatement" : false // Found a "WhileStatement"
        },
        struct : {
            "'for loop' and inside of it 'if statement'." : false // "Didn't find this kind of structure"
        }
    }

#4. Text editor
I used Ace. It's very pretty.

#5. Not blocking.
Ace has an `onchange` event, which is what I listened for to begin running the tests. I wrapped everything in a try...catch statement so Acorn parsing errors wouldn't prevent the user from typing. I also used setTimeout(..., 0), to make sure that running the tests won't block I/O.