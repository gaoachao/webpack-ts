# webpack-ts

## 贪吃蛇

> https://www.bitter-gourd.com/snake

## webpack整合

通常情况下，实际开发中我们都需要使用构建工具对代码进行打包；

TS同样也可以结合构建工具一起使用，下边以webpack为例介绍一下如何结合构建工具使用TS；

步骤如下：

#### 初始化项目

进入项目根目录，执行命令 `npm init -y`，创建package.json文件

#### 下载构建工具

命令如下：

```shell
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin
```

共安装了7个包:

- `webpack`：构建工具webpack
- `webpack-cli`：webpack的命令行工具
- `webpack-dev-server`：webpack的开发服务器
- `typescript`：ts编译器
- `ts-loader`：ts加载器，用于在webpack中编译ts文件
- `html-webpack-plugin`：webpack中html插件，用来自动创建html文件
- `clean-webpack-plugin`：webpack中的清除插件，每次编译都会先清除dist目录。

#### 配置webpack

根目录下创建webpack的配置文件`webpack.config.js`：

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
   optimization:{
       minimize: false // 关闭代码压缩，可选
   },

   entry: "./src/index.ts",

   devtool: "inline-source-map",

   devServer: {
       contentBase: './dist'
   },

   output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js",
       environment: {
           arrowFunction: false // 关闭webpack的箭头函数，可选
       }
   },

   resolve: {
       extensions: [".ts", ".js"]
   },

   module: {
       rules: [
           {
               test: /\.ts$/,
               use: {
                   loader: "ts-loader"     
               },
               exclude: /node_modules/
           }
       ]
   },
   //添加webpack插件
   plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
           title:'TS测试'
       }),
   ],
   //用来设置引用模块,告诉webpack哪些文件可以被当做模块引用。
   resolve:{
		extensions:['.ts','.js']
   }
}
```

#### 配置TS编译选项

根目录下创建tsconfig.json，配置可以根据自己需要

```json
{
   "compilerOptions": {
       "target": "ES2015",
       "module": "ES2015",
       "strict": true
   }
}
```

#### 修改package.json配置

修改`package.json`添加如下配置

```json
{
   "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack",
       "start": "webpack serve --open --mode production"
   },
}
```

#### 项目使用

在src下创建ts文件，并在并命令行执行`npm run build`对代码进行编译；

或者执行`npm start`来启动开发服务器；

## Babel

除了webpack，开发中还经常需要结合babel来对代码进行转换；

以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中；

> 虽然TS在编译时也支持代码转换，但是只支持简单的代码转换；
>
> 对于例如：Promise等ES6特性，TS无法直接转换，这时还要用到babel来做转换；

安装依赖包：

```
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

共安装了4个包，分别是：

- `@babel/core`：babel的核心工具
- `@babel/preset-env`：babel的预定义环境
- `@babel-loader`：babel在webpack中的加载器
- `core-js`：core-js用来使老版本的浏览器支持新版ES语法

修改`webpack.config.js`配置文件

```js
//引入路径包
const path = require('path');
//引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
//引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//webpack中的所有配置信息都应该卸载module.exports中
module.exports = {
	//入口文件
	entry:"./src/index.ts",
	//指定打包文件所在目录
	output:{
		//指定打包文件的目录
		path:path.resolve(__dirname,'dist'),
		//打包后文件的名字
		filename:"bundle.js",
        //告诉webpack不使用箭头函数
		environment:{
			arrowFunction:false
		}
	},
	//webpack打包时使用的模块
	module:{
	 //指定要加载的规则
	 rules:[
	 {
		//test指定的是规则生成的文件
		//以.ts结尾的结尾的文件用ts-loader去处理
		test:/\.ts$/,
		//loader的执行顺序是从后往前执行
		//我们的需求：先把ts的代码转换为js代码，然后在用babel处理js代码
		use: [
		 {
		  //指定加载器
		  loader: "babel-loader",
		  //设置babel
		  options:{
		  //设置预定义的环境
			presets: [
			[
			  //指定环境的插件
			  "@babel/preset-env",
			  //配置信息
			  {
				//兼容的目标浏览器版本
				"targets":{
                    //最新的chrome是102(2022.6.21)
					"chrome": "58",
					"ie": "11"
				},
				//corejs的版本
				"corejs":"3",
				//使用corejs的方式，“usage”表示按需加载
				"useBuiltIns": "usage"
			  }
			]
			]
		 },
		 {
			loader: "ts-loader",
		 }
		],
		//要排除的文件
		exclude:/node-modules/
	  }
	  ]
	},
	//配置Webpack插件
	plugins:[
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			// title:'TS测试',
			//html模板，用了这个模板后，title设置的东西就不能起作用了
			template:"./src/index.html",

		}),
	],

	//用来设置引用模块,告诉webpack哪些文件可以被当做模块引用。
	resolve:{
		extensions:['.ts','.js']
	}
}
```

如此一来，使用ts编译后的文件将会再次被`babel`处理，使得代码可以在大部分浏览器中直接使用，同时可以在配置选项的targets中指定要兼容的浏览器版本。

## postcss

安装依赖包：

```
npm i -D postcss postcss-loader postcss-preset-env 
```

共安装了3个包，分别是：

- `postcss`：postcss的核心工具

- `postcss-preset-env`：postcss的预定义环境

- `postcss-loader`：postcss在webpack中的加载器

  
