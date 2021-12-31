/*
 * @Description: 辅助 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-31 10:19:03
 * @LastEditTime: 2021-12-31 10:20:45
 */
import { RouteRecordRaw } from 'vue-router'
/**
 * menuItem => routeItem
 */
export const menu2Route = (menu: IMenu, menuList: IMenu[], Layout: any): RouteRecordRaw => {
    const { id, path, title, icon, redirectId, parentId, keepAlive, private: prvt, viewPath } = menu
    // 路由的name直接使用id，避免冲突
    return {
        path,
        name: id,
        component: parentId ? () => import(`@/${viewPath}`) : Layout,
        ...(redirectId ? {
            redirect: { name: menuList.find((item: IMenu) => item.id === redirectId)!.id }
        } : {}),
        meta: { title, icon, keepAlive, private: prvt }
    }
}