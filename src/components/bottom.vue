<template>
  <!-- 官网首页底部-->
  <div>
    <div class="text" style="padding-top: 50px">
      <p class="T_time">服务电话支持： 每天 <b>8:00-22:00</b></p>
      <p class="T_phone" style="margin: 20px 0 30px 0">133-1299-0086</p>
    </div>
    <div class="border text" style="padding-top: 30px">
      <div class="divider nav">
        <el-link :underline="false">用户隐私条款</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link :underline="false">网站使用条款</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link :underline="false">销售服务条款</el-link>
      </div>
      <div class="size_color divider" style="padding-top: 30px">
        <p>© 2019 Kokou Co., Ltd. All rights reserved.</p>
        <p>深圳市贤仕实业有限公司</p>
      </div>
      <div class="size_color" style="padding-top: 30px">
        <span class="ad">广告</span>
        <span>KOKOU®品牌官网包含本品牌广告</span>
      </div>
      <p class="size_color1" style="padding-bottom: 30px">粤ICP备17107900号</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav /deep/ .el-link.el-link--default {
  color: #999;
}
.ad {
  width: 10px;
  height: 10px;
  background-color: #d3d3d3;
  color: #ffff;
  border-radius: 3px;
  margin-right: 5px;
}
.size_color1 {
  color: #bbb;
  font-size: 14px;
  // margin-bottom: 5px;
}
.size_color {
  color: #999;
  font-size: 90%;
}
.divider {
  // margin: 20px 0;
}
.border {
  border-top: 1px solid #ccc;
}
.T_phone {
  font-size: 230%;
  font-weight: 200;
  // margin: 20px 0;
  color: rgba(0, 0, 0, 0.65);
}
.T_time {
  font-size: 14px;
  color: #777;
}
.text {
  text-align: center;
  // margin-bottom: 20px;
  // margin-top: 40px;
}
</style>