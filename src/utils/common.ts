/*
 * @Description: 公共工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 18:50:17
 * @LastEditTime: 2021-12-27 10:49:51
 */
import { RouteRecordRaw } from 'vue-router'

/**
 * 递归转换菜单
 * parentId list => children tree
 */
export const rawList2Tree = (arrList: IObj[], parentIdKey: string = 'parentId', childKey: string = 'children') => {
    if (arrList.length === 0) {
        return []
    }

    let menuTree: IObj[] = []

    !function Recursion(pid?: string) {
        const tempArr: IObj[] = []
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < arrList.length; index++) {
            const item = arrList[index]
            // 如果没有父id（第一次递归的时候）将所有父级查询出来
            // 这里认为 !item[parentIdKey] 是最顶层
            if (pid ? item[parentIdKey] === pid : !item[parentIdKey]) {
                // 通过父节点ID查询所有子节点
                item[childKey] = Recursion(item.id)
                tempArr.push(item)
            }
        }
        if (!pid) {
            menuTree = tempArr
        }
        return tempArr
    }()

    return menuTree
}

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

/**
 * 下拉选父节点列表
 * parentId list -> select option data
 */
export const pidList2SelectOptions = (list: any[], labelKey: string = 'label', valKey: string = 'value') => {
    // 递归找父级label
    // 这里默认父级Id字段名为parentId
    let labels: any[] = []
    const getParentLabel = (currData: IObj, flag?: boolean) => {
        if (!flag) {
            labels = []
        }
        labels.unshift(currData[labelKey])
        if (currData.parentId) {
            getParentLabel(list.find(item => item.id === currData.parentId), true)
        }
    }

    return list.map((item, index) => {
        getParentLabel(item)
        return {
            label: labels.join(' > '),
            value: item[valKey]
        }
    })
}