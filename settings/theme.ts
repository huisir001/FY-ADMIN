/*
 * @Description: 主题配色
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 16:42:51
 * @LastEditTime: 2022-01-24 16:42:38
 */

export default [
    {
        name: "blue",
        default: true,
        color: '#409eff',
        loadStyle: () => import('theme/blue.module.scss')
    },
    {
        name: "black",
        color: '#000000',
        loadStyle: () => import('theme/black.module.scss')
    },
    {
        name: "green",
        color: '#67c23a',
        loadStyle: () => import('theme/green.module.scss')
    },
    {
        name: "pink",
        color: '#f0468d',
        loadStyle: () => import('theme/pink.module.scss')
    },
]