<template>
  <div class="search-container">
    <!-- 搜索框 -->

    <form action="/">
      <van-search
        v-model="value"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        background="#EEEEEE"
        @input="onChange"
        @search="onSearch"
        @clear="onClear"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
        <template #left>
          <van-icon name="arrow-left" @click="$router.go(-1)" class="go-back" />
        </template>
      </van-search>
    </form>

    <!-- 热门搜索 -->
    <div class="search-found" v-show="hotSearch_flag">
      <div v-show="history_search.length != 0">
        <h4>历史搜索<van-icon name="delete" @click="delHistory" /></h4>
        <div class="hot-search">
          <van-tag
            round
            type="primary"
            size="medium"
            color="#DEE1E6"
            text-color="#999"
            v-for="(item, index) in history_search"
            :key="index"
            @click="hotSearch($event)"
            >{{ item }}</van-tag
          >
        </div>
      </div>
      <h4>热门搜索</h4>
      <div class="hot-search">
        <van-tag
          round
          type="primary"
          size="medium"
          color="#DEE1E6"
          text-color="#999"
          v-for="(item, index) in hot_search"
          :key="index"
          @click="hotSearch($event)"
          >{{ item }}</van-tag
        >
      </div>
    </div>

    <!-- 搜索结果列表 -->
    <div class="search-content" v-show="!hotSearch_flag">
      <!-- <div class="sort-rule"> -->
      <van-dropdown-menu class="sort-rule" active-color="#ff5000">
        <van-dropdown-item
          v-model="option_value"
          @change="menuChange"
          :options="option"
        />
        <div class="sort-rule-item">
          <span @click="sellRule">销量优先</span>
        </div>
        <div class="sort-rule-item">
          <!-- iconfont icon-tulie -->
          <i :class="sortRule_icon" @click="cutList" />
        </div>
      </van-dropdown-menu>

      <!-- 列表方式展示 -->
      <div class="card-list" v-show="!sortRule">
        <van-card
          v-for="(item, index) in search_list"
          :key="index"
          :price="item.price"
          :origin-price="item.original_price"
          :title="item.title"
          :thumb="$axios.defaults.baseURL + item.img_url"
          :thumb-link="'/#/home/product' + item.id"
        >
          <template #bottom>
            <van-row align="center">
              <van-col span="8">{{ "快递:" + item.expressage }}</van-col>
              <van-col span="8">{{ item.people_buy + "人付款" }}</van-col>
              <van-col span="8">{{ item.ship_address }}</van-col>
            </van-row>
          </template>
        </van-card>
      </div>

      <!-- 宫格方式展示 -->
      <div v-show="sortRule">
        <van-row class="product_list">
          <van-col span="12" v-for="(item, index) in search_list" :key="index">
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
      <span class="no-more" v-show="!null_search">没有更多商品了哦~</span>
    </div>

    <div class="null-search" v-show="null_search">
      <span>暂时没有相关商品哦~</span>
    </div>
  </div>
</template>

