/*
 * @Description:ElementUI按需引入
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 17:33:54
 * @LastEditTime: 2021-09-02 10:35:26
 */

/* 使用vue插件方式导出组件，插件API：https://v3.cn.vuejs.org/guide/plugins.html */

import { App, Plugin } from '@vue/runtime-core'

import {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElTable,
    ElTableColumn,
    ElMessage,
    ElLoading,
    ElDivider,
    ElPopover,
    ElSwitch,
    ElDatePicker,
    ElPagination,
    ElDescriptions,
    ElDescriptionsItem
} from 'element-plus'

// 样式
import './variables.scss'

const components = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElTable,
    ElTableColumn,
    ElMessage,
    ElLoading,
    ElDivider,
    ElPopover,
    ElSwitch,
    ElDatePicker,
    ElPagination,
    ElDescriptions,
    ElDescriptionsItem
]

interface iElementUIOption {
    size: string
    zIndex: number
}

export default (app: App<any>, option: iElementUIOption = { size: 'small', zIndex: 3000 }) => {
    // 配置项
    app.config.globalProperties.$ELEMENT = option

    // 组件注册
    components.forEach((component) => app.use(component as Plugin))

    return app
}