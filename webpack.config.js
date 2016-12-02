module.exports = {
	entry: {
		app: './src/js/app.js',
	},
	output: {
		path: './build/assets/js',
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'stage-0'],
			},
		}],
	},
	quiet: true,
	noInfo: false,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false,
	},
};
