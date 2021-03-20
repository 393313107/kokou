<template>
  <!-- 官网首页-->
  <div class="home" v-show="orderShow">
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <div style="height: 50px; margin-bottom: 5px"></div>
    <!-- 页头 -->
    <div class="breadcrumb">
      <router-link :to="{ path: '/mine' }"
        ><span style="color: #00000075">我的账户</span></router-link
      >
      <span style="color: #00000075"> / </span>
      <router-link :to="{ path: '/myorder' }"
        ><span style="color: #00000075">我的订单</span></router-link
      >
      <span style="color: #00000073"> / </span>
      <span style="color: #000000a6">订单详情</span>
    </div>
    <el-alert
      title="滑向底部添加度数信息"
      type="warning"
      :closable="false"
      center
      show-icon
      v-show="alert"
    >
    </el-alert>
    <!-- 内容 -->
    <div class="order">
      <div class="orderTop">
        <div class="ot-left">
          <h2>#{{ orderInfoData.order_id }}</h2>
          <span>￥{{ orderInfoData.total_price }}</span
          ><span style="margin: 0 3px"> / </span
          ><span>{{ orderInfoData.create_time }}</span>
        </div>
        <div class="ot-right" v-cloak>
          <span style="margin-right: 10px; color: rgba(0, 0, 0, 0.65)"
            >￥{{ orderInfoData.total_price }}</span
          >
          <el-button v-if="orderInfoData.status != '0'" style="background-color: #ffffff;color: #222222; border: 1px solid #999999">
            已支付
          </el-button>
        </div>
      </div>
      <div class="orderBottom" v-for="item in goods_info" :key="item.goods_id">
        <img :src="item.img" />
        <div class="ob-right">
          <p style="margin-bottom: 10px">
            {{ item.title }}
          </p>
          <div>
            <span>￥{{ item.price }}</span
            ><span :style="{ background: item.color }" class="color"></span>
          </div>
        </div>
      </div>

      <div class="orderMessage">
        <p>
          收货地址：<span>{{ orderInfoData.province }}</span
          ><span>{{ orderInfoData.city }}</span
          ><span>{{ orderInfoData.county }}</span
          ><span>{{ orderInfoData.info }}</span> /
          <span>{{ orderInfoData.name }}</span>
        </p>
        <p>({{ orderInfoData.mobile }})</p>
        <div style="margin: 20px 0">
          <p>下单时间：{{ orderInfoData.create_time }}</p>
          <p>商品数量：{{ orderInfoData.goods_count }}</p>
          <p>商品总额：￥{{ heji }}</p>
          <p>应付金额：￥{{ orderInfoData.total_price }}</p>
        </div>

        <!-- 度数信息 -->
        <!-- <div class="bt" v-if="orderInfoData.select_number == 0 ">
          <el-button @click="dialogVisibleData = true"
            ><i class="el-icon-plus"></i>添加度数信息</el-button
          >
        </div> -->
        <div
          class="row"
          @click="numData()"
          v-show="numBt"
          style="
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-top: 1px dashed #e4e3e3;
            color: #cc1212;
          "
        >
          <van-button class="addDS" block>添加度数信息</van-button>
          <!--          <div>添加度数信息</div>
          <i class="el-icon-plus"></i>-->
        </div>

        <div v-show="numList">
          <el-row>
            <el-col :span="24">
              <el-card shadow="always">
                <div class="mes">
                  <p style="color: #666; margin-bottom: 10px">
                    {{ orderInfoData.number_id }}
                  </p>
                  <div class="dot"></div>
                  <p style="color: #666; font-size: 12px">验光</p>
                  <p style="color: #666; font-size: 12px; margin: 0 0 10px 3px">
                    {{ orderInfoData.source }}
                  </p>
                </div>

                <!-- 为空显示类容 -->
                <div v-if="orderInfoData.img == ''" class="table">
                  <div class="row">
                    <div
                      class="tab-left"
                      style="
                        border-top: 1px solid #cccccc;
                        border-top-left-radius: 3px;
                      "
                    >
                      {{
                        orderInfoData.json.right.type ==
                        orderInfoData.json.left.type
                          ? orderInfoData.json.right.type
                          : orderInfoData.json.right.type +
                            "/" +
                            orderInfoData.json.left.type
                      }}
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px solid #f895a1"
                    >
                      <span class="R-left">R 右眼</span>
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px solid #afb6e5"
                    >
                      <span class="R-left" style="background: #3745ab"
                        >L 左眼</span
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="border-top: 1px dashed #ccc; color: #666"
                    >
                      度数
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px dashed #f895a1"
                    >
                      {{ orderInfoData.json.right.number }}
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px dashed #afb6e5"
                    >
                      {{ orderInfoData.json.left.number }}
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="border-top: 1px dashed #ccc; color: #666"
                    >
                      散光
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px dashed #f895a1"
                    >
                      {{ orderInfoData.json.right.number }}
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px dashed #afb6e5"
                    >
                      {{ orderInfoData.json.left.number }}
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="border-top: 1px dashed #ccc; color: #666"
                    >
                      轴位
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px dashed #f895a1"
                    >
                      {{ orderInfoData.json.right.axial }}
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px dashed #afb6e5"
                    >
                      {{ orderInfoData.json.left.axial }}
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="
                        border-top: 1px dashed #ccc;
                        border-bottom: 1px solid #cccccc;
                        border-bottom-left-radius: 3px;
                        color: #666;
                      "
                    >
                      瞳距
                    </div>
                    <div
                      class="tab-center"
                      style="
                        border-bottom: 1px solid #f895a1;
                        border-top: 1px dashed #f895a1;
                      "
                    >
                      {{ orderInfoData.json.right.interpupillary }}
                    </div>
                    <div
                      class="tab-right"
                      style="
                        border-bottom: 1px solid #afb6e5;
                        border-top: 1px dashed #afb6e5;
                      "
                    >
                      {{ orderInfoData.json.left.interpupillary }}
                    </div>
                  </div>
                </div>

                <div v-else>
                  <!-- 判断是否为空，不为空用图片 -->
                  <div style="height: 173px">
                    <img :src="orderInfoData.img" width="100%" height="100%" />
                  </div>
                </div>

                <div
                  style="color: #666; display: flex; margin-top: 15px"
                  class="NA"
                >
                  <i class="el-icon-edit"></i>
                  <p style="font-size: 13px">N/A</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div style="text-align: center">
          <el-button
            element-loading-background="rgb(55, 55, 55)"
            v-loading="toPayLoading"
            id="toPay"
            style="background-color: #222222; color: #FFFFFF;"
            @click="payStatus()"
            v-if="orderInfoData.status == '0'">
            去支付
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="选择度数信息"
      :visible.sync="dialogVisibleData"
      width="96%"
    >
      <degrees :tableData="tableData" v-on:values="hendaddd"></degrees>
    </el-dialog>

    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import heads from "../components/head";
