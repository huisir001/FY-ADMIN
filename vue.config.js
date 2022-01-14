/*
 * @Description: vue-cli配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-08 17:34:47
 * @LastEditTime: 2022-01-14 14:54:41
 */
const webpack = require('webpack')
const { TITLE, CSSCDN, JSCDN, GLOBAL } = require("./src/settings/process")

module.exports = {
    publicPath: '/',
    assetsDir: 'assets',
    productionSourceMap: false,
    // webpack-marge选项
    configureWebpack: {
        resolve: {
            // 路径缩写
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
        },
        plugins: [
            // 编译时全局变量传递
            new webpack.DefinePlugin({
                $GLOBAL: JSON.stringify(GLOBAL)
            })
        ]
    },
    // webpack高级配置
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            //初始化配置(传参到html)
            args[0].title = TITLE
            args[0].CSSCDN = CSSCDN
            args[0].JSCDN = JSCDN
            return args
        })
        // 配置图片文件支持
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|ico|cur|svg)(\?.*)?$/)
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