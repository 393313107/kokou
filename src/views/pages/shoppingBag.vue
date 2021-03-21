<!-- 购物袋--longpo -->
<template>
  <div
    v-loading="pageLoading"
    element-loading-background="transparent"
    style="
      width: 100%;
      height: 100%;
      background-color: #f8f8f8;
    "
  >
    <!--    <div style="width: 100%; height: 100%">-->
    <!--      <el-backtop :bottom="100"></el-backtop>-->
    <!--    </div>-->
    <!-- <div style="width:100%;height:51px"></div> -->
    <heads ref="badgeChange"></heads>
    <div class="shopping_content color-ababab">
      <div class="shopping_content_item" style="color: #666666">购物袋</div>
      <!-- true -->
      <div class="shopping_content_item" v-show="good_null">
        购物袋中没有商品
      </div>
      <!-- false -->
      <div class="shopping_content_row" v-show="good_list">
        <!-- 镜框 frame-->
        <div class="row_item" v-for="item in dataList" :key="item.id">
          <div class="row frame_content">
            <div class="frame_content_img">
              <img :src="item.img" width="100%" height="100%" />
            </div>
            <div class="row frame_content_row">
              <div class="row justify-between">
                <div class="color-000" style="font-size:14px;color: #666666;font-family:'Avenir Next', Avenir, 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif">
                  {{ item.title }}
                </div>
                <div @click="handleDelete(item.id)">
                  <i class="el-icon-close"></i>
                </div>
              </div>
              <div class="row cen">
                <div style="font-size:14px" class="money_price_text">￥{{ parseInt(item.price) }}</div>
                <div :style="{ background: item.color }" class="color"></div>
              </div>
              <div v-if="item.need_lens == '0'">
                <el-button class="frame_content_but" disabled>
                  锁定镜片
                </el-button>
              </div>
              <div v-else>
                <el-button
                  class="frame_content_but"
                  :disabled="
                    item.lens_id !== null || item.need_lens == '0'
                      ? true
                      : false
                  "
                  @click="handleLenslist(item)"
                >
                  {{ item.lens_id !== null ? "已选镜片" : "添加镜片" }}
                </el-button>
              </div>
            </div>
          </div>

          <div
            v-if="item.lens_id !== null"
            class="row frame_content border_top"
          >
            <div class="frame_content_img">
              <img :src="item.lens_img" width="100%" height="100%" />
            </div>
            <div class="row frame_content_row">
              <div class="row justify-between">
                <div class="color-000" style="color: #666666;font-size:14px">
                  {{ item.lens_title }}
                </div>
                <div @click="handleDelLens(item)">
                  <i class="el-icon-close"></i>
                </div>
              </div>
              <div style="font-size:12.6px" class="row">
                <div>{{ item.desc }}</div>
              </div>
              <div style="font-size:14px" class="row">
                <div>￥{{ parseInt(item.lens_price) }}</div>
                <div class="row justify-between items-center">
                  <div class="color-item"></div>
                  <div>透明</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :title="'为 ' + msg + ' 添加镜片'"
        :visible.sync="dialogVisible"
        width="95%"
        :before-close="handleClose"
      >
        <el-table :data="lenslist" :show-header="false" style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <div class="title" @click="handleLensAdd(scope.row)">
                <div>
                  <img :src="scope.row.img" width="100px" height="100px" />
                </div>
                <div>
                  <div style="color: rgba(0, 0, 0, 0.65); font-size: 14px">
                    {{ scope.row.title }}
                  </div>
                  <div style="color: #ababab; font-size: 12.6px">
                    {{ scope.row.desc }}
                  </div>
                  <div style="color: rgba(0, 0, 0, 0.65); font-size: 14px;margin-top:5px">
                    ￥{{ scope.row.price }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 按钮 -->
      <div style="height: 120px"></div>

      <div class="text-center">
        <div v-show="good_null">
          <el-button
            element-loading-background="rgb(55, 55, 55)"
            v-loading="loading"
            class="bt"
            @click="goProductlist"
          >
            <span v-if="!loading">继 续 选 购</span>
          </el-button>
        </div>

        <div v-show="good_list" class="shop_bt">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
              font-size: 14px;
            "
          >
            <p style="font-size: 90%; color: #ababab">合计金额</p>
            <p style="color: #565656"><em style="font-style: normal;color: #565656;font-size:90%;margin-right:3px">￥</em><strong style="font-weight: normal;font-size:108%">{{ total }}</strong></p>
          </div>
          <el-button
            element-loading-background="rgb(55, 55, 55)"
            v-loading="loading"
            @click="goAdvanceOrder"
            class="shopping_content_but"
          >
            <div v-show="bt_buy">前&emsp;往&emsp;结&emsp;账</div></el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import heads from "@/components/head";
import bottoms from "@/components/bottom";
export default {
  components: {
    heads,
    bottoms,
  },
  // inject: ["reload"],
  data() {
    return {
      loading: false,
      bt_buy: true,
      timer: null,
      dataList: [],
      goodsID: "",
      msg: "",
      dialogVisible: false,
      lenslist: [],
      i: "1",
      total: 0,
      count: 0,
      lensBt: true,
      lensBto: false,
      good_null: false,
      good_list: false,
      isFirstEnter: false, // 是否第一次进入，默认false
      pageLoading: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "advanceOrder") {
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
    // this.demomsg()
    this.getShopList();
  },
  activated() {
    this.handClick();
    this.bt_buy = true;
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount();
    });
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.dataList = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.lenslist = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.getShopList();
      // this.demomsg()
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
    this.loading = false;
  },
  methods: {
    handClick() {
      this.$refs.badgeChange.fix = 1
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
    demomsg() {
      const msg = [
        {
          id: 1718,
          goods_id: 108,
          color: "rgb(7, 6, 6)",
          title: "1",
          img: "http://image.kokou.cn//20210314/OMPDB9E16.jpg",
          price: "2.05",
          color_list: '["rgb(7, 6, 6)","rgb(33, 29, 176)"]',
          code_list: ["1", "1"],
          need_lens: "1",
          lens_img: null,
          lens_title: null,
          desc: null,
          lens_price: null,
          lens_id: null,
        },
        {
          id: 1715,
          goods_id: 95,
          color: "rgb(196, 35, 35)",
          title: "KP-5",
          img: "http://image.kokou.cn//20210309/MS8HLYEB5.jpg",
          price: "123.00",
          color_list: '["rgb(196, 35, 35)","rgb(44, 47, 213)"]',
          code_list: ["#156", "#765"],
          need_lens: "1",
          lens_img: null,
          lens_title: null,
          desc: null,
          lens_price: null,
          lens_id: null,
        },
        {
          id: 1698,
          goods_id: 95,
          color: "rgb(196, 35, 35)",
          title: "KP-5",
          img: "http://image.kokou.cn//20210309/MS8HLYEB5.jpg",
          price: "123.00",
          color_list: '["rgb(196, 35, 35)","rgb(44, 47, 213)"]',
          code_list: ["#156", "#765"],
          need_lens: "1",
          lens_img: null,
          lens_title: null,
          desc: null,
          lens_price: null,
          lens_id: null,
        },
        {
          id: 1698,
          goods_id: 95,
          color: "rgb(196, 35, 35)",
          title: "KP-5",
          img: "http://image.kokou.cn//20210309/MS8HLYEB5.jpg",
          price: "123.00",
          color_list: '["rgb(196, 35, 35)","rgb(44, 47, 213)"]',
          code_list: ["#156", "#765"],
          need_lens: "1",
          lens_img: null,
          lens_title: null,
          desc: null,
          lens_price: null,
          lens_id: null,
        },
        {
          id: 1698,
          goods_id: 95,
          color: "rgb(196, 35, 35)",
          title: "KP-5",
          img: "http://image.kokou.cn//20210309/MS8HLYEB5.jpg",
          price: "123.00",
          color_list: '["rgb(196, 35, 35)","rgb(44, 47, 213)"]',
          code_list: ["#156", "#765"],
          need_lens: "1",
          lens_img: null,
          lens_title: null,
          desc: null,
          lens_price: null,
          lens_id: null,
        },
        {
          id: 1698,
          goods_id: 95,
          color: "rgb(196, 35, 35)",
          title: "KP-5",
          img: "http://image.kokou.cn//20210309/MS8HLYEB5.jpg",
          price: "123.00",
          color_list: '["rgb(196, 35, 35)","rgb(44, 47, 213)"]',
          code_list: ["#156", "#765"],
          need_lens: "1",
          lens_img: null,
          lens_title: null,
          desc: null,
          lens_price: null,
          lens_id: null,
        }
      ];
      this.$nextTick(() => {
        this.$refs.badgeChange.getCount();
      });
      // this.dataList = res.data;
      this.dataList = msg;
      this.good_list = true;
      if (this.dataList.length === 0) {
        this.good_null = true;
        this.good_list = false;
      } else {
        this.good_list = true;
        this.good_null = false;
      }
      this.total = 0;
      // for (let i = 0; i < this.dataList.length; i++) {
      //   if (this.dataList[i].need_lens == "0") {
      //     this.lensBt = false;
      //     this.lensBto = true;
      //   }
      // }
      this.dataList.forEach((item) => {
        // if (item.need_lens == "0") {
        //   this.lensBt = false;
        //   this.lensBto = true;
        // }else{
        //   this.lensBt = true;
        //   this.lensBto = false;
        // }

        let color = item.color;
        let coloe_index = eval(item.color_list).findIndex(
          (item) => item == color
        );
        this.code_str = item.code_list[coloe_index];

        if (item.lens_price == null) {
          item.lens_price = 0;
        }
        this.total += parseInt(item.price) + parseInt(item.lens_price);
      });
    },
    // 获取列表
    getShopList() {
      const load = this.$loading({
        background: "rgba(255, 255, 255, 0)",
      });
      this.$get(this.api.shop_list, {})
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          this.dataList = res.data;
          if (this.dataList.length === 0) {
            this.good_null = true;
            this.good_list = false;
          } else {
            this.good_list = true;
            this.good_null = false;
          }
          this.total = 0;
          // for (let i = 0; i < this.dataList.length; i++) {
          //   if (this.dataList[i].need_lens == "0") {
          //     this.lensBt = false;
          //     this.lensBto = true;
          //   }
          // }
          this.dataList.forEach((item) => {
            // if (item.need_lens == "0") {
            //   this.lensBt = false;
            //   this.lensBto = true;
            // }else{
            //   this.lensBt = true;
            //   this.lensBto = false;
            // }
            if (item.lens_price == null) {
              item.lens_price = 0;
            }
            this.total += parseInt(item.price) + parseInt(item.lens_price);
          });
          load.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除购物车商品
    handleDelete(row) {
      this.pageLoading = true;
      this.$del(this.api.shop_delete, {
        id: row,
      })
        .then((res) => {
          this.getShopList();
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
    // 获取镜片 打卡弹窗
    handleLenslist(row) {
      // 获取当前商品的数据
      this.goodsID = row.id;
      this.msg = row.title;
      // 请求镜片
      this.$get(this.api.lens_list, {})
        .then((res) => {
          this.lenslist = res.data;
          this.dialogVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加镜片
    handleLensAdd(row) {
      this.$post(this.api.save_lens, {
        id: this.goodsID,
        lens_id: row.id,
      })
        .then((res) => {
          this.dialogVisible = false;
          // 清数据
          this.goodsID = "";
          this.getShopList();
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelLens(row) {
      this.$del(this.api.del_lens, {
        id: row.id,
        lens_id: row.lens_id,
      })
        .then((res) => {
          this.getShopList();
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 取消操作下的弹窗关闭的回调
    handleClose() {
      this.dialogVisible = false;
    },
    goProductlist() {
      this.loading = true;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.$router.push({ path: "/productList" });
      }, 500);
    },
    goAdvanceOrder() {
      this.loading = true;
      this.bt_buy = false;
      this.timer = setTimeout(() => {
        //跳转的页面写在此处
        this.$router.push({ path: "/advanceOrder" });
      }, 500);
      // clearTimeout(this.timer); // 清除定时器
      // this.timer = null;
    },
  },
  deactivated() {
    clearTimeout(this.timer); // 清除定时器
    this.timer = null;
  },
};
</script>

<style lang="scss">
.el-notification__content {
  margin: 2px 0 0 0 !important;
}
.color-000 {
  font-size: 91%;
  font-weight: 400;
  color: #666666;
}
.money_price_text {
  color: #666666;
  font-size: 91%;
  font-family: 'Avenir Next', Avenir, 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
}
.el-notification {
  width: 50% !important;
  padding: 10px !important;
}
.el-notification.right {
  top: 10% !important;
  right: 25% !important;
}
.cen {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>

<style lang="scss" scoped>
/deep/ .bt-button .el-loading-spinner {
  top: 70% !important;
}
/deep/ .el-loading-spinner .path {
  stroke: #222222;
}
///deep/ .el-loading-spinner {
//  top: 200px !important;
//}
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
  box-shadow: 0 0 5px 3px #eeeeee;
}
/deep/ .el-loading-spinner .path {
  stroke: #ffffff;
}
.shop_bt {
  height: 120px;
  width: 100%;
  position: fixed;
  box-shadow: 0 0 10px #e4e4e4;
  background: #fff;
  padding: 15px 16px 25px 16px;
  bottom: 0;
  left: 0;
  right: 0;
}
.el-icon-close {
  font-size: 24px;
  position: relative;
  top: -2px;
}
.bt {
  width: 92vw;
  height: 48px;
  background-color: #000 !important;
  color: #fff !important;
  margin-bottom: 20px;
}
// 镜片
.title {
  display: flex;
  align-items: center;
}
/deep/ .el-table td {
  padding: 5px 0;
}
/deep/ .el-dialog__body {
  padding: 0;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
/deep/ .el-dialog__title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
}

.shopping_content {
  background-color: rgb(255, 255, 255);
  // padding: 0 16px;
}
.shopping_content_item {
  margin-top: 52px;
  padding: 20px 0;
  font-size: 16px;
  text-align: center;
}
.shopping_content_row {
  padding: 0 0 20px 0;
  font-size: 14px;
  .row_item {
    // height: 50px;
    border-bottom: 1px dashed #eee;
  }
  .row_item:hover {
    background-color: #fcfcfc;
  }
  .row_item:last-child {
    border-bottom: none !important;
  }
}
.border_top {
  border-top: 1px dashed #eee;
}
.frame_content:hover {
  // background-color: red;
}
.frame_content {
  padding: 20px 16px;
}
.frame_content_img {
  width: 120px;
  height: 120px;
  // border: 1px solid #000;
}
.frame_content_row {
  width: 208px;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
}
// .frame_content_but /deep/ .el-button:focus, .el-button:hover{
//     color: #111;
//     border-color: #111;
//     background-color: #fff;
// }
.frame_content_but {
  width: 90%;
  padding: 1px 50px;
  height: 32px;
  font-size: 90% !important;
}
.shopping_content_but {
  width: 92vw;
  background-color: #000 !important;
  color: #fff !important;
  height: 48px;
  // position: fixed;
  // bottom: 10px;
  // left: 5%;
  // margin-bottom: 20px;
}
.color {
  display: block !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  // box-shadow: 0 0 0 3px #8c8c8c !important;
  margin: 0 10px 0 15px !important;
  padding:7px;
  box-shadow:none
}
.color-item {
  background: rgb(255, 255, 255);
  border: 1px;
  display: inline-block;
  border-radius: 100px;
  box-shadow: 0 0 2px #8c8c8c;
  line-height: 1;
  padding: 10px;
  margin: 0 10px 0 20px;
}
.row {
  display: flex;
}
</style>

