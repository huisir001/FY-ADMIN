/*
 * @Description: 编译时变量(vue.config.js中所需配置)，可执行node脚本
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-21 16:30:19
 * @LastEditTime: 2021-11-25 10:18:05
 */
const TITLE = require('./title.ts')
const getAllFilePath = require('./inc/getAllFilePath')

/**
 * CSS CDN Resources
 */
const CSSCDN = [
    '//cdn.jsdelivr.net/npm/element-plus/dist/index.css',   // element-plus 
]

/**
 * JS CDN Resources
 * 后期考虑将vue/vue-router/element-plus/vuex等插件直接使用cdn引入
 */
const JSCDN = []

/**
 * GLOBAL PARAMS 编译时全局传参
 */
const GLOBAL = {
    BASE_API: process.env.VUE_APP_BASE_API,
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VIEW_PATHS: getAllFilePath('./src/views', ".vue") //这里的路径以vue.config.js为基准
}

module.exports = {
    TITLE,
    CSSCDN,
    JSCDN,
    GLOBAL
}