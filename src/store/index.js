import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //是否授权
    isAuthenticate: false,
    user: null,
    pay: null,
    openid: "",
    wxPay: "", //支付宝链接
    heji: "", //合计
  },
  //事件(同步操作)--存数据
  mutations: {
    setIsAuthenticate(state, data) {
      state.isAuthenticate = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    setHeJi(state, data) {
      state.heji = data;
    },
    setPay(state, data) {
      state.pay = data;
    },
    setOpenID(state, data) {
      state.openid = data;
    },
    setWxPay(state, data) {
      state.wxPay = data;
    },
  },
  //事件(异步操作)--写请求
  actions: {
    setIsAuthenticate({ commit }, data) {
      commit("setIsAuthenticate", data);
    },
    setUser({ commit }, data) {
      commit("setUser", data);
    },
    setHeJi({ commit }, data) {
      commit("setHeJi", data);
    },
    setPay({ commit }, data) {
      commit("setPay", data);
    },
    setOpenID({ commit }, data) {
      commit("setOpenID", data);
    },
    setWxPay({ commit }, data) {
      commit("setWxPay", data);
    },
   
  },
  // 过滤器/计算属性--取数据
  getters: {
    getIsAuthenticate(state) {
      return state.isAuthenticate;
    },
    getUser(state) {
      return state.user;
    },
    getHeJi(state) {
      return state.heji;
    },
    getPay(state) {
      return state.pay;
    },
    getOpenID(state) {
      return state.openid;
    },
    getWxPay(state) {
      return state.wxPay;
    },
    
  },
  modules: {},
});
