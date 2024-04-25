<template>
    <el-scrollbar>
        <!-- el-menu-item实现路由跳转第一步需添加router -->
        <!-- 设定:default-active="this.$route.path"后，
        无论是哪种形式的路由跳转侧边栏的active都会跟着变 -->
        <el-menu 
            :default-active="this.$route.path"
            :default-openeds="['1']"
            router>
            <el-sub-menu index="1">
                <!-- 图标 -->
                <template #title>
                    <el-icon><message /></el-icon>通知
                </template>
                <el-menu-item-group>
                <!-- <template #title>Group 1</template> -->
                    <!-- 第二步需要在index中添加子路由的路径 -->
                    <el-menu-item index="/index">首页</el-menu-item>
                </el-menu-item-group>
                <!-- <el-sub-menu index="1-4">
                    <template #title>Option4</template>
                    <el-menu-item index="#">Option 4-1</el-menu-item>
                </el-sub-menu> -->
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon><Menu /></el-icon>功能列表
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/awardInfo">获奖名单</el-menu-item>
                    <el-menu-item index="/userInfo">用户列表</el-menu-item>
                </el-menu-item-group>
                <!-- <el-sub-menu index="2-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="#">Option 4-1</el-menu-item>
                </el-sub-menu> -->
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<script setup>

</script>

<style scoped>
    .el-menu {
        --el-menu-bg-color:#303133;
        --el-menu-text-color: #D4D7DE;
        --el-menu-hover-bg-color: #909399;
        border-right: solid 1px #303133;
    }
</style>