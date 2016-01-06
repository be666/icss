var path = require('path')
var config = require('../config')
var utils = require('./utils')
var fs = require('fs')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env
var _ = require('lodash');
let entryList = function () {
  let entryList = []
  let enterMap = config.enterMap
  for (let moduleName in enterMap) {
    let moduleEnterList = enterMap[moduleName];
    moduleEnterList.forEach(function (x) {
      let enter = Object.keys(x)[0];
      entryList.push(new HtmlWebpackPlugin(_.extend({
        filename: `${enter}.html`,
        template: `templates/default.ejs`,
        inject: true,
        chunks: ['manifest', 'vendor', `${enter}`],
        chunksSortMode: 'dependency',
        moduleClass: moduleName,
        enterClass: enter.replace(new RegExp('/', 'g'), '-')
      }, x[enter])))
    });
  }
  return entryList;
}
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js'),
    libraryTarget:'umd',
    jsonpFunction:'ICSSwebpackJsonp'
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
    // extract css into its own file
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    ...entryList()
    // split vendor js into its own file
  ]
})
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
module.exports = webpackConfig
