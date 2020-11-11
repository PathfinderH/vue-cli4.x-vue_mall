<template>
  <van-skeleton title :row="15" :loading="skeletonloading">
    <div class="app-home">
      <!-- 顶部搜索框 -->
      <div class="search-fixed">
        <!-- <van-sticky> -->

        <van-search
          class="home-search"
          background="#FF852A"
          placeholder="寻找心仪宝贝"
          @focus="$router.push('/search')"
          input-align="center"
        >
        </van-search>
        <!-- </van-sticky> -->
      </div>

      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="$axios.defaults.baseURL + image" />
        </van-swipe-item>
      </van-swipe>

      <!-- 宫格导航 -->
      <div class="gird-content">
        <div class="radius-head"></div>
        <van-grid square clickable :column-num="5" :border="false">
          <van-grid-item
            :icon="$axios.defaults.baseURL + item.icon_url"
            :text="item.name"
            :to="item.router_url"
            v-for="(item, index) in icons"
            :key="index"
          />
        </van-grid>

        <van-grid square clickable :column-num="5" :border="false">
          <van-grid-item
            :icon="$axios.defaults.baseURL + item.icon_url2"
            :text="item.name2"
            :to="item.router_url2"
            v-for="(item, index) in icons"
            :key="index"
          />
        </van-grid>
      </div>

      <!-- 推荐榜单 -->
      <div class="recommend">
        <h4 class="recommend_head">推荐榜单</h4>
        <van-row gutter="0" type="flex" justify="center" @click="notAvailable">
          <van-col span="8">
            <div class="vertical-swipe">
              <div class="van-swipe-item recommend-left">
                <div class="head-img">
                  <img
                    src="../assets/img/home_imgs/recommend/recommend_05.webp"
                  />
                </div>
                <div class="text">
                  <p class="popular"><span>人气榜</span></p>
                  <p class="text-p2">电脑DIY配件榜</p>
                  <p class="sell">卖爆3132件</p>
                </div>
              </div>
            </div>
          </van-col>
          <van-col span="8">
            <van-swipe
              vertical
              class="vertical-swipe"
              :touchable="false"
              :autoplay="3000"
              :duration="1000"
              :show-indicators="false"
            >
              <van-swipe-item
                v-for="(item, index) in vertical_swipe"
                :key="index"
              >
                <div class="head-img">
                  <img :src="$axios.defaults.baseURL + item.img_url" />
                </div>
                <div class="text">
                  <p class="popular"><span>人气榜</span></p>
                  <p class="text-p2">
                    {{ item.title }}
                  </p>
                  <p class="sell">{{ item.text }}</p>
                </div>
              </van-swipe-item>
            </van-swipe>
          </van-col>
          <van-col span="8">
            <div class="vertical-swipe">
              <div class="van-swipe-item recommend-right">
                <div class="head-img">
                  <img
                    src="../assets/img/home_imgs/recommend/recommend_04.webp"
                  />
                </div>
                <div class="text">
                  <p class="popular"><span>人气榜</span></p>
                  <p class="text-p2">人气智能电视榜</p>
                  <p class="sell">卖爆9.1万件</p>
                </div>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>

      <!-- 中部田字宫格 -->
      <div class="content-gird">
        <van-grid :column-num="2">
          <van-grid-item
            v-for="(item, index) in content_gird_lsit"
            :key="index"
            to="/home/digital_paroduct"
          >
            <div class="first-text">
              <span>{{ item.title }}</span>
              <span>{{ item.title_badge }}</span>
            </div>
            <p class="buy-num">
              {{ item.title_two }}
            </p>
            <div class="img-wrapper">
              <span><img :src="$axios.defaults.baseURL + item.img_one" /></span>
              <span><img :src="$axios.defaults.baseURL + item.img_two" /></span>
            </div>
          </van-grid-item>
        </van-grid>

        <van-grid :column-num="2">
          <van-grid-item
            v-for="(item, index) in content_gird_lsit"
            :key="index"
            to="/home/digital_paroduct"
          >
            <div class="first-text">
              <span>{{ item.title2 }}</span>
              <span>{{ item.title_badge2 }}</span>
            </div>
            <p class="buy-num">
              {{ item.title_two2 }}
            </p>
            <div class="img-wrapper">
              <span
                ><img :src="$axios.defaults.baseURL + item.img_one2"
              /></span>
              <span
                ><img :src="$axios.defaults.baseURL + item.img_two2"
              /></span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 商品列表信息 -->
      <div class="product_list">
        <van-divider
          :style="{
            borderColor: '#FF4F00',
          }"
          ><van-icon
            name="like"
            class="like-icon"
          />&nbsp;你可能还喜欢</van-divider
        >

        <van-row>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-col
              span="12"
              v-for="(item, index) in product_list"
              :key="index"
            >
              <router-link :to="'/home/product/' + item.id">
                <img :src="$axios.defaults.baseURL + item.img_url" />
                <div class="product_text title">
                  <span class="van-multi-ellipsis--l2">{{ item.title }}</span>
                </div>
                <div class="product_text">
                  <!-- <span></span> -->
                  <span class="price">￥{{ item.price }}</span>
                  <span class="people_buy"
                    >{{ item.people_buy }}人已经购买</span
                  >
                </div>
              </router-link>
            </van-col>
          </van-list>
        </van-row>
      </div>
    </div>
  </van-skeleton>
