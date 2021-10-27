/*
 * @Description: 右键菜单指令
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-26 15:59:44
 * @LastEditTime: 2021-10-27 17:11:58
 */
import { Directive } from '@vue/runtime-core'
import DomCreate from '@/utils/DomCreate'
import '@/assets/styles/plugin/ctxMenu.scss'

const contextMenu: Directive<any, any> = {
    created(_, binding) {
        const vm: any = binding.instance
        vm.ctxMenuDom = new DomCreate('div', {}, 'zui-ctx-menu')
    },
    beforeMount(el, binding) {
        const vm: any = binding.instance
        const ctxMenuDom: DomCreate = vm.ctxMenuDom

        el.oncontextmenu = ({ clientX, clientY }: MouseEvent) => {
            removeCtxMenu(ctxMenuDom)
            initCtxMenu(ctxMenuDom, binding.value)
            addListenerOtherClick(ctxMenuDom)
            ctxMenuDom.setAttr('style', `left:${clientX}px;top:${clientY}px`)
            ctxMenuDom.getElement().onclick = (ev) => {
                const menuIndex: number = Number((ev.target as HTMLElement).dataset.index!)
                const menuItem = (binding.value as IBtnOptions[])[menuIndex]
                if (menuItem && !menuItem.disabled) {
                    menuItem.callback(el)
                    removeCtxMenu(ctxMenuDom)
                }
            }
            return false
        }
    },
    beforeUnmount(el, binding) {
        el.oncontextmenu = null
        const vm: any = binding.instance
        vm.ctxMenuDom.remove()
    },
}

/**
 * 初始化
 */
function initCtxMenu(ctxMenuDom: DomCreate, btnOptionsList: IBtnOptions[]) {
    let btnHtml = ''

    btnOptionsList.forEach((item, index) => {
        btnHtml +=
            `<div class="ctx-menu-btn${item.disabled ? ' disabled' : ''}" data-index="${index}">
                ${item.icon ? `<i class="${item.icon} ctx-menu-icon" data-index="${index}"></i>` : ''}
                <span class="ctx-menu-span" data-index="${index}">${item.name}</span>
            </div>`
    })

    ctxMenuDom.innerHTML(btnHtml)

    // 判断是否已经插入元素
    if (document.body.getElementsByClassName(ctxMenuDom.className).length === 0) {
        document.body.append(ctxMenuDom.getElement())
    }
}

/**
 * 监听点击别处关闭菜单
 */
function addListenerOtherClick(ctxMenuDom: DomCreate) {
    if (ctxMenuDom.temp) return;
    const callback = (e: MouseEvent) => {
        const targetClass = (e.target as HTMLElement).className
        const isCtxMenuDiv = typeof targetClass == 'string' && targetClass.includes('ctx-menu')
        if (!isCtxMenuDiv) {
            removeCtxMenu(ctxMenuDom)
        } else {
            (e.target as HTMLElement).oncontextmenu = () => false
        }
    }
    document.addEventListener('click', callback, true)
    document.addEventListener('contextmenu', callback, true)
    ctxMenuDom.temp = callback
}

/**
 * 取消监听
 */
function removeCtxMenu(ctxMenuDom: DomCreate) {
    ctxMenuDom.remove()
    if (ctxMenuDom.temp) {
        document.removeEventListener('click', ctxMenuDom.temp, true)
        document.removeEventListener('contextmenu', ctxMenuDom.temp, true)
        ctxMenuDom.temp = null
    }
}


export default contextMenu