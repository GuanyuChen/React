import "babel-polyfill";	//想要使用ES6新的API 一定要引入这个

// demo 1
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}

// demo 2
const PI = 3.1415;
console.log(PI); // 3.1415

f1();
// PI = 3;
// console.log(PI); // TypeError: "PI" is read-only