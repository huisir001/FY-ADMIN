/*
 * @Description: 入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-02 16:37:14
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elemUi from './ui'

//mockjs
process.env.NODE_ENV == "development" && require('./mock')

createApp(App).use(store).use(router).use(elemUi).mount('#app')