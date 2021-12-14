module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    configureWebpack: {
        devServer: {
          historyApiFallback: true
        }
    }
}