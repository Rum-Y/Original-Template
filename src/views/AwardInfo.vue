<template>
    <el-table :data="awardInfo" border style="width: 100%">
      <el-table-column prop="schoolCode" label="学校代码" width="180" />
      <el-table-column prop="username" label="学校名称" />
      <el-table-column prop="projectCode" label="赛项代码" width="180" />
      <el-table-column prop="projectName" label="赛项名称" />
      <el-table-column prop="teamIndex" label="队伍(第x队)" width="180" />
      <el-table-column prop="award" label="奖项" width="180" />
      <el-table-column prop="remark" label="备注" width="180" />
      <el-table-column label="操作">
        <template #default="{$index}">
            <el-button type="primary" plain @click="getpersonnelsInfo(awardInfo[$index].schoolCode, awardInfo[$index].projectCode, awardInfo[$index].teamIndex)">
                查看获奖人员信息
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
            :total="awardInfoList.length"
        />
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { getAwardInfoBySchoolCode } from '@/request/api.js'
import { ElMessage } from "element-plus"
import { useStore } from 'vuex'
import router from '@/router';

const store = useStore();

const currentPage = ref(1)
const pageSize = ref(10) // 每页显示数
const awardInfoList = reactive([])

const awardInfo = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return awardInfoList.slice(start, end);
})

const handleCurrentChange = (val) => {
    // 重新设置当前页码
    currentPage.value = val;
}

const getAwardInfo = () => {
    getAwardInfoBySchoolCode(store.state.persistenceSchoolCode).then(response => {
        awardInfoList.splice(0, awardInfoList.length, ...response.data)
    }).catch(error => {
        ElMessage.error("获奖名单获取失败")
    })
}

// 跳至informationCheck页面再查询获得该奖项的人员名单
const getpersonnelsInfo = (schoolCode, projectCode, teamIndex) => {

    store.commit('updateSchoolCode', schoolCode);
    store.commit('updateprojectCode', projectCode);
    store.commit('updateteamIndex', teamIndex);
    router.push('/informationCheck')

}

getAwardInfo()

</script>

<style scoped>
    .pageStyle {
        position: absolute;
        left: 50%;
        margin-top: 30px;
    }
</style>