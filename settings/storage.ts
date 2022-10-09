/*
 * @Description: Storage缓存配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 18:23:26
 * @LastEditTime: 2022-10-09 12:06:05
 */
import { ICatchItem } from '../src/utils/LocalCache'

interface I_STORAGE_OPTIONS {
    [key: string]: ICatchItem
}
/**
 * Storage缓存配置
 * type: 1 | 2  缓存位置(1-sessionStorage,2-localStorage)
 */
const STORAGE_OPTIONS: I_STORAGE_OPTIONS = {
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