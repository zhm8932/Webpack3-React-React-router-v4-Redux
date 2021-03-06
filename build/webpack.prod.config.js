/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfig = require('./webpack.config');
const {ROOT,SRC_PATH,PUBLIC_PATH} = require('./commonPath');
module.exports = merge(webpackConfig,{
	module: {
		rules:[
			{
				test:/\.scss$/,
				use:ExtractTextPlugin.extract({  //开发环境分离css时，热更新无效 使用css-hot-loader
					fallback:'style-loader',
					use: [
						{loader: "css-loader",options: {minimize: true,importLoaders: 1}}, //css压缩
						{loader: "postcss-loader",	options: {
							ident: 'postcss',
							plugins: [ require('autoprefixer')({broswer: 'last 5 versions'})] //处理CSS前缀问题，自动添加前缀
						}},
						{loader: "sass-loader"}
					],
				}),
			},
		]
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		// 若要按需加载 CSS 则请注释掉该行
		new ExtractTextPlugin('css/[name].css',{
			// allChunks : true
		}),
		// new webpack.NoErrorsPlugin(),	//不显示错误插件
		new webpack.optimize.UglifyJsPlugin({
			mangle:{ //不混淆压缩
				except:['$','exports','require'],
				screw_ie8: true,
				keep_fnames: true
			},
			compress:{
				warnings:false,
				screw_ie8: true,
				drop_debugger: true,
				drop_console: true
			},
			beautify: false,
			comments: false
		}),
		new CleanWebpackPlugin(
			['*.zip','public/js','public/css'],　 //匹配删除的文件
			{
				root: ROOT,       　　　　　　　　　　//根目录
				verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
				dry:      false,        　　　　　　　　　　//启用删除文件
				exclude: ["vendors.js","vendors.manifest.json"] //排除不删除的目录，主要用于避免删除公用的文件
			}
		),
		new CopyWebpackPlugin([
			{
				from: path.join(SRC_PATH,'images'),
				to:path.join(PUBLIC_PATH,'images'),
			},
			{
				from: path.join(SRC_PATH,'js/api'),
				to:path.join(PUBLIC_PATH,'api'),
			}

		] ),
	],
})