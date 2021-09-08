/*
 * @Description: 页面加载loading
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-08 14:29:46
 * @LastEditTime: 2021-09-08 17:12:38
 */

interface IcssOptions {
    color: string //进度条颜色
    duration1: number //第1阶段持续时间，单位毫秒
    duration2: number //第2阶段持续时间
}

class PageLoading {
    isShow: boolean = false

    private loadingEl: HTMLDivElement
    private styleEl: HTMLStyleElement
    private options: IcssOptions

    constructor(options: IcssOptions) {
        this.options = options
        this.loadingEl = document.createElement('div')
        this.styleEl = document.createElement('style')
        this.styleEl.setAttribute('type', 'text/css')
        this.styleEl.innerText = this.getCss(options)
        let progress = document.createElement('div')
        progress.className = 'page-loading-progress'
        this.loadingEl.className = 'page-loading-mask'
        this.loadingEl.append(progress)
    }

    show() {
        this.loadingEl.className = 'page-loading-mask'
        document.head.append(this.styleEl)
        document.body.append(this.loadingEl)
        // nextTick
        setTimeout(() => (this.loadingEl.className = 'page-loading-mask start'))
        this.isShow = true
    }

    hide() {
        if (!this.isShow) {
            throw new Error('PageLoading的hide方法必须与show方法连用！')
        }
        this.loadingEl.className = 'page-loading-mask finish'
        const t = setTimeout(() => {
            document.body.removeChild(this.loadingEl)
            document.head.removeChild(this.styleEl)
            clearTimeout(t)
        }, this.options.duration2)
    }

    private getCss(options: IcssOptions): string {
        const { color, duration1, duration2 } = options
        return `
            .page-loading-mask{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                cursor: progress;
            }
            .page-loading-progress{
                position: absolute;
                width: 0;
                height: 2px;
                background:${color};
                transition-property:width;
            }
            .start>.page-loading-progress{
                transition-duration: ${duration1}ms;
                width: 80%;
            }
            .finish>.page-loading-progress{
                transition-duration: ${duration2}ms;
                width: 100%;
            }
        `.replace(/\s/gm, '')
    }
}

export default new PageLoading({ color: '#409eff', duration1: 5000, duration2: 300 })