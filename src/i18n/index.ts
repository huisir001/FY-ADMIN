/*
 * @Description: i18n实例
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-19 10:00:02
 * @LastEditTime: 2022-04-19 13:52:16
 */
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import LocalCache from '@/utils/LocalCache'
import { STORAGE_OPTIONS } from 'settings'
import zh from './locales/zh.json'
import en from './locales/en.json'

// 获取缓存语言
const langCache = LocalCache.getCache(STORAGE_OPTIONS.Lang)
// 根据浏览器navigator判断当前浏览器语言
const navigatorLang = window.navigator.language.includes('zh') ? 'zh' : 'en'

/**
 * 创建i18n实例
 * 当前暂定中英两种语言
 */
export default (app: App<any>) => {
    const i18n = createI18n({
        locale: langCache || navigatorLang,
        messages: {
            zh,
            en,
        },
    })

    app.config.globalProperties.$t = i18n.global.t
    app.config.globalProperties.$setLocale = (lang: 'zh' | 'en') => {
        i18n.global.locale = lang
        LocalCache.setCache(STORAGE_OPTIONS.Lang, lang)
    }
    app.config.globalProperties.$getLocale = () => i18n.global.locale

    return app.use(i18n)
}