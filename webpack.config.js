'use strict'
var path = require('path');
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
	devtool: debug ? "inline-source-map" : null,
	entry: './src/js/init.js',
	output: {
		path: path.join(__dirname, 'src/bin'),
		filename: 'bundle.js',
		publicPath: './bin/'
	},
	module: {
		loaders: [{
			test:/\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
		test: /\.scss$/,
		loaders: ['style', 'css', 'sass'],
		exclude: /node_module/
		},
		{
		test: /\jpg$/,
		loader: "file-loader?name=[hash].[ext]",
		exclude: /node_modules/}]
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	],
};

