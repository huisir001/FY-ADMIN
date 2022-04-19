/*
 * @Description: 入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2022-04-19 10:25:13
 */
import { createApp } from 'vue'
import App from './App.vue'
import options from './options'
import router from './router'
import { store, storeKey } from './store'
import ui from './ui'
import directives from './directives'
import i18n from './i18n'
import './assets/styles/index.scss'

createApp(App)
    .use(store, storeKey)
    .use(router)
    .use(ui)
    .use(directives)
    .use(i18n)
    .use(options)
    .mount('#app')