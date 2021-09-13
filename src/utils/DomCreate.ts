/*
 * @Description: 标签元素创建
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 18:43:26
 * @LastEditTime: 2021-09-13 14:28:53
 */
class DomCreate {
    private El: HTMLElement
    public className: string

    constructor(tagName: string, attribute: IObj = {}) {
        this.El = document.createElement(tagName)

        // 唯一标识class
        this.className = `c-${Date.now()}`
        this.El.setAttribute('class', this.className)

        Object.keys(attribute).forEach((key) => {
            this.El.setAttribute(key, attribute[key]);
        })
    }

    getElement() {
        return this.El
    }

    setAttr(key: string, value: string) {
        this.El.setAttribute(key, value);
    }
}

export default DomCreate