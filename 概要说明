---
date: 2016-11-29 13:25
status: public
title: 概要说明
---

## 环境需要
- node ^4.5.0
- npm ^3.0.0
- redux dev tools(chrome plugin)
- webpack
## 启动步骤
``````
cnpm install
# 开发模式
cnpm run dev
# 发布模式
cnpm run prod
# 单元测试
cnpm run test
# 清除已生成内容
cnpm clean
# 生成发布
cnpm build
``````
## 程序结构
``````
├── node_modules              # node所有插件
├── public                   # Build/Start 之后所有资源    
├── config                   # 项目配置设置
├── dist                     # 部署资源
├── server                   # 提供webpack中间件的Express应用程序
│   └── main.js              # Server程序程序入口文件
├── src                       # 应用程序源代码
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件(Container Components)
│   ├── layouts              # 定义主要页面结构的组件集
|   |   └──CoreLayout     
|   |      └── CoreLayout.js    # CoreLayout从每个路由(route)中接受children内容
│   │      └── CoreLayout.scss  # 应用于CoreLayout的样式
│   │      └── index.js         # 布局主文件
│   ├── routes                  # 所有路由定义和异步分隔点
│   │   ├── index.js         # 带store的主应用
│   │   ├── Home             # 分形路由(不规则，易碎的)
│   │   │   ├── index.js     # 路由定义和异步分隔点集
│   │   │   ├── assets       # 组件显示所需资源,png等资源
│   │   │   ├── components   # React组件
│   │   │   └── routes **    # 分形子路由sub-routes (** optional)
│   │   └── Counter          # 示例 route
│   │       ├── index.js     # Counter路由定义
│   │       ├── container    # 连接components到actions和store
│   │       ├── modules      # reducers/constants/actions集合
│   │       └── routes **    # 分形子路由 sub-routes (** optional)
│   ├── static               # 静态资源(not imported anywhere in source code)
│   ├── store                # Redux特性部分
│   │   ├── createStore.js   # 创建 redux store
│   │   └── reducers.js      # Reducer注册和注入
│   └── styles               # 应用程序级的样式
├── index.html                # 应用程序主 HTML 容器
└── tests                    # 单元测试
``````
## 开发工具
- nodejs
- npm
- Redux DevTools Chrome Extension
- redux-devtools
- webpack
        
安装代码
``````
#安装方式
cnpm install --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
``````
## 路由
    系统使用了 react-router来定义应用程序的各逻辑单元。
## 测试
- Karma
- Mocha
- Chai
可以在~/test文件夹下创建一个.spec.js文件来进行单元测试。Karma会自动组织所有文件，Mocha和Chai可以在不用导入的情况下，直接使用。测试覆盖报告默认在~/coverage下生成。可以通过~/config/index.js里的coverage_reporters来进行修改。
## 部署
系统部署独立于后台服务端的显示和API结构的。
部署命令：

``````
    #部署命令，必须确保node环境变量NODE_ENV正常使用。osx,windows下不同。
    cnpm run deploy
``````
### 静态资源部署
如果要在nginx等服务器下部署，要确保~/dist/index.html为直接入口文件。剩下的就由react-router来处理系统资源。
