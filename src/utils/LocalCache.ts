/*
 * @Description: LocalStorage临时缓存
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 17:29:01
 * @LastEditTime: 2021-09-07 18:14:59
 */

export default class LocalCache {
    static Token = '_token'

    static getCache(key: string): string | null {
        return JSON.parse(sessionStorage.getItem(key) || 'null').value
    }

    static setCache(key: string, value: string | object | number | boolean | any[] | null) {
        sessionStorage.setItem(key, JSON.stringify({ value }))
    }

    static removeCache(key: string) {
        sessionStorage.removeItem(key)
    }
}