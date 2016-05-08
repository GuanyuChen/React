[TOC]
###ES6基本语法

####1.Let + Const 块级作用域和常量

`let`
1. 定义局部变量，只在当前作用域内有效
2. 不存在变量提升
3. 不受外界作用域影响
4. 不允许重复声明

`const`
1. 定义常量，只在当前作用域内有效
2. 声明后，常量值不能改变
3. 不存在变量提升
4. 不能重复声明
5. 指向常量所在地址

####2.Arrows箭头函数

ES6中新增箭头操作符`=>`，简化函数的书写。操作符左边为输入的参数，右边则是进行的操作以及返回的值`inputs=>outputs`

JS中回调是经常的事，一般回调以匿名函数的形式出现，每次都要写一个function，甚是繁琐。可以引用箭头操作符后可以方便的写回调

    var arr = [1,2,3];
    
    //传统写法
    arr.forEach(function(v,i,a){
        console.log(v);
    })
    
    //ES6
    arr.forEach(v => console.log(v));

####3.Class,extends,super类的支持

ES5中继承由原型链来实现，ES6添加了对class的支持

    //类的定义
    class Animal {
        //ES6中新型构造器
        constructor(name) {
            this.name = name;
        }
        //实例方法
        sayName() {
            console.log('mynameis'+this.name);
        }
    }
    
    //类的继承
    class Programmer extends Animal {
        constructor(name) {
            super(name);    //直接调用父类的构造方法进行初始化
        }
        program() {
            console.log('imcoding');
        }
    }
    
    //测试
    var animal = new Animal('dog'),
        cgy = new Programmer('cgy');
    animal.sayName();   //输出'mynameisdog'
    cgy.sayName();    //输出'mynameiscgy'
    cgy.program();    //输出'imcoding'

####4.Enhanced Object Literals 增强的对象字面量

* 可以在对象字面量里定义原型
* 定义方法可以不用function关键字，直接调用父类方法 

与类的概念更加吻合

    //通过对象字面量创建对象
    var human = {
        breath() {
            console.log('breathing');
        }
    };
    var worker = {
        _proto_:human,  //设置原型为human 相当于继承human
        company:'baidu',
        work() {
            console.log('working');
        }
    };
    human.breath(); //输出breathing
    //调用继承来的breath方法
    worker.breath();    //输出breathing

####5.Template Strings 字符串模板

ES6中允许使用反引号来创建字符串，此种方法创建的字符串可以用${}来引用变量值

    //产生一个随机数
    var num = Math.random();
    //输出
    console.log(`your num id ${num} `);

####6.Destructuring 解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，称为解构赋值.

若一个函数要返回多个值，常规的做法是返回一个对象，将每一值作为对象的属性返回。在ES6中可以直接返回一个数组，进行解构赋值。

    var [x,y] = getVal(),   //函数返回值的解构 
        [a,b] = ['123','abc','hahaha'];     //a = 123 b = abc
    function getVal() {
        return [1,2];   //x = 1 y = 2
    }

    'use strict'
    let [foo ,[[bar] ,baz]] = [1 ,[[2] ,3]];     //foo=1 bar=2 baz=3 数组解构
    var {foo,bar} = {foo:'aaa',baz:'bbb',bar:"ccc"};    //foo='aaa' bar='ccc'  对象解构
    const[a,b,c,d,e] = 'hello'; //字符串解构

####7.Default + Rest + Spread

#####Default 默认参数值

ES6支持在自定义函数时为参数赋默认值

    function sayHello(name) {
        //传统默认值
        var name = name || 'dudu';
        console.log('hello'+name);
    }
    //ES6赋默认值
    function sayHello2(name = 'dude') {
        console.log(`hello ${name}`);
    }

#####Rest 剩余参数

不定参数是在函数中使用命名参数来接收不定数量的未命名参数，是一种语法糖。以前的JavaScript中可以用`arguments`变量来达到目的。

不定参数的格式是在 **三个句点后跟所有代表不定参数的变量名** 

    //rest 例子
    function restFunc(a,...rest) {
        console.log(a);
        console.log(rest);
    }

#####Spread 扩展操作符???这有问题

允许传递数组或者类数组直接作为函数的参数而不用通过`apply`

    var people = {'zf','john','nick'};
    
    function sayHello(people1,people2,people3) {
        console.log('hello ${people1},${people2},${people3}');
    }
    //但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个参数
    sayHello(...people);    //输出hello zf,john,nick
    
    //以前，如果需要传递数组当参数
    sayHello().apply(null,people);

####Map,Set和WeakMap,WeakSet

新的数据结构，提供更方便的获取属性值的方法，不用像以前一样用`hasOwnProperty`来检查某个属性是属于原型链还是实例。同时在属性值的设置和获取上有专门的`get` `set`方法

**Set中不允许出现重复的数据** 

    //Sets
    var s = new Set();
    s.add('hello').add('goodbye').add('hello'); //添加了两条 
    s.size === 2;
    s.has('hello') === true;

**Maps是键值对(key-value)**

    //Maps
    var m = new Map();
    m.set('hello',42);
    m.set(s,34);
    m.get(s) == 34;

