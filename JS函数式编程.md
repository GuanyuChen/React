[TOC]
###JavaScript函数式编程

**什么是函数式编程**  

函数式编程是一种编程范式，常见的编程范式有 *命令式编程(Imperative programming)*, *函数式编程*, *逻辑式编程*.  
面向对象编程也是一种命令式编程。  
函数式编程中，函数是一等公民。比较流行的函数式编程语言，Haskell 和 Lisp

函数式编程的好处：  
函数即不依赖外部的状态也不修改外部的状态，函数调用的结果不依赖调用的时间和位置，这样写的代码容易进行推理，不容易出错。使得单元测试和调试都更容易。

>下面是函数式编程在JavaScript中的简单应用

####1.纯函数式

>纯函数式：相同的参数返回相同的结果，执行不依赖于系统的状态

函数式编程的核心就是借助形式化数学来描述逻辑：lambda运算。数学家们喜欢将程序描述为数据的变换，这也引入了第一个概念：纯函数。纯函数无副作用，仅仅依赖于函数的输入，并且当输入相同时输出保持一致。

1)非纯净的

    let number = 1;
    const increment = () => number += 1;
    increment();
    // 2

2)纯净的

    const increment = n => n + 1;
    increment(1);
    // 2

####2.高阶函数

函数把其他函数当做参数传递使用或者返回一个函数

1)加法

    const sum = (x,y) => x + y;
    const calculate = (fn,x,y) => fn(x,y);
    
    calculate(sum,1,2);
    // 3

######???
2)filter

    let students = [
        {name:'anna',grade:6},
        {name:'nick',grade:5},
        {name:'frank',grade:9}
    ];
    
    const isApproved = student => student.grade >= 6;
    students.filter(isApproved);
    // [{name:'anna',grade:6},{name:'frank',grade:9}]

3)Map

    const byName = obj => obj.name;
    
    students.map(byName);
    // ['anna','nick','frank']

4)链式

    let students = [
        {name:'anna',grade:6},
        {name:'nick',grade:3},
        {name:'frank',grade:9}
    ];
    
    const isApproved = student => student.grade >= 6;
    const byName = obj => obj.name;
    
    students.filter(isApproved).map(byName);
    //['anna','frank']

5)Reduce

    const totalGrades = students.reduce((sum,student) => sum + student.grade,0);
    
    totalGrades;
    // 19

####3.递归

1)递减

    const countdown = num => {
        if (num > 0) {
            console.log(num);
            countdown(num - 1);
        }
    }
    countdown(5);   //5,4,3,2,1

2)阶乘

    const factorial = num => {
        if (num <= 0) {
            return 1;
        } else {
            return (num * factorial(num - 1));
        }
    }
    factorial(5);   //120

####4.Functor

有map方法的对象。functor的map方法通过map回调函数调用自己的内容，然后返回一个新的functor。

1)给数组所有的元素添加一个值

    const plus1 = num => num + 1;
    let numbers = [1,2,3];
    numbers.map(plus1); //[2,3,4]

####5.组合

通过组合两个函数生成一个新的函数

1)组合两个函数生成一个新的函数

    const compose = (f,g) => x => f(g(x));
    
    const toUpperCase = x => x.toUpperCase();
    const exclaim = x => `${x}!`;
    
    const angry = compose(exclaim,toUpperCase);
    
    angry('stop this'); //'STOP THIS'

2)组合三个函数生成一个新函数

    const compose = (f,g) => x => f(g(x));
    
    const toUpperCase = x => x.toUpperCase();
    const exclaim = x => `${x}!`;
    const moreExclaim = x => `${x}!!!!`;
    
    const reallyAngry = compose(exclaim,compose(toUpperCase,moreExclaim));
    
    reallyAngry('stop');    //'STOP!!!!'

####6.解构

从对象或数组中利用模式匹配提取数据

1)Select from pattern

    const foo = () => [1,2,3];
    
    const [a,b] = foo();    //[1,2]

2)接收rest值

    const [a,...b] = [1,2,3];   //a = 1  b = [2,3]

3)可选参数

    const ajax = ({url = 'localhost',port:p = 80},...data) => console.log("Url:", url, "Port:", p, "Rest:", data);
    
    ajax({url:'someHost'},'additional','data','hello');
    // Url:someHost Port:80 ['additional','data','hello']
    
    ajax({},'additional','data','hello');
    // Url:localHost Port:80 ['additional','data','hello']

####7.柯里化

一个函数有多个参数，把每个参数通过链式的形式返回下一个函数，直到最后返回结果

1)对象柯里化

    const student = name => grade => `Name:${name} | Grade:${grade}`;
    
    student('Matt')(8);
    // Name:Matt | Grade:8

2)加法函数柯里化

    const add = x => y => x + y;
    const increment = add(1);
    const addFive = add(5);
    
    increment(3);   //4
    addFive(5);     //10

####参考资源

* [https://www.zhihu.com/question/28292740][1]
* [https://github.com/js-functional/js-funcional][2]
* [https://zhuanlan.zhihu.com/p/20824527][3]

[1]: https://www.zhihu.com/question/28292740 (链接提示)
[2]: https://github.com/js-functional/js-funcional (链接提示)
[3]: https://zhuanlan.zhihu.com/p/20824527 (链接提示)














