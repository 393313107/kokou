import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import shopdetails from "../views/shopdetails.vue";
import shoppingBag from "../views/pages/shoppingBag.vue";
import advanceOrder from "../views/pages/advanceOrder.vue";
import productList from "../views/ProductList.vue";
import degree from "../views/Degree.vue";
import mine from "../views/mine.vue";
import coupon from "../views/coupon.vue";
import mobileLogin from "../views/MobileLogin.vue";
import shopPay from "../views/pages/shopPay.vue";
import myorder from "../views/myOrder.vue";
import OrderDetails from "../views/OrderDetails.vue";
import address from "../views/address.vue";
import good from "../views/good.vue";
import goods from "../views/goods.vue";


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // component: (resolve) => require(["../views/Home.vue"], resolve),
    meta: {
      title: "首页 - KOKOU",
      keepAlive: true, //此组件需要被缓存
      isBack:false, //用于判断上一个页面是哪个
    },
  },
  // 购物车
  {
    path: "/shoppingbag",
    name: "shoppingBag",
    component: shoppingBag,
    // component: (resolve) =>
    //   require(["../views/pages/shoppingBag.vue"], resolve),
    meta: {
      title: "购物车 - KOKOU",
      keepAlive: true, //此组件需要被缓存
      isBack:false, //用于判断上一个页面是哪个
    },
  },
  // 预订单
  {
    path: "/advanceOrder",
    name: "advanceOrder",
    component: advanceOrder,
    // component: (resolve) =>
    //   require(["../views/pages/advanceOrder.vue"], resolve),
    meta: {
      title: "预订单 - KOKOU",
      keepAlive: true, //此组件需要被缓存
      isBack:false, //用于判断上一个页面是哪个
    },
  },
  // 商品列表
  {
    path: "/productList",
    name: "productList",
    component: productList,
    // component: (resolve) => require(["../views/ProductList.vue"], resolve),
    meta: {
      title: "商品列表 - KOKOU",
      keepAlive: true, //此组件需要被缓存
      isBack:false, //用于判断上一个页面是哪个
    },
  },
  // 商品详情
  {
    path: "/shopdetails",
    name: "shopdetails",
    component: shopdetails,
    // component: (resolve) => require(["../views/shopdetails.vue"], resolve),
    meta: {
      title: "商品详情 KOKOU",
      keepAlive: false, //此组件不需要被缓存

    },
  },
  // 度数管家
  {
    path: "/degree",
    name: "degree",
    component: degree,
    // component: (resolve) => require(["../views/Degree.vue"], resolve),
    meta: {
      title: "我的度数 - KOKOU",
      keepAlive: false, //此组件需要被缓存
    },
  },
  // 我的账户
  {
    path: "/mine",
    name: "mine",
    component: mine,
    // component: (resolve) => require(["../views/mine.vue"], resolve),
    meta: {
      title: "我的账户 - KOKOU",
      keepAlive: true, //此组件需要被缓存
      isBack:false, //用于判断上一个页面是哪个
    },
  },
  // 代金券
  {
    path: "/coupon",
    name: "coupon",
    component: coupon,
    // component: (resolve) => require(["../views/coupon.vue"], resolve),
    meta: {
      title: "代金券 - KOKOU",
      keepAlive: false, //此组件需要被缓存
    },
  },
  // 手机验证码
  {
    path: "/mobileLogin",
    name: "mobileLogin",
    component: mobileLogin,
    // component: (resolve) => require(["../views/MobileLogin.vue"], resolve),
    meta: {
      title: "手机验证码 - KOKOU",
      keepAlive: false, //此组件需要被缓存
    },
  },
  // 我的订单
  {
    path: "/myorder",
    name: "myorder",
    component: myorder,
    // component: (resolve) => require(["../views/myOrder.vue"], resolve),
    meta: {
      title: "我的订单 - KOKOU",
      keepAlive: true, //此组件需要被缓存
      isBack:false, //用于判断上一个页面是哪个
    },
  },
  // 订单详情
  {
    path: "/OrderDetails",
    name: "OrderDetails",
    component: OrderDetails,
    // component: (resolve) => require(["../views/OrderDetails.vue"], resolve),
    meta: {
      title: "订单详情 - KOKOU",
      keepAlive: true, //此组件需要被缓存
      isBack:false, //用于判断上一个页面是哪个
    },
  },
  // 收货地址
  {
    path: "/address",
    name: "address",
    component: address,
    // component: (resolve) => require(["../views/address.vue"], resolve),
    meta: {
      title: "收货地址 - KOKOU",
      keepAlive: false, //此组件需要被缓存
    },
  },
  // 支付宝链接
  {
    path: "/good",
    name: "good",
    component: good,
    // component: (resolve) => require(["../views/good.vue"], resolve),
    meta: {
      title: "支付提示 - KOKOU",
      keepAlive: false, //此组件需要被缓存
    },
  },
  {
    path: "/goods",
    name: "goods",
    component: goods,
    // component: (resolve) => require(["../views/good.vue"], resolve),
    meta: {
      title: "支付提示 - KOKOU",
      keepAlive: false, //此组件需要被缓存
    },
  },
  // 支付页面
  {
    path: "/shopPay",
    name: "shopPay",
    component: shopPay,
    // component: (resolve) => require(["../views/pages/shopPay.vue"], resolve),
    meta: {
      title: "支付方式 - KOKOU",
      keepAlive: false, //此组件需要被缓存
    },
  },
  {
    path: "/index",
    name: "index",
    component: (resolve) => require(["../views/index.vue"], resolve),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router;
