/*
 * @Description: Vue 应用 config 配置设置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-22 10:12:06
 * @LastEditTime: 2021-11-22 11:30:29
 */
import { App } from 'vue'
import properties from './properties'

/**
 * Vue 应用 config 配置设置
 * Doc:https://v3.cn.vuejs.org/api/application-config.html
 */

export default (app: App<any>) => app.use(properties)