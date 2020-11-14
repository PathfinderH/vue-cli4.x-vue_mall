<template>
  <div class="coll-container">
    <!-- 搜索框 -->
    <van-search
      class="search-fixex"
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      background="#F1F3F4"
      @search="onSearch"
      @clear="onClear"
      @input="onChange"
      shape="round"
    >
      <template #left>
        <van-icon name="arrow-left" @click="$router.push('/mine')" />
      </template>
      <template #left-icon>
        <div></div>
      </template>
      <template #action>
        <van-icon name="search" @click="onSearch" />
      </template>
    </van-search>
    <!-- 搜索框结束-->
    <!-- 收藏夹内容区 -->
    <div class="coll-content">
      <!--导航栏  -->
      <div class="nav-bar van-hairline--bottom">
        <span class="mycoll">我的收藏</span>
        <span class="manage" @click="activeChecked">{{
          !objClass.checkActive ? "管理" : "完成"
        }}</span>
      </div>

      <!-- 收藏列表 -->
      <div class="coll-list">
        <van-swipe-cell v-for="(item, index) in collectionlist" :key="index">
          <van-card
            :class="objClass"
            :price="item.price"
            :title="item.title"
            class="goods-card"
            :thumb="$axios.defaults.baseURL + item.img_url"
            :thumb-link="'/#/home/product/' + item.id"
          >
            <template #footer>
              <van-checkbox
                v-show="objClass.checkActive"
                checked-color="#FF6B00"
                ref="checkbox"
                v-model="$store.getters.getCollectionCheck[item.id]"
                @click="
                  selectedClick(
                    item.id,
                    $store.getters.getCollectionCheck[item.id]
                  )
                "
                class="checkeds"
              ></van-checkbox>
              <van-button size="mini" @click="$toast('暂无后续逻辑~')"
                >找相似</van-button
              >
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="removeColl(item.id)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <!-- 收藏夹没有商品时 -->
      <p class="hint" v-show="!nullflag">{{ collectionText }}</p>
    </div>
    <!-- 收藏夹内容区结束 -->
    <!-- 底部删除按钮和全选 -->
    <van-submit-bar
      v-show="objClass.checkActive"
      button-text="删除"
      @submit="onSubmit"
    >
      <van-checkbox
        checked-color="#FF6B00"
        v-model="$store.state.coll_check_all"
        @click="checkAll"
        >全选</van-checkbox
      >
    </van-submit-bar>
    <!-- 底部删除按钮和全选结束 -->
    <!-- 没有搜索结果时 -->
    <div class="search-result-null" v-show="nullflag">
      <img src="../../assets/img/home_imgs/null_logo.webp" />
      <p>没有搜索结果</p>
      <span>没有找到相关的搜索结果</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeClass: "checkActive", //点击管理之后的样式
      objClass: {
        checkActive: false,
      },

      value: "", //搜索框值

      nullflag: false, //控制收藏夹为空时的文字显示与隐藏

      collectionlist: [], //收藏商品数据
    };
  },

  created() {

    this.getCollectionList();
    this.$store.commit("getCollAllSelected_false"); //判断全选按钮
  },

  methods: {
    //删除收藏商品
    removeColl(id) {
      this.$dialog
        .alert({
          title: "确定删除选中的宝贝吗",
          cancelButtonText: "我再想想",
          showCancelButton: true,
        })
        .then(() => {
          this.$store.commit("removeCollection", id);
          this.$toast.success("取消收藏成功");
          this.getCollectionList();
        })
        .catch(() => {
          // on cancel
        });
    },

    //获取收藏商品数据
    async getCollectionList() {
      let idArr = [];
      this.$store.state.collection.forEach((item) => {
        if (item.selected == true) {
          idArr.push(item.id);
        }
      });

      //收藏夹商品直接返回
      if (idArr.length <= 0) {
        this.collectionlist = [];
        return;
      }

      const { data: res } = await this.$axios.get(
        "/getShopcar/" + idArr.join(",")
      );
      if (res.status != 200) return this.$toast.fail("获取数据失败");
      this.collectionlist = res.data.reverse();
    },

    //查询函数
    query(key) {
      return this.collectionlist.filter((item) => {
        if (item.title.includes(key)) {
          return item;
        }
      });
    },

    //调用查询函数进行搜索
    onSearch() {
      if (this.value == "") return this.$toast("请输入搜索关键词~");
      if (this.query(this.value).length == 0) {
        this.nullflag = true;
      }
      this.collectionlist = this.query(this.value);
    },

    //清空搜索框
    onClear() {
      this.collectionlist = [];
      this.getCollectionList();
    },

    //监听搜索框为空时，还原收藏夹内容
    onChange() {
      if (this.value == "") {
        this.collectionlist = [];
        this.nullflag = false;
        this.getCollectionList();
      }
    },

    //展示删除选中按钮
    activeChecked() {
      this.objClass.checkActive = !this.objClass.checkActive;
    },

    //将勾选的商品按钮状态selected更新到state中
    selectedClick(id, val) {
      this.$store.commit("updateCollectionSelected", {
        id,
        checkbox: val,
      });
      this.$store.commit("getCollAllSelected_false");
      this.$store.dispatch("updateDatabaseInfo", "collection");
    },

    //全选按钮
    checkAll() {
      this.$store.commit(
        "updateCollAllSelected",
        this.$store.state.coll_check_all
      );
      this.$store.dispatch("updateDatabaseInfo", "collection");
    },

    //删除按钮
    onSubmit() {
      const arr = [];
      // 将选中状态的收藏商品筛选出来
      this.$store.state.collection.forEach((item) => {
        if (item.checkbox == true) {
          arr.push(item);
        }
        return arr;
      });

      if (arr.length == 0) {
        return this.$toast("请先选择宝贝哦~");
      }

      this.$dialog
        .alert({
          title: "确定删除选中的宝贝吗",
          cancelButtonText: "我再想想",
          showCancelButton: true,
        })
        .then(() => {
          //将未被选中的商品筛选出来
          let newCollection = [];
          this.$store.state.collection.forEach((element) => {
            if (!element.checkbox) {
              newCollection.push(element);
            }
            return newCollection;
          });
          // 将未被筛选的商品提交到vuex中进行替换
          this.$store.commit("removeCollectionMore", newCollection);
          //重新为收藏夹列表赋值
          this.collectionlist = newCollection;

          //判断全选按钮
          this.$store.commit("getCollAllSelected_false");
          this.getCollectionList();
          this.$toast.success("取消收藏成功");

          if (this.collectionlist.length == 0) {
            this.objClass.checkActive = false;
          }
        })
        .catch(() => {
          // on cancel
        });
    },
  },

  watch: {
    //监听收藏夹的变化 收藏夹发生变化时将数据提交到数据库
    "$store.state.collection"() {
      this.$store.dispatch("updateDatabaseInfo", "collection");
    },
  },

  computed: {
    collectionText() {
      return this.collectionlist.length == 0
        ? "收藏夹暂时没有商品~"
        : "客官 到底啦~";
    },
  },
};
</script>

