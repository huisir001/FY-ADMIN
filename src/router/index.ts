/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-10-22 14:43:39
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import permission from './permission'
import rearHook from './rearHook'


/**
 * 配置规则：
 * 路由path前加“/”代表根节点
 * name:'router-name'            // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
 *   keepAlive: true              // 如果设置为true，则会被 <keep-alive> 缓存（默认全部缓存）
 *   title: 'title'               // 设置该路由在侧边栏\面包屑\浏览器标签栏中展示的名字,当不设置时显示路由name
 *   icon: ''                     // 设置该路由的图标，不设置则会使用默认
 *   visible:true                 // 默认true,当设置false时候不在侧边栏出现 如401，login等页面，或者一些编辑页面和用户无权限访问的页面
 *   private:true                 // 默认true,当设置false时该路由无需登录就可以访问，比如登录页，注册页，404等等，否则必须登录（跳转登录页）
 * }
 */

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', visible: false, private: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
      },
    ]
  },
  {
    path: '/my',
    component: Layout,
    redirect: { name: 'Center' },
    meta: { title: '用户配置', visible: false, private: true, keepAlive: true },
    children: [
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/my/center.vue'),
        meta: { title: "个人中心", visible: false, private: true, keepAlive: true },
      },
      {
        path: 'my1',
        name: 'Center1',
        component: () => import('../views/my/1.vue'),
        meta: { title: "个人中心1", visible: false, private: true, keepAlive: true }
      },
      {
        path: 'my2',
        name: 'Center2',
        component: () => import('../views/my/2.vue'),
        meta: { title: "个人中心2", visible: false, private: true, keepAlive: true }
      },
      {
        path: 'my3',
        name: 'Center3',
        component: () => import('../views/my/3.vue'),
        meta: { title: "个人中心3", visible: false, private: true, keepAlive: true }
      },
      {
        path: 'my4',
        name: 'Center4',
        component: () => import('../views/my/4.vue'),
        meta: { title: "个人中心4", visible: false, private: true, keepAlive: true }
      },
      {
        path: 'my5',
        name: 'Center5',
        component: () => import('../views/my/5.vue'),
        meta: { title: "个人中心5", visible: false, private: true, keepAlive: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: "登录", visible: false, private: false }
  },
]

const router = createRouter({
  history: createWebHistory($GLOBAL.BASE_URL),
  routes
})


// router.addRoute(
//   {
//     path: '/sys',
//     name: 'Sys',
//     component: Layout,
//     redirect: { name: 'Dept' },
//     meta: { title: '系统配置', icon: 'el-icon-setting', keepAlive: true, visible: true, private: true },
//     children: [
//       {
//         path: '/sys/dept',
//         name: 'Dept',
//         component: () => import('@/views/sys/dept.vue'),
//         meta: { title: "部门管理", icon: "el-icon-s-operation", keepAlive: true, visible: true, private: true }
//       },
//       {
//         path: 'menu',
//         name: 'Menu',
//         component: () => import('../views/sys/menu.vue'),
//         meta: { title: "菜单管理", icon: "el-icon-menu", keepAlive: true, visible: true, private: true }
//       },
//       {
//         path: 'role',
//         name: 'Role',
//         component: () => import('../views/sys/role.vue'),
//         meta: { title: "角色管理", icon: "el-icon-user", keepAlive: true, visible: true, private: true }
//       },
//       {
//         path: 'users',
//         name: 'Users',
//         component: () => import('../views/sys/users.vue'),
//         meta: { title: "用户管理", icon: "el-icon-user", keepAlive: true, visible: true, private: true }
//       },
//     ]
//   }
// )

// 路由权限验证
router.beforeEach(permission)

// 路由切换后钩子
router.afterEach(rearHook)

export default router