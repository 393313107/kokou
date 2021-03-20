<template>
  <div>
    <!-- 官网首页头部-->
    <!-- 淡入淡出动画 -->
    <transition name="fade">
      <div class="flex-between header" :class="fix==1?'fix':'abo'" v-show="header_">
        <div class="header-left">
          <img src="../assets/list.png" @click="getSidebar()" />
        </div>
        <router-link to="/" class="header-t">
          <img class="title_img" src="../assets/title.png" alt="">
        </router-link>

        <div class="header-right" @click="handeGoShoppingBag">
          <img src="../assets/good.png" />

          <el-badge :value="count" :max="99" class="item" v-show="badge">
          </el-badge>
        </div>
      </div>
    </transition>
    <!-- 抽屉 -->
    <el-drawer
      title="我是标题"
      size="59%"
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      :before-close="handleClosed"
    >
      <div @click="handelDel()" class="close">
        <i class="el-icon-close"></i>
      </div>

      <div style="margin-top: 50px" class="login">
        <div class="login-head" @click="headImg">
          <img :src="head_img" width="100%" height="100%" />
        </div>
        <p class="login-no">{{ name }}</p>
      </div>

      <!-- <div class="login" v-else>
        <div class="login-head"><i class="el-icon-user"></i></div>
        <div class="login-no">请先前往我的账户</div>
      </div> -->

      <div class="menu" @click="home_Jump">
        <!-- <i class="el-icon-menu"></i> -->
        <span>首页</span>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
      >
        <!-- 这里是一级的名字 -->
        <el-submenu
          v-for="(item, index) in navigation"
          :key="index"
          :index="String(item.id)"
        >
          <!-- 这里是一级的名字 -->
          <template slot="title">
            <!-- <i class="el-icon-menu"></i> -->
            <span>{{ item.name }}</span>
          </template>
          <!-- 这里遍历出二级 -->
          <el-menu-item-group
            v-for="(p, listIndex) in item.list"
            :key="listIndex"
            @click.native="handetiaozhuan(p.id)"
          >
            <el-menu-item :index="String(p.id)">{{ p.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item class="line" @click="toMine" index="/mine">我的账户</el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      header_: true,
      drawer: false,
      fix:0, // 是否悬浮，当top>5的时候悬浮
      direction: "ltr",
      navigation: [], //顶部侧边栏
      count: 0,
      badge: false,
      dataList: [],
      head_img: "",
      name: "",
    };
  },
  computed: {
    ...mapGetters(["getIsAuthenticate", "getUser"]),
  },

  mounted() {
    this.getShopList();
    //核心开始------------------------------------

    if (localStorage.getItem("User_head_img")) {
      this.head_img = localStorage.getItem("User_head_img");
      this.name = localStorage.getItem("User_name");
    } else {
      this.head_img = this.getUser.head_img;
      this.name = this.getUser.name;
    }
  },

  methods: {
    toMine () {
      this.$router.push({
        path: "/mine",
      });
      this.header_ = true;
      this.drawer = !this.drawer;
    },
    headImg() {
      this.$router.push({
        path: "/mine",
      });
      this.header_ = true;
      this.drawer = !this.drawer;
    },
    home_Jump() {
      this.$router.push({
        path: "/",
      });
      this.header_ = true;
      this.drawer = !this.drawer;
    },
    handelDel() {
      this.header_ = true;
      this.drawer = !this.drawer;
    },
    // 获取列表
    getShopList() {
      this.$get(this.api.shop_list, {})
        .then((res) => {
          this.dataList = res.data;
          if (this.dataList.length == 0) {
            this.badge = false;
          }
          this.getCount();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 购物车查看数量
    getCount() {
      this.$get(this.api.shop_count, {})
        .then((res) => {
          this.count = res.data.count;
          if (this.count == 0) {
            this.badge = false;
          } else {
            this.badge = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取侧边栏
    getSidebar() {
      this.drawer = !this.drawer;
      this.header_ = false;
      this.$get(this.api.sidebar)
        .then((res) => {
          this.navigation = JSON.parse(JSON.stringify(res.data));
          this.navigation = this.navigation.filter(item => {
            return item.id !== 47
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClosed() {
      this.header_ = true;
      this.drawer = !this.drawer;
    },
    handleOpen(key, keyPath) {},
    // 跳转到订单列表
    handetiaozhuan(id) {
      this.drawer = !this.drawer;
      this.header_ = !this.header_;
      this.$router.push({
        path: "/productList",
        query: { id: id },
      });
    },
    handleClose(key, keyPath) {},
    handeGoShoppingBag() {
      this.$router.push("/shoppingbag");
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-50px);
}
/deep/ .el-submenu.is-active .el-submenu__title {
  border-bottom-color: rgb(231, 231, 231);
}
/deep/ :focus {
  outline: 0;
}
// 头像
.login-no {
  font-size: 16px;
  color: #000000a6;
  text-align: center;
  margin: 0 auto;
  padding-top: 10px;
}
.login-head i {
  font-size: 50px;
  color: #000000a6;
}
.login-head {
  width: 80px;
  height: 80px;
  line-height: 80px;
  // border-radius: 50%;
  border: 2px solid #000000a6;
  text-align: center;
  margin: 0 auto;
}
.login {
  // display: flex;
  // align-items: center;
  height: 80px;
  background-color: #fff;
  padding: 16px;
  // margin-top: 50px;
}

.close /deep/ [class^="el-icon-"] {
  font-size: 20px;
  float: right;
  margin-right: 10px;
}

.title_img {
  width: 155px;
}

.menu span {
  font-size: 14px;
  vertical-align: middle;
  color: #303133;
}
.menu /deep/ [class^="el-icon-"] {
  vertical-align: middle;
  margin-right: 0.13333rem;
  width: 0.64rem;
  text-align: center;
  font-size: 0.48rem;
  color: #909399;
}
.menu {
  height: 56px;
  line-height: 56px;
  // padding: 0 12px;
  margin: 80px 20px 0px 30px;
  border-bottom: 1px solid rgb(231, 231, 231);
}
/deep/ .el-submenu__title:hover {
  background-color: #fff;
  // color: red;
}
/deep/ .el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding: 0 0;
  // margin: 0 20px;
}

/deep/ .el-submenu__title,
.el-menu-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px !important;
}
/deep/ .el-submenu__icon-arrow {
  color: #111;
  font-size: 16px;
}

/deep/ .el-submenu__title {
  padding-left: 0 !important;
  font-size: 15px;
  margin: 0px 20px 0px 30px;
  border-bottom: 1px solid rgb(231, 231, 231);
}
/deep/ .el-submenu__icon-arrow {
  top: 60%;
  right: 5%;
}
/deep/ .el-menu-item-group__title {
  padding: 0;
}
/deep/ .el-drawer__body {
  margin-top: 20px;
  // height: 20px;
  // overflow: scroll;
}
.header-t {
  font-size: 20px;
  color: #333333;
  font-weight: 600;
  font-family: "Candara",serif;
  display: flex;
  align-items: center;
  // margin: 20px 0;
}
.header-right /deep/ .el-badge__content {
  background-color: #111;
  border: none;
  border-radius: 50%;
  // padding: 2px 6px;
}
.header-right /deep/ .el-badge {
  position: absolute;
  right: 20px;
  top: -5px;
}
.header-right img {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 25px;
  margin: 10px 0;
}
.header-right{
  width: 80px;
}
.header-left img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 25px;
  margin: 15px 0;
}
.header-left{
  width: 80px;
}
.fix{
  position: fixed;
}
.abo{
  position: absolute;
}
.header {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  // position: absolute;
  top: 0;
  z-index: 999;
  // transform: translate3d(0px, 0px, 0px);
  // transition: all 0.2s ease-in-out 0s;
  box-shadow: 0 3px 6px 0 rgba(187, 187, 187, 0.12157);
  height: 52px;
  line-height: 52px;
}
.line {
  text-indent: -17px;
  border-bottom: 1px solid rgb(231,231,231);
  margin: 0 20px 0 30px;
  font-size: 14px;
}
</style>
