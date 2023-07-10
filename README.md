# 手机照片分发。

1. 修改index.js：

const processPath = path.resolve("D:/photoTest");
const targetPath = path.join(processPath, "owner");
const weChatPath = path.join(processPath, "WeChat");
const cameraPath = path.join(processPath, "Camera");
const screenshotsPath = path.join(processPath, "Screenshots");

这几个目录的地址，photoTest为父级目录，下面四个为手机里的目录名称，默认为小米手机，可以修改。

2. 运行index.js，程序将会匹配每个子目录里的图片名称，通过正则来判断这个图片应该放到targetPath中的哪个子目录中，
如果子目录不存在，将会用照片所在的日期为目录名自动创建一个子目录。