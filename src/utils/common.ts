/*
 * @Description: 公共工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 18:50:17
 * @LastEditTime: 2021-10-22 00:03:39
 */

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
 * parentId => children
 */
export const rawList2Tree = (arrList: IObj[], parentIdKey: string, childKey: string, pid?: string) => {
    if (arrList.length === 0) {
        return []
    }

    return arrList
        .filter((item) =>
            // 如果没有父id（第一次递归的时候）将所有父级查询出来
            // 这里认为 !item[parentIdKey] 是最顶层
            pid ? item[parentIdKey] === pid : !item[parentIdKey]
        )
        .map((item) => {
            // 通过父节点ID查询所有子节点
            item[childKey] = rawList2Tree(arrList, parentIdKey, childKey, item.id)
            return item
        })
}