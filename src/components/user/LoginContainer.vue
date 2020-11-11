<template>
  <div class="login">
    <div class="header">
      您需要登录才能继续访问
      <span @click="$router.push('/home')">关闭</span>
    </div>

    <div class="content">
      <div class="logo"></div>

      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          left-icon="manager"
          placeholder="请输入登录用户名"
          :rules="[{ pattern: uname_rules, message: '请输入4~16字符的用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          left-icon="lock"
          placeholder="请输入登录密码"
          :rules="[
            {
              pattern: psd_rules,
              message: '密码必须以字母开头，5-16字符，允许字母数字下划线',
            },
          ]"
        />
        <div class="toRegister">
          <span @click="$router.push('/register')">免费注册</span>
        </div>
        <div class="submit-btn">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      uname_rules: /^.{4,16}$/, //账号正则验证
      psd_rules: /^[a-zA-Z]\w{5,17}$/, //密码正则验证
    };
  },

  methods: {
    //登录按钮
    async onSubmit(values) {
      if (this.$store.state.currentUser.length != 0)
        return this.$toast.fail("你已经登录过了");

      if (this.username != "" && this.password != "") {
        const { data: res } = await this.$axios.post("/login", values);

        if (res.status == 200) {
          this.$toast.success("登录成功！");
         
          localStorage.setItem("token", res.token);

          this.$router.push("/mine");

          this.$store.commit("currentUser", [
            { id: res.data.id, username: res.data.username },
          ]);

          //登录后获取用户的数据
          this.$store.dispatch("getDatabaseInfo", "car");
          this.$store.dispatch("getDatabaseInfo", "collection");
          this.$store.dispatch("getDatabaseInfo", "orderForm");
          this.$store.dispatch("getDatabaseInfo", "address");
          this.$store.dispatch("getDatabaseInfo", "historySearch");
        } else if (res.status == 204) {
          this.$toast.fail("用户名或密码错误！");
        }
      } else {
        this.$toast.fail("请输入用户名和密码！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background-color: #fff;
  height: 100vh;
  //头部header
  .header {
    height: 52px;
    line-height: 52px;
    background-color: #eeeeee;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
    span {
      position: absolute;
      right: 20px;
      color: #999999;
    }
  }

  //登陆表单
  .logo {
    background: url("../../assets/img/home_imgs/logo.png") no-repeat;
    background-size: contain;
    width: 80px;
    height: 80px;
    margin: 5px auto 0;
  }
  .van-field {
    margin-top: 30px;
  }

  .toRegister {
    padding: 20px 0 30px 0;
    font-size: 14px;
    color: #555;
    text-align: right;
  }
  .submit-btn .van-button {
    background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
    border: none;
  }
  .van-form {
    padding: 0 10px;
  }
}
</style>

