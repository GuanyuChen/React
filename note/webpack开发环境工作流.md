[TOC]

## 使用Webpack搭建开发环境工作流

### 自动刷新

webpack-dev-server 有两种模式支持自动刷新 `iframe`模式和`inline`模式和

* iframe模式下，页面是嵌套在一个iframe下的，当代码发生改动是，这个iframe会重新加载。使用iframe模式无需额外配置，只需在浏览器输入如下网址:
`http://localhost:8080/webpack-dev-server/index.html`
* inline模式下，一个小型的webpack-dev-server客户端会作为入口文件打包，这个客户端会在后端代码改变的时候刷新页面

以下三种配置都可以实现页面的刷新效果

    //1. 启动 webpack-dev-server 的时候带上inline参数
    $ webpack-dev-server --inline

    //2. 给HTML插入JS
    <script src="http://localhost:3000/webpack-dev-server.js"></script>

    //3. webpack配置
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        path.resolve(__dirname,'src/index.js')
    ],

### Hot Module Replacement 模块热替换

即在前端代码变动的时候无需刷新整个页面，只把变化的部分替换掉。

使用HMR功能有两种方式，命令行方式和Node.js API

    //1. cli命令行方式
    webpack-dev-server --inline --hot

    //2. Node.js API
    entry: [
        'webpack/hot/dev-server',
        path.reslove(__dirname,'src/index.js')
    ],
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]

### React-hot-loader 组件级热更新

我们开发中用到了几十个组件，为了测试某个组件我们需要一步步操作到固定的步骤去实现，一旦保存编辑器中修改的一行代码，从入口文件开始的所有代码都要刷新一次，这样和不利于调试。

    $ npm install react-hot-loader --save-dev

重新配置`webpack.config.js`

    var path = require('path');
    var webpack = require('webpack');
    
    module.exports = {
        entry: [
          'webpack/hot/dev-server',
          'webpack-dev-server/client?http://localhost:8080',
          path.resolve(__dirname, 'src/index.js')
        ],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: ['react-hot', 'babel'],
              exclude: path.resolve(__dirname, 'node_modules')
            }
          ]
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        ]
    };

新增了`react-hot-loader`去解析React组件。同时加上了热替换的插件`HotModuleReplacementPlugin`和防止报错的插件`NoErrorsPlugin`。

PS : 不使用`HotModuleReplaceMentPlugin`这个插件也可以，只需要在`webpack-dev-server`运行时加上`--hot`这个参数。

### HTML Webpack Plugin 解析html模板

前面我们还是先在build目录手动加上index.html，这样在项目中很不适用，因为我们希望build产出的资源应该是通过工具来统一产出并发布上线。

在src目录下新建一个index.html文件，并写上简单的代码

    $ cd src && touch index.html

    <!DOCTYPE html>
    <<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <div id="app"></div>
    </body>
    </html>

下载一个webpack的插件`html-webpack-plugin`

    $ npm install html-webpack-plugin --save-dev

修改`webpack.config.js`

    //引用这个plugin
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    
    plugins: [
        //使用这个plugin
        new HtmlWebpackPlugin({
            title: 'guanyu-react',
            template: './src/index.html',
            })
    ]

运行`npm run dev`

### open-browser-webpack-plugin 自动打开浏览器

等资源构建完成，自动打开浏览器

    $ npm install open-browser-webpack-plugin --save-dev

修改`webpack.config.js`

    var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
    ......
    plugins:[
        new openBrowserWebpackPlugin({ url:'http://localhost:8080' })
    ]

### 区分环境标识 Environment flags

项目中有些代码我们只在开发环境(例如日志)或是内部测试环境(例如没有发布的新功能)中使用，那就需要引入下面这些魔法全局变量(magic globals) : 

    if (__DEV__) {
        console.warn('Extra logging');
    }
    //...
    if (__PRERELEASE__) {
        showSecretFeature();
    }

在`webpack.config.js`中配置这些变量

    // definePlugin 会把定义的string 变量插入到Js代码中。
    var definePlugin = new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    });
    
    module.exports = {
      entry: './main.js',
      output: {
        filename: 'bundle.js'
      },
      plugins: [definePlugin]
    };

在`package.json`里面配置运行脚本

    "scripts": {
        "publish-mac" : "export NODE_ENV=prod && webpack-dev-server -p --progress --colors",
        "publish-win" : "set NODE_ENV=prod && webpack-dev-server -p --progress --colors"
    }

PS : `webpack -p`会删除所有无用代码，也就是那些包裹在这些全局变量下的代码块都会被删除，保证这些代码不会因为发布上线而泄露

### Exposing global variables 暴露全局对象

如果想将report数据上报组件放到全局，有两种办法

在loader里使expose将report暴露到全局，然后就可以直接使用report进行上报

    {
        test: path.join(config.path.src, '/js/common/report'),
        loader: 'expose?report'
    },

如果想用R直接代表report，除了要用expose loader之外，还需要用ProvidePlugin帮助，指向report，这样在代码中直接用R.tdw， R.monitor这样就可以

    new webpack.ProvidePlugin({
        "R": "report",
    }),



