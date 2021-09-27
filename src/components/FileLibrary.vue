<!--
 * @Description: 文件库(只支持上传图片和zip压缩包)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-25 12:22:55
 * @LastEditTime: 2021-09-27 16:35:32
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
@import '@/assets/styles/mixin.scss';
.file-library-btn {
    cursor: pointer;
    display: inline-flex;
}
.file-library-dialog-cont {
    display: flex;
    height: 70vh;
    .left {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        overflow-y: auto;
        @include scrollBar;
        .thumbnail {
            position: relative;
            border: var(--el-border-base);
            border-radius: var(--el-border-radius-small);
            cursor: pointer;
            .pic-item {
                padding: 5px;
                width: 100%;
                height: 100%;
                &:deep(img) {
                    border-radius: var(--el-border-radius-small);
                }
            }
            &.selected {
                background: var(--el-color-primary);
                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--el-color-primary);
                    opacity: 0.3;
                }
            }
            &.upload {
                border: 1px dashed var(--el-border-color-base);
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover {
                    border-color: var(--el-color-primary);
                }
                .avatar-uploader-icon {
                    font-size: 25px;
                    color: var(--el-text-color-placeholder);
                }
            }
        }
    }
    .right {
        background: var(--el-color-info-lighter);
        border-radius: var(--el-border-radius-small);
        padding: 20px;
        overflow-y: auto;
        @include scrollBar;
        h5 {
            font-weight: bold;
        }
        .preview-img {
            width: 150px;
            height: 100px;
        }
        .upload-inline {
            display: inline;
            cursor: pointer;
            border-bottom: 1px solid var(--el-color-primary);
        }
    }
}
@media screen and (min-width: 1671px) {
    .file-library-dialog-cont {
        .left {
            width: 75%;
            .thumbnail {
                width: 7.2vw;
                height: 7.2vw;
                margin-right: calc(((80vw - 40px) * 0.75 - (7.2vw * 7)) / 7);
                margin-top: calc(((80vw - 40px) * 0.75 - (7.2vw * 7)) / 7);
                &:nth-child(7n) {
                    margin-right: 0;
                }
                @for $i from 1 through 7 {
                    &:nth-child(#{$i}) {
                        margin-top: 0;
                    }
                }
            }
        }
        .right {
            width: 25%;
        }
    }
}
@media screen and (max-width: 1670px) and (min-width: 1421px) {
    .file-library-dialog-cont {
        .left {
            width: 70%;
            .thumbnail {
                width: 7.8vw;
                height: 7.8vw;
                margin-right: calc(((80vw - 40px) * 0.7 - (7.8vw * 6)) / 6);
                margin-top: calc(((80vw - 40px) * 0.7 - (7.8vw * 6)) / 6);
                &:nth-child(6n) {
                    margin-right: 0;
                }
                @for $i from 1 through 6 {
                    &:nth-child(#{$i}) {
                        margin-top: 0;
                    }
                }
            }
        }
        .right {
            width: 30%;
        }
    }
}
@media screen and (max-width: 1420px) and (min-width: 1171px) {
    .file-library-dialog-cont {
        .left {
            width: 68%;
            .thumbnail {
                width: 9vw;
                height: 9vw;
                margin-right: calc(((80vw - 40px) * 0.68 - (9vw * 5)) / 5);
                margin-top: calc(((80vw - 40px) * 0.68 - (9vw * 5)) / 5);
                &:nth-child(5n) {
                    margin-right: 0;
                }
                @for $i from 1 through 5 {
                    &:nth-child(#{$i}) {
                        margin-top: 0;
                    }
                }
            }
        }
        .right {
            width: 32%;
        }
    }
}
@media screen and (max-width: 1170px) and (min-width: 1001px) {
    .file-library-dialog-cont {
        .left {
            width: 65%;
            .thumbnail {
                width: 10.5vw;
                height: 10.5vw;
                margin-right: calc(((80vw - 40px) * 0.65 - (10.5vw * 4)) / 4);
                margin-top: calc(((80vw - 40px) * 0.65 - (10.5vw * 4)) / 4);
                &:nth-child(4n) {
                    margin-right: 0;
                }
                @for $i from 1 through 4 {
                    &:nth-child(#{$i}) {
                        margin-top: 0;
                    }
                }
            }
        }
        .right {
            width: 35%;
        }
    }
}
@media screen and (max-width: 1000px) and (min-width: 851px) {
    .file-library-dialog-cont {
        .left {
            width: 60%;
            .thumbnail {
                width: 13vw;
                height: 13vw;
                margin-right: calc(((80vw - 40px) * 0.6 - (13vw * 3)) / 3);
                margin-top: calc(((80vw - 40px) * 0.6 - (13vw * 3)) / 3);
                &:nth-child(3n) {
                    margin-right: 0;
                }
                @for $i from 1 through 3 {
                    &:nth-child(#{$i}) {
                        margin-top: 0;
                    }
                }
            }
        }
        .right {
            width: 40%;
        }
    }
}
@media screen and (max-width: 850px) and (min-width: 701px) {
    .file-library-dialog-cont {
        .left {
            width: 60%;
            .thumbnail {
                width: 19vw;
                height: 19vw;
                margin-right: calc(((80vw - 40px) * 0.6 - (19vw * 2)) / 2);
                margin-top: calc(((80vw - 40px) * 0.6 - (19vw * 2)) / 2);
                &:nth-child(2n) {
                    margin-right: 0;
                }
                @for $i from 1 through 2 {
                    &:nth-child(#{$i}) {
                        margin-top: 0;
                    }
                }
            }
        }
        .right {
            width: 40%;
        }
    }
}
@media screen and (max-width: 700px) and (min-width: 501px) {
    .file-library-dialog-cont {
        flex-direction: column;
        .left {
            margin-right: -12px;
            width: 100%;
            height: 50%;
            .thumbnail {
                width: 20vw;
                height: 20vw;
                margin-right: calc(((80vw - 40px) - (20vw * 3)) / 3);
                margin-top: calc(((80vw - 40px) - (20vw * 3)) / 3);
                &:nth-child(3n) {
                    margin-right: 0;
                }
                @for $i from 1 through 3 {
                    &:nth-child(#{$i}) {
                        margin-top: 0;
                    }
                }
            }
        }
        .right {
            margin-top: 20px;
            width: 100%;
            height: 50%;
        }
    }
}
@media screen and (max-width: 500px) and (min-width: 401px) {
    .file-library-dialog-cont {
        flex-direction: column;
        .left {
            margin-right: -12px;
            width: 100%;
            height: 50%;
            .thumbnail {
                width: 30vw;
                height: 30vw;
                margin-right: calc(((80vw - 40px) - (30vw * 2)) / 2);
                margin-top: calc(((80vw - 40px) - (30vw * 2)) / 2);
                &:nth-child(2n) {
                    margin-right: 0;
                }
                &:nth-child(1),
                &:nth-child(2) {
                    margin-top: 0;
                }
            }
        }
        .right {
            margin-top: 20px;
            width: 100%;
            height: 50%;
        }
    }
}
@media screen and (max-width: 400px) and (min-width: 351px) {
    .file-library-dialog-cont {
        flex-direction: column;
        .left {
            margin-right: -12px;
            width: 100%;
            height: 50%;
            .thumbnail {
                width: 32vw;
                height: 32vw;
                margin-top: calc(((80vw - 40px) - (32vw * 2)) / 2);
                margin-right: calc(((80vw - 40px) - (32vw * 2)) / 2);
                &:nth-child(2n) {
                    margin-right: 0;
                }
                &:nth-child(1),
                &:nth-child(2) {
                    margin-top: 0;
                }
            }
        }
        .right {
            margin-top: 20px;
            width: 100%;
            height: 50%;
        }
    }
}
@media screen and (max-width: 350px) {
    .file-library-dialog-cont {
        flex-direction: column;
        .left {
            margin-right: -12px;
            width: 100%;
            height: 50%;
            .thumbnail {
                width: 30.5vw;
                height: 30.5vw;
                margin-top: calc(((80vw - 40px) - (30.5vw * 2)) / 2);
                margin-right: calc(((80vw - 40px) - (30.5vw * 2)) / 2);
                &:nth-child(2n) {
                    margin-right: 0;
                }
                &:nth-child(1),
                &:nth-child(2) {
                    margin-top: 0;
                }
            }
        }
        .right {
            margin-top: 20px;
            width: 100%;
            height: 50%;
        }
    }
}
</style>