/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 14:00:08
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-17 14:01:17
 * @Descripttion:
 */
import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
  // routes: constantRouterMap.concat(asyncRouterMap)
})
