// const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

module.exports = merge(common, {
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: 'js/[name].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: '/'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './public/dist'
	},
	plugins: [
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoEmitOnErrorsPlugin()
	]
})
