/*
 * @Description: vue-cli配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-08 17:34:47
 * @LastEditTime: 2022-01-24 18:57:08
 */
module.exports = {
    publicPath: '/',
    assetsDir: 'assets',
    productionSourceMap: false,
    // webpack高级配置
    chainWebpack: (config) => {
        // 配置图片文件支持
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|ico|cur)(\?.*)?$/)
    },
}