</template>

<script>
export default {
  data() {
    return {
      skeletonloading: true,

      images: [], //轮播图数组

      vertical_swipe: [], //推荐榜单竖轮播图

      content_gird_lsit: [], //人气榜趋势榜

      product_list: [], //商品数组

      loading: false, //分页加载状态

      finished: false,

      page: 1, //当前页码

      pageSize: 4, //每页显示的条数

      total: 1, //总数据条数

      icons: [], //导航图标

      istoken: localStorage.getItem("token") || "",
    };
  },

  created() {
    this.getHomeSlide();
    this.getRecommend();
    this.getHomeIcon();
  },
  mounted() {
    //所有数据请求接收完毕 隐藏骨架屏
    this.$axios
      .all([this.getHomeSlide(), this.getRecommend(), this.getHomeIcon()])
      .then(
        this.$axios.spread(() => {
          this.skeletonloading = false;
          //显示提示
          if (this.istoken == "") {
            this.$dialog
              .alert({
                message:
                  "本项目样式及素材都来源于淘宝、京东、苏宁等电商平台，仅作为个人学习使用，如有侵权，可在项目个人中心设置页联系我删除(登录可隐藏此提示)",
                theme: "round-button",
              })
              .then(() => {
                // on close
              });
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    //首页轮播图
    async getHomeSlide() {
      const { data: res } = await this.$axios.get("/getHomeSlide");
      if (res.status != 200) return this.$toast.fail("获取首页轮播图数据失败");
      this.vertical_swipe = res.data[0];
      this.images = res.data[1];
    },

    //推荐榜单
    async getRecommend() {
      const { data: res } = await this.$axios.get("/getRecommend");
      if (res.status != 200) return this.$toast.fail("获取首页推荐数据失败");
      this.content_gird_lsit = res.data;
    },

    //人气趋势榜
    async getHomeIcon() {
      const { data: res } = await this.$axios.get("/getHomeIcon");
      if (res.status != 200) return this.$toast.fail("获取首页图标数据失败");
      this.icons = res.data;
    },

    //获取底部product_list数据
    async getProductList() {
      const { data: res } = await this.$axios.post("/getProductList", {
        page: this.page,
        pageSize: this.pageSize,
        category: "recommend",
      });

      if (res.status != 200) {
        return this.$toast.fail("获取商品列表数据失败！");
      }

      if (res.data.length === 0) {
        // 判断获取数据条数若等于0
        this.finished = true; // 停止加载
      }

      // 若数据条数不等于0
      this.total = res.total; // 给数据条数赋值
      this.product_list.push(...res.data); // 将数据放入list中
      this.loading = false; // 加载状态结束
      // 如果list长度大于等于总数据条数,数据全部加载完成
      if (this.product_list.length >= res.total) {
        this.finished = true; // 结束加载状态
      }
    },
    onLoad() {
      // 若加载条到了底部
      this.getProductList(); // 调用上面方法,请求数据
      this.page++; // 分页数加一
      this.finished = false;
    },
    notAvailable() {
      this.$toast("暂无后续逻辑~");
    },
  },
};
</script>
<style>
.app-home .van-swipe__indicator {
  width: 7px;
  height: 7px;
}

/* 搜索框 */

.home-search {
  padding: 7px !important;
}
.home-search .van-search__content {
  background-color: #ff4e22;
  border-radius: 5px;
  height: 25px;
  /* line-height: 25px !important; */
}
.home-search .van-cell {
  line-height: 18px !important;
}
.home-search input::-webkit-input-placeholder {
  color: #f0e0dc !important;
  font-size: 13px;
}

.van-grid-item__icon {
  font-size: 35px !important;
}

/* 田字宫格 */
.content-gird {
  margin: 3%;
  border-radius: 10px;
  overflow: hidden;
}
.content-gird .van-grid-item__content {
  padding: 0;
  display: block;
}
.buy-num {
  font-size: 12px;
  padding: 0 10px !important;
  padding-bottom: 10px !important;
  margin: 0;
  color: #999;
}

/* 轮播图上分圆弧样式 */
.gird-content {
  position: relative;
  margin-bottom: 3%;
}
.radius-head {
  position: absolute;
  z-index: 9;
  height: 10px;
  width: 100%;
  top: -9px;
  background-image: url("../assets/img/home_imgs/radius.png");
  background-size: cover;
}
</style>
<style lang="less" scoped>
html,
body,
h4,
p,
span {
  margin: 0;
  padding: 0;
}

//搜索框固定
.search-fixed {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  .van-cell {
    color: #f0e0dc;
  }
}

//轮播图样式
.van-swipe {
  margin-top: 39px;
  height: 120px;
}
.van-swipe img {
  width: 100%;
  height: 100%;
}

//竖轮播图
.recommend {
  padding: 0 2%;
  .recommend_head {
    padding: 0 2%;
    font-size: 16px;
  }
}
.vertical-swipe {
  border-radius: 5%;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  margin-top: 10%;
  height: 135px;
  width: 110px;
  .van-swipe-item {
    background-image: -webkit-linear-gradient(right, #ff6600 0%, #ff9b00 100%);
  }
  .recommend-right,
  .recommend-left {
    background-image: -webkit-linear-gradient(right, #e0a26c 0%, #e8b58b 100%);
  }
  .head-img {
    background-color: #fff;
    img {
      height: 75px;
      width: 75px;
    }
  }
  .text {
    .text-p2 {
      padding-top: 15px;
      font-size: 13.5px;
    }
    .popular {
      position: relative;
      padding: 0;
      span {
        position: absolute;
        background-color: #fff;
        color: #ff6c00;
        border-radius: 200px;
        border: 1px solid #ff6f01;
        font-size: 10px;
        padding: 0 5px;
        right: 50%;
        transform: translateX(50%);
        bottom: 50%;
        margin-bottom: -9px;
      }
    }

    p {
      font-size: 13.5px;
      color: #fff;
    }
    .sell {
      font-size: 12px;
      color: #f6e3d2;
    }
  }
}

//中部田字 宫格
.content-gird {
  .van-hairline--top::after {
    border-top-width: 0px;
  }
  .first-text {
    padding: 10px 10px 0 10px;
    span:nth-child(1) {
      font-size: 14px;
      font-weight: bold;
    }
    span:nth-child(2) {
      font-size: 13px;
      color: #ab813a;
      background-color: #f9f5ee;
      border-radius: 10px;
      padding: 0 5px;
    }
  }
  .img-wrapper {
    text-align: center;
    span > img {
      height: 70px;
      width: 70px;
    }
  }
}
.van-divider {
  color: #ff4f00;
  padding: 0 30px;
  font-size: 13px;
  .like-icon {
    font-size: 15px;
  }
}

//商品列表信息
.product_list {
  margin: 0 3% 50px 3%;
}
.product_list .van-col--12 {
  background: #fff;
  background-clip: content-box;
  margin-bottom: 2%;
  border-radius: 3%;
  overflow: hidden;
  width: 49% !important;
}
.product_list .van-col--12:nth-child(2n + 1) {
  margin-right: 1%;
}
.product_list .van-col--12:nth-child(2n) {
  margin-left: 1%;
}
.product_list .van-col--12 img {
  width: 100%;
}
.product_list .van-col--12 .product_text {
  font-size: 13px;
  color: black;
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
}
.product_list .van-col--12 .title {
  padding-bottom: 0;
  margin-bottom: 0;
}
.product_list .van-col--12 .product_text .price {
  font-size: 15px;
  color: #ff5500;
}
.product_list .van-col--12 .product_text .people_buy {
  font-size: 12px;
  color: #999999;
  padding: 0 5px;
}
</style>