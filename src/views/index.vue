<template>
  <div class="goods">
    <div class="box-card">
      <div class="link">
        http://glasses.kokou.cn/api/v1/echo_html?pay_type=alipay&token=1c044d401fbdb8b0a6872dc5b9415533
        <div class="good-img">
          <img src="../assets/PaymentArrow.png" width="100%" height="100%" />
        </div>
      </div>
      <p>此链接在浏览器中打开</p>
    </div>

    <button
      class="good-bt"
      ref="copy"
      :data-clipboard-text="link"
      @click="copy"
      id="copy_text"
    >
      <p>复制链接</p>
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Clipboard from "clipboard";
import { Notify } from "vant";
export default {
  components: {
    [Notify.Component.name]: Notify.Component,
  },
  data() {
    return {
      link: "11",
    };
  },
  mounted() {
    // this.link = this.$store.state.wxPay;
    // window.open(this.link);
  },
  methods: {
    copy() {
      var _this = this;
      var clipboard = new Clipboard("#copy_text");

      clipboard.on("success", (e) => {
        Notify({ color: "#fff", background: "#000", message: "复制成功" });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        console.log(213);
        // 释放内存
        clipboard.destroy();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.good-img {
  // width: 25px;
  height: 40px;
  display: inline-block;
  position: absolute;
  left: 60%;
  bottom: -13%;
}
.good-bt {
  position: fixed;
  bottom: 0;
  height: 60px;
  background-color: #000;
  display: flex;
  width: 100%;
  line-height: 60px;
  justify-content: center;
}
.box-card p {
  padding-left: 20px;
  font-size: 16px;
  color: #999;
  letter-spacing: 1px;
}

.good-bt p {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin-left: 10px;
  letter-spacing: 1px;
}
.link {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  font-weight: 400;
  padding: 20px;
  margin: 10px 0;
  // border: 2px solid #ccc;
  position: relative;
}
.box-card {
  margin: 0 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.text {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
}
.goods {
  position: absolute;
  top: 30%;
}
body {
  position: relative;
}
</style>