<template>
  <van-skeleton title :row="15" :loading="skeletonloading">
    <div class="shopcar_content">
      <div class="shopcar">
        <!-- 购物车头部 -->
        <div class="header">
          <div class="car_bar">
            <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->
            <h2 class="title">购物车({{ $store.getters.getAllCount }})</h2>
            <span v-if="!shopcar_falg" class="manage" @click="manage">{{
              !delete_flag ? "管理" : "完成"
            }}</span>
          </div>
          <p class="info">
            共选中了{{ $store.getters.getGoodsCountAndAmount.count }}件宝贝
          </p>
        </div>
        <!-- 购物车列表商品 -->
        <div class="content">
          <van-card
            v-for="(item, index) in shopcar_list"
            :key="index"
            :num="$store.getters.getGoodsCount[item.id]"
            :price="item.price"
            :title="item.title"
            :thumb="$axios.defaults.baseURL + item.img_url"
            :origin-price="item.original_price"
            :thumb-link="'/#/home/product/' + item.id"
          >
            <template #footer>
              <van-stepper
                v-model="$store.getters.getGoodsCount[item.id]"
                @change="
                  onChange(item.id, $store.getters.getGoodsCount[item.id])
                "
                integer
              />
              <van-checkbox
                checked-color="#FF6B00"
                ref="checkbox"
                v-model="$store.getters.getGoodsSelected[item.id]"
                @click="
                  selectedClick(
                    item.id,
                    $store.getters.getGoodsSelected[item.id]
                  )
                "
                class="checkeds"
              ></van-checkbox>
            </template>
          </van-card>
        </div>

        <!-- 购物车为空时内容 -->
        <div class="shopcar_null" v-if="shopcar_falg">
          <div class="null_logo">
            <img src="../assets/img/home_imgs/null_logo.webp" />
          </div>
          <h3>购物车竟然是空的</h3>
          <p>再忙,也要记得买点什么犒劳自己~</p>
          <div class="go_btn">
            <van-button type="default" color="#F4F4F4" @click="goShopcar"
              >去逛逛</van-button
            >
          </div>
        </div>
      </div>
      <!-- 提交订单 -->
      <van-submit-bar
        v-if="!shopcar_falg"
        button-color="-webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%)"
        :price="$store.getters.getGoodsCountAndAmount.amount"
        :button-text="
          '结算(' + $store.getters.getGoodsCountAndAmount.count + ')'
        "
        @submit="onSubmit"
        class="van-hairline--bottom"
      >
        <van-checkbox
          checked-color="#FF6B00"
          v-model="$store.state.check_all"
          @click="checkAll"
          >全选</van-checkbox
        >
      </van-submit-bar>

      <!-- 删除商品 -->
      <van-submit-bar
        v-if="!shopcar_falg"
        class="delete-product van-hairline--bottom"
        v-show="delete_flag"
        button-text="删除"
        @submit="delete_product"
        button-type="default"
      >
        <van-button
          type="default"
          round
          size="small"
          class="add-coll"
          @click="addToCollection"
          >移入收藏夹</van-button
        >
        <van-checkbox
          checked-color="#FF6B00"
          v-model="$store.state.check_all"
          class="delete_check"
          @click="checkAll"
          >全选</van-checkbox
        >
      </van-submit-bar>
    </div>
  </van-skeleton>
</template>

