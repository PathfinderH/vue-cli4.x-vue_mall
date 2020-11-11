<template>
  <van-skeleton title :row="15" :loading="loading">
    <div class="product">
      <!-- 轮播 -->
      <div class="swipe">
        <div class="nav-bar">
          <span class="btn-back" @click="$router.back()">
            <van-icon name="arrow-left" color="#fff" />
          </span>
          <span class="btn-cart" @click="$router.push('/shopcar')">
            <van-icon name="shopping-cart-o" color="#fff" />
          </span>
        </div>
        <van-swipe @change="onChange">
          <van-swipe-item v-for="(item, index) in img_list" :key="index"
            ><img :src="$axios.defaults.baseURL + item"
          /></van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ img_list.length }}
            </div>
          </template>
        </van-swipe>
      </div>
      <!-- 价格 -->
      <div class="price">
        <div class="discounts_price">
          <p>
            ￥<span class="p_price">{{ product.price }}</span>
          </p>
          <span class="badge">超值优惠</span>
          <span class="badge">淘金币可抵0.88起</span>
        </div>
        <div class="original_price">
          <span
            >价格:￥<del>{{ product.original_price }}</del></span
          >
        </div>
      </div>

      <div class="title">
        {{ product.title }}
      </div>
      <!-- 快递 -->
      <div class="wrapper">
        <van-row>
          <van-col span="8">快递:快递包邮</van-col>
          <van-col span="8" class="center"
            >月销{{ product.people_buy }}</van-col
          >
          <van-col span="8" class="right"
            >发货地:{{ product.ship_address }}</van-col
          >
        </van-row>
      </div>

      <!-- 服务 -->
      <div class="serve" @click="onSelect">
        <span>服务</span>
        <span>1次破损补寄 · 订单险 · 7天无理由 · 运费险</span>
        <van-icon name="arrow" color="#999" size="16" />
      </div>

      <van-action-sheet
        v-model="show"
        close-icon
        title="基础服务"
        class="action-sheet"
      >
        <div class="content">
          <ul>
            <li>
              <img src=../../assets/img/home_imgs/serve_logo.png alt=""
              srcset="">
              <span class="info-title">付款后48小时内发货</span>
              <p></p>
            </li>

            <li>
              <img src=../../assets/img/home_imgs/serve_logo.png alt=""
              srcset="">
              <span class="info-title">7天无理由</span>
              <p>
                满足7天无理由退换货申请的前提下，包邮商品需要买家承担退货邮费，非包邮商品需要买家承担发货和退货邮费。
              </p>
            </li>
            <li>
              <img src=../../assets/img/home_imgs/serve_logo.png alt=""
              srcset="">
              <span class="info-title">运费险</span>
              <p>
                卖家为您购买的商品投保退货运费险（保单生效以确认订单页展示的运费险为准）
              </p>
            </li>
          </ul>
          <div class="other">其他</div>
          <ul>
            <li>
              <img src=../../assets/img/home_imgs/serve_logo.png alt=""
              srcset="">
              <span class="info-title">信用卡支付</span>
            </li>

            <li>
              <img src=../../assets/img/home_imgs/serve_logo.png alt=""
              srcset="">
              <span class="info-title">集分宝</span>
            </li>
            <li>
              <img src=../../assets/img/home_imgs/serve_logo.png alt=""
              srcset="">
              <span class="info-title">支付宝支付</span>
            </li>
          </ul>
          <van-button round type="info" size="large" @click="show = false"
            >完成</van-button
          >
        </div>
      </van-action-sheet>
      <!-- 规格 -->
      <div class="serve" @click="showBase = true">
        <span>规格</span>
        <span>请选择 颜色分类</span>
        <van-icon name="arrow" color="#999" size="16" />
      </div>

      <div class="serve" style="margin: 0" @click="show = true">
        <span>参数</span>
        <span>品牌 型号...</span>
        <van-icon name="arrow" color="#999" size="16" />
      </div>

      <!-- <div class="serve comment">
      <span>宝贝评价(122)</span>
      <span>查看更多</span>
      <van-icon name="arrow" color="#FF5C09" size="16" />
    </div> -->
      <van-divider
        :style="{
          borderColor: '#999',
        }"
        ><van-icon name="photo-o" class="photo-o-icon" />&nbsp;详情</van-divider
      >

      <!-- 详情图片 -->
      <div class="details">
        <img
          :src="$axios.defaults.baseURL + item"
          v-for="(item, index) in details_list"
          :key="index"
        />
      </div>

      <!-- 底部tabbar -->
      <div>
        <van-goods-action class="van-hairline--top">
          <van-goods-action-icon
            icon="wap-home-o"
            text="首页"
            color="#999"
            @click="$router.push('/home')"
          />
          <van-goods-action-icon
            icon="cart-o"
            text="购物车"
            color="#999"
            :badge="$store.getters.getAllCount"
            to="/shopcar"
          />
          <van-goods-action-icon
            icon="star"
            @click="collection"
            text="收藏"
            :color="
              this.$store.getters.getCollectionSelected[id] ? '#ff5000' : '#999'
            "
          />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="addToShopcar"
          />
          <van-goods-action-button type="danger" text="立即购买" @click="buy" />
        </van-goods-action>
      </div>

      <div class="sku-container">
        <van-sku
          v-model="showBase"
          :sku="sku"
          :goods="goods_info"
          :goods-id="id"
          :hide-stock="sku.hide_stock"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay"
          :custom-sku-validator="customSkuValidator"
          @buy-clicked="onAddCartClicked"
          :show-add-cart-btn="false"
          buy-text="确定"
        />
      </div>
    </div>
  </van-skeleton>
