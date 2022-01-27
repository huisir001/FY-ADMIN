# 待办

> 表格工具栏有些问题，待好好优化

## 开发
- √ el-table二次封装完善、优化
- √ 表格工具栏完善
- 菜单管理
- 部门管理完善
- 个人中心完善
- 图片上传组件完善、优化
- 用户管理
- 角色管理
- √ 主题色完善
- 登录验证、登录失效、页面权限、token相关完善

## 组件开发
- √ 卡片完善-图文卡片；
- 卡片列表（带分页、搜索）；
- 详情页；
- √ 成功失败页；
- 异常页（403、404、500）；
- 编辑器；
- 内嵌页（frame）；
- 日志列表、管理；
- 多语言

## 重构/优化
- 可将组件或插件能单独提取的尽量提取，将样式、依赖、类型接口等放到一起便于复用
- √ 页面样式微调

## 問題
- √ 由於vue3中不知如何銷毀被keep-alive緩存的組件，所以這裏設置max最大緩存數，達到max時最先緩存的組件會被銷毀
- √ bug:表格-横向滚动-改变窗口大小显隐横向滚动时报错：Uncaught (in promise) TypeError: Cannot read properties of null (reading 'insertBefore') 及 Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. 