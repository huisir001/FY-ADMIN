/*
 * @Description: 入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-11-01 19:18:56
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, storeKey } from './store'
import ui from './utils/ui'
import directives from './directives'
import icons from '@/components/Icon/install'

// tslint:disable-next-line:import-spacing
import './assets/styles/index.scss';

// Mockjs
// tslint:disable:align
// tslint:disable:no-var-requires
; ($GLOBAL.NODE_ENV === "development") && require('./mock')

createApp(App).use(store, storeKey).use(router).use(ui).use(icons).use(directives).mount('#app')