</template>

<script>
export default {
  data() {
    return {
      loading: true, //骨架屏显示与隐藏

      id: this.$route.params.id,

      product: {}, //商品信息

      current: 0, //轮播

      img_list: [], //商品轮播图片信息

      details_list: [], //商品详情图片

      show: false, //动作面板显示隐藏

      flag: false, //判断用户是加入购物车操作还是直接购买操作

      sku: {
        tree: [
          /**********************商品规格配置***************************/
          // {
          //             k: '颜色',
          //             k_id: '1',
          //             v: [{
          //                 id: '30349',
          //                 name: '天蓝色',
          //             }, {
          //                 id: '1215',
          //                 name: '白色'
          //             }],
          //             k_s: 's1',
          //             count: 2
          //         }, {
          //             k: '尺寸',
          //             k_id: '2',
          //             v: [{
          //                 id: '1193',
          //                 name: '1'
          //             }, {
          //                 id: '1194',
          //                 name: '2'
          //             }],
          //             k_s: 's2',
          //             count: 2
          //         }
        ],
        // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
        // list: [{
        //     id: 2259,
        //     price: 120, //价格
        //     discount: 122,
        //     s1: '1215',
        //     s2: '1193',
        //     stock_num: 20, //库存
        //     goods_id: 946755
        // }, {
        //     id: 2260,
        //     price: 110,
        //     discount: 112,
        //     s1: '1215',
        //     s2: '1194',
        //     stock_num: 90, //库存
        //     goods_id: 946755
        // }, {
        //     id: 2257,
        //     price: 130,
        //     discount: 132,
        //     s1: '30349',
        //     s2: '1193',
        //     stock_num: 40, //库存
        //     goods_id: 946755
        // }, {
        //     id: 2258,
        //     price: 100,
        //     discount: 100,
        //     s1: '30349',
        //     s2: '1194',
        //     stock_num: 50, //库存
        //     goods_id: 946755
        // }],

        price: "", //价格

        stock_num: "", // 商品总库存

        none_sku: true, // 是否无规格商品 false正常显示那些可供选择的标准，此处是颜色和尺寸

        hide_stock: false, // 是否隐藏剩余库存 false正常显示剩余多少件的那个库存
      },

      goods_info: {
        title: "", //商品标题

        picture: "", //图片
      },

      showBase: false, //sku的框的显示
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true, //点击空白处关闭购物框

      customSkuValidator: () => "请选择商品属性!", //判断用户是否选择商品属性
    };
  },

  created() {
    this.getProduct();
    this.getProductImg();
  },

  mounted() {
    //等所有请求完成之后隐藏骨架屏
    this.$axios
      .all([this.getProduct(), this.getProductImg()])
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
    //收藏商品
    collection() {
      let collectionInfo = {
        id: this.id,
        selected: true,
        checkbox: false,
      };

      //将收藏商品数据提交到vuex进行保存
      this.$store.commit("saveCollection", collectionInfo);

      //判断全选按钮
      this.$store.commit("getCollAllSelected_false");

      if (this.$store.getters.getCollectionSelected[this.id]) {
        this.$toast("收藏成功");
      } else {
        this.$toast("取消收藏成功");
      }

      //将收藏商品数据提交到数据库
      this.$store.dispatch("updateDatabaseInfo", "collection");
    },

    //加入购物车按钮
    addToShopcar() {
      const token = localStorage.getItem("token");
      if (token) {
        this.showBase = true;
        this.flag = false;
      } else {
        this.$router.push("/login");
      }
    },

    //立即购买按钮
    buy() {
      const token = localStorage.getItem("token");
      if (token) {
        this.showBase = true;
        this.flag = true;
      } else {
        this.$router.push("/login");
      }
    },

    //商品购买sku
    async onAddCartClicked(sku) {
      let goodsInfo = {
        id: sku.goodsId,
        count: sku.selectedNum,
        price: sku.selectedSkuComb.price,
        selected: false,
      };

      //加入购物车操作
      if (!this.flag) {
        this.$store.commit("addToCar", goodsInfo);
        this.$store.commit("getAllSelected_false"); //判断全选按钮
        this.$store.dispatch("updateDatabaseInfo", "car");
        this.$toast.success("添加成功,在购物车等亲~");
      }

      //直接购买操作
      else if (this.flag) {
        this.$router.push("/petails/settlement");

        let goods = {
          id: sku.goodsId,
          count: sku.selectedNum,
        };

        this.$store.commit("saveDirectBuyGoodsId", goods);

        this.$toast("跳转订单支付界面~");
      }
      this.showBase = false;
    },

    // 商品属性及数量选择框弹出
    onSelect() {
      this.show = true;
    },

    //轮播
    onChange(index) {
      this.current = index;
    },

    //商品详情信息获取
    async getProduct() {
      const { data: res } = await this.$axios.get(
        "/allProductList/product/" + this.id
      );
      if (res.status !== 200) return this.$toast.fail("商品信息获取失败！");

      this.product = res.data;
      this.sku.price = res.data.price;

      this.sku.stock_num = res.data.inventory;
      this.goods_info.picture = this.$axios.defaults.baseURL + res.data.img_url;
    },
    
    //获取商品详情介绍图片
    async getProductImg() {
      const { data: res } = await this.$axios.get(
        "/allProductList/getProduct/" + this.id
      );
      if (res.status != 200) this.$toast.fail("商品介绍信息获取失败！");

      this.img_list = res.data.img_url.split(",");
      this.details_list = res.data.details_url.split(",");
    },
  },
};
</script>
<style>
.van-icon-arrow-left,
.btn-cart > .van-icon-shopping-cart-o {
  font-size: 22px !important;
}
</style>
<style lang="less" scoped>
html,
body,
h4,
p,
span,
li,
img {
  margin: 0;
  padding: 0;
}
.product {
  margin-bottom: 50px;
}
//轮播样式
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 15px;
  padding: 3px 9px;
  font-size: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
}
.swipe {
  height: 375px;
}
.van-swipe {
  height: 100%;
}
.van-swipe img {
  width: 100%;
}

