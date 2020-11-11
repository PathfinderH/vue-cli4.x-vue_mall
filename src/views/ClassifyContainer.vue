<template>
  <van-skeleton title :row="15" :loading="loading">
    <div>
      <!-- 顶部搜索框 -->
      <van-search
        background="#eeeeee"
        shape="round"
        placeholder="请输入搜索关键词"
        @focus="$router.push('/search')"
        class="van-hairline--bottom"
      />

      <!-- 侧边导航 -->
      <van-tree-select
        :height="screeHeight"
        :items="items"
        :main-active-index.sync="active"
      >
        <template #content>
          <div
            v-show="active === index"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="select-content">
              <h4>{{ item.text }}</h4>

              <van-row gutter="20">
                <van-col
                  span="8"
                  v-for="(v, index) in item.child"
                  :key="index"
                  class="select-content-child"
                >
                  <router-link
                    :to="{ name: 'search', params: { search: v.text } }"
                  >
                    <img
                      class="item-img"
                      :src="$axios.defaults.baseURL + v.img_url"
                    />

                    <p>{{ v.text }}</p>
                  </router-link>
                </van-col>
              </van-row>
            </div>
          </div>
        </template>
      </van-tree-select>
    </div>
  </van-skeleton>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      active: 0, //侧边导航显示隐藏
      items: [], //侧边导航文本
      screeHeight: window.innerHeight - 100 + "px",
    };
  },
  created() {
    this.getClassify();
  },

  methods: {
    //人气趋势榜
    async getClassify() {
      const { data: res } = await this.$axios.get("/getClassify");
      if (res.status != 200) return this.$toast.fail("获取分类页数据失败");
      this.items = res.data;
      this.loading = false;
    },
  },
 
};
</script>

<style lang="less" scoped>
.van-tree-select {
  .van-tree-select__content {
    flex: 3;
  }
  .select-content {
    padding: 0 5%;
    margin-bottom: 50px;
    h4 {
      margin: 15px 0 0 0;
    }
    p {
      margin: 0;
      font-size: 12px;
      color: #787878;
    }
  }
}
.select-content-child {
  text-align: center;
  padding-bottom: 14px;
}
.item-img {
  width: 70px;
}

</style>