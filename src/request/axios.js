import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {"Content-Type": 'application/json'}
})

// 请求拦截
instance.interceptors.request.use(
    async config => {
        // 获取token并携带请求头进行请求
        const token = Cookies.get("jwtToken")
        if(token && config.url !== '/login')
            config.headers['Authorization'] = `Bearer ${token}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(
    async response => {
        return response.data // 过滤一层data节点
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance





