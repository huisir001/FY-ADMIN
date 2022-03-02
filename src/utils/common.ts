/*
 * @Description: 公共工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 18:50:17
 * @LastEditTime: 2022-03-02 16:11:43
 */

/**
 * 递归转换菜单
 * parentId list => children tree
 */
export const rawList2Tree = (arrList: IObj[], parentIdKey: string = 'parentId', childKey: string = 'children') => {
    if (arrList.length === 0) {
        return []
    }

    let menuTree: IObj[] = []

    !function Recursion(level: number = 0, pid?: string) {
        const tempArr: IObj[] = []
        for (let index = 0; index < arrList.length; index++) {
            const item = arrList[index]
            // 如果没有父id（第一次递归的时候）将所有父级查询出来
            // 这里认为 !item[parentIdKey] 是最顶层
            if (pid ? item[parentIdKey] === pid : !item[parentIdKey]) {
                // 树层级标记
                item.treeLevel = level
                // 通过父节点ID查询所有子节点
                item[childKey] = Recursion(level + 1, item.id)
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
 * 复制到剪贴板
 */
export const copy2Clipboard = (str: string) => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.value = str // 复制到剪切板的内容
        input.select()
        if (document.execCommand) {
            document.execCommand('copy')
            input.remove()
            resolve(true)
        } else {
            input.remove()
            reject('当前浏览器不支持拷贝！')
        }
    })
}