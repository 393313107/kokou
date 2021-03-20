<template>
  <div>
    <!--    <div style="width: 100%; height: 100%">-->
    <!--      <el-backtop :bottom="60"></el-backtop>-->
    <!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <div style="height: 50px; margin-bottom: 5px"></div>
    <!-- 页头 -->
    <div class="breadcrumb">
      <router-link :to="{ path: '/mine' }"
      ><span style="color: #00000075">我的账户</span></router-link
      >
      <span style="color: #00000073"> / </span>
      <router-link :to="{ path: '/myorder' }"
      ><span style="color: #00000075">我的订单</span></router-link
      >
      <span style="color: #00000073"> / </span>

      <span style="color: #00000075">订单详情</span>
      <span style="color: #00000073"> / </span>
      <span style="color: #000000a6">支付</span>
    </div>
    <!-- 组件 -->
    <div class="pay">
      <div class="price">待支付金额：￥{{ getHeJi }}</div>
      <div
        class="mode"
        style="margin-bottom: 30px"
        @click="radio = '1'"
        :class="radio == '1' ? 'mode_after' : ''"
      >
        <img src="../../assets/weixin.png" width="40px" height="32px"/>
        <span style="margin-left: 5px;">微<i style="margin-right: 2px;"></i>信</span>
      </div>
      <div
        class="mode"
        @click="radio = '2'"
        :class="radio == '2' ? 'mode_after' : ' '"
      >
        <img
          src="../../assets/zhifubao.png"
          width="32px"
          height="32px"
          style="margin-right: 5px"
        />
        <span style="margin-left: 5px;">支<i style="margin-right: 2px;"></i>付<i style="margin-right: 2px;"></i>宝</span>
      </div>
      <div style="text-align: center; margin: 40px auto">
        <el-button
          element-loading-background="rgb(55, 55, 55)"
          v-loading="loading"
          class="bt_pay"
          @click="sendPay()">
          <span v-show="!loading">
            立<i style="margin-right: 2px;"></i>即<i style="margin-right: 2px;"></i>支<i style="margin-right: 2px;"></i>付
          </span>
        </el-button>
      </div>
    </div>
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import ap from '@/utils/ap'
import heads from '@/components/head'
import bottoms from '@/components/bottom'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {log} from 'util'

export default {
  components: {
    heads,
    bottoms
  },
  data() {
    return {
      radio: '1',
      wxPay: '',
      type: '',
      abb: {},
      i: '1',
      timerpay: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['getHeJi', 'getPay'])
  },
  mounted() {
    // this.timerpay = setInterval(() => {
    //   setTimeout(this.queryPay, 0);
    // }, 10000);
    // 监听（绑定）滚轮 滚动事件
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount()
    })
    this.handClick()
  },
  beforeDestroy() {
    clearInterval(this.timerpay) // 清除定时器
    this.timerpay = ''
  },
  methods: {
    queryPay() {
      if (this.wxPay.out_trade_no !== '') {
        this.$get(this.api.pay_find, {
          out_trade_no: this.wxPay.out_trade_no
        })
          .then((res) => {
            if (res.data.message == '支付成功') {
              console.log('支付成功')
              // 跳转
              this.$router.push({
                path: '/OrderDetails',
                query: {order_id: this.wxPay.out_trade_no}
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    handClick() {
      let oldTop = 0 //旧数据，初始为0
      // 将自定义方法绑定到窗口滚动条事件
      window.onscroll = () => {
        let top = document.scrollingElement.scrollTop //触发滚动条，记录数值
        if(top > 0){
          this.$refs.badgeChange.fix = 1;
        }else{
          this.$refs.badgeChange.fix = 0;
        }
        //旧数据大于当前位置，表示滚动条top向上滚动
        if (oldTop >= top) {
          // console.log(top);
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = true
          })
        } else if (top > 50) {
          console.log(top)
          //相反...
          this.$nextTick(() => {
            this.$refs.badgeChange.header_ = false
          })
        }
        oldTop = top //更新旧的位置
      }
    },
    sendPay() {
      this.loading = true
      this.abb = this.getPay
      if (this.radio == '1') {
        this.abb.type = 'wxpay'
      } else {
        this.abb.type = 'alipay'
      }

      //支付
      this.$post(this.api.pay, this.abb)
        .then((res) => {
          this.wxPay = res.data.pay
          //微信支付
          if (res.data.type == 'wxpay') {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              {
                appId: this.wxPay.appid, //公众号名称，由商户传入
                timeStamp: this.wxPay.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: this.wxPay.nonceStr, //随机串
                package: this.wxPay.package,
                signType: this.wxPay.signType, //微信签名方式：
                paySign: this.wxPay.paySign //微信签名
              },
              (res) => {
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  // alert('ok')
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  // window.location.href =
                  //   "http://kokou.cn/#/OrderDetails?order_id=" +
                  //   this.wxPay.out_trade_no;

                  this.$router.push({
                    path: '/OrderDetails',
                    query: {order_id: this.wxPay.out_trade_no}
                  })
                  console.log('ok')
                }
              }
            )
            //支付宝支付
          } else if (res.data.type == 'alipay') {
            console.log(this.wxPay, 'haosw')
            // alert(this.wxPay, "请复制链接在浏览器打开！");
            this.$store.dispatch('setWxPay', this.wxPay)
            window.localStorage.setItem('getWxPay', this.wxPay)
            this.$router.push({
              path: '/goods'
            })
            // var gotoUrl = this.wxPay;
            // _AP.pay(gotoUrl);
            // query: { wxPay: this.wxPay },
          }
        })
        .catch((err) => {
          if (err.data.error == 'mobile') {
            this.$router.push('/mobileLogin')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    callpay() {
      if (typeof WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', sendPay, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', sendPay)
          document.attachEvent('onWeixinJSBridgeReady', sendPay)
        }
      } else {
        sendPay()
      }
    }
  }
}
</script>

<style lang="scss">
// .bt_pay {
//   text-align: center;
//   margin: 0 auto;
// }

// .bt_pay /deep/ .el-button:hover {
//   background-color: #111111 !important;
//   width: 311px !important;
//   height: 48px !important;
//   border-radius: 5px !important;
//   color: #ffffff !important;
//   margin: 40px 0 !important;
// }
.bt_pay {
  width: 85vw;
  background-color: #111111 !important;
  color: #fff !important;
  // background-color: #111111 !important;
  // width: 311px !important;
  height: 48px !important;
  border-radius: 5px !important;
  font-size: 15px !important;
  // color: #ffffff !important;
  // margin: 40px 0 !important;
}

.mode span {
  color: #000000a6;
  font-size: 22px;
}

.mode_after span {
  // color: #c51f1f !important;
}

.mode_after {
  border: 1px solid #111 !important;
}

.mode {
  width: 311px;
  height: 94px;
  border: 1px dashed #d5d0d0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}

.price {
  font-weight: 500;
  color: #000000a6;
  font-size: 15px;
  padding: 40px 0;
  text-align: center;
}

.pay {
  background-color: #fff;
  padding-bottom: 20px;
}

//   页头
.breadcrumb span {
  font-size: 14px;
}

.breadcrumb {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #eaeaea;
  padding: 0 16px;
  background-color: #fff;
}
</style>
<style scoped lang="scss">
/deep/ .bt-button .el-loading-spinner {
  top: 70% !important;
}
/deep/ .el-loading-spinner .path {
  stroke: #ffffff;
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
/deep/ .el-loading-mask {
  border-radius: 2px;
  box-shadow: 0 0 5px 3px #EEEEEE;
}
</style>
