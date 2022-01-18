/*
 * @Description: 个人组件封装
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 17:33:54
 * @LastEditTime: 2022-01-18 10:35:30
 */
import { App } from 'vue'
import Icon from './Icon/index.vue'
import Table from './Table/index.vue'
import RowBtns from './Table/RowBtns.vue'
import SearchForm from './SearchForm/index.vue'
import EditDialog from './EditDialog/index.vue'
import FileLibrary from './FileLibrary/index.vue'
import IconSelect from './IconSelect/index.vue'
import TreeSelect from './TreeSelect/index.vue'
import FuzzySearch from './FuzzySearch/index.vue'
import Container from './Container/index.vue'
import Card from './Card/index.vue'


const components: IObj = {
    Icon,
    Table,
    RowBtns,
    SearchForm,
    EditDialog,
    FileLibrary,
    IconSelect,
    TreeSelect,
    FuzzySearch,
    Container,
    Card
}

export default (app: App<any>) => {

    // 组件注册
    for (const key in components) {
        const component = components[key];
        app.component(`Fy${key}`, component)
    }

    return app
}