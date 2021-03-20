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
      <span style="color: #000000a6">收货地址</span>
    </div>

    <div style="background-color: #fff">
      <!-- 内容部分 -->
      <div class="content">
        <div class="bt">
          <van-button block class="addAddress" @click="dialogFormVisible = true">
            <i class="el-icon-plus"></i>
            添加收货地址
          </van-button
          >
        </div>

        <!-- 列表 -->
        <div>
          <div
            v-for="(item, index) in addrlist"
            :key="index"
            style="margin: 20px 0; position: relative"
          >
            <el-row>
              <el-col :span="24">
                <el-card shadow="always">
                  <div class="icon" @click="handleDelete(item.id)">
                    <i class="el-icon-close"></i>
                  </div>
                  <!-- <div class="edit" @click="handleUpdate(item.id)">
                    <i class="el-icon-edit"></i>
                  </div> -->
                  <div class="flex" style="margin-bottom: 8px">
                    <p style="margin-right: 10px">{{ item.name }}</p>
                    <p>{{ item.mobile }}</p>
                  </div>
                  <div class="flex" style="margin-bottom: 4px">
                    <p style="margin-right: 10px">{{ item.province }}</p>
                    <p style="margin-right: 10px">{{ item.city }}</p>
                    <p>{{ item.county }}</p>
                  </div>
                  <div class="flex">
                    <p>{{ item.info }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- 弹出层 -->
      <el-dialog
        title="添加收货地址"
        :visible.sync="dialogFormVisible"
        width="92%">
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item label="收货人" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="cityInfo" class="city">
              <div style="height: 80px"></div>
              <city-select
                v-model="ruleForm.cityInfo"
                class="cityInfo"
                @input="input"
              ></city-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="info">
              <el-input v-model="ruleForm.info"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="submitForm()"
            ><i class="el-icon-check"></i>提交</el-button
          >
        </div>
      </el-dialog>
    </div>

    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import heads from "../components/head";
import bottoms from "../components/bottom";
import CitySelect from "../components/CitySelect.vue";
export default {
  components: {
    heads,
    bottoms,
    CitySelect,
  },
  data() {
    return {
      id: "",
      i: "1",
      addrlist: [],
      // 表格
      dialogFormVisible: false,
      // 添加的参数
      ruleForm: {
        name: "", // 人
        mobile: "", // 手机
        cityInfo: "", //地区
        info: "", //详细地址
      },
      names: "",
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
  mounted() {
    // 监听（绑定）滚轮 滚动事件
    this.handClick();
    this.handelAddrlist();
  },
  computed: {
    cityName() {
      const names = [];
      this.ruleForm.cityInfo.province &&
        names.push(this.ruleForm.cityInfo.province.name + " ");
      this.ruleForm.cityInfo.city &&
        names.push(this.ruleForm.cityInfo.city.name + " ");
      this.ruleForm.cityInfo.block &&
        names.push(this.ruleForm.cityInfo.block.name + " ");
      return names.join("");
    },
  },
  methods: {
    // 查列表
    handelAddrlist() {
      this.$get(this.api.addr_list, {})
        .then((res) => {
          this.$nextTick(() => {
            this.$refs.badgeChange.getCount();
          });
          this.addrlist = res.data;
          console.log(this.addrlist);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //编辑
    // handleUpdate(id) {
    //   this.id = id;
    //   this.dialogFormVisible = true;
    // },
    // 删除
    handleDelete(id) {
      this.$del(this.api.addr_delete, {
        id: id,
      })
        .then((res) => {
          this.handelAddrlist();
          this.$notify({
            type: "success",
            message: "删除成功",
            showClose: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交添加地址
    submitForm() {
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
        })
        .catch((err) => {
          console.log(err);
        });
      // if (this.id == "") {
      //   this.$post(this.api.addr_add, {
      //     name: this.ruleForm.name,
      //     mobile: this.ruleForm.mobile,
      //     province: this.names.province.name,
      //     city: this.names.city.name,
      //     county: this.names.block.name,
      //     info: this.ruleForm.info,
      //   })
      //     .then((res) => {
      //       // this.dialogFormVisible = false;
      //       // this.handelAddrlist();
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // } else {
      //   this.$put(this.api.addr_update, {
      //     name: this.ruleForm.name,
      //     mobile: this.ruleForm.mobile,
      //     province: this.names.province.name,
      //     city: this.names.city.name,
      //     county: this.names.block.name,
      //     info: this.ruleForm.info,
      //   })
      //     .then((res) => {
      //       this.dialogFormVisible = false;
      //       this.handelAddrlist();
      //       this.$message({ type: "success", message: "修改成功!" });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
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
    input(data) {
      this.names = data;
    },
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
</style>
<style lang="scss" scoped>
.edit i {
  position: absolute;
  right: 20px;
  bottom: 18px;
  color: rgba(0, 0, 0, 0.65);
}
.icon i {
  position: absolute;
  right: 20px;
  color: rgba(0, 0, 0, 0.45);
}
.flex p {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
.flex {
  display: flex;
}

/deep/ [class^="el-icon-"] {
  font-size: 16px;
  margin-right: 5px;
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

// 页面按钮
.bt /deep/ [class^="el-icon-"] {
  font-size: 16px;
  margin-right: 10px;
}
.bt /deep/ .el-button {
  background-color: #111111;
  width: 308px;
  height: 38px;
  border-radius: 5px;
  color: #ffffff;
  margin: 15px 0;
}
.bt {
  text-align: center;
  margin: 0 auto;
}
.content {
  padding: 20px 16px;
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
.addAddress {
  background-color: #222222;
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 40px !important;
}
</style>

