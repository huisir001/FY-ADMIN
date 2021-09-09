/*
 * @Description: 标签元素创建
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-09 18:43:26
 * @LastEditTime: 2021-09-09 18:53:34
 */
class DomCreate {
    private El: HTMLElement

    constructor(tagName: string, attribute: IObj = {}) {
        this.El = document.createElement(tagName)

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