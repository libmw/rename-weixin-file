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

const targetPath = path.resolve("E:/微云/图片/2024");

const weChatPath = path.join(processPath, "WeChat");
const WeiXinPath = path.join(processPath, "WeiXin");
const cameraPath = path.join(processPath, "Camera");
const screenshotsPath = path.join(processPath, "Screenshots");
const videos360Path1 = path.join(processPath, "videos"); //水滴摄像头
const videos360Path2 = path.join(processPath, "Movies"); //360新app

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

    console.log("开始移动WeiXinPath图片*****************");
    await moveFileToPhotos(WeiXinPath, targetPath, function (filename) {
      const timestamp = filename.replace(/\..+/g, "").replace(/[a-z]/g, "");
      return getDateByTimestamp(timestamp);
    });
    console.log("移动WeiXinPath图片成功*****************");

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

    console.log("开始移动360视频*****************");
    await moveFileToPhotos(videos360Path1, targetPath, function (filename) {
      const timeReg = /20\d{2}_(\d{2}_\d{2})/;
      const timeRegRes = timeReg.exec(filename);
      if (timeRegRes === null) {
        console.log(`Warning: ${filename} 不能匹配出日期`);
        return;
      }
      const timeRes = timeRegRes[1];
      return timeRes.replace("_", "");
    });
    console.log("移动360视频成功*****************");

    console.log("开始移动360新版视频*****************");
    await moveFileToPhotos(videos360Path2, targetPath, function (filename) {
      const startTimestamp = +filename.split("_")[2];
      if (!startTimestamp) {
        console.log(`Warning: ${filename} 不能匹配出日期`);
        return;
      }
      return getDateByTimestamp(startTimestamp * 1000);
    });
    console.log("移动360新版视频成功*****************");

    console.log("全部搞定*****************");
  } catch (e) {
    console.log("error", e);
  }
}

function getDateByTimestamp(timestamp) {
  const startTime = new Date(+timestamp);
  const month = String(startTime.getMonth() + 1).padStart(2, "0");
  const date = String(startTime.getDate()).padStart(2, "0");
  return `${month}${date}`;
}
main();
