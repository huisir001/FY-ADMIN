/*
 * @Description: 个人组件封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 17:33:54
 * @LastEditTime: 2021-11-03 17:50:45
 */
import { App } from '@vue/runtime-core'
import Icon from './Icon/index.vue'
import Table from './Table/index.vue'


const components = [
    Icon,
    Table
]

export default (app: App<any>) => {

    // 组件注册
    components.forEach((component) => {
        app.component(`Z${component.name}`, component)
    })

    return app
}