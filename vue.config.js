const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname,
    "dist/public"),
  indexPath: 'html/index.html',
  publicPath: '/public',
  css: {
    extract: {
      filename: 'css/management-dashboard/[name].[hash:8].css',
      chunkFilename: 'css/management-dashboard/[name].[hash:8].css'
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/management-dashboard/[name].[hash:8].js',
      chunkFilename: 'js/management-dashboard/[name].[hash:8].js'
    }
  }
}