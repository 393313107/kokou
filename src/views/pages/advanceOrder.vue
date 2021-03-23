<!-- 预订单页-下单页 -->
<template>
  <div style="background-color: rgb(246, 246, 246)">
<!--    <div style="width: 100%; height: 100%">-->
<!--      <el-backtop :bottom="20"></el-backtop>-->
<!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <div style="height: 58px"></div>
    <el-tag id="box" size="medium" @close="handleCloseTag()" closable
      >先提交订单，后提交镜片度数</el-tag
    >

    <div style="background-color: #fff; margin: 0 0 7px 0; padding: 10px 16px">
      <div style="margin-bottom: 10px; color: #999">收货地址</div>
      <div
        class="row"
        v-if="dataList.length == 0"
        @click="handelAddrAdd"
        style="
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          font-size: 14px;
        "
      >
        <div>添加收货地址</div>
        <i class="el-icon-plus"></i>
      </div>

      <div
        v-else
        @click="handelAddrAdd"
        style="color: rgba(0, 0, 0, 0.65); font-size: 14px; position: relative"
      >
        <div style="margin-bottom: 10px; display: flex">
          <div
            style="
              margin-right: 20px;
              color: rgb(89, 89, 89);
              font-weight: bold;
              width: 100px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            "
          >
            {{ dataList.name }}
          </div>
          &emsp;&emsp;
          <div>{{ dataList.mobile }}</div>
        </div>
        <div style="margin-bottom: 5px">
          <span style="margin-right: 5px">{{ dataList.province }}</span>
          <span style="margin-right: 5px">{{ dataList.city }}</span>
          <span>{{ dataList.county }}</span>
        </div>
        <div
          style="
            width: 305px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          "
        >
          {{ dataList.info }}
        </div>
        <div class="icon"><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div style="background-color: #fff" v-loading="loading">
      <div class="row_item" v-for="item in shopData" :key="item">
        <div class="row frame_content frame_aglin">
          <div class="frame_content_img">
            <img :src="item.img" width="100%" height="100%" />
          </div>
          <div class="row frame_content_row">
            <div
              style="
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
                margin-bottom: 15px;
              "
            >
              {{ item.title }}
            </div>
            <!-- <div @click="handleDelete(item.id)">
                <i class="el-icon-close"></i>
              </div> -->
            <div class="row">
              <div style="color: rgba(0, 0, 0, 0.65); font-size: 14px">
                ￥{{ parseInt(item.price) }}
              </div>
              <div :style="{ background: item.color }" class="color"></div>
            </div>
            <!-- <div>
              <el-button
                class="frame_content_but"
                :disabled="item.lens_id !== null ? true : false"
                @click="handleLenslist(item)"
              >
                {{ item.lens_id !== null ? "已经添加" : "添加镜片" }}</el-button
              >
            </div> -->
          </div>
        </div>

        <div
          v-if="item.lens_id !== null"
          class="row frame_content border_top frame_aglin"
        >
          <div class="frame_content_img">
            <img :src="item.lens_img" width="100%" height="100%" />
          </div>
          <div class="row frame_content_row">
            <div class="row justify-between">
              <div
                style="
                  color: rgba(0, 0, 0, 0.65);
                  font-size: 14px;
                  margin-bottom: 10px;
                "
              >
                {{ item.lens_title }}
              </div>
              <!-- <div @click="handleDelLens(item)">
                <i class="el-icon-close"></i>
              </div> -->
            </div>
            <div class="row">
              <div style="font-size: 90%; color: #ababab; margin-bottom: 10px">
                {{ item.desc }}
              </div>
            </div>
            <div class="row">
              <div style="color: rgba(0, 0, 0, 0.65); font-size: 14px">
                ￥{{ parseInt(item.lens_price) }}
              </div>
              <div class="row justify-between items-center">
                <div class="color-item"></div>
                <div style="color: rgba(0, 0, 0, 0.65); font-size: 14px">
                  透明
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="background-color: #fff; margin-top: 5px; padding: 10px">
      <el-checkbox v-model="checked">报销凭证</el-checkbox>
      <div v-show="checked">
        <h3 style="margin: 10px 0; color: rgba(0, 0, 0, 0.85)">
          发票内容<span style="color: #999; margin-left: 10px"
            >购买商品明细</span
          >
        </h3>
        <div
          style="
            margin-bottom: 10px;
            color: #565656;
            font-size: 90%;
            line-height: 1.5;
          "
        >
          售后服务凭订单号即可用于报销的纸质发票未增值税普通发票,特别注意;若发生退货,发票需连同产品一并退还,若发票丢失,票面价格的16%在退款中扣取
        </div>
        <div>
          <el-form ref="form" label-width="110px">
            <el-form-item label="发票类型">
              <el-radio-group v-model="invoice">
                <el-radio label="1">个人</el-radio>
                <el-radio label="2">公司</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发票抬头">
              <el-input v-model="invoice_number"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div style="background-color: #fff; margin-top: 5px; padding: 10px">
      <el-checkbox v-model="addChecked">使用代金券</el-checkbox>
      <div
        class="row"
        v-show="addChecked"
        @click="advanceOrderData = true"
        style="
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          font-size: 14px;
        "
      >
        <div>添加代金券</div>
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div style="background-color: #fff; margin-top: 5px; padding: 10px">
      <div style="padding-top: 5px; color: #999">订单留言</div>
      <div
        class="row"
        style="
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          font-size: 14px;
        "
      >
        <el-input type="textarea" :rows="2" v-model="textarea"> </el-input>
      </div>
    </div>

    <div style="background-color: #fff; margin-top: 5px; padding: 20px">
      <div
        class="row"
        style="
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          font-size: 14px;
        "
      >
        <div style="padding-top: 5px; color: #999">合计金额</div>
        <div>￥{{ heji }}</div>
      </div>
      <div style="text-align: center; margin-bottom: 10px">
        <el-button
          element-loading-background="rgb(55, 55, 55)"
          v-loading="bt_loading"
          class="shopping_content_but"
          @click="goProductlist">
          <span v-show="!bt_loading">去支付</span>
        </el-button
        >
      </div>
    </div>

    <el-dialog
      title="选择收货地址"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <div style="text-align: center" class="bt">
        <el-button
          @click="addDialog"
          style="width: 90%; background-color: #000000; color: #fff"
        >
          <i class="el-icon-plus"></i>添加收货地址
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <div v-for="item in addrlist" :key="item.id" style="position: relative">
          <!-- 这是地址 -->
          <div
            style="
              padding: 16px;
              margin-top: 20px;
              width: 99%;
              height: 110px;
              border: 1px solid rgb(232, 232, 232);
              font-size: 14px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
            @click="(dataList = item), (dialogVisible = false)"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                position: relative;
              "
            >
              <div style="display: flex">
                <div
                  style="
                    margin-right: 20px;
                    color: rgb(89, 89, 89);
                    font-weight: bold;
                    width: 100px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                  "
                >
                  {{ item.name }}
                </div>
                &emsp;&emsp;
                <div>{{ item.mobile }}</div>
              </div>
            </div>
            <div>
              <div style="margin-bottom: 3px">
                <span style="margin-right: 5px">{{ item.province }}</span>
                <span style="margin-right: 5px">{{ item.city }}</span>
                <span>{{ item.county }}</span>
              </div>
              <div
                style="
                  width: 255px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                  overflow: hidden;
                "
              >
                {{ item.info }}
              </div>
            </div>
          </div>
          <!-- 这里是删除 -->
          <div
            style="position: absolute; right: 15px; top: 10px"
            @click="handelDel(item.id)"
          >
            <i class="el-icon-close"></i>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 弹出层 -->
    <el-dialog
      title="添加收货地址"
      :visible.sync="dialogFormVisible"
      width="93%"
    >
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item style="margin-bottom: 10px;" label="收货人" prop="name">
            <el-input style="width: 100%" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px;" label="手机号码" prop="mobile">
            <el-input style="width: 100%" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="cityInfo" class="city">
            <div style="height: 80px"></div>
            <city-select
              style="width: 100%;"
              v-model="ruleForm.cityInfo"
              class="cityInfo"
              @input="inputSe"
            ></city-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="info">
            <el-input style="width: 100%" v-model="ruleForm.info"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hanleAdd()"
          ><i class="el-icon-check"></i>提交</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加代金劵 -->
    <el-dialog title="添加代金劵" :visible.sync="advanceOrderData" width="96%">
      <coupon></coupon>
    </el-dialog>
  </div>
