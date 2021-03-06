# 说明

### PS:项目正在开发中,主体功能基本完成,实时更新!!!!

### 此项目为:`个人博客系统`的三个模块之一

+ [Blog-Main-Web 前端界面模块](https://github.com/xiaohuohumax/Blog-Main-Web)
+ [Blog-Background-Api 后台管理API](https://github.com/xiaohuohumax/Blog-Background-Api)
+ [Blog-Admin-App 后台管理APP(PC端)](https://github.com/xiaohuohumax/Blog-Admin-App)


### 项目截图 [截图](/image)

![后台管理欢迎](/image/后台管理欢迎.png)

![后台管理权限系统](/image/后台管理权限系统.png)

![后台管理虚拟文件系统](/image/后台管理虚拟文件系统.png)

![后台实时通知](/image/后台实时通知.png)

## 大致功能

### 前端网站:

1. 正常的博客系统功能 登录注册 浏览博文/图片/视频
2. 在线小游戏 , 实用小工具
3. 视频弹幕
4. 换肤
5. 登录注册

### 后台管理:

1. 对博客系统的管理
2. 虚拟文件系统(类似网盘)
2. 权限系统

### 其他

1. 想到了再做.... (*^▽^*)


## 项目技术说明

1. `Blog-Main-Web 前端界面模块` : nuxt + iview + bootstrap + axios
2. `Blog-Background-Api 后台管理API` : express + mongoBD + mongoose
3. `Blog-Admin-App 后台管理APP(PC端)` : electron + vue + iview + bootstrap + axios + tinymce + echars


## 项目运行

1. `下载依赖`

    cnpm install

2. `修改配置文件 后台url地址配置`

    在 /src/config.js 中

3. `执行命令`

    npm run serve

4. `初始账号登录`

    + 超级管理员
        admin
        123456
    + 普通管理员
        xiaohuohu
        123456

## 配置

请自行查看 `config.js` 文件

## 注意点

项目构建打包时国内会报文件下载错误

参考:[electron打包踩过的坑总结](https://segmentfault.com/a/1190000018533945)
