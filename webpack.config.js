const path = require('path');

module.exports = {
    devServer: {
        contentBase: "./",
        compress: true,
        hot: true,
        port: 2345,
        publicPath: "/",
    },
    entry: path.join(__dirname, '/src/main.ts'),
    output: {
        filename: 'dist/main.js',
        path: __dirname,
        library: 'norma-goes-static',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
}