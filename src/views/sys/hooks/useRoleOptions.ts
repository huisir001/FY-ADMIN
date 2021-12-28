/*
 * @Description: 
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-23 11:22:29
 * @LastEditTime: 2021-12-28 10:41:36
 */
import { ICols, IFormOption, TOptionOfTools } from '@/ui/fy/types'
import { ref } from "vue"

export default () => {
    /**
     * 表格列配置
     */
    const tableCols: ICols[] = [
        {
            label: '角色名称',
            minWidth: '200',
            prop: 'name',
        },
        {
            label: '角色标识',
            prop: 'key',
            minWidth: '100',
        },
        {
            label: '状态',
            minWidth: '80',
            filters: [
                { text: '111', value: 1 },
                { text: '222', value: 0 },
            ],
            slot: 'status',
        },
        {
            label: '备注',
            prop: 'remark',
            minWidth: '140',
        },
        {
            label: '创建时间',
            prop: 'createTime',
            minWidth: '160',
            sortable: true,
        },
        {
            fixed: 'right',
            minWidth: '200',
            slotHead: 'todoHead',
            slot: 'todo',
        },
    ]

    // 表格工具栏
    const tableTools: TOptionOfTools[] = ['add', 'export', 'refresh']

    /**
     * 编辑弹窗配置
     */
    const editOptions: IFormOption[] = [
        {
            label: '名称',
            component: 'input',
            key: 'name',
            props: {
                placeholder: '请输入角色名称',
            },
            rules: {
                required: true,
                trigger: 'blur',
                message: '名称不能为空',
            },
        },
        {
            label: '标识',
            component: 'input',
            key: 'key',
            props: {
                placeholder: '输入标识(英文字符)',
            },
            rules: [
                {
                    required: true,
                    trigger: 'blur',
                    message: '标识不能为空',
                },
                {
                    pattern: /^[a-zA-z_-]+$/,
                    trigger: 'blur',
                    message: '标识须为英文及“_”或“-”组成',
                },
            ],
        },
        {
            label: '备注',
            component: 'input',
            key: 'remark',
            props: {
                placeholder: '备注信息',
            },
        },
        {
            label: '状态',
            component: 'switch',
            key: 'status',
            props: {
                activeText: "正常",
                inactiveText: "停用",
                activeValue: 1,
                inactiveValue: 0
            },
        },
    ]

    return {
        tableCols: ref(tableCols),
        tableTools,
        editOptions: ref(editOptions),
    }
}