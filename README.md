# vue-mall
## 介绍

- 项目地址： [https://github.com/PathfinderH/vue_mall](https://github.com/PathfinderH/vue_mall)
- 本项目页面样式及逻辑参考借鉴了淘宝，京东等购物网站，项目素材都来源于此，项目主要完成前端逻辑
- 项目已部署至阿里云，预览地址：http://121.89.216.15/


## 功能
- 首页商品数据使用vant中的list组件分页加载后台数据
- 关键字搜索功能，切换排序方式，切换搜索结果列表样式，增加历史搜索记录，删除历史搜索记录
- 收藏商品，查看已收藏商品，搜索收藏夹内商品，删除收藏商品功能
- 加入购物车，购物车商品单选全选取消全选，将购物车商品移入收藏夹，删除购物车内的商品，结算、下单功能
- 添加、修改、删除收货地址，设置默认收货地址功能
- 分类查看、搜索所有购买商品的订单
- 基本的用户登录、注册，退出登录功能

## 技术栈

#### 前端
- vue + axios + vue-router + vuex + less
- 脚手架工具：vue-cli 4.5.7
- UI框架：vant-ui
- 本地localStorage缓存储购物车、收货地址、收藏夹、订单、用户信息等数据
- 移动端适配：postcss-pxtorem + amfe-flexible 配置基于 Rem 的移动端适配

#### 后端
- 使用node + express搭建后端服务器
- mysql数据库存储数据


## 安装运行依赖及设置数据库

#### 注意
- 使用该项目需要本地有node和mysql，且本地要导入数据库

#### 后端（node）

    cd server (进入服务器根目录)
    
    npm install
    
    1.进入database文件夹中将数据库文件导入本地数据库
    
    2./server/db.js中设置数据库
    
    3./server/app.js中设置服务器端口和IP

#### 前端（vue）

    cd vue-mall(进入vue项目根目录)
    
    npm install
    
    1.进入/src/main.js中修改axios请求地址

## 运行    

#### 服务器
```
cd server
node app
```

#### 开发环境
```
cd vue-mall(项目根目录)
npm run serve
```

#### 生产环境
```
cd vue-mall(项目根目录)
npm run build
```



## 项目目录

```
|-- vue-mall
    |-- .browserslistrc
    |-- .eslintrc.js
    |-- .gitignore
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- vue.config.js
    |-- database    //数据库文件夹
    |   |-- vue_mall.sql
    |-- public
    |   |-- favicon.png
    |   |-- index.html
    |-- server  //后端服务器文件夹
    |   |-- app.js
    |   |-- db.js   //封装操作数据库的通用API
    |   |-- data.json   //前端页面数据
    |   |-- package-lock.json
    |   |-- package.json
    |   |-- router.js   //后端路由
    |   |-- service.js  //后端业务逻辑
    |   |-- public
    |       |-- images
    |           |-- goods   //商品主图文件夹
    |           |-- product_list    //商品详情文件夹
    |       |-- img
    |      		|-- classify    //分类页面图片
    |       	|-- home_imgs   //主页图片
    |     		|-- icon    //首页图标图片
    |     		|-- mine    //个人中心页面图片	
    |-- src
        |-- App.vue
        |-- main-dev.js  //开发环境入口文件
        |-- main-prod.js   //生产环境入口文件
        |-- assets
        |   |-- fonts   //字体图标文件夹
        |   |-- img
        |   |   |-- home_imgs   //主页图片
        |   |   |-- mine    //个人中心页面图片
        |   |   |-- shopcar //购物车页面图片
        |   |-- js
        |       |-- area.js //省市区列表数据
        |-- components
        |   |-- home    //主页组件文件夹
        |   |   |-- DigitalProductContainer.vue //数码3C页面
        |   |-- mine    //个人中心页面组件文件夹
        |   |   |-- Collection.vue  //收藏夹页面
        |   |   |-- MyAddressContainer.vue  //收货地址页面
        |   |   |-- OrderDetails.vue    //订单详情页面
        |   |   |-- SetContainer.vue    //设置页面
        |   |   |-- ContactAuthor.vue    //联系方式页面
        |   |-- product //商品组件文件夹
        |   |   |-- GoodsList.vue  //商品列表子组件
        |   |   |-- BuySuccess.vue  //购买成功页面
        |   |   |-- ProductPetails.vue  //商品详情页面
        |   |   |-- Settlement.vue  //订单支付页面
        |   |-- search  //搜索组件文件夹
        |   |   |-- SearchContainer.vue //搜索页面
        |   |-- user    //登录注册组件文件夹
        |       |-- LoginContainer.vue  //登录组件
        |       |-- RegisterContainer.vue   注册组件
        |-- plugins
        |   |-- vant.js //按需导入vant-ui
        |-- router  //vue路由文件夹
        |   |-- index.js
        |-- store   //vuex文件夹
        |   |-- index.js
        |   |-- state.js
        |   |-- mutations.js
        |   |-- getters.js
        |   |-- actions.js
        |-- views   //tabbar视图组件文件夹
            |-- ClassifyContainer.vue   //分类页面
            |-- HomeContainer.vue   //主页页面
            |-- MineContainer.vue   //个人中心页面
            |-- OrderFomeContainer.vue  //订单页面
            |-- ShopcarContainer.vue    //购物车页面




```