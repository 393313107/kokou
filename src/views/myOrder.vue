<template>
  <!-- 官网首页-->
  <div class="home">
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
      <span style="color: #000000a6">我的订单</span>
    </div>

    <!-- 内容 -->
    <div class="order" v-for="item in orderData" :key="item.order_id">
      <div class="orderTop">
        <div class="ot-left">
          <router-link
            :to="{ path: '/OrderDetails', query: { order_id: item.order_id } }"
          >
            <h2>#{{ item.order_id }}</h2></router-link
          >
          <span>￥{{ item.total_price }}</span
          ><span style="margin: 0 3px"> / </span
          ><span>{{ item.create_time }}</span>
        </div>
        <div class="ot-right">
          <span class="money_price" style="margin-right: 10px; color: rgba(0, 0, 0, 0.65)"
            >￥{{ item.total_price }}</span
          >
          <van-button class="order_btn" @click="payDate(item.order_id)" v-if="item.status == '0'"
            >待支付</van-button
          >
          <van-button class="order_btn" v-else>已支付</van-button>
        </div>
      </div>
      <div
        class="orderBottom"
        v-for="items in item.goods_info"
        :key="items.goods_id"
      >
        <img :src="items.img" />
        <div class="ob-right">
          <p style="margin-bottom: 10px;font-weight: 500">{{ items.title }}</p>
          <div>
            <span class="money">￥{{ items.price }}</span
            ><span class="color money" :style="{ background: items.color }"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import heads from "../components/head";
import bottoms from "../components/bottom";
export default {
  components: {
    heads,
    bottoms,
  },
  data() {
    return {
      i: "1",
      orderData: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "OrderDetails") {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是ProductList,shopdetails过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    next();
  },
  created() {
    this.isFirstEnter = true;
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
  },
  mounted() {
    this.orderList();
  },
  activated() {
    this.handClick();
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount();
    });
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.orderData = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.orderList();
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
  },
  methods: {
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
    //订单查询
    orderList() {
      this.$get(this.api.orderList)
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          this.orderData = res.data;
        })
        .catch((err) => {});
    },
    //跳订单详情
    payDate(order_id) {
      this.$router.push({
        path: "/OrderDetails",
        query: { order_id: order_id },
      });
    },
  },
};
</script>

<style lang="scss">
.color {
  border: 1px;
  display: inline-block;
  border-radius: 100px;
  box-shadow: 0 0 0 2px #8c8c8c;
  line-height: 1;
  padding: 10px;
  margin: 0 10px 0 20px;
  // background-color: #333;
}
.ob-right div {
  display: flex;
  align-items: center;
}
.ob-right {
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
  margin-left: 30px;
}
.money {
  font-weight: 500;
  font-size: 16px;
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
.ot-right /deep/ .el-button:hover,
.el-button:active {
  padding: 6px 10px;
  color: #fff;
  background-color: #111;
  border-color: #111;
  // text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  // box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ot-right /deep/ .el-button {
  padding: 6px 10px;
  color: #fff;
  background-color: #111;
  border-color: #111;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.order_btn {
  border: none;
  background-color: #222222;
  color: #FFFFFF;
  border-radius: 4px;
  height: 32px;
}
.ot-right span {
  font-size: 14px;
}
.ot-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.ot-right .money_price {
  font-size: 16px !important;
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

