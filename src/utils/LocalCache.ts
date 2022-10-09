/*
 * @Description: LocalStorage临时缓存
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 17:29:01
 * @LastEditTime: 2022-10-09 12:06:38
 */

/**
 * 缓存项
 */
export interface ICatchItem {
    key: string
    type: 1 | 2 // 1-sessionStorage,2-localStorage
}

const typeMap = new Map([[1, 'sessionStorage'], [2, 'localStorage']])

export default class LocalCache {
    /**
     * 获取缓存
     */
    static getCache(item: ICatchItem): any | null {
        return JSON.parse((window as any)[typeMap.get(item.type)!].getItem(item.key) || '{"value":null}').value
    }

    /**
     * 设置缓存
     */
    static setCache(item: ICatchItem, value: string | object | number | boolean | any[] | null) {
        (window as any)[typeMap.get(item.type)!].setItem(item.key, JSON.stringify({ value }))
    }

    /**
     * 移除缓存
     */
    static removeCache(item: ICatchItem) {
        (window as any)[typeMap.get(item.type)!].removeItem(item.key)
    }
}