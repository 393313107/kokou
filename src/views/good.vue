<template>
  <div>
    <div class="pay-center" v-show="isWeiXi">
      <img src="../assets/PaymentArrow.png" class="pay-img" />
      <div style="height: 70px"></div>
      <div style="text-align: center; margin: 0 auto">
        <p class="text">
          请在菜单中选择在浏览器中打开,<br />
          以完成支付
        </p>
        <img src="../assets/Payment.jpg" class="pay-img1" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      getWxPay: "",
      isWeiXi: true,
      link: "",
      theRequest: {},
    };
  },
  computed: {
    // ...mapGetters(["getWxPay"]),
  },

  // created() {
  //   // 拿去当前地址参数
  //   this.getUrlParams();
  //   if (JSON.stringify(this.theRequest) != "{}") {
  //     this.isWeiXin();
  //   }
  // },
  mounted() {
    // this.getCode();
    this.isWeiXin();
    console.log(window.location.hash, 546);
    console.log(this.$store.state.wxPay, "329");
    // this.link = this.getWxPay(wxPay);
    // console.log(this.link, "11");
    // console.log(this.getWxPay,'22');
    // if (localStorage.getItem("getWxPay")) {
    //   this.link = localStorage.getItem("getWxPay");
    //   console.log(this.link, "存在local里");
    // } else {
    //   this.link = this.$route.query.wxPay;
    //   console.log(this.link, "vuex");
    // }
    // localStorage.removeItem("token");
    // 更新一下当前浏览器地址（防止在微信里调用外部浏览器的时候出现意外bug）
  },
  methods: {
    // getCode() {
    //   this.$post(this.api.code, {
    //     code: this.theRequest.code,
    //   })
    //     .then((res) => {
    //       if (res.message == "登陆成功") {
    //         // 将登录成功后的token存入localStorage
    //         window.localStorage.setItem("token", res.data.access_token);
    //         window.localStorage.setItem("openid", res.data.openid);
    //         window.location.reload();
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // getGood() {
    //   if (window.location.hash == "#/good") {
    //     console.log(1123);
    //     localStorage.removeItem("openid");
    //   }
    // },
    // getUrlParams() {
    //   // 清除旧的缓存数据
    //   window.localStorage.clear();
    //   let theRequest = new Object();
    //   let url = location.href; //获取url中"?"符后的字串
    //   let strs = [];
    //   if (url.indexOf("?") != -1) {
    //     var str = url.substr(parseInt(url.indexOf("?") + 1));
    //     strs = str.split("&");
    //     for (var i = 0; i < strs.length; i++) {
    //       theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    //     }
    //   }
    //   this.theRequest = theRequest;
    //   console.log(this.theRequest);
    // },
    // 监控微信浏览器
    isWeiXin() {
      let ua = window.navigator.userAgent.toLowerCase();
      console.log(ua,23478);
      if (ua.match(/MicroMessenger/i) != "micromessenger") {
        console.log(123);
        this.isWeiXi = false;
        // window.localStorage.getItem("openid");

        // window.localStorage.setItem("code", this.theRequest.code);
        window.location.href = this.$store.state.wxPay;
        // window.location.replace(window.location.origin+ "#/good?goto=" + c);
        // console.log(window.location.href);
      } else {
        console.log(98766);
        this.isWeiXi = true;
        // window.location.href = this.$store.state.wxPay;
      }
    },
  },
};
</script>




<style lang="scss" scoped>
.pay-img1 {
  width: 175px;
  height: 245px;
  margin-top: 10px;
}
.pay-img {
  position: absolute;
  right: 15px;
  top: 20px;
}
.pay-center {
  position: relative;
}
.text {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
}
</style>