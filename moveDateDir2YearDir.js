/*
 * originPath 下面都是以四位数日期命名的文件夹，如：202004
 * targetPath 下面都是以年份命名的文件夹，如：2020
 * 把originPath里的文件拷贝到targetPath里面
 */
import fs from "fs";
import path from "path";

const originPath = path.resolve("D:/photoTest/owner");

const targetPath = path.resolve("D:/photoTest/year");

fs.readdir(originPath, function (err, files) {
  if (err) {
    console.warn(err);
  } else {
    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      if (!/\d{4}/.test(filename)) {
        console.warn(`Warning: ${filename} 不是正常的日期`);
        continue;
      }
      const filePath = path.join(originPath, filename);
      moveDateDir2YearDir(filePath);
    }
  }
});

const findYearByFileName = (filename) => {
  const timeReg = /(20\d{2})\d{4}/;
  const timeRegRes = timeReg.exec(filename);
  if (timeRegRes && timeRegRes[1]) {
    const year = timeRegRes[1];
    if (year > 2000 && year < 2100) {
      return `${year}`;
    }
  }

  const timeStampReg = /(\d+)/;
  const timeStampRegRes = timeStampReg.exec(filename);
  if (timeStampRegRes && timeStampRegRes[1]) {
    const timestamp = +timeStampRegRes[1];
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      if (year > 2000 && year < 2100) {
        return `${year}`;
      }
    }
  }
};

function moveDateDir2YearDir(dateDir) {
  fs.readdir(dateDir, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      for (let i = 0; i < files.length; i++) {
        const filename = files[i];

        const filePath = path.join(dateDir, filename);

        const year = findYearByFileName(filename);

        if (!year) {
          console.log("找不到年份：", filename);
          continue;
        }

        const targetDir = path.join(targetPath, year);

        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir);
        }

        const targetFilePath = path.join(targetDir, filename);
        fs.renameSync(filePath, targetFilePath);
      }
    }
  });
}
