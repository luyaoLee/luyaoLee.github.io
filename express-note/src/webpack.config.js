var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.join(__dirname, "js/app/index.js"),
    output: {
        path: path.join(__dirname, "../public/js"),
        filename: "index.js"
    },
    //路径解析
    resolve: {
        alias: {
            jquery: path.join(__dirname, "./js/lib/jquery-2.1.4.min.js"),
            mod: path.join(__dirname, "./js/mod"),
            less: path.join(__dirname, "./less")
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                //use中的loader执行顺序是从右向左
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    }
}
