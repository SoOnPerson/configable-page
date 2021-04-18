/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 14:11:28
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-18 23:38:55
 * @Descripttion:
 */
export default [
  {
    id: 1,
    parentId: -1,
    type: 1, // 1.菜单, 2.功能
    title: '系统设置',
    path: '/auth',
    component: '',
    hidden: false,
    sort: 1,
    url: '',
    icon: 'el-icon-setting'
  },
  {
    id: 101,
    parentId: 1,
    type: 1,
    title: '用户管理',
    path: '/user',
    component: '/publicComponent',
    hidden: false,
    sort: 2,
    url: '/user/list',
    icon: 'el-icon-user'
  },
  {
    id: 102,
    parentId: 1,
    type: 1,
    title: '菜单管理',
    path: '/menu',
    component: '/publicComponent',
    hidden: false,
    sort: 1,
    url: '/menu/list',
    icon: 'el-icon-user'
  },
  {
    id: 10201,
    parentId: 102,
    type: 1,
    title: '一级菜单管理',
    path: '/firstmenu',
    component: '/publicComponent',
    hidden: false,
    sort: 1,
    url: '/fmenu/list',
    icon: 'el-icon-user'
  }
]