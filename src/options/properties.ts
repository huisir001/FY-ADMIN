/*
 * @Description: globalProperties
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-22 10:42:43
 * @LastEditTime: 2021-11-22 10:44:15
 */
import { App } from 'vue'
/**
 * 添加一个可以在应用的任何组件实例中访问的全局 property。
 * 组件的 property 在命名冲突具有优先权。
 */
export default (app: App<any>) => {

    // app.config.globalProperties.$http = () => {}

    return app
}
