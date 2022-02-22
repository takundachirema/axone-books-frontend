module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    configureWebpack: {
      optimization: {
        splitChunks: {
          minSize: 10000,
          maxSize: 250000,
        }
      },
      devServer: {
        historyApiFallback: true
      }
    }
}