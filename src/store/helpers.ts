/*
 * @Description: 辅助 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-31 10:19:03
 * @LastEditTime: 2022-02-08 16:05:59
 */
import { RouteRecordRaw } from 'vue-router'

/**
 * views目录所有文件列表
 * vite编译内置方法import.meta.glob
 */
export const viewModules1 = import.meta.glob('../views/**/*.vue')
export const viewModules2 = import.meta.glob('../ui/pages/**/*.vue')
export const viewModules = { ...viewModules1, ...viewModules2 }

/**
 * menuItem => routeItem
 */
export const menu2Route = (menu: IMenu, menuList: IMenu[], Layout: any): RouteRecordRaw => {
    const { id, path, title, icon, redirectId, parentId, keepAlive, private: prvt, viewPath, visible } = menu
    // 路由的name直接使用id，避免冲突
    return {
        path,
        name: id,
        component: parentId ? viewModules[`../${viewPath}`] : Layout,
        ...(redirectId ? {
            redirect: { name: menuList.find((item: IMenu) => item.id === redirectId)!.id }
        } : {}),
        meta: { title, icon, keepAlive, private: prvt, visible }
    }
}