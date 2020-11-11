<template>
  <div class="app-container">
    <!-- 路由router-view区域 -->
    <transition mode="out-in">
      <router-view></router-view>
    </transition>

    <!-- 底部tabbar区域 -->
    <van-tabbar route active-color="#FF5000" v-show="$route.meta.TabbarShow">
      <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/mine/orderForm" icon="orders-o"
        >订单列表</van-tabbar-item
      >
      <van-tabbar-item
        replace
        to="/shopcar"
        :badge="$store.getters.getAllCount"
        icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/mine" icon="manager-o"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>

    <transition name="van-fade">
      <div class="go-top" v-show="btnFlag">
        <van-icon name="back-top" @click="backTop" />
        顶部
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      btnFlag: false, //回到顶部图标的显示隐藏
    };
  },

  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 300) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
  },
};
</script>


<style lang="less" scoped>
.go-top {
  position: fixed;
  background-color: #fff;
  bottom: 80px;
  right: 10px;
  width: 40px;
  height: 40px;
  padding: 2px;
  border: 1px solid lightgray;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  line-height: 8px;
  color: #999;
  .van-icon {
    font-size: 27px;
  }
}
// //动画样式
// .v-enter{
//   opacity: 0;
//   transform: translateX(100%);
// }
// .v-leave-to{
//   opacity: 0;
//   transform: translateX(-100%);
// }
// .v-enter-active,
// .v-leave-active{
//   transition: all 0.1s ease;
// }

.v-enter {
  opacity: 0;
}
.v-leave {
  opacity: 1;
}
.v-enter-active {
  transition: opacity 0.5s;
}
.v-leave-active {
  opacity: 0;
  transition: opacity 0.1s;
}
.app-container {
  overflow-x: hidden;
}
//底部标签栏样式
.van-hairline--top-bottom {
  box-shadow: 0px 10px 10px 0px #fff;
}
</style>
