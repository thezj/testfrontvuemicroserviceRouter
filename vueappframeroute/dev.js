 const merge = require('webpack-merge')
 const common = require('./build.js')

 module.exports = merge(common, {
     devtool: 'inline-source-map',
     devServer: {
         port: 8000,
         proxy: {
             "/app1/": {
                 target: "http://localhost:8001",
                 pathRewrite:{'^/app1' : ''}
             },
             "/app2/": {
                target: "http://localhost:8002",
                pathRewrite:{'^/app2' : ''}
            }
         }
     }
 });