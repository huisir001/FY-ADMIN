/*
 * @Description:ElementUI按需引入
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 17:33:54
 * @LastEditTime: 2021-09-26 14:16:48
 */

/* 使用vue插件方式导出组件，插件API：https://v3.cn.vuejs.org/guide/plugins.html */

import { App, Plugin } from '@vue/runtime-core'

import {
    ElMenu,
    ElIcon,
    ElButton,
    ElForm,
    ElFormItem,
    ElRadioGroup,
    ElRadio,
    ElDialog,
    ElTabs,
    ElTabPane,
    ElImage,
    ElUpload,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElInput,
    ElInputNumber,
    ElTable,
    ElTableColumn,
    ElMessage,
    ElLoading,
    ElDivider,
    ElPopover,
    ElSwitch,
    ElDrawer,
    ElDatePicker,
    ElPagination,
    ElDescriptions,
    ElDescriptionsItem
} from 'element-plus'

const components = [
    ElMenu,
    ElIcon,
    ElButton,
    ElForm,
    ElFormItem,
    ElRadioGroup,
    ElRadio,
    ElDialog,
    ElTabs,
    ElTabPane,
    ElImage,
    ElUpload,
    ElInput,
    ElInputNumber,
    ElTable,
    ElTableColumn,
    ElMessage,
    ElLoading,
    ElDivider,
    ElPopover,
    ElDrawer,
    ElSwitch,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElDatePicker,
    ElPagination,
    ElDescriptions,
    ElDescriptionsItem,
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