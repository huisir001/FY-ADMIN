# 待办

> 表格工具栏有些问题，待好好优化

## 开发
- √ el-table二次封装完善、优化
- √ 表格工具栏完善
- √ 菜单路由优化：redirect的菜单是路由还是目录，是否需要配置路由文件。父子路由重构（有问题）。
- √ 菜单管理页面-编辑弹窗完善
- √ 在线用户监控
- √ 登录日志、请求日志
- √ 服务器参数监控
- √ 主题色完善
- 主题配置抽屉完善（显示logo）
- 系统配置页（网站名称、logo、备案信息、上传配置等）
- 个人中心完善
- 部门管理、用户管理完善（用户与部门绑定、联动）
- 图片上传组件完善、优化
- 用户管理
- 角色管理-角色权限配置（例：http://vue.ruoyi.vip/system/role）
- 登录验证、登录失效、页面权限、token相关完善
- 后管微服务（如权限验证服务、登录）多个服务能够单行、并行
- 节点管理（接口管理，例：http://easyadmin.99php.cn/admindemo/index#/admindemo/system.node/index.html），由菜单向下所有按钮（接口），各页面按钮统一权限判断显隐（后台接口访问同样做验证，双重权限）

## 组件开发
- √ 卡片完善-图文卡片；
- √ 成功失败页；
- √ 编辑器；
- √ 内嵌页（frame）；
- √ 日志列表、管理；
- 复制到剪贴板
- 右键菜单
- 待办列表（to do list）
- 系统公告
- 系统版本信息
- 常见图表组件
- 表单组件（基础表单、分步表单、高级表单：https://adminpro.iviewui.com/form/advanced-form）
- 卡片列表（带分页、搜索）；
- 详情页；
- 内嵌异常页（403无访问权限、500服务器出错：https://adminpro.iviewui.com/exception/403）；
- 多语言

## 重构/优化
- √ 页面样式微调
- Ts类型文件位置优化
- Ui文件夹结构整理
- 可将组件或插件能单独提取的尽量提取，将样式、依赖、类型接口等放到一起便于复用

## 問題
- √ 由於vue3中不知如何銷毀被keep-alive緩存的組件，所以這裏設置max最大緩存數，達到max時最先緩存的組件會被銷毀
- √ bug:表格-横向滚动-改变窗口大小显隐横向滚动时报错：Uncaught (in promise) TypeError: Cannot read properties of null (reading 'insertBefore') 及 Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. 
- √ 面包屑：框架链接跳转失败
- √ tab栏，新增tab宽度无法自动撑开