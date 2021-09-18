/*
 * @Description: 入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-09-18 19:28:29
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, storeKey } from './store'
import ui from './utils/ui'
import './assets/styles/index.scss'

/**
 * Mockjs
 */
process.env.NODE_ENV == "development" && require('./mock')

createApp(App).use(store, storeKey).use(router).use(ui).mount('#app')