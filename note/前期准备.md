[TOC]
#React学习笔记
##2016/4/29
###前期准备
* ES6   //掌握ECMAScripts最新语法
* Babel //将ES6代码转换成浏览器或Node可运行的ES5代码 (Node V6.0支持93%ES6特性)
* npm   //强大的包管理器
* webpack   //模块加载器 构建工具

###React特点
* 库，不是框架(框架更注重自己的思想，比如Augular)
* 专注于UI
* 组件化开发 && JSX语法
* 虚拟DOM，高效渲染
* 单向数据流
* 支持服务端渲染
* 生态完善 tools/Redux/Router/React Native...

>几种特殊的数据结构
>Map:键值对集合，对应于Object  
>List:有序可重复列表，对应于Array  
>Set:无序且不可重复的列表  

##2016/4/30
###基本shell命令
mkdir 新建路径
    
    $ mkdir dirname

touch 新建文件

    $ touch filename

pwd 显示当前路径

    $ pwd

cat 显示文件内容

    $ cat a.js

rm 删除文件或目录

    $ rm -r dir

cp 文档的复制

    $ cp file1 file2    文件file1复制成file2
    $ cp -R dir1 dir2   复制整个路径

mv 移动文件

    $ mv file1 file2    文件file1更名为file2
    $ mv file1 dir      文件file1移动到dir下

grep 搜索

    $ grep string file  在file中查找string

