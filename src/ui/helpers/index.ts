/*
 * @Description: UI组件依赖工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-17 11:03:27
 * @LastEditTime: 2021-12-24 15:24:09
 */

/**
 * 前端关键字模糊搜索
 */
export const fuzzySearch = (listData: any[], inputVal: string) => listData
    .filter((item) => JSON.stringify(item).toLowerCase().includes(inputVal.toLowerCase()))

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