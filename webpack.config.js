const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distPath = path.resolve(__dirname, "./examples");

module.exports = {
    entry: {
        main: path.join(distPath, "index.js")
    },
    output: {
        publicPath: "/",
        path: distPath,
        filename: "[name].[hash].js"
    },
    resolve: {
        extensions: [".js", ".css", ".scss", ".png", ".jpg", ".jpeg", ".gif"]
    },
    module: {
        rules: [
            /*将ES6转化为ES5*/
            {
                test: /\.js$/,
                exclude: [
                    path.join(__dirname, "node_modules")
                ],
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000,
        ignored: /node_modules/
    },
    devServer: {
        port: "8088",
        open: true,
        compress: true,
        historyApiFallback: {
            index: '/index.html'
        },
        proxy: {

        }
    }
}