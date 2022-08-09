/*
 * @Description: 标签元素创建
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 18:43:26
 * @LastEditTime: 2022-08-05 17:54:02
 */
class DomCreate {
    className: string
    temp: any = null
    private El?: HTMLElement

    constructor(tagName: string, attribute: IObj = {}, className: string = `c-${Date.now()}`) {
        this.El = document.createElement(tagName)

        // 唯一标识class
        this.className = className
        this.El.setAttribute('class', this.className)

        Object.keys(attribute).forEach((key) => {
            this.El!.setAttribute(key, attribute[key])
        })
    }

    getElement() {
        return this.El
    }

    innerText(text: string) {
        this.El!.innerText = text
    }

    innerHTML(HTMLTEXT: string) {
        this.El!.innerHTML = HTMLTEXT
    }

    setAttr(key: string, value: string) {
        this.El!.setAttribute(key, value)
    }

    remove() {
        this.El!.remove()
    }
}

export default DomCreate