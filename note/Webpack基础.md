[TOC]

### Webpack基础

webpack是一款强大的 **模块加载器兼打包工具** ，能把各种资源，例如JS(含JSX)、coffee、样式(含less/sass)、图片等都作为模块来处理。

![webpack示意图][img1]

##### webpack的特别之处

* 插件plugins: rich plugins & flexible
* 构建性能Performance: async I/O
* 加载器Loaders: bundle any static resourse
* 对模块的支持Support: supports AMD and CommonJS module styles & support most existing libraries
* 代码拆分Code Spliting: split your codebase into chunks(块)
* 性能优化Optimizations: can do many optimizations to reduce the output size & handle request caching 
* 开发者工具Development Tools: SourceMaps & development server
* 多端适用Multiple targets:web & node.js  

#### 1.初始化项目 

创建一个项目

    $ mkdir webpack-demos && cd webpack-demos
    $ git init 
    $ touch README.md .gitignore
    $ npm init

编辑.gitignore 

    node_modules
    *.log*
    .idea

建立src和build两个目录

    # src 存放源码，build存放编译打包后的资源
    $ mkdir src build
    $ cd src && touch index.js component.js
    $ cd ../build && touch index.html

    /* src/index.js */
    var component = require('./component.js');
    component();

    /* src/component.js */
    module.exports = function(){
        alert('component');
    }

    /* build/index.html */
    <!DOCTYPE html>
    <<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>webpack demos</title>
    </head>
    <body>
        <div id="apps"></div>
        <script src="bundle.js"></script>
    </body>
    </html>

下载`webpack`和`webpack-dev-server`

    # 安装并保存在项目的依赖中
    $ npm install --save-dev webpack webpack-dev-server
    # 如果想直接在命令行中使用webpack或webpack-dev-server命令，要全局安装(如果安装在项目中，可以在package.json中配置相应的命令)
    $ npm install -g webpack webpack-dev-server

创建webpack的配置文件

    $ touch webpack.config.js

PS: **请注意`webpack.config.js`这个命名，默认情况下要严格按照这个命名，不然会报`Output filename not configured`的错误**

**如果不按照这个命名，要在webpack运行时通过--conf这个参数指定配置文件，如**:`webpack --config conf.js`

进行基本配置

    var path = require('path');
    module.exports = {
        entry: path.resolve(__dirname,'src/index.js');
        output: {
            path: path.resolve(__dirname,'build'),
            filename: 'bundle.js'
        }
    }

执行webpack命令(只有全局安装才能在命令行中使用webpack命令，否则需要在`package.json`中配置`scripts`)

    $ webpack

可以看到控制台出现如下信息: 

    Hash: cf7cc9272c664f542fcb
    Version: webpack 1.13.0
    Time: 80ms
        Asset
        ...
        没写完

build目录下也新增了一个bundle.js

#### 2.webpack 和 webpack-dev-server 的基本命令
    $ webpack --help

* `webpack`  开发环境下编译
* `webpack -p`  产品编译及压缩(把代码进行压缩和混淆，一般用于产品发布)
* `webpack --watch`  开发环境下持续的监听文件变动来进行编译(非常快)
* `webpack -d`  引入source maps
* `webpack --progress`  显示构建进度
* `webpack --dispaly-error-details`  显示打包过程中的出错信息
* `webpack --profile`  输出性能数据，可以看到每一步的耗时

我们使用`webpack-dev-server`来起一个本地服务进行调试

    $ webpack-dev-server --progress --colors --content-base build   //指向build目录

打开`localhost:8080`,回车即可

参数解释：

* `webpack-dev-server` : 在loaclhost:8080建立一个Web服务器
* `webpack-dev-server --devtool eval` : 为你的代码创建源地址。当有任何报错的时候可以让你更加精确的定位到文件和行号
* `webpack-dev-server --progress` : 显示合并代码进度
* `webpack-dev-server --colors` : 命令行中显示颜色
* `webpack-dev-server --content-base build` : webpack-dev-server服务会默认以当前目录伺服文件，如果设置了`content-base`，服务的根路径则为build目录
* `webpack-dev-server --inline` : 可以自动加上`dev-server`的管理代码，实现热更新
* `webpack-dev-server --hot` : 开启代码热替换，可以加上`HotModulesReplacementPlugin`
* `webpack-dev-server --port 3000` : 设置服务端口

