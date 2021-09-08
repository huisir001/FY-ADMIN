/*
 * @Description: vue-cli配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-08 17:34:47
 * @LastEditTime: 2021-09-08 17:51:52
 */
const { title: TITLE } = require("./src/settings/system.ts")

module.exports = {
    publicPath: '',
    assetsDir: 'assets',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            //初始化配置
            args[0].title = TITLE
            return args
        })
        /* 配置图片文件支持 */
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