######？？？

有时候我们会把对象作为一个对象的键用来存放属性值，普通集合类型比如简单对象会阻止垃圾回收器对这些作为属性键存在的对象的回收，有 *内存泄露* 的危险。而`WeakSet` `WeakMap`更安全些,这些作为属性键的对象如果没有别的变量引用它们，则会被回收释放掉。

    //WeakMap
    var wm = new WeakMap();
    wm.set(s,{extra:42});
    wm.size === undefined;

    //WeakSet
    var ws = new WeakSet();
    ws.add({data:42});  //因为添加到ws的临时对象没有其他变量引用它，所以ws不会保留它的值 这次添加没有任何意义

####9.Proxies

Proxy可以监听对象身上发生了什么事情，并在事情发生后执行一些操作。让我们对对象有很强的追踪能力，在数据绑定方面也很有用处

    //定义被监听的目标对象
    var engineer = {name:'nick',salary:50};
    
    //定义处理程序
    var interceptor = {
        set:function (receiver, property, value) {
            console.log(property,'changed to',value);
            receiver[property] = value;
        }
    };
    
    //创建代理以进行监听
    engineer = Proxy(engineer,interceptor);
    //做一些改动来触发代理
    engineer.salary = 60;   //控制台输出：salary changed to 60

处理程序，是在被监听的对象发生相应事件后，调用处理程序里的方法。上面的例子我们设置`set`的处理函数，表明当我们监听的对象的属性被更改，被`set`了，处理程序就被调用。

####10.Object assign

Object assign 用于对象的合并。

    var target = {a:1};
    
    var source1 = {b:2};
    var source2 = {c:3};
    
    object.assign(target,source1,source2);  //把后两个对象合并到target上
    console.log(target);    //{a:1,b:2,c:3}

####11.Promises

Promises是处理异步操作的一种模式。

    //创建promise
    var promise = new Promise(function(resolve,reject){
        //进行一些异步操作
        if (/*成功*/) {
            resolve('success!');
        } else {
            reject(Error("broken"));
        }
    });
    //绑定处理程序
    promise.then(function(result){
        //promise成功 执行
        console.log(result);    //输出'success!'
    },function(err){
        //promise失败 执行
        console.log(err);   //输出'Error:broken!'
    });

使用promise模拟一个ajax方法

    var getJSON = function(url) {
        var promise = new Promise(function(resolve,reject){
            var client = new XMLHttpRequest();
            client.open("GET",url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept","application/json");
            client.send();
            
            function handler() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            }    
        });
        
        return promise;
    }
    
    getJSON("/posts.json").then(function(json){
        console.log('Contents: ' + json);
    },function(error){
        console.log("出错了",error);
    });

####12.Decorator???

修饰器(Decorator)是一个表达式，用来修改类的行为。

redux类库会频繁的用到decoraotr

先要配置babel的插件来解析decorator

    //官网提供了babel-plugin-transform-decorators 不一定工作...
    $ npm insatll babel-plugin-transform-decorators-legacy --save-dev

再配置`babelrc`的plugins字段

    {
        "presets":["es2015","react","stage-0"],
        "plugins":["transform-decorators-legacy"]
    }

使用decorator示例语法

    function testable(target) {
        target.isTestable = true;
    }
    @testable
    class MyTestableClass{}
    
    console.log(MyTestableClass.isTestable);    //true

####13.Modules 模块

ES6逐渐支持moudule 模块化。将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用。

简单使用方式：

    //point.js
    export class Point {
        constructor (x,y) {
            public x = x;
            public y = y;
        }
    }
    
    //myapp.js
    //尽管声明了引用的模块，还是可以通过制定需要的部分进行导入
    import Point from "point";
    
    var orgin = new Point(0,0);
    console.log(orgin);

#####export

    //demo1:简单使用方式
    export var firstName = 'hand';
    export var lastName = 'nick';
    export var year = 1958;
    
    //等价于
    var firstName = 'hand';
    var lastName = 'nick';
    var year = 1958;
    
    export {firstName,lastName,year};

    //demo2:还可以这样
    function v1(){...}
    function v2(){...}
    
    export {
        v1 as streamV1,
        v2 as streamV2,
        v2 as streamLatestVersion
    };

    //demo3:需要注意的是
    
    //报错
    function f() {}
    export f;
    
    //正确
    export function f() {};

export的默认输出

    export default function () {
        console.log('foo');
    }

`export default`命令为模块指定默认输出。这样其他模块加载该模块是，import命令可以为该匿名函数指定任意名字。

**import命令后面，不使用大括号**

ES6模块加载机制 与 CommonJS 模块的不同:

1. CommonJS模块输出的是被输出值的拷贝。一旦输出一个值，模块内部的变化就影响不到这个值;ES6模块输出的是值的引用
2. ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会执行模块，而是只生成一个动态的只读引用。等到真正需要用到时，再到模块里取值。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

#####import

    //1
    import $ from 'jquery';
    //2
    import {firstName,lastName,year} from './profile';
    //3
    import React,{Component,PropTypes} from 'react';
    //4
    import * as React from 'react';







    








