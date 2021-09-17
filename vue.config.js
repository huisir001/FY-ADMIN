/*
 * @Description: vue-cli配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-08 17:34:47
 * @LastEditTime: 2021-09-17 17:27:58
 */
const { Title, CDNResources } = require("./src/settings/common.ts")

module.exports = {
    publicPath: '',
    assetsDir: 'assets',
    productionSourceMap: false,
    // webpack-marge选项
    configureWebpack: {
        resolve: {
            alias: {
                '~theme': '/src/assets/styles/themes',
            }
        },
        optimization: {
            // 第三方库拆分，避免vendor过大
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vue: {
                        name: 'vue',
                        test: /[\\/]node_modules[\\/]vue[\\/]/,
                        priority: -10 // 优先级
                    },
                    vuex: {
                        name: 'vuex',
                        test: /[\\/]node_modules[\\/]vuex[\\/]/,
                        priority: -10
                    },
                    'vue-router': {
                        name: 'vue-router',
                        test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                        priority: -10
                    },
                    'element-plus': {
                        name: 'element-plus',
                        test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                        priority: -10
                    },
                    'vendors': {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -20
                    }
                }
            }
        }
    },
    // webpack高级配置
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            //初始化配置
            args[0].title = Title
            args[0].CSSCDN = CDNResources.css
            args[0].JSCDN = CDNResources.js
            return args
        })
        // 配置图片文件支持
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|ico|cur)(\?.*)?$/)
    },
    /* 配置代理解决跨域测试 */
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:8080', // 接口的域名
    //             changeOrigin: true,
    //         },
    //         '/file': {
    //             target: 'http://localhost:8080', // file的域名
    //             changeOrigin: true,
    //         },
    //     },
    // },
}