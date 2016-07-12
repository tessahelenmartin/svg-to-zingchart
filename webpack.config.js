/**
 * Created by tmartin on 6/29/16.
 */
module.exports = {
    entry: "./svg-to-zing.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.json$/, loader: 'json'}
        ]
    }/*,
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }*/
};