<script>
import "../../assets/fonts/iconfont.css";
export default {
  data() {
    return {
      search: this.$route.params.search || "", //点击分类页商品传递搜索参数

      null_search: false, //搜索框为空时内容的显示隐藏

      hotSearch_flag: true, //热门搜索显示隐藏

      value: "", //搜索框数据

      search_list: [], //搜索结果数据

      history_search: [], //历史搜索记录

      hot_search: [
        //热门搜索
        "手机",
        "电脑",
        "运动鞋",
        "彩妆",
        "杯",
        "生日礼物",
        "充电宝",
        "耳机",
        "窗帘",
      ],

      sortRule: false, //排序规则导航的显示隐藏

      sortRule_icon: "iconfont icon-tulie", //切换排序方式图标

      option_value: 0, //排序导航下拉框的值

      option: [
        { text: "全部商品", value: 0 },
        { text: "价格从高到低", value: 1 },
        { text: "价格从低到高", value: 2 },
      ],
    };
  },
  created() {
    this.$store.dispatch("getDatabaseInfo", "historySearch");

    this.getHistorySearch();

    // 点击分类页中的商品自动搜索
    if (this.search == "") return;
    this.value = this.search;
    this.onSearch();
  },

  methods: {
    //获取历史搜索记录
    getHistorySearch() {
      this.history_search = this.$store.state.historySearch;
    },

    //切换排序方式图标
    cutList() {
      this.sortRule = !this.sortRule;
      if (!this.sortRule) {
        this.sortRule_icon = "iconfont icon-tulie";
      } else {
        this.sortRule_icon = "iconfont icon-liebiao";
      }
    },

    //切换排序方式
    menuChange() {
      if (this.option_value == 1) {
        this.search_list.sort(this.sortBy("price", true));
      } else if (this.option_value == 2) {
        this.search_list.sort(this.sortBy("price"));
      } else {
        this.onSearch();
      }
    },

    //按销量排序
    sellRule() {
      this.search_list.sort(this.sortBy("people_buy", true));
    },

    //排序函数
    sortBy(props, rule) {
      return function (a, b) {
        if (rule) {
          return b[props] - a[props];
        } else {
          return a[props] - b[props];
        }
      };
    },

    //存储历史记录
    setHistory(value) {
      if (!this.history_search.includes(value)) {
        this.history_search.unshift(value);

        //缓存数据到本地
        localStorage.setItem(
          "historySearch",
          window.btoa(
            window.encodeURIComponent(JSON.stringify(this.history_search))
          )
        );
      } else {
        //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
        let i = this.history_search.indexOf(value);
        this.history_search.splice(i, 1);
        this.history_search.unshift(value);

        localStorage.setItem(
          "historySearch",
          window.btoa(
            window.encodeURIComponent(JSON.stringify(this.history_search))
          )
        );
      }
    },

    //点击热门搜索标签
    hotSearch($event) {
      this.getSearchResult($event.currentTarget.innerHTML);

      this.value = $event.currentTarget.innerHTML;

      this.setHistory(this.value);
    },

    //热门搜索内容显示隐藏
    hotSearchFlag() {
      if (this.search_list.length == 0) {
        this.hotSearch_flag = true;
      } else {
        this.hotSearch_flag = false;
      }
    },

    //获取搜索结果数据
    async getSearchResult(val) {
      const { data: res } = await this.$axios.get("/getSearch/" + val);

      if (res.status != 200) return this.$toast("获取搜索数据失败！");

      if (res.data.length == 0) {
        this.hotSearch_flag = false;
        return (this.null_search = true);
      }
      this.search_list = res.data;
      this.hotSearchFlag();
    },

    //删除搜索历史
    delHistory() {
      this.$dialog
        .alert({
          title: "确定删除全部历史记录？",
          cancelButtonText: "我再想想",
          showCancelButton: true,
          // message: "确定删除这个宝贝吗",
        })
        .then(() => {
          this.$store.commit("removeHistorySearch");
          this.getHistorySearch();
        })
        .catch(() => {});
    },

    //搜索
    onSearch() {
      if (this.value == "") {
        return this.$toast("请输入搜索内容~");
      } else {
        this.setHistory(this.value);
      }

      this.getSearchResult(this.value);
    },

    //监听搜索框为空时
    onChange() {
      if (this.value == "") {
        this.onClear();
      }
    },

    //清空搜索框时
    onClear() {
      this.null_search = false;
      this.hotSearch_flag = true;
      this.search_list = [];
    },
  },

  //监听历史记录的变化 将变化后的数据提交保存到数据库
  watch: {
    "$store.state.historySearch"() {
      this.$store.dispatch("updateDatabaseInfo", "historySearch");
    },
  },
};
</script>
<style>
.van-dropdown-menu__bar {
  box-shadow: none !important;
  flex: 1;
}
.van-ellipsis {
  font-size: 14px;
}
</style>
<style lang="less" scoped>
//搜索框样式
.van-search {
  // border-bottom: 1px solid #e1e2e4;
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  .go-back {
    padding-right: 10px;
    color: gray;
    font-size: 20px;
  }
  .van-search__action {
    color: gray;
  }
}

//搜索发现
.search-found {
  padding: 0 15px;
  margin-top: 55px;
  h4 {
    position: relative;
    margin: 0;
    padding: 15px 0 5px 0;
    font-size: 15px;
    .van-icon-delete {
      position: absolute;
      font-size: 20px;
      right: 0;
    }
  }
  .van-tag--primary {
    border-radius: 3px;
    padding: 3px 10px;
    margin: 0 5px 5px 0;
  }
}

//排序方式
.sort-rule {
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(100, 101, 102, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sort-rule-item {
  flex: 1;
  font-size: 14px;
  i {
    font-size: 20px;
  }
}
.van-dropdown-menu {
  position: fixed;
  top: 53px;
  z-index: 99;
  width: 100%;
}
//搜索结果
.card-list {
  margin-top: 103px;
}
.no-more {
  font-size: 13px;
  color: #999;
  padding: 20px;
}
.search-content {
  text-align: center;
  position: absolute;
  .van-card__bottom {
    text-align: left;
    padding: 15px 0 10px 0;
    font-size: 12px;
    color: #999;
  }
}

.van-card {
  // margin-top: 0px;
  margin: 0 !important;
  border-bottom: 0.5px solid #eeeeee;
  box-sizing: border-box;
}

.van-card__price {
  color: #ff5000;
  font-size: 18px;
}
.van-card__origin-price {
  font-size: 13px;
}
.van-card__thumb {
  width: 100px;
  height: 100px;
}
.van-card__title {
  font-size: 14px;
  font-weight: bold;
  color: #4b566a;
  line-height: 17px;
}

//商品列表信息 宫格方式展示
.product_list {
  margin: 0 3% 0 3%;
  margin-top: 113px;
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

// 搜索结果为空
.null-search {
  padding: 20px;
  text-align: center;
  font-size: 15px;
  color: #999;
  margin-top: 103px;
}
</style>