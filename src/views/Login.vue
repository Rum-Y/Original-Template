<template>
    <div class="login_form">
        <el-card class="box-card">
            <h3 class="login_title">INFORMATION CHECK</h3>
            <el-form
                ref="loginForm"
                :model="loginData"
                
                :rules="formRules"
            >
                <el-form-item name="schoolCode" prop="schoolCode" required>
                    <el-input v-model="loginData.schoolCode" placeholder="请输入学校代码" />
                </el-form-item>
                <el-form-item name="password" prop="password" required>
                    <el-input v-model="loginData.password" type="password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item class="checkCodeClass" name="checkCode" prop="checkCode" required>
                    <el-input style="width: 75%" v-model="loginData.checkCode" placeholder="请输入算术答案进行校验" />
                    <el-image @click="checkCode" style="width: 24%; height: 100%" :src="checkCodeImg" :fit="fit" />
                </el-form-item>
                <!-- <el-form-item>
                    <el-checkbox @click="isRememberFun" label="记住密码" />
                </el-form-item> -->
                <el-button style="width: 100%" type="primary" @click="login(loginForm)">登录</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive } from "vue"
import { ref } from 'vue'
import { toLogin } from '@/request/api.js'
import { ElMessage } from "element-plus"
import { getCheckCode } from '@/request/api.js'


const isRemember = ref(false)
const checkCodeImg = ref(null)

const loginData = reactive({
    schoolCode: '',
    password: '',
    checkCode: ''
})
// 提交前先验证表单内容是否符合验证规则
const loginForm = ref(null)
const login = (formEl) => {
    formEl.validate(valid => {
        if(!valid){
            ElMessage.warning("请填写完整所需信息")
        }else{
            toLogin(loginData)
        }
    })
    
}

const isRememberFun = () => {
    isRemember.value = ! isRemember.value
}
// 校验规则，配合rules和prop使用
const formRules = {
    username: [
        {  required: true, message: '学校代码为必填项', trigger: 'change' }
    ],
    password: [
        { required: true, message: '密码为必填项', trigger: 'change' }
    ],
    checkCode: [
        { required: true, message: '请输入验证码', trigger: 'change'}
    ]
}

const checkCode = () => {
    getCheckCode().then(response => {
        checkCodeImg.value = "data:image/png;base64,"+response.data
    }).catch(error => {
        ElMessage.error("验证码获取失败")
    })
}

checkCode()

</script>

<style scoped>
    .login_form {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        /* background-size: cover;
        background-repeat: no-repeat;
        animation: fadeInOut 21s linear infinite; */
    }
    /* @keyframes fadeInOut {
        0%, 100% {
            background-image: url("/imgs/lnzyw.png");
            opacity: 1;
        }
        33% {
            background-image: url("/imgs/lnzy.png");
            opacity: 1;
        }
        66% {
            background-image: url("/imgs/shqm.png");
            opacity: 1;
        }
    } */
    /*调整为透明颜色*/
    .login_form .el-card {
        width: 20%;
        padding: 35px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    /* 表单标题 */
    .login_title {
        text-align: center;
        margin-top: 0px;
        margin-bottom: 25px;
        color: blue;
    }
    /* 修改字体颜色 */
    .el-checkbox{
        color: black;
    }
    .checkCodeClass {
        display: flex;
    }
</style>>