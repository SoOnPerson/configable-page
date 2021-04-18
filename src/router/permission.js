/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 13:53:41
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-18 18:28:12
 * @Descripttion: 路由守卫
 */
import router from '../router'
import store from '../store'

import menuList from './routerJson'
router.beforeEach((to, from, next) => {
  if (store.getters.menu) {
    next()
  } else {
    store.dispatch('GenerateRoutes', menuList, router).then(() => {
      console.log(router.getRoutes())
    })
    next({ ...to })
  }
})