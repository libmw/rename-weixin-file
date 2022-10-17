/*
 * @Description: 条件拷贝照片
 * @Author: limengjun
 * @time: 2021-07-18 20:16:35
 * @LastEditors: limengjun
 * @LastEditTime: 2021-10-28 23:07:50
 */
var fs = require("fs");
var path = require("path");
var fromPath = path.resolve("K:/微云/图片/2019");
const originPath = path.resolve("K:/微云不同步/图片视频存档");

function findOriginByPath(currentPath) {
  fs.readdir(currentPath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      for (let i = 0; i < files.length; i++) {
        const filename = files[i];

        //console.log(filename, +filename.slice(0, 2) < 11);

        const filePath = path.join(currentPath, filename);
        const fileStatus = fs.statSync(filePath);
        const fileNamePre2 = filename.slice(0, 2);
        if (fileStatus.isDirectory() && (fileNamePre2 == '05' || fileNamePre2 == '06')) {
          console.log("开始处理: ", filePath);
          findOriginByPath(filePath);
        } else {
          const originFilePath = path.join(originPath, filename);
          if (fs.existsSync(originFilePath)) {
            //如果在同一文件夹，使用rename即可fs.renameSync
            fs.copyFileSync(originFilePath, filePath);
          }
        }

      }
    }
  });
}

findOriginByPath("K:/微云/图片/2020");
