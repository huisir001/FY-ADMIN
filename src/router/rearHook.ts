/*
 * @Description: 路由后置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-20 18:59:01
 * @LastEditTime: 2021-10-21 18:32:28
 */
import { TITLE } from '@/settings'
import { NavigationHookAfter } from 'vue-router'
import PageLoading from '@/utils/PageLoading'
import { store } from '@/store'

const rearHook: NavigationHookAfter = (to) => {
    // 更改Tab标题
    document.title = (to.meta.title || (to.name as string).toUpperCase()) + ' - ' + TITLE
    // 关闭loading
    PageLoading.hide()
    // 更新历史记录
    store.commit('temp/addHistoryRoute', to)
}

export default rearHook