const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir);
}
const pageMethod  = require('./many/getPages').pages()
//const publicPath = process.env.NODE_ENV === "production" ? "../" : "/";
module.exports = {
    //publicPath:publicPath,
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
    pages:pageMethod
}