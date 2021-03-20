<template>
  <div>
<!--    <div style="width: 100%; height: 100%">-->
<!--      <el-backtop :bottom="60"></el-backtop>-->
<!--    </div>-->
    <!-- 头部 -->
    <heads ref="badgeChange"></heads>
    <div style="height: 60px; margin-bottom: 5px"></div>

    <!-- 手机验证码 -->
    <div class="bgc">
      <div class="title">欢迎登录KOKOU眼镜商城</div>

      <div class="login">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="name">
            <div>
              <div class="">
                <div>
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="手机号"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <div style="width: 170px; margin-right: 20px">
                <el-input
                  v-model="ruleForm.code"
                  placeholder="验证码"
                ></el-input>
              </div>
              <div @click="getVerifyCode">
                <el-button :disabled="disabled">{{ btnTitle }}</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <!-- 登录按钮 -->
        <div class="login_btn">
          <button @click="handleLogin">登录</button>
        </div>
      </div>
    </div>
    <div></div>

    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>

<script>
import heads from "../components/head";
import bottoms from "../components/bottom";
export default {
  components: {
    heads,
    bottoms,
  },
  data() {
    return {
      phone: "", //手机号
      verifyCode: "", //验证码
      btnTitle: "获取验证码",
      disabled: false, //是否可点击
      i: "1",
      ruleForm: {
        name: "",
        code: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号码",
          },
        ],
        code: [
          {
            required: this.coderules,
            message: "请输入正确的验证码",
            trigger: "blur",
          },
        ],
      },
      coderules: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.badgeChange.getCount();
    });
    // 监听（绑定）滚轮 滚动事件
    this.handClick();
  },
  methods: {
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
    getVerifyCode() {
      //获取验证码
      if (this.validatePhone()) {
        this.validateBtn();
        this.$post(this.api.mobileCode, {
          mobile: this.ruleForm.name,
        })
          .then((res) => {
            if (res.code == 0) {
              this.$notify({
                message: "验证码发送成功",
                type: "success",
                showClose: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    validatePhone() {
      //判断输入的手机号是否合法
      if (!this.ruleForm.name && !/^1[0-9]{10}$/.test(this.ruleForm.name)) {
        return false;
      } else {
        return true;
      }
    },
    validateBtn() {
      //倒计时
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          // this.disabled = false;
          this.btnTitle = "获取验证码";
        } else {
          // this.disabled = true;
          this.btnTitle = time + "秒后重试";
          time--;
        }
      }, 1000);
    },
    handleLogin() {
      //点击发送
      this.$post(this.api.mobile, {
        mobile: this.ruleForm.name,
        code: this.ruleForm.code,
      })
        .then((res) => {
          console.log(res);
          if (res.message == "绑定成功") {
            window.localStorage.setItem("token", res.data.access_token);
            // this.$router.push("/shopPay");
          }
          localStorage.setItem("ele_login", true);
          // this.$router.push('/')
          this.$router.go(-1);
        })
        .catch((error) => {
          //返回错误信息
          this.$message.error(error);
        });
    },
  },
  computed: {
    //手机号和验证码都不能为空
    isClick() {
      if (!this.phone || !this.verifyCode) {
        return true;
      } else {
        return false;
      }
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
/deep/ .el-input__inner {
  border-color: #111;
}
.login_btn {
  text-align: center;
}
/deep/ .el-button {
  color: #fff;
  background-color: #111;
  font-size: 14px;
  border-color: #111;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.login_btn button {
  width: 170px;
  height: 35px;
  color: #fff;
  background-color: #111;
  font-size: 16px;
  border-color: #111;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  margin-top: 40px;
  letter-spacing: 10px;
}

.login {
  width: 300px;
  height: 300px;
  // background-color: green;
  margin: 0 auto;
  padding: 20px 0;
}
.title {
  font-size: 18px;
  padding: 20px;
  letter-spacing: 2px;
}
.bgc {
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>

