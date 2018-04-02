const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		main: path.join(__dirname, 'public/javascripts/main.js'),
		uikit: ['uikit', path.join(__dirname, 'public/stylesheets/style.scss')],
		'uikit-icons': './node_modules/uikit/dist/js/uikit-icons.js'
	},

	output: {
		filename: 'js/[name].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'public/dist'),
		publicPath: '/dist/'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['es2015']
				}
			},
			{
				test: /\.ejs$/,
				loader: 'ejs-loader',
				query: {
					variable: 'data',
					interpolate: '\\{\\{(.+?)\\}\\}',
					evaluate: '\\[\\[(.+?)\\]\\]'
				}
			},
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('css/[name].css'),
		new CleanWebpackPlugin(['dist']),
		// new HtmlWebpackPlugin({
		// 	template: 'views/partials/head.ejs'
		// }),
		new ManifestPlugin({}),
		new WriteFilePlugin({
			test: /^(?!.*(hot)).*/
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'uikit'
		}),
		new webpack.ProvidePlugin({UIkit: 'uikit'})
	]
}
