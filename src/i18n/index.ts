/*
 * @Description: i18n实例
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-19 10:00:02
 * @LastEditTime: 2022-04-19 11:18:11
 */
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'

/**
 * 添加一个可以在应用的任何组件实例中访问的全局 property。
 * 组件的 property 在命名冲突具有优先权。
 */
export default (app: App<any>) => {
    const i18n = createI18n({
        locale: 'zh',
        messages: {
            zh,
            en,
        },
    })

    app.config.globalProperties.$t = i18n.global.t
    app.config.globalProperties.$setLocale = (lang: 'zh' | 'en') => {
        i18n.global.locale = lang
    }
    app.config.globalProperties.$getLocale = () => i18n.global.locale

    return app.use(i18n)
}