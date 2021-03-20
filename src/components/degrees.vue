<template>
  <!-- 官网首页-->
  <div class="home">
    <!-- 内容部分 -->
    <div class="content">
      <div class="bt">
        <el-button @click="dialogFormVisible = true"
          ><i class="el-icon-plus"></i>添加验光度数</el-button
        >
      </div>

      <!-- 度数信息 -->
      <div>
        <div
          v-for="(item, index) in tableData"
          :key="index"
          style="margin: 20px 0"
          @click="aaa(item)"
        >
          <el-row>
            <el-col :span="24">
              <el-card shadow="always">
                <div class="mes">
                  <p style="color: #666; font-size: 15px;margin-right: 6px">
                    {{ item.id }}
                  </p>
                  <div class="dot"></div>
                  <p style="color: #666; font-size: 12px">验光</p>
                  <p style="color: #666; font-size: 12px;margin-left: 10px;">
                    {{ item.source }}
                  </p>
                </div>
                <!-- v-if="item.json.length == 0" -->
                <div v-if="item.json.left.type == ''">
                  <!-- 判断是否为空，为空用图片 -->
                  <div style="height: 173px">
                    <img :src="item.img" width="100%" height="100%" />
                  </div>
                  <!-- </el-dialog> -->
                </div>

                <!-- 不为空显示类容 -->
                <div v-else class="table">
                  <div class="row">
                    <div
                      class="tab-left"
                      style="
                        border-top: 1px solid #cccccc;
                        border-top-left-radius: 3px;
                      "
                    >
                      {{
                        item.json.right.type == item.json.left.type
                          ? item.json.right.type
                          : item.json.right.type + "/" + item.json.left.type
                      }}
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px solid #f895a1"
                    >
                      <span class="R-left">R 右眼</span>
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px solid #afb6e5"
                    >
                      <span class="R-left" style="background: #3745ab"
                        >L 左眼</span
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="border-top: 1px dashed #ccc; color: #666"
                    >
                      度数
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px dashed #f895a1"
                    >
                      {{ item.json.right.number }}
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px dashed #afb6e5"
                    >
                      {{ item.json.left.number }}
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="border-top: 1px dashed #ccc; color: #666"
                    >
                      散光
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px dashed #f895a1"
                    >
                      {{ item.json.right.number }}
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px dashed #afb6e5"
                    >
                      {{ item.json.left.number }}
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="border-top: 1px dashed #ccc; color: #666"
                    >
                      轴位
                    </div>
                    <div
                      class="tab-center"
                      style="border-top: 1px dashed #f895a1"
                    >
                      {{ item.json.right.axial }}
                    </div>
                    <div
                      class="tab-right"
                      style="border-top: 1px dashed #afb6e5"
                    >
                      {{ item.json.left.axial }}
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="tab-left"
                      style="
                        border-top: 1px dashed #ccc;
                        border-bottom: 1px solid #cccccc;
                        border-bottom-left-radius: 3px;
                        color: #666;
                      "
                    >
                      瞳距
                    </div>
                    <div
                      class="tab-center"
                      style="
                        border-bottom: 1px solid #f895a1;
                        border-top: 1px dashed #f895a1;
                      "
                    >
                      {{ item.json.right.interpupillary }}
                    </div>
                    <div
                      class="tab-right"
                      style="
                        border-bottom: 1px solid #afb6e5;
                        border-top: 1px dashed #afb6e5;
                      "
                    >
                      {{ item.json.left.interpupillary }}
                    </div>
                  </div>
                </div>

                <div style="color: #666; display: flex; margin-top: 15px">
                  <i class="el-icon-edit"></i>
                  <p style="font-size: 13px">N/A</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 弹出层 -->
      <el-dialog
        title="添加验光度数"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
      >
        <div class="source">
          <span>来源：</span>
          <el-select v-model="source" size="mini" placeholder="请选择来源">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="tabs">
          <el-tabs>
            <el-tab-pane>
              <span slot="label"
                ><i class="el-icon-paperclip"></i> 上传验光图</span
              >
              <!-- 上传验光图 -->
              <div class="img">
                <el-upload
                  action="http://glasses.kokou.cn/api/v1/image/upload"
                  :before-upload="beforeUploadIcon"
                  :show-file-list="false"
                  :on-remove="handleRemoveIcon"
                  :on-success="handleSuccessIcon"
                  :file-list="fileListIcon"
                  list-type="picture-card"
                  class="icon"
                >
                  <img
                    v-if="imageIcon"
                    :src="imageIcon"
                    style="width: 100%; height: 100%; display: block"
                  />
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label" @click="getLenList"
                ><i class="el-icon-connection"></i> 输入度数 (选填)</span
              >
              <div class="flex">
                <!-- 右眼度数 -->
                <div class="rightEye">
                  <div class="R">
                    <span class="R-left">R 右眼</span>
                    <span class="R-right">(R 或 OD)</span>
                  </div>
                  <div>
                    <el-form
                      :model="ruleForm"
                      :rules="rules"
                      ref="ruleForm"
                      class="demo-ruleForm"
                    >
                      <el-form-item label="类型" prop="right_type">
                        <el-select
                          v-model="ruleForm.right_type"
                          size="mini"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="度数" prop="right_number">
                        <el-select
                          v-model="ruleForm.right_number"
                          size="mini"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in lenList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="散光" prop="right_astigmatism">
                        <el-select
                          v-model="ruleForm.right_astigmatism"
                          size="mini"
                          placeholder="请选择"
                          @change="abb"
                        >
                          <el-option
                            v-for="item in astigmatismList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="轴位" prop="right_axial">
                        <el-select
                          v-model="ruleForm.right_axial"
                          size="mini"
                          placeholder="请选择"
                          :disabled="
                            ruleForm.right_astigmatism == '0.00' ? true : false
                          "
                        >
                          <el-option
                            v-for="item in axisList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="瞳距" prop="right_interpupillary">
                        <el-select
                          v-model="ruleForm.right_interpupillary"
                          size="mini"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in IPDList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>

                <!-- 左眼度数 -->
                <div class="leftEye">
                  <div class="R">
                    <span class="R-left" style="background: #3745ab"
                      >L 左眼</span
                    >
                    <span class="R-right">(L 或 OS)</span>
                  </div>
                  <div>
                    <el-form
                      :model="leftForm"
                      :rules="rules"
                      ref="leftForm"
                      class="demo-ruleForm"
                    >
                      <el-form-item label="类型" prop="left_type">
                        <el-select
                          v-model="leftForm.left_type"
                          size="mini"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="度数" prop="left_number">
                        <el-select
                          v-model="leftForm.left_number"
                          size="mini"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in lenList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="散光" prop="left_astigmatism">
                        <el-select
                          v-model="leftForm.left_astigmatism"
                          size="mini"
                          placeholder="请选择"
                          @change="acc"
                        >
                          <el-option
                            v-for="item in astigmatismList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="轴位" prop="left_axial">
                        <el-select
                          v-model="leftForm.left_axial"
                          size="mini"
                          placeholder="请选择"
                          :disabled="
                            leftForm.left_astigmatism == '0.00' ? true : false
                          "
                        >
                          <el-option
                            v-for="item in axisList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="瞳距" prop="left_interpupillary">
                        <el-select
                          v-model="leftForm.left_interpupillary"
                          size="mini"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in IPDList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div style="margin-top: 15px" class="sign">
          <span>视光标记：</span>
          <el-input size="mini" maxlength="2" v-model="sign">
            <template slot="append">选填，最多两个字</template>
          </el-input>
        </div>

        <div style="margin-top: 15px" class="remarks">
          <span>度数备注：</span>
          <el-input size="mini" v-model="remarks"> </el-input>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="submitForm()"
            ><i class="el-icon-check"></i>添加验光度数</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import json from "../components/js/degree.json";
