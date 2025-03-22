<template>
  <el-main>
    <!-- <bread-crumbs class="bread-crumbs"></bread-crumbs> -->
    <router-view class="router-view"></router-view>
  </el-main>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.el-main {
  background-color: #f2edf3;
  padding: 0;
  padding-top: 60px;
}
.router-view {
  // padding: 20px;
  background: #ffffff;
  margin: 30px;
  padding-top: 10px;
  border-radius: 10px;
}
.bread-crumbs {
  position: absolute;
  right: 0;
  left: 200px;
  z-index: 99;
  border-bottom: 1px solid #e9eef3;
  border-top: 1px solid #e9eef3;
}
</style>
