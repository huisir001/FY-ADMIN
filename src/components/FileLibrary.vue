<!--
 * @Description: 文件库(只支持上传图片和zip压缩包)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-25 12:22:55
 * @LastEditTime: 2021-09-26 18:54:34
-->
<template>
    <div class="file-library-btn" @click="showFileLibraryBox = true">
        <slot />
    </div>
    <el-dialog v-model="showFileLibraryBox" width="80%" top="10vh" :append-to-body="true"
        :destroy-on-close="true" :title="type=='zip'?'文件库':'图片库'">
        <div class="file-library-dialog-cont">
            <div v-for="item in fileList" :key="item.id" class="thumbnail">
                <el-image class="pic-item" fit="cover" :src="item.url" />
            </div>
        </div>
    </el-dialog>
</template>
 
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

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
        const Store = useStore()

        const fileList = ref([
            { id: 1, url: 'https://dummyimage.com/500x400/2f3447/FFF&text=1' },
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

        return {
            showFileLibraryBox: ref(false),
            fileList,
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
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    margin-right: -12px;
    height: 70vh;
    overflow-y: auto;
    @include scrollBar;
    .thumbnail {
        border: var(--el-border-base);
        border-radius: var(--el-border-radius-small);
        .pic-item {
            padding: 5px;
            width: 100%;
            height: 100%;
            &:deep(img) {
                border-radius: var(--el-border-radius-small);
            }
        }
    }
}
@media screen and (min-width: 1671px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 8vw;
            height: 8vw;
            margin-right: calc(((80vw - 40px) - (8vw * 9)) / 8);
            margin-top: calc(((80vw - 40px) - (8vw * 9)) / 8);
            &:nth-child(9n) {
                margin-right: 0;
            }
            @for $i from 1 through 9 {
                &:nth-child(#{$i}) {
                    margin-top: 0;
                }
            }
        }
    }
}
@media screen and (max-width: 1670px) and (min-width: 1421px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 9vw;
            height: 9vw;
            margin-top: calc(((80vw - 40px) - (9vw * 8)) / 7);
            margin-right: calc(((80vw - 40px) - (9vw * 8)) / 7);
            &:nth-child(8n) {
                margin-right: 0;
            }
            @for $i from 1 through 8 {
                &:nth-child(#{$i}) {
                    margin-top: 0;
                }
            }
        }
    }
}
@media screen and (max-width: 1420px) and (min-width: 1171px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 10vw;
            height: 10vw;
            margin-top: calc(((80vw - 40px) - (10vw * 7)) / 6);
            margin-right: calc(((80vw - 40px) - (10vw * 7)) / 6);
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
}
@media screen and (max-width: 1170px) and (min-width: 1001px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 11.6vw;
            height: 11.6vw;
            margin-top: calc(((80vw - 40px) - (11.6vw * 6)) / 5);
            margin-right: calc(((80vw - 40px) - (11.6vw * 6)) / 5);
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
}
@media screen and (max-width: 1000px) and (min-width: 851px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 14vw;
            height: 14vw;
            margin-top: calc(((80vw - 40px) - (14vw * 5)) / 4);
            margin-right: calc(((80vw - 40px) - (14vw * 5)) / 4);
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
}
@media screen and (max-width: 850px) and (min-width: 701px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 17vw;
            height: 17vw;
            margin-top: calc(((80vw - 40px) - (17vw * 4)) / 3);
            margin-right: calc(((80vw - 40px) - (17vw * 4)) / 3);
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
}
@media screen and (max-width: 700px) and (min-width: 501px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 22vw;
            height: 22vw;
            margin-top: calc(((80vw - 40px) - (22vw * 3)) / 2);
            margin-right: calc(((80vw - 40px) - (22vw * 3)) / 2);
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
}
@media screen and (max-width: 500px) and (min-width: 401px) {
    .file-library-dialog-cont {
        .thumbnail {
            width: 33vw;
            height: 33vw;
            margin-top: calc(((80vw - 40px) - (33vw * 2)));
            margin-right: calc(((80vw - 40px) - (33vw * 2)));
            &:nth-child(2n) {
                margin-right: 0;
            }
            &:nth-child(1),
            &:nth-child(2) {
                margin-top: 0;
            }
        }
    }
}
@media screen and (max-width: 400px) and (min-width: 351px) {
    .file-library-dialog-cont {
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
}
@media screen and (max-width: 350px) {
    .file-library-dialog-cont {
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
}
</style>