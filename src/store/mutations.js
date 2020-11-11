//加密方法
function encrypt(state, info) {
    return localStorage.setItem(info, window.btoa(window.encodeURIComponent(JSON.stringify(state[info]))))
}

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


const mutations = {

    //删除历史记录
    removeHistorySearch(state) {
        state.historySearch = [];
        encrypt(state, 'historySearch')
            // localStorage.setItem('historySearch', window.btoa(window.encodeURIComponent(JSON.stringify(state.historySearch))))
    },



    /******收藏商品*****/
    //将收藏商品保存
    saveCollection(state, info) {
        let flag = false;

        state.collection.some(item => {
            if (item.id == info.id) {
                this.commit('removeCollection', info.id)
                flag = true;
                return true;
            }
        })
        if (!flag) {
            state.collection.push(info);
        }
        encrypt(state, 'collection')
            // localStorage.setItem('collection', window.btoa(window.encodeURIComponent(JSON.stringify(state.collection))))
    },

    //删除一个收藏商品
    removeCollection(state, id) {
        state.collection.some(item => {
            if (item.id == id) {
                const index = state.collection.indexOf(item)
                state.collection.splice(index, 1)
                    // console.log(index);
            }
        })
        encrypt(state, 'collection')
            // localStorage.setItem('collection', window.btoa(window.encodeURIComponent(JSON.stringify(state.collection))))
    },
    //删除多个收藏商品
    removeCollectionMore(state, newCollection) {
        state.collection = newCollection
        encrypt(state, 'collection')
            // localStorage.setItem('collection', window.btoa(window.encodeURIComponent(JSON.stringify(state.collection))))
    },
    //更新按钮状态
    updateCollectionSelected(state, info) {
        state.collection.some(item => {
            if (item.id == info.id) {
                item.checkbox = info.checkbox;
                return true
            }
        })

        // 如果所有按钮都为true状态则全选按钮也为true状态
        state.collection.some(item => {
            if (item.checkbox == true) {
                state.coll_check_all = true;
                return true
            }
        })
        encrypt(state, 'collection')
            // localStorage.setItem('collection', window.btoa(window.encodeURIComponent(JSON.stringify(state.collection))))
    },

    //修改收藏夹商品所有按钮状态
    updateCollAllSelected(state, flag) {
        state.collection.forEach(item => {
            item.checkbox = flag;
        })
        encrypt(state, 'collection')
            // localStorage.setItem('collection', window.btoa(window.encodeURIComponent(JSON.stringify(state.collection))))
        localStorage.setItem('coll_check_all', JSON.stringify(state.coll_check_all))
    },

    //当点击收藏夹选中按钮时遍历所有按钮来决定全选按钮是否选中
    getCollAllSelected_false(state) {

        state.collection.some(item => {
            if (item.checkbox == false) {
                state.coll_check_all = false;
                return true
            }
        })

        localStorage.setItem('coll_check_all', JSON.stringify(state.coll_check_all))
    },










    /******购买商品*****/

    //将购买的商品保存到订单中
    saveOrderForm(state, info) {

        let carBuyGoods = decode(localStorage.getItem('carBuyGoods'))
        info.forEach((item, i) => {
            item.info = carBuyGoods[i]
        })
        state.orderForm.unshift(info);
        encrypt(state, 'orderForm')
            // localStorage.setItem('orderForm', window.btoa(window.encodeURIComponent(JSON.stringify(state.orderForm))))
    },

    //删除订单
    removeOrder(state, i) {
        state.orderForm.forEach(item => {
            item.forEach(el => {
                if (el.order_ref == i) {
                    state.orderForm.splice(state.orderForm.indexOf(item), 1)
                }
            })
        })
        encrypt(state, 'orderForm')
            // localStorage.setItem('orderForm', window.btoa(window.encodeURIComponent(JSON.stringify(state.orderForm))))
    },


    //确认收货
    confirmGoods(state, i) {
        state.orderForm.forEach(item => {
            item.forEach(el => {
                if (el.order_ref == i) {
                    el.selected = false
                }
            })
        })
        encrypt(state, 'orderForm')
            // localStorage.setItem('orderForm', window.btoa(window.encodeURIComponent(JSON.stringify(state.orderForm))))
    },

    //将直接购买的商品id保存到localstore中
    saveDirectBuyGoodsId(state, info) {
        state.directBuyGoods = info
        encrypt(state, 'directBuyGoods')
            // localStorage.setItem('directBuyGoods', window.btoa(window.encodeURIComponent(JSON.stringify(state.directBuyGoods))))
    },



    //新增用户收货地址信息
    saveAdress(state, info) {
        if (info.isDefault == true) {
            state.address.some((item) => {
                if (item.isDefault == true) {
                    item.isDefault = false;
                    return true;
                }
            })
        }
        info.id = state.address.length;
        state.address.push(info);
        encrypt(state, 'address')
            // localStorage.setItem('address', window.btoa(window.encodeURIComponent(JSON.stringify(state.address))))
    },

    //修改用户收货地址信息
    editAdress(state, info) {
        if (info.isDefault == true) {
            state.address.some((item) => {
                if (item.isDefault == true) {
                    item.isDefault = false;
                    return true;
                }
            })
        }
        state.address.forEach(item => {
            if (item.id == info.id) {
                state.address.splice(state.address.indexOf(item), 1, info);
            }
        })
        encrypt(state, 'address')
            // localStorage.setItem('address', window.btoa(window.encodeURIComponent(JSON.stringify(state.address))))
    },

    //删除用户收货地址信息
    deleteAdress(state, id) {
        state.address.forEach(item => {
            if (item.id == id) {
                state.address.splice(state.address.indexOf(item), 1);
            }
        })
        encrypt(state, 'address')
            // localStorage.setItem('address', window.btoa(window.encodeURIComponent(JSON.stringify(state.address))))
    },



    //保存用户信息
    currentUser(state, info) {
        state.currentUser = info;
        encrypt(state, 'currentUser')
            // localStorage.setItem('currentUser', window.btoa(window.encodeURIComponent(JSON.stringify(state.currentUser))))
    },



    /******购物车操作*****/
    //点击加入购物车将商品信息保存到store中的car数组中
    addToCar(state, goodsInfo) {
        let flag = false;
        state.car.some(item => {
            if (item.id == goodsInfo.id) {
                item.count += parseInt(goodsInfo.count);
                flag = true;
                return true;
            }
        })
        if (!flag) {
            state.car.push(goodsInfo);
        }
        encrypt(state, 'car')
            // localStorage.setItem('car', window.btoa(window.encodeURIComponent(JSON.stringify(state.car))))
    },

    //在购物车中修改商品数量时更新store中的值
    updateGoodsInfo(state, goodsinfo) {
        //修改购物车中商品的数量值
        state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //修改完商品数量讲最新的数量保存的本地存储中
        encrypt(state, 'car')
            // localStorage.setItem('car', window.btoa(window.encodeURIComponent(JSON.stringify(state.car))))
    },

    //更新按钮状态
    updateGoodsSelected(state, info) {
        state.car.some(item => {
            if (item.id == info.id) {
                item.selected = info.selected;
                return true
            }
        })

        //如果所有按钮都为true状态则全选按钮也为true状态
        state.car.some(item => {
            if (item.selected == true) {
                state.check_all = true;
                return true
            }
        })
        encrypt(state, 'car')
            // localStorage.setItem('car', window.btoa(window.encodeURIComponent(JSON.stringify(state.car))))
    },



    //修改所有按钮状态
    updateAllSelected(state, flag) {
        state.car.forEach(item => {
            item.selected = flag;
        })
        encrypt(state, 'car')
            // localStorage.setItem('car', window.btoa(window.encodeURIComponent(JSON.stringify(state.car))))
        localStorage.setItem('check_all', JSON.stringify(state.check_all))
    },

    //当点击购物车选中按钮时遍历所有按钮来决定全选按钮是否选中
    getAllSelected_false(state) {

        state.car.some(item => {
            if (item.selected == false) {
                state.check_all = false;
                return false
            }
        })

        localStorage.setItem('check_all', JSON.stringify(state.check_all))
    },

    //删除购物车商品
    removeProduct(state, newCar) {
        state.car = newCar;
        encrypt(state, 'car')
            // localStorage.setItem('car', window.btoa(window.encodeURIComponent(JSON.stringify(state.car))))
    },

    //将购物车商品移入收藏夹
    moveToColle(state, info) {
        info.forEach(item => {
            state.collection.some(el => {
                if (el.id == item.id) {
                    let i = state.collection.indexOf(el);
                    state.collection.splice(i, 1);
                }
            })
            state.collection.push(item)
        })
        encrypt(state, 'collection')
            // localStorage.setItem('collection', window.btoa(window.encodeURIComponent(JSON.stringify(state.collection))))
    },





    //更新直接购买的商品订单界面的数量
    updateDirectBuyGoods(state, count) {
        state.directBuyGoods.count = count;
        encrypt(state, 'directBuyGoods')
            // localStorage.setItem('directBuyGoods', window.btoa(window.encodeURIComponent(JSON.stringify(state.directBuyGoods))))
    },


    //获取用户所有数据
    getUserInfo(state, info) {
        info.data = info.data == null ? [] : info.data
        state[info.field] = info.data;
        encrypt(state, info.field)
            // localStorage.setItem(info.field, window.btoa(window.encodeURIComponent(JSON.stringify(state[info.field]))))

    }
}

export default mutations;