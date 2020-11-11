//路由模块

const express = require('express');
const service = require('./service.js');
const router = express.Router();





//主页商品列表
router.post('/getProductList', service.getProductList);
//获取商品详情
router.get('/allProductList/product/:id', service.getProduct);
//获取商品详情介绍图
router.get('/allProductList/getProduct/:id', service.getProductImg);
//获取购物车信息
router.get('/getShopcar/:id', service.getShopcar);
//搜索结果信息
router.get('/getSearch/:info', service.getSearch);
//注册账号
router.post('/register', service.register);
//登录账号
router.post('/login', service.login);

router.post('/updateDatabaseInfo', service.updateDatabaseInfo)


router.post('/getUserInfo', service.getUserInfo);
/****************************
 * 以下接口从json文件中获取数据
 * **************************/

//获取首页竖向轮播图数据
router.get('/getHomeSlide', service.getHomeSlide);
//主页推荐数据
router.get('/getRecommend', service.getRecommend);
//主页图标数据
router.get('/getHomeIcon', service.getHomeIcon);
//数码3C页轮播图
router.get('/getDigitalSlide', service.getDigitalSlide);
//分类页数据
router.get('/getClassify', service.getClassify);
//个人中心页更多工具图标数据
router.get('/getMineIcon', service.getMineIcon);





module.exports = router;