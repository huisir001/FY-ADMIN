<!--
 * @Description: 文件库(只支持上传图片和zip压缩包)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-25 12:22:55
 * @LastEditTime: 2022-01-14 10:29:43
-->
<template>
    <div class="file-library-btn" @click="showFileLibraryBox = true;getList()">
        <slot />
    </div>
    <el-dialog v-model="showFileLibraryBox" width="80%" top="8vh" :append-to-body="true"
        :destroy-on-close="true" :title="type=='zip'?'文件库':'图片库'">
        <div class="file-library-dialog-cont">
            <div class="left">
                <div class="btn-group">
                    <el-select v-model="fileQueryParams.group" placeholder="选择类目" filterable
                        @change="fileGroupChange">
                        <el-option v-for="item in groups" :key="item.id" :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input v-model="fileQueryParams.name" placeholder="搜索..." clearable>
                        <template #suffix>
                            <fy-icon name="search" size="14"
                                color="var(--el-text-color-placeholder)" />
                        </template>
                    </el-input>
                    <el-button :loading="leftLoading" @click="getList">刷新</el-button>
                    <el-popconfirm title="你确定要删除当前文件吗?" @confirm="deleteFile">
                        <template #reference>
                            <el-button :disabled="selectedIndex<0" type="danger"
                                :loading="delBtnLoading">
                                <fy-icon name="delete" size="13" color="white" /> 删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
                <!-- 图片列表 -->
                <div class="pic-list-box" v-if="type=='pic'" v-loading="leftLoading">
                    <el-popover v-model:visible="popoverVisible" placement="bottom" :width="170">
                        <p style="text-align: center; margin-bottom: 10px">选择新增文件方式</p>
                        <div>
                            <el-button type="text"
                                @click="popoverVisible = false;showFileUrlSetBox = true">
                                URL插入
                            </el-button>
                            <el-upload style="display:inline-block;margin-left:10px;"
                                action="/api/file/upload" accept="image/png, image/jpeg"
                                :show-file-list="false" :on-success="handlePicSuccess"
                                :before-upload="beforePicUpload">
                                <el-button type="primary" size="small"
                                    @click="popoverVisible = false">直接上传
                                </el-button>
                            </el-upload>
                        </div>
                        <template #reference>
                            <div class="thumbnail upload"  @click="popoverVisible = !popoverVisible">
                                <fy-icon name="plus" size="30"
                                    color="var(--el-text-color-placeholder)" />
                            </div>
                        </template>
                    </el-popover>
                    <div v-for="(item,index) in fileList" :key="item.id" class="thumbnail"
                        :class="{selected:selectedIndex==index}" @click="handleSelected(index)">
                        <el-image class="pic-item" fit="cover" :src="item.url" />
                    </div>
                </div>
                <!-- zip列表 -->
                <template v-else>
                    <el-table :data="fileList" highlight-current-row style="width: 98%"
                        @current-change="handleFileListChange" v-loading="leftLoading">
                        <el-table-column prop="name" label="文件名称" />
                        <el-table-column prop="size" label="文件大小" />
                        <el-table-column prop="createTime" label="创建时间" />
                    </el-table>
                </template>
            </div>
            <div class="right">
                <template v-if="selectedIndex>=0">
                    <h5>图片详情</h5>
                    <el-form label-width="75px" label-position="left">
                        <el-form-item label="图片预览">
                            <el-image class="preview-img" :src="currFile.url"
                                :preview-src-list="[currFile.url]" fit="contain" />
                            <fy-icon name="search" size="14" color="#fff" class="preview-icon" />
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{currFile.createTime}}</span>
                        </el-form-item>
                        <el-form-item label="文件大小">
                            <span>{{currFile.size}}kb</span>
                        </el-form-item>
                        <el-form-item label="图片尺寸">
                            <span>{{currFile.dimensions[0]}} × {{currFile.dimensions[1]}}</span>
                        </el-form-item>
                        <el-form-item label="文件URL">
                            <el-input readonly v-model="currFile.url"></el-input>
                        </el-form-item>
                        <el-form-item label="文件名称">
                            <el-input v-model="currFile.name"></el-input>
                        </el-form-item>
                        <el-form-item label="选择类目">
                            <el-select v-model="currFile.group" filterable allow-create
                                default-first-option style="width:100%;">
                                <el-option v-for="item in groups" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <div class="form-item-text">
                                Ps:可输入新类目</div>
                        </el-form-item>
                        <el-form-item label="文件描述">
                            <el-input v-model="currFile.desc" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-else>
                    <p>请从图片库中选择图片。</p>
                    <p>也可以
                        <el-upload class="upload-inline" action="/api/file/upload"
                            accept="image/png, image/jpeg" :show-file-list="false"
                            :on-success="handlePicSuccess" :before-upload="beforePicUpload">
                            <span>上传新图片</span>
                        </el-upload>
                        或
                        <span class="upload-inline" @click="showFileUrlSetBox = true">从URL插入</span>
                        。
                    </p>
                </template>
            </div>
        </div>
        <template v-if="selectedIndex>=0" #footer>
            <span class="dialog-footer">
                <el-button @click="updateFileInfo" :loading="saveDetailLoading">保存详情</el-button>
                <el-button type="primary"
                    @click="showFileLibraryBox=false;$emit('selected',currFile);">使用选中项
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 从URL插入 -->
    <el-dialog v-model="showFileUrlSetBox" title="从URL插入" :append-to-body="true"
        :destroy-on-close="true">
        <el-form ref="fileUrlSetFrom" label-width="80px" label-position="right"
            :model="fileUrlSetFromData" :rules="fileUrlSetFromRules">
            <el-form-item label="文件URL" prop="url">
                <el-input v-model="fileUrlSetFromData.url"></el-input>
            </el-form-item>
            <el-form-item label="文件名称" prop="name">
                <el-input v-model="fileUrlSetFromData.name"></el-input>
            </el-form-item>
            <el-form-item label="文件描述" prop="desc">
                <el-input v-model="fileUrlSetFromData.desc" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showFileUrlSetBox = false">取消</el-button>
                <el-button type="primary" @click="fileUrlSetSubmit">提交</el-button>
            </span>
        </template>
    </el-dialog>
