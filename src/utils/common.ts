/*
 * @Description: 公共工具
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-16 18:50:17
 * @LastEditTime: 2021-09-18 17:24:34
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
