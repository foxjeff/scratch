// Generated by CoffeeScript 1.8.0

var bar, foo, baz;
window.debug = require('debug')('stuff');

baz = function() {

  window.debug("doing stuff in %s",'baz');
  console.log("baz");
  return bar();
};

bar = function() {
  debug("doing stuff in %s",'bar');
  
  console.log("bar");
  return foo();
};

foo = function() {
  debug("doing stuff in %s",'foo');

  return console.log("foo");
};
baz()
module.exports = baz;

