/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-01 16:37:47
 * @LastEditTime: 2021-10-20 19:45:59
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
 *   top: true,                   // 如果设置为true，则为1级路由，方便菜单栏查找
 *   noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存（默认全部缓存）
 *   title: 'title'               // 设置该路由在侧边栏\面包屑\浏览器标签栏中展示的名字,当不设置时显示路由name
 *   icon: ''                     // 设置该路由的图标，不设置则会使用默认
 *   hidden:true                  // 当设置时候不在侧边栏及导航条出现 如401，login等页面，或者一些编辑页面和用户无权限访问的页面
 *   public:true                  // 当设置时该路由无需登录就可以访问，比如登录页，注册页，404等等，否则必须登录（跳转登录页）
 *   unallow:true                 // 当设置时该用户无权访问此页面，提示暂无权限
 * }
 */

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', hidden: true, top: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: { hidden: true }
      },
    ]
  },
  {
    path: '/my',
    component: Layout,
    redirect: { name: 'Center' },
    meta: { title: '用户配置', hidden: true, top: true },
    children: [
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/my/center.vue'),
        meta: { title: "个人中心", hidden: true },
      },
      {
        path: 'my1',
        name: 'Center1',
        component: () => import('../views/my/1.vue'),
        meta: { title: "个人中心1", hidden: true }
      },
      {
        path: 'my2',
        name: 'Center2',
        component: () => import('../views/my/2.vue'),
        meta: { title: "个人中心2", hidden: true }
      },
      {
        path: 'my3',
        name: 'Center3',
        component: () => import('../views/my/3.vue'),
        meta: { title: "个人中心3", hidden: true }
      },
      {
        path: 'my4',
        name: 'Center4',
        component: () => import('../views/my/4.vue'),
        meta: { title: "个人中心4", hidden: true }
      },
      {
        path: 'my5',
        name: 'Center5',
        component: () => import('../views/my/5.vue'),
        meta: { title: "个人中心5", hidden: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: "登录", hidden: true, public: true, top: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.addRoute(
  {
    path: '/sys',
    name: 'Sys',
    component: Layout,
    redirect: { name: 'Dept' },
    meta: { title: '系统配置', icon: 'el-icon-setting', top: true },
    children: [
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('../views/sys/dept.vue'),
        meta: { title: "部门管理", icon: "el-icon-s-operation" }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/sys/menu.vue'),
        meta: { title: "菜单管理", icon: "el-icon-menu" }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/sys/role.vue'),
        meta: { title: "角色管理", icon: "el-icon-user" }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/sys/users.vue'),
        meta: { title: "用户管理", icon: "el-icon-user" }
      },
    ]
  }
)

// 路由权限验证
router.beforeEach(permission)

// 路由切换后钩子
router.afterEach(rearHook)

export default router
