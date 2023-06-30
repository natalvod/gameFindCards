const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'js', 'script.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'script.[contenthash].js',
        assetModuleFilename: 'static/[name].[contenthash][ext]'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
              },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/icons/[name].[contenthash][ext]'
                },
            },
        ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
                onEnd: {
                    copy: [
                        {
                            source: path.join('src', 'static'),
                            destination: 'dist',
                        },
                    ],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
    ],
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            ['svgo', { name: 'preset-default' }],
                        ],
                    },
                },
            }),
        ],
    },
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 8000,
    },
};
