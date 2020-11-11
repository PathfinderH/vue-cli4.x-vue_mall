<template>
  <div class="login">
    <div class="header">
      欢迎注册
      <span @click="$router.push('/mine')">关闭</span>
    </div>

    <div class="content">
      <div class="logo"></div>

      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          left-icon="manager"
          placeholder="请输入您的用户名"
          :rules="[{ pattern: uname_rules, message: '请输入4~16字符的用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          left-icon="lock"
          placeholder="请输入您的密码"
          :rules="[
            {
              pattern: psd_rules,
              message: '密码必须以字母开头，5-16字符，允许字母数字下划线',
            },
          ]"
        />
        <van-field
          v-model="agin_password"
          type="password"
          name="agin-password"
          left-icon="lock"
          placeholder="请再次输入您的密码"
          :rules="[{ validator: agin_psd_rules, message: '两次密码不一致' }]"
        />
        <van-field
          v-model="email"
          name="email"
          left-icon="envelop-o"
          placeholder="请输入您的邮箱"
          :rules="[{ pattern: email_rules, message: '请输入正确邮箱地址' }]"
        />

        <div class="toRegister">
          <span @click="$router.push('/login')">已有账号？去登录</span>
        </div>
        <div class="submit-btn">
          <van-button round block type="info" native-type="submit">
            注册
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
      username: "", //账号
      password: "", //密码
      agin_password: "", //再次输入密码
      email: "", //邮箱
      uname_rules: /^.{4,16}$/, //账号正则验证
      psd_rules: /^[a-zA-Z]\w{5,17}$/, //密码正则验证
      email_rules: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, //邮箱正则验证

    };
  },

  methods: {
    //再次输入密码表单验证
    agin_psd_rules(val) {
      return val === this.password;
    },

    //提交注册信息
    async onSubmit(values) {
     let info = {
        username: values.username,
        password: values.password,
        email: values.email
      }
      const { data: res } = await this.$axios.post("/register", info);
      if (res.status == 0) return this.$toast.fail("注册失败！");

      if (res.status == 200) {
        this.$toast.success("注册成功,跳转登录界面");
        this.$router.push("/login");
      } else if (res.status == 204) {
        this.$toast.fail("用户名已存在！");
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

  //遮罩层修改
  .close {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .van-popup--center {
    font-size: 16px;
  }
}
</style>
<style>
.van-overlay {
  background-color: transparent;
}
.van-popup--center {
  width: 160px;
  padding: 50px 30px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: #fff;
  text-align: center;
}
</style>
