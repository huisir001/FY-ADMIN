/*
 * @Description: 公共工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 18:50:17
 * @LastEditTime: 2021-11-26 10:35:42
 */
import { RouteRecordRaw } from 'vue-router'

/**
 * 防抖
 */
export const debounce = (callback: () => void, delay: number) => {
    let timeout: NodeJS.Timeout
    return (...args: []) => {
        clearTimeout(timeout)	//所有频繁的操作都会被清空，只有最后一次的不会清空
        timeout = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}

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
 * 递归转换
 * children tree =>  parentId list
 */
export const tree2RawList = (treeData: IObj[], idKey: string = 'id', parentIdKey: string = 'parentId', childKey: string = 'children') => {
    if (treeData.length === 0) {
        return []
    }
    let copyTreeData = JSON.parse(JSON.stringify(treeData))
    let rawList: IObj[] = [];

    (function Recursion(prevList: IObj[], pid: any = null) {

        const concatList = prevList.map((item: IObj) => {
            if (item[childKey] && item[childKey].length) {
                Recursion(item[childKey], item[idKey])
                delete item[childKey]
            }
            item[parentIdKey] = pid
            return item
        })

        rawList = rawList.concat(concatList)
    })(copyTreeData)

    return rawList
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
 * 前端关键字模糊搜索
 */
export const fuzzySearch = (listData: any[], inputVal: string) => listData
    .filter((item) => JSON.stringify(item).includes(inputVal))

/**
 * 将字符串转为文档下载
 */
export const exportRaw = (name: string, data: string) => {	//将字符串转存为文件
    //定义文件内容，类型必须为Blob 否则createObjectURL会报错
    let content = new Blob([data]);
    //生成url对象
    let urlObject = window.URL || window.webkitURL || window;
    let url = urlObject.createObjectURL(content);
    //生成<a></a>DOM元素
    let el = document.createElement("a");
    //链接赋值
    el.href = url;
    el.download = name;
    //必须点击否则不会下载
    el.click();
    //移除链接释放资源
    urlObject.revokeObjectURL(url);
}