<script>
export default {
  data() {
    return {
      shopcar_list: [], //购物车列表商品信息
      shopcar_falg: false,
      delete_flag: false,
      skeletonloading: true,
    };
  },

  created() {
    this.getShopcarList();
    this.getShopcarLength();
    this.$store.commit("getAllSelected_false");
  },

  mounted() {
    this.$axios
      .all([this.getShopcarList(), this.getShopcarLength()])
      .then(
        this.$axios.spread(() => {
          this.skeletonloading = false;
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    //去逛逛按钮
    goShopcar() {
      this.$router.push("/home");
    },

    //判断购物车是否为空
    getShopcarLength() {
      if (this.$store.state.car.length == 0) {
        this.shopcar_falg = true;
      } else {
        this.shopcar_falg = false;
      }
    },

    //获取购物车信息
    async getShopcarList() {
      let idArr = [];
      this.$store.state.car.forEach((item) => {
        idArr.push(item.id);
      });

      //购物车中没有商品直接返回
      if (idArr.length <= 0) {
        return;
      }

      const { data: res } = await this.$axios.get(
        "/getShopcar/" + idArr.join(",")
      );
      if (res.status != 200) this.$toast.fail("获取数据失败");
      this.shopcar_list = res.data.reverse();
    },

    // 购物车数据中的数据改变时调用mutations中的方法将数据更新到state中
    async onChange(goods_id, num) {
      this.$store.commit("updateGoodsInfo", {
        id: goods_id,
        count: num,
      });

      this.$store.dispatch("updateDatabaseInfo", "car");
    },

    //将勾选的商品按钮状态selected更新到state中
    selectedClick(id, val) {
      this.$store.commit("updateGoodsSelected", {
        id,
        selected: val,
      });
      this.$store.commit("getAllSelected_false");
      this.$store.dispatch("updateDatabaseInfo", "car");
    },

    //全选按钮
    checkAll() {
      this.$store.commit("updateAllSelected", this.$store.state.check_all);
      this.$store.dispatch("updateDatabaseInfo", "car");
    },

    //提交订单
    onSubmit() {
      if (this.$store.getters.getGoodsCountAndAmount.count != 0) {
        this.$router.push("/shopcar/settlement");
        this.$toast("跳转订单支付界面~");
      } else {
        this.$toast.fail("请选择商品");
      }
    },

    //移入收藏夹按钮
    addToCollection() {
      if (this.$store.getters.getGoodsCountAndAmount.count == 0)
        return this.$toast("您还没有选择宝贝哦！");

      let newCar = [];
      this.$store.state.car.forEach((el) => {
        if (el.selected) {
          let o = {};
          for (let key in el) {
            if (key == "id") {
              o.id = el[key];
              o.selected = true;
              o.checkbox = false;
            }
          }

          newCar.push(o);
        }
        return newCar;
      });
      this.$store.commit("moveToColle", newCar);
      this.$store.commit("getCollAllSelected_false"); //判断全选按钮
      //移除购物车内的商品
      this.confirm();
    },
    //管理按钮
    manage() {
      this.delete_flag = !this.delete_flag;
    },
    delete_product() {
      if (this.$store.getters.getGoodsCountAndAmount.count == 0)
        return this.$toast("您还没有选择宝贝哦！");
      this.$dialog
        .alert({
          title: "确定删除选中的宝贝吗",
          cancelButtonText: "我再想想",
          showCancelButton: true,
          // message: "确定删除这个宝贝吗",
        })
        .then(() => {
          this.confirm();
          this.$toast.success("删除成功");
        })
        .catch(() => {});
    },

    //删除按钮时点击确定
    confirm() {
      let newCar = [];
      this.$store.state.car.forEach((element) => {
        if (element.selected == false) {
          newCar.push(element);
        }
        return newCar;
      });

      this.$store.commit("removeProduct", newCar);
      this.shopcar_list = newCar;

      this.getShopcarList();
      this.getShopcarLength();
    },
  },

  watch: {
    "$store.state.car"() {
      this.$store.dispatch("updateDatabaseInfo", "car");
    },
  },
};
</script>

<style lang="less" scoped>
h2 {
  padding: 0;
  margin: 0;
}
.shopcar_content {
  //购物车头部
  .header {
    height: 170px;
    background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
    .car_bar {
      display: flex;
      align-items: center;
      padding: 20px 12px 10px 12px;
      color: #fff;
      .title {
        font-size: 20px;
      }
      .manage {
        font-size: 16px;
        margin-left: auto;
      }
    }
  }

  .shopcar {
    .content {
      position: absolute;
      top: 100px;
      margin-bottom: 100px;
    }
    .info {
      padding: 0 12px 10px 12px;
      color: #fff;
      font-size: 13px;
    }
  }

  //购物车为空时
  .shopcar_null {
    text-align: center;
    width: 100%;
    height: 240px;
    h3 {
      font-size: 18px;
    }
    .null_logo {
      margin: 0 auto;
      padding-top: 10px;
      width: 110px;
      img {
        width: 100%;
      }
    }
    h3,
    p {
      padding: 5px 0;
      margin: 0;
      color: #5f646e;
      font-weight: 100;
    }
    p {
      font-size: 13px;
      color: #999;
    }
    .van-button--default {
      border: 1px solid #dddddd !important;
      color: #5f646e !important;
      padding: 0 20px;
      height: 40px;
    }
  }

  //购物车列表商品
  .van-card__num {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .content {
    width: 100%;
    .van-card {
      position: relative;
      background-color: #fff;
      border-radius: 10px;
      margin: 12px;
      padding-left: 40px;
      .van-card__title {
        line-height: 17px;
      }
    }
  }

  .van-submit-bar {
    bottom: 49px;
  }
  .van-submit-bar__price {
    color: #ff5000;
  }
  .van-card__footer .checkeds {
    position: absolute;

    left: 10px;
    bottom: 50%;
    margin-bottom: -10px;
    // transform: translateY(50%);
  }

  //字体设置
  .van-card__price {
    color: #ff5000;
    font-size: 16px;
  }
  .van-card__origin-price {
    font-size: 13px;
  }
  .van-card__title {
    font-size: 15px;
  }

  //删除商品
  .delete_check {
    position: absolute;
    left: 16px;
  }
  .delete-product {
    .van-submit-bar__button,
    .add-coll {
      width: 60px;
      height: 30px;
      border: 1px solid #fc0a0a;
      font-size: 13px;
      padding-top: 1px;
      background-color: #fff;
      .van-button__text {
        color: #fc0a0a;
      }
    }
    .add-coll {
      width: auto;
      margin-right: 10px;
      border: 1px solid #ff5000;
      .van-button__text {
        color: #ff5000;
      }
    }
  }
}
</style>