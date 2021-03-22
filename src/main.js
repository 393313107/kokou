import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./assets/element-variables.scss";
import "lib-flexible/flexible.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { post, get, del, put } from "./utils/http";
import api from "./utils/api";
// 引入自定义全局的css
import "@/css/app.scss";
import { Skeleton, Button, Icon, Popup } from "vant";
import { Lazyload } from "vant";

Vue.use(Lazyload);

Vue.use(Skeleton);
Vue.use(Button)
Vue.use(Icon)
Vue.use(Popup)

Vue.use(ElementUI);
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.prototype.api = api;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$del = del;
Vue.prototype.$put = put;

Vue.config.productionTip = false;

NProgress.configure({
  easing: "ease", // 动画方式
  speed: 200, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

//当路由进入前
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  window.scrollTo(0, 0);
  // 每次切换页面时，调用进度条
  NProgress.start();
  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});


// const sess = window.sessionStorage;

// Vue.mixin({
//   beforeRouteLeave(to, from, next) {
//     //注册全局混合方法，由于页面都进行了缓存，页面返回时将当前页面销毁
//     const toRoute = to.path;
//     const fromRoute = from.path;
//     const h = JSON.parse(sess.getItem);
//     if (h && h.history) {
//       this.$destroy();
//       next();
//     } else {
//       next();
//     }
//     next();
//   },
// });
// const beforeEach = function(to, from, next) {
//   const toRoute = to.path;
//   const fromRoute = from.path;
//   let h = JSON.parse(sess.getItem);
//   if (h && h.history) {
//     h.history = false;
//     sess.removeItem(toRoute);
//   } else {
//     sess.setItem(
//       fromRoute || "/",
//       JSON.stringify({
//         history: true,
//       })
//     );
//   }
//   next();
// };
// router.beforeEach(beforeEach);

const Auth = {
  getCode() {
    // 1 判断有没token 没有需要登录
    // 2 判断有没code 没有需要授权链接
    // 3 有token时直接显示页面
    // if (window.location.hash == "#/good") {
    //   console.log(1123);
    //   new Vue({
    //     router,
    //     store,
    //     render: (h) => h(App),
    //   }).$mount("#app");
    // } else {
    let token = window.localStorage.getItem("token");
    // let openid = 'obGIJw1ypbKTnCU9NR33QpxTaA-M'
    // let token = 'yQdekpQrM2fUpxJzobB5CbQLiTDoZWe0SH1dgaSbbTfKZAqjZQBa3gGn0uMFYdv8'
    // window.localStorage.setItem("token", openid);
    // window.localStorage.setItem("openid", token);
    if (!token) {
      // 非静默授权，第一次有弹框
      let code = this.getUrlCode().code;
      if (code == null || code === "") {
        var local = window.location.href; // 获取页面url
        var appid = "wx1ca48ea15878c6c7";
        console.log(local)
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect`;
      } else {
        // 你自己的业务逻辑
        post(api.code, {
          code: code,
        }).then((res) => {
          if (res.message == "登陆成功") {
            // 将登录成功后的token存入localStorage
            window.localStorage.setItem("token", res.data.access_token);
            window.localStorage.setItem("openid", res.data.openid);
            //存储到vuex中
            store.dispatch("setIsAuthenticate", true);
            store.dispatch("setUser", res.data);
            window.localStorage.setItem("User_head_img", res.data.head_img);
            window.localStorage.setItem("User_name", res.data.name);
            store.dispatch("setOpenid", res.data.openid);
            window.location.reload();
          }
        });
      }
    } else {
      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount("#app");
    }
    // }
  },

  getUrlCode() {
    // 截取url中的code方法
    var url = location.search;
    this.winUrl = url;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
    }
    return theRequest;
  },
};

Auth.getCode();

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");
