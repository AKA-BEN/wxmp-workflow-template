## wxmp-workflow-template
>基于Gulp构建的微信原生小程序的开发工作流

### 特性

+ 基于`gulp+less`构建的微信小程序工程项目
+ 项目图片自动压缩
+ ESLint代码检查
+ 使用命令行快速创建`page`、`template`和`component`

### 添加修复

+ `/dist/` 小程序npm构建支持
+ `font` 字体文件转换成base64
+ 修复 `gulp auto` 生成模板的文件路径问题

### Getting Started

##### 0. 开始之前，请确保已经安装node和npm，全局安装gulp-cli
```
$ npm install --global gulp-cli
```
##### 1. 下载代码
```
$ git clone https://github.com/AKA-BEN/wxmp-workflow-template.git
```
##### 2. 进目录，安装依赖
```
$ cd wxmp-workflow-template && npm install
```
##### 3. 编译代码，生成dist目录，使用开发者工具打开dist目录
```
$ npm run dev
```
##### 4. 新建page、template或者component
```
  gulp auto -p mypage           创建名为mypage的page文件
  gulp auto -t mytpl            创建名为mytpl的template文件
  gulp auto -c mycomponent      创建名为mycomponent的component文件
  gulp auto -s index -p mypage  复制pages/index中的文件创建名称为mypage的页面
```
##### 5. 上传代码前编译
```
$ npm run build
```
##### 6. 上传代码，审核，发版

### 工程结构
```
wxmp-workflow-template
├── dist         // 编译后目录
│    ├── miniprogram_npm  // 小程序npm构建生成
│    ├── node_modules     // 小程序模块依赖
│    ├── package-lock.json
│    ├── package.json
├── node_modules // 项目依赖
├── src 
│    ├── assets // 资源文件
│    │    ├── fonts  // 字体源文件
│    ├── components // 微信小程序自定义组件
│    ├── images     // 页面中的图片和icon
│    ├── pages      // 小程序page文件
│    ├── styles     // ui框架，公共样式
│    ├── template   // 模板
│    ├── utils      // 公共js文件
│    ├── app.js
│    ├── app.json
│    ├── app.less
│    ├── project.config.json // 项目配置文件
│    └── api.config.js       // 项目api接口配置
├── .gitignore
├── .eslintrc.js
├── package-lock.json
├── package.json
└── README.md

```
