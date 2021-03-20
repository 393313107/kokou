<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
  </div>
</template>


<script>
window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
};
export default {
  // provide() {
  //   return {
  //     reload: this.reload,
  //   };
  // },
  methods: {
    // reload() {
    //   console.log('reload');
    //   this.$route.meta.keepAlive = false;
    //   this.$nextTick(function () {
    //     this.$route.meta.keepAlive = true;
    //   });
    // },
  },
};
</script>

<style>
@import "./assets/app.css";
</style>
<style lang="scss">

.el-message {
  top: 10% !important;
}
#nprogress .bar {
  background: #111 !important;
}
body {
  // background-color: #fff;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-text-size-adjust: none;
  line-height: 1.5;
}
.el-scrollbar {
  //element-ui 下拉框在ios上 点击两次才能选中
  > .el-scrollbar__bar {
    opacity: 1 !important;
  }
}
.el-backtop {
  left: 20px !important;
  width: 10px !important;
  height: 10px !important;
}
</style>
