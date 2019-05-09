const glob = require('glob')
const fs = require('fs')
module.exports.pages =  ()=>{
    let pages = {}
    glob.sync( './src/views/*/*.js').forEach(filepath =>{
        let fileList = filepath.split('/');
        let fileName = fileList[fileList.length-2];
        pages[fileName] = {
            entry: `./src/views/${fileName}/${fileName}.js`,
            template: 'index.html',
            // 输出文件路径
            filename: process.env.NODE_ENV === 'development'?`${fileName}.html`:`${fileName}/${fileName}.html`,
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', fileName]
        }
    })
    return pages
};