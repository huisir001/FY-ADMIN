/*
 * @Description: svg-icon 全局按需注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 19:03:38
 * @LastEditTime: 2022-02-25 14:41:21
 */

/* 使用vue插件方式导出组件，插件API：https://v3.cn.vuejs.org/guide/plugins.html */

import { App } from 'vue'

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
    QuestionFilled,
    ArrowDown,
    ArrowUp,
    Grid,
    FullScreen,
    CreditCard,
    Postcard,
    Files,
    Document,
    DocumentChecked,
    DocumentDelete,
    Link,
    Monitor
} from '@element-plus/icons-vue'

/**
 * my-icons
 */
import Theme from './inc/Theme.vue'
import Export from './inc/Export.vue'
import Role from './inc/Role.vue'
import Layout from './inc/Layout.vue'
import ExitFullScreen from './inc/ExitFullScreen.vue'
import Module from './inc/Module.vue'
import PageManage from './inc/PageManage.vue'
import ClickButton from './inc/ClickButton.vue'
import LoginLogs from './inc/LoginLogs.vue'
import OnlineUser from './inc/OnlineUser.vue'


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
    QuestionFilled,
    ArrowDown,
    ArrowUp,
    Grid,
    FullScreen,
    CreditCard,
    Postcard,
    Files,
    Document,
    DocumentChecked,
    DocumentDelete,
    Link,
    Monitor,
    OnlineUser,
    /* my-icons */
    Theme,
    Export,
    Role,
    Layout,
    ExitFullScreen,
    Module,
    PageManage,
    ClickButton,
    LoginLogs
]

export default (app: App<any>) => {

    // 缓存所有图标用于菜单图标选择
    app.config.globalProperties.$getIcons = () => components.map(item => item.name)

    // 组件注册
    components.forEach((component) => {
        app.component(`Icon${component.name}`, component)
    })

    return app
}

