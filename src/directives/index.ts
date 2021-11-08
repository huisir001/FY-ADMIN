/*
 * @Description: 指令注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-26 16:01:20
 * @LastEditTime: 2021-11-08 12:46:41
 */
import { App } from 'vue'
import contextMenu from './contextMenu'

export default (app: App<any>, option?: any) => {

    // 右键菜单
    app.directive('contextMenu', contextMenu)

    return app
}