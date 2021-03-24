<template>
  <!-- 商品列表 -->
  <div>
<!--    <div style="width: 100%; height: 100%">-->
<!--      <el-backtop :bottom="20"></el-backtop>-->
<!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <!-- Skeleton 骨架屏 -->
    <div class="skeleton" v-show="skeletonShow">
      <van-skeleton :row="1" class="van" />
    </div>

    <transition-group name="hehe">
      <div
        v-for="(item, index) in productlist"
        :key="index"
        style="position: relative"
        v-show="FadeOutFrame"
      >
        <!-- 轮播图 -->
        <div class="bg">
          <el-carousel
            height="375px"
            :autoplay="false"
            arrow="never"
            class="cs-list"
            ref="carousel"
            indicator-position="none"
          >
            <el-carousel-item
              v-for="(items, indexs) in item.img_list"
              :key="indexs"
              :name="index.toString() + indexs.toString()"
            >
              <img
                :src="items[0]"
                width="100%"
                height="100%"
                @click="router_img(item)"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="details-flex">
          <div class="title" style="font-family: 'Avenir Next', Avenir, 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif">
            <p>{{ item.title }}</p>
            <p
              style="
                color: rgba(0, 0, 0, 0.45);
                margin-top: 5px;
                font-size:14px
              "
            >
              ￥{{ item.price }}
            </p>
          </div>

          <div class="flex">
            <!-- 颜色 -->
            <div
              v-for="(c, row) in item.color_list"
              @click="ChangeImage(index, row)"
              style="margin-left: 10px"
              :key="row"
            >
              <div class="colors" :class="row == att ? 'color_border_1' : 'color_border_2'" :style="{ background: c }"></div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
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
      img_list: [],
      productlist: [],
      number: 0,
      i: "1",
      att: 0,
      skeletonShow: true,
      isFirstEnter: false, // 是否第一次进入，默认false
      FadeOutFrame: true,
    };
  },
  watch: {
    $route() {
      if (this.$route.path == "/productList" && this.$route.query.id) {
        var newid = this.$route.query.id; //当前id
        var oldid = sessionStorage.getItem("oldlistid"); //旧的id

        if (oldid != newid) {
          sessionStorage.setItem("oldlistid", this.$route.query.id);
          this.listid = this.$route.query.id;
          this.getCase();
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "shopdetails") {
      to.meta.isBack = true;

      //判断是从哪个路由过来的，
      //如果是shopdetails过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    next();
  },
  created() {
    this.isFirstEnter = true;
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
  },
  mounted() {
    // this.getCase();
    this.share()
  },
  activated() {
    this.handClick();
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount();
    });
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.productlist = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.img_list = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.getCase();
    }
    if (this.$route.query.id) {
      this.listid = this.$route.query.id;
      sessionStorage.setItem("oldlistid", this.$route.query.id);
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
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
          jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"], // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          wx.onMenuShareAppMessage({
            title: "KOKOU 眼镜", // 分享标题
            desc: '商品列表', // 分享描述
            imgUrl: "http://image.kokou.cn//20210324/MI87A1HLZ.jpg", // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            },
          });
          wx.onMenuShareTimeline({
            title: "KOKOU 眼镜", // 分享标题
            desc: '商品列表', // 分享描述
            imgUrl: "http://image.kokou.cn//20210324/MI87A1HLZ.jpg", // 分享图标
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
        if(top > 0){
          this.$refs.badgeChange.fix = 1;
        }else{
          this.$refs.badgeChange.fix = 0;
        }
        //旧数据大于当前位置，表示滚动条top向上滚动
        if (oldTop >= top) {
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = true;
          });
        } else {
          //相反...
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = false;
          });
        }
        oldTop = top; //更新旧的位置
      };
    },
    router_img(item) {
      console.log(item);
      window.localStorage.setItem("inventory", JSON.stringify(item.inventory));
      window.localStorage.setItem("img_list", JSON.stringify(item.img_list));
      window.localStorage.setItem(
        "color_list",
        JSON.stringify(item.color_list)
      );
      window.localStorage.setItem("code_list", JSON.stringify(item.code_list));
      this.$router.push({
        path: "/shopdetails",
        query: {
          id: item.id,
          price: item.price,
          title: item.title,
          code_list: item.code_list,
          desc: item.desc,
        },
      });
    },
    getCase() {
      this.$get(this.api.case, {
        case_id: this.$route.query.id,
      })
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          this.productlist = JSON.parse(JSON.stringify(res.data));
          this.productlist.map(item => {
            item.price = item.price.substring(0, item.price.indexOf('.'))
          })
          for (let i = 0; i < this.productlist.length; i++) {
            if (this.productlist[i].recommend == "0") {
              this.productlist.splice(i, 1);
            }
          }
          if (this.productlist.length !== 0) {
            this.skeletonShow = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    ChangeImage(index, row) {
      this.att = row;
      this.number = index; //代表的是第几个数组
      this.$refs.carousel[this.number].setActiveItem(
        index.toString() + row.toString()
      ); //row取的是这个数组的第几个值
      // index.toString()+row.toString()
      // 第n个数组里面，第n张图
    },
  },
};
</script>

<style lang="scss" scoped>
.color_border_2 {
  box-shadow: 0 0 0 1px #f8f8f8;
}
.color_border_1 {
  box-shadow: 0 0 0 3px #cccccc;
}
.hehe-enter {
  opacity: 0;
}
.hehe-enter-to {
  opacity: 1;
}
.hehe-enter-active {
  transition: all 1s;
}

.van /deep/ .van-skeleton__row {
  height: 100%;
  width: 100% !important;
}
.skeleton /deep/ .van-skeleton {
  padding: 0;
}
.flex {
  display: flex;
}
.title p {
  font-size: 16px;
  color: #111;
}
.details-flex {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
}
.colors {
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
