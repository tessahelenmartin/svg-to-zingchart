/**
 * Created by tmartin on 6/29/16.
 */
module.exports = {
    entry: "./main.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        noParse: /node_modules\/json-schema\/lib\/validate\.js/,
        loaders: [
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
     node: {
     fs: "empty",
     net: "empty",
     tls: "empty"
     },
};