// vuex数据持久化工具类
export class SessionUtils {
    static get(key) {
        return window.sessionStorage.getItem(key)
    }
    static set(key, value) {
        return window.sessionStorage.setItem(key, value)
    }
    static remove(key) {
        return window.sessionStorage.removeItem(key)
    }
}