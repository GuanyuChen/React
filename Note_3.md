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




    








