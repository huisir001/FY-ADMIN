/*
 * @Description: 右键菜单指令
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-26 15:59:44
 * @LastEditTime: 2021-10-26 18:37:31
 */
import { Directive } from '@vue/runtime-core'
import DomCreate from '@/utils/DomCreate'

const contextMenu: Directive<any, any> = {
    created(el) {
        const ctxMenuDom = createDiyCtxMenu()
        el.setAttribute('data-ctx-menu-class', ctxMenuDom.className)
    },
    beforeMount(el, binding) {
        el.oncontextmenu = ({ clientX, clientY }: MouseEvent) => {
            const ctxMenuDom = document.body.querySelector(`.${el.dataset.ctxMenuClass}`)! as HTMLElement
            initCtxMenu(ctxMenuDom, binding.value)
            ctxMenuDom.style.display = 'block'
            ctxMenuDom.style.left = clientX + 'px'
            ctxMenuDom.style.top = clientY + 'px'
            ctxMenuDom.onclick = (ev) => {
                const menuIndex: number = Number((ev.target as HTMLElement).dataset.index!);
                (binding.value as IBtnOptions[])[menuIndex].callback(el)
            }
            return false
        }
    },
    beforeUnmount(el) {
        el.oncontextmenu = null
        document.body.querySelector(`.${el.dataset.ctxMenuClass}`)!.remove()
    },
}

/**
 * 创建右键菜单 
 */
function createDiyCtxMenu() {
    const ctxMenuDom = new DomCreate('div', {
        style: `display:none;
                box-shadow:0 2px 12px #0000001a;
                width:160px;
                background-color:#fff;
                border-radius:3px;
                position:absolute;
            `
    }, "zui-ctx-manu")

    // 判断是否已经插入元素
    if (document.body.getElementsByClassName(ctxMenuDom.className).length === 0) {
        document.body.append(ctxMenuDom.getElement())
    }
    return ctxMenuDom
}

/**
 * 初始化按钮组
 */
function initCtxMenu(ctxMenuDom: HTMLElement, btnOptionsList: IBtnOptions[]) {
    let btnHtml = ''

    const btnDivStyle = `
        display:flex;
        align-items:center;
        justify-content:space-between;
        cursor:pointer;
        height: 30px;
        font-size: 14px;
        padding: 0 15px;
        color: #666;
    `

    btnOptionsList.forEach((item, index) => {
        btnHtml +=
            `<div style="${btnDivStyle}" data-index="${index}">
                <span data-index="${index}">${item.name}</span>${item.icon ? `<i class="${item.icon}"  data-index="${index}"/>` : ''}
            </div>`
    })

    ctxMenuDom.innerHTML = btnHtml
}

export default contextMenu