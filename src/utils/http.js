import axios from "axios";
import QS from "qs";
// import store from '../store/index'
import { Message } from "element-ui";
import router from "../router/index";

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'http://api.123dailu.com/';
// }

// 请求超时时间
axios.defaults.timeout = 30000;

// post请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 写死token 待优化
// axios.defaults.headers.post["token"] =
//   "6PMOO0d8wZehJFzFLPmKp1lzCsrMCs9SNRuXQRgEZ+lIR+n7uaOSjpBpJaBFo481";
// axios.defaults.headers.get["token"] =
//   "6PMOO0d8wZehJFzFLPmKp1lzCsrMCs9SNRuXQRgEZ+lIR+n7uaOSjpBpJaBFo481";

// axios.defaults.headers.delete["token"] =
//   "6PMOO0d8wZehJFzFLPmKp1lzCsrMCs9SNRuXQRgEZ+lIR+n7uaOSjpBpJaBFo481";
// axios.defaults.headers.put["token"] =
//   "6PMOO0d8wZehJFzFLPmKp1lzCsrMCs9SNRuXQRgEZ+lIR+n7uaOSjpBpJaBFo481";

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      // console.log(localStorage.getItem("token"), 111);
      //  存在将token写入 request header
      config.headers.common["token"] = `${localStorage.getItem("token")}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是0的情况
  (error) => {
    if (error.data.code) {
      switch (error.data.code) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case -1:
          this.$message.error(res.data.message);
          break;
        case 401:
          Message.error("请重新登录");
          localStorage.removeItem("token");
          router.replace("/mine");
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        switch (res.data.code) {
          case 0:
            resolve(res.data);
            break;
          case -1:
            this.$message.error("出错啦");
          case 500:
            this.$message.error("出错啦");
            break;
          case 404:
            this.$message.error("页面不存在");
            break;
          case 403:
            this.$message.error("出错啦");
            break;
          case 401:
            Message.error("请重新登录");
            sessionStorage.removeItem("token");
            router.replace("/mine");
            break;
          case 405:
            this.$message.error("出错啦");
            break;
          case 406:
            this.$message.error("出错啦");
            break;
        }
      })
      .catch((err) => {
        reject(err.data);
        // this.$message({
        //   showClose: true,
        //   message: "请求失败，请退出页面重新进行请求",
        //   type: "error",
        // });
      });
  });
}
/**
 * post方法，对应post请求
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        switch (res.data.code) {
          case 0:
            resolve(res.data);
            break;
          case -1:
            this.$message.error("出错啦");
            break;
          case 500:
            this.$message.error("出错啦");
            break;
          case 404:
            this.$message.error("页面不存在");
            break;
          case 403:
            this.$message.error("出错啦");
            break;
          case 401:
            Message.error("请重新登录");
            sessionStorage.removeItem("token");
            router.replace("/mine");
            break;
          case 405:
            this.$message.error("出错啦");
            break;
          case 406:
            this.$message.error("出错啦");
            break;
        }
      })
      .catch((err) => {
        reject(err.data);
        // this.$message({
        //   showClose: true,
        //   message: "请求失败，请退出页面重新进行请求",
        //   type: "error",
        // });
      });
  });
}

/**
 * delete方法，对应delete请求
 */
export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((res) => {
        switch (res.data.code) {
          case 0:
            resolve(res.data);
            break;
          case -1:
            this.$message.error("出错啦");
            break;
          case 500:
            this.$message.error("出错啦");
            break;
          case 404:
            this.$message.error("页面不存在");
            router.replace({
              path: "/404",
            });
            break;
          case 403:
            this.$message.error("出错啦");
            break;
          case 401:
            Message.error("请重新登录");
            sessionStorage.removeItem("token");
            router.replace("/mine");
            break;
          case 405:
            this.$message.error("出错啦");
            break;
          case 406:
            this.$message.error("出错啦");
            break;
        }
      })
      .catch((err) => {
        reject(err.data);
        // this.$message({
        //   showClose: true,
        //   message: "请求失败，请退出页面重新进行请求",
        //   type: "error",
        // });
      });
  });
}

/**
 * put修改
 * @param {} url
 * @param {*} params
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        switch (res.data.code) {
          case 0:
            resolve(res.data);
            break;
          case -1:
            this.$message.error("出错啦");
            break;
          case 500:
            this.$message.error("出错啦");
            break;
          case 404:
            this.$message.error("页面不存在");
            break;
          case 403:
            this.$message.error("出错啦");
            break;
          case 401:
            Message.error("请重新登录");
            sessionStorage.removeItem("token");
            router.replace("/mine");
            break;
          case 405:
            this.$message.error("出错啦");
            break;
          case 406:
            this.$message.error("出错啦");
            break;
        }
      })
      .catch((err) => {
        reject(err.data);
        // this.$message({
        //   showClose: true,
        //   message: "请求失败，请退出页面重新进行请求",
        //   type: "error",
        // });
      });
  });
}
