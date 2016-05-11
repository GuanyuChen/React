import "babel-polyfill"; //想要使用ES6新的API 一定要引入这个

let human = {
	breath() { //定义函数无需function关键字
		console.log('hahaha');
	}
}

let worker = {
	__proto__: human, //__proto__属性定义原型
	company: "baidu",
	work() {
		console.log('working');
	}
}