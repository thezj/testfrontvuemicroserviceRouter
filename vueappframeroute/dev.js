 const merge = require('webpack-merge')
 const common = require('./build.js')

 module.exports = merge(common, {
     devtool: 'inline-source-map',
     devServer: {
         port: 8000
     }
 });