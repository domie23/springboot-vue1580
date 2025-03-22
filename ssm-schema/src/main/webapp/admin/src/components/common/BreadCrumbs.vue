<template>
  <el-breadcrumb class="breadcrumbs" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="title">{{title}}</el-breadcrumb-item>
    <!-- <el-breadcrumb-item :to="{ path: '/userList' }">用户列表</el-breadcrumb-item> -->
  </el-breadcrumb>
</template>
<script>
export default {
	props:['title']
};
</script>
<style lang="scss" scoped>
.breadcrumbs {
  padding: 20px;
  background: #ffffff;
}
</style>
