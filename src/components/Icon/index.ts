/*
 * @Description: svg-icon 全局按需注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 19:03:38
 * @LastEditTime: 2021-11-02 00:08:17
 */

/* 使用vue插件方式导出组件，插件API：https://v3.cn.vuejs.org/guide/plugins.html */

import { App } from '@vue/runtime-core'
import Icon from './Icon.vue'

/**
 * element-plus/icons
 */
import {
    Fold,
    Search,
    Check,
    Close,
    ArrowLeft,
    ArrowRight,
    SortDown,
    SortUp,
    Edit,
    Delete,
    Plus,
    User,
    Key,
    Sort,
    FolderOpened,
    Refresh,
    Setting,
    Operation,
    Menu,
} from '@element-plus/icons'

/**
 * my-icons
 */
import {
    Theme
} from '../svgs/index'

const components = [
    /* el-icons */
    Fold,
    Search,
    Check,
    Close,
    ArrowLeft,
    ArrowRight,
    SortDown,
    SortUp,
    Edit,
    Delete,
    Plus,
    User,
    Key,
    Sort,
    FolderOpened,
    Refresh,
    Setting,
    Operation,
    Menu,
    /* my-icons */
    Theme,
]

export default (app: App<any>) => {
    // Icon封装
    app.component('Icon', Icon)

    // 组件注册
    components.forEach((component) => {
        app.component(`Icon${component.name}`, component)
    })

    return app
}