</template>
 
<script lang="ts" setup>
import { computed, nextTick, reactive, ref, toRaw, watch } from 'vue'
import {
    getFileListByPage,
    removeFileById,
    getFileGroupList,
    addFileGroup,
    update as updateFile,
} from '@/api/file'
import { ElMessage } from 'element-plus'
import { debounce } from '@/ui/helpers'

const props = defineProps({
    /**
     * 文件类型，只支持上传图片和zip压缩包
     */
    type: {
        type: String,
        require: true,
        validator(value: string) {
            // 这个值必须匹配下列字符串中的一个
            return ['pic', 'zip'].includes(value)
        },
    },
})

defineEmits(['selected'])

const leftLoading = ref(false)
const saveDetailLoading = ref(false)
const delBtnLoading = ref(false)
const curPage = ref(1)
const pageTotal = ref(1)
const fileList = ref([])
const pageLimit = 10
const fileUrlSetFrom = ref()

// 分类列表
const groups = ref<IFileGroup[]>([])
;(async () => {
    leftLoading.value = true
    const res = await getFileGroupList()
    groups.value = res.data.list
    groups.value.unshift({
        id: 'ALL',
        name: '全部类目',
    })
    leftLoading.value = false
})()

// 查詢参数
const fileQueryParams = reactive({
    group: 'ALL', //分组
    name: '', //搜索词（模糊搜索）
    page: 1, //当前页
})

// 类目切换
const fileGroupChange = async () => {
    fileQueryParams.name = ''
    fileQueryParams.page = 1
}

// 查询(防抖)
watch(fileQueryParams, debounce(getList, 300))

