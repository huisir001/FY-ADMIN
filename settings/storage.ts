/*
 * @Description: Storage缓存配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 18:23:26
 * @LastEditTime: 2022-04-19 13:49:52
 */

/**
 * Storage缓存配置
 * type: 1 | 2  缓存位置(1-sessionStorage,2-localStorage)
 */
const STORAGE_OPTIONS: IObj = {
    Token: {
        key: '_token',  // 键名
        type: 2
    },
    Theme: {
        key: '_theme',
        type: 2
    },
    Lang: {
        key: '_lang',
        type: 2
    }
}

export default STORAGE_OPTIONS