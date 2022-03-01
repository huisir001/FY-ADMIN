/*
 * @Description: 菜单管理-配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-11-22 16:57:50
 * @LastEditTime: 2022-03-01 15:08:57
 */
import { ICols, IFormOption, TOptionOfTools } from "@/ui/fy/types";
import { MenuType } from '@/ui/helpers'
import { ref } from "vue";
export default () => {
    /**
     * 表格列配置
     */
    const tableCols: ICols[] = [
        {
            label: "菜单名称",
            minWidth: 180,
            slot: "title",
        },
        {
            label: "图标",
            minWidth: 50,
            align: "center",
            slot: "icon",
        },
        {
            label: "类型",
            prop: "type",
            minWidth: 50,
            formatter: (row: IObj, column: IObj, cellValue: number) => {
                const types: IObj = {
                    0: "目录",
                    1: "路由",
                    2: "链接",
                    3: "按钮",
                };
                return types[cellValue];
            },
        },
        {
            label: "路径",
            prop: "path",
        },
        {
            label: "显隐",
            prop: "visible",
            minWidth: 50,
            formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                return cellValue ? "显示" : "隐藏";
            },
        },
        {
            label: "登录权限",
            prop: "private",
            helpTip: "是否需要登录才能访问",
            minWidth: 90,
            formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                return cellValue ? "需要" : "不需要";
            },
        },
        {
            label: "文件路径",
            helpTip: "路由类型的菜单可配置Vue文件路径",
            minWidth: 170,
            prop: "viewPath",
        },
        {
            label: "缓存",
            helpTip: "页面组件是否做缓存",
            minWidth: 65,
            align: "center",
            prop: "keepAlive",
            formatter: (row: IObj, column: IObj, cellValue: boolean) => {
                return cellValue ? "是" : "否";
            },
        },
        {
            label: "排序",
            minWidth: 50,
            align: "center",
            prop: "orderNum",
        },
        {
            label: "状态",
            minWidth: 60,
            filters: [
                { text: "111", value: 1 },
                { text: "222", value: 0 },
            ],
            slot: "status",
        },
        {
            label: "更新时间",
            prop: "updateTime",
            minWidth: 140,
            sortable: true,
        },
        {
            fixed: "right",
            minWidth: 180,
            slotHead: "todoHead",
            slot: "todo",
        },
    ];

    // 表格工具栏
    const tableTools: TOptionOfTools[] = [
        "add",
        "fold",
        "export",
        "refresh",
        "cols",
    ];

    /**
     * 编辑弹窗配置
     */
    const editOptions = ref([
        {
            label: "上级菜单",
            key: 'parentId',
            slot: 'parent',
            default: null,
        },
        {
            label: "菜单名称",
            component: "input",
            key: "title",
            props: {
                placeholder: "请输入菜单名称",
            },
            rules: {
                required: true,
                trigger: "blur",
                message: "名称不能为空",
            },
        },
        {
            label: "类型",
            key: "type",
            slot: "type",
            default: 1,
        },
        {
            label: "排序",
            component: "input-number",
            key: "orderNum",
            props: {
                controlsPosition: "right",
            },
        },
        {
            label: "图标",
            slot: "icon",
            key: "icon",
        },
        {
            label: "状态",
            component: "switch",
            key: "status",
            props: {
                activeText: "正常",
                inactiveText: "停用",
                activeValue: 1,
                inactiveValue: 0,
            },
        },
        {
            label: "显隐",
            component: "switch",
            key: "visible",
            props: {
                activeText: "显示",
                inactiveText: "隐藏",
                // activeValue: 1,
                // inactiveValue: 0
            },
        },
        {
            label: "路径",
            component: "input",
            key: "path",
            props: {
                placeholder: "请输入路径",
            },
            rules: {
                required: true,
                trigger: "blur",
                message: "路径不能为空",
            },
        },
        {
            label: "路由文件",
            key: "viewPath",
            slot: "viewPath",
            rules: {
                required: true,
                trigger: "blur",
                message: "文件不能为空",
            },
        },
        {
            label: "需要登录",
            component: "switch",
            key: "private",
            props: {
                activeText: "需要",
                inactiveText: "无需",
                // activeValue: 1,
                // inactiveValue: 0
            },
        },
        {
            label: "缓存",
            component: "switch",
            key: "keepAlive",
            props: {
                activeText: "是",
                inactiveText: "否",
                // activeValue: 1,
                // inactiveValue: 0
            },
        },
        {
            label: "打开方式",
            component: "switch",
            key: "blank",
            props: {
                activeText: "新标签",
                inactiveText: "框架内",
                // activeValue: 1,
                // inactiveValue: 0
            },
        },
        {
            label: "链接",
            component: "input",
            key: "src",
            props: {
                placeholder: "请输入链接",
            },
            rules: {
                required: true,
                trigger: "blur",
                message: "链接不能为空",
            },
        },
        {
            label: "触发方式",
            component: "select",
            key: "triggerMode",
            props: {
                placeholder: "选择事件触发方式",
            },
            options: [
                {
                    label: "vuex:commit",
                    value: "commit",
                },
                {
                    label: "vuex:dispatch",
                    value: "dispatch",
                },
            ],
            rules: {
                required: true,
                trigger: "blur",
                message: "触发方式不能为空",
            },
        },
        {
            label: "事件名",
            component: "input",
            key: "triggerMethod",
            props: {
                placeholder: "输入按钮要触发的事件名",
            },
            rules: [{
                required: true,
                trigger: "blur",
                message: "事件名不能为空",
            }, {
                trigger: 'blur',
                pattern: /^[A-Za-z]+(\/[A-Za-z]+)*(\w+)*$/,
                message: '由英文、数字、/、_组成，以英文开头，“/”后面须为英文开头。如“user/login”',
            }],
        },
    ] as IFormOption[]);

    /**
     * 菜单类型公共表单项
     */
    const commonOptions = [
        "parentId",
        "title",
        "type",
        "orderNum",
        "icon",
        "status",
        "visible",
    ]

    /**
     * 各类型显示表单项 options
     */
    const incOptions: IObj = {
        [MenuType.cat]: commonOptions,
        [MenuType.route]: [
            ...commonOptions,
            "path",
            "viewPath",
            "private",
            "keepAlive",
        ],
        [MenuType.link]: [
            ...commonOptions,
            "src",
            "blank",
        ],
        [MenuType.button]: [
            ...commonOptions,
            "triggerMode",
            "triggerMethod",
        ],
    };


    /**
     * 菜单类型切换，显隐表单项
     */
    const menuTypeChange = (type: any) => {
        editOptions.value.forEach((opt) => {
            opt.hide = !incOptions[type].includes(opt.key);
        });
    };

    return {
        tableCols: ref(tableCols),
        tableTools,
        editOptions,
        menuTypeChange,
    };
};