import bottoms from "../components/bottom";
import degrees from "../components/degrees";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
// import { delete } from "vue/types/umd";
export default {
  components: {
    heads,
    bottoms,
    degrees,
  },
  computed: {
    ...mapGetters(["getHeJi"]),
  },

  data() {
    return {
      i: "1",
      orderInfoData: "",
      alert: false,
      goods_info: [],
      order_id: "",
      dialogVisibleData: false,
      tableData: [],
      mess: "",
      heji: 0,
      numBt: false,
      numList: false,
      orderShow: false,
      toPayLoading: false
    };
  },
  watch: {
    $route() {
      if (!this.$route.path == "/myorder") {
        // 我们在新页面接收参数， 并且将参数转为可用的json格式时， 可以用下面的方法：
        var url = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
        // var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          this.order_id = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；
          // var strs = str.split("&");
          // for (var i = 0; i < strs.length; i++) {
          //   theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
          // }
          console.log(this.order_id); //此时的str就是我们需要的参数；
        }
      }
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   if (to.name == "myorder") {
  //     this.orderInfo();
  //     console.log(123);
  //   } else {
  //     console.log(234);
  //     // 我们在新页面接收参数， 并且将参数转为可用的json格式时， 可以用下面的方法：
  //     var url = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
  //     // var theRequest = new Object();
  //     if (url.indexOf("?") != -1) {
  //       var str = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；
  //       // var strs = str.split("&");
  //       // for (var i = 0; i < strs.length; i++) {
  //       //   theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
  //       // }
  //       console.log(str); //此时的str就是我们需要的参数；
  //     }
  //   }
  //   next();
  // },
  activated() {
    console.log(this.$route.query.order_id);
    this.order_id = this.$route.query.order_id;
    // 监听（绑定）滚轮 滚动事件
    this.handClick();
    this.orderInfo();
  },
  methods: {
    numData() {
      this.dialogVisibleData = true;
    },
    hendaddd(e) {
      console.log(e, 1323);
      this.mess = e;
      this.dialogVisibleData = false;
      this.$put(this.api.orderUpdate, {
        order_id: this.$route.query.order_id,
        number_id: this.mess.id,
      })
        .then((res) => {
          this.orderInfo();
        })
        .catch((err) => {});
    },
    getList() {
      //度数管家列表
      this.$get(this.api.list, {})
        .then((res) => {})
        .catch((err) => {
          console.log(err);
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
    //订单详情
    orderInfo() {
      this.$get(this.api.orderInfo, {
        order_id: this.order_id,
      })
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          this.orderInfoData = res.data;
          if (this.orderInfoData.length !== 0) {
            this.orderShow = true;
          }
          // 判断有没有支付，没有就隐藏度数按钮
          if (this.orderInfoData.status == "0") {
            this.numBt = false; //选择度数按钮
            this.numList = false; //度数信息
          } else if (this.orderInfoData.select_number == 0) {
            this.numList = false;
            this.numBt = true;
            this.alert = true;
          } else {
            this.alert = true;
            this.numList = true;
            this.numBt = false;
          }
          this.goods_info = res.data.goods_info;
          this.goods_info.forEach((item) => {
            this.heji += parseInt(item.price);
            this.$store.dispatch("setHeJi", this.heji);
          });
        })
        .catch((err) => {});
    },
    payStatus() {
      this.toPayLoading = true
      const timeout = setTimeout(() => {
        const pas = {
          order_id: this.orderInfoData.order_id,
        };
        this.$store.dispatch("setPay", pas);
        this.toPayLoading = false
        clearTimeout(timeout)
        this.$router.push({
          path: "/shopPay",
        });
      }, 500)
    },
  },
};
</script>


<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.addDS {
  background-color: #222222;
  color: #FFFFFF;
  border-radius: 4px;
  font-size: 14px;
}
//度数
.NA /deep/ [class^="el-icon-"] {
  //font-size: 16px;
  margin-right: 5px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #52c41a;
  margin: 0 5px;
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
/deep/ .el-loading-spinner .path {
  stroke: #ffffff;
}
// 左眼
.leftEye {
  width: 140px;
  height: 347px;
  background: #f1f2fa;
  padding: 10px;
  margin: 0;
  border-radius: 3px;
  border: 1px solid #afb6e5;
}
// 右眼
.R-right {
  color: #999;
  position: relative;
  //font-size: 75%;
  line-height: 0;
  top: -3px;
  left: 2px;
  vertical-align: baseline;
}
#toPay {
  width: 90vw;
  height: 48px;
}
.R-left {
  width: 51px;
  height: 22px;
  background-color: #cc0e25;
  color: #ffffff;
  padding: 2px 5px;
  border-radius: 3px;
}

.R {
  margin-bottom: 10px;
}
.rightEye {
  width: 140px;
  height: 347px;
  background: #fde6e9;
  padding: 10px;
  margin: 0;
  border-radius: 3px;
  border: 1px solid #f895a1;
}
.mes {
  display: flex;
  margin-bottom: 5px;
  align-items: center;
}
.tab-right {
  width: 92px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #111;
  font-size: 13px;
  background: #f1f2fa;
  border-left: 1px solid #afb6e5;
  border-right: 1px solid #afb6e5;
}
.tab-center {
  width: 92px;
  height: 30px;
  line-height: 30px;
  color: #111;
  font-size: 13px;
  text-align: center;
  background: #fde6e9;
  border-left: 1px solid #f895a1;
  border-right: 1px solid #f895a1;
}
.tab-left {
  width: 92px;
  height: 30px;
  color: #111;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}

// 页面按钮
.bt /deep/ [class^="el-icon-"] {
  font-size: 16px;
  margin-right: 10px;
}
.bt /deep/ .el-button {
  background-color: #111111;
  width: 308px;
  height: 38px;
  border-radius: 5px;
  color: #ffffff;
  margin: 15px 0;
}
.bt {
  text-align: center;
  margin: 0 auto;
}

.orderMessage {
  margin-top: 10px;
  padding: 25px 16px 0 16px;
  line-height: 1.8;
  border-top: 1px dashed #eee;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.color {
  border: 1px;
  display: inline-block;
  border-radius: 100px;
  box-shadow: 0 0 0 2px #8c8c8c;
  line-height: 1;
  padding: 10px;
  margin: 0 10px 0 20px;
}
.ob-right div {
  display: flex;
  align-items: center;
}
.ob-right {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  margin-left: 30px;
}
.orderBottom img {
  width: 100px;
  height: 100px;
}

.orderBottom {
  height: 140px;
  display: flex;
  align-items: center;
  padding: 20px 20px;
  transition: all 0.1s;
}

.ot-right /deep/ .el-button {
  padding: 0.22rem 0.37rem;
  color: #fff;
  background-color: #111;
  border-color: #111;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ot-right span {
  font-size: 0.42667rem !important;
}
.ob-right p, .ob-right span {
  font-size: 0.42667rem !important;
}
.ot-left span {
  color: #ccc;
  font-size: 12px;
}
.ot-left h2 {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
}
.order .orderTop {
  display: flex;
  padding: 0 16px 25px 16px;
  justify-content: space-between;
  border-bottom: 1px dashed #eee;
}
.order {
  padding: 35px 0;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
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

