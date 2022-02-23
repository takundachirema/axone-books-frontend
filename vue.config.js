const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    chainWebpack(config) {
      config.plugins.delete('prefetch');
      config.plugin('CompressionPlugin').use(CompressionPlugin);
    },
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