<!--
 * @Description: 表格工具栏（仿layui）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-10-27 18:09:14
 * @LastEditTime: 2021-10-27 23:17:04
-->
<template>
    <div class="table-tools">
        <div class="left">
            <el-button size="mini" type="primary" icon="el-icon-edit">增加</el-button>
            <el-button size="mini" type="primary" icon="el-icon-share">删除</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete">编辑</el-button>
        </div>
        <div class="right">
            <div class="export">
                <el-icon :size="16">
                    <FolderOpened />
                </el-icon>
            </div>
            <div class="searchForm">
                <el-icon :size="16">
                    <search />
                </el-icon>
            </div>
            <div class="refresh">
                <el-icon :size="16">
                    <refresh />
                </el-icon>
            </div>
        </div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import { Refresh, Search, FolderOpened } from '@element-plus/icons'

export default defineComponent({
    name: 'TableTools',
    components: {
        Refresh,
        Search,
        FolderOpened,
    },
    props: {},
    setup() {},
})
</script>
 
<style scoped lang="scss">
.table-tools {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .left,
    .right {
        display: flex;
    }
    .right {
        & > div {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: var(--el-border-base);
            cursor: pointer;
            color: var(--el-text-color-regular);
            & + div {
                margin-left: 10px;
            }
        }
    }
}
</style>