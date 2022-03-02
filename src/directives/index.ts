/*
 * @Description: 指令注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-26 16:01:20
 * @LastEditTime: 2022-03-02 16:25:01
 */
import { App } from 'vue'
import contextMenu from './contextMenu'
import copy from './copy'

export default (app: App<any>, option?: any) => {

    // 右键菜单
    app.directive('contextMenu', contextMenu)
    // 拷贝到剪贴板
    app.directive('copy', copy)

    return app
}