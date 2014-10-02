window.challenge = (function() {
  // Options for acorn.js
  var acornOptions = {
    ecmaVersion : 6,
  };

  // Clones an object's keys.
  var keyClone = function(obj, bool) {
    var cloned = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      cloned[keys[i]] = bool;
    }
    return cloned;
  }

  var challenge = {
    parse: function(str) {
      var whitelistCheck = keyClone(this.whitelist, false);
      var blacklistCheck = keyClone(this.blacklist, true);
      var structCheck = keyClone(this.struct, false);

      var visitors = {};

      var checker = function(node) {
        if (node.type in whitelistCheck) {
          whitelistCheck[node.type] = true; 
        }
        if (node.type in blacklistCheck) {
          blacklistCheck[node.type] = false; 
        }
      };

      var struct = this.struct;

      var checkStruct = function(state) {
        for (key in structCheck) {
          if (!structCheck[key]) {
            var outline = struct[key];

            for (var i = 0; i < state.length; i++) {
              if (outline[state[i].type] === null) {
                structCheck[key] = true;
                break;
              }
              if (outline[state[i].type] !== undefined) {
                outline = outline[state[i].type];
              }
            }
          }
        }
      };

      for (prop in whitelistCheck) {
        visitors[prop] = checker;
      }

      for (var prop in blacklistCheck) {
        visitors[prop] = checker;
      }

      var parsed = acorn.parse(str, acornOptions); 
      //acorn.walk.simple(parsed, visitors); 
      acorn.walk.challenge(parsed, visitors, null, null, checkStruct); 

      return {
        whitelist: whitelistCheck,
        blacklist: blacklistCheck,
        struct: structCheck
      };
    },
    whitelist: {},
    blacklist: {},
    struct: {}
  };
  return challenge;
}());
