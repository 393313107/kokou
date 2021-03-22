<template>
  <!-- 官网首页-->
  <div class="font">
<!--    <div style="width: 100%; height: 100%">-->
<!--      <el-backtop :bottom="60"></el-backtop>-->
<!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <div style="height: 50px; margin-bottom: 5px"></div>
    <!-- 列表 -->
    <div class="mine">我的账户</div>
<!--    <div class="sames">-->
<!--      18153881007-->
<!--    </div>-->
<!--    <a href="javascript:void(0)" class="same">-->
<!--      <div class="name weight">13111111111</div>-->
<!--      <div class="icon"><i class="el-icon-arrow-right" style="display: none"></i></div>-->
<!--    </a>-->
    <router-link :to="{ path: '/myorder' }" class="same">
      <div class="name">我的订单</div>
      <div class="icon"><i class="el-icon-arrow-right"></i></div>
    </router-link>
    <router-link :to="{ path: '/address' }" class="same">
      <div class="name">收货地址</div>
      <div class="icon"><i class="el-icon-arrow-right"></i></div>
    </router-link>
    <router-link :to="{ path: '/degree' }" class="same">
      <div class="name">我的度数</div>
      <div class="icon"><i class="el-icon-arrow-right"></i></div>
    </router-link>
    <router-link :to="{ path: '/coupon' }" class="same">
      <div class="name">代金券</div>
      <div class="icon"><i class="el-icon-arrow-right"></i></div>
    </router-link>

    <!-- <div class="bts">
      <el-button>退出登录</el-button>
    </div> -->
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import heads from "../components/head";
import bottoms from "../components/bottom";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    heads,
    bottoms,
  },
  data() {
    return {
      i: "1",
      head_img: "",
      name: "",
    };
  },
  computed: {
    ...mapGetters(["getIsAuthenticate", "getUser"]),
  },
  mounted() {
    // 监听（绑定）滚轮 滚动事件
    this.handClick();
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount();
    });
    if (localStorage.getItem("User_head_img")) {
      this.head_img = localStorage.getItem("User_head_img");
      this.name = localStorage.getItem("User_name");
    } else {
      this.head_img = this.getUser.head_img;
      this.name = this.getUser.name;
    }
    // }
    this.share()
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
            desc: '我的账户', // 分享描述
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
  },
};
</script>

<style lang="scss">
// .bts /deep/ .el-button {
//   margin: 50px auto;
//   padding: 0 80px;
//   height: 38px;
//   font-size: 14px;
//   border-radius: 4px;
//   color: rgba(0, 0, 0, 0.65);
//   border: 1px solid #d9d9d9;
// }
.bts {
  height: 38px;
  background-color: #fff;
  text-align: center;
  margin-bottom: 50px;
}
.name {
  font-size: 14px;
  color: #000000a6;
}
.weight {
  font-weight: 600;
}
.same {
  height: 15px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  margin: 0 auto;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.login_mine-no {
  font-size: 16px;
  color: #000000a6;
  margin-left: 10px;
}
// .login-head i {
//   font-size: 50px;
//   color: #000000a6;
// }
// .login-head {
//   width: 60px;
//   height: 60px;
//   line-height: 60px;
//   border-radius: 50%;
//   border: 2px solid #000000a6;
//   text-align: center;
// }
.login_mine {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 16px;
}
.mine {
  text-align: center;
  margin: 0 auto;
  font-size: 16px;
  padding: 16px;
  color: #000000a6;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>

