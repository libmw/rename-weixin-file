/*
 * @Description: 把已经处理过的微信文件分发到已经建立好的图片目录中
 * 这个文件的使用场景是，当已经按照日期把手机里的照片分发到各个文件夹中后，微信文件可用通过次文件自动复制到相应的日期文件夹中。
 * @Author: limengjun
 * @time: 2021-07-18 20:16:35
 * @LastEditors: limengjun
 * @LastEditTime: 2021-10-28 23:07:50
 */
import fs from "fs";
import path from "path";

export function moveFileToPhotos(filePath, photosPath, getPreName) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(async function (filename) {
        const fileInfo = path.parse(filename);

        const preName = getPreName(fileInfo.name);
        if (!preName) {
          return;
        }

        const targetPath = await findDirByPreName(photosPath, preName);

        const fromPath = path.join(filePath, filename);
        const toPath = path.join(targetPath, filename);

        console.log("fromPath: ", fromPath, toPath);

        fs.rename(fromPath, toPath, (err) => {
          if (err) throw err;
        });
      });
    }
  });
}

function findDirByPreName(parentPath, preName) {
  return new Promise((resolve, reject) => {
    fs.readdir(parentPath, function (err, files) {
      if (err) {
        reject();
      } else {
        for (let i = 0; i < files.length; i++) {
          const filename = files[i];

          const filePath = path.join(parentPath, filename);
          const fileStatus = fs.statSync(filePath);
          if (fileStatus.isDirectory() && filename.startsWith(preName)) {
            resolve(filePath);
          }
        }
        reject();
      }
    });
  });
}
