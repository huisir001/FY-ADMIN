/*
 * @Description: 入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2022-04-18 17:12:06
 */
import { createApp } from 'vue'
import App from './App.vue'
import options from './options'
import router from './router'
import { store, storeKey } from './store'
import ui from './ui'
import directives from './directives'
import './assets/styles/index.scss'

createApp(App)
    .use(options)
    .use(store, storeKey)
    .use(router)
    .use(ui)
    .use(directives)
    .mount('#app')