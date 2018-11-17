var fs = require('fs');
var path = require('path');
var filePath = path.resolve('C:/Users/lmj/Desktop/WeiXin');
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
            var dateName = date.toISOString().replace(/[-:]/g, '').replace('T','_');
            var oldPath = path.join(filePath,filename);
            var newPath = path.join(filePath, dateName + fileInfo.ext);
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
            });
        });
    }
});
