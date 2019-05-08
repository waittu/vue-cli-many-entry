const fs = require('fs')
const glob =  require('glob')

class CopyFile{
    // 文件拷贝
    callbackFile( src, dst){
        fs.readFile(src,'utf8',(error,data)=>{
            if(error){
                console.log(error);
                return false;
            }
            // console.log('文件写入');
            fs.writeFile(dst,data.toString(),'utf8',(error)=>{
                if(error){
                    return false;
                }
                // 写入完成后删除
                fs.unlink(src, ()=> {
                    console.log('外部文件删除成功')
                })
            })
        })
    }
    // 复制目录
    copyPath(basePath,pathName){
        let $this = this;
        glob.sync(basePath).forEach((filepath) => {
            let fileNameList = filepath.split('.');
            let fileName = fileNameList[1].split('/')[3];// 多页面页面目录
            let copyName = filepath.split('/')[3];
            let changeDirectory = `./dist/${fileName}/${pathName}`;// 多页面JS和css文件地存放址
            // js的公共js不转移
            if(!fileName.includes('chunk-vendors')){
                fs.exists( changeDirectory, ( exists )=>{
                    if( exists ){// 已存在
                       $this.callbackFile(filepath,`${changeDirectory}/${copyName}`)
                    } else{// 不存在
                        fs.mkdir( changeDirectory, function(){
                            $this.callbackFile(filepath,`${changeDirectory}/${copyName}`)
                        });
                    }
                });
            }
        });
    }
    // html得替换
    htmlRep(){
        let $this = this;
        // 复制目录
        glob.sync( './dist/js/*.js').forEach((filepath) => {
            let fileNameList = filepath.split('.');
            let fileName = fileNameList[1].split('/')[3];// 多页面页面目录
            let thisDirectory = `./dist/${fileName}/${fileName}.html`;// 多页面JS文件地存放址
            let changeDirectory = `./dist/${fileName}/index.html`;// 多页面JS文件地存放址
            if(!fileName.includes('chunk-vendors')){
                $this.fileRep(thisDirectory,changeDirectory,fileName,filepath)
            }
        })
    }
    // 文件替换
    fileRep( src,dst, name, filepath){
        fs.readFile(src,'utf8',(error,data)=>{
            if(error){
                return false;
            }
            let regCss = new RegExp("\/css\/"+name+"",'g');
            let regJs = new RegExp("\/js\/"+name+"",'g');
            let htmlContent = data.toString().replace(regCss,`\.\/css\/${name}`).replace(regJs,`\.\/js\/${name}`);
            fs.writeFile(dst,htmlContent,'utf8',(error)=>{
                if(error){
                    return false;
                }
                if(src.indexOf('/index.html') == -1){
                    fs.unlink(src,function () {})
                }
                fs.unlink(filepath, ()=> {})
                fs.unlink(filepath+'.map', ()=> {})
            })
        })
    }
    // 删除外部多余文件
    deleteFile(){
        glob.sync('./dist/*.html').forEach((item)=>{
            fs.unlink(item, ()=> {
                console.log('删除外部多余文件')
            })
        })
    }
}
function init(){
    const copy = new CopyFile()
    // 拷贝css
    copy.copyPath('./dist/css/*.css','css')
    // 拷贝js
    copy.copyPath('./dist/js/*.js','js')
    // 文件替换
    copy.htmlRep()
    // 删除外部多余文件
    copy.deleteFile()
}
init()