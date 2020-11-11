<template>
  <van-skeleton title :row="15" :loading="loading">
    <div>
      <!-- 导航栏 -->
      <div class="digital-nav-fixex">
        <van-nav-bar class="digital-nav" title="数码3C">
          <template #left>
            <van-icon name="wap-home-o" @click="$router.push('/home')" />
          </template>
          <template #right>
            <van-icon name="search" @click="$router.push('/search')" />
            <van-icon
              name="shopping-cart-o"
              @click="$router.push('/shopcar')"
            />
          </template>
        </van-nav-bar>
      </div>
      <!-- 导航栏结束 -->
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" class="phone_slide">
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
          @click="$router.push('/home/product/' + (index + 11))"
        >
          <img v-lazy="$axios.defaults.baseURL + image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图结束 -->
      <div class="recommend">
        <van-icon name="hot-o" /><span>爆品推荐</span>
      </div>
      <!-- 商品卡片 -->
      <router-link
        :to="'/home/product/' + item.id"
        v-for="(item, index) in product_computer"
        :key="index"
      >
        <van-card
          :price="item.price"
          :origin-price="item.original_price"
          :desc="item.title"
          :title="item.head"
          :thumb="$axios.defaults.baseURL + item.img_url"
        >
          <template #tags>
            <van-tag type="danger">满件折</van-tag>
          </template>
          <template #footer>
            <van-button size="small">立即抢购</van-button>
          </template>
        </van-card>
      </router-link>
      <!-- 商品卡片结束 -->

      <!-- 商品列表子组件 -->
      <goods-list :list="product_phone"></goods-list>

      <div class="no-more">
        <span>没有更多数据了</span>
      </div>
    </div>
  </van-skeleton>
</template>

<script>
import GoodsList from "../product/GoodsList";
export default {

  data() {
    return {
      loading: true, //骨架屏显示与隐藏
      images: [], //轮播图列表
      product_computer: [], //电脑列表数据
      product_phone: [], //手机列表数据
    };
  },

  created() {
    this.getProductList();
    this.getDigitalSlide();
  },

  mounted() {
    //所有请求完毕之后隐藏骨架屏
    this.$axios
      .all([this.getProductList(), this.getDigitalSlide()])
      .then(
        this.$axios.spread(() => {
          this.loading = false;
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  },

  methods: {

    //轮播图数据
    async getDigitalSlide() {
      const { data: res } = await this.$axios.get("/getDigitalSlide");
      if (res.status !== 200) return this.$toast.fail("获取轮播图数据失败！");
      this.images = res.data;
    },

    //商品数据
    async getProductList() {
      const { data: res } = await this.$axios.post("/getProductList", {
        category: "digital",
      });
      if (res.status !== 201) return this.$toast.fail("获取商品数据失败！");
      this.product_computer = res.data.splice(6);
      this.product_phone = res.data;
      this.loading = false;
    },

  },

  components: {
    "goods-list": GoodsList,
  },
  
};
</script>

<style lang="less" scoped>
.digital-nav-fixex {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
}
//导航栏图标
.digital-nav .van-icon {
  color: #000;
  font-size: 25px;
}
.digital-nav .van-nav-bar__right .van-icon-search {
  padding-right: 15px;
}
// 轮播图
.van-swipe {
  height: 170px;
  margin: 56px 10px 10px 10px;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

// 爆品推荐
.recommend {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  .van-icon {
    font-size: 22px;
    color: #ff5500;
    transform: translateY(5px);
    padding-right: 5px;
  }
}
.van-card {
  background-color: #fff;
  margin: 10px;
  padding: 20px 10px;
  border-radius: 5px;
  .van-card__price {
    color: #ff5500;
    font-weight: bold;
  }
  .van-card__title {
    font-size: 15px;
  }
  .van-card__desc {
    padding: 5px 0;
  }
  .van-tag {
    margin: 5px;
  }
  .van-card__thumb {
    width: 100px;
    height: 100px;
  }
  .van-card__footer {
    position: absolute;
    right: 10px;
    bottom: 20px;
  }
  .van-button {
    background-color: #ee0a24;
    color: #fff;
    border-radius: 3px;
  }
}
.no-more {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 10px 0;
}
</style>
<style>
/* 轮播索引 */
.phone_slide .van-swipe__indicator {
  width: 11px;
  height: 3px;
  border-radius: 10px;
}
.phone_slide .van-swipe__indicator--active {
  width: 20px;
}
</style>