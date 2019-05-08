const glob = require('glob')
let pages = {}
module.exports.pages = function (){
    glob.sync( './src/views/*/*.js').forEach(filepath =>
    {
        console.log(filepath)
        let fileList = filepath.split('/');
        let fileName = fileList[fileList.length-2];
        pages[fileName] = {
            entry: `src/views/${fileName}/${fileName}.js`,
            // 模板来源
            template: `index.html`,
            // 在 dist/index.html 的输出
            filename: process.env.NODE_ENV === 'development'?`${fileName}.html`:`${fileName}/${fileName}.html`,
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', fileName]
        }
    })
    return pages
};