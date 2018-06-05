music-player-by-react
package.json----npm 脚本
"build": "webpack", //npm run build 项目构建
"watch": "webpack --watch", //npm run watch 就会看到 webpack 编译代码
"start": "webpack-dev-server --open", //npm start，就会看到浏览器自动加载页面。如果现在修改和保存任意源文件，web服务器就会自动重新加载编译后的代码
"server": "node server.js" //npm run server 打开浏览器，跳转到 http://localhost:3000，你应该看到你的webpack 应用程序已经运行

清理 /dist 文件夹
安装:npm install clean-webpack-plugin --save-dev
配置：webpack.config.js const CleanWebpackPlugin = require('clean-webpack-plugin');

  plugins: [
	  new CleanWebpackPlugin(['dist']),
  ]
精简输出(依赖第三方的工具执行未引用的代码的dead-code删除工作)
安装：npm install --save-dev uglifyjs-webpack-plugin
配置：webpack.config.js const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

  plugins: [
	  new UglifyJSPlugin()
  ]
使用说明
下载项目
git clone https://github.com/LinkChenzy/music-player-by-react.git

安装依赖
npm install

启动开发服务
npm start

编译代码
npm run build