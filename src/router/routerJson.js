/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 14:11:28
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 22:34:33
 * @Descripttion:
 */
const routersList = [
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
    component: '/PublicLayout',
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
    component: '/PublicLayout',
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
    component: '/PublicLayout',
    hidden: false,
    sort: 1,
    url: '/fmenu/list',
    icon: 'el-icon-user'
  }
]
for (let index = 0; index < 30; index++) {
  routersList.push({
    id: 1000 + index,
    parentId: 1,
    type: 1,
    title: '测试数据' + 1000 + index,
    path: '/user12' + index,
    component: '/PublicLayout',
    hidden: false,
    sort: 4 + index,
    url: '/user12' + '/list',
    icon: 'el-icon-user'
  })
}
export default routersList