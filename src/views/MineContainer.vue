<template>
  <van-skeleton title :row="15" :loading="skeletonloading">
    <div class="mine-container">
      <div class="header">
        <div class="portrait">
          <van-row>
            <van-col span="6"
              ><van-image
                cover
                round
                src="http://gw.alicdn.com/sns_logo/i4/O1CN01RQD3d21PgVCYh3yBd_!!0-mytaobao.jpg_100x100q90_.webp"
            /></van-col>
            <van-col span="12"
              ><h3>
                用户：{{ $store.state.currentUser[0].username }}
              </h3></van-col
            >
            <van-col span="6" class="set"
              ><h3>
                <router-link to="/mine/set"
                  ><van-icon name="setting-o"
                /></router-link></h3
            ></van-col>
          </van-row>

          <van-row class="DFrameLayout">
            <van-col span="8">
              <router-link to="/mine/collection">
                <div>{{ $store.getters.getCollectionNum }}</div>
                <div>收藏夹</div>
              </router-link>
            </van-col>

            <van-col span="8" @click="$router.push('/mine/orderForm')">
              <div>{{ $store.state.orderForm.length }}</div>
              <div>订单列表</div>
            </van-col>

            <van-col span="8" @click="$router.push('/mine/set/myAddress')">
              <div>{{ addressNum }}</div>
              <div>收货地址</div>
            </van-col>

            <!-- <van-col span="6">
            <div>0</div>
            <div>红包</div>
          </van-col> -->
          </van-row>
        </div>
      </div>

      <!-- 我的订单 -->

      <div class="my-order">
        <div class="head">
          <van-row>
            <van-col span="12"><span>我的订单</span></van-col>
            <van-col span="12" class="all-order"
              ><span @click="$router.push('/mine/orderForm')"
                >查看全部订单</span
              ></van-col
            >
          </van-row>
        </div>
        <div class="content">
          <van-grid :column-num="5" :border="false">
            <van-grid-item
              v-for="(item, index) in order_list"
              :key="index"
              :icon="$axios.defaults.baseURL + item.url"
              :text="item.text"
              :to="{ name: 'orderForm', params: { i: index + 1 } }"
            />
          </van-grid>
        </div>
      </div>

      <!-- 必备工具 -->
      <div class="my-order">
        <div class="head">
          <van-row>
            <van-col span="12"><span>必备工具</span></van-col>
            <van-col span="12" class="all-order"
              ><span @click="iconClick">查看全部工具</span></van-col
            >
          </van-row>
        </div>
        <div class="content tool">
          <van-grid :column-num="4" :border="false">
            <van-grid-item
              v-for="(item, index) in tool_list"
              :key="index"
              :icon="$axios.defaults.baseURL + item.url"
              :text="item.text"
              @click="iconClick"
            />
          </van-grid>
          <van-grid :column-num="4" :border="false">
            <van-grid-item
              v-for="(item, index) in tool_list"
              :key="index"
              :icon="$axios.defaults.baseURL + item.url2"
              :text="item.text2"
              @click="iconClick"
            />
          </van-grid>
        </div>
      </div>
    </div>
  </van-skeleton>
</template>

<script>
export default {
  data() {
    return {
      order_list: [], //我的订单图标
      tool_list: [], //更多工具图标
      addressNum: this.$store.state.address.length, //地址总数
      skeletonloading: true,
    };
  },
  created() {
    this.getMineIcon();
  },

  methods: {
    async getMineIcon() {
      const { data: res } = await this.$axios.get("/getMineIcon");
      if (res.status != 200)
        return this.$toast.fail("获取个人中心页图标数据失败");
      this.order_list = res.data[0];
      this.tool_list = res.data[1];
      this.skeletonloading = false;
    },

    iconClick() {
      this.$toast("暂无后续逻辑~");
    },
  },
};
</script>
<style>
.content .van-info {
  background-color: #ff5300;
}
</style>
<style lang="less" scoped>
// 头部
.mine-container {
  margin-bottom: 100px;
}
.header {
  background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
  .portrait {
    padding-top: 30px;
    .van-image {
      border: 1px solid #fff;
      width: 60px;
    }
  }
  .van-row {
    text-align: center;
    h3 {
      color: #fff;
      font-size: 18px;
    }
    .set {
      text-align: right;
      padding: 4px 20px 0 0;
      a {
        color: #fff;
      }
    }
  }
  .DFrameLayout {
    color: #fff;
    font-size: 12px;
    div {
      padding: 5px 0;
      color: #fff;
    }
  }
}

//我的订单
.my-order {
  background: #fff;
  border-radius: 12px;
  margin: 12px;
  .head {
    height: 38px;
    border-bottom: 1px solid #f1f3f4;
    font-size: 14px;
    font-weight: bold;
    line-height: 38px;
    padding: 0 10px 0 10px;
    .van-row {
      text-align: left;
      .all-order {
        text-align: right;
        color: #999;
        font-size: 12px;
        font-weight: 100;
      }
    }
  }
  .content {
    height: 76px;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    .van-grid {
      height: 100%;
    }
    .van-grid-item {
      height: 100%;
    }
  }
}

//必备工具
.tool {
  height: 152px !important;
  .van-grid {
    height: 50% !important;
  }
}
</style>