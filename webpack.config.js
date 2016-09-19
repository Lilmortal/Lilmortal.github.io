module.exports = {
	entry: './src/js/init.js',
	output: {
		path: 'bin',
		filename: 'bundle.js'
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
		loader: "file-loader?name=[name].[ext]",
		exclude: /node_modules/}]
	}
};
