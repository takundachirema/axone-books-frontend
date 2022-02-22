const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    plugins: [
      new BundleAnalyzerPlugin()
    ],
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