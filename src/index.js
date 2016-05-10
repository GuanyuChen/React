import "babel-polyfill";	//想要使用ES6新的API 一定要引入这个

console.log(Array.from("aaaa"));

const sum = (x,y) => x + y;
let a = sum(1,2);
console.log(a);