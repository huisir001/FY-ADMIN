/*
 * @Description: svg-icon 全局注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 19:03:38
 * @LastEditTime: 2021-11-01 19:14:57
 */

/* 使用vue插件方式导出组件，插件API：https://v3.cn.vuejs.org/guide/plugins.html */

import { App } from '@vue/runtime-core'
import { Fold } from '@element-plus/icons'

const components = [
    Fold
]

export default (app: App<any>) => {
    // 组件注册
    components.forEach((component) => {
        app.component(`Icon${component.name}`, component)
    })

    return app
}

