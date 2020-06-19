const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

let webpackUatConfig = merge(webpackBaseConfig, {
	module: {
		rules: [
			{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: { "@primary-color": "blue" },
                        }
                    }
                ]
            }
		]
	},
	optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
		splitChunks: {
			cacheGroups: {
		        commons: {
		            test: /[\\/]node_modules[\\/]/,
		            name: "vendors",
		            chunks: "all"
		        },
		    }
		}
	},
	plugins: [
		new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production'),
	      'process.env.CURRENT_ENV': JSON.stringify('test')
        }),
        new MiniCssExtractPlugin({
            filename: `[name].min.css?[hash:8]`,
            chunkFilename: `[name].min.css?[hash:8]`,
        }),
	]
});

module.exports = webpackUatConfig;
