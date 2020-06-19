//设置NODE_ENV
process.env.CURRENT_ENV = 'development';

const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); //启用ts类型检查影响速度--检查结果注入到webpack中
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');


let webpackDevConfig = merge(webpackBaseConfig, {
	module: {
		rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
			{
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: { "@primary-color": "blue" },
                        }
                    }
                ]
            },
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
	      'process.env.NODE_ENV': JSON.stringify('development'),
	      'process.env.CURRENT_ENV': JSON.stringify('development')
	    }),
		new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        // new BundleAnalyzerPlugin()
	]
});

module.exports = webpackDevConfig;