</template>

<script>
import heads from "@/components/head";
import bottoms from "@/components/bottom";
import CitySelect from "../../components/CitySelect";
import coupon from "../../components/coupon";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    heads,
    bottoms,
    CitySelect,
    coupon,
  },
  data() {
    return {
      loading: false,
      timer: null,
      addChecked: false,
      checked: false,
      invoice: "0",
      invoice_number: "",
      textarea: "",
      names: "",
      // 默认地址栏
      dataList: [],
      dialogVisible: false,
      dialogFormVisible: false,
      advanceOrderData: false,
      addrlist: [],
      adddialog: false,
      shopData: [],
      heji: 0,
      bt_loading: false,
      i: "1",
      isFirstEnter: false, // 是否第一次进入，默认false
      // 添加的参数
      ruleForm: {
        name: "", // 人
        mobile: "", // 手机
        cityInfo: "", //地区
        info: "", //详细地址
      },
      rules: {
        name: [{ required: true, message: "请输入收货人", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        cityInfo: [
          { required: true, message: "请输入所在地区", trigger: "blur" },
        ],
        info: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "shopPay") {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是ProductList,shopdetails过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }

    next();
  },
  created() {
    console.log('created')
    console.log(this.dataList,'created')
    this.isFirstEnter = true;
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
    this.setShoppingBag()
  },
  mounted() {
    this.getAddDefault();
    this.getShopList();
  },
  activated() {
    console.log(this.dataList,'actived 1')
    this.handClick();
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount();
    });
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      console.log(this.dataList,'actived 2')
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.dataList = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.lenslist = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.shopData = []
      console.log(this.dataList,'actived 3')
      // this.getShopList();
      this.setShoppingBag()
      this.getAddDefault();
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
    this.loading = false;
  },
  methods: {

    setShoppingBag(){
      let msg = this.$store.getters.setShoppingBag
      this.shopData = msg
      this.heji = this.$store.getters.getHeJi
    },
    handleCloseTag() {
      var box = document.getElementById("box");
      box.remove();
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
    // 获取默认地址
    getAddDefault() {
      this.$get(this.api.addr_default, {})
        .then((res) => {
          this.dataList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取组件的省区市
    inputSe(data) {
      this.names = data;
    },
    // 查列表
    handelAddrAdd() {
      this.dialogVisible = true;
      this.handelAddrlist();
    },
    handelAddrlist() {
      this.$get(this.api.addr_list, {})
        .then((res) => {
          this.addrlist = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击添加地址
    addDialog() {
      this.dialogFormVisible = true;
      this.ruleForm.name = "";
      this.ruleForm.mobile = "";
      this.ruleForm.info = "";
    },
    // 提交添加地址
    hanleAdd() {
      if (this.ruleForm.name == "") {
        this.$notify.error({
          message: "请输入收货人",
          showClose: false,
        });
      }
      if (this.ruleForm.mobile == "") {
        this.$notify.error({
          message: "请输入手机号",
          showClose: false,
        });
      }
      if (this.ruleForm.cityInfo == "") {
        this.$notify.error({
          message: "请输入所在地区",
          showClose: false,
        });
      }
      if (this.ruleForm.info == "") {
        this.$notify.error({
          message: "请输入所在区",
          showClose: false,
        });
      }
      this.$post(this.api.addr_add, {
        name: this.ruleForm.name,
        mobile: this.ruleForm.mobile,
        province: this.names.province.name,
        city: this.names.city.name,
        county: this.names.block.name,
        info: this.ruleForm.info,
      })
        .then((res) => {
          this.dialogFormVisible = false;
          this.handelAddrlist();
          this.getAddDefault();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除地址
    handelDel(row) {
      this.$del(this.api.addr_delete, {
        id: row,
      })
        .then((res) => {
          // this.dialogVisible = true;
          this.handelAddrlist();
          this.getAddDefault();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 查购物车
    getShopList() {
      const load = this.$loading({
        background: "rgba(255, 255, 255, 1)",
      });
      this.$get(this.api.shop_list, {})
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          this.shopData = res.data;
          this.heji = 0;
          this.shopData.forEach((item) => {
            if (item.lens_price == null) {
              item.lens_price = 0;
            }
            this.heji += parseInt(item.price) + parseInt(item.lens_price);
            this.$store.dispatch("setHeJi", this.heji);
          });
          load.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 结账
    goProductlist() {
      const pas = {
        addr_id: this.dataList.id,
        goods_id: [],
        lens_id: [],
        color_list: [],
        shop_id: [],
        text: this.textarea, //订单留言
        invoice: this.invoice, //发票类型
        invoice_number: this.invoice_number, //发票抬头
      };
      this.shopData.forEach((item) => {
        pas.goods_id.push(item.goods_id);
        pas.lens_id.push(item.lens_id);
        pas.color_list.push(item.color);
        pas.shop_id.push(item.id);
      });
      this.$store.dispatch("setPay", pas);
      if (this.dataList.id == undefined || this.dataList.id == "") {
        this.$notify({
          type: "warning",
          message: "收货地址不能为空",
          showClose: false,
        });
      } else {
        this.bt_loading = true;
        this.timer = setTimeout(() => {
          //跳转的页面写在此处
          if (pas != "") {
            this.$router.push("/shopPay");
            this.bt_loading = false;
            this.handelAddrlist();
          }
        }, 500);
      }
    },
    //删除商品
    handleDelete(id) {
      this.$del(this.api.shop_delete, {
        id: id,
      })
        .then((res) => {
          this.getShopList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer); // 清除定时器
    this.timer = null;
  },
};
</script>

<style lang="scss">
.el-notification__content {
  margin: 2px 0 0 0;
}
.el-notification {
  width: 50%;
  padding: 10px;
}
.el-notification.right {
  top: 10% !important;
  right: 25%;
}
.el-button:hover {
  border: none;
  background: #fff;
  // color: #111;
  // border: 1px solid #111;
}
</style>
<style scoped lang="scss">
/deep/ .el-form-item__label {
  color: rgba(0, 0, 0, 0.85);
}
/deep/ .el-input__inner {
  height: 32px;
}
/deep/ .el-input {
  width: 70%;
}
/deep/ .el-loading-mask {
  // background-color: #fff;
  border: 1px solid #fff;
}
/deep/ .el-loading-spinner .path {
  stroke: #111;
}
.shopping_content_but /deep/ .el-loading-spinner .path {
  stroke: #ffffff;
}
/deep/ .el-button:active {
  background: rgb(55, 55, 55) !important;
  color: rgb(55, 55, 55) !important;
  border: 1px solid rgb(55, 55, 55) !important;
  padding: 1px 50px;
  box-shadow: 0 0 0 4px #CCCCCC !important;
  // height: 48px;
  font-size: 0 !important;
}
//通知条
/deep/ .el-tag .el-icon-close {
  font-size: 16px;
  right: -76px;
}
/deep/ .el-tag .el-tag__close {
  color: #fff;
}
/deep/ .el-tag {
  background: #565656;
  color: #fff;
  text-align: center;
  font-size: 14px;
  border-radius: 0;
  border-color: #565656;
}
/deep/ .el-tag--medium {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
// 弹出层
.dialog-footer i {
  margin-right: 5px;
}
.dialog-footer /deep/ .el-button {
  color: #fff;
  background-color: #111;
  border-color: #111;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
/deep/ .el-dialog__footer {
  text-align: center;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
.city /deep/ .el-form-item {
  position: relative;
}
.cityInfo {
  position: absolute;
  top: 50%;
}
//地址
.bt /deep/ [class^="el-icon-"] {
  font-size: 16px;
  margin-right: 10px;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
.icon i {
  position: absolute;
  bottom: 35px;
  right: 10px;
  font-size: 16px;
}
// 这一块是商品的css
.row_item {
  border-bottom: 1px dashed #eee;
}
.row_item:last-child {
  border-bottom: none !important;
}
.border_top {
  border-top: 1px dashed #eee;
}
.frame_aglin:hover {
  background-color: #fcfcfc;
}
.frame_aglin {
  align-items: center;
}
.frame_content {
  padding: 20px 20px;
}
.frame_content_img {
  width: 100px;
  height: 100px;
  // border: 1px solid #000;
}
.frame_content_row {
  width: 208px;
  flex-direction: column;
  // justify-content: space-between;
  margin-left: 15px;
}
.frame_content_but {
  // width: 80%;
  padding: 3px 60px;
  height: 32px;
  font-size: 90%;
}
.shopping_content_but {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  width: 90vw;
  height: 48px;
  background-color: #000 !important;
  color: #fff !important;
}
.color {
  display: block !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  // box-shadow: 0 0 0 3px #8c8c8c !important;
  margin: 3px 10px 0 15px !important;
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
  margin: 0 10px;
}
</style>
