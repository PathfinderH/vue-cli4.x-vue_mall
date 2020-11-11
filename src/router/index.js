import VueRouter from 'vue-router'



/*****
 views文件夹组件
 *****/
//导入tabbar路由组件
// import HomeContainer from '../views/HomeContainer.vue'
const HomeContainer = () =>
    import ('@/views/HomeContainer.vue')

// import ClassifyContainer from '../views/ClassifyContainer.vue'
const ClassifyContainer = () =>
    import ('@/views/ClassifyContainer.vue')

// import OrderFormContainer from '../views/OrderFomeContainer.vue'
const OrderFormContainer = () =>
    import ('@/views/OrderFomeContainer.vue')

// import ShopcarContainer from '../views/ShopcarContainer.vue'
const ShopcarContainer = () =>
    import ('@/views/ShopcarContainer.vue')

// import MineContainer from '../views/MineContainer.vue'
const MineContainer = () =>
    import ('@/views/MineContainer.vue')



/*****
 search文件夹组件
 *****/
//搜索页面
// import SearchContainer from './../components/search/SearchContainer.vue'
const SearchContainer = () =>
    import ('@/components/search/SearchContainer.vue')




/*****
 home文件夹组件
 *****/
//导入数码产品页面路由组件
// import DigitalProductContainer from './../components/home/DigitalProductContainer.vue'
const DigitalProductContainer = () =>
    import ('@/components/home/DigitalProductContainer.vue')



/*****
 user文件夹组件
 *****/
//登录注册组件
// import LoginContainer from './../components/user/LoginContainer.vue'
const LoginContainer = () =>
    import ('@/components/user/LoginContainer.vue')

// import RegisterContainer from './../components/user/RegisterContainer.vue'
const RegisterContainer = () =>
    import ('@/components/user/RegisterContainer.vue')


/*****
 product文件夹组件
 *****/
//导入商品详情页面路由组件
// import ProductPetails from './../components/product/ProductPetails.vue'
const ProductPetails = () =>
    import ('@/components/product/ProductPetails.vue')

//订单结算页面
// import Settlement from './../components/product/Settlement.vue'
const Settlement = () =>
    import ('@/components/product/Settlement.vue')

//购买成功页面
// import BuySuccess from './../components/product/BuySuccess.vue'
const BuySuccess = () =>
    import ('@/components/product/BuySuccess.vue')



/*****
 mine文件夹组件
 *****/
//个人页面 设置 组件
// import SetContainer from './../components/mine/SetContainer.vue'
const SetContainer = () =>
    import ('@/components/mine/SetContainer.vue')

//个人页面 我的收货地址 组件
// import MyAddressContainer from './../components/mine/MyAddressContainer.vue'
const MyAddressContainer = () =>
    import ('@/components/mine/MyAddressContainer.vue')


//联系作者页面 组件
// import ContactAuthor from './../components/mine/ContactAuthor.vue'
const ContactAuthor = () =>
    import ('@/components/mine/ContactAuthor.vue')


//订单详情
// import OderDetails from './../components/mine/OrderDetails.vue'
const OderDetails = () =>
    import ('@/components/mine/OrderDetails.vue')

//收藏夹界面
// import Collection from './../components/mine/Collection.vue'
const Collection = () =>
    import ('@/components/mine/Collection.vue')


// 创建路由对象
const router = new VueRouter({

    routes: [ // 配置路由规则
        // tabbar路由
        { path: '/', redirect: '/home' },
        {
            path: '/home',
            name: 'home',
            component: HomeContainer,
            meta: {
                TabbarShow: true // 需要显示 底部导航
            }
        },
        //分类
        {
            path: '/classify',
            name: 'classify',
            component: ClassifyContainer,
            meta: {
                TabbarShow: true
            }
        },

        //订单页面
        {
            path: '/mine/orderForm',
            name: 'orderForm',
            component: OrderFormContainer,
            meta: {
                TabbarShow: true
            }
        },
        //订单详情
        {
            path: '/mine/orderForm/:index',
            name: 'orderDetails',
            component: OderDetails,
            meta: {
                TabbarShow: false
            }
        },
        //购物车
        {
            path: '/shopcar',
            name: 'shopcar',
            component: ShopcarContainer,
            meta: {
                TabbarShow: true
            }
        },
        //搜索
        {
            path: '/search',
            name: 'search',
            component: SearchContainer,
            meta: {
                TabbarShow: false
            }
        },
        //个人中心
        {
            path: '/mine',
            name: 'mine',
            component: MineContainer,
            meta: {
                TabbarShow: true
            }
        },

        // 商品详情页面路由
        {
            path: '/home/product/:id',
            name: 'productpetails',
            component: ProductPetails,
            meta: {
                TabbarShow: false // 不需要显示 底部导航
            }
        },

        //数码产品页面路由
        {
            path: '/home/digital_paroduct',
            name: 'digital',
            component: DigitalProductContainer,
            meta: {
                TabbarShow: false
            }
        },

        //注册登录路由
        {
            path: '/login',
            name: 'login',
            component: LoginContainer,
            meta: {
                TabbarShow: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterContainer,
            meta: {
                TabbarShow: false
            }
        },

        //个人页面设置
        {
            path: '/mine/set',
            name: 'set',
            component: SetContainer,
            meta: {
                TabbarShow: false
            }
        },
        //联系作者页面
        {
            path: '/mine/set/contact',
            name: 'contact',
            component: ContactAuthor,
            meta: {
                TabbarShow: false
            }
        },
        //我的收藏
        {
            path: '/mine/collection',
            name: 'collection',
            component: Collection,
            meta: {
                TabbarShow: false
            }
        },

        //我的收货地址
        {
            path: '/mine/set/myAddress',
            name: 'myaddress',
            component: MyAddressContainer,
            meta: {
                TabbarShow: false
            }
        },

        //结算页面
        {
            path: '/:from/settlement',
            name: 'settlement',
            component: Settlement,
            meta: {
                TabbarShow: false
            }
        },
        //结算成功页面
        {
            path: '/:from/settlement/buysuccess',
            name: 'buysuccess',
            component: BuySuccess,
            meta: {
                TabbarShow: false
            },

        },
    ],

    linkActiveClass: 'van-tabbar-item--active',

})


const title = {
    home: '主页',
    classify: '分类',
    search: '搜索',
    shopcar: '购物车',
    mine: '个人中心',

    orderDetails: '订单详情',
    digital: '数码3C',

    productpetails: '商品详情',

    login: '登录',
    register: '注册',

    set: '设置',
    contact: '联系作者',
    collection: '收藏夹',
    myaddress: '我的收货地址',

    buysuccess: '购买成功',
    settlement: '结算订单',
    orderForm: '我的订单',
};




// 注册全局导航前置钩子用来拦截导航
router.beforeEach((to, from, next) => {

        // 设置页面标题
        document.title = title[to.name];
        next();



        if (to.name === 'login' || to.name === 'register' || to.name === 'home' || to.name === 'classify' || to.name === 'search' || to.name === 'digital' || to.name === 'productpetails') return next();

        else {
            const token = localStorage.getItem('token')
            if (!token) return next('/login')
            next();
        }


    })
    //路由懒加载报错处理
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
})
export default router