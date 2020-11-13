<template>
  <div class="oder-container">
    <van-tabs
      class="order-tab"
      v-model="active"
      color="#FF5000"
      title-active-color="#FF5000"
    >
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @clear="onClear"
        @input="onChange"
        shape="round"
      >
        <template #action>
          <van-button round color="#FF5000" @click="onSearch" size="small"
            >搜索</van-button
          >
        </template>
      </van-search>

      <van-tab
        :title="item.title"
        v-for="(item, index) in orderFormList"
        :key="index"
      >
        <div class="null-order" v-if="item.list.length == 0">
          <img src="../assets/img/mine/order.png" />
          <p>您还没有相关订单</p>
          <span>去看看其他想买的</span>
          <div>
            <van-button round @click="$router.push('/home')"
              >随便逛逛</van-button
            >
          </div>
        </div>
        <div class="oder-list">
          <div class="order-card" v-for="(item1, i1) in item.list" :key="i1">
            <router-link :to="'/mine/orderForm/' + i1">
              <van-card
                v-for="(item2, i2) in item1"
                :key="i2"
                :num="item2.count"
                :price="item2.info.price"
                :title="item2.info.title"
                :thumb="$axios.defaults.baseURL + item2.info.img_url"
              >
              </van-card>
            </router-link>
            <div class="handle-btn">
              <p>
                总计付款：{{ $store.getters.getOrderFormPrice(i1) | rounding }}
              </p>

              <van-button
                round
                type="default"
                size="small"
                @click="deleteOrder(item1[0].order_ref)"
                >删除订单</van-button
              >
              <van-button round type="default" size="small" @click="cardBtn"
                >查看物流</van-button
              >
              <van-button
                round
                type="default"
                size="small"
                class="confirm-btn"
                v-show="!item1[0].selected"
                @click="cardBtn"
                >评价</van-button
              >
              <van-button
                round
                type="default"
                size="small"
                class="confirm-btn"
                @click="confirmGoods(item1[0].order_ref)"
                v-show="item1[0].selected"
                >确认收货</van-button
              >
            </div>
          </div>
        </div>
        <div class="bottom-hint" v-if="!item.list.length == 0">
          <span>我可是有底线的~</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.params.i || 0, //顶部标签栏

      orderFormList: [], //订单列表

      value: "", // 搜索框值
    };
  },

  created() {
    this.$store.dispatch("getDatabaseInfo", "orderForm");

    this.getOrderForm();
  },

  methods: {
    //获取订单列表
    getOrderForm() {
      let orderlist = [
        {
          title: "全部",
          list: this.$store.state.orderForm,
        },
        {
          title: "待付款",
          list: [],
        },
        {
          title: "待发货",
          list: [],
        },
        {
          title: "待收货",
          list: [],
        },
        {
          title: "待评价",
          list: [],
        },
      ];
      // this.orderFormList = this.$store.state.orderForm;
      this.$store.state.orderForm.forEach((item) => {
        if (item[0].selected) {
          orderlist[3].list.push(item);
          orderlist[2].list.push(item);
        } else {
          orderlist[4].list.push(item);
        }
      });
      this.orderFormList = orderlist;
      //  console.log(this.orderFormList);
    },

    //搜索订单
    query(key) {
      const arr = [];
      this.orderFormList[this.active].list.forEach((item) => {
        item.filter((el) => {
          if (el.info.title.includes(key)) {
            arr.push(item);
          }
        });
      });
      return arr;
    },

    //搜索订单
    onSearch() {
      if (this.value == "") return this.$toast("请输入搜索关键词~");
      // console.log(this.query(this.value));
      this.orderFormList[this.active].list = this.query(this.value);
    },
    //清除搜索框后还原初始订单列表
    onClear() {
      this.orderFormList = [];
      this.getOrderForm();
    },
    //监听搜索框为空时，还原所有订单内容
    onChange() {
      if (this.value == "") {
        this.orderFormList = [];
        this.getOrderForm();
      }
    },
    //删除订单
    deleteOrder(i) {
      this.$dialog
        .alert({
          title: "确定删除此订单吗",
          cancelButtonText: "我再想想",
          message: "(此操作无法恢复)",
          showCancelButton: true,
        })
        .then(() => {
          this.$store.commit("removeOrder", i);
          this.getOrderForm();
          this.$toast.success("删除成功");
          this.$store.dispatch("updateDatabaseInfo", "orderForm");
        })
        .catch(() => {});
    },

    //确认收货按钮
    confirmGoods(i) {
      this.$dialog
        .alert({
          title: "确定收货吗？",
          cancelButtonText: "取消",
          // message: "(此操作无法恢复)",
          showCancelButton: true,
        })
        .then(() => {
          this.$store.commit("confirmGoods", i);
          this.getOrderForm();
          this.$toast.success("收货成功");
          this.$store.dispatch("updateDatabaseInfo", "orderForm");
        })
        .catch(() => {});
    },

    cardBtn() {
      this.$toast("暂无后续逻辑~");
    },
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
};
</script>
<style>
.oder-container .van-tabs__wrap {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
}
.oder-container .van-search {
  width: 100%;
  position: fixed;
  top: 43px;
  z-index: 99;
}
</style>
<style lang="less" scoped>
//订单卡片
.van-tab__pane {
  margin-bottom: 60px;
  .bottom-hint {
    text-align: center;
    font-size: 13px;
    color: #999;
  }
}
.oder-list {
  margin-top: 108px;
}
.order-card {
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  .van-card {
    background-color: #fff;
    padding: 0;
    margin-bottom: 20px;
    .van-card__thumb {
      width: 99px;
      height: 99px;
    }
  }
  .confirm-btn {
    color: #ff5000;
    border-color: #ff5000;
  }
  .van-button--small {
    width: 70px;
    height: 28px;
    margin-left: 10px;
  }
  .handle-btn {
    position: relative;
    float: right;
    padding-top: 20px;
    p {
      margin: 0;
      font-size: 12px;
      position: absolute;
      right: 0px;
      bottom: 40px;
    }
  }
}

//搜索框
.van-search .van-button--small {
  font-size: 14px;
  padding: 0 30px;
  font-weight: bold;
  .van-button__content {
    line-height: 20px;
  }
}
//订单为空时
.null-order {
  text-align: center;
  padding-top: 30%;
  img {
    width: 82px;
  }
  p {
    font-size: 16px;
    margin: 0;
    padding: 5px 0;
  }
  span {
    color: #999;
    font-size: 13px;
  }
  .van-button {
    height: 35px;
    padding: 5px 25px;
    background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
    margin-top: 30px;
    .van-button__text {
      color: #fff;
    }
  }
}
</style>