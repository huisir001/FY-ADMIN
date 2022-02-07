/*
 * @Description: UI组件依赖工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-17 11:03:27
 * @LastEditTime: 2022-02-07 16:38:09
 */

/**
 * 防抖
 */
export const debounce = (callback: () => void, delay: number) => {
    let timeout: any
    return (...args: []) => {
        clearTimeout(timeout)	//所有频繁的操作都会被清空，只有最后一次的不会清空
        timeout = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}

/**
 * 前端关键字模糊搜索
 */
export const fuzzySearch = (listData: any[], inputVal: string) => listData
    .filter((item) => JSON.stringify(item).toLowerCase().includes(inputVal.toLowerCase()))

/**
 * 点击其他位置进行操作（如关闭弹窗）
 */
export const clickOtherPosToClose = (
    targetEl: HTMLElement[] | HTMLElement | NodeList,
    callback: () => void
) => {
    const listener = (e: Event) => {
        const isNodeList = targetEl.constructor.name === 'NodeList'
        if (Array.isArray(targetEl) || isNodeList) {
            const contains = (isNodeList ? Array.from(targetEl as NodeList) : targetEl as HTMLElement[]).find(
                (boxEl) => boxEl!.contains(e.target as HTMLElement)
            )
            if (!contains) {
                callback()
                document.removeEventListener('click', listener, true)
            }
        } else if (!(targetEl as HTMLElement).contains(e.target as HTMLElement)) {
            callback()
            document.removeEventListener('click', listener, true)
        }
    }
    document.addEventListener('click', listener, true)
}

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
 * 启动全屏
 * launchFullScreen(document.documentElement); // 整个网页
 */
export const launchFullScreen = (element: HTMLElement | any) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * 退出全屏
 */
export const exitFullscreen = () => {
    const doc: any = document
    if (doc.exitFullscreen) {
        doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
    }
}

/**
 * 是否全屏
 */
export const isFullScreen = () => {
    return Math.abs(window.screen.height - window.document.documentElement.clientHeight) <= 17
}