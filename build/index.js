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

	var human = {
		breath: function breath() {
			//定义函数无需function关键字
			console.log('hahaha');
		}
	};

	var worker = {
		__proto__: human, //__proto__属性定义原型
		company: "baidu",
		work: function work() {
			console.log('working');
		}
	};
});