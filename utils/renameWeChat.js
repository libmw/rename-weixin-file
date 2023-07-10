/*
 * 把微信目录的图片改为纯数字日期的格式
 */
import fs from "fs";
import path from "path";

export async function renameWeChat(filePath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, function (err, files) {
      if (err) {
        reject();
      } else {
        //遍历读取到的文件列表
        files.forEach(function (filename) {
          let fileInfo = path.parse(filename);
          let date = new Date(+fileInfo.name.replace(/[^\d]/g, ""));
          if (isNaN(date.getDate())) {
            return;
          }
          date = new Date(+date + 8 * 3600 * 1000);
          let dateName = date
            .toISOString()
            .replace(/[-:]/g, "")
            .replace("T", "_");
          let oldPath = path.join(filePath, filename);
          let newPath = path.join(filePath, dateName + fileInfo.ext);
          fs.renameSync(oldPath, newPath, (err) => {
            if (err) throw err;
          });
        });
        resolve();
      }
    });
  });
}