.nav-bar {
  position: relative;
  z-index: 99;
  top: 20px;
  .van-icon {
    line-height: 34px;
  }
  .btn-back,
  .btn-cart {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    width: 34px;
    height: 34px;
    border-radius: 50%;
    text-align: center;
    .van-icon {
      position: absolute;
      right: 50%;
      transform: translateX(50%);
    }
  }
  .btn-back {
    left: 10px;
  }
  .btn-cart {
    right: 10px;
  }
}
// ActionSheet
.action-sheet {
  max-height: 90%;
  .info-title {
    padding-left: 10px;
  }
}
.content {
  padding: 16px 16px 160px;
  padding-bottom: 10px;
  li {
    padding-bottom: 30px;
    color: #999;
    font-size: 15px;
  }
  li img {
    width: 15px;
    vertical-align: middle;
  }
  li span {
    vertical-align: middle;
  }
  li p {
    font-size: 13px;
    padding: 10px 0 0 25px;
  }
  .other {
    font-size: 16px;
    text-align: center;
    padding: 20px 0;
  }
  .van-button {
    height: 40px;
    background-image: linear-gradient(to right, #ff9000 0%, #ff5000 100%);
    border: none;
  }
}
//价格
.price {
  background: #fff;
}
.price p {
  display: inline;
  font-size: 20px;
  color: #ff5000;
}
.price .p_price {
  font-size: 27px;
  color: #ff5000;
}
.discounts_price {
  padding-top: 15px;
  margin: 0 10px;
}
.discounts_price .badge {
  font-size: 12px;
  background-color: #fff1eb;
  color: #ff5000;
  border-radius: 10px;
  padding: 2px 5px;
  margin-left: 5px;
}
.original_price {
  margin: 0 10px;
  font-size: 12px;
  color: #999999;
}
.title {
  background: #fff;
  padding: 0 10px;
  font-weight: 800;
  font-size: 16px;
}
.wrapper {
  background: #fff;
  font-size: 13px;
  color: #999;
  padding: 12px 10px;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}

.serve {
  position: relative;
  background: #fff;
  padding: 12px 10px;
  margin-top: 10px;
  font-size: 13px;
  color: #999;
}
.serve span:nth-child(2) {
  color: #000;
  margin-left: 10px;
}
.serve .van-icon-arrow {
  position: absolute;
  right: 10px;
  top: 13px;
}
.comment span:nth-child(1) {
  color: #000;
  font-size: 15px;
}
.comment span:nth-child(2) {
  position: absolute;
  right: 25px;
  color: #ff5000;
}

//详情
.van-divider {
  color: #999999;
  padding: 0 100px;
  font-size: 13px;
  .photo-o-icon {
    font-size: 16px;
  }
}

.details img {
  width: 100%;
  vertical-align: middle;
}
.van-goods-action {
  z-index: 99;
  box-shadow: 0px 10px 10px 0px #fff;
}
.van-goods-action-icon {
  color: #999;
}
</style>