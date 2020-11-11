//封装解密方法
function decode(info) {
    switch (info) {
        case '[]':
            return JSON.parse(info);

        case '{}':
            return JSON.parse(info);

        case null:
            return JSON.parse('[]')

        default:
            return JSON.parse(decodeURIComponent(window.atob(info)))

    }

}



let car = decode(localStorage.getItem('car'))

let check_all = JSON.parse(localStorage.getItem('check_all') || false)

let currentUser = decode(localStorage.getItem('currentUser'))

let address = decode(localStorage.getItem('address'))

let directBuyGoods = decode(localStorage.getItem('directBuyGoods'))

let orderForm = decode(localStorage.getItem('orderForm'))

let collection = decode(localStorage.getItem('collection'))

let coll_check_all = JSON.parse(localStorage.getItem('coll_check_all') || false)

let historySearch = decode(localStorage.getItem('historySearch'))



const state = {
    car, //购物车数据

    check_all, //全选按钮状态

    currentUser, //当前用户信息

    address, //收货地址

    directBuyGoods, //直接购买的商品的id和数量

    orderForm, //订单列表

    collection, //收藏夹列表

    coll_check_all, //收藏夹全选按钮

    historySearch //历史记录
}

export default state;