<template>
  <van-skeleton title :row="15" :loading="loading">
    <div>
      <!-- 头部导航 -->
      <van-nav-bar
        class="nav-bar"
        left-text="确认订单"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <!-- 头部导航结束 -->
      <!-- 地址栏 -->
      <div class="address" @click="$router.push('/mine/set/myAddress')">
        <!-- 左侧地址图标 -->
        <div class="item left">
          <img src="../../assets/img/shopcar/address.webp" />
        </div>
        <!-- 中部地址 -->
        <div class="item mid">
          <div v-show="!isAddress" class="default-address">
            <p>
              {{ defaultAddress.name }} <span>{{ defaultAddress.tel }}</span>
            </p>
            <p>{{ defaultAddress.address }}</p>
            <p>收货不便时，可选择暂存服务</p>
          </div>
          <p v-show="isAddress" class="add-address">
            暂无默认收货地址，点击添加~
          </p>
        </div>
        <!-- 右侧右箭头图标 -->
        <div class="item right"><van-icon name="arrow" size="18px" /></div>
      </div>
      <!-- 地址栏结束 -->

      <!-- 购物车结算商品 -->
      <div v-if="from == 'shopcar'">
        <div class="card-list">
          <!-- 商品列表卡片 -->
          <van-card
            v-for="(item, index) in settlementList"
            :key="index"
            :num="$store.getters.getGoodsCount[item.id]"
            :price="item.price"
            :title="item.title"
            :thumb="$axios.defaults.baseURL + item.img_url"
          >
            <template #footer>
              <p>
                <span>共{{ $store.getters.getGoodsCount[item.id] }}件</span
                ><span>小计：</span
                ><span
                  >￥{{
                    ((item.price *
                      100 *
                      $store.getters.getGoodsCount[item.id]) /
                      100)
                      | rounding
                  }}</span
                >
              </p>
            </template>
          </van-card>
        </div>
        <van-submit-bar
          :price="$store.getters.getGoodsCountAndAmount.amount"
          button-text="提交订单"
          @submit="onSubmit"
        >
          <template #default>
            <span class="total"
              >共记{{ $store.getters.getGoodsCountAndAmount.count }}件</span
            >
          </template>
        </van-submit-bar>
      </div>
      <!-- 购物车结算商品结束 -->

      <!-- 直接购买结算商品 -->
      <div v-if="from == 'petails'">
        <div class="card-list">
          <!-- 商品列表卡片 -->
          <van-card
            v-for="(item, index) in settlementList"
            :key="index"
            :num="$store.state.directBuyGoods.count"
            :price="item.price"
            :title="item.title"
            :thumb="$axios.defaults.baseURL + item.img_url"
          >
            <template #footer>
              <van-stepper
                v-model="$store.state.directBuyGoods.count"
                @change="onChange"
                integer
              />
              <p>
                <span>共{{ $store.state.directBuyGoods.count }}件</span
                ><span>小计：</span
                ><span
                  >￥{{
                    (($store.state.directBuyGoods.count * 100 * item.price) /
                      100)
                      | rounding
                  }}</span
                >
              </p>
            </template>
          </van-card>
        </div>

        <van-submit-bar
          :price="price * $store.state.directBuyGoods.count * 100"
          button-text="提交订单"
          @submit="onSubmitBuy"
        >
          <template #default>
            <span class="total"
              >共记{{ $store.state.directBuyGoods.count }}件</span
            >
          </template>
        </van-submit-bar>
      </div>
      <!-- 直接购买结算商品结束 -->
    </div>
  </van-skeleton>
