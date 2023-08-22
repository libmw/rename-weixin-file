/*
 * @Description:
 * @Author: limengjun
 * @Date: 2021-09-30 16:08:41
 * @LastEditors: limengjun
 * @LastEditTime: 2021-10-28 23:10:00
 */
import fs from "fs";
import path from "path";

import { renameWeChat } from "./utils/renameWeChat.js";
import { moveFileToPhotos } from "./utils/moveFileToPhotos.js";

const processPath = path.resolve("D:/photoTest");

const targetPath = path.join(processPath, "owner");
const weChatPath = path.join(processPath, "WeChat");
const cameraPath = path.join(processPath, "Camera");
const screenshotsPath = path.join(processPath, "Screenshots");

async function main() {
  try {
    console.log("开始重命名微信图片*****************");
    await renameWeChat(weChatPath);
    console.log("重命名微信图片成功*****************");

    console.log("开始移动微信图片*****************");
    await moveFileToPhotos(weChatPath, targetPath, function (filename) {
      const timeReg = /^20\d{2}(\d{4})/;
      const timeRegRes = timeReg.exec(filename);
      if (timeRegRes === null) {
        console.log(`Warning: ${filename} 不能匹配出日期`);
        return;
      }
      return timeRegRes[1];
    });
    console.log("移动微信图片成功*****************");

    console.log("开始移动相机Camera文件夹图片*****************");
    await moveFileToPhotos(cameraPath, targetPath, function (filename) {
      const timeReg = /(?:20\d{2}(\d{4}))|(?:20\d{2}_(\d{2}_\d{2}))/; //匹配纯数字日期和以_分割的日期
      const timeRegRes = timeReg.exec(filename);
      if (timeRegRes === null) {
        console.log(`Warning: ${filename} 不能匹配出日期`);
        return;
      }
      if (timeRegRes[1]) {
        //匹配到了类似IMG_20230708_182228的名称
        return timeRegRes[1];
      }
      if (timeRegRes[2]) {
        //匹配到了类似2023_06_30_22_25_12_00.mp4的名称
        return timeRegRes[2].replace("_", "");
      }
    });
    console.log("移动相机Camera文件夹图片成功*****************");

    console.log("开始移动截图screenshots图片*****************");
    await moveFileToPhotos(screenshotsPath, targetPath, function (filename) {
      const timeReg = /20\d{2}-(\d{2}-\d{2})/;
      const timeRegRes = timeReg.exec(filename);
      if (timeRegRes === null) {
        console.log(`Warning: ${filename} 不能匹配出日期`);
        return;
      }
      const timeRes = timeRegRes[1];
      return timeRes.replace("-", "");
    });
    console.log("移动截图screenshots图片成功*****************");

    console.log("全部搞定*****************");
  } catch (e) {
    console.log("error", e);
  }
}

main();
