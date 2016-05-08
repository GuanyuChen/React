(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.index = mod.exports;
  }
})(this, function () {
  "use strict";

  var sum = function sum(x, y) {
    return x + y;
  };
  var a = sum(1, 2);
  console.log(a);
});