</template>
<script>
export default {
  data() {
    return {
      loading: true, //骨架屏显示与隐藏

      from: this.$route.params.from, //直接购买还是从购物车结算

      settlementList: [], //购买的商品

      defaultAddress: {}, //默认收货地址

      isAddress: false,

      price: "", //直接购买的商品的价格

      time: Date.parse(new Date()), //当前时间
    };
  },

  created() {
    this.getSettlement();
    this.getAddress();
    this.ifAddress();
  },

  methods: {
    //从购物车结算
    onSubmit() {
      //判断是否有默认收货地址
      if (this.isAddress) return this.$toast.fail("请选择默认收货地址");

      let newCar = [];
      let orderArr = [];

      this.$store.state.car.forEach((el) => {
        //将已勾选商品加入订单数组中  并在购买后删除购物车信息
        if (el.selected) {
          el.address = this.defaultAddress;
          el.c_time = this.nowTimeFilter(this.time);
          el.order_ref = this.time + Math.floor(Math.random() * 10000);

          orderArr.push(el);
          return orderArr;
        }

        //将未勾选商品保留
        else {
          newCar.unshift(el);
          return newCar;
        }
      });

      //保存订单
      this.$store.commit("saveOrderForm", orderArr);

      //移除购物车中被提交的商品
      this.$store.commit("removeProduct", newCar);

      //重新将购物车数据更新到数据库
      this.$store.dispatch("updateDatabaseInfo", "car");

      localStorage.removeItem("carBuyGoods");
      this.$toast.success("购买成功~");

      //更新数据库信息
      this.$store.dispatch("updateDatabaseInfo", "orderForm");

      this.$router.push(`/${this.from}/settlement/buysuccess`);
    },

    //直接购买的商品添加、减少数量按钮
    onChange() {
      this.$store.commit(
        "updateDirectBuyGoods",
        this.$store.state.directBuyGoods.count
      );
    },

    //直接购买
    onSubmitBuy() {
      if (this.isAddress) return this.$toast.fail("请选择默认收货地址");

      this.$store.state.directBuyGoods.address = this.defaultAddress;

      //保存订单信息
      let order = this.$store.state.directBuyGoods;

      order.selected = true;
      order.info = this.settlementList[0];
      order.c_time = this.nowTimeFilter(this.time);
      order.order_ref = this.time + Math.floor(Math.random() * 10000);
      let orderArr = [];

      orderArr.push(order);

      // 保存订单信息
      this.$store.commit("saveOrderForm", orderArr);

      //清空购买信息
      this.$store.commit("saveDirectBuyGoodsId", { id: null, count: 0 });

      this.$toast.success("购买成功~");

      //更新数据库表单信息
      this.$store.dispatch("updateDatabaseInfo", "orderForm");
      this.$router.push(`/${this.from}/settlement/buysuccess`);
    },
    //判断是否有默认地址
    ifAddress() {
      if (Object.values(this.defaultAddress).length == 0) {
        this.isAddress = true;
      } else {
        this.isAddress = false;
      }
    },

    //获取购买商品数据
    async getSettlement() {
      //从购物车结算
      let idArr = [];
      if (this.from == "shopcar") {
        this.$store.state.car.forEach((item) => {
          if (item.selected == true) {
            idArr.push(item.id);
            return idArr;
          }
        });
      }

      //直接购买结算
      else {
        idArr.push(this.$store.state.directBuyGoods.id);
      }

      //如果结算商品为空则直接返回购物车
      if (idArr.length == 0)
        return this.$router.push("/shopcar");

      const { data: res } = await this.$axios.get(
        "/getShopcar/" + idArr.join(",")
      );

      if (res.status != 200) return this.$toast.fail("获取数据失败");
      this.settlementList = res.data;

      localStorage.setItem(
        "carBuyGoods",
        window.btoa(window.encodeURIComponent(JSON.stringify(res.data)))
      );
      this.price = res.data[0].price;
      this.loading = false;
    },

    //获取默认地址
    getAddress() {
      let addressArr = [];
      addressArr = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("address") || "[]"))
      );

      if (addressArr.length == 0) return;
      addressArr.some((item) => {
        if (item.isDefault == true) {
          this.defaultAddress = item;
          return true;
        }
      });
    },

    nowTimeFilter(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
  },


  filters: {
    //处理小数
    rounding(value) {
      return value.toFixed(2);
    },
  },
};
</script>
<style>
/* 头部导航 */
.van-nav-bar__text,
.van-nav-bar .van-icon-arrow-left {
  color: #000 !important;
  font-size: 16px;
}
.nav-bar .van-icon {
  font-size: 20px;
}
</style>
<style lang="less" scoped>
// 底部提交订单
.nav-bar {
  background-color: #f4f4f4;
}
// 地址栏
.address {
  display: flex;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  .item {
    align-items: center;
  }
  .left {
    flex: 1;
    display: flex;
  }
  .mid {
    flex: 4;

    .default-address {
      p {
        padding: 2px;
        margin: 0;
        font-size: 12px;
      }
      p:nth-child(1) {
        font-size: 15px;
        span {
          font-size: 13px;
          color: #999;
        }
      }
      p:nth-child(3) {
        color: #ff7c00;
      }
    }
    .add-address {
      font-size: 14px;
    }
  }
  .right {
    flex: 1;
    position: relative;
    .van-icon {
      position: absolute;
      right: 0;
      bottom: 50%;
      transform: translateY(50%);
    }
  }
  img {
    width: 34px;
    height: 34px;
    align-items: center;
  }
}
//商品卡片区域
.card-list {
  margin-bottom: 60px;
}
.van-card {
  .van-stepper {
    margin: 10px 0;
  }
  margin: 0 10px 10px 10px;
  border-radius: 10px;
  p {
    margin: 0;
    span:nth-child(1) {
      color: #999;
      padding: 0 5px;
    }
    span:nth-child(3) {
      color: #ff7c00;
      padding: 0 5px;
      font-size: 13px;
    }
  }
}

.total {
  color: gray;
  font-size: 13px;
}
</style>