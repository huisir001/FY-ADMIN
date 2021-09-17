/*
 * @Description: 系统配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-07 15:06:19
 * @LastEditTime: 2021-09-17 16:38:14
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
            loadStyle: () => import('~theme/blue.module.scss')
        },
        {
            name: "black",
            loadStyle: () => import('~theme/black.module.scss')
        },
        {
            name: "green",
            loadStyle: () => import('~theme/green.module.scss')
        },
        {
            name: "pink",
            loadStyle: () => import('~theme/pink.module.scss')
        },
    ],
    /**
     * CDN Resources
     */
    CDNResources: {
        css: ['//unpkg.zhimg.com/element-plus/dist/index.css'],
        js: [],
    }
}