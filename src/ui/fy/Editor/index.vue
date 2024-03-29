<!--
 * @Description: 富文本编辑器
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-02-16 14:30:17
 * @LastEditTime: 2022-02-21 11:28:26
-->
<template>
    <!-- doc:https://www.wangeditor.com/v5/ -->
    <div style="border: 1px solid #ccc">
        <Toolbar mode="default" :editorId="editorId" :defaultConfig="toolbarConfig"
            style="border-bottom: 1px solid #ccc" />
        <Editor mode="default" :editorId="editorId" :defaultConfig="editorConfig"
            :defaultHtml="modelValue" @onChange="handleChange"
            @onCreated="$emit('onCreated',$event)" @onDestroyed="$emit('onDestroyed',$event)"
            @onFocus="$emit('onFocus',$event)" @onBlur="$emit('onBlur',$event)"
            @customAlert="customAlert" class="editor-container" />
    </div>
    <fy-file-library type="pic" ref="fileLibrary" @selected="fileSelected" />
</template>

<script lang="ts">
export default {
    name: 'Editor',
}
</script>

<script lang="ts" setup>
import { computed, onBeforeUnmount, PropType, ref } from 'vue'
import { IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import toolbarKeys from './toolbarKeys.json'
import { ElMessage } from 'element-plus'

// props
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    // 工具欄配置
    toolbar: {
        type: Array as PropType<typeof toolbarKeys>,
        default: () => toolbarKeys,
    },
    // 提示
    placeholder: {
        type: String,
        default: '请输入内容...',
    },
    // 是否只读
    readOnly: {
        type: Boolean,
        default: false,
    },
    // 配置编辑器默认是否 focus ，默认为 true
    autoFocus: {
        type: Boolean,
        default: true,
    },
    // 配置编辑器是否支持滚动，默认为 true 。注意，此时不要固定编辑框的高度，设置一个 min-height 即可。
    // 可将 scroll 设置为 false 的情况：编辑器高度自增、在线文档
    scroll: {
        type: Boolean,
        default: true,
    },
    height: {
        type: [String, Number],
        default: '500px',
    },
    minHeight: {
        type: [String, Number],
        default: '300px',
    },
})

// editor高度
const editorHeight = computed(() =>
    typeof props.height == 'number' ? props.height + 'px' : props.height
)
const editorMinHeight = computed(() =>
    props.minHeight == 'number' ? props.minHeight + 'px' : props.minHeight
)

// emits
const emit = defineEmits(['update:modelValue', 'onCreated', 'onDestroyed', 'onFocus', 'onBlur'])

// 监听内容变化
const handleChange = (editor: any) => {
    emit('update:modelValue', editor.getHtml())
}

// 编辑器 id ，要全局唯一
const editorId = `editor-${Date.now()}`

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: props.toolbar,
}

// 自定义编辑器提示
const customAlert = (s: string, t: string) => {
    switch (t) {
        case 'success':
            ElMessage.success(s)
            break
        case 'info':
            ElMessage.info(s)
            break
        case 'warning':
            ElMessage.warning(s)
            break
        case 'error':
            ElMessage.error(s)
            break
        default:
            ElMessage.info(s)
            break
    }
}

// 自定义链接格式校验
const customCheckLinkFn = (text: string, url: string): string | boolean | undefined => {
    if (!url) {
        return
    }
    if (!/^https?:\/\/([\w-]+\.)+[\w-]+(:\d+)?(\/[\w-.\/?%&=]*)?$/.test(url)) {
        return '链接格式错误，正确格式如 http://abc.com 或 https://abc.com'
    }
    return true
}

// 图片仓库
const fileLibrary: any = ref(null)

// 图片插入
let insertImgFn: any = null

// 编辑栏配置
const editorConfig = {
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    autoFocus: props.autoFocus,
    scroll: props.scroll,
    // 菜单配置
    MENU_CONF: {
        // 插入链接
        insertLink: {
            // 链接校验
            checkLink: customCheckLinkFn,
        },
        // 编辑链接
        editLink: {
            // 链接校验
            checkLink: customCheckLinkFn,
        },
        // 上传图片配置
        uploadImage: {
            // 自定义选择图片
            customBrowseAndUpload(insertFn: any) {
                insertImgFn = insertFn
                fileLibrary.value.selectFile()
            },
        },
    },
}

// 监听图片选择
const fileSelected = (file: any) => {
    insertImgFn(file.url, file.name)
    insertImgFn = null
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = getEditor(editorId)
    if (editor == null) return

    editor.destroy()
    removeEditor(editorId)
})
</script>

<style scoped lang="scss">
.editor-container {
    overflow-y: hidden;
    height: v-bind(editorHeight) !important;
    min-height: v-bind(editorMinHeight);
}
:global(.w-e-full-screen-container) {
    z-index: 1000;
}
</style>