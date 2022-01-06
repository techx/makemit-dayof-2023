const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new HtmlWebpackPlugin({
            title: "MakeMIT 2019",
            filename: "index.html",
            template: "public/index.html",
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                sortAttributes: true,
                sortClassName: true
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: 'default'
            }
        })
    ],
    module: {
        rules: [{
            test: /\.css?$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, "css-loader",],
            exclude: /node_modules/
        }]
    },
    mode: "production",
    devtool: "source-map",
    // output: {
    //   publicPath
    // }
});