>关于webpack-dev-server的简单介绍：webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。它还有一个通过Socket.IO连接着webpack-dev-server服务器的小型运行时程序。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应。

**PS:使用webpack-dev-server起一个服务不在本地产生一个新文件；使用webpack编译会产生新文件**

#### 3.多文件入口

    $ cd src && touch entry1.js entry2.js

    /* webpack.config.js */
    var path = require('path');
    module.exports = {
        entry: {
            entry1: './src/entry1.js',
            entry2: './src/entry2.js',
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },
    };

#### 4.使用Babel-loader来解析es6和jsx

先写一个最基本的组件代码，用于跑通开发环境

    /* src/index.js */
    'use strict';
    
    import React, { Component } from 'react';
    import ReactDOM from 'react-dom';
    
    class HelloWorld extends Component {
        render(){
            return {
                <h1>Hello World</h1>
            }
        }
    }
    
    ReactDOM.render(<HelloWorld />, document.getElementById('app'));

代码用到了基本的`react.js`和`react-dom.js`，而且使用的是ES6的语法来封装组件和应用模块。

下载相应的模块

    $ npm install react react-dom --save

下载并配置babel，以解析ES6语法和JSX语法

    $ npm install babel-loader babel-core --save-dev

安装后配置`webpack.config.js`

    var path = require('path');
    module.exports = {
        entry: path.resolve(__dirname,'src/index.js'),
        output: {
            path: path.resolve(__dirname,'build'),
            filename: 'bundle.js',
        },
        moudle: {
            loaders:[{
                test:/\.js$/,
                loader:'babel-loader'
                }]
        }
    };

指定了使用`babel-loader`来解析js文件。

创建babel配置文件`.babelrc`

    $ touch .babelrc

    {
        "presets": ["es2015","react","stage-0"],
        "plugins": []
    }

下载安装预设

    $ npm insatll babel-preset-es2015 babel-preset-react babel-preset-stage-0
    //stage-0预设用来说明解析ES7其中一个阶段语法的转码规则

设定`package.json`的`scripts`

    "scripts":{
        "dev" : "./node_modules/.bin/webpack-dev-server --progress --colors --content-base build"
    }

运行

    $ npm run dev

在浏览器中访问`localhost:8080`

#### 5.devServer

webpack-dev-server 后面的一串参数可以用`devServer`字段统一在`webpack.config.js`文件里维护

    /* webpack.config.js */
    var path = require('path');
    module.exports = {
        entry: path.resolve(__dirname,'src/index.js'),
        output: {
            path: path.resolve(__dirname,'build'),
            filename: 'bundle.js',
        },
        devServer: {
            publicPath: "/static/",
            stats: {colors: true},
            port: 8080,
            contentBase: 'build',
            inline: true
        },
        module: {
            loaders:[{
                test:/\.js,
                loader:'babel-loader'
                }]
        }
    };

这样，我们可以简化`scripts`字段的配置

    "scripts": {
        "dev": "./node_modules/.bin/webpack-dev-server"
    }

相应的修改index.html文件中的资源引用地址 

    <script src="/static/bundle.js"></script>

`npm run dev` 即可

怎么mock(模拟)数据呢，可以用proxy(代理)的方式

    var path = require('path');
    
    function rewriteUrl(replacePath) {
      return function (req, opt) {
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";
    
        req.url = req.path.replace(opt.path, replacePath) + query;
        console.log("rewriting ", req.originalUrl, req.url);
      };
    }
    
    module.exports = {
        entry: {
          index: "./src/index.js"
        },
        output: {
          publicPath: "/static/",
          path: path.resolve(__dirname, "build"),
    
          filename: "bundle.js"
        },
        devServer: {
          publicPath: "/static/",
          stats: { colors: true },
          port: 8080,
          contentBase: 'build',
          inline: true,
          proxy: [
              {
                path: /^\/api\/(.*)/,
                target: "http://localhost:8080/",
                rewrite: rewriteUrl('/$1\.json'),
                changeOrigin: true
              }
          ]
        },
    };

