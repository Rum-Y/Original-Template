import Cookies from "js-cookie";
import router from '@/router';
import { SessionUtils } from "../utils";

// 退出登录
export function logout () {
    Cookies.remove("jwtToken")
    //Cookies.remove("schoolCode")
    SessionUtils.remove('persistenceSchoolCode')
    router.push("/login")
}

// 废弃，改用vuex方案
// export function getSchoolCode() {
//     return Cookies.get("schoolCode")
// }