const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const publicPath = "/";
module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "../dist"
    },
    module: {
        rules: [{
            test: /\.css?$/,
            use: ["style-loader", "css-loader"],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "MakeMIT 2019",
            filename: "index.html",
            template: "public/index.html"
        })
    ],
    output: {
        publicPath
    }
});