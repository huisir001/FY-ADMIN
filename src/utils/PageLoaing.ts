/*
 * @Description: 页面加载loading
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-08 14:29:46
 * @LastEditTime: 2021-09-24 17:08:39
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
        this.loadingEl.className = 'page-loading-mask'
        this.loadingEl.innerHTML = '<div class="page-loading-progress"></div><div class="page-loading-icon"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg></div>'
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
            @keyframes=page-loading-anim{
                100% {
                    transform: rotate(360deg);
                }
            }
            @keyframes=page-loading-dash{
                0% {
                    stroke-dasharray: 1,200;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 90,150;
                    stroke-dashoffset: -40px;
                }
                100% {
                    stroke-dasharray: 90,150;
                    stroke-dashoffset: -120px;
                }
            }
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
            .page-loading-icon {
                position: absolute;
                right: 1px;
                top: 1px;
            }
            .page-loading-icon>svg.circular {
                height: 20px;
                width: 20px;
                animation: page-loading-anim=2s=linear=infinite;
            }
            .page-loading-icon>svg.circular>circle.path {
                animation: page-loading-dash=1.5s=ease-in-out=infinite;
                stroke-dasharray: 90,150;
                stroke-dashoffset: 0;
                stroke-width: 4px;
                stroke: ${color};
                stroke-linecap: round;
            }
            .start>.page-loading-progress{
                transition-duration: ${duration1}ms;
                width: 80%;
            }
            .finish>.page-loading-progress{
                transition-duration: ${duration2}ms;
                width: 100%;
            }
        `.replace(/\s|=/g, (e) => {
            return e === '=' ? ' ' : ''
        })
    }
}

export default new PageLoading({ color: '#409eff', duration1: 5000, duration2: 300 })