#### 6.resolve

resolve下常用的是`extension`和`alias`字段的配置

extension 不用在require或是import的时候加文件后缀

    /* webpack.config.js */
    resolve: {
        extensions: ["",".js",".jsx",".css",".json"],
    },

    /* src/component.js */
    export default () => {
        alert('component');
    }

    /* src/index.js */
    'use strict'
    
    import React,{ Component } from 'react';
    import ReactDOM from 'react-dom';
    
    import component from './component';
    
    component();
    
    class HelloWorld extends Component {
      render(){
        return (
          <h1>Hello world</h1>
        )
      }
    }
    
    ReactDOM.render(<HelloWorld />, document.getElementById('app'));

刷新看到运行效果。而此时import的时候没有写文件后缀

alias 配置别名，加快webpack构建速度

    var path = require('path');
    
    var pathToReact = path.join(__dirname,"./node_modules/react/dist/react.js");
    var pathToReactDOM = path.join(__dirname,"./node_modules/react-dom/dist/react-dom.js");
    
    module.exports = {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
        },
        devServer: {
          publicPath: "/static/",
          stats: { colors: true },
          port: 3000,
          contentBase: 'build',
          inline: true
        },
        resolve: {
          extensions: ["", ".js", ".jsx", ".css", ".json"],
          alias: {
            'react': pathToReact,
            'react-dom': pathToReactDOM
          }
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: 'babel-loader'
            }
          ],
          noParse: [pathToReact, pathToReactDOM]
        }
    };

每当react在代码中被引入，它会使用压缩后的ReactJS，而不是早node_modules中找

每当webpack尝试解析压缩后的文件，我们阻止它，因为这不必要。

#### 7.解析样式文件

使用less预处理器 

先安装几个webpack的loader

    $ npm install --save-dev style-loader css-loader less-loader

配置`webpack.config.js`

    loaders: [
        {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: path.resolve(__dirname, 'node_modules')
        },
        {
            test: /\.css/,
            loader: 'style!css'
        },
        {
            test: /\.less/,
            loader: 'style!css!less'
        }
    ] 

新增一个目录coponents并且在目录下新建一个Button组件

    $ cd src && mkdir components
    $ cd components && mkdir Button
    $ cd Button && touch Button.js Button.less

    /* src/components/Button.js */
    import React, { Component } from 'react';
    
    class Button extends Component {
      handleClick(){
        alert('戳我干嘛！');
      }
      render(){
        const style = require('./Button.less');
    
        return (
          <button className="my-button" onClick={this.handleClick.bind(this)}>
            快戳我
          </button>
        );
      }
    }
    
    export default Button;

    /* src/components/Button.less */
    
    .my-button{
        color: #fff;
        background-color: #2db7f5;
        border-color: #2db7f5;
        padding: 4px 15px 5px 15px;
        font-size: 14px;
        border-radius: 6px;
    }

    /* src/index.js */
    'use strict';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Button from './components/Button/Button';
    
    let root = document.getElementById('app');
    ReactDOM.render( <Button />, root );

跑一下

    $ npm run dev

修改一下less文件，浏览器会自动刷新

#### 8.devtool

在配置中增加`devtool`字段，并设置值为source-map,这样我们就可以在浏览器中直接调试我们的源码，在控制台的sources下，点开可以看到`webpack://`目录。

    /* webpack.config.js */
    devtool: 'cheap-module-source-map'

#### 9.图标字体等资源 

图标字体的加载可以选择 file-loader 或 url-loader 进行加载。示例配置如下：

    {
        test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000"
    }

先把配置跑通

    $ npm install bootstrap --save

在App.js里应用bootstrap。

    /* src/container/App.js */
    import React, { Component } from 'react';
    import Button from '../components/Button/Button';

    import 'bootstrap/dist/css/bootstrap.css';
    import './App.less';

    class App extends Component {
      render(){
        return (
          <div className="text-center">
            <Button />
            <div className="tip"></div>
            {/* 这里我们使用以下图标字体 */}
            <span className="glyphicon glyphicon-asterisk"></span>
          </div>
        );
      }
    }
    
    export default App;


















    

[img1]: imgs/what-is-webpack.png (webpack示意图) 