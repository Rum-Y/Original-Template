import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import store from './store'

// codemirror relate



const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)

// 定义全局变量，此方式便于直接在模板中使用双花括号使用
app.config.globalProperties.msg = "ForYou"


// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
