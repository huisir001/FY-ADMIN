/*
 * @Description: 标签元素创建
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 18:43:26
 * @LastEditTime: 2021-10-26 18:02:23
 */
class DomCreate {
    className: string
    private El: HTMLElement

    constructor(tagName: string, attribute: IObj = {}, className: string = `c-${Date.now()}`) {
        this.El = document.createElement(tagName)

        // 唯一标识class
        this.className = className
        this.El.setAttribute('class', this.className)

        Object.keys(attribute).forEach((key) => {
            this.El.setAttribute(key, attribute[key])
        })
    }

    getElement() {
        return this.El
    }

    innerText(text: string) {
        this.El.innerText = text
    }

    innerHTML(HTMLTEXT: string) {
        this.El.innerHTML = HTMLTEXT
    }

    setAttr(key: string, value: string) {
        this.El.setAttribute(key, value)
    }
}

export default DomCreate