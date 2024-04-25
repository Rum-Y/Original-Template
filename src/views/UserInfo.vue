<template>
    <el-table :data="userInfo" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="username" label="学校名称" />
      <el-table-column prop="schoolCode" label="学校代码" width="180" />
      <el-table-column prop="firstLoginTime" label="首次登录时间" />
      <el-table-column prop="lastLoginTime" label="最近登录时间" width="180" />
      <el-table-column prop="isLocked" label="是否处于锁定状态(1为是0为否)" />
      <el-table-column label="操作">
        <template #default="{$index}">
            <el-button v-if="userInfo[$index].isLocked == '0'" type="danger" plain @click="lock(userInfo[$index].schoolCode)">
                锁定
            </el-button>
            <el-button v-if="userInfo[$index].isLocked == '1'" type="primary" plain @click="unlock(userInfo[$index].schoolCode)">
                解锁
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageStyle">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="userInfoList.length"
        />
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { getUserInfos, lockUserBySchoolCode, unlockUserBySchoolCode } from '@/request/api.js'
import { ElMessage } from "element-plus"

const currentPage = ref(1)
const pageSize = ref(10) // 每页显示数
const userInfoList = reactive([])

const userInfo = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return userInfoList.slice(start, end);
})

const handleCurrentChange = (val) => {
    // 重新设置当前页码
    currentPage.value = val;
}

const getUserInfo = () => {
    getUserInfos().then(response => {
        userInfoList.splice(0, userInfoList.length, ...response.data)
    }).catch(error => {
        ElMessage.error("权限不足，获取信息失败")
    })
}

const lock = (schoolCode) => {
    lockUserBySchoolCode(schoolCode).then(response => {
        getUserInfo()
        ElMessage.success(response.msg)
        
    }).catch(error => {
        ElMessage.error("锁定失败")
    })
}

const unlock = (schoolCode) => {
    unlockUserBySchoolCode(schoolCode).then(response => {
        getUserInfo()
        ElMessage.success(response.msg)
        
    }).catch(error => {
        ElMessage.error("解锁失败")
    })
}

getUserInfo()

</script>

<style scoped>
    .pageStyle {
        position: absolute;
        left: 50%;
        margin-top: 30px;
    }
</style>