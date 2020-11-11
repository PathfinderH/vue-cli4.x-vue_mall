<template>
  <div class="my-address">
    <!-- 收货地址栏 -->
    <van-nav-bar
      title="我的收货地址"
      :border="false"
      @click-left="$router.back(-1)"
    >
      <template #left>
        <van-icon name="arrow-left" color="#999" />
      </template>
    </van-nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :switchable="false"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />

    <!-- 弹出层编辑和新增地址 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon="close"
      @closed="close"
      :style="{ height: '100%' }"
    >
      <div class="edit-address">
        <van-nav-bar :title="head_title" :border="false"> </van-nav-bar>
        <van-address-edit
          :show-delete="popup_flag"
          :area-list="areaList"
          :address-info="address_info"
          show-postal
          show-set-default
          show-search-result
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
        />
      </div>
    </van-popup>
    <p v-if="list.length == 0" class="null-address">你还没有收货地址哦~</p>
  </div>
</template>

<script>
import area from "../../assets/js/area";
export default {
  data() {
    return {
      show: false, //popup弹出框的显示隐藏

      popup_flag: false, //判断popup弹出框是修改地址信息还是增加地址信息

      chosenAddressId: "1", //当前选中地址的ID

      list: [], //收货地址

      address_info: {}, //收货地址初始值

      areaList: area, //省市数据

      head_title: "", //弹出的表单标题
    };
  },
  created() {
    this.list = this.$store.state.address;
    // console.log(this.info.info);
    console.log(this.$store.state.address);
  },
  methods: {
    //关闭弹出框清空表单
    close() {
      this.address_info = {};
    },

    //新增地址
    onAdd() {
      this.show = true;
      this.popup_flag = false;
      this.head_title = "新增收货地址";
    },

    //编辑地址
    onEdit(item) {
      this.show = true;
      this.popup_flag = true;
      this.head_title = "编辑收货地址";
      this.address_info = item;
    },

    //保存地址
    onSave(content) {
      let info = {
        id: content.id, //地址ID
        name: content.name, //姓名
        tel: content.tel, //电话
        province: content.province,
        city: content.city, //城市
        county: content.county, //区域
        addressDetail: content.addressDetail, //详细地址
        //地址
        address:
          content.province +
          content.city +
          content.county +
          content.addressDetail,
        isDefault: content.isDefault, //是否默认地址
        postalCode: content.postalCode, //邮编
        areaCode: content.areaCode, //地区编码
      };

      //修改地址操作
      if (this.popup_flag) {
     
     //将修改的表单数据提交到vuex中进行保存
        this.$store.commit("editAdress", info);

        //清空表单
        this.address_info = {};

        this.$toast.success("保存成功");

        //关闭弹出框
        this.show = false;

        //新增用户操作
      } else if (!this.popup_flag) {
        
        this.$store.commit("saveAdress", info);
        this.address_info = {};
        this.$toast.success("保存成功");
        this.show = false;
      }

      //只要表单被修改  就将vuex中的数据提交到数据库保存
      this.$store.dispatch("updateDatabaseInfo", "address");
    },
    //删除地址
    onDelete(content) {
      
      this.$store.commit("deleteAdress", content.id);
      this.show = false;
      this.$toast.success("删除成功");
      
      this.$store.dispatch("updateDatabaseInfo", "address");
    },
  },
};
</script>
<style>
.van-address-edit__buttons .van-button--danger {
  background-image: -webkit-linear-gradient(
    right,
    #ff5000 0%,
    #ff8400 100%
  ) !important;
  border: none;
}
</style>
<style lang="less" scoped>
.van-button--danger {
  background-image: -webkit-linear-gradient(
    right,
    #ff5000 0%,
    #ff8400 100%
  ) !important;
  border: none;
}
.null-address {
  font-size: 13.5px;
  color: #999;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.van-address-list__bottom {
  background-color: #f4f4f4;
}
.van-icon-arrow-left {
  font-size: 20px;
}
</style>