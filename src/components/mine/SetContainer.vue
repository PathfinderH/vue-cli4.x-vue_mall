<template>
  <div class="set">
    <!-- 顶部导航栏 -->
    <div class="nav">
      <van-nav-bar
        title="设置"
        :border="false"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <van-icon name="arrow-left" size="20" color="#999" />
        </template>
        <template #right>
          <van-icon name="qr" @click="show = true" size="24" color="#999" />
        </template>
      </van-nav-bar>
    </div>

    <div class="head">
      <van-cell
        :title="'用户：' + username"
        icon="http://gw.alicdn.com/sns_logo/i4/O1CN01RQD3d21PgVCYh3yBd_!!0-mytaobao.jpg_100x100q90_.webp"
      >
      </van-cell>
    </div>

    <div class="cell">
      <van-cell title="我的收货地址" is-link to="/mine/set/myAddress" />
      <van-cell
        :title="item.title"
        is-link
        :to="item.to"
        v-for="(item, index) in cell_list"
        :key="index"
      />
      <van-cell title="退出登录" is-link class="log-out" @click="logOut" />
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <img src="../../assets/img/mine/qr.jpg" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false, //二维码的显示隐藏
      cell_list: [
        { title: "账户与安全", to: "/mine/set/contact" },
        { title: "支付设置", to: "/mine/set/contact" },
        { title: "通用", to: "/mine/set/contact" },
        { title: "问题反馈", to: "/mine/set/contact" },
        { title: "联系作者", to: "/mine/set/contact" },
      ],
    };
  },

  methods: {
    //点击左侧返回图标
    onClickLeft() {
      this.$router.push("/mine");
    },

    //点击右侧返回图标
    onClickRight() {
      // Toast.
    },

    //退出登录
    logOut() {
      this.$store.commit("removeProduct", []);
      localStorage.clear();
      this.$store.commit("currentUser", []);
      this.$router.push("/login");
    },
  },
  computed: {
    username() {
      return this.$store.state.currentUser.length == 0
        ? null
        : this.$store.state.currentUser[0].username;
    },
  },
};
</script>

<style lang="less" scoped>
.set {
  background-color: #f4f4f4;
  // 顶部导航栏
  .nav .van-nav-bar {
    background-color: #f4f4f4;
  }
  //   头像部分
  .head {
    .custom-title {
      margin-right: 4px;
      vertical-align: middle;
    }

    .search-icon {
      font-size: 16px;
    }
    .van-cell {
      padding: 10px 16px;
      line-height: 60px;
      border-bottom: 1px solid #e7eaed;
      .van-cell__left-icon {
        font-size: 60px;
        margin-right: 20px;
      }
      .van-icon__image {
        border-radius: 50%;
      }
    }
  }
  //单元格标签部分
  .cell {
    .van-cell:nth-child(-n + 3) {
      margin-bottom: 10px;
    }
    .log-out {
      text-align: center;
      margin-top: 10px;
    }
  }

  .wrapper {
    width: 180px;
    height: 180px;
    transform: translateY(100%);
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
</style>