export default {
  data() {
    return {
      // 表格
      tableData: [],
      dialogFormVisible: false,
      // 来源
      options: [
        {
          value: "医院",
          label: "医院",
        },
        {
          value: "眼镜店",
          label: "眼镜店",
        },
        {
          value: "KOKOU",
          label: "KOKOU",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      source: "",
      sign: "", //视光标记
      remarks: "", //度数备注
      // 上传图片
      imageIcon: "",
      fileListIcon: [],
      // 右眼
      ruleForm: {
        right_type: "", //类型
        right_number: "", //度数
        right_astigmatism: "", //散光
        right_axial: "", //轴位
        right_interpupillary: "", //瞳距
      },
      // 左眼
      leftForm: {
        left_type: "", //类型
        left_number: "", //度数
        left_astigmatism: "", //散光
        left_axial: "", //轴位
        left_interpupillary: "", //瞳距
      },
      typeList: [], //类型
      lenList: [], //度数
      astigmatismList: [], //散光
      axisList: [], //轴位
      IPDList: [], //瞳距
      rules: {
        right_type: [{ required: true, message: "必填", trigger: "blur" }],
        right_number: [{ required: true, message: "必填", trigger: "blur" }],
        right_astigmatism: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        right_axial: [{ required: true, message: "必填", trigger: "blur" }],
        right_interpupillary: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        left_type: [{ required: true, message: "必填", trigger: "blur" }],
        left_number: [{ required: true, message: "必填", trigger: "blur" }],
        left_astigmatism: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        left_axial: [{ required: true, message: "必填", trigger: "blur" }],
        left_interpupillary: [
          { required: true, message: "必填", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    acc() {
      if (this.leftForm.left_astigmatism == "0.00") {
        this.leftForm.left_axial = "0";
      }
    },
    abb() {
      if (this.ruleForm.right_astigmatism == "0.00") {
        this.ruleForm.right_axial = "0";
      }
    },
    aaa(item) {
      this.$confirm("选择后将不可修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        showClose:false,
        center: true
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "您已成功添加",
            showClose: false,
          });
          // 把item传给父组件，然后父组件去渲染就好了。
          // 在点击到时把父组件的那个弹窗关掉，就完成了交互了。
          this.$emit("values", item);
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消添加",
            showClose: false,
          });
        });
    },
    getLenList() {
      this.lenList = json.lenList;
      this.typeList = json.typeList;
      this.astigmatismList = json.astigmatismList;
      this.axisList = json.axisList;
      this.IPDList = json.IPDList;
    },
    getList() {
      //度数管家列表
      this.$get(this.api.list, {})
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      if (this.imageIcon != "") {
        //添加自己的度数
        this.$post(this.api.add, {
          source: this.source,
          label: this.sign,
          remark: this.remarks,
          img: this.imageIcon,
          right_type: this.ruleForm.right_type,
          right_number: this.ruleForm.right_number,
          right_astigmatism: this.ruleForm.right_astigmatism,
          right_axial: this.ruleForm.right_axial,
          right_interpupillary: this.ruleForm.right_interpupillary,
          left_type: this.leftForm.left_type,
          left_number: this.leftForm.left_number,
          left_astigmatism: this.leftForm.left_astigmatism,
          left_axial: this.leftForm.left_axial,
          left_interpupillary: this.leftForm.left_interpupillary,
        })
          .then((res) => {
            this.dialogFormVisible = false;
            //度数管家列表
            this.getList();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const p1 = new Promise((resolve, reject) => {
          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
            } else {
              this.$message({
                message: "警告哦，这是一条警告消息",
                type: "warning",
              });
            }
          });
        });
        const p2 = new Promise((resolve, reject) => {
          this.$refs["leftForm"].validate((valid) => {
            if (valid) {
            } else {
              this.$message({
                message: "抱歉，您还有未填的必填项噢",
                type: "warning",
              });
            }
          });
        });

        Promise.all([p1, p2]).then(() => {
          console.log("验证通过,提交表单");
        });
        if (p1 != "" && p2 != "") {
          this.$post(this.api.add, {
            source: this.source,
            label: this.sign,
            remark: this.remarks,
            right_type: this.ruleForm.right_type,
            right_number: this.ruleForm.right_number,
            right_astigmatism: this.ruleForm.right_astigmatism,
            right_axial: this.ruleForm.right_axial,
            right_interpupillary: this.ruleForm.right_interpupillary,
            left_type: this.leftForm.left_type,
            left_number: this.leftForm.left_number,
            left_astigmatism: this.leftForm.left_astigmatism,
            left_axial: this.leftForm.left_axial,
            left_interpupillary: this.leftForm.left_interpupillary,
            img: this.imageIcon,
          })
            .then((res) => {
              this.dialogFormVisible = false;
              //度数管家列表
              this.getList();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    // 文件上传之前的钩子，如果返回为false、Promise 且被 reject ，则停止上传
    beforeUploadIcon(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isLt5M;
    },
    // 文件移除的钩子
    handleRemoveIcon(file, fileList) {
      for (const i in this.fileListIcon) {
        const url = this.fileListIcon[i].url;
        if (url === file.url) {
          this.fileListIcon.splice(i, 1);
          break;
        }
      }
    },
    // 文件上传成功的钩子
    handleSuccessIcon(response, file, fileList) {
      this.imageIcon = response.data.path;
      this.$message({
        message: "恭喜你，图片上传成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss">
.el-notification__content {
  margin: 2px 0 0 0;
}
.el-notification {
  width: 40%;
  padding: 10px;
}
.el-notification.right {
  top: 10% !important;
  right: 25%;
}
.el-dialog__header {
  border-bottom: 1px solid #f1ebeb !important;
}
.el-dialog__title {
  color: #000000d9 !important;
  font-size: 16px !important;
}
.v-modal {
  z-index: 999 !important;
}
.el-message-box{
  width: 60% !important;
}
.el-button--small{
  margin-right: 10px !important;
}
</style>
<style lang="scss" scoped>

/deep/ [class^="el-icon-"] {
  font-size: 16px;
  margin-right: 5px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #52c41a;
  margin: 0 5px;
}
.mes {
  display: flex;
  margin-bottom: 5px;
  align-items: center;
}
.tab-right {
  width: 92px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #111;
  font-size: 13px;
  background: #f1f2fa;
  border-left: 1px solid #afb6e5;
  border-right: 1px solid #afb6e5;
}
.tab-center {
  width: 92px;
  height: 30px;
  line-height: 30px;
  color: #111;
  font-size: 13px;
  text-align: center;
  background: #fde6e9;
  border-left: 1px solid #f895a1;
  border-right: 1px solid #f895a1;
}
.tab-left {
  width: 92px;
  height: 30px;
  color: #111;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
}
.table {
  width: 300px;
}
/deep/ .el-card {
  border: 1px solid #e8e8e8;
  background-color: #fcfcfc;
}
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
.flex {
  display: flex;
  justify-content: space-between;
}
// 左眼
.leftEye {
  width: 140px;
  height: 347px;
  background: #f1f2fa;
  padding: 10px;
  margin: 0;
  border-radius: 3px;
  border: 1px solid #afb6e5;
}
// 右眼
.R-right {
  color: #999;
  position: relative;
  font-size: 75%;
  line-height: 0;
  top: -3px;
  left: 2px;
  vertical-align: baseline;
}
.R-left {
  width: 51px;
  height: 22px;
  background-color: #cc0e25;
  color: #ffffff;
  padding: 2px 5px;
  border-radius: 3px;
}

.R {
  margin-bottom: 10px;
}
.rightEye {
  width: 140px;
  height: 347px;
  background: #fde6e9;
  padding: 10px;
  margin: 0;
  border-radius: 3px;
  border: 1px solid #f895a1;
}
// 弹出层
.tabs .img /deep/ .el-upload--picture-card {
  width: 295px;
  height: 235px;
  line-height: 235px;
}
.tabs /deep/ .el-tabs__active-bar {
  width: 137px !important;
}
.tabs /deep/ .el-input--suffix .el-input__inner {
  padding-left: 5px;
  padding-right: 10px;
}
.tabs /deep/ .el-form-item__label {
  font-size: 13px;
}
.tabs /deep/ .el-input {
  width: 68px;
}
.tabs /deep/ .el-tabs__item {
  padding: 0 30px;
  width: 130px;
}
.remarks /deep/ .el-input {
  width: 220px;
}
.sign /deep/ .el-input-group__append {
  font-size: 12px;
  padding: 5px;
}
.sign /deep/ .el-input-group {
  width: 220px;
}
.source /deep/ .el-input {
  width: 180px;
}
.source span {
  font-size: 14px;
  margin-right: 10px;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #f1ebeb;
}
/deep/ .el-dialog__title {
  color: #000000d9;
  font-size: 16px;
}
/deep/ .el-dialog {
  width: 90%;
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
</style>

