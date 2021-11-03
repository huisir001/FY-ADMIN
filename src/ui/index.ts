/*
 * @Description: UI全局注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-03 17:24:53
 * @LastEditTime: 2021-11-03 17:54:49
 */
import { App } from '@vue/runtime-core'
import element from './element'
import svgs from './svgs'
import zui from './zui'

export default (app: App<any>) => {

    app.use(element).use(svgs).use(zui)

    return app
}