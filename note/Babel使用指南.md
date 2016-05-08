[TOC]
###Babel使用指南
####简单介绍
* Babel是一个通用的多用途JavaScript编译器  
* 将ES6语法转换成ES5可在浏览器中执行的语法  
* 支持语法扩展，能支持像React所用的JSX语法，同时还支持用于静态类型检查的流式语法(Flow Syntax)

####安装Babel
#####babel-cli
Babel的CLI是一种在命令行下使用Babel编译文件的简单方法  

    $ npm install --global babel-cli    //全局安装
    $ babel file.js     //编译文件 这条命令将编译后的结果输出到终端

    $ babel file.js --out-file compiled.js      //将编译结果写入compiled.js
    $ babel file.js -o compiled.js              //结果与上条一样

    $ babel dir1 --out-dir dir2     //把整个目录编译成一个新目录
    $ babel dir1 -d dir2

在项目内运行Babel CLI

PS:尽管可以把babel全局安装在机器上，但是按项目安装会更好  
1. 在同一台机器上的不同项目或许会依赖不同版本的babel并允许你有选择的更新
2. 对工作环境没有隐式依赖，让项目有很好的移植性并且易于安装

    $ npm install --save-dev babel-cli  //在项目本地安装babel-cli

>注意：全局运行Babel是一个坏习惯，想要卸载全局版本`npm uninstall --global babel-cli`。

安装完成后，`package.json`如下所示：
    
    {
        "name":"my-project",
        "version":"1.0.0",
        "devDependencies":{
            "babel-cli":"^6.0.0"
        }
    }

现在，我们不直接从命令行运行Babel了，取而代之我们把运行命令写在**npm scripts**里，这样可以使用Babel的本地版本  
只需将`"scripts"`字段添加到你的`package.json`文件内并把Babel命令写成`build`字段。

    {
        "name":"my-project",
        "version":"1.0.0",
        "scripts":{
            "build":"babel src -d lib"
        },
        "devDependencies":{
            "babel-cli":"^6.0.0"
        }
    }

现在可以在终端里运行:
    
    npm run build 

这将以与之前同样的方式运行Babel，但这一次我们使用的是本地副本

PS:babel 6.0.0以后，默认不做任何事情，一切事情都要安装preset和plugins

#####babel-node

如果要用`node`CLI来运行代码，那么整合Babel最简单的方式就是使用`babel-node`CLI，它是`node`CLI的替代品。

但请注意这种方法不适合正式场频环境使用。直接部署用此方式编译的代码不是好的做法。在部署之前预先编译会更好。不过用在构建脚本或是其他本地运行的脚本是非常合适的。

首先确保`babel-cli`已经安装了。

    $ npm install --save-dev babel-cli

然后用`babel-node`来替代`node`运行所有的代码

    {
        "scripts":{
           -"scripts-name":"node script.js"
           +"scripts-name":"babel-node script.js" 
        }
    }

>提示：你可以使用`npm-run`

#####babel-core

如果要以编程的方式来调用Babel的API进行转码，就可以使用`babel-core`这个模块

    $ npm install babel-core    //安装

    var babel = require("babel-core");  //引用这个模块

字符串形式的JavaScript代码可以直接使用`babel.transform`来编译。

    babel.transform("code();",options);     // =>{code,map,ast}

文件的话可以使用异步API：

    babel.transformFile("filename.js",options.function(err,result) {
        result;     // =>{code ,map ,ast}
    });

或者是同步API:

    babel.transformFileSync("filename.js",options);     // =>{code,map,ast}

要是已经有一个Babel AST(抽象语法树)，就可以直接从AST进行转换

    babel.transformFromAST(ast,code,options);   // =>{code,map,ast}

####配置Babel

