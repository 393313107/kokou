<template>
  <!-- 商品详情 -->
  <div>
    <!--    <div style="width: 100%; height: 100%">-->
    <!--      <el-backtop :bottom="20"></el-backtop>-->
    <!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <div style="height: 53px;width:100%;background:#fff"></div>

    <div class="bg" style="background-color: #ffffff">
      <el-carousel
        height="375px"
        indicator-position="none"
        arrow="never"
        :autoplay="true"
        ref="remarkCarusel"
        :interval="4800"
        @change="lisChange"
      >
        <el-carousel-item
          v-for="(items, index) in img_list_local[arritem]"
          :key="index"
          v-loading="imgLoading"
        >
          <img :src="items" width="100%" height="100%" />
        </el-carousel-item>
      </el-carousel>
      <div class="thumbnail">
        <div
          v-for="(k, index) in img_list_local[arritem]"
          :key="index"
          @click="lisChange(index)"
        >
          <div style="margin-right: 5px">
            <img
              :src="k"
              width="50px"
              height="50px"
              :class="Arindex == index ? 'abb' : 'ljj'"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="wenzi">
      <div class="details-flex">
        <div class="title">
          <p class="text-none">
            {{ $route.query.title }}
          </p>
          <p
            style="
              font-size: 95%;
              color: #d1d1d1;
              font-weight: 300;
              padding-left: 10px;
            "
          >
            {{ code_list[arritem] }}
          </p>
          <!-- <div
          style="font-size: 12px; color: rgba(0, 0, 0, 0.45)"
          class="text-none"
        >
          库存：{{ inventory[arritem] }}
        </div> -->
        </div>

        <div class="flex">
          <div
            v-for="(item, index) in color_list"
            :key="index"
            style="margin-left: 10px"
            @click="handleColor(item, index)"
          >
            <div
              class="color_circle"
              :class="arritem == index ? 'color_border_1' : 'color_border_2'"
              :style="{ background: item }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bt-shop">
      <div class="bt-el_button">
        <el-button
          element-loading-background="rgba(55, 55, 55)"
          v-loading="loading"
          customClass="loading"
          :disabled="disabled"
          @click="goShoppingbag"
          :class="['yesBt', loading ? 'load' : '']"
          v-show="bt_all"
        >
          <span v-show="!loading" class="bt-price">
            <span style="font-weight: 300; font-size: 19.2px">￥ </span>
            <strong style="font-size: 19.2px; font-weight: normal">{{
              $route.query.price
            }}</strong>
            <!-- <span style="font-size: 17px;">499</span> -->
          </span>
          <span v-show="!loading" style="color: #555; font-size: 21px">
            |
          </span>
          <span
            v-show="!loading"
            class="bt-buy"
            style="font-size: 16px; font-weight: 300"
            >立 即 购 买</span
          >
        </el-button>
        <el-button disabled v-show="bt_over" class="noBt">
          <span class="bt-price" style="font-size: 18px; font-family: Candara">
            <span style="font-size: 19.2px">￥ </span>
            <span style="font-family: Arial; font-size: 19.2px">{{
              $route.query.price
            }}</span>
          </span>
          <span style="color: #3f3f3f; font-size: 150%; font-family: Candara">
            |
          </span>
          <span class="bt-buy" style="font-size: 18px; font-family: Candara"
            >一时售罄</span
          >
        </el-button>
      </div>

      <el-card class="box-card">
        <i class="el-icon-s-promotion"></i>
        <div class="text-shop">
          <p>{{ $route.query.desc }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import heads from "../components/head";
export default {
  components: {
    heads,
  },
  data() {
    return {
      // BG: true,
      bt_buy: true,
      // skeletonShow: true,
      imgLoading: false,
      loading: false,
      bt_over: false,
      bt_all: false,
      color_list: [],
      dataList: [],
      img_list: [],
      inventory: [],
      code_list: [],
      inventoryList: [],
      img_list_local: [],
      arritem: 0,
      timer: null,
      time: 10,
      color: "",
      i: "1",
      Arindex: 0,
      img:require('../assets/logo.png')
    };
  },
  computed: {
    disabled() {
      return this.loading;
    },
  },
  created() {
    document.title = this.$route.query.title + ' ' + " KOKOU";
  },

  mounted() {
    this.getGoods();
    this.inventoryList = JSON.parse(localStorage.getItem("inventory"));
    this.img_list_local = JSON.parse(localStorage.getItem("img_list"));
    this.color_list = JSON.parse(localStorage.getItem("color_list"));
    this.code_list = JSON.parse(localStorage.getItem("code_list"));
  
    this.inventoryList.forEach((item) => {
      if (item == 0) {
        this.bt_over = true;
        this.bt_all = false;
      } else {
        this.bt_all = true;
        this.bt_over = false;
      }
    });

    // 监听（绑定）滚轮 滚动事件
    this.handClick();
    this.share();
  },

  methods: {
    share() {
      var _this = this
      this.$get(this.api.config, {
        url: window.location.href,
      }).then((res) => {
        if (res.code !== 0) return;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wx1ca48ea15878c6c7", // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.sign, // 必填，签名
          jsApiList: ["onMenuShareAppMessage"], // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          wx.onMenuShareAppMessage({
            title: "KOKOU 眼镜", // 分享标题
            desc: '型号：'+_this.$route.query.title, // 分享描述
            imgUrl: "https://ftp.bmp.ovh/imgs/2021/03/f34a8ad46dc307f9.jpg", // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            },
          });
        });
      });
    },
    handClick() {
      let oldTop = 0; //旧数据，初始为0
      // 将自定义方法绑定到窗口滚动条事件
      window.onscroll = () => {
        let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值

        if (top > 0) {
          this.$refs.badgeChange.fix = 1;
        } else {
          this.$refs.badgeChange.fix = 0;
        }

        //旧数据大于当前位置，表示滚动条top向上滚动
        if (oldTop >= top) {
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = true;
          });
        } else if (top > 50) {
          //相反...
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = false;
          });
        }
        oldTop = top; //更新旧的位置
      };
    },
    lisChange(index) {
      console.log(11, index);
      this.items = index;
      this.$refs.remarkCarusel.setActiveItem(index);
      this.Arindex = index;
    },
    getGoods() {
      this.$get(this.api.get_goods, {
        id: this.$route.query.id,
      })
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          this.inventoryList = res.data.inventory;
          this.inventoryList.forEach((item) => {
            if (item == 0) {
              this.bt_over = true;
              this.bt_all = false;
            } else {
              this.bt_all = true;
              this.bt_over = false;
            }
          });
          this.img_list_local = res.data.img_list;
          this.color_list = res.data.color_list;
          this.code_list = res.data.code_list;
          this.dataList = res.data;
          console.log(this.dataList, 345);
          // if (this.dataList.length !== 0) {
          //   this.BG = true;
          //   this.skeletonShow = false;
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleColor(item, index) {
      this.color = item;
      this.arritem = index;
      this.imgLoading = true;
      setTimeout(() => {
        this.imgLoading = false;
      }, 300);
    },
    goShoppingbag() {
      this.loading = !this.loading;
      if (this.color === "") {
        if (this.color_list.length > 0) {
          this.color = this.color_list[0];
        }
      }
      this.$post(this.api.shop_add, {
        goods_id: this.$route.query.id,
        color: this.color,
      })
        .then((res) => {
          // 跳转
          this.bt();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    bt() {
      // this.timer = setTimeout(() => {
      //跳转的页面写在此处
      this.$router.push({
        path: "/shoppingbag",
        query: { id: 1 },
      });
      // }, 400);
      this.bt_buy = false;
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer); // 清除定时器
    this.timer = null;
  },
};
</script>


<style lang="scss">
.el-loading-spinner {
  top: 70% !important;
}
.el-loading-mask.is-fullscreen > .el-loading-spinner {
  top: 50% !important;
}
.el-loading-spinner .circular {
  height: 25px !important;
  width: 25px !important;
}
.el-notification__content {
  margin: 2px 0 0 0 !important;
}
.el-notification {
  width: 50% !important;
  padding: 10px !important;
}
.el-notification.right {
  top: 10% !important;
  right: 25% !important;
}

.el-button + .el-button {
  margin-left: 0 !important;
}
.el-button.is-disabled {
  color: rgba(0, 0, 0, 0.25) !important;
  background-color: #f5f5f5 !important;
  // border-color: #d9d9d9 !important;
  text-shadow: none !important;
  box-shadow: none !important;
  font-size: 16px !important;
}
</style>

<style lang="scss" scoped>
.box-card /deep/ [class^="el-icon-"] {
  font-size: 18px;
  padding-bottom: 10px;
  color: #f79605;
}
.van /deep/ .van-skeleton__row {
  height: 100%;
  width: 100% !important;
}
.skeleton /deep/ .van-skeleton {
  padding: 0;
}
.noBt {
  width: 90vw;
  height: 48px;
  border-radius: 4px;
}

// /deep/ .el-loading-mask {
//   border: 1px solid #fff;
//   background-color: #f5f5f5;
//   color: #111 !important;
// }
/deep/ .el-loading-spinner .path {
  stroke: #ffffff;
}
// .yesBt /deep/ .el-button:hover {
//   // border: none;
//   // background: #fff;
//   color: #111 !important;
//   //   color: #111;
//   border: 1px solid #111;
// }
.yesBt span {
  color: #fff;
}
/deep/ .el-button:active {
  background: rgb(55, 55, 55) !important;
  color: rgb(55, 55, 55) !important;
  border: 1px solid rgb(55, 55, 55) !important;
  padding: 1px 50px;
  box-shadow: 0 0 0 4px #cccccc !important;
  // height: 48px;
  font-size: 0 !important;
}
.yesBt.load {
  box-shadow: 0 0 0 4px #cccccc !important;
}
.yesBt {
  width: 92vw;
  background-color: #111 !important;
  color: #fff !important;
  height: 48px;
  border-color: #111 !important;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045) !important;
  border-radius: 4px !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
/deep/ .el-loading-mask {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: none;
}
.bt-price {
  display: inline-block;
  width: 125px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: normal;
  font-family: "Avenir Next", Avenir, "Segoe UI", Roboto, -apple-system,
    BlinkMacSystemFont, sans-serif;
}
.bt-buy {
  display: inline-block;
  width: 125px;
  padding-left: 10px;
  letter-spacing: 2px;
}
body {
  position: relative;
}
.bt-el_button {
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bt-shop {
  width: 100%;
  background-color: #fff;
  // position: fixed;
  // bottom: 0;
  padding-bottom: 40px;
}
.bt-shop /deep/ .el-card {
  margin: 0 20px 0 20px;
}
.text-shop p {
  font-size: 125%;
  font-weight: 500;
  color: #3f3f3f;
  letter-spacing: 1px;
}
.text-shop {
  // height: 100px;
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 2;
  // overflow: hidden;
  padding: 0 10px;
}
.title p {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 150%;
}
.title {
  display: flex;
  align-items: center;
}
.details-flex {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f9f9f9;
}
.thumbnail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  background-color: #fff;
}
.flex {
  display: flex;
}

.ljj {
  opacity: 0.3;
}
// 选择不透明
.abb {
  width: 46px;
  height: 46px;
  opacity: 1 !important;
}

.color_circle {
  width: 19px;
  height: 19px;
  border-radius: 50%;
}
.color_border_2 {
  box-shadow: 0 0 0 1px #f8f8f8;
}
.color_border_1 {
  box-shadow: 0 0 0 3px #cccccc;
}
</style>
