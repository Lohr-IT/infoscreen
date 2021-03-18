module.exports = {
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style!css!sass?indentedSyntax=false'
            }
        ]
    },
    vue: {
        loaders: {
            scss: 'style!css!sass'
        }
    }
}
