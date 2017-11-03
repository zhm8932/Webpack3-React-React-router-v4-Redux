# 前海明日科技官网

- Express
- Jade
- Webpack 3
- SASS
- jquery

安装依赖模块
```
npm install / yarn install
```

第一次启动服务前编译公共文件
```
npm run dll
```

启动node服务
```
npm start
```

开发环境编译
```
npm run dev
```

生产环境编译
```
npm run build
```

开发规范
--------
重要文件入口:
<br />
路由控制：route/
<br />
所有请求：requests/
<br />
模板处理：handlers/
<br />
配置文件： config/ 根据环境变量读取配置文件
<br/>
前端开发代码：src/  包括SASS,JS,images 和字体（fonts）
