/*
 * @Description: 个人组件封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 17:33:54
 * @LastEditTime: 2021-11-04 18:12:53
 */
import { App } from '@vue/runtime-core'
import Icon from './Icon/index.vue'
import Table from './Table/index.vue'
import SearchForm from './SearchForm/index.vue'


const components = [
    Icon,
    Table,
    SearchForm
]

export default (app: App<any>) => {

    // 组件注册
    components.forEach((component) => {
        app.component(`Z${component.name}`, component)
    })

    return app
}