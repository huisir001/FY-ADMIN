/*
 * @Description: 公共缓存及方法
 * @Autor: HuiSir<github.com/huisir001>
 * @Date: 2022-08-03 14:03:18
 * @LastEditTime: 2022-08-09 18:25:32
 */
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export default defineStore('common', () => {
    const sidebarBtn1 = () => {
        ElMessage('测试按钮1，触发事件')
    }
    const sidebarBtn2 = () => {
        ElMessage('测试按钮2，触发事件')
    }

    return {
        sidebarBtn1,
        sidebarBtn2
    }
})