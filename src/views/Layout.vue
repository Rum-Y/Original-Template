<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px">
      <Sidebar/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>

      <el-main>
        <!--第三步放置子路由跳转位置-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

</script>

<style scoped>
.layout-container-demo .el-header {
  /* 可根据这个相对定位调整header的位置 */
  position: relative;
  background-color: #409EFF;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}

/* 侧边栏底部颜色 */
.layout-container-demo .el-aside {
    background: #303133;
}
.el-container {
    /*需要配合FlexBox使用*/
    height: 100vh;
}
</style>
