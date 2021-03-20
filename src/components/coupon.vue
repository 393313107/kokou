<template>
  <div>
    <!-- 代金券 -->
    <div>
      <el-input style="width: 100%;" placeholder="输入代金券号" v-model="input">
        <el-button slot="append" @click="change()">兑 换</el-button>
      </el-input>
    </div>
    <div class="imgs">
      <img class="empty" src="../assets/empty.png" />
      <span class="empty_text">暂无数据</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    change() {
      if (this.input == "") {
        this.$notify({
          message: "请输入兑换码",
          type: "warning",
          showClose: false,
        });
      } else {
        this.$notify.error({
          message: "抱歉，兑换码无效",
          showClose: false,
        });
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
.imgs {
  width: 328px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/deep/ .el-input-group__append {
  color: #fff;
  background-color: #111;
  font-size: 16px;
  border-color: #111;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
/deep/ .el-input-group {
  width: 328px;
  height: 45px;
}
/deep/ .el-input-group--append .el-input__inner {
  height: 45px;
}
.empty {
  width: 45px;
  height: 45px;
}
.empty_text {
  color: #999999;
  font-size: 13px;
}
</style>
