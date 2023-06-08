/*
 * @Description: 把手机截图分发到已经建立好的图片目录中
 * 这个文件的使用场景是，当已经按照日期把手机里的照片分发到各个文件夹中后，截图可用通过次文件自动复制到相应的日期文件夹中。
 * @Author: limengjun
 * @time: 2021-07-18 20:16:35
 * @LastEditors: limengjun
 * @LastEditTime: 2021-10-28 23:07:50
 */
import { moveFileToPhotos } from "./utils/moveFileToPhotos.js";

function getPreName(filename) {
  const timeReg = /^20\d{2}(\d{4})/;
  const timeRegRes = timeReg.exec(filename);
  if (timeRegRes === null) {
    console.log(`Warning: ${filename} 不能匹配出日期`);
    return;
  }
  return timeRegRes[1];
}

moveFileToPhotos("D:/WeChat", "D:/手机图片", getPreName);
