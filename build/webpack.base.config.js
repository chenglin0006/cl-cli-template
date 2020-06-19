const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const resolve = dir => path.resolve(process.cwd(), dir);

module.exports = {
    mode: process.env.CURRENT_ENV === 'development' ? 'development' : 'production',
    entry: {
        app: process.env.CURRENT_ENV === 'development' ? ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js'] : ['./src/index.js'],
    },
    output: {
        path: resolve('public'),
        chunkFilename: `scripts/[name].min.js?[hash:8]`,
        publicPath: "/",
        filename: process.env.CURRENT_ENV === 'development' ? 'scripts/app.js' : 'scripts/[name].[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: [
                { 
                    loader: 'cache-loader' 
                },{
                    loader: 'thread-loader',
                    options: {
                      workers: require('os').cpus().length - 1,
                    }
                },{
                    loader: 'ts-loader',
                    options: {
                      happyPackMode: true,
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                          workers: require('os').cpus().length - 1,
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [ "@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"]
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:16].[ext]',
                    publicPath: '/',
                },
            },
            {
                test: /\.txt$/,//自定义loader
                use: [
                    path.resolve(__dirname, '../src/loader/uppercase-loader.js'),
                    {
                        loader: path.resolve(__dirname, '../src/loader/reverse-loader.js'),
                        options: {
                            content: 'emoclew'
                        }
                    },
                    
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackExternalsPlugin({
            externals: [
              {
                module: 'react',
                entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
                global: 'React',
              },
              {
                module: 'react-dom',
                entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
                global: 'ReactDOM',
              },
            ],
        }),
        new HtmlWebpackPlugin({
            title: '百安后台管理模板',
            inject: true,
            template: 'index.template.html',
        }),
    ],
    devtool: process.env.CURRENT_ENV === 'development' ? 'cheap-module-source-map' : '',
};
