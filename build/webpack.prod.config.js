/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-04-02 15:17:22
 * @LastEditTime: 2020-04-20 11:31:40
 */

process.env.CURRENT_ENV = 'production';
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

let webpackProdConfig = merge(webpackBaseConfig, {
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
	      'process.env.CURRENT_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: `[name].min.css?[hash:8]`,
            chunkFilename: `[name].min.css?[hash:8]`,
        }),
        new OptimizeCssAssetsPlugin()
	]
});

module.exports = webpackProdConfig;
