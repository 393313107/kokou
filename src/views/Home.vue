<template>
  <!-- 官网首页-->
  <div class="home">
<!--    <div style="width: 100%; height: 100%">-->
<!--      <el-backtop :bottom="20"></el-backtop>-->
<!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <!-- Skeleton 骨架屏 -->
    <div class="skeleton" v-show="skeletonShow">
      <van-skeleton :row="1" />
    </div>
    <!-- 轮播图 -->
    <el-carousel
      height="462px"
      class="cs-list"
      indicator-position="none"
      arrow="never"
    >
      <el-carousel-item v-for="item in carousel" :key="item.id">
        <img :src="item.img" />
        <!-- <h3>{{ item.title }}</h3> -->
        <!-- <h5>{{item.name}}</h5> -->
      </el-carousel-item>
    </el-carousel>
    <!-- 内容 -->
    <div v-for="item in content" :key="item.id" class="content-list">
      <img :src="item.img" @click="homeImg(item)" />
      <!-- <h3>{{ item.title }}</h3>
      <h5>{{ item.info }}</h5> -->
    </div>
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import heads from "../components/head";
import bottoms from "../components/bottom";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { log } from "util";
import { opendirSync } from "fs";
export default {
  components: {
    heads,
    bottoms,
  },
  data() {
    return {
      carousel: [], //轮播图
      content: [], //内容
      i: "1",
      skeletonShow: true,
      isFirstEnter: false, // 是否第一次进入，默认false
      // getOpenID:''
    };
  },
  computed: {
    ...mapGetters(["getIsAuthenticate", "getUser", "getOpenID"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "productList") {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是ProductList,shopdetails过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }

    next();
  },
  created() {
    this.isFirstEnter = true;
    this.getAddDefault() // 获取默认收获地址
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
  },
  mounted() {
    // 监听（绑定）滚轮 滚动事件
    this.getHome();
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
      this.carousel = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.content = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.getHome();
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
  },
  methods: {
    // 获取默认地址
    getAddDefault() {
      this.$get(this.api.addr_default, {})
        .then((res) => {
          let msg = res.data;
          this.$store.dispatch('setAddDefault',msg)
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
            desc: '首页', // 分享描述
            imgUrl: "http://image.kokou.cn//20210322/PUL9EZ3HK.jpg", // 分享图标
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
          // console.log(top);
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = true;
          });
        } else if (top > 50) {
          console.log(top);
          //相反...
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = false;
          });
        }
        oldTop = top; //更新旧的位置
      };
    },
    getHome() {
      this.$get(this.api.home)
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          if (res.data !== "") {
            this.skeletonShow = false;
          }
          this.carousel = res.data.carousel;
          this.navigation = res.data.navigation;
          this.content = res.data.content;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    homeImg(item) {
      console.log(item);
      // window.localStorage.setItem("inventory", JSON.stringify(item.inventory));
      // window.localStorage.setItem("img_list", JSON.stringify(item.img_list));
      // window.localStorage.setItem(
      //   "color_list",
      //   JSON.stringify(item.color_list)
      // );
      // window.localStorage.setItem("code_list", JSON.stringify(item.code_list));
      this.$router.push({
        path: "/productList",
        query: {
          id: item.goods_id,
          // price: item.price,
          // title: item.title,
          // code_list: item.code_list,
          // desc: item.desc,
        },
      });
    },
  },
  unmounted() {
    // window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}

.skeleton /deep/ .van-skeleton {
  height: 800px;
  padding: 0;
}
// 内容
.content-list h5 {
  font-size: 16px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: #52525280;
}
.content-list h3 {
  font-size: 18px;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  color: #111;
}
.content-list img {
  width: 100%;
  height: 100%;
}
.content-list {
  height: 300px;
  position: relative;
}
// 轮播图
.cs-list /deep/ .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #333;
}
.cs-list h5 {
  font-size: 16px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.cs-list h3 {
  font-size: 20px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.cs-list img {
  width: 100%;
  height: 100%;
}
.cs-list {
  position: relative;
  // margin-bottom: 10px;
}
</style>

