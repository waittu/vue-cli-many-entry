const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir);
}
const pageMethod  = require('./many/getPages').pages()
module.exports = {
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            if(process.env.NODE_REPORT==='report'){
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
            }
          } else {

          }
    },
    // 基本配置
    configureWebpack:{
        resolve:{
            alias:{
              '@': resolve('src'),
            }
        },
    },
    productionSourceMap: false,
    css:{
        loaderOptions:{
            less: {}
        } 
    },
    // 开发环境
    devServer:{
        port:9922
    },
    pages:pageMethod,
}