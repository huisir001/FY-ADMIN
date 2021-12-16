/*
 * @Description: 个人组件封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 17:33:54
 * @LastEditTime: 2021-12-16 17:23:10
 */
import { App } from 'vue'
import Icon from './Icon/index.vue'
import Table from './Table/index.vue'
import RowBtns from './Table/RowBtns.vue'
import SearchForm from './SearchForm/index.vue'
import EditDialog from './EditDialog/index.vue'


const components = [
    Icon,
    Table,
    RowBtns,
    SearchForm,
    EditDialog
]

export default (app: App<any>) => {

    // 组件注册
    components.forEach((component) => {
        app.component(`Fy${component.name}`, component)
    })

    return app
}