/*
 * @Description: CDN Resources
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-01-24 15:59:14
 * @LastEditTime: 2022-02-07 16:41:21
 */

type tCssCdns = string[]
interface iJsCdns {
    dependencies: string // 外部化处理不想打包进库的依赖
    src: string // 外部cdn链接
    globalVar: string  // cdn包取代依赖项的全局变量
}

/**
 * CSS CDN Resources
 */
export const CSSCDN: tCssCdns = [
    '//unpkg.com/element-plus/dist/index.css',   // element-plus 
]

/**
 * JS CDN Resources
 * 将vue/vue-router/element-plus/vuex等插件直接使用cdn引入
 * 需要配置vite.config.js，将不需要打包的库排除，且给CDN导入的外部包一个全局变量
 * 注意：vue-router/element-plus/vuex等库须依赖vue库，所以vue需要在前面
 */
export const JSCDN: iJsCdns[] = [
    {
        dependencies: 'vue',
        src: '//unpkg.com/vue@next',
        globalVar: 'Vue'
    },
    {
        dependencies: 'element-plus',
        src: '//unpkg.com/element-plus',
        globalVar: 'ElementPlus'
    },
    {
        dependencies: 'vue-router',
        src: '//unpkg.com/vue-router',
        globalVar: 'VueRouter'
    },
    {
        dependencies: 'vuex',
        src: '//unpkg.com/vuex',
        globalVar: 'Vuex'
    }
]