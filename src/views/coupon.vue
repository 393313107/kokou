<template>
  <!-- 官网首页-->
  <div class="home">
<!--    <div style="width: 100%; height: 100%">-->
<!--      <el-backtop :bottom="60"></el-backtop>-->
<!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <div style="height: 60px; margin-bottom: 5px"></div>
    <!-- 页头 -->
    <div class="breadcrumb">
      <router-link :to="{ path: '/mine' }"
        ><span style="color: #00000075">我的账户</span></router-link
      >
      <span style="color: #00000073"> / </span>
      <span style="color: #000000a6">代金券</span>
    </div>
    <!-- 组件 -->
    <div class="coupon">
      <coupon></coupon>
    </div>
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import heads from "../components/head";
import bottoms from "../components/bottom";
import coupon from "../components/coupon";
export default {
  components: {
    heads,
    bottoms,
    coupon,
  },
  data() {
    return {
      i: "1",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount();
    });
    // 监听（绑定）滚轮 滚动事件
    this.handClick();
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
  },
};
</script>

<style lang="scss">
.coupon {
  padding: 50px 23px;
  background-color: #fff;
  margin-bottom: 40px;
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

