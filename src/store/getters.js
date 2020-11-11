const getters = {

    // 收藏商品的状态
    getCollectionSelected(state) {
        let o = {}
        state.collection.forEach(item => {
            o[item.id] = item.selected
        })
        return o;
    },
    //获取收藏夹总数
    getCollectionNum(state) {
        let num = 0;
        state.collection.forEach(item => {
            if (item.selected) {
                num += 1;
            }
            return true
        })
        return num;
    },

    // 获取收藏夹选择按钮的状态
    getCollectionCheck(state) {
        let o = {}
        state.collection.forEach(item => {
            o[item.id] = item.checkbox
        })
        return o;
    },


    // 获取订单中每个商品的数量
    getOrderFormPrice: (state) => (i) => {
        let price = 0
        state.orderForm[i].forEach(el => {

            price += 100 * el.count * el.info.price / 100

        })
        return price;
    },



    //获取购物车中所有商品数量
    getAllCount(state) {
        let sum = null;
        state.car.forEach(item => {
            sum += item.count
        })
        return sum;
    },

    // 获取购物车中每个商品的数量
    getGoodsCount(state) {
        let o = {}
        state.car.forEach(item => {
            o[item.id] = item.count
        })
        return o;
    },

    // 获取购物车选择按钮的状态
    getGoodsSelected(state) {
        let o = {}
        state.car.forEach(item => {
            o[item.id] = item.selected
        })
        return o;
    },

    //计算购物车已经勾选的商品数量和总价
    getGoodsCountAndAmount(state) {
        let o = {
            count: 0,
            amount: 0
        }
        state.car.forEach(item => {
            if (item.selected) {
                o.count += item.count
                o.amount += item.price * item.count;
            }
        })
        return o;
    },

}

export default getters;