<template>
    <el-row :gutter="0">
        <el-col :span="23"><div class="grid-content ep-bg-purple" />
            <div class="toolbar">
            <h3>INFORMATION CHECK</h3>
            </div>
        </el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" />
            <div class="toolbar">
                <el-dropdown trigger="click">
                    <div class="demo-type">
                        <el-avatar :size="45" :src="imgUrl" @error="errorHandler">
                        </el-avatar>
                    </div>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toPersonalCenter('/personal-center')">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="excuteLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router'
    import {ElMessage} from 'element-plus'
    import {logout} from '@/assets/common.js'

    const router = useRouter()
    const imgUrl = ref("/imgs/1503291130-1.jpg")

    const errorHandler = () => {
        imgUrl.value = "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        ElMessage.error("头像加载失败了");
    }

    const toPersonalCenter = path => {
        router.push(path)
    }

    const excuteLogout = () => {
        logout()
    }


</script>

<style scoped>
    .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
        color: #FAFAFA;
    }
    /* 去除a链接的默认样式 */
    .personal-center {
        color: var(--el-text-color-regular);
        text-decoration: none;
    }
    /* 鼠标悬浮效果 */
    .personal-center:hover {
        color: var(--el-dropdown-menuItem-hover-color);
    }
    .el-col {
        height: 60px;
    }
</style>