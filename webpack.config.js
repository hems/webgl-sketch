const path = require( 'path' )

module.exports = {
	entry: {
		app: './src/js/app.js',
	},
	output: {
		path: path.resolve( __dirname, './build/assets/js' ),
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'stage-0'],
			},
		}],
	},
	devtool: 'source-map',
	stats: 'minimal',
};
