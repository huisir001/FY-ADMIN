/*
 * @Description: 入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-11-22 10:40:08
 */
import { createApp } from 'vue'
import App from './App.vue'
import options from './options'
import router from './router'
import { store, storeKey } from './store'
import ui from './ui'
import directives from './directives'

// tslint:disable-next-line:import-spacing
import './assets/styles/index.scss';

// Mockjs
// tslint:disable:align
// tslint:disable:no-var-requires
; ($GLOBAL.NODE_ENV === "development") && require('./mock')

createApp(App)
    .use(options)
    .use(store, storeKey)
    .use(router)
    .use(ui)
    .use(directives)
    .mount('#app')