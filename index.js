/*
 * @Description: 
 * @Author: limengjun
 * @Date: 2021-09-30 16:08:41
 * @LastEditors: limengjun
 * @LastEditTime: 2021-10-28 23:10:00
 */
var fs = require('fs');
var path = require('path');
var filePath = path.resolve('D:/WeChat');
fs.readdir(filePath,function(err,files){
    if(err){
        console.warn(err)
    }else{
        //遍历读取到的文件列表
        files.forEach(function(filename){
            var fileInfo = path.parse(filename);
            var date = new Date(+fileInfo.name.replace(/[^\d]/g, '')) ;
            if(isNaN(date.getDate())){
                return;
            }
            date = new Date(+date + 8 * 3600*1000);
            var dateName = date.toISOString().replace(/[-:]/g, '').replace('T','_');
            var oldPath = path.join(filePath,filename);
            var newPath = path.join(filePath, dateName + fileInfo.ext);
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
            });
        });
    }
});
