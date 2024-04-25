import axios from '@/request/axios.js';
import router from '@/router';
import { ElMessage, ElLoading } from "element-plus"
import Cookies from 'js-cookie';
import store from '../store';

// 开启全屏加载幕布
const openFullScreen = () => {
    return ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
}

export async function toLogin(user) {

    return await axios.post('/login', user)
        .then(response => {
            if(response.data){ // if has token success
                Cookies.set("jwtToken", response.data.token) // 将token信息存储在Cookie中
                store.commit('updatePersistenceSchoolCode', response.data.userSchoolCode)
                //Cookies.set("schoolCode", response.data.userSchoolCode)
                router.push("/layout")
                ElMessage.success(response.msg)
            }else{
                ElMessage.error(response.msg)
            }
        })
        .catch(error => {
            ElMessage.error("登录出错了") // 打印错误信息
        })
}

export async function connectSQL(connectSQLDTO) {
    const loading = openFullScreen()
    return await axios.post('/sql/one-level', connectSQLDTO)
        .then(response => {
            loading.close() // 关闭加载
            ElMessage.success(response.msg)
            router.push("/sqlOpration")
        })
        .catch(error => {
            loading.close()
            ElMessage.error("连接超时，请检查填写信息是否正确")
        })
}

export async function getTableInfoByTableName(dbName, tableName) {
    return await axios.get('/sql/two-level',
    {
        params: {
            dbName,
            tableName
        }
    })
}

export async function getDbNamesTableNames() {
    return await axios.get('/sql/one-level')
}

export async function testToken() {
    return await axios.get('testToken')
}

export async function executeSql(sqlDTO) {
    return await axios.post('/sql/two-level', sqlDTO)
}

export async function getCheckCode() {
    return await axios.get('/checkCode')
}

// 以下为信息检查的方法
export async function getAwardInfoBySchoolCode(schoolCode) {
    return await axios.get('/award/awardInfo',
    {
        params: {
            schoolCode
        }
    })
}

export async function getAwardee(schoolCode, projectCode,teamIndex) {
    return await axios.get('/award/awardee',
    {
        params: {
            schoolCode,
            projectCode,
            teamIndex,
        }
    })
}

export async function updateAwardeeInfo(awardeeVo) {

    return await axios.post('/award/updateAwardee',awardeeVo)
}

export async function getUserInfos() {

    return await axios.get('/users')
}

export async function lockUserBySchoolCode(schoolCode) {

    return await axios.get('/lock',
    {
        params: {
            schoolCode
        }
    })
}

export async function unlockUserBySchoolCode(schoolCode) {

    return await axios.get('/unlock',
    {
        params: {
            schoolCode
        }
    })
}