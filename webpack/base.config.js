const path = require('path') // 路径模块
const entry = require('./entry')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(process.cwd(), "src"), // webapck编译上下文

  entry: entry,

  output: {
    publicPath: '/dist', // 路由路径 devServer资源都会读取它 
    path: path.resolve(process.cwd(), "dist"), // cwd 代表nodejs启动目录
    filename: "[name].js" // 导出文件名
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"), // 使用插件 样式放css目录
    new HtmlWebpackPlugin({ // 引入资源生成html文件 
      title: 'sale',
      template: 'base/webpack.template.html',
      inject: true,
      chunks: ['sale'], // 中间资源 对应 js css 为 sale
      filename: 'sale.html'
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: { // 配置模块
    rules: [ // 每个规则都是一个对象
      {
        test: /\.jsx?$/, // 正则匹配js
        loader: 'babel-loader' // babel-loader去处理
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: "file-loader",
        options: {
          name: 'assets/[name]_[sha512:hash:base64:7].[ext]' // 图片放assets目录
        }
      }
    ]
  }
}