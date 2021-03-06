/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
let {ROOT,SRC_PATH,publicPath,PUBLIC_PATH} = require('./commonPath');

var OfflinePlugin = require('offline-plugin');

// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

let entry={};
const getEntry = function (files='') {
	let jsPath = path.join(SRC_PATH,'js',files);
	const dirs = fs.readdirSync(jsPath);
	let matchs= null;
	dirs.forEach((item)=>{
		// console.log("item:",item)
		if(item!=='libs'&&item!=='common'){
			if(fs.statSync(jsPath+'/'+item).isDirectory()){
				// console.log("目录222:",jsPath+'/'+item)
				getEntry(files+'/'+ item)
			}else{
				matchs = (files + '/' + item).match(/\/(.+)\.jsx?$/)
				// console.log("matchs:",matchs);
				if(matchs){
					entry[matchs[1]] = path.join(jsPath,item)
				}
			}
		}
	});
	// console.log("entry:",entry);
	return entry
}

module.exports = {
	// entry:getEntry(),
	entry:{
		app:path.join(SRC_PATH,'js/app.js'),
	},
	output: {
		path: path.join(ROOT,'public'),
		filename: "js/[name].js",
		chunkFilename:'js/[name].[chunkhash:5].js',
		publicPath:publicPath
	},
	// devtool: 'source-map',
	// devtool: 'inline-source-map',
	resolve: {
		extensions: ['.js','.jsx','.json','.scss','.jade','.less'],
		modules: [
			path.join(SRC_PATH, "js"),
			"node_modules"
		],
		alias:{
			libs:path.join(SRC_PATH,'js/libs'),
			sass:path.join(SRC_PATH,'sass'),
			tools:path.join(ROOT,'utils','tools'), //前后端公共JS
			views:path.join(ROOT,'views'),
			// images:path.join(SRC_PATH,'images'),
			slides:'libs/jquery.slides.js',
			moment:'moment/min/moment-with-locales.min.js',
		}
	},
	module: {
		//略对已知文件的解析,提高打包速度
		noParse: [/moment-with-locales/],
		rules:[
			{
				enforce: 'pre',
				test:/\.jsx?/,
				use:'eslint-loader',
				include: /src/,
				exclude:/node_modules/
			},
			{
				test:/\.jsx?$/,
				use: [
					"babel-loader",
					// "eslint-loader",
				],
				// include: /src/,
				exclude:/node_modules/
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				include:/src/,
				use:{
					loader: 'url-loader',
					options: {
						limit:1024*8,
						name: './fonts/[name].[ext]',
					},
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				include:/src/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024*16,  //当图片大小小于限制时会自动转成 base64 码引用
							name:'./images/[name].[ext]',
							prefix: 'img'
						},
					}
				]

			},
			{
				test:/\.jade/,
				use: 'jade-loader',
				exclude:/node_modules/,
				include:/views/
			},
			{
				test: /\.less$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "less-loader"
				}]
			},
			{
				// test: /\.bundle\.js$/, // 通过文件名后缀自动处理需要转成bundle的文件
				test: /\.js$/, // 通过文件名后缀自动处理需要转成bundle的文件
				include: /containers/,
				exclude: /node_modules/,
				use: [{
					loader: 'bundle-loader',
					options: {
						name: '[name].bundle',
						lazy: true
					}
				}, {
					loader: 'babel-loader',
				}]
			}
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(), //启用作用域提升 让代码文件更小、运行的更快
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			'React':'react',
			'ReactDOM':'react-dom',
			moment:'moment'
		}),
		new webpack.optimize.CommonsChunkPlugin({name:'common',minChunks:3}), //模块必须被3个才会共享
		new webpack.DllReferencePlugin({
			context:__dirname,  //context：需要跟之前保持一致，这个用来指导webpack匹配manifest.json中库的路径
			// manifest:require('../public/vendors.manifest.json') //用来引入刚才输出的manifest.json文件
			manifest:require(path.join(PUBLIC_PATH,'vendors.manifest.json')) //用来引入刚才输出的manifest.json文件
		}),
		new OfflinePlugin()
	]
}