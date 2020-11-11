<template>
  <div>
    <!-- 头部背景 -->
    <div class="order-details-head">
      <van-icon name="arrow-left" class="head-back" @click="$router.go(-1)" />
      <div class="head-text">
        <span>交易成功</span>
      </div>
      <div class="head-img"></div>
    </div>
    <!-- 地址栏 -->
    <div class="head-address">
      <div class="address-icon"></div>
      <div class="address-text">
        <p>
          {{ orderDetailList[0].address.name
          }}<span>{{ orderDetailList[0].address.tel }}</span>
        </p>
        <p>{{ orderDetailList[0].address.address }}</p>
      </div>
    </div>
    <!-- 订单详情卡片 -->
    <div class="goods-list">
      <van-card
        v-for="(item, i) in orderDetailList"
        :key="i"
        :num="item.count"
        :price="item.info.price"
        :title="item.info.title"
        :thumb="$axios.defaults.baseURL + item.info.img_url"
        :thumb-link="'/#/home/product/' + item.id"
      >
        <template #footer>
          <van-button round size="small" @click="cardBtn">卖了换钱</van-button>
          <van-button round size="small">申请售后</van-button>
        </template>
      </van-card>
      <div class="total-price">
        <p>
          实付款：<span
            >￥{{ $store.getters.getOrderFormPrice(index) | rounding }}</span
          >
        </p>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order-info">
      <div class="head">
        <span>查看运费险</span>
        <van-icon name="arrow" />
      </div>
      <ul>
        <li>订单编号：{{ orderDetailList[0].order_ref }}</li>
        <li>付款时间：{{ orderDetailList[0].c_time }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: this.$route.params.index, //订单索引号

      orderDetailList: [],//订单列表
    };
  },
  
  created() {
    this.getOrderDetail();
  },

  methods: {

    //从订单列表中获取订单详情信息
    getOrderDetail() {
      this.orderDetailList = this.$store.state.orderForm[this.index];
    },

     cardBtn() {
         this.$toast("暂无后续逻辑~")
    },
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style lang="less" scoped>
// 头部背景
.order-details-head {
  .head-back {
    color: #fff;
    // padding: 10px;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }
  position: relative;
  height: 100px;
  background: linear-gradient(to right, rgb(255, 144, 0), rgb(255, 80, 0))
    center center / cover no-repeat;
  .head-text {
    position: absolute;
    left: 80px;
    top: 50%;
    transform: translateY(-50%);
    line-height: 28px;
    margin-left: 45px;
    span {
      font-size: 16px;
      color: #fff;
    }
  }
  .head-img {
    height: 100px;
    margin-left: 226px;
    width: 150px;
    background-image: url("../../assets/img/mine/order_details.webp");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
}
// 地址栏
.head-address {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  .address-icon {
    position: absolute;
    z-index: 100;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    height: 32px;
    width: 32px;
    background-image: url("../../assets/img/shopcar/address.webp");
    background-size: contain;
  }
  .address-text {
    padding-left: 50px;
    p:nth-child(1) {
      font-size: 15px;
      padding-bottom: 4px;
    }
    p {
      margin: 0;
      font-size: 13px;
      color: #333;
      span {
        color: #999;
        font-size: 13px;
        padding-left: 10px;
      }
    }
  }
}

// 订单详情卡片
.goods-list {
  margin-top: 10px;
  background-color: #fff;
  .total-price {
    font-size: 13.5px;
    color: #666666;
  }
  p {
    margin: 0;
    text-align: right;
    padding: 10px;
    span {
      color: #ff5500;
      font-weight: bold;
    }
  }
}
.van-card {
  margin: 0 !important;
  padding: 15px 10px;
  background-color: #fff;
  .van-card__title {
    padding-right: 60px;
    font-size: 13px;
  }
  .van-card__price {
    position: absolute;
    right: 0px;
    bottom: 67px;
  }
  .van-card__num {
    position: absolute;
    right: 0px;
    bottom: 50px;
  }
  .van-button--small {
    height: 28px;
    margin-left: 10px;
    background-color: #fff;
  }
}

// 订单信息详情
.order-info {
  background-color: #fff;
  margin-top: 10px;
  padding: 15px;
  .head {
    position: relative;
    font-size: 14px;
    padding-bottom: 5px;
    .van-icon {
      font-size: 15px;
      position: absolute;
      right: 0px;
    }
  }
  ul li {
    font-size: 13px;
    margin-top: 5px;
  }
}
</style>