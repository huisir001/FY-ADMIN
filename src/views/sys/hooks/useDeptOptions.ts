/*
 * @Description: 部门管理配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-12-21 10:44:51
 * @LastEditTime: 2022-01-04 14:28:37
 */
import { ICols, IFormOption, TOptionOfTools } from '@/ui/fy/types'
import { ref } from "vue"

export default () => {
    /**
     * 表格列配置
     */
    const tableCols: ICols[] = [
        {
            label: '部门名称',
            minWidth: '200',
            prop: 'name',
        },
        {
            label: '状态',
            minWidth: '80',
            filters: [
                { text: '正常', value: 1 },
                { text: '停用', value: 0 },
            ],
            slot: 'status',
        },
        {
            label: '负责人',
            prop: 'leader',
            minWidth: '100',
        },
        {
            label: '联系方式',
            prop: 'phone',
            minWidth: '100',
        },
        {
            label: '创建时间',
            prop: 'createTime',
            minWidth: '180',
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
    const tableTools: TOptionOfTools[] = ['add', 'fold', 'export', 'refresh']

    /**
     * 编辑弹窗配置
     */
    const editOptions: IFormOption[] = [
        {
            label: '上级部门',
            key: 'parentId',
            slot: 'parent',
            default: null,
        },
        {
            label: '名称',
            component: 'input',
            key: 'name',
            props: {
                placeholder: '请输入部门名称',
            },
            rules: {
                required: true,
                trigger: 'blur',
                message: '名称不能为空',
            },
        },
        {
            label: '负责人',
            component: 'input',
            key: 'leader',
            props: {
                placeholder: '请输入负责人',
            },
            rules: {
                required: true,
                trigger: 'blur',
                message: '负责人不能为空',
            },
        },
        {
            label: '电话',
            component: 'input',
            key: 'phone',
            props: {
                placeholder: '请输入手机号',
            },
            rules: {
                trigger: 'blur',
                pattern: /^(13[0-9]|14[57]|15[0-9]|18[0-35-9])\d{8}$/,
                message: '手机号填写错误',
            },
        },
        {
            label: '邮箱',
            component: 'input',
            key: 'email',
            props: {
                placeholder: '请输入邮箱',
            },
            rules: {
                trigger: 'blur',
                pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                message: '邮箱填写错误',
            },
        },
        {
            label: '备注',
            component: 'input',
            key: 'remark',
            props: {
                type: 'textarea',
            },
        },
    ]

    return {
        tableCols: ref(tableCols),
        tableTools,
        editOptions: ref(editOptions),
    }
}