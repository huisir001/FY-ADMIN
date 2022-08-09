/*
 * @Description: 路由后置钩子
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-20 18:59:01
 * @LastEditTime: 2022-08-09 17:05:26
 */
import { TITLE } from 'settings'
import { NavigationHookAfter } from 'vue-router'
import PageLoading from '@/utils/PageLoading'
import { useUserStore, useSysStore } from '@/store'

const rearHook: NavigationHookAfter = (to) => {
    // store
    const userStore = useUserStore()
    const sysStore = useSysStore()

    // 框架标题获取
    if (to.name === 'Frame') {
        to.meta.title = (userStore.menus.find(
            (item) => item.id === to.params.id
        ) as IMenu).title
    }
    // 更改Tab标题
    to.meta.title && (document.title = to.meta.title + ' - ' + TITLE)
    // 关闭loading
    PageLoading.hide()
    // 更新历史记录
    sysStore.addHistoryRoute(to)
}

export default rearHook