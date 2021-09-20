/*
 * @Description: 路由后置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-20 18:59:01
 * @LastEditTime: 2021-09-20 19:03:20
 */
// tslint:disable-next-line:no-var-requires
const { Title } = require('@/settings/common')
import { NavigationHookAfter } from 'vue-router'

const rearHook: NavigationHookAfter = (to, from, failure) => {
    // 更改Tab标题
    document.title = (to.meta.title || (to.name as string).toUpperCase()) + ' | ' + Title
}

export default rearHook