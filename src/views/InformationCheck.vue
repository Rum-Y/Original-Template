<template>
    <h3 class="tip">本页面包含该奖项的参赛学生及指导老师名单，仅能修改身份证号及手机号码，其他信息不可修改，请以教育厅最终发文为准。</h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="schoolCode" label="学校代码" width="180" />
      <el-table-column prop="projectCode" label="赛项代码" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="idCard" label="身份证号" />
      <el-table-column prop="tel" label="电话号码" />
      <el-table-column prop="teamIndex" label="队伍(第x队)" width="180" />
      <el-table-column label="操作">
        <template #default="{$index}">
            <el-button type="primary" plain @click="updateInformation($index, tableData[$index].awardeeId)">
                编辑
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
            :total="tableDataList.length"
        />
    </div>
    
    <!-- 弹出表单 -->
    <el-dialog
        v-model="dialogVisible"
        title="修改信息"
        width="500"
    >
        <el-form
            :label-position="labelPosition"
            label-width="auto"
            :model="tableData"
            style="max-width: 600px"
        >
            <el-form-item label="学校代码">
                <el-input disabled v-model="tableData[updateIndex].schoolCode" />
            </el-form-item>
            <el-form-item label="赛项代码">
                <el-input disabled v-model="tableData[updateIndex].projectCode" />
            </el-form-item>
            <el-form-item label="姓名">
                <el-input disabled v-model="tableData[updateIndex].name" />
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="tableData[updateIndex].idCard" />
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="tableData[updateIndex].tel" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
                <el-button type="primary" @click="updateAwardeeById(updateIndex)">提交</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { getAwardee } from '@/request/api.js'
import { updateAwardeeInfo } from '@/request/api.js'
import router from '@/router';
import { ElMessage } from "element-plus"

const store = useStore();

const labelPosition = ref('left')
const dialogVisible = ref(false)
const currentPage = ref(1)
const pageSize = ref(10) // 每页显示数
const tableDataList = reactive([])
const updateIndex = ref(0)
const awardeeId = ref(null)

const tableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tableDataList.slice(start, end);
})

const updateInformation = (index, awardeeIdArgs) => {
    updateIndex.value = index // 修改索引
    awardeeId.value = awardeeIdArgs // 修改人员ID
    dialogVisible.value = true // 开弹框
}

const updateAwardeeById = (index) => { // 提交需要修改的信息
    //const awardeeVo = JSON.stringify(tableDataList[index]);
    // 修改用户信息
    updateAwardeeInfo(tableDataList[index]).then(response => {
        ElMessage.success("修改成功")
        router.push('/awardInfo')
    }).catch(error => {
        ElMessage.error("修改失败，出错了")
        router.push('/awardInfo')
    })
    dialogVisible.value = false // 关弹框
}

const handleCurrentChange = (val) => {
    // 重新设置当前页码
    currentPage.value = val;
}

getAwardee(store.state.schoolCode, store.state.projectCode, store.state.teamIndex).then(response => {
    tableDataList.splice(0, tableDataList.length, ...response.data)
}).catch(error => {
    ElMessage.error("出错了")
})

</script>

<style scoped>
    .pageStyle {
        position: absolute;
        left: 50%;
        margin-top: 30px;
    }
    .tip {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>