/*
 * @Description: 左键点击复制到剪贴板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-03-02 16:14:44
 * @LastEditTime: 2022-03-02 16:46:52
 */
import { Directive, DirectiveBinding, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { copy2Clipboard } from '@/utils/common'

let copyVal: any = null
const vCopy: Directive<any, any> = {
    mounted(el: any, binding: DirectiveBinding<any>) {
        copyVal = ref(binding.value)
        el.onclick = async () => {
            try {
                const copyRes = await copy2Clipboard(copyVal.value)
                if (copyRes) {
                    ElMessage({ type: 'success', message: '已成功复制到剪贴板' })
                }
            } catch (error) {
                ElMessage({ type: 'error', message: error as string })
            }
        }
    },
    updated(_, binding) {
        copyVal.value = binding.value
    },
    beforeUnmount(el) {
        copyVal = null
        el.onclick = null
    },
}

export default vCopy