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
		filename:"bundle.js"
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
												"chrome": "58",
												//最新的chrome是102(2022.6.21)
												"ie": "11"
											},
										//corejs的版本
										"corejs":"3",
										//使用corejs的方式，“usage”表示按需加载
										"useBuiltIns": "usage"
									}
								]
							]
						}
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