<style lang="less" scoped>
.search-fixex {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
}
.van-icon-arrow-left {
  padding-right: 10px;
  font-size: 20px;
}
.van-search__action {
  font-size: 24px;
  display: flex;
}

.nav-bar {
  box-sizing: border-box;
  padding: 15px;
  font-size: 13.5px;
  color: #666666;
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  .manage {
    float: right;
    font-size: 15px;
    color: #000;
  }
  .mycoll {
    color: #ff5a0f;
  }
}

//侧边删除
.goods-card {
  margin: 0;
  background-color: #fff;
  font-size: 14.2px;
  .van-card__thumb {
    width: 120px;
    height: 120px;
  }
  .van-card__footer {
    position: relative;
  }
  .van-button--default {
    border-radius: 100px;
    color: #999;
    padding: 5px 10px;
    font-size: 11px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.delete-button {
  height: 100%;
}

.van-card__bottom {
  padding-bottom: 50px;
  .van-card__price {
    color: #ff783b;
    .van-card__price-integer {
      font-size: 19px;
    }
  }
}
// 收藏列表父盒子样式
.coll-content {
  margin-top: 54px;
  .hint {
    font-size: 13px;
    color: #999;
    text-align: center;
    padding: 10px 0;
    background-color: #f4f4f4;
  }
}

//复选框样式
.checkActive {
  padding-left: 40px;
}
.van-card__footer .checkeds {
  position: absolute;
  bottom: 60px;
  left: -30px;
  // transform: translateY(50%);
  margin-bottom: -10px;
}
.van-submit-bar__bar {
  border-top: 1px solid #e6e6e6;
}
.van-submit-bar .van-checkbox {
  position: absolute;
  left: 20px;
}

//没有搜索结果
.search-result-null {
  padding-top: 30px;
  text-align: center;
  color: #999;
  img {
    width: 110px;
  }
  p {
    margin: 0;
    font-size: 17px;
  }
  span {
    font-size: 13.5px;
  }
}
</style>