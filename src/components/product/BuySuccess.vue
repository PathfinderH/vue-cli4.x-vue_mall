<template>
  <van-skeleton title :row="15" :loading="loading">
    <div>
      <!-- 头部导航 -->
      <van-nav-bar left-arrow @click-left="$router.go(-1)" />
      <!-- 购买成功 -->
      <div class="buysuccess">
        <h4><van-icon name="checked" />购买成功</h4>
      </div>
      <!-- button按钮 -->
      <van-row>
        <van-col span="12"
          ><van-button
            round
            size="small"
            class="backhome"
            @click="$router.push('/home')"
            >返回首页</van-button
          ></van-col
        >
        <van-col span="12"
          ><van-button
            round
            size="small"
            class="checkorder"
            @click="$router.push('/mine/orderForm')"
            >查看订单</van-button
          ></van-col
        >
      </van-row>

      <!-- 推荐商品 -->
      <van-divider
        :style="{ color: '#FF5100', borderColor: '#FF5100', padding: '0 16px' }"
      >
        <van-icon name="hot-sale-o" />

        为你推荐
      </van-divider>

      <goods-list :list="recommendList"></goods-list>

      <div class="no-more">
        <span>猜你的喜欢太难啦~</span>
      </div>
    </div>
  </van-skeleton>
</template>
<script>
import GoodsList from "../product/GoodsList";
export default {
  data() {
    return {
      loading: true, //骨架屏的显示与隐藏
      recommendList: [], //推荐商品列表数据
    };
  },
  created() {
    this.getRecommendGoods();
  },

  methods: {
    //获取推荐商品数据
    async getRecommendGoods() {
      const { data: res } = await this.$axios.post("/getProductList", {
        category: "digital",
      });
      if (res.status !== 201) return this.$toast.fail("获取商品数据失败！");
      this.recommendList = res.data;
      this.loading = false;
    },
  },

  //监听路由 使此页面只能通过支付订单页面进入
  beforeRouteEnter(to, from, next) {
    if (from.name == null || from.name != "settlement") {
      next("/home");
    }
    next();
  },

  components: {
    "goods-list": GoodsList,
  },
};
</script>

<style lang="less" scoped>
// 头部导航
.van-nav-bar {
  background-color: #f4f4f4;
}
// 支付成功
.buysuccess {
  text-align: center;
  height: 40px;
  h4 {
    position: relative;
    // height: 100%;
    // line-height: 60px;
    margin: 0;
    padding: 0;
    font-size: 18px;
    .van-icon {
      position: absolute;
      color: #ff5100;
      transform: translate(-120%, -50%);
      top: 50%;
      font-size: 20px;
    }
  }
}
// 按钮
.van-button--small {
  height: 28px;
  background-color: #f4f4f4;
  border-color: lightgray;
  padding: 1px 15px 0 15px;
  color: #999;
}

.van-col {
  overflow: hidden;
}
.backhome {
  float: right;
  margin-right: 10px;
}

.checkorder {
  float: left;
  margin-left: 10px;
}

.van-divider {
  font-size: 13px;
  margin: 20px 25px;
  .van-icon-hot-sale-o {
    font-size: 16px;
  }
}
.no-more {
  text-align: center;
  color: #999;
  font-size: 13px;
  padding: 10px 0;
}
</style>