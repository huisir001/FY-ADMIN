#  FY-ADMIN 后台管理系统（风云ADMIN）
（vue3+TS+ElementUI后管脚手架）
> 状态：开发中，未完成   
> by Huisir @2021   
> Email admin@zuifengyun.com

## 兼容性
- Edge ≥ 79
- Firefox ≥ 78
- Chrome ≥ 64
- Safari ≥ 12

## 功能组件

* 权限管理
* 用户登录
* 接口验证
* 常用组件
* 代码生成

## 开发

```bash
# 进入项目目录
cd vue3-ts-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，由于版本问题可能会出现bug。
# 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动本地开发服务
npm run serve:dev

# 启动本地测试服务
npm run serve:test

# Vite移除cache (避免更新package后仍使用旧版依赖产生未知问题)
npm run serve:dev --force
# 或者
rm -rf node_modules/.vite
```

## 部署

```bash
# 构建生产环境
npm run build
```
