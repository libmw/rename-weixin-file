/*
 * @Description: 把手机照片分发到以"年/月日"格式的目录中
 * @Author: limengjun
 * @time: 2021-07-18 20:16:35
 * @LastEditors: limengjun
 * @LastEditTime: 2021-10-28 23:07:50
 */
var fs = require("fs");
var path = require("path");
var filePath = path.resolve("D:/照片/待处理/Camera");
fs.readdir(filePath, function (err, files) {
  if (err) {
    console.warn(err);
  } else {
    //遍历读取到的文件列表
    files.forEach(function (filename) {
      var fileInfo = path.parse(filename);
      const timeReg = /20(\d{6})/;
      const timeRegRes = timeReg.exec(fileInfo.name);
      if(timeRegRes ===null){
          console.log(`Warning: ${fileInfo.name} 不能匹配出日期`);
          return;
      }
      const timeRes = timeRegRes[1];
      const timeYear = timeRes.slice(0,2);
      const timeDate = timeRes.slice(2);
      const dirYear = `d:/photo/20${timeYear}`;
      const dirDate = `${dirYear}/${timeDate}`;
      if(!fs.existsSync(dirYear)){
        fs.mkdirSync(dirYear)
      }
      if(!fs.existsSync(dirDate)){
        fs.mkdirSync(dirDate)
      }
      const fromPath = path.join(filePath, filename);
      var toPath = path.join(dirDate, filename);
      fs.rename(fromPath, toPath, (err) => {
        if (err) throw err;
      });
      /* var time = new time(+fileInfo.name.replace(/\d{8}/g, ""));
      if (isNaN(time.gettime())) {
        return;
      }
      time = new time(+time + 8 * 3600 * 1000);
      var timeName = time.toISOString().replace(/[-:]/g, "").replace("T", "_");
      
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
      }); */
    });
  }
});
