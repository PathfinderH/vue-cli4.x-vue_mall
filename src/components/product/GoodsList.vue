<template>
  <div>
    <van-row class="product_list">
      <van-col span="12" v-for="(item, index) in list" :key="index">
        <router-link :to="'/home/product/' + item.id">
          <img :src="$axios.defaults.baseURL + item.img_url" />
          <div class="product_text title">
            <span class="van-multi-ellipsis--l2">{{ item.title }}</span>
          </div>
          <div class="product_text">
            <!-- <span></span> -->
            <span class="price">￥{{ item.price }}</span>
            <!-- <span><del>{{ item.original_price }}</del></span> -->
            <span class="people_buy">{{ item.people_buy }}人付款</span>
          </div>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  props: ["list"], //商品列表数据
};
</script>

<style lang="less" scoped>
//商品列表信息
.product_list {
  margin: 0 3% 0 3%;
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