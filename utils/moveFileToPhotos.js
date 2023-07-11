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

export async function moveFileToPhotos(filePath, photosPath, getDirPrefix) {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, async function (err, files) {
      if (err) {
        console.warn(err);
        reject();
      } else {
        //遍历读取到的文件列表
        for (let i = 0; i < files.length; i++) {
          const filename = files[i];
          const fileInfo = path.parse(filename);

          const prefix = getDirPrefix(fileInfo.name);
          if (!prefix) {
            continue;
          }

          let targetPath;
          try {
            targetPath = await findDirByPrefix(photosPath, prefix);
          } catch (e) {
            targetPath = path.join(photosPath, prefix);
            fs.mkdirSync(targetPath);
          }

          const fromPath = path.join(filePath, filename);
          const toPath = path.join(targetPath, filename);

          fs.renameSync(fromPath, toPath, (err) => {
            if (err) throw err;
          });
        }
        resolve();
      }
    });
  });
}

function findDirByPrefix(parentPath, prefix) {
  return new Promise((resolve, reject) => {
    fs.readdir(parentPath, function (err, files) {
      if (err) {
        reject();
      } else {
        for (let i = 0; i < files.length; i++) {
          const filename = files[i];

          const filePath = path.join(parentPath, filename);
          const fileStatus = fs.statSync(filePath);
          if (fileStatus.isDirectory() && filename.startsWith(prefix)) {
            resolve(filePath);
          }
        }
        reject();
      }
    });
  });
}
