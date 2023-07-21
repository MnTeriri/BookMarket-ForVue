import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const instance = axios.create({
    baseURL: 'http://localhost:80/api',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});// 根据需要进行配置
instance.defaults.withCredentials = true//设置axios发送cookie信息到后端
// const axiosPlugin = {
//     install(app) {
//
//     },
// };
const app = createApp(App)
app.config.globalProperties.$axios = instance;
app.use(router)

// app.use(axiosPlugin)
app.mount('#app')
