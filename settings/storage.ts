/*
 * @Description: Storage缓存配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 18:23:26
 * @LastEditTime: 2021-10-21 18:33:59
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
    }
}

export default STORAGE_OPTIONS