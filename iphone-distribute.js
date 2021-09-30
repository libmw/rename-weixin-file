/*
 * @Description:
 * @Author: limengjun
 * @Date: 2021-09-30 15:38:44
 * @LastEditors: limengjun
 * @LastEditTime: 2021-09-30 15:56:04
 */
const fs = require("fs");

var path = require("path");
var filePath = path.resolve("F:/iphoneSrc");
fs.readdir(filePath, function (err, files) {
  if (err) {
    console.warn(err);
  } else {
    //遍历读取到的文件列表
    files.forEach(function (filename) {
      const fromPath = path.join(filePath, filename);

      const fileStatus = fs.statSync(fromPath);
      const fileModTime = fileStatus.mtime;
      const timeYear = fileModTime.getFullYear();
      const timeMonth = fileModTime.getMonth() + 1;
      const dirYear = `f:/TMPhone/${timeYear}`;
      const dirDate = `${dirYear}/${timeMonth}`;
      if (!fs.existsSync(dirYear)) {
        fs.mkdirSync(dirYear);
      }
      if (!fs.existsSync(dirDate)) {
        fs.mkdirSync(dirDate);
      }

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

