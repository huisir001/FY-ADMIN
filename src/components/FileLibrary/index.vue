<!--
 * @Description: 文件库(只支持上传图片和zip压缩包)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-25 12:22:55
 * @LastEditTime: 2021-09-27 16:43:33
-->
<template>
    <div class="file-library-btn" @click="showFileLibraryBox = true">
        <slot />
    </div>
    <el-dialog v-model="showFileLibraryBox" width="80%" top="10vh" :append-to-body="true"
        :destroy-on-close="true" :title="type=='zip'?'文件库':'图片库'">
        <div class="file-library-dialog-cont">
            <div class="left">
                <el-popover v-model:visible="visible" placement="bottom" :width="170">
                    <p style="text-align: center; margin-bottom: 10px">选择新增文件方式</p>
                    <div>
                        <el-button size="mini" type="text" @click="showFileUrlSetBox = true">URL插入
                        </el-button>
                        <el-upload style="display:inline-block;margin-left:10px;"
                            action="/api/upload" accept="image/png, image/jpeg"
                            :show-file-list="false" :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <el-button type="primary" size="mini" @click="visible = false">直接上传
                            </el-button>
                        </el-upload>
                    </div>
                    <template #reference>
                        <div class="thumbnail upload">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                    </template>
                </el-popover>
                <div v-for="(item,index) in fileList" :key="item.id" class="thumbnail"
                    :class="{selected:selectedIndex==index}" @click="handleSelected(index)">
                    <el-image class="pic-item" fit="cover" :src="item.url" />
                </div>
            </div>
            <div class="right">
                <template v-if="selectedIndex>=0">
                    <h5>图片详情</h5>
                    <el-form :model="currFile" label-width="75px" label-position="left">
                        <el-form-item label="图片预览">
                            <el-image class="preview-img" :src="currFile.url"
                                :preview-src-list="[currFile.url]" />
                        </el-form-item>
                        <el-form-item label="新增时间">
                            <span>{{currFile.createTime}}</span>
                        </el-form-item>
                        <el-form-item label="文件大小">
                            <span>{{currFile.size}}kb</span>
                        </el-form-item>
                        <el-form-item label="图片尺寸">
                            <span>{{currFile.dimensions[0]}} × {{currFile.dimensions[1]}}</span>
                        </el-form-item>
                        <el-form-item label="文件URL">
                            <el-input disabled v-model="currFile.url"></el-input>
                        </el-form-item>
                        <el-form-item label="文件名称">
                            <el-input v-model="currFile.name"></el-input>
                        </el-form-item>
                        <el-form-item label="文件描述">
                            <el-input v-model="currFile.desc" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-else>
                    <p>请从图片库中选择图片。</p>
                    <p>也可以
                        <el-upload class="upload-inline" action="/api/upload"
                            accept="image/png, image/jpeg" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <span>上传新图片</span>
                        </el-upload>
                        或
                        <span class="upload-inline" @click="showFileUrlSetBox = true">从URL插入</span>
                        。
                    </p>
                </template>
            </div>
        </div>
    </el-dialog>
    <!-- 从URL插入 -->
    <el-dialog v-model="showFileUrlSetBox" title="从URL插入" :append-to-body="true"
        :destroy-on-close="true">
        <el-form :model="fileUrlSetFromData" label-width="75px" label-position="left">
            <el-form-item label="文件URL">
                <el-input v-model="fileUrlSetFromData.url"></el-input>
            </el-form-item>
            <el-form-item label="文件名称">
                <el-input v-model="fileUrlSetFromData.name"></el-input>
            </el-form-item>
            <el-form-item label="文件描述">
                <el-input v-model="fileUrlSetFromData.desc" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showFileUrlSetBox = false">取消</el-button>
                <el-button type="primary" @click="showFileUrlSetBox = false">提交</el-button>
            </span>
        </template>
    </el-dialog>
</template>
 
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
    name: 'FileLibrary',
    props: {
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
    },
    setup() {
        const fileList = ref([
            {
                id: 1,
                name: '1212121',
                createTime: '2021-01-01 11:00:00',
                size: 100,
                dimensions: [100, 100],
                desc: '32113321',
                group: '1',
                url: 'https://dummyimage.com/500x400/2f3447/FFF&text=1',
            },
            { id: 2, url: 'https://dummyimage.com/300x400/2f3447/FFF&text=2' },
            { id: 3, url: 'https://dummyimage.com/500x700/2f3447/FFF&text=3' },
            { id: 4, url: 'https://dummyimage.com/100x400/2f3447/FFF&text=4' },
            { id: 5, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=5' },
            { id: 6, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=6' },
            { id: 7, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=7' },
            { id: 8, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=8' },
            { id: 9, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=9' },
            { id: 10, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=10' },
            { id: 10, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=10' },
            { id: 10, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=10' },
            { id: 10, url: 'https://dummyimage.com/500x300/2f3447/FFF&text=10' },
        ])

        // 当前所选
        const selectedIndex = ref(-1)

        // 选择
        const handleSelected = (index: number) => {
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

        // 文件url插入from
        const fileUrlSetFromData = reactive({
            name: '',
            desc: '',
            url: '',
        })

        return {
            showFileLibraryBox,
            showFileUrlSetBox,
            fileList,
            currFile,
            selectedIndex,
            handleSelected,
            fileUrlSetFromData,
        }
    },
})
</script>
 
<style scoped lang="scss">
@import './style.scss';
</style>