通过安装 **插件(plugins)** 或 **预设(presets,也就是一组插件**来指示babel去做什么事情

#####.babelrc

先创建一个配置文件，在项目的根路径下创建`.babelrc`文件

    {
        "presets":[],
        "plugins":[]
    }

这个文件就是用来让babel做你要他做的事情的配置文件。

#####babel-preset-es2015

让Babel把ES6语法编译成ES5

先安装"es2015"Babel预设

    $ npm install --save-dev babel-preset-es2015

修改`.babelrc`来包含这个预设

    {
        "presets":[
            "es2015"
        ],
        "plugins":[]
    }

#####babel-preset-react

    $ npm install --save-dev babel-preset-react     //先安装react预设

再修改`.babelrc`

    {
        "presets":[
            "es2015",
            "react"
        ],
        "plugins":[]
    }

PS:先安装预设，再添加到配置文件

####执行Babel生成的代码
#####babel-polyfill

Babel默认只转换新的JavaScript句法(syntax)，而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法都不会转码。 **要想让这些方法运行，必须使用babel-polyfill,为当前环境提供一个垫片**

    $ npm install --save babel-polyfill     //安装

    import "babel-polyfill";                //在文件顶部导入polyfill

#####babel-runtime

为了实现ECMAScript规范的细节，babel会使用助手方法保持生成代码的整洁。

由于这些助手方法可能会特别长且会被添加到每个文件顶部，所以可以把 **它们统一移动到一个单一的"运行时间(runtime)"** 中

先安装`babel-plugin-transform-runtime`和`babel-runtime`来开始

    $ npm install --save-dev babel-plugin-transform-runtime
    $ npm install --save babel-runtime

更新`.babelrc`

    {
        "plugins":[
            "transform-runtime",
            "transform-es2015-classes"
        ]
    }

####配置Babel（进阶）

#####手动指定插件

先安装：

    $ npm install --save-dev babel-plugin-transform-es2015-classes

更新`.babelrc`

    {
        "plugins":[
            "transform-es-2015-classes"
        ]
    }

#####插件选项

    {
       "plugins":[
            ["transform-es-2015-classes",{"loose":true}]
        ] 
    }

#####基于环境自定义Babel

    {
        "presets":["es2015"],
        "plugins":[],
        "env":{
            "development":{
                "plugins":[...]
            },
            "production":{
                "plugin":[...]
            }
        }
    }

Babel根据当前环境来开启`env`下的配置

当前环境可以使用`process.env.BABEL_ENV`来获取。如果`BABEL_ENV`不可用，并且如果后者也没有设置，缺省值是`development`。

######UNIX

    $ BABEL_ENV=production [COMMAND]
    $ NODE_ENV=production [COMMAND]

######Windows

    $ SET BABEL_ENV=production
    $ [COMMAND]

>[COMMAND]指任意一个用来运行Babel的命令（`babel`,`babel-node`,`node`）

####静态分析工具

#####语法检查(linting)

ESLint是最流行的语法检查工具之一

    $ npm install --save-dev eslint babel-eslint    //安装

创建或使用项目现有的`.eslintrc`文件并设置`parser`为`babel-eslint`

    {
        "parser":"babel-eslint",
        "rules":{
            ...
        }
    }

添加一个`lint`任务到npm的`package.json`脚本中

    {
        "name":"my-module",
        "script":{
            "lint":"eslint my-files.js"
        },
        "devDependencies":{
            "babel-eslint":"...",
            "eslint":"..."
        }
    }

最后运行这个任务

    $ npm run lint

#####代码风格

JSCS是一个极受欢迎的工具，在语法检查的基础上进一步检查代码自身的风格

    $ jscs . --esnext

或者在`.jscsrc`文件里添加`esnext`选项

    {
        "preset":"airbnb",
        "esnext":true
    }

####课上总结

#####插件管理

babel强大的功能实现依赖于层出不穷的 presets 和 plugins 

* babel-plugin-transform-es2015-modules-umd (代码风格)
* babel-plugin-transform-runtime (代码精简)
* babel-preset-es2015 (解析ES6语法)
* babel-preset-react  (解析JSX语法)

PS:每安装一个preset或plugin，一定要在.babelrc中更新配置
