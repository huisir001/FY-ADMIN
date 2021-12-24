/*
 * @Description: UI组件依赖工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-17 11:03:27
 * @LastEditTime: 2021-12-24 17:04:53
 */

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
 * box跟随鼠标移动
 * box box元素el，位移对象
 * parent 父元素，位移限定区域,默认为document
 * target 鼠标操作对象，不传则默认为box
 */
export const boxMove = ({ box, parent, target }: { box: HTMLElement, parent?: HTMLElement, target?: HTMLElement }) => {
    const parentBoxEl = parent || document.documentElement;
    const targetEl = target || box;
    targetEl.style.cursor = 'all-scroll';
    targetEl.style.userSelect = 'none';
    let x: number, y: number; //鼠标相对与div左边，上边的偏移
    let isDrop = false; //移动状态的判断鼠标按下才能移动

    // 鼠标按下
    targetEl.addEventListener("mousedown", (e) => {
        e = e || window.event;
        x = e.clientX - box.offsetLeft;
        y = e.clientY - box.offsetTop;
        isDrop = true; //设为true表示可以移动
    }, false)

    // 鼠标移动
    parentBoxEl.addEventListener("mousemove", (e) => {
        //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
        if (isDrop) {
            e = e || window.event;
            let moveX = e.clientX - x; //得到距离左边移动距离                    　　
            let moveY = e.clientY - y; //得到距离上边移动距离

            //可移动最大距离
            const maxX = parentBoxEl.clientWidth - box.offsetWidth;
            const maxY = parentBoxEl.clientHeight - box.offsetHeight;

            //范围限定
            moveX = Math.min(maxX, Math.max(0, moveX));
            moveY = Math.min(maxY, Math.max(0, moveY));

            // 位置渲染
            box.setAttribute('style', `left:${moveX}px;top:${moveY}px;`)
        } else {
            return;
        }
    }, false)

    // 鼠标抬起
    parentBoxEl.addEventListener("mouseup", () => {
        isDrop = false; //设置为false不可移动
    }, false)
}