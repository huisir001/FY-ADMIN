/*
 * @Description: 系统配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 15:06:19
 * @LastEditTime: 2021-09-23 16:02:56
 */

module.exports = {
    /**
     * 系统标题
     */
    Title: "ZUI-ADMIN 后台管理系统",
    /**
     * 主题配色
     */
    ThemeColorList: [
        {
            name: "blue",
            default: true,
            color: '#409eff',
            loadStyle: () => import('~theme/blue.module.scss')
        },
        {
            name: "black",
            color: '#000000',
            loadStyle: () => import('~theme/black.module.scss')
        },
        {
            name: "green",
            color: '#67c23a',
            loadStyle: () => import('~theme/green.module.scss')
        },
        {
            name: "pink",
            color: '#f0468d',
            loadStyle: () => import('~theme/pink.module.scss')
        },
    ],
    /**
     * CDN Resources
     */
    CDNResources: {
        css: ['//cdn.jsdelivr.net/npm/element-plus/dist/index.css'],
        js: [],
    },
    /**
     * token令牌请求传参配置
     */
    ReqTokenConf: {
        key: 'ACCESS_TOKEN', // 键名(请求头、响应头)
        prevStr: '',    // 前置字符(请求头传参拼接)
        nextStr: ''     // 后置字符(请求头传参拼接)
    },
    /**
     * 本地缓存配置
     * type: 1 | 2  缓存位置(1-sessionStorage,2-localStorage)
     */
    LocalCacheConf: {
        Token: {
            key: '_token',  // 键名
            type: 2
        },
        Theme: {
            key: '_theme',
            type: 2
        }
    }
}