// 查询列表
async function getList() {
    leftLoading.value = true
    // 清空当前选中项
    selectedIndex.value = -1
    const { page, name, group } = fileQueryParams
    console.log('+++', name)
    const res = await getFileListByPage({
        page,
        name,
        group: group === 'ALL' ? '' : group,
        type: props.type,
        limit: pageLimit,
    })
    // 有数据
    const { list, pageTotal: pt } = res.data
    curPage.value = page
    pageTotal.value = pt
    fileList.value = list
    await nextTick()
    leftLoading.value = false
}

// 页码切换
// const handleCurrentChange = (val: any) => {
//     console.log(`current page: ${val}`)
// }

// 当前所选
const selectedIndex = ref(-1)

// 选择
const handleSelected = async (index: number) => {
    if (selectedIndex.value === index) {
        selectedIndex.value = -1
        return
    }
    selectedIndex.value = index
}

// 当前文件
const currFile = computed(() =>
    selectedIndex.value >= 0 ? fileList.value[selectedIndex.value] : {}
)

// 弹窗
const showFileLibraryBox = ref(false)
const showFileUrlSetBox = ref(false)
const popoverVisible = ref(false)

// 关闭弹窗清除状态
watch(showFileLibraryBox, (val: boolean) => {
    if (!val) {
        selectedIndex.value = -1
    }
})

// 文件url插入from
const fileUrlSetFromData = reactive({
    name: '',
    desc: '',
    url: '',
})

// 关闭弹窗清除状态
watch(showFileUrlSetBox, (val: boolean) => {
    if (!val) {
        fileUrlSetFromData.name = ''
        fileUrlSetFromData.desc = ''
        fileUrlSetFromData.url = ''
    }
})

// 文件URL from验证
const fileUrlSetFromRules = reactive({
    url: {
        validator: (rule: any, value: string, callback: (arg0?: Error | undefined) => void) => {
            if (!value || value === '') {
                callback(new Error('URL为必填项'))
            } else if (!/^https?:\/\/([\w-]+\.)+[\w-]+(:\d+)?(\/[\w-.\/?%&=]*)?$/.test(value)) {
                callback(new Error('URL格式有误'))
            } else {
                callback()
            }
        },
        required: true,
        trigger: 'blur',
    },
    name: {
        required: true,
        message: '文件名称为必填项',
        trigger: 'blur',
    },
})

// 文件URL from提交
const fileUrlSetSubmit = () => {
    // 验证
    fileUrlSetFrom.value.validate(async (valid: boolean) => {
        if (valid) {
            // 登录
            console.log(fileUrlSetFromData)
            return true
        }
        return false
    })
}

// 文件删除
const deleteFile = async () => {
    delBtnLoading.value = true
    const { msg } = await removeFileById((currFile.value as IFileParams).id)
    delBtnLoading.value = false
    // 刷新列表
    getList()
    ElMessage.success(msg)
}

// 文件详情-保存详情
const updateFileInfo = async () => {
    saveDetailLoading.value = true

    let { id, group, name, desc } = toRaw(currFile.value) as IFileParams

    // 选择全部类目
    if (group === 'ALL') {
        group = ''
    } else if (!groups.value.find((item) => item.id === group)) {
        // 新创建类目
        console.log('这是新创建的类目:', group)
        const { data } = await addFileGroup(group)
        group = data.id
    }

    // 更新
    await updateFile({ id, group, name, desc })

    saveDetailLoading.value = false
    ElMessage.success('保存成功!')
}

// 切换表格
const handleFileListChange = (val: IFileParams) => {
    handleSelected(fileList.value.findIndex((item: IFileParams) => item.id == val.id))
}

// 图片选择
const handlePicSuccess = (res: any, file: { raw: any }) => {
    console.log('11111111111111', res)
    //本地选择的缓存图片  URL.createObjectURL(file.raw)
    // userInfoFormData.value.avatar = URL.createObjectURL(file.raw)
}

// 图片上传前钩子
const beforePicUpload = (file: { type: string; size: number }) => {
    const allowType = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!allowType) {
        ElMessage.error('图片格式有误!')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('上传图片不允许超过2MB!')
        return false
    }
    return true
}
</script>
 
<style scoped lang="scss">
@import './style.scss';
</style>