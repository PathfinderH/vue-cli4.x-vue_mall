<template>
  <div>
    <van-icon name="arrow-left" class="author-back" @click="$router.go(-1)"/>
    <van-icon name="wap-home-o" class="author-gohome" @click="$router.push('/home')" />
    <div class="bg"></div>
    <div class="content">
      <h4>联系方式：</h4>
      <p>QQ：1379228273</p>
      <p>微信：Ephemerallllll</p>
      <p>邮箱：1379228273@qq.com</p>
      <p>个人博客地址：https://www.ahaiblog.cn/</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.bg {
  height: 250px;
  background: url("../../assets/img/mine/bg.jpg");
  background-size: cover;
}
.content {
  height: 350px;
  margin: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
  position: relative;
  bottom: 50px;
  padding: 20px;
  box-sizing: border-box;
  p {
    margin: 15px 0;
    font-size: 17px;
  }
  h4 {
    font-size: 22px;
  }
}
</style>
<style>
.author-back {
  position: absolute !important;
  top: 15px;
  left: 15px;
  color: #fff;
  font-size: 25px !important;
}
.author-gohome {
  position: absolute !important;
  top: 15px;
  right: 15px;
  color: #fff;
  font-size: 25px !important;
}
</style>