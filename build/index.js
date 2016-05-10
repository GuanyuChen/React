(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["babel-runtime/core-js/array/from", "babel-polyfill"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("babel-runtime/core-js/array/from"), require("babel-polyfill"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.from, global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function (_from) {
  "use strict";

  var _from2 = _interopRequireDefault(_from);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //想要使用ES6新的API 一定要引入这个

  console.log((0, _from2.default)("aaaa"));

  var sum = function sum(x, y) {
    return x + y;
  };
  var a = sum(1, 2);
  console.log(a);
});