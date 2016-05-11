(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["babel-polyfill"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("babel-polyfill"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function () {
  "use strict";

  //想要使用ES6新的API 一定要引入这个

  // demo 1
  function f1() {
    var n = 5;
    if (true) {
      var _n = 10;
    }
    console.log(n); // 5
  }

  // demo 2
  var PI = 3.1415;
  console.log(PI); // 3.1415

  f1();
  // PI = 3;
  // console.log(PI); // TypeError: "PI" is read-only
});