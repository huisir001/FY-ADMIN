/*
 * @Description:ElementUI按需引入
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 17:33:54
 * @LastEditTime: 2021-11-01 12:31:44
 */

/* 使用vue插件方式导出组件，插件API：https://v3.cn.vuejs.org/guide/plugins.html */

import { App, Plugin } from '@vue/runtime-core'

import {
    ElBreadcrumb,
    ElMenu,
    ElIcon,
    ElButton,
    ElForm,
    ElSelect,
    ElRadio,
    ElDialog,
    ElTabs,
    ElImage,
    ElUpload,
    ElDropdown,
    ElInput,
    ElInputNumber,
    ElTable,
    ElDivider,
    ElPopover,
    ElSwitch,
    ElDrawer,
    ElTag,
    ElDatePicker,
    ElPagination,
    ElDescriptions,
    ElPopconfirm,
    ElTooltip
} from 'element-plus'

const components = [
    ElBreadcrumb,
    ElMenu,
    ElIcon,
    ElButton,
    ElForm,
    ElSelect,
    ElRadio,
    ElDialog,
    ElTabs,
    ElImage,
    ElUpload,
    ElInput,
    ElInputNumber,
    ElTable,
    ElDivider,
    ElPopover,
    ElDrawer,
    ElSwitch,
    ElTag,
    ElDropdown,
    ElDatePicker,
    ElPagination,
    ElDescriptions,
    ElPopconfirm,
    ElTooltip
]

interface IElementUIOption {
    size: string
    zIndex: number
}

export default (app: App<any>, option: IElementUIOption = { size: 'small', zIndex: 3000 }) => {
    // 配置项
    app.config.globalProperties.$ELEMENT = option

    // 组件注册
    components.forEach((component) => app.use(component as Plugin))

    return app
}