[TOC]

## 使用Webpack搭建生产环境工作流

### CSS文件单独加载

把css文件单独打包出来

    $ npm install extract-text-webpack-plugin --save-dev

配置`webpack.config.js`

    var path = require('path');
    var webpack = require('webpack');
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    
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
        resolve: {
          extension: ['', '.js', '.jsx', '.json']
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: ['react-hot', 'babel'],
              exclude: path.resolve(__dirname, 'node_modules')
            },
            {
              test: /\.css/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
              test: /\.less/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
          ]
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          new ExtractTextPlugin("bundle.css")
        ]
    };

在`index.html`中引入`bundle.css`

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>React Demo</title>
      <link rel="stylesheet" href="bundle.css">
    </head>
    <body>
      <div id="app"></div>
      <script src="bundle.js"></script>
    </body>
    </html>

执行`npm run dev`

### Vendor chunk 应用代码与第三方代码分离

修改`webpack.config.js`中的`entry`入口，并且添加`CommonsChunkPlugin`插件抽取出第三方资源。

    entry: {
     index: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'src/index.js')
      ],
      vendor: ['react', 'react-dom']
    },
    plugins: [
       new webpack.HotModuleReplacementPlugin(),
       new webpack.NoErrorsPlugin(),
       new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
       new ExtractTextPlugin("bundle.css")
     ]

再修改index.html文件的引用 

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>React Demo</title>
      <link rel="stylesheet" href="bundle.css">
    </head>
    <body>
      <div id="app"></div>
      <script src="vendor.js"></script>
      <script src="index.js"></script>
    </body>
    </html>

### Common chunk 提取出应用中的公共代码

     module.exports = {
      entry: {
        bundle1: './a.jsx',
        bundle2: './b.jsx'
      },
      output: {
        filename: '[name].js'
      },
      module: {
        loaders:[
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          },
        ]
      },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin('init.js')
      ]
    }

### 给文件添加hash

添加文件hash可以解决由于缓存带来的问题。其实很简单，在文件的后面加上`?[hash]`就行。

配置代码

    var path = require('path');
    var webpack = require('webpack');
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var buildPath = path.resolve(__dirname, 'build');
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
        entry: {
          index: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, 'src/index.js')
          ],
          vendor: ['react', 'react-dom']
        },
        output: {
            path: buildPath,
            filename: '[name].js?[hash]'
        },
        resolve: {
          extension: ['', '.js', '.jsx', '.json']
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: ['react-hot', 'babel'],
              exclude: path.resolve(__dirname, 'node_modules')
            },
            {
              test: /\.css/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
              test: /\.less/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
              test: /\.(png|jpg)$/,
              loader: 'url?limit=8192'
            },
            {
              test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000"
            }
          ]
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js?[hash]'),
          new ExtractTextPlugin("[name].css?[hash]", {
              allChunks: true,
              disable: false
          }),
          new HtmlWebpackPlugin({
            title: 'zhufeng-react',
            template: './src/index.html',
          })
        ],
        devtool: 'cheap-module-source-map'
    };

### 异步加载(实现资源加载的性能优化)

虽然CommonJS是同步加载的，但webpack提供了异步加载的方式。这对于单页应用中使用的客户端路由非常有用。当真正路由到了某个页面的时候，它的代码才会被加载下来。

指定要异步加载的 **拆分点** 

    if (window.location.pathname === '/feed') {
      showLoadingState();
      require.ensure([], function() { // 这个语法很奇怪，但是还是可以起作用的
        hideLoadingState();
        require('./feed').show(); // 当这个函数被调用的时候，此模块是一定已经被同步加载下来了
      });
    } else if (window.location.pathname === '/profile') {
      showLoadingState();
      require.ensure([], function() {
        hideLoadingState();
        require('./profile').show();
      });
    }

剩下的事交给webpack，它会为你生成并加载这些额外的 **chunk** 文件

webpack会默认从项目的根目录下引入这些chunk文件。你也可以通过`output.buildPath`来配置chunk文件的引入路径

    // webpack.config.js
    output: {
        path: "/home/proj/build/assets", // webpack的build路径
        buildPath: "/assets/" // 你require的路径
    }

### CSS Module的实现

webpack的css-loader

    module: {
      loaders: [{
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      }]
    },
    postcss: [
      require('postcss-nested')(),
      require('cssnext')(),
      require('autoprefixer-core')({ browsers: ['last 2 versions'] })
    ]

然后把下面的代码交给webpack

`js`

    import styles from './ChatMessage.css';
    
    class ChatMessage extends React.Component {
      render() {
        return (
          <div className={styles.root}>
            <img src="http://very.cute.png" />
            <p className={styles.text}> woooooow </p>
          </div>
        );
      }
    }

`css`

    .root {
      background-color: #f0f0f0;
      > img {
        width: 32px;
        height: 32px;
        border-radius: 16px;
      }
    }
    
    .text {
      font-size: 22px;
    }

最后输出

`HTML`

    <div class="ChatMessage__root__1aF8de0">
      <img src="http://very.cute.png" />
      <p class="ChatMessage__text__fo40mmi"> woooooow </p>
    </div>

`CSS`

    .ChatMessage__root__1aF8de0 {
      background-color: #f0f0f0;
    }
    .ChatMessage__root__1aF8de0 > img {
      width: 32px;
      height: 32px;
      border-radius: 16px;
    }
    .ChatMessage__text__fo40mmi {
      font-size: 22px;
    }

我们通过编译期renaming的方式为css引入了局部变量

### UglifyJs Plugin 压缩资源

    var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
    
    ...
    
    plugins: [
    
      new uglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.MinChunkSizePlugin({
        compress: {
          warnings: false
        }
      }),
      // 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
      new webpack.optimize.DedupePlugin(),
      // 按引用频度来排序 ID，以便达到减少文件大小的效果
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin({
          minSizeReduce: 1.5,
          moveToParents: true
      })
    ]





