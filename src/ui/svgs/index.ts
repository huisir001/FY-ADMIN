/*
 * @Description: svg-icon 全局按需注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-01 19:03:38
 * @LastEditTime: 2022-03-02 18:19:11
 */

/* 使用vue插件方式导出组件，插件API：https://v3.cn.vuejs.org/guide/plugins.html */

import { App } from 'vue'

/**
 * element-plus/icons
 */
import * as elementIcons from '@element-plus/icons-vue'


/**
 * 自定义icon
 */
const myIcons = import.meta.globEager('./inc/*.vue')

export default (app: App<any>) => {

    // 所有icon
    const Icons: string[] = []

    // element-icon注册
    for (let elIconsName in elementIcons) {
        app.component(`Icon${elIconsName}`, (elementIcons as IObj)[elIconsName])
        Icons.push(elIconsName)
    }

    // 自定义icon注册
    for (let path in myIcons) {
        const comp = myIcons[path]
        app.component(`Icon${comp.default.name}`, comp.default)
        Icons.push(comp.default.name)
    }

    // 缓存所有图标用于菜单图标选择
    app.config.globalProperties.$getIcons = () => Icons

    return app
}

