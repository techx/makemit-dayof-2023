const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: "file-loader",
            exclude: /node_modules/
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: "file-loader",
            exclude: /node_modules/
        }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../docs")
    }
};