'use strict'
var path = require('path');

module.